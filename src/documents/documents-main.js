/**
 * Nova Workspace — Documents Module Main Controller
 * Block editor, AI writing co-pilot, template gallery, knowledge graph, and hotkeys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/documents.css';

import { mockDocumentsData } from './documents-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderDocumentsHome } from './components/documents-home.js';
import { renderEditorHeader } from './components/editor-header.js';
import { renderBlockEditor, renderSlashMenuModal } from './components/block-editor.js';
import { renderDocRightSidebar } from './components/ai-writing-assistant.js';
import { renderTemplateGalleryModal } from './components/template-gallery-modal.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

// Documents State Engine
const state = {
  data: mockDocumentsData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeScreen: 'home', // 'home' | 'editor'
  currentDocId: 'doc-101',
  homeViewMode: 'grid',
  isTemplateGalleryOpen: false,
  slashMenuOpen: false
};

function initDocumentsModule() {
  document.documentElement.setAttribute('data-theme', state.theme);

  // Check URL params for document deep link
  const params = new URLSearchParams(window.location.search);
  const docParam = params.get('id');
  if (docParam) {
    state.activeScreen = 'editor';
    state.currentDocId = docParam;
  }

  renderDocumentsApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderDocumentsApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('documents');
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();
  const templateModalHtml = renderTemplateGalleryModal(state.data.templates);
  const slashMenuHtml = renderSlashMenuModal();

  let mainBodyHtml = '';

  if (state.activeScreen === 'home') {
    mainBodyHtml = `
      <main class="main-content-scroll" role="main">
        ${renderDocumentsHome(state.data, state.homeViewMode)}
      </main>
    `;
  } else {
    const activeDoc = state.data.documents.find(d => d.id === state.currentDocId) || state.data.documents[0];
    const editorHeaderHtml = renderEditorHeader(activeDoc);
    const blockEditorHtml = renderBlockEditor(activeDoc);
    const docRightSidebarHtml = renderDocRightSidebar(activeDoc);

    mainBodyHtml = `
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        ${editorHeaderHtml}
        <div style="flex:1;display:flex;overflow:hidden">
          ${blockEditorHtml}
          ${docRightSidebarHtml}
        </div>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}
        ${mainBodyHtml}
      </div>

      <!-- Modals & Menus -->
      ${commandPaletteHtml}
      ${taskModalHtml}
      ${templateModalHtml}
      ${slashMenuHtml}
    </div>
  `;

  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }

  if (state.isTemplateGalleryOpen) {
    document.getElementById('template-gallery-backdrop')?.classList.add('active');
  }

  bindEditorEvents();
}

function bindGlobalEvents() {
  // Sidebar Toggle
  document.getElementById('sidebar-toggle-trigger')?.addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    document.getElementById('app-left-sidebar')?.classList.toggle('collapsed', state.sidebarCollapsed);
  });

  // Theme Toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('nova-theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  });

  // Sidebar Routing Links
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const navId = item.dataset.navId;
      if (navId === 'dashboard') window.location.href = 'dashboard.html';
      if (navId === 'projects')  window.location.href = 'projects.html';
      if (navId === 'tasks')     window.location.href = 'tasks.html';
    });
  });

  // Home CTAs & Wizard Triggers
  document.getElementById('create-blank-doc-btn')?.addEventListener('click', createBlankDoc);
  document.getElementById('open-template-gallery-btn')?.addEventListener('click', openTemplateGallery);
  document.getElementById('close-template-gallery-btn')?.addEventListener('click', closeTemplateGallery);

  // Template Selection
  document.querySelectorAll('[data-action="use-template"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tplId = btn.dataset.templateId;
      const tpl = state.data.templates.find(t => t.id === tplId);
      closeTemplateGallery();
      createBlankDoc(tpl ? tpl.title : 'New Document');
    });
  });

  // Open Document Cards
  document.querySelectorAll('[data-open-doc-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const docId = card.dataset.openDocId;
      state.activeScreen = 'editor';
      state.currentDocId = docId;
      renderDocumentsApp();
      bindGlobalEvents();
    });
  });

  // Grid/List Toggle
  document.getElementById('doc-grid-toggle')?.addEventListener('click', () => {
    state.homeViewMode = 'grid'; renderDocumentsApp(); bindGlobalEvents();
  });
  document.getElementById('doc-list-toggle')?.addEventListener('click', () => {
    state.homeViewMode = 'list'; renderDocumentsApp(); bindGlobalEvents();
  });
}

function bindEditorEvents() {
  // Back to Docs Home
  document.getElementById('back-to-docs-home-btn')?.addEventListener('click', () => {
    state.activeScreen = 'home';
    renderDocumentsApp();
    bindGlobalEvents();
  });

  // AI Co-pilot Assistant Actions
  document.getElementById('ai-btn-summarize-doc')?.addEventListener('click', () => {
    showToastNotification('Executive Summary Generated ✨', 'Added summary callout to document header.');
  });

  document.getElementById('ai-btn-extract-tasks')?.addEventListener('click', () => {
    showToastNotification('3 Action Tasks Extracted ✨', 'Created linked tasks in Tasks module.');
  });

  document.getElementById('ai-btn-fix-grammar')?.addEventListener('click', () => {
    showToastNotification('Tone & Grammar Improved ✨', 'All blocks updated and verified.');
  });

  // Publish CTA
  document.getElementById('doc-publish-btn')?.addEventListener('click', () => {
    const doc = state.data.documents.find(d => d.id === state.currentDocId);
    if (doc) {
      doc.status = 'Published';
      doc.statusColor = '#22c55e';
      renderDocumentsApp();
      bindGlobalEvents();
      showToastNotification('Document Published! 🚀', `"${doc.title}" is now live in Workspace.`);
    }
  });

  // Slash Command Input Keydown Event
  document.getElementById('editor-blocks-container')?.addEventListener('keyup', (e) => {
    if (e.key === '/') {
      const menu = document.getElementById('slash-menu-dropdown');
      if (menu) {
        menu.style.display = 'flex';
        menu.style.top = '220px';
        menu.style.left = '320px';
      }
    }
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTemplateGallery();
      const menu = document.getElementById('slash-menu-dropdown');
      if (menu) menu.style.display = 'none';
    }
  });
}

function createBlankDoc(customTitle = 'Untitled Document') {
  const newDoc = {
    id: `doc-${Date.now()}`,
    title: customTitle,
    icon: '📝',
    cover: 'linear-gradient(135deg, #6e4aff 0%, #06b6d4 100%)',
    category: 'Product Specs',
    status: 'Draft',
    statusColor: '#6b7280',
    author: { name: 'Alex Johnson', avatar: 'AJ' },
    collaborators: [{ name: 'Alex Johnson', avatar: 'AJ' }],
    readingTime: '1 min read',
    updatedAt: 'Just now',
    version: 'v1.0',
    isFavorite: false,
    linkedProjects: ['Nova UI System'],
    linkedTasks: [],
    linkedMeetings: [],
    aiQualityScore: 95,
    blocks: [
      { type: 'paragraph', text: 'Start writing or type "/" for AI commands & blocks...' }
    ],
    comments: []
  };

  state.data.documents.unshift(newDoc);
  state.data.metrics.totalDocs++;
  state.data.metrics.drafts++;
  state.activeScreen = 'editor';
  state.currentDocId = newDoc.id;
  renderDocumentsApp();
  bindGlobalEvents();
  showToastNotification('New Document Created', 'Ready for writing and AI co-piloting.');
}

function openTemplateGallery() {
  state.isTemplateGalleryOpen = true;
  document.getElementById('template-gallery-backdrop')?.classList.add('active');
}

function closeTemplateGallery() {
  state.isTemplateGalleryOpen = false;
  document.getElementById('template-gallery-backdrop')?.classList.remove('active');
}

function showToastNotification(title, message) {
  let zone = document.getElementById('nova-toasts');
  if (!zone) {
    zone = document.createElement('div');
    zone.id = 'nova-toasts';
    document.body.appendChild(zone);
  }
  const toastEl = document.createElement('div');
  toastEl.className = 'toast success';
  toastEl.innerHTML = `
    <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  zone.appendChild(toastEl);
  setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(20px)';
    setTimeout(() => toastEl.remove(), 250);
  }, 3500);
}

// Boot Documents Module
initDocumentsModule();
