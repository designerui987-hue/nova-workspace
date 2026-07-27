/**
 * Nova Workspace — Tasks Dataset
 * Enterprise task management dataset (Tasks, Subtasks, Time Tracking, Dependencies, Priority Matrix, Focus Mode).
 */

export const mockTasksData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ',
    focusScore: 96,
    dailyGoalCompleted: 6,
    dailyGoalTotal: 8,
    pomodoroStreak: 4
  },

  metrics: {
    today: 5,
    upcoming: 8,
    overdue: 1,
    completedToday: 4,
    assignedToMe: 9,
    blocked: 1,
    aiFocusScore: 96
  },

  tasks: [
    {
      id: 'task-1',
      key: 'NOVA-101-1',
      title: 'Finalize Design System v2.0 CSS Custom Property Architecture',
      description: 'Define semantic token hierarchy for dark and light modes across neutral, brand, cyan, and rose color ramps. Ensure WCAG AA contrast ratio compliance.',
      status: 'in_progress',
      priority: 'Urgent',
      priorityLevel: 'urgent',
      project: 'Nova UI System',
      projectKey: 'NOVA-101',
      projectColor: '#6e4aff',
      assignee: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      owner: { name: 'Alex Johnson', avatar: 'AJ' },
      followers: [{ name: 'Sarah Lin', avatar: 'SL' }, { name: 'Marcus Chen', avatar: 'MC' }],
      dueDate: 'Today · 5:00 PM',
      isOverdue: false,
      isToday: true,
      isBlocked: false,
      estimate: '4h 00m',
      timeSpent: '2h 45m',
      timeSpentSeconds: 9900,
      subtasks: [
        { id: 'sub-1', title: 'Audit primitive neutral ramp HSL values', completed: true },
        { id: 'sub-2', title: 'Create semantic token aliases for dark mode glassmorphism', completed: true },
        { id: 'sub-3', title: 'Verify contrast ratio > 4.5:1 for light theme text-2', completed: true },
        { id: 'sub-4', title: 'Export tokens.json for Figma Tokens plugin', completed: false }
      ],
      dependencies: {
        blockedBy: ['Figma Token Export v2'],
        blocking: ['Component Library Button Migration']
      },
      tags: ['Tokens', 'CSS', 'Design System'],
      aiInsight: '✨ High priority task. Recommended focus window: 10:00 AM – 11:30 AM before Design Sync.',
      health: 'On Track',
      comments: [
        { id: 'c-1', user: { name: 'Marcus Chen', avatar: 'MC' }, text: 'Dark mode elevation tokens look great! Ready for button component migration.', time: '18 min ago' },
        { id: 'c-2', user: { name: 'Nova Copilot', avatar: '🤖', isAI: true }, text: '✨ All 34 token variables verified for WCAG 2.1 AA compliance.', time: '1 hour ago' }
      ]
    },

    {
      id: 'task-2',
      key: 'NOVA-101-2',
      title: 'Review Q3 Mobile Navigation Wireframes with Product Team',
      description: 'Review bottom tab bar navigation gestures, drawer animation speed, and swipe interactions for iOS/Android builds.',
      status: 'todo',
      priority: 'High',
      priorityLevel: 'high',
      project: 'Mobile App Redesign',
      projectKey: 'NOVA-303',
      projectColor: '#06b6d4',
      assignee: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      owner: { name: 'Sarah Lin', avatar: 'SL' },
      followers: [{ name: 'Kobe Bryant', avatar: 'KB' }],
      dueDate: 'Today · 2:30 PM',
      isOverdue: false,
      isToday: true,
      isBlocked: false,
      estimate: '2h 30m',
      timeSpent: '0h 45m',
      timeSpentSeconds: 2700,
      subtasks: [
        { id: 'sub-21', title: 'Prepare 3 Figma mobile tab bar variations', completed: true },
        { id: 'sub-22', title: 'Gather user test video feedback summaries', completed: false }
      ],
      dependencies: { blockedBy: [], blocking: [] },
      tags: ['Mobile', 'UX', 'Figma'],
      aiInsight: '✨ AI summarized feedback from 3 user tests into key recommendations.',
      health: 'On Track',
      comments: []
    },

    {
      id: 'task-3',
      key: 'NOVA-202-1',
      title: 'Optimize Vector Embedding Indexing Latency for LLM Copilot',
      description: 'Investigate vector DB index query overhead exceeding 400ms target SLA during peak concurrent searches.',
      status: 'in_progress',
      priority: 'Urgent',
      priorityLevel: 'urgent',
      project: 'AI Workflow Engine',
      projectKey: 'NOVA-202',
      projectColor: '#f59e0b',
      assignee: { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect' },
      owner: { name: 'Elena Rostova', avatar: 'ER' },
      followers: [{ name: 'Alex Johnson', avatar: 'AJ' }],
      dueDate: 'Yesterday',
      isOverdue: true,
      isToday: false,
      isBlocked: true,
      estimate: '8h 00m',
      timeSpent: '6h 15m',
      timeSpentSeconds: 22500,
      subtasks: [
        { id: 'sub-31', title: 'Benchmark HNSW vs Flat index speed', completed: true },
        { id: 'sub-32', title: 'Implement Redis memory-mapped caching layer', completed: false }
      ],
      dependencies: {
        blockedBy: ['Redis Cluster Memory Provisioning'],
        blocking: ['Copilot Latency Benchmark Test']
      },
      tags: ['AI', 'Vector', 'Latency'],
      aiInsight: '⚠️ Blocked by Redis provisioning. AI suggests reallocating David Kim for 2 hours.',
      health: 'At Risk',
      comments: [
        { id: 'c-31', user: { name: 'Elena Rostova', avatar: 'ER' }, text: 'Waiting on DevOps to scale Redis RAM to 32GB.', time: '2 hours ago' }
      ]
    },

    {
      id: 'task-4',
      key: 'NOVA-101-3',
      title: 'Approve AI Copilot Context Window & Memory Specifications',
      description: 'Sign off on 128k context window token buffer allocation and short-term conversation cache rules.',
      status: 'review',
      priority: 'Medium',
      priorityLevel: 'medium',
      project: 'AI Assistant Core',
      projectKey: 'NOVA-202',
      projectColor: '#22c55e',
      assignee: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      owner: { name: 'Elena Rostova', avatar: 'ER' },
      followers: [],
      dueDate: 'Tomorrow',
      isOverdue: false,
      isToday: false,
      isBlocked: false,
      estimate: '1h 30m',
      timeSpent: '1h 00m',
      timeSpentSeconds: 3600,
      subtasks: [
        { id: 'sub-41', title: 'Verify token limit parameters', completed: true }
      ],
      dependencies: { blockedBy: [], blocking: [] },
      tags: ['AI Spec', 'Approval'],
      aiInsight: '✨ All 4 tech lead approvals received. Ready for final signature.',
      health: 'On Track',
      comments: []
    },

    {
      id: 'task-5',
      key: 'NOVA-101-4',
      title: 'Audit Accessibility (WCAG 2.1 AA) for Command Palette (⌘K)',
      description: 'Test keyboard focus traps, screen reader aria-live announcements, and high contrast focus borders.',
      status: 'done',
      priority: 'Low',
      priorityLevel: 'low',
      project: 'Nova UI System',
      projectKey: 'NOVA-101',
      projectColor: '#6e4aff',
      assignee: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      owner: { name: 'Alex Johnson', avatar: 'AJ' },
      followers: [],
      dueDate: 'Jul 26',
      isOverdue: false,
      isToday: false,
      isBlocked: false,
      estimate: '3h 00m',
      timeSpent: '2h 30m',
      timeSpentSeconds: 9000,
      subtasks: [
        { id: 'sub-51', title: 'Verify Esc key backdrop focus restoration', completed: true },
        { id: 'sub-52', title: 'Test NVDA & VoiceOver screen reader announcements', completed: true }
      ],
      dependencies: { blockedBy: [], blocking: [] },
      tags: ['a11y', 'Testing'],
      aiInsight: '✅ Task completed! Passed VoiceOver accessibility check.',
      health: 'Completed',
      comments: []
    }
  ],

  focusModeSession: {
    activeTaskId: 'task-1',
    sessionLengthMinutes: 25,
    secondsRemaining: 1500, // 25:00
    isRunning: false,
    completedSessionsToday: 4,
    aiCoachTip: 'Focus tip: You have completed 3 pomodoro sessions today. Take a 5-minute hydration break at 11:30 AM.'
  },

  myWorkSections: [
    { id: 'today', title: 'Today', icon: '🎯' },
    { id: 'upcoming', title: 'Upcoming', icon: '📅' },
    { id: 'blocked', title: 'Blocked & Waiting', icon: '⚠️' },
    { id: 'completed', title: 'Completed Today', icon: '✅' }
  ]
};
