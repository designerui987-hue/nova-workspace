/**
 * Nova Workspace — Projects Dataset
 * Rich enterprise dataset for Projects, Kanban Tasks, Milestones, Gantt Timelines, and AI Insights.
 */

export const mockProjectsData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ'
  },

  metrics: {
    total: 12,
    active: 8,
    completed: 3,
    archived: 1,
    atRisk: 2,
    onTrack: 6,
    aiScore: 94
  },

  projects: [
    {
      id: 'proj-1',
      key: 'NOVA-101',
      name: 'Nova UI Design System 2.0',
      description: 'Unified component architecture, token design system, and multi-theme engine across web & native platforms.',
      icon: '🎨',
      cover: 'linear-gradient(135deg, #6e4aff 0%, #a855f7 100%)',
      color: '#6e4aff',
      category: 'Design System',
      visibility: 'Public Workspace',
      status: 'In Progress',
      health: 'On Track',
      healthScore: 94,
      healthColor: '#22c55e',
      progress: 82,
      startDate: 'Jul 01, 2026',
      targetDate: 'Aug 25, 2026',
      sprint: 'Sprint 24 — Q3 Release',
      isFavorite: true,
      isPinned: true,
      lead: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      members: [
        { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
        { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer' },
        { name: 'Marcus Chen', avatar: 'MC', role: 'Frontend Dev' },
        { name: 'Elena Rostova', avatar: 'ER', role: 'AI Specialist' }
      ],
      milestones: [
        { id: 'm-1', title: 'M1: Tokens Specification & WCAG AA Audit', dueDate: 'Jul 15', status: 'Completed', progress: 100 },
        { id: 'm-2', title: 'M2: Core React & Web Component Primitives', dueDate: 'Aug 05', status: 'In Progress', progress: 75 },
        { id: 'm-3', title: 'M3: Documentation & Figma Tokens Sync Plugin', dueDate: 'Aug 25', status: 'Planned', progress: 20 }
      ],
      tasks: [
        {
          id: 'task-201',
          key: 'NOVA-101-1',
          title: 'Finalize CSS Custom Property Token Architecture',
          status: 'in_progress',
          priority: 'Urgent',
          priorityLevel: 'urgent',
          assignee: { name: 'Alex Johnson', avatar: 'AJ' },
          dueDate: 'Today',
          estimate: '5h',
          aiComplexity: 'Low (0.3)',
          subtasksCount: 4,
          subtasksDone: 3,
          tags: ['Tokens', 'CSS']
        },
        {
          id: 'task-202',
          key: 'NOVA-101-2',
          title: 'Audit Light Theme Contrast Ratios (WCAG 2.1 AA)',
          status: 'review',
          priority: 'High',
          priorityLevel: 'high',
          assignee: { name: 'Sarah Lin', avatar: 'SL' },
          dueDate: 'Jul 29',
          estimate: '3h',
          aiComplexity: 'Medium (0.5)',
          subtasksCount: 2,
          subtasksDone: 2,
          tags: ['Accessibility', 'Themes']
        },
        {
          id: 'task-203',
          key: 'NOVA-101-3',
          title: 'Build Interactive Button & Input Primitive Suite',
          status: 'completed',
          priority: 'High',
          priorityLevel: 'high',
          assignee: { name: 'Marcus Chen', avatar: 'MC' },
          dueDate: 'Jul 20',
          estimate: '8h',
          aiComplexity: 'Medium (0.6)',
          subtasksCount: 5,
          subtasksDone: 5,
          tags: ['Components']
        },
        {
          id: 'task-204',
          key: 'NOVA-101-4',
          title: 'Figma Tokens REST API Webhook Integration',
          status: 'planned',
          priority: 'Medium',
          priorityLevel: 'medium',
          assignee: { name: 'Elena Rostova', avatar: 'ER' },
          dueDate: 'Aug 08',
          estimate: '12h',
          aiComplexity: 'High (0.85)',
          subtasksCount: 3,
          subtasksDone: 0,
          tags: ['Figma', 'API']
        },
        {
          id: 'task-205',
          key: 'NOVA-101-5',
          title: 'Keyboard Navigation & Focus Ring Refactoring',
          status: 'backlog',
          priority: 'Low',
          priorityLevel: 'low',
          assignee: { name: 'Alex Johnson', avatar: 'AJ' },
          dueDate: 'Aug 18',
          estimate: '4h',
          aiComplexity: 'Low (0.2)',
          subtasksCount: 2,
          subtasksDone: 0,
          tags: ['a11y']
        }
      ],
      aiSummary: 'Project is progressing 18% faster than Sprint 23 benchmark. 1 minor dependency on Figma API Token sync.',
      aiRisks: [
        { severity: 'Medium', title: 'Figma Webhook Rate Limit', description: 'API rate limits may cause a 1-day delay during peak token sync hours.', recommendation: 'Implement batch caching on token updates.' }
      ],
      budget: '$45,000 / $60,000',
      velocity: '42 Story Points / Sprint'
    },

    {
      id: 'proj-2',
      key: 'NOVA-202',
      name: 'AI Workflow Automation Engine',
      description: 'Proactive LLM agents for automated task assignment, sprint summaries, and code review insights.',
      icon: '⚡',
      cover: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      color: '#06b6d4',
      category: 'AI Engineering',
      visibility: 'Workspace Private',
      status: 'In Progress',
      health: 'At Risk',
      healthScore: 68,
      healthColor: '#f59e0b',
      progress: 65,
      startDate: 'Jun 15, 2026',
      targetDate: 'Sep 10, 2026',
      sprint: 'Sprint 24 — Q3 Release',
      isFavorite: true,
      isPinned: false,
      lead: { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect' },
      members: [
        { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect' },
        { name: 'David Kim', avatar: 'DK', role: 'Fullstack Dev' },
        { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' }
      ],
      milestones: [
        { id: 'm-21', title: 'M1: Streaming Pipeline & Token Caching', dueDate: 'Jul 10', status: 'Completed', progress: 100 },
        { id: 'm-22', title: 'M2: Automated Sprint Retrospective Generator', dueDate: 'Aug 12', status: 'At Risk', progress: 50 }
      ],
      tasks: [
        {
          id: 'task-301',
          key: 'NOVA-202-1',
          title: 'Optimize Vector Embedding Indexing Latency',
          status: 'in_progress',
          priority: 'Urgent',
          priorityLevel: 'urgent',
          assignee: { name: 'Elena Rostova', avatar: 'ER' },
          dueDate: 'Tomorrow',
          estimate: '10h',
          aiComplexity: 'High (0.9)',
          subtasksCount: 3,
          subtasksDone: 1,
          tags: ['AI', 'Vector']
        },
        {
          id: 'task-302',
          key: 'NOVA-202-2',
          title: 'Implement Multi-Modal Image & Wireframe Inspector',
          status: 'backlog',
          priority: 'High',
          priorityLevel: 'high',
          assignee: { name: 'David Kim', avatar: 'DK' },
          dueDate: 'Aug 20',
          estimate: '16h',
          aiComplexity: 'High (0.88)',
          subtasksCount: 4,
          subtasksDone: 0,
          tags: ['Vision', 'LLM']
        }
      ],
      aiSummary: 'At risk due to vector index latency bottleneck. AI recommends auto-reallocating David Kim for 2 days.',
      aiRisks: [
        { severity: 'High', title: 'Vector DB Latency Spike', description: 'Queries over 100k embedding vectors exceeding 400ms target SLA.', recommendation: 'Enable HNSW indexing and memory-mapped cache.' }
      ],
      budget: '$80,000 / $110,000',
      velocity: '31 Story Points / Sprint'
    },

    {
      id: 'proj-3',
      key: 'NOVA-303',
      name: 'Mobile Workspace Application (iOS / Android)',
      description: 'Native Flutter mobile app with offline synchronization, push notifications, and quick voice AI capture.',
      icon: '📱',
      cover: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#3b82f6',
      category: 'Mobile Apps',
      visibility: 'Public Workspace',
      status: 'Planning',
      health: 'On Track',
      healthScore: 91,
      healthColor: '#22c55e',
      progress: 45,
      startDate: 'Jul 20, 2026',
      targetDate: 'Oct 15, 2026',
      sprint: 'Sprint 25',
      isFavorite: false,
      isPinned: false,
      lead: { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer' },
      members: [
        { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer' },
        { name: 'Kobe Bryant', avatar: 'KB', role: 'Mobile Dev' }
      ],
      milestones: [
        { id: 'm-31', title: 'M1: Offline SQLite Synchronization Engine', dueDate: 'Aug 30', status: 'In Progress', progress: 40 }
      ],
      tasks: [],
      aiSummary: 'On track for Q4 App Store submission. Early UI mocks approved.',
      aiRisks: [],
      budget: '$30,000 / $90,000',
      velocity: '28 Story Points / Sprint'
    },

    {
      id: 'proj-4',
      key: 'NOVA-404',
      name: 'Enterprise Knowledge Graph Integration',
      description: 'Cross-workspace semantic search linking Jira tickets, Figma frames, Slack threads, and Notion documents.',
      icon: '🧠',
      cover: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
      color: '#a855f7',
      category: 'Data Engineering',
      visibility: 'Workspace Private',
      status: 'Near Completion',
      health: 'On Track',
      healthScore: 98,
      healthColor: '#22c55e',
      progress: 90,
      startDate: 'May 01, 2026',
      targetDate: 'Aug 10, 2026',
      sprint: 'Sprint 24',
      isFavorite: false,
      isPinned: true,
      lead: { name: 'David Kim', avatar: 'DK', role: 'Fullstack Dev' },
      members: [
        { name: 'David Kim', avatar: 'DK', role: 'Fullstack Dev' },
        { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect' }
      ],
      milestones: [
        { id: 'm-41', title: 'M1: Enterprise Graph Schema & Security Rules', dueDate: 'Jun 15', status: 'Completed', progress: 100 },
        { id: 'm-42', title: 'M2: SOC2 Security Compliance Audit', dueDate: 'Aug 05', status: 'In Progress', progress: 90 }
      ],
      tasks: [],
      aiSummary: 'Final SOC2 compliance audit in progress. 90% tasks delivered ahead of deadline.',
      aiRisks: [],
      budget: '$70,000 / $75,000',
      velocity: '50 Story Points / Sprint'
    }
  ],

  savedFilters: [
    { id: 'f-1', name: 'My Active Projects', icon: '👤' },
    { id: 'f-2', name: 'At Risk / Delayed', icon: '⚠️' },
    { id: 'f-3', name: 'Q3 Release Milestone', icon: '🎯' },
    { id: 'f-4', name: 'AI Engineering Focus', icon: '⚡' }
  ]
};
