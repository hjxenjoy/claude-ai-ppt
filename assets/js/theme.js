/* ============================================================
   theme.js — 暗色主题基础（预留明暗切换扩展口）
   ============================================================ */

const Theme = (() => {
  const STORAGE_KEY = 'claude-ppt-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  /* ── 读写持久化 ───────────────────────────────────────────── */

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function save(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }

  /* ── 应用主题 ─────────────────────────────────────────────── */

  function apply(theme) {
    document.documentElement.dataset.theme = theme;

    // 更新 <meta name="color-scheme">
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      document.head.appendChild(meta);
    }
    meta.content = theme === LIGHT ? 'light' : 'dark';

    // 更新切换按钮状态（如果存在）
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === LIGHT ? '切换到暗色模式' : '切换到亮色模式');
      btn.dataset.current = theme;
    }
  }

  /* ── 获取当前主题 ─────────────────────────────────────────── */

  function current() {
    return document.documentElement.dataset.theme || DARK;
  }

  /* ── 切换（扩展口） ───────────────────────────────────────── */

  function toggle() {
    const next = current() === DARK ? LIGHT : DARK;
    apply(next);
    save(next);
    return next;
  }

  /* ── 初始化 ───────────────────────────────────────────────── */

  function init() {
    // 优先级：localStorage → 系统偏好 → 默认 dark
    const saved  = getSaved();
    const system = window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
    const theme  = saved || system;

    apply(theme);

    // 监听系统主题变化（用户未手动覆盖时跟随系统）
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!getSaved()) apply(e.matches ? LIGHT : DARK);
    });

    // 绑定切换按钮（如果存在）
    document.addEventListener('click', e => {
      if (e.target.closest('.theme-toggle')) toggle();
    });
  }

  // 尽早执行，避免闪白（在 <head> 内 script 引入时生效）
  const earlyTheme = getSaved() ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK);
  apply(earlyTheme);

  return { init, toggle, current };
})();

// DOMContentLoaded 后完整初始化（绑定按钮等）
document.addEventListener('DOMContentLoaded', Theme.init);
