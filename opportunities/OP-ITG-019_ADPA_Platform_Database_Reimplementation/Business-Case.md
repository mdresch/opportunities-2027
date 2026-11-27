---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-019"
execution_track: "Track B Candidate — Future 2027 Platform Engineering (graduates to mdresch/adpa under sidpa-template)"
requires_human_approval: "true"
approval_status: "PARKED_IN_INVENTORY"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA - Project Charter.docx, ADPA Business Case.docx & mdresch/adpa PoC (29 assigned files)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-019`: ADPA 2027 Platform Evolution (Database Layer & Project Reimplementation)

> **Authoritative SSOT & Governance Notice:** Authoritative inventory fields (`Active Backlog — Future 2027 Platform Development` · `TBD multi-sprint` · `High` effort · `Capital TBD ($0 cash cap)` · `Q3–Q4 2027` · `Status = Idea`) live in [inventory-of-ideas.md](../../inventory-of-ideas.md). Authoritative delivery priorities live in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Companion files: [Ideation-Spark.md](Ideation-Spark.md), [Ideation-Document.md](Ideation-Document.md), [Source-Documents.md](Source-Documents.md), [ADPA-2027-Architecture-and-DB-Blueprint.md](ADPA-2027-Architecture-and-DB-Blueprint.md), [ADPA-Risk-Management-Scenario-Module.md](ADPA-Risk-Management-Scenario-Module.md).

---

## 1. Executive Summary

| Dimension | Business Case Summary |
| --- | --- |
| **Initiative** | **ADPA 2027 Platform Evolution (`OP-ITG-019`)** — add persistent database layer to `mdresch/adpa` and reimplement existing CBa projects into one unified knowledge/document backbone |
| **Target Beneficiary** | **Internal CBa Consult delivery first** (multiplying margin on `OP-ITG-014` & `OP-ITG-018`); external commercial buyer **intentionally TBD** |
| **Strategic Role** | **Future 2027 Internal-to-Commercial Asset** — powers Strategic Assets 2 & 4 (`OP-ITG-014`, `OP-ITG-018`, `OP-FIN-011`, `OP-RSK-005`) once Wave 1 revenue is flowing |
| **Working Capital & Effort** | **`$0` cash cap** · `High` multi-sprint engineering effort · strictly deferred to `Q3–Q4 2027` |
| **Recommended Option** | **Option 3 — Time-Boxed Internal Accelerator First (`Q3–Q4 2027` Track B Graduation)** |

**Recommendation:** Keep `OP-ITG-019` **`PARKED_IN_INVENTORY`** during Q1–Q2 2027. Do **not** authorize multi-sprint database engineering until Wave 1 client pilots (`OP-OPS-001 → OP-CX-001`, `OP-FIN-009`) generate commercial traction and free capacity.

---

## 2. Business Need & Cost of Inaction

Without persistent DB storage and project reimplementation, `mdresch/adpa` remains a file-based PoC whose outputs, lineages, and ontologies cannot scale cleanly across recurring MIP (`OP-ITG-018`) or Context Governance (`OP-ITG-014`) engagements. At the same time, premature platform building in Q1–Q2 2027 carries a severe opportunity cost: every engineering hour spent refactoring ADPA before client sales steals from revenue-generating Tier A pilots.

- **Source Modeling Caveat:** *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* Legacy `.docx` sources (`ADPA - Project Charter.docx` and `ADPA Business Case.docx`) cite Fortune 500 assumptions (`1,000+` annual documentation hours, `20%` rework, `50%` cycle-time cut, `≥95%` extraction accuracy, `6–10` FTE build teams, and `$X–$Y` ROM enterprise budgets). These figures represent generic enterprise project-charter templates—**not** validated CBa Consult revenue, client actuals, or approved solo engineering budgets.

---

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Criterion | Option 1: Premature Q1 SaaS Build *(Full Enterprise Scope)* | Option 2: Leave ADPA as Disconnected File PoC Permanently | Option 3: Deferred Track B Internal Accelerator (`Q3–Q4 2027`) *(Recommended)* |
| --- | --- | --- | --- |
| **Core Mechanism** | Build full multi-tenant enterprise SaaS + SharePoint/Confluence/Adobe connectors immediately | Never add DB persistence; run scripts ad hoc per engagement | Freeze build in Q1–Q2; graduate `mdresch/adpa` to Track B DB + 1–2 project slice in Q3–Q4 |
| **Capital & Bandwidth Impact** | Violates `$0` cap & destroys `10–15 hrs/wk` pilot capacity | Zero build cost, but caps MIP/Context delivery efficiency later | **Protects Q1–Q2 cash & hours; bounded `$0`-infra Track B build later** |
| **Commercial Alignment** | High risk of building features with no buyer | Slows repeat `OP-ITG-014` / `OP-ITG-018` margin compounding | **Matches real pilot bottlenecks before writing DB migrations** |
| **Decision Verdict** | Rejected — premature engineering trap | Rejected — strands proven PoC IP | **Recommended** — disciplined Future 2027 sequence |

---

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

Because `OP-ITG-019`'s external commercial SKU is **deliberately undefined (`TBD`)** at Stage 1b/3, value is modeled in two sequential horizons:

1. **Horizon A — Internal Delivery Multiplier (`Q3–Q4 2027`):** Reimplement `1–2` core CBa workflows inside database-backed ADPA under `$0` or near-zero local/OSS hosting. Target payoff is faster artifact turnaround and auditable lineage for **`OP-ITG-014`**, **`OP-ITG-018` (MIP)**, **`OP-FIN-011`**, and **`OP-RSK-005`**.
2. **Horizon B — Optional External Productization (`2028+`):** Only after Horizon A proves reliable on live CBa engagements, frame a dedicated Stage 2–3 commercial Business Case (licensed toolkit, managed appliance, or client SaaS).

---

## 5. Risk Register & Compensating Controls

| Risk / Constraint | Business Impact | Compensating Control |
| --- | --- | --- |
| **Premature platform engineering in Q1–Q2 2027** | Starves Wave 1 revenue pilots under `10–15 hrs/wk` solo cap | Hard governance freeze (`PARKED_IN_INVENTORY`) until Wave 1 pilots close |
| **Scope bloat from 29 legacy `.docx` enterprise specs** | Multi-year engineering backlog with no paying buyer | Bound Horizon A strictly to DB persistence + `1–2` internal project migrations |
| **Governance sprawl inside `oppurtunities-2027`** | Clutters lightweight portfolio repo with ADRs and code specs | Enforce Track B graduation into `mdresch/adpa` (`sidpa-template`) when build starts |

---

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Field | Status / Entry |
| --- | --- |
| **Decision Owner** | Menno Drescher (Director, CBa Consult) |
| **Gate Status** | `PARKED` (`PARKED_IN_INVENTORY` — Future 2027 Development Backlog; Pre-Stage 2, commercial opportunity `TBD`, build frozen for Q1–Q2 2027) |
| **Re-Activation Trigger** | Wave 1–2 pilot proof underway + Director decision to graduate `mdresch/adpa` to Track B (`sidpa-template`) in Q3–Q4 2027 with defined commercial role |
| **Approval Date & Notes** | *—* |
