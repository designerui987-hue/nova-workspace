/**
 * Meetings Home View Component
 * Hero banner, metrics summary, category filters, and Grid/List meeting cards.
 */

export function renderMeetingsHome(data, currentViewMode = 'grid') {
  const m = data.metrics;

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Meetings Hero Banner -->
      <div class="meetings-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="meetings-hero-title">Meetings & AI Collaboration</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              AI-powered meeting workspace. Every meeting produces structured decisions, transcripts, and tasks.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.todayMeetings}</div>
                <div class="hero-metric-lbl">Today's Syncs</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:#f87171">1 Live</div>
                <div class="hero-metric-lbl">In Progress</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--v-300)">${m.decisionsLogged}</div>
                <div class="hero-metric-lbl">Decisions Logged</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.1)">
                  <div class="hero-metric-val" style="color:#34d399">${m.aiPreparedScore}%</div>
                  <div class="hero-metric-lbl">AI Prep Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="schedule-meeting-wizard-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Schedule Meeting</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="start-instant-huddle-btn" style="background:#ef4444;color:white;border:none">
                <span>🚀 Instant Huddle</span>
              </button>
              <button class="top-nav-btn" id="ai-prep-all-btn">
                <span>✨ AI Prep All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="projects-filter-bar">
        <div class="filter-input-wrap">
          <input class="form-input" type="text" id="meetings-search-input" placeholder="Search meetings by title, decision, or attendee..." style="height:36px;font-size:13px" />
        </div>

        <select class="filter-select" id="filter-mtg-category">
          <option value="all">All Categories</option>
          <option value="Design & Architecture">Design & Architecture</option>
          <option value="AI Architecture">AI Architecture</option>
          <option value="Agile & Planning">Agile & Planning</option>
        </select>

        <div style="display:flex;align-items:center;gap:4px;margin-left:auto">
          <button class="top-nav-btn ${currentViewMode === 'grid' ? 'primary-create' : ''}" id="mtg-grid-toggle" title="Grid View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button class="top-nav-btn ${currentViewMode === 'list' ? 'primary-create' : ''}" id="mtg-list-toggle" title="List View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Meetings Cards Container -->
      <div class="${currentViewMode === 'grid' ? 'projects-grid' : 'projects-list-container'}" id="meetings-cards-container">
        ${data.meetings.map(mtg => renderMeetingHomeCard(mtg, currentViewMode)).join('')}
      </div>
    </div>
  `;
}

function renderMeetingHomeCard(mtg, viewMode) {
  const statusColor = mtg.status === 'live' ? '#ef4444' : mtg.status === 'upcoming' ? '#06b6d4' : '#22c55e';
  const statusLabel = mtg.status === 'live' ? '● LIVE NOW' : mtg.status === 'upcoming' ? 'Upcoming' : 'Completed';

  if (viewMode === 'list') {
    return `
      <div class="knowledge-item-row" data-open-meeting-id="${mtg.id}" style="cursor:pointer;padding:var(--s-4)">
        <span style="font-size:24px">${mtg.status === 'live' ? '🔴' : '🎥'}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:700;color:var(--text-1);font-size:15px">${mtg.title}</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${mtg.category}</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-top:2px">
            ${mtg.time} (${mtg.duration}) • Host: ${mtg.organizer.name}
          </div>
        </div>
        <span class="project-status-badge" style="background:${statusColor}22;color:${statusColor};border:1px solid ${statusColor}44">
          ${statusLabel}
        </span>
      </div>
    `;
  }

  return `
    <div class="project-card-item" data-open-meeting-id="${mtg.id}">
      <div>
        <div class="project-header-top">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:24px">${mtg.status === 'live' ? '🔴' : '🎥'}</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${mtg.category}</span>
          </div>
          <span class="project-status-badge" style="background:${statusColor}22;color:${statusColor};border:1px solid ${statusColor}44">
            ${statusLabel}
          </span>
        </div>

        <div style="margin-top:var(--s-4)">
          <div class="project-title-name">${mtg.title}</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:4px">${mtg.time} (${mtg.duration})</div>
        </div>

        <div style="font-size:12px;color:var(--text-2);margin-top:var(--s-3);line-height:1.4">
          Objective: <strong>${mtg.objective}</strong>
        </div>
      </div>

      <div style="margin-top:var(--s-4);padding-top:var(--s-3);border-top:1px solid var(--border-1)">
        <div class="project-footer-meta">
          <div class="members-avatar-stack">
            ${mtg.attendees.map(a => `<div class="member-avatar-mini" title="${a.name}">${a.avatar}</div>`).join('')}
          </div>
          <button class="top-nav-btn primary-create" style="height:28px;font-size:11px" data-action="launch-meeting-mode" data-meeting-id="${mtg.id}">
            <span>${mtg.status === 'live' ? 'Join Huddle' : mtg.status === 'upcoming' ? 'Prep & Agenda' : 'View Summary'} →</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
