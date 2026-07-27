/**
 * Right Context Panel & Team Presence Component — Section 10
 * Live team presence, AI Copilot chat drawer, workspace summary & pinned items.
 */

export function renderRightContextPanel(data) {
  return `
    <aside class="right-context-panel" id="app-right-context-panel">
      <!-- AI Copilot Panel Box -->
      <div style="background:linear-gradient(135deg,rgba(110,74,255,0.14) 0%,var(--bg-elevated) 100%);border:1px solid rgba(110,74,255,0.3);border-radius:var(--r-5);padding:var(--s-4)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--text-1)">
            <span>✨ AI Copilot</span>
            <span class="auth-preview-pill pill-violet" style="font-size:9px;padding:1px 5px">GPT-4o</span>
          </div>
          <span style="font-size:10px;color:var(--e-400)">● Online</span>
        </div>

        <div id="ai-chat-history" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin-bottom:var(--s-3);font-size:12px">
          <div style="background:var(--bg-surface);padding:8px 10px;border-radius:8px;border:1px solid var(--border-1);color:var(--text-2)">
            Hi ${data.user.name.split(' ')[0]}! Ask me to draft specs, analyze pull requests, or summarize team updates.
          </div>
        </div>

        <div class="input-wrap">
          <input class="form-input" type="text" id="copilot-input-field" placeholder="Ask AI Copilot... (⌘J)" style="height:36px;font-size:12px;padding-right:36px" />
          <div class="input-icon right" id="copilot-send-btn" style="width:36px;height:36px;color:var(--v-400)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </div>
        </div>
      </div>

      <!-- Team Presence -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase">Team Presence</div>
          <span style="font-size:11px;color:var(--text-4)">${data.teamPresence.filter(t => t.online).length} online</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:2px">
          ${data.teamPresence.map(member => `
            <div class="presence-item-row" data-user-id="${member.id}" title="Click to view profile">
              <div style="position:relative">
                <div class="member-avatar-mini" style="width:28px;height:28px;font-size:10px">${member.avatar}</div>
                <div class="presence-status-dot ${member.online ? 'online' : 'offline'}" style="position:absolute;bottom:0;right:0;border:1.5px solid var(--bg-surface)"></div>
              </div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:var(--text-1)" class="truncate">${member.name}</div>
                <div style="font-size:10px;color:var(--text-3)" class="truncate">${member.status}</div>
              </div>
              <div style="font-size:10px;color:var(--text-4)">${member.localTime.split(' ')[0]}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Pinned Shortcuts -->
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-3)">Pinned Items</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <div class="knowledge-item-row" style="padding:8px 10px;margin-bottom:0">
            <span style="font-size:14px">📌</span>
            <span style="font-size:12px;font-weight:600;color:var(--text-1);flex:1" class="truncate">Q3 Design Tokens Spec</span>
          </div>
          <div class="knowledge-item-row" style="padding:8px 10px;margin-bottom:0">
            <span style="font-size:14px">⚡</span>
            <span style="font-size:12px;font-weight:600;color:var(--text-1);flex:1" class="truncate">AI Workflow Automations</span>
          </div>
        </div>
      </div>
    </aside>
  `;
}
