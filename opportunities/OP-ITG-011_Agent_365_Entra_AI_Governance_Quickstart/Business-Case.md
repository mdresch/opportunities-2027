---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-011"
execution_track: "Tier B Growth — IT & Technology (Microsoft Ecosystem)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md §6 IT & Technology (MS Ignite 2026 Spark)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-011`: Agent 365 & Entra AI-Agent Governance Quick-Start

> **Governance & SSOT Callout:** This Stage 3 Business Case is governed by [Tailored Hybrid SIDPA Governance](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and linked to [inventory-of-ideas.md](../../inventory-of-ideas.md) and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling artifacts: [Ideation-Spark.md](Ideation-Spark.md), [BD-Quick-Reference.md](BD-Quick-Reference.md), [Source-Documents.md](Source-Documents.md), and `Ideation-Document.md`.

## 1. Executive Summary

| Dimension | Stage 3 Baseline |
| --- | --- |
| **Opportunity ID & Title** | `OP-ITG-011` — Agent 365 & Entra AI-Agent Governance Quick-Start *(Advisory / Starter Kit)* |
| **Target Buyer & Segment** | CIOs, CISOs & M365 Security Leads (Medium & Large enterprises) |
| **Delivery Horizon & Effort** | 4–6 weeks (6–8 hrs/wk) · Medium effort · Target Q1–Q2 2027 |
| **Working-Capital Model** | $0 initial working capital (tenant-native configuration; €2,500–€7,500 indicative band) |
| **Compounding Path** | Entry wedge for `OP-ITG-002` (ICT Governance) & `OP-ITG-007` (Power Apps/Copilot CoE) |
| **Gate Status** | `PENDING_DIRECTOR_SIGNOFF` — Tier B Growth offer awaiting G4 sign-off |

## 2. Business Need & Cost of Inaction

Following Microsoft Ignite 2026 (November 2026), enterprises adopting Copilot Studio, Copilot Autopilot, and Windows 365 for Agents face immediate governance risk: agents running under shared human credentials, broad SharePoint access, and uncapped consumption budgets. As highlighted in the portfolio spark, Gartner projects **25% of enterprise breaches by 2028** will trace to AI-agent abuse and **80% of new apps** will be disposable—making pre-scale identity and FinOps hardening urgent.

Without a dedicated governance baseline, CIOs and CISOs either freeze AI productivity initiatives indefinitely or absorb severe data-oversharing and cloud-bill shocks. *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals*: this is a newly minted Ignite 2026 Spark opportunity (no ADPA `.docx` assigned), so realized client ROI metrics await Stage 4 pilot execution.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Capital / Effort | Strategic Fit & Risk | Recommendation |
| --- | --- | --- | --- | --- |
| **Option A: Status Quo (Do Nothing)** | Leave AI-agent governance bundled vaguely inside general `OP-ITG-002` | €0 / None | Misses acute Q1–Q2 2027 post-Ignite buyer urgency | **Reject** |
| **Option B: 4–6 Week Tenant-Native Governance Quick-Start** | Configure Agent 365 FinOps caps, Entra Agent JIT ID, Project Perception, and BSM 2026 | $0 upfront (€2,500–€7,500 band) | High-urgency Tier B wedge; feeds `OP-ITG-002` and `OP-ITG-007` | **Recommended** |
| **Option C: Managed 24/7 AI-Agent SOC Service** | Provide continuous monitoring and custom SIEM tooling | High operational overhead | Requires staffed SOC capacity incompatible with solo-director model | **Reject** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

All work executes inside the client's existing Microsoft 365 / Entra tenant with $0 CBa Consult working capital and 6–8 hrs/week over 4–6 weeks:

- **Fixed-Scope Quick-Start:** Agent discovery audit, Entra AI-Agent JIT identity blueprint, Agent 365 FinOps quota setup, BSM 2026 hardening checklist, and governance charter.
- **Compounding Path:** Serves as the high-urgency entry door into multi-quarter ICT Governance retainers (`OP-ITG-002`) and Power Platform / Copilot Studio CoE engagements (`OP-ITG-007`).

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| --- | --- | --- | --- |
| **R-01** | Rapidly evolving Ignite 2026 preview features shift UI or API behavior mid-engagement | High / Medium | Anchor core controls on GA Entra Conditional Access & Purview baselines with preview fallback notes |
| **R-02** | Client security team delays Global/Entra Admin privilege provisioning | Medium / High | Deliver read-only discovery script and pair-configuration protocol with client admins |
| **R-03** | Scope creep into building custom Copilot Studio agents | Medium / Medium | Separate governance hardening SOW from agent-build delivery (`OP-DTX-003` / `OP-ITG-007`) |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Required Evidence / Decision | Status |
| --- | --- | --- |
| **Ignite 2026 Control Checklist** | Finalize Agent 365, Entra Agent ID, and BSM 2026 configuration runbook | **PENDING** |
| **Tier B Pilot Outreach Pack** | Align [BD-Quick-Reference.md](BD-Quick-Reference.md) script for Q1 2027 CIO/CISO outreach | **PENDING** |
| **Director Sign-Off (`OP-ITG-011`)** | Formal adjudication by Menno Drescher to authorize Stage 4 pilot launch | **PENDING_DIRECTOR_SIGNOFF** |
