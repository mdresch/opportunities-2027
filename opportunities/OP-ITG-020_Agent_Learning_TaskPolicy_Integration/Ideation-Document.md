---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-020"
execution_track: "Hybrid — Track A Advisory Assessment + Track B Graduated Repo Integration (sidpa-template / agent-learning)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Data_Integration_Interoperability_Plan_Template_Lifecycle_Spec.docx & mdresch/agent-learning"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-020`: Agent Learning TaskPolicy Integration & Governance

> **Governance SSOT:** Authoritative status, effort, capital, and target quarter live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md); lifecycle gates (`G1b`–`G4`) follow [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Companion workspace artifacts: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

---

## 1. Problem Context & 2027 Market Trigger

Enterprise AI agents repeatedly execute structural operational decisions—selecting retrieval strategies, routing tool calls, choosing model tiers, escalating exceptions, or branching workflows. Today, most organizations govern these choices through brittle prompt tweaks or opaque heuristics with no explicit action catalog, no episode outcome scoring, and no auditable evidence justifying when an agent earned autonomy.

**2027 Strategic Drivers & Buyer Urgency:**
- **Buyer Persona:** Chief AI Officers, CIOs, and Platform Engineering Leads at medium and large enterprises.
- **Post-Inventory Control Gap:** Often triggered immediately after `OP-ITG-013` reveals a client's active agent inventory, before scaling to full multi-agent fleets (`OP-ITG-016`).
- **EU AI Act & FinOps Accountability:** Without a governed `TaskPolicy` decision layer, recurring agent choices lack deterministic audit replay, correctness-rate tracking, and measurable model-routing FinOps control.

---

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-020` packages the **TaskPolicy Governance Lifecycle** built on [`mdresch/agent-learning`](https://github.com/mdresch/agent-learning), `sidpa-template` `DecisionFrame` semantics, and ADPA DMBOK bilateral integration contracts across four phases (6–10 weeks, 8–12 hrs/week):

1. **Recurring Decision & Interoperability Assessment (Weeks 1–2):** Inventory high-frequency `(agent_id, task_id)` decisions and map bilateral system-of-record contracts using the ADPA Data Integration & Interoperability Plan lifecycle spec (no dangling one-sided flows).
2. **TaskPolicy Catalog & Authority Classification (Weeks 3–4):** Classify each decision as **`low` authority** (bounded REINFORCE-learned softmax over explicit actions) or **`full` authority** (Bayesian `DecisionFrame` adjudication with `requires_human_approval` and tie-break halting).
3. **Reference Integration & Episode Scoring (Weeks 5–7):** Wire `task-policy-init`, `task-policy-decide`, episode registration, and bounded CPU updates into a client Track B repo using local JSON stores (`AGENT_LEARNING_STORE_BACKEND=local`) at $0 cloud cost.
4. **Autonomy Gate & Continuous Policy Audit (Weeks 8–10):** Enforce complexity-proportional autonomy gates (`user_acceptance` vs. `statistical_evidence`), replay logs, and transition continuous monitoring into an `OP-ITG-018` MIP retainer.

**Core Pilot Deliverables:**
- Prioritized TaskPolicy Catalog & Bilateral Integration Contracts
- `full` vs. `low` DecisionAuthority Mapping & `sidpa-template` Reference Integration
- Episode Scoring Dashboard & Autonomy Evidence Audit Trail (>=3 production policies)

---

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Packaging & Price | Core Strength | Gap / Limitation | CBa Consult (`OP-ITG-020`) Differentiation |
| --- | --- | --- | --- | --- |
| **LLM Observability Tools** *(LangSmith, Arize, Helicone)* | €10k–€60k+/yr SaaS | Prompt tracing, latency/token telemetry | Observes past traces; does not enforce explicit action alternatives, Bayesian authority gates, or earned autonomy | Combines observability with formal `TaskPolicy` action catalogs & `DecisionFrame` governance |
| **Foundation Model Fine-Tuning / RLHF** | €50k–€300k+ GPU & ML eng | Adapts underlying model weights | High capital burn, opaque weight shifts, slow governance re-certification | Zero model-weight fine-tuning; bounded CPU policy updates over explicit auditable actions |
| **Static Prompt / Rule Hardcoding** | Internal engineering hours | Simple initial deployment | Does not learn from scored episodes; brittle when tool/model landscape shifts | Closed-loop episode scoring + human tie-break safeguards aligned to `sidpa-template` |

---

## 4. Internal IP & Source Provenance Crosswalk

Source provenance combines [Source-Documents.md](Source-Documents.md) with CBa Consult's engineering repositories noted in [Ideation-Spark.md](Ideation-Spark.md).

| Source Artifact / Repo | Provenance | Reuse Role in `OP-ITG-020` |
| --- | --- | --- |
| `mdresch/agent-learning` | GitHub repository (`agent-learning` SDK lineage) | Provides `TaskPolicy` CLI/SDK (`task-policy-init`, `task-policy-decide`), episode scoring, autonomy profiles, and replay docs |
| `mdresch/sidpa-template` | GitHub repository (`sidpa-template`) | Supplies pytest-verified `DecisionFrame` gates, `DecisionAuthority`, tie-break halting, and `requires_human_approval` patterns |
| `Data_Integration_Interoperability_Plan_Template_Lifecycle_Spec.docx` | `ADPA - Projects Lists/` (`DMBOK 2.0 Ch. 8`, v0.2.0) | Enforces bilateral `IntegrationContract`, `DataFlowMapping`, and schema-versioning gates for agent-to-system interfaces |
| `OP-ITG-013` / `OP-ITG-011` Assets | CBa Consult portfolio | Supplies enterprise agent inventory and Entra Agent ID / Agent 365 attachment points |

---

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **SIDPA Rule #18 (Strict Repo Separation):** Client or internal `TaskPolicy` JSON/Cosmos stores MUST reside in graduated Track B repositories (`sidpa-template` derivatives)—**never** committed into `oppurtunities-2027`.
- **Eligibility Discipline:** Not every conversational chat turn is a TaskPolicy; restrict policy framing to discrete, repeatable structural decisions with verifiable episode outcomes.
- **No Premature Cloud Spend or Fine-Tuning:** Pilot #1 runs on local JSON stores (`$0` cloud infrastructure) with bounded CPU updates—no GPU training clusters.
- **Stage 1b (`G1b`) Gate:** Upstream `agent-learning` SDK version pinning, internal CBa decision dogfooding (5–10 decisions), and `OP-ITG-013` precursor validation are required before `G4` promotion.
