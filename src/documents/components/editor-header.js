/**
 * Sticky Document Editor Header Component
 * Breadcrumbs, status badge, version indicator, auto-save pulse signal, Share & Publish buttons.
 */

export function renderEditorHeader(doc) {
  return `
    <header class="editor-sticky-header">
      <div style="display:flex;align-items:center;gap:var(--s-4)">
        <button class="task-act-btn" id="back-to-docs-home-btn" style="height:32px;padding:0 10px">
          <span>← Docs</span>
        </button>

        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:18px">${doc.icon}</span>
          <span style="font-size:13px;font-weight:600;color:var(--text-1)" class="truncate">${doc.title}</span>
          <span class="project-key-badge">${doc.version}</span>
          <span class="project-status-badge" style="background:${doc.statusColor}22;color:${doc.statusColor}">
            ● ${doc.status}
          </span>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:var(--s-3)">
        <div id="doc-autosave-indicator" style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--e-400);font-weight:600">
          <span style="width:6px;height:6px;border-radius:50%;background:var(--e-400);box-shadow:0 0 6px var(--e-400)"></span>
          <span>Saved to Cloud</span>
        </div>

        <div class="members-avatar-stack">
          ${doc.collaborators.map(c => `<div class="member-avatar-mini" style="width:26px;height:26px;font-size:10px" title="${c.name}">${c.avatar}</div>`).join('')}
        </div>

        <button class="top-nav-btn" id="doc-share-btn">
          <span>🔗 Share</span>
        </button>

        <button class="top-nav-btn primary-create" id="doc-publish-btn" style="height:32px;font-size:12px">
          <span>Publish</span>
        </button>
      </div>
    </header>
  `;
}
