---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-017"
execution_track: "Track B — Platform-Backed / Graduated Build"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "HYP-2027-020 (Formulated), HYP-2027-021 (Formulated), HYP-2027-022 (Testing)"
primary_source: "Portfolio Inventory & Market Analysis 2027 (Track B: mdresch/mxc)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Stage 3 Business Case — `OP-ITG-017`: MXC Hyper-V JIT Scale-to-Zero VM Sandboxes

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> **Sibling SSOTs:** [Pilot-Charter.md](Pilot-Charter.md) · [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md) · [IP-Readiness-and-MXC-Audit.md](IP-Readiness-and-MXC-Audit.md) · [Azure-Scale-Out-and-Boundary-Matrix.md](Azure-Scale-Out-and-Boundary-Matrix.md)

## 1. Executive Summary

| Dimension | Portfolio Baseline (`inventory-of-ideas.md` & [Pilot-Charter.md](Pilot-Charter.md)) |
| :--- | :--- |
| **Opportunity ID & Title** | `OP-ITG-017` — MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes |
| **Pillar & Category** | 6. IT and Technology · Platform-Backed Architecture / Advisory · Medium & Large |
| **Signature Toolkit** | Digital Transformation (Graduated Track B Repo `mdresch/mxc`, Stage 18) |
| **Time Horizon & Effort** | 6–10 wks (8–12 hrs/wk) · High effort (2–3 wks Tier 1; 4–10 wks Tier 2) |
| **Expected Capital Envelope** | €4,000–€15,000+ (Tier 1 €2,000–€4,500; Tier 2 €6,000–€15,000+; `$0` CBa cash outlay) |
| **Target Quarter & Status** | Q2 2027 · `Idea` (`Active Pilots = 0`; engineering complete, commercial pilot pending) |

## 2. Business Need & Cost of Inaction

Enterprise CIOs and CISOs deploying AI agents or automated PII/document pipelines on Windows estates face two unacceptable failure modes: paying 24/7 idle compute/licensing for warm VMs, or accepting 14–45s cold-start failures and shared-kernel security risks.

- **Regulatory Pressure:** Under 2027 EU AI Act Annex III and DORA/NIS2 scrutiny, uncontained agent execution creates audit and breach exposure while always-on VMs erode cloud/on-prem FinOps targets.
- **Commercial Wedge:** Offering a paid 2–3 week benchmark sprint eliminates buyer fear before larger architecture rollout.

*Note on Source Modeling:* No legacy ADPA `.docx` ROI template is assigned ([Source-Documents.md](Source-Documents.md)). Engineering benchmarks (`≤300ms` unpause, `≤800ms` TTFB, `0.0%` idle CPU) come from `mdresch/mxc`, while commercial client TCO figures in [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) and [Executive-Readout-Template.md](Executive-Readout-Template.md) remain **Illustrative Pre-Pilot Modeling — Not Realized Client Actuals** until Pilot #1 closes.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Capital & Effort | Pros | Cons / Risks | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Keep `mdresch/mxc` Purely Technical** | Leave repo open/internal without commercial packaging. | `$0` / None | Zero GTM effort. | Fails to monetize completed Stage 18 engineering or validate `HYP-2027-020`–`022`. | Reject |
| **Option 2: Tiered Track B Advisory + Reference Deploy** | Sell Tier 1 benchmark sprint (€2k–€4.5k) leading into Tier 2 implementation (€6k–€15k+). | `$0` CBa cash / High (6–10 wks) | De-risks buyer adoption via paid 3-week proof; underpins `OP-ITG-013/015/016/018`. | Requires Windows Server 2025 / Win11 Enterprise Hyper-V hosts and NVMe/RAM capacity. | **Recommended** |
| **Option 3: Hosted Cloud Sandbox SaaS** | Rent bare-metal/cloud hosts and operate a multi-tenant SaaS. | High capital / High | Recurring usage billing. | Violates `$0` working-capital rule and contradicts sovereign on-prem positioning. | Reject |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Working-Capital Discipline:** `$0` third-party SaaS or hardware outlay. Engineering IP is already complete in `mdresch/mxc`; client supplies Hyper-V hosts, licensing, NVMe storage, and change windows.
- **Commercial Packaging & Milestones:** Two-stage funnel per [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md): **Tier 1 Benchmark Sprint** (€2,000–€4,500, 50% kickoff / 50% readout) followed by **Tier 2 Reference Implementation** (€6,000–€15,000+, milestone-based).
- **Success Proof Metric (`OP-X-004`):** AC-01.1 demonstrated on client/lab host, sterile `.avhdx` reset verified, and executive TCO model validated.
- **Compounding Path:** Serves as the physical/hypervisor containment substrate across the Tier B strategic stack—powering `OP-ITG-013` (AI agent runtime), `OP-ITG-015` (sovereign data isolation), `OP-ITG-016` (enterprise architecture), and `OP-ITG-018` (MIP).

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- | :--- |
| **R-01** | Client lacks Windows Server 2025 / Win11 Enterprise Hyper-V or sufficient NVMe/RAM for warm pools. | Medium / High | Enforce Week 1–2 go/no-go prerequisite gate before Tier 2 commitment ([Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md)). |
| **R-02** | Upstream `microsoft/mxc` divergence breaks `feat/hyperv-v2-rebased` maintainability. | Low / Medium | Pin tested release baselines in [IP-Readiness-and-MXC-Audit.md](IP-Readiness-and-MXC-Audit.md) and separate advisory scope from upstream OSS maintenance. |
| **R-03** | Client seeks unbounded L1/SOC operations under fixed advisory pricing. | Medium / Medium | Lock explicit negative scope in SOW shell (client owns Hyper-V admin, SOC, and image maintenance). |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Required Evidence for G4 Approval | Current Status |
| :--- | :--- | :--- |
| **Lab/Client Benchmark Evidence** | Signed AC-01.1 benchmark output (`benchmark_jit_wake.py`) & sterile `.avhdx` reset log | `PENDING` |
| **Wave 1 Discovery & Hypotheses** | ≥3 ICP discovery calls logged in [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md) advancing `HYP-2027-020`–`022` | `PENDING` |
| **Paid Tier 1 SOW Commitment** | First paid Tier 1 Benchmark Sprint (€2,000–€4,500) ready for execution | `PENDING` |
| **Director Adjudication (`G4`)** | Formal sign-off by Menno Drescher to promote `OP-ITG-017` from `Idea` to `Pilot` | `PENDING_DIRECTOR_SIGNOFF` |
