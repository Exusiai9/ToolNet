// ============================================================
// 工具数据 —— 二级结构(大类 group → 子类 subcat)+ 学科横切筛选(disciplines)
//
// 维护说明:
//   1) groups      左栏大类(按「用途」切,对所有学科通用);subcats 为页面内分区
//   2) disciplines 顶部学科筛选 chips(横切过滤,一个工具可属多个学科)
//   3) tools       每条工具引用 group + subcat;disciplines 数组喂 chips;tags 留作搜索/标注
//   网站图标会自动根据网址抓取,无需手动填。
// ============================================================

// —— 学科(横切筛选)——
export const disciplines = [
  { id: 'visual',     name: '视觉平面' },
  { id: 'uiux',       name: 'UX/UI' },
  { id: 'industrial', name: '工业产品' },
  { id: 'hardware',   name: '硬件电子' },
  { id: 'game',       name: '游戏' },
  { id: 'art',        name: '艺术插画' },
  { id: '3d',         name: '3D/CG' },
  { id: 'motion',     name: '动效' },
  { id: 'code',       name: '创意编程' },
]

// —— 大类(左栏)+ 子类(分区)——
export const groups = [
  {
    id: 'inspiration', name: '灵感', code: 'INS', desc: '画廊 · 资讯 · 案例',
    subcats: [
      { id: 'gallery', name: '视觉库 · 画廊' },
      { id: 'news',    name: '资讯 · 趋势' },
      { id: 'cases',   name: '案例 · 作品集' },
    ],
  },
  {
    id: 'assets', name: '素材', code: 'AST', desc: '图库 · 字体 · 模型',
    subcats: [
      { id: 'photos',   name: '图库 · 摄影' },
      { id: 'fonts',    name: '字体 · 排版' },
      { id: 'icons',    name: '图标 · 插画 · 矢量' },
      { id: 'models3d', name: '3D 模型 · 材质 · HDRI' },
      { id: 'brushes',  name: '笔刷 · 纹理 · 样机' },
      { id: 'audio',    name: '音效 · 动效素材' },
    ],
  },
  {
    id: 'toolkit', name: '软件 · 工具', code: 'TLK', desc: '软件 · 三维 · 工具',
    subcats: [
      { id: 'software', name: '创作软件' },
      { id: 'three',    name: '三维 · CG' },
      { id: 'cad',      name: '工程 · CAD' },
      { id: 'engine',   name: '引擎 · 编程' },
      { id: 'utility',  name: '实用小工具' },
    ],
  },
  {
    id: 'ai', name: 'AI', code: 'AIX', desc: '生成 · 助手 · 改图',
    subcats: [
      { id: 'imagegen',  name: '图像生成' },
      { id: 'assistant', name: 'AI 助手 · 写作' },
      { id: 'edit',      name: 'AI 改图(抠图 · 扩图 · 放大)' },
      { id: 'media3d',   name: 'AI 3D · 视频 · 音频' },
    ],
  },
  {
    id: 'learn', name: '学习 · 社区', code: 'LRN', desc: '教程 · 社区 · 规范',
    subcats: [
      { id: 'tutorials', name: '教程 · 课程' },
      { id: 'community', name: '社区 · 论坛' },
      { id: 'systems',   name: '设计系统 · 规范' },
      { id: 'theory',    name: '理论 · 书单' },
    ],
  },
  {
    id: 'make', name: '制作 · 交付', code: 'MAK', desc: '协作 · 打样 · 托管',
    subcats: [
      { id: 'collab',  name: '协作 · 白板' },
      { id: 'handoff', name: '切图 · 转代码 · 标注' },
      { id: 'fab',     name: '打样 · 制造' },
      { id: 'host',    name: '演示 · 作品集托管' },
    ],
  },
]

// —— 工具(跨学科代表性条目;后续随意增删)——
export const tools = [
  // ===== 灵感 =====
  { name: 'ArtStation', url: 'https://www.artstation.com', group: 'inspiration', subcat: 'gallery', desc: '游戏 / 影视 / 概念艺术作品平台', disciplines: ['game', 'art', '3d'], tags: ['作品平台'] },
  { name: 'Behance', url: 'https://www.behance.net', group: 'inspiration', subcat: 'gallery', desc: 'Adobe 综合创意作品社区', disciplines: ['visual', 'uiux', 'art'], tags: [] },
  { name: 'Dribbble', url: 'https://dribbble.com', group: 'inspiration', subcat: 'gallery', desc: 'UI / 视觉设计灵感快照', disciplines: ['uiux', 'visual'], tags: [] },
  { name: 'Cosmos', url: 'https://www.cosmos.so', group: 'inspiration', subcat: 'gallery', desc: '高质量视觉灵感收集墙', disciplines: ['visual', 'art'], tags: [] },
  { name: 'Are.na', url: 'https://www.are.na', group: 'inspiration', subcat: 'gallery', desc: '研究式灵感整理与连接', disciplines: ['art', 'visual'], tags: [] },
  { name: 'Core77', url: 'https://www.core77.com', group: 'inspiration', subcat: 'news', desc: '工业设计资讯与评论', disciplines: ['industrial'], tags: [] },
  { name: 'Yanko Design', url: 'https://www.yankodesign.com', group: 'inspiration', subcat: 'news', desc: '产品 / 工业设计概念资讯', disciplines: ['industrial'], tags: [] },
  { name: 'Hackaday', url: 'https://hackaday.com', group: 'inspiration', subcat: 'news', desc: '硬件 / 电子 / Maker 项目资讯', disciplines: ['hardware'], tags: [] },
  { name: '80 Level', url: 'https://80.lv', group: 'inspiration', subcat: 'news', desc: '游戏美术与 3D 制作资讯', disciplines: ['game', '3d'], tags: [] },
  { name: 'Awwwards', url: 'https://www.awwwards.com', group: 'inspiration', subcat: 'cases', desc: '网页设计获奖案例', disciplines: ['uiux', 'visual'], tags: ['案例'] },
  { name: 'SiteInspire', url: 'https://www.siteinspire.com', group: 'inspiration', subcat: 'cases', desc: '精选网页设计案例库', disciplines: ['uiux'], tags: [] },

  // ===== 素材 =====
  { name: 'Unsplash', url: 'https://unsplash.com', group: 'assets', subcat: 'photos', desc: '免费高清摄影图库', disciplines: ['visual'], tags: ['免费'] },
  { name: 'Pexels', url: 'https://www.pexels.com', group: 'assets', subcat: 'photos', desc: '免费图片与视频素材', disciplines: ['visual', 'motion'], tags: ['免费'] },
  { name: 'Google Fonts', url: 'https://fonts.google.com', group: 'assets', subcat: 'fonts', desc: '免费可商用网络字体', disciplines: ['visual', 'uiux'], tags: ['免费'] },
  { name: 'Fontshare', url: 'https://www.fontshare.com', group: 'assets', subcat: 'fonts', desc: '免费商用高质量字体', disciplines: ['visual'], tags: ['免费'] },
  { name: 'Iconify', url: 'https://icon-sets.iconify.design', group: 'assets', subcat: 'icons', desc: '聚合 20 万+ 开源图标', disciplines: ['uiux', 'visual'], tags: [] },
  { name: 'unDraw', url: 'https://undraw.co', group: 'assets', subcat: 'icons', desc: '可改色的开源矢量插画', disciplines: ['uiux', 'art'], tags: ['免费'] },
  { name: 'Poly Haven', url: 'https://polyhaven.com', group: 'assets', subcat: 'models3d', desc: '免费 HDRI / 材质 / 模型', disciplines: ['3d', 'game'], tags: ['免费'] },
  { name: 'Sketchfab', url: 'https://sketchfab.com', group: 'assets', subcat: 'models3d', desc: '3D 模型发布与下载平台', disciplines: ['3d', 'game'], tags: [] },
  { name: 'Quixel Megascans', url: 'https://quixel.com/megascans', group: 'assets', subcat: 'models3d', desc: '高精度扫描材质与资产', disciplines: ['3d', 'game'], tags: [] },
  { name: 'LottieFiles', url: 'https://lottiefiles.com', group: 'assets', subcat: 'audio', desc: '轻量矢量动效素材', disciplines: ['motion', 'uiux'], tags: [] },
  { name: 'Freesound', url: 'https://freesound.org', group: 'assets', subcat: 'audio', desc: '协作式音效素材库', disciplines: ['game', 'motion'], tags: ['免费'] },

  // ===== 软件 · 工具 =====
  { name: 'Figma', url: 'https://www.figma.com', group: 'toolkit', subcat: 'software', desc: '协作式界面设计工具', disciplines: ['uiux', 'visual'], tags: [] },
  { name: 'Procreate', url: 'https://procreate.com', group: 'toolkit', subcat: 'software', desc: 'iPad 数字绘画软件', disciplines: ['art'], tags: [] },
  { name: 'Affinity', url: 'https://affinity.serif.com', group: 'toolkit', subcat: 'software', desc: '一次买断的设计套件', disciplines: ['visual'], tags: [] },
  { name: 'Blender', url: 'https://www.blender.org', group: 'toolkit', subcat: 'three', desc: '开源全流程 3D 软件', disciplines: ['3d', 'game', 'motion'], tags: ['免费'] },
  { name: 'Spline', url: 'https://spline.design', group: 'toolkit', subcat: 'three', desc: '网页友好的交互 3D 设计', disciplines: ['3d', 'uiux'], tags: [] },
  { name: 'ZBrush', url: 'https://www.maxon.net/zbrush', group: 'toolkit', subcat: 'three', desc: '高精度数字雕刻', disciplines: ['3d', 'art', 'game'], tags: [] },
  { name: 'Fusion 360', url: 'https://www.autodesk.com/products/fusion-360', group: 'toolkit', subcat: 'cad', desc: '云端工业 / 机械 CAD', disciplines: ['industrial', 'hardware'], tags: [] },
  { name: 'Rhino', url: 'https://www.rhino3d.com', group: 'toolkit', subcat: 'cad', desc: 'NURBS 工业 / 建模', disciplines: ['industrial', '3d'], tags: [] },
  { name: 'KiCad', url: 'https://www.kicad.org', group: 'toolkit', subcat: 'cad', desc: '开源 PCB / 电路设计', disciplines: ['hardware'], tags: ['免费'] },
  { name: 'Unreal Engine', url: 'https://www.unrealengine.com', group: 'toolkit', subcat: 'engine', desc: '高品质实时游戏引擎', disciplines: ['game', '3d'], tags: [] },
  { name: 'Godot', url: 'https://godotengine.org', group: 'toolkit', subcat: 'engine', desc: '开源轻量游戏引擎', disciplines: ['game'], tags: ['免费'] },
  { name: 'TouchDesigner', url: 'https://derivative.ca', group: 'toolkit', subcat: 'engine', desc: '节点式实时视觉 / 创意编程', disciplines: ['code', 'motion'], tags: [] },
  { name: 'p5.js', url: 'https://p5js.org', group: 'toolkit', subcat: 'engine', desc: '面向创作者的 JS 创意编程', disciplines: ['code'], tags: ['免费'] },
  { name: 'Coolors', url: 'https://coolors.co', group: 'toolkit', subcat: 'utility', desc: '快速配色方案生成器', disciplines: ['visual', 'uiux'], tags: ['配色'] },
  { name: 'Squoosh', url: 'https://squoosh.app', group: 'toolkit', subcat: 'utility', desc: '浏览器内图片压缩转换', disciplines: ['uiux', 'visual'], tags: ['免费'] },

  // ===== AI =====
  { name: 'Midjourney', url: 'https://www.midjourney.com', group: 'ai', subcat: 'imagegen', desc: '高质量 AI 图像生成', disciplines: ['art', 'visual', 'game'], tags: [] },
  { name: 'Civitai', url: 'https://civitai.com', group: 'ai', subcat: 'imagegen', desc: 'Stable Diffusion 模型社区', disciplines: ['art', 'game'], tags: [] },
  { name: 'Adobe Firefly', url: 'https://www.adobe.com/products/firefly.html', group: 'ai', subcat: 'imagegen', desc: '可商用 AI 创意生成', disciplines: ['visual', 'art'], tags: [] },
  { name: 'Claude', url: 'https://claude.ai', group: 'ai', subcat: 'assistant', desc: 'Anthropic 智能助手', disciplines: ['code'], tags: [] },
  { name: 'ChatGPT', url: 'https://chat.openai.com', group: 'ai', subcat: 'assistant', desc: 'OpenAI 对话与写作助手', disciplines: ['code'], tags: [] },
  { name: 'remove.bg', url: 'https://www.remove.bg', group: 'ai', subcat: 'edit', desc: '一键 AI 抠图去背景', disciplines: ['visual'], tags: [] },
  { name: 'Magnific', url: 'https://magnific.ai', group: 'ai', subcat: 'edit', desc: 'AI 超分辨率放大 / 重绘', disciplines: ['visual', 'art'], tags: [] },
  { name: 'Luma AI', url: 'https://lumalabs.ai', group: 'ai', subcat: 'media3d', desc: 'AI 3D 捕捉与视频生成', disciplines: ['3d', 'motion'], tags: [] },
  { name: 'Runway', url: 'https://runwayml.com', group: 'ai', subcat: 'media3d', desc: 'AI 视频生成与编辑', disciplines: ['motion'], tags: [] },

  // ===== 学习 · 社区 =====
  { name: 'Domestika', url: 'https://www.domestika.org', group: 'learn', subcat: 'tutorials', desc: '创意领域在线课程', disciplines: ['art', 'visual', '3d'], tags: [] },
  { name: 'School of Motion', url: 'https://www.schoolofmotion.com', group: 'learn', subcat: 'tutorials', desc: '动态设计系统课程', disciplines: ['motion'], tags: [] },
  { name: 'Polycount', url: 'https://polycount.com', group: 'learn', subcat: 'community', desc: '游戏美术 / 3D 社区', disciplines: ['game', '3d'], tags: [] },
  { name: 'Material Design', url: 'https://m3.material.io', group: 'learn', subcat: 'systems', desc: 'Google 设计系统规范', disciplines: ['uiux'], tags: [] },
  { name: 'Apple HIG', url: 'https://developer.apple.com/design/human-interface-guidelines', group: 'learn', subcat: 'systems', desc: 'Apple 人机界面指南', disciplines: ['uiux'], tags: [] },
  { name: 'Nielsen Norman', url: 'https://www.nngroup.com', group: 'learn', subcat: 'theory', desc: 'UX 研究与可用性理论', disciplines: ['uiux'], tags: [] },

  // ===== 制作 · 交付 =====
  { name: 'FigJam', url: 'https://www.figma.com/figjam', group: 'make', subcat: 'collab', desc: '在线协作白板', disciplines: ['uiux'], tags: [] },
  { name: 'Miro', url: 'https://miro.com', group: 'make', subcat: 'collab', desc: '团队协作白板与流程', disciplines: ['uiux', 'industrial'], tags: [] },
  { name: 'Zeplin', url: 'https://zeplin.io', group: 'make', subcat: 'handoff', desc: '设计标注与开发交付', disciplines: ['uiux'], tags: [] },
  { name: 'JLCPCB', url: 'https://jlcpcb.com', group: 'make', subcat: 'fab', desc: 'PCB 打样与制造', disciplines: ['hardware'], tags: [] },
  { name: 'Shapeways', url: 'https://www.shapeways.com', group: 'make', subcat: 'fab', desc: '3D 打印按需制造', disciplines: ['industrial', '3d'], tags: [] },
  { name: 'Framer', url: 'https://www.framer.com', group: 'make', subcat: 'host', desc: '设计即发布的建站工具', disciplines: ['uiux'], tags: [] },
  { name: 'Cargo', url: 'https://cargo.site', group: 'make', subcat: 'host', desc: '创意作品集托管', disciplines: ['art', 'visual'], tags: [] },
]

// 由工具名生成稳定 slug —— 用于档案页路由 /tools/:group/:slug
export const toolSlug = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
