---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-001"
execution_track: "Track B — Platform-Backed / Graduated Build"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Embrace AI-Enhanced IT Operations.docx; Maximize AI ROI with FinOps.docx; Rethink Cloud Operations.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Stage 1b Ideation Document — `OP-ITG-001`: Cloud Governance Quick-Start

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> **Sibling Context:** [Ideation-Spark.md](Ideation-Spark.md) · [Source-Documents.md](Source-Documents.md)

## 1. Problem Context & 2027 Market Trigger

Small companies scaling their first production cloud footprint (Azure, AWS, or M365 + cloud workloads) routinely accumulate shadow subscriptions, shared admin credentials, unmonitored egress/compute spend, and inconsistent security defaults. Without tenant/account isolation, budget alerts, and basic Zero Trust controls, early cloud growth turns into surprise billing spikes and compliance exposure.

In 2027, cost-conscious Founders, CIOs, and IT/Cloud Leads face growing NIS2/DORA supply-chain security questionnaires and FinOps pressure on AI/cloud bills, yet cannot justify hiring a full-time cloud architect or commissioning an enterprise governance program.

- **Target Buyer Segment:** Founders, CIOs, and IT/Cloud Leads in Small organizations.
- **Core Wedge Pain:** Uncontrolled initial cloud footprint lacking tenant isolation, cost guardrails, and baseline Zero Trust hygiene.
- **Positioning Anchor:** Minimal policy baseline scoped down from CBa Consult's `ICT-Governance-Framework-Application` rather than invented from scratch, delivered with `$0` CBa upfront capital.

## 2. Solution Architecture & Delivery Workflow

`OP-ITG-001` delivers a **4–6 week** (`4–6 hrs/wk`) Platform-Backed Starter Kit backed by the **Digital Transformation** toolkit and `ICT-Governance-Framework-Application` templates:

| Phase | Timing | Core Activities | Concrete Client Deliverables |
| :--- | :--- | :--- | :--- |
| **1. Footprint & Risk Triage** | Week 1 | Inventory cloud accounts/tenants, admin IAM roles, and active billing alerts against the Zero Trust Maturity Model baseline. | Cloud Footprint Snapshot & Zero Trust Gap Checklist |
| **2. Tenant Isolation & IAM Baseline** | Weeks 2–3 | Establish minimal tenant/subscription/account separation, MFA/RBAC guardrails, and break-glass access policies. | Minimal Cloud Governance Policy Baseline & IAM Ruleset |
| **3. FinOps Cost & Observability Guardrails** | Weeks 4–5 | Configure budget thresholds, anomaly cost alerts, and essential operational monitoring hooks inspired by ADPA FinOps/Observability patterns. | Configured Cost Alert Policy & Observability Checklist |
| **4. Handover & `OP-ITG-002` Roadmap** | Week 6 | Walk through the baseline with client IT leads and map optional graduation steps into full `OP-ITG-002` ICT Governance. | Operator Runbook & Prioritized 90-Day Remediation Backlog |

### Scoped-Down Platform Capabilities

- **Zero Trust Essentials:** Extracts only the Tier-1 identity, MFA, and least-privilege checks from `ICT-Governance-Framework-Application` suitable for Small teams.
- **FinOps Hygiene:** Establishes tag ownership, monthly budget caps, and AI/GPU API spend thresholds before bill shocks occur.
- **Observability Baseline:** Defines minimum log-retention, uptime alerting, and incident escalation ownership without full SIEM overhead.

## 3. Market Comparables & CBa Consult Differentiation

| Alternative | Typical Model & Pricing | Key Limitations | CBa Consult `$0`-Capital Differentiation |
| :--- | :--- | :--- | :--- |
| **Managed Cloud MSPs** | Monthly retainer + percentage of cloud spend (€2k–€8k/mo ongoing) | Lock-in incentives; focuses on ticket handling rather than lean client-owned governance. | Fixed-scope €800–€3,000 quick-start with zero recurring MSP lock-in. |
| **Enterprise Cloud Landing Zone Consultancies** | Multi-month Terraform/LZ engagements (€25k–€80k+) | Over-engineered for a Small company's first real cloud footprint. | Scoped down from `ICT-Governance-Framework-Application` into practical 4–6 week guardrails. |
| **Default Vendor Free-Tier Advisories** | Automated cloud console scorecards (Azure Advisor, AWS Trusted Advisor) | Noisy recommendations without business priority, policy ownership, or IAM context. | Human-curated minimal policy baseline, Zero Trust checklist, and FinOps alert setup. |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Origin & Location | Extracted Capabilities Reused in `OP-ITG-001` | Reuse Classification |
| :--- | :--- | :--- | :--- |
| `ICT-Governance-Framework-Application` | CBa Consult GitHub Platform ([Ideation-Spark.md](Ideation-Spark.md)) | Zero Trust Maturity Model, core cloud policy templates, and governance control catalog. | Core Track B Platform IP |
| `Embrace AI-Enhanced IT Operations.docx` | ADPA Projects Lists ([Source-Documents.md](Source-Documents.md)) | Proactive ITOps triage, SLA hygiene, and incident-reduction framing. | Primary ADPA Ideation Source |
| `Maximize AI ROI with FinOps.docx` & `Rethink Cloud Operations.docx` | ADPA Projects Lists ([Source-Documents.md](Source-Documents.md)) | Cloud cost-alert patterns, FinOps accountability, and operational guardrails. | Supporting ADPA Guidance |
| `Regain Contorl Through Observability.docx` & `Invest in a culture of Curiosity.docx` | ADPA Projects Lists ([Source-Documents.md](Source-Documents.md)) | Telemetry visibility basics and engineering curiosity/adoption mindset. | Supporting ADPA Guidance |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **In Scope:** Minimal tenant/account isolation design, IAM/Zero Trust checklist, FinOps budget/anomaly alerts, and operator handover runbook.
- **Explicitly Out of Scope:** 24/7 SOC/NOC monitoring, full multi-region enterprise landing-zone refactoring, custom SaaS application coding, or hardware procurement.
- **Required Delivery Skills:** Cloud governance, Zero Trust basics, and IAM/cost controls (Director-led, zero external contractors).
- **Target Outcome & Proof (`OP-X-004`):** Tangible Zero Trust gap closure + active FinOps budget alerts generating early cash flow and proof.
- **Compounding / Scale Path:** Entry wedge into `OP-ITG-002`, reusing `ICT-Governance-Framework-Application` Zero Trust Maturity Model and policy templates.
- **Primary Boundary Risk:** Market validation for Pillar 6 Small-tier quick-start is not yet complete—treat demand as unconfirmed until discovery.
- **Lifecycle & Gate Status:** `Status = Idea` | `Active Pilots = 0`. Market validation for Pillar 6 Small-tier quick-start remains unresearched; promotion to Stage 2/Stage 4 (`G4`) requires validating buyer urgency across ≥3 Small-tier IT leads before pilot commitment.
