/**
 * Quick Actions & Workspace Analytics Component
 * Displaying 4 high-value actions + Executive Analytics KPIs.
 */

export function renderQuickActions() {
  const actions = [
    { id: 'qa-task', title: 'Create Task', icon: '✅', shortcut: 'C' },
    { id: 'qa-proj', title: 'Create Project', icon: '📁', shortcut: 'P' },
    { id: 'qa-doc',  title: 'Write Document', icon: '📄', shortcut: 'D' },
    { id: 'qa-mtg',  title: 'Start Meeting', icon: '🎥', shortcut: 'M' }
  ];

  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">⚡</div>
          <div>
            <h2 class="card-title">Quick Actions</h2>
            <div class="card-subtitle">Launch key workflows directly or press ⌘K</div>
          </div>
        </div>
      </div>

      <div class="quick-actions-grid" style="grid-template-columns:repeat(4,1fr)">
        ${actions.map(qa => `
          <div class="quick-action-card" data-qa-id="${qa.id}" style="padding:12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">${qa.icon}</span>
              <span style="font-size:13px;font-weight:700;color:var(--text-1)">${qa.title}</span>
            </div>
            <span class="search-kbd-badge" style="font-size:11px">${qa.shortcut}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderAnalyticsSection() {
  const kpis = [
    { label: 'Productivity Score', val: '94/100', sub: '↑ 12% vs last week', color: '#22c55e' },
    { label: 'Workspace Health', val: '92%', sub: 'SOC2 & GDPR Compliant', color: '#34d399' },
    { label: 'Focus Hours', val: '5.4h/day', sub: '68% of workday', color: '#06b6d4' },
    { label: 'Tasks Completed', val: '142', sub: '↑ 14% sprint velocity', color: '#6e4aff' },
    { label: 'Projects at Risk', val: '1', sub: 'Low Risk SLA', color: '#f59e0b' },
    { label: 'Automation Hours Saved', val: '184h/mo', sub: 'AI Workflows', color: '#34d399' },
    { label: 'AI Copilot Usage', val: '88%', sub: 'Active adoption', color: '#a855f7' },
    { label: 'Knowledge Growth', val: '572 Docs', sub: 'Verified Wiki', color: '#3b82f6' }
  ];

  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(34,197,94,0.15);color:#22c55e">📊</div>
          <div>
            <h2 class="card-title">Executive Analytics KPIs</h2>
            <div class="card-subtitle">Click any metric card to open deep-dive analytics</div>
          </div>
        </div>
        <button class="top-nav-btn" id="open-full-analytics-btn">
          <span>View Detailed Module →</span>
        </button>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px">
        ${kpis.map(kpi => `
          <div style="background:var(--bg-elevated);padding:14px;border-radius:10px;border:1px solid var(--border-1);cursor:pointer" onclick="window.location.href='analytics.html'">
            <div style="font-size:11px;color:var(--text-3);font-weight:600">${kpi.label}</div>
            <div style="font-size:22px;font-weight:800;color:var(--text-1);margin:4px 0">${kpi.val}</div>
            <div style="font-size:10px;color:${kpi.color};font-weight:600">${kpi.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
