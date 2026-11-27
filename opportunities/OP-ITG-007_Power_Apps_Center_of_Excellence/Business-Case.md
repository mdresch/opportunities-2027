---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-007"
execution_track: "Track A — Advisory / Starter Kit (Core & Specialty Backlog)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (§6 IT and Technology); Ideation-Spark.md (ADPA .docx anomaly flagged)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-007`: Power Apps Center of Excellence

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Dimension | Assessment |
| --- | --- |
| **Opportunity ID & Title** | `OP-ITG-007` — Power Apps Center of Excellence |
| **Portfolio Tier & Pillar** | Core & Specialty Backlog · 6. IT and Technology (Digital Transformation Toolkit) |
| **Target Buyer & Segment** | CIOs, CTOs & Enterprise Architecture / Cloud Leads (Medium & Large) |
| **Commercial Band & Horizon** | €2,500–€8,000 · 6–10 weeks · Medium effort · Target Q2–Q3 2027 |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` (Evaluate alongside Tiers A–C; pair with `OP-ITG-004` / `OP-DTX-003`) |

`OP-ITG-007` gives Medium and Large Microsoft 365 organizations a practical, conflict-free Center of Excellence (CoE) starter kit to eliminate shadow-IT sprawl, enforce Data Loss Prevention (DLP) boundaries, and govern citizen-developed Power Platform assets at `` `$0` `` incremental software cost.

## 2. Business Need & Cost of Inaction

Unchecked citizen development in Power Apps and Power Automate creates silent operational risk: business-critical processes run in Personal/Default environments without ALM, sensitive SharePoint or ERP data leaks via unapproved connectors, and premium Power Platform licenses sprawl without chargeback or retirement hygiene. Fixing a single shadow-IT data breach or rewriting an orphaned departmental workflow costs multiples of a proactive €2,500–€8,000 CoE starter engagement.

*Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* Although [Source-Documents.md](Source-Documents.md) links `Power Apps Center of Excellence.docx`, inspection of the ADPA digest shows that file contains unrelated "SES O3b mPower Apps Center of Excellence" satellite-network content rather than Microsoft Power Platform CoE modeling. Consequently, zero ADPA ROI/NPV figures are carried into this Business Case; all commercial KPIs (orphan-app reduction, DLP compliance rate, license rationalization) will be baselined in Paid Pilot #1.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Effort & Capital | Strategic Fit | Recommendation |
| --- | --- | --- | --- | --- |
| **Option A: Modular CoE Governance Starter Kit** | 6–10 wk fixed-scope CoE operating model, DLP guardrails, and templates paired with `OP-ITG-004` / `OP-DTX-003`. | Medium effort, `` `$0` `` outlay | High; strengthens M365 & Digital Labor governance | **Recommended** |
| **Option B: Full Microsoft CoE Managed Service** | Ongoing 24/7 environment administration and custom Power Apps delivery team. | High ongoing ops | Poor; breaks solo cap and conflict-free positioning | **Rejected** |
| **Option C: Defer / Fold Entirely into `OP-ITG-004`** | Do not market standalone; deliver Power Platform CoE only as a module inside M365 Governance. | Low incremental BD | Moderate; viable fallback if Q2–Q3 capacity tightens | **Viable Fallback** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging & Pricing Anchor:** Fixed-fee **€2,500–€8,000** over **6–10 weeks**, tiered by tenant size (Single-Entity Starter Kit at €2,500–€4,500 vs. Multi-Region DLP & Maker Governance at €5,000–€8,000).
- **Deliverable Package:** (1) Tenant & Shadow-App Discovery Audit, (2) Environment & DLP Policy Matrix, (3) App-Tiering & Maker Onboarding Kit, and (4) CoE Operating Cadence Handover.
- **`$0` Working-Capital Model:** Leverages Microsoft's native Power Platform Admin Center and free CoE Starter Kit components plus CBa Consult's governance templates—zero third-party SaaS licensing or contractor spend.
- **Compounding Path:** Pairs directly with **`OP-ITG-004` (M365 Governance)** and **`OP-DTX-003` (Power Platform Solutions)**, and creates a natural bridge into **`OP-ITG-013` (AI Agent Governance)** as citizen makers expand from Power Apps into Copilot Studio agents.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| `R-01` | **Shadow-IT Sprawl Continues Post-Delivery:** Guardrails documented on paper but never enforced in tenant DLP. | High / High | Require live client-admin execution of Default-environment DLP policies and maker-tiering rules before engagement sign-off. |
| `R-02` | **ADPA Source Provenance Error:** Legacy `.docx` content ("SES O3b mPower") reused accidentally in pitch decks. | Medium / High | Quarantined in Section 2 & Ideation-Document; author all client assets fresh from `Digital Transformation` toolkit. |
| `R-03` | **Scope Creep into Custom App Building:** Client asks CBa to fix/rebuild broken shadow apps within CoE fee. | Medium / Medium | Explicitly exclude app remediation/builds from `OP-ITG-007`; route build requests to a separate `OP-DTX-003` SOW. |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Required Action Before `Idea` -> `Pilot` |
| --- | --- | --- |
| **Director Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Requires explicit `requires_human_approval: true` sign-off in [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). |
| **ADPA Hygiene & Toolkit Check** | Action Required | Unlink or replace mismatched `Power Apps Center of Excellence.docx`; confirm ≥70% M365/DLP template coverage. |
| **Stage 2 Hypotheses** | Pre-Stage 2 | Log `HYP-2027-NNN` testing buyer preference for standalone CoE vs. `OP-ITG-004` bundle before G4. |
| **Pilot Charter Gate (`G4`)** | Locked | Lock target client, €2,500–€8,000 fee, non-build boundary, and measurable DLP/shadow-app KPI. |

### Director Adjudication Conditions (`G4` Checklist)

- **ADPA Provenance Cleanup:** Ensure no "SES O3b mPower" satellite content leaks into proposals or client deliverables.
- **Bundling Priority:** Position first as a companion to active `OP-ITG-004` (M365) or `OP-DTX-003` (Power Platform Solutions) accounts in Q2–Q3 2027.
- **Non-Build Guardrail:** Keep custom Power Apps remediation and development strictly outside the €2,500–€8,000 CoE Starter Kit SOW.
- **Pilot Proof Metric:** Track percentage of Default-environment apps assigned verified owners and covered by enforced DLP policies within 10 weeks.
