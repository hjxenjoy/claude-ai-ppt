Create a new chapter page for the tutorial site.

Usage: /new-chapter <chapter-number> <chapter-slug> <chapter-title>

Steps:
1. Create `chapters/<chapter-number>-<chapter-slug>/index.html` using the standard chapter template
2. Add the chapter to the sidebar navigation in `assets/js/nav.js`
3. Update `search-index.json` with the new chapter's sections
