// ============================================================
//  TOOLNET · 数据源
//  想增删工具，只需修改下面两个数组即可，页面会自动更新。
//  - categories: 分类（id 唯一，code 是侧栏显示的编号/缩写）
//  - tools: 每个工具引用一个 category id
//  网站图标会自动根据网址抓取，无需手动填。
// ============================================================

export const categories = [
  { id: 'ai',         name: 'AI 智能',   code: 'AI', desc: '大模型 · 生成式工具' },
  { id: 'dev',        name: '开发',       code: 'DEV', desc: '代码 · 部署 · 文档' },
  { id: 'design',     name: '设计',       code: 'DSN', desc: '界面 · 素材 · 配色' },
  { id: 'productivity', name: '效率',     code: 'PRD', desc: '协作 · 笔记 · 处理' },
  { id: 'reference',  name: '参考',       code: 'REF', desc: '查询 · 翻译 · 资讯' },
  { id: 'media',      name: '媒体',       code: 'MED', desc: '影音 · 图库 · 娱乐' },
]

export const tools = [
  // ---------- AI ----------
  { name: 'ChatGPT',     url: 'https://chat.openai.com',        category: 'ai',  desc: 'OpenAI 对话助手' },
  { name: 'Claude',      url: 'https://claude.ai',              category: 'ai',  desc: 'Anthropic 智能助手' },
  { name: 'Gemini',      url: 'https://gemini.google.com',      category: 'ai',  desc: 'Google 多模态模型' },
  { name: 'Perplexity',  url: 'https://www.perplexity.ai',      category: 'ai',  desc: 'AI 搜索引擎' },
  { name: 'Midjourney',  url: 'https://www.midjourney.com',     category: 'ai',  desc: 'AI 图像生成' },
  { name: 'Hugging Face',url: 'https://huggingface.co',         category: 'ai',  desc: '开源模型社区' },

  // ---------- 开发 ----------
  { name: 'GitHub',         url: 'https://github.com',                 category: 'dev', desc: '代码托管与协作' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com',          category: 'dev', desc: '编程问答社区' },
  { name: 'MDN',            url: 'https://developer.mozilla.org',      category: 'dev', desc: 'Web 开发文档' },
  { name: 'CodePen',        url: 'https://codepen.io',                 category: 'dev', desc: '前端在线演示' },
  { name: 'Vercel',         url: 'https://vercel.com',                 category: 'dev', desc: '前端部署平台' },
  { name: 'npm',            url: 'https://www.npmjs.com',              category: 'dev', desc: 'Node 包仓库' },
  { name: 'Can I use',      url: 'https://caniuse.com',                category: 'dev', desc: '浏览器兼容查询' },
  { name: 'Regex101',       url: 'https://regex101.com',               category: 'dev', desc: '正则在线调试' },

  // ---------- 设计 ----------
  { name: 'Figma',        url: 'https://figma.com',                    category: 'design', desc: '协同界面设计' },
  { name: 'Dribbble',     url: 'https://dribbble.com',                 category: 'design', desc: '设计灵感社区' },
  { name: 'Behance',      url: 'https://behance.net',                  category: 'design', desc: '创意作品集' },
  { name: 'Coolors',      url: 'https://coolors.co',                   category: 'design', desc: '快速配色方案' },
  { name: 'Google Fonts', url: 'https://fonts.google.com',             category: 'design', desc: '免费字体库' },
  { name: 'Iconify',      url: 'https://icon-sets.iconify.design',     category: 'design', desc: '海量图标集' },

  // ---------- 效率 ----------
  { name: 'Notion',     url: 'https://notion.so',          category: 'productivity', desc: '一体化笔记协作' },
  { name: 'Excalidraw', url: 'https://excalidraw.com',     category: 'productivity', desc: '手绘风白板' },
  { name: 'Trello',     url: 'https://trello.com',         category: 'productivity', desc: '看板任务管理' },
  { name: 'TinyPNG',    url: 'https://tinypng.com',        category: 'productivity', desc: '图片智能压缩' },
  { name: 'Google Drive', url: 'https://drive.google.com', category: 'productivity', desc: '云端文件存储' },

  // ---------- 参考 ----------
  { name: 'Wikipedia',    url: 'https://wikipedia.org',              category: 'reference', desc: '自由百科全书' },
  { name: 'DeepL',        url: 'https://www.deepl.com/translator',   category: 'reference', desc: '高质量翻译' },
  { name: 'Wolfram Alpha',url: 'https://www.wolframalpha.com',       category: 'reference', desc: '计算知识引擎' },
  { name: 'Hacker News',  url: 'https://news.ycombinator.com',       category: 'reference', desc: '科技资讯社区' },

  // ---------- 媒体 ----------
  { name: 'YouTube',  url: 'https://youtube.com',   category: 'media', desc: '全球视频平台' },
  { name: 'Bilibili', url: 'https://bilibili.com',  category: 'media', desc: '弹幕视频社区' },
  { name: 'Spotify',  url: 'https://spotify.com',   category: 'media', desc: '流媒体音乐' },
  { name: 'Unsplash', url: 'https://unsplash.com',  category: 'media', desc: '免费高清图库' },
]
