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

.openai/hosting.json 保存 Sites 项目 ID 与静态产物目录。首次部署默认仅本人可访问；用于向玩家公开分发时，需要将网站改为公开访问并配置真实下载地址。
网站源码由 Sites 单独管理，不包含上层 Godot 项目或未提交改动。任何品牌、下载资料和页面调整后，先构建、检查，再同步及部署。
