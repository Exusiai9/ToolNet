import './Hero.css'

/** 主视觉横幅，仅在「全部」视图顶部展示 */
export default function Hero({ total, categoryCount }) {
  return (
    <section className="hero">
      <div className="hero__deco hero__deco--brackets" aria-hidden="true">
        <span>[</span>
        <span>]</span>
      </div>

      <div className="hero__main">
        <div className="hero__kick mono">
          <span className="hero__kick-bar" />
          OPERATOR NAVIGATION SYSTEM
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">工具<span className="accent">集合</span></span>
          <span className="hero__title-line hero__title-line--outline">TOOLNET</span>
        </h1>

        <p className="hero__desc">
          一个收集并展示常用工具网站的个人导航终端。<br />
          按分类检索，或直接搜索 — 点击卡片在新标签页打开目标站点。
        </p>
      </div>

      <div className="hero__stats">
        <Stat label="TOOLS" value={total} />
        <Stat label="SECTORS" value={categoryCount} />
        <Stat label="STATUS" value="LIVE" live />
      </div>

      <div className="hero__stripe hazard" aria-hidden="true" />
    </section>
  )
}

function Stat({ label, value, live }) {
  return (
    <div className="stat">
      <span className="stat__label mono">{label}</span>
      <span className={`stat__value mono${live ? ' stat__value--live' : ''}`}>
        {String(value).padStart(2, '0').slice(0, 6)}
      </span>
    </div>
  )
}
