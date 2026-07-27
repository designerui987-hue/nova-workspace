/**
 * Knowledge Updates & Activity Feed Component
 * Explaining WHY knowledge matters & grouping activity noise into concise summaries.
 */

export function renderKnowledgeSection(items) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(168,85,247,0.15);color:#a855f7">🧠</div>
          <div>
            <h2 class="card-title">Knowledge Updates</h2>
            <div class="card-subtitle">AI explanations on WHY updates matter to your active sprint</div>
          </div>
        </div>
        <button class="top-nav-btn" id="explore-knowledge-btn">
          <span>Explore All</span>
        </button>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        ${items.map(item => `
          <div class="knowledge-item-row" data-doc-id="${item.id}">
            <span style="font-size:20px;flex-shrink:0">${item.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
                <span style="font-weight:700;color:var(--text-1);font-size:13px" class="truncate">${item.title}</span>
                <span class="auth-preview-pill pill-violet" style="font-size:10px;padding:1px 6px">${item.category}</span>
              </div>
              <div style="font-size:11px;color:var(--v-300);font-weight:600">
                ✨ WHY IT MATTERS: ${item.aiRelevance} • 5 components affected • Referenced by Sprint 24
              </div>
            </div>
            <div style="font-size:10px;color:var(--text-4);text-align:right;flex-shrink:0">
              ${item.updatedAt}<br>by ${item.author}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderActivitySection(activities, activeFilter = 'all') {
  const groupedActivities = [
    { avatar: 'SL', name: 'Sarah Lin', text: 'completed 4 tasks in Sprint 24 Design Specs', time: '10 min ago', badge: 'Team' },
    { avatar: '✨', name: 'Nova AI Copilot', text: 'created 12 action items from live huddle transcript', time: '25 min ago', badge: 'AI' },
    { avatar: 'ER', name: 'Elena Rostova', text: 'updated 5 architecture documentation pages', time: '1 hour ago', badge: 'Projects' }
  ];

  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(245,158,11,0.15);color:#f59e0b">⚡</div>
          <div>
            <h2 class="card-title">Activity Feed (Grouped Summaries)</h2>
            <div class="card-subtitle">Condensed team updates and automated AI execution batches</div>
          </div>
        </div>

        <div style="display:flex;gap:4px">
          <button class="cmd-tab-chip ${activeFilter === 'all' ? 'active' : ''}" data-act-filter="all">All</button>
          <button class="cmd-tab-chip ${activeFilter === 'team' ? 'active' : ''}" data-act-filter="team">My Team</button>
          <button class="cmd-tab-chip ${activeFilter === 'ai' ? 'active' : ''}" data-act-filter="ai">AI</button>
          <button class="cmd-tab-chip ${activeFilter === 'projects' ? 'active' : ''}" data-act-filter="projects">Projects</button>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:8px">
        ${groupedActivities.map(act => `
          <div class="activity-item-card" style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-1);border-radius:8px;display:flex;align-items:center;gap:10px">
            <div class="member-avatar-mini" style="width:28px;height:28px;font-size:10px">${act.avatar}</div>
            <div style="flex:1;font-size:12px;color:var(--text-1)">
              <strong>${act.name}</strong> ${act.text}
            </div>
            <span style="font-size:10px;color:var(--text-4)">${act.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
