/**
 * Header & Metric Stat Cards + Action Cards Component
 * Replicates top hero section from design mockup.
 */

export function renderHeaderAndMetrics(data) {
  const m = data.metrics;

  return `
    <div style="display:flex;flex-direction:column;gap:16px">
      <!-- Header Row -->
      <div class="kn-header-row">
        <div>
          <div class="kn-header-title">
            <span style="color:#6e4aff;font-size:24px">✨</span>
            <span>Knowledge Hub</span>
          </div>
          <div class="kn-header-subtitle">Your organization's connected intelligence</div>
        </div>

        <div style="display:flex;align-items:center;gap:10px">
          <button class="top-nav-btn" style="height:36px;font-size:12px">
            <span>Quick Actions ∨</span>
          </button>
          <button class="top-nav-btn" style="height:36px;font-size:12px">
            <span>📊 View Analytics</span>
          </button>
        </div>
      </div>

      <!-- 7 Metric Stat Cards Row -->
      <div class="kn-metrics-grid">
        <div class="kn-metric-card">
          <div class="kn-metric-lbl">Total Articles</div>
          <div class="kn-metric-val">${m.totalArticles}</div>
          <div class="kn-metric-sub sub-green">${m.totalArticlesChange}</div>
        </div>

        <div class="kn-metric-card">
          <div class="kn-metric-lbl">Recently Updated</div>
          <div class="kn-metric-val">${m.recentlyUpdated}</div>
          <div class="kn-metric-sub sub-green">${m.recentlyUpdatedChange}</div>
        </div>

        <div class="kn-metric-card">
          <div class="kn-metric-lbl">Popular Articles</div>
          <div class="kn-metric-val">${m.popularArticles}</div>
          <div class="kn-metric-sub sub-orange">${m.popularBadge}</div>
        </div>

        <div class="kn-metric-card">
          <div class="kn-metric-lbl">AI Generated</div>
          <div class="kn-metric-val">${m.aiGenerated}</div>
          <div class="kn-metric-sub sub-purple">${m.aiBadge}</div>
        </div>

        <div class="kn-metric-card">
          <div class="kn-metric-lbl">Outdated Content</div>
          <div class="kn-metric-val">${m.outdatedContent}</div>
          <div class="kn-metric-sub sub-amber">${m.outdatedBadge}</div>
        </div>

        <div class="kn-metric-card">
          <div class="kn-metric-lbl">Verified Knowledge</div>
          <div class="kn-metric-val">${m.verifiedKnowledge}</div>
          <div class="kn-metric-sub sub-green">${m.verifiedBadge}</div>
        </div>

        <!-- Donut Gauge Health Score Card -->
        <div class="kn-gauge-card">
          <div class="kn-metric-lbl">Knowledge Health Score</div>
          <div style="position:relative;width:54px;height:54px;margin:4px 0">
            <svg width="54" height="54" viewBox="0 0 36 36" style="transform:rotate(-90deg)">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-dasharray="92, 100" stroke-width="3" />
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;color:#f8fafc">
              ${m.healthScore}
            </div>
          </div>
          <div style="font-size:10px;font-weight:700;color:#10b981">${m.healthRating}</div>
        </div>
      </div>

      <!-- 4 Action Cards Row -->
      <div class="kn-actions-grid">
        ${data.actionCards.map(ac => `
          <div class="kn-action-card" id="action-card-${ac.id}">
            <div class="kn-action-icon-box">${ac.icon}</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#f8fafc">${ac.title}</div>
              <div style="font-size:11px;color:#64748b;margin-top:2px">${ac.subtitle}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
