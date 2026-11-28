---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-010"
execution_track: "Tier B Growth (Pillar 6: IT and Technology)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (§6 IT & Technology + Finance Companion §3-4)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-010`: Information Retention and Recovery Specialist

> **Governance & SSOT Callout:** This Stage 3 Business Case evaluates commercial viability under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). It builds on [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md), anchored in [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). No paid pilot actuals exist yet; commercial ranges are pre-pilot planning targets.

## 1. Executive Summary

| Dimension | Stage 3 Baseline |
| --- | --- |
| **Opportunity ID & Pillar** | `OP-ITG-010` — Pillar 6: IT and Technology (Tier B Growth; Medium & Large) |
| **Buyer Persona** | CIOs, DPOs, General Counsel, and CFOs managing migrations, M&A carve-outs, or disputes |
| **Core Offer** | Split-Clock WORM retention architecture + DPO/SoD chain-of-custody legacy record recovery |
| **Pricing / Capital Band** | €2,500–€8,000 fixed-scope fee (4–8 wks, 6–10 hrs/wk); \$0 initial working capital |
| **Target Window & Status** | Q2 2027 target quarter; `Idea` status; `PENDING_DIRECTOR_SIGNOFF` for Stage 4 (G4) |

## 2. Business Need & Cost of Inaction

- **Buyer Pain:** Organizations trapped in 12–15 year legacy SaaS/ERP/payroll licenses face blind GDPR "cleansing" conflicts against statutory tax clocks (NL *Belastingdienst* 7/10-year, 15-year 30%-ruling *actualiteitswaarde*, UK 6-year, US 4–7 year) and fragmented arbitration evidence.
- **Cost of Inaction:** Paying unnecessary read-only SaaS maintenance for 12+ years drains IT budgets, while premature deletion or unquarantined legacy payroll databases trigger GDPR Art. 5/17/18 violations, tax-audit penalties, and lost arbitration defensibility.
- **Pre-Pilot Modeling Note:** *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* `OP-ITG-010` derives from portfolio architecture in `inventory-of-ideas.md` (no `.docx` source); no realized client savings or ROI actuals are claimed prior to first paid engagement.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Commercial & Risk Profile | Recommendation |
| --- | --- | --- | --- |
| **Option A — Do Nothing** | Leave retention/recovery fragmented across IT and Legal | Forfeits high-urgency Tier B bridge across Finance, M365, and Legal | Reject |
| **Option B — Full Enterprise Archival Migration** | Contract to execute multi-terabyte ETL and legal representation | Exceeds solo/principal \$0 working-capital capacity and triggers legal-practice risk | Reject |
| **Option C — Split-Clock & Recovery Blueprint** | 4–8 wk diagnostic & forensic recovery architecture (€2,500–€8,000) | High margin, vendor-neutral, directly unlocks SaaS license decommissioning | **Recommend** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Zero Working-Capital Mechanics:** Uses CBa Consult's 2-Bucket Indefinite-Core Standard and Split-Clock WORM blueprints inside the client's existing cloud/Purview/Fabric environment—€0 CBa infrastructure spend and zero raw PII stored locally.
- **Engagement Tiers:** Diagnostic & Split-Clock Architecture (€2,500–€4,500, 4 weeks) and Full Decommission & Chain-of-Custody Recovery Pack (€5,000–€8,000, 6–8 weeks).
- **Compounding Path:** Operates as a high-leverage "Retain Right & Decommission Without Data Loss" service pairing directly with `OP-FIN-009`/`010`, `OP-ITG-004` (M365), `OP-LEG-002`, and M&A carve-outs (`OP-STR-004`/`005`).

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Impact / Likelihood | Compensating Control |
| --- | --- | --- | --- |
| **R1** | Raw PII leakage or unauthorized legacy DB modification | Critical / Low | Mandatory break-glass DPO authorization, SoD chain-of-custody, and zero raw-PII local storage |
| **R2** | Cross-border tax vs. GDPR Art. 18 quarantine conflict | High / Medium | Document explicit legal-hold basis signed by client General Counsel / DPO before execution |
| **R3** | Client expects CBa Consult to act as formal arbitration counsel | Medium / Medium | Maintain strict architectural/forensic-reconstruction scope; partner with client external counsel |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Item | Status | Adjudication Requirement |
| --- | --- | --- |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Requires formal sign-off by Menno Drescher (Director, CBa Consult) |
| **Pre-Pilot Prerequisite 1** | Open | Standardize DPO break-glass authorization form and Split-Clock NL/UK/US matrix template |
| **Pre-Pilot Prerequisite 2** | Open | Define Stage 2 hypotheses and cross-sell trigger into active `OP-FIN-009`/`010` and `OP-ITG-004` pipeline |
