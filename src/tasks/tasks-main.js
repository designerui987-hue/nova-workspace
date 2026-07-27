/**
 * Nova Workspace — Tasks Module Main Controller
 * Fast 7-view switcher (<200ms), Pomodoro Deep Work Focus Mode, split drawer, and hotkeys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/tasks.css';

import { mockTasksData } from './tasks-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderTasksHero } from './components/tasks-hero.js';
import { renderViewMyWork } from './components/view-my-work.js';
import { renderViewList } from './components/view-list.js';
import { renderViewBoard } from './components/view-board.js';
import { renderViewTable } from './components/view-table.js';
import { renderViewCalendar, renderViewMatrix } from './components/view-calendar.js';
import { renderViewFocusMode } from './components/view-focus-mode.js';
import { renderTaskDetailDrawer } from './components/task-detail-drawer.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal, renderNotificationsDrawer } from '../dashboard/components/modals.js';

// Tasks Module State
const state = {
  data: mockTasksData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeViewTab: 'my-work', // 'my-work' | 'list' | 'board' | 'table' | 'calendar' | 'matrix' | 'focus-mode'
  selectedTaskId: null,
  isDrawerOpen: false,
  timerInterval: null
};

function initTasksModule() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderTasksApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderTasksApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('tasks');
  const heroHtml = renderTasksHero(state.data, state.activeViewTab);

  let viewContentHtml = '';
  switch (state.activeViewTab) {
    case 'my-work':    viewContentHtml = renderViewMyWork(state.data); break;
    case 'list':       viewContentHtml = renderViewList(state.data.tasks); break;
    case 'board':      viewContentHtml = renderViewBoard(state.data.tasks); break;
    case 'table':      viewContentHtml = renderViewTable(state.data.tasks); break;
    case 'calendar':   viewContentHtml = renderViewCalendar(state.data.tasks); break;
    case 'matrix':     viewContentHtml = renderViewMatrix(state.data.tasks); break;
    case 'focus-mode':
      const activeTask = state.data.tasks.find(t => t.id === state.data.focusModeSession.activeTaskId) || state.data.tasks[0];
      viewContentHtml = renderViewFocusMode(state.data.focusModeSession, activeTask);
      break;
    default:           viewContentHtml = renderViewMyWork(state.data); break;
  }

  const activeTaskObj = state.data.tasks.find(t => t.id === state.selectedTaskId);
  const drawerHtml = renderTaskDetailDrawer(activeTaskObj);
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();

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

      <!-- Modals & Drawers -->
      ${drawerHtml}
      ${commandPaletteHtml}
      ${taskModalHtml}
    </div>
  `;

  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }

  if (state.isDrawerOpen && activeTaskObj) {
    document.getElementById('task-detail-drawer-backdrop')?.classList.add('active');
  }

  bindViewSpecificEvents();
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

  // Sidebar Nav Links
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const navId = item.dataset.navId;
      if (navId === 'dashboard') window.location.href = 'dashboard.html';
      if (navId === 'projects')  window.location.href = 'projects.html';
    });
  });

  // View Switcher Tabs
  document.querySelectorAll('[data-task-view-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeViewTab = tab.dataset.taskViewTab;
      renderTasksApp();
      bindGlobalEvents();
    });
  });

  // Create Task Triggers
  document.getElementById('create-task-main-btn')?.addEventListener('click', openTaskModal);

  // Quick Focus Mode CTA
  document.getElementById('quick-focus-mode-btn')?.addEventListener('click', () => {
    state.activeViewTab = 'focus-mode';
    renderTasksApp();
    bindGlobalEvents();
  });
}

function bindViewSpecificEvents() {
  // Checkbox Toggle Completion
  document.querySelectorAll('[data-action="toggle-task-done"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const taskId = btn.dataset.taskId;
      const task = state.data.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = task.status === 'done' ? 'todo' : 'done';
        if (task.status === 'done') state.data.metrics.completedToday++;
        renderTasksApp();
        bindGlobalEvents();
        showToastNotification(task.status === 'done' ? 'Task Completed! 🎉' : 'Task Reopened', `"${task.title}"`);
      }
    });
  });

  // Open Detail Drawer
  document.querySelectorAll('[data-action="open-detail"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.selectedTaskId = btn.dataset.taskId;
      state.isDrawerOpen = true;
      renderTasksApp();
      bindGlobalEvents();
    });
  });

  // Close Drawer
  document.getElementById('close-task-detail-drawer-btn')?.addEventListener('click', closeDrawer);
  document.getElementById('task-detail-drawer-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'task-detail-drawer-backdrop') closeDrawer();
  });

  // Focus Timer Toggle
  document.getElementById('toggle-focus-timer-btn')?.addEventListener('click', togglePomodoroTimer);
  document.getElementById('start-widget-pomodoro-btn')?.addEventListener('click', () => {
    state.activeViewTab = 'focus-mode';
    togglePomodoroTimer();
  });
}

function togglePomodoroTimer() {
  const session = state.data.focusModeSession;
  session.isRunning = !session.isRunning;

  if (session.isRunning) {
    state.timerInterval = setInterval(() => {
      if (session.secondsRemaining > 0) {
        session.secondsRemaining--;
        const clock = document.getElementById('focus-timer-digital-clock');
        if (clock) {
          const m = Math.floor(session.secondsRemaining / 60);
          const s = session.secondsRemaining % 60;
          clock.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
      } else {
        clearInterval(state.timerInterval);
        session.isRunning = false;
        session.completedSessionsToday++;
        session.secondsRemaining = 1500;
        showToastNotification('Pomodoro Session Complete! 👏', 'Take a 5-minute break.');
        renderTasksApp();
        bindGlobalEvents();
      }
    }, 1000);
  } else {
    clearInterval(state.timerInterval);
  }

  const toggleBtn = document.getElementById('toggle-focus-timer-btn');
  if (toggleBtn) {
    toggleBtn.innerHTML = `<span>${session.isRunning ? '⏸ Pause Focus' : '▶ Start Focus Session'}</span>`;
  }
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeTaskModal();
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key >= '1' && e.key <= '7') {
      const views = ['my-work', 'list', 'board', 'table', 'calendar', 'matrix', 'focus-mode'];
      state.activeViewTab = views[parseInt(e.key) - 1];
      renderTasksApp();
      bindGlobalEvents();
    }
  });
}

function closeDrawer() {
  state.isDrawerOpen = false;
  document.getElementById('task-detail-drawer-backdrop')?.classList.remove('active');
}

function openTaskModal() {
  document.getElementById('create-task-modal')?.classList.add('active');
}
function closeTaskModal() {
  document.getElementById('create-task-modal')?.classList.remove('active');
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

// Boot Tasks Module
initTasksModule();
