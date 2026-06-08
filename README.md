# TOOLNET // 工具集合终端

> 个人常用工具网站导航站。工业科技视觉风格，参考了《明日方舟》官网（[ak.hypergryph.com](https://ak.hypergryph.com/)）的设计语言：深色底、明黄强调色、切角几何、等宽技术标注与交错入场动效。

![tech](https://img.shields.io/badge/React-19-61dafb) ![tech](https://img.shields.io/badge/Vite-8-646cff) ![tech](https://img.shields.io/badge/GSAP-anim-88ce02)

## ✨ 功能

- **分类导航** — 左侧栏按 AI / 开发 / 设计 / 效率 / 参考 / 媒体 等扇区切换
- **全局搜索** — 顶栏实时搜索，跨分类匹配名称 / 描述 / 网址
- **自动图标** — 卡片站点图标自动抓取，失败时回退为首字母
- **动效** — 基于 GSAP 的入场与切换交错动画，并尊重 `prefers-reduced-motion`
- **响应式** — 窄屏自动将侧栏折叠为顶部导航

## 🛠 技术栈

- React 19 + Vite 8
- GSAP + @gsap/react（`useGSAP`）
- 原生 CSS（设计令牌集中在 `src/index.css` 的 `:root`）

## 🚀 本地运行

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本到 dist/
npm run preview  # 预览构建结果
```

## ✏️ 增删工具

所有数据集中在 [`src/data/tools.js`](src/data/tools.js)，无需改动组件即可维护：

```js
// 1) 分类（id 唯一，code 为侧栏缩写）
export const categories = [
  { id: 'ai', name: 'AI 智能', code: 'AI', desc: '大模型 · 生成式工具' },
  // ...
]

// 2) 工具（category 引用上面的分类 id；图标自动抓取，无需填）
export const tools = [
  { name: 'Claude', url: 'https://claude.ai', category: 'ai', desc: 'Anthropic 智能助手' },
  // ...
]
```

## 🎨 换肤

主题色与字体等令牌都在 `src/index.css` 的 `:root` 中，例如把强调色从方舟黄换成别的：

```css
:root {
  --accent: #ffcf2b; /* 改这里即可全局换色 */
}
```

## 📁 目录结构

```
src/
  data/tools.js          # ← 工具与分类数据（最常改的文件）
  components/
    Background.jsx        # 网格 / 辉光 / 扫描线背景
    Sidebar.jsx           # 左侧品牌 + 分类导航
    Topbar.jsx            # 搜索 + 实时时钟
    Hero.jsx              # 首屏主视觉
    ToolCard.jsx          # 工具卡片
    Footer.jsx            # 页脚
  App.jsx                 # 组合 + 过滤逻辑 + GSAP 动效
  index.css               # 全局样式与设计令牌
```

---

© TOOLNET · 个人项目
