/* ============================================================
   search.js — 全文搜索：索引加载、关键词匹配、结果渲染
   ============================================================ */

const Search = (() => {
  let index = [];       // 搜索索引数组
  let loaded = false;   // 索引是否已加载
  let activeIdx = -1;   // 键盘导航当前项

  /* ── 索引加载 ─────────────────────────────────────────────── */

  async function loadIndex() {
    if (loaded) return;
    try {
      const res = await fetch('/search-index.json');
      if (!res.ok) throw new Error('fetch failed');
      index = await res.json();
      loaded = true;
    } catch {
      // 索引尚未生成时静默降级
      index = [];
      loaded = true;
    }
  }

  /* ── 搜索逻辑 ─────────────────────────────────────────────── */

  /**
   * 对 index 做关键词匹配，返回最多 10 条结果
   * 每条格式：{ title, chapter, href, excerpt, score }
   */
  function query(raw) {
    const q = raw.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const keywords = q.split(/\s+/).filter(Boolean);

    const scored = index.map(entry => {
      const titleLower   = (entry.title   || '').toLowerCase();
      const bodyLower    = (entry.body    || '').toLowerCase();
      const chapterLower = (entry.chapter || '').toLowerCase();

      let score = 0;
      for (const kw of keywords) {
        if (titleLower.includes(kw))   score += 10;
        if (chapterLower.includes(kw)) score += 3;
        if (bodyLower.includes(kw))    score += 1;
      }

      return { ...entry, score };
    });

    return scored
      .filter(e => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(e => ({
        title:   e.title,
        chapter: e.chapter,
        href:    e.href,
        excerpt: buildExcerpt(e.body || '', keywords),
        score:   e.score,
      }));
  }

  /** 从 body 文本中截取命中片段（约 80 字） */
  function buildExcerpt(body, keywords) {
    const lower = body.toLowerCase();
    let pos = -1;
    for (const kw of keywords) {
      pos = lower.indexOf(kw);
      if (pos !== -1) break;
    }
    if (pos === -1) return body.slice(0, 80) + (body.length > 80 ? '…' : '');
    const start = Math.max(0, pos - 20);
    const end   = Math.min(body.length, pos + 60);
    return (start > 0 ? '…' : '') + body.slice(start, end) + (end < body.length ? '…' : '');
  }

  /** 高亮文本中的关键词，返回 HTML 字符串 */
  function highlight(text, keywords) {
    if (!text) return '';
    let escaped = text.replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
    for (const kw of keywords) {
      const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      escaped = escaped.replace(re, m => `<mark>${m}</mark>`);
    }
    return escaped;
  }

  /* ── DOM 渲染 ─────────────────────────────────────────────── */

  function renderResults(results, container, keywords) {
    container.innerHTML = '';
    activeIdx = -1;

    if (!results.length) {
      const empty = document.createElement('div');
      empty.style.cssText = 'padding:12px 16px;font-size:.875rem;color:var(--color-text-muted)';
      empty.textContent = '未找到相关内容';
      container.appendChild(empty);
      return;
    }

    results.forEach((r, i) => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = r.href;
      a.dataset.idx = i;

      const chapter = document.createElement('div');
      chapter.className = 'search-result-item__chapter';
      chapter.textContent = r.chapter || '';

      const title = document.createElement('div');
      title.className = 'search-result-item__title';
      title.innerHTML = highlight(r.title, keywords);

      const excerpt = document.createElement('div');
      excerpt.className = 'search-result-item__excerpt';
      excerpt.innerHTML = highlight(r.excerpt, keywords);

      a.appendChild(chapter);
      a.appendChild(title);
      a.appendChild(excerpt);
      container.appendChild(a);
    });
  }

  function showResults(container) {
    container.style.display = 'block';
  }

  function hideResults(container) {
    container.style.display = 'none';
    activeIdx = -1;
  }

  /* ── 键盘导航 ─────────────────────────────────────────────── */

  function moveActive(container, dir) {
    const items = container.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (activeIdx >= 0) items[activeIdx].classList.remove('is-focused');

    activeIdx = (activeIdx + dir + items.length) % items.length;
    items[activeIdx].classList.add('is-focused');
    items[activeIdx].scrollIntoView({ block: 'nearest' });
  }

  function confirmActive(container) {
    if (activeIdx < 0) return false;
    const items = container.querySelectorAll('.search-result-item');
    if (items[activeIdx]) {
      location.href = items[activeIdx].href;
      return true;
    }
    return false;
  }

  /* ── 初始化 ───────────────────────────────────────────────── */

  function init() {
    const input     = document.querySelector('.top-bar__search-input');
    const wrapper   = document.querySelector('.top-bar__search');
    if (!input || !wrapper) return;

    // 结果容器
    let resultsEl = wrapper.querySelector('.search-results');
    if (!resultsEl) {
      resultsEl = document.createElement('div');
      resultsEl.className = 'search-results';
      resultsEl.setAttribute('role', 'listbox');
      resultsEl.style.display = 'none';
      wrapper.appendChild(resultsEl);
    }

    let debounceTimer = null;

    // 首次聚焦时预加载索引
    input.addEventListener('focus', () => {
      loadIndex();
      if (input.value.trim().length >= 2) showResults(resultsEl);
    }, { once: true });

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        await loadIndex();
        const q = input.value.trim();
        if (q.length < 2) { hideResults(resultsEl); return; }
        const keywords = q.toLowerCase().split(/\s+/).filter(Boolean);
        const results  = query(q);
        renderResults(results, resultsEl, keywords);
        showResults(resultsEl);
      }, 150);
    });

    input.addEventListener('keydown', e => {
      if (resultsEl.style.display === 'none') return;
      switch (e.key) {
        case 'ArrowDown':  e.preventDefault(); moveActive(resultsEl,  1); break;
        case 'ArrowUp':    e.preventDefault(); moveActive(resultsEl, -1); break;
        case 'Enter':      confirmActive(resultsEl); break;
        case 'Escape':     hideResults(resultsEl); input.blur(); break;
      }
    });

    // 点击外部关闭
    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) hideResults(resultsEl);
    });

    // 点击结果项后关闭
    resultsEl.addEventListener('click', () => hideResults(resultsEl));

    // 全局快捷键 / 或 Ctrl+K 聚焦搜索框
    document.addEventListener('keydown', e => {
      if (
        (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) &&
        document.activeElement !== input &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  return { init, query };
})();

document.addEventListener('DOMContentLoaded', Search.init);
