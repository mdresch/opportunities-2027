# Ideation Spark — `OP-ITG-020`: Agent Learning TaskPolicy Integration & Governance

**Status:** 🔥 Spark — workspace opened, Tier 1 macro signal check complete, Tier 2 deeper research pending
**Tier:** Active Backlog *(Future 2027 Platform & Advisory — Strategic Asset 3: Digital Labor & Strategic Asset 4: Evidence & Governance)*
**Functional Area:** 6. IT and Technology *(Pillar 17 — Intelligence & Autonomous Systems Governance)* · **Signature Toolkit:** Digital Transformation
**Category:** Platform-Backed Architecture / Advisory · **Size:** Medium & Large
**Source:** [inventory-of-ideas.md](../../inventory-of-ideas.md) §6 · [op-itg-tracker.md](../../docs/registers/op-itg-tracker.md) · **Upstream Repo:** [`mdresch/agent-learning`](https://github.com/mdresch/agent-learning) *(TaskPolicy decision layer — Microsoft `agent-learning` SDK lineage)*

## Positioning

> For **Chief AI Officers, CIOs, and platform engineering leads** at medium-and-large enterprises who struggle with **recurring agent choices that lack explicit alternatives, scored outcomes, or auditable autonomy gates**, **Agent Learning TaskPolicy Integration & Governance** is a **Platform-Backed Architecture / Advisory** offer backed by **`mdresch/agent-learning` and `sidpa-template` `DecisionFrame` patterns** that delivers **a catalog of governed TaskPolicies with episode scoring, Bayesian or learned adjudication, and complexity-proportional autonomy** with $0 working capital for Pilot #1 tooling.

## What It Is

Enterprise agents repeat the same structural decisions (retrieval strategy, tool routing, escalation path, model tier, workflow branch). This opportunity packages the **TaskPolicy lifecycle**: frame stable `(agent_id, task_id)` decisions with executable actions, run `task-policy-decide` under `low` (learned softmax) or `full` (Bayesian `DecisionFrame`) authority, register scored episodes, apply bounded CPU updates, and earn autonomy only through explicit user acceptance or proportional statistical evidence—all without fine-tuning foundation models.

## 7 Pivotal Questions

1. **Buyer & 2027 Trigger** — CAIO / CIO / head of AI platform engineering, often **after** `OP-ITG-013` reveals an agent inventory but before fleet scale (`OP-ITG-016`). Trigger: agents make opaque recurring choices with no measurable feedback loop, blocking EU AI Act traceability and internal FinOps accountability.
2. **The Wedge (Pain)** — Prompt tweaks and manual guardrails do not compound; without TaskPolicies, every recurring decision is re-litigated with no episode history, correctness rate, or autonomy audit trail.
3. **Deliverable & Existing IP** — **Assessment → TaskPolicy Catalog → Reference Integration → Continuous Policy Audit.** Builds on [`mdresch/agent-learning`](https://github.com/mdresch/agent-learning) (CLI/SDK: `task-policy-init`, `task-policy-decide`, episode register, score, train) and **`sidpa-template` (`mdresch/sidpa-template`)** for full-authority Bayesian gates (`DecisionAuthority`, tie-break halting, `requires_human_approval`).
4. **Sweat-Equity Feasibility** — 6–10 weeks at 8–12 hrs/wk, High effort. Pilot #1 can use local JSON stores (`AGENT_LEARNING_STORE_BACKEND=local`) with $0 cloud spend; Cosmos/Azure evaluators remain optional upsell.
5. **Outcome & Proof** — ≥3 production TaskPolicies with registered episodes, visible correctness/mean-reward trends, and documented autonomy basis (`user_acceptance` vs `statistical_evidence`) on at least one client-critical workflow—feeds Case Study #1 for Digital Labor retainers.
6. **Boundaries & Risk** — Not every chat turn is a TaskPolicy (per upstream README eligibility rules). **Policy stores stay in graduated Track B client/platform repos**, not copied into `oppurtunities-2027` (SIDPA Rule #18). SDK drift vs. upstream Microsoft `agent-learning` releases requires a pinned version cadence.
7. **Compounding / Scale Path** — Operational layer under **`OP-ITG-013`** (governance assessment), **`OP-ITG-016`** (multi-agent architecture), **`OP-ITG-017`** (isolated runtime), and **`OP-ITG-018`** (MIP retainer continuous policy audit). Optional Track B graduation: dedicated repo from `sidpa-template` hosting client TaskPolicy stores and rollup via `scripts/export_portfolio_rollup.py`.

## Effort, Capital & Timeline

| Time Horizon | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| 6–10 wks (8–12 hrs/wk) | High | €3,500–€12,000+ | Q2–Q4 2027 |

## Market Validation

🟢🟡 Strong fit with 2027 agent-governance demand (`OP-ITG-013` market validation 🟢🟢🟢) and measurable autonomy narrative; category still emerging—position as **governed decision layer**, not ML training.

## Existing Assets to Draw On

- [`mdresch/agent-learning`](https://github.com/mdresch/agent-learning) — TaskPolicy CLI/SDK, episode scoring, REINFORCE-for-low-authority policies, Bayesian full-authority frames, autonomy complexity profiles, audit/replay docs.
- **`sidpa-template` (`mdresch/sidpa-template`)** — pytest-verified `DecisionFrame` governance gates and human tie-break patterns aligned with full-authority TaskPolicies.
- **`OP-ITG-013` / `OP-ITG-011`** — agent inventory and Entra/Agent 365 context for where TaskPolicies attach.

## Related Opportunities

`OP-ITG-013` (precursor assessment) · `OP-ITG-016` (fleet-scale architecture) · `OP-ITG-017` (containment runtime) · `OP-ITG-018` (MIP continuous audit) · `OP-RSK-004` / `OP-RSK-005` (evidence traceability)

## Next Steps (Tier 2 → Pilot Gate)

- [ ] Inventory 5–10 recurring agent decisions inside CBa Consult delivery (portfolio gates, RAG strategy, tool routing) as internal TaskPolicy pilots before client work.
- [ ] Map `full` vs `low` authority per decision class and document parity with `sidpa-template` `DecisionAuthority` semantics.
- [ ] Pin SDK/CLI version and define upgrade policy vs. upstream Microsoft `agent-learning` releases.
- [ ] Complete pre-pilot gate (1-page Opportunity Brief → pilot scope/pricing/KPI) before `Pilot` status.

## Assigned Source Documents (ADPA)

- [Source-Documents.md](Source-Documents.md) — full manifest
- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content
- [Business-Case.md](Business-Case.md) — extracted business case content
