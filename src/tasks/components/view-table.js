/**
 * Tasks View 4 — Task Table / Spreadsheet View Component
 * High-density table with inline editable select dropdowns.
 */

export function renderViewTable(tasks) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="spreadsheet-table-container">
        <table class="nova-table">
          <thead>
            <tr>
              <th style="width:40px"><input type="checkbox" /></th>
              <th style="width:110px">Key</th>
              <th>Task Title</th>
              <th style="width:130px">Status</th>
              <th style="width:110px">Priority</th>
              <th style="width:140px">Project</th>
              <th style="width:130px">Assignee</th>
              <th style="width:110px">Due Date</th>
              <th style="width:90px">Estimate</th>
            </tr>
          </thead>
          <tbody>
            ${tasks.map(t => `
              <tr data-table-task-id="${t.id}">
                <td><input type="checkbox" /></td>
                <td><span class="project-key-badge">${t.key}</span></td>
                <td style="font-weight:600;color:var(--text-1)">${t.title}</td>
                <td>
                  <select class="filter-select" style="height:28px;font-size:11px" data-inline-task-field="status" data-task-id="${t.id}">
                    <option value="todo" ${t.status==='todo'?'selected':''}>To Do</option>
                    <option value="in_progress" ${t.status==='in_progress'?'selected':''}>In Progress</option>
                    <option value="review" ${t.status==='review'?'selected':''}>In Review</option>
                    <option value="done" ${t.status==='done'?'selected':''}>Done</option>
                  </select>
                </td>
                <td><span class="priority-pill ${t.priorityLevel}">${t.priority}</span></td>
                <td style="font-size:12px;color:var(--text-2);font-weight:600">${t.project}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:6px">
                    <div class="member-avatar-mini" style="width:20px;height:20px;font-size:9px">${t.assignee.avatar}</div>
                    <span style="font-size:12px">${t.assignee.name.split(' ')[0]}</span>
                  </div>
                </td>
                <td style="font-size:12px;color:var(--text-3)">${t.dueDate}</td>
                <td style="font-size:12px;font-family:var(--font-mono)">${t.estimate}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
