/**
 * AI Workspace Center Conversational Canvas Component
 * Message bubbles, thinking steps, markdown renderer, action cards, prompt composer.
 */

export function renderAIChatCanvas(activeChat, data) {
  const messages = activeChat ? activeChat.messages : [];

  return `
    <section class="ai-center-panel">
      <!-- Chat Scroll Stream Area -->
      <div class="ai-chat-scroll-area" id="ai-chat-scroll-area">
        ${messages.length === 0 ? renderEmptyChatCanvas(data) : messages.map(msg => renderMessageBubble(msg, data.user)).join('')}
      </div>

      <!-- Multi-Modal Prompt Composer Input Bar -->
      <div class="prompt-composer-container">
        <form id="ai-prompt-form">
          <div class="prompt-composer-box">
            <button type="button" class="top-nav-btn" title="Voice Input (Placeholder)">🎙️</button>
            <button type="button" class="top-nav-btn" title="Attach Document / Image">📎</button>

            <textarea class="form-textarea" id="ai-prompt-textarea" placeholder="Ask Nova AI anything across projects, tasks, meetings, or documents..." style="height:38px;padding:8px 0;border:none;background:transparent;resize:none;font-size:13px" rows="1"></textarea>

            <button type="submit" class="top-nav-btn primary-create" id="ai-send-btn" style="height:32px;padding:0 14px;font-size:12px">
              <span>Send ↵</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  `;
}

function renderEmptyChatCanvas(data) {
  return `
    <div style="max-width:780px;margin:0 auto;width:100%">
      ${renderAIHero(data)}
    </div>
  `;
}

export function renderAIHero(data) {
  const m = data.metrics;
  const quickPrompts = [
    { title: '🎯 Plan My Day', prompt: 'Summarize today focus items, meetings, and highest priority tasks.' },
    { title: '📊 Workspace Health Report', prompt: 'Generate an executive health report across active projects and velocity metrics.' },
    { title: '⚠️ Identify Blocked Tasks', prompt: 'Scan all active tasks in Sprint 24 and identify bottlenecks.' },
    { title: '📝 Draft Weekly Recap', prompt: 'Draft a weekly release recap based on completed documents and merged tasks.' }
  ];

  return `
    <div class="ai-hero-banner" style="background:linear-gradient(135deg,rgba(110,74,255,0.14) 0%,rgba(6,182,212,0.06) 60%,var(--bg-surface) 100%);border:1px solid var(--border-2);border-radius:var(--r-6);padding:var(--s-6);margin-bottom:var(--s-6)">
      <div style="display:flex;align-items:flex-start;justify-content:space-between">
        <div>
          <div class="ai-header-badge" style="margin-bottom:var(--s-2)">
            <span>✨ Nova Enterprise AI OS v3.0</span>
          </div>
          <h1 style="font-size:clamp(22px,3vw,30px);font-weight:800;color:var(--text-1)">Good morning, ${data.user.name.split(' ')[0]}</h1>
          <p style="font-size:13px;color:var(--text-2);margin-top:4px">
            Indexed Context: <strong style="color:var(--v-300)">${m.indexedProjects} Projects</strong> • <strong style="color:var(--v-300)">${m.indexedTasks} Tasks</strong> • <strong style="color:var(--v-300)">${m.indexedDocs} Specs</strong> • <strong style="color:var(--v-300)">${m.indexedMeetings} Meetings</strong>
          </p>
        </div>

        <div class="hero-metric-card" style="border-color:rgba(110,74,255,0.3);background:rgba(110,74,255,0.1);padding:10px 16px">
          <div class="hero-metric-val" style="color:var(--v-300);font-size:20px">${m.aiAccuracyScore}%</div>
          <div class="hero-metric-lbl">AI Context Accuracy</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--s-3);margin-top:var(--s-5)">
        ${quickPrompts.map(qp => `
          <button class="prompt-shortcut-chip" data-quick-prompt="${qp.prompt}" style="padding:10px 14px;height:auto;justify-content:flex-start">
            <span style="font-weight:600;font-size:12px;color:var(--text-1)">${qp.title}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMessageBubble(msg, user) {
  const isUser = msg.sender === 'user';

  return `
    <div class="chat-msg-row ${isUser ? 'user-msg' : ''}">
      <div class="msg-avatar-box" style="background:${isUser ? 'var(--v-600)' : 'rgba(110,74,255,0.2)'};color:var(--text-1)">
        ${isUser ? user.avatar : '🤖'}
      </div>

      <div style="flex:1">
        <!-- Thinking Steps Box -->
        ${msg.thinkingSteps ? `
          <div class="ai-thinking-box">
            ${msg.thinkingSteps.map(step => `<div>${step}</div>`).join('')}
          </div>
        ` : ''}

        <div class="msg-bubble-card">
          <div style="white-space:pre-wrap">${msg.text}</div>

          <!-- Action Execution Preview Card -->
          ${msg.actionCard ? `
            <div class="ai-action-card-box">
              <div style="font-weight:700;color:var(--text-1);font-size:13px">${msg.actionCard.title}</div>
              <div style="font-size:12px;color:var(--text-2)">${msg.actionCard.description}</div>
              <div style="display:flex;gap:8px;margin-top:8px">
                <button class="top-nav-btn primary-create" style="height:28px;font-size:11px" data-action="execute-ai-action" data-action-id="${msg.actionCard.actionId}">
                  <span>Confirm & Execute →</span>
                </button>
                <button class="top-nav-btn" style="height:28px;font-size:11px">
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}
