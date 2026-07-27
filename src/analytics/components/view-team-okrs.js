/**
 * Analytics View 2 — Team Performance & OKRs Tracker & View 3 — Risk Forecasting Components
 */

export function renderViewTeamOKRs(data) {
  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Department Performance Table -->
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(34,197,94,0.15);color:#22c55e">👥</div>
            <div>
              <h2 class="card-title">Department Velocity & Capacity Allocation</h2>
              <div class="card-subtitle">Cross-functional team performance and burnout risk levels</div>
            </div>
          </div>
        </div>

        <table class="nova-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Velocity Index</th>
              <th>Capacity Utilization</th>
              <th>Burnout Risk</th>
            </tr>
          </thead>
          <tbody>
            ${data.teamPerformance.map(tp => `
              <tr>
                <td style="font-weight:700;color:var(--text-1)">${tp.department}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="flex:1;max-width:120px;height:6px;background:var(--border-1);border-radius:3px;overflow:hidden">
                      <div style="height:100%;width:${tp.velocity}%;background:${tp.scoreColor}"></div>
                    </div>
                    <span style="font-size:12px;font-weight:700;color:var(--text-1)">${tp.velocity}%</span>
                  </div>
                </td>
                <td style="font-size:12px;color:var(--text-2);font-weight:600">${tp.capacity}</td>
                <td>
                  <span class="auth-preview-pill ${tp.burnoutRisk === 'Low' ? 'pill-green' : 'pill-amber'}" style="font-size:10px">
                    ${tp.burnoutRisk} Risk
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- OKRs & Goals Section -->
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">🎯</div>
            <div>
              <h2 class="card-title">Q3 Objectives & Key Results (OKRs)</h2>
              <div class="card-subtitle">Strategic goal progress and delivery confidence</div>
            </div>
          </div>
        </div>

        <div>
          ${data.okrs.map(okr => `
            <div class="okr-card-item">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:14px;font-weight:700;color:var(--text-1)">${okr.title}</span>
                <span class="project-status-badge" style="background:${okr.statusColor}22;color:${okr.statusColor}">
                  ${okr.status} (${okr.progress}%)
                </span>
              </div>

              <div style="height:8px;background:var(--border-1);border-radius:4px;overflow:hidden;margin:4px 0">
                <div style="height:100%;width:${okr.progress}%;background:${okr.statusColor}"></div>
              </div>

              <div style="font-size:12px;color:var(--text-3)">Owner: <strong>${okr.owner}</strong></div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderViewRiskForecasting(data) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card" style="border-color:rgba(245,158,11,0.4)">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(245,158,11,0.15);color:#f59e0b">⚠️</div>
            <div>
              <h2 class="card-title">AI Delivery Risk & Predictive Forecasts</h2>
              <div class="card-subtitle">98% confidence predictive models scanning active milestones</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--s-4)">
          <div class="decision-card-item" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.06)">
            <div style="font-weight:700;color:#f87171;font-size:14px">⚠️ Low Latency SLA SLA Risk Detected (Resolved)</div>
            <div style="font-size:12px;color:var(--text-2);margin-top:2px">
              Redis memory allocation was 85% saturated during peak query traffic.
            </div>
            <div style="font-size:11px;color:var(--text-3);margin-top:4px">
              AI Action Executed: Redis RAM scaled to 32GB. SLA query latency reduced to 280ms.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
