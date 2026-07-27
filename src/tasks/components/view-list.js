/**
 * Tasks View 2 — High-Density Task List View Component
 * Things 3 & Linear inspired list view with subtask progress bars, tags, and interactive action buttons.
 */

export function renderViewList(tasks) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card" style="padding:var(--s-4)">
        <div class="task-list-container" id="high-density-task-list">
          ${tasks.length === 0 ? `
            <div style="padding:var(--s-8);text-align:center;color:var(--text-3)">No tasks match the selected filters.</div>
          ` : tasks.map(t => renderHighDensityTaskRow(t)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderHighDensityTaskRow(t) {
  const isDone = t.status === 'done';
  const doneSubtasks = t.subtasks.filter(s => s.completed).length;

  return `
    <div class="task-list-item-row ${isDone ? 'completed-state' : ''}" data-task-row-id="${t.id}">
      <div class="task-checkbox-custom ${isDone ? 'checked' : ''}" data-action="toggle-task-done" data-task-id="${t.id}">
        ${isDone ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
      </div>

      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="project-key-badge">${t.key}</span>
          <span class="priority-pill ${t.priorityLevel}">${t.priority}</span>
          <span class="task-row-title truncate">${t.title}</span>
        </div>

        <div style="display:flex;align-items:center;gap:12px;margin-top:4px;font-size:11px;color:var(--text-3)">
          <span style="color:${t.projectColor};font-weight:600">● ${t.project}</span>
          <span>Due: ${t.dueDate}</span>
          <span>Est: ${t.estimate}</span>
          ${t.subtasks.length > 0 ? `<span>Subtasks: ${doneSubtasks}/${t.subtasks.length}</span>` : ''}
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:8px">
        <div class="member-avatar-mini" style="width:24px;height:24px;font-size:9px" title="${t.assignee.name}">${t.assignee.avatar}</div>
        <button class="task-act-btn" data-action="open-detail" data-task-id="${t.id}">Open</button>
      </div>
    </div>
  `;
}
