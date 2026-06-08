import ScenePlaceholder from '../components/ui/ScenePlaceholder'

// 主题化 404 扇区
export default function NotFoundScene() {
  return (
    <ScenePlaceholder
      code="404"
      name="信号丢失"
      title="SECTOR NOT FOUND"
      status="NO_SIGNAL // 该扇区不存在"
      desc="请从左侧导航栏选择一个有效扇区。"
    />
  )
}
