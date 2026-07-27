/**
 * Multi-Step Schedule Meeting Wizard Modal Component
 * 5-Step Wizard: Info -> Participants -> Timing -> Agenda -> AI Prep & Schedule.
 */

export function renderScheduleMeetingWizardModal(currentStep = 1, formData = {}) {
  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Attendees' },
    { num: 3, label: 'Timing' },
    { num: 4, label: 'Agenda' },
    { num: 5, label: '✨ AI Prep' }
  ];

  return `
    <div class="modal-overlay-backdrop" id="meeting-wizard-backdrop" aria-hidden="true">
      <div class="command-palette-box" style="max-width:620px;padding:var(--s-8)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-6)">
          <div>
            <div style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Schedule New Meeting</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Step ${currentStep} of 5 — ${steps[currentStep-1].label}</div>
          </div>
          <button class="top-nav-btn" id="close-meeting-wizard-btn" style="padding:0 8px">✕</button>
        </div>

        <!-- Stepper -->
        <div class="wizard-stepper-row">
          ${steps.map(s => `
            <div class="wizard-step-node ${s.num === currentStep ? 'active' : s.num < currentStep ? 'done' : ''}">
              ${s.num < currentStep ? '✓' : s.num}
            </div>
          `).join('')}
        </div>

        <!-- Form Container -->
        <form id="meeting-wizard-form">
          ${renderWizardStepContent(currentStep, formData)}

          <div style="display:flex;justify-content:space-between;margin-top:var(--s-8);padding-top:var(--s-4);border-top:1px solid var(--border-1)">
            <button type="button" class="btn btn-ghost" id="mtg-wizard-prev-btn" ${currentStep === 1 ? 'disabled' : ''}>
              ← Back
            </button>
            <button type="button" class="btn btn-primary" id="mtg-wizard-next-btn">
              ${currentStep === 5 ? '🚀 Schedule Meeting' : 'Next →'}
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
        <div class="form-field">
          <label class="field-label" for="wiz-mtg-title">Meeting Title</label>
          <input class="form-input" type="text" id="wiz-mtg-title" placeholder="e.g. Design System & Tokens Sync" value="${data.title || ''}" required />
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="wiz-mtg-cat">Category</label>
            <select class="form-select" id="wiz-mtg-cat">
              <option value="Design & Architecture">Design & Architecture</option>
              <option value="AI Architecture">AI Architecture</option>
              <option value="Agile & Planning">Agile & Planning</option>
            </select>
          </div>
          <div class="form-field">
            <label class="field-label" for="wiz-mtg-platform">Platform Link</label>
            <input class="form-input" type="text" id="wiz-mtg-platform" value="Nova Video Huddle" />
          </div>
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <label class="field-label">Select Attendees</label>
        <div style="display:flex;flex-direction:column;gap:8px;padding:var(--s-4);background:var(--bg-elevated);border-radius:var(--r-4);border:1px solid var(--border-1)">
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Alex Johnson (Lead Designer)</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Sarah Lin (UX Engineer)</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Elena Rostova (AI Architect)</label>
          <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" checked /> Marcus Chen (Frontend Dev)</label>
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="wiz-mtg-date">Date</label>
            <input class="form-input" type="date" id="wiz-mtg-date" value="2026-08-02" />
          </div>
          <div class="form-field">
            <label class="field-label" for="wiz-mtg-time">Time</label>
            <input class="form-input" type="time" id="wiz-mtg-time" value="10:30" />
          </div>
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div class="form-field">
          <label class="field-label">Agenda Topics</label>
          <textarea class="form-textarea" placeholder="Topic 1: Token Specs (15m)&#10;Topic 2: Component Migration (15m)">Topic 1: Architecture Review (15m)&#10;Topic 2: Action Items Allocation (15m)</textarea>
        </div>
      </div>
    `;
  }

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-4);background:rgba(34,197,94,0.08);padding:var(--s-5);border-radius:var(--r-5);border:1px solid rgba(34,197,94,0.3);text-align:center">
      <div style="font-size:48px">📅</div>
      <h3 style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">✨ AI Meeting Prep Complete</h3>
      <p style="font-size:13px;color:var(--text-2);line-height:1.5">
        Nova AI generated a 98% quality briefing and linked recent tasks. Click below to schedule.
      </p>
    </div>
  `;
}
