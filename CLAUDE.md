# Neev — prototype context

## What this is
Neev is a startup building earned-wage-access (salary advance) for blue-collar employees.
Core model: employee requests an advance on salary already earned → Neev disburses instantly →
employee's employer (e.g. Zomato) deducts the amount on payday and pays it to Neev, not the employee.

This repo is a **click-through prototype only**, built by a PM intern (not a dev) to pitch/get
sign-off from Neev's founders. **If approved, an actual dev team rebuilds it for production.**
That constraint drives every technical decision below — optimize for fast editing and a good demo,
not for production architecture.

## The three apps
- `employee.html` — phone-mockup mobile app for the blue-collar employee (login, onboarding,
  request advance, repayment history, referral, grievances, government schemes)
- `company.html` — web dashboard for the employer's HR team (verify employees, run payroll
  deductions, pre/post-payday confirmation, policy config, analytics)
- `admin.html` — internal Neev/NBFC ops dashboard (KYC queue, fraud alerts, credit limits,
  loan origination, disbursements, reconciliation, risk & compliance, day-end closure)

Each is currently a single self-contained HTML file (vanilla CSS + JS, `.screen`/`.active`
show-hide pattern, a `nav()` function per file). No build step, no framework — opens directly
in a browser.

## Key decisions made so far (don't relitigate without reason)
1. **No React / no Vite.** Considered it, rejected it — this is throwaway-after-approval, and
   build tooling adds risk/learning curve for no long-term payoff here.
2. **Tailwind (CDN, no build) + plain JS template functions** is the planned direction for the
   next restructuring pass — not done yet. Goal: pull the repeated sidebar/topbar/card/stat-card
   markup (duplicated almost identically between `company.html` and `admin.html`) into
   `shared/components.js`, and shared design tokens into `shared/theme.css`. This is mainly to
   cut editing effort AND to cut Claude token usage — smaller files per edit instead of
   1000+ line monoliths.
3. **`shared/` folder exists but is empty** — the extraction hasn't happened yet. Do this before
   or alongside adding new pages, not after, so new pages are built on the shared components
   rather than more copy-pasted markup.
4. Files here are unedited copies of the intern's latest working versions (as of 31 Aug 2026).

## PM review notes (from acting as senior fintech PM on the existing build)
**Strengths to protect/keep prominent in the pitch:**
- Text-to-speech + voice language picker in `employee.html` (`speakScreen`, language modal) —
  genuinely differentiating for low-literacy blue-collar users, better than most EWA competitors.
- Tripartite (T2E) agreement flow — correct regulatory instinct, keeps Neev from looking like
  unlicensed lending.
- VAN (virtual account number) based repayment collection, FnF/exit recovery flow — real
  fintech patterns, not just UI polish.

**Gaps flagged, not yet fixed:**
- Confirm-advance screen should visibly show a full cost breakdown (Key Fact Statement style) —
  RBI digital lending rules expect this; investors will ask.
- Voice narration exists but full UI text localization (Hindi/regional script, not just TTS)
  would widen who can self-navigate.

**Traction features proposed, not yet built (ranked):**
1. On-time repayment → visible credit-limit increase (streak/gamification) — `employee.html`'s
   `s-history` screen already has scaffolding for this (`hist-limitNote`, badge levels) — extend it.
2. WhatsApp-based balance check/reminders (not just in-app notifications).
3. Employer-facing "ROI / attrition impact" analytics on `company.html`'s Analytics screen — this
   is what actually gets employers like Zomato to renew, prioritize over more employee-side polish.
4. First-advance-free / instant-approval framing, if not already emphasized.

## Where things stand right now
Waiting on: the specific list of "major changes" and new pages the intern's lead asked for.
**Nothing has been restructured or feature-changed yet — only the files were copied in from
Downloads into this folder.** Next step is whatever changes get specified, applied against this
structure (doing the shared-component extraction first if it hasn't happened by then).
