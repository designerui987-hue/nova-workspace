/**
 * AI Workspace Left Panel Component
 * New Chat button, Conversation History, and Reusable AI Workflows gallery.
 */

export function renderAILeftPanel(conversations, workflows, activeChatId) {
  return `
    <aside class="ai-left-panel">
      <button class="top-nav-btn primary-create" id="btn-new-ai-chat" style="width:100%;height:38px;font-size:13px">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
        <span>New AI Session</span>
      </button>

      <!-- History List -->
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--text-4);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-2)">Recent Conversations</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${conversations.map(chat => `
            <div class="sidebar-nav-item ${chat.id === activeChatId ? 'active' : ''}" data-chat-id="${chat.id}" style="padding:6px 10px;border-radius:6px;cursor:pointer">
              <span style="font-size:12px;color:var(--text-1);font-weight:500" class="truncate">${chat.title}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Reusable Workflows -->
      <div style="margin-top:var(--s-4)">
        <div style="font-size:11px;font-weight:700;color:var(--text-4);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-2)">Reusable Workflows</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${workflows.map(wf => `
            <div class="quick-action-card" data-workflow-id="${wf.id}" style="padding:8px 10px;cursor:pointer">
              <div style="display:flex;align-items:center;gap:6px">
                <span>${wf.icon}</span>
                <strong style="font-size:12px;color:var(--text-1)">${wf.title}</strong>
              </div>
              <div style="font-size:10px;color:var(--text-3);margin-top:2px">${wf.frequency}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </aside>
  `;
}
