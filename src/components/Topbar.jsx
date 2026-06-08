import { useEffect, useState } from 'react'
import './Topbar.css'

/** 顶部工具条：路径标识 + 搜索 + 实时时钟 */
export default function Topbar({ activeLabel, count, query, onQuery }) {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const p = (n) => String(n).padStart(2, '0')
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar__path mono">
        <span className="topbar__root">TOOLNET</span>
        <span className="topbar__sep">/</span>
        <span className="topbar__cur">{activeLabel}</span>
        <span className="topbar__count">[{String(count).padStart(2, '0')}]</span>
      </div>

      <div className="topbar__right">
        <label className="search">
          <svg className="search__icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            className="search__input"
            type="text"
            placeholder="搜索工具 / SEARCH..."
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            spellCheck={false}
          />
          {query && (
            <button className="search__clear" onClick={() => onQuery('')} aria-label="清除">
              ✕
            </button>
          )}
        </label>

        <div className="topbar__clock mono">
          <span className="dot dot--live" />
          {clock}
        </div>
      </div>
    </header>
  )
}
