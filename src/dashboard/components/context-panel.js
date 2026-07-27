/**
 * Right AI Sidebar Panel Component — Resizable, Collapsible & Tabbed
 * Tabs: AI, Team, Pinned with Pin/Unpin controls, streaming answer simulation, and suggested prompts.
 */

export function renderRightContextPanel(data, activeTab = 'ai', isPinned = true) {
  return `
    <aside class="right-context-panel ${isPinned ? 'pinned' : ''}" id="app-right-context-panel" style="width:280px;flex-shrink:0">
      <!-- Panel Header Bar -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid var(--border-1)">
        <div style="display:flex;align-items:center;gap:4px">
          <button class="task-view-tab ${activeTab === 'ai' ? 'active' : ''}" data-ai-panel-tab="ai" style="padding:4px 8px;font-size:11px">✨ AI</button>
          <button class="task-view-tab ${activeTab === 'team' ? 'active' : ''}" data-ai-panel-tab="team" style="padding:4px 8px;font-size:11px">👥 Team</button>
          <button class="task-view-tab ${activeTab === 'pinned' ? 'active' : ''}" data-ai-panel-tab="pinned" style="padding:4px 8px;font-size:11px">📌 Pinned</button>
        </div>

        <div style="display:flex;align-items:center;gap:4px;color:var(--text-3);font-size:12px">
          <button id="ai-panel-pin-btn" title="${isPinned ? 'Unpin Panel' : 'Pin Panel'}" style="cursor:pointer;color:${isPinned ? 'var(--v-300)' : 'var(--text-3)'}">📌</button>
          <button id="ai-panel-close-btn" title="Collapse Panel" style="cursor:pointer">✕</button>
        </div>
      </div>

      <!-- Tab Content Area -->
      <div style="flex:1;overflow-y:auto;padding-top:12px">
        ${activeTab === 'ai' ? renderAITabContent(data) : ''}
        ${activeTab === 'team' ? renderTeamTabContent(data) : ''}
        ${activeTab === 'pinned' ? renderPinnedTabContent(data) : ''}
      </div>
    </aside>
  `;
}

function renderAITabContent(data) {
  return `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:linear-gradient(135deg,rgba(110,74,255,0.14) 0%,var(--bg-elevated) 100%);border:1px solid rgba(110,74,255,0.3);border-radius:var(--r-5);padding:var(--s-4)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--text-1)">
            <span>✨ AI Assistant</span>
            <span class="auth-preview-pill pill-violet" style="font-size:9px">GPT-4o</span>
          </div>
          <span style="font-size:10px;color:var(--e-400)">● Streaming</span>
        </div>

        <div id="ai-chat-history" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:10px;font-size:11px">
          <div style="background:var(--bg-surface);padding:8px 10px;border-radius:8px;border:1px solid var(--border-1);color:var(--text-2);line-height:1.4">
            Hi ${data.user.name.split(' ')[0]}! I've summarized 4 design tickets and Sprint 24 progress for you today.
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px">
          <div class="prompt-shortcut-chip" style="font-size:10px;padding:4px 8px">✨ Summarize meeting notes</div>
          <div class="prompt-shortcut-chip" style="font-size:10px;padding:4px 8px">📊 Generate sprint report</div>
        </div>

        <div class="input-wrap">
          <input class="form-input" type="text" id="copilot-input-field" placeholder="Ask AI Assistant..." style="height:32px;font-size:11px;padding-right:32px" />
          <div class="input-icon right" id="copilot-send-btn" style="width:32px;height:32px;color:var(--v-400)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTeamTabContent(data) {
  return `
    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:4px">Active Team (${data.teamPresence.filter(t=>t.online).length} Online)</div>
      ${data.teamPresence.map(member => `
        <div class="presence-item-row" style="padding:6px 8px;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border-1)">
          <div style="position:relative">
            <div class="member-avatar-mini" style="width:24px;height:24px;font-size:9px">${member.avatar}</div>
            <div class="presence-status-dot ${member.online ? 'online' : 'offline'}" style="position:absolute;bottom:0;right:0"></div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:11px;font-weight:600;color:var(--text-1)" class="truncate">${member.name}</div>
            <div style="font-size:9px;color:var(--text-3)" class="truncate">${member.status}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPinnedTabContent(data) {
  return `
    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:4px">Pinned Workspace Items</div>
      <div style="background:var(--bg-surface);border:1px solid var(--border-1);border-radius:6px;padding:8px 10px;display:flex;align-items:center;gap:8px;font-size:11px">
        <span>📌</span>
        <span style="color:var(--text-1);font-weight:600" class="truncate">Q3 Design Tokens Architecture</span>
      </div>
      <div style="background:var(--bg-surface);border:1px solid var(--border-1);border-radius:6px;padding:8px 10px;display:flex;align-items:center;gap:8px;font-size:11px">
        <span>⚡</span>
        <span style="color:var(--text-1);font-weight:600" class="truncate">Copilot HNSW Vector Caching Spec</span>
      </div>
    </div>
  `;
}
