/**
 * AI Writing Assistant & Knowledge Graph Side Panel Component
 * Proactive AI co-writer, linked projects/tasks/meetings, and version history.
 */

export function renderDocRightSidebar(doc) {
  return `
    <aside class="doc-right-sidebar">
      <!-- AI Writing Assistant Box -->
      <div style="background:linear-gradient(135deg,rgba(110,74,255,0.14) 0%,var(--bg-elevated) 100%);border:1px solid rgba(110,74,255,0.3);border-radius:var(--r-5);padding:var(--s-4)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--text-1)">
            <span>✨ AI Writing Co-Pilot</span>
          </div>
          <span class="auth-preview-pill pill-violet" style="font-size:9px">98% Quality</span>
        </div>

        <p style="font-size:12px;color:var(--text-2);margin-bottom:var(--s-4);line-height:1.4">
          Ask Nova AI to generate sections, summarize technical specs, or extract task action items.
        </p>

        <div style="display:flex;flex-direction:column;gap:6px">
          <button class="prompt-shortcut-chip" id="ai-btn-summarize-doc" style="justify-content:flex-start">
            <span>📝 Executive Summary</span>
          </button>
          <button class="prompt-shortcut-chip" id="ai-btn-extract-tasks" style="justify-content:flex-start">
            <span>⚡ Extract Action Tasks</span>
          </button>
          <button class="prompt-shortcut-chip" id="ai-btn-fix-grammar" style="justify-content:flex-start">
            <span>✍️ Fix Grammar & Tone</span>
          </button>
        </div>
      </div>

      <!-- Connected Knowledge Links -->
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:var(--s-3)">Connected Knowledge</div>
        
        <div style="display:flex;flex-direction:column;gap:8px">
          ${doc.linkedProjects.length > 0 ? `
            <div style="background:var(--bg-elevated);padding:8px 10px;border-radius:6px;border:1px solid var(--border-1);font-size:12px">
              <div style="color:var(--text-4);font-size:10px;text-transform:uppercase">Linked Project</div>
              <div style="font-weight:600;color:var(--v-300);margin-top:2px">${doc.linkedProjects[0]}</div>
            </div>
          ` : ''}

          ${doc.linkedTasks.length > 0 ? `
            <div style="background:var(--bg-elevated);padding:8px 10px;border-radius:6px;border:1px solid var(--border-1);font-size:12px">
              <div style="color:var(--text-4);font-size:10px;text-transform:uppercase">Linked Task</div>
              <div style="font-weight:600;color:var(--text-1);margin-top:2px">${doc.linkedTasks[0]}</div>
            </div>
          ` : ''}

          ${doc.linkedMeetings.length > 0 ? `
            <div style="background:var(--bg-elevated);padding:8px 10px;border-radius:6px;border:1px solid var(--border-1);font-size:12px">
              <div style="color:var(--text-4);font-size:10px;text-transform:uppercase">Linked Meeting</div>
              <div style="font-weight:600;color:var(--text-1);margin-top:2px">${doc.linkedMeetings[0]}</div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Version History -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
          <span style="font-size:12px;font-weight:700;color:var(--text-3);letter-spacing:0.06em;text-transform:uppercase">Version History</span>
          <span style="font-size:11px;color:var(--v-300);cursor:pointer">${doc.version} (Active)</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;font-size:12px">
          <div style="padding:6px 10px;border-radius:6px;background:var(--bg-elevated);border:1px solid var(--border-1)">
            <div style="font-weight:600;color:var(--text-1)">v2.1 — Current Version</div>
            <div style="font-size:10px;color:var(--text-3);margin-top:2px">Edited 12m ago by ${doc.author.name}</div>
          </div>
          <div style="padding:6px 10px;border-radius:6px;background:var(--bg-surface);border:1px solid var(--border-0)">
            <div style="font-weight:500;color:var(--text-3)">v2.0 — Initial Release</div>
            <div style="font-size:10px;color:var(--text-4);margin-top:2px">Published yesterday</div>
          </div>
        </div>
      </div>
    </aside>
  `;
}
