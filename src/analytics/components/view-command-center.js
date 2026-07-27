/**
 * Analytics View 1 — Executive Command Center Component
 * High-level productivity metrics, velocity trend visualizations, and KPI card grids.
 */

import { renderKPIGrid } from './kpi-grid.js';

export function renderViewCommandCenter(data) {
  const kpiHtml = renderKPIGrid(data.kpiCards);

  return `
    <div style="padding-top:var(--s-4);display:flex;flex-direction:column;gap:var(--s-6)">
      ${kpiHtml}

      <div class="dashboard-grid-12">
        <!-- Left Column (8 Cols): Velocity & Productivity Trends -->
        <div class="col-span-8" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <div class="dash-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <div class="ws-icon-box" style="background:rgba(110,74,255,0.15);color:#6e4aff">📊</div>
                <div>
                  <h2 class="card-title">Sprint Velocity & Workload Throughput</h2>
                  <div class="card-subtitle">Sprint 20 – Sprint 24 Velocity Trends</div>
                </div>
              </div>
            </div>

            <!-- Simulated SVG Bar Chart -->
            <div style="height:220px;display:flex;align-items:flex-end;gap:var(--s-6);padding:var(--s-4) 0;border-bottom:1px solid var(--border-1)">
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
                <div style="width:100%;height:120px;background:var(--v-600);border-radius:6px;position:relative">
                  <span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700;color:var(--text-1)">28 Pts</span>
                </div>
                <span style="font-size:11px;color:var(--text-3)">Sprint 20</span>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
                <div style="width:100%;height:140px;background:var(--v-600);border-radius:6px;position:relative">
                  <span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700;color:var(--text-1)">32 Pts</span>
                </div>
                <span style="font-size:11px;color:var(--text-3)">Sprint 21</span>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
                <div style="width:100%;height:160px;background:var(--v-600);border-radius:6px;position:relative">
                  <span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700;color:var(--text-1)">36 Pts</span>
                </div>
                <span style="font-size:11px;color:var(--text-3)">Sprint 22</span>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
                <div style="width:100%;height:170px;background:var(--v-600);border-radius:6px;position:relative">
                  <span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:700;color:var(--text-1)">38 Pts</span>
                </div>
                <span style="font-size:11px;color:var(--text-3)">Sprint 23</span>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
                <div style="width:100%;height:190px;background:linear-gradient(135deg,#6e4aff 0%,#06b6d4 100%);border-radius:6px;position:relative;box-shadow:0 0 16px rgba(110,74,255,0.4)">
                  <span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:11px;font-weight:800;color:var(--v-300)">42 Pts</span>
                </div>
                <span style="font-size:11px;font-weight:700;color:var(--v-300)">Sprint 24 (Active)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (4 Cols): Focus vs Meeting Distribution -->
        <div class="col-span-4" style="display:flex;flex-direction:column;gap:var(--s-6)">
          <div class="dash-card">
            <h3 style="font-size:14px;font-weight:700;color:var(--text-1);margin-bottom:var(--s-4)">Focus vs Meeting Distribution</h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-bottom:4px">
                  <span>Deep Work Focus</span>
                  <strong>68% (5.4h/day)</strong>
                </div>
                <div style="height:8px;background:var(--border-1);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:68%;background:var(--v-500)"></div>
                </div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-bottom:4px">
                  <span>Meetings & Syncs</span>
                  <strong>22% (1.8h/day)</strong>
                </div>
                <div style="height:8px;background:var(--border-1);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:22%;background:var(--c-400)"></div>
                </div>
              </div>
              <div>
                <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-2);margin-bottom:4px">
                  <span>Context Switching</span>
                  <strong>10% (0.8h/day)</strong>
                </div>
                <div style="height:8px;background:var(--border-1);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:10%;background:#f59e0b"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
