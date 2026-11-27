---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-020"
execution_track: "Hybrid — Track A Advisory Assessment + Track B Graduated Repo Integration (sidpa-template / agent-learning)"
requires_human_approval: "true"
approval_status: "PARKED_IN_INVENTORY"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Data_Integration_Interoperability_Plan_Template_Lifecycle_Spec.docx & mdresch/agent-learning"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-020`: Agent Learning TaskPolicy Integration & Governance

> **Governance SSOT:** Authoritative status, effort, capital, and target quarter live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md); Stage 3–4 gates (`G3`–`G4`) follow [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Companion workspace artifacts: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

---

## 1. Executive Summary

| Dimension | Pre-Pilot Commercial Baseline |
| --- | --- |
| **Opportunity & Tier** | `OP-ITG-020` — Active Backlog *(IT/Tech Pillar 6 & 17; Assets 3 & 4: Digital Labor & Governance)* |
| **Target Buyer** | Chief AI Officer, CIO, Head of AI Platform Engineering (Medium & Large) |
| **Initial Cash Outlay** | **$0** (Pilot #1 uses `mdresch/agent-learning` local JSON store + `sidpa-template`) |
| **Expected Capital / Anchor** | €3,500–€12,000+ (6–10 weeks at 8–12 hrs/week, High effort) |
| **Target Quarter & Status** | Q2–Q4 2027 · `Idea` (`PARKED_IN_INVENTORY` — follow-on upsell after `OP-ITG-013`) |
| **Recommended Path** | Option 2: Internal CBa Dogfooding -> Post-`OP-ITG-013` Client Reference Integration (Track B) |

---

## 2. Business Need & Cost of Inaction

Once enterprises inventory their AI agents (`OP-ITG-013`), platform teams discover that recurring routing, retrieval, and escalation decisions are governed by unversioned prompts with no scored episode history or mathematical autonomy justification. Without a formal `TaskPolicy` decision layer, teams face unpredictable token burn, brittle behavioral regressions, and inability to pass EU AI Act decision-traceability audits.

**Cost of Inaction & ADPA Source Baseline:**
- **For Clients:** Re-litigating structural agent decisions through manual prompt tweaks wastes engineering hours, inflates LLM inference spend, and blocks compliance sign-off for production autonomy.
- **For CBa Consult:** Integrating `mdresch/agent-learning` with `sidpa-template` differentiates CBa from generic AI prompt shops by delivering verifiable, CPU-light policy governance.
- **ADPA Modeling Disclaimer:** The assigned ADPA specification (`Data_Integration_Interoperability_Plan_Template_Lifecycle_Spec.docx`) establishes bilateral integration-contract standards with default operational KPI targets (>99.9% uptime, >99.5% accuracy, <300ms response, <1% error rate). *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* these DMBOK template SLA targets and any projected FinOps savings serve as baseline architectural targets, **not** realized client production telemetry.

---

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Capital & Effort | Strategic Fit & Risk | Verdict |
| --- | --- | --- | --- | --- |
| **Option 1: Defer Until `OP-ITG-013` Pilots Land** | Hold client outbound; keep IP ready as post-inventory upsell | $0 / minimal | Protects Q1–Q2 Tier A Core 5 focus while preserving technical edge | **Baseline Timing** |
| **Option 2: Phased Dogfood + Track B Integration *(Recommended)*** | Pilot 3–5 internal CBa decisions first, then sell TaskPolicy Catalog + Reference Integration | $0 cash (local JSON) / 8–12 hrs/wk | Proves episode scoring & `DecisionFrame` parity before client deployment; zero cloud burn | **Recommended (Sequenced)** |
| **Option 3: Multi-Tenant Cloud Policy SaaS** | Build hosted Cosmos/Azure policy evaluation service upfront | High cloud + dev cost | Violates $0 working-capital cap and SIDPA Rule #18 repo boundaries | Rejected |

---

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Zero-Capital Model:** Pilot #1 executes strictly with `AGENT_LEARNING_STORE_BACKEND=local` (local JSON stores) and CPU-only policy updates—eliminating GPU fine-tuning and Azure Cosmos DB costs until the client funds production infrastructure.
- **Commercial Packaging:** Four-stage progression (**Assessment -> TaskPolicy Catalog -> Reference Integration -> Continuous Policy Audit**) priced at **€3,500–€12,000+** based on policy count and `full` vs. `low` authority complexity (40% Catalog/Design, 40% Reference Integration, 20% Replay & Autonomy Audit).
- **Measurable Outcome KPI:** >=3 production TaskPolicies with registered episodes, measurable correctness/mean-reward trend, and documented autonomy basis (`user_acceptance` vs. `statistical_evidence`).
- **Compounding Path:** Direct Stage-2/3 technical upsell from Tier A **`OP-ITG-013`** (Agent Governance Assessment), pairing cleanly with **`OP-ITG-016`** (Fleet Architecture), **`OP-ITG-017`** (MXC Sandbox Runtime), and **`OP-ITG-018`** (MIP Continuous Policy Audit retainer).

---

## 5. Risk Register & Compensating Controls

| Risk | Likelihood / Impact | Compensating Control |
| --- | --- | --- |
| **Policy stores leak into `oppurtunities-2027`** | Medium / High | Enforce SIDPA Rule #18: all client/live `TaskPolicy` stores live exclusively in graduated Track B repos |
| **Upstream `agent-learning` SDK version churn** | Medium / Medium | Pin tested SDK/CLI release tags per client repo and maintain a documented upgrade checklist |
| **Over-applying TaskPolicies to every chat turn** | High / Medium | Apply upstream eligibility gate: only discrete, repeatable `(agent_id, task_id)` structural choices qualify |
| **Premature outreach without `OP-ITG-013` precursor** | Medium / High | Sequence behind `OP-ITG-013` P0 Triage; use internal CBa delivery decisions for initial proof |

---

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Status | Required Action Before `Idea -> Pilot` |
| --- | --- | --- |
| **Internal Dogfood Inventory (5–10 Decisions)** | **PARKED** | Catalog internal CBa workflow decisions and map `full` vs. `low` `DecisionAuthority` parity |
| **SDK Pinning & Upgrade Policy** | **PARKED** | Lock pinned `mdresch/agent-learning` release and verify `sidpa-template` integration tests |
| **Stage 2 Hypotheses & `OP-ITG-013` Pull** | **PARKED** | Register feasibility/viability hypotheses in `Hypothesis-Register.md` after Wave 2 `OP-ITG-013` fieldwork |
| **Director Adjudication (`requires_human_approval: true`)** | **PARKED** | Remains `Idea` (`PARKED_IN_INVENTORY`) until Menno Drescher authorizes Track B graduation/pilot |
