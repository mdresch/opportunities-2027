---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-002"
execution_track: "Track B (Core & Specialty Backlog — Platform-Backed Assessment)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "ADPA ICT Governance Framework/ICT Governance Docs version Draft/Ideation_Document_4c04f981.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-002`: ICT Governance Maturity Assessment & Multi-Cloud Compliance Audit

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) and cataloged in [inventory-of-ideas.md](../../inventory-of-ideas.md). Portfolio tiering context is tracked in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Local workspace baseline: [Ideation-Spark.md](Ideation-Spark.md), [Source-Documents.md](Source-Documents.md), and [BD-Quick-Reference.md](BD-Quick-Reference.md).

## 1. Problem Context & 2027 Market Trigger

Mid-market and large enterprises running workloads across AWS, Azure, and GCP face widening governance drift between static PDF policy binders and actual cloud runtime configurations. Legacy annual spreadsheet audits create multi-month blind spots, inconsistent control evidence across COBIT 2019, ITIL 4, ISO/IEC 38500, and NIST CSF 2.0, and heavy engineering friction whenever compliance teams conduct retrospective reconciliations.

- **Target Buyers:** CIOs, CTOs, CISOs, and Enterprise Architecture / Cloud Governance Leads (Medium & Large tier).
- **2027 Market Trigger:** Binding enforcement under DORA/NIS2, EU AI Act governance readiness, board-level cloud cost and vendor-sprawl discipline, and demand for conflict-free, software-accelerated assessments instead of slow Big Four manual audits.
- **Core Pain (The Wedge):** Multi-cloud configuration drift and fragmented IT governance frameworks that leave leadership unable to prove continuous control effectiveness without burning 20–40% of engineering time.

## 2. Solution Architecture & Delivery Workflow

Built on CBa Consult's **Management Consulting** Signature Toolkit and backed by the CI-passing **ICT-Governance-Framework-Application** (self-assessed 3.2/5.0 "Defined" in Aug 2025, pushed Sept 2026) and ADPA policy-as-code concepts, `OP-ITG-002` executes an **8–12 week** structured assessment:

1. **Phase 1 — Multi-Cloud & Governance Baseline Discovery (Weeks 1–2):** Inventory AWS/Azure/GCP environments, existing ITIL/COBIT policies, and active regulatory mandates (DORA, NIS2, ISO/IEC 38500, NIST CSF 2.0).
2. **Phase 2 — Platform-Backed Maturity Scoring & Drift Audit (Weeks 3–5):** Deploy assessment rubrics and policy-as-code checks via the `ICT-Governance-Framework-Application` to benchmark governance maturity and detect multi-cloud control gaps and override bypasses.
3. **Phase 3 — Remediation Architecture & Runtime Guardrails (Weeks 6–9):** Design prioritized corrective playbooks, automated telemetry alerts, and policy-as-code rules linking engineering workflows to measurable control effectiveness.
4. **Phase 4 — Executive Readout & Roadmap Handover (Weeks 10–12):** Deliver board-ready Governance Maturity Scorecard, Compliance Gap Matrix, and phased 12-month remediation roadmap.

### Core Deliverables & Framework Mapping

- **Multi-Framework Maturity Scorecard:** Quantitative baseline mapped simultaneously across COBIT 2019, ITIL 4, ISO/IEC 38500, and NIST CSF 2.0.
- **AWS / Azure / GCP Drift & Bypass Register:** Prioritized remediation findings tying cloud misconfigurations to executive RACI owners.
- **12-Month Governance Remediation Roadmap:** Phased implementation backlog ready for internal execution or `OP-ITG-018` MIP continuity.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Typical Market Offering | Limitations / Friction | CBa Consult (`OP-ITG-002`) Differentiation |
| --- | --- | --- | --- |
| **Big Four IT Audit Practices** | Static COBIT/ISO gap interviews and slide decks | High rates, 90+ day manual cycles, and statutory audit independence conflicts | Conflict-free pre-assurance backed by an actual CI-passing governance platform |
| **CSPM SaaS Vendors** | Raw cloud security posture alerts across AWS/Azure/GCP | Floods engineers with alerts without COBIT/ITIL/ISO 38500 decision rights or board governance | Bridges technical cloud drift directly to executive IT governance frameworks and RACI |
| **Boutique Cloud Consultancies** | Single-cloud (Azure-only or AWS-only) landing-zone reviews | Misses cross-cloud policy parity and enterprise risk/architecture alignment | Multi-cloud parity across AWS, Azure, and GCP mapped to NIST CSF 2.0 and ISO 38500 |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance Location | Role in `OP-ITG-002` | Reuse Readiness |
| --- | --- | --- | --- |
| **ICT-Governance-Framework-Application** | CBa Consult GitHub repo (pushed Sept 2026) | Core platform-backed maturity scoring and multi-cloud compliance workflow engine | CI-passing; ready to tailor |
| **ADPA ICT Governance Draft Suite** | `ADPA ICT Governance Framework/ICT Governance Docs version Draft/Ideation_Document_4c04f981.docx` (+ 24 manifest docs) | Supplies runtime governance compiler concepts (`effectivenessWorker.ts`, bypass telemetry) | Extracted in [Source-Documents.md](Source-Documents.md) |
| **Management Consulting Toolkit** | CBa Consult Signature Toolkit | Provides COBIT 2019, ITIL 4, ISO/IEC 38500, and NIST CSF 2.0 executive matrices | Ready for enterprise delivery |
| **MIP Retainer Graduation (`OP-ITG-018`)** | [inventory-of-ideas.md](../../inventory-of-ideas.md) | Converts one-off maturity assessment findings into ongoing Managed Intelligence governance | Active cross-sell bridge |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

To maintain independence and respect the `$0` working-capital constraint, `OP-ITG-002` locks clear scope boundaries:

- **Out of Scope:** Statutory external IT audit sign-off, 24/7 SOC/MSSP incident monitoring, full cloud workload re-platforming/migration engineering, and custom SaaS software licensing resale.
- **Client Prerequisites:** Read-only cloud posture/config access across target AWS/Azure/GCP subscriptions and named CIO/CISO plus Enterprise Architecture sponsors.
- **Accountable Ownership:** CBa Consult executes the platform-backed maturity scoring and remediation roadmap; client cloud engineering implements approved infrastructure changes.
- **Stage 1b Review Outcome:** Capability framing is complete; held in inventory pending external CIO/CISO discovery validation and G4 pilot sign-off.

| Stage 1b Gate Check | Status | Next Gate Action |
| --- | --- | --- |
| **Platform IP & Multi-Cloud Scope Locked** | Complete | Leverage `ICT-Governance-Framework-Application` baseline |
| **External Market Validation** | Pending | Conduct >=3 CIO/CISO discovery interviews before piloting |
| **Commercial Case & G4 Sign-Off** | Linked | Tracked in [Business-Case.md](Business-Case.md) (`PARKED_IN_INVENTORY`) |
