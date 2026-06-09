/**
 * 顶层扇区(SECTOR)导航模型 —— 中转站的一级结构。
 * 改动顺序 / 命名只需在这里维护,TopNav 与路由表都据此渲染。
 *   id    与路由 path 对应的标识
 *   path  HashRouter 路径
 *   code  技术缩写(方舟风)
 *   en    顶栏主标(英文)
 *   name  顶栏副标(中文)
 *   desc  辅助描述
 */
export const sectors = [
  { id: 'home',  path: '/home',  code: 'HUB', en: 'HOME',  name: '主页', desc: '身份 · 状态' },
  { id: 'tools', path: '/tools', code: 'TLS', en: 'TOOLS', name: '工具', desc: '工具集合' },
  { id: 'links', path: '/links', code: 'LNK', en: 'LINKS', name: '导航', desc: '书签 · 外链' },
  { id: 'feed',  path: '/feed',  code: 'FED', en: 'FEED',  name: '动态', desc: '信息流' },
  { id: 'notes', path: '/notes', code: 'NTS', en: 'NOTES', name: '笔记', desc: '博客 · 日志' },
]
