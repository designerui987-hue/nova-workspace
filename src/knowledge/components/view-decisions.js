/**
 * Knowledge View 3 — Decision Log & View 4 — Expert Directory & Health Components
 */

export function renderViewDecisions(data) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">⚖️</div>
            <div>
              <h2 class="card-title">Company Decision Record</h2>
              <div class="card-subtitle">Immutable timeline of architectural, product, and strategic decisions</div>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--s-3)">
          ${data.decisionsLog.map(dec => `
            <div class="decision-card-item">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:15px;font-weight:700;color:var(--text-1)">${dec.title}</span>
                <span class="auth-preview-pill pill-violet" style="font-size:10px">${dec.impact} Impact</span>
              </div>
              <div style="font-size:12px;color:var(--text-3);margin-top:4px">
                Approved by: <strong>${dec.owner}</strong> • Project: <strong style="color:var(--v-300)">${dec.project}</strong> • Date: ${dec.date}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderViewExperts(data) {
  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Subject Matter Experts Directory -->
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(6,182,212,0.15);color:#06b6d4">👥</div>
            <div>
              <h2 class="card-title">Subject Matter Experts Directory</h2>
              <div class="card-subtitle">AI-identified domain experts across engineering, product, and design</div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--s-4)">
          ${data.experts.map(exp => `
            <div class="expert-profile-card">
              <div style="display:flex;align-items:center;gap:12px">
                <div class="member-avatar-mini" style="width:42px;height:42px;font-size:16px">${exp.avatar}</div>
                <div>
                  <div style="font-weight:700;color:var(--text-1);font-size:14px">${exp.name}</div>
                  <div style="font-size:11px;color:var(--text-3)">${exp.role} • ${exp.department}</div>
                </div>
              </div>

              <div style="font-size:12px;color:var(--text-2);margin-top:4px">
                Domain Expertise: <strong>${exp.domain}</strong>
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:var(--s-3);padding-top:var(--s-3);border-top:1px solid var(--border-1)">
                <span style="font-size:11px;color:var(--v-300);font-weight:600">${exp.score}% Expertise Score</span>
                <button class="task-act-btn" data-action="ask-expert" data-expert-name="${exp.name}">Ask Expert →</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
