---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-003"
execution_track: "Track A — Lightweight AI Micro-Service / Advisory Wedge (stays in oppurtunities-2027)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Portfolio Spark & 2026 OP-IE-004 adaptation (Ideation-Spark.md)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-003`: Custom GPT / RAG for Internal Governance & Policy Docs

> **Governance & SSOT Notice:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) (Stage 1b Ideation / Gate `G1b`). Authoritative inventory fields (`Core & Specialty Backlog` · `Medium & Large` · `8 wks` · `High` effort · `€1,500–€5,000` · `Q2–Q3 2027` · `Status = Idea`) live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). See [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

---

## 1. Problem Context & 2027 Market Trigger

Medium and large organizations maintain hundreds of IT, information-security, HR, and compliance policies spread across SharePoint, Confluence, and PDF repositories. Employees bypass official policies or overload support desks because finding authoritative answers takes too long:

1. **Regulatory & Audit Velocity (2027):** Deadlines across DORA/NIS2, EU AI Act, IFRS 18, and CSRD require staff to follow current procedures consistently rather than relying on outdated PDF copies.
2. **Oversharing & Hallucination Risk in Generic Copilots:** Dropping uncurated policy folders into generic chatbots surfaces stale drafts, leaks restricted security documents across permission boundaries, and produces unverified answers.
3. **Demand for Fixed-Scope Micro-Services:** CIOs and CTOs want a bounded **8-week**, conflict-free blueprint and scoped Q&A assistant on top of *existing* enterprise tools before funding custom platform builds.

---

## 2. Solution Architecture & Delivery Workflow

Positioned as a lightweight **Track A** micro-service inside the client's existing tenant (`$0` CBa capital; no bespoke SaaS hosting), `OP-ITG-003` executes in four 2-week increments:

| Phase / Weeks | Focus | Core Activities | Deliverable |
| --- | --- | --- | --- |
| **Weeks 1–2** | **Corpus Curation & ACL Audit** | Inventory IT/security/HR policy docs, strip superseded versions, and map RBAC / SharePoint / Confluence access boundaries | **Curated Policy Corpus & Access-Control Matrix** |
| **Weeks 3–4** | **Chunking & Citation Design** | Structure taxonomy, metadata tags (effective date, owner, domain), and mandatory source-citation rules inside client's approved LLM/RAG stack | **Metadata Schema & Retrieval Grounding Spec** |
| **Weeks 5–6** | **Assistant Configuration & Eval** | Configure domain-specific Q&A assistant (e.g., Copilot Studio / Azure AI / approved internal RAG) and test against 30–50 golden policy questions | **Configured Policy Q&A Pilot + Accuracy Scorecard** |
| **Weeks 7–8** | **Governance Handover & Ops Cadence** | Train policy owners on document-refresh triggers and refusal fallbacks; hand over runbook and identify `OP-ITG-014` expansion | **Owner Maintenance Runbook & Readout Memo** |

---

## 3. Market Comparables & CBa Consult Differentiation

| Market Comparable | Typical Commercial Anchor | Primary Strength | Gap / Where `OP-ITG-003` Differentiates |
| --- | --- | --- | --- |
| **Enterprise Search / AI SaaS (Glean, Moveworks)** | `€40,000–€150,000+/yr` | Polished enterprise-wide connectors and UI | Prohibitively expensive and heavy for a single IT/HR policy domain; `OP-ITG-003` runs on existing client tools for `€1,500–€5,000`. |
| **Out-of-the-Box M365 Copilot / ChatGPT Team** | `€20–€30/user/mo` | Instant deployment across M365 files | Indexing dirty folders causes stale-policy answers and oversharing; `OP-ITG-003` enforces curation, metadata, and citation rules first. |
| **Custom Dev Agencies / SIs** | `€25,000–€80,000` | Bespoke vector DBs and custom web portals | Over-engineered for policy Q&A and creates maintenance lock-in; CBa prioritizes **governance and corpus hygiene** over custom code. |

---

## 4. Internal IP & Source Provenance Crosswalk

No ADPA `.docx` is assigned in [Source-Documents.md](Source-Documents.md); `OP-ITG-003` adapts 2026 `OP-IE-004` and connects directly into CBa Consult's Tier A `OP-ITG-014` (*Knowledge Intelligence & Context Governance*) capability:

| Delivery Asset Required | Internal IP / Crosswalk Source | Readiness | Reuse & Portfolio Synergy |
| --- | --- | --- | --- |
| **Corpus Hygiene & Taxonomy Rules** | **Data Analytics Strategy** Signature Toolkit + `OP-ITG-014` context-governance patterns | **Ready (85%)** | Supplies document-freshness, canonical-owner, and deduplication gates |
| **Access-Control & Refusal Checklist** | `OP-ITG-013` / `OP-RSK-004` permission & logging guardrails | **Ready (80%)** | Prevents cross-department policy leakage and ungrounded fabrication |
| **Golden Q&A Evaluation Harness** | Adapted from 2026 `OP-IE-004` micro-service pattern | **Partial (65%)** | Needs standardized 30-question IT/HR eval template before Pilot #1 |

---

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

1. **Not a custom multi-tenant SaaS or vector-database engineering project:** Runs inside the client's existing approved cloud/M365 environment; CBa Consult assumes `$0` hosting or LLM API liabilities.
2. **Not a substitute for enterprise-wide Knowledge Governance:** `OP-ITG-003` targets a bounded policy corpus; full cross-enterprise ontologies and Context Governance belong in Tier A flagship **`OP-ITG-014`**.
3. **Not an active Wave 1 priority:** Held in Core & Specialty Backlog (`Q2–Q3 2027`) to avoid diluting `OP-ITG-014` and `OP-ITG-013` outreach.
4. **Stage 1b (`G1b`) Status:** Ideation framing, comparables, and `OP-ITG-014` relationship clarified; remains `Idea` (Pre-Stage 2) pending Stage 2 hypothesis design or bundling as an `OP-ITG-014` implementation wedge.
