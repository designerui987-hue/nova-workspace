/**
 * Upcoming Meetings Component — Section 5
 * Timeline view of scheduled syncs, AI agenda prep, and one-click join links.
 */

export function renderUpcomingMeetings(meetings) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(34,197,94,0.15);color:#22c55e">🎥</div>
          <div>
            <h2 class="card-title">Upcoming Meetings</h2>
            <div class="card-subtitle">Today's schedule & AI pre-meeting briefs</div>
          </div>
        </div>
        <button class="top-nav-btn" id="schedule-meeting-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>Schedule</span>
        </button>
      </div>

      <div class="meeting-timeline-list">
        ${meetings.map(mtg => renderMeetingItem(mtg)).join('')}
      </div>
    </div>
  `;
}

function renderMeetingItem(mtg) {
  return `
    <div class="meeting-item-card ${mtg.isNext ? 'next-up' : ''}" data-meeting-id="${mtg.id}">
      <div class="meeting-time-col">
        <div>${mtg.time.split('–')[0].trim()}</div>
        <div style="font-size:10px;color:var(--text-4);margin-top:2px">${mtg.duration}</div>
      </div>

      <div class="meeting-node-dot"></div>

      <div class="meeting-content-box">
        <div class="meeting-top-header">
          <div style="display:flex;align-items:center;gap:8px">
            <span class="meeting-title">${mtg.title}</span>
            ${mtg.isNext ? `<span class="auth-preview-pill pill-violet" style="font-size:10px;padding:2px 6px">NEXT UP</span>` : ''}
          </div>
          <span style="font-size:11px;color:var(--v-300);font-weight:600">● ${mtg.prepStatus}</span>
        </div>

        <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">
          Objective: <strong>${mtg.objective}</strong>
        </div>

        <div class="meeting-ai-briefing-box" style="padding:8px 12px;background:rgba(110,74,255,0.08);border-radius:6px;font-size:12px;color:var(--text-2);border-left:3px solid var(--v-400)">
          ✨ <strong>AI Prep Brief:</strong> ${mtg.aiBriefing}
        </div>

        <div class="meeting-actions-row">
          <button class="top-nav-btn primary-create" style="height:30px;padding:0 12px;font-size:12px" data-action="join-meeting" data-meeting-id="${mtg.id}">
            <span>Join Meeting</span>
          </button>

          <button class="top-nav-btn" style="height:30px;padding:0 12px;font-size:12px" data-action="ai-prep" data-meeting-id="${mtg.id}">
            <span>✨ Prepare with AI</span>
          </button>

          <div class="members-avatar-stack" style="margin-left:auto">
            ${mtg.attendees.map(a => `<div class="member-avatar-mini" title="${a.name}">${a.avatar}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
