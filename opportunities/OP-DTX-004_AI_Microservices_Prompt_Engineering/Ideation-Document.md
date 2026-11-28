---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-DTX-004"
execution_track: "Core & Specialty Backlog — Pillar 9: Digital Transformation"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "AI Microservices & Prompt Engineering.docx (ADPA)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-DTX-004`: AI Microservices & Prompt Engineering

> **Governance & SSOT Callout:** This Stage 1b ideation document operates under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and aligns with [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Canonical client positioning, effort bounds, and seven pivotal questions reside in [Ideation-Spark.md](Ideation-Spark.md); source artifact provenance is tracked in [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Small and medium-sized enterprises (SMEs) in 2027 face intense cost discipline alongside pressure to capture tangible productivity gains from generative AI. While enterprise suites promise broad transformation, CIOs, CDOs, and Transformation Directors in the Small & Mid segment frequently struggle with fragmented ad-hoc prompting, inconsistent outputs, and stalled proofs of concept that never reach daily operations.

- **2027 Market Trigger:** Buyer budgets favor fixed-scope, fast-payback automation engagements over open-ended AI advisory retainers, while EU AI Act governance expectations push SMEs toward structured, repeatable prompt workflows rather than shadow AI usage.
- **Core Buyer Pain:** Organizations lack modular, industry-specific AI automations, custom GPTs, and curated prompt packs that plug directly into existing customer service, support, and operational workflows without multi-month engineering overhead.
- **Target Buyer Profile:** CIOs, CDOs, and Transformation Directors across Small & Mid enterprises (healthcare, finance, retail, and logistics use cases noted in the ADPA source digest).

## 2. Solution Architecture & Delivery Workflow

`OP-DTX-004` packages targeted AI microservices, custom GPT configurations, and tested prompt workflows into a fixed-scope 4–6 week delivery model requiring $0 initial working capital.

1. **Discovery & Workflow Triage (Week 1):** Identify 1–3 high-friction operational or customer-support tasks suitable for bounded AI automation and baseline current manual effort.
2. **Microservice & Prompt Pack Design (Weeks 2–3):** Configure domain-specific prompt chains, guardrails, and API/no-code integrations using existing CBa Consult prompt engineering and UX patterns.
3. **Validation & Operational Handover (Weeks 4–5):** Test accuracy, edge-case handling, and context relevance with client SMEs; document runbooks and prompt version controls.
4. **Adoption & Proof Capture (Week 6):** Deploy into production workflow, measure before/after cycle-time or manual-touch reduction, and capture anonymized proof for `OP-X-004` and Tier A/B expansion.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Typical Market Offering | Common Buyer Gap | CBa Consult Differentiation (`OP-DTX-004`) |
| --- | --- | --- | --- |
| Generic Prompt Marketplaces | Low-cost static prompt lists | Zero integration, unverified accuracy, high model churn | Domain-tested prompt workflows wired into actual SME tools |
| Boutique AI Dev Agencies | Custom LLM orchestration builds | High upfront retainers (€15k–€50k+), slow time-to-value | Fixed-scope 4–6 week micro-service sprint (€500–€2,500 range) |
| Big Four AI Advisory | Broad strategy and governance decks | Over-engineered for Small & Mid budgets; slow execution | Sweat-equity, conflict-free practitioner delivery with working artifacts |
| DIY Internal Experimentation | Ad-hoc employee GPT usage | Inconsistent quality, no UX standards, shadow-AI risk | Repeatable prompt architecture, QA rubric, and structured handover |

## 4. Internal IP & Source Provenance Crosswalk

| Artifact / IP Asset | Location / Reference | Role in `OP-DTX-004` Delivery | Verification Status |
| --- | --- | --- | --- |
| ADPA Primary Source Document | [Source-Documents.md](Source-Documents.md) (`AI Microservices & Prompt Engineering.docx`) | Supplies modular chatbot library, prompt pack, and industry-vertical framing | Indexed in ADPA manifest (13 UI/flow screenshots + root doc noted in inventory) |
| Stage 1a Opportunity Framing | [Ideation-Spark.md](Ideation-Spark.md) | Defines Small & Mid buyer persona, 4–6 wk horizon, and €500–€2,500 band | Complete (`Idea` status) |
| Portfolio Master Registry | [inventory-of-ideas.md](../../inventory-of-ideas.md) | Establishes Pillar 9 (Digital Transformation) alignment and cross-links | Canonical SSOT |
| Digital Transformation Toolkit | CBa Consult Signature Toolkit | Provides reusable prompt engineering, API/no-code, and UX templates | Existing internal IP |
| Starter Pack Cross-Link | `OP-ING-003` & `OP-X-005` | Supplies curated prompt packs (`OP-ING-003`) and starter bundle synergies | Portfolio cross-reference |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To protect fixed-scope delivery margins and manage model/API churn and low-barrier competition risks, `OP-DTX-004` enforces strict scope boundaries:

- **No Custom Foundation Model Training:** CBa Consult configures and integrates existing commercial LLM APIs and no-code platforms; no pre-training or GPU cluster hosting is included.
- **No Unbounded Software Maintenance:** Post-handover API version monitoring or continuous model retraining requires a separate support agreement rather than inclusion in the initial sprint.
- **No Regulated Decision Autonomy:** Workflows are designed as human-in-the-loop operational aids and do not certify high-risk EU AI Act compliance without dedicated legal/risk review.
- **Stage 1b Gate Readiness:** Ideation framing and ADPA source crosswalk are complete. Advancement to Stage 2/3 validation requires confirming a clean vertical niche package and Director adjudication on the companion business case.
