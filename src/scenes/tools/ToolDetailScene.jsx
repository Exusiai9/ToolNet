import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { groups, tools, disciplines as allDisciplines, toolSlug } from '../../data/tools'
import './ToolDetail.css'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
const discName = (id) => allDisciplines.find((d) => d.id === id)?.name ?? id

/**
 * 工具档案页 —— 长按工具卡进入。版式参考方舟干员 PROFILE 页:
 * 大名 + 幽灵水印、阵营徽标、描述块、同子类工具缩略图切换、序号 0X/0Y、上/下切换、进入网站。
 * 路由 /tools/:group/:slug
 */
export default function ToolDetailScene() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const rootRef = useRef(null)
  const [iconFail, setIconFail] = useState(false)

  const tool = tools.find((t) => toolSlug(t.name) === slug)
  const g = tool && groups.find((x) => x.id === tool.group)
  const sub = g?.subcats.find((s) => s.id === tool.subcat)
  const siblings = tool ? tools.filter((t) => t.group === tool.group && t.subcat === tool.subcat) : []
  const idx = siblings.indexOf(tool)
  const total = siblings.length
  const prev = total ? siblings[(idx - 1 + total) % total] : null
  const next = total ? siblings[(idx + 1) % total] : null
  const host = tool ? hostOf(tool.url) : ''
  const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=128`

  const goTo = (t) => navigate(`/tools/${t.group}/${toolSlug(t.name)}`)

  // 切换工具时重新入场
  useGSAP(
    () => {
      if (!tool || prefersReducedMotion) return
      gsap.from('[data-d]', { opacity: 0, y: 28, duration: 0.6, stagger: 0.06, ease: 'power3.out' })
    },
    { scope: rootRef, dependencies: [slug] },
  )

  if (!tool) {
    return (
      <div className="td td--empty">
        <span className="td__crumb mono">// TOOL_NOT_FOUND</span>
        <button className="td__back mono" onClick={() => navigate('/tools')}>
          ← 返回工具
        </button>
      </div>
    )
  }

  return (
    <div className="td" ref={rootRef} key={slug}>
      <span className="td__bgname" aria-hidden="true">
        {tool.name}
      </span>

      <div className="td__top" data-d>
        <span className="td__crumb mono">TOOLS :// {g?.name}</span>
        <button className="td__back mono" onClick={() => navigate(`/tools/${tool.group}`)}>
          ← 返回列表
        </button>
      </div>

      <div className="td__grid">
        {/* 左:信息 */}
        <div className="td__info">
          <span className="td__label mono" data-d>
            {g?.name} :// PROFILE
          </span>

          <div className="td__head" data-d>
            <h1 className="td__name">{tool.name}</h1>
            <span className="td__badge mono">{g?.code}</span>
          </div>

          <div className="td__type mono" data-d>
            <span className="td__type-k">TYPE</span>
            <span className="td__type-v">{sub?.name}</span>
          </div>

          <a className="td__visit" href={tool.url} target="_blank" rel="noreferrer" data-d>
            <span>进入网站</span>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>
          <span className="td__host mono" data-d>
            {host}
          </span>

          <p className="td__desc" data-d>
            {tool.about || tool.desc}
          </p>

          {tool.disciplines?.length > 0 && (
            <div className="td__disc" data-d>
              {tool.disciplines.map((id) => (
                <span key={id} className="td__disc-chip mono">
                  {discName(id)}
                </span>
              ))}
            </div>
          )}

          {/* 同子类缩略图切换 */}
          <div className="td__strip" data-d>
            {siblings.map((t) => (
              <button
                key={t.url}
                className={`td__thumb${t === tool ? ' td__thumb--on' : ''}`}
                onClick={() => goTo(t)}
                title={t.name}
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${hostOf(t.url)}&sz=64`}
                  alt=""
                  draggable="false"
                />
                <span className="td__thumb-name">{t.name}</span>
              </button>
            ))}
          </div>

          <div className="td__progress" data-d>
            <span
              className="td__progress-fill"
              style={{ width: `${total > 1 ? (idx / (total - 1)) * 100 : 100}%` }}
            />
          </div>
        </div>

        {/* 右:大图 + 序号 + 上下切换 */}
        <div className="td__visual" data-d>
          <div className="td__index mono">
            <span className="td__index-no">{String(idx + 1).padStart(2, '0')}</span>
            <span className="td__index-total">/ {String(total).padStart(2, '0')}</span>
            <span className="td__index-label">TOOL</span>
          </div>

          <div className="td__portrait">
            {iconFail ? (
              <span className="td__mono">{tool.name.charAt(0)}</span>
            ) : (
              <img src={favicon} alt={tool.name} onError={() => setIconFail(true)} draggable="false" />
            )}
          </div>

          <div className="td__nav">
            <button
              className="td__navbtn"
              onClick={() => prev && goTo(prev)}
              aria-label="上一个"
              disabled={total < 2}
            >
              ↑
            </button>
            <button
              className="td__navbtn"
              onClick={() => next && goTo(next)}
              aria-label="下一个"
              disabled={total < 2}
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
