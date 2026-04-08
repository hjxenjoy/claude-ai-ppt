# 项目完整方案与任务计划

> Claude AI 从入门到精通 — 中文教程网站
> 更新日期：2026-04-08

---

## 一、项目目标

构建一个面向**开发者和产品经理**的 Claude 全功能中文教程网站，覆盖：
- Claude 模型使用技巧与 Prompt 工程
- Claude Code CLI 完整功能与工作流
- `.claude` 目录生态（CLAUDE.md / settings.json / commands / hooks / skills / rules）
- Anthropic API 使用
- MCP 协议配置与使用
- Agent 自动化
- 业务场景最佳实践
- 实战项目案例（手把手教程）

---

## 二、技术方案

### 2.1 技术栈

| 层次 | 选择 | 说明 |
|------|------|------|
| 结构 | HTML5 | 语义化标签，无框架 |
| 样式 | CSS3 | CSS 变量、Grid/Flexbox，无预处理器 |
| 交互 | Vanilla JS | 无框架，模块化组织 |
| 代码高亮 | highlight.js | CDN 引入，支持 bash/js/python/json 等 |
| 搜索 | 自实现 | 基于预生成的 `search-index.json` 做客户端全文搜索 |
| 部署 | Cloudflare Pages | 直接连接 Git 仓库自动部署 |

### 2.2 目录结构

```
/
├── index.html                  # 首页
├── PLAN.md                     # 本文件
├── CLAUDE.md                   # Claude Code 项目说明
├── .gitignore
├── wrangler.toml               # Cloudflare 配置
├── search-index.json           # 全文搜索索引（构建后生成）
│
├── assets/
│   ├── css/
│   │   ├── base.css            # Reset、CSS 变量、排版
│   │   ├── layout.css          # 页面整体布局（侧边栏 + 主内容区 + 顶栏）
│   │   └── components.css      # 组件：代码块、提示框、步骤列表、表格、标签等
│   ├── js/
│   │   ├── nav.js              # 侧边栏生成、折叠、当前章节高亮
│   │   ├── search.js           # 搜索框逻辑、索引加载、结果渲染
│   │   └── theme.js            # 暗色主题（预留明暗切换扩展口）
│   └── img/                    # 插图、截图
│
└── chapters/
    ├── 01-intro/
    │   └── index.html
    ├── 02-cli-start/
    │   └── index.html
    ├── 03-cli-core/
    │   └── index.html
    ├── 04-dot-claude/
    │   └── index.html
    ├── 05-mcp/
    │   └── index.html
    ├── 06-api/
    │   └── index.html
    ├── 07-agent/
    │   └── index.html
    ├── 08-scenarios/
    │   └── index.html
    ├── 09-projects/
    │   ├── index.html          # 案例总览
    │   ├── portal.html         # 门户网站
    │   ├── admin.html          # 管理后台
    │   ├── game.html           # 小游戏
    │   ├── app.html            # 移动端 APP
    │   ├── extension.html      # Chrome 扩展
    │   └── cli-tool.html       # CLI 工具
    └── 10-faq/
        └── index.html
```

### 2.3 页面模板结构

每个章节页共享同一套 HTML 骨架：

```html
<body>
  <!-- 顶部导航栏：Logo + 搜索框 + GitHub 链接 -->
  <header class="top-bar">...</header>

  <div class="layout">
    <!-- 左侧边栏：章节树形导航 -->
    <aside class="sidebar">...</aside>

    <!-- 主内容区 -->
    <main class="content">
      <article>...</article>
      <!-- 上一章 / 下一章 翻页 -->
      <nav class="pagination">...</nav>
    </main>

    <!-- 右侧目录（本页锚点，大屏显示） -->
    <nav class="toc">...</nav>
  </div>
</body>
```

### 2.4 设计规范

```css
/* 主色调 */
--color-primary: #7C3AED;        /* 紫色主色 */
--color-primary-light: #A78BFA;  /* 悬停高亮 */

/* 背景层次 */
--color-bg: #0F0F0F;             /* 页面背景 */
--color-surface: #1A1A1A;        /* 卡片/侧边栏背景 */
--color-border: #2A2A2A;         /* 分隔线 */

/* 代码块 */
--color-code-bg: #141414;        /* 代码块背景 */
--color-code-border: #333;       /* 代码块边框 */

/* 文字 */
--color-text: #E5E5E5;           /* 主文字 */
--color-text-muted: #A3A3A3;     /* 次要文字 */

/* 字体 */
--font-body: 'Inter', system-ui;
--font-code: 'JetBrains Mono', monospace;
```

### 2.5 搜索实现方案

- 每个章节页面在 `<script>` 中注册自身的段落内容到全局 `searchData` 数组
- `search-index.json` 在编写阶段手动维护（或后续用脚本从各 HTML 提取）
- 搜索时对标题和正文做关键词匹配，高亮命中词，实时显示结果列表

---

## 三、内容大纲（详细）

### 首页
- Hero 区：项目标题、一句话介绍、"开始学习"按钮
- 特性卡片：覆盖范围速览（6块）
- 章节导航网格：10章封面卡片
- 底部：更新日志入口

---

### 第一章：认识 Claude

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 1.1 | Claude 是什么 | 能力边界、与 GPT 的差异、适用场景 |
| 1.2 | 模型系列 | Opus 4.6 / Sonnet 4.6 / Haiku 4.5 对比、选型建议 |
| 1.3 | 核心对话技巧 | Prompt 结构、角色设定、few-shot、Chain-of-Thought |
| 1.4 | 上下文管理 | 上下文窗口概念、如何高效利用、超限处理 |
| 1.5 | 扩展思考模式 | 何时开启、budget_tokens 设置、利用推理过程 |
| 1.6 | 多场景 Prompt 范例 | 代码生成、数据分析、写作、决策辅助各一套模板 |

---

### 第二章：Claude Code CLI 入门

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 2.1 | 安装与配置 | Node.js 要求、npm 安装、API Key 配置 |
| 2.2 | 三种使用模式 | 交互式 REPL、单次 `-p` 命令、管道输入 |
| 2.3 | 权限模式 | default / auto-approve / manual 区别与切换 |
| 2.4 | 快捷键速查 | Ctrl+C / Ctrl+R / Esc 等全部快捷键表 |
| 2.5 | 第一个任务 | 上手实验：用 Claude Code 创建并运行一个 Hello World 脚本 |

---

### 第三章：Claude Code CLI 核心功能

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 3.1 | 斜杠命令完整参考 | /help /compact /clear /model /cost /status 等逐一说明 |
| 3.2 | 内置工具系统 | Read / Edit / Write / Bash / Grep / Glob / WebFetch 等工具详解 |
| 3.3 | 文件引用技巧 | `@file` 语法、多文件引用、目录引用 |
| 3.4 | 大型项目策略 | 如何引导 Claude 理解大型代码库、分步骤拆解任务 |
| 3.5 | /compact 与上下文压缩 | 何时压缩、压缩后的影响、最佳时机 |

---

### 第四章：.claude 目录完全指南

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 4.1 | 目录结构总览 | 全局 `~/.claude/` vs 项目级 `.claude/`，加载优先级 |
| 4.2 | CLAUDE.md | 格式规范、项目说明、代码规范注入、多层 CLAUDE.md 继承 |
| 4.3 | settings.json | 完整配置项表：model / permissions / hooks / env 等 |
| 4.4 | 自定义斜杠命令 | commands/ 目录、Markdown 格式规范、参数传递、示例编写 |
| 4.5 | Hooks 系统 | 事件类型（PreToolUse / PostToolUse / Notification 等）、shell 脚本编写、实用案例 |
| 4.6 | Skills | 技能文件格式、TRIGGER 条件、与斜杠命令的区别、编写示例 |
| 4.7 | Rules | 规则文件格式、优先级、与 CLAUDE.md 的区别 |
| 4.8 | Memory 系统 | 自动记忆机制、memory/ 目录、MEMORY.md 索引、记忆类型 |

---

### 第五章：MCP（模型上下文协议）

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 5.1 | MCP 是什么 | 协议定位、与插件系统的区别、架构图 |
| 5.2 | 配置 MCP 服务器 | settings.json mcpServers 字段、stdio vs SSE 模式 |
| 5.3 | GitHub MCP | 配置示例、可用工具列表、使用场景 |
| 5.4 | 文件系统 MCP | 配置、权限控制、实用案例 |
| 5.5 | 数据库 MCP | SQLite / PostgreSQL 配置示例 |
| 5.6 | 自定义 MCP 服务器 | 用 Node.js 实现一个最简 MCP 服务器 |

---

### 第六章：Anthropic API 使用教程

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 6.1 | API 密钥与鉴权 | 获取、环境变量配置、安全注意事项 |
| 6.2 | Messages API 基础 | 请求结构、role/content、参数（max_tokens / temperature 等） |
| 6.3 | 流式响应 | stream: true、SSE 处理、Python/Node 示例 |
| 6.4 | Tool Use | 工具定义格式、调用循环、结果解析 |
| 6.5 | Vision | 图片 base64 / URL 输入、多图处理 |
| 6.6 | Prompt Caching | cache_control 设置、适用场景、成本计算 |
| 6.7 | SDK 使用 | Python anthropic 包、Node @anthropic-ai/sdk 完整示例 |

---

### 第七章：Agent 与自动化

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 7.1 | Agent 工具详解 | Claude Code 内 Agent 工具的参数、subagent_type、isolation |
| 7.2 | Sub-agent 拆分策略 | 何时拆分、任务边界划分、上下文传递技巧 |
| 7.3 | 并行 Agent | 多 Agent 并发执行、结果汇总模式 |
| 7.4 | Headless 模式 | `claude -p` 无头运行、CI/CD 集成示例（GitHub Actions） |
| 7.5 | 自动化工作流 | 完整案例：代码审查自动化 / 定时报告生成 |

---

### 第八章：业务场景最佳实践

| 节 | 标题 | 内容要点 |
|----|------|----------|
| 8.1 | 功能开发 | 需求→拆解→编码→测试完整提示链 |
| 8.2 | 代码审查 | 审查维度设置、安全检查、输出格式规范 |
| 8.3 | 重构与技术债 | 渐进式重构策略、保持测试绿灯 |
| 8.4 | PRD 撰写 | 结构化模板、需求挖掘提示词 |
| 8.5 | 竞品分析 | 信息收集→对比矩阵→洞察提炼 |
| 8.6 | 技术文档生成 | 从代码生成 API 文档、README、用户手册 |
| 8.7 | 数据分析 | 日志分析、数据清洗脚本、可视化建议 |
| 8.8 | DevOps 辅助 | Dockerfile 生成、CI 配置、故障排查 |

---

### 第九章：实战项目案例

每个案例结构：背景 → 技术选型 → 逐步操作（含完整 Prompt） → 结果验证 → 常见问题

| 案例 | 文件 | 技术栈 | 篇幅 |
|------|------|--------|------|
| 从零构建门户网站 | portal.html | HTML/CSS/JS | 长篇 |
| 构建管理后台系统 | admin.html | Vue3 / React | 长篇 |
| 开发一个小游戏 | game.html | Canvas / JS | 中篇 |
| 开发移动端 APP | app.html | React Native | 长篇 |
| 构建 Chrome 扩展 | extension.html | Manifest V3 | 中篇 |
| 开发 CLI 工具 | cli-tool.html | Node.js | 中篇 |

---

### 第十章：常见问题与避坑

| 节 | 标题 |
|----|------|
| 10.1 | 上下文超限怎么办 |
| 10.2 | Claude 拒绝执行某些操作 |
| 10.3 | 权限报错排查 |
| 10.4 | 输出质量不稳定 |
| 10.5 | API 限流与重试策略 |
| 10.6 | 成本控制技巧 |
| 10.7 | 安全注意事项 |

---

## 四、任务计划

### Phase 0：基础框架（当前阶段）

- [x] 项目初始化、git 仓库
- [x] .claude 目录配置
- [x] PLAN.md 方案文档
- [ ] `assets/css/base.css` — CSS 变量 + Reset + 排版
- [ ] `assets/css/layout.css` — 三栏布局（侧边栏 + 主内容 + 右侧目录）
- [ ] `assets/css/components.css` — 代码块、提示框、步骤、表格等组件
- [ ] `assets/js/nav.js` — 侧边栏数据结构 + 渲染 + 折叠
- [ ] `assets/js/search.js` — 搜索框 + 索引加载 + 结果渲染
- [ ] `assets/js/theme.js` — 暗色主题基础
- [ ] `index.html` — 首页

### Phase 1：章节内容（按章顺序）

- [ ] 第一章：认识 Claude（6节）
- [ ] 第二章：Claude Code CLI 入门（5节）
- [ ] 第三章：CLI 核心功能（5节）
- [ ] 第四章：.claude 目录完全指南（8节）⭐ 重点
- [ ] 第五章：MCP（6节）
- [ ] 第六章：Anthropic API（7节）
- [ ] 第七章：Agent 与自动化（5节）
- [ ] 第八章：业务场景最佳实践（8节）
- [ ] 第九章：实战项目案例（6个案例）⭐ 重点
- [ ] 第十章：常见问题（7节）

### Phase 2：搜索与体验优化

- [ ] 生成 `search-index.json`
- [ ] 搜索高亮、键盘导航
- [ ] 移动端响应式适配
- [ ] 翻页导航（上一节 / 下一节）
- [ ] 右侧页内目录（TOC）锚点跟踪

### Phase 3：上线与维护

- [ ] Cloudflare Pages 部署配置
- [ ] 自定义域名绑定（如有）
- [ ] 404 页面
- [ ] 内容校对与勘误

---

## 五、Git 提交规范

```
feat:   新增功能或内容页面
style:  样式调整
fix:    问题修复
chore:  配置、工具、脚手架
docs:   文档更新（PLAN.md、CLAUDE.md 等）
```

**原则：每个独立功能/页面/章节单独 commit，不批量合并。**

---

## 六、风险与注意事项

1. **内容时效性**：Claude 模型版本持续更新，文档中的版本号、参数需定期校对
2. **搜索性能**：纯客户端搜索在内容量大时需控制索引大小，必要时分片加载
3. **代码示例测试**：所有代码示例应经过实际验证，避免错误示例误导读者
4. **章节依赖**：第九章案例依赖前面章节的知识，需在案例中添加前置阅读提示
