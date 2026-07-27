/**
 * AI Workspace Right Panel Component
 * Connected Workspace Context badge, Workspace Memory Store (Add/Delete memory), and Action Log.
 */

export function renderAIRightPanel(memories) {
  return `
    <aside class="ai-right-panel">
      <!-- Active Context Card -->
      <div style="background:rgba(110,74,255,0.1);border:1px solid rgba(110,74,255,0.3);border-radius:var(--r-5);padding:var(--s-4)">
        <div style="font-size:11px;font-weight:700;color:var(--v-300);text-transform:uppercase;letter-spacing:0.06em">Active Context Attached</div>
        <div style="font-size:13px;font-weight:700;color:var(--text-1);margin-top:4px">🎨 Nova UI System (NOVA-101)</div>
        <div style="font-size:11px;color:var(--text-3);margin-top:2px">Connected to Task #1 & Token Spec Doc v2.1</div>
      </div>

      <!-- Workspace Memory Store -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase">Workspace Memory</div>
          <button class="task-act-btn" id="btn-add-memory" style="height:22px;font-size:10px">+ Add Memory</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:8px" id="memory-items-list">
          ${memories.map(mem => `
            <div style="background:var(--bg-elevated);padding:8px 10px;border-radius:6px;border:1px solid var(--border-1);font-size:12px">
              <div style="color:var(--v-300);font-size:10px;font-weight:700;text-transform:uppercase">${mem.category}</div>
              <div style="color:var(--text-2);line-height:1.4;margin-top:2px">${mem.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </aside>
  `;
}
