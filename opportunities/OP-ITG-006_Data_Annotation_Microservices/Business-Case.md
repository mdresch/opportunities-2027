---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-006"
execution_track: "Track A — Lightweight Advisory"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA: Opportunities to Publish/Data Annotation Microservices.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-006`: Data Annotation Microservices

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and evaluated against [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Executive Summary

| Dimension | Assessment |
| :--- | :--- |
| **Opportunity ID & Title** | `OP-ITG-006` — Data Annotation Microservices |
| **Tier & Target Window** | Core & Specialty Backlog · Q2 2027 |
| **Target Buyer** | CIOs, CTOs & Enterprise Architecture / Data Leads (Small & Mid) |
| **Delivery Horizon & Effort** | 4–6 weeks · Low–Medium effort |
| **Commercial Band & Working Capital** | €500–€2,500 pilot band · **€0 upfront working capital** |
| **Gate Status** | **`PENDING_DIRECTOR_SIGNOFF`** — Pre-Stage 2; validate SKU positioning as evaluation QA rather than manual labor |

## 2. Business Need & Cost of Inaction

Domain AI/ML and enterprise search pilots fail disproportionately due to noisy training/evaluation datasets rather than model architecture. Without structured label definitions and QA verification, engineering teams burn sprint cycles debugging inconsistent model outputs and struggle to produce data-lineage documentation expected under EU AI Act governance.

- **Cost of Inaction:** Stalled AI proofs-of-concept, silent accuracy regressions in production, and wasted SME time re-labeling unstandardized spreadsheets.
- *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* The original `Data Annotation Microservices.docx` concept modeled a modular platform achieving 20%–30% annotation cost reduction, 95% label accuracy, and 10,000+ daily annotations by Year 1 via workflow automation and crowdsourcing. Those platform-scale projections represent *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals*; CBa's 2027 solo-director track pivots strictly to advisory taxonomy and QA evaluation design.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Benefit / Cost Profile | Risk & Feasibility | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option 0: Ad-Hoc Internal Labeling** | Client SMEs label data without taxonomy or QA | €0 cash; high hidden rework | High error & compliance risk | Reject |
| **Option 1: Custom Microservices Platform Build** | Build & operate crowd-annotation SaaS platform | High capex & maintenance burden | Unfeasible for $0-capital solo practice | Reject |
| **Option 2: CBa 4–6 Wk Annotation QA & Taxonomy Sprint** | Deliver domain taxonomy, QA rubric & golden eval set | €500–€2,500 fixed fee; €0 SaaS build | High feasibility; protects margin | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging:** Fixed-scope 4–6 week advisory sprint delivering three standardized assets: a domain annotation specification, a golden evaluation dataset template, and an inter-annotator QA playbook.
- **Pricing Discipline:** Anchor toward €1,500–€2,500 as an evaluation-QA sprint rather than hourly labeling rates to protect effective hourly yield.
- **$0 Working-Capital Model:** Executed via CBa Consult sweat-equity inside the client's existing tooling/data environment; zero crowd-labor payroll or software hosting cost.
- **Compounding Path:** Standardizes annotation QA playbooks for vertical AI teams and serves as an upstream technical feeder into `OP-RSK-004` (EU AI Act / ISO 42001 governance readiness) and `OP-ITG-014` (Knowledge Intelligence).

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- |
| **Margin Compression from Manual Tagging** | High / High | Restrict CBa SOW to taxonomy, rubric design, and QA sampling—never bulk manual labeling |
| **Data Privacy / GDPR Exposure** | Medium / High | Require anonymized samples or on-tenant execution under signed client DPA |
| **Commoditized Low-Ticket Positioning** | Medium / Medium | Bundle as a "Golden Evaluation Set & EU AI Act Data QA" wedge into `OP-RSK-004` |
| **Scope Creep into MLOps Engineering** | Medium / Medium | Explicitly exclude model training, pipeline hosting, and production SLA in SOW |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Required Pre-Pilot Action |
| :--- | :--- | :--- |
| **Approval Status** | **`PENDING_DIRECTOR_SIGNOFF`** | Remains `Idea` until Stage 2 gate completion |
| **7 Pivotal Questions Gate** | Drafted in [Ideation-Spark.md](Ideation-Spark.md) | Lock exact €1.5k–€2.5k evaluation-QA scope and success KPI |
| **Platform vs. Advisory Guardrail** | Enforced | Confirm zero crowd-labor / platform-build obligations in SOW |
| **Bundle Alignment (`OP-RSK-004`)** | Planned | Position as optional technical add-on for AI-pilot clients |
| **Adjudication Owner** | Menno Drescher (Director, CBa Consult) | Pending Q2 2027 pull or bundle pairing with `OP-RSK-004` |
