# Claude AI 从入门到精通

> 面向开发者和产品经理的 Claude 全功能中文教程网站

## 简介

本项目是一个纯静态教程网站，系统覆盖 Claude 模型使用技巧、Claude Code CLI 完整功能、`.claude` 目录生态、MCP 协议、Anthropic API、Agent 自动化、业务场景最佳实践以及实战项目案例。

## 内容章节

| 章节 | 标题 |
|------|------|
| 第一章 | 认识 Claude |
| 第二章 | Claude Code CLI 入门 |
| 第三章 | Claude Code CLI 核心功能 |
| 第四章 | `.claude` 目录完全指南 |
| 第五章 | MCP（模型上下文协议） |
| 第六章 | Anthropic API 使用教程 |
| 第七章 | Agent 与自动化 |
| 第八章 | 业务场景最佳实践 |
| 第九章 | 实战项目案例 |
| 第十章 | 常见问题与避坑 |

## 技术栈

- 纯静态 HTML + CSS + JS，无框架依赖
- 代码高亮：[highlight.js](https://highlightjs.org/)
- 部署：[Cloudflare Pages](https://pages.cloudflare.com/)

## 本地预览

直接用浏览器打开 `index.html`，或使用任意静态服务器：

```bash
npx serve .
# 或
python3 -m http.server 8080
```

## 项目结构

```
/
├── index.html              # 首页
├── assets/
│   ├── css/                # 样式文件
│   └── js/                 # 脚本文件
└── chapters/
    ├── 01-intro/           # 第一章
    ├── 02-cli-start/       # 第二章
    ├── ...
    └── 10-faq/             # 第十章
```

详细方案见 [PLAN.md](./PLAN.md)。

## 贡献

欢迎提交 Issue 或 PR 纠错、补充内容。

## License

MIT
