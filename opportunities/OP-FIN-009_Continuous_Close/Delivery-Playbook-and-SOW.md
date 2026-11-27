---
opportunity_id: "OP-FIN-009"
artifact_type: "Day-1 Delivery Playbook, 6-8 Week Sprint Plan & Fixed-Scope SOW Template"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Day-1 Delivery Playbook & Fixed-Scope SOW — `OP-FIN-009`: Continuous Close Bridge

## 1. 6–8 Week Fixed-Scope Sprint Plan (Zero New Software Licenses)

| Weeks | Sprint Phase | Key Workshops & Activities | Deliverable Signed Off |
| :--- | :--- | :--- | :--- |
| **Weeks 1–2** | **Baseline & 23rd→3rd+ Bottleneck Map** | Run 25-control [Continuous-Close-Diagnostic-Questionnaire.md](Continuous-Close-Diagnostic-Questionnaire.md); map current close critical path from 23rd payroll lock to post-3rd publication; inventory manual JEs & open clearing items. | **Baseline Close Bottleneck & Dependency Gate Blueprint** |
| **Weeks 3–4** | **Accrual, `4-4-5` & CoS Matching Rules** | Configure 10 Guardrails (`FIN-CC-01`–`10`): 23rd–cutoff delta rules, Day-1 auto-reversals, working-day normalized `>5%` MRC alerts, 24th–25th HRIS-to-GL sync, Dual-Calendar (`01-01` vs. `01-07`) & `4-4-5` CoS proration, simultaneous WIP + Subcontractor CoS cutoff, and `1,500`-hr absorption tie-out. | **Automated Accrual & Revenue-vs.-CoS Playbook** |
| **Weeks 5–6** | **IFRS 18, Provisional vs. Official & SoD** | Watermark intra-month BI as `Provisional — Internal Management View Only`; lock whitelist of Approved Real-Time Official KPIs; map IFRS 18 (EU-endorsed Feb 13, 2026; mandatory Jan 1, 2027) Operating Profit subtotals, ¶78–83 CoS-by-nature tie-out & ¶117 MPM SoD; enforce payroll PII masking. | **GAAP / IFRS 18 + SoD & Official KPI Control Matrix** |
| **Weeks 7–8** | **Live Monthly Close Dry-Run & Handover** | Shadow one live monthly close cycle (23rd through 3rd+); measure business-day close duration and payroll/clearing variance; train Controller team & close open exceptions. | **Dry-Run Validation Report** (Target: ≤2–3 days post-3rd, €0.00 payroll clearing variance) |

## 2. The 10 Automated Accrual & Matching Guardrails Checklist (`FIN-CC-01`–`10`)
1. **`FIN-CC-01` Explicit 23rd–Cutoff Delta Formula** documented for payroll, mobility/lease/fuel, and Concur expenses (tagged by IFRS 18 Function & Nature).
2. **`FIN-CC-02` Mandatory Day-1 Auto-Reversal** flag enabled on every provisional accrual, `4-4-5`, and `30-06`/`31-12` stub JE batch.
3. **`FIN-CC-03` Working-Day Normalized `>5%` Variance Alert** routed automatically to Reviewer (eliminating false `4-4-5` 4-wk vs. 5-wk noise).
4. **`FIN-CC-04` 24th–25th HRIS-to-GL Master-Data Sync** locked before cost-center allocation (`€0.00` payroll clearing variance).
5. **`FIN-CC-05` Sequenced Dependency Gates** blocking consolidation & `% of Completion` until sub-ledger, WIP, and clearing recs sign off.
6. **`FIN-CC-06` Tiered Human Sign-Off & MPM SoD** separating Preparer/Approver and GL Close Owner vs. IFRS 18 ¶117 MPM Owner.
7. **`FIN-CC-07` Dual-Calendar & `31-12`/`30-06` Stub-Day Bridge** reconciling `01-01–31-12` Statutory Fiscal vs. `01-07–30-06` Company Budget (`H2+H1 = FY`, `€0.00` delta).
8. **`FIN-CC-08` `4-4-5` Working-Day CoS Proration & PTO Drawdown** across `20/20/25` workdays, routing leave taken against Vacation Liability.
9. **`FIN-CC-09` Simultaneous WIP Revenue & Unvouchered Subcontractor CoS Cutoff** locked prior to Fixed-Price `% of Completion` (`EAC`).
10. **`FIN-CC-10` `1,500`-Hour Standard CoS Rate & Absorption Tie-Out** reconciling `Absorbed Project CoS + Bench/Capacity Variance + Rate Variance = Actual Prorated HRIS Payroll` (`€0.00` delta).

## 3. Fixed-Scope Pilot SOW Shell

> **Client-Facing Version:** Do not send this internal runbook directly. Send the CFO-ready standalone proposal & SOW: [Client_Proposal_and_SOW_Continuous_Close_Bridge.md](Client_Proposal_and_SOW_Continuous_Close_Bridge.md) ([Word .docx](Client_Proposal_and_SOW_Continuous_Close_Bridge.docx)).

- **Fee & Duration:** Option A Blueprint (`€1,750–€2,500`, 4 weeks) or Option B Full Bridge + Live Dry-Run (`€4,000–€5,000`, 6–8 weeks at 6–10 hrs/wk), billed 50% at SOW signature / 50% at final deliverable sign-off.
- **Client Prerequisites:** Read-only ERP/BI access for diagnostic workshops, named Corporate Controller sponsor, and last 3 months of close calendars & payroll clearing reconciliations.
- **Natural Phase 2 Extensions:** `OP-FIN-010` (7-Layer Policy-to-Margin Rate Engine) or `OP-ITG-018` (MIP Governance Retainer).
