/**
 * Nova Workspace — Meetings & Collaboration Dataset
 * Enterprise meetings dataset (Live meeting, transcript streaming, decision log, action items, AI briefs).
 */

export const mockMeetingsData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ'
  },

  metrics: {
    todayMeetings: 3,
    upcoming: 2,
    inProgress: 1,
    completedToday: 1,
    aiPreparedScore: 98,
    actionItemsExtracted: 8,
    decisionsLogged: 4,
    meetingTimeSaved: '3.5 hrs'
  },

  meetings: [
    {
      id: 'mtg-101',
      title: 'Design System & Component Architecture Sync',
      category: 'Design & Architecture',
      status: 'upcoming',
      isNextUp: true,
      time: '10:30 AM – 11:15 AM',
      duration: '45m',
      organizer: { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer' },
      attendees: [
        { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer', isSpeaking: false, muted: false },
        { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer', isSpeaking: false, muted: false },
        { name: 'Marcus Chen', avatar: 'MC', role: 'Frontend Dev', isSpeaking: false, muted: true }
      ],
      objective: 'Align on Radix primitive wrapper pattern and CSS token export pipeline.',
      aiBriefing: '✨ AI Briefing: Review PR #402 before meeting. Marcus raised a concern on button focus ring offset contrast ratio in dark theme.',
      linkedProject: 'Nova UI System (NOVA-101)',
      linkedTask: 'NOVA-101-1 Finalize CSS Tokens',
      prepScore: 98,
      agenda: [
        { id: 'ag-1', topic: 'Review PR #402 CSS Custom Property Tokens', duration: '15m', completed: true },
        { id: 'ag-2', topic: 'Radix Primitive Wrapper Component Specs', duration: '15m', completed: false },
        { id: 'ag-3', topic: 'Figma Tokens Webhook REST Sync Pipeline', duration: '15m', completed: false }
      ]
    },

    {
      id: 'mtg-102',
      title: 'AI Copilot Assistant UX Review & Latency Huddle',
      category: 'AI Architecture',
      status: 'live',
      isNextUp: false,
      time: '01:30 PM – 02:00 PM',
      duration: '30m',
      timerDisplay: '18:42',
      organizer: { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect' },
      attendees: [
        { name: 'Elena Rostova', avatar: 'ER', role: 'AI Architect', isSpeaking: true, muted: false },
        { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer', isSpeaking: false, muted: false }
      ],
      objective: 'Review natural language query feedback loops & fallback UI states.',
      aiBriefing: '✨ AI Briefing: Vector index query SLA currently at 380ms. Test HNSW indexing fallback.',
      linkedProject: 'AI Workflow Engine (NOVA-202)',
      linkedTask: 'NOVA-202-1 Vector Embedding Latency',
      prepScore: 95,
      agenda: [
        { id: 'ag-21', title: 'Vector DB Query Latency SLA Benchmark', completed: true },
        { id: 'ag-22', title: 'Streaming Response UI Feedback States', completed: true },
        { id: 'ag-23', title: 'Action Item Extraction Confidence Threshold', completed: false }
      ],
      transcript: [
        { id: 'tr-1', speaker: 'Elena Rostova', avatar: 'ER', time: '10:14 AM', text: 'We have reduced the streaming latency from 450ms down to 280ms using Redis caching.', highlight: 'Performance Gain' },
        { id: 'tr-2', speaker: 'Alex Johnson', avatar: 'AJ', time: '10:15 AM', text: 'That is fantastic. The UI streaming pulse indicator looks much smoother now.', highlight: null },
        { id: 'tr-3', speaker: 'Elena Rostova', avatar: 'ER', time: '10:16 AM', text: 'Let us approve HNSW indexing for all workspace vector embeddings.', highlight: 'Key Decision' }
      ],
      collaborativeNotes: '## AI Copilot UX Sync Notes\n- Redis caching layer reduced latency by 37%.\n- HNSW indexing approved for production deployment.\n- Alex to finalize streaming animation tokens.',
      decisions: [
        { id: 'dec-1', title: 'Adopt HNSW Indexing for Vector Embeddings', reason: 'Reduces SLA query latency below 300ms benchmark target.', participants: ['Elena Rostova', 'Alex Johnson'], impact: 'High', project: 'AI Workflow Engine' }
      ],
      actionItems: [
        { id: 'act-1', title: 'Deploy Redis memory-mapped caching layer to staging', owner: 'David Kim', dueDate: 'Tomorrow', status: 'Pending', confidence: 99, taskCreated: false },
        { id: 'act-2', title: 'Finalize AI streaming pulse keyframe animation in tokens.css', owner: 'Alex Johnson', dueDate: 'Today', status: 'Pending', confidence: 96, taskCreated: true }
      ]
    },

    {
      id: 'mtg-103',
      title: 'Sprint 24 Planning & Backlog Grooming',
      category: 'Agile & Planning',
      status: 'completed',
      isNextUp: false,
      time: '04:00 PM – 04:45 PM',
      duration: '45m',
      organizer: { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
      attendees: [
        { name: 'Alex Johnson', avatar: 'AJ', role: 'Lead Designer' },
        { name: 'Sarah Lin', avatar: 'SL', role: 'UX Engineer' },
        { name: 'David Kim', avatar: 'DK', role: 'Fullstack Dev' },
        { name: 'Marcus Chen', avatar: 'MC', role: 'Frontend Dev' }
      ],
      objective: 'Finalize story point estimates and ticket commitments for Sprint 24.',
      aiBriefing: '✨ AI Briefing: 12 backlog tickets pre-categorized by estimated story points.',
      linkedProject: 'Nova UI System (NOVA-101)',
      linkedTask: '',
      prepScore: 99,
      executiveSummary: 'Sprint 24 planning completed successfully. Team committed to 42 story points across 14 backlog tickets. Primary focus: Design System v2.0 Tokens and AI Copilot streaming stabilization.',
      decisions: [
        { id: 'dec-2', title: 'Sprint 24 Target Scope Approved (42 Story Points)', reason: 'All 14 prioritized tickets estimated and assigned.', participants: ['Alex Johnson', 'Sarah Lin', 'David Kim', 'Marcus Chen'], impact: 'High', project: 'Nova UI System' }
      ],
      actionItems: [
        { id: 'act-3', title: 'Create Sprint 24 release milestone in Gantt roadmap', owner: 'Sarah Lin', dueDate: 'Aug 01', status: 'Completed', confidence: 98, taskCreated: true }
      ],
      recording: { duration: '44m 12s', chapters: ['00:00 Intro & Velocity Review', '12:30 Backlog Grooming', '32:10 Capacity Allocation'] }
    }
  ]
};
