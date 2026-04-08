# Claude AI 从入门到精通 — 教程网站

## 项目概述

面向开发者和产品经理的 Claude / Claude Code CLI 完整中文教程网站。

## 技术栈

- 纯静态 HTML + CSS + JS，无框架依赖
- 部署在 Cloudflare Pages

## 目录结构

```
/
├── index.html              # 首页
├── assets/
│   ├── css/
│   │   ├── base.css        # 全局样式、CSS 变量
│   │   ├── layout.css      # 布局（侧边栏、主内容区）
│   │   └── components.css  # 组件样式（代码块、提示框等）
│   ├── js/
│   │   ├── nav.js          # 侧边栏导航、折叠展开
│   │   ├── search.js       # 全文搜索（基于 lunr.js 或自实现）
│   │   └── highlight.js    # 代码高亮（引入 highlight.js）
│   └── img/
├── chapters/
│   ├── 01-intro/           # 第一章：认识 Claude
│   ├── 02-cli-start/       # 第二章：Claude Code CLI 入门
│   ├── 03-cli-core/        # 第三章：CLI 核心功能
│   ├── 04-dot-claude/      # 第四章：.claude 目录完全指南
│   ├── 05-mcp/             # 第五章：MCP
│   ├── 06-api/             # 第六章：API 使用教程
│   ├── 07-agent/           # 第七章：Agent 与自动化
│   ├── 08-scenarios/       # 第八章：业务场景最佳实践
│   ├── 09-projects/        # 第九章：实战项目案例
│   └── 10-faq/             # 第十章：常见问题与避坑
└── search-index.json       # 搜索索引
```

## 设计规范

- **风格**：暗色技术风
- **主色**：`#7C3AED`（紫色）
- **背景**：`#0F0F0F` / `#1A1A1A`
- **文字**：`#E5E5E5` / `#A3A3A3`
- **代码块背景**：`#141414`
- **字体**：正文 `Inter`，代码 `JetBrains Mono`

## Git 提交规范

每个功能点独立 commit：
- `feat: 首页框架`
- `feat: 第一章内容`
- `style: 代码高亮样式`
- `fix: 侧边栏导航问题`

## 内容规范

- 全站中文
- 每节包含：概念说明 + 代码示例 + 上手步骤
- 第九章每个案例为完整手把手教程
