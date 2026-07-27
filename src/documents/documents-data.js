/**
 * Nova Workspace — Documents Dataset
 * Rich enterprise dataset for AI-native Documents, Block Editor content, Knowledge Graph links, and Templates.
 */

export const mockDocumentsData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ'
  },

  metrics: {
    totalDocs: 18,
    favorites: 5,
    shared: 12,
    drafts: 4,
    published: 14,
    aiGenerated: 6,
    avgReadingTime: '4.2 mins'
  },

  templates: [
    { id: 'tpl-prd', title: 'Product Requirements Document (PRD)', icon: '📄', description: 'Standard PRD layout with target metrics, user stories, and acceptance criteria.', category: 'Product' },
    { id: 'tpl-tech', title: 'Technical Architecture Specification', icon: '🧠', description: 'System design spec with API contracts, database schemas, and latency SLAs.', category: 'Engineering' },
    { id: 'tpl-notes', title: 'Meeting Notes & Action Items', icon: '📝', description: 'Meeting agenda template with AI automated action item extraction.', category: 'Meetings' },
    { id: 'tpl-wiki', title: 'Company Wiki & Team Onboarding', icon: '🌐', description: 'Centralized knowledge hub for team processes, guidelines, and tools.', category: 'Wiki' },
    { id: 'tpl-retro', title: 'Sprint Retrospective Log', icon: '🔄', description: 'What went well, what to improve, and action items for next sprint.', category: 'Agile' }
  ],

  documents: [
    {
      id: 'doc-101',
      title: 'Nova Design System v2.0 CSS Token Architecture Spec',
      icon: '🎨',
      cover: 'linear-gradient(135deg, #6e4aff 0%, #a855f7 100%)',
      category: 'Design System',
      status: 'Published',
      statusColor: '#22c55e',
      author: { name: 'Alex Johnson', avatar: 'AJ' },
      collaborators: [
        { name: 'Alex Johnson', avatar: 'AJ' },
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'Marcus Chen', avatar: 'MC' }
      ],
      readingTime: '5 min read',
      updatedAt: '12 min ago',
      version: 'v2.1',
      isFavorite: true,
      linkedProjects: ['Nova UI System (NOVA-101)'],
      linkedTasks: ['NOVA-101-1 Finalize CSS Tokens'],
      linkedMeetings: ['Design System Component Architecture Sync'],
      aiQualityScore: 98,
      blocks: [
        { type: 'callout', text: '✨ Nova AI Spec Analysis: 100% compliant with WCAG 2.1 AA accessibility guidelines and dark mode tokens.' },
        { type: 'heading1', text: '1. Executive Summary' },
        { type: 'paragraph', text: 'This document defines the single-source-of-truth CSS custom property architecture for Nova Workspace 2.0. It encompasses semantic color ramps, elevation states, typography scales, and motion tokens.' },
        { type: 'heading2', text: '2. Token Naming Hierarchy' },
        { type: 'paragraph', text: 'All design tokens follow the 3-tier taxonomy: Namespace (var(--bg-)), Context (-surface, -elevated), and State (-hover, -active).' },
        { type: 'code', text: '/* Global Token Sample */\n:root {\n  --bg-base: #09090f;\n  --bg-surface: #0d0d1a;\n  --v-500: #6e4aff;\n  --text-1: #f8fafc;\n}' },
        { type: 'heading2', text: '3. Accessibility & Contrast SLA' },
        { type: 'checklist', text: 'Pass WCAG 2.1 AA 4.5:1 text contrast for all theme colors', completed: true },
        { type: 'checklist', text: 'Export tokens.json for Figma Tokens Webhook sync', completed: true },
        { type: 'checklist', text: 'Verify dark mode elevation shadow tokens in Safari', completed: false }
      ],
      comments: [
        { id: 'dc-1', user: { name: 'Marcus Chen', avatar: 'MC' }, text: 'Token structure looks rock solid. Importing directly into CSS build.', time: '10 min ago' }
      ]
    },

    {
      id: 'doc-102',
      title: 'AI Copilot Context Window & Memory Technical Spec',
      icon: '🧠',
      cover: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      category: 'Technical Spec',
      status: 'In Review',
      statusColor: '#f59e0b',
      author: { name: 'Elena Rostova', avatar: 'ER' },
      collaborators: [
        { name: 'Elena Rostova', avatar: 'ER' },
        { name: 'Alex Johnson', avatar: 'AJ' }
      ],
      readingTime: '8 min read',
      updatedAt: '1 hour ago',
      version: 'v1.4',
      isFavorite: true,
      linkedProjects: ['AI Workflow Engine (NOVA-202)'],
      linkedTasks: ['NOVA-202-1 Vector Embedding Latency'],
      linkedMeetings: ['AI Copilot Architecture Review'],
      aiQualityScore: 94,
      blocks: [
        { type: 'heading1', text: '1. Streaming Pipeline Architecture' },
        { type: 'paragraph', text: 'Detailed breakdown of the Server-Sent Events (SSE) streaming model used for real-time AI response rendering.' }
      ],
      comments: []
    },

    {
      id: 'doc-103',
      title: 'Sprint 23 Retrospective & Key Accomplishments',
      icon: '📝',
      cover: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
      category: 'Meeting Summary',
      status: 'Published',
      statusColor: '#22c55e',
      author: { name: 'Nova AI Assistant', avatar: '🤖', isAI: true },
      collaborators: [
        { name: 'Sarah Lin', avatar: 'SL' },
        { name: 'David Kim', avatar: 'DK' }
      ],
      readingTime: '3 min read',
      updatedAt: 'Yesterday',
      version: 'v1.0',
      isFavorite: false,
      linkedProjects: ['Nova UI System'],
      linkedTasks: [],
      linkedMeetings: ['Sprint 23 Retro Meeting'],
      aiQualityScore: 99,
      blocks: [
        { type: 'paragraph', text: 'Synthesized from 45-minute recording into 5 key action items and team velocity metrics.' }
      ],
      comments: []
    }
  ]
};
