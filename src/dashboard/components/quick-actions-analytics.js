/**
 * Quick Actions & Workspace Analytics Component — Sections 8 & 9
 * Large quick action cards with visible keyboard shortcuts & interactive SVG analytics charts.
 */

export function renderQuickActions(actions) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">⚡</div>
          <div>
            <h2 class="card-title">Quick Actions</h2>
            <div class="card-subtitle">Launch workflows with keyboard shortcuts</div>
          </div>
        </div>
      </div>

      <div class="quick-actions-grid">
        ${actions.map(qa => `
          <div class="quick-action-card" data-qa-id="${qa.id}">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div class="qa-icon-box">${qa.icon}</div>
              <span class="qa-kbd">${qa.shortcut}</span>
            </div>
            <div>
              <div class="qa-title">${qa.title}</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:2px">${qa.description}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderAnalyticsSection(analytics) {
  const chartBars = analytics.weeklyProductivityData.map((d, i) => {
    const heightTasks = (d.tasks / 12) * 50;
    const heightAI = (d.aiActions / 40) * 50;

    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1">
        <div style="height:60px;display:flex;align-items:flex-end;gap:3px;width:100%;justify-content:center">
          <div style="height:${heightTasks}px;width:10px;background:var(--v-500);border-radius:3px" title="Tasks: ${d.tasks}"></div>
          <div style="height:${heightAI}px;width:10px;background:var(--c-400);border-radius:3px" title="AI Actions: ${d.aiActions}"></div>
        </div>
        <span style="font-size:11px;color:var(--text-3);font-weight:600">${d.day}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(34,197,94,0.15);color:#22c55e">📊</div>
          <div>
            <h2 class="card-title">Workspace Analytics</h2>
            <div class="card-subtitle">Productivity velocity & AI automation ROI</div>
          </div>
        </div>
        <span class="auth-preview-pill pill-green" style="font-size:11px">${analytics.completionTrend}</span>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:var(--s-4);margin-bottom:var(--s-6)">
        <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
          <div style="font-size:12px;color:var(--text-3)">Completed Tasks</div>
          <div style="font-size:24px;font-weight:800;color:var(--text-1);margin-top:4px">${analytics.tasksCompletedThisWeek}</div>
          <div style="font-size:11px;color:#34d399;margin-top:2px">↑ ${analytics.completionTrend}</div>
        </div>

        <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
          <div style="font-size:12px;color:var(--text-3)">Meeting Time</div>
          <div style="font-size:24px;font-weight:800;color:var(--text-1);margin-top:4px">${analytics.meetingHoursThisWeek}h</div>
          <div style="font-size:11px;color:#60a5fa;margin-top:2px">${analytics.meetingTrend}</div>
        </div>

        <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
          <div style="font-size:12px;color:var(--text-3)">AI Automations</div>
          <div style="font-size:24px;font-weight:800;color:var(--text-1);margin-top:4px">${analytics.aiAutomationsExecuted}</div>
          <div style="font-size:11px;color:var(--v-300);margin-top:2px">⚡ ${analytics.aiSavingsHours}</div>
        </div>
      </div>

      <div style="background:var(--bg-elevated);padding:var(--s-5);border-radius:var(--r-5);border:1px solid var(--border-1)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--s-4)">
          <span style="font-size:13px;font-weight:600;color:var(--text-1)">Weekly Activity (Tasks vs AI)</span>
          <div style="display:flex;gap:12px;font-size:11px">
            <span style="color:var(--v-400)">● Tasks Completed</span>
            <span style="color:var(--c-400)">● AI Actions</span>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          ${chartBars}
        </div>
      </div>
    </div>
  `;
}
