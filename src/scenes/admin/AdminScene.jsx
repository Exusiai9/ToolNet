import { useMemo, useState } from 'react'
import { groups, disciplines } from '../../data/tools'
import {
  useTools,
  addTool,
  updateTool,
  deleteTool,
  resetTools,
  isOverridden,
  exportToolsCode,
} from '../../data/toolStore'
import './AdminScene.css'

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
const groupName = (id) => groups.find((g) => g.id === id)?.name ?? id
const subName = (gid, sid) =>
  groups.find((g) => g.id === gid)?.subcats.find((s) => s.id === sid)?.name ?? sid

const emptyDraft = () => ({
  name: '',
  url: '',
  group: groups[0].id,
  subcat: groups[0].subcats[0].id,
  desc: '',
  disciplines: [],
  tags: [],
})

/**
 * 工具在线编辑(隐藏路由 #/admin,单人自用)。
 * 增删改即时存入 localStorage 并刷新页面;「导出」生成可贴回 tools.js 的代码。
 */
export default function AdminScene() {
  const tools = useTools()
  const [q, setQ] = useState('')
  const [groupFilter, setGroupFilter] = useState('all')
  const [draft, setDraft] = useState(null) // 正在编辑/新增的对象
  const [originalUrl, setOriginalUrl] = useState(null) // 编辑时原 url(null=新增)
  const [exportText, setExportText] = useState(null)

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return tools.filter(
      (x) =>
        (groupFilter === 'all' || x.group === groupFilter) &&
        (!t ||
          x.name.toLowerCase().includes(t) ||
          x.url.toLowerCase().includes(t) ||
          x.desc.toLowerCase().includes(t)),
    )
  }, [tools, q, groupFilter])

  const startNew = () => {
    setDraft(emptyDraft())
    setOriginalUrl(null)
  }
  const startEdit = (t) => {
    setDraft({ ...t, disciplines: [...(t.disciplines || [])], tags: [...(t.tags || [])] })
    setOriginalUrl(t.url)
  }
  const cancel = () => {
    setDraft(null)
    setOriginalUrl(null)
  }
  const save = () => {
    const name = draft.name.trim()
    const url = draft.url.trim()
    if (!name || !url) {
      window.alert('名称和网址必填')
      return
    }
    if (tools.some((t) => t.url === url && t.url !== originalUrl)) {
      window.alert('该网址已存在')
      return
    }
    if (originalUrl) updateTool(originalUrl, draft)
    else addTool(draft)
    cancel()
  }
  const remove = (t) => {
    if (window.confirm(`删除「${t.name}」?`)) deleteTool(t.url)
  }

  const groupObj = draft && groups.find((g) => g.id === draft.group)

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportText)
      window.alert('已复制')
    } catch {
      /* 用户手动选择复制 */
    }
  }

  return (
    <div className="admin">
      <div className="admin__head">
        <div>
          <span className="admin__crumb mono">TOOLNET :// ADMIN</span>
          <h1 className="admin__title">工具编辑</h1>
        </div>
        <span className={`admin__badge mono${isOverridden() ? ' admin__badge--on' : ''}`}>
          {isOverridden() ? '本机草稿' : '同源数据'} · {tools.length} 条
        </span>
      </div>

      <div className="admin__bar">
        <button className="admin__btn admin__btn--primary" onClick={startNew}>
          + 新增工具
        </button>
        <input
          className="admin__search"
          placeholder="搜索名称 / 网址…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="admin__select"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        >
          <option value="all">全部大类</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <span className="admin__spacer" />
        <button className="admin__btn" onClick={() => setExportText(exportToolsCode())}>
          导出
        </button>
        {isOverridden() && (
          <button
            className="admin__btn admin__btn--danger"
            onClick={() => {
              if (window.confirm('丢弃本机所有改动,恢复到代码里的数据?')) resetTools()
            }}
          >
            重置
          </button>
        )}
      </div>

      {draft && (
        <ToolForm
          draft={draft}
          setDraft={setDraft}
          groupObj={groupObj}
          isEdit={!!originalUrl}
          onSave={save}
          onCancel={cancel}
        />
      )}

      <div className="admin__list">
        {filtered.map((t) => (
          <div className="admin__row" key={t.url}>
            <img
              className="admin__fav"
              src={`https://www.google.com/s2/favicons?domain=${hostOf(t.url)}&sz=32`}
              alt=""
              loading="lazy"
            />
            <div className="admin__rowmain">
              <span className="admin__rowname">{t.name}</span>
              <span className="admin__rowmeta mono">
                {groupName(t.group)} / {subName(t.group, t.subcat)} · {hostOf(t.url)}
              </span>
            </div>
            <button className="admin__mini" onClick={() => startEdit(t)}>
              编辑
            </button>
            <button className="admin__mini admin__mini--danger" onClick={() => remove(t)}>
              删除
            </button>
          </div>
        ))}
        {filtered.length === 0 && <p className="admin__empty mono">// 无匹配</p>}
      </div>

      {exportText != null && (
        <div className="admin__export">
          <div className="admin__export-head">
            <span className="mono">
              复制全部 → 替换 src/data/tools.js 里的 export const tools = […] 整块 → 提交
            </span>
            <span>
              <button className="admin__btn" onClick={copyExport}>
                复制
              </button>
              <button className="admin__btn" onClick={() => setExportText(null)}>
                关闭
              </button>
            </span>
          </div>
          <textarea className="admin__export-text mono" readOnly value={exportText} />
        </div>
      )}
    </div>
  )
}

function ToolForm({ draft, setDraft, groupObj, isEdit, onSave, onCancel }) {
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }))
  const toggleDisc = (id) =>
    setDraft((d) => ({
      ...d,
      disciplines: d.disciplines.includes(id)
        ? d.disciplines.filter((x) => x !== id)
        : [...d.disciplines, id],
    }))

  return (
    <div className="admin__form">
      <div className="admin__form-grid">
        <label className="admin__field">
          <span>名称 *</span>
          <input value={draft.name} onChange={(e) => set('name', e.target.value)} />
        </label>
        <label className="admin__field">
          <span>网址 *</span>
          <input
            value={draft.url}
            placeholder="https://"
            onChange={(e) => set('url', e.target.value)}
          />
        </label>
        <label className="admin__field admin__field--wide">
          <span>描述</span>
          <input value={draft.desc} onChange={(e) => set('desc', e.target.value)} />
        </label>
        <label className="admin__field">
          <span>大类</span>
          <select
            value={draft.group}
            onChange={(e) => {
              const g = groups.find((x) => x.id === e.target.value)
              setDraft((d) => ({ ...d, group: g.id, subcat: g.subcats[0].id }))
            }}
          >
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <label className="admin__field">
          <span>子类</span>
          <select value={draft.subcat} onChange={(e) => set('subcat', e.target.value)}>
            {groupObj.subcats.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="admin__field admin__field--wide">
          <span>标签(逗号分隔)</span>
          <input
            value={draft.tags.join(', ')}
            onChange={(e) =>
              set(
                'tags',
                e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        </label>
      </div>

      <div className="admin__disc">
        <span className="admin__disc-label">学科</span>
        {disciplines.map((d) => (
          <button
            key={d.id}
            type="button"
            className={`admin__chip${draft.disciplines.includes(d.id) ? ' admin__chip--on' : ''}`}
            onClick={() => toggleDisc(d.id)}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="admin__form-actions">
        <button className="admin__btn admin__btn--primary" onClick={onSave}>
          {isEdit ? '保存修改' : '添加'}
        </button>
        <button className="admin__btn" onClick={onCancel}>
          取消
        </button>
      </div>
    </div>
  )
}
