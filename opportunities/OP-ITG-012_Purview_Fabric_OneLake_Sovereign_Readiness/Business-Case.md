---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-012"
execution_track: "Tier B — Growth (Pillar 6: IT and Technology)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Microsoft Ignite 2026 Portfolio Analysis via inventory-of-ideas.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-012`: Purview-to-Fabric/OneLake & Sovereign Control Panel Readiness

> **Governance & SSOT Callout:** This Stage 3 Business Case follows [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and anchors to [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Canonical diagnostic framing resides in [Ideation-Spark.md](Ideation-Spark.md); source status is logged in [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Dimension | Specification |
| --- | --- |
| **Opportunity ID & Title** | `OP-ITG-012` — Purview-to-Fabric/OneLake & Sovereign Control Panel Readiness |
| **Target Buyer & Segment** | CIOs, CDOs, and DPOs (Medium & Large European Microsoft enterprises) |
| **Commercial Category** | Tier B Growth — Audit / Diagnostic (Strategic Asset 4 bridging Asset 5) |
| **Delivery Horizon & Effort** | 6–8 weeks (6–10 hrs/wk) · Medium effort · Q2 2027 target |
| **Working Capital & Fee Band** | $0 working capital · €2,500–€8,000 expected fee/capital band |
| **Gate Status** | `PENDING_DIRECTOR_SIGNOFF` (Stage 3 Commercial Viability / G4 Pre-Pilot) |

## 2. Business Need & Cost of Inaction

Following Microsoft Ignite 2026, Microsoft enterprise customers must navigate a structural split: standalone Purview Data Map/Catalog capabilities are shifting into Microsoft Fabric and OneLake, while Purview Data Security & Compliance remains responsible for M365 and Copilot labeling/retention. At the same time, European buyers face urgent SovereignTech data-residency expectations alongside Microsoft's Sovereign Control Panel (Public Preview).

- **Cost of Inaction:** Enterprises risk broken sensitivity labels, non-compliant retention clocks, redundant Fabric/E5 licensing spend, and EU residency gaps when enabling Copilot or OneLake without architectural alignment.
- **Quantitative Evidence Baseline:** *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* No standalone ADPA `.docx` model or realized pilot metrics exist yet; commercial sizing (€2,500–€8,000, 6–8 weeks) is anchored in [inventory-of-ideas.md](../../inventory-of-ideas.md) and must be validated in Pilot #1.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Expected Benefit | Feasibility & Risk | Verdict |
| --- | --- | --- | --- | --- |
| **Option A — Do Nothing** | Leave M365 Purview governance isolated from Fabric/OneLake | Zero near-term effort | Misses high-urgency Ignite 2026 enterprise confusion window | Reject |
| **Option B — Full Fabric Data Engineering Implementation** | Sell end-to-end Fabric lakehouse migrations immediately | Larger engineering tickets | Heavy delivery overhead; competes head-on with GSIs | Reject |
| **Option C — Fixed-Scope Governance & Residency Diagnostic** | 6–8 wk audit bridging Purview, OneLake, Split-Clock & Sovereign Control Panel | $0 working capital; leverages DMBOK/Split-Clock IP; feeds `OP-ITG-010`/`004` | Preview-feature volatility; mitigated via Preview-vs-GA separation | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

`OP-ITG-012` operates with $0 initial working capital by applying CBa Consult's existing Digital Transformation toolkit, DMBOK lifecycle specifications, and Split-Clock retention architecture inside the client's existing Microsoft tenant.

- **Packaging Structure:** Fixed-scope 6–8 week Audit / Diagnostic (€2,500–€8,000 band) delivering a Purview-vs-Fabric responsibility matrix, sensitivity/retention alignment blueprint, Sovereign Control Panel readiness brief, and sequenced roadmap.
- **Compounding Path:** Pairs directly as an upstream diagnostic for `OP-ITG-010` (Retention & Recovery) and `OP-ITG-004` (M365 Migration), reinforcing Strategic Asset 4 (Evidence & Governance) and Asset 5 (Sovereign Information).

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| **R-01** | Sovereign Control Panel remains in Public Preview with shifting GA specs | High / Medium | Clearly separate GA controls from Preview capabilities and avoid SLA guarantees |
| **R-02** | Fabric capacity & Purview licensing dependencies complicate client budgets | Medium / Medium | Include vendor-neutral licensing clarity review in Week 2 discovery |
| **R-03** | Client expects hands-on ETL pipeline migration within diagnostic fee | Medium / High | Enforce negative scope excluding Fabric data-engineering build work |
| **R-04** | Microsoft roadmap updates post-Ignite 2026 alter catalog boundaries | Medium / Low | Timestamp architectural baseline and define quarterly advisory update option |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Readiness | Adjudication Status |
| --- | --- | --- |
| **Market Trigger & IP Alignment** | Grounded in Ignite 2026 shifts + CBa DMBOK & Split-Clock IP | Complete |
| **Stage 2 Discovery Hypothesis** | Pre-Stage 2; requires target-tenant pilot hypothesis before outreach | Open |
| **Working-Capital & Scope Check** | $0 working capital; €2,500–€8,000 diagnostic boundary verified | Verified |
| **Director Sign-Off Decision** | Awaiting Director approval for Q2 2027 Tier B pre-pilot pursuit | `PENDING_DIRECTOR_SIGNOFF` |
