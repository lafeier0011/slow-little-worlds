# 慢游 · 个人游戏作品馆

独立于 Godot 游戏的静态网站。Node.js 运行，无第三方依赖。`dist/` 是可部署产物，`public/` 是样式、交互与图片，`content.json` 是作品与版本数据。

## 运行

```powershell
cd D:\developer\code\game\car\website
node build.mjs
node check.mjs
node server.mjs
```

打开 http://127.0.0.1:4173 。修改资料后重新运行 build 即可。

## 改品牌 / 新增游戏

“慢游”是本次设计使用的临时展示名，可以修改 content.json 的 site。修改域名时同步更新 site.origin。
在 games 数组新增作品，填写唯一的英文 slug、name、subtitle、description、status、tags、cover、scenes、downloads、updates。详情页和作品列表自动生成；featured 为首页主推作品。
图片放 public/assets。当前图片来自项目内实际预览截图，经 JPEG 压缩。以后建议替换为确认用于公开发行的最终实机截图。

## 下载发布

当前 downloads 为空，所以页面明确显示“体验版准备中”，没有虚假链接。获得真实安装包后，上传到下载托管位置，再按以下结构填写，运行构建即可显示下载按钮：

```json
{"platform":"Windows","version":"实际版本号","date":"实际发布日期","size":"实际文件大小","url":"https://你的下载域名/实际文件.zip","instructions":"与安装包对应的安装步骤"}
```

url 必须为 HTTPS；mirror 可选。平台只填写实际测试并发布的版本。安装包单独托管，不放进网页源码。每次更新保留原版本文件地址，避免覆盖已发布文件。

## 发布

网站源码托管在 GitHub 仓库 lafeier0011/slow-little-worlds，通过 GitHub Pages 公开访问：https://lafeier0011.github.io/slow-little-worlds/

推送到 main 后，`.github/workflows/deploy.yml` 自动执行构建、检查并部署 `dist/`，无需手动上传产物。首次启用需在仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。

任何品牌、下载资料和页面调整后，先本地运行 build 与 check 确认无误，再提交推送；部署结果可在仓库 Actions 页查看。

## 子路径部署

页面链接基于 content.json 中 site.origin 的路径自动生成。当前部署在 GitHub Pages 子路径下，origin 为 `https://lafeier0011.github.io/slow-little-worlds`，所有资源与导航链接会自动带上 `/slow-little-worlds` 前缀。

改用独立域名部署在根目录时，把 origin 改成 `https://你的域名` 并重新构建即可，链接自动回到根路径。本地预览 `node server.mjs` 会按 origin 的路径提供页面。
