/**
 * Nova Workspace — Dashboard Main Controller
 * Orchestrates layout, state, keyboard shortcuts, interactive components, and real-time updates.
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
  activityFilter: 'all',  // 'all' | 'team' | 'ai'
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
  const contextPanelHtml = renderRightContextPanel(state.data);
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();
  const notificationsDrawerHtml = renderNotificationsDrawer(state.data.notifications);

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}

        <main class="main-content-scroll" role="main" id="main-content-region">
          <!-- Section 1: Welcome Hero -->
          ${renderWelcomeHero(state.data)}

          <!-- 12-Column Grid Layout -->
          <div class="dashboard-grid-12">
            <!-- Section 2: Today's Focus (Left 8 Cols) -->
            <div class="col-span-8">
              ${renderTodaysFocus(state.data.todayFocusTasks)}
            </div>

            <!-- Section 3: AI Daily Brief (Right 4 Cols) -->
            <div class="col-span-4">
              ${renderAIDailyBrief(state.data.aiBrief)}
            </div>

            <!-- Section 4: Recent Projects (Left 8 Cols) -->
            <div class="col-span-8">
              ${renderRecentProjects(state.data.projects, state.projectViewMode)}
            </div>

            <!-- Section 5: Upcoming Meetings (Right 4 Cols) -->
            <div class="col-span-4">
              ${renderUpcomingMeetings(state.data.upcomingMeetings)}
            </div>

            <!-- Section 6: Knowledge Updates (Left 6 Cols) -->
            <div class="col-span-6">
              ${renderKnowledgeSection(state.data.knowledgeUpdates)}
            </div>

            <!-- Section 7: Activity Feed (Right 6 Cols) -->
            <div class="col-span-6">
              ${renderActivitySection(state.data.activities, state.activityFilter)}
            </div>

            <!-- Section 8: Quick Actions (Left 6 Cols) -->
            <div class="col-span-6">
              ${renderQuickActions(state.data.quickActions)}
            </div>

            <!-- Section 9: Workspace Analytics (Right 6 Cols) -->
            <div class="col-span-6">
              ${renderAnalyticsSection(state.data.analytics)}
            </div>
          </div>
        </main>

        <!-- Section 10: Right Context Panel -->
        ${contextPanelHtml}
      </div>

      <!-- Modals & Overlays -->
      ${commandPaletteHtml}
      ${taskModalHtml}
      ${notificationsDrawerHtml}
    </div>
  `;

  // Re-apply toggle states
  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }
  if (state.contextPanelCollapsed) {
    document.getElementById('app-right-context-panel')?.classList.add('collapsed');
  }

  // Populate command palette items
  updateCommandPaletteItems();
}

function bindGlobalEvents() {
  // Sidebar Toggle
  document.getElementById('sidebar-toggle-trigger')?.addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    document.getElementById('app-left-sidebar')?.classList.toggle('collapsed', state.sidebarCollapsed);
  });

  // Context Panel Toggle
  document.getElementById('context-panel-toggle-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.contextPanelCollapsed = !state.contextPanelCollapsed;
    document.getElementById('app-right-context-panel')?.classList.toggle('collapsed', state.contextPanelCollapsed);
  });

  // Theme Toggle
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('nova-theme', state.theme);
    document.documentElement.setAttribute('data-theme', state.theme);
  });

  // Command Palette Open Trigger
  document.getElementById('cmd-palette-trigger')?.addEventListener('click', openCommandPalette);

  // Quick Create Button & Tasks
  document.getElementById('quick-create-btn')?.addEventListener('click', openTaskModal);
  document.getElementById('add-focus-task-btn')?.addEventListener('click', openTaskModal);
  document.getElementById('close-task-modal-btn')?.addEventListener('click', closeTaskModal);
  document.getElementById('cancel-task-modal-btn')?.addEventListener('click', closeTaskModal);

  document.getElementById('modal-create-task-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title-in').value.trim();
    const proj = document.getElementById('task-proj-in').value;
    const prio = document.getElementById('task-priority-in').value;

    if (!title) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      project: proj,
      projectColor: '#6e4aff',
      priority: prio,
      priorityLevel: prio.toLowerCase(),
      dueDate: 'Today',
      progress: 0,
      dependencies: [],
      completed: false,
      assignee: { name: 'Alex Johnson', avatar: 'AJ' },
      aiTip: 'Newly created task added to your focus queue.'
    };

    state.data.todayFocusTasks.unshift(newTask);
    closeTaskModal();
    renderDashboardApp();
    bindGlobalEvents();
    showToastNotification('Task Created', `"${title}" has been added to Today's Focus.`);
  });

  // Notifications Drawer
  document.getElementById('notifications-trigger')?.addEventListener('click', () => {
    state.isNotifDrawerOpen = true;
    document.getElementById('notifications-drawer-backdrop')?.classList.add('active');
  });
  document.getElementById('close-notif-drawer-btn')?.addEventListener('click', () => {
    state.isNotifDrawerOpen = false;
    document.getElementById('notifications-drawer-backdrop')?.classList.remove('active');
  });

  // Task Checkbox Toggle Handlers
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

  // Project Grid/List View Toggle
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

  // AI Reasoning Toggle
  document.getElementById('toggle-ai-reasoning-btn')?.addEventListener('click', () => {
    state.showAIReasoning = !state.showAIReasoning;
    const drawer = document.getElementById('ai-reasoning-drawer');
    if (drawer) drawer.style.display = state.showAIReasoning ? 'block' : 'none';
  });

  // Copilot Input
  const copilotIn = document.getElementById('copilot-input-field');
  const copilotSend = document.getElementById('copilot-send-btn');
  const handleCopilotAsk = () => {
    const prompt = copilotIn.value.trim();
    if (!prompt) return;
    const historyBox = document.getElementById('ai-chat-history');
    if (historyBox) {
      historyBox.innerHTML += `
        <div style="background:var(--v-600);color:white;padding:8px 10px;border-radius:8px;align-self:flex-end;margin-left:20px">
          ${prompt}
        </div>
        <div style="background:var(--bg-surface);padding:8px 10px;border-radius:8px;border:1px solid var(--border-1);color:var(--text-1);margin-right:20px">
          ✨ Analyzing your query for "${prompt.slice(0, 30)}..."
        </div>
      `;
      historyBox.scrollTop = historyBox.scrollHeight;
    }
    copilotIn.value = '';
  };
  copilotSend?.addEventListener('click', handleCopilotAsk);
  copilotIn?.addEventListener('keydown', e => { if (e.key === 'Enter') handleCopilotAsk(); });

  // Command Palette Backdrop Click
  document.getElementById('cmd-palette-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'cmd-palette-backdrop') closeCommandPalette();
  });

  // Command Palette Input & Tabs
  document.getElementById('cmd-search-input')?.addEventListener('input', (e) => {
    state.commandQuery = e.target.value;
    updateCommandPaletteItems();
  });

  document.getElementById('cmd-filter-tabs')?.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-cmd-category]');
    if (tab) {
      document.querySelectorAll('[data-cmd-category]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.commandCategory = tab.dataset.cmdCategory;
      updateCommandPaletteItems();
    }
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K -> Command Palette
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    }
    // ⌘B or Ctrl+B -> Toggle Sidebar
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      state.sidebarCollapsed = !state.sidebarCollapsed;
      document.getElementById('app-left-sidebar')?.classList.toggle('collapsed', state.sidebarCollapsed);
    }
    // Escape -> Close Modals
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
  const toastZone = document.getElementById('nova-toasts') || createToastZone();
  const toastEl = document.createElement('div');
  toastEl.className = 'toast success';
  toastEl.innerHTML = `
    <svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  toastZone.appendChild(toastEl);
  setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(20px)';
    setTimeout(() => toastEl.remove(), 250);
  }, 3500);
}

function createToastZone() {
  const zone = document.createElement('div');
  zone.id = 'nova-toasts';
  document.body.appendChild(zone);
  return zone;
}

// Boot Dashboard
initDashboard();
