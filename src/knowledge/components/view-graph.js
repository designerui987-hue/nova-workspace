/**
 * Knowledge View 2 — Interactive Knowledge Graph Component
 * Connected visual network of Projects, Tasks, Specs, Meetings, Decisions, and People.
 */

export function renderViewGraph() {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">🌐</div>
            <div>
              <h2 class="card-title">Organizational Knowledge Network</h2>
              <div class="card-subtitle">Live connected graph across 156 nodes and bidirectional links</div>
            </div>
          </div>
        </div>

        <!-- Interactive Graph Canvas -->
        <div class="knowledge-graph-canvas-container" id="knowledge-graph-canvas">
          <!-- Root Center Node -->
          <div class="graph-node-bubble center-root" style="top:50%;left:50%;transform:translate(-50%,-50%)">
            <span>🎨</span>
            <span>Nova Workspace Core</span>
          </div>

          <!-- Connected Peripheral Nodes -->
          <div class="graph-node-bubble" style="top:25%;left:25%" data-node-label="Nova UI System">
            <span>🚀</span> <span>Project: NOVA-101</span>
          </div>
          <div class="graph-node-bubble" style="top:20%;right:25%" data-node-label="CSS Tokens Spec">
            <span>📄</span> <span>Spec: Token Architecture</span>
          </div>
          <div class="graph-node-bubble" style="bottom:25%;left:30%" data-node-label="Alex Johnson">
            <span>👤</span> <span>Expert: Alex Johnson</span>
          </div>
          <div class="graph-node-bubble" style="bottom:20%;right:30%" data-node-label="HNSW Indexing Decision">
            <span>⚖️</span> <span>Decision: HNSW Indexing</span>
          </div>
        </div>
      </div>
    </div>
  `;
}
