/**
 * Today's Focus Component — Redesigned for High Scannability
 * Displaying: Checkbox, Priority, Title, Project, Due date, AI indicator, Progress.
 * Hover/Expansion reveals: Assignee, Dependencies, Comments, Files, AI suggestions, Recent activity.
 */

export function renderTodaysFocus(tasks) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(239,68,68,0.15);color:#f87171">🎯</div>
          <div>
            <h2 class="card-title">Today's Focus</h2>
            <div class="card-subtitle">Scannable, high-impact tasks requiring your attention today</div>
          </div>
        </div>
        <button class="top-nav-btn" id="add-focus-task-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>Add Task</span>
        </button>
      </div>

      <div class="focus-tasks-list" id="focus-tasks-container">
        ${tasks.map(task => renderTaskCard(task)).join('')}
      </div>
    </div>
  `;
}

function renderTaskCard(task) {
  const priorityClass = task.priorityLevel || 'medium';

  return `
    <div class="task-focus-card ${task.completed ? 'completed-state' : ''}" id="card-${task.id}" data-task-id="${task.id}">
      <div class="task-checkbox-custom ${task.completed ? 'checked' : ''}" data-action="toggle-complete" data-task-id="${task.id}">
        ${task.completed ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
      </div>

      <div class="task-details">
        <!-- Scannable Top Row -->
        <div class="task-title-row">
          <span class="priority-pill ${priorityClass}">${task.priority}</span>
          <span class="task-title-text">${task.title}</span>
          ${task.aiTip ? `<span style="font-size:10px;color:var(--v-300);background:rgba(110,74,255,0.15);padding:1px 6px;border-radius:4px">✨ AI Ready</span>` : ''}
        </div>

        <!-- Scannable Meta Row -->
        <div class="task-meta-row">
          <span style="color:${task.projectColor};font-weight:600">● ${task.project}</span>
          <span>•</span>
          <span>Due: ${task.dueDate}</span>
          <span>•</span>
          <span>Progress: ${task.progress}%</span>
        </div>

        <!-- Hover / Expansion Revealed Details -->
        <div class="task-hover-expansion-drawer" style="margin-top:6px;padding-top:6px;border-top:1px solid var(--border-0);font-size:11px;color:var(--text-3);display:flex;align-items:center;gap:12px">
          <span>👤 Assignee: <strong>Alex Johnson</strong></span>
          <span>💬 4 Comments</span>
          <span>📁 2 Specs Attached</span>
          ${task.dependencies.length > 0 ? `<span style="color:var(--a-400)">🔗 Dep: ${task.dependencies.join(', ')}</span>` : ''}
        </div>
      </div>

      <div class="task-hover-actions">
        <button class="task-act-btn" data-action="ai-help" data-task-id="${task.id}">✨ Assist</button>
        <button class="task-act-btn" data-action="edit" data-task-id="${task.id}">Edit</button>
      </div>
    </div>
  `;
}
