/**
 * Meetings Mode 1 — Upcoming & Agenda Prep View Component
 * Pre-meeting AI brief, agenda checklist, linked task context, and one-click join link.
 */

export function renderModeUpcoming(mtg) {
  return `
    <div style="padding-top:var(--s-6);display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Top Banner -->
      <div class="dash-card">
        <div style="display:flex;align-items:flex-start;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:var(--s-4)">
            <button class="task-act-btn" id="back-to-meetings-home-btn">← All Meetings</button>
            <div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="auth-preview-pill pill-violet" style="font-size:10px">${mtg.category}</span>
                <h1 style="font-size:var(--fs-2xl);font-weight:800;color:var(--text-1)">${mtg.title}</h1>
              </div>
              <div style="font-size:13px;color:var(--text-3);margin-top:4px">${mtg.time} (${mtg.duration}) • Organized by ${mtg.organizer.name}</div>
            </div>
          </div>

          <button class="top-nav-btn primary-create" id="join-live-huddle-btn" style="height:40px;padding:0 20px;font-size:14px">
            <span>🚀 Join Live Video Huddle</span>
          </button>
        </div>
      </div>

      <div class="dashboard-grid-12">
        <!-- Left Column (8 Cols): Agenda & AI Prep -->
        <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <!-- AI Pre-Meeting Brief Card -->
          <div class="dash-card ai-brief-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
              <div class="ai-header-badge">
                <span>✨ AI Pre-Meeting Briefing</span>
              </div>
              <span style="font-size:12px;color:var(--e-400);font-weight:600">● ${mtg.prepScore}% AI Prepared Score</span>
            </div>

            <div class="ai-summary-box">
              ${mtg.aiBriefing}
            </div>
          </div>

          <!-- Agenda Checklist Card -->
          <div class="dash-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">📋</div>
                <div>
                  <h2 class="card-title">Meeting Agenda & Timings</h2>
                  <div class="card-subtitle">Topics and time allocations</div>
                </div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:var(--s-3)">
              ${mtg.agenda.map(ag => `
                <div class="knowledge-item-row" style="padding:var(--s-4)">
                  <input type="checkbox" ${ag.completed ? 'checked' : ''} />
                  <div style="flex:1;min-width:0">
                    <div style="font-weight:600;color:var(--text-1);font-size:14px">${ag.topic || ag.title}</div>
                    ${ag.duration ? `<div style="font-size:11px;color:var(--text-4);margin-top:2px">Allocated: ${ag.duration}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Column (4 Cols): Participants & Linked Knowledge -->
        <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <div class="dash-card">
            <h3 style="font-size:var(--fs-md);font-weight:700;color:var(--text-1);margin-bottom:var(--s-4)">Participants (${mtg.attendees.length})</h3>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${mtg.attendees.map(a => `
                <div style="display:flex;align-items:center;gap:10px">
                  <div class="member-avatar-mini" style="width:32px;height:32px;font-size:11px">${a.avatar}</div>
                  <div>
                    <div style="font-size:13px;font-weight:600;color:var(--text-1)">${a.name}</div>
                    <div style="font-size:11px;color:var(--text-3)">${a.role}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="dash-card">
            <h3 style="font-size:var(--fs-md);font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">Linked Knowledge</h3>
            <div style="font-size:12px;color:var(--text-2)">
              Project: <strong style="color:var(--v-300)">${mtg.linkedProject}</strong><br>
              ${mtg.linkedTask ? `Task: <strong style="color:var(--text-1)">${mtg.linkedTask}</strong>` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
