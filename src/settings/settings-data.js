/**
 * Nova Workspace — Admin & Settings Dataset
 * Enterprise administration dataset (User directory, RBAC matrix, Security audit, AI governance, Audit logs).
 */

export const mockSettingsData = {
  organization: {
    name: 'Acme Corp',
    domain: 'acmecorp.nova.app',
    plan: 'Enterprise SaaS Plan',
    planBadge: 'Enterprise',
    seatsUsed: 142,
    totalSeats: 200,
    storageUsedGB: 128,
    totalStorageGB: 1000,
    securityScore: 98,
    complianceStatus: 'SOC2 Type II & GDPR Compliant'
  },

  metrics: {
    totalUsers: 142,
    activeTeams: 8,
    securityScore: 98,
    twoFactorAdoption: '96%',
    ssoProvider: 'Okta SAML 2.0',
    auditEvents24h: 312
  },

  users: [
    { id: 'usr-1', name: 'Alex Johnson', email: 'alex.johnson@acmecorp.com', role: 'Owner', department: 'Design', status: 'Active', authMethod: 'Okta SSO', avatar: 'AJ' },
    { id: 'usr-2', name: 'Sarah Lin', email: 'sarah.lin@acmecorp.com', role: 'Admin', department: 'Engineering', status: 'Active', authMethod: 'Okta SSO', avatar: 'SL' },
    { id: 'usr-3', name: 'Elena Rostova', email: 'elena.rostova@acmecorp.com', role: 'Admin', department: 'AI Engineering', status: 'Active', authMethod: 'Okta SSO', avatar: 'ER' },
    { id: 'usr-4', name: 'Marcus Chen', email: 'marcus.chen@acmecorp.com', role: 'Member', department: 'Frontend', status: 'Active', authMethod: 'Google OAuth', avatar: 'MC' },
    { id: 'usr-5', name: 'David Kim', email: 'david.kim@acmecorp.com', role: 'Member', department: 'Backend', status: 'Active', authMethod: 'Okta SSO', avatar: 'DK' }
  ],

  rbacMatrix: [
    { module: 'Projects & Timelines', owner: true, admin: true, manager: true, member: true, guest: false },
    { module: 'Tasks & Kanban', owner: true, admin: true, manager: true, member: true, guest: true },
    { module: 'Documents & Specs', owner: true, admin: true, manager: true, member: true, guest: false },
    { module: 'Meetings & Huddle', owner: true, admin: true, manager: true, member: true, guest: false },
    { module: 'AI Copilot & Workflows', owner: true, admin: true, manager: true, member: true, guest: false },
    { module: 'Admin & Billing Settings', owner: true, admin: true, manager: false, member: false, guest: false }
  ],

  aiGovernance: {
    enabledModels: ['GPT-4o (Default)', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'],
    dataPolicy: 'Zero Data Retraining (Enterprise Isolation)',
    promptRetention: '30-Day Encrypted Retention',
    allowedTools: ['Vector Search', 'Task Execution', 'Doc Generation', 'Meeting Transcripts']
  },

  auditLogs: [
    { id: 'log-1', action: 'User Login Succeeded', user: 'Alex Johnson', time: '10 min ago', ip: '192.168.1.1', status: 'Success' },
    { id: 'log-2', action: 'RBAC Permission Role Updated', user: 'Sarah Lin', time: '1 hour ago', ip: '192.168.1.4', status: 'Success' },
    { id: 'log-3', action: 'Production API Key Rotated', user: 'Elena Rostova', time: '3 hours ago', ip: '192.168.1.8', status: 'Success' },
    { id: 'log-4', action: 'Redis Memory Infrastructure Scaled', user: 'Nova AI Copilot', time: '5 hours ago', ip: '10.0.0.1', status: 'Success' }
  ],

  integrations: [
    { id: 'int-gh', title: 'GitHub Enterprise', status: 'Connected', icon: '🐙', desc: 'Sync PRs, commits, and issue trackers.' },
    { id: 'int-slack', title: 'Slack Workspace', status: 'Connected', icon: '💬', desc: 'Receive real-time notifications & meeting summaries.' },
    { id: 'int-figma', title: 'Figma Design', status: 'Connected', icon: '🎨', desc: 'Sync design components & token variables.' },
    { id: 'int-jira', title: 'Jira Software', status: 'Connected', icon: '📐', desc: 'Import tickets & sync sprint progress.' }
  ],

  apiKeys: [
    { id: 'key-1', name: 'Production Backend SDK Key', prefix: 'nova_live_sec_9948...', created: 'Jul 01, 2026', lastUsed: '5 min ago' },
    { id: 'key-2', name: 'Figma Tokens Webhook Key', prefix: 'nova_live_sec_4021...', created: 'Jul 15, 2026', lastUsed: '1 hour ago' }
  ]
};
