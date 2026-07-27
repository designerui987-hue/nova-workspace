/**
 * Multi-Step Create Knowledge Article Wizard Modal Component
 * 5-Step Wizard: Details -> Category -> Connected Links -> AI Formatting -> Review & Publish.
 */

export function renderCreateArticleWizardModal(currentStep = 1, formData = {}) {
  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Category' },
    { num: 3, label: 'Links' },
    { num: 4, label: '✨ AI Format' },
    { num: 5, label: 'Review' }
  ];

  return `
    <div class="modal-overlay-backdrop" id="article-wizard-backdrop" aria-hidden="true">
      <div class="command-palette-box" style="max-width:620px;padding:var(--s-8)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-6)">
          <div>
            <div style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Create Knowledge Article</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Step ${currentStep} of 5 — ${steps[currentStep-1].label}</div>
          </div>
          <button class="top-nav-btn" id="close-article-wizard-btn" style="padding:0 8px">✕</button>
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
        <form id="article-wizard-form">
          ${renderWizardStepContent(currentStep, formData)}

          <div style="display:flex;justify-content:space-between;margin-top:var(--s-8);padding-top:var(--s-4);border-top:1px solid var(--border-1)">
            <button type="button" class="btn btn-ghost" id="art-wizard-prev-btn" ${currentStep === 1 ? 'disabled' : ''}>
              ← Back
            </button>
            <button type="button" class="btn btn-primary" id="art-wizard-next-btn">
              ${currentStep === 5 ? '🚀 Publish Article' : 'Next →'}
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
          <label class="field-label" for="wiz-art-title">Article Title</label>
          <input class="form-input" type="text" id="wiz-art-title" placeholder="e.g. Design Tokens Architecture Spec" value="${data.title || ''}" required />
        </div>
        <div class="form-field">
          <label class="field-label" for="wiz-art-summary">Summary</label>
          <textarea class="form-textarea" placeholder="Brief executive summary...">${data.summary || ''}</textarea>
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div class="form-field">
          <label class="field-label">Collection</label>
          <select class="form-select" id="wiz-art-col">
            <option value="Design System & UI Guidelines">Design System & UI Guidelines</option>
            <option value="AI Architecture & Vector SLAs">AI Architecture & Vector SLAs</option>
            <option value="Engineering & API Specs">Engineering & API Specs</option>
            <option value="Company Wiki & Onboarding">Company Wiki & Onboarding</option>
          </select>
        </div>
      </div>
    `;
  }

  if (step === 3) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4)">
        <div class="form-field">
          <label class="field-label">Linked Project</label>
          <input class="form-input" type="text" value="Nova UI System (NOVA-101)" />
        </div>
      </div>
    `;
  }

  if (step === 4) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--s-4);background:rgba(110,74,255,0.08);padding:var(--s-5);border-radius:var(--r-5);border:1px solid rgba(110,74,255,0.3)">
        <div style="font-size:14px;font-weight:700;color:var(--text-1)">✨ AI Knowledge Formatting</div>
        <p style="font-size:12px;color:var(--text-2);line-height:1.5">
          Nova AI auto-formatted markdown headings, code blocks, and generated a 99% confidence score.
        </p>
      </div>
    `;
  }

  return `
    <div style="display:flex;flex-direction:column;gap:var(--s-4);text-align:center;padding:var(--s-6)">
      <div style="font-size:48px">📚</div>
      <h3 style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Ready to Publish!</h3>
      <p style="font-size:13px;color:var(--text-3);max-width:400px;margin:0 auto">
        Your article will be added to the company second brain.
      </p>
    </div>
  `;
}
