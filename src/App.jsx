import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import AppShell from './app/AppShell'
import HomeScene from './scenes/home/HomeScene'
import ToolsScene from './scenes/tools/ToolsScene'
import ToolDetailScene from './scenes/tools/ToolDetailScene'
import LinksScene from './scenes/links/LinksScene'
import FeedScene from './scenes/feed/FeedScene'
import NotesScene from './scenes/notes/NotesScene'
import NotFoundScene from './scenes/NotFoundScene'

// 隐藏的在线编辑界面(#/admin),懒加载,不进默认包
const AdminScene = lazy(() => import('./scenes/admin/AdminScene'))

/**
 * 路由总表 —— 所有顶层扇区都挂在持久外壳 AppShell 下。
 * 切换扇区 = 切换路由;AppShell 的 TopNav 与背景常驻。
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomeScene />} />
        <Route path="tools" element={<ToolsScene />} />
        <Route path="tools/:group" element={<ToolsScene />} />
        <Route path="tools/:group/:slug" element={<ToolDetailScene />} />
        <Route path="links" element={<LinksScene />} />
        <Route path="feed" element={<FeedScene />} />
        <Route path="notes" element={<NotesScene />} />
        <Route path="notes/:slug" element={<NotesScene />} />
        <Route
          path="admin"
          element={
            <Suspense fallback={null}>
              <AdminScene />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundScene />} />
      </Route>
    </Routes>
  )
}
