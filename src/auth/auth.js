/**
 * Nova Workspace — Complete Auth + Onboarding Engine
 *
 * Screens:
 *  1. login        — Sign in
 *  2. signup       — Create account
 *  3. verify       — Email verification (OTP)
 *  4. workspace    — Create workspace
 *  5. invite       — Invite team
 *  6. personalize  — Preferences
 *  7. success      — Ready!  →  Dashboard
 */

/* ============================================================
   STATE
   ============================================================ */
const S = {
  screen: 'login',         // current screen
  theme: localStorage.getItem('nova-theme') || 'dark',
  user: {
    name: '',
    email: '',
    password: '',
  },
  workspace: {
    name: '',
    slug: '',
    icon: '🚀',
    color: '#6b3fff',
    industry: '',
    teamSize: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    logoFile: null,
    logoPreview: null,
  },
  invite: {
    emails: [],  // [{ email, role }]
    draft: '',
    role: 'member',
  },
  prefs: {
    theme: 'dark',
    accent: '#6b3fff',
    layout: 'sidebar',
    notifications: true,
    calendar: false,
    aiName: 'Nova',
    aiHours: true,
  },
  otp: { values: ['','','','','',''], resend: 30, interval: null },
};

/* ============================================================
   INIT
   ============================================================ */
function init() {
  applyTheme(S.theme);
  route(S.screen);
}

function route(screen) {
  S.screen = screen;
  const app = document.getElementById('nova-app');

  // Fade out
  app.style.opacity = '0';
  app.style.transform = 'scale(0.99)';
  app.style.transition = 'opacity 120ms ease, transform 120ms ease';

  setTimeout(() => {
    app.innerHTML = renderScreen(screen);
    app.style.opacity = '1';
    app.style.transform = 'scale(1)';
    bindScreen(screen);
  }, 120);
}

function renderScreen(s) {
  switch (s) {
    case 'login':       return renderLogin();
    case 'signup':      return renderSignup();
    case 'verify':      return renderVerify();
    case 'workspace':   return renderWorkspace();
    case 'invite':      return renderInvite();
    case 'personalize': return renderPersonalize();
    case 'success':     return renderSuccess();
    default:            return renderLogin();
  }
}

function bindScreen(s) {
  bindThemeToggle();
  switch (s) {
    case 'login':       bindLogin();       break;
    case 'signup':      bindSignup();      break;
    case 'verify':      bindVerify();      break;
    case 'workspace':   bindWorkspace();   break;
    case 'invite':      bindInvite();      break;
    case 'personalize': bindPersonalize(); break;
    case 'success':     bindSuccess();     break;
  }
}

/* ============================================================
   THEME
   ============================================================ */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('nova-theme', t);
}

function toggleTheme() {
  S.theme = S.theme === 'dark' ? 'light' : 'dark';
  applyTheme(S.theme);
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.innerHTML = themeIcon();
}

function themeIcon() {
  return S.theme === 'dark'
    ? svg(`<circle cx="12" cy="12" r="4"/>
           <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`, 20)
    : svg(`<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>`, 20);
}

function bindThemeToggle() {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

/* ============================================================
   SHARED SVG / LOGO
   ============================================================ */
function svg(paths, size = 16, extra = '') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.75" stroke-linecap="round"
    stroke-linejoin="round" ${extra}>${paths}</svg>`;
}

function logoMark(size = 32) {
  return `<div class="auth-logo-mark" style="width:${size}px;height:${size}px;border-radius:${size*0.28}px">
    <svg width="${size*0.55}" height="${size*0.55}" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L21 8V16L12 21L3 16V8L12 3Z"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)" stroke-width="1.5"/>
      <path d="M7.5 11l4.5 3 4.5-3M12 14v5"
        stroke="rgba(255,255,255,0.9)" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  </div>`;
}

/* ============================================================
   ONBOARDING SHELL
   ============================================================ */
const ONBOARD_STEPS = [
  { id: 'workspace',   label: 'Workspace' },
  { id: 'invite',      label: 'Invite'    },
  { id: 'personalize', label: 'Personalize'},
];

function onboardShell(stepId, content) {
  const stepIdx = ONBOARD_STEPS.findIndex(s => s.id === stepId);
  const totalOnboard = ONBOARD_STEPS.length;
  const progressPct = Math.round(((stepIdx) / totalOnboard) * 100);

  const dots = ONBOARD_STEPS.map((step, i) => {
    const cls = i < stepIdx ? 'done' : i === stepIdx ? 'active' : '';
    return `
      ${i > 0 ? `<div class="step-connector"></div>` : ''}
      <div class="onboard-step">
        <div class="step-dot ${cls}"></div>
      </div>
    `;
  }).join('');

  return `
    <div class="onboard-shell">
      <div class="onboard-bg-mesh" aria-hidden="true"></div>

      <header class="onboard-topbar">
        <div class="onboard-logo">
          ${logoMark(28)}
          <span class="onboard-logo-name">Nova</span>
        </div>

        <div style="display:flex;align-items:center;gap:16px">
          <div class="onboard-steps" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressPct}" aria-label="Onboarding progress">
            ${dots}
          </div>
          <span class="onboard-step-count">${stepIdx + 1} of ${totalOnboard}</span>
        </div>

        <button class="theme-btn" aria-label="Toggle theme">${themeIcon()}</button>
      </header>

      <main class="onboard-body">
        ${content}
      </main>

      <div class="onboard-progress" aria-hidden="true">
        <div class="onboard-progress-bar" style="width:${progressPct}%"></div>
      </div>
    </div>
  `;
}

/* ============================================================
   AUTH SHELL (login / signup)
   ============================================================ */
function authShell(formContent, activeTab = 'login') {
  return `
    <div class="auth-shell">
      <!-- LEFT PANEL -->
      <aside class="auth-panel-left" aria-hidden="true">
        <div class="auth-bg-mesh"></div>
        <div class="auth-bg-noise"></div>
        <div class="auth-left-content">
          <div class="auth-logo">
            ${logoMark(38)}
            <span class="auth-logo-name">Nova</span>
          </div>

          <div class="auth-hero">
            <div class="auth-hero-eyebrow">
              <div class="auth-hero-eyebrow-dot"></div>
              AI-First Platform
            </div>
            <h1 class="auth-hero-title">
              The workspace that<br>
              <span class="gradient-text">thinks with you.</span>
            </h1>
            <p class="auth-hero-sub">
              Projects, documents, meetings, and AI — all in one beautifully unified workspace for modern teams.
            </p>

            <div class="auth-features">
              <div class="auth-feature-item">
                <div class="auth-feature-icon" style="background:rgba(107,63,255,0.15)">⚡</div>
                <span class="auth-feature-text">AI writes, summarizes, and plans for you</span>
              </div>
              <div class="auth-feature-item">
                <div class="auth-feature-icon" style="background:rgba(6,182,212,0.15)">🔗</div>
                <span class="auth-feature-text">Connect tasks, docs, meetings in one place</span>
              </div>
              <div class="auth-feature-item">
                <div class="auth-feature-icon" style="background:rgba(16,185,129,0.15)">📊</div>
                <span class="auth-feature-text">Real-time analytics across every project</span>
              </div>
            </div>
          </div>

          <!-- Floating product cards -->
          <div class="auth-cards-preview" style="margin-bottom:var(--s-6)">
            <div class="auth-card-float" style="top:0;left:0">
              <div class="auth-card-label">Sprint Progress</div>
              <div class="auth-card-value" style="margin-bottom:8px">24 of 36 tasks · 67%</div>
              <div style="height:4px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden">
                <div style="height:100%;width:67%;background:linear-gradient(90deg,var(--v-500),var(--c-400));border-radius:99px"></div>
              </div>
            </div>
            <div class="auth-card-float" style="top:20px;left:210px">
              <div class="auth-card-label">AI Assistant</div>
              <div class="auth-card-value" style="font-size:12px;color:rgba(255,255,255,0.5)">"Summarize the design review…"</div>
              <span class="auth-card-badge badge-violet" style="margin-top:8px">● Active</span>
            </div>
            <div class="auth-card-float" style="top:110px;left:80px">
              <div style="display:flex;align-items:center;gap:8px">
                <span class="auth-card-badge badge-green">● Live</span>
                <div class="auth-card-label" style="margin-bottom:0">Sprint Planning</div>
              </div>
              <div class="auth-card-value" style="margin-top:4px;font-size:12px">Tomorrow 10:00 AM · 8 attendees</div>
            </div>
          </div>

          <!-- Social proof -->
          <div class="auth-social-proof">
            <div class="auth-avatars">
              <div class="auth-avatar av-1">AK</div>
              <div class="auth-avatar av-2">ML</div>
              <div class="auth-avatar av-3">SR</div>
              <div class="auth-avatar av-4">PJ</div>
            </div>
            <div class="auth-social-text">
              Trusted by <strong>14,000+</strong> teams worldwide
            </div>
          </div>
        </div>
      </aside>

      <!-- RIGHT PANEL -->
      <main class="auth-panel-right">
        <button class="theme-btn" aria-label="Toggle theme">${themeIcon()}</button>

        <!-- Mobile logo -->
        <div class="auth-mobile-logo">
          ${logoMark(30)}
          <span class="auth-mobile-logo-name">Nova</span>
        </div>

        <div class="auth-form-box">
          <!-- Tabs -->
          <div class="auth-tabs" role="tablist" aria-label="Sign in or sign up">
            <div class="auth-tab ${activeTab === 'login' ? 'active' : ''}" role="tab"
              aria-selected="${activeTab === 'login'}" tabindex="0" data-tab="login" id="tab-login">
              Sign in
            </div>
            <div class="auth-tab ${activeTab === 'signup' ? 'active' : ''}" role="tab"
              aria-selected="${activeTab === 'signup'}" tabindex="0" data-tab="signup" id="tab-signup">
              Sign up
            </div>
          </div>

          ${formContent}
        </div>

        <nav class="form-legal" aria-label="Legal links">
          <a href="#" tabindex="0">Privacy</a>
          <div class="form-legal-sep" aria-hidden="true"></div>
          <a href="#" tabindex="0">Terms</a>
          <div class="form-legal-sep" aria-hidden="true"></div>
          <a href="#" tabindex="0">Security</a>
        </nav>
      </main>
    </div>
  `;
}

/* ============================================================
   SCREEN 1 — LOGIN
   ============================================================ */
function renderLogin() {
  return authShell(`
    <div class="form-head animate-fade-up">
      <div class="form-head-title">Welcome back</div>
      <div class="form-head-sub">Sign in to continue to your workspace.</div>
    </div>

    <!-- SSO -->
    <div class="sso-row animate-fade-up" style="animation-delay:60ms">
      <button class="btn-sso" id="sso-google" aria-label="Continue with Google">
        ${googleIcon()} Google
      </button>
      <button class="btn-sso" id="sso-github" aria-label="Continue with GitHub">
        ${githubIcon()} GitHub
      </button>
    </div>

    <div class="form-divider animate-fade-up" style="animation-delay:100ms">or</div>

    <form id="login-form" class="form-fields animate-fade-up" style="animation-delay:140ms" novalidate autocomplete="on">
      <div class="form-field">
        <label class="field-label" for="l-email">Email address</label>
        <div class="input-wrap">
          <div class="input-icon left">${svg('<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"/><path d="M22 6l-10 7L2 6"/>')}</div>
          <input class="form-input has-icon-l" type="email" id="l-email" name="email"
            placeholder="name@company.com" autocomplete="email" inputmode="email"
            value="${S.user.email}" required />
        </div>
        <div class="field-msg error" id="l-email-err" style="display:none"></div>
      </div>

      <div class="form-field">
        <label class="field-label" for="l-pw">
          Password
          <span class="field-label-link" id="forgot-link" role="button" tabindex="0">Forgot password?</span>
        </label>
        <div class="input-wrap">
          <input class="form-input has-icon-r" type="password" id="l-pw" name="password"
            placeholder="Enter your password" autocomplete="current-password" required />
          <div class="input-icon right" id="l-pw-toggle" role="button" tabindex="0" aria-label="Toggle password visibility">
            ${eyeIcon()}
          </div>
        </div>
        <div class="field-msg error" id="l-pw-err" style="display:none"></div>
      </div>

      <label class="check-wrap" for="l-remember">
        <input type="checkbox" id="l-remember" name="remember" />
        <div class="check-box">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4l3 3 5-6"/></svg>
        </div>
        <span class="check-label">Remember me for 30 days</span>
      </label>

      <button type="submit" class="btn btn-primary w-full" id="login-btn" style="height:48px">
        <span id="login-btn-inner">Sign in to Nova</span>
      </button>
    </form>

    <div class="form-footer animate-fade-up" style="animation-delay:180ms">
      Don't have an account?
      <span class="link" data-tab="signup" role="button" tabindex="0">Create account — it's free</span>
    </div>

    <div class="form-footer" style="margin-top:var(--s-2)">
      <span class="link" id="magic-link-trigger" role="button" tabindex="0">✨ Sign in with magic link</span>
    </div>
  `, 'login');
}

function bindLogin() {
  bindTabSwitchers();

  // SSO
  bindSSO('sso-google', 'Google');
  bindSSO('sso-github', 'GitHub');

  // Password toggle
  bindPwToggle('l-pw-toggle', 'l-pw');

  // Forgot
  document.getElementById('forgot-link')?.addEventListener('click', showForgotToast);
  document.getElementById('forgot-link')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') showForgotToast();
  });

  // Magic link
  document.getElementById('magic-link-trigger')?.addEventListener('click', showMagicToast);

  // Form submit
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = v('l-email'); const pw = v('l-pw');
    let valid = true;

    if (!isEmail(email)) {
      showErr('l-email-err', 'Please enter a valid email address.');
      cls('l-email', 'error'); valid = false;
    } else {
      cls('l-email', '-error');
      hide('l-email-err');
    }

    if (pw.length < 6) {
      showErr('l-pw-err', 'Password must be at least 6 characters.');
      cls('l-pw', 'error'); valid = false;
    } else {
      cls('l-pw', '-error');
      hide('l-pw-err');
    }

    if (!valid) return;

    const btn = document.getElementById('login-btn');
    const inner = document.getElementById('login-btn-inner');
    setLoading(btn, inner, true, 'Signing in…');

    S.user.email = email;
    await wait(1400);

    setLoading(btn, inner, false, 'Sign in to Nova');
    toast('success', 'Welcome back!', `Signed in as ${email}`);
    await wait(600);
    route('verify');
  });
}

/* ============================================================
   SCREEN 2 — SIGN UP
   ============================================================ */
function renderSignup() {
  return authShell(`
    <div class="form-head animate-fade-up">
      <div class="form-head-title">Create your account</div>
      <div class="form-head-sub">Start your 14-day free trial — no credit card needed.</div>
    </div>

    <!-- SSO -->
    <div class="sso-row animate-fade-up" style="animation-delay:60ms">
      <button class="btn-sso" id="sso-google" aria-label="Continue with Google">
        ${googleIcon()} Google
      </button>
      <button class="btn-sso" id="sso-github" aria-label="Continue with GitHub">
        ${githubIcon()} GitHub
      </button>
    </div>

    <div class="form-divider animate-fade-up" style="animation-delay:100ms">or continue with email</div>

    <form id="signup-form" class="form-fields animate-fade-up" style="animation-delay:140ms" novalidate autocomplete="off">
      <div class="form-field">
        <label class="field-label" for="s-name">Full name</label>
        <div class="input-wrap">
          <div class="input-icon left">${svg('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>')}</div>
          <input class="form-input has-icon-l" type="text" id="s-name" name="name"
            placeholder="Alex Johnson" autocomplete="name" required
            value="${S.user.name}" />
        </div>
        <div class="field-msg error" id="s-name-err" style="display:none"></div>
      </div>

      <div class="form-field">
        <label class="field-label" for="s-email">Work email</label>
        <div class="input-wrap">
          <div class="input-icon left">${svg('<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"/><path d="M22 6l-10 7L2 6"/>')}</div>
          <input class="form-input has-icon-l" type="email" id="s-email" name="email"
            placeholder="name@company.com" autocomplete="email" inputmode="email" required
            value="${S.user.email}" />
        </div>
        <div class="field-msg error" id="s-email-err" style="display:none"></div>
      </div>

      <div class="form-field">
        <label class="field-label" for="s-pw">Password</label>
        <div class="input-wrap">
          <input class="form-input has-icon-r" type="password" id="s-pw" name="password"
            placeholder="Minimum 8 characters" autocomplete="new-password" required />
          <div class="input-icon right" id="s-pw-toggle" role="button" tabindex="0" aria-label="Toggle password visibility">
            ${eyeIcon()}
          </div>
        </div>
        <div id="s-strength-mount"></div>
        <div class="field-msg error" id="s-pw-err" style="display:none"></div>
      </div>

      <div class="form-field">
        <label class="field-label" for="s-confirm">Confirm password</label>
        <div class="input-wrap">
          <input class="form-input has-icon-r" type="password" id="s-confirm"
            placeholder="Re-enter password" autocomplete="new-password" required />
          <div class="input-icon right" id="s-confirm-toggle" role="button" tabindex="0" aria-label="Toggle password">
            ${eyeIcon()}
          </div>
        </div>
        <div class="field-msg error" id="s-confirm-err" style="display:none"></div>
      </div>

      <label class="check-wrap" for="s-terms">
        <input type="checkbox" id="s-terms" name="terms" required />
        <div class="check-box">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4l3 3 5-6"/></svg>
        </div>
        <span class="check-label">I agree to Nova's
          <a href="#" tabindex="0">Terms of Service</a> and
          <a href="#" tabindex="0">Privacy Policy</a>
        </span>
      </label>

      <button type="submit" class="btn btn-primary w-full" id="signup-btn" style="height:48px">
        <span id="signup-btn-inner">Create free account</span>
      </button>
    </form>

    <div class="form-footer animate-fade-up" style="animation-delay:180ms">
      Already have an account?
      <span class="link" data-tab="login" role="button" tabindex="0">Sign in</span>
    </div>
  `, 'signup');
}

function bindSignup() {
  bindTabSwitchers();
  bindSSO('sso-google', 'Google');
  bindSSO('sso-github', 'GitHub');
  bindPwToggle('s-pw-toggle', 's-pw');
  bindPwToggle('s-confirm-toggle', 's-confirm');

  // Live strength meter
  document.getElementById('s-pw')?.addEventListener('input', () => {
    const pw = v('s-pw');
    document.getElementById('s-strength-mount').innerHTML = renderStrength(pw);
  });
  document.getElementById('s-strength-mount').innerHTML = renderStrength('');

  document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = v('s-name');
    const email   = v('s-email');
    const pw      = v('s-pw');
    const confirm = v('s-confirm');
    const terms   = document.getElementById('s-terms')?.checked;
    let valid = true;

    if (!name.trim() || name.trim().length < 2) {
      showErr('s-name-err', 'Please enter your full name.');
      cls('s-name', 'error'); valid = false;
    } else { cls('s-name', '-error'); hide('s-name-err'); }

    if (!isEmail(email)) {
      showErr('s-email-err', 'Please enter a valid work email.');
      cls('s-email', 'error'); valid = false;
    } else { cls('s-email', '-error'); hide('s-email-err'); }

    if (pw.length < 8) {
      showErr('s-pw-err', 'Password must be at least 8 characters.');
      cls('s-pw', 'error'); valid = false;
    } else { cls('s-pw', '-error'); hide('s-pw-err'); }

    if (pw !== confirm) {
      showErr('s-confirm-err', 'Passwords do not match.');
      cls('s-confirm', 'error'); valid = false;
    } else { cls('s-confirm', '-error'); hide('s-confirm-err'); }

    if (!terms) {
      toast('error', 'Agreement required', 'Please accept our Terms of Service to continue.');
      return;
    }

    if (!valid) return;

    const btn = document.getElementById('signup-btn');
    const inner = document.getElementById('signup-btn-inner');
    setLoading(btn, inner, true, 'Creating account…');

    S.user.name = name; S.user.email = email; S.user.password = pw;
    await wait(1800);

    setLoading(btn, inner, false, 'Create free account');
    toast('success', 'Account created!', `Verification email sent to ${email}`);
    await wait(600);

    // Start OTP timer
    S.otp = { values: ['','','','','',''], resend: 30, interval: null };
    route('verify');
  });
}

/* ============================================================
   SCREEN 3 — VERIFY EMAIL
   ============================================================ */
function renderVerify() {
  return `
    <div class="verify-shell">
      <div class="verify-bg-glow" aria-hidden="true"></div>
      <button class="theme-btn" style="position:fixed;top:20px;right:20px" aria-label="Toggle theme">${themeIcon()}</button>

      <div class="verify-card">
        <!-- Logo -->
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:var(--s-8)">
          ${logoMark(28)}
          <span style="font-size:var(--fs-lg);font-weight:var(--fw-7);color:var(--text-1)">Nova</span>
        </div>

        <!-- Animated icon -->
        <div class="verify-icon-wrap">
          <div class="verify-ring"></div>
          <div class="verify-ring-2"></div>
          <div class="verify-icon-bg"></div>
          <div class="verify-icon-inner">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M3 8a3 3 0 013-3h24a3 3 0 013 3v20a3 3 0 01-3 3H6a3 3 0 01-3-3V8z"
                fill="rgba(107,63,255,0.15)" stroke="rgba(107,63,255,0.6)" stroke-width="1.5"/>
              <path d="M3 9l15 10L33 9" stroke="rgba(107,63,255,0.8)" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="27" cy="25" r="6" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.6)" stroke-width="1.5"/>
              <path d="M24 25l2 2 4-4" stroke="#34d399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="10" style="animation:check-draw 0.6s 0.4s ease forwards;stroke-dashoffset:10;opacity:0"/>
            </svg>
          </div>
        </div>

        <h1 class="verify-title">Check your inbox</h1>
        <p class="verify-sub">We've sent a 6-digit verification code to your email address.</p>

        <div class="verify-email-highlight">
          <div class="verify-email-dot"></div>
          ${S.user.email || 'your@email.com'}
        </div>

        <!-- OTP inputs -->
        <div class="otp-group" id="otp-group" role="group" aria-label="6-digit verification code">
          ${[0,1,2,3,4,5].map(i => `
            <input class="otp-digit" type="text" inputmode="numeric" pattern="[0-9]*"
              maxlength="1" id="otp-${i}" data-idx="${i}"
              aria-label="Digit ${i+1}" autocomplete="${i===0?'one-time-code':'off'}" />
          `).join('')}
        </div>

        <div class="field-msg error" id="otp-err" style="display:none;justify-content:center;margin-bottom:var(--s-4)"></div>

        <button class="btn btn-primary w-full" id="otp-verify-btn" style="height:48px">
          <span id="otp-verify-inner">Verify email address</span>
        </button>

        <div class="verify-resend" id="resend-zone">
          Didn't receive it? &nbsp;
          <button class="resend-btn" id="resend-btn" disabled>
            Resend code <span id="resend-countdown">(${S.otp.resend}s)</span>
          </button>
        </div>

        <div style="margin-top:var(--s-4);text-align:center">
          <span class="link" id="change-email-btn" role="button" tabindex="0"
            style="font-size:var(--fs-xs);color:var(--text-3)">
            Change email address
          </span>
        </div>
      </div>
    </div>
  `;
}

function bindVerify() {
  const inputs = Array.from(document.querySelectorAll('.otp-digit'));

  inputs.forEach((inp, idx) => {
    inp.addEventListener('input', e => {
      const val = e.target.value.replace(/\D/g,'');
      e.target.value = val ? val.slice(-1) : '';
      e.target.classList.toggle('filled', !!e.target.value);
      S.otp.values[idx] = e.target.value;
      if (val && idx < 5) inputs[idx+1].focus();
      checkAutoSubmit(inputs);
    });

    inp.addEventListener('keydown', e => {
      if (e.key==='Backspace' && !inp.value && idx>0) {
        inputs[idx-1].focus();
        inputs[idx-1].value = '';
        inputs[idx-1].classList.remove('filled');
        S.otp.values[idx-1] = '';
      }
      if (e.key==='ArrowLeft'  && idx>0) inputs[idx-1].focus();
      if (e.key==='ArrowRight' && idx<5) inputs[idx+1].focus();
    });

    inp.addEventListener('paste', e => {
      e.preventDefault();
      const text = e.clipboardData.getData('text').replace(/\D/g,'').slice(0,6);
      text.split('').forEach((ch, i) => {
        if (inputs[i]) {
          inputs[i].value = ch;
          inputs[i].classList.add('filled');
          S.otp.values[i] = ch;
        }
      });
      const next = inputs[Math.min(text.length, 5)];
      if (next) next.focus();
    });

    inp.addEventListener('focus', () => inp.select());
  });

  if (inputs[0]) inputs[0].focus();

  document.getElementById('otp-verify-btn')?.addEventListener('click', doOTPVerify.bind(null, inputs));
  document.getElementById('change-email-btn')?.addEventListener('click', () => route('login'));

  // Resend timer
  startResendTimer();
}

function checkAutoSubmit(inputs) {
  const code = inputs.map(i => i.value).join('');
  if (code.length === 6) {
    setTimeout(() => doOTPVerify(inputs), 100);
  }
}

async function doOTPVerify(inputs) {
  const code = inputs.map(i => i.value).join('');
  if (code.length < 6) {
    showErr('otp-err', 'Please enter all 6 digits.');
    document.getElementById('otp-err').style.display = 'flex';
    inputs.forEach(i => i.classList.add('error'));
    return;
  }

  hide('otp-err');
  const btn   = document.getElementById('otp-verify-btn');
  const inner = document.getElementById('otp-verify-inner');
  setLoading(btn, inner, true, 'Verifying…');

  await wait(1200);

  // Mark verified
  inputs.forEach(i => { i.classList.remove('error'); i.classList.add('verified'); });
  clearInterval(S.otp.interval);
  setLoading(btn, inner, false, 'Verified!');

  await wait(500);
  toast('success', 'Email verified!', 'Now let\'s set up your workspace.');
  await wait(500);
  route('workspace');
}

function startResendTimer() {
  S.otp.resend = 30;
  updateResendUI();
  clearInterval(S.otp.interval);
  S.otp.interval = setInterval(() => {
    S.otp.resend--;
    updateResendUI();
    if (S.otp.resend <= 0) clearInterval(S.otp.interval);
  }, 1000);

  document.getElementById('resend-btn')?.addEventListener('click', async () => {
    toast('info', 'Code resent', `A new code was sent to ${S.user.email}.`);
    startResendTimer();
  });
}

function updateResendUI() {
  const btn = document.getElementById('resend-btn');
  const cd  = document.getElementById('resend-countdown');
  if (!btn) return;
  if (S.otp.resend > 0) {
    btn.disabled = true;
    if (cd) cd.textContent = `(${S.otp.resend}s)`;
  } else {
    btn.disabled = false;
    if (cd) cd.textContent = '';
  }
}

/* ============================================================
   SCREEN 4 — CREATE WORKSPACE
   ============================================================ */
const WORKSPACE_ICONS = ['🚀','🌟','⚡','🎯','💡','🔥','🎨','💎','🌊','🏆','🦋','🌈','🎭','🔮','🌙','☀️','🌿','⚓','🎪','🦁','🐉','🏔','🌺','💫','🍀','🎸'];
const WORKSPACE_COLORS = [
  { hex: '#6b3fff', name: 'Violet'  },
  { hex: '#2563eb', name: 'Blue'    },
  { hex: '#0891b2', name: 'Cyan'    },
  { hex: '#059669', name: 'Emerald' },
  { hex: '#d97706', name: 'Amber'   },
  { hex: '#dc2626', name: 'Red'     },
  { hex: '#db2777', name: 'Pink'    },
  { hex: '#7c3aed', name: 'Purple'  },
  { hex: '#374151', name: 'Slate'   },
];

function renderWorkspace() {
  const iconGrid = WORKSPACE_ICONS.map(ic =>
    `<div class="icon-option ${ic === S.workspace.icon ? 'selected' : ''}" data-icon="${ic}" role="button" tabindex="0" aria-label="${ic}">${ic}</div>`
  ).join('');

  const colorSwatches = WORKSPACE_COLORS.map(c =>
    `<div class="color-swatch ${c.hex === S.workspace.color ? 'selected' : ''}"
      data-color="${c.hex}" title="${c.name}"
      style="background:${c.hex}" role="button" tabindex="0" aria-label="${c.name}"></div>`
  ).join('');

  const slug = S.workspace.slug || slugify(S.workspace.name) || 'my-workspace';

  return onboardShell('workspace', `
    <div class="onboard-card">
      <div class="onboard-head">
        <div class="onboard-head-step">Step 1 of 3</div>
        <h1 class="onboard-head-title">Create your workspace</h1>
        <p class="onboard-head-sub">A workspace is where your team lives. Give it a name, a vibe, and make it yours.</p>
      </div>

      <form id="ws-form" class="ws-form" novalidate>
        <!-- Logo upload + Name on same row -->
        <div class="logo-upload-area">
          <div class="logo-preview" id="logo-preview-zone" role="button" tabindex="0" aria-label="Upload workspace logo">
            <div class="logo-preview-icon">${svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>', 22)}</div>
            <div class="logo-preview-text">Upload</div>
            <input type="file" id="logo-input" accept="image/*" style="display:none" aria-label="Choose logo file" />
          </div>
          <div class="logo-upload-info">
            <strong>Workspace logo</strong>
            PNG, JPG, SVG · Max 2MB<br>
            Or choose an emoji icon below
          </div>
        </div>

        <!-- Workspace name -->
        <div class="form-field">
          <label class="field-label" for="ws-name">Workspace name</label>
          <div class="input-wrap">
            <input class="form-input" type="text" id="ws-name" name="name"
              placeholder="e.g. Acme Inc, Design Team…"
              value="${S.workspace.name}" required maxlength="50" />
          </div>
          <div class="field-msg error" id="ws-name-err" style="display:none"></div>
        </div>

        <!-- URL slug -->
        <div class="form-field">
          <label class="field-label" for="ws-slug">Workspace URL</label>
          <div class="url-preview">
            <span class="url-prefix">nova.app/</span>
            <input class="url-slug-input" type="text" id="ws-slug"
              placeholder="my-workspace" value="${slug}"
              maxlength="30" pattern="[a-z0-9\-]+" />
          </div>
          <div class="field-msg" id="ws-slug-msg" style="display:none"></div>
        </div>

        <!-- Icon picker -->
        <div class="form-field">
          <label class="field-label">Workspace icon</label>
          <div class="ws-icon-picker" id="icon-picker" role="listbox" aria-label="Choose workspace icon">
            ${iconGrid}
          </div>
        </div>

        <!-- Accent color -->
        <div class="form-field">
          <label class="field-label">Workspace color</label>
          <div class="color-swatches" id="color-picker" role="listbox" aria-label="Choose accent color">
            ${colorSwatches}
          </div>
        </div>

        <!-- Two-col selects -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)">
          <div class="form-field">
            <label class="field-label" for="ws-industry">Industry</label>
            <select class="form-select" id="ws-industry">
              <option value="">Select industry</option>
              ${['Technology','Design & Creative','Marketing','Finance','Healthcare','Education','Legal','Real Estate','Consulting','Other'].map(i=>`<option value="${i}" ${S.workspace.industry===i?'selected':''}>${i}</option>`).join('')}
            </select>
          </div>
          <div class="form-field">
            <label class="field-label" for="ws-size">Team size</label>
            <select class="form-select" id="ws-size">
              <option value="">Select size</option>
              ${['Just me','2–5','6–15','16–50','51–200','200+'].map(s=>`<option value="${s}" ${S.workspace.teamSize===s?'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Live preview -->
        <div class="ws-live-preview" id="ws-preview-mount">
          ${renderWSPreview()}
        </div>

        <div style="display:flex;gap:var(--s-3);margin-top:var(--s-2)">
          <button type="submit" class="btn btn-primary" style="flex:1;height:48px" id="ws-btn">
            <span id="ws-btn-inner">Continue →</span>
          </button>
        </div>
      </form>
    </div>
  `);
}

function renderWSPreview() {
  const name = S.workspace.name || 'My Workspace';
  const slug = S.workspace.slug || slugify(name) || 'my-workspace';
  const icon = S.workspace.icon;
  const color = S.workspace.color;
  const alpha = color + '22';

  return `
    <div class="ws-preview-label">Live preview</div>
    <div class="ws-preview-card">
      <div class="ws-preview-icon" style="background:${alpha}">${icon}</div>
      <div class="ws-preview-info">
        <div class="ws-preview-name">${escHtml(name)}</div>
        <div class="ws-preview-url">nova.app/${escHtml(slug)}</div>
      </div>
      <div class="auth-card-badge badge-violet" style="background:${alpha};border-color:${color}44;color:${color}">
        New
      </div>
    </div>
  `;
}

function bindWorkspace() {
  // Logo upload
  const logoZone  = document.getElementById('logo-preview-zone');
  const logoInput = document.getElementById('logo-input');
  logoZone?.addEventListener('click', () => logoInput?.click());
  logoZone?.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') logoInput?.click(); });
  logoInput?.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2*1024*1024) { toast('error', 'File too large', 'Please use an image under 2MB.'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      S.workspace.logoFile = file;
      S.workspace.logoPreview = ev.target.result;
      logoZone.innerHTML = `<img src="${ev.target.result}" alt="Logo preview" />`;
    };
    reader.readAsDataURL(file);
  });

  // Name → slug live
  document.getElementById('ws-name')?.addEventListener('input', () => {
    const name = v('ws-name');
    S.workspace.name = name;
    const slugEl = document.getElementById('ws-slug');
    if (slugEl && !slugEl._touched) {
      const s = slugify(name);
      slugEl.value = s;
      S.workspace.slug = s;
    }
    document.getElementById('ws-preview-mount').innerHTML = renderWSPreview();
  });

  document.getElementById('ws-slug')?.addEventListener('input', e => {
    e._touched = true;
    const el = document.getElementById('ws-slug');
    el._touched = true;
    const raw = el.value.toLowerCase().replace(/[^a-z0-9\-]/g,'');
    el.value = raw;
    S.workspace.slug = raw;
    document.getElementById('ws-preview-mount').innerHTML = renderWSPreview();
  });

  // Icon picker
  document.getElementById('icon-picker')?.addEventListener('click', e => {
    const opt = e.target.closest('.icon-option');
    if (!opt) return;
    document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    S.workspace.icon = opt.dataset.icon;
    document.getElementById('ws-preview-mount').innerHTML = renderWSPreview();
  });
  document.getElementById('icon-picker')?.addEventListener('keydown', e => {
    if (e.key==='Enter'||e.key===' ') e.target.closest('.icon-option')?.click();
  });

  // Color picker
  document.getElementById('color-picker')?.addEventListener('click', e => {
    const sw = e.target.closest('.color-swatch');
    if (!sw) return;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    sw.classList.add('selected');
    S.workspace.color = sw.dataset.color;
    document.getElementById('ws-preview-mount').innerHTML = renderWSPreview();
  });

  // Industry & size
  document.getElementById('ws-industry')?.addEventListener('change', e => { S.workspace.industry = e.target.value; });
  document.getElementById('ws-size')?.addEventListener('change', e => { S.workspace.teamSize = e.target.value; });

  // Submit
  document.getElementById('ws-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = v('ws-name');
    if (!name.trim() || name.trim().length < 2) {
      showErr('ws-name-err', 'Please enter a workspace name.');
      cls('ws-name', 'error'); return;
    }
    cls('ws-name', '-error'); hide('ws-name-err');

    const btn = document.getElementById('ws-btn');
    const inner = document.getElementById('ws-btn-inner');
    setLoading(btn, inner, true, 'Creating workspace…');
    S.workspace.name = name;
    S.workspace.slug = S.workspace.slug || slugify(name);
    await wait(1200);
    setLoading(btn, inner, false, 'Continue →');
    route('invite');
  });
}

/* ============================================================
   SCREEN 5 — INVITE TEAM
   ============================================================ */
const ROLES = [
  { value: 'admin',   label: 'Admin'  },
  { value: 'manager', label: 'Manager'},
  { value: 'member',  label: 'Member' },
  { value: 'guest',   label: 'Guest'  },
];

function renderInvite() {
  const roleOptions = ROLES.map(r =>
    `<option value="${r.value}" ${r.value===S.invite.role?'selected':''}>${r.label}</option>`
  ).join('');

  const invited = S.invite.emails.map((item, i) => `
    <div class="invited-item" id="invited-${i}">
      <div class="invited-avatar">${item.email[0].toUpperCase()}</div>
      <div class="invited-email">${escHtml(item.email)}</div>
      <div class="invited-role">${item.role}</div>
      <button class="invited-remove" data-idx="${i}" aria-label="Remove ${item.email}">
        ${svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 14)}
      </button>
    </div>
  `).join('');

  return onboardShell('invite', `
    <div class="onboard-card onboard-card-wide">
      <div class="onboard-head">
        <div class="onboard-head-step">Step 2 of 3</div>
        <h1 class="onboard-head-title">Invite your team</h1>
        <p class="onboard-head-sub">Great work happens together. Invite people to join <strong>${escHtml(S.workspace.name||'your workspace')}</strong>.</p>
      </div>

      <!-- Single invite -->
      <div class="form-field" style="margin-bottom:var(--s-5)">
        <label class="field-label">Invite by email</label>
        <div class="invite-row">
          <div class="input-wrap invite-email-input">
            <div class="input-icon left">${svg('<path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"/><path d="M22 6l-10 7L2 6"/>')}</div>
            <input class="form-input has-icon-l" type="email" id="invite-email"
              placeholder="colleague@company.com" inputmode="email"
              value="${S.invite.draft}" />
          </div>
          <select class="role-select" id="invite-role">${roleOptions}</select>
          <button type="button" class="invite-add-btn" id="invite-add-btn" aria-label="Add invite">
            ${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',18)}
          </button>
        </div>
        <div class="field-msg error" id="invite-err" style="display:none"></div>
      </div>

      <!-- Invited list -->
      <div class="invited-list" id="invited-list">
        ${invited || `
          <div id="no-invites-empty" style="text-align:center;padding:var(--s-8);color:var(--text-4)">
            <div style="font-size:32px;margin-bottom:var(--s-3)">👥</div>
            <div style="font-size:var(--fs-sm);font-weight:var(--fw-5)">No teammates invited yet</div>
            <div style="font-size:var(--fs-xs);margin-top:var(--s-1)">Add emails above to invite your team</div>
          </div>
        `}
      </div>

      <!-- Bulk invite -->
      <div class="bulk-invite-area" style="margin-top:var(--s-5)">
        <div class="bulk-invite-label">Or paste multiple emails (comma or line separated)</div>
        <textarea class="form-textarea" id="bulk-emails"
          placeholder="alice@company.com, bob@company.com&#10;charlie@company.com"></textarea>
        <button type="button" class="btn btn-ghost btn-sm" id="bulk-add-btn" style="margin-top:var(--s-3)">
          Add all emails
        </button>
      </div>

      <!-- Role legend -->
      <div style="display:flex;gap:var(--s-4);flex-wrap:wrap;margin-top:var(--s-5);padding:var(--s-4);background:var(--bg-elevated);border-radius:var(--r-5);border:1px solid var(--border-1)">
        ${ROLES.map(r => `
          <div style="display:flex;flex-direction:column;gap:3px">
            <span style="font-size:var(--fs-xs);font-weight:var(--fw-7);color:var(--text-brand);text-transform:uppercase;letter-spacing:0.05em">${r.label}</span>
            <span style="font-size:var(--fs-2xs);color:var(--text-4)">${roleDesc(r.value)}</span>
          </div>
        `).join('')}
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:var(--s-3);margin-top:var(--s-8)">
        <button class="btn btn-ghost" id="invite-skip-btn" style="flex:0 0 auto">
          Skip for now
        </button>
        <button class="btn btn-primary" id="invite-continue-btn" style="flex:1;height:48px">
          <span id="invite-btn-inner">
            ${S.invite.emails.length > 0 ? `Send ${S.invite.emails.length} invite${S.invite.emails.length>1?'s':''} & continue` : 'Continue →'}
          </span>
        </button>
      </div>
    </div>
  `);
}

function bindInvite() {
  function addInvite() {
    const email = v('invite-email').trim();
    const role  = document.getElementById('invite-role')?.value || 'member';
    if (!email) return;
    if (!isEmail(email)) {
      showErr('invite-err', 'Please enter a valid email address.');
      cls('invite-email', 'error'); return;
    }
    if (S.invite.emails.find(e => e.email === email)) {
      toast('info', 'Already added', `${email} is already in the list.`); return;
    }
    S.invite.emails.push({ email, role });
    document.getElementById('invite-email').value = '';
    hide('invite-err'); cls('invite-email', '-error');
    refreshInviteList();
    updateInviteBtn();
  }

  document.getElementById('invite-add-btn')?.addEventListener('click', addInvite);
  document.getElementById('invite-email')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addInvite(); }
  });

  // Bulk
  document.getElementById('bulk-add-btn')?.addEventListener('click', () => {
    const raw = document.getElementById('bulk-emails')?.value || '';
    const emails = raw.split(/[\n,;]+/).map(e => e.trim()).filter(e => e && isEmail(e));
    const added = [];
    emails.forEach(email => {
      if (!S.invite.emails.find(e => e.email === email)) {
        S.invite.emails.push({ email, role: 'member' });
        added.push(email);
      }
    });
    if (added.length) {
      document.getElementById('bulk-emails').value = '';
      refreshInviteList(); updateInviteBtn();
      toast('success', `${added.length} emails added`, 'Team invites ready to send.');
    } else {
      toast('info', 'No new emails', 'All emails are already in the list or invalid.');
    }
  });

  // Remove
  document.getElementById('invited-list')?.addEventListener('click', e => {
    const btn = e.target.closest('.invited-remove');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    S.invite.emails.splice(idx, 1);
    refreshInviteList(); updateInviteBtn();
  });

  // Skip / Continue
  document.getElementById('invite-skip-btn')?.addEventListener('click', () => route('personalize'));
  document.getElementById('invite-continue-btn')?.addEventListener('click', async () => {
    const btn   = document.getElementById('invite-continue-btn');
    const inner = document.getElementById('invite-btn-inner');
    if (S.invite.emails.length > 0) {
      setLoading(btn, inner, true, 'Sending invites…');
      await wait(1000);
      toast('success', 'Invites sent!', `${S.invite.emails.length} teammate${S.invite.emails.length>1?'s':''} will receive an email shortly.`);
      await wait(400);
    }
    route('personalize');
  });
}

function refreshInviteList() {
  const list = document.getElementById('invited-list');
  if (!list) return;
  if (S.invite.emails.length === 0) {
    list.innerHTML = `
      <div id="no-invites-empty" style="text-align:center;padding:var(--s-8);color:var(--text-4)">
        <div style="font-size:32px;margin-bottom:var(--s-3)">👥</div>
        <div style="font-size:var(--fs-sm);font-weight:var(--fw-5)">No teammates invited yet</div>
        <div style="font-size:var(--fs-xs);margin-top:var(--s-1)">Add emails above to invite your team</div>
      </div>`;
    return;
  }
  list.innerHTML = S.invite.emails.map((item, i) => `
    <div class="invited-item" id="invited-${i}" style="animation:fade-up 200ms ease both">
      <div class="invited-avatar">${item.email[0].toUpperCase()}</div>
      <div class="invited-email">${escHtml(item.email)}</div>
      <div class="invited-role">${item.role}</div>
      <button class="invited-remove" data-idx="${i}" aria-label="Remove ${item.email}">
        ${svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 14)}
      </button>
    </div>
  `).join('');
}

function updateInviteBtn() {
  const inner = document.getElementById('invite-btn-inner');
  if (!inner) return;
  const n = S.invite.emails.length;
  inner.textContent = n > 0 ? `Send ${n} invite${n>1?'s':''} & continue` : 'Continue →';
}

function roleDesc(role) {
  return { admin:'Full access + billing', manager:'Can manage members', member:'Standard access', guest:'View-only access' }[role] || '';
}

/* ============================================================
   SCREEN 6 — PERSONALIZE
   ============================================================ */
const ACCENT_COLORS = [
  '#6b3fff','#2563eb','#0891b2','#059669',
  '#d97706','#dc2626','#db2777','#7c3aed',
];

function renderPersonalize() {
  const themeOpts = [
    { id:'dark',  label:'Dark'  },
    { id:'light', label:'Light' },
  ].map(t => `
    <div class="theme-option ${S.prefs.theme===t.id?'selected':''}" data-theme-opt="${t.id}" role="option"
      aria-selected="${S.prefs.theme===t.id}" tabindex="0" aria-label="${t.label} theme">
      <div class="theme-preview theme-preview-${t.id}">
        <div class="theme-preview-sidebar"></div>
        <div class="theme-preview-content">
          <div class="theme-preview-line"></div>
          <div class="theme-preview-line"></div>
          <div class="theme-preview-line" style="width:40%"></div>
        </div>
      </div>
      <div class="theme-option-label">${t.label}</div>
    </div>
  `).join('');

  const accentDots = ACCENT_COLORS.map(c =>
    `<div class="accent-option ${c===S.prefs.accent?'selected':''}" data-accent="${c}"
      style="background:${c};color:${c}" title="${c}"
      role="option" tabindex="0" aria-label="Accent color ${c}"></div>`
  ).join('');

  const toggles = [
    { id:'notif',    label:'Email notifications', sub:'Daily digests and @mentions', on: S.prefs.notifications },
    { id:'calendar', label:'Calendar integration', sub:'Sync with Google/Outlook',   on: S.prefs.calendar      },
    { id:'aihours',  label:'AI work hours',        sub:'Only suggest during your hours', on: S.prefs.aiHours   },
  ];

  return onboardShell('personalize', `
    <div class="onboard-card onboard-card-wide">
      <div class="onboard-head">
        <div class="onboard-head-step">Step 3 of 3</div>
        <h1 class="onboard-head-title">Make it yours</h1>
        <p class="onboard-head-sub">Personalize your experience. You can always change these later in Settings.</p>
      </div>

      <div class="prefs-grid">
        <!-- Theme -->
        <div class="pref-group">
          <div class="pref-group-title">Interface theme</div>
          <div class="theme-options" role="listbox" id="theme-opts">
            ${themeOpts}
          </div>
        </div>

        <!-- Accent color -->
        <div class="pref-group">
          <div class="pref-group-title">Accent color</div>
          <div class="accent-options" role="listbox" id="accent-opts">
            ${accentDots}
          </div>
          <div style="margin-top:var(--s-4)">
            <div class="pref-group-title" style="margin-bottom:var(--s-3)">Default layout</div>
            <select class="form-select" id="layout-select">
              <option value="sidebar"  ${S.prefs.layout==='sidebar'?'selected':''}>Sidebar nav</option>
              <option value="topbar"   ${S.prefs.layout==='topbar'?'selected':''}>Top navigation</option>
              <option value="minimal"  ${S.prefs.layout==='minimal'?'selected':''}>Minimal</option>
            </select>
          </div>
        </div>

        <!-- AI Assistant -->
        <div class="pref-group">
          <div class="pref-group-title">AI assistant</div>
          <div class="ai-name-wrap" style="margin-bottom:var(--s-4)">
            <div class="ai-avatar-preview">🤖</div>
            <div class="input-wrap" style="flex:1">
              <input class="form-input" type="text" id="ai-name-input"
                placeholder="Nova" value="${S.prefs.aiName}" maxlength="20" />
            </div>
          </div>
          <div class="field-msg" style="color:var(--text-4);margin-top:-var(--s-2)">
            This is what you'll call your AI assistant
          </div>
        </div>

        <!-- Preferences toggles -->
        <div class="pref-group">
          <div class="pref-group-title">Preferences</div>
          ${toggles.map(t => `
            <div class="toggle-row">
              <div class="toggle-info">
                <div class="toggle-info-label">${t.label}</div>
                <div class="toggle-info-sub">${t.sub}</div>
              </div>
              <button class="toggle-switch ${t.on?'on':''}" data-toggle="${t.id}"
                role="switch" aria-checked="${t.on}" aria-label="${t.label}"></button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex;gap:var(--s-3);margin-top:var(--s-8)">
        <button class="btn btn-ghost" id="prefs-back-btn">← Back</button>
        <button class="btn btn-primary" id="prefs-finish-btn" style="flex:1;height:48px">
          <span id="prefs-btn-inner">Finish setup →</span>
        </button>
      </div>
    </div>
  `);
}

function bindPersonalize() {
  // Theme
  document.getElementById('theme-opts')?.addEventListener('click', e => {
    const opt = e.target.closest('[data-theme-opt]');
    if (!opt) return;
    document.querySelectorAll('[data-theme-opt]').forEach(o => {
      o.classList.remove('selected'); o.setAttribute('aria-selected','false');
    });
    opt.classList.add('selected'); opt.setAttribute('aria-selected','true');
    S.prefs.theme = opt.dataset.themeOpt;
    applyTheme(S.prefs.theme);
    // Re-render theme toggle icon
    document.querySelectorAll('.theme-btn').forEach(b => b.innerHTML = themeIcon());
  });

  // Accent
  document.getElementById('accent-opts')?.addEventListener('click', e => {
    const opt = e.target.closest('.accent-option');
    if (!opt) return;
    document.querySelectorAll('.accent-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    S.prefs.accent = opt.dataset.accent;
  });

  // Layout
  document.getElementById('layout-select')?.addEventListener('change', e => { S.prefs.layout = e.target.value; });

  // AI name
  document.getElementById('ai-name-input')?.addEventListener('input', e => { S.prefs.aiName = e.target.value; });

  // Toggles
  document.querySelectorAll('.toggle-switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.toggle;
      const isOn = btn.classList.toggle('on');
      btn.setAttribute('aria-checked', isOn);
      if (id === 'notif')    S.prefs.notifications = isOn;
      if (id === 'calendar') S.prefs.calendar = isOn;
      if (id === 'aihours')  S.prefs.aiHours = isOn;
    });
  });

  // Back
  document.getElementById('prefs-back-btn')?.addEventListener('click', () => route('invite'));

  // Finish
  document.getElementById('prefs-finish-btn')?.addEventListener('click', async () => {
    const btn   = document.getElementById('prefs-finish-btn');
    const inner = document.getElementById('prefs-btn-inner');
    S.prefs.aiName = v('ai-name-input') || 'Nova';
    setLoading(btn, inner, true, 'Finishing setup…');
    await wait(2000);
    route('success');
  });
}

/* ============================================================
   SCREEN 7 — SUCCESS
   ============================================================ */
function renderSuccess() {
  const memberCount = S.invite.emails.length + 1; // +1 for the owner

  // Confetti pieces
  const colors = ['#6b3fff','#22d3ee','#34d399','#fbbf24','#fb7185','#a78bfa','#60a5fa'];
  const confetti = Array.from({length:40}, (_, i) => {
    const c = colors[i % colors.length];
    const left = Math.random()*100;
    const delay = Math.random()*1.5;
    const dur = 1.2 + Math.random()*1;
    const size = 6 + Math.random()*6;
    const shape = Math.random() > 0.5 ? '50%' : '2px';
    return `<div class="confetti-piece" style="left:${left}%;background:${c};width:${size}px;height:${size}px;border-radius:${shape};--dur:${dur}s;--delay:${delay}s"></div>`;
  }).join('');

  return `
    <div class="success-shell">
      <!-- Confetti -->
      <div class="confetti-container" aria-hidden="true">${confetti}</div>

      <!-- Background rings -->
      <div class="success-orbs" aria-hidden="true">
        <div class="success-orb-ring"></div>
        <div class="success-orb-ring-2"></div>
      </div>

      <button class="theme-btn" style="position:fixed;top:20px;right:20px" aria-label="Toggle theme">${themeIcon()}</button>

      <div class="success-card">
        <!-- Top section -->
        <div class="success-card-top">
          <div class="success-check-wrap">
            <div class="success-check-ring"></div>
            <div class="success-check-circle">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
                stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 18l8 8 12-14"
                  stroke-dasharray="35" stroke-dashoffset="35"
                  style="animation:check-draw 0.6s 0.3s cubic-bezier(0.4,0,0.2,1) forwards"/>
              </svg>
            </div>
          </div>

          <h1 class="success-title">
            ${escHtml(S.workspace.name||'Your workspace')} is ready! 🎉
          </h1>
          <p class="success-sub">
            Everything is set up and your AI assistant is ready to work. Welcome to the future of work.
          </p>
        </div>

        <!-- Body -->
        <div class="success-card-body">
          <!-- Workspace preview -->
          <div class="success-ws-preview">
            <div class="success-ws-icon" style="background:${S.workspace.color}22">
              ${S.workspace.icon}
            </div>
            <div>
              <div class="success-ws-name">${escHtml(S.workspace.name||'My Workspace')}</div>
              <div class="success-ws-url">nova.app/${escHtml(S.workspace.slug||'my-workspace')}</div>
            </div>
          </div>

          <!-- Stats -->
          <div class="success-stats">
            <div class="success-stat">
              <div class="success-stat-value">${memberCount}</div>
              <div class="success-stat-label">Team member${memberCount>1?'s':''}</div>
            </div>
            <div class="success-stat">
              <div class="success-stat-value">0</div>
              <div class="success-stat-label">Projects</div>
            </div>
            <div class="success-stat">
              <div class="success-stat-value">∞</div>
              <div class="success-stat-label">Possibilities</div>
            </div>
          </div>

          <!-- AI badge -->
          <div class="success-ai-badge">
            <div class="success-ai-icon">🤖</div>
            <div class="success-ai-text">
              <div class="success-ai-label">${escHtml(S.prefs.aiName||'Nova')} AI is ready</div>
              <div class="success-ai-sub">Ask anything — your AI assistant is online and learning</div>
            </div>
            <span class="success-ai-status">● Online</span>
          </div>

          <!-- CTA -->
          <div class="success-cta">
            <button class="btn btn-primary w-full" id="enter-ws-btn" style="height:52px;font-size:var(--fs-md)">
              <span id="enter-btn-inner">Enter workspace →</span>
            </button>
            <button class="btn btn-ghost w-full" id="invite-more-btn" style="height:44px">
              Invite more teammates
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindSuccess() {
  document.getElementById('enter-ws-btn')?.addEventListener('click', async () => {
    const btn   = document.getElementById('enter-ws-btn');
    const inner = document.getElementById('enter-btn-inner');
    setLoading(btn, inner, true, 'Loading workspace…');

    const overlay = document.getElementById('nova-overlay');
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;font-size:24px">
          ${S.workspace.icon}
        </div>
        <div class="spinner lg"></div>
        <div style="color:rgba(255,255,255,0.8);font-size:14px;font-weight:500">Opening ${escHtml(S.workspace.name||'workspace')}…</div>
      </div>
    `;

    await wait(500);
    overlay.classList.add('active');
    await wait(1500);
    window.location.href = `dashboard.html?ws=${encodeURIComponent(S.workspace.slug||'workspace')}`;
  });

  document.getElementById('invite-more-btn')?.addEventListener('click', () => route('invite'));
}

/* ============================================================
   SHARED UTILITIES
   ============================================================ */

// Tab switcher (login / signup)
function bindTabSwitchers() {
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
      const t = el.dataset.tab;
      if (t === 'login' || t === 'signup') route(t === 'login' ? 'login' : 'signup');
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') el.click();
    });
  });
}

function bindSSO(id, provider) {
  document.getElementById(id)?.addEventListener('click', () => {
    toast('info', `Connecting to ${provider}`, 'Redirecting…');
  });
}

// Password toggle
let pwVisible = {};
function bindPwToggle(toggleId, inputId) {
  const toggleEl = document.getElementById(toggleId);
  const inputEl  = document.getElementById(inputId);
  if (!toggleEl || !inputEl) return;
  pwVisible[inputId] = false;
  toggleEl.addEventListener('click', () => {
    pwVisible[inputId] = !pwVisible[inputId];
    inputEl.type = pwVisible[inputId] ? 'text' : 'password';
    toggleEl.innerHTML = pwVisible[inputId] ? eyeOffIcon() : eyeIcon();
    toggleEl.setAttribute('aria-label', pwVisible[inputId] ? 'Hide password' : 'Show password');
  });
  toggleEl.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') toggleEl.click(); });
}

function eyeIcon() {
  return svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>');
}
function eyeOffIcon() {
  return svg('<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>');
}

// Strength meter
function renderStrength(pw) {
  const s = getStrength(pw);
  return `<div class="pw-strength s-${s.level}">
    <div class="pw-strength-bars">
      ${[1,2,3,4].map(i => `<div class="pw-bar ${i<=s.bars?s.level:''}"></div>`).join('')}
    </div>
    <div class="pw-strength-label">${pw ? s.label : 'Enter a password'}</div>
  </div>`;
}
function getStrength(pw) {
  let sc = 0;
  if (pw.length >= 8)  sc++;
  if (pw.length >= 12) sc++;
  if (/[A-Z]/.test(pw)) sc++;
  if (/[0-9]/.test(pw)) sc++;
  if (/[^A-Za-z0-9]/.test(pw)) sc++;
  if (sc <= 1) return { level:'weak',   label:'Weak',   bars:1 };
  if (sc <= 2) return { level:'fair',   label:'Fair',   bars:2 };
  if (sc <= 3) return { level:'good',   label:'Good',   bars:3 };
  return             { level:'strong', label:'Strong', bars:4 };
}

// Toast
function toast(type, title, msg, dur = 4000) {
  const zone = document.getElementById('nova-toasts');
  if (!zone) return;
  const iconMap = {
    success: `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>`,
    error:   `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `
    ${iconMap[type] || iconMap.info}
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;
  zone.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity 200ms, transform 200ms';
    t.style.opacity = '0'; t.style.transform = 'translateX(16px)';
    setTimeout(() => t.remove(), 220);
  }, dur);
}

function showForgotToast() {
  toast('info', 'Reset link sent', 'Check your email for a password reset link.');
}
function showMagicToast() {
  const email = v('l-email') || '';
  if (!email || !isEmail(email)) {
    toast('error', 'Email required', 'Enter your email address first.');
    return;
  }
  toast('success', 'Magic link sent ✨', `A sign-in link was sent to ${email}`);
}

// DOM helpers
function v(id)    { return document.getElementById(id)?.value?.trim() || ''; }
function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg; el.style.display = 'flex';
}
function cls(id, c) {
  const el = document.getElementById(id);
  if (!el) return;
  if (c.startsWith('-')) el.classList.remove(c.slice(1));
  else el.classList.add(c);
}

function setLoading(btn, textEl, loading, text) {
  if (!btn) return;
  btn.disabled = loading;
  if (loading) {
    btn.classList.add('loading');
    if (textEl) textEl.innerHTML = `<span class="spinner"></span>${text}`;
  } else {
    btn.classList.remove('loading');
    if (textEl) textEl.textContent = text;
  }
}

function isEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }
function slugify(s) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function wait(ms)   { return new Promise(r => setTimeout(r, ms)); }

/* SSO Brand icons */
function googleIcon() {
  return `<svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2a10.3 10.3 0 00-.16-1.8H9v3.4h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.91C16.6 14.25 17.64 11.93 17.64 9.2z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26a5.4 5.4 0 01-8.05-2.84H.96v2.33A9 9 0 009 18z"/>
    <path fill="#FBBC05" d="M3.99 10.71a5.41 5.41 0 010-3.42V4.96H.96a9 9 0 000 8.08l3.03-2.33z"/>
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 00.96 4.96L4 7.29A5.36 5.36 0 019 3.58z"/>
  </svg>`;
}

function githubIcon() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0a12 12 0 00-3.79 23.39c.6.11.82-.26.82-.58v-2.17c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18A4.65 4.65 0 0120.8 12c0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 0z"/>
  </svg>`;
}

/* ============================================================
   BOOT
   ============================================================ */
init();
