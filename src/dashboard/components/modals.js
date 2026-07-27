/**
 * Interactive Modals & Drawers Component
 * Modals for Task Creation, Project Creation, Notifications Drawer, Member Profile View.
 */

export function renderTaskModal() {
  return `
    <div class="modal-overlay-backdrop" id="create-task-modal" aria-hidden="true">
      <div class="command-palette-box" style="max-width:520px;padding:var(--s-6)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-5)">
          <div style="font-size:var(--fs-lg);font-weight:700;color:var(--text-1)">Create New Task</div>
          <button class="top-nav-btn" id="close-task-modal-btn" style="padding:0 8px">✕</button>
        </div>

        <form id="modal-create-task-form" style="display:flex;flex-direction:column;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="task-title-in">Task title</label>
            <input class="form-input" type="text" id="task-title-in" placeholder="e.g. Design Dark Mode Tokens" required />
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
            <div class="form-field">
              <label class="field-label" for="task-proj-in">Project</label>
              <select class="form-select" id="task-proj-in">
                <option value="Nova UI System">Nova UI System</option>
                <option value="Mobile App Redesign">Mobile App Redesign</option>
                <option value="AI Assistant Core">AI Assistant Core</option>
              </select>
            </div>

            <div class="form-field">
              <label class="field-label" for="task-priority-in">Priority</label>
              <select class="form-select" id="task-priority-in">
                <option value="Urgent">Urgent</option>
                <option value="High" selected>High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div style="display:flex;justify-content:flex-end;gap:var(--s-3);margin-top:var(--s-4)">
            <button type="button" class="btn btn-ghost" id="cancel-task-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function renderNotificationsDrawer(notifications) {
  return `
    <div class="modal-overlay-backdrop" id="notifications-drawer-backdrop" aria-hidden="true" style="justify-content:flex-end;padding-top:0">
      <div style="width:360px;height:100dvh;background:var(--bg-surface);border-left:1px solid var(--border-1);padding:var(--s-6);display:flex;flex-direction:column;gap:var(--s-4);animation:slide-left var(--dur-3) var(--ease) both">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="font-size:16px;font-weight:700;color:var(--text-1)">Notifications</div>
          <button class="top-nav-btn" id="close-notif-drawer-btn" style="padding:0 8px">✕</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;overflow-y:auto;flex:1">
          ${notifications.map(n => `
            <div style="padding:12px;border-radius:8px;background:${n.read ? 'var(--bg-elevated)' : 'rgba(110,74,255,0.1)'};border:1px solid ${n.read ? 'var(--border-1)' : 'rgba(110,74,255,0.3)'}">
              <div style="font-size:13px;font-weight:600;color:var(--text-1);margin-bottom:2px">${n.title}</div>
              <div style="font-size:12px;color:var(--text-2);line-height:1.4">${n.text}</div>
              <div style="font-size:10px;color:var(--text-4);margin-top:6px">${n.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
