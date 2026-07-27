/**
 * Nova Workspace — Knowledge Hub Replicated Main Controller
 * Assembles the exact UI shown in the user screenshot.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/projects.css';
import '../styles/knowledge.css';

import { mockKnowledgeData } from './knowledge-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderHeaderAndMetrics } from './components/header-and-metrics.js';
import { renderLeftSidebarWidget } from './components/left-sidebar-widget.js';
import { renderMiddleDashboardView } from './components/middle-dashboard-view.js';
import { renderAIKnowledgeAssistantPanel } from './components/ai-knowledge-assistant-panel.js';
import { renderCreateArticleWizardModal } from './components/create-article-wizard.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

const state = {
  data: mockKnowledgeData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  wizardStep: 1,
  isWizardOpen: false
};

function initKnowledgeModule() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderKnowledgeApp();
  bindGlobalEvents();
}

function renderKnowledgeApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Acme Corp', icon: '🏢', plan: 'Enterprise' },
    notifications: [1, 2, 3]
  });

  const sidebarHtml = renderLeftSidebar('knowledge');
  const sidebarWidgetHtml = renderLeftSidebarWidget(state.data);
  const headerMetricsHtml = renderHeaderAndMetrics(state.data);
  const middleDashboardHtml = renderMiddleDashboardView(state.data);
  const farRightPanelHtml = renderAIKnowledgeAssistantPanel(state.data.aiAssistant);

  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();
  const wizardModalHtml = renderCreateArticleWizardModal(state.wizardStep, {});

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        <div style="display:flex;flex-direction:column">
          ${sidebarHtml}
          <div style="padding:0 12px">
            ${sidebarWidgetHtml}
          </div>
        </div>

        <main class="kn-app-layout">
          <div style="grid-column: 1 / span 2; padding: 20px 24px; overflow-y: auto; height: calc(100dvh - 60px)">
            ${headerMetricsHtml}
            ${middleDashboardHtml}
          </div>
          ${farRightPanelHtml}
        </main>
      </div>

      <!-- Modals -->
      ${commandPaletteHtml}
      ${taskModalHtml}
      ${wizardModalHtml}
    </div>
  `;

  if (state.isWizardOpen) {
    document.getElementById('article-wizard-backdrop')?.classList.add('active');
  }
}

function bindGlobalEvents() {
  // Sidebar Routing Links
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const navId = item.dataset.navId;
      if (navId === 'dashboard') window.location.href = 'dashboard.html';
      if (navId === 'projects')  window.location.href = 'projects.html';
      if (navId === 'tasks')     window.location.href = 'tasks.html';
      if (navId === 'documents') window.location.href = 'documents.html';
      if (navId === 'meetings')  window.location.href = 'meetings.html';
      if (navId === 'ai')        window.location.href = 'ai-workspace.html';
    });
  });

  // Action Cards Triggers
  document.getElementById('action-card-act-create')?.addEventListener('click', openWizard);
  document.getElementById('close-article-wizard-btn')?.addEventListener('click', closeWizard);

  document.getElementById('art-wizard-next-btn')?.addEventListener('click', () => {
    if (state.wizardStep < 5) {
      state.wizardStep++; renderKnowledgeApp(); bindGlobalEvents();
    } else {
      closeWizard();
      renderKnowledgeApp();
      bindGlobalEvents();
      showToastNotification('Article Published! 📚', 'New article added to Knowledge Hub.');
    }
  });

  document.getElementById('art-wizard-prev-btn')?.addEventListener('click', () => {
    if (state.wizardStep > 1) {
      state.wizardStep--; renderKnowledgeApp(); bindGlobalEvents();
    }
  });
}

function openWizard() {
  state.isWizardOpen = true;
  state.wizardStep = 1;
  document.getElementById('article-wizard-backdrop')?.classList.add('active');
}

function closeWizard() {
  state.isWizardOpen = false;
  document.getElementById('article-wizard-backdrop')?.classList.remove('active');
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

// Boot Knowledge Module
initKnowledgeModule();
