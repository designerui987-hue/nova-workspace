/**
 * Multi-Step Project Creation Wizard Modal Component
 * 5-Step Wizard: Info -> Team -> Timeline -> AI Setup -> Review & Launch
 */

export function renderCreateProjectWizardModal(currentStep = 1, formData = {}) {
  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Team' },
    { num: 3, label: 'Timeline' },
    { num: 4, label: '✨ AI Setup' },
    { num: 5, label: 'Review' }
  ];

  return `
    <div class="modal-overlay-backdrop" id="project-wizard-backdrop" aria-hidden="true">
      <div class="command-palette-box" style="max-width:620px;padding:var(--s-8)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-6)">
          <div>
            <div style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Create New Project</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Step ${currentStep} of 5 — ${steps[currentStep-1].label}</div>
          </div>
          <button class="top-nav-btn" id="close-project-wizard-btn" style="padding:0 8px">✕</button>
        </div>

        <!-- Stepper -->
        <div class="wizard-stepper-row">
          ${steps.map(s => `
            <div class="wizard-step-node ${s.num === currentStep ? 'active' : s.num < currentStep ? 'done' : ''}">
              ${s.num < currentStep ? '✓' : s.num}
            </div>
          `).join('')}
        </div>

        <!-- Step Content Container -->
        <form id="project-wizard-form">
          ${renderWizardStepContent(currentStep, formData)}

          <div style="display:flex;justify-content:space-between;margin-top:var(--s-8);padding-top:var(--s-4);border-top:1px solid var(--border-1)">
            <button type="button" class="btn btn-ghost" id="wizard-prev-btn" ${currentStep === 1 ? 'disabled' : ''}>
              ← Back
            </button>
            <button type="button" class="btn btn-primary" id="wizard-next-btn">
              ${currentStep === 5 ? '🚀 Launch Project' : 'Next →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderWizardStepContent(step, data) {
  if (step === 1) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div style="display:grid;grid-template-columns:1fr 120px;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="wiz-proj-name">Project Name</label>
            <input class="form-input" type="text" id="wiz-proj-name" placeholder="e.g. Design System 2.0" value="${data.name || ''}" required />
          </div>
          <div class="form-field">
            <label class="field-label" for="wiz-proj-key">Key Prefix</label>
            <input class="form-input" type="text" id="wiz-proj-key" placeholder="NOVA" value="${data.key || 'NOVA'}" style="text-transform:uppercase;font-family:var(--font-mono)" required />
          </div>
        </div>

        <div class="form-field">
          <label class="field-label" for="wiz-proj-desc">Description</label>
          <textarea class="form-textarea" id="wiz-proj-desc" placeholder="Describe the goal and scope of this project...">${data.description || ''}</textarea>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="wiz-proj-cat">Category</label>
            <select class="form-select" id="wiz-proj-cat">
              <option value="Design System">Design System</option>
              <option value="AI Engineering">AI Engineering</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Data Engineering">Data Engineering</option>
            </select>
          </div>
          <div class="form-field">
            <label class="field-label" for="wiz-proj-icon">Icon Emoji</label>
            <input class="form-input" type="text" id="wiz-proj-icon" value="${data.icon || '🚀'}" style="text-align:center;font-size:18px" />
          </div>
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div class="form-field">
          <label class="field-label" for="wiz-proj-lead">Project Lead</label>
          <select class="form-select" id="wiz-proj-lead">
            <option value="Alex Johnson">Alex Johnson (Lead Designer)</option>
            <option value="Sarah Lin">Sarah Lin (UX Engineer)</option>
            <option value="Elena Rostova">Elena Rostova (AI Architect)</option>
            <option value="David Kim">David Kim (Fullstack Dev)</option>
          </select>
        </div>

        <div class="form-field">
          <label class="field-label">Initial Team Members</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;padding:var(--s-4);background:var(--bg-elevated);border-radius:var(--r-4);border:1px solid var(--border-1)">
            <label style="display:flex;align-items:center;gap:6px;font-size:12px"><input type="checkbox" checked /> Alex Johnson</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px"><input type="checkbox" checked /> Sarah Lin</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px"><input type="checkbox" checked /> Marcus Chen</label>
            <label style="display:flex;align-items:center;gap:6px;font-size:12px"><input type="checkbox" checked /> Elena Rostova</label>
          </div>
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="wiz-start-date">Start Date</label>
            <input class="form-input" type="date" id="wiz-start-date" value="2026-08-01" />
          </div>
          <div class="form-field">
            <label class="field-label" for="wiz-target-date">Target Delivery Date</label>
            <input class="form-input" type="date" id="wiz-target-date" value="2026-09-15" />
          </div>
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4);background:rgba(110,74,255,0.08);padding:var(--s-5);border-radius:var(--r-5);border:1px solid rgba(110,74,255,0.3)">
        <div style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:var(--text-1)">
          <span>✨ Proactive AI Setup</span>
        </div>
        <p style="font-size:13px;color:var(--text-2);line-height:1.5">
          Nova AI will automatically generate initial tasks, milestone targets, and risk forecasts based on your project description.
        </p>

        <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Auto-generate initial task backlog (5 tasks)</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Auto-create 3 Milestone Delivery Gates</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Enable AI Risk & Latency Monitoring</label>
        </div>
      </div>
    `;
  }

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-4);text-align:center;padding:var(--s-6)">
      <div style="font-size:48px">🚀</div>
      <h3 style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Ready to Launch!</h3>
      <p style="font-size:14px;color:var(--text-3);max-width:400px;margin:0 auto">
        Your project space is configured. Click below to initialize the workspace.
      </p>
    </div>
  `;
}
