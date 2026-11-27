---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation Ready — Feeds Stage 2 Hypotheses & Stage 3 Business Case)"
opportunity_id: "OP-CX-001"
paired_wedge: "OP-OPS-001 → OP-CX-001"
execution_track: "Track A — Lightweight Advisory Diagnostic (stays in oppurtunities-2027)"
linked_hypotheses: "HYP-2027-001, HYP-2027-005, HYP-2027-006, HYP-2027-023"
primary_source: "ADPA - Onboarding.docx (OneDrive canonical source; SaaS/platform specs scoped to OP-CX-002)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-CX-001`: Client Onboarding & Retention Friction Audit

> **Governance & Non-Duplication Notice:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) §3 (`Stage 1b — Ideation / Gate G1b`). Authoritative effort, capital, and target-quarter fields remain in [inventory-of-ideas.md](../../inventory-of-ideas.md#L253). Stage 3 BABOK options, fixed-fee pricing tiers (`€1,000–€3,500`), and commercial economics live in [Business-Case.md](Business-Case.md); client-facing collateral lives in [One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md](../../docs/reports/One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md).

---

## 1. 2027 Market Signals & Buyer Triggers *(Problem-Before-Solution)*

Small and Mid-Market B2B organizations rarely lose accounts during procurement; they lose them between **contract signature and Day 90**, when informal handoffs collide with real delivery complexity. Three validated 2027 market shifts explain why buyers prioritize fixed-scope onboarding audits now ([market-analysis-2027.md](../../market-analysis-2027.md#L173-L176)):

1. **Onboarding as an NRR Growth Engine (Gartner):** Executive KPIs are rotating away from *speed-to-close* toward **Time-to-First-Value** and Day-90 activation to protect Net Revenue Retention (NRR) when net-new logo growth slows.
2. **The Human-AI Onboarding Balance Correction (Forrester 2027 CX Predictions):** Heavy automation in client onboarding without human alignment has damaged retention. Brands are re-introducing structured human checkpoints at high-stakes handoff moments, driving a **~20% CX staffing rebound** alongside **1 in 5 firms** adopting agentic journey orchestration while cutting ~1/3 of unmeasured AI tooling.
3. **The Operating-Model Value Realization Gap (McKinsey):** Tooling alone fails without explicit role clarity (RACI), gate criteria, and feedback loops between Sales, Delivery, Support, and Finance.

---

## 2. Service-Design Anatomy: Five Post-Signature Friction Zones (Days 0–90)

`OP-CX-001` isolates where momentum, margin, and trust break across the first 90 days after a client signs — separating steps that can be **standardized cleanly** from steps that require **high-trust human checkpoints**:

| Friction Zone | Window | Common Leakage / Failure Mode | Standardized Gate (Low-Touch) | Mandatory Human Trust Checkpoint |
| --- | --- | --- | --- | --- |
| **1. Deal-Close to Intake** | `Days 0–3` | Sales promises, custom SLAs, and non-standard billing terms sit in email threads and fail to reach Delivery/CS | Mandatory 1-page Deal Handoff Sheet inside existing CRM before kickoff booking | Live 20-min Sales ↔ Delivery/CS briefing on edge assumptions & sponsor politics |
| **2. Readiness & Provisioning** | `Days 4–14` | Kickoffs scheduled before client technical access, data, or security clearances exist, burning billable prep | Pre-kickoff Prerequisite Checklist (credentials, stakeholders, kickoff inputs) | CS/PM confirmation call verifying sponsor readiness before Day-1 clock starts |
| **3. Kickoff & Mutual Plan** | `Days 7–21` | Generic kickoff deck repeats pre-sale discovery questions, triggering immediate buyer's remorse | Pre-populated Mutual Success Plan with explicit milestones & out-of-scope rules | Live executive kickoff confirming "Day-30 First Value" definition together |
| **4. First Value & Billing Trigger** | `Days 21–45` | Work drifts without a crisp Week 3–4 proof milestone; Finance stalls invoice release due to missing acceptance | Automated milestone completion tag & Finance billing-readiness gate | Direct sponsor value confirmation & friction check prior to transition to steady state |
| **5. Support Handover & Day-90 Loop** | `Days 45–90` | Unresolved onboarding edge cases dump onto Support without context; renewal risks remain invisible until Month 9 | Structured transition summary pushed to ticketing queue + Day-45 pulse metric | Day-60 / Day-90 operational QBR capturing adoption blockers & expansion candidates |

---

## 3. Competitive Landscape & Market Comparables (`G1b` Benchmark)

To confirm a clear conflict-free differentiation before committing pilot hours, `OP-CX-001` is benchmarked against three real alternatives SMEs and mid-market firms consider:

| Alternative | Typical Anchor & Effort | Primary Strength | Where It Breaks for Small & Mid-Market (and How `OP-CX-001` Wins) |
| --- | --- | --- | --- |
| **CS & Onboarding SaaS Platforms** *(Rocketlane, GuideCX, Gainsight, ChurnZero)* | `€12,000–€45,000+/yr` + `2–4 mos` setup | Automated task boards, customer portals, and usage telemetry once processes exist | **Automates broken handoffs:** fails when Sales-to-CS intake gates and RACI are undefined. `OP-CX-001` requires **\$0 new software** and fixes the workflow inside existing tools in 3–6 weeks first. |
| **CRM / RevOps Implementation Agencies** *(HubSpot / Salesforce Partners)* | `€8,000–€30,000` project build | Deep CRM pipeline fields, quote workflows, and object automation | **Blind past "Closed-Won":** optimizes deal stages and billing mechanics while ignoring customer-perceived friction, low-trust over-automation, and Support feedback loops. `OP-CX-001` spans end-to-end Quote-to-Day-90 UX. |
| **Fractional CCO / CX Executive Retainers** | `€5,000–€12,000+/mo` ongoing | Senior executive coaching and board-level retention strategy | **Too heavy for initial proof:** buyers want a bounded fixed-scope audit before committing to ongoing senior retainers. `OP-CX-001` (`€1,000–€3,500`) serves as the Phase 0 diagnostic bridge. |

---

## 4. Diagnostic Elicitation Protocol *(Week 1–2 Execution Method)*

Translating `Primary Skills` (*Journey mapping, service design, customer interviews*) into a repeatable, solo-deliverable Week 1–2 fieldwork loop (`HYP-2027-005`):

### A. 3–5 Recent Closed-Won Deal Trace (`Evidence Over Opinion`)
Sample `3–5` closed-won accounts from the past 90 days (plus `1–2` recent stalled/churned accounts if available) and log six timestamps & counts per deal:
1. Date signed → Date Sales handoff completed (Days)
2. Date Sales handoff → Date client prerequisites cleared (Days + missing items count)
3. Date signed → Date formal Kickoff held (Days)
4. Date Kickoff → Date First Value milestone accepted (Days)
5. Date signed → Date clean invoice issued without Finance rework (Days)
6. Count of internal escalation / repeat-discovery loops across Days 0–90

### B. Multi-Role Interview Lens *(Adapted from `ADPA - Onboarding.docx` Personas)*
Conduct 20–30 minute structured interviews across four vantage points to capture qualitative friction alongside trace timestamps:
- **Account Executive / Founder:** *Where do custom deal commitments fail to survive handoff?*
- **Delivery / Onboarding Lead:** *Which missing client inputs or scoping ambiguities repeatedly stall Week 2?*
- **Customer Support / Finance Ops:** *Which preventable Day-30 tickets or billing queries trace back to onboarding?*
- **Recent Client Sponsor / PM (2–3 light calls if permitted):** *Where did you wait, repeat yourself, or lose clarity on what happened next?*

---

## 5. Internal IP Readiness Audit (`G1b` ≥70% Gate) & `ADPA - Onboarding.docx` Crosswalk

Verifying that ≥70% of `OP-CX-001` delivery IP is ready today without software procurement or custom engineering:

| Delivery Asset Required | Existing Internal IP / Crosswalk Source | Readiness | How `ADPA - Onboarding.docx` Is Used Cleanly |
| --- | --- | --- | --- |
| **Deal-Trace & Intake Gate Worksheet** | [OP-OPS-001 Pilot Charter](../OP-OPS-001_Quote_to_delivery_handoff_map/Pilot-Charter.md) + Section 4 above | **Ready (100%)** | Reuses handoff quality-gate concept without Bull queue ingestion |
| **5-Level Onboarding Maturity Rubric (`1–5`)** | Distilled in [Business-Case.md](Business-Case.md#L78) §4 | **Ready (100%)** | Extracted the 1–5 *Ad-hoc → Optimized* scoring levels cleanly |
| **Stakeholder / Persona Friction Lens** | 4-persona framing from `ADPA - Onboarding.docx` (*Consultant, Client PM, Practice Lead, Finance/Support*) | **Ready (90%)** | Adapted into Section 4B lightweight interview prompts |
| **90-Day Human-AI Playbook & RACI** | **Customer Experience Strategy & Design Thinking** Signature Toolkit + [One-Pager](../../docs/reports/One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md) | **Ready (90%)** | Replaced generic PMBOK doc generation with agile RACI + trust gates |
| **Baseline Telemetry & Case Study #1 Kit** | [Pilot Capture & Anonymization Kit](../OP-X-004_Case_study_series_on_2027/Pilot-Case-Study-Capture-and-Anonymization-Kit.md) (`OP-X-004`) | **Ready (100%)** | Aligns Week-1 baseline trace with `Tier 1/2/3` privacy & `OP-X-006` |

**`G1b` IP Coverage Verdict:** **~95% of advisory diagnostic assets are ready today at `\$0` cash outlay.** Full multi-tenant SaaS architecture, `portfolio_assessments` PostgreSQL tables, Bull worker queues, PDF/DOCX converters, Next.js dashboards, and 9 PMBOK subsidiary plans in `ADPA - Onboarding.docx` remain strictly scoped to [OP-CX-002 (UniCorn COAS)](../OP-CX-002_ADPA_Client_Onboarding_Assessment_COAS/Ideation-Spark.md).

---

## 6. Explicit Negative Scope Boundaries & Stage 1b (`G1b`) Gate

### What `OP-CX-001` Is Not Yet
1. **Not a software platform or portal build** — all custom React/PostgreSQL/AI document-ingestion engineering stays in `OP-CX-002`.
2. **Not a CRM/CS SaaS re-implementation agency** — CBa Consult writes configuration rules and intake gates for the client's existing stack rather than billing software setup hours.
3. **Not empirically `Validated` yet** — `HYP-2027-001` outreach (`0/15`) is in active `Testing`, while `HYP-2027-005` / `HYP-2027-006` remain `Formulated/Blocked` in [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md#L31-L33); `Active Pilots = 0` per [Portfolio-Status-Register.md](../../docs/registers/Portfolio-Status-Register.md#L26).
4. **Not promoted to `Pilot`** — upstream `Status` stays `Idea` in [inventory-of-ideas.md](../../inventory-of-ideas.md#L253) until Wave 1 sponsor conversion and Director `G4` sign-off.

### Stage 1b Completion Gate (`G1b` — Ideation Ready)
- [x] Existing internal IP covering **≥70%** of deliverables is verified (**~95%** ready — Section 5).
- [x] **3 real market comparables** (CS SaaS platforms, CRM/RevOps agencies, Fractional CCO retainers) benchmarked with clear differentiation (Section 3).
- [x] Tool-neutral, human-balanced boundaries vs. generic AI templates and SaaS integrators made explicit (Sections 2, 3 & 6).

*Source manifest preserved in [Source-Documents.md](Source-Documents.md).*
