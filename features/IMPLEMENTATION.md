# 更多功能 / SEO 页面交接

## 范围与入口

新增公开页面 `features/index.html`。首页 `web-v1/web-home-v2.html` 底部「产品」一列，在「创作历史」下面新增「更多功能」普通 HTML 链接。页面无需登录，不依赖 localStorage，内容不依赖 JavaScript 注入。

按用户要求只补齐本地功能，不发布 GitHub、不修改 DNS、服务器、现有首页主体、H5 源文件或付费模块。`?mode=image` 与 `?mode=video` 的创作入口已连接到 Web 现有模式切换。

内容来源：用户提供的 `MAXAI上线10月需求汇总20261008 - seo新.csv`。原 CSV 保持不变。中文说明、优先级和部署备注只用于实施，不作为面向印尼用户的网页正文。H1、副标题、Title、Description、H2/H3 按源表保留。新增功能说明为基于项目实际流程的印尼语文案，不承诺流量、转化率、排名或所有产出必然可用。

## 已实现

- `lang="id"`，仅一个印尼语页面，不新建英文版本。英文关键词按表格要求自然保留在印尼语内容中。
- 1 个 H1、5 个 H2、5 个 H3；标题、段落、链接均为真实可选择的 HTML 文字。
- 独立 Title、Meta Description、canonical、Open Graph、Twitter Card、WebPage 与 ItemList JSON-LD。
- 有效的静态链接、锚点、图片 alt、明确图像尺寸、首图高优先级、下方图片延迟加载。
- 图片使用 WebP，原有商品图只转换输出副本，不改原图。
- 页内导航只是渐进增强，JavaScript 禁用时仍保留全部正文、28 个关键词与创作入口。
- 独立 Sitemap 草案 `features/sitemap.xml`，只列出本次新增页面，不覆盖站点全量 Sitemap。

## 内容覆盖：8 个核心关键词

| 关键词 | 对应内容 |
| --- | --- |
| AI Ads Generator | Title、效率模块正文 |
| Video Iklan AI | 视频模块 H3、正文 |
| Generator Iklan AI | 效率模块制作流程 |
| AI Video Generator | 视频模块正文 |
| AI Image Generator | 图片模块 H2 |
| AI Video Ads | 视频模块正文 |
| Foto Produk AI | 图片模块正文 |
| AI Product Ads | 电商模块正文 |

## 内容覆盖：20 个扩展关键词

| 源表序号 | 关键词 | 模块 |
| --- | --- | --- |
| 1 | Pembuat Video Iklan AI | 视频 |
| 2 | Buat Video Iklan dengan AI | 视频 |
| 3 | Generator Foto Produk AI | 图片 |
| 4 | AI untuk Bisnis Online | 电商 |
| 5 | Video Promosi Produk AI | 视频 |
| 6 | Pembuat Iklan Produk AI | 电商 |
| 7 | AI untuk Jualan Online | 电商 |
| 8 | Buat Iklan Produk dengan AI | 电商 |
| 9 | Foto Produk Jadi Video AI | 视频 |
| 10 | Pembuat Konten Iklan AI | 品牌与创作者 |
| 11 | Video Iklan TikTok AI | 电商 |
| 12 | Video Promosi Shopee AI | 电商 |
| 13 | AI Video Ad Maker | 视频 |
| 14 | AI Product Video Generator | 视频 |
| 15 | AI Product Image Generator | 图片 |
| 16 | AI Ad Creative Generator | 品牌与创作者 |
| 17 | AI Image to Video Generator | 视频 |
| 18 | AI E-commerce Ads Generator | 电商 |
| 19 | AI Marketing Video Generator | 视频 |
| 20 | AI Social Media Ads Generator | 品牌与创作者 |

## 设计与素材

保留现有浅色主题、橙色强调、原有标识及无衬线字体系统。设计参数为 DESIGN_VARIANCE 5、MOTION_INTENSITY 3、VISUAL_DENSITY 4，优先可读性与静态内容加载，不增加新框架或组件库。

当前页面的 11 张内容配图通过内置 image_gen 逐张独立生成，非 API/CLI。每张图在页面只使用一次，不复用原有香水、精华、眼镜配图。配图用于展示创意方向，不是实际产品效果承诺；图片不包含 SEO 文字，网页正文仍为可复制 HTML。

11 张图的精确生成提示词、文件名和生成方式记录在 `features/assets/generated-art-v2.json`。原始 PNG 在 `features/assets/source-v2/`，网页使用同目录下独立的 `*-v2.webp` 文件。网页版总计约 1.1 MB。

图文对应：夏日商品主视觉；柑橘饮料和头戴耳机用于视频广告；皮质手袋和抹茶用于商品摄影；服饰模特和防晒用于电商场景；创作者摄影用于品牌内容；水瓶产品、创意素材、音箱方案用于三段创作流程。旧素材保留为历史资源，当前页面不再引用。

## 生产上线待技术处理

1. 源表指定目标域为 `maxadz.com`，因此页面 canonical、OG URL 和 JSON-LD 按 `https://maxadz.com/features/` 预置。该值是部署目标，不表示此域名已配置或上线。正式 URL 若变更，需同时更新 HTML、JSON-LD 与 Sitemap。
2. 在服务器为 `/features/` 提供此 HTML，返回 HTTP 200。避免被首页 UA 跳转或 SPA fallback 覆盖。`/features/index.html`、HTTP 或其他重复地址的规范化需在正式服务器配置。
3. 在旧域 `maxai.art` 按旧页面与新页面的一对一映射配置 301。不要把所有旧页面无差别跳到此功能页。本地静态原型无法完成服务器级重定向。
4. 将此页面合并到正式站点的全量 Sitemap，确认 canonical 与实际可访问 URL 相同；配置 robots.txt 的 Sitemap 地址，避免误封 CSS、JS、图片或此页面。
5. 在 Google Search Console 验证新旧域、按实际迁移情况处理 Change of Address，提交 Sitemap 并检查 URL 抓取与索引。收录和排名不能通过本地 HTML 保证。
6. 当前全站首页仍是交互原型和 UA 分流入口；本次没有将全站首页替换为营销页，也没有完成旧站 SEO 资产的实际迁移。不要将交付误认作全站 SEO 上线。

参考：[Google Search 开发者指南](https://developers.google.com/search/docs/fundamentals/get-started-developers)、[网站地址迁移](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)。

## 本地检查

直接打开 `features/index.html`，或在 `design` 目录运行静态服务器后访问 `/features/`。

测试脚本在工作区的 `control-recovery/test-seo-features.cjs`，不属于对外网页资源。检查源 CSV 的精确标题、Description、H1、5 个 H2/H3 及 28 个关键词，并验证入口跳转、创作模式、桌面/平板/手机排版、图片和禁用 JS 后的内容。

本次实际检查通过：Edge 1440、1024、768、390 宽度无横向溢出，页脚入口可点击，图片成功加载，图片创作入口可切换模式，禁用 JavaScript 后保留全部 28 个关键词，file:// 直开可用，无页面脚本错误或 HTTP 失败。已查看桌面、手机和电商模块截图。源码语法与 git diff --check 通过。

当前依赖环境未安装 Lighthouse，未执行 Lighthouse 审计，也未使用真实 Google Search Console 或 Rich Results Test 验证在线 URL。不要将本次功能与排版测试表述为性能评分、正式收录或排名保证。

配图第二轮检查：11 次独立 image_gen 生成已完成，11 份 PNG 原图逐张目视检查、哈希各不相同；网页引用 11 个不同的 v2 WebP，不含重复内容图片 URL。Edge 多尺寸、禁用 JS、28 个关键词覆盖及本地 file:// 检查再次通过。
