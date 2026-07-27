/**
 * Nova Workspace — Knowledge Hub Exact Mock Dataset
 * Matches the pixel-perfect layout from the design mockup.
 */

export const mockKnowledgeData = {
  user: {
    name: 'Alex Kim',
    email: 'alex.kim@acmecorp.com',
    role: 'Staff Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    workspaceName: 'Acme Corp'
  },

  metrics: {
    totalArticles: '2,842',
    totalArticlesChange: '↑ 12% this month',
    recentlyUpdated: '318',
    recentlyUpdatedChange: '↑ 8% this week',
    popularArticles: '1,207',
    popularBadge: '🔥 Top 10%',
    aiGenerated: '432',
    aiBadge: '✨ 15% of content',
    outdatedContent: '86',
    outdatedBadge: '⚠️ Needs review',
    verifiedKnowledge: '2,156',
    verifiedBadge: '✓ 76% verified',
    healthScore: 92,
    healthRating: 'Excellent'
  },

  actionCards: [
    { id: 'act-create', title: 'Create Article', subtitle: 'Start writing', icon: '✏️' },
    { id: 'act-ai', title: 'Generate with AI', subtitle: 'Create from anything', icon: '✨' },
    { id: 'act-categories', title: 'Browse Categories', subtitle: 'Explore collections', icon: '🗂️' },
    { id: 'act-ask', title: 'Ask AI', subtitle: 'Get instant answers', icon: '💬' }
  ],

  sidebarShortcuts: [
    { id: 'sc-1', title: 'Engineering Wiki', icon: '⚙️', pinned: false },
    { id: 'sc-2', title: 'Product Docs', icon: '📘', pinned: true },
    { id: 'sc-3', title: 'Design System', icon: '🎨', pinned: true },
    { id: 'sc-4', title: 'Decision Log', icon: '⚖️', pinned: true },
    { id: 'sc-5', title: 'Onboarding Guide', icon: '🚀', pinned: true }
  ],

  collections: [
    { id: 'col-1', title: 'Engineering', count: '572 articles', owner: 'Alex Kim', score: 95, icon: '⚙️', iconBg: '#6e4aff' },
    { id: 'col-2', title: 'Product', count: '438 articles', owner: 'Sarah Chen', score: 92, icon: '📦', iconBg: '#ef4444' },
    { id: 'col-3', title: 'Design', count: '312 articles', owner: 'Mia Johnson', score: 90, icon: '🎨', iconBg: '#f59e0b' },
    { id: 'col-4', title: 'Marketing', count: '289 articles', owner: 'David Lee', score: 88, icon: '📢', iconBg: '#3b82f6' },
    { id: 'col-5', title: 'Operations', count: '245 articles', owner: 'Priya Patel', score: 87, icon: '⚙️', iconBg: '#06b6d4' }
  ],

  graphNodes: {
    center: { label: 'Knowledge Article', count: '', color: '#8b5cf6' },
    orbitNodes: [
      { label: 'Projects', count: '24', icon: '📁', color: '#06b6d4', pos: { top: '18%', left: '42%' } },
      { label: 'Meetings', count: '18', icon: '📅', color: '#f59e0b', pos: { top: '26%', right: '28%' } },
      { label: 'People', count: '47', icon: '👤', color: '#10b981', pos: { top: '48%', right: '22%' } },
      { label: 'Documents', count: '162', icon: '📄', color: '#3b82f6', pos: { bottom: '26%', right: '26%' } },
      { label: 'Decisions', count: '31', icon: '⚖️', color: '#d97706', pos: { bottom: '18%', right: '44%' } },
      { label: 'Policies', count: '9', icon: '📜', color: '#ef4444', pos: { bottom: '20%', left: '38%' } },
      { label: 'APIs', count: '12', icon: '🔌', color: '#a855f7', pos: { bottom: '38%', left: '26%' } },
      { label: 'Tasks', count: '74', icon: '☑️', color: '#14b8a6', pos: { top: '40%', left: '22%' } }
    ]
  },

  recentActivity: [
    { id: 'act-1', title: 'Authentication System Guide', action: 'Updated by Alex Kim', time: '2m ago', icon: '📘' },
    { id: 'act-2', title: 'Q2 Product Strategy', action: 'Commented by Sarah Chen', time: '15m ago', icon: '📦' },
    { id: 'act-3', title: 'Architecture Decision: API Gateway', action: 'New decision recorded', time: '1h ago', icon: '⚖️' },
    { id: 'act-4', title: 'Design System v2.0', action: 'Updated by Mia Johnson', time: '3h ago', icon: '🎨' },
    { id: 'act-5', title: 'Onboarding Flow Documentation', action: 'Verified by AI', time: '5h ago', icon: '✓' }
  ],

  topExperts: [
    { id: 'exp-1', name: 'Alex Kim', role: 'Staff Engineer', score: 95 },
    { id: 'exp-2', name: 'Sarah Chen', role: 'Product Manager', score: 93 },
    { id: 'exp-3', name: 'Mia Johnson', role: 'Lead Designer', score: 92 },
    { id: 'exp-4', name: 'David Lee', role: 'Engineering Manager', score: 90 },
    { id: 'exp-5', name: 'Priya Patel', role: 'Head of Operations', score: 89 }
  ],

  trendingArticles: [
    {
      id: 'art-1',
      title: 'Authentication System Overview',
      subtitle: 'How our auth system works end-to-end',
      category: 'Engineering',
      categoryColor: '#3b82f6',
      views: '2.3k',
      lastUpdated: '2h ago',
      health: '95%',
      icon: '🔐'
    },
    {
      id: 'art-2',
      title: 'Q2 Product Strategy',
      subtitle: 'Strategy and roadmap for Q2 2024',
      category: 'Product',
      categoryColor: '#f59e0b',
      views: '1.8k',
      lastUpdated: '1d ago',
      health: '92%',
      icon: '📦'
    },
    {
      id: 'art-3',
      title: 'Design System v2.0',
      subtitle: 'Components, tokens, and guidelines',
      category: 'Design',
      categoryColor: '#ec4899',
      views: '1.5k',
      lastUpdated: '3h ago',
      health: '90%',
      icon: '🎨'
    },
    {
      id: 'art-4',
      title: 'API Documentation',
      subtitle: 'Complete API reference and guides',
      category: 'Engineering',
      categoryColor: '#3b82f6',
      views: '1.2k',
      lastUpdated: '5h ago',
      health: '89%',
      icon: '🔌'
    }
  ],

  aiAssistant: {
    userQuery: 'How does our authentication system work?',
    aiResponse: {
      citationTitle: 'Authentication System Overview',
      citationMeta: 'Updated 2h ago • 95% confidence',
      summaryText: 'The system uses JWT tokens with refresh tokens, supports SSO via SAML, and integrates with Okta.',
      keyComponents: [
        { label: 'Frontend', val: 'React + Auth0 SDK' },
        { label: 'Backend', val: 'Node.js + Express' },
        { label: 'Database', val: 'PostgreSQL' },
        { label: 'Cache', val: 'Redis' }
      ],
      relatedResources: [
        { title: 'Architecture Diagram', subtitle: 'System Architecture', icon: '📐' },
        { title: 'API Documentation', subtitle: 'Authentication Endpoints', icon: '📄' },
        { title: 'Security Policy', subtitle: 'Authentication & Authorization', icon: '🔒' }
      ],
      suggestedPrompts: [
        'Show related decisions',
        'Who owns this system?',
        'Create a how-to guide'
      ]
    }
  }
};
