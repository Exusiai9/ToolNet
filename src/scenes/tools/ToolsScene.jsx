import { useMemo, useRef, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { disciplines, groups, tools, toolSlug } from '../../data/tools'
import Topbar from '../../components/Topbar'
import Hero from '../../components/Hero'
import ToolCard from '../../components/ToolCard'
import Footer from '../../components/Footer'
import './ToolsScene.css'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 工具集扇区 —— 二级结构(大类→子类)+ 学科横切筛选。
 *   · 大类(group)= 横向标签,路由 /tools/:group,缺省=第一个大类
 *   · 子类(subcat)在页面内以分区(section)呈现
 *   · 学科(discipline)由 ?d= 驱动,顶部 chips 横切过滤
 *   · 搜索词为本地 state;有搜索时跨所有大类匹配
 */
export default function ToolsScene() {
  const { group: groupParam } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const appRef = useRef(null)
  const mainRef = useRef(null)

  const activeGroup = groups.find((g) => g.id === groupParam)?.id ?? groups[0].id
  const activeDiscipline = searchParams.get('d') || null
  const q = query.trim().toLowerCase()

  // 每个大类的工具数(总数,不随筛选变化)
  const counts = useMemo(() => {
    const m = {}
    for (const t of tools) m[t.group] = (m[t.group] || 0) + 1
    return m
  }, [])

  // 过滤 + 按 大类→子类 顺序分区
  const sections = useMemo(() => {
    const matchQ = (t) =>
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.url.toLowerCase().includes(q) ||
      (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
    const matchD = (t) => !activeDiscipline || (t.disciplines || []).includes(activeDiscipline)
    const inScope = (t) => (q ? true : t.group === activeGroup)

    const pool = tools.filter((t) => matchQ(t) && matchD(t) && inScope(t))

    const result = []
    for (const g of groups) {
      for (const sc of g.subcats) {
        const list = pool.filter((t) => t.group === g.id && t.subcat === sc.id)
        if (list.length) result.push({ key: `${g.id}/${sc.id}`, group: g, subcat: sc, list })
      }
    }
    return result
  }, [activeGroup, activeDiscipline, q])

  const totalShown = sections.reduce((n, s) => n + s.list.length, 0)
  const activeGroupObj = groups.find((g) => g.id === activeGroup)
  const activeLabel = q ? '搜索结果' : activeGroupObj?.name ?? ''
  const showHero = !q && !activeDiscipline && activeGroup === groups[0].id

  const setDiscipline = (id) => {
    const sp = new URLSearchParams(searchParams)
    if (id) sp.set('d', id)
    else sp.delete('d')
    setSearchParams(sp, { replace: true })
  }

  // 入场动画:大类标签(仅一次)
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      gsap.from('.reveal-item', {
        opacity: 0,
        y: -12,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
      })
    },
    { scope: appRef },
  )

  // 内容动画:切换大类 / 学科 / 搜索时,Hero 与卡片交错出现
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (showHero) {
        tl.from('.hero__kick, .hero__title-line, .hero__desc, .stat', {
          opacity: 0,
          y: 22,
          duration: 0.5,
          stagger: 0.06,
        })
      }
      const cards = gsap.utils.toArray(mainRef.current.querySelectorAll('.reveal-card'))
      if (cards.length) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 24,
            duration: 0.45,
            stagger: { each: 0.035, from: 'start' },
          },
          showHero ? '-=0.2' : 0,
        )
      }
    },
    { scope: mainRef, dependencies: [activeGroup, activeDiscipline, q] },
  )

  return (
    <div className="tools" ref={appRef}>
      <div className="content">
        <Topbar activeLabel={activeLabel} count={totalShown} query={query} onQuery={setQuery} />

        <main className="main" ref={mainRef}>
          {/* 大类:横向标签 */}
          <nav className="group-nav" aria-label="工具大类">
            {groups.map((g) => (
              <button
                key={g.id}
                className={`group-tab reveal-item${activeGroup === g.id ? ' group-tab--on' : ''}`}
                onClick={() => {
                  setQuery('')
                  navigate(`/tools/${g.id}`)
                }}
              >
                <span className="group-tab__name">{g.name}</span>
                <span className="group-tab__count mono">{counts[g.id] || 0}</span>
              </button>
            ))}
          </nav>

          {showHero && <Hero total={tools.length} categoryCount={groups.length} />}

          {/* 学科横切筛选 */}
          <div className="chips" role="group" aria-label="学科筛选">
            <button
              className={`chip${!activeDiscipline ? ' chip--on' : ''}`}
              onClick={() => setDiscipline(null)}
            >
              全部
            </button>
            {disciplines.map((d) => (
              <button
                key={d.id}
                className={`chip${activeDiscipline === d.id ? ' chip--on' : ''}`}
                onClick={() => setDiscipline(activeDiscipline === d.id ? null : d.id)}
              >
                {d.name}
              </button>
            ))}
          </div>

          {sections.length === 0 ? (
            <div className="empty">
              <span className="empty__code mono">// NO_RESULT</span>
              <p className="empty__text">
                没有匹配的工具
                {q && (
                  <>
                    {' '}“<span className="accent">{query}</span>”
                  </>
                )}
              </p>
              <button
                className="empty__reset mono"
                onClick={() => {
                  setQuery('')
                  setDiscipline(null)
                }}
              >
                [ 清除筛选 ]
              </button>
            </div>
          ) : (
            sections.map(({ key, group, subcat, list }, si) => (
              <section className="section" key={key}>
                <div className="section__head">
                  <span className="section__no mono">{String(si + 1).padStart(2, '0')}</span>
                  <h2 className="section__title">
                    {subcat.name}
                    <span className="section__code mono">/ {group.code}</span>
                  </h2>
                  <span className="section__line" />
                  <span className="section__count mono">
                    {String(list.length).padStart(2, '0')} ITEMS
                  </span>
                </div>

                <div className="tool-grid">
                  {list.map((tool, i) => (
                    <ToolCard
                      key={tool.url}
                      tool={tool}
                      index={i}
                      onDetail={(t) => navigate(`/tools/${t.group}/${toolSlug(t.name)}`)}
                    />
                  ))}
                </div>
              </section>
            ))
          )}

          <Footer />
        </main>
      </div>
    </div>
  )
}
