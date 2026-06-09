import { useSyncExternalStore } from 'react'
import { tools as baseTools } from './tools'

// ============================================================
// 工具数据 store —— 在线编辑用(单人自用)
//   · 基线来自 tools.js;编辑后以「整份快照」存入 localStorage 覆盖基线
//   · 仅影响本机浏览器;想固化到仓库 → exportToolsCode() 贴回 tools.js 提交
//   · useTools() 订阅变化,编辑后页面即时刷新
// ============================================================

const KEY = 'toolnet.tools.v1'
const hasLS = typeof window !== 'undefined' && !!window.localStorage

function read() {
  if (!hasLS) return null
  try {
    const arr = JSON.parse(window.localStorage.getItem(KEY) || 'null')
    return Array.isArray(arr) ? arr : null
  } catch {
    return null
  }
}

let cache = read() // null = 用基线
const listeners = new Set()
const emit = () => listeners.forEach((l) => l())

export function subscribeTools(l) {
  listeners.add(l)
  return () => listeners.delete(l)
}
export function getTools() {
  return cache ?? baseTools
}
export function isOverridden() {
  return cache != null
}

function commit(arr) {
  cache = arr
  if (hasLS) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(arr))
    } catch {
      /* 配额/隐私模式下静默失败,内存仍生效 */
    }
  }
  emit()
}

function normalize(t) {
  const out = {
    name: (t.name || '').trim(),
    url: (t.url || '').trim(),
    group: t.group,
    subcat: t.subcat,
    desc: (t.desc || '').trim(),
    disciplines: Array.isArray(t.disciplines) ? t.disciplines : [],
    tags: Array.isArray(t.tags) ? t.tags : [],
  }
  if (t.about && t.about.trim()) out.about = t.about.trim()
  return out
}

export function addTool(tool) {
  commit([...getTools(), normalize(tool)])
}
export function updateTool(originalUrl, tool) {
  commit(getTools().map((t) => (t.url === originalUrl ? normalize(tool) : t)))
}
export function deleteTool(url) {
  commit(getTools().filter((t) => t.url !== url))
}
export function resetTools() {
  cache = null
  if (hasLS) {
    try {
      window.localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }
  emit()
}

// —— 导出为可贴回 tools.js 的代码 ——
const q = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
const arr = (a) => '[' + (a || []).map(q).join(', ') + ']'

export function exportToolsCode() {
  const body = getTools()
    .map((t) => {
      let line = `  { name: ${q(t.name)}, url: ${q(t.url)}, group: ${q(t.group)}, subcat: ${q(t.subcat)}, desc: ${q(t.desc)}, disciplines: ${arr(t.disciplines)}, tags: ${arr(t.tags)}`
      line += t.about ? `, about: ${q(t.about)} },` : ' },'
      return line
    })
    .join('\n')
  return `export const tools = [\n${body}\n]\n`
}

// React 订阅 hook —— getTools 返回稳定引用(commit 时整体替换),适配 useSyncExternalStore
export function useTools() {
  return useSyncExternalStore(subscribeTools, getTools, getTools)
}
