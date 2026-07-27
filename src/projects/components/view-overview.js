/**
 * Project Detail View 1 — Overview Tab
 * Progress summary, Milestones timeline, Blocked items, Budget & AI Executive Brief.
 */

export function renderViewOverview(project) {
  return `
    <div class="dashboard-grid-12" style="padding-top:var(--s-6)">
      <!-- Left Column (8 Cols): Milestones & Progress -->
      <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-6)">
        <!-- Executive AI Brief Card -->
        <div class="dash-card ai-brief-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
            <div class="ai-header-badge">
              <span>✨ Executive AI Brief</span>
            </div>
            <span style="font-size:12px;color:var(--e-400);font-weight:600">● 96% AI Confidence</span>
          </div>

          <div class="ai-summary-box">
            ${project.aiSummary}
          </div>

          ${project.aiRisks.length > 0 ? `
            <div class="ai-risk-alert-box">
              <span style="font-size:18px">⚠️</span>
              <div>
                <div style="font-weight:700;color:#f59e0b;font-size:13px">${project.aiRisks[0].title}</div>
                <div style="font-size:12px;color:var(--text-2);margin-top:2px">${project.aiRisks[0].description}</div>
                <div style="font-size:11px;color:var(--v-300);margin-top:4px">💡 Recommendation: ${project.aiRisks[0].recommendation}</div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Milestones Roadmap Card -->
        <div class="dash-card">
          <div class="card-header-flex">
            <div class="card-title-group">
              <div class="ws-icon-box" style="background:rgba(168,85,247,0.15);color:#a855f7">🎯</div>
              <div>
                <h2 class="card-title">Project Milestones</h2>
                <div class="card-subtitle">Key delivery gates & completion progress</div>
              </div>
            </div>
            <button class="top-nav-btn" id="add-milestone-btn">
              <span>+ Add Milestone</span>
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:var(--s-4)">
            ${project.milestones.map(m => `
              <div class="knowledge-item-row" style="padding:var(--s-4)">
                <div style="flex:1">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-weight:700;color:var(--text-1);font-size:14px">${m.title}</span>
                    <span class="project-status-badge" style="background:${getMilestoneColor(m.status)}22;color:${getMilestoneColor(m.status)}">
                      ${m.status}
                    </span>
                  </div>
                  <div style="font-size:12px;color:var(--text-3);margin-top:4px">Target Date: ${m.dueDate}</div>
                </div>

                <div style="width:140px">
                  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-bottom:4px">
                    <span>Progress</span>
                    <span style="font-weight:700;color:var(--text-1)">${m.progress}%</span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width:${m.progress}%;background:${project.color}"></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column (4 Cols): Project Health & Resource Meta -->
      <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-6)">
        <div class="dash-card">
          <h3 style="font-size:var(--fs-md);font-weight:700;color:var(--text-1);margin-bottom:var(--s-4)">Project Meta & Health</h3>

          <div style="display:flex;flex-direction:column;gap:var(--s-4)">
            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:12px;color:var(--text-3)">Overall Progress</div>
              <div style="font-size:24px;font-weight:800;color:var(--text-1);margin-top:4px">${project.progress}%</div>
              <div class="progress-bar-container" style="margin-top:8px">
                <div class="progress-bar-fill" style="width:${project.progress}%;background:${project.color}"></div>
              </div>
            </div>

            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:12px;color:var(--text-3)">Budget Allocation</div>
              <div style="font-size:18px;font-weight:700;color:var(--text-1);margin-top:4px">${project.budget}</div>
            </div>

            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:12px;color:var(--text-3)">Team Velocity</div>
              <div style="font-size:18px;font-weight:700;color:var(--v-300);margin-top:4px">${project.velocity}</div>
            </div>

            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="font-size:12px;color:var(--text-3);margin-bottom:8px">Project Lead</div>
              <div style="display:flex;align-items:center;gap:10px">
                <div class="member-avatar-mini" style="width:32px;height:32px">${project.lead.avatar}</div>
                <div>
                  <div style="font-size:13px;font-weight:600;color:var(--text-1)">${project.lead.name}</div>
                  <div style="font-size:11px;color:var(--text-3)">${project.lead.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getMilestoneColor(status) {
  if (status === 'Completed') return '#22c55e';
  if (status === 'In Progress') return '#06b6d4';
  if (status === 'At Risk') return '#f59e0b';
  return '#6b7280';
}
