/**
 * Nova Workspace — Meetings & Collaboration Module Main Controller
 * Live Huddle workspace, real-time transcript streaming, decision logging, 5-step wizard, and hotkeys.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/projects.css';
import '../styles/meetings.css';

import { mockMeetingsData } from './meetings-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderMeetingsHome } from './components/meetings-home.js';
import { renderModeUpcoming } from './components/mode-upcoming.js';
import { renderModeLive } from './components/mode-live.js';
import { renderModeSummary } from './components/mode-summary.js';
import { renderScheduleMeetingWizardModal } from './components/schedule-meeting-wizard.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

// Meetings State Engine
const state = {
  data: mockMeetingsData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeScreen: 'home', // 'home' | 'mode-upcoming' | 'mode-live' | 'mode-summary'
  currentMeetingId: 'mtg-101',
  homeViewMode: 'grid',
  wizardStep: 1,
  isWizardOpen: false,
  wizardFormData: {}
};

function initMeetingsModule() {
  document.documentElement.setAttribute('data-theme', state.theme);

  // Check URL params for meeting deep link
  const params = new URLSearchParams(window.location.search);
  const mtgParam = params.get('id');
  if (mtgParam) {
    state.currentMeetingId = mtgParam;
    const mtg = state.data.meetings.find(m => m.id === mtgParam);
    if (mtg) {
      state.activeScreen = mtg.status === 'live' ? 'mode-live' : mtg.status === 'completed' ? 'mode-summary' : 'mode-upcoming';
    }
  }

  renderMeetingsApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderMeetingsApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('meetings');
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();
  const wizardModalHtml = renderScheduleMeetingWizardModal(state.wizardStep, state.wizardFormData);

  let mainBodyHtml = '';

  if (state.activeScreen === 'home') {
    mainBodyHtml = `
      <main class="main-content-scroll" role="main">
        ${renderMeetingsHome(state.data, state.homeViewMode)}
      </main>
    `;
  } else {
    const activeMtg = state.data.meetings.find(m => m.id === state.currentMeetingId) || state.data.meetings[0];
    let modeContent = '';

    if (state.activeScreen === 'mode-live') {
      modeContent = renderModeLive(activeMtg);
    } else if (state.activeScreen === 'mode-summary') {
      modeContent = renderModeSummary(activeMtg);
    } else {
      modeContent = renderModeUpcoming(activeMtg);
    }

    mainBodyHtml = `
      <main class="main-content-scroll" role="main" style="padding:0 var(--s-8) var(--s-16)">
        ${modeContent}
      </main>
    `;
  }

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}
        ${mainBodyHtml}
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
    document.getElementById('meeting-wizard-backdrop')?.classList.add('active');
  }

  bindModeEvents();
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
    });
  });

  // Wizard Triggers
  document.getElementById('schedule-meeting-wizard-btn')?.addEventListener('click', openWizard);
  document.getElementById('close-meeting-wizard-btn')?.addEventListener('click', closeWizard);

  document.getElementById('mtg-wizard-prev-btn')?.addEventListener('click', () => {
    if (state.wizardStep > 1) {
      state.wizardStep--; renderMeetingsApp(); bindGlobalEvents();
    }
  });

  document.getElementById('mtg-wizard-next-btn')?.addEventListener('click', () => {
    if (state.wizardStep < 5) {
      state.wizardStep++; renderMeetingsApp(); bindGlobalEvents();
    } else {
      // Schedule meeting
      const title = document.getElementById('wiz-mtg-title')?.value || 'New AI Sync';
      const newMtg = {
        id: `mtg-${Date.now()}`,
        title,
        category: 'Design & Architecture',
        status: 'upcoming',
        isNextUp: true,
        time: '11:00 AM – 11:30 AM',
        duration: '30m',
        organizer: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
        attendees: [{ name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' }],
        objective: 'Newly scheduled meeting with automated AI briefing.',
        aiBriefing: '✨ AI Briefing: Agenda initialized with 2 discussion topics.',
        linkedProject: 'Nova UI System',
        linkedTask: '',
        prepScore: 98,
        agenda: [{ id: 'ag-n1', topic: 'Architecture Review', completed: false }]
      };

      state.data.meetings.unshift(newMtg);
      state.data.metrics.todayMeetings++;
      closeWizard();
      state.activeScreen = 'mode-upcoming';
      state.currentMeetingId = newMtg.id;
      renderMeetingsApp();
      bindGlobalEvents();
      showToastNotification('Meeting Scheduled! 📅', `"${title}" has been added to calendar.`);
    }
  });

  // Open Meeting Cards
  document.querySelectorAll('[data-open-meeting-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const mtgId = card.dataset.openMeetingId;
      const mtg = state.data.meetings.find(m => m.id === mtgId);
      if (mtg) {
        state.currentMeetingId = mtgId;
        state.activeScreen = mtg.status === 'live' ? 'mode-live' : mtg.status === 'completed' ? 'mode-summary' : 'mode-upcoming';
        renderMeetingsApp();
        bindGlobalEvents();
      }
    });
  });

  // Launch Specific Mode Buttons
  document.querySelectorAll('[data-action="launch-meeting-mode"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const mtgId = btn.dataset.meetingId;
      const mtg = state.data.meetings.find(m => m.id === mtgId);
      if (mtg) {
        state.currentMeetingId = mtgId;
        state.activeScreen = mtg.status === 'live' ? 'mode-live' : mtg.status === 'completed' ? 'mode-summary' : 'mode-upcoming';
        renderMeetingsApp();
        bindGlobalEvents();
      }
    });
  });

  // Grid/List Toggle
  document.getElementById('mtg-grid-toggle')?.addEventListener('click', () => {
    state.homeViewMode = 'grid'; renderMeetingsApp(); bindGlobalEvents();
  });
  document.getElementById('mtg-list-toggle')?.addEventListener('click', () => {
    state.homeViewMode = 'list'; renderMeetingsApp(); bindGlobalEvents();
  });
}

function bindModeEvents() {
  // Back to Home
  document.getElementById('back-to-meetings-home-btn')?.addEventListener('click', backToHome);
  document.getElementById('back-to-meetings-home-btn-2')?.addEventListener('click', backToHome);

  // Join Live Huddle from Upcoming
  document.getElementById('join-live-huddle-btn')?.addEventListener('click', () => {
    state.activeScreen = 'mode-live';
    renderMeetingsApp();
    bindGlobalEvents();
  });

  // Leave Huddle
  document.getElementById('leave-live-huddle-btn')?.addEventListener('click', () => {
    state.activeScreen = 'mode-summary';
    renderMeetingsApp();
    bindGlobalEvents();
  });
  document.getElementById('btn-end-huddle')?.addEventListener('click', () => {
    state.activeScreen = 'mode-summary';
    renderMeetingsApp();
    bindGlobalEvents();
  });

  // Convert Action Item to Task
  document.querySelectorAll('[data-action="convert-task"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.innerHTML = '<span>✓ Task Linked</span>';
      showToastNotification('Action Item Converted! ⚡', 'New task added to Tasks Workspace.');
    });
  });
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeWizard();
    }
  });
}

function backToHome() {
  state.activeScreen = 'home';
  renderMeetingsApp();
  bindGlobalEvents();
}

function openWizard() {
  state.isWizardOpen = true;
  state.wizardStep = 1;
  document.getElementById('meeting-wizard-backdrop')?.classList.add('active');
}

function closeWizard() {
  state.isWizardOpen = false;
  document.getElementById('meeting-wizard-backdrop')?.classList.remove('active');
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

// Boot Meetings Module
initMeetingsModule();
