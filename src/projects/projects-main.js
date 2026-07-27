/**
 * Nova Workspace — Projects Module Main Controller
 * Fast view switching (<200ms), 6 project views, 5-step wizard, drag & drop kanban, inline table editing.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/projects.css';

import { mockProjectsData } from './projects-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderProjectsHome } from './components/projects-home.js';
import { renderProjectHeader } from './components/project-header.js';
import { renderViewOverview } from './components/view-overview.js';
import { renderViewKanban } from './components/view-kanban.js';
import { renderViewTable } from './components/view-table.js';
import { renderViewTimeline } from './components/view-timeline.js';
import { renderViewCalendar } from './components/view-calendar.js';
import { renderViewAIManager } from './components/view-ai-manager.js';
import { renderCreateProjectWizardModal } from './components/create-project-wizard.js';
import { renderCommandPaletteModal, generateCommandItems } from '../dashboard/components/command-palette.js';
import { renderTaskModal, renderNotificationsDrawer } from '../dashboard/components/modals.js';

// Projects State Engine
const state = {
  data: mockProjectsData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeScreen: 'home', // 'home' | 'detail'
  currentProjectId: 'proj-1',
  activeDetailTab: 'overview', // 'overview' | 'kanban' | 'table' | 'timeline' | 'calendar' | 'ai-manager'
  homeViewMode: 'grid', // 'grid' | 'list'
  wizardStep: 1,
  isWizardOpen: false,
  wizardFormData: {},
  ganttZoom: 'month'
};

function initProjectsModule() {
  document.documentElement.setAttribute('data-theme', state.theme);

  // Check URL params for project deep link
  const params = new URLSearchParams(window.location.search);
  const projParam = params.get('id');
  if (projParam) {
    state.activeScreen = 'detail';
    state.currentProjectId = projParam;
  }

  renderProjectsApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderProjectsApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('projects');
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();

  let mainBodyHtml = '';

  if (state.activeScreen === 'home') {
    mainBodyHtml = renderProjectsHome(state.data, state.homeViewMode);
  } else {
    const activeProject = state.data.projects.find(p => p.id === state.currentProjectId) || state.data.projects[0];
    const headerHtml = renderProjectHeader(activeProject, state.activeDetailTab);
    let viewContentHtml = '';

    switch (state.activeDetailTab) {
      case 'overview':   viewContentHtml = renderViewOverview(activeProject); break;
      case 'kanban':     viewContentHtml = renderViewKanban(activeProject); break;
      case 'table':      viewContentHtml = renderViewTable(activeProject); break;
      case 'timeline':   viewContentHtml = renderViewTimeline(activeProject, state.ganttZoom); break;
      case 'calendar':   viewContentHtml = renderViewCalendar(activeProject); break;
      case 'ai-manager': viewContentHtml = renderViewAIManager(activeProject); break;
      default:           viewContentHtml = renderViewOverview(activeProject); break;
    }

    mainBodyHtml = `
      <div style="display:flex;flex-direction:column">
        ${headerHtml}
        <div style="padding:0 var(--s-8) var(--s-16)">
          ${viewContentHtml}
        </div>
      </div>
    `;
  }

  const wizardModalHtml = renderCreateProjectWizardModal(state.wizardStep, state.wizardFormData);

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}

        <main class="main-content-scroll" role="main" style="padding:${state.activeScreen === 'detail' ? '0' : 'var(--s-6) var(--s-8) var(--s-16)'}">
          ${mainBodyHtml}
        </main>
      </div>

      <!-- Modals -->
      ${commandPaletteHtml}
      ${taskModalHtml}
      ${wizardModalHtml}
    </div>
  `;

  if (state.sidebarCollapsed) {
    document.getElementById('app-left-sidebar')?.classList.add('collapsed');
  }

  if (state.isWizardOpen) {
    document.getElementById('project-wizard-backdrop')?.classList.add('active');
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

  // Sidebar Links
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const navId = item.dataset.navId;
      if (navId === 'dashboard') {
        window.location.href = 'dashboard.html';
      }
    });
  });

  // Create Project Wizard Triggers
  document.getElementById('create-project-wizard-btn')?.addEventListener('click', openWizard);
  document.getElementById('close-project-wizard-btn')?.addEventListener('click', closeWizard);

  document.getElementById('wizard-prev-btn')?.addEventListener('click', () => {
    if (state.wizardStep > 1) {
      state.wizardStep--;
      renderProjectsApp();
      bindGlobalEvents();
    }
  });

  document.getElementById('wizard-next-btn')?.addEventListener('click', () => {
    if (state.wizardStep < 5) {
      state.wizardStep++;
      renderProjectsApp();
      bindGlobalEvents();
    } else {
      // Launch project
      const name = document.getElementById('wiz-proj-name')?.value || 'New AI Project';
      const key = document.getElementById('wiz-proj-key')?.value || 'NOVA';

      const newProj = {
        id: `proj-${Date.now()}`,
        key,
        name,
        description: 'Auto-generated workspace project with initial backlog and AI monitoring.',
        icon: '🚀',
        cover: 'linear-gradient(135deg, #6e4aff 0%, #06b6d4 100%)',
        color: '#6e4aff',
        category: 'AI Engineering',
        visibility: 'Public Workspace',
        status: 'In Progress',
        health: 'On Track',
        healthScore: 95,
        healthColor: '#22c55e',
        progress: 10,
        targetDate: 'Sep 30, 2026',
        sprint: 'Sprint 25',
        lead: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
        members: [{ name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' }],
        milestones: [{ id: 'm-new-1', title: 'M1: Architecture Review', dueDate: 'Aug 15', status: 'In Progress', progress: 20 }],
        tasks: [
          { id: `task-n1`, key: `${key}-1`, title: 'Initialize Repository & Setup CI/CD', status: 'in_progress', priority: 'High', priorityLevel: 'high', assignee: { name: 'Alex Johnson', avatar: 'AJ' }, dueDate: 'Aug 05', estimate: '4h', aiComplexity: 'Low', subtasksCount: 2, subtasksDone: 1, tags: ['Setup'] }
        ],
        aiSummary: 'Newly launched project workspace. 1 initial task created by Nova AI Assistant.',
        aiRisks: [],
        budget: '$10,000',
        velocity: '30 Points / Sprint'
      };

      state.data.projects.unshift(newProj);
      state.data.metrics.total++;
      state.data.metrics.active++;
      closeWizard();
      state.activeScreen = 'detail';
      state.currentProjectId = newProj.id;
      renderProjectsApp();
      bindGlobalEvents();
      showToastNotification('Project Launched! 🚀', `"${name}" is ready.`);
    }
  });

  // Open Project Detail Cards
  document.querySelectorAll('[data-open-project-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const projId = card.dataset.openProjectId;
      state.activeScreen = 'detail';
      state.currentProjectId = projId;
      renderProjectsApp();
      bindGlobalEvents();
    });
  });

  // Home View Mode Grid/List
  document.getElementById('home-view-grid-btn')?.addEventListener('click', () => {
    state.homeViewMode = 'grid';
    renderProjectsApp(); bindGlobalEvents();
  });
  document.getElementById('home-view-list-btn')?.addEventListener('click', () => {
    state.homeViewMode = 'list';
    renderProjectsApp(); bindGlobalEvents();
  });
}

function bindViewSpecificEvents() {
  // Back to Projects Home
  document.getElementById('back-to-projects-home-btn')?.addEventListener('click', () => {
    state.activeScreen = 'home';
    renderProjectsApp();
    bindGlobalEvents();
  });

  // Detail View Switcher Tabs
  document.querySelectorAll('[data-view-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeDetailTab = tab.dataset.viewTab;
      renderProjectsApp();
      bindGlobalEvents();
    });
  });

  // Inline Table Field Editing Handler
  document.querySelectorAll('[data-inline-field="status"]').forEach(select => {
    select.addEventListener('change', (e) => {
      const taskId = select.dataset.taskId;
      const proj = state.data.projects.find(p => p.id === state.currentProjectId);
      if (proj) {
        const task = proj.tasks.find(t => t.id === taskId);
        if (task) {
          task.status = e.target.value;
          showToastNotification('Status Updated', `${task.key} moved to ${e.target.value}`);
        }
      }
    });
  });

  // AI Auto-Balance Action Trigger
  document.getElementById('ai-auto-balance-btn')?.addEventListener('click', () => {
    showToastNotification('Workload Auto-Balanced ✨', 'Reassigned 2 high-complexity tasks to David Kim.');
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWizard();
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // View tab shortcuts 1-6
    if (state.activeScreen === 'detail' && e.key >= '1' && e.key <= '6') {
      const tabMap = ['overview', 'kanban', 'table', 'timeline', 'calendar', 'ai-manager'];
      state.activeDetailTab = tabMap[parseInt(e.key) - 1];
      renderProjectsApp();
      bindGlobalEvents();
    }
  });
}

function openWizard() {
  state.isWizardOpen = true;
  state.wizardStep = 1;
  document.getElementById('project-wizard-backdrop')?.classList.add('active');
}

function closeWizard() {
  state.isWizardOpen = false;
  document.getElementById('project-wizard-backdrop')?.classList.remove('active');
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

// Boot Projects Module
initProjectsModule();
