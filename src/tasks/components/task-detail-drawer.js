/**
 * Task Detail Split Drawer Component
 * Left: Title, Description, Subtask Checklist, Comments; Right: Status, Priority, Time Tracker, Dependencies.
 */

export function renderTaskDetailDrawer(task) {
  if (!task) return '';

  return `
    <div class="task-detail-drawer-backdrop" id="task-detail-drawer-backdrop">
      <div class="task-detail-drawer-body">
        <!-- Drawer Header Bar -->
        <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--s-4) var(--s-6);border-bottom:1px solid var(--border-1);background:var(--bg-elevated)">
          <div style="display:flex;align-items:center;gap:8px">
            <span class="project-key-badge">${task.key}</span>
            <span style="font-size:12px;color:var(--text-3)">in <strong style="color:var(--text-1)">${task.project}</strong></span>
          </div>
          <button class="top-nav-btn" id="close-task-detail-drawer-btn" style="padding:0 8px">✕</button>
        </div>

        <!-- Split Content -->
        <div class="task-detail-split-content">
          <!-- Main Left Column -->
          <div style="padding:var(--s-6);display:flex;flex-direction:column;gap:var(--s-6)">
            <div>
              <h2 style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1);line-height:1.3;margin-bottom:var(--s-3)">${task.title}</h2>
              <p style="font-size:14px;color:var(--text-2);line-height:1.6">${task.description}</p>
            </div>

            <!-- Subtasks Checklist -->
            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">Subtasks Checklist</div>
              <div style="display:flex;flex-direction:column;gap:8px">
                ${task.subtasks.map(s => `
                  <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-1);cursor:pointer">
                    <input type="checkbox" ${s.completed ? 'checked' : ''} />
                    <span style="${s.completed ? 'text-decoration:line-through;opacity:0.5' : ''}">${s.title}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- AI Insight Card -->
            ${task.aiInsight ? `
              <div class="ai-summary-box">
                ${task.aiInsight}
              </div>
            ` : ''}

            <!-- Comments Thread -->
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">Activity & Comments (${task.comments.length})</div>
              <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:var(--s-4)">
                ${task.comments.map(c => `
                  <div style="background:var(--bg-elevated);padding:10px;border-radius:8px;border:1px solid var(--border-1)">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                      <strong style="font-size:12px;color:var(--text-1)">${c.user.name}</strong>
                      <span style="font-size:10px;color:var(--text-4)">${c.time}</span>
                    </div>
                    <div style="font-size:12px;color:var(--text-2)">${c.text}</div>
                  </div>
                `).join('')}
              </div>

              <div class="input-wrap">
                <input class="form-input" type="text" id="detail-comment-input" placeholder="Write a comment or tag team member..." style="height:36px;font-size:12px" />
              </div>
            </div>
          </div>

          <!-- Right Sidebar Meta Panel -->
          <div style="background:var(--bg-elevated);border-left:1px solid var(--border-1);padding:var(--s-5);display:flex;flex-direction:column;gap:var(--s-5)">
            <div>
              <label class="field-label">Status</label>
              <select class="form-select" id="detail-status-select" style="height:32px;font-size:12px">
                <option value="todo" ${task.status==='todo'?'selected':''}>To Do</option>
                <option value="in_progress" ${task.status==='in_progress'?'selected':''}>In Progress</option>
                <option value="review" ${task.status==='review'?'selected':''}>In Review</option>
                <option value="done" ${task.status==='done'?'selected':''}>Completed</option>
              </select>
            </div>

            <div>
              <label class="field-label">Priority</label>
              <span class="priority-pill ${task.priorityLevel}" style="display:inline-block">${task.priority}</span>
            </div>

            <div>
              <label class="field-label">Assignee</label>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="member-avatar-mini" style="width:26px;height:26px">${task.assignee.avatar}</div>
                <span style="font-size:13px;font-weight:600;color:var(--text-1)">${task.assignee.name}</span>
              </div>
            </div>

            <div>
              <label class="field-label">Due Date</label>
              <div style="font-size:13px;color:var(--text-1)">${task.dueDate}</div>
            </div>

            <!-- Time Tracker Widget -->
            <div style="background:var(--bg-surface);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:11px;color:var(--text-3);margin-bottom:4px">Time Spent / Estimate</div>
              <div style="font-size:18px;font-weight:800;font-family:var(--font-mono);color:var(--text-1)">${task.timeSpent} / ${task.estimate}</div>
              <button class="top-nav-btn primary-create" style="width:100%;margin-top:8px;height:28px;font-size:11px" id="detail-timer-start-btn">
                <span>▶ Start Timer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
