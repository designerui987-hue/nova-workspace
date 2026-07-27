/**
 * Nova Workspace — AI Workspace Dataset
 * Enterprise AI Operating System dataset (Conversations, Thinking Steps, Memory Store, Workflows, Action Cards).
 */

export const mockAIWorkspaceData = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@nova.app',
    role: 'Lead Product Designer',
    avatar: 'AJ',
    focusScore: 98
  },

  metrics: {
    indexedProjects: 12,
    indexedTasks: 45,
    indexedDocs: 18,
    indexedMeetings: 14,
    aiAccuracyScore: 99,
    actionsExecutedToday: 7
  },

  memories: [
    { id: 'mem-1', text: 'Alex prefers concise executive summaries with bullet points and clear confidence ratings.', category: 'User Preference' },
    { id: 'mem-2', text: 'Sprint 24 commitment limit is 42 story points across 14 backlog tickets.', category: 'Agile Context' },
    { id: 'mem-3', text: 'Design System primary color ramp uses HSL tailored variables (--v-500: #6e4aff).', category: 'Design Tokens' }
  ],

  workflows: [
    { id: 'wf-1', title: 'Daily Standup Briefing', icon: '🎯', description: 'Aggregates yesterday achievements, today focus, and active blockers.', frequency: 'Daily at 9:00 AM' },
    { id: 'wf-2', title: 'Weekly Executive Report', icon: '📊', description: 'Generates milestone status reports for leadership with burndown forecasts.', frequency: 'Fridays at 4:00 PM' },
    { id: 'wf-3', title: 'Sprint Risk Detector', icon: '⚠️', description: 'Scans for delayed tasks, high complexity items, and resource bottlenecks.', frequency: 'Real-time' },
    { id: 'wf-4', title: 'Release Notes Generator', icon: '🚀', description: 'Converts completed tickets into formatted changelogs and documentation.', frequency: 'On Demand' }
  ],

  conversations: [
    {
      id: 'chat-1',
      title: 'Sprint 24 Workload & Risk Analysis',
      updatedAt: '10 min ago',
      messages: [
        {
          id: 'msg-1',
          sender: 'user',
          text: 'Can you analyze our current Sprint 24 workload, identify any blocked tasks, and suggest how to rebalance team capacity?',
          timestamp: '10:30 AM'
        },
        {
          id: 'msg-2',
          sender: 'assistant',
          timestamp: '10:30 AM',
          thinkingSteps: [
            '🔍 Querying workspace index for Sprint 24 active tasks...',
            '⚡ Found 1 blocked task: NOVA-202-1 Vector Embedding Latency',
            '📊 Calculating capacity allocation across Alex, Elena, and David Kim...'
          ],
          text: `Here is the AI Risk Analysis for Sprint 24:

### ⚠️ Active Blockers Detected
- **NOVA-202-1**: *Vector Embedding Latency* (Assigned to Elena Rostova) is currently blocked by Redis memory provisioning.

### 💡 Rebalancing Recommendation
1. Reassign **NOVA-101-4 (Audit Accessibility)** to David Kim to free up 3 hours for Alex Johnson.
2. Trigger automated Redis memory provisioning workflow via Nova Infrastructure Copilot.`,
          actionCard: {
            title: '⚡ Executive Action Ready',
            description: 'Reassign task NOVA-101-4 to David Kim and notify DevOps lead.',
            actionId: 'act-reassign-1',
            status: 'pending'
          }
        }
      ]
    },

    {
      id: 'chat-2',
      title: 'Design System CSS Tokens Spec Draft',
      updatedAt: '1 hour ago',
      messages: []
    },

    {
      id: 'chat-3',
      title: 'AI Copilot Latency SLA Optimization',
      updatedAt: 'Yesterday',
      messages: []
    }
  ]
};
