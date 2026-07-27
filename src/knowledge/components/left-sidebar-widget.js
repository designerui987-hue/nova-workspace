/**
 * Left Sidebar Knowledge Health & Shortcuts Widget Component
 * Displays Knowledge Health score sparkline + pinned shortcuts.
 */

export function renderLeftSidebarWidget(data) {
  return `
    <div style="margin-top:auto;padding-top:16px;display:flex;flex-direction:column;gap:16px">
      <!-- Knowledge Health Widget -->
      <div style="background:#0f1523;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px">
        <div style="font-size:11px;color:#64748b;font-weight:600">Knowledge Health</div>
        <div style="display:flex;align-items:baseline;gap:6px;margin:4px 0">
          <span style="font-size:20px;font-weight:800;color:#f8fafc">92</span>
          <span style="font-size:11px;color:#64748b">/100</span>
          <span style="font-size:11px;font-weight:700;color:#10b981;margin-left:auto">Excellent</span>
        </div>

        <svg width="100%" height="24" viewBox="0 0 100 24" fill="none">
          <path d="M0 18 Q 20 22, 40 10 T 80 14 T 100 4" stroke="#10b981" stroke-width="2" fill="none" />
        </svg>

        <a href="#" style="font-size:11px;color:#6e4aff;text-decoration:none;font-weight:600;display:block;margin-top:4px">View full report →</a>
      </div>

      <!-- Shortcuts -->
      <div>
        <div style="font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px">Shortcuts</div>
        <div style="display:flex;flex-direction:column;gap:4px">
          ${data.sidebarShortcuts.map(sc => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:5px 8px;border-radius:6px;font-size:12px;color:#cbd5e1;cursor:pointer">
              <div style="display:flex;align-items:center;gap:8px">
                <span>${sc.icon}</span>
                <span>${sc.title}</span>
              </div>
              ${sc.pinned ? `<span style="font-size:10px;color:#64748b">📌</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
