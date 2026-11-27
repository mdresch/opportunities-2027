---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-001"
execution_track: "Track B — Platform-Backed / Graduated Build"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Embrace AI-Enhanced IT Operations.docx; Maximize AI ROI with FinOps.docx; Rethink Cloud Operations.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Stage 3 Business Case — `OP-ITG-001`: Cloud Governance Quick-Start

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> **Sibling Context:** [Ideation-Spark.md](Ideation-Spark.md) · [Source-Documents.md](Source-Documents.md)

## 1. Executive Summary

| Dimension | Portfolio Baseline (`inventory-of-ideas.md` / `Ideation-Spark.md`) |
| :--- | :--- |
| **Opportunity ID & Title** | `OP-ITG-001` — Cloud governance quick-start |
| **Pillar & Category** | 6. IT and Technology · Platform-Backed Starter Kit · Small |
| **Signature Toolkit** | Digital Transformation (backed by `ICT-Governance-Framework-Application`) |
| **Time Horizon & Effort** | 4–6 wks (4–6 hrs/wk) · Medium effort (Director sweat equity) |
| **Expected Capital Envelope** | €800–€3,000 (client-funded fixed-fee quick-start; `$0` CBa upfront capital) |
| **Target Quarter & Status** | Q2 2027 · `Idea` (`Active Pilots = 0`) |

## 2. Business Need & Cost of Inaction

Small firms running their first production cloud workloads face asymmetric downside from misconfigured IAM permissions, lack of tenant isolation, and unmonitored AI/compute billing spikes.

- **Cost of Inaction:** Surprise monthly cloud bills, high blast radius from shared root/admin accounts, and stalled enterprise B2B procurement when security questionnaires ask for basic access controls.
- **Right-Sized Governance:** Reusing scoped-down `ICT-Governance-Framework-Application` templates avoids paying €25k+ for enterprise landing zones while resolving urgent baseline gaps.

*Note on ADPA Source Evidence:* The assigned ADPA source `Embrace AI-Enhanced IT Operations.docx` contains enterprise-scale projections (40% downtime reduction, 30% SLA improvement, 300% 3-year ROI, \$2.5M annual cost savings, \$1.8M revenue protection). All such figures are **Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals** and do not apply to Small-tier `OP-ITG-001` deliveries without pilot validation.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Capital & Effort | Pros | Cons / Risks | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Option 1: Do Nothing / Sell `OP-ITG-002` Directly** | Pitch only full mid/large ICT governance programs. | `$0` / None | Larger deal size when closed. | Too heavy for Small-tier buyers; loses entry-wedge pipeline. | Reject |
| **Option 2: Fixed-Scope Quick-Start Wedge (Track B Starter)** | Reuse `ICT-Governance-Framework-Application` templates in a 4–6 week baseline sprint. | `$0` CBa capital / Medium (4–6 wks) | Zero new build cost; immediate FinOps/Zero Trust value; feeds `OP-ITG-002`. | Pillar 6 Small-tier market validation is still unconfirmed. | **Recommended** |
| **Option 3: Build Multi-Tenant Cloud Governance SaaS** | Develop a custom SaaS CSPM/FinOps scanning product. | High capital / High | Recurring SaaS potential. | Violates `$0` capital rule and competes directly with hyperscaler native tools. | Reject |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Working-Capital Discipline:** `$0` upfront cash outlay. Leverages existing CBa Consult IP (`ICT-Governance-Framework-Application` Zero Trust Maturity Model and policy templates) deployed inside the client's existing Azure/AWS/M365 tenant.
- **Commercial Packaging & Milestones:** Fixed-fee **€800–€3,000** starter package delivered over 4–6 weeks (`4–6 hrs/wk`), billed 50% at kickoff and 50% at baseline handover.
- **Success Proof Metric (`OP-X-004`):** Zero Trust baseline score improvement, MFA/RBAC remediation count, and active FinOps budget alerts verified at Week 6.
- **Compounding Path:** Serves as the low-friction entry wedge into `OP-ITG-002` (full ICT Governance framework rollout) as clients scale headcount and compliance maturity.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- | :--- |
| **R-01** | Market validation for Pillar 6 Small-tier quick-start is currently unresearched. | Medium / High | Run 3–5 targeted buyer discovery conversations before committing build or GTM hours. |
| **R-02** | Client expects hands-on remediation of legacy infrastructure outside quick-start scope. | Medium / Medium | Limit CBa scope to policy baseline, IAM/cost alerts, and prioritized 90-day backlog; price remediation as `OP-ITG-002`. |
| **R-03** | Client delays granting read/governance access to cloud tenant. | Medium / Medium | Make tenant access readiness a Week 1 prerequisite in SOW before starting clock. |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Required Evidence for G4 Approval | Current Status |
| :--- | :--- | :--- |
| **Pillar 6 Market Validation** | Tier 2 buyer-demand check across ≥3 Small-tier Founders/IT Leads logged in `Hypothesis-Register.md` | `PENDING` |
| **Template Extraction** | Scoped-down Zero Trust & FinOps checklist extracted from `ICT-Governance-Framework-Application` | `PENDING` |
| **Pricing & SOW Lock** | Fixed-fee pricing anchor (€800–€3,000) and negative scope boundaries approved | `PENDING` |
| **Director Adjudication (`G4`)** | Formal sign-off by Menno Drescher to promote `OP-ITG-001` from `Idea` to `Pilot` | `PENDING_DIRECTOR_SIGNOFF` |
