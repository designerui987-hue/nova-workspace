/**
 * Admin Hero Banner & 6-View Switcher Tabs Component
 * Organization metrics, security compliance score, and View tabs.
 */

export function renderAdminHero(data, activeTab = 'users') {
  const o = data.organization;

  const views = [
    { id: 'users', label: 'User Directory & Teams', icon: '👥' },
    { id: 'rbac', label: 'Role Permissions (RBAC)', icon: '🔑' },
    { id: 'security', label: 'Security & SSO', icon: '🛡️' },
    { id: 'ai-gov', label: 'AI Governance & Policies', icon: '✨' },
    { id: 'audit-logs', label: 'Audit Logs & Timeline', icon: '📜' },
    { id: 'integrations-billing', label: 'Integrations & API Keys', icon: '🔌' }
  ];

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Admin Hero Banner -->
      <div class="admin-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:var(--s-2)">
              <span class="auth-preview-pill pill-violet" style="font-size:10px">${o.planBadge}</span>
              <span style="font-size:12px;color:var(--text-3)">${o.complianceStatus}</span>
            </div>
            <h1 class="admin-hero-title">${o.name} Admin Center</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              Centralized enterprise security, user access control, AI governance policies, and API keys.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${o.seatsUsed}/${o.totalSeats}</div>
                <div class="hero-metric-lbl">Active Seats</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--v-300)">${o.storageUsedGB} GB</div>
                <div class="hero-metric-lbl">Storage Used</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--c-400)">Okta SSO</div>
                <div class="hero-metric-lbl">Authentication</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.1)">
                  <div class="hero-metric-val" style="color:#34d399">${o.securityScore}%</div>
                  <div class="hero-metric-lbl">Security Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="admin-invite-user-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Invite New User</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="admin-api-keys-btn">
                <span>🔑 Manage API Keys</span>
              </button>
              <button class="top-nav-btn" id="admin-security-review-btn">
                <span>🛡️ Security Audit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 6-View Switcher Tabs -->
      <div class="task-views-tab-bar" role="tablist">
        ${views.map(v => `
          <button class="task-view-tab ${activeTab === v.id ? 'active' : ''}" data-adm-view-tab="${v.id}" role="tab">
            <span>${v.icon}</span>
            <span>${v.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
