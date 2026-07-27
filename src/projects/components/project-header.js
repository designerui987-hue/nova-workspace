/**
 * Project Header Component
 * Sticky project banner with key metrics, health status, team stack, and View Switcher tabs.
 */

export function renderProjectHeader(project, activeTab = 'overview') {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'kanban', label: 'Board (Kanban)', icon: '📌' },
    { id: 'table', label: 'Table (Spreadsheet)', icon: '📊' },
    { id: 'timeline', label: 'Timeline (Gantt)', icon: '🗓️' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'ai-manager', label: '✨ AI Manager', icon: '✨', isAI: true }
  ];

  return `
    <div class="project-detail-header">
      <div class="project-title-meta-row">
        <div style="display:flex;align-items:flex-start;gap:var(--s-4)">
          <button class="task-act-btn" id="back-to-projects-home-btn" style="height:36px;padding:0 12px;margin-top:2px">
            <span>← All Projects</span>
          </button>

          <div class="project-icon-avatar" style="width:48px;height:48px;font-size:24px;background:${project.color}15;border-color:${project.color}40">
            ${project.icon}
          </div>

          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="project-key-badge">${project.key}</span>
              <h1 style="font-size:var(--fs-2xl);font-weight:800;color:var(--text-1);letter-spacing:var(--ls-snug)">${project.name}</h1>
              <span class="project-status-badge" style="background:${project.healthColor}22;color:${project.healthColor};border:1px solid ${project.healthColor}44">
                ● ${project.health}
              </span>
            </div>
            <p style="font-size:var(--fs-sm);color:var(--text-3);margin-top:4px">${project.description}</p>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:var(--s-3)">
          <div class="members-avatar-stack">
            ${project.members.map(m => `<div class="member-avatar-mini" style="width:28px;height:28px;font-size:10px" title="${m.name} (${m.role})">${m.avatar}</div>`).join('')}
          </div>

          <button class="top-nav-btn primary-create" id="proj-new-task-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            <span>Add Task</span>
          </button>

          <button class="top-nav-btn" id="proj-ai-report-btn">
            <span>✨ AI Report</span>
          </button>
        </div>
      </div>

      <!-- View Switcher Tabs -->
      <div class="project-views-tab-bar" role="tablist">
        ${tabs.map(t => `
          <button class="project-view-tab ${activeTab === t.id ? 'active' : ''}" data-view-tab="${t.id}" role="tab">
            <span>${t.icon}</span>
            <span>${t.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
