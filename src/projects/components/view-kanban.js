/**
 * Project Detail View 2 — Kanban Board View Tab
 * Drag & drop columns, task cards with priority badges, AI complexity scores, and WIP counters.
 */

export function renderViewKanban(project) {
  const columns = [
    { id: 'backlog', title: 'Backlog', color: '#6b7280' },
    { id: 'planned', title: 'Planned', color: '#3b82f6' },
    { id: 'in_progress', title: 'In Progress', color: '#06b6d4' },
    { id: 'review', title: 'In Review', color: '#a855f7' },
    { id: 'completed', title: 'Completed', color: '#22c55e' }
  ];

  return `
    <div style="padding-top:var(--s-6)">
      <div class="kanban-board-container" id="kanban-board-wrapper">
        ${columns.map(col => {
          const colTasks = project.tasks.filter(t => t.status === col.id);
          return renderKanbanColumn(col, colTasks);
        }).join('')}
      </div>
    </div>
  `;
}

function renderKanbanColumn(col, tasks) {
  return `
    <div class="kanban-column" data-col-id="${col.id}">
      <div class="kanban-column-header">
        <div class="kanban-column-title">
          <span style="width:8px;height:8px;border-radius:50%;background:${col.color}"></span>
          <span>${col.title}</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span class="kanban-wip-badge">${tasks.length}</span>
          <button class="task-act-btn" data-action="quick-add-col-task" data-col-id="${col.id}" title="Add task to ${col.title}">+</button>
        </div>
      </div>

      <div class="kanban-cards-scroll" data-col-target="${col.id}">
        ${tasks.length === 0 ? `
          <div style="padding:var(--s-6);text-align:center;color:var(--text-4);font-size:12px">
            No tasks in ${col.title}
          </div>
        ` : tasks.map(t => renderKanbanTaskCard(t)).join('')}
      </div>
    </div>
  `;
}

function renderKanbanTaskCard(task) {
  return `
    <div class="kanban-task-card" draggable="true" data-kanban-task-id="${task.id}">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span class="project-key-badge">${task.key}</span>
        <span class="priority-pill ${task.priorityLevel}">${task.priority}</span>
      </div>

      <div style="font-size:13px;font-weight:600;color:var(--text-1);line-height:1.4">${task.title}</div>

      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        ${task.tags.map(tag => `<span class="auth-preview-pill pill-violet" style="font-size:9px;padding:1px 5px">${tag}</span>`).join('')}
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid var(--border-0);font-size:11px;color:var(--text-3)">
        <div style="display:flex;align-items:center;gap:4px">
          <span>✨ ${task.aiComplexity}</span>
        </div>

        <div style="display:flex;align-items:center;gap:8px">
          <span>${task.subtasksDone}/${task.subtasksCount}</span>
          <div class="member-avatar-mini" style="width:22px;height:22px;font-size:9px" title="${task.assignee.name}">${task.assignee.avatar}</div>
        </div>
      </div>
    </div>
  `;
}
