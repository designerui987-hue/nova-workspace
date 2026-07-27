/**
 * AI Workspace Hero & Quick Prompts Component
 * Welcome greeting, AI context index status, and 1-click Quick Prompt grid.
 */

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
