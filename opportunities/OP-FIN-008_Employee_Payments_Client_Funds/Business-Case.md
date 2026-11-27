---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-FIN-008"
execution_track: "Track A (Client Advisory Starter Kit — Finance & Fiduciary Controls)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Employee Payments Client Funds.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-FIN-008`: Employee Payments & Client Funds

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Upstream framing is documented in [Ideation-Spark.md](Ideation-Spark.md), [Source-Documents.md](Source-Documents.md), and [BD-Quick-Reference.md](BD-Quick-Reference.md).

## 1. Executive Summary

| Commercial Dimension | Locked Pre-Pilot Parameter |
| :--- | :--- |
| **Opportunity & Tier** | `OP-FIN-008` — Core & Specialty Backlog (Advisory / Starter Kit, Small & Mid Tier) |
| **Target Buyer** | CFOs, Finance Directors, and Controllers |
| **Delivery Horizon & Effort** | 4–6 weeks, Medium effort (policy tailoring + reconciliation & control setup) |
| **Capital & Target Window** | €800–€2,500 expected studio band (with \$0 upfront working capital) · Target Q2–Q3 2027 |
| **Compounding Vector** | Pair directly with `OP-FIN-002` (Financial Close Audit) and generate `OP-X-004` proof |

## 2. Business Need & Cost of Inaction

Mid-market employers and professional-services firms holding client retainers, escrow monies, or complex payroll/pension liabilities risk severe audit adjustments, frozen banking facilities, or regulatory sanctions when payment reconciliations rely on ad-hoc spreadsheets. Even a single unreconciled payroll or trust discrepancy consumes weeks of controller time during year-end close and damages board confidence.

By establishing clean account ring-fencing, three-way reconciliation discipline, and tamper-evident audit proofs ahead of statutory audit season, finance teams cut close friction and eliminate the risk of accidentally treating restricted client or tax monies as operating liquidity.

> *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* The assigned ADPA source (`Employee Payments Client Funds.docx`) provides a full governance policy and privacy-preserving audit architecture (`v1.0 Draft`) rather than a quantitative ROI/NPV spreadsheet. Any projected controller-hour savings or risk-avoidance multipliers remain illustrative pre-pilot modeling until validated in a live client close cycle within the €800–€2,500 engagement band.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Expected Benefit | Risk & Effort Profile | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option A — Publish Policy Only** | Sell `Employee Payments Client Funds.docx` as a static template | Minimal delivery hours | Low ticket value, no operational reconciliation proof, weak differentiation | Reject |
| **Option B — Full Treasury / ERP Re-implementation** | Replace client payroll and bank connectivity end-to-end | High technical integration | Exceeds €800–€2,500 band, triggers regulated payment-ops scope creep | Reject |
| **Option C — Governance & Reconciliation Starter Kit** | 4–6 week fixed-scope sprint delivering tailored fiduciary policy, 3-way reconciliation workbook, and audit-proof design | Fast cash-flow wedge, zero capital outlay, direct bundle path into `OP-FIN-002` | Medium effort; strict non-custody and non-CPA boundary required | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging & Pricing Anchor:** Fixed-scope 4–6 week Fiduciary Payment & Reconciliation Starter Kit in the €800–€2,500 band (or discounted add-on module bundled alongside `OP-FIN-002`).
- **Zero Working-Capital Mechanics:** Delivery leverages existing ADPA policy IP (`Employee Payments Client Funds.docx`) and CBa spreadsheet/control templates executed entirely within the client's existing banking, payroll, and ERP exports—requiring \$0 software licensing or cash outlay from CBa Consult.
- **Unit-Economics Guardrail:** Timebox to one legal entity and up to three designated fiduciary/payroll bank accounts so Medium delivery effort stays comfortably profitable inside the €800–€2,500 fee band.
- **Compounding Path:** Solves an acute audit-readiness pain point for CFOs/Controllers, immediately opening expansion into `OP-FIN-002` (Close Audit & Financial Modeling) and generating anonymized case-study proof (`OP-X-004`).

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- | :--- |
| `R-FN8-01` | Misinterpretation of CBa controls as statutory CPA or trust-law sign-off | Medium / High | Explicit SOW disclaimer mandating external auditor/legal review for jurisdictional trust rules |
| `R-FN8-02` | Exposure of sensitive payroll or beneficiary PII during reconciliation design | Medium / High | Work strictly on anonymized/masked exports in client tenant; enforce hash-only integrity model |
| `R-FN8-03` | Scope creep into custom ERP/bank API engineering | Medium / Medium | Lock starter kit to export-based three-way reconciliation and documented SOPs |
| `R-FN8-04` | Multi-jurisdiction payroll tax/escrow complexity inflates hours | Medium / Medium | Restrict pilot scope to single primary jurisdiction and standardized pay-cycle exports |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Evidence Required to Promote `Idea` to `Pilot` |
| :--- | :--- | :--- |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Director decision on standalone Q2–Q3 2027 launch vs. bundling inside `OP-FIN-002` |
| **Legal / Fiduciary Boundary Check** | Pending | Standard non-custody and non-attestation SOW clause reviewed for NL/EU context |
| **Pilot Scope & KPI Lock** | Pending | 1 pilot controller/CFO committed with baseline close-reconciliation hours documented |
| **Director Decision** | `PENDING` | Confirm priority relative to Finance Tier A offers ahead of Q2 2027 |

**Gate Execution Rule:** `OP-FIN-008` remains at status `Idea` (`PENDING_DIRECTOR_SIGNOFF`) until the Director confirms Q2–Q3 2027 packaging (standalone vs. `OP-FIN-002` bundle) and verifies non-custody/non-attestation SOW boundaries.
