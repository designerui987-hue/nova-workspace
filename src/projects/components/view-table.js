/**
 * Project Detail View 3 — Table / Spreadsheet View Tab
 * High-density Linear/Notion style table with inline editable dropdowns, sorting, and tag filters.
 */

export function renderViewTable(project) {
  return `
    <div style="padding-top:var(--s-6)">
      <div class="spreadsheet-table-container">
        <table class="nova-table">
          <thead>
            <tr>
              <th style="width:40px"><input type="checkbox" id="table-select-all-check" /></th>
              <th style="width:110px">Key</th>
              <th>Task Title</th>
              <th style="width:130px">Status</th>
              <th style="width:110px">Priority</th>
              <th style="width:140px">Assignee</th>
              <th style="width:110px">Due Date</th>
              <th style="width:90px">Estimate</th>
              <th style="width:140px">AI Complexity</th>
            </tr>
          </thead>
          <tbody>
            ${project.tasks.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align:center;padding:var(--s-8);color:var(--text-3)">
                  No tasks found in this project. Click "+ Add Task" to create one.
                </td>
              </tr>
            ` : project.tasks.map(task => renderTableRow(task)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderTableRow(t) {
  return `
    <tr data-table-task-id="${t.id}">
      <td><input type="checkbox" class="table-row-check" /></td>
      <td><span class="project-key-badge">${t.key}</span></td>
      <td style="font-weight:600;color:var(--text-1)">${t.title}</td>
      <td>
        <select class="filter-select" style="height:28px;font-size:11px" data-inline-field="status" data-task-id="${t.id}">
          <option value="backlog" ${t.status==='backlog'?'selected':''}>Backlog</option>
          <option value="planned" ${t.status==='planned'?'selected':''}>Planned</option>
          <option value="in_progress" ${t.status==='in_progress'?'selected':''}>In Progress</option>
          <option value="review" ${t.status==='review'?'selected':''}>In Review</option>
          <option value="completed" ${t.status==='completed'?'selected':''}>Completed</option>
        </select>
      </td>
      <td>
        <span class="priority-pill ${t.priorityLevel}">${t.priority}</span>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div class="member-avatar-mini" style="width:20px;height:20px;font-size:9px">${t.assignee.avatar}</div>
          <span style="font-size:12px">${t.assignee.name.split(' ')[0]}</span>
        </div>
      </td>
      <td style="font-size:12px;color:var(--text-3)">${t.dueDate}</td>
      <td style="font-size:12px;font-family:var(--font-mono)">${t.estimate}</td>
      <td style="font-size:11px;color:var(--v-300)">✨ ${t.aiComplexity}</td>
    </tr>
  `;
}
