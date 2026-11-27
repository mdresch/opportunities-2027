# Portal deploy checklist — `OP-ITG-013` (`mdresch/agent-governance-onboarding`)

**Goal:** Put the **non-retentive** self-assessment in front of **10 qualified CIO/CISO prospects** (`HYP-2027-013`, `HYP-2027-014`) and log **briefings + CRM notes** in [Pilot-Charter.md](Pilot-Charter.md) §2 / [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md). See [Assessment-Intake-Privacy-Model.md](Assessment-Intake-Privacy-Model.md).

**Repo:** [github.com/mdresch/agent-governance-onboarding](https://github.com/mdresch/agent-governance-onboarding)  
**Related assets:** [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) · [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx)

**Procurement-led buys (interim PRMAP):** Same repo and checklist until `OP-SCM-003` graduates to PR. Use SKU **`CBA-ITG-013-T1`**, [Procurement-Intake-PRMAP-Example.md](Procurement-Intake-PRMAP-Example.md), and [Procurement-Pilot-Example-OP-ITG-013.md](../OP-SCM-003_Procurement_Readiness_Assessment_Portal/Procurement-Pilot-Example-OP-ITG-013.md). Future multi-SKU host: **`mdresch/cba-procurement-readiness-portal`** — create only after [OP-to-PR-Graduation-Gate.md](../OP-SCM-003_Procurement_Readiness_Assessment_Portal/OP-to-PR-Graduation-Gate.md).

**PR prep (no `Idea` → `Pilot` flip):** [PR-ITG-013-Preparation-Checklist.md](PR-ITG-013-Preparation-Checklist.md) · record live URL in [data/portal-deploy-status.json](data/portal-deploy-status.json) · portal stories in [Portal-Engineering-Backlog.md](Portal-Engineering-Backlog.md).

---

## A. Pre-flight (content & compliance)

- [ ] Portal copy matches one-pager **8 pillars** and **two-tier** pricing (no contradictory scope).
- [ ] Self-assessment maps to **Top-10 P0 red flags** + sample of Tier 1 pillar questions (not all 40 — see [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md)).
- [ ] **Delegation:** load [data/agent-governance-question-ownership.json](data/agent-governance-question-ownership.json); sponsor can invite function leads; contributors see **my queue** only ([Portal-Delegation-Dashboard-Spec.md](Portal-Delegation-Dashboard-Spec.md)).
- [ ] **Dashboard:** completion by executive lane + function + pillar; release export ≥80% accepted or sponsor override.
- [ ] Export path works: **`.md` / `.json` / PDF** (or printable summary) for booking a 30-min briefing.
- [ ] Privacy: short notice on **no tenant credentials** stored; submissions are invite-only or email-gated if needed.
- [ ] **Out-of-scope** footer: no MSP admin, no certification opinion, no custom Agent 365 connectors (matches [Pilot-Charter.md](Pilot-Charter.md) §3).

---

## B. Build & deploy

- [ ] `main` builds clean on GitHub Actions (if configured).
- [ ] Choose host: **GitHub Pages** (repo settings) or **Azure Static Web Apps** / **Cloudflare Pages** (pick one; document URL in charter).
- [ ] Custom subdomain optional (e.g. `agent-governance.cba.consult`) — TLS valid.
- [ ] Smoke test on mobile + Edge/Chrome: complete flow &lt; 15 minutes.
- [ ] **404 / offline:** fallback CTA → email `Menno Drescher` + link to one-pager PDF.

---

## C. Instrumentation & intake

- [ ] **Booking link:** Calendly / Microsoft Bookings URL in portal completion screen.
- [ ] **Tracker:** each **Firestore brief request** or booked briefing gets a row in [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md) (date, org, role; optional aggregate index/P0 from brief doc only — **not** full assessment).
- [ ] Optional: form webhook → spreadsheet (no PII in git — local/secure store only).
- [ ] UTM or `?src=` tags for LinkedIn vs. direct invite (`linkedin`, `invite`, `partner`).

---

## D. GTM wiring

- [ ] Publish [LinkedIn-GTM-Copy.md](LinkedIn-GTM-Copy.md) **Post 1** with portal URL.
- [ ] Attach one-pager **.docx** to direct invites (not public download without context).
- [ ] First **10 named targets** invited personally (see [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md)) — portal link in DM/email.
- [ ] Second wave: Post 2–3 after ≥3 portal completions (social proof, no client names without permission).

---

## E. Readiness gate (Charter §4)

| Gate | Done when |
| --- | --- |
| Portal live | Public URL loads; test submission recorded |
| Hypothesis test | ≥1 real CIO/CISO completes self-assessment |
| Commercial | ≥1 Tier 1 or Tier 2 proposal sent within 8 weeks of first completion |
| Director `G4` | [Pilot-Charter.md](Pilot-Charter.md) §5 signed after named Pilot #1 sponsor |

---

## F. Rollback

- If portal breaks mid-campaign: route to **manual PDF triage** (Top-10 P0 checklist) + Bookings link until fixed.
- Do not change inventory `Status` to `Pilot` until §5 Director sign-off.