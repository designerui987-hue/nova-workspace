/**
 * AI Daily Brief Component — Section 3
 * AI reasoning, automated summaries, and 1-click quick actions.
 */

export function renderAIDailyBrief(brief) {
  return `
    <div class="dash-card ai-brief-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ai-header-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            <span>Nova Copilot Briefing</span>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:12px">
          <div class="ai-confidence-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>${brief.confidenceScore}% Confidence</span>
          </div>
          <button class="top-nav-btn" id="toggle-ai-reasoning-btn">
            <span>Show Reasoning</span>
          </button>
        </div>
      </div>

      <div class="ai-summary-box">
        ${formatMarkdown(brief.summary)}
      </div>

      <div id="ai-reasoning-drawer" style="display:none;margin-bottom:var(--s-4);padding:var(--s-3);background:rgba(0,0,0,0.3);border-radius:var(--r-3);font-size:12px;color:var(--text-3);border:1px dashed var(--border-2)">
        💡 <strong>AI Reasoning trace:</strong> ${brief.reasoningText}
      </div>

      <div class="ai-bullet-list">
        ${brief.bulletPoints.map(bp => `
          <div class="ai-bullet-item">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="color:${getBulletTypeColor(bp.type)}">●</span>
              <span>${formatMarkdown(bp.text)}</span>
            </div>
            <button class="ai-action-btn-chip" data-action="${bp.action}">
              ${bp.action} →
            </button>
          </div>
        `).join('')}
      </div>

      <div class="ai-prompt-bar">
        <span style="font-size:var(--fs-xs);color:var(--text-3);font-weight:600">Quick AI Actions:</span>
        <button class="prompt-shortcut-chip" data-ai-prompt="Summarize my yesterday meetings and accomplishments">
          <span>📝 Summarize Yesterday</span>
        </button>
        <button class="prompt-shortcut-chip" data-ai-prompt="Generate agenda for today component architecture sync">
          <span>📅 Generate Agenda</span>
        </button>
        <button class="prompt-shortcut-chip" data-ai-prompt="Prioritize my remaining task backlog for Sprint 24">
          <span>⚡ Prioritize Backlog</span>
        </button>
        <button class="prompt-shortcut-chip" data-ai-prompt="Open full AI Copilot assistant conversation">
          <span>✨ Ask AI Anything</span>
        </button>
      </div>
    </div>
  `;
}

function getBulletTypeColor(type) {
  if (type === 'urgent') return '#f87171';
  if (type === 'meeting') return '#22d3ee';
  return '#a78bfa';
}

function formatMarkdown(str) {
  return str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
