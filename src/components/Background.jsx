import './Background.css'

/** 全屏装饰背景：网格 + 辉光 + 扫描线 + 噪点 */
export default function Background() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow--1" />
      <div className="bg-glow bg-glow--2" />
      <div className="bg-scan" />
      <div className="bg-vignette" />
    </div>
  )
}
