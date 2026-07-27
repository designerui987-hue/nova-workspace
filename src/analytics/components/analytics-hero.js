/**
 * Analytics Hero Banner & 4-View Switcher Tabs Component
 * Organization health score, AI executive briefing summary, and View tabs.
 */

export function renderAnalyticsHero(data, activeTab = 'command-center') {
  const m = data.metrics;

  const views = [
    { id: 'command-center', label: 'Executive Command Center', icon: '📊' },
    { id: 'team-okrs', label: 'Team Performance & OKRs', icon: '🎯' },
    { id: 'risk-forecasting', label: 'Risk & Delivery Forecasting', icon: '⚠️' },
    { id: 'reports', label: 'Report Builder & AI Briefs', icon: '📄' }
  ];

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Analytics Hero Banner -->
      <div class="analytics-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="analytics-hero-title">Executive Command Center & Analytics</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              Real-time organizational intelligence, team velocity metrics, risk forecasting, and OKR tracking.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.sprintVelocity}</div>
                <div class="hero-metric-lbl">Sprint Velocity</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--v-300)">${m.tasksCompleted}</div>
                <div class="hero-metric-lbl">Tasks Completed</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--c-400)">${m.aiAdoption}</div>
                <div class="hero-metric-lbl">AI Adoption</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.1)">
                  <div class="hero-metric-val" style="color:#34d399">${m.orgHealthScore}/100</div>
                  <div class="hero-metric-lbl">Org Health Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="analytics-generate-report-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Generate Executive Report</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="export-analytics-btn">
                <span>📊 Export CSV/PDF</span>
              </button>
              <button class="top-nav-btn" id="ai-ask-analytics-btn">
                <span>✨ Ask AI Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Executive Briefing Summary Box -->
      <div class="dash-card ai-brief-card" style="margin-bottom:0">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <div class="ai-header-badge">
            <span>✨ AI Executive Briefing Summary</span>
          </div>
          <span style="font-size:12px;color:var(--e-400);font-weight:600">● ${m.aiConfidence}% AI Confidence</span>
        </div>

        <div class="ai-summary-box">
          Sprint 24 velocity increased by 14% this cycle. 142 backlog tasks completed across 5 active teams. Redis memory caching resolved vector query latency SLAs (down from 420ms to 280ms).
        </div>
      </div>

      <!-- 4-View Switcher Tabs -->
      <div class="task-views-tab-bar" role="tablist">
        ${views.map(v => `
          <button class="task-view-tab ${activeTab === v.id ? 'active' : ''}" data-an-view-tab="${v.id}" role="tab">
            <span>${v.icon}</span>
            <span>${v.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
