---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-RSK-005"
execution_track: "Track A — Lightweight Advisory"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (§12/§17); ECS & sidpa-template evidence specs"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-RSK-005`: Evidence Assurance & Decision Traceability Assessment

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), tracked in [inventory-of-ideas.md](../../inventory-of-ideas.md), and positioned as **Tier D — Thought Leadership (2028–2029 Tier A Bridge)** alongside [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Problem Context & 2027 Market Trigger

Regulated enterprises can often point to isolated policy controls, yet almost none can prove **why a control exists, what evidence supports a critical decision, whether AI-generated evidence is trustworthy, or whether the end-to-end audit chain remains intact**. As Big Four firms industrialize AI-driven auditing (*Omnia, Clara, EY.ai*) and enterprise workflows blend human judgment with LLM outputs, organizations risk relying on circular, unverified, or mutable evidence trails.

- **Target Buyer:** CISOs, Chief Risk Officers, CFOs, Chief AI Officers, and Audit Committees (Medium & Large regulated enterprises).
- **The Wedge (Pain):** Point compliance tools collect checkboxes without proving epistemic reliability, origin separation (human vs. AI), or tamper-evident custody across finance, AI, and IT silos.
- **2027 Trigger:** **EU AI Act Annex III** (Dec 2, 2027 technical documentation), **SOX 404** sign-off defensibility, **DORA/NIS2** incident evidence mandates, and tax/arbitration audit scrutiny make "Governance of Evidence itself" an emerging boardroom imperative.

## 2. Solution Architecture & Delivery Workflow

Delivered as a 6–8 week executive diagnostic (`Medium` effort), packaged either as a standalone **Evidence Assurance Assessment** or an add-on module inside `OP-RSK-004` / `OP-ITG-014` engagements:

1. **Weeks 1–2 — Decision & Evidence Inventory:**
   - Map high-consequence regulatory, financial, and AI-governance decisions and trace supporting evidence across human vs. AI origins.
2. **Weeks 3–4 — 5-Point Evidence Provenance Audit:**
   - Score artifact chains using CBa's **Evidence Reliability & Provenance Rubric** (Source Authority, Human vs. AI Origin, Immutability/WORM Hash, Freshness, Chain-of-Custody).
   - Enforce strict separation between `design_time` specifications and `execution` actuals.
3. **Weeks 5–6 — Bayesian Trust & Traceability Blueprint:**
   - Identify broken custody links, apply Bayesian active evidence-seeking principles (`OP-ITG-015`), and define WORM sign-off register upgrades (`OP-FIN-009` / `OP-ITG-010`).
4. **Weeks 7–8 — Executive Brief & Audit-Readiness Handover:**
   - Deliver the Decision Provenance & Evidence Chain Map plus remediation roadmap for Audit Committee and external-auditor readiness.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Model | Strengths | Differentiation of CBa `OP-RSK-005` |
| :--- | :--- | :--- | :--- |
| **GRC SaaS Tools (Vanta, Drata, Archer)** | Automated compliance checklists | Continuous cloud API polling | Collects artifacts without scoring **epistemic reliability** or AI-vs.-human provenance |
| **Big Four AI-Enabled Audit (*Omnia / Clara*)** | Statutory assurance engagement | Audit opinion authority | Tests compliance post-hoc; conflict-prohibited from designing client evidence architecture |
| **Point ISO 42001 / SOC 2 Consultants** | Framework gap templates | Fast policy checklist completion | Rarely bridges financial, AI, knowledge, and cryptographic evidence chains together |
| **CBa `OP-RSK-005` Assessment** | 6–8 wk Governance-of-Evidence sprint | ECS + ADPA + `sidpa-template` + Bayesian scoring | Audits the **integrity of evidence itself** across silos |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Role in `OP-RSK-005` | Provenance / Location |
| :--- | :--- | :--- |
| [Ideation-Spark.md](Ideation-Spark.md) | 2027–2030 Tier D framing, 7 Pivotal Questions & 5-point rubric | Sibling workspace file |
| [Source-Documents.md](Source-Documents.md) | Confirms portfolio-synthesized origin (no ADPA `.docx` assigned) | Sibling workspace file |
| ECS, ADPA & `sidpa-template` (`mdresch/sidpa-template`) | Deferred audit logging, `design_time | execution` split & provenance chains | Referenced via [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) |
| Connected Tier A IP (`OP-RSK-004`, `OP-ITG-014`, `OP-ITG-015`, `OP-FIN-009`) | Control mapping, Bayesian trust, WORM hashes & sign-off registers | [inventory-of-ideas.md](../../inventory-of-ideas.md) (§12/§17) |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No Abstract Philosophy Pitches:** Never pitch "epistemology" in isolation; anchor every executive conversation in concrete **EU AI Act Annex III documentation, SOX 404 sign-offs, and arbitration/tax-audit defensibility**.
- **No Statutory Audit Opinion or Legal Certification:** CBa provides independent pre-assurance architecture and evidence-chain diagnostics; external auditors and counsel retain statutory sign-off.

### Stage 1b Readiness & Pre-Pilot Handoff

| Criterion | Current State | Next Action Toward Pilot |
| :--- | :--- | :--- |
| **Stage 1b Framing** | Complete (Tier D — Thought Leadership) | Position as 2028–2029 Tier A graduation candidate |
| **Executive Brief** | Pending | Draft Governance-of-Evidence brief linking ECS to SOX 404 & Annex III |
| **5-Point Provenance Rubric** | Pending | Codify Authority, Origin, WORM Hash, Freshness & Custody scoring |
| **Pilot Add-On Channel** | Planned (Q2–Q3 2027) | Test inside active `OP-RSK-004` or `OP-ITG-014` engagements |
