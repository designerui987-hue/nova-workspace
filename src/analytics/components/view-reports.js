/**
 * Analytics View 4 — Executive Report Builder & AI Workflows Component
 * Template cards and 1-click exports for PDF, CSV, and Scheduled Email Reports.
 */

export function renderViewReports(reports) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">📄</div>
            <div>
              <h2 class="card-title">Executive Report Templates & AI Briefs</h2>
              <div class="card-subtitle">Generate presentation-ready reports for board meetings and sprint reviews</div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--s-4)">
          ${reports.map(rep => `
            <div class="quick-action-card" style="padding:var(--s-5)">
              <div style="font-size:28px">${rep.icon}</div>
              <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-top:var(--s-2)">${rep.title}</div>
              <div style="font-size:12px;color:var(--text-3);line-height:1.4;margin-top:4px">${rep.description}</div>

              <div style="display:flex;gap:6px;margin-top:var(--s-4)">
                <button class="top-nav-btn primary-create" style="height:28px;font-size:11px" data-action="export-pdf" data-report-id="${rep.id}">
                  <span>Export PDF</span>
                </button>
                <button class="top-nav-btn" style="height:28px;font-size:11px" data-action="schedule-email" data-report-id="${rep.id}">
                  <span>✉️ Schedule Email</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
