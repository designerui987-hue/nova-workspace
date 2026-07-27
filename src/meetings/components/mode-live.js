/**
 * Meetings Mode 2 — Live Meeting Workspace Component (Granola / Fathom / Zoom Inspired)
 * Participant video grid, real-time transcript streaming, collaborative notes, and sticky controls.
 */

export function renderModeLive(mtg) {
  return `
    <div style="padding-top:var(--s-4)">
      <div class="live-meeting-container">
        <!-- Live Header Bar -->
        <div class="live-header-bar">
          <div style="display:flex;align-items:center;gap:12px">
            <span class="live-pulse-badge">● LIVE HUDDLE</span>
            <span style="font-size:16px;font-weight:800;color:var(--text-1)">${mtg.title}</span>
          </div>

          <div style="display:flex;align-items:center;gap:16px">
            <div style="font-size:20px;font-weight:800;font-family:var(--font-mono);color:var(--text-1)">
              ⏱ ${mtg.timerDisplay || '18:42'}
            </div>
            <button class="top-nav-btn" id="leave-live-huddle-btn" style="background:#ef4444;color:white;border:none;height:32px;font-size:12px">
              <span>Leave Huddle</span>
            </button>
          </div>
        </div>

        <div class="dashboard-grid-12">
          <!-- Left Column (7 Cols): Video Grid & Real-time Transcript -->
          <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-4)">
            <!-- Participant Video Cards -->
            <div class="participant-grid-row">
              ${mtg.attendees.map(a => `
                <div class="participant-video-card ${a.isSpeaking ? 'speaking' : ''}">
                  ${a.isSpeaking ? `<div class="speaking-pulse-ring"></div>` : ''}
                  <div class="member-avatar-mini" style="width:54px;height:54px;font-size:20px">${a.avatar}</div>
                  <div style="font-size:12px;font-weight:600;color:var(--text-1);margin-top:8px">${a.name}</div>
                  <div style="font-size:10px;color:var(--text-4)">${a.isSpeaking ? '🔊 Speaking...' : a.muted ? '🔇 Muted' : 'Microphone Active'}</div>
                </div>
              `).join('')}
            </div>

            <!-- Real-Time AI Transcript Stream -->
            <div class="dash-card">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
                <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--text-1)">
                  <span>✨ Real-Time AI Transcript Stream</span>
                  <span class="auth-preview-pill pill-violet" style="font-size:9px">AUTO-HIGHLIGHTING</span>
                </div>
              </div>

              <div class="transcript-stream-box" id="live-transcript-stream-box">
                ${mtg.transcript ? mtg.transcript.map(tr => `
                  <div class="transcript-line-item">
                    <div class="member-avatar-mini" style="width:24px;height:24px;font-size:9px;flex-shrink:0">${tr.avatar}</div>
                    <div style="flex:1">
                      <div style="display:flex;align-items:center;gap:8px">
                        <strong style="font-size:12px;color:var(--text-1)">${tr.speaker}</strong>
                        <span style="font-size:10px;color:var(--text-4)">${tr.time}</span>
                        ${tr.highlight ? `<span class="auth-preview-pill pill-green" style="font-size:9px">${tr.highlight}</span>` : ''}
                      </div>
                      <div style="font-size:13px;color:var(--text-2);margin-top:2px">${tr.text}</div>
                    </div>
                  </div>
                `).join('') : '<div style="font-size:12px;color:var(--text-3)">Streaming live transcript...</div>'}
              </div>
            </div>
          </div>

          <!-- Right Column (5 Cols): Shared Notes & Live Action Items -->
          <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-4)">
            <div class="dash-card">
              <h3 style="font-size:14px;font-weight:700;color:var(--text-1);margin-bottom:var(--s-3)">Shared Collaborative Notes</h3>
              <textarea class="form-textarea" style="height:180px;font-size:12px;font-family:var(--font-mono)" id="live-notes-area">${mtg.collaborativeNotes || ''}</textarea>
            </div>

            <div class="dash-card">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-3)">
                <h3 style="font-size:14px;font-weight:700;color:var(--text-1)">Extracted Action Items</h3>
                <span class="auth-preview-pill pill-green" style="font-size:10px">${mtg.actionItems ? mtg.actionItems.length : 0} Items</span>
              </div>

              <div style="display:flex;flex-direction:column;gap:6px">
                ${mtg.actionItems ? mtg.actionItems.map(act => `
                  <div style="background:var(--bg-elevated);padding:8px 10px;border-radius:6px;border:1px solid var(--border-1);font-size:12px">
                    <div style="font-weight:600;color:var(--text-1)">${act.title}</div>
                    <div style="font-size:10px;color:var(--text-3);margin-top:2px">Assigned to: ${act.owner} • Due: ${act.dueDate}</div>
                  </div>
                `).join('') : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Sticky Controls Bar -->
        <div class="sticky-meeting-controls">
          <button class="ctrl-round-btn" id="btn-toggle-mic" title="Mute Microphone">🎤</button>
          <button class="ctrl-round-btn" id="btn-toggle-cam" title="Toggle Camera">📹</button>
          <button class="ctrl-round-btn" id="btn-share-screen" title="Share Screen">🖥️</button>
          <button class="ctrl-round-btn" id="btn-ai-assist" title="Ask AI Co-Pilot">✨</button>
          <button class="ctrl-round-btn leave-btn" id="btn-end-huddle" title="Leave Huddle">📞</button>
        </div>
      </div>
    </div>
  `;
}
