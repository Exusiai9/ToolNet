import { useMemo, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { categories, tools } from '../../data/tools'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import Hero from '../../components/Hero'
import ToolCard from '../../components/ToolCard'
import Footer from '../../components/Footer'
import './ToolsScene.css'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 工具集扇区 —— 由原 App 整体迁入。
 * 分类不再是本地 state,而是路由参数 /tools/:cat(可深链、可分享)。
 * 搜索词留作本地 state(?q= 化留到后续阶段)。
 */
export default function ToolsScene() {
  const { cat: catParam } = useParams()
  const navigate = useNavigate()
  const active = catParam || 'all'
  const [query, setQuery] = useState('')
  const appRef = useRef(null)
  const mainRef = useRef(null)

  // 每个分类的工具数
  const counts = useMemo(() => {
    const m = {}
    for (const t of tools) m[t.category] = (m[t.category] || 0) + 1
    return m
  }, [])

  const q = query.trim().toLowerCase()

  // 按分类过滤 + 分组(搜索时跨分类匹配 name/desc/url)
  const sections = useMemo(() => {
    const cats = active === 'all' ? categories : categories.filter((c) => c.id === active)
    return cats
      .map((cat) => {
        let list = tools.filter((t) => t.category === cat.id)
        if (q) {
          list = list.filter(
            (t) =>
              t.name.toLowerCase().includes(q) ||
              t.desc.toLowerCase().includes(q) ||
              t.url.toLowerCase().includes(q),
          )
        }
        return { cat, list }
      })
      .filter((s) => s.list.length > 0)
  }, [active, q])

  const totalShown = sections.reduce((n, s) => n + s.list.length, 0)
  const activeLabel =
    active === 'all' ? '全部工具' : categories.find((c) => c.id === active)?.name ?? ''
  const showHero = active === 'all' && !q

  // 入场动画:侧栏元素(仅一次)
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      gsap.from('.reveal-item', {
        opacity: 0,
        x: -18,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
      })
    },
    { scope: appRef },
  )

  // 内容动画:切换分类 / 搜索时,Hero 与卡片交错出现
  useGSAP(
    () => {
      if (prefersReducedMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__kick, .hero__title-line, .hero__desc, .stat', {
        opacity: 0,
        y: 22,
        duration: 0.5,
        stagger: 0.06,
      }).from(
        '.reveal-card',
        {
          opacity: 0,
          y: 24,
          duration: 0.45,
          stagger: { each: 0.035, from: 'start' },
        },
        showHero ? '-=0.2' : 0,
      )
    },
    { scope: mainRef, dependencies: [active, q] },
  )

  return (
    <div className="tools" ref={appRef}>
      <Sidebar
        categories={categories}
        counts={counts}
        total={tools.length}
        active={active}
        onSelect={(id) => {
          setQuery('')
          navigate(id === 'all' ? '/tools' : `/tools/${id}`)
        }}
      />

      <div className="content">
        <Topbar activeLabel={activeLabel} count={totalShown} query={query} onQuery={setQuery} />

        <main className="main" ref={mainRef}>
          {showHero && <Hero total={tools.length} categoryCount={categories.length} />}

          {sections.length === 0 ? (
            <div className="empty">
              <span className="empty__code mono">// NO_RESULT</span>
              <p className="empty__text">
                没有匹配 “<span className="accent">{query}</span>” 的工具
              </p>
              <button className="empty__reset mono" onClick={() => setQuery('')}>
                [ 清除搜索 ]
              </button>
            </div>
          ) : (
            sections.map(({ cat, list }, si) => (
              <section className="section" key={cat.id}>
                <div className="section__head">
                  <span className="section__no mono">{String(si + 1).padStart(2, '0')}</span>
                  <h2 className="section__title">
                    {cat.name}
                    <span className="section__code mono">/ {cat.code}</span>
                  </h2>
                  <span className="section__line" />
                  <span className="section__count mono">
                    {String(list.length).padStart(2, '0')} ITEMS
                  </span>
                </div>

                <div className="tool-grid">
                  {list.map((tool, i) => (
                    <ToolCard key={tool.url} tool={tool} index={i} />
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
