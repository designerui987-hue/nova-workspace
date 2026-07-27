/**
 * Project Detail View 5 — Calendar View Tab
 * Monthly calendar grid with task deadline indicators and AI smart schedule helper.
 */

export function renderViewCalendar(project) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const gridCells = Array.from({length: 31}, (_, i) => i + 1);

  return `
    <div style="padding-top:var(--s-6)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">📅</div>
            <div>
              <h2 class="card-title">Project Schedule Calendar</h2>
              <div class="card-subtitle">July — August 2026 Deliverables</div>
            </div>
          </div>
          <button class="top-nav-btn" id="calendar-ai-reschedule-btn">
            <span>✨ AI Smart Reschedule</span>
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--border-1);border:1px solid var(--border-1);border-radius:var(--r-4);overflow:hidden">
          ${days.map(d => `<div style="background:var(--bg-elevated);padding:10px;text-align:center;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase">${d}</div>`).join('')}

          ${gridCells.map(dayNum => {
            const hasTask = dayNum === 15 || dayNum === 25 || dayNum === 29;
            return `
              <div style="background:var(--bg-surface);min-height:90px;padding:8px;display:flex;flex-direction:column;gap:4px">
                <div style="font-size:11px;font-weight:600;color:${dayNum === 27 ? 'var(--v-300)' : 'var(--text-3)'}">${dayNum} ${dayNum === 27 ? '● Today' : ''}</div>
                ${hasTask ? `
                  <div class="auth-preview-pill pill-violet" style="font-size:9px;padding:3px 6px;text-align:left" class="truncate">
                    🎯 Deliverable Target
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
