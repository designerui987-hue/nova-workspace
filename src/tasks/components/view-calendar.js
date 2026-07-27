/**
 * Tasks View 5 — Task Calendar & View 6 — Priority Matrix Components
 */

export function renderViewCalendar(tasks) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const gridCells = Array.from({length: 31}, (_, i) => i + 1);

  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(59,130,246,0.15);color:#3b82f6">📅</div>
            <div>
              <h2 class="card-title">Task Schedule Calendar</h2>
              <div class="card-subtitle">July — August 2026 Scheduled Deadlines</div>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--border-1);border:1px solid var(--border-1);border-radius:var(--r-4);overflow:hidden">
          ${days.map(d => `<div style="background:var(--bg-elevated);padding:10px;text-align:center;font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase">${d}</div>`).join('')}

          ${gridCells.map(dayNum => {
            const hasTask = dayNum === 15 || dayNum === 25 || dayNum === 27;
            return `
              <div style="background:var(--bg-surface);min-height:90px;padding:8px;display:flex;flex-direction:column;gap:4px">
                <div style="font-size:11px;font-weight:600;color:${dayNum === 27 ? 'var(--v-300)' : 'var(--text-3)'}">${dayNum} ${dayNum === 27 ? '● Today' : ''}</div>
                ${hasTask ? `
                  <div class="auth-preview-pill pill-violet" style="font-size:9px;padding:3px 6px;text-align:left">
                    🎯 Due: NOVA-101
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderViewMatrix(tasks) {
  const doFirst = tasks.filter(t => t.priority === 'Urgent' || t.priority === 'High');
  const schedule = tasks.filter(t => t.priority === 'Medium');
  const delegate = tasks.filter(t => t.isBlocked);
  const eliminate = tasks.filter(t => t.priority === 'Low' && !t.isToday);

  return `
    <div style="padding-top:var(--s-4)">
      <div class="matrix-grid-2x2">
        <!-- Quadrant 1: Do First (Urgent & Important) -->
        <div class="matrix-quadrant" style="border-color:rgba(239,68,68,0.4)">
          <div class="matrix-quadrant-header">
            <div class="matrix-quad-title" style="color:#f87171">🔥 Quadrant 1: Do First (Urgent & Important)</div>
            <span class="kanban-wip-badge">${doFirst.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${doFirst.map(t => renderMatrixItem(t)).join('')}
          </div>
        </div>

        <!-- Quadrant 2: Schedule (Important, Not Urgent) -->
        <div class="matrix-quadrant" style="border-color:rgba(59,130,246,0.4)">
          <div class="matrix-quadrant-header">
            <div class="matrix-quad-title" style="color:#60a5fa">📅 Quadrant 2: Schedule (Important, Not Urgent)</div>
            <span class="kanban-wip-badge">${schedule.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${schedule.map(t => renderMatrixItem(t)).join('')}
          </div>
        </div>

        <!-- Quadrant 3: Delegate (Urgent, Not Important) -->
        <div class="matrix-quadrant" style="border-color:rgba(245,158,11,0.4)">
          <div class="matrix-quadrant-header">
            <div class="matrix-quad-title" style="color:#fbbf24">👥 Quadrant 3: Delegate (Urgent, Not Important)</div>
            <span class="kanban-wip-badge">${delegate.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${delegate.map(t => renderMatrixItem(t)).join('')}
          </div>
        </div>

        <!-- Quadrant 4: Eliminate / Low Priority -->
        <div class="matrix-quadrant" style="border-color:rgba(107,114,128,0.4)">
          <div class="matrix-quadrant-header">
            <div class="matrix-quad-title" style="color:#9ca3af">🗑️ Quadrant 4: Eliminate / Low Priority</div>
            <span class="kanban-wip-badge">${eliminate.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${eliminate.map(t => renderMatrixItem(t)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderMatrixItem(t) {
  return `
    <div class="task-list-item-row" data-task-row-id="${t.id}" style="padding:8px 12px">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--text-1)" class="truncate">${t.title}</div>
        <div style="font-size:10px;color:var(--text-3);margin-top:2px">${t.project} • Due: ${t.dueDate}</div>
      </div>
      <button class="task-act-btn" data-action="open-detail" data-task-id="${t.id}" style="height:24px;font-size:10px">Open</button>
    </div>
  `;
}
