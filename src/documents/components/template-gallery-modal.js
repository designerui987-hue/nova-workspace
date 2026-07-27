/**
 * Template Gallery Modal Component
 * Pre-built professional document templates with AI auto-fill options.
 */

export function renderTemplateGalleryModal(templates) {
  return `
    <div class="modal-overlay-backdrop" id="template-gallery-backdrop" aria-hidden="true">
      <div class="command-palette-box" style="max-width:680px;padding:var(--s-8)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-6)">
          <div>
            <div style="font-size:var(--fs-xl);font-weight:800;color:var(--text-1)">Template Gallery</div>
            <div style="font-size:12px;color:var(--text-3);margin-top:2px">Select a pre-configured template or start blank</div>
          </div>
          <button class="top-nav-btn" id="close-template-gallery-btn" style="padding:0 8px">✕</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--s-4)">
          ${templates.map(tpl => `
            <div class="quick-action-card" data-template-id="${tpl.id}" style="padding:var(--s-5)">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-size:24px">${tpl.icon}</span>
                <span class="auth-preview-pill pill-violet" style="font-size:10px">${tpl.category}</span>
              </div>
              <div style="font-weight:700;color:var(--text-1);font-size:14px;margin-top:var(--s-2)">${tpl.title}</div>
              <div style="font-size:12px;color:var(--text-3);line-height:1.4;margin-top:4px">${tpl.description}</div>
              <button class="top-nav-btn primary-create" style="margin-top:var(--s-4);height:30px;font-size:11px" data-action="use-template" data-template-id="${tpl.id}">
                <span>Use Template →</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
