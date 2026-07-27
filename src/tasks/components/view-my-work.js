/**
 * Tasks View 1 — My Work Personal Dashboard Component
 * Organized sections for Today, Next, Upcoming, Blocked, and Focus Timer widget.
 */

export function renderViewMyWork(data) {
  const todayTasks = data.tasks.filter(t => t.isToday && t.status !== 'done');
  const blockedTasks = data.tasks.filter(t => t.isBlocked && t.status !== 'done');
  const completedTasks = data.tasks.filter(t => t.status === 'done');
  const upcomingTasks = data.tasks.filter(t => !t.isToday && !t.isBlocked && t.status !== 'done');

  return `
    <div class="dashboard-grid-12">
      <!-- Left Column (8 Cols): Personal Task Sections -->
      <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-6)">
        <!-- Section: Today's High Priority Focus -->
        <div class="dash-card">
          <div class="card-header-flex">
            <div class="card-title-group">
              <div class="ws-icon-box" style="background:rgba(239,68,68,0.15);color:#f87171">🎯</div>
              <div>
                <h2 class="card-title">Today (${todayTasks.length})</h2>
                <div class="card-subtitle">Immediate focus items scheduled for today</div>
              </div>
            </div>
          </div>

          <div class="task-list-container">
            ${todayTasks.length === 0 ? `
              <div style="padding:var(--s-6);text-align:center;color:var(--text-3)">All today's tasks completed! 🎉</div>
            ` : todayTasks.map(t => renderTaskRow(t)).join('')}
          </div>
        </div>

        <!-- Section: Blocked & Waiting -->
        ${blockedTasks.length > 0 ? `
          <div class="dash-card" style="border-color:rgba(245,158,11,0.4)">
            <div class="card-header-flex">
              <div class="card-title-group">
                <div class="ws-icon-box" style="background:rgba(245,158,11,0.15);color:#f59e0b">⚠️</div>
                <div>
                  <h2 class="card-title">Blocked & Waiting (${blockedTasks.length})</h2>
                  <div class="card-subtitle">Tasks requiring dependency resolution</div>
                </div>
              </div>
            </div>

            <div class="task-list-container">
              ${blockedTasks.map(t => renderTaskRow(t)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section: Upcoming Work -->
        <div class="dash-card">
          <div class="card-header-flex">
            <div class="card-title-group">
              <div class="ws-icon-box" style="background:rgba(6,182,212,0.15);color:#06b6d4">📅</div>
              <div>
                <h2 class="card-title">Upcoming Tasks (${upcomingTasks.length})</h2>
                <div class="card-subtitle">Scheduled for later this week</div>
              </div>
            </div>
          </div>

          <div class="task-list-container">
            ${upcomingTasks.map(t => renderTaskRow(t)).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column (4 Cols): Focus Timer Widget & AI Recommendations -->
      <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-6)">
        <!-- Quick Focus Timer Card -->
        <div class="dash-card" style="background:linear-gradient(135deg,rgba(110,74,255,0.15) 0%,var(--bg-surface) 100%);border-color:rgba(110,74,255,0.3)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
            <span style="font-size:13px;font-weight:700;color:var(--text-1)">🎯 Deep Work Pomodoro</span>
            <span class="auth-preview-pill pill-violet" style="font-size:10px">${data.focusModeSession.completedSessionsToday} Sessions</span>
          </div>

          <div style="font-size:32px;font-weight:800;font-family:var(--font-mono);color:var(--text-1);text-align:center;margin:var(--s-4) 0">
            25:00
          </div>

          <button class="btn btn-primary w-full" id="start-widget-pomodoro-btn">
            <span>▶ Start Focus Session</span>
          </button>
        </div>

        <!-- AI Assistant Recommendation -->
        <div class="dash-card">
          <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">
            <span>✨ AI Focus Tip</span>
          </div>
          <p style="font-size:12px;color:var(--text-2);line-height:1.5">
            ${data.focusModeSession.aiCoachTip}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderTaskRow(task) {
  return `
    <div class="task-list-item-row ${task.status === 'done' ? 'completed-state' : ''}" data-task-row-id="${task.id}">
      <div class="task-checkbox-custom ${task.status === 'done' ? 'checked' : ''}" data-action="toggle-task-done" data-task-id="${task.id}">
        ${task.status === 'done' ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
      </div>

      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="priority-pill ${task.priorityLevel}">${task.priority}</span>
          <span class="task-row-title truncate">${task.title}</span>
        </div>
        <div style="font-size:11px;color:var(--text-3);margin-top:2px">
          <span style="color:${task.projectColor};font-weight:600">● ${task.project}</span> • Due: ${task.dueDate} • Est: ${task.estimate}
        </div>
      </div>

      <div class="task-hover-actions">
        <button class="task-act-btn" data-action="open-detail" data-task-id="${task.id}">Open</button>
      </div>
    </div>
  `;
}
