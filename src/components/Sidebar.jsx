import './Sidebar.css'

/**
 * 左侧固定导航栏
 * @param categories 分类列表
 * @param counts      { categoryId: number } 各分类工具数
 * @param total       工具总数
 * @param active      当前选中的分类 id（'all' 表示全部）
 * @param onSelect    选择分类回调
 */
export default function Sidebar({ categories, counts, total, active, onSelect }) {
  const items = [{ id: 'all', name: '全部工具', code: 'ALL', desc: '完整集合' }, ...categories]

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        {/* 品牌 */}
        <div className="brand reveal-item">
          <div className="brand__mark hazard" />
          <div className="brand__text">
            <span className="brand__name">TOOLNET</span>
            <span className="brand__sub mono">工具集合终端</span>
          </div>
        </div>

        <div className="sidebar__tag mono reveal-item">
          <span className="dot" /> RHODES&nbsp;STYLE&nbsp;NAV&nbsp;//&nbsp;v1.0
        </div>

        {/* 分类导航 */}
        <nav className="navlist">
          <div className="navlist__label mono reveal-item">// 索引 INDEX</div>
          {items.map((c, i) => {
            const count = c.id === 'all' ? total : counts[c.id] || 0
            const on = active === c.id
            return (
              <button
                key={c.id}
                className={`navitem reveal-item${on ? ' navitem--on' : ''}`}
                onClick={() => onSelect(c.id)}
              >
                <span className="navitem__idx mono">{String(i).padStart(2, '0')}</span>
                <span className="navitem__body">
                  <span className="navitem__name">{c.name}</span>
                  <span className="navitem__desc mono">{c.desc}</span>
                </span>
                <span className="navitem__count mono">{count}</span>
                <span className="navitem__bar" />
              </button>
            )
          })}
        </nav>

        {/* 底部状态 */}
        <div className="sidebar__foot reveal-item">
          <div className="status mono">
            <span className="dot dot--live" />
            SYSTEM ONLINE
          </div>
          <a
            className="ghlink mono"
            href="https://github.com/Exusiai9/ToolNet"
            target="_blank"
            rel="noreferrer"
          >
            [ SOURCE / GITHUB ]
          </a>
        </div>
      </div>
    </aside>
  )
}
