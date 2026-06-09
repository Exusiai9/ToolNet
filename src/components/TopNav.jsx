import { NavLink } from 'react-router-dom'
import './TopNav.css'

/**
 * 顶部扇区导航栏(对标 ak.hypergryph.com 置顶导航)。
 * 左 logo · 中扇区(英文主标 + 中文副标,选中加框)· 右状态。
 * 高亮以路由为准(NavLink isActive)。阶段三接入幕布转场后改走 navigateWithTransition。
 * @param sectors 顶层扇区列表(见 data/sectors.js)
 */
export default function TopNav({ sectors }) {
  return (
    <header className="topnav">
      <NavLink to="/home" className="topnav__brand" aria-label="TOOLNET / HOME">
        <span className="topnav__mark hazard" />
        <span className="topnav__brandname">TOOLNET</span>
      </NavLink>

      <nav className="topnav__nav">
        {sectors.map((s) => (
          <NavLink
            key={s.id}
            to={s.path}
            className={({ isActive }) => `topnav__item${isActive ? ' topnav__item--on' : ''}`}
          >
            <span className="topnav__en">{s.en}</span>
            <span className="topnav__cn">{s.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="topnav__right">
        <span className="topnav__status mono">
          <span className="dot dot--live" />
          ONLINE
        </span>
        <a
          className="topnav__gh mono"
          href="https://github.com/Exusiai9/ToolNet"
          target="_blank"
          rel="noreferrer"
        >
          GITHUB
        </a>
      </div>
    </header>
  )
}
