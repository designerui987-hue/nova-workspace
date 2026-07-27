/**
 * Admin View 4 — AI Governance & View 5 — Audit Logs Components
 */

export function renderViewAIGovernance(aiData) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">✨</div>
            <div>
              <h2 class="card-title">Enterprise AI Governance & Data Privacy</h2>
              <div class="card-subtitle">Zero data retraining guarantees, allowed LLMs, and prompt retention rules</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--s-4)">
          <div class="ai-summary-box">
            🛡️ <strong>Enterprise Isolation Guarantee:</strong> ${aiData.dataPolicy}. Prompts and organization documents are never shared or used for public AI model retraining.
          </div>

          <div>
            <div style="font-size:12px;font-weight:700;color:var(--text-1);margin-bottom:8px">Enabled AI Models</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${aiData.enabledModels.map(m => `<span class="auth-preview-pill pill-violet" style="font-size:11px;padding:6px 12px">${m}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderViewAuditLogs(logs) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">📜</div>
            <div>
              <h2 class="card-title">Audit Logs & Security Events Timeline</h2>
              <div class="card-subtitle">Traceable record of all administrative, user, and AI copilot actions</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--s-2)">
          ${logs.map(log => `
            <div class="audit-log-row">
              <div style="display:flex;align-items:center;gap:12px">
                <span class="auth-preview-pill pill-green" style="font-size:9px">✓ ${log.status}</span>
                <div>
                  <div style="font-size:13px;font-weight:700;color:var(--text-1)">${log.action}</div>
                  <div style="font-size:11px;color:var(--text-3)">Actor: ${log.user} • IP: ${log.ip}</div>
                </div>
              </div>
              <span style="font-size:11px;color:var(--text-4)">${log.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
