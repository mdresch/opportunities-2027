---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Capability Structuring"
lifecycle_stage: "Stage 1b — Ideation (Tier 2 Draft — Director Review Required)"
governance_policy: "Human Adjudication Gate (requires_human_approval: true)"
opportunity_id: "OP-CHG-001"
status: "Idea"
inputs:
  - "Ideation-Spark.md"
  - "Source-Documents.md"
  - "ADPA - Communication Management Plan.docx (OneDrive canonical source)"
  - "Communication Management Plan in Age of AI.docx (OneDrive supporting source)"
  - "../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md"
outputs:
  - "Ideation-Document.md"
date: 2026-11-27
---

# Ideation Document — `OP-CHG-001`: Framework & Tool Adoption Playbook

**Stage:** Stage 1b — Ideation (`Tier 2 Deeper Research & Structural Framing`)  
**Governing Process:** [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) · [ideation-template.md](../../ideation-template.md)  
**Primary Verified Internal IP:** `ADPA - Communication Management Plan.docx` *(v1.0, Menno Drescher — structured in §3 below)*  
**Supporting Internal IP:** `Communication Management Plan in Age of AI.docx` · Local BD assets indexed in [BD-Quick-Reference.md](BD-Quick-Reference.md)

---

## 1. Problem Framing & the 2027 Post-Audit Adoption Gap

Medium and Large enterprises routinely invest tens of thousands of euros in Finance, HR, Legal, Operations, and IT/AI diagnostics only to suffer **"binder-on-the-shelf" decay** within 60 days of delivery. Root causes observed across transformation programs include:

1. **Stakeholder Blind Spots:** Communications treat "all staff" as one audience instead of distinguishing executive decision-makers (SteerCo), functional gatekeepers (InfoSec, Legal, Finance Ops), delivery teams, pilot champions, and Service Desk hypercare staff.
2. **Absence of Operating Ceremonies & Escalation SLAs:** Once the audit team exits, there is no structured weekly showcase, SteerCo decision rhythm, RAID/Decision log traceability, or L1/L2/L3 escalation path when adoption friction hits.
3. **Zero Adoption Telemetry:** Leadership cannot see workflow adoption, exception aging, UAT defect trends, or helpdesk ticket volume—turning change management into unmeasured "soft workshops" that CFOs cut first during budget reviews.
4. **AI-Era Behavioral Gap:** Across 2026–2027 AI and framework rollouts (`OP-HR-015`, `OP-ITG-013`, `OP-FIN-009`), individual tool experimentation outpaces governed organizational adoption (the *67% individual vs. 32% organizational impact gap*).

**Core Design Thesis:** Replace generic change-management theory with a **deterministic, audit-grade Adoption Operating System** derived directly from CBa Consult's battle-tested **ADPA Communication & Change Governance architecture**, tailored cleanly to any parent Finance, HR, Ops, Legal, or AI framework.

---

## 2. Target Offering Architecture (5-Module Playbook, 6–8 Weeks)

| Module | Timing | Core Activities & Artifacts Delivered | Adoption Outcome |
| :--- | :--- | :--- | :--- |
| **M1. Stakeholder & Change-Impact Mapping** | Week 1 | Segment impacted roles across the **9-Tier Stakeholder Matrix**; assess workflow deltas (`As-Is → To-Be` friction points); map RACI, sponsorship mandate, and distribution lists. | Eliminates unaddressed resistance pockets before rollout. |
| **M2. Communications, Ceremony & Escalation Engine** | Weeks 2–3 | Deploy tailored Communications Plan, **4 Core Ceremonies** cadence, **RAID / Decision / Change Log** templates, Confluence/SharePoint single-source hub structure, and **L1/L2/L3 Escalation SLAs**. | Creates predictable executive & operational governance rhythm. |
| **M3. Champion Network & Role-Based Micro-Enablement** | Weeks 3–5 | Charter **Business Users / Pilot Champions**; deliver role-specific Quick Reference Guides (`QRGs`), UAT showcase scripts, release-note templates, and AI-era guardrails (*human accountability boundaries*). | Replaces generic "prompt training" with job-specific workflows. |
| **M4. Adoption Telemetry & 30/60/90-Day KPI Scorecard** | Weeks 5–6 | Define 4–6 quantitative adoption KPIs tied directly to parent audit objectives (completion %, process adherence, exception rate, rework hours, SLA velocity) inside leadership status packs. | Converts change management into CFO-defensible ROI metrics. |
| **M5. Hypercare & Service-Desk BAU Handover** | Weeks 6–8 | Run structured **Pre-Go-Live → Hypercare → BAU** handover to Support / Service Desk with runbooks, known-error KB articles, pulse feedback loops, and 30-day review cadence. | Prevents post-launch regression once CBa Consult steps back. |

---

## 3. Verified Internal IP (`≥70%` Coverage): ADPA Communications & Change Engine

To prove `≥70%` existing IP feasibility per Stage 1b Gate `G1b`, the complete governance framework from **`ADPA - Communication Management Plan.docx`** *(Owner: Menno Drescher, v1.0)* is normalized below as the **reusable operational backbone** for `OP-CHG-001` client engagements.

### 3.1 Stakeholder Communications Matrix (9 Pre-Mapped Enterprise Groups)

*Core Objectives:* Ensure the right stakeholders receive the right information at the right cadence via agreed channels; drive timely decisions, surface/resolve risks and issues, foster adoption; and maintain traceability via centralized hubs (Confluence/SharePoint) and dashboards.

| Stakeholder Group | Information Needs | Agreed Channels | Cadence | Owner / Sender | Artifacts & Format | Feedback Mechanism |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Executive Sponsor & SteerCo** | Value realization, scope/schedule/budget status, key risks/issues/decisions, change requests | Meetings, email, Confluence/SharePoint (decision & status pages), dashboards | Biweekly SteerCo; ad hoc urgent escalations; monthly benefits | PM (with PO & Tech Lead) | SteerCo deck, 1-page status (`RAG`, KPIs), decision log, RAID excerpts | Meeting Q&A, Confluence decision comments, email replies |
| **2. Product Owner / Business Lead** | Backlog health, scope trade-offs, UAT progress, benefits, adoption feedback | Meetings, email, Confluence/SharePoint (backlog & plans), dashboards | Weekly sync; ad hoc grooming; milestone sign-offs | PM (PO co-owns backlog comms) | Backlog views, status mail, feature burndown, UAT defect reports | Confluence story comments, change-request form, email |
| **3. PMO / Governance** | Compliance to methodology, stage gates, financials, change control | Email, meetings, Confluence/SharePoint (gate evidence), dashboards | Monthly governance report; per stage-gate review | PM | Stage gate checklist, change log, financial summary | SharePoint review notes, email queries |
| **4. Core Delivery Team** *(Eng, QA, BA, Architect)* | Sprint goals, dependencies, risks/issues, release plan, quality/throughput metrics | Meetings, Confluence/SharePoint (tech docs), dashboards, email | Weekly project sync; tech design reviews; release readiness | PM (coord.), Tech Lead (content) | Weekly notes/actions, design docs, runbooks, release checklist | Meeting discussion, Confluence comments, tracked actions |
| **5. InfoSec / Compliance / Legal** | Security/privacy posture, risk assessments, audit evidence, exceptions, data residency | Email, meetings, SharePoint (evidence), Confluence (policies/decisions) | Monthly risk touchpoint; ad hoc for assessments | PM with Security Lead | PIA/DPIA docs, pen-test summaries, access reviews, exception register | SharePoint review notes, email threads |
| **6. Data / IT Ops / Cloud Platform** | Environment readiness, performance, monitoring, incident trends, change windows | Meetings, SharePoint (runbooks), dashboards, email | Weekly ops readiness; per-deployment briefings | PM; Ops/Platform Leads | Ops status, capacity & SLO dashboards, change calendar, incident summaries | Ops review meetings, SharePoint runbook requests |
| **7. Business Users / Pilot Champions** | Feature/framework availability, UAT plans, known issues, training guides, release impacts | Email, Confluence/SharePoint (guides), meetings (showcases), dashboards | Weekly UAT showcases; per-deployment release briefings | PM & Product Owner | UAT plan, quick reference guides (`QRGs`), release notes, known-issues page | UAT feedback form, Confluence comments, email |
| **8. Vendors / Partners** | Integration timelines, SLAs, incidents, roadmap changes | Email, meetings, SharePoint (contracts/SLAs), dashboards | Monthly vendor review; incident/post-incident reviews | PM with Vendor Mgr / Tech Lead | Action logs, SLA scorecards, incident reports | Meeting minutes ack via email, SharePoint change requests |
| **9. Support / Service Desk** *(Post Go-Live)* | Runbooks, on-call matrix, release notes, known errors, support KPIs | SharePoint (runbooks/KB), email, handover meetings, dashboards | Pre go-live handover; weekly hypercare; per release | PM with Ops Lead | Support model doc, KB articles, release notes, incident playbooks | KB comments/requests on SharePoint, email to Ops/PM |

### 3.2 Operating Ceremonies, Reporting Artifacts & Channels

| Element Type | Item & Standard Spec | Operational Rule for `OP-CHG-001` Rollouts |
| :--- | :--- | :--- |
| **Ceremony 1** | **Weekly Project / Adoption Sync** (`45–60 min`) | Core team (+ PO/Ops/Security as needed): review RAG, blockers, dependencies, upcoming releases; outputs dashboard snapshot & updated action log on hub. |
| **Ceremony 2** | **Biweekly SteerCo** (`60 min`) | Executive Sponsor, PO, PM, Tech Lead, PMO: KPIs/adoption benefits, scope/budget, risk escalations, formal approvals logged in Decision Log. |
| **Ceremony 3** | **Weekly UAT / Pilot Showcases** (`45 min`) | Business users, SMEs, PO, QA, PM: demonstrate framework/tool increments, validate acceptance criteria, capture UAT scorecard & sign-off. |
| **Ceremony 4** | **Release Notes & Distribution Broadcasts** *(Per Release)* | Standardized summary (*what changed, why, risks, impact, downtime, rollback, verification, contacts*) posted to hub + distribution lists (`*-SteerCo`, `*-Core`, `*-Announce`). |
| **Core Logs & Reports** | **Weekly Status Mail · BI Dashboard · RAID · Decision Log · Change Log** | Dashboard tracks throughput, accuracy, exception rates, SLA adherence & budget; Decision Log captures Owner, Date, Context, Decision, Impacts; email tagged `[Program][Status][YYYY-MM-DD]`; minutes posted within 24h. |
| **Content & Hub Governance** | **Role-Assigned Page Ownership + Pulse Feedback** | Explicit Content Owners (`PO` business, `Tech` technical, `Ops` operational, `Security` compliance) and named Page Owners enforce hub freshness; quarterly comms review uses UAT feedback & post-release pulse surveys. |

### 3.3 Standardized 3-Tier Escalation Architecture

| Incident / Blocker Domain | Tier / SLA | Escalation Action & Owner |
| :--- | :--- | :--- |
| **Delivery & Adoption Blockers** | **L1 (`≤1` business day)** | Program Lead / PM engages action owner directly; logs item in RAID; reviews in Weekly Sync. |
| **Delivery & Adoption Blockers** | **L2 (`≤2` business days)** | Product Owner & Tech/Functional Lead hold targeted working session; adjust rollout plan or enablement assets. |
| **Delivery & Adoption Blockers** | **L3 (`Next SteerCo / Ad Hoc Urgent`)** | Executive Sponsor / SteerCo adjudicates scope, policy enforcement, budget, or timeline decisions. |
| **Security / Privacy Incidents** | **Immediate** | Notify Security Lead & PM; convene incident review; execute incident response process; post summary to SharePoint & notify SteerCo via email. |
| **Production Incidents (Post Go-Live)** | **Immediate** | Ops / Service Desk activates runbooks and notifies PM; post incident minutes to SharePoint and issue corrective actions post-PIR. |

### 3.4 AI-Era Extension Input (`Communication Management Plan in Age of AI.docx`)

Supporting ADPA IP extends Sections 3.1–3.3 for **AI-enabled framework & agent rollouts** (`OP-HR-015`, `OP-ITG-013`, `OP-FIN-009`), adding explicit communication guardrails around *human-in-the-loop accountability*, *approved vs. shadow AI boundaries*, *prompt/evidence transparency*, and *feedback loops on model/exception accuracy*. Full content mapping is tracked in [Source-Documents.md](Source-Documents.md).

---

## 4. Competitive Comparables & Differentiation (`G1b` Benchmark)

| Comparable / Alternative | Typical Buyer & Pricing | Strength | Structural Gap Exploited by `OP-CHG-001` |
| :--- | :--- | :--- | :--- |
| **1. Big Four OCM Practices** *(Deloitte/EY/Accenture Change)* | Enterprise CIO/CHRO · `€50k–€250k+` multi-month retainers | Deep bench & executive brand credibility | Heavy overhead, junior analyst leverage, detached from lean mid-market/BU sprint timelines; rarely practical for `€5k–€20k` targeted audits. |
| **2. Prosci / ADKAR Boutique Certifications & Licenses** | L&D / Change Specialists · `€3k–€10k` per practitioner + consulting day rates | Recognized change vocabulary (`ADKAR`) | Methodology-heavy, framework-agnostic theory that still requires the client's PMO to build stakeholder matrices, escalation SLAs, UAT showcases, and operational dashboards from scratch. |
| **3. Generic AI & Tool "Lunch-and-Learn" Workshops** | HR / IT Training · `€1k–€4k` one-off sessions | High initial engagement & low procurement friction | Produces short-lived enthusiasm without BAU ceremonies, Service Desk runbooks, compliance boundaries, or 30/60/90-day adoption telemetry—driving the org-vs-individual impact gap. |
| **CBa Consult (`OP-CHG-001`)** | **PMO / CHRO / Functional Sponsors · `€1,500–€5,000` Fixed Scope** | **Pre-built 9-stakeholder ADPA comms/escalation engine + `≥70%` IP reuse** | **Conflict-free, fixed-fee implementation bridge that attaches directly to Finance/HR/AI/Ops audits and proves ROI via hard 30/60/90-day operational adoption KPIs.** |

---

## 5. Draft Stage 2 Falsifiable Hypotheses *(Candidates Only — Not Yet Registered)*

> **Governance Note:** Per [Tailored-Hybrid-SIDPA-Governance.md §3](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), the hypotheses below are **draft candidates** for Director review before registration into [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md).

1. **Candidate `HYP-CHG-001-A` *(Desirability / Audit Bolt-On Attach)*:**  
   *We believe* **Medium & Large buyers evaluating or completing a CBa Consult diagnostic audit** (`OP-FIN-009`, `OP-HR-002`/`015`, `OP-ITG-013`) *will* **opt into `OP-CHG-001` as a paid Phase-2 implementation bolt-on (`€1,500–€5,000`)** *because* **internal audit/compliance sponsors struggle to convert policy documents into frontline compliance**. *We will know this is true when* **≥40% of qualified diagnostic proposals (`≥2 of 5` Wave-1/Q2–Q3 audit conversations) request inclusion of the Adoption Playbook scope** *within* **60 days of structured proposal pitching**, *and false if* **<20% (`≤1 of 5`) express budget willingness when adoption KPIs are included**.

2. **Candidate `HYP-CHG-001-B` *(Feasibility & IP Leverage)*:**  
   *We believe* **one CBa Consult Director** *can* **configure and deliver a complete client Adoption Playbook (`M1–M5`) inside 6–8 weeks (`≤8 hrs/week`) with €0 cash outlay** *because* **ADPA `Communication Management Plan` + `Age of AI` assets cover ≥70% of core matrices, ceremonies, escalation SLAs, and templates**. *We will know this is true when* **a full dry-run adaptation for one live anchor audit (e.g., `OP-FIN-009` Continuous Close rollout) requires ≤45 hours total effort**, *and false if* **client customization exceeds 65 hours or requires external LMS/training tooling spend**.

---

## 6. Stage 1b (`G1b`) Completion Checklist

- [x] **Internal IP (`≥70%`) verified:** Full ADPA Communications Matrix (9 groups), 4 ceremonies, RAID/Decision/Change logs, and L1/L2/L3 escalation paths extracted and structured (§3).
- [x] **Market comparables benchmarked:** 3 clear comparables analyzed with explicit positioning against Big Four OCM, ADKAR boutiques, and generic workshops (§4).
- [x] **Differentiation & scope boundaries explicit:** Hard KPI telemetry + audit-attachment thesis separated from custom LMS build or interim staffing.
- [ ] **Director Sign-Off:** Review §4–§5 and authorize hypothesis registration into [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md) (`G2`) alongside pilot pricing test in [Business-Case.md](Business-Case.md).
