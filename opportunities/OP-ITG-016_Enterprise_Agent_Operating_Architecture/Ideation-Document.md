---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-016"
execution_track: "Tier A — Flagship (Q3–Q4 2027 · Strategic Asset 3: Digital Labor)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "European Aviation Resilience Network/EARN - Refernece Architecture.docx (+ 2 EARN supporting docs)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-016`: Enterprise Agent Operating Architecture

> **Governance & SSOT:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Canonical portfolio tracking sits in [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling context: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

By 2027–2028, mid-market and large enterprises are moving beyond isolated AI copilots toward fleets of 50 to 500+ autonomous and semi-autonomous agents spanning finance, IT ops, procurement, and customer support. While single-agent governance (`OP-ITG-013`) answers *"Should this agent exist and who owns it?"*, CIOs, CTOs, and Enterprise Architects face a harder structural void: *"How should 500 agents authenticate, communicate, share state, escalate to humans, and be safely retired?"*

Without a unifying operating architecture—a **"COBIT for Agents"**—enterprises suffer agent sprawl, shadow cross-agent loops, broken identity boundaries, un-auditable autonomous actions, and conflicting vendor orchestration layers (MCP, A2A, proprietary clouds). Regulatory pressure from the EU AI Act, DORA, and NIS2 makes federated, traceable human-machine teaming an architectural mandate rather than an optional IT hygiene exercise.

## 2. Solution Architecture & Delivery Workflow

Synthesizing CBa Consult's **Operating Model & Organization Design** toolkit with the federated, sovereign-preserving architectural principles proven in the EARN Reference Architecture (`EARN-RA-001`), `OP-ITG-016` delivers a two-stage Audit/Architecture offering:

1. **Agent Operating Model & Identity Domains:** Segmented trust zones and federated identity boundaries (RBAC/ABAC for non-human identities) so agents inherit least-privilege authority without central bottlenecks.
2. **Cross-Agent Orchestration & Protocol Standards:** Vendor-neutral interoperability patterns governing agent-to-agent handoffs (MCP/A2A alignment), circuit breakers, rate limits, and conflict resolution.
3. **Observability, Compliance & Lifecycle Governance:** End-to-end audit trails, explainability logging, human-in-the-loop (HITL) escalation gates, and formal agent onboarding/deprecation runbooks.
4. **Delivery Cadence:** 8–12 week Architecture Blueprint engagement (10–15 hrs/wk) producing an executive architecture charter, logical/domain reference diagrams, and a phased Reference Implementation roadmap paired with `OP-ITG-013` and `OP-HR-009`.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Positioning & Cost | Limitation for 2027–2030 Enterprise Buyers | CBa Consult Differentiation (`OP-ITG-016`) |
| --- | --- | --- | --- |
| Hyperscaler / SaaS agent frameworks (Azure Foundry, AWS Bedrock, Salesforce Agentforce) | Platform-coupled orchestration tools | Lock enterprise architecture into a single vendor stack; weak cross-platform governance | Vendor-neutral "COBIT for Agents" operating architecture spanning heterogeneous agent fleets |
| Big Four AI Transformation Practices | €150,000–€500,000+ multi-month advisory | High burn rate, junior staffing, incentivized to upsell massive implementation armies | Conflict-free, senior-led 8–12 wk blueprint (€5,000–€15,000+ wedge) with zero vendor kickbacks |
| Traditional IT Governance (COBIT / TOGAF) | Static enterprise IT frameworks | Designed for deterministic software and human org charts, not autonomous multi-agent loops | Extends COBIT/EARN federated principles directly to agent identity, escalation, and lifecycle |

## 4. Internal IP & Source Provenance Crosswalk

| Source / IP Asset | Location / Reference | Contribution to `OP-ITG-016` |
| --- | --- | --- |
| ADPA Primary Source (`EARN - Refernece Architecture.docx`) | [Source-Documents.md](Source-Documents.md) | Provides 5 transferable architectural principles (Sovereignty First, Federated Trust, Resilience by Design, Compliance by Design, Human-Machine Teaming) and layered governance-to-hub topology |
| ADPA Supporting (`EARN DIANA Capabiltiy Brief.docx`, `European Aviation Resilience Network EARN.docx`) | [Source-Documents.md](Source-Documents.md) | Reinforces audit-grade interoperability, crisis escalation, and zero-SPOF resilience patterns |
| Tier A Portfolio Summary & SSOT | [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md), [inventory-of-ideas.md](../../inventory-of-ideas.md) | Positions `OP-ITG-016` as Tier A Q3–Q4 2027 Flagship under Digital Labor, paired with `OP-ITG-013` and `OP-HR-009` |
| Spark Positioning & 7 Pivotal Questions | [Ideation-Spark.md](Ideation-Spark.md) | Defines CIO/CTO/Enterprise Architect buyer trigger and 2028–2030 scale-up trajectory |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To stay asset-light and avoid competing with software product vendors, `OP-ITG-016` excludes:
- **No proprietary multi-agent runtime software development:** CBa Consult designs the governance, identity, and orchestration blueprint—not a competing SaaS orchestration engine.
- **No unqualified small-business deployments:** Strictly scoped for Medium & Large enterprises that have already crossed single-agent adoption (`OP-ITG-013` readiness).
- **No defense/aviation classification claims in commercial engagements:** EARN principles are adapted structurally for enterprise AI governance without transferring restricted EU/NATO operational data.

**Stage 1b Gate Status:** Flagship ideation complete. Target Q3–Q4 2027 launch sequenced behind `OP-ITG-013` market validation; ready for Stage 2 CIO/CTO hypothesis discovery.
