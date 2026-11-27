---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-005"
execution_track: "Track A (Client Advisory — CIO / CTO AI Infrastructure Architecture)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Opportunities to Publish/AI Infrastructure Consultancy.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-005`: AI Infrastructure Consultancy

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Upstream framing is documented in [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Commercial Dimension | Locked Pre-Pilot Parameter |
| :--- | :--- |
| **Opportunity & Tier** | `OP-ITG-005` — Core & Specialty Backlog (Advisory / Starter Kit, Medium & Large Tier) |
| **Target Buyer** | CIOs, CTOs, and Enterprise Architecture / Cloud Leads |
| **Delivery Horizon & Effort** | 6–8 weeks, High effort (architecture review, FinOps modeling, security boundary design) |
| **Capital & Target Window** | €2,000–€8,000 expected studio band (with \$0 upfront working capital) · Target Q2–Q3 2027 |
| **Compounding Vector** | Pair with `OP-ITG-002` (ICT Governance) and feed `OP-ITG-013` / `OP-RSK-004` |

## 2. Business Need & Cost of Inaction

Enterprises scaling AI workloads without an intentional infrastructure blueprint incur runaway token and GPU bills, fragmented data exposure across external model APIs, and brittle single-vendor dependencies. Correcting an unarchitected AI stack after production incidents or DORA/GDPR audit findings costs multiples of a proactive 6–8 week architectural review.

For mid-to-large IT leaders, independent pre-build architecture advice also prevents premature multi-year commitments to oversized GPU reservations or proprietary cloud ecosystems that constrain future open-weight or sovereign EU alternatives.

> *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* The legacy ADPA source (`Opportunities to Publish/AI Infrastructure Consultancy.docx`) sets illustrative targets such as 100% regulatory compliance and latency/cost optimization by Q4 2026. Those figures represent pre-pilot template modeling rather than realized client actuals; 2027 commercial viability is anchored on delivering a fixed-scope €2,000–€8,000 architectural blueprint using client-funded cloud environments.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Expected Benefit | Risk & Effort Profile | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option A — Full Managed MLOps Build** | Design, deploy, and operate client Kubernetes/GPU clusters | Larger gross billings | High effort, multi-vendor support liability, violates \$0 working-capital model | Reject |
| **Option B — High-Level Policy Memo Only** | Deliver generic cloud-AI best-practice slides | Low effort | Low buyer differentiation vs. free hyperscaler whitepapers | Reject |
| **Option C — Vendor-Neutral AI Infrastructure Blueprint** | 6–8 week advisory delivering hosting decision matrix, FinOps routing/cap rules, and security boundaries | High-margin €2,000–€8,000 anchor, pairs directly with `OP-ITG-002`, zero capex | High effort; managed via modular architecture templates | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging & Pricing Anchor:** Fixed-scope 6–8 week AI Infrastructure & FinOps Architecture Sprint in the €2,000–€8,000 band, billed in two milestones (50% discovery kickoff / 50% blueprint & runbook handover).
- **Zero Working-Capital Mechanics:** CBa Consult deploys zero cloud compute or hardware; all benchmarking, cost telemetry, and sandbox validation run inside the client's existing AWS/Azure/GCP/on-prem accounts.
- **Unit-Economics Guardrail:** Restrict architectural deep-dives to up to three priority AI workloads and one primary cloud/on-prem landing zone so High-effort advisory remains profitable inside the 6–8 week cap.
- **Compounding Path:** Serves as the technical foundation for `OP-ITG-002` (ICT Governance audits), `OP-ITG-013` (Agent Governance), and `OP-RSK-004` (EU AI Act / ISO 42001 certification readiness), turning a single infrastructure review into multi-pillar enterprise advisory.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- | :--- |
| `R-IT5-01` | Rapidly shifting AI model/hosting stack obsoletes static advice | High / Medium | Deliver abstraction-layer and model-routing decision criteria rather than single-model picks |
| `R-IT5-02` | Client cloud/hardware vendor lock-in constrains options | Medium / Medium | Quantify switching costs and define portable container/API gateway boundaries |
| `R-IT5-03` | High advisory effort compresses Director margin inside €2k–€8k band | Medium / High | Reuse standardized Digital Transformation assessment checklists and strict 8-week timebox |
| `R-IT5-04` | Client lacks internal platform engineers to execute handover runbook | Medium / Medium | Assess internal Ops readiness in Week 1 and pair remediation support with `OP-ITG-002` |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Evidence Required to Promote `Idea` to `Pilot` |
| :--- | :--- | :--- |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Director sign-off balancing High effort against Q2–Q3 2027 Tier A flagship commitments |
| **Architecture Template Lock** | Pending | Modularize AI Infra Blueprint & FinOps checklist to keep delivery under 8–10 hrs/wk |
| **Pilot Scope & KPI Lock** | Pending | Named CIO/CTO pilot sponsor with measurable baseline AI spend/latency target |
| **Director Decision** | `PENDING` | Adjudicate standalone Q2–Q3 launch vs. integrating directly into `OP-ITG-002` / `OP-ITG-013` |

**Gate Execution Rule:** `OP-ITG-005` remains at status `Idea` (`PENDING_DIRECTOR_SIGNOFF`) until the Director confirms capacity allocation alongside Tier A Q2–Q3 commitments and locks the modular blueprint intake cap.
