---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-RSK-003"
execution_track: "Track A (Lightweight Advisory / Diagnostic — Stays in oppurtunities-2027)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "AI Explainability & Audit Specialist.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-RSK-003`: AI Explainability & Audit Specialist

> **Governance SSOT:** Authoritative status, effort, capital, and target quarter live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md); lifecycle gates (`G1b`–`G4`) follow [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Companion workspace artifacts: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

---

## 1. Problem Context & 2027 Market Trigger

Regulated enterprises deploying machine learning and generative AI across credit, insurance, HR, healthcare, or critical operations face an acute documentation gap: engineering teams ship "black box" models without human-readable decision traceability, standardized model cards, or evidence packages capable of surviving internal audit or external regulatory inspection.

**2027 Strategic Drivers & Buyer Urgency:**
- **Buyer Persona:** Chief Risk Officers (CROs), CISOs, Internal Audit Heads, and Compliance Committees at Medium & Large regulated organizations.
- **Regulatory Cliff:** The **EU AI Act Annex III deadline (December 2, 2027)**, alongside GDPR Article 22 automated-decision transparency obligations and DORA/NIS2 third-party risk mandates, forces immediate pre-audit remediation.
- **Auditor-Independence Gap:** Big Four firms face strict PCAOB/AICPA and EU PIE NAS restrictions preventing them from designing explainability controls for clients they audit, opening space for independent pre-assurance specialists.

---

## 2. Solution Architecture & Delivery Workflow

`OP-RSK-003` translates `AI Explainability & Audit Specialist.docx` and CBa Consult's Risk Management toolkit into a focused **6–10 week Pre-Assurance & Documentation Diagnostic** for medium and large organizations:

1. **High-Risk Model & Decision Inventory (Weeks 1–2):** Catalog priority AI/ML/LLM systems, map decision impact against EU AI Act risk tiers and GDPR automated-processing criteria, and baseline current documentation gaps.
2. **Explainability & Traceability Framework (Weeks 3–4):** Define human-readable explanation standards (feature/rationale traceability, confidence thresholds, human-override logs) tailored to technical, risk, and business stakeholders.
3. **Audit-Readiness Artifact Pack (Weeks 5–7):** Produce standardized **Model Cards**, **Data Sheets**, decision-traceability matrices, and pre-audit evidence dossiers for 1–3 priority production models.
4. **SDLC Compliance Workflow Integration (Weeks 8–10):** Embed lightweight documentation gates into MLOps/release pipelines and hand over repeatable audit checklists paired with `OP-RSK-002` and `OP-RSK-004`.

**Core Diagnostic Deliverables:**
- AI Model Risk & Explainability Gap Inventory
- EU AI Act Annex IV-Aligned Model Cards & Data Sheets (1–3 models)
- SDLC Explainability Gate & Internal-Audit Evidence Pack

---

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Packaging & Price | Core Strength | Gap / Limitation | CBa Consult (`OP-RSK-003`) Differentiation |
| --- | --- | --- | --- | --- |
| **Big Four AI Risk & Assurance** | €60k–€250k+ engagement | Brand recognition with audit committees | Auditor-independence rules (PCAOB/EU PIE) restrict advisory + audit mix; high cost | Conflict-free pre-assurance partner preparing clients *for* statutory/accredited audit |
| **Enterprise AI GRC SaaS** *(Credo AI, Holistic AI, Arthur)* | €30k–€120k+/yr platform license | Automated policy dashboards and bias telemetry | Software alone cannot author defensible model narratives or organizational governance gates | Methodology-first governance & artifact pack; $0 new platform spend required for Pilot #1 |
| **Internal Data Science Documentation** | Ad-hoc wiki/README notes | Close to model code | Inconsistent, lacks regulatory traceability and board/audit-committee readability | Standardized PMBOK/Risk Management framework bridging ML teams, Risk, and Legal |

---

## 4. Internal IP & Source Provenance Crosswalk

The assigned ADPA source file is logged in [Source-Documents.md](Source-Documents.md).

| Source Artifact | Provenance | Reuse Role in `OP-RSK-003` |
| --- | --- | --- |
| `AI Explainability & Audit Specialist.docx` | `ADPA - Projects Lists/AI Explainability & Audit Specialist.docx` | Supplies problem framing ("black box" risk), EU AI Act/GDPR compliance drivers, model-card/data-sheet deliverable structure, and SDLC compliance workflow objectives |
| **Risk Management Signature Toolkit** | CBa Consult Signature Toolkit #12 | Provides risk-scoring matrices, control-evidence checklists, and audit-committee reporting templates |
| **Tier A Companion Offers** | `OP-RSK-004` (AI Gov Certification Readiness), `OP-RSK-002`, `OP-LEG-002` | Positions `OP-RSK-003` as the model-level explainability deep-dive complementing enterprise ISO 42001 / EU AI Act readiness |

---

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Pre-Assurance Only (Non-Accredited):** CBa Consult is **not** an EU AI Act Notified Body, statutory financial/IT auditor, or legal firm. Deliverables prepare client teams and evidence for formal conformity assessment—never replace them.
- **No Custom Software Build in Pilot #1:** Although the ADPA source mentions an automated "Audit Artifact Generator" tool, Pilot #1 delivers standardized templates and lightweight workflow gates under Track A—deferring any software tooling to Track B (`sidpa-template`) only after client demand is proven.
- **Bounded Model Scope:** Fixed-scope Pilot #1 covers 1–3 priority models rather than unbounded enterprise-wide ML refactoring.
- **Stage 1b (`G1b`) Status:** Core & Specialty Backlog (Q3 2027), secondary to Tier A `OP-RSK-004` flagship; requires Stage 2 hypothesis registration before `G4` promotion.
