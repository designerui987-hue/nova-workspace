/**
 * Admin View 6 — Integrations Marketplace, Billing & Developer API Keys Component
 */

export function renderViewIntegrationsBilling(data) {
  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Developer API Keys Section -->
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">🔑</div>
            <div>
              <h2 class="card-title">Developer API Keys & Webhooks</h2>
              <div class="card-subtitle">Secret production access keys for REST SDKs and webhooks</div>
            </div>
          </div>
          <button class="top-nav-btn primary-create" id="generate-new-api-key-btn" style="height:32px;font-size:12px">
            <span>+ Generate API Key</span>
          </button>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--s-3)">
          ${data.apiKeys.map(k => `
            <div class="action-item-table-row">
              <div>
                <div style="font-weight:700;color:var(--text-1);font-size:13px">${k.name}</div>
                <div style="font-size:11px;font-family:var(--font-mono);color:var(--v-300);margin-top:2px">${k.prefix}</div>
              </div>
              <div style="display:flex;align-items:center;gap:6px">
                <button class="task-act-btn" data-action="rotate-key" data-key-id="${k.id}">Rotate</button>
                <button class="task-act-btn" style="color:#ef4444" data-action="revoke-key" data-key-id="${k.id}">Revoke</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Integrations Marketplace -->
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(6,182,212,0.15);color:#06b6d4">🔌</div>
            <div>
              <h2 class="card-title">Connected Integrations (${data.integrations.length})</h2>
              <div class="card-subtitle">Connected third-party developer platforms</div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:var(--s-4)">
          ${data.integrations.map(int => `
            <div class="quick-action-card" style="padding:var(--s-4)">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:24px">${int.icon}</span>
                <span class="project-status-badge" style="background:#22c55e22;color:#22c55e">● ${int.status}</span>
              </div>
              <div style="font-weight:700;color:var(--text-1);font-size:14px;margin-top:8px">${int.title}</div>
              <div style="font-size:11px;color:var(--text-3);line-height:1.4;margin-top:2px">${int.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
