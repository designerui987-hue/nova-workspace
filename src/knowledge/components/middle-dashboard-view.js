/**
 * Middle 3-Column Dashboard & Trending Articles Table Component
 * Replicates the exact center layout from design screenshot.
 */

export function renderMiddleDashboardView(data) {
  return `
    <div style="display:flex;flex-direction:column;gap:20px">
      <!-- 3 Columns Layout -->
      <div class="kn-middle-grid">
        <!-- Column 1: Collections -->
        <div class="kn-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:14px;font-weight:700;color:#f8fafc">Collections</h3>
            <a href="#" style="font-size:11px;color:#64748b;text-decoration:none">View all →</a>
          </div>

          <div style="display:flex;flex-direction:column;gap:6px">
            ${data.collections.map(col => `
              <div class="kn-collection-item">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:28px;height:28px;border-radius:6px;background:${col.iconBg}22;color:${col.iconBg};display:flex;align-items:center;justify-content:center;font-size:14px">
                    ${col.icon}
                  </div>
                  <div>
                    <div style="font-size:13px;font-weight:700;color:#f8fafc">${col.title}</div>
                    <div style="font-size:10px;color:#64748b">${col.count} • Owner: ${col.owner}</div>
                  </div>
                </div>
                <div class="score-circle-badge">${col.score}</div>
              </div>
            `).join('')}
          </div>

          <button class="top-nav-btn" style="width:100%;margin-top:10px;height:32px;font-size:12px;justify-content:center;border-style:dashed">
            <span>+ New Collection</span>
          </button>
        </div>

        <!-- Column 2: Knowledge Graph Hexagon Visualizer -->
        <div class="kn-graph-box">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;z-index:20">
            <div style="font-size:13px;font-weight:700;color:#f8fafc">Knowledge Graph ⓘ</div>
            <button class="top-nav-btn" style="height:26px;font-size:11px">⤢ Fullscreen</button>
          </div>

          <!-- Canvas with Hexagon Nodes -->
          <div class="kn-graph-canvas">
            <!-- Center Root Hexagon -->
            <div class="hex-center-node">
              <span style="font-size:20px">📄</span>
              <span>Knowledge Article</span>
            </div>

            <!-- Orbiting Nodes -->
            ${data.graphNodes.orbitNodes.map(n => `
              <div class="hex-orbit-node" style="${objectToCssStyle(n.pos)}">
                <span style="font-size:14px">${n.icon}</span>
                <span style="font-size:10px;margin-top:2px">${n.label}</span>
                <span style="font-size:9px;color:#94a3b8">${n.count}</span>
              </div>
            `).join('')}
          </div>

          <!-- Bottom Controls Bar -->
          <div style="display:flex;align-items:center;justify-content:center;gap:12px;font-size:11px;color:#64748b;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06);z-index:20">
            <span style="cursor:pointer">−</span>
            <span>100%</span>
            <span style="cursor:pointer">+</span>
            <span style="cursor:pointer">⤢</span>
            <span style="cursor:pointer">⛶</span>
            <span style="cursor:pointer">⚙️</span>
          </div>
        </div>

        <!-- Column 3: Recent Activity & Top Experts -->
        <div style="display:flex;flex-direction:column;gap:16px">
          <!-- Recent Activity Card -->
          <div class="kn-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h3 style="font-size:13px;font-weight:700;color:#f8fafc">Recent Activity</h3>
              <a href="#" style="font-size:11px;color:#64748b;text-decoration:none">View all →</a>
            </div>

            <div style="display:flex;flex-direction:column">
              ${data.recentActivity.map(act => `
                <div class="kn-activity-item">
                  <div style="width:24px;height:24px;border-radius:6px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:12px">${act.icon}</div>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:12px;font-weight:600;color:#f8fafc" class="truncate">${act.title}</div>
                    <div style="font-size:10px;color:#64748b">${act.action}</div>
                  </div>
                  <span style="font-size:10px;color:#64748b">${act.time}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Top Experts Card -->
          <div class="kn-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
              <h3 style="font-size:13px;font-weight:700;color:#f8fafc">Top Experts</h3>
              <a href="#" style="font-size:11px;color:#64748b;text-decoration:none">View all →</a>
            </div>

            <div style="display:flex;flex-direction:column;gap:8px">
              ${data.topExperts.map(exp => `
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <div style="display:flex;align-items:center;gap:8px">
                    <div class="member-avatar-mini" style="width:26px;height:26px;font-size:10px">${exp.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div>
                      <div style="font-size:12px;font-weight:600;color:#f8fafc">${exp.name}</div>
                      <div style="font-size:10px;color:#64748b">${exp.role}</div>
                    </div>
                  </div>
                  <div class="score-circle-badge" style="width:24px;height:24px;font-size:10px">${exp.score}</div>
                </div>
              `).join('')}
            </div>

            <button class="top-nav-btn" style="width:100%;margin-top:10px;height:28px;font-size:11px;justify-content:center">
              <span>Find More Experts</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Trending Articles Table Section -->
      <div class="kn-table-box">
        <div class="kn-table-tabs">
          <div class="kn-table-tab active">Trending Articles</div>
          <div class="kn-table-tab">AI Recommendations</div>
          <div class="kn-table-tab">Recently Viewed</div>
          <div class="kn-table-tab">Bookmarks</div>
        </div>

        <table class="kn-trending-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Views</th>
              <th>Last Updated</th>
              <th>Health</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${data.trendingArticles.map(art => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:30px;height:30px;border-radius:6px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:14px">${art.icon}</div>
                    <div>
                      <div style="font-weight:700;color:#f8fafc">${art.title}</div>
                      <div style="font-size:11px;color:#64748b">${art.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style="font-size:11px;color:${art.categoryColor};font-weight:600">■ ${art.category}</span>
                </td>
                <td style="color:#94a3b8;font-size:12px">${art.views}</td>
                <td style="color:#94a3b8;font-size:12px">${art.lastUpdated}</td>
                <td>
                  <span class="auth-preview-pill pill-green" style="font-size:10px">✓ ${art.health}</span>
                </td>
                <td style="color:#64748b;text-align:right">•••</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function objectToCssStyle(obj) {
  return Object.entries(obj).map(([k, v]) => `${k}:${v}`).join(';');
}
