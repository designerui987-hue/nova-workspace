/**
 * Project Detail View 4 — Timeline / Gantt Roadmap View Tab
 * Visual roadmap with Gantt bars, milestones, critical path, zoom controls, and today marker line.
 */

export function renderViewTimeline(project, zoomMode = 'month') {
  return `
    <div style="padding-top:var(--s-6)">
      <div class="gantt-roadmap-container">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-size:15px;font-weight:700;color:var(--text-1)">Gantt Timeline & Milestones</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${project.sprint}</span>
          </div>

          <div style="display:flex;align-items:center;gap:4px">
            <button class="cmd-tab-chip ${zoomMode==='week'?'active':''}" data-gantt-zoom="week">Week</button>
            <button class="cmd-tab-chip ${zoomMode==='month'?'active':''}" data-gantt-zoom="month">Month</button>
            <button class="cmd-tab-chip ${zoomMode==='quarter'?'active':''}" data-gantt-zoom="quarter">Quarter</button>
          </div>
        </div>

        <div class="gantt-chart-grid">
          <!-- Timeline Month Header Scale -->
          <div style="display:flex;gap:var(--s-4);margin-bottom:var(--s-2);padding-left:220px;font-size:11px;color:var(--text-4);font-weight:700">
            <div style="flex:1">JULY 2026</div>
            <div style="flex:1">AUGUST 2026</div>
            <div style="flex:1">SEPTEMBER 2026</div>
          </div>

          <!-- Milestones Rows -->
          ${project.milestones.map((m, idx) => `
            <div class="gantt-row">
              <div class="gantt-label truncate">🎯 ${m.title}</div>
              <div class="gantt-track-space">
                <div class="gantt-bar-element" style="left:${20 + idx*25}%;width:35%;background:linear-gradient(90deg, #a855f7, #6e4aff)">
                  ${m.progress}% Completed
                </div>
              </div>
            </div>
          `).join('')}

          <!-- Tasks Rows -->
          ${project.tasks.map((t, idx) => `
            <div class="gantt-row">
              <div class="gantt-label truncate">✅ ${t.key}: ${t.title}</div>
              <div class="gantt-track-space">
                <div class="gantt-bar-element" style="left:${10 + idx*18}%;width:25%;background:${t.status==='completed'?'#22c55e':'#06b6d4'}">
                  ${t.assignee.name.split(' ')[0]} (${t.estimate})
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
