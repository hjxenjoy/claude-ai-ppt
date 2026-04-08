/* ============================================================
   nav.js — 侧边栏导航：数据、渲染、折叠、当前页高亮
   ============================================================ */

const NAV_DATA = [
  {
    title: '快速开始',
    items: [
      { label: '首页', href: '/index.html' },
    ],
  },
  {
    title: '第一章：认识 Claude',
    href: '/chapters/01-intro/',
    items: [
      { label: '1.1 Claude 是什么',     href: '/chapters/01-intro/index.html#s1' },
      { label: '1.2 模型系列对比',       href: '/chapters/01-intro/index.html#s2' },
      { label: '1.3 核心对话技巧',       href: '/chapters/01-intro/index.html#s3' },
      { label: '1.4 上下文管理',         href: '/chapters/01-intro/index.html#s4' },
      { label: '1.5 扩展思考模式',       href: '/chapters/01-intro/index.html#s5' },
      { label: '1.6 多场景 Prompt 范例', href: '/chapters/01-intro/index.html#s6' },
    ],
  },
  {
    title: '第二章：CLI 入门',
    href: '/chapters/02-cli-start/',
    items: [
      { label: '2.1 安装与配置',   href: '/chapters/02-cli-start/index.html#s1' },
      { label: '2.2 三种使用模式', href: '/chapters/02-cli-start/index.html#s2' },
      { label: '2.3 权限模式',     href: '/chapters/02-cli-start/index.html#s3' },
      { label: '2.4 快捷键速查',   href: '/chapters/02-cli-start/index.html#s4' },
      { label: '2.5 第一个任务',   href: '/chapters/02-cli-start/index.html#s5' },
    ],
  },
  {
    title: '第三章：CLI 核心功能',
    href: '/chapters/03-cli-core/',
    items: [
      { label: '3.1 斜杠命令参考',     href: '/chapters/03-cli-core/index.html#s1' },
      { label: '3.2 内置工具系统',     href: '/chapters/03-cli-core/index.html#s2' },
      { label: '3.3 文件引用技巧',     href: '/chapters/03-cli-core/index.html#s3' },
      { label: '3.4 大型项目策略',     href: '/chapters/03-cli-core/index.html#s4' },
      { label: '3.5 上下文压缩',       href: '/chapters/03-cli-core/index.html#s5' },
    ],
  },
  {
    title: '第四章：.claude 目录',
    href: '/chapters/04-dot-claude/',
    items: [
      { label: '4.1 目录结构总览',     href: '/chapters/04-dot-claude/index.html#s1' },
      { label: '4.2 CLAUDE.md',        href: '/chapters/04-dot-claude/index.html#s2' },
      { label: '4.3 settings.json',    href: '/chapters/04-dot-claude/index.html#s3' },
      { label: '4.4 自定义斜杠命令',   href: '/chapters/04-dot-claude/index.html#s4' },
      { label: '4.5 Hooks 系统',       href: '/chapters/04-dot-claude/index.html#s5' },
      { label: '4.6 Skills',           href: '/chapters/04-dot-claude/index.html#s6' },
      { label: '4.7 Rules',            href: '/chapters/04-dot-claude/index.html#s7' },
      { label: '4.8 Memory 系统',      href: '/chapters/04-dot-claude/index.html#s8' },
    ],
  },
  {
    title: '第五章：MCP',
    href: '/chapters/05-mcp/',
    items: [
      { label: '5.1 MCP 是什么',         href: '/chapters/05-mcp/index.html#s1' },
      { label: '5.2 配置 MCP 服务器',    href: '/chapters/05-mcp/index.html#s2' },
      { label: '5.3 GitHub MCP',         href: '/chapters/05-mcp/index.html#s3' },
      { label: '5.4 文件系统 MCP',       href: '/chapters/05-mcp/index.html#s4' },
      { label: '5.5 数据库 MCP',         href: '/chapters/05-mcp/index.html#s5' },
      { label: '5.6 自定义 MCP 服务器',  href: '/chapters/05-mcp/index.html#s6' },
    ],
  },
  {
    title: '第六章：API 使用',
    href: '/chapters/06-api/',
    items: [
      { label: '6.1 API 密钥与鉴权',  href: '/chapters/06-api/index.html#s1' },
      { label: '6.2 Messages API',    href: '/chapters/06-api/index.html#s2' },
      { label: '6.3 流式响应',        href: '/chapters/06-api/index.html#s3' },
      { label: '6.4 Tool Use',        href: '/chapters/06-api/index.html#s4' },
      { label: '6.5 Vision',          href: '/chapters/06-api/index.html#s5' },
      { label: '6.6 Prompt Caching',  href: '/chapters/06-api/index.html#s6' },
      { label: '6.7 SDK 使用',        href: '/chapters/06-api/index.html#s7' },
    ],
  },
  {
    title: '第七章：Agent 与自动化',
    href: '/chapters/07-agent/',
    items: [
      { label: '7.1 Agent 工具详解',    href: '/chapters/07-agent/index.html#s1' },
      { label: '7.2 Sub-agent 拆分',    href: '/chapters/07-agent/index.html#s2' },
      { label: '7.3 并行 Agent',        href: '/chapters/07-agent/index.html#s3' },
      { label: '7.4 Headless 模式',     href: '/chapters/07-agent/index.html#s4' },
      { label: '7.5 自动化工作流',      href: '/chapters/07-agent/index.html#s5' },
    ],
  },
  {
    title: '第八章：业务场景实践',
    href: '/chapters/08-scenarios/',
    items: [
      { label: '8.1 功能开发',       href: '/chapters/08-scenarios/index.html#s1' },
      { label: '8.2 代码审查',       href: '/chapters/08-scenarios/index.html#s2' },
      { label: '8.3 重构与技术债',   href: '/chapters/08-scenarios/index.html#s3' },
      { label: '8.4 PRD 撰写',       href: '/chapters/08-scenarios/index.html#s4' },
      { label: '8.5 竞品分析',       href: '/chapters/08-scenarios/index.html#s5' },
      { label: '8.6 技术文档生成',   href: '/chapters/08-scenarios/index.html#s6' },
      { label: '8.7 数据分析',       href: '/chapters/08-scenarios/index.html#s7' },
      { label: '8.8 DevOps 辅助',    href: '/chapters/08-scenarios/index.html#s8' },
    ],
  },
  {
    title: '第九章：实战项目案例',
    href: '/chapters/09-projects/',
    items: [
      { label: '案例总览',              href: '/chapters/09-projects/index.html' },
      { label: '从零构建门户网站',      href: '/chapters/09-projects/portal.html' },
      { label: '构建管理后台系统',      href: '/chapters/09-projects/admin.html' },
      { label: '开发一个小游戏',        href: '/chapters/09-projects/game.html' },
      { label: '开发移动端 APP',        href: '/chapters/09-projects/app.html' },
      { label: '构建 Chrome 扩展',      href: '/chapters/09-projects/extension.html' },
      { label: '开发 CLI 工具',         href: '/chapters/09-projects/cli-tool.html' },
    ],
  },
  {
    title: '第十章：常见问题',
    href: '/chapters/10-faq/',
    items: [
      { label: '10.1 上下文超限',     href: '/chapters/10-faq/index.html#s1' },
      { label: '10.2 拒绝执行操作',   href: '/chapters/10-faq/index.html#s2' },
      { label: '10.3 权限报错排查',   href: '/chapters/10-faq/index.html#s3' },
      { label: '10.4 输出质量不稳定', href: '/chapters/10-faq/index.html#s4' },
      { label: '10.5 API 限流重试',   href: '/chapters/10-faq/index.html#s5' },
      { label: '10.6 成本控制技巧',   href: '/chapters/10-faq/index.html#s6' },
      { label: '10.7 安全注意事项',   href: '/chapters/10-faq/index.html#s7' },
    ],
  },
];

/* ── 工具函数 ─────────────────────────────────────────────── */

/** 将 href 规范化为不含 hash 的路径，便于匹配当前页 */
function normalizePath(href) {
  try {
    const url = new URL(href, location.origin);
    return url.pathname;
  } catch {
    return href.split('#')[0];
  }
}

/** 当前页路径 */
function currentPath() {
  let p = location.pathname;
  // 去掉末尾 /，但保留根路径
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/** 检查某个 href 是否对应当前页 */
function isCurrentPage(href) {
  const target = normalizePath(href);
  const cur = currentPath();
  // 精确匹配，或 /index.html 与 / 互换
  if (target === cur) return true;
  if (target === '/index.html' && cur === '/') return true;
  if (target === '/' && cur === '/index.html') return true;
  return false;
}

/** 检查某个组下是否有当前页（用于默认展开） */
function groupHasCurrent(group) {
  return group.items.some(item => isCurrentPage(item.href));
}

/* ── 渲染 ─────────────────────────────────────────────────── */

function buildNav(container) {
  if (!container) return;

  const fragment = document.createDocumentFragment();

  NAV_DATA.forEach((group, idx) => {
    const hasCurrent = groupHasCurrent(group);

    if (idx === 0) {
      // 第一组（快速开始）不折叠，直接渲染
      const label = document.createElement('div');
      label.className = 'nav-group__title';
      label.textContent = group.title;
      fragment.appendChild(label);

      group.items.forEach(item => {
        fragment.appendChild(buildNavItem(item));
      });
      return;
    }

    // 可折叠章节
    const chapter = document.createElement('div');
    chapter.className = 'nav-chapter' + (hasCurrent ? ' is-open' : '');
    chapter.dataset.idx = idx;

    const header = document.createElement('div');
    header.className = 'nav-chapter__header';
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', hasCurrent ? 'true' : 'false');
    header.tabIndex = 0;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = group.title;

    const arrow = document.createElement('span');
    arrow.className = 'nav-chapter__arrow';
    arrow.innerHTML = '&#9654;'; // ▶

    header.appendChild(titleSpan);
    header.appendChild(arrow);

    const itemsWrapper = document.createElement('div');
    itemsWrapper.className = 'nav-chapter__items';
    // 折叠时隐藏
    if (!hasCurrent) itemsWrapper.style.display = 'none';

    group.items.forEach(item => {
      itemsWrapper.appendChild(buildNavItem(item));
    });

    header.addEventListener('click', () => toggleChapter(chapter, header, itemsWrapper));
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChapter(chapter, header, itemsWrapper);
      }
    });

    chapter.appendChild(header);
    chapter.appendChild(itemsWrapper);
    fragment.appendChild(chapter);
  });

  container.appendChild(fragment);
  scrollActiveIntoView(container);
}

function buildNavItem(item) {
  const a = document.createElement('a');
  a.className = 'nav-item' + (isCurrentPage(item.href) ? ' is-active' : '');
  a.href = item.href;
  a.textContent = item.label;
  return a;
}

function toggleChapter(chapter, header, itemsWrapper) {
  const isOpen = chapter.classList.contains('is-open');
  if (isOpen) {
    chapter.classList.remove('is-open');
    header.setAttribute('aria-expanded', 'false');
    // 动画收起
    itemsWrapper.style.height = itemsWrapper.scrollHeight + 'px';
    requestAnimationFrame(() => {
      itemsWrapper.style.transition = 'height 200ms ease, opacity 200ms ease';
      itemsWrapper.style.height = '0';
      itemsWrapper.style.opacity = '0';
      itemsWrapper.style.overflow = 'hidden';
    });
    itemsWrapper.addEventListener('transitionend', () => {
      itemsWrapper.style.display = 'none';
      itemsWrapper.style.height = '';
      itemsWrapper.style.opacity = '';
      itemsWrapper.style.transition = '';
      itemsWrapper.style.overflow = '';
    }, { once: true });
  } else {
    chapter.classList.add('is-open');
    header.setAttribute('aria-expanded', 'true');
    itemsWrapper.style.display = 'block';
    itemsWrapper.style.height = '0';
    itemsWrapper.style.opacity = '0';
    itemsWrapper.style.overflow = 'hidden';
    const targetHeight = itemsWrapper.scrollHeight + 'px';
    requestAnimationFrame(() => {
      itemsWrapper.style.transition = 'height 200ms ease, opacity 200ms ease';
      itemsWrapper.style.height = targetHeight;
      itemsWrapper.style.opacity = '1';
    });
    itemsWrapper.addEventListener('transitionend', () => {
      itemsWrapper.style.height = '';
      itemsWrapper.style.opacity = '';
      itemsWrapper.style.transition = '';
      itemsWrapper.style.overflow = '';
    }, { once: true });
  }
}

/** 将当前激活项滚动到侧边栏可视区 */
function scrollActiveIntoView(container) {
  const active = container.querySelector('.nav-item.is-active');
  if (!active) return;
  requestAnimationFrame(() => {
    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const itemTop = active.offsetTop;
    const itemBottom = itemTop + active.offsetHeight;
    if (itemTop < containerTop || itemBottom > containerBottom) {
      active.scrollIntoView({ block: 'center' });
    }
  });
}

/* ── 移动端侧边栏开关 ─────────────────────────────────────── */

function initMobileSidebar(sidebar, overlay, toggleBtn) {
  if (!sidebar || !overlay || !toggleBtn) return;

  function open() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function close() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? close() : open();
  });

  overlay.addEventListener('click', close);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
  });
}

/* ── 初始化入口 ───────────────────────────────────────────── */

function initNav() {
  const sidebar    = document.querySelector('.sidebar');
  const overlay    = document.querySelector('.sidebar-overlay');
  const toggleBtn  = document.querySelector('.sidebar-toggle');

  buildNav(sidebar);
  initMobileSidebar(sidebar, overlay, toggleBtn);
}

document.addEventListener('DOMContentLoaded', initNav);
