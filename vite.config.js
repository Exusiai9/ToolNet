import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 部署到 GitHub Pages 的项目页（https://<user>.github.io/ToolNet/）需要设置 base，
// 本地开发仍保持根路径 '/'。
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ToolNet/' : '/',
  plugins: [react()],
}))
