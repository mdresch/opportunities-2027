# Ideation Spark — `OP-ITG-013`: Enterprise AI Agent Governance Assessment

**Status:** 🔥 Stage 1b Complete — [Tier-2-Market-Research.md](Tier-2-Market-Research.md), [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md), updated [One-Pager](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md) ([.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx)), and Stage 2 Hypotheses (`HYP-2027-013`–`015`) complete · Onboarding Portal graduated to standalone SIDPA repo [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) (Stage 1 Init)
**Tier:** A — Core 5 Active Flagship (GTM Priority #5, Q2 2027; Pillar 17 Priority #1)
**Strategic Asset:** 3. Digital Labor
**Functional Area:** IT and Technology (Pillar 17 — Intelligence & Autonomous Systems Governance) · **Signature Toolkit:** Management Consulting
**Size:** Medium & Large
**Source:** [inventory-of-ideas.md §6 IT and Technology](../../inventory-of-ideas.md) · [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) · existing client-facing deliverable already drafted: [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md)

## Positioning

> For **CIOs, CISOs, and Chief AI Officers** at medium-and-large enterprises who struggle with **no visibility into which AI agents exist, who owns them, or what they're authorized to do**, **Enterprise AI Agent Governance Assessment** is an **Audit / Diagnostic** backed by the **`ICT-Governance-Framework-Application` platform** that delivers **a full agent inventory with identity, permission, lifecycle, and FinOps accountability** with $0 working capital.

## What it is

Assess enterprise agent inventory, agent owners, human accountability, agent identities (Entra Agent Identity), tool permissions, lifecycle, agent observability (Agent 365), and Agent FinOps.

## 7 Pivotal Questions

1. **Buyer & 2027 Trigger** — CIO / CISO / Chief AI Officer. Microsoft Ignite 2026 shipped Agent 365 and Entra Agent Identity as concrete platform primitives, and Gartner's Top Tech Trends 2027 names AI Agent Identity and Disposable Apps directly — this is the single most market-validated idea in the entire 115-project inventory (🟢🟢🟢).
2. **The Wedge (Pain)** — Enterprises are standing up agents faster than they can govern them: no consistent agent inventory, no clear human accountability chain, no enforced tool-permission or lifecycle discipline.
3. **Deliverable & Existing IP** — Extends `OP-ITG-002` (ICT Governance Maturity Assessment) and `OP-ITG-011` (Agent 365/Entra Quick-Start) using the real, actively-developed `ICT-Governance-Framework-Application` platform (self-assessed 3.2/5.0 "Defined" as of Aug 2025, CI-passing, built on a CBa Consult IT Management Framework) as the technical backbone — not a document template.
4. **Sweat-Equity Feasibility** — 6–10 weeks at 8–12 hrs/wk, High effort. Feasible for Pilot #1 but requires genuine cross-functional CIO/CISO/CAIO sponsorship to get agent-inventory access.
5. **Outcome & Proof** — A delivered agent inventory + governance gap report mapped to Entra Agent Identity and Agent 365 observability — this is the flagship CIO/CISO/CAIO offer of the whole portfolio and feeds Case Study #1.
6. **Boundaries & Risk** — Agent platforms (Agent 365, Entra Agent Identity, MCP/A2A) are moving fast; the assessment framework needs a refresh cadence, not a one-time build. Don't overclaim certification authority — this is an assessment, not a certifying body.
7. **Compounding / Scale Path** — Natural precursor to `OP-ITG-016` ("COBIT for Agents" operating architecture, once an org has 500+ agents) and pairs with `OP-HR-009` (Human + Agent Workforce Operating Model) and `OP-RSK-004` ("SOC 2 for AI").

## Effort, Capital & Timeline

| Time Horizon | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| 6–10 wks (8–12 hrs/wk) | High | €4,000–€12,000+ | Q1–Q2 2027 (GTM Priority #5 / Pillar 17 Priority #1) |

## Market Validation

🟢🟢🟢 Top 2027 priority — backed by Gartner Top Tech Trends 2027 (AI Agent Identity, Disposable Apps) & MS Ignite 2026 (Agent 365, Entra Agent Identity).

## Existing Assets to Draw On

- [`github.com/CBA-Consult/ICT-Governance-Framework-Application`](https://github.com/CBA-Consult/ICT-Governance-Framework-Application) — the most technically mature asset in the whole oppurtunities-2027 exploration; backs this assessment directly.
- **`sidpa-template` (`mdresch/sidpa-template`)** — live, pytest-verified reference implementation of Bayesian `DecisionFrame` governance gates (`DecisionAuthority.FULL` vs `LOW`, `minimum_margin = 0.05` tie-break halting, Permanent Lineage Freeze, `requires_human_approval: true`, and `validate-intent-foundation`).
- [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md) — client-facing one-pager already drafted.

## Related Opportunities

`OP-ITG-002`, `OP-ITG-011` (precursors) · `OP-ITG-016` (follow-on architecture) · `OP-HR-009`, `OP-RSK-004` (pairs with)

## Next Steps (Tier 2 → Pilot Gate)

- [x] Pull the current open-issue/PR state of `ICT-Governance-Framework-Application` to confirm what agent-governance capability is already shippable vs. still roadmap *(completed 2026-11-23; documented in [Tier-2-Market-Research.md](Tier-2-Market-Research.md) §4)*.
- [x] Draft the standalone **8-Pillar Agent Inventory & Governance Assessment Questionnaire / Maturity Scorecard** (`HYP-2027-015`) *(completed 2026-11-23: [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md))*.
- [x] Complete the **Pre-Pilot Gate (`G4`) Charter** *(completed 2026-11-23 in draft pending portal intake & Director sign-off: [Pilot-Charter.md](Pilot-Charter.md))*.
- [ ] Capture and interview **10 CIO/CISO prospects** (`HYP-2027-013`, `HYP-2027-014`) via the standalone **`mdresch/agent-governance-onboarding`** web portal (self-assessment submissions → 30-min briefing → Pilot #1 sponsor sign-off).
## Business Development sources (local)

See [BD-Quick-Reference.md](BD-Quick-Reference.md) — CBa Business Development folders on the Director machine (**not in git**). Master index: [BD-Business-Development-Sources.md](../../docs/crosswalk/BD-Business-Development-Sources.md).

## Assigned Source Documents (ADPA)

- [Source-Documents.md](Source-Documents.md) — full manifest
- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content
- [Business-Case.md](Business-Case.md) — extracted business case content
