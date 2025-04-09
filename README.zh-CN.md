<div align="center">
<img src="https://s2.loli.net/2023/10/27/WzQ4JLNV5epKh6X.png" style="width:150px"/>
    <h1>Nova Admin</h1>
</div>

<div align="center">
    <img src="https://img.shields.io/github/license/chansee97/nova-admin"/>
    <img src="https://badgen.net/github/stars/chansee97/nova-admin?icon=github"/>
    <img src="https://gitee.com/chansee97/nova-admin/badge/star.svg"/>
    <img src="https://img.shields.io/github/forks/chansee97/nova-admin"/>
</div>

<div align='center'>

  [English](./README.md) | 中文
</div>

## 介绍

[Nova-admin](https://github.com/chansee97/nova-admin)是一个基于Vue3、Vite5、Typescript、Naive UI, 简洁干净后台管理模板，用简单的方式实现完整功能，并尽可能的考虑代码规范，易读易理解无过度封装，方便二次开发。

- [Nova-Admin 预览](https://nova-admin.pages.dev/)
- [Nova-Admin 文档](https://nova-admin-docs.pages.dev/)

## 特性

- 基于Vue3、Vite6、TypeScript、NaiveUI、Unocss等最新技术栈开发
- 基于[alova](https://alova.js.org/)封装和配置，提供统一的响应处理和多场景能力
- 完善的前后端权限管理方案
- 支持本地静态路由和后台返回动态路由，路由简单易配置
- 对日常使用频率较高的组件二次封装,满足基础工作需求
- 黑暗主题适配, 界面样式保持Naive风格
- 仅在提交时进行eslint校验，没有过多限制，开发更简便
- 界面样式布局灵活可配置
- 多语言（i18n）支持

## 项目预览

![preview-1.png](https://s2.loli.net/2024/03/31/UZoajnEekMX9cLi.png)
![preview-2.jpg](https://s2.loli.net/2024/03/31/8VwMSyXWtO6avKg.jpg)
![preview-5.png](https://s2.loli.net/2024/03/31/TCtE2ZBU7MJ6HrY.png)
![preview-6.png](https://s2.loli.net/2024/03/31/YM1OrxZCimzLcd6.png)
![preview-4.png](https://s2.loli.net/2024/03/31/hgYHKjACqs7rcPV.png)
![preview-3.png](https://s2.loli.net/2024/03/31/TuYajAH9LWsMPf5.png)

## 代码仓库

- [Gitee](https://gitee.com/chansee97/nova-admin)
- [Github](https://github.com/chansee97/nova-admin)

## 接口文档

本项目使用ApiFox进行接口mock，查看在线文档以了解更多接口详情
[在线apifox文档](https://nova-admin.apifox.cn)

## 安装使用

本地开发环境建议使用 pnpm 10.x 、Node.js 21.x

推荐直接下载[Releases](https://github.com/chansee97/nova-admin/releases)压缩包

```bash
# install dependencies
pnpm i

# Run
pnpm dev

# Build product
pnpm build

```

在生产环境也可以使用 docker-compose 部署 **nova-admin**
```bash
# Build product
docker compose -f docker-compose.product.yml up --build -d
```
> 关于 nginx.conf 只供参考，你可以根据自己的需求进行调整。

## 相关项目

- [Nova-admin-nest](https://github.com/chansee97/nove-admin-nest) (开发中)基于TS, NestJs, typeorm的Nova-Admin配套后台项目

## 学习交流

Nova-Admin 是完全开源免费的项目，目前仍然在优化迭代中，旨在帮助开发者更方便地进行中大型管理系统开发，有使用问题欢迎在交流群内提问。

| Q群 | 微信群 |
| :--: |:--: |
| <img src="https://cdn.jsdelivr.net/gh/chansee97/static/nova-admin/q-group.png" width=170> |<img src="https://cdn.jsdelivr.net/gh/chansee97/static/wechat.png" width=170>|

> 添加微信请注明来意

## 贡献

如果您发现了任何问题或有改进建议，请创建一个[issue](nova-admin/issues/new)或提交一个PR。我们欢迎您的贡献！

## 支持

如果感觉本项目对你工作或学习有帮助，请帮我点一个✨Star,这将是对我极大的鼓励与支持, 也可以在下方请我喝一杯咖啡

| 微信 | 支付宝 |
| :--: |:--: |
| <img src="https://cdn.jsdelivr.net/gh/chansee97/static/sponsor-wechat.png" width=170> | <img src="https://cdn.jsdelivr.net/gh/chansee97/static/sponsor-alipay.png" width=170>|

## 贡献者

感谢他们的所做的一切贡献！

<a href="https://github.com/chansee97/nova-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chansee97/nova-admin" alt="contributors" />
</a>

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=chansee97/nova-admin&type=Date)](https://star-history.com/#chansee97/nova-admin&Date)

## 协议

[MIT](LICENSE)
