/**
 * Admin View 2 — Role-Based Access Control (RBAC) & View 3 — Security Center Components
 */

export function renderViewRBAC(rbacData) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(6,182,212,0.15);color:#06b6d4">🔑</div>
            <div>
              <h2 class="card-title">Role-Based Access Control (RBAC Matrix)</h2>
              <div class="card-subtitle">Granular permission toggles across workspace modules</div>
            </div>
          </div>
        </div>

        <table class="rbac-matrix-table">
          <thead>
            <tr>
              <th>Workspace Module</th>
              <th style="text-align:center">Owner</th>
              <th style="text-align:center">Admin</th>
              <th style="text-align:center">Manager</th>
              <th style="text-align:center">Member</th>
              <th style="text-align:center">Guest</th>
            </tr>
          </thead>
          <tbody>
            ${rbacData.map(row => `
              <tr>
                <td style="font-weight:700;color:var(--text-1)">${row.module}</td>
                <td style="text-align:center"><input type="checkbox" ${row.owner ? 'checked' : ''} disabled /></td>
                <td style="text-align:center"><input type="checkbox" ${row.admin ? 'checked' : ''} /></td>
                <td style="text-align:center"><input type="checkbox" ${row.manager ? 'checked' : ''} /></td>
                <td style="text-align:center"><input type="checkbox" ${row.member ? 'checked' : ''} /></td>
                <td style="text-align:center"><input type="checkbox" ${row.guest ? 'checked' : ''} /></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderViewSecurity(secData) {
  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-6)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(34,197,94,0.15);color:#22c55e">🛡️</div>
            <div>
              <h2 class="card-title">Security Center & Authentication Policies</h2>
              <div class="card-subtitle">SSO SAML 2.0 enforcement, 2FA adoption, and session timeouts</div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:var(--s-4)">
          <div class="kpi-card-item">
            <span style="font-size:12px;color:var(--text-3)">SSO Provider</span>
            <span style="font-size:18px;font-weight:800;color:var(--text-1);margin:6px 0">${secData.ssoProvider}</span>
            <span class="auth-preview-pill pill-green" style="font-size:10px">Enforced ✓</span>
          </div>

          <div class="kpi-card-item">
            <span style="font-size:12px;color:var(--text-3)">2FA Adoption</span>
            <span style="font-size:18px;font-weight:800;color:var(--text-1);margin:6px 0">${secData.twoFactorAdoption}</span>
            <span class="auth-preview-pill pill-green" style="font-size:10px">Mandatory</span>
          </div>

          <div class="kpi-card-item">
            <span style="font-size:12px;color:var(--text-3)">Security Score</span>
            <span style="font-size:18px;font-weight:800;color:#34d399;margin:6px 0">${secData.securityScore}%</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">SOC2 Verified</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
