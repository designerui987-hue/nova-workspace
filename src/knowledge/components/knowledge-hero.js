/**
 * Knowledge Hero & 4-View Switcher Tabs Component
 * Metrics, Semantic Natural Language Search Bar, and View Tabs.
 */

export function renderKnowledgeHero(data, activeTab = 'articles') {
  const m = data.metrics;

  const views = [
    { id: 'articles', label: 'Collections & Articles', icon: '📚' },
    { id: 'graph', label: 'Interactive Knowledge Graph', icon: '🌐' },
    { id: 'decisions', label: 'Decision Log', icon: '⚖️' },
    { id: 'experts', label: 'Expert Directory & Health', icon: '👥' }
  ];

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Knowledge Hero Banner -->
      <div class="knowledge-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="knowledge-hero-title">Knowledge Hub & Second Brain</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              Connected organizational intelligence linking documents, decisions, projects, tasks, and experts.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.totalArticles}</div>
                <div class="hero-metric-lbl">Total Articles</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:#34d399">${m.verifiedKnowledge}</div>
                <div class="hero-metric-lbl">Verified Pages</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--v-300)">${m.subjectExperts}</div>
                <div class="hero-metric-lbl">Domain Experts</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(110,74,255,0.3);background:rgba(110,74,255,0.1)">
                  <div class="hero-metric-val" style="color:var(--v-300)">${m.knowledgeHealthScore}%</div>
                  <div class="hero-metric-lbl">Knowledge Health</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="create-article-wizard-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>Create Article</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="open-knowledge-graph-btn">
                <span>🌐 Knowledge Graph</span>
              </button>
              <button class="top-nav-btn" id="ai-ask-knowledge-btn">
                <span>✨ Ask AI Knowledge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Natural Language Semantic Search Bar -->
      <div class="projects-filter-bar">
        <div class="filter-input-wrap" style="flex:1">
          <input class="form-input" type="text" id="knowledge-semantic-search-input" placeholder="Ask in natural language: e.g. 'How does our token architecture work?' or 'Show all security guidelines'..." style="height:38px;font-size:13px" />
        </div>
        <button class="top-nav-btn primary-create" id="execute-semantic-search-btn" style="height:38px;padding:0 16px;font-size:12px">
          <span>Search 🔍</span>
        </button>
      </div>

      <!-- 4-View Switcher Tabs -->
      <div class="task-views-tab-bar" role="tablist">
        ${views.map(v => `
          <button class="task-view-tab ${activeTab === v.id ? 'active' : ''}" data-kn-view-tab="${v.id}" role="tab">
            <span>${v.icon}</span>
            <span>${v.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}
