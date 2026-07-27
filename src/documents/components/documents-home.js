/**
 * Documents Home View Component
 * Hero banner, metrics summary, category filters, and Grid/List document cards.
 */

export function renderDocumentsHome(data, currentViewMode = 'grid') {
  const m = data.metrics;

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-6)">
      <!-- Docs Hero Banner -->
      <div class="docs-hero-banner">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-6)">
          <div>
            <h1 class="docs-hero-title">Documents & Knowledge Hub</h1>
            <p style="font-size:var(--fs-md);color:var(--text-2);max-width:520px;line-height:1.6">
              AI-native collaborative workspace connecting specs, meeting notes, and team knowledge.
            </p>

            <div class="projects-hero-metrics-row">
              <div class="hero-metric-card">
                <div class="hero-metric-val">${m.totalDocs}</div>
                <div class="hero-metric-lbl">Total Documents</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--v-300)">${m.published}</div>
                <div class="hero-metric-lbl">Published</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-val" style="color:var(--c-400)">${m.aiGenerated}</div>
                <div class="hero-metric-lbl">AI Drafted</div>
              </div>
              <div class="hero-metric-card">
                <div class="hero-metric-card" style="border-color:rgba(110,74,255,0.3);background:rgba(110,74,255,0.1)">
                  <div class="hero-metric-val" style="color:#34d399">98%</div>
                  <div class="hero-metric-lbl">AI Quality Score</div>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
            <button class="top-nav-btn primary-create" id="create-blank-doc-btn" style="height:44px;padding:0 20px;font-size:14px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>New Blank Doc</span>
            </button>
            <div style="display:flex;gap:6px">
              <button class="top-nav-btn" id="open-template-gallery-btn">
                <span>📑 Template Gallery</span>
              </button>
              <button class="top-nav-btn" id="ai-generate-doc-btn">
                <span>✨ AI Draft Doc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="projects-filter-bar">
        <div class="filter-input-wrap">
          <input class="form-input" type="text" id="docs-search-input" placeholder="Search documents by title, tag, or content..." style="height:36px;font-size:13px" />
        </div>

        <select class="filter-select" id="filter-doc-cat">
          <option value="all">All Categories</option>
          <option value="Design System">Design System</option>
          <option value="Technical Spec">Technical Spec</option>
          <option value="Meeting Summary">Meeting Summary</option>
        </select>

        <div style="display:flex;align-items:center;gap:4px;margin-left:auto">
          <button class="top-nav-btn ${currentViewMode === 'grid' ? 'primary-create' : ''}" id="doc-grid-toggle" title="Grid View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
          <button class="top-nav-btn ${currentViewMode === 'list' ? 'primary-create' : ''}" id="doc-list-toggle" title="List View">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>

      <!-- Documents Grid / List -->
      <div class="${currentViewMode === 'grid' ? 'projects-grid' : 'projects-list-container'}" id="docs-cards-container">
        ${data.documents.map(doc => renderDocCard(doc, currentViewMode)).join('')}
      </div>
    </div>
  `;
}

function renderDocCard(doc, viewMode) {
  if (viewMode === 'list') {
    return `
      <div class="knowledge-item-row" data-open-doc-id="${doc.id}" style="cursor:pointer;padding:var(--s-4)">
        <span style="font-size:24px">${doc.icon}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-weight:700;color:var(--text-1);font-size:15px">${doc.title}</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${doc.category}</span>
          </div>
          <div style="font-size:12px;color:var(--text-3);margin-top:2px">
            Updated ${doc.updatedAt} • by ${doc.author.name} • ${doc.readingTime}
          </div>
        </div>
        <span class="project-status-badge" style="background:${doc.statusColor}22;color:${doc.statusColor};border:1px solid ${doc.statusColor}44">
          ${doc.status}
        </span>
      </div>
    `;
  }

  return `
    <div class="project-card-item" data-open-doc-id="${doc.id}">
      <div>
        <div class="doc-cover-banner" style="background:${doc.cover}"></div>
        <div class="doc-emoji-avatar">${doc.icon}</div>

        <div style="margin-top:var(--s-4)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${doc.category}</span>
            <span class="project-status-badge" style="background:${doc.statusColor}22;color:${doc.statusColor}">
              ${doc.status}
            </span>
          </div>
          <div class="project-title-name">${doc.title}</div>
        </div>
      </div>

      <div style="margin-top:var(--s-4);padding-top:var(--s-3);border-top:1px solid var(--border-1)">
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-3)">
          <span>${doc.readingTime}</span>
          <span>Updated ${doc.updatedAt}</span>
        </div>

        <div class="project-footer-meta" style="margin-top:var(--s-3)">
          <div class="members-avatar-stack">
            ${doc.collaborators.map(c => `<div class="member-avatar-mini" title="${c.name}">${c.avatar}</div>`).join('')}
          </div>
          <button class="task-act-btn" data-action="open-doc" data-doc-id="${doc.id}">
            <span>Edit →</span>
          </button>
        </div>
      </div>
    </div>
  `;
}
