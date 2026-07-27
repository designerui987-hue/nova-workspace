import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main:        'index.html',
        dashboard:   'dashboard.html',
        projects:    'projects.html',
        tasks:       'tasks.html',
        documents:   'documents.html',
        meetings:    'meetings.html',
        aiWorkspace: 'ai-workspace.html',
        knowledge:   'knowledge.html',
        analytics:   'analytics.html',
        settings:    'settings.html',
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
