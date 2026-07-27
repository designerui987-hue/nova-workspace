/**
 * Tasks Hero & Filter Bar Component
 * Hero metrics, Search & Filter bar, and 7-View Switcher Tabs.
 */

export function renderTasksHero(data, activeTab = 'my-work', activeFilter = {}) {
  const m = data.metrics;

  const views = [
    { id: 'my-work', label: 'My Work', icon: '👤' },
    { id: 'list', label: 'List View', icon: '📋' },
    { id: 'board', label: 'Board (Kanban)', icon: '📌' },
    { id: 'table', label: 'Table (Spreadsheet)', icon: '📊' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'matrix', label: 'Priority Matrix', icon: '🔲' },
    { id: 'focus-mode', label: '🎯 Focus Mode', icon: '🎯', isFocus: true }
  ];

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Hero Banner -->
      <div class="tasks-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="tasks-hero-title">Task Management Workspace</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              Intelligent task prioritization, time tracking, and deep work focus mode powered by AI.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.today}</div>
                <div class="hero-metric-lbl">Today's Focus</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--e-400)">${m.completedToday}</div>
                <div class="hero-metric-lbl">Completed Today</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:${m.overdue > 0 ? '#f87171' : 'var(--text-3)'}">${m.overdue}</div>
                <div class="hero-metric-lbl">Overdue</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(110,74,255,0.3);background:rgba(110,74,255,0.1)">
                  <div class="hero-metric-val" style="color:var(--v-300)">${m.aiFocusScore}/100</div>
                  <div class="hero-metric-lbl">AI Focus Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="create-task-main-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Create Task</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="ai-plan-day-btn">
                <span>✨ Plan Day</span>
              </button>
              <button class="top-nav-btn" id="quick-focus-mode-btn">
                <span>🎯 Start Focus Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter Bar -->
      <div class="projects-filter-bar">
        <div class="filter-input-wrap">
          <input class="form-input" type="text" id="tasks-search-input" placeholder="Search tasks by title, tag, or project..." style="height:36px;font-size:13px" />
        </div>

        <select class="filter-select" id="filter-task-priority">
          <option value="all">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select class="filter-select" id="filter-task-status">
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="review">In Review</option>
          <option value="done">Completed</option>
        </select>
      </div>

      <!-- 7-View Switcher Tabs -->
      <div class="task-views-tab-bar" role="tablist">
        ${views.map(v => `
          <button class="task-view-tab ${v.isFocus ? 'focus-mode-tab' : ''} ${activeTab === v.id ? 'active' : ''}" data-task-view-tab="${v.id}" role="tab">
            <span>${v.icon}</span>
            <span>${v.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
