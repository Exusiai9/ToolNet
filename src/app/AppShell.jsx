import { Outlet } from 'react-router-dom'

import Background from '../components/Background'
import TopNav from '../components/TopNav'
import { sectors } from '../data/sectors'
import './AppShell.css'

/**
 * 持久外壳:全屏背景 + 顶部扇区导航(TopNav)常驻,
 * 主区由路由出口 <Outlet/> 渲染当前扇区场景(下移让出顶栏高度)。
 * (阶段三将在这里挂入整屏幕布转场 SceneCurtain)
 */
export default function AppShell() {
  return (
    <div className="shell">
      <Background />
      <TopNav sectors={sectors} />
      <div className="shell__main">
        <Outlet />
      </div>
    </div>
  )
}
