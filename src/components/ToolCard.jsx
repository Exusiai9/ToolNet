import { useState } from 'react'
import './ToolCard.css'

/** 从网址解析主域名 */
function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** 单个工具卡片 */
export default function ToolCard({ tool, index }) {
  const [iconFail, setIconFail] = useState(false)
  const host = hostOf(tool.url)
  const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`

  return (
    <a
      className="card reveal-card"
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      style={{ '--i': index }}
    >
      {/* 角标编号 */}
      <span className="card__idx mono">{String(index + 1).padStart(2, '0')}</span>

      {/* 图标 */}
      <div className="card__icon">
        {iconFail ? (
          <span className="card__fallback">{tool.name.charAt(0)}</span>
        ) : (
          <img
            src={favicon}
            alt=""
            loading="lazy"
            onError={() => setIconFail(true)}
            draggable="false"
          />
        )}
      </div>

      {/* 文本 */}
      <div className="card__body">
        <span className="card__name">{tool.name}</span>
        <span className="card__desc">{tool.desc}</span>
        <span className="card__host mono">{host}</span>
      </div>

      {/* 打开指示 */}
      <span className="card__open mono">
        OPEN
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>

      {/* 悬停描边角 */}
      <span className="card__corner card__corner--tr" />
      <span className="card__corner card__corner--bl" />
    </a>
  )
}
