/**
 * Knowledge View 1 — Collections & Articles Hub Component
 * Collection Grid Cards and Verified Knowledge Article Cards.
 */

export function renderViewArticles(data) {
  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-8)">
      <!-- Collections Grid -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-4)">Knowledge Collections (${data.collections.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:var(--s-4)">
          ${data.collections.map(col => `
            <div class="dash-card" style="border-top:3px solid ${col.color};cursor:pointer">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:28px">${col.icon}</span>
                <span class="auth-preview-pill pill-violet" style="font-size:10px">${col.articlesCount} Articles</span>
              </div>
              <div style="font-weight:700;color:var(--text-1);font-size:15px;margin-top:var(--s-3)">${col.title}</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:4px">Owner: ${col.owner}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Verified Articles Section -->
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-4)">Verified Articles & Wiki Pages (${data.articles.length})</div>
        <div class="projects-grid">
          ${data.articles.map(art => `
            <div class="project-card-item" data-open-article-id="${art.id}">
              <div>
                <div class="doc-cover-banner" style="background:${art.cover}"></div>
                <div class="doc-emoji-avatar">${art.icon}</div>

                <div style="margin-top:var(--s-4)">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                    <span class="auth-preview-pill pill-violet" style="font-size:10px">${art.collection}</span>
                    <span class="project-status-badge" style="background:#22c55e22;color:#22c55e">
                      ${art.verificationStatus}
                    </span>
                  </div>
                  <div class="project-title-name">${art.title}</div>
                  <div style="font-size:12px;color:var(--text-2);margin-top:6px;line-height:1.4">${art.summary}</div>
                </div>
              </div>

              <div style="margin-top:var(--s-4);padding-top:var(--s-3);border-top:1px solid var(--border-1)">
                <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-3)">
                  <span>${art.readingTime}</span>
                  <span style="color:var(--v-300);font-weight:600">${art.confidenceScore}% Confidence</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
