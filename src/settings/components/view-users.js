/**
 * Admin View 1 — User Directory & Team Management Component
 * Enterprise user directory table with role pills, auth provider status, and invite triggers.
 */

export function renderViewUsers(data) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="dash-card">
        <div class="card-header-flex">
          <div class="card-title-group">
            <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">👥</div>
            <div>
              <h2 class="card-title">User Directory (${data.users.length} Active Accounts)</h2>
              <div class="card-subtitle">Manage organization member roles, authentication methods, and licenses</div>
            </div>
          </div>
        </div>

        <table class="nova-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Department</th>
              <th>Authentication</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data.users.map(u => `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px">
                    <div class="member-avatar-mini" style="width:32px;height:32px;font-size:11px">${u.avatar}</div>
                    <div>
                      <div style="font-weight:700;color:var(--text-1);font-size:13px">${u.name}</div>
                      <div style="font-size:11px;color:var(--text-3)">${u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="auth-preview-pill ${u.role === 'Owner' ? 'pill-violet' : u.role === 'Admin' ? 'pill-cyan' : 'pill-green'}" style="font-size:10px">
                    ${u.role}
                  </span>
                </td>
                <td style="font-size:12px;color:var(--text-2);font-weight:600">${u.department}</td>
                <td style="font-size:12px;color:var(--text-3)">${u.authMethod}</td>
                <td>
                  <span class="project-status-badge" style="background:#22c55e22;color:#22c55e;border:1px solid #22c55e44">
                    ● ${u.status}
                  </span>
                </td>
                <td>
                  <button class="task-act-btn" data-action="edit-user-role" data-user-id="${u.id}">Edit Role</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
