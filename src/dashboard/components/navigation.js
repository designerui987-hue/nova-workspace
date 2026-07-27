/**
 * Navigation Component — Top Nav & Left Sidebar
 */

export function renderTopNav(data) {
  const unreadCount = data.notifications.filter(n => !n.read).length;

  return `
    <header class="top-nav">
      <div class="top-nav-left">
        <button class="sidebar-toggle-btn" id="sidebar-toggle-trigger" aria-label="Toggle Navigation Sidebar" title="Toggle Sidebar (⌘B)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>

        <div class="ws-dropdown-btn" id="workspace-dropdown-trigger" role="button" tabindex="0">
          <div class="ws-icon-box">${data.workspace.icon}</div>
          <span class="ws-name-text">${data.workspace.name}</span>
          <span class="ws-badge-pro">${data.workspace.plan}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </div>

        <button class="global-search-trigger" id="cmd-palette-trigger" aria-label="Open Command Palette">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span>Search or jump to...</span>
          <span class="search-kbd-badge">⌘K</span>
        </button>
      </div>

      <div class="top-nav-right">
        <button class="top-nav-btn primary-create" id="quick-create-btn" title="Create new task or project">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>Create</span>
        </button>

        <button class="top-nav-btn" id="quick-ai-btn" title="Ask AI Copilot (⌘J)">
          <span>✨</span>
          <span>Ask AI</span>
        </button>

        <button class="top-nav-btn" id="notifications-trigger" title="Notifications" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          ${unreadCount > 0 ? `<span class="nav-notif-dot"></span>` : ''}
        </button>

        <button class="top-nav-btn" id="theme-toggle-btn" title="Toggle Theme" aria-label="Toggle Dark/Light Mode">
          <svg class="theme-sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>

        <div class="user-avatar-btn" id="user-profile-trigger" title="${data.user.name}">
          ${data.user.avatar}
        </div>
      </div>
    </header>
  `;
}

export function renderLeftSidebar(activeItem = 'dashboard') {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', badge: null },
    { id: 'projects', label: 'Projects', icon: '📁', badge: '12' },
    { id: 'tasks', label: 'Tasks', icon: '✅', badge: '8' },
    { id: 'documents', label: 'Documents', icon: '📄', badge: null },
    { id: 'meetings', label: 'Meetings', icon: '🎥', badge: '3' },
    { id: 'calendar', label: 'Calendar', icon: '📅', badge: null },
    { id: 'knowledge', label: 'Knowledge Hub', icon: '🧠', badge: null },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '✨', badge: 'AI', isAI: true },
    { id: 'automation', label: 'Automation', icon: '⚡', badge: null },
    { id: 'analytics', label: 'Analytics', icon: '📊', badge: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null }
  ];

  return `
    <aside class="left-sidebar" id="app-left-sidebar">
      <div class="sidebar-section-title">Workspace Menu</div>
      <nav class="sidebar-nav-list" role="navigation">
        ${navItems.map(item => `
          <a href="#" class="sidebar-nav-item ${item.id === activeItem ? 'active' : ''}" data-nav-id="${item.id}">
            <span class="sidebar-item-icon">${item.icon}</span>
            <span class="nav-item-label">${item.label}</span>
            ${item.badge ? `<span class="sidebar-badge ${item.isAI ? 'ai-sparkle' : ''}">${item.badge}</span>` : ''}
          </a>
        `).join('')}
      </nav>

      <div class="sidebar-footer">
        <a href="#" class="sidebar-nav-item" data-nav-id="context-toggle" id="context-panel-toggle-btn">
          <span class="sidebar-item-icon">⚡</span>
          <span class="nav-item-label">Toggle Context Panel</span>
        </a>
      </div>
    </aside>
  `;
}
