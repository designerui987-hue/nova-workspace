/**
 * Project Detail View 6 — AI Project Manager & Insights Tab
 * Proactive AI assistant: Risk detection, workload auto-balancer, velocity forecasting, and one-click status reports.
 */

export function renderViewAIManager(project) {
  return `
    <div style="padding-top:var(--s-6)">
      <div class="ai-pm-dashboard">
        <!-- Main AI Copilot Insights Card (8 Cols) -->
        <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <div class="ai-pm-card">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-4)">
              <div style="display:flex;align-items:center;gap:10px">
                <span style="font-size:24px">🤖</span>
                <div>
                  <h2 style="font-size:var(--fs-lg);font-weight:800;color:var(--text-1)">Nova AI Project Co-Pilot</h2>
                  <div style="font-size:12px;color:var(--v-300)">Continuous delivery monitoring & risk forecasting</div>
                </div>
              </div>
              <span class="auth-preview-pill pill-green" style="font-size:11px">96% Model Confidence</span>
            </div>

            <!-- Risk Alert Box -->
            <div class="ai-risk-alert-box">
              <span style="font-size:20px">🚨</span>
              <div style="flex:1">
                <div style="font-weight:700;color:#f59e0b;font-size:14px">Detected Workload Imbalance in Sprint 24</div>
                <div style="font-size:12px;color:var(--text-2);margin-top:2px">
                  Elena Rostova has 3 High-Complexity tasks scheduled for the next 48 hours (140% capacity).
                </div>
                <div style="display:flex;gap:8px;margin-top:var(--s-3)">
                  <button class="top-nav-btn primary-create" id="ai-auto-balance-btn" style="height:30px;font-size:11px">
                    <span>⚡ Auto-Balance Workload</span>
                  </button>
                  <button class="top-nav-btn" id="ai-reschedule-btn" style="height:30px;font-size:11px">
                    <span>Reschedule Tasks</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- One-Click AI Actions -->
            <div style="margin-top:var(--s-5)">
              <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--s-3)">One-Click AI Actions</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--s-3)">
                <button class="quick-action-card" id="ai-action-status-email" style="padding:12px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">📧</span>
                    <span style="font-size:13px;font-weight:600;color:var(--text-1)">Draft Status Email</span>
                  </div>
                </button>

                <button class="quick-action-card" id="ai-action-burndown-forecast" style="padding:12px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">📈</span>
                    <span style="font-size:13px;font-weight:600;color:var(--text-1)">Forecast Completion</span>
                  </div>
                </button>

                <button class="quick-action-card" id="ai-action-retrospective-brief" style="padding:12px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <span style="font-size:16px">📝</span>
                    <span style="font-size:13px;font-weight:600;color:var(--text-1)">Sprint Retro Brief</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <!-- Automated Sprint Summary -->
          <div class="dash-card">
            <h3 style="font-size:var(--fs-md);font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">Automated Sprint Summary</h3>
            <p style="font-size:14px;color:var(--text-2);line-height:1.6">
              In Sprint 24, the team completed <strong>${project.tasks.filter(t=>t.status==='completed').length} tasks</strong> with a velocity of <strong>${project.velocity}</strong>.
              Key achievement: ${project.milestones[0]?.title || 'Tokens Spec'} reached 100% completion.
            </p>
          </div>
        </div>

        <!-- Right Column (4 Cols): Velocity & Burndown Charts -->
        <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <div class="dash-card">
            <h3 style="font-size:var(--fs-md);font-weight:700;color:var(--text-1);margin-bottom:var(--s-4)">Burndown Velocity</h3>

            <div style="background:var(--bg-elevated);padding:var(--s-4);border-radius:var(--r-4);border:1px solid var(--border-1)">
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);margin-bottom:6px">
                <span>Estimated Target</span>
                <span style="color:var(--e-400);font-weight:600">On Track (Aug 25)</span>
              </div>
              <div class="progress-bar-container" style="height:10px">
                <div class="progress-bar-fill" style="width:${project.progress}%;background:linear-gradient(90deg,#6e4aff,#22c55e)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
