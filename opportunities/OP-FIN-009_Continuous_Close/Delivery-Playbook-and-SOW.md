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
| **Weeks 3–4** | **Accrual Guardrails & Exception Rules** | Configure 6 Automated Accrual Guardrails (23rd–month-end delta rules, mandatory Day-1 auto-reversals, >5% variance alerts, 24th–25th HRIS-to-GL sync, Reason Codes, auto-certification tolerances). | **Automated Accrual & Exception-Threshold Playbook** |
| **Weeks 5–6** | **IFRS 18, Provisional vs. Official & SoD** | Watermark intra-month BI as `Provisional / Pre-Close`; lock whitelist of Approved Real-Time Official KPIs; map IFRS 18 P&L subtotals & MPMs; enforce Preparer→Reviewer→Approver SoD and payroll PII masking. | **GAAP / IFRS 18 + SoD & Official KPI Control Matrix** |
| **Weeks 7–8** | **Live Monthly Close Dry-Run & Handover** | Shadow one live monthly close cycle (23rd through 3rd+); measure business-day close duration and payroll/clearing variance; train Controller team & close open exceptions. | **Dry-Run Validation Report** (Target: ≤2–3 days post-3rd, €0.00 payroll clearing variance) |

## 2. The 6 Automated Accrual Guardrails Checklist (Day-1 Verification)
1. **Explicit 23rd–Month-End Delta Formula** documented for payroll, mobility/lease/fuel, and Concur expenses.
2. **Mandatory Day-1 Auto-Reversal** flag enabled on every provisional accrual JE batch (zero double-counting).
3. **>5% Run-Rate Variance Alert** routed automatically to Reviewer prior to posting.
4. **24th–25th HRIS-to-GL Master-Data Sync** locked before cost-center allocation runs.
5. **Sequenced Dependency Gates** blocking consolidation until sub-ledger clearing recs sign off.
6. **Non-Interactive Service Account Posting** + Preparer/Reviewer/Approver SoD separation verified in ERP logs.

## 3. Fixed-Scope Pilot SOW Shell
- **Fee & Duration:** `€1,500–€5,000` fixed-scope (6–8 weeks, 6–10 hrs/wk), billed 50% at kickoff / 50% at Dry-Run Validation Report sign-off.
- **Client Prerequisites:** Read-only ERP/BI access for diagnostic workshops, named Corporate Controller sponsor, and last 3 months of close calendars & payroll clearing reconciliations.
- **Natural Phase 2 Extensions:** `OP-FIN-010` (7-Layer Policy-to-Margin Rate Engine) or `OP-ITG-018` (MIP Governance Retainer).
