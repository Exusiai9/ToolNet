import { NavLink } from 'react-router-dom'
import './SceneRail.css'

/**
 * 左侧常驻扇区导航(方舟风编号导航栏)。
 * 高亮以路由为准(NavLink isActive),点击即切换扇区路由。
 * 阶段三接入幕布转场后,点击会改走 navigateWithTransition。
 * @param sectors 顶层扇区列表(见 data/sectors.js)
 */
export default function SceneRail({ sectors }) {
  return (
    <aside className="rail">
      <NavLink to="/home" className="rail__brand" aria-label="TOOLNET / HOME">
        <span className="rail__mark hazard" />
      </NavLink>

      <nav className="rail__nav">
        {sectors.map((s, i) => (
          <NavLink
            key={s.id}
            to={s.path}
            className={({ isActive }) => `rail__item${isActive ? ' rail__item--on' : ''}`}
            title={s.desc}
          >
            <span className="rail__idx mono">{String(i).padStart(2, '0')}</span>
            <span className="rail__name">{s.name}</span>
            <span className="rail__code mono">{s.code}</span>
            <span className="rail__bar" />
          </NavLink>
        ))}
      </nav>

      <div className="rail__foot">
        <span className="dot dot--live" />
        <a
          className="rail__gh mono"
          href="https://github.com/Exusiai9/ToolNet"
          target="_blank"
          rel="noreferrer"
        >
          GH
        </a>
      </div>
    </aside>
  )
}
