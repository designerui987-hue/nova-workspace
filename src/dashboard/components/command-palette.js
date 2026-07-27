/**
 * Global Command Palette (⌘K) & Smart Search Component — Sections 11 & 12
 * Keyboard-first command palette modal with fuzzy search across Tasks, Projects, Docs, AI Actions, and Team.
 */

export function renderCommandPaletteModal() {
  return `
    <div class="modal-overlay-backdrop" id="cmd-palette-backdrop" aria-hidden="true">
      <div class="command-palette-box" id="cmd-palette-box">
        <div class="cmd-search-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--v-400)" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input class="cmd-search-input" id="cmd-search-input" type="text" placeholder="Type a command or search (e.g. 'design system', 'create task')..." autocomplete="off" />
          <span class="search-kbd-badge">ESC to close</span>
        </div>

        <div class="cmd-filter-tabs" id="cmd-filter-tabs">
          <button class="cmd-tab-chip active" data-cmd-category="all">All</button>
          <button class="cmd-tab-chip" data-cmd-category="tasks">Tasks</button>
          <button class="cmd-tab-chip" data-cmd-category="projects">Projects</button>
          <button class="cmd-tab-chip" data-cmd-category="docs">Knowledge</button>
          <button class="cmd-tab-chip" data-cmd-category="ai">AI Actions</button>
          <button class="cmd-tab-chip" data-cmd-category="people">People</button>
        </div>

        <div class="cmd-results-list" id="cmd-results-container">
          <!-- Dynamic results rendered by JS -->
        </div>
      </div>
    </div>
  `;
}

export function generateCommandItems(query = '', category = 'all', data) {
  const items = [
    { type: 'ai', title: '✨ Ask AI Copilot to summarize workspace status', subtitle: 'AI Command', icon: '✨', action: 'ask-ai-summary' },
    { type: 'tasks', title: 'Finalize Design System v2.0 CSS Tokens', subtitle: 'Task • Urgent', icon: '🎯', action: 'open-task-101' },
    { type: 'tasks', title: 'Review Q3 Mobile Navigation Wireframes', subtitle: 'Task • High', icon: '🎯', action: 'open-task-102' },
    { type: 'projects', title: 'Nova UI Design System 2.0', subtitle: 'Project • 82% Complete', icon: '🎨', action: 'open-proj-1' },
    { type: 'projects', title: 'AI Workflow Automation Engine', subtitle: 'Project • At Risk', icon: '⚡', action: 'open-proj-2' },
    { type: 'docs', title: 'Nova Design Tokens Spec v2.0', subtitle: 'Document • Updated 12m ago', icon: '📄', action: 'open-doc-1' },
    { type: 'docs', title: 'AI Copilot Context Window Specs', subtitle: 'Technical Spec', icon: '🧠', action: 'open-doc-2' },
    { type: 'people', title: 'Sarah Lin (Senior UX Designer)', subtitle: 'Team Member • Available', icon: '👤', action: 'open-person-sl' },
    { type: 'people', title: 'Marcus Chen (Frontend Engineer)', subtitle: 'Team Member • In a Meeting', icon: '👤', action: 'open-person-mc' },
    { type: 'ai', title: '✨ Generate automated weekly report', subtitle: 'AI Action', icon: '📊', action: 'generate-report' }
  ];

  let filtered = items;
  if (category !== 'all') {
    filtered = filtered.filter(i => i.type === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(i => i.title.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    return `
      <div style="padding:var(--s-8);text-align:center;color:var(--text-3)">
        <div style="font-size:24px;margin-bottom:8px">🔍</div>
        <div style="font-weight:600;color:var(--text-1)">No matching commands or items found</div>
        <div style="font-size:12px;margin-top:4px">Try searching for "Tokens", "Sprint", or "AI"</div>
      </div>
    `;
  }

  return filtered.map((item, idx) => `
    <div class="cmd-result-item ${idx === 0 ? 'selected' : ''}" data-cmd-action="${item.action}">
      <span style="font-size:16px">${item.icon}</span>
      <div style="flex:1">
        <div style="font-weight:600;color:var(--text-1);font-size:13px">${item.title}</div>
        <div style="font-size:11px;color:var(--text-3)">${item.subtitle}</div>
      </div>
      <span class="search-kbd-badge">↵ Select</span>
    </div>
  `).join('');
}
