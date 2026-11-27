---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-RSK-002"
execution_track: "Track A — Lightweight Advisory Audit & Diagnostic (stays in oppurtunities-2027)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "AI Ethics Auditor Bias Review Service.docx (ADPA — Projects Lists)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-RSK-002`: AI Ethics Auditor / Bias Review Service

> **Governance & SSOT Notice:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) (Stage 1b Ideation / Gate `G1b`). Authoritative inventory fields (`Core & Specialty Backlog` · `Medium & Large` · `6–8 wks` · `Medium` effort · `€2,000–€6,000` · `Q2–Q3 2027` · `Status = Idea`) live in [inventory-of-ideas.md](../../inventory-of-ideas.md); portfolio sequencing lives in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). See [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

---

## 1. Problem Context & 2027 Market Trigger

Organizations deploying AI models in high-stakes workflows—hiring, credit/lending, pricing, and customer scoring—face mounting regulatory and reputational exposure in 2027:

1. **EU AI Act Annex III High-Risk Deadline (Dec 2, 2027):** Recruiting, creditworthiness, and essential-service scoring models require documented fairness testing, data-governance records, and human-oversight controls.
2. **Independence Gap in Internal Audits:** Model builders auditing their own outputs suffer confirmation bias, while Big Four AI-assurance engagements carry prohibitive fees and potential auditor-independence conflicts.
3. **Need for Actionable Pre-Assurance Diagnostics:** CROs, CISOs, and Compliance Committees want a fixed-scope **6–8 week** review that surfaces concrete bias vectors and remediation steps before formal certification (`OP-RSK-004`).

---

## 2. Solution Architecture & Delivery Workflow

Distilling `AI Ethics Auditor Bias Review Service.docx` into a conflict-free **Track A** advisory audit (`$0` CBa capital; runs on client-supplied evaluation logs and open-source fairness metrics) executes across four stages:

| Phase / Weeks | Focus | Core Activities | Deliverable |
| --- | --- | --- | --- |
| **Weeks 1–2** | **Scope, Data & Regulatory Mapping** | Inventory target high-stakes model(s), protected-attribute proxies, and EU AI Act / NIST AI RMF requirements; sign NDA & evaluation-slice boundary | **Model Risk Scope & Fairness Test Protocol** |
| **Weeks 3–4** | **Structured Bias & Fairness Audit** | Inspect training/eval summary stats and client-run output slices for disparate impact, false-positive/negative skew, and drift across cohorts | **Quantitative Bias & Fairness Findings Matrix** |
| **Weeks 5–6** | **Governance & Mitigation Design** | Map findings to concrete threshold adjustments, human-in-the-loop review gates, and documentation gaps (`OP-HR-003` / `OP-RSK-004` alignment) | **Prioritized Bias Mitigation & Control Plan** |
| **Weeks 7–8** | **Executive Readout & Evidence Pack** | Present board/risk-committee readout and hand over audit trail feeding `OP-RSK-004` certification readiness | **AI Ethics & Bias Audit Report + Remediation Tracker** |

---

## 3. Market Comparables & CBa Consult Differentiation

| Market Comparable | Typical Commercial Anchor | Primary Strength | Gap / Where `OP-RSK-002` Differentiates |
| --- | --- | --- | --- |
| **Big Four AI Risk & Assurance (EY, Deloitte, PwC, KPMG)** | `€40,000–€150,000+` | Formal audit brand and global regulatory teams | Expensive, slow procurement, and PIE/NAS independence restrictions; `OP-RSK-002` delivers rapid pre-assurance at `€2,000–€6,000`. |
| **Automated MLOps / Bias SaaS (Fiddler, Arthur, Credo AI)** | `€25,000–€100,000+/yr` | Continuous runtime telemetry dashboards | Requires heavy SDK integration and internal governance capacity; CBa fixes **human oversight and EU AI Act evidence** first with `$0` new software. |
| **Internal Data Science Self-Review** | Internal payroll | Direct access to weights and pipelines | Lacks third-party independence and compliance-committee credibility. |

---

## 4. Internal IP & Source Provenance Crosswalk

`OP-RSK-002` adapts `AI Ethics Auditor Bias Review Service.docx` into CBa Consult's **Risk Management** Signature Toolkit and Tier A compliance ecosystem:

| Delivery Asset Required | Internal IP / Crosswalk Source | Readiness | How `AI Ethics Auditor Bias Review Service.docx` Is Used |
| --- | --- | --- | --- |
| **Structured Ethics Audit Methodology** | `AI Ethics Auditor Bias Review Service.docx` §1–2 (EU AI Act & NIST AI RMF alignment) | **Ready (80%)** | Distilled into a 4-phase solo audit workflow |
| **Risk Register & Control Mapping** | **Risk Management** Signature Toolkit + `OP-RSK-004` (`ISO 42001 / EU AI Act`) patterns | **Ready (85%)** | Links bias findings directly to certification readiness artifacts |
| **HR & Agent Pairings** | `OP-HR-003` (HR AI Governance) & `OP-ITG-002` / `OP-ITG-013` | **Ready (80%)** | Provides specialized bias deep-dive module inside broader Tier A SOWs |

---

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

1. **Not formal accredited statutory certification or legal sign-off:** Outputs prepare the client for internal risk committees and accredited conformity bodies (`OP-RSK-004`).
2. **Not a SaaS monitoring platform or model-retraining build:** CBa Consult audits client-provided evaluation datasets/outputs without hosting PII or engineering custom ML pipelines (`$0` working capital).
3. **Not an active Wave 1 lead SKU:** Kept in Core & Specialty Backlog (`Q2–Q3 2027`) to pair selectively with Tier A **`OP-RSK-004`** or `OP-HR-003`.
4. **Stage 1b (`G1b`) Status:** Problem framing, comparables, and ADPA `.docx` crosswalk complete; remains `Idea` (Pre-Stage 2) pending Stage 2 hypothesis formulation.
