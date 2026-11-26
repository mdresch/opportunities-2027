---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "4.1 Develop Project Charter (Stage 3–4 Pre-Pilot Gate)"
lifecycle_stage: "Stage 3–4 (Pre-Pilot Charter — PR Preparation Mode; G4 Pending)"
pr_preparation_mode: true
opportunity_id: "OP-ITG-013"
execution_track: "Hybrid — Track A (Client Advisory Delivery) + Track B Portal Intake (mdresch/agent-governance-onboarding)"
requires_human_approval: true
approval_status: "PENDING_DIRECTOR_SIGNOFF"
date: "2026-11-23"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Pre-Pilot Charter & Stage 3–4 Gate (`G4`) — `OP-ITG-013`: Enterprise AI Agent Governance Assessment

> **Governance Notice (SIDPA `G4` Gate):** This Pre-Pilot Charter locks the commercial scope, economics, out-of-scope boundaries, and portal-driven discovery mechanism for `OP-ITG-013`. Per the Honest Evidence Baseline, inventory `Status` remains **`Idea`** until the web portal captures qualified CIO/CISO prospects (`HYP-2027-013` / `HYP-2027-014`) and the Director records explicit sign-off in §5 below.

---

## 1. Stage 3 — Benefits, Economics & Capital Constraints (`G3`)

| Commercial Variable | Locked Pre-Pilot Parameter |
| --- | --- |
| **Initial Cash Outlay** | **\$0** (hosted static/client-side web portal + existing CBa Consult diagnostic & Word templates) |
| **Capacity Allocation** | **8–12 hrs/week** (within the 10–15 hrs/wk portfolio cap; 2–3 wks for Tier 1 Triage / 6–10 wks for Tier 2 Full Assessment) |
| **Two-Tier Pricing Anchor** | **Tier 1 (Phase 0 Agent Sprawl & Identity Triage):** `€2,500–€5,000` (15–30 hrs) · **Tier 2 (Full 8-Pillar Assessment):** `€6,000–€18,000+` (45–100+ hrs) |
| **Target Realization** | ≥€125–€175/hr effective solo consulting rate |
| **Primary Client Outcome KPI** | **100% of active tenant AI agents inventoried with named Human Sponsors**, all **P0 shared-credential / uncapped FinOps / SoD red flags** surfaced, and a board-ready 90-day remediation roadmap mapped to **EU AI Act Annex III (Dec 2, 2027)** and **SOX/ISA 265 ITGC** |
| **Compounding / Reinvestment Path** | Pilot #1 converts into (1) sanitized **Case Study #1 (`OP-X-004`)**, (2) **≥70% reusable** 8-pillar delivery templates, and (3) recurring **`OP-ITG-018` Managed Intelligence Provider (MIP)** retainer (`€2,500–€12,000+/mo`) |

---

## 2. Inbound Prospect Acquisition Mechanism (Web Portal Funnel)

Rather than relying solely on cold manual outreach, the **10 CIO/CISO discovery prospects** (`HYP-2027-013`, `HYP-2027-014`) will be identified, qualified, and captured through the dedicated **`mdresch/agent-governance-onboarding`** web portal:

1. **Distribution Channel:** LinkedIn thought-leadership posts (paired with [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx) and the Accounting/AI Pricing Executive Brief) + direct CIO/CISO invites to run the self-assessment portal.
2. **Self-Assessment Capture:** Prospects complete the 8-pillar / 40-control self-assessment + Top-10 P0 Red-Flag Triage in `agent-governance-onboarding`. **Executives delegate** by function (CFO → Controller, CISO → IAM/SOC, etc.) per [Assessment-Delegation-and-Ownership-Matrix.md](Assessment-Delegation-and-Ownership-Matrix.md); the portal dashboard tracks completion before export (`.md`/`.json`/PDF) to book a 30-minute Executive Briefing.
3. **Qualification Target (`HYP-2027-013` / `HYP-2027-014`):** Capture **10 qualified mid-market CIO/CISO prospects** (250–2,500+ seats) via portal intake → validate ≥5 with unmanaged agent/credential sprawl → convert ≥1 paid Tier 1 Triage (`€2,500–€5,000`) or Tier 2 Assessment (`€6,000–€18,000+`).

### 10-Prospect Portal Intake & Discovery Tracker

*Planning names #1–10 match [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md). Replace with CRM legal names when invites send; portal columns fill on first submission.*

| # | Date | Organization & Seat Band | Role (CIO/CISO/CAIO) | Portal Index (1–5) | P0 Red Flags | Tier Pitched & Outcome |
| :-: | --- | --- | --- | :-: | :-: | --- |
| 1 | — | Benelux Insurer MidCo (800–1,400 seats) | CISO | — | — | Invite planned |
| 2 | — | Rhine Manufacturing HoldCo (1,200–2,000) | CIO | — | — | Invite planned |
| 3 | — | North Sea Logistics NV (400–900) | CIO / CISO | — | — | Invite planned |
| 4 | — | Clinical Network Services (600–1,100) | CISO | — | — | Invite planned |
| 5 | — | Wealth Platform BV (250–600) | CISO | — | — | Invite planned |
| 6 | — | Retail Franchise Group (1,500–2,500) | CIO | — | — | Invite planned |
| 7 | — | Professional Services Alliance (300–700) | CAIO / CIO | — | — | Invite planned |
| 8 | — | Energy Transition OpCo (900–1,800) | CISO | — | — | Invite planned |
| 9 | — | Public Sector Shared Service (1,000–2,000) | CISO | — | — | Invite planned |
| 10 | — | PE-Backed SaaS Scale-Up (200–450) | CIO | — | — | Invite planned |

### 2b. Portal production URL *(prep — set when live)*

| Field | Value |
| --- | --- |
| **Hosting** | *TBD — see [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) §B* |
| **Public URL** | *Record in [data/portal-deploy-status.json](data/portal-deploy-status.json) when deployed* |
| **Booking URL** | *Completion-screen CTA — same JSON file* |
| **Prep checklist** | [PR-ITG-013-Preparation-Checklist.md](PR-ITG-013-Preparation-Checklist.md) |

---

## 3. Locked Scope, Deliverables & Explicit Out-of-Scope Boundaries

- **Core Deliverables (Already Built & Ready for Day 1):**
  - [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) (40 scored controls, 5-level maturity rubric, 12-field Agent Inventory Register schema, Top-10 P0 Red-Flag Checklist)
  - [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx) (boardroom client datasheet)
  - [Tier-2-Market-Research.md](Tier-2-Market-Research.md) (Gartner June 2025, Entra Agent ID / Agent 365, ServiceNow/Okta/SailPoint/Wiz positioning, honest IP audit)
  - Standalone Intake Portal Repo: [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding)
- **Explicit Out-of-Scope Boundaries (Mandatory in Every Proposal):**
  1. **No custom connector engineering** into Microsoft Agent 365 / Entra / SIEM during a fixed-scope advisory assessment (`ICT-Governance-Framework-Application` provides the control model, not a turnkey SaaS connector).
  2. **No L1 IT / MSP tenant administration** (client IT/MSP owns production configuration changes).
  3. **No 24/7 SOC / MSSP incident containment** (client MSSP owns live security operations).
  4. **No accredited ISO/IEC 42001 certification or statutory audit opinion** (CBa Consult delivers 100% conflict-free pre-assurance and remediation blueprints; accredited bodies & statutory auditors retain formal certification/attestation).

---

## 4. Stage 4 Pre-Pilot Gate (`G4`) Readiness Checklist

- [x] **7 Pivotal Questions finalized** in [Ideation-Spark.md](Ideation-Spark.md) & [Tier-2-Market-Research.md](Tier-2-Market-Research.md).
- [x] **Explicit out-of-scope boundaries** defined above (non-MSP, non-MSSP, non-accredited certifier, no custom connector engineering).
- [x] **Execution tracks assigned:** **Track A** (Lightweight Advisory delivery in `oppurtunities-2027`) + **Track B** (Standalone portal repo `mdresch/agent-governance-onboarding`).
- [x] **Core assessment artifacts built** (`HYP-2027-015` Phase 1 internal deliverable verified at \$0 cash outlay).
- [ ] **Web portal live & capturing prospects:** Deploy/share `mdresch/agent-governance-onboarding` to capture the 10 CIO/CISO prospects (`HYP-2027-013`, `HYP-2027-014`).
- [ ] **Named Pilot #1 sponsor signed** (Tier 1 Triage or Tier 2 Assessment).
- [ ] **Director Sign-Off recorded below** before flipping `inventory-of-ideas.md` status from `Idea` → `Pilot`.

---

## 5. Director Adjudication (`requires_human_approval: true`)

| Field | Entry |
| --- | --- |
| **Decision Owner** | Menno Drescher (Director, CBa Consult) |
| **Gate Status** | `PENDING` *(ready to authorize once Pilot #1 sponsor is captured via `agent-governance-onboarding` portal)* |
| **Approval Date & Notes** | *—* |

---

## 6. PR preparation mode (`PR-ITG-013` — **not** authorized yet)

> Inventory **`Status` remains `Idea`**. This section tracks **pre-`G4` work** only.

| Workstream | Entry point | Status |
| --- | --- | --- |
| Portal deploy | [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) · [Portal-Engineering-Backlog.md](Portal-Engineering-Backlog.md) | Open |
| Wave 0 outreach (#1–3) | [Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md) | Open |
| Graduation criteria | [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) | G4.1 met; G4.2–G4.6 open |
| Pilot #1 delivery (post-sponsor) | [Pilot-1-Delivery-Log-Template.md](Pilot-1-Delivery-Log-Template.md) | Dormant until CRM sponsor |
| Master prep tasks | [PR-ITG-013-Preparation-Checklist.md](PR-ITG-013-Preparation-Checklist.md) | In progress |
