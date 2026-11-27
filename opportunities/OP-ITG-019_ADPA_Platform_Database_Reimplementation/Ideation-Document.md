---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-019"
execution_track: "Track B Candidate — Future 2027 Platform Engineering (graduates to mdresch/adpa under sidpa-template)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA - Project Charter.docx, ADPA Business Case.docx & mdresch/adpa PoC (29 assigned files)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-019`: ADPA 2027 Platform Evolution (Database Layer & Project Reimplementation)

> **Governance & SSOT Notice:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) (Stage 1b Ideation / Gate `G1b`). Authoritative inventory fields (`Active Backlog — Future 2027 Platform Development` · `High` effort · `Capital TBD; $0 cash cap` · `Q3–Q4 2027` · `Status = Idea`) live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). See [Ideation-Spark.md](Ideation-Spark.md), [Source-Documents.md](Source-Documents.md), [ADPA-2027-Architecture-and-DB-Blueprint.md](ADPA-2027-Architecture-and-DB-Blueprint.md), and [ADPA-Risk-Management-Scenario-Module.md](ADPA-Risk-Management-Scenario-Module.md).

---

## 1. Problem Context & 2027 Market Trigger

CBa Consult's **ADPA (Advanced Data Processing Automation — `mdresch/adpa`)** Proof of Concept automates PMBOK/BABOK/DMBOK document pipelines across multi-provider LLMs, but file-based PoC storage creates an internal scalability ceiling:

1. **Lack of Persistent Relational & Lineage State:** Without a durable database layer, project artifacts, ontologies, novelty/drift metrics, and audit logs cannot be queried or versioned reliably across client engagements.
2. **Fragmented Project Pipelines:** Existing CBa Consult projects and recurring advisory workflows live in separate scripts and repositories rather than sharing one structured ADPA data model.
3. **Engine Behind Tier A Margin:** Scaling `OP-ITG-014` (Knowledge & Context Governance), `OP-ITG-018` (MIP), and `OP-RSK-005` (Evidence Assurance) later in 2027 benefits from a unified internal backbone—**once commercial pilots justify the engineering hours**.

---

## 2. Solution Architecture & Delivery Workflow

Per [ADPA-2027-Architecture-and-DB-Blueprint.md](ADPA-2027-Architecture-and-DB-Blueprint.md) and [Ideation-Spark.md](Ideation-Spark.md), `OP-ITG-019` follows a strict **future-dated, time-boxed Track B** evolution sequence (`Q3–Q4 2027`):

| Phase | Engineering Focus | Core Activities | Technical Proof Gate |
| --- | --- | --- | --- |
| **Phase 1** | **Commercial & DB Framing** | Lock internal-accelerator vs. external-product role; finalize target DB schema (projects, document lineages, ontologies, audit trails) under `$0` hosting constraints | Approved DB Schema & Track B `sidpa-template` Init |
| **Phase 2** | **Persistent DB Implementation** | Replace PoC file-only state in `mdresch/adpa` with durable DB persistence, automated migrations, and contract tests | Clean DB test suite passing end-to-end |
| **Phase 3** | **Project Reimplementation Slice** | Migrate `1–2` existing CBa projects/pipelines into ADPA's unified model and template engine (including risk/scenario capabilities) | `≥1–2` projects operating end-to-end inside ADPA |
| **Phase 4** | **Commercial Graduation Review** | Decide whether ADPA stays an internal margin multiplier (`OP-ITG-014`/`018`) or graduates into a standalone client SaaS/licensed SKU | Director Stage 2–3 Commercial Charter (if externalized) |

---

## 3. Market Comparables & CBa Consult Differentiation

| Market Comparable | Typical Market Model | Primary Strength | Gap / Why ADPA Evolves Internally First |
| --- | --- | --- | --- |
| **Enterprise IDP / Document AI Platforms (UiPath, ABBYY, Hyperscience)** | `€50,000–€250,000+/yr` | High-volume OCR and invoice/form extraction | Optimized for clerical forms, not PMBOK/BABOK/DMBOK governance lineage or consulting ontologies. |
| **Generic AI Doc Generators / Workspace Copilots** | `€20–€50/user/mo` | Fast ad-hoc drafting inside docs | Zero persistent multi-stage governance lineage, drift detection, or SIDPA auditability. |
| **Custom Internal Agency Scripts** | Ad-hoc developer hours | Tailored to one workflow | Brittle across engagements; `OP-ITG-019` unifies them into one auditable platform **only after client demand validates it**. |

---

## 4. Internal IP & Source Provenance Crosswalk

`OP-ITG-019` consolidates **29 assigned ADPA files** in [Source-Documents.md](Source-Documents.md) plus live PoC code (`mdresch/adpa`):

| Asset Domain | Canonical Source Reference | Readiness | Role in `OP-ITG-019` |
| --- | --- | --- | --- |
| **PoC Codebase & Pipelines** | `mdresch/adpa` (Oct 2026 PoC) & `ADPA_Document_Generation_Pipeline_Review.docx` | **PoC Live (75%)** | Baseline ingestion, multi-provider LLM, and template engine |
| **Architecture & DB Design** | [ADPA-2027-Architecture-and-DB-Blueprint.md](ADPA-2027-Architecture-and-DB-Blueprint.md) & `ADPA - Design Spec IP Novelty Detection & Drift Scoring.docx` | **Drafted (65%)** | Guides persistent DB schema and lineage/drift tracking |
| **Risk & Enterprise Specs** | [ADPA-Risk-Management-Scenario-Module.md](ADPA-Risk-Management-Scenario-Module.md), `ADPA - Project Charter.docx`, `ADPA Business Case.docx` | **Reference (60%)** | Supplies enterprise charter/risk patterns; commercial scope remains **TBD** |

---

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

1. **Commercial opportunity intentionally undefined (`TBD`):** Per Honest Evidence Baseline, `OP-ITG-019` does **not** invent a client pricing model or external SaaS business case ahead of engineering stability.
2. **Strict Q1–Q2 2027 build freeze:** Must **not** consume Q1–Q2 solo pilot bandwidth (`10–15 hrs/wk` cap); remains parked in Future 2027 Developments until Wave 1 client proof is underway.
3. **No full 18-stage build inside `oppurtunities-2027`:** When greenlit, all ADRs, BRDs, and code engineering execute inside `mdresch/adpa` under `sidpa-template` (Track B).
4. **Stage 1b (`G1b`) Status:** Technical prerequisites, 29-file provenance, and sibling architecture notes consolidated; remains `Idea` pending Q3–Q4 2027 activation.
