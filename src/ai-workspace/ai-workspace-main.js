/**
 * Nova Workspace — AI Workspace Module Main Controller
 * 3-panel layout, conversational streaming engine, action execution, and memory store.
 */

import '../styles/tokens.css';
import '../styles/auth.css';
import '../styles/dashboard.css';
import '../styles/ai-workspace.css';

import { mockAIWorkspaceData } from './ai-workspace-data.js';
import { renderTopNav, renderLeftSidebar } from '../dashboard/components/navigation.js';
import { renderAILeftPanel } from './components/left-panel.js';
import { renderAIChatCanvas } from './components/chat-canvas.js';
import { renderAIRightPanel } from './components/right-panel.js';
import { renderCommandPaletteModal } from '../dashboard/components/command-palette.js';
import { renderTaskModal } from '../dashboard/components/modals.js';

// AI Workspace State Engine
const state = {
  data: mockAIWorkspaceData,
  theme: localStorage.getItem('nova-theme') || 'dark',
  sidebarCollapsed: false,
  activeChatId: 'chat-1'
};

function initAIWorkspaceModule() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderAIWorkspaceApp();
  bindGlobalEvents();
  bindKeyboardShortcuts();
}

function renderAIWorkspaceApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const topNavHtml = renderTopNav({
    user: state.data.user,
    workspace: { name: 'Nova Workspace', icon: '🎨', plan: 'Enterprise' },
    notifications: []
  });

  const sidebarHtml = renderLeftSidebar('ai');
  const commandPaletteHtml = renderCommandPaletteModal();
  const taskModalHtml = renderTaskModal();

  const activeChat = state.data.conversations.find(c => c.id === state.activeChatId) || state.data.conversations[0];
  const leftPanelHtml = renderAILeftPanel(state.data.conversations, state.data.workflows, state.activeChatId);
  const chatCanvasHtml = renderAIChatCanvas(activeChat, state.data);
  const rightPanelHtml = renderAIRightPanel(state.data.memories);

  app.innerHTML = `
    <div class="dashboard-root">
      ${topNavHtml}

      <div class="dashboard-app-body">
        ${sidebarHtml}

        <main class="ai-workspace-root">
          ${leftPanelHtml}
          ${chatCanvasHtml}
          ${rightPanelHtml}
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

  bindAIChatEvents();
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
    });
  });

  // New Chat CTA
  document.getElementById('btn-new-ai-chat')?.addEventListener('click', () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: 'New AI Co-Pilot Session',
      updatedAt: 'Just now',
      messages: []
    };
    state.data.conversations.unshift(newChat);
    state.activeChatId = newChat.id;
    renderAIWorkspaceApp();
    bindGlobalEvents();
  });

  // Select Chat History
  document.querySelectorAll('[data-chat-id]').forEach(el => {
    el.addEventListener('click', () => {
      state.activeChatId = el.dataset.chatId;
      renderAIWorkspaceApp();
      bindGlobalEvents();
    });
  });
}

function bindAIChatEvents() {
  // Submit AI Prompt Form
  const form = document.getElementById('ai-prompt-form');
  const textarea = document.getElementById('ai-prompt-textarea');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const promptText = textarea?.value.trim();
    if (!promptText) return;

    sendAIPrompt(promptText);
    if (textarea) textarea.value = '';
  });

  // Quick Action Prompt Chips
  document.querySelectorAll('[data-quick-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.quickPrompt;
      sendAIPrompt(prompt);
    });
  });

  // Confirm & Execute Action Trigger
  document.querySelectorAll('[data-action="execute-ai-action"]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      btn.innerHTML = '<span>✓ Action Executed</span>';
      showToastNotification('Action Executed! 🚀', 'Task reassigned to David Kim.');
    });
  });

  // Add Memory Trigger
  document.getElementById('btn-add-memory')?.addEventListener('click', () => {
    state.data.memories.push({
      id: `mem-${Date.now()}`,
      text: 'User requested dark mode high-contrast focus rings for all modals.',
      category: 'User Preference'
    });
    renderAIWorkspaceApp();
    bindGlobalEvents();
    showToastNotification('Memory Saved 🧠', 'New rule added to workspace memory.');
  });
}

function sendAIPrompt(text) {
  let activeChat = state.data.conversations.find(c => c.id === state.activeChatId);
  if (!activeChat) {
    activeChat = state.data.conversations[0];
  }

  // Append User Message
  activeChat.messages.push({
    id: `msg-${Date.now()}`,
    sender: 'user',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  // Append Assistant AI Streaming Response
  activeChat.messages.push({
    id: `msg-${Date.now() + 1}`,
    sender: 'assistant',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    thinkingSteps: [
      '🔍 Querying workspace context & indexed documents...',
      '⚡ Analyzing 12 active projects and Sprint 24 commitments...'
    ],
    text: `Here is the AI synthesis for your request:

### 🎯 Key Action Items
- Prioritized **NOVA-101-1 (CSS Tokens Spec)** as primary focus for today.
- Identified 1 dependency bottleneck in AI Copilot Latency.

Nova Copilot recommends initiating a 25-minute Deep Work session.`,
    actionCard: {
      title: '✨ Suggested Action',
      description: 'Start a 25-minute Pomodoro Deep Work Focus session for NOVA-101-1.',
      actionId: `act-${Date.now()}`
    }
  });

  state.data.metrics.actionsExecutedToday++;
  renderAIWorkspaceApp();
  bindGlobalEvents();

  // Auto Scroll Chat to Bottom
  const chatBox = document.getElementById('ai-chat-scroll-area');
  if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
}

function bindKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      document.getElementById('ai-prompt-form')?.dispatchEvent(new Event('submit'));
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

// Boot AI Workspace Module
initAIWorkspaceModule();
