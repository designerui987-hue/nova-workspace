/**
 * Block Editor Canvas Component (Notion / Craft Inspired)
 * Interactive content blocks, inline slash commands menu, and real-time formatting toolbar.
 */

export function renderBlockEditor(doc) {
  return `
    <div style="flex:1;overflow-y:auto">
      <div class="doc-cover-banner" style="background:${doc.cover}"></div>
      <div class="doc-emoji-avatar">${doc.icon}</div>

      <div class="block-editor-canvas" id="block-editor-canvas">
        <input class="block-editor-title" id="doc-title-editable" value="${doc.title}" placeholder="Untitled Document..." />

        <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:var(--text-3);margin-bottom:var(--s-6);padding-bottom:var(--s-4);border-bottom:1px solid var(--border-1)">
          <span>By <strong>${doc.author.name}</strong></span>
          <span>•</span>
          <span>${doc.readingTime}</span>
          <span>•</span>
          <span>Category: <strong style="color:var(--v-300)">${doc.category}</strong></span>
          <span>•</span>
          <span style="color:var(--text-4)">Type '/' for AI commands & blocks</span>
        </div>

        <!-- Render Block List -->
        <div id="editor-blocks-container" style="display:flex;flex-direction:column;gap:var(--s-3)">
          ${doc.blocks.map((block, idx) => renderBlockItem(block, idx)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderBlockItem(block, index) {
  if (block.type === 'heading1') {
    return `<div class="editor-block-item" data-block-type="heading1" contenteditable="true" data-block-idx="${index}">${block.text}</div>`;
  }
  if (block.type === 'heading2') {
    return `<div class="editor-block-item" data-block-type="heading2" contenteditable="true" data-block-idx="${index}">${block.text}</div>`;
  }
  if (block.type === 'code') {
    return `<div class="editor-block-item" data-block-type="code" contenteditable="true" data-block-idx="${index}">${block.text}</div>`;
  }
  if (block.type === 'callout') {
    return `<div class="editor-block-item" data-block-type="callout" contenteditable="true" data-block-idx="${index}">${block.text}</div>`;
  }
  if (block.type === 'checklist') {
    return `
      <div style="display:flex;align-items:center;gap:8px;padding:2px 0">
        <input type="checkbox" ${block.completed ? 'checked' : ''} />
        <div class="editor-block-item" data-block-type="paragraph" contenteditable="true" style="${block.completed ? 'text-decoration:line-through;opacity:0.6' : ''}" data-block-idx="${index}">${block.text}</div>
      </div>
    `;
  }
  return `<div class="editor-block-item" data-block-type="paragraph" contenteditable="true" data-block-idx="${index}">${block.text}</div>`;
}

export function renderSlashMenuModal() {
  return `
    <div class="slash-menu-box" id="slash-menu-dropdown" style="display:none">
      <div style="font-size:10px;font-weight:700;color:var(--text-4);letter-spacing:0.06em;text-transform:uppercase;padding:4px 8px">AI & Basic Blocks</div>
      <button class="slash-item-btn" data-slash-cmd="ai-generate">
        <span>✨</span> <span>AI Generate Text</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="ai-rewrite">
        <span>✨</span> <span>AI Rewrite & Improve</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="h1">
        <span>H1</span> <span>Heading 1</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="h2">
        <span>H2</span> <span>Heading 2</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="callout">
        <span>💡</span> <span>Callout Box</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="code">
        <span>💻</span> <span>Code Block</span>
      </button>
      <button class="slash-item-btn" data-slash-cmd="checklist">
        <span>☑</span> <span>Checklist Item</span>
      </button>
    </div>
  `;
}
