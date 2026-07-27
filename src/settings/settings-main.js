/**
 * Nova Workspace — Admin & Settings Module Main Controller
 * Enterprise security, user directory, RBAC permission matrix, AI governance, audit logs, and API keys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/projects.css';
import '../styles/settings.css';

import { mockSettingsData } from './settings-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderAdminHero } from './components/admin-hero.js';
import { renderViewUsers } from './components/view-users.js';
import { renderViewRBAC, renderViewSecurity } from './components/view-rbac.js';
import { renderViewAIGovernance, renderViewAuditLogs } from './components/view-ai-governance.js';
import { renderViewIntegrationsBilling } from './components/view-integrations-billing.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

// Settings State Engine
const state = {
  data: mockSettingsData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeViewTab: 'users' // 'users' | 'rbac' | 'security' | 'ai-gov' | 'audit-logs' | 'integrations-billing'
};

function initSettingsModule() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderSettingsApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderSettingsApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: { name: 'Alex Johnson', avatar: 'AJ' },
    workspace: { name: 'Acme Corp', icon: '🏢', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('settings');
  const heroHtml = renderAdminHero(state.data, state.activeViewTab);
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();

  let viewContentHtml = '';
  switch (state.activeViewTab) {
    case 'users':                viewContentHtml = renderViewUsers(state.data); break;
    case 'rbac':                 viewContentHtml = renderViewRBAC(state.data.rbacMatrix); break;
    case 'security':             viewContentHtml = renderViewSecurity(state.data.metrics); break;
    case 'ai-gov':               viewContentHtml = renderViewAIGovernance(state.data.aiGovernance); break;
    case 'audit-logs':           viewContentHtml = renderViewAuditLogs(state.data.auditLogs); break;
    case 'integrations-billing': viewContentHtml = renderViewIntegrationsBilling(state.data); break;
    default:                     viewContentHtml = renderViewUsers(state.data); break;
  }

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}

        <main class="main-content-scroll" role="main">
          ${heroHtml}
          <div style="margin-top:var(--s-6)">
            ${viewContentHtml}
          </div>
        </main>
      </div>

      <!-- Modals -->
      ${commandPaletteHtml}
      ${taskModalHtml}
    </div>
  `;

  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }

  bindViewEvents();
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
      if (navId === 'documents') window.location.href = 'documents.html';
      if (navId === 'meetings')  window.location.href = 'meetings.html';
      if (navId === 'ai')        window.location.href = 'ai-workspace.html';
      if (navId === 'knowledge') window.location.href = 'knowledge.html';
      if (navId === 'analytics') window.location.href = 'analytics.html';
    });
  });

  // View Switcher Tabs
  document.querySelectorAll('[data-adm-view-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeViewTab = tab.dataset.admViewTab;
      renderSettingsApp();
      bindGlobalEvents();
    });
  });

  // Admin CTAs
  document.getElementById('admin-invite-user-btn')?.addEventListener('click', () => {
    showToastNotification('Invitation Sent 📩', 'Invite email sent to new organization member.');
  });
  document.getElementById('admin-api-keys-btn')?.addEventListener('click', () => {
    state.activeViewTab = 'integrations-billing';
    renderSettingsApp();
    bindGlobalEvents();
  });
}

function bindViewEvents() {
  // Rotate API Key
  document.querySelectorAll('[data-action="rotate-key"]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToastNotification('API Key Rotated 🔑', 'New secret key generated. Old key expires in 24h.');
    });
  });

  // Revoke Key
  document.querySelectorAll('[data-action="revoke-key"]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToastNotification('API Key Revoked 🛑', 'Secret key access revoked immediately.');
    });
  });

  // Generate New Key
  document.getElementById('generate-new-api-key-btn')?.addEventListener('click', () => {
    state.data.apiKeys.unshift({
      id: `key-${Date.now()}`,
      name: 'New Custom Integration Key',
      prefix: 'nova_live_sec_8831...',
      created: 'Just now',
      lastUsed: 'Never'
    });
    renderSettingsApp();
    bindGlobalEvents();
    showToastNotification('API Key Generated 🔑', 'Secret key ready for integration.');
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '1' && e.key <= '6') {
      const views = ['users', 'rbac', 'security', 'ai-gov', 'audit-logs', 'integrations-billing'];
      state.activeViewTab = views[parseInt(e.key) - 1];
      renderSettingsApp();
      bindGlobalEvents();
    }
  });
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

// Boot Admin & Settings Module
initSettingsModule();
