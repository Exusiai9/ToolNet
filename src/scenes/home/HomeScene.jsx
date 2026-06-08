import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SymbolonHero from './SymbolonHero'
import './HomeScene.css'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 主页 = 展示首屏 + 4 个整屏吸附板块(分别预览四个扇区)。
 * 滚动入场动效对标 ak.hypergryph.com/#more:进入视口时内容交错入场、
 * 幽灵编号推近,右侧节点指示跟随高亮。文案为占位,后续可改。
 */
const panels = [
  { id: 'tools', no: '01', code: 'TLS', name: '工具', en: 'TOOLS', tag: '常用工具集合 · 分类检索 · 全局搜索', path: '/tools' },
  { id: 'links', no: '02', code: 'LNK', name: '导航', en: 'LINKS', tag: '网站书签 · 资源外链 · 社交账号', path: '/links' },
  { id: 'feed',  no: '03', code: 'FED', name: '动态', en: 'FEED',  tag: 'RSS · 博客更新 · GitHub 活动', path: '/feed' },
  { id: 'notes', no: '04', code: 'NTS', name: '笔记', en: 'NOTES', tag: '写作 · 日志 · 想法碎片', path: '/notes' },
]

const dotLabels = ['00', ...panels.map((p) => p.no)]

export default function HomeScene() {
  const navigate = useNavigate()
  const homeRef = useRef(null)
  const sectionRefs = useRef([])
  const [active, setActive] = useState(0)

  // 仅在主页启用整屏吸附,离开即移除(不影响其他扇区)
  useEffect(() => {
    document.documentElement.classList.add('snap-home')
    return () => document.documentElement.classList.remove('snap-home')
  }, [])

  useGSAP(
    () => {
      const sections = gsap.utils.toArray(homeRef.current.querySelectorAll('.home__section'))

      // 当前板块高亮(与动效无关,始终运行)
      sections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })

      if (prefersReducedMotion) return

      // 各板块进入视口时:内容交错入场 + 幽灵编号推近
      sections.forEach((sec) => {
        const items = sec.querySelectorAll('[data-anim]')
        if (items.length) {
          gsap.from(items, {
            opacity: 0,
            y: 48,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: sec, start: 'top 65%', toggleActions: 'play none none reverse' },
          })
        }
        const ghost = sec.querySelector('.home__ghost')
        if (ghost) {
          gsap.from(ghost, {
            scale: 1.18,
            opacity: 0,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }
      })
    },
    { scope: homeRef },
  )

  const goTo = (i) =>
    sectionRefs.current[i]?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })

  return (
    <div className="home" ref={homeRef}>
      {/* 侧边节点指示 */}
      <nav className="home__dots" aria-label="板块导航">
        {dotLabels.map((n, i) => (
          <button
            key={n}
            className={`home__dot${active === i ? ' home__dot--on' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`跳到第 ${n} 屏`}
          >
            <span className="home__dot-no mono">{n}</span>
          </button>
        ))}
      </nav>

      {/* 00 · 展示首屏(SYMBOLON) */}
      <section className="home__section home__hero" ref={(el) => (sectionRefs.current[0] = el)}>
        <SymbolonHero onScrollDown={() => goTo(1)} />
      </section>

      {/* 01-04 · 扇区板块 */}
      {panels.map((p, idx) => (
        <section
          key={p.id}
          className={`home__section home__panel home__panel--${idx % 2 ? 'right' : 'left'}`}
          ref={(el) => (sectionRefs.current[idx + 1] = el)}
        >
          <span className="home__ghost" aria-hidden="true">
            {p.no}
          </span>
          <div className="home__inner">
            <span className="home__panel-meta mono" data-anim>
              SECTOR {p.no} / {p.code}
            </span>
            <h2 className="home__panel-name" data-anim>
              {p.name}
            </h2>
            <span className="home__panel-en mono" data-anim>
              {p.en}
            </span>
            <div className="home__panel-bar hazard" data-anim />
            <p className="home__panel-tag" data-anim>
              {p.tag}
            </p>
            <button className="home__cta" data-anim onClick={() => navigate(p.path)}>
              <span>进入扇区</span>
              <span className="home__cta-arrow mono">→</span>
            </button>
          </div>
        </section>
      ))}
    </div>
  )
}
