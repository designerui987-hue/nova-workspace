/**
 * KPI Cards Grid Component
 * Animated metric cards for Sprint Velocity, Tasks Completed, AI Adoption, Meeting Load, Knowledge Growth, and Hours Saved.
 */

export function renderKPIGrid(cards) {
  return `
    <div class="kpi-grid-6">
      ${cards.map(kpi => `
        <div class="kpi-card-item">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:12px;font-weight:600;color:var(--text-3)">${kpi.title}</span>
            <span class="auth-preview-pill pill-green" style="font-size:10px">${kpi.change}</span>
          </div>

          <div style="font-size:26px;font-weight:800;color:var(--text-1);margin:10px 0;letter-spacing:-0.02em">
            ${kpi.val}
          </div>

          <div style="font-size:11px;color:var(--text-3)">
            ${kpi.desc}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
