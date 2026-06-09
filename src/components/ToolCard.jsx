import { useRef, useState } from 'react'
import './ToolCard.css'

/** 从网址解析主域名 */
function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const LONG_PRESS_MS = 450

/**
 * 单个工具卡片
 * 交互:点击打开网站(新标签);长按跳转该工具的档案页(onDetail)。
 * @param onDetail 长按回调,接收 tool
 */
export default function ToolCard({ tool, index, onDetail }) {
  const [iconFail, setIconFail] = useState(false)
  const [pressing, setPressing] = useState(false)
  const timerRef = useRef(null)
  const firedRef = useRef(false) // 长按已触发 → 抑制随后的 click(避免又打开网站)
  const host = hostOf(tool.url)
  const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`

  const startPress = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    firedRef.current = false
    setPressing(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      firedRef.current = true
      setPressing(false)
      onDetail?.(tool)
    }, LONG_PRESS_MS)
  }
  const cancelPress = () => {
    clearTimeout(timerRef.current)
    setPressing(false)
  }
  const handleClick = (e) => {
    if (firedRef.current) {
      e.preventDefault() // 刚才是长按 → 不打开网站
      firedRef.current = false
    }
  }

  return (
    <a
      className={`card reveal-card${pressing ? ' card--pressing' : ''}`}
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      style={{ '--i': index }}
      draggable={false}
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      title="点击打开 · 长按查看详情"
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

      {/* 长按进度条 */}
      <span className="card__press" aria-hidden="true" />
    </a>
  )
}
