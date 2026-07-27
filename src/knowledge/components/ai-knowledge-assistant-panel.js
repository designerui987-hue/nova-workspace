/**
 * Far-Right Persistent AI Knowledge Assistant Side Panel Component
 * Exact match to right sidebar in provided design screenshot.
 */

export function renderAIKnowledgeAssistantPanel(aiData) {
  const r = aiData.aiResponse;

  return `
    <aside class="kn-far-right-panel">
      <!-- AI Assistant Main Card -->
      <div class="ai-assistant-card">
        <!-- Header Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:#f8fafc">
            <span style="color:#6e4aff">✨</span>
            <span>AI Knowledge Assistant</span>
          </div>
          <div style="display:flex;gap:6px;color:#64748b;font-size:12px">
            <span style="cursor:pointer">⤢</span>
            <span style="cursor:pointer">✕</span>
          </div>
        </div>

        <!-- User Query Bubble -->
        <div class="ai-user-query-pill">
          ${aiData.userQuery}
        </div>

        <!-- AI Answer Section -->
        <div style="font-size:12px;color:#cbd5e1;line-height:1.5">
          Based on your company knowledge, here's an overview of your authentication system:
        </div>

        <!-- Citation Card -->
        <div class="ai-citation-box">
          <div style="width:28px;height:28px;border-radius:6px;background:#1e293b;display:flex;align-items:center;justify-content:center;font-size:14px">📄</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:#f8fafc">${r.citationTitle}</div>
            <div style="font-size:10px;color:#64748b">${r.citationMeta}</div>
          </div>
        </div>

        <!-- Text Summary -->
        <div style="font-size:12px;color:#cbd5e1;line-height:1.5">
          ${r.summaryText}
        </div>

        <!-- Key Components List -->
        <div>
          <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:4px">Key components:</div>
          <div style="display:flex;flex-direction:column;gap:2px;font-size:11px;color:#94a3b8">
            ${r.keyComponents.map(kc => `<div>• <strong>${kc.label}:</strong> ${kc.val}</div>`).join('')}
          </div>
        </div>

        <!-- Related Resources -->
        <div>
          <div style="font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:6px">Related resources:</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${r.relatedResources.map(res => `
              <div style="background:#0d1220;border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:8px;cursor:pointer">
                <span style="font-size:14px">${res.icon}</span>
                <div>
                  <div style="font-size:11px;font-weight:600;color:#f8fafc">${res.title}</div>
                  <div style="font-size:9px;color:#64748b">${res.subtitle}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Follow-up Prompt Chips -->
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px">
          ${r.suggestedPrompts.map(p => `
            <div class="ai-prompt-chip">${p}</div>
          `).join('')}
        </div>

        <!-- Composer Bar -->
        <div style="background:#090d16;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:6px 10px;display:flex;align-items:center;gap:8px;margin-top:8px">
          <input type="text" placeholder="Ask anything about your knowledge..." style="flex:1;background:transparent;border:none;outline:none;color:#f8fafc;font-size:11px" />
          <button style="background:transparent;border:none;color:#64748b;cursor:pointer;font-size:12px">🎙️</button>
          <button style="background:#6e4aff;border:none;border-radius:4px;color:white;width:22px;height:22px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:10px">➤</button>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;font-size:9px;color:#64748b;margin-top:-4px">
          <span>AI responses may be inaccurate</span>
          <a href="#" style="color:#64748b">Learn more</a>
        </div>
      </div>

      <!-- Bottom Smart Recommendations Widget -->
      <div style="background:#111728;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px">
        <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#f8fafc">
          <span style="color:#6e4aff">✨</span>
          <span>Smart Recommendations</span>
        </div>

        <div style="background:#181018;border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="background:rgba(239,68,68,0.2);color:#ef4444;font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px">86</span>
            <div>
              <div style="font-size:11px;font-weight:700;color:#f8fafc">Outdated Content</div>
              <div style="font-size:9px;color:#94a3b8">86 articles need updates</div>
            </div>
          </div>
          <span style="color:#94a3b8;font-size:12px">→</span>
        </div>
      </div>
    </aside>
  `;
}
