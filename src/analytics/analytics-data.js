/**
 * Nova Workspace — Analytics & Executive Command Center Dataset
 * Enterprise analytics dataset (KPIs, Team Performance, OKRs, Risk Forecasts, Reports).
 */

export const mockAnalyticsData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Chief Product Officer',
    avatar: 'AJ'
  },

  metrics: {
    orgHealthScore: 94,
    orgHealthRating: 'Excellent',
    aiConfidence: 99,
    sprintVelocity: '42 Pts',
    velocityChange: '↑ 14% vs last sprint',
    tasksCompleted: 142,
    tasksChange: '↑ 12% this week',
    aiAdoption: '88%',
    aiAdoptionChange: '↑ 15% this month',
    knowledgeGrowth: '572 Articles',
    knowledgeChange: '↑ 8% growth',
    throughput: '94%',
    meetingLoad: '3.5 hrs/day',
    meetingLoadChange: '↓ 12% reduced load',
    automationHoursSaved: '184 hrs/mo'
  },

  kpiCards: [
    { title: 'Sprint Velocity', val: '42 Pts', change: '↑ 14%', isUp: true, color: '#6e4aff', desc: 'Story points completed per 2-week cycle' },
    { title: 'Tasks Completed', val: '142', change: '↑ 12%', isUp: true, color: '#22c55e', desc: 'Resolved issues and backlog tasks' },
    { title: 'AI Copilot Adoption', val: '88%', change: '↑ 15%', isUp: true, color: '#06b6d4', desc: 'Active team members leveraging Nova AI' },
    { title: 'Meeting Load', val: '3.5h', change: '↓ 12%', isUp: true, color: '#f59e0b', desc: 'Average daily meeting time per engineer' },
    { title: 'Knowledge Growth', val: '572', change: '↑ 8%', isUp: true, color: '#a855f7', desc: 'Verified articles and wiki pages' },
    { title: 'Automation Hours Saved', val: '184h', change: '↑ 24%', isUp: true, color: '#34d399', desc: 'Time saved via automated AI workflows' }
  ],

  teamPerformance: [
    { department: 'Engineering', velocity: 95, capacity: '92%', burnoutRisk: 'Low', scoreColor: '#22c55e' },
    { department: 'Product Management', velocity: 92, capacity: '88%', burnoutRisk: 'Low', scoreColor: '#22c55e' },
    { department: 'Product Design', velocity: 90, capacity: '94%', burnoutRisk: 'Medium', scoreColor: '#f59e0b' },
    { department: 'Marketing', velocity: 88, capacity: '85%', burnoutRisk: 'Low', scoreColor: '#3b82f6' },
    { department: 'Operations', velocity: 87, capacity: '86%', burnoutRisk: 'Low', scoreColor: '#06b6d4' }
  ],

  okrs: [
    {
      id: 'okr-1',
      title: 'Q3 Objective 1: Deliver Nova Design System v2.0 & Token Architecture',
      progress: 88,
      owner: 'Alex Johnson',
      status: 'On Track',
      statusColor: '#22c55e',
      keyResults: [
        { name: 'Export tokens.json for Figma Webhooks', progress: 100 },
        { name: 'Verify WCAG AA 4.5:1 contrast across all components', progress: 90 }
      ]
    },
    {
      id: 'okr-2',
      title: 'Q3 Objective 2: Reduce Copilot Streaming Vector Query SLA below 300ms',
      progress: 95,
      owner: 'Elena Rostova',
      status: 'Achieved',
      statusColor: '#22c55e',
      keyResults: [
        { name: 'Implement HNSW indexing for vector embeddings', progress: 100 },
        { name: 'Provision Redis memory-mapped caching layer', progress: 90 }
      ]
    }
  ],

  reportTemplates: [
    { id: 'rep-exec', title: 'Executive Weekly Brief', description: 'High-level executive overview of sprint velocity, risks, and health scores.', icon: '📊' },
    { id: 'rep-sprint', title: 'Sprint 24 Velocity Audit', description: 'Burndown analysis, completed tickets, and team capacity allocation.', icon: '⚡' },
    { id: 'rep-ai', title: 'AI Copilot Adoption & ROI Report', description: 'Detailed breakdown of AI usage, hours saved, and quality metrics.', icon: '✨' }
  ]
};
