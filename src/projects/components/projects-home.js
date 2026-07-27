/**
 * Projects Home View Component
 * Hero banner, metrics summary, search/filter bar, and Grid/List project cards.
 */

export function renderProjectsHome(data, currentViewMode = 'grid', activeFilter = {}) {
  const m = data.metrics;

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Projects Hero Banner -->
      <div class="projects-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="projects-hero-title">Projects Hub</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              Plan, execute, and deliver products with AI acting as your proactive team partner.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.total}</div>
                <div class="hero-metric-lbl">Total Projects</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--e-400)">${m.onTrack}</div>
                <div class="hero-metric-lbl">On Track</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--a-400)">${m.atRisk}</div>
                <div class="hero-metric-lbl">At Risk</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(110,74,255,0.3);background:rgba(110,74,255,0.1)">
                  <div class="hero-metric-val" style="color:var(--v-300)">${m.aiScore}/100</div>
                  <div class="hero-metric-lbl">AI Health Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="create-project-wizard-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>New Project</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="ai-generate-proj-btn">
                <span>✨ AI Generate</span>
              </button>
              <button class="top-nav-btn" id="template-proj-btn">
                <span>Templates</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search Bar -->
      <div class="projects-filter-bar">
        <div class="filter-input-wrap">
          <input class="form-input" type="text" id="projects-search-input" placeholder="Search projects by name, key, or category..." style="height:36px;font-size:13px" />
        </div>

        <select class="filter-select" id="filter-health-select">
          <option value="all">All Health</option>
          <option value="On Track">On Track</option>
          <option value="At Risk">At Risk</option>
          <option value="Near Completion">Near Completion</option>
        </select>

        <select class="filter-select" id="filter-category-select">
          <option value="all">All Categories</option>
          <option value="Design System">Design System</option>
          <option value="AI Engineering">AI Engineering</option>
          <option value="Mobile Apps">Mobile Apps</option>
          <option value="Data Engineering">Data Engineering</option>
        </select>

        <div style="display:flex;align-items:center;gap:4px;margin-left:auto">
          <button class="top-nav-btn ${currentViewMode === 'grid' ? 'primary-create' : ''}" id="home-view-grid-btn" title="Grid View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button class="top-nav-btn ${currentViewMode === 'list' ? 'primary-create' : ''}" id="home-view-list-btn" title="List View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Projects Grid / List View -->
      <div class="${currentViewMode === 'grid' ? 'projects-grid' : 'projects-list-container'}" id="projects-cards-container">
        ${data.projects.map(proj => renderProjectHomeCard(proj, currentViewMode)).join('')}
      </div>
    </div>
  `;
}

function renderProjectHomeCard(proj, viewMode) {
  if (viewMode === 'list') {
    return `
      <div class="knowledge-item-row" data-open-project-id="${proj.id}" style="cursor:pointer;padding:var(--s-4)">
        <span style="font-size:24px">${proj.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <span class="project-key-badge">${proj.key}</span>
            <span style="font-weight:700;color:var(--text-1);font-size:15px">${proj.name}</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-top:2px" class="truncate">${proj.description}</div>
        </div>
        <div style="width:140px">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width:${proj.progress}%;background:${proj.color}"></div>
          </div>
          <div style="font-size:11px;color:var(--text-3);text-align:right;margin-top:2px">${proj.progress}% Complete</div>
        </div>
        <span class="project-status-badge" style="background:${proj.healthColor}22;color:${proj.healthColor};border:1px solid ${proj.healthColor}44">
          ${proj.health}
        </span>
      </div>
    `;
  }

  return `
    <div class="project-card-item" data-open-project-id="${proj.id}">
      <div>
        <div class="project-header-top">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="project-icon-avatar" style="background:${proj.color}15;border-color:${proj.color}30">${proj.icon}</div>
            <div>
              <span class="project-key-badge">${proj.key}</span>
              <div class="project-category-text" style="margin-top:2px">${proj.category}</div>
            </div>
          </div>
          <span class="project-status-badge" style="background:${proj.healthColor}22;color:${proj.healthColor};border:1px solid ${proj.healthColor}44">
            ${proj.health}
          </span>
        </div>

        <div style="margin-top:var(--s-4)">
          <div class="project-title-name">${proj.name}</div>
          <div style="font-size:12px;color:var(--text-3);line-height:1.5;margin-top:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
            ${proj.description}
          </div>
        </div>
      </div>

      <div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);margin-bottom:6px">
          <span>Target: ${proj.targetDate}</span>
          <span style="font-weight:700;color:var(--text-1)">${proj.progress}%</span>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width:${proj.progress}%;background:${proj.color}"></div>
        </div>

        <div class="project-footer-meta" style="margin-top:var(--s-4)">
          <div class="members-avatar-stack">
            ${proj.members.map(m => `<div class="member-avatar-mini" title="${m.name} (${m.role})">${m.avatar}</div>`).join('')}
          </div>
          <button class="task-act-btn" data-action="open-project" data-project-id="${proj.id}">
            <span>Open →</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
