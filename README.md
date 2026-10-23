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

当前已开放自动获取最新正式版的 Windows 在线安装器。约 2.3 MB 的安装器随网站托管于 public/downloads，完整组件分包仍从 Gitee 下载。官网固定下载文件名为 RV-Traveling-Setup.exe。更新安装器时同步 EXE、SHA256SUMS.txt 与界面预览；游戏更新时先上传完整分包，最后更新 Gitee catalog.json，无需更换安装器。下载数据格式：

```json
{"platform":"Windows","version":"实际版本号","date":"实际发布日期","size":"实际文件大小","url":"https://你的下载域名/实际文件.zip","instructions":"与安装包对应的安装步骤"}
```

url 必须为 HTTPS；mirror 可选。平台只填写实际测试并发布的版本。完整游戏分包单独托管；小型在线安装器保存在 public/downloads，发布后可从本站直接下载。每次更新保留原版本文件地址，避免覆盖已发布文件。

## 发布

网站源码托管在 GitHub 仓库 lafeier0011/slow-little-worlds，通过 GitHub Pages 公开访问：https://slowlittle.space

推送到 main 后，`.github/workflows/deploy.yml` 自动执行构建、检查并部署 `dist/`，无需手动上传产物。首次启用需在仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。

任何品牌、下载资料和页面调整后，先本地运行 build 与 check 确认无误，再提交推送；部署结果可在仓库 Actions 页查看。

## 自定义域名

主域名为裸域 `slowlittle.space`，站点在根目录，链接不再带子路径前缀。

### 一、DNS 解析（域名服务商处）

| 类型 | 名称 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` `185.199.109.153` `185.199.110.153` `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` `2606:50c0:8001::153` `2606:50c0:8002::153` `2606:50c0:8003::153` |
| CNAME | `www` | `lafeier0011.github.io` |

A 与 AAAA 建议各填全部四条，也可改用 ALIAS/ANAME 指向 `lafeier0011.github.io`（取决于服务商是否支持）。若服务商默认生成了指向自有服务器的 `@` 记录，先删掉。不要使用 `*` 通配记录。
配好 `www` 后，GitHub 会自动把 `www.slowlittle.space` 301 跳转到裸域。

### 二、仓库设置

Settings → Pages → Custom domain 填入 `slowlittle.space` 并 Save，等 DNS 校验通过后勾选 **Enforce HTTPS**（证书签发最长需 24 小时）。

注意：本项目用自定义 Actions 工作流发布，仓库里的 `CNAME` 文件会被 GitHub 忽略，**以 Settings 中填写的域名为准**；保留该文件只是为了改用分支发布时可直接生效。

验证解析：`dig slowlittle.space +noall +answer -t A`，应回显上述四个 IP。

## 域名与路径

页面链接基于 content.json 中 site.origin 的路径自动生成，当前 origin 为 `https://slowlittle.space`，路径为空，所有资源与导航链接直接指向根目录。

换成子路径部署时，只需把 origin 改成 `https://域名/子路径` 并重新构建，链接会自动带上前缀。本地预览 `node server.mjs` 会按 origin 的路径提供页面。

## 安装器插画

public/assets/office-rv-sticker.png 是内置 imagegen 生成的透明房车工位贴图，首页和下载区共用。installer-preview.png 为安装器界面预览，下载区支持点击查看大图。
