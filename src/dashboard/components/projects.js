/**
 * Recent Projects Component — Section 4
 * Grid & List views, health indicators, task counts, team avatars, favorite toggles.
 */

export function renderRecentProjects(projects, currentView = 'grid') {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(6,182,212,0.15);color:#06b6d4">📁</div>
          <div>
            <h2 class="card-title">Recent Projects</h2>
            <div class="card-subtitle">Active roadmaps and team deliverables</div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:8px">
          <button class="top-nav-btn ${currentView === 'grid' ? 'primary-create' : ''}" id="project-grid-toggle" title="Grid View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button class="top-nav-btn ${currentView === 'list' ? 'primary-create' : ''}" id="project-list-toggle" title="List View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button class="top-nav-btn" id="new-project-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            <span>New Project</span>
          </button>
        </div>
      </div>

      <div class="${currentView === 'grid' ? 'projects-grid' : 'projects-list-container'}" id="projects-view-container">
        ${projects.map(proj => renderProjectCard(proj, currentView)).join('')}
      </div>
    </div>
  `;
}

function renderProjectCard(proj, viewMode) {
  if (viewMode === 'list') {
    return `
      <div class="knowledge-item-row" data-project-id="${proj.id}">
        <span style="font-size:20px">${proj.icon}</span>
        <div style="flex:1">
          <div style="font-weight:600;color:var(--text-1)">${proj.name}</div>
          <div style="font-size:12px;color:var(--text-3)">${proj.category} • ${proj.lastUpdate}</div>
        </div>
        <div style="width:120px">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${proj.progress}%;background:${proj.color}"></div>
          </div>
          <div style="font-size:11px;color:var(--text-3);text-align:right;margin-top:2px">${proj.progress}% (${proj.tasksCompleted}/${proj.totalTasks})</div>
        </div>
        <span class="project-status-badge" style="background:${proj.statusColor}22;color:${proj.statusColor}">
          ${proj.status}
        </span>
      </div>
    `;
  }

  return `
    <div class="project-card-item" data-project-id="${proj.id}">
      <div>
        <div class="project-header-top">
          <div class="project-icon-avatar">${proj.icon}</div>
          <span class="project-status-badge" style="background:${proj.statusColor}22;color:${proj.statusColor};border:1px solid ${proj.statusColor}44">
            ${proj.status}
          </span>
        </div>

        <div style="margin-top:var(--s-3)">
          <div class="project-title-name">${proj.name}</div>
          <div class="project-category-text">${proj.category}</div>
        </div>
      </div>

      <div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);margin-bottom:6px">
          <span>Progress</span>
          <span style="font-weight:600;color:var(--text-1)">${proj.progress}%</span>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${proj.progress}%;background:${proj.color}"></div>
        </div>

        <div class="project-footer-meta" style="margin-top:var(--s-4)">
          <div class="members-avatar-stack">
            ${proj.members.map(m => `<div class="member-avatar-mini" title="${m.name}">${m.avatar}</div>`).join('')}
          </div>
          <span>${proj.tasksCompleted}/${proj.totalTasks} Tasks</span>
        </div>
      </div>
    </div>
  `;
}
