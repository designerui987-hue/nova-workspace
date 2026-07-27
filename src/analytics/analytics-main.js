/**
 * Nova Workspace — Analytics Module Main Controller
 * Executive Command Center, OKR tracking, risk forecasts, report builder, and hotkeys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/projects.css';
import '../styles/analytics.css';

import { mockAnalyticsData } from './analytics-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderAnalyticsHero } from './components/analytics-hero.js';
import { renderViewCommandCenter } from './components/view-command-center.js';
import { renderViewTeamOKRs, renderViewRiskForecasting } from './components/view-team-okrs.js';
import { renderViewReports } from './components/view-reports.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

// Analytics State Engine
const state = {
  data: mockAnalyticsData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeViewTab: 'command-center' // 'command-center' | 'team-okrs' | 'risk-forecasting' | 'reports'
};

function initAnalyticsModule() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderAnalyticsApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderAnalyticsApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('analytics');
  const heroHtml = renderAnalyticsHero(state.data, state.activeViewTab);
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();

  let viewContentHtml = '';
  switch (state.activeViewTab) {
    case 'command-center':    viewContentHtml = renderViewCommandCenter(state.data); break;
    case 'team-okrs':         viewContentHtml = renderViewTeamOKRs(state.data); break;
    case 'risk-forecasting':  viewContentHtml = renderViewRiskForecasting(state.data); break;
    case 'reports':           viewContentHtml = renderViewReports(state.data.reportTemplates); break;
    default:                  viewContentHtml = renderViewCommandCenter(state.data); break;
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
    });
  });

  // View Switcher Tabs
  document.querySelectorAll('[data-an-view-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeViewTab = tab.dataset.anViewTab;
      renderAnalyticsApp();
      bindGlobalEvents();
    });
  });

  // Export CTAs
  document.getElementById('analytics-generate-report-btn')?.addEventListener('click', () => {
    state.activeViewTab = 'reports';
    renderAnalyticsApp();
    bindGlobalEvents();
  });

  document.getElementById('export-analytics-btn')?.addEventListener('click', () => {
    showToastNotification('Analytics Exported 📊', 'Downloaded Executive_Analytics_Q3.csv');
  });
}

function bindViewEvents() {
  // Export PDF CTA
  document.querySelectorAll('[data-action="export-pdf"]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToastNotification('PDF Generated 📄', 'Report downloaded to local storage.');
    });
  });

  // Schedule Email CTA
  document.querySelectorAll('[data-action="schedule-email"]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToastNotification('Email Scheduled ✉️', 'Executive summary will be sent every Friday at 4:00 PM.');
    });
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '1' && e.key <= '4') {
      const views = ['command-center', 'team-okrs', 'risk-forecasting', 'reports'];
      state.activeViewTab = views[parseInt(e.key) - 1];
      renderAnalyticsApp();
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

// Boot Analytics Module
initAnalyticsModule();
