/**
 * Tasks View 3 — Task Board (Kanban) View Component
 * Drag & drop columns for Inbox, To Do, In Progress, Review, and Done.
 */

export function renderViewBoard(tasks) {
  const columns = [
    { id: 'inbox', title: 'Inbox', color: '#9ca3af' },
    { id: 'todo', title: 'To Do', color: '#3b82f6' },
    { id: 'in_progress', title: 'In Progress', color: '#06b6d4' },
    { id: 'review', title: 'In Review', color: '#a855f7' },
    { id: 'done', title: 'Done', color: '#22c55e' }
  ];

  return `
    <div style="padding-top:var(--s-4)">
      <div class="kanban-board-container">
        ${columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return `
            <div class="kanban-column" data-board-col-id="${col.id}">
              <div class="kanban-column-header">
                <div class="kanban-column-title">
                  <span style="width:8px;height:8px;border-radius:50%;background:${col.color}"></span>
                  <span>${col.title}</span>
                </div>
                <span class="kanban-wip-badge">${colTasks.length}</span>
              </div>

              <div class="kanban-cards-scroll">
                ${colTasks.length === 0 ? `
                  <div style="padding:var(--s-6);text-align:center;color:var(--text-4);font-size:12px">No tasks in ${col.title}</div>
                ` : colTasks.map(t => `
                  <div class="kanban-task-card" draggable="true" data-task-id="${t.id}">
                    <div style="display:flex;align-items:center;justify-content:space-between">
                      <span class="project-key-badge">${t.key}</span>
                      <span class="priority-pill ${t.priorityLevel}">${t.priority}</span>
                    </div>
                    <div style="font-size:13px;font-weight:600;color:var(--text-1)">${t.title}</div>
                    <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-3);padding-top:6px;border-top:1px solid var(--border-0)">
                      <span>${t.estimate}</span>
                      <div class="member-avatar-mini" style="width:20px;height:20px;font-size:9px">${t.assignee.avatar}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
