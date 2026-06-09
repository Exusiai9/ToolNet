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
    id: 'inspiration', name: '灵感', code: 'INS', desc: '画廊 · 影视参考 · 资讯',
    subcats: [
      { id: 'gallery', name: '视觉库 · 画廊' },
      { id: 'frames',  name: '画面 · 影视参考' },
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
      { id: 'design',    name: 'AI 设计工具' },
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
  { name: 'Pinterest', url: 'https://www.pinterest.com', group: 'inspiration', subcat: 'gallery', desc: '灵感推荐 · 情绪板神器', disciplines: ['art', 'visual', 'uiux'], tags: ['情绪板', '灵感'] },
  { name: '花瓣网', url: 'https://huaban.com', group: 'inspiration', subcat: 'gallery', desc: '国内灵感采集 · 情绪板', disciplines: ['art', 'visual', 'uiux'], tags: ['情绪板', '国内'] },
  { name: 'Pixiv', url: 'https://www.pixiv.net', group: 'inspiration', subcat: 'gallery', desc: '日系插画社区 · 搜「背景 / 風景」', disciplines: ['art'], tags: ['日系', '插画'] },
  // —— 画面 · 影视参考 ——
  { name: 'FilmGrab', url: 'https://film-grab.com', group: 'inspiration', subcat: 'frames', desc: '电影截图参考库 · 按导演 / 年份分类', disciplines: ['art', 'game', 'motion'], tags: ['影视', '构图', '配色'] },
  { name: 'Shotdeck', url: 'https://shotdeck.com', group: 'inspiration', subcat: 'frames', desc: '好莱坞电影画面搜索 · 标签筛选', disciplines: ['art', 'game', 'motion'], tags: ['影视', '参考', '付费'] },
  { name: 'Animation Screencaps', url: 'https://animationscreencaps.com', group: 'inspiration', subcat: 'frames', desc: '动画电影截图(迪士尼 / 吉卜力等)', disciplines: ['art', 'motion', 'game'], tags: ['动画', '背景美术'] },
  { name: '500px', url: 'https://500px.com', group: 'inspiration', subcat: 'frames', desc: '顶尖摄影师社区 · 风光 / 街拍参考', disciplines: ['art', 'visual'], tags: ['摄影', '光影'] },
  { name: 'MapCrunch', url: 'https://www.mapcrunch.com', group: 'inspiration', subcat: 'frames', desc: '随机街景 · 场景速写练习', disciplines: ['art', 'game'], tags: ['街景', '速写'] },
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

  // ===== 从 Edge 收藏导入(已去重 / 排除敏感与个人项;深链已规整为主页)=====
  // —— 灵感 ——
  { name: 'Design Burger', url: 'https://www.designburger.com', group: 'inspiration', subcat: 'gallery', desc: '设计灵感聚合', disciplines: ['uiux', 'visual'], tags: [] },
  { name: 'DesignUplift', url: 'https://www.designuplift.com', group: 'inspiration', subcat: 'gallery', desc: 'UI 设计灵感', disciplines: ['uiux'], tags: [] },
  { name: 'Aesthetics Wiki', url: 'https://aesthetics.fandom.com', group: 'inspiration', subcat: 'gallery', desc: '视觉美学风格百科', disciplines: ['art', 'visual'], tags: ['风格'] },
  { name: 'Frameset', url: 'https://frameset.app', group: 'inspiration', subcat: 'frames', desc: '画面参考搜索', disciplines: ['art'], tags: ['参考'] },
  { name: '解构图片', url: 'https://cloudcb.me', group: 'inspiration', subcat: 'frames', desc: '图片配色 / 构图分析', disciplines: ['art', 'visual'], tags: ['配色', '构图'] },
  { name: 'DOF Simulator', url: 'https://dofsimulator.net', group: 'inspiration', subcat: 'frames', desc: '景深 / 摄影参数模拟', disciplines: ['art', 'visual'], tags: ['摄影'] },
  { name: 'S.H.I.T Journal', url: 'https://shitjournal.org', group: 'inspiration', subcat: 'news', desc: '设计刊物 / 评论', disciplines: ['visual'], tags: [] },
  { name: 'The People\'s Design Library', url: 'https://docs.google.com/spreadsheets/d/1sFHNQKJ3H81nXiSPqslYurquBFJrU-X9qor14uXBueo/edit', group: 'inspiration', subcat: 'news', desc: '众包设计站点合集', disciplines: ['visual'], tags: ['合集'] },
  { name: 'Craighill', url: 'https://craighill.co', group: 'inspiration', subcat: 'cases', desc: '工业设计工作室', disciplines: ['industrial'], tags: ['工作室'] },
  { name: 'Whipsaw', url: 'https://www.whipsaw.com', group: 'inspiration', subcat: 'cases', desc: '工业设计工作室', disciplines: ['industrial'], tags: ['工作室'] },
  { name: 'Zimon 陈紫梦', url: 'https://www.zimon.cc', group: 'inspiration', subcat: 'cases', desc: '个人设计作品集', disciplines: ['visual'], tags: ['作品集'] },
  { name: 'Ezekiel Aquino', url: 'https://ezekielaquino.com', group: 'inspiration', subcat: 'cases', desc: '交互 / 创意作品集', disciplines: ['uiux', 'visual'], tags: ['作品集'] },

  // —— 素材 ——
  { name: '猫啃网', url: 'https://www.maoken.com', group: 'assets', subcat: 'fonts', desc: '免费商用中文字体', disciplines: ['visual'], tags: ['免费', '中文'] },
  { name: 'Flaticons', url: 'https://flaticons.net', group: 'assets', subcat: 'icons', desc: '免费图标库', disciplines: ['uiux', 'visual'], tags: ['免费'] },
  { name: 'SVG AI', url: 'https://www.svgai.org', group: 'assets', subcat: 'icons', desc: 'AI 生成 SVG 图标', disciplines: ['uiux'], tags: ['AI'] },
  { name: 'Freepik AI 图标', url: 'https://www.freepik.com/ai/icon-generator', group: 'assets', subcat: 'icons', desc: 'AI 图标生成', disciplines: ['visual'], tags: ['AI'] },
  { name: 'Galaxy.ai 图标', url: 'https://image.galaxy.ai/ai-icon-generator', group: 'assets', subcat: 'icons', desc: '免登录 AI 图标生成', disciplines: ['visual'], tags: ['AI'] },
  { name: 'Game-icons.net', url: 'https://game-icons.net', group: 'assets', subcat: 'icons', desc: '免费游戏图标', disciplines: ['game'], tags: ['免费'] },
  { name: 'GrabCAD', url: 'https://grabcad.com', group: 'assets', subcat: 'models3d', desc: '3D CAD 模型库', disciplines: ['industrial', '3d', 'hardware'], tags: [] },
  { name: '爱给网', url: 'https://www.aigei.com', group: 'assets', subcat: 'models3d', desc: '音效 / 3D / 视频素材', disciplines: ['game', 'motion', '3d'], tags: ['免费', '国内'] },
  { name: 'itch.io', url: 'https://itch.io', group: 'assets', subcat: 'models3d', desc: '独立游戏与素材', disciplines: ['game'], tags: [] },
  { name: 'Unreal 商城', url: 'https://www.unrealengine.com/marketplace', group: 'assets', subcat: 'models3d', desc: 'UE 游戏 / 渲染资产', disciplines: ['game', '3d'], tags: [] },
  { name: 'Unity 资源商店', url: 'https://assetstore.unity.com', group: 'assets', subcat: 'models3d', desc: 'Unity 2D / 3D 资源', disciplines: ['game', '3d'], tags: [] },
  { name: 'CraftPix', url: 'https://craftpix.net', group: 'assets', subcat: 'models3d', desc: '2D 游戏素材', disciplines: ['game', 'art'], tags: [] },
  { name: 'BOOTH', url: 'https://booth.pm', group: 'assets', subcat: 'models3d', desc: '独立艺术 / 素材集市', disciplines: ['art'], tags: [] },

  // —— 软件 · 工具 ——
  { name: '即时设计', url: 'https://js.design', group: 'toolkit', subcat: 'software', desc: '在线协作 UI 设计', disciplines: ['uiux'], tags: ['国内'] },
  { name: 'boardmix', url: 'https://boardmix.cn', group: 'toolkit', subcat: 'software', desc: '协作白板 / 创作', disciplines: ['uiux'], tags: [] },
  { name: 'Vizcom', url: 'https://www.vizcom.ai', group: 'toolkit', subcat: 'software', desc: '草图 → 渲染 AI', disciplines: ['industrial', 'art', '3d'], tags: ['AI'] },
  { name: 'Tinkercad', url: 'https://www.tinkercad.com', group: 'toolkit', subcat: 'software', desc: '入门 3D 建模 / 电子', disciplines: ['3d', 'hardware'], tags: [] },
  { name: 'Pixelmash', url: 'https://nevercenter.com/pixelmash', group: 'toolkit', subcat: 'software', desc: '像素美术 / 精灵编辑', disciplines: ['game', 'art'], tags: [] },
  { name: 'Autodesk 教育版', url: 'https://www.autodesk.com.cn/education/students', group: 'toolkit', subcat: 'software', desc: '学生免费设计软件', disciplines: ['industrial', '3d'], tags: ['免费'] },
  { name: '立创开源硬件', url: 'https://oshwhub.com', group: 'toolkit', subcat: 'cad', desc: '开源硬件 / PCB 平台', disciplines: ['hardware'], tags: ['国内'] },
  { name: 'Blueprint.am', url: 'https://www.blueprint.am', group: 'toolkit', subcat: 'cad', desc: 'AI 硬件设计工具', disciplines: ['hardware'], tags: ['AI'] },
  { name: 'Anime.js', url: 'https://animejs.com', group: 'toolkit', subcat: 'engine', desc: '轻量 JS 动效库', disciplines: ['code', 'motion'], tags: [] },
  { name: 'Strudel', url: 'https://strudel.cc', group: 'toolkit', subcat: 'engine', desc: '浏览器 Live Coding 编曲', disciplines: ['code', 'motion'], tags: [] },
  { name: 'Color Hunt', url: 'https://colorhunt.co', group: 'toolkit', subcat: 'utility', desc: '配色方案集', disciplines: ['visual', 'uiux'], tags: ['配色'] },
  { name: '画作配色', url: 'https://artsexperiments.withgoogle.com/artpalette/', group: 'toolkit', subcat: 'utility', desc: '名画取色(Google)', disciplines: ['art', 'visual'], tags: ['配色'] },
  { name: '抠抠图', url: 'https://www.koukoutu.com', group: 'toolkit', subcat: 'utility', desc: '免费在线 AI 抠图', disciplines: ['visual'], tags: [] },
  { name: 'FreeConvert', url: 'https://www.freeconvert.com', group: 'toolkit', subcat: 'utility', desc: '格式转换(图 / 视 / 音)', disciplines: ['uiux'], tags: [] },
  { name: '像素 Gif', url: 'http://pixelgif.cn', group: 'toolkit', subcat: 'utility', desc: '像素 GIF 素材 / 工具', disciplines: ['game', 'art'], tags: [] },
  { name: 'SauceNAO', url: 'https://www.saucenao.cn', group: 'toolkit', subcat: 'utility', desc: '以图搜源', disciplines: ['art'], tags: [] },
  { name: 'Inkarnate', url: 'https://inkarnate.com', group: 'toolkit', subcat: 'utility', desc: '在线奇幻地图绘制', disciplines: ['game', 'art'], tags: [] },
  { name: 'PixelMe', url: 'https://pixel-me.tokyo', group: 'toolkit', subcat: 'utility', desc: 'AI 像素画生成', disciplines: ['game', 'art'], tags: ['AI'] },
  { name: 'draw.io', url: 'https://app.diagrams.net', group: 'toolkit', subcat: 'utility', desc: '免费流程图 / 图表', disciplines: ['uiux'], tags: ['免费'] },
  { name: 'Datawrapper', url: 'https://www.datawrapper.de', group: 'toolkit', subcat: 'utility', desc: '图表 / 地图 / 表格', disciplines: ['uiux'], tags: [] },
  { name: 'ChartCube', url: 'https://chartcube.alipay.com', group: 'toolkit', subcat: 'utility', desc: '蚂蚁在线图表', disciplines: ['uiux'], tags: ['国内'] },
  { name: 'Charticulator', url: 'https://charticulator.com', group: 'toolkit', subcat: 'utility', desc: '自定义图表生成', disciplines: ['uiux'], tags: [] },
  { name: 'ChartCool', url: 'https://www.ichartcool.com', group: 'toolkit', subcat: 'utility', desc: '免费在线图表', disciplines: ['uiux'], tags: ['国内'] },
  { name: 'ImageGP', url: 'https://www.bic.ac.cn/ImageGP/', group: 'toolkit', subcat: 'utility', desc: '科研数据绘图', disciplines: ['uiux'], tags: ['科研'] },
  { name: 'PaperMe 纸由我', url: 'https://paperme.toolooz.com', group: 'toolkit', subcat: 'utility', desc: '自定义打印纸生成', disciplines: ['visual'], tags: [] },

  // —— AI ——
  { name: 'ModelScope 魔搭', url: 'https://www.modelscope.cn', group: 'ai', subcat: 'imagegen', desc: '魔搭模型社区', disciplines: ['art'], tags: ['国内'] },
  { name: '甲乙丙 AI', url: 'https://abcaigc.com', group: 'ai', subcat: 'imagegen', desc: 'AIGC 创作', disciplines: ['art', 'visual'], tags: [] },
  { name: 'Gemini', url: 'https://gemini.google.com', group: 'ai', subcat: 'assistant', desc: 'Google 多模态助手', disciplines: ['code'], tags: [] },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com', group: 'ai', subcat: 'assistant', desc: '深度求索对话助手', disciplines: ['code'], tags: ['国内'] },
  { name: 'Lovart', url: 'https://www.lovart.ai', group: 'ai', subcat: 'design', desc: '通用设计 Agent', disciplines: ['uiux', 'visual'], tags: [] },
  { name: 'Variant', url: 'https://variant.com', group: 'ai', subcat: 'design', desc: '无尽设计灵感生成', disciplines: ['uiux'], tags: [] },
  { name: 'MagicPath', url: 'https://www.magicpath.ai', group: 'ai', subcat: 'design', desc: '人机协作设计工作区', disciplines: ['uiux'], tags: [] },
  { name: 'Genpire', url: 'https://www.genpire.com', group: 'ai', subcat: 'design', desc: 'AI 工艺包(Tech Pack)', disciplines: ['industrial'], tags: [] },
  { name: 'AI 工具集', url: 'https://ai-bot.cn', group: 'ai', subcat: 'design', desc: 'AI 工具导航大全', disciplines: ['visual'], tags: ['导航', '国内'] },
  { name: 'MOGE', url: 'https://moge.ai', group: 'ai', subcat: 'design', desc: 'AI 素材 / 图库', disciplines: ['visual'], tags: [] },
  { name: 'FreeModel AI', url: 'https://freemodel.dev', group: 'ai', subcat: 'media3d', desc: 'AI 3D 模型生成', disciplines: ['3d'], tags: [] },

  // —— 学习 · 社区 ——
  { name: 'How to Make (Almost) Anything', url: 'https://ocw.mit.edu/courses/mas-863-how-to-make-almost-anything-fall-2002/', group: 'learn', subcat: 'tutorials', desc: 'MIT 万物制造名课', disciplines: ['hardware', 'industrial'], tags: ['课程'] },
  { name: 'MIT Learn', url: 'https://learn.mit.edu', group: 'learn', subcat: 'tutorials', desc: 'MIT 公开课平台', disciplines: ['code'], tags: ['课程'] },
  { name: 'Unreal 引擎学习', url: 'https://dev.epicgames.com/community/unreal-engine/learning', group: 'learn', subcat: 'tutorials', desc: 'UE 官方学习中心', disciplines: ['game', '3d'], tags: [] },
  { name: 'doyoudo', url: 'https://www.doyoudo.com', group: 'learn', subcat: 'tutorials', desc: '中文设计软件教程', disciplines: ['visual', 'motion'], tags: ['国内'] },
  { name: '你缺失的计算机课', url: 'https://www.criwits.top/missing/', group: 'learn', subcat: 'tutorials', desc: '计算机通识(Missing Semester 中文)', disciplines: ['code'], tags: [] },
  { name: 'Hackaday.io', url: 'https://hackaday.io', group: 'learn', subcat: 'community', desc: '硬件开发社区', disciplines: ['hardware'], tags: [] },
  { name: 'Hackster.io', url: 'https://www.hackster.io', group: 'learn', subcat: 'community', desc: '硬件学习社区', disciplines: ['hardware'], tags: [] },
  { name: 'Arduino Project Hub', url: 'https://projecthub.arduino.cc', group: 'learn', subcat: 'community', desc: 'Arduino 项目库', disciplines: ['hardware'], tags: [] },
  { name: 'Instructables', url: 'https://www.instructables.com', group: 'learn', subcat: 'community', desc: 'DIY / Maker 教程社区', disciplines: ['hardware', 'industrial'], tags: [] },

  // —— 制作 · 交付 ——
  { name: 'ProcessOn', url: 'https://www.processon.com', group: 'make', subcat: 'collab', desc: '在线流程图 / 协作', disciplines: ['uiux'], tags: ['国内'] },
]

// 由工具名生成稳定 slug —— 用于档案页路由 /tools/:group/:slug
// 保留 Unicode 字母/数字(支持中文名如「花瓣网」),仅把空白与符号转为连字符
export const toolSlug = (name) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/(^-|-$)/g, '')
