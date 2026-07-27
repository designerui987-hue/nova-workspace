/**
 * Tasks View 7 — Deep Work Focus Mode Component
 * Minimalist distraction-free Pomodoro timer interface with AI Coach tips and active task checklist.
 */

export function renderViewFocusMode(session, activeTask) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="focus-mode-container">
        <!-- AI Coach Pill Header -->
        <div class="ai-header-badge" style="margin-bottom:var(--s-4)">
          <span>✨ Nova AI Deep Work Coach</span>
        </div>

        <h2 style="font-size:var(--fs-2xl);font-weight:800;color:var(--text-1);letter-spacing:var(--ls-snug)">
          Focus Session #${session.completedSessionsToday + 1}
        </h2>
        <p style="font-size:14px;color:var(--text-2);max-width:480px;line-height:1.6;margin-top:6px">
          Currently Focusing On: <strong style="color:var(--v-300)">${activeTask ? activeTask.title : 'Design System v2.0 Tokens Spec'}</strong>
        </p>

        <!-- Big Pomodoro Timer -->
        <div class="pomodoro-timer-display" id="focus-timer-digital-clock">
          ${formatTimerTime(session.secondsRemaining)}
        </div>

        <!-- Controls -->
        <div class="pomodoro-controls-row">
          <button class="top-nav-btn primary-create" id="toggle-focus-timer-btn" style="height:48px;padding:0 28px;font-size:16px;font-weight:700">
            <span>${session.isRunning ? '⏸ Pause Focus' : '▶ Start Focus Session'}</span>
          </button>
          <button class="top-nav-btn" id="reset-focus-timer-btn" style="height:48px;padding:0 20px;font-size:14px">
            <span>↺ Reset</span>
          </button>
          <button class="top-nav-btn" id="complete-focus-task-btn" style="height:48px;padding:0 20px;font-size:14px">
            <span>✓ Complete Task</span>
          </button>
        </div>

        <!-- Active Task Checklist Box -->
        ${activeTask && activeTask.subtasks.length > 0 ? `
          <div style="background:var(--bg-elevated);border:1px solid var(--border-1);border-radius:var(--r-5);padding:var(--s-5);width:100%;max-width:520px;text-align:left">
            <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--s-3)">Focus Task Checklist</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${activeTask.subtasks.map(s => `
                <label style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-1);cursor:pointer">
                  <input type="checkbox" ${s.completed ? 'checked' : ''} data-focus-subtask-id="${s.id}" />
                  <span style="${s.completed ? 'text-decoration:line-through;opacity:0.5' : ''}">${s.title}</span>
                </label>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function formatTimerTime(totalSecs) {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
