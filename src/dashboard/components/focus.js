/**
 * Today's Focus Component — Section 2
 * Shows 3-5 high priority tasks with interactive actions and AI suggestions.
 */

export function renderTodaysFocus(tasks) {
  return `
    <div class="dash-card">
      <div class="card-header-flex">
        <div class="card-title-group">
          <div class="ws-icon-box" style="background:rgba(239,68,68,0.15);color:#f87171">🎯</div>
          <div>
            <h2 class="card-title">Today's Focus</h2>
            <div class="card-subtitle">Prioritized tasks requiring your attention today</div>
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
        <div class="task-title-row">
          <span class="priority-pill ${priorityClass}">${task.priority}</span>
          <span class="task-title-text">${task.title}</span>
        </div>

        <div class="task-meta-row">
          <span style="color:${task.projectColor};font-weight:600">● ${task.project}</span>
          <span>•</span>
          <span>Due: ${task.dueDate}</span>
          <span>•</span>
          <span>Progress: ${task.progress}%</span>
          ${task.dependencies.length > 0 ? `<span>•</span><span style="color:var(--a-400)">🔗 Dep: ${task.dependencies.join(', ')}</span>` : ''}
        </div>

        ${task.aiTip ? `
          <div style="font-size:11px;color:var(--v-300);margin-top:4px;display:flex;align-items:center;gap:4px">
            <span>✨ AI:</span> <span>${task.aiTip}</span>
          </div>
        ` : ''}
      </div>

      <div class="task-hover-actions">
        <button class="task-act-btn" data-action="ai-help" data-task-id="${task.id}" title="Ask AI for assistance">
          <span>✨ AI Help</span>
        </button>
        <button class="task-act-btn" data-action="edit" data-task-id="${task.id}">
          <span>Edit</span>
        </button>
        <button class="task-act-btn" data-action="delegate" data-task-id="${task.id}">
          <span>Delegate</span>
        </button>
      </div>
    </div>
  `;
}
