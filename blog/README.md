# MaxAdz Blog 与内容运营后台

## 本地入口

- 前台：`blog/index.html`。首页页脚「产品」栏中，「更多功能」下面已增加 Blog。
- 后台：`blog/admin.html`。博客页脚也有「内容管理」入口。
- 文章：6 篇示例文章各自有可直接访问的静态 HTML 页面。
- 新建文章的本地阅读入口：`blog/post.html?slug=文章标识`。

请从 design 目录启动静态服务器，例如 `python -m http.server 4173`，访问 `http://localhost:4173/blog/`。也可以直接打开 HTML，但浏览器对 file:// 的数据库共享、剪贴板和嵌入行为可能不同。推荐技术和运营统一使用同一个本地 HTTP 地址。

## 设计依据

前台借鉴 https://github.com/BeepBeep84/blog 的轻量结构：约 1100px 内容栏、分类筛选、双列文章卡片、排序与分页、独立阅读页。使用 MaxAdz 现有 Logo、橙色 #FF7201、浅底与统一 UI 字体，不复制参考项目品牌内容、复古背景或字体。参考项目使用 MIT 许可证，原许可证保留在 `REFERENCE-LICENSE.txt`。

后台参考 WordPress 的内容组织与发布流程，不是 WordPress 本体，也不是已经部署的 CMS。前台图文延用现有 SEO 页面新生成的品牌素材，未引入第三方版权摄影。示例内容并非真实效果数据或客户案例。

## 已实现的本地交互

- 文章：搜索、状态与分类筛选、分页、复制、首页推荐、批量处理、回收站恢复、永久删除。
- 写作：Jodit 4.18.7 完整所见即所得编辑器，本地加载，无需 CDN 或 API Key。
- 排版：段落与标题、字体字号、粗斜体、列表、颜色、对齐、缩进、引用、表格、双栏图文、图片尺寸调整、链接、源码、全屏、撤销与重做。
- 图片：封面选择与替代文字、媒体库、本地上传。上传的 JPG / PNG / WebP / GIF 以静态图优化为 WebP，不保留 GIF 动画；单张上限 10 MB。
- 视频：HTTPS YouTube / Vimeo 地址转换为受限 iframe，或 HTTPS MP4 / WebM / Ogg 直链。外部平台可能限制嵌入，实际播放需要网络及有效的公开视频。
- 流程：自动保存编辑草稿、Ctrl/Cmd+S 保存、本地预览、提交审核、发布、定时发布设置、最多 8 条手动保存修订及恢复。
- 结构：分类和标签新增、重命名、删除，并同步文章字段。
- 评论：前台提交到本地待审，后台通过、标记垃圾与删除，已通过评论显示到前台。
- 团队：演示成员资料与角色配置。
- 设置：博客说明、每页数量、评论开关、正式地址字段；完整 JSON 导入导出，导入含字段校验、覆盖确认与 HTML 过滤。
- 导出：编辑区可导出正文 HTML，方便迁移；不是全站部署包，媒体引用和最终 CSS 需由正式构建流程整理。

站点设置中「博客名称」用于浏览器标签页，「首页大标题」控制首页 H1，「首页副标题」同时控制标题下方文案和首页 SEO 描述。旧数据自动补齐大标题，不清空原有副标题和阅读设置。固定品牌字标已统一为 MaxAdz。前台排序与后台表单复用 select-ui.js 的白底圆角下拉菜单，保留原生 select 作为表单值和键盘选择能力。

## 数据与安全边界

所有管理数据保存在 IndexedDB `maxai-blog-v1` 的 `state/content` 中。初次读取使用 `seed.js` 示例数据。示例公开文章已经静态化，所以禁用 JavaScript 仍然能阅读正文；后台修改的内容仅在当前浏览器同源下覆盖展示。

本地发布不修改磁盘 HTML、不推送 GitHub，也不会让其他设备看到文章。定时发布只在访问页面时计算是否到期，关闭浏览器后不存在后台定时服务。刷新可读取更新，不能将该逻辑作为正式线上定时任务。成员角色只演示信息架构，不具备鉴权能力；直接知道后台地址的人不会受到真实访问控制。

使用 DOMPurify 3.4.17 清理文章内容，限制视频 iframe 来源并设置 sandbox。导入同样执行过滤。图片和评论文本不作为可信 HTML。此处的客户端校验不能替代服务端验证、安全策略和文件扫描。

本地数据库适合单运营人员原型演示，不承诺多用户并发、一致性或跨设备同步。清除浏览器数据会删除编辑记录，交接前请导出 JSON 备份；不在文件里保存密码、密钥或客户隐私。

## 正式制作建议

1. 身份：独立运营登录，管理员、编辑、作者的服务端权限和审计日志。前台与后台权限分离。
2. 存储：文章、分类、评论、修订存入数据库；媒体上传对象存储，限制大小、类型与域名。
3. API：posts 列表 / 创建 / 更新 / 审核 / 发布，media 上传，taxonomy，comments 审核，team 与 settings。操作需要鉴权、CSRF / 同源校验和限流。
4. 发布：服务端定时任务、发布队列或静态构建；每篇生成稳定 URL、title、description、canonical、OG、Article JSON-LD、Sitemap 与 RSS。
5. 媒体：视频链接需要检查域名、CORS 与嵌入许可；不允许任意 HTML iframe。外部图片可迁移至受控存储。
6. 部署：GitHub Pages 只能提供静态前台，不能承担真实 CMS API 或鉴权。后台需单独的服务端或成熟 CMS 对接。

## 开发与依赖

`npm ci --ignore-scripts` 安装 package-lock 锁定依赖；`npm run vendor` 更新本地 vendor；`npm run build` 根据 seed.js 重建静态示例首页与文章。

node_modules 已忽略。交付时保留 vendor、seed.js、store.js、public.js、admin.js、CSS、HTML 以及 ../features/assets 和 ../modules/home-v1/assets/maxai-logo.svg 的相对目录关系。

Jodit、DOMPurify、Tabler 的许可证随 vendor 保存。不使用 TinyMCE 的商业插件或需要 Key 的云服务。

官方参考：

- https://github.com/xdan/jodit
- https://wordpress.org/documentation/category/dashboard/
- https://wordpress.org/documentation/article/page-post-settings-sidebar/
