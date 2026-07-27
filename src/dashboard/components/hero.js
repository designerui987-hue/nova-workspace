/**
 * Welcome Hero Component — Section 1
 * Personalized greeting, date/weather, focus score indicator, active sprint status.
 */

export function renderWelcomeHero(data) {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const greetingTime = getGreetingTime();

  return `
    <div class="welcome-hero-card">
      <div class="hero-flex-wrapper">
        <div>
          <h1 class="hero-greeting">
            ${greetingTime}, <span class="user-name">${data.user.name.split(' ')[0]}</span>. 👋
          </h1>
          <p class="hero-subtext">
            Here is your daily focus plan. You have <strong>${data.todayFocusTasks.length} high-priority tasks</strong> and <strong>${data.upcomingMeetings.length} meetings</strong> today.
          </p>

          <div class="hero-stats-row">
            <div class="focus-score-ring" title="Calculated from completion rate & blocked items">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span>Focus Score: <strong>${data.user.focusScore}/100</strong></span>
            </div>

            <div class="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${dateStr}</span>
            </div>

            <div class="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"/></svg>
              <span>${data.user.weather}</span>
            </div>

            <div class="hero-pill-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>${data.user.activeSprint}</span>
            </div>
          </div>
        </div>

        <div style="text-align:right">
          <button class="top-nav-btn primary-create" id="hero-plan-day-btn">
            <span>✨ Ask AI to Plan Day</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function getGreetingTime() {
  const hr = new Date().getHours();
  if (hr < 12) return 'Good Morning';
  if (hr < 18) return 'Good Afternoon';
  return 'Good Evening';
}
