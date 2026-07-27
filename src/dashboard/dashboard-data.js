/**
 * Nova Workspace — Dashboard Mock Data
 * Real enterprise dataset for Projects, Tasks, Meetings, AI Briefs, Knowledge, Activity, and Team Presence.
 */

export const mockWorkspaceData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ',
    focusScore: 94,
    completedToday: 5,
    totalToday: 8,
    streakDays: 14,
    activeSprint: 'Sprint 24 — Q3 Release',
    weather: '72°F Sunny · San Francisco'
  },

  workspace: {
    name: 'Nova Design',
    slug: 'nova-design',
    icon: '🎨',
    plan: 'Enterprise',
    membersCount: 14,
    projectsCount: 12,
    activeSprint: 'Sprint 24'
  },

  aiBrief: {
    timestamp: 'Updated 5 minutes ago',
    confidenceScore: 98,
    summary: 'Good morning Alex. You have 2 high-priority items due today: the **Design System v2.0 Tokens** and **Q3 Mobile Navigation Review**. 1 blocker in Sprint 24 requires your approval.',
    metrics: {
      overdue: 1,
      dueToday: 4,
      meetingsCount: 3,
      blockers: 1
    },
    bulletPoints: [
      { text: 'Design System v2.0 Tokens specification is 85% complete. Final token review needed before engineering handoff.', type: 'urgent', action: 'Review Tokens' },
      { text: 'Design Sync with Mobile Engineering starts at 10:30 AM. AI has generated a 4-point agenda for you.', type: 'meeting', action: 'View Agenda' },
      { text: 'Marcus tagged you on PR #402 regarding dark mode elevation values in Nova UI.', type: 'mention', action: 'Open PR' }
    ],
    reasoningText: 'AI analyzed your 14 assigned tasks, 3 scheduled calendar events, and recent Slack/Figma activity over the last 18 hours to synthesize this focus plan.'
  },

  todayFocusTasks: [
    {
      id: 'task-101',
      title: 'Finalize Design System v2.0 CSS Token Architecture',
      project: 'Nova UI System',
      projectColor: '#6e4aff',
      priority: 'Urgent',
      priorityLevel: 'high',
      dueDate: 'Today · 5:00 PM',
      progress: 85,
      dependencies: ['Figma Token Sync'],
      completed: false,
      assignee: { name: 'Alex Johnson', avatar: 'AJ' },
      aiTip: 'Suggested: Token values match WCAG AA contrast ratios.'
    },
    {
      id: 'task-102',
      title: 'Review Q3 Mobile Navigation Wireframes with Product Team',
      project: 'Mobile App Redesign',
      projectColor: '#06b6d4',
      priority: 'High',
      priorityLevel: 'high',
      dueDate: 'Today · 2:30 PM',
      progress: 60,
      dependencies: ['User Research Insights'],
      completed: false,
      assignee: { name: 'Alex Johnson', avatar: 'AJ' },
      aiTip: 'AI summary of feedback from 3 user tests available.'
    },
    {
      id: 'task-103',
      title: 'Approve AI Copilot Context Window Specs',
      project: 'AI Assistant Core',
      projectColor: '#22c55e',
      priority: 'Medium',
      priorityLevel: 'medium',
      dueDate: 'Today · 6:00 PM',
      progress: 40,
      dependencies: [],
      completed: false,
      assignee: { name: 'Alex Johnson', avatar: 'AJ' },
      aiTip: 'Needs approval before backend sprint kickoff tomorrow.'
    },
    {
      id: 'task-104',
      title: 'Audit Accessibility (WCAG 2.1 AA) for Command Palette',
      project: 'Nova UI System',
      projectColor: '#6e4aff',
      priority: 'Low',
      priorityLevel: 'low',
      dueDate: 'Tomorrow',
      progress: 20,
      dependencies: [],
      completed: false,
      assignee: { name: 'Alex Johnson', avatar: 'AJ' },
      aiTip: 'Key focus: Focus traps & screen reader announcements.'
    }
  ],

  projects: [
    {
      id: 'proj-1',
      name: 'Nova UI Design System 2.0',
      category: 'Design & Core Component Library',
      progress: 82,
      status: 'On Track',
      statusColor: '#22c55e',
      color: '#6e4aff',
      icon: '🎨',
      tasksCompleted: 41,
      totalTasks: 50,
      dueDate: 'Aug 15, 2026',
      members: [
        { name: 'Alex Johnson', avatar: 'AJ' },
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'Marcus Chen', avatar: 'MC' }
      ],
      lastUpdate: '2 hours ago by Marcus',
      isFavorite: true
    },
    {
      id: 'proj-2',
      name: 'AI Workflow Automation Engine',
      category: 'AI Platform Engineering',
      progress: 65,
      status: 'At Risk',
      statusColor: '#f59e0b',
      color: '#06b6d4',
      icon: '⚡',
      tasksCompleted: 26,
      totalTasks: 40,
      dueDate: 'Aug 30, 2026',
      members: [
        { name: 'Elena Rostova', avatar: 'ER' },
        { name: 'Alex Johnson', avatar: 'AJ' },
        { name: 'David Kim', avatar: 'DK' }
      ],
      lastUpdate: '1 day ago by Elena',
      isFavorite: true
    },
    {
      id: 'proj-3',
      name: 'Mobile Workspace Application (iOS / Android)',
      category: 'Native Mobile Apps',
      progress: 45,
      status: 'On Track',
      statusColor: '#22c55e',
      color: '#3b82f6',
      icon: '📱',
      tasksCompleted: 18,
      totalTasks: 40,
      dueDate: 'Sep 10, 2026',
      members: [
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'Kobe Bryant', avatar: 'KB' }
      ],
      lastUpdate: '3 hours ago by Sarah',
      isFavorite: false
    },
    {
      id: 'proj-4',
      name: 'Enterprise Knowledge Graph Integration',
      category: 'Backend & Data Pipelines',
      progress: 90,
      status: 'Near Completion',
      statusColor: '#22c55e',
      color: '#a855f7',
      icon: '🧠',
      tasksCompleted: 36,
      totalTasks: 40,
      dueDate: 'Aug 5, 2026',
      members: [
        { name: 'David Kim', avatar: 'DK' },
        { name: 'Elena Rostova', avatar: 'ER' }
      ],
      lastUpdate: '5 hours ago by David',
      isFavorite: false
    }
  ],

  upcomingMeetings: [
    {
      id: 'mtg-1',
      time: '10:30 AM – 11:15 AM',
      duration: '45m',
      title: 'Design System & Component Architecture Sync',
      status: 'Upcoming',
      isNext: true,
      organizer: 'Sarah Lin',
      attendees: [
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'Alex Johnson', avatar: 'AJ' },
        { name: 'Marcus Chen', avatar: 'MC' }
      ],
      objective: 'Align on CSS token structure and Radix primitive wrap pattern.',
      aiBriefing: 'AI Brief: Review pull request #402 before meeting. Marcus raised a concern on button focus ring offset.',
      prepStatus: 'Prepared'
    },
    {
      id: 'mtg-2',
      time: '01:30 PM – 02:00 PM',
      duration: '30m',
      title: 'AI Assistant Copilot UX Review',
      status: 'Upcoming',
      isNext: false,
      organizer: 'Elena Rostova',
      attendees: [
        { name: 'Elena Rostova', avatar: 'ER' },
        { name: 'Alex Johnson', avatar: 'AJ' }
      ],
      objective: 'Review natural language query feedback loops & fallback UI states.',
      aiBriefing: 'AI Brief: Elena added 3 Figma frame links to the calendar invitation.',
      prepStatus: 'Pending Review'
    },
    {
      id: 'mtg-3',
      time: '04:00 PM – 04:45 PM',
      duration: '45m',
      title: 'Sprint 24 Planning & Backlog Grooming',
      status: 'Upcoming',
      isNext: false,
      organizer: 'Alex Johnson',
      attendees: [
        { name: 'Alex Johnson', avatar: 'AJ' },
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'David Kim', avatar: 'DK' },
        { name: 'Marcus Chen', avatar: 'MC' }
      ],
      objective: 'Finalize ticket estimates for upcoming 2-week cycle.',
      aiBriefing: 'AI Brief: 12 backlog items auto-categorized by estimated story points.',
      prepStatus: 'AI Draft Ready'
    }
  ],

  knowledgeUpdates: [
    {
      id: 'doc-1',
      title: 'Nova Design Tokens Spec v2.0',
      type: 'Document',
      icon: '📄',
      updatedAt: '12 min ago',
      author: 'Alex Johnson',
      aiRelevance: 'Directly related to your top priority task today.',
      category: 'Design System'
    },
    {
      id: 'doc-2',
      title: 'AI Copilot Context Window & Memory Spec',
      type: 'Technical Doc',
      icon: '🧠',
      updatedAt: '1 hour ago',
      author: 'Elena Rostova',
      aiRelevance: 'Updated with new model token limits and streaming latency benchmarks.',
      category: 'AI Architecture'
    },
    {
      id: 'doc-3',
      title: 'Sprint 23 Retrospective & Key Takeaways',
      type: 'Meeting Summary',
      icon: '📝',
      updatedAt: 'Yesterday',
      author: 'Nova AI Assistant',
      aiRelevance: 'Synthesized 45-minute recording into 5 action items.',
      category: 'Sprint Notes'
    },
    {
      id: 'doc-4',
      title: 'Enterprise Security & Compliance Whitepaper',
      type: 'PDF Specification',
      icon: '🛡️',
      updatedAt: '2 days ago',
      author: 'Security Team',
      aiRelevance: 'Contains SOC2 Type II compliance guidelines for file storage.',
      category: 'Security'
    }
  ],

  activities: [
    {
      id: 'act-1',
      user: { name: 'Marcus Chen', avatar: 'MC' },
      action: 'commented on',
      target: 'PR #402: Design System Token Migration',
      time: '14 min ago',
      project: 'Nova UI System',
      detail: '"Updated focus outline offset to match 3px padding guideline."'
    },
    {
      id: 'act-2',
      user: { name: 'Nova AI Assistant', avatar: '🤖', isAI: true },
      action: 'auto-generated',
      target: 'Meeting Briefing for Component Sync',
      time: '35 min ago',
      project: 'AI Copilot',
      detail: 'Generated agenda from previous meeting notes and Slack threads.'
    },
    {
      id: 'act-3',
      user: { name: 'Sarah Lin', avatar: 'SL' },
      action: 'completed task',
      target: 'Audit HSL color scale contrast for Light Theme',
      time: '1 hour ago',
      project: 'Nova UI System',
      detail: 'All colors pass WCAG AA standard (4.5:1 ratio).'
    },
    {
      id: 'act-4',
      user: { name: 'Elena Rostova', avatar: 'ER' },
      action: 'uploaded file',
      target: 'Architecture Diagram v3.svg',
      time: '2 hours ago',
      project: 'AI Platform Engineering',
      detail: 'Added vector diagram for streaming completion pipeline.'
    }
  ],

  analytics: {
    tasksCompletedThisWeek: 34,
    completionTrend: '+18% vs last week',
    meetingHoursThisWeek: 9.5,
    meetingTrend: '-2.5h (More focus time)',
    aiAutomationsExecuted: 142,
    aiSavingsHours: '12.4 hrs saved',
    weeklyProductivityData: [
      { day: 'Mon', tasks: 6, aiActions: 22 },
      { day: 'Tue', tasks: 8, aiActions: 31 },
      { day: 'Wed', tasks: 9, aiActions: 28 },
      { day: 'Thu', tasks: 7, aiActions: 35 },
      { day: 'Fri', tasks: 4, aiActions: 26 }
    ]
  },

  teamPresence: [
    { id: 'usr-1', name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer', status: 'In Deep Work', online: true, localTime: '10:14 AM (PST)' },
    { id: 'usr-2', name: 'Sarah Lin', avatar: 'SL', role: 'Senior UX Designer', status: 'Available', online: true, localTime: '10:14 AM (PST)' },
    { id: 'usr-3', name: 'Marcus Chen', avatar: 'MC', role: 'Frontend Engineer', status: 'In a Meeting', online: true, localTime: '1:14 PM (EST)' },
    { id: 'usr-4', name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect', status: 'Focusing (Do Not Disturb)', online: true, localTime: '7:14 PM (CEST)' },
    { id: 'usr-5', name: 'David Kim', avatar: 'DK', role: 'Fullstack Dev', status: 'Offline', online: false, localTime: '2:14 AM (KST)' }
  ],

  notifications: [
    { id: 'n-1', title: 'Marcus tagged you in PR #402', text: 'Hey @Alex, can you verify the dark mode tokens?', time: '14m ago', read: false, type: 'mention' },
    { id: 'n-2', title: 'AI Assistant generated your Daily Brief', text: '3 items need your immediate attention today.', time: '1h ago', read: false, type: 'ai' },
    { id: 'n-3', title: 'Sprint 24 Planning in 3 hours', text: 'Meeting invite confirmed with 4 attendees.', time: '2h ago', read: true, type: 'calendar' }
  ],

  quickActions: [
    { id: 'qa-1', title: 'Create Task', icon: '✅', shortcut: 'C', description: 'Add new task to active project' },
    { id: 'qa-2', title: 'Write Document', icon: '📝', shortcut: 'D', description: 'Create doc with AI assistance' },
    { id: 'qa-3', title: 'Ask AI Copilot', icon: '✨', shortcut: '⌘ J', description: 'Generate specs, code or summaries' },
    { id: 'qa-4', title: 'Start Meeting', icon: '🎥', shortcut: 'M', description: 'Launch instant huddle or call' },
    { id: 'qa-5', title: 'Create Project', icon: '📁', shortcut: 'P', description: 'Setup new team roadmap & goals' },
    { id: 'qa-6', title: 'Build Automation', icon: '⚡', shortcut: 'A', description: 'Trigger custom AI workflow' }
  ]
};
