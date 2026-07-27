/**
 * Nova Workspace — Dashboard Main Controller
 * Orchestrates layout hierarchy, 4 quick actions, AI panel tabs, keyboard shortcuts, and hotkeys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';

import { mockWorkspaceData } from './dashboard-data.js';
import { renderTopNav, renderLeftSidebar } from './components/navigation.js';
import { renderWelcomeHero } from './components/hero.js';
import { renderTodaysFocus } from './components/focus.js';
import { renderAIDailyBrief } from './components/ai-brief.js';
import { renderRecentProjects } from './components/projects.js';
import { renderUpcomingMeetings } from './components/meetings.js';
import { renderKnowledgeSection, renderActivitySection } from './components/knowledge-activity.js';
import { renderQuickActions, renderAnalyticsSection } from './components/quick-actions-analytics.js';
import { renderRightContextPanel } from './components/context-panel.js';
import { renderCommandPaletteModal, generateCommandItems } from './components/command-palette.js';
import { renderTaskModal, renderNotificationsDrawer } from './components/modals.js';

// Application State
const state = {
  data: mockWorkspaceData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  contextPanelCollapsed: false,
  activeNavId: 'dashboard',
  projectViewMode: 'grid', // 'grid' | 'list'
  activityFilter: 'all',  // 'all' | 'team' | 'ai' | 'projects'
  aiPanelTab: 'ai',        // 'ai' | 'team' | 'pinned'
  aiPanelPinned: true,
  showAIReasoning: false,
  isCommandPaletteOpen: false,
  isTaskModalOpen: false,
  isNotifDrawerOpen: false,
  commandQuery: '',
  commandCategory: 'all'
};

function initDashboard() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderDashboardApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderDashboardApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav(state.data);
  const sidebarHtml = renderLeftSidebar(state.activeNavId);
  const contextPanelHtml = renderRightContextPanel(state.data, state.aiPanelTab, state.aiPanelPinned);
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();
  const notificationsDrawerHtml = renderNotificationsDrawer(state.data.notifications);

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}

        <main class="main-content-scroll" role="main" id="main-content-region">
          <!-- Primary Level 1: Welcome Greeting -->
          ${renderWelcomeHero(state.data)}

          <!-- Primary Level 1 Grid: Today's Focus, AI Daily Brief, Upcoming Meetings -->
          <div class="dashboard-grid-12">
            <!-- Today's Focus (Primary 8 Cols) -->
            <div class="col-span-8">
              ${renderTodaysFocus(state.data.todayFocusTasks)}
            </div>

            <!-- AI Daily Brief (Primary 4 Cols) -->
            <div class="col-span-4">
              ${renderAIDailyBrief(state.data.aiBrief)}
            </div>

            <!-- Upcoming Meetings (Primary 12 Cols) -->
            <div class="col-span-12">
              ${renderUpcomingMeetings(state.data.upcomingMeetings)}
            </div>

            <!-- Secondary Level 2: Active Projects & Executive Analytics KPIs -->
            <div class="col-span-8">
              ${renderRecentProjects(state.data.projects, state.projectViewMode)}
            </div>

            <div class="col-span-4">
              ${renderAnalyticsSection(state.data.analytics)}
            </div>

            <!-- Tertiary Level 3: Knowledge Updates, Activity Feed, Quick Actions -->
            <div class="col-span-6">
              ${renderKnowledgeSection(state.data.knowledgeUpdates)}
            </div>

            <div class="col-span-6">
              ${renderActivitySection(state.data.activities, state.activityFilter)}
            </div>

            <div class="col-span-12">
              ${renderQuickActions()}
            </div>
          </div>
        </main>

        <!-- Right AI Sidebar Panel -->
        ${contextPanelHtml}
      </div>

      <!-- Modals & Overlays -->
      ${commandPaletteHtml}
      ${taskModalHtml}
      ${notificationsDrawerHtml}
    </div>
  `;

  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }
  if (state.contextPanelCollapsed) {
    document.getElementById('app-right-context-panel')?.classList.add('collapsed');
  }

  updateCommandPaletteItems();
}

function bindGlobalEvents() {
  // Sidebar Toggle
  document.getElementById('sidebar-toggle-trigger')?.addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    document.getElementById('app-left-sidebar')?.classList.toggle('collapsed', state.sidebarCollapsed);
  });

  // Context Panel Toggle & Pin
  document.getElementById('context-panel-toggle-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.contextPanelCollapsed = !state.contextPanelCollapsed;
    document.getElementById('app-right-context-panel')?.classList.toggle('collapsed', state.contextPanelCollapsed);
  });

  document.getElementById('ai-panel-close-btn')?.addEventListener('click', () => {
    state.contextPanelCollapsed = true;
    document.getElementById('app-right-context-panel')?.classList.add('collapsed');
  });

  document.getElementById('ai-panel-pin-btn')?.addEventListener('click', () => {
    state.aiPanelPinned = !state.aiPanelPinned;
    renderDashboardApp();
    bindGlobalEvents();
  });

  // AI Panel Tabs
  document.querySelectorAll('[data-ai-panel-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.aiPanelTab = tab.dataset.aiPanelTab;
      renderDashboardApp();
      bindGlobalEvents();
    });
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
      if (navId === 'projects')  window.location.href = 'projects.html';
      if (navId === 'tasks')     window.location.href = 'tasks.html';
      if (navId === 'documents') window.location.href = 'documents.html';
      if (navId === 'meetings')  window.location.href = 'meetings.html';
      if (navId === 'ai')        window.location.href = 'ai-workspace.html';
      if (navId === 'knowledge') window.location.href = 'knowledge.html';
      if (navId === 'analytics') window.location.href = 'analytics.html';
      if (navId === 'settings')  window.location.href = 'settings.html';
    });
  });

  // Command Palette Open Trigger
  document.getElementById('cmd-palette-trigger')?.addEventListener('click', openCommandPalette);

  // Quick Create & Quick Actions
  document.getElementById('quick-create-btn')?.addEventListener('click', openTaskModal);
  document.getElementById('add-focus-task-btn')?.addEventListener('click', openTaskModal);
  document.getElementById('close-task-modal-btn')?.addEventListener('click', closeTaskModal);

  document.querySelectorAll('[data-qa-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const qaId = btn.dataset.qaId;
      if (qaId === 'qa-task') openTaskModal();
      if (qaId === 'qa-proj') window.location.href = 'projects.html';
      if (qaId === 'qa-doc')  window.location.href = 'documents.html';
      if (qaId === 'qa-mtg')  window.location.href = 'meetings.html';
    });
  });

  // Task Checkbox Toggle
  document.getElementById('focus-tasks-container')?.addEventListener('click', (e) => {
    const checkBtn = e.target.closest('[data-action="toggle-complete"]');
    if (checkBtn) {
      const taskId = checkBtn.dataset.taskId;
      const task = state.data.todayFocusTasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        renderDashboardApp();
        bindGlobalEvents();
        showToastNotification(task.completed ? 'Task Completed! 🎉' : 'Task Reopened', `"${task.title}"`);
      }
    }
  });

  // Project Grid/List Toggle
  document.getElementById('project-grid-toggle')?.addEventListener('click', () => {
    state.projectViewMode = 'grid';
    renderDashboardApp();
    bindGlobalEvents();
  });
  document.getElementById('project-list-toggle')?.addEventListener('click', () => {
    state.projectViewMode = 'list';
    renderDashboardApp();
    bindGlobalEvents();
  });

  // Activity Feed Filter Tabs
  document.querySelectorAll('[data-act-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activityFilter = btn.dataset.actFilter;
      renderDashboardApp();
      bindGlobalEvents();
    });
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      state.sidebarCollapsed = !state.sidebarCollapsed;
      document.getElementById('app-left-sidebar')?.classList.toggle('collapsed', state.sidebarCollapsed);
    }
    if (e.key.toLowerCase() === 'c') { openTaskModal(); }
    if (e.key.toLowerCase() === 'p') { window.location.href = 'projects.html'; }
    if (e.key.toLowerCase() === 'd') { window.location.href = 'documents.html'; }
    if (e.key.toLowerCase() === 'm') { window.location.href = 'meetings.html'; }

    if (e.key === 'Escape') {
      closeCommandPalette();
      closeTaskModal();
      state.isNotifDrawerOpen = false;
      document.getElementById('notifications-drawer-backdrop')?.classList.remove('active');
    }
  });
}

function openCommandPalette() {
  state.isCommandPaletteOpen = true;
  const backdrop = document.getElementById('cmd-palette-backdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    const input = document.getElementById('cmd-search-input');
    if (input) { input.value = ''; input.focus(); }
  }
}

function closeCommandPalette() {
  state.isCommandPaletteOpen = false;
  document.getElementById('cmd-palette-backdrop')?.classList.remove('active');
}

function openTaskModal() {
  state.isTaskModalOpen = true;
  document.getElementById('create-task-modal')?.classList.add('active');
  document.getElementById('task-title-in')?.focus();
}

function closeTaskModal() {
  state.isTaskModalOpen = false;
  document.getElementById('create-task-modal')?.classList.remove('active');
}

function updateCommandPaletteItems() {
  const container = document.getElementById('cmd-results-container');
  if (container) {
    container.innerHTML = generateCommandItems(state.commandQuery, state.commandCategory, state.data);
  }
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

// Boot Dashboard
initDashboard();
