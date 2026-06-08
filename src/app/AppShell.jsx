import { Outlet } from 'react-router-dom'

import Background from '../components/Background'
import SceneRail from '../components/SceneRail'
import { sectors } from '../data/sectors'
import './AppShell.css'

/**
 * 持久外壳:全屏背景 + 左侧扇区导航(SceneRail)常驻,
 * 主区由路由出口 <Outlet/> 渲染当前扇区场景。
 * (阶段三将在这里挂入整屏幕布转场 SceneCurtain)
 */
export default function AppShell() {
  return (
    <div className="shell">
      <Background />
      <SceneRail sectors={sectors} />
      <div className="shell__main">
        <Outlet />
      </div>
    </div>
  )
}
