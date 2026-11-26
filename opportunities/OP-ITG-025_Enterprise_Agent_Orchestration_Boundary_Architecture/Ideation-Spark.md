# Ideation Spark — `OP-ITG-025`: Enterprise Agent Orchestration Boundary Architecture (MCP, Identity, Deny-by-Default)

**Status:** Idea — Stage 1a Spark (competitive roll-up 2026-11-26)  
**Tier:** Tier B pull *(2028)* — after `OP-ITG-013` pipeline stable  
**Strategic Asset:** 3. Digital Labor + 4. Evidence & Governance  
**Functional Area:** 6. IT and Technology · **Signature Toolkit:** Digital Transformation  
**Category:** Audit / Architecture · **Size:** Medium & Large  
**Source:** [Portfolio-Extension-Areas-2027.md](../../docs/research/Portfolio-Extension-Areas-2027.md) · Accenture AI Foundation / AgenticOps

## Positioning

> For **CISOs, enterprise architects, and platform leads** running **shadow agents and MCP integrations** without a **deny-by-default boundary model**, **Enterprise Agent Orchestration Boundary Architecture** delivers **client-owned reference architecture and ADRs** for **agent tool access, identity, logging, and escalation**—without implementing NVIDIA/OpenAI stacks or selling MIP unless separately contracted.

## The Problem (Before Solution)

- Agents gain **tool access** (MCP, APIs, data) faster than **architecture** records permissions.
- SIs sell **implemented** AgenticOps; mid-market needs **decision-quality design** first.
- Auditors and `OP-RSK-004` buyers ask **what agents can touch**—not only policy PDFs.

## What the Client Is Entitled To (Deliverables)

**Duration:** 4–6 weeks · **Fee band:** €3,000–€8,000

1. **Boundary model** — agents, tools, data stores, humans; trust zones.
2. **MCP / API governance pattern** — allowlists, audit trail, escalation on sensitive tool calls (vendor-neutral).
3. **Identity & accountability** — agent IDs, session linkage, Entra/IAM mapping (`OP-ITG-013`).
4. **Logging & escalation** — retention hooks for `OP-RSK-004` and `OP-RSK-007`.
5. **Architecture Decision Record (ADR) set** — client-owned, RFP-ready for SI or internal platform team.

## What CBa Consult Does — and Does Not

| CBa does | CBa does not |
| --- | --- |
| Architecture workshops, ADRs, requirements for implementation | Develop or deploy agents |
| Align patterns to market practice (deny-by-default, OpenShell-style ideas) | Mandate single hyperscaler stack |
| Hand off to `OP-ITG-016` for fleet-scale design | Auto-start `OP-ITG-018` MIP |

## Why CBa Consult Should Offer This

- Natural **follow-on from `OP-ITG-013`** — assessment → **how it must be wired**.
- Extends **Digital Labor** without SI P&L.
- Reuses **ICT Governance Framework** and agent governance IP.
- **2028 timing** protects Q1–Q2 2027 Tier A bandwidth.

## Bundles & Commercial SKU

`OP-ITG-013` → `OP-CHG-003` (GO) → `OP-ITG-025` → SI implementation

## Related Opportunities

`OP-ITG-013` · `OP-ITG-016` · `OP-ITG-002` · `OP-RSK-007` · `OP-CHG-003`

## Competitive Context

Accenture AI Foundation — CBa delivers **architecture & evidence**, not AgenticOps build.

## Next Steps

- [ ] ADR template set linked from `OP-ITG-002` methodology
- [ ] Pull-only sales until two `OP-ITG-013` assessments complete