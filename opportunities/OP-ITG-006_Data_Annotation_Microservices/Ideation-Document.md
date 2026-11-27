---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-006"
execution_track: "Track A — Lightweight Advisory"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA: Opportunities to Publish/Data Annotation Microservices.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-006`: Data Annotation Microservices

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and positioned in the Core & Specialty Backlog evaluated alongside [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Problem Context & 2027 Market Trigger

Small and mid-sized organizations launching domain-specific AI/ML or RAG pilots routinely stall on evaluation and ground-truth dataset quality. Off-the-shelf models hallucinate on proprietary terminology, yet internal subject-matter experts lack structured annotation taxonomies, inter-annotator agreement checks, and QA workflows—while enterprise labeling platforms impose steep minimums and unacceptable data-privacy exposure.

- **Target Buyer:** CIOs, CTOs, and Enterprise Architecture / Data Leads (Small & Mid tier).
- **The Wedge (Pain):** AI pilots fail acceptance testing because engineering teams lack a clean, domain-verified golden dataset and repeatable annotation QA gates.
- **2027 Trigger:** **EU AI Act** data-governance and accuracy expectations plus 2027 cost discipline push teams away from unverified AI demos toward lightweight, auditable golden-dataset evaluation before scaling production models.

## 2. Solution Architecture & Delivery Workflow

Delivered as a 4–6 week AI Micro-Service (`Low–Med` effort) anchored in the **Data Analytics Strategy** toolkit:

1. **Weeks 1–2 — Taxonomy & Privacy Boundary Setup:**
   - Define domain label schemas, edge-case disambiguation rubrics, and acceptance criteria with client SMEs.
   - Lock PII redaction rules, tenant isolation boundaries, and golden-set sampling targets.
2. **Weeks 3–4 — Lightweight Annotation & QA Workflow:**
   - Configure client-hosted labeling templates and dual-review consensus rules (inter-annotator agreement checks).
   - Design automated pre-labeling/triage prompts and exception routing so SMEs review only ambiguous edge cases.
3. **Weeks 5–6 — Evaluation Benchmark & Playbook Handover:**
   - Measure baseline vs. post-QA label consistency on the client's ML/RAG evaluation slice.
   - Deliver an auditable evaluation benchmark pack and repeatable vertical QA SOP.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Model | Strengths | Differentiation of CBa `OP-ITG-006` |
| :--- | :--- | :--- | :--- |
| **Enterprise Labeling Platforms (Scale AI, Labelbox)** | Volume contracts + platform SaaS | High throughput for computer vision/NLP | Overkill for small/mid pilots; external cloud data-residency friction |
| **Low-Cost Crowdsourcing Marketplaces** | Per-task micro-labor | Low unit price for generic tasks | Fails on domain taxonomy nuance, IP confidentiality, and GDPR |
| **Ad-Hoc Internal Spreadsheet Tagging** | Unstructured SME hours | Zero external fee | Low inter-annotator consistency; no audit trail for EU AI Act |
| **CBa `OP-ITG-006` Micro-Service** | 4–6 wk fixed-scope QA & taxonomy sprint | Advisory-led taxonomy + privacy-first QA | Focuses on **evaluation & governance design**, not manual labor arbitrage |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Role in `OP-ITG-006` | Provenance / Location |
| :--- | :--- | :--- |
| `Opportunities to Publish/Data Annotation Microservices.docx` | Original PMBOK 7 PoC & modular workflow concept | Listed in [Source-Documents.md](Source-Documents.md) |
| [Ideation-Spark.md](Ideation-Spark.md) | 2027 Small & Mid positioning & 7 Pivotal Questions | Sibling workspace file |
| Data Analytics Strategy Toolkit | Taxonomy design & data-quality governance methods | [inventory-of-ideas.md](../../inventory-of-ideas.md) (§6) |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No Manual Labeling Sweatshop / Crowd Labor Ops:** CBa Consult designs taxonomy, QA gates, and lightweight evaluation workflows; CBa does not recruit crowd workers or sell low-margin manual tagging hours.
- **No Raw PII Offloading:** Annotation occurs inside the client's sanctioned environment or strictly anonymized exports under signed DPA.
- **No Full ML Model Training Ownership:** Model fine-tuning, weights hosting, and production MLOps remain with the client's engineering team.

### Stage 1b Readiness & Pre-Pilot Handoff

| Criterion | Current State | Next Action Toward Pilot |
| :--- | :--- | :--- |
| **Stage 1b Framing** | Complete (Core & Specialty Backlog) | Target Q2 2027 technical AI-pilot wedge |
| **SKU Scope & Pricing Lock** | Pending | Lock exact golden-dataset & QA rubric price (€1.5k–€2.5k) |
| **Privacy Boundary** | Defined | Enforce on-tenant or anonymized sampling under client DPA |
| **Cross-Portfolio Pairing** | Defined | Bundle upstream of `OP-RSK-004` (EU AI Act) & `OP-ITG-014` |
