/**
 * Knowledge Updates & Activity Feed Component — Sections 6 & 7
 * Real-time workspace collaboration feed & intelligent knowledge updates with AI relevance tags.
 */

export function renderKnowledgeSection(items) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(168,85,247,0.15);color:#a855f7">🧠</div>
          <div>
            <h2 class="card-title">Knowledge Updates</h2>
            <div class="card-subtitle">AI-filtered docs & specs relevant to you</div>
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
                <span style="font-weight:600;color:var(--text-1);font-size:14px" class="truncate">${item.title}</span>
                <span class="auth-preview-pill pill-violet" style="font-size:10px;padding:1px 6px">${item.category}</span>
              </div>
              <div style="font-size:12px;color:var(--v-300)">✨ ${item.aiRelevance}</div>
            </div>
            <div style="font-size:11px;color:var(--text-4);text-align:right;flex-shrink:0">
              ${item.updatedAt}<br>by ${item.author}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderActivitySection(activities, activeFilter = 'all') {
  const filtered = activeFilter === 'all'
    ? activities
    : activeFilter === 'ai'
    ? activities.filter(a => a.user.isAI)
    : activities.filter(a => !a.user.isAI);

  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(245,158,11,0.15);color:#f59e0b">⚡</div>
          <div>
            <h2 class="card-title">Activity Feed</h2>
            <div class="card-subtitle">Live team collaboration & AI automations</div>
          </div>
        </div>

        <div style="display:flex;gap:4px">
          <button class="cmd-tab-chip ${activeFilter === 'all' ? 'active' : ''}" data-act-filter="all">All</button>
          <button class="cmd-tab-chip ${activeFilter === 'team' ? 'active' : ''}" data-act-filter="team">Team</button>
          <button class="cmd-tab-chip ${activeFilter === 'ai' ? 'active' : ''}" data-act-filter="ai">AI Actions</button>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        ${filtered.map(act => `
          <div class="activity-item-card">
            <div class="activity-avatar" style="${act.user.isAI ? 'background:linear-gradient(135deg,#6e4aff,#06b6d4)' : ''}">
              ${act.user.avatar}
            </div>
            <div class="activity-text-content" style="flex:1">
              <div>
                <strong>${act.user.name}</strong> ${act.action} <span style="color:var(--v-300);font-weight:600">${act.target}</span>
              </div>
              ${act.detail ? `<div style="font-size:12px;color:var(--text-3);margin-top:2px;font-style:italic">${act.detail}</div>` : ''}
              <div style="font-size:11px;color:var(--text-4);margin-top:4px">
                ${act.time} • in <span style="color:var(--text-2);font-weight:500">${act.project}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
