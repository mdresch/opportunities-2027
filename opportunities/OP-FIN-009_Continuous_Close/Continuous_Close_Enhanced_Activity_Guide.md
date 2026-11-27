# Continuous Close — Enhanced Operating Activity Guide & Control SOPs

**Prepared by:** CBa Consult — Finance Transformation & Close Governance  
**Companion Artifacts:** [Continuous_Close_Enhanced_Activity_Guide.docx](Continuous_Close_Enhanced_Activity_Guide.docx) · [Continuous_Close_Monthly_Gantt_Chart.md](Continuous_Close_Monthly_Gantt_Chart.md) · [Continuous_Close_Monthly_Gantt_Chart.pdf](Continuous_Close_Monthly_Gantt_Chart.pdf) · [IFRS 18 Executive Brief (DOCX)](Executive_Brief_IFRS_18_Close_and_KPI_Controls_2027.docx)  
**Close Cycle:** `Days 1–22` Continuous Matching → `Day 23` Core Payroll Lock → `4-4-5` / Month-End Cutoff (`LBD`) → `Day+1 to Day+3+` Attested IFRS 18 GL Lock  
**Control Framework:** `FIN-CC-01` through `FIN-CC-10` | **Regulatory Readiness:** IFRS 18 (EU-endorsed 13 Feb 2026; mandatory `1 Jan 2027`)

---

## 1. Executive Overview & Operating Principles

Traditional month-end closes compress sub-ledger matching, payroll reconciliation, Cost of Sales (`CoS`) proration, WIP revenue cutoff, and financial statement review into five high-friction business days after month-end. That compression generates manual journal errors, unreversed accruals, gross-margin volatility across unequal fiscal weeks, and late executive reporting.

This guide defines the complete, audit-ready Standard Operating Procedure (`SOP`) for **all 14 recurring monthly close activities (`A1`–`A14`)** and **2 annual dual-calendar overlay gates (`YE-01` and `YE-02`)** synchronized to the **Continuous Close Monthly Gantt Chart**.

### Core Operating Pillars

1. **Three-Phase Workload Smoothing:**
   - **Phase 1 (`Days 1–22`):** Clear 85%+ of bank, AP, AR, corporate-card, and PSA timesheet volume continuously before Day 23.
   - **Phase 2 (`Day 23 – LBD`):** Lock Core Payroll on **Day 23**, tie HRIS-to-GL clearing to `€0.00` within 48 hours, execute `4-4-5` CoS proration + `1,500`-hour absorption staging, and lock sub-ledgers simultaneously at `LBD 18:00`.
   - **Phase 3 (`Day+1 – Day+3+`):** Fire mandatory ERP Day-1 auto-reversals at `08:00`, run Fixed-Price `% of Completion` (`EAC`) and working-day-normalized variance exceptions (`>5%`), and obtain CFO + Controller IFRS 18 sign-off by `Day+3 16:00`.
2. **Four Non-Negotiable Hard Gates (`A4`, `A9`, `A11`, `A14`):** Downstream workflows cannot start until upstream Hard Gates record explicit system locks and dual Segregation of Duties (`SoD`) sign-off (`Preparer ≠ Reviewer`).
3. **`4-4-5` (`20/20/25`) & `1,500`-Hour CoS Precision:** Every fiscal quarter follows a 13-week `4-4-5` cadence (`20 / 20 / 25` standard working days), while hourly Cost of Sales rates anchor strictly to **`1,500` annual billable hours** (`20/65`, `20/65`, `25/65` quarterly weighting or explicit working-day allocation) so gross margin reflects delivery efficiency rather than calendar noise.
4. **Dual-Calendar Governance (`FIN-CC-07`):** Statutory reporting runs **01 January – 31 December**, while operating budgets and bonus plans run **01 July – 30 June**. Both calendars tie out cleanly without manual off-ledger spreadsheets.
5. **IFRS 18 Compliance by Design:** All sub-ledger postings and accruals carry dual **Function** (CoS / R&D / SG&A) and **Nature** (`¶78–83`: employee benefits, depreciation, amortization, subcontractor fees) tags, while Management-defined Performance Measures (`MPMs`, `¶117` & `¶121–123`) reconcile directly to audited Operating Profit.

---

## 2. Phase 1 — Continuous Transaction Matching (`Days 1–22`)

### Activity `A1` — Daily Bank, AP, AR & Corporate-Card Auto-Matching

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A1` — Phase 1: Continuous Transaction Matching |
| **Control ID(s)** | `FIN-CC-01` (Continuous Sub-Ledger Matching & Exception Aging) |
| **SoD Preparer / Reviewer** | GL Accountant (Preparer) · Auto-match Engine Logs reviewed weekly by Accounting Manager |
| **Hard Deadline & Gantt Slot** | **Daily · 10:00 CET** (Business Days 1–22) \| Gantt: `D1–7` → `D15–22` |
| **Gate Type** | Continuous Operational Bar |

- **Purpose & Financial Risk Mitigated:** Eliminates month-end cash, open-item AP, and customer AR clearing backlogs; prevents unallocated suspense balances from masking liquidity or supplier liabilities at `LBD`.
- **Upstream Prerequisites & Source Inputs:** Automated overnight MT940/CAMT.053 bank statements, ERP AP invoice OCR/EDI queue, AR lockbox/remittance advices, and SAP Concur / corporate-card transaction feeds.
- **Detailed Step-by-Step Execution Procedure:**
  1. Confirm overnight bank, AP, AR, and corporate-card integration jobs completed with status `SUCCESS` by `08:30`.
  2. Execute deterministic ERP auto-matching rules (exact invoice number + amount, IBAN + reference tolerance `≤€1.00`, payment batch ID).
  3. Post auto-matched clearing entries directly to sub-ledgers with automated Nature/Function dimensions inherited from vendor/customer master data.
  4. Route unmatched items into standardized exception worklists categorized by root cause (`Missing PO`, `FX Rounding`, `Duplicate Payment`, `Unidentified Cash`, `Missing Receipt`).
  5. Escalate bank feed outages or ERP import failures immediately to Finance Systems Support before `10:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** Auto-match straight-through rate target `≥85%`; FX/penny rounding write-off cap `≤€5.00` per item (auto-posted to designated FX/rounding GL account). Audit evidence: daily bank-to-GL reconciliation snapshot and batch execution log.
- **Downstream Impact & Escalation Protocol:** Unresolved feeds or unmatched items flow directly into `A2` (Weekly Exception Clearing). Any bank feed failure lasting `>4 hours` escalates to the Accounting Manager by `12:00`.

---

### Activity `A2` — Weekly Exception Clearing & Standardized Reason Codes

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A2` — Phase 1: Continuous Transaction Matching |
| **Control ID(s)** | `FIN-CC-01` (Exception Aging `<5` Business Days) |
| **SoD Preparer / Reviewer** | GL Accountant (Preparer) / Senior Accountant or Accounting Manager (Reviewer) |
| **Hard Deadline & Gantt Slot** | **Fridays · 16:00 CET** (Days 5, 12, 19) \| Gantt: `D1–7` → `D15–22` |
| **Gate Type** | Continuous Operational Bar (Weekly SLA Checkpoint) |

- **Purpose & Financial Risk Mitigated:** Enforces strict `<5` business day aging on open exceptions so month-end balance sheet accounts do not accumulate stale suspense items, unrecorded liabilities, or disputed client short-pays.
- **Upstream Prerequisites & Source Inputs:** Activity `A1` exception queues across cash, AP/GRNI, AR unapplied cash, and corporate-card clearing accounts.
- **Detailed Step-by-Step Execution Procedure:**
  1. Extract the aged exception queue filtered for all items aged `≥3` business days across cash, AP, AR, and card clearing.
  2. Assign a mandatory standardized Reason Code (`RC-01` Missing Receipt, `RC-02` Price/Qty Variance, `RC-03` Unapplied Cash, `RC-04` Timing Difference, `RC-05` Coding Correction) to 100% of open items.
  3. Resolve `RC-02` and `RC-03` items directly with Procurement and Billing Owners; clear matched balances immediately.
  4. For genuine timing items crossing Day 22, flag items for automated accrual inclusion in `A6` with attached invoice/PO proof.
  5. Submit the weekly exception summary to the Reviewer for formal sign-off before Friday `16:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** Maximum aging tolerance **`<5` business days** (`0` uncoded exceptions permitted at Friday lock). Audit evidence: timestamped exception aging report, standardized reason-code distribution, and Reviewer approval log.
- **Downstream Impact & Escalation Protocol:** Blocks clean `A7` IC matching and `A13` balance sheet auto-certification if suspense items exceed threshold. Any single exception `>€10,000` aged `≥5` days escalates automatically to Corporate Controller on Friday at `16:30`.

---

### Activity `A3` — Weekly PSA / Timesheet & Subcontractor Hours Verification

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A3` — Phase 1: Continuous Transaction Matching |
| **Control ID(s)** | `FIN-CC-09` (Simultaneous Revenue & CoS Project Matching) |
| **SoD Preparer / Reviewer** | Project Accounting (Preparer) / Delivery Operations Lead (Approver) |
| **Hard Deadline & Gantt Slot** | **Fridays · 17:00 CET** (Days 7, 14, 21) \| Gantt: `D1–7` → `D15–22` |
| **Gate Type** | Continuous Operational Bar (Weekly Utilization & WIP Feed) |

- **Purpose & Financial Risk Mitigated:** Eliminates end-of-month missing timesheets and unapproved contractor hours that otherwise force rough WIP estimates, misstate `1,500`-hour Cost of Sales absorption, or omit unvouchered subcontractor costs.
- **Upstream Prerequisites & Source Inputs:** Professional Services Automation (`PSA`) timesheet portal, HR leave/PTO calendar, and external subcontractor time-and-expense logs.
- **Detailed Step-by-Step Execution Procedure:**
  1. Run weekly Friday `13:00` missing-timesheet compliance check across all billable employees and active subcontractors.
  2. Trigger automated reminder workflow (`13:30`) and escalate non-submitters to Practice Managers (`15:00`) for mandatory entry or PTO classification (`Sick`, `Annual Leave`, `Bench/Non-Billable`).
  3. Reconcile approved subcontractor hours against active Statement of Work (`SOW`) purchase orders and contracted hourly/daily rate cards.
  4. Validate Time & Materials (`T&M`) billable flags vs. Fixed-Price (`FP`) project task codes so hours map accurately to WIP revenue vs. absorbed internal CoS (`1,500`-hr denominator).
  5. Lock weekly approved PSA hours snapshot at `17:00` for feed to `A8` and `A9`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** `≥98%` weekly timesheet submission compliance (`100%` mandatory for all Fixed-Price and subcontractor-staffed projects). Audit evidence: locked weekly PSA approval log and PO rate-card exception log.
- **Downstream Impact & Escalation Protocol:** Directly feeds `A8` (`4-4-5` CoS proration & `1,500`-hr staging) and `A9` (WIP Revenue & Unvouchered Subcontractor Cutoff). Missing Fixed-Price or subcontractor approvals at Friday `17:00` escalate to Practice Director + Corporate Controller Monday `09:00`.

---

## 3. Phase 2 — Payroll Lock, `4-4-5` Proration & Pre-Validated Cutoff (`Day 23 – LBD`)

### Activity `A4` — Core Payroll Lock *(HARD GATE)*

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A4` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-04` (Day 23 Payroll Lock & 48-Hr Clearing Discipline) |
| **SoD Preparer / Reviewer** | Payroll Operations (Preparer) · HR Director / Payroll Controller (Approver) |
| **Hard Deadline & Gantt Slot** | **Day 23 · 17:00 CET** (shifted to prior business day if Day 23 is weekend/holiday) \| Gantt: `D23` |
| **Gate Type** | **Hard Gate / System Lock (`◆`)** |

- **Purpose & Financial Risk Mitigated:** Freezes core monthly compensation inputs early enough to resolve payroll clearing discrepancies before `LBD`, eliminating post-close manual payroll reclassifications across Cost of Sales, R&D, and SG&A.
- **Upstream Prerequisites & Source Inputs:** HRIS master data changes (new hires, terminations, promotions, cost-center transfers), overtime approvals, statutory tax/social-security tables, and mobility allowances logged through Day 22.
- **Detailed Step-by-Step Execution Procedure:**
  1. Freeze all HRIS master-data and compensation updates effective for the current monthly pay run at `12:00` on Day 23.
  2. Execute pre-lock gross-to-net variance comparison (`Current Month vs. Prior Month`) flagging headcount changes and net pay swings `>5%` or `>€2,500` per employee.
  3. Validate employee cost-center assignments (`Billable Delivery` → CoS vs. `Corporate/Bench` → OpEx) for accurate **IFRS 18 Function + Nature (`¶83`)** classification.
  4. Obtain dual Payroll Operations + HR/Controller digital authorization and engage the **Core Payroll Lock** in HRIS/Payroll at `17:00`.
  5. Route any HR changes submitted after Day 23 `12:00` either to the **Day 23–LBD Stub Accrual (`A6`)** or the next month's off-cycle/regular payroll register.
- **Control Thresholds, Tolerances & Required Audit Evidence:** `0` unapproved compensation overrides; `100%` of employees assigned valid IFRS 18 Function and Nature dimensions. Audit evidence: locked payroll register checksum, variance sign-off sheet, and HRIS lock timestamp.
- **Downstream Impact & Escalation Protocol:** **Blocks `A5` (`48-Hr HRIS-to-GL Sync`).** Any failure to lock by Day 23 `17:00` triggers immediate escalation to CFO and HR Director to prevent statutory disbursement or month-end close slippage.

---

### Activity `A5` — 48-Hr HRIS-to-GL Sync & `€0.00` Payroll Clearing Tie-Out

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A5` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-04` (Payroll Clearing Zeroing) · IFRS 18 `¶83` (Employee Benefit Nature Disclosure) |
| **SoD Preparer / Reviewer** | Payroll Specialist (Preparer) → GL Controller (Independent Reviewer) |
| **Hard Deadline & Gantt Slot** | **Day 25 · 17:00 CET** (within 48 hours of `A4`) \| Gantt: `D24–25` |
| **Gate Type** | Critical-Path Control Step |

- **Purpose & Financial Risk Mitigated:** Guarantees that gross wages, employer social charges, pension contributions, net cash disbursements, and statutory withholdings posted from HRIS match the General Ledger to the exact cent prior to Month-End cutoff.
- **Upstream Prerequisites & Source Inputs:** Completed **Hard Gate `A4`** (Locked Core Payroll Register) and automated HRIS-to-ERP payroll journal interface file.
- **Detailed Step-by-Step Execution Procedure:**
  1. Import the locked HRIS payroll sub-ledger journal into the ERP staging environment on Day 24 morning (`≤18` hours post-lock).
  2. Validate mapping of every wage-type code to both **IFRS 18 Function** (`Cost of Sales`, `R&D`, `Sales & Marketing`, `G&A`) and **IFRS 18 Nature** (`Salaries & Wages`, `Social Security & Pension`, `Other Employee Benefits` per `¶83`).
  3. Post net-pay bank payment batch and statutory tax/pension liability entries against the **Payroll Clearing Account**.
  4. Reconcile Payroll Clearing ending balance: `(Opening €0.00 + Gross Payroll & Employer Taxes - Net Bank Disbursement - Statutory Liabilities - Deductions) = €0.00`.
  5. Submit tie-out workpaper to the GL Controller for independent SoD review and approval by Day 25 `17:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** **Strict `€0.00` variance tolerance** on Payroll Clearing Account and Gross-to-GL total. Audit evidence: HRIS payroll summary vs. ERP Trial Balance tie-out workpaper with Reviewer timestamp.
- **Downstream Impact & Escalation Protocol:** Unreconciled payroll clearing balances block `A6` (Stub Accruals) and `A8` (`4-4-5` CoS Proration). Any residual delta `≠€0.00` at Day 25 `15:00` escalates directly to Corporate Controller and Payroll Lead for same-day journal correction.

---

### Activity `A6` — Day 23–Month-End Payroll Stub, Mobility, Lease & Concur Delta Accruals

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A6` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-01` (Continuous Matching) · IFRS 18 `¶78–83` (Function & Nature Tagging) |
| **SoD Preparer / Reviewer** | Senior Accountant (Preparer) / Accounting Manager (Reviewer) |
| **Hard Deadline & Gantt Slot** | **Day 28 · 15:00 CET** (or `LBD-2` in February) \| Gantt: `D26–28` |
| **Gate Type** | Critical-Path Accrual Preparation Step |

- **Purpose & Financial Risk Mitigated:** Captures the true economic expenses incurred between the Day 23 payroll freeze and `LBD`—alongside unbilled fleet/mobility, IFRS 16 lease adjustments, and unsubmitted SAP Concur expenses—with mandatory IFRS 18 dual dimensions.
- **Upstream Prerequisites & Source Inputs:** Completed `A5` payroll run, Day 23–`LBD` HRIS mid-cycle joiner/leaver log, fleet/fuel/mobility provider portal statements, IFRS 16 lease schedule, and SAP Concur unapproved/unpaid expense queue.
- **Detailed Step-by-Step Execution Procedure:**
  1. Calculate payroll stub accruals for post-Day-23 new hires, terminations, approved overtime, and variable commissions earned through `LBD`.
  2. Extract unposted SAP Concur expense reports (`Submitted / Pending Approval` + `Corporate Card Unsubmitted`) and segregate billable client re-charges from internal OpEx.
  3. Validate monthly IFRS 16 right-of-use depreciation, lease interest (Financing category under IFRS 18), and fleet/mobility true-up invoices.
  4. Tag **100% of accrual lines** with both P&L Function and **IFRS 18 Nature** (`¶83`: Employee Benefits, Depreciation/Amortization, Travel/Subcontractor) and mark reversing accruals `AUTO-REVERSE = TRUE` for `Day+1 08:00` (`FIN-CC-02`).
  5. Route the pre-validated accrual packet to the Accounting Manager for approval by Day 28 `15:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** Materiality floor `€500` per vendor/category; `100%` of temporary accruals flagged for Day-1 auto-reversal. Audit evidence: Concur accrual extract, HR stub log, IFRS 16 schedule, and Reviewer approval sign-off.
- **Downstream Impact & Escalation Protocol:** Feeds `A8` (CoS proration) and `A10` (Pre-Validated JE Approval). Late Concur/mobility vendor feeds at Day 28 `12:00` trigger manager outreach or prior-3-month rolling average estimate approved by Controller.

---

### Activity `A7` — Intercompany (`IC`) Billing Cutoff & Bilateral Matching

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A7` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-05` (IC Eliminations & Hard Sub-Ledger Lock) |
| **SoD Preparer / Reviewer** | Intercompany Accountant (Preparer) / Group Consolidation Lead (Reviewer) |
| **Hard Deadline & Gantt Slot** | **LBD-2 · 17:00 CET** \| Gantt: `LBD-2` |
| **Gate Type** | Critical-Path Consolidation Gate |

- **Purpose & Financial Risk Mitigated:** Eliminates out-of-balance intercompany receivables/payables, management fees, and cross-border resource sharing charges prior to Month-End so Group consolidation requires zero manual top-side IC plugs on Day+2/Day+3.
- **Upstream Prerequisites & Source Inputs:** Weekly `A3` cross-entity PSA hours, IC transfer-pricing agreements, shared-services cost-allocation keys, and Day 1–25 unmatched IC items from `A2`.
- **Detailed Step-by-Step Execution Procedure:**
  1. Enforce intercompany invoicing freeze at `LBD-2 12:00` across all legal entities (including cross-border resource lending and Group management charges).
  2. Run bilateral IC reconciliation matrix matching entity-pair AR/AP balances, IC Revenue vs. IC CoS/OpEx, and unrealized margin in WIP where applicable.
  3. Resolve FX remeasurement differences using the designated Corporate Group `LBD-2` / Month-End closing rate source.
  4. Confirm bilateral confirmation sign-off from both Issuing Entity and Receiving Entity accountants before locking IC invoicing portals at `17:00`.
  5. Stage automated consolidation elimination entries for `A10` and `A14`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** **Strict `€0.00` group-wide IC imbalance** post-FX (`0` unconfirmed IC invoices). Audit evidence: signed Bilateral IC Matching Matrix and locked IC sub-ledger cutoff log.
- **Downstream Impact & Escalation Protocol:** **Blocks `A9` (Sub-Ledger Lock) and `A14` (IFRS 18 Hard Lock).** Any bilateral dispute unresolved at `LBD-2 15:00` escalates to Group Corporate Controller for mandatory booking under the Issuing Entity's supported documentation prior to `LBD`.

---

### Activity `A8` — `4-4-5` Working-Day CoS Proration (`20/20/25`), PTO Liability Drawdown & `1,500`-Hr Absorption Staging

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A8` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-08` (`4-4-5` Working-Day CoS Proration & PTO Liability) · `FIN-CC-10` (`1,500`-Hr Standard CoS Rate) |
| **SoD Preparer / Reviewer** | Cost / FP&A Accountant (Preparer) → Accounting Manager / Controller (Reviewer) |
| **Hard Deadline & Gantt Slot** | **LBD · 15:00 CET** \| Gantt: `LBD-1` → `LBD` |
| **Gate Type** | Critical-Path Cost Accounting Step |

- **Purpose & Financial Risk Mitigated:** Prevents artificial gross-margin swings caused by paying salaried delivery staff evenly (`1/12th` per calendar month) while booking revenue across uneven **`4-4-5` (`20 / 20 / 25` working-day)** fiscal periods, and ensures hourly rates rigorously absorb total delivery payroll across **`1,500` billable hours/year**.
- **Upstream Prerequisites & Source Inputs:** Locked Payroll `A5`, Day 23–`LBD` stub `A6`, Weekly PSA verified hours `A3`, HR PTO accrual balances, and entity `4-4-5` calendar schedule (`P1=4 wks / 20 days`, `P2=4 wks / 20 days`, `P3=5 wks / 25 days` = 65 days/quarter).
- **Detailed Step-by-Step Execution Procedure:**
  1. **Verify Period Working Days (`FIN-CC-08`):** Confirm active `4-4-5` period standard delivery days (`20` for 4-week months, `25` for 5-week months; adjust explicitly for country-specific statutory public holidays if budgeted separately).
  2. **Execute Working-Day CoS Proration:** Prorate monthly fixed delivery salaries and employer benefits from the calendar payroll run (`A5`) into the `4-4-5` fiscal period using daily proration (`Period CoS = Annual Salary Pool × [Period Working Days / Annual Working Days]` or quarterly `20/65`, `20/65`, `25/65` split), holding calendar-vs-fiscal timing differences in **Accrued / Prepaid `4-4-5` Payroll Clearing**.
  3. **Process PTO Liability Drawdown:** Charge actual delivery vacation/PTO hours logged in PSA (`A3`) against the **Balance Sheet PTO Provision Liability** (`Dr. PTO Liability / Cr. CoS Recovery`) rather than expensing double cost into delivery gross margin during peak holiday months.
  4. **Stage `1,500`-Hour Standard CoS Rate (`FIN-CC-10`):** Compute/apply each delivery grade's Standard Hourly CoS Rate:  
     `Standard Hourly Rate (€/hr) = Annual Fully-Loaded Delivery Cost Pool (€) ÷ 1,500 Billable Hours/Yr`  
     Multiply approved billable hours from `A3` by the grade's standard rate to stage project-level Absorbed CoS (`Dr. Project CoS`) vs. Delivery Cost Pool Clearing (`Cr. CoS Absorption Offset`), isolating **Rate Variance** and **Utilization/Volume Variance** separately.
  5. Validate that total staged CoS lines preserve **IFRS 18 `¶83` Nature breakdown** (`Wages`, `Social Charges`, `Subcontractors`) and submit workpaper for review by `LBD 15:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** **`1,500` billable hours/year** denominator locked unless formal annual budget revision approved by CFO; staged `4-4-5` proration clearing reconciles transparently by fiscal quarter. Audit evidence: `4-4-5` Proration Workbook, PTO Movement Schedule, and `1,500`-Hr Standard Rate Absorption Staging Table.
- **Downstream Impact & Escalation Protocol:** **Directly feeds `A9` (WIP Revenue & Subcontractor Cutoff) and `A12` (`EAC % Completion` & `€0.00` Absorption Tie-Out).** Any anomaly in working-day counts or rate-table updates escalates to FP&A Director & Controller by `LBD-1 17:00`.

---

### Activity `A9` — Simultaneous Unbilled WIP Revenue & Unvouchered Subcontractor CoS Cutoff + Sub-Ledger Lock *(HARD GATE)*

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A9` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-09` (Simultaneous Revenue & CoS Cutoff) · `FIN-CC-05` (Hard Sub-Ledger Lock) |
| **SoD Preparer / Reviewer** | Revenue / Project Accountant (Preparer) · Corporate Controller (Sub-Ledger Lock Approver) |
| **Hard Deadline & Gantt Slot** | **LBD · 18:00 CET** \| Gantt: `LBD` |
| **Gate Type** | **Hard Gate / System Lock (`◆`)** |

- **Purpose & Financial Risk Mitigated:** Eliminates the classic "ghost margin" distortion where T&M or milestone WIP revenue is recognized at Month-End while the corresponding subcontractor vendor cost arrives late in `Day+2` AP—violating IFRS 15 / accrual matching and overstating Period Gross Margin.
- **Upstream Prerequisites & Source Inputs:** Completed `A3` (PSA hours & subcontractor approvals), `A7` (IC lock), and `A8` (`4-4-5` CoS & `1,500`-hr absorption staging).
- **Detailed Step-by-Step Execution Procedure:**
  1. Freeze customer billing (`AR`), vendor invoicing (`AP`), and `PSA` time/expense entry for the closing period at **`LBD 16:00`**.
  2. **Simultaneous T&M Revenue & Unvouchered Subcontractor CoS Run:**
     - Calculate Unbilled WIP Revenue for approved T&M hours not yet billed (`Dr. Unbilled WIP Asset / Cr. Revenue`), confirming contract cap and collectability.
     - Match 100% of approved subcontractor hours worked through `LBD` (`A3`) against posted AP supplier invoices (`A1`). For every approved subcontractor hour without a posted vendor invoice, automatically generate an **Unvouchered Subcontractor CoS Accrual** (`Dr. Subcontractor CoS [Nature: Subcontractor Fees] / Cr. Accrued Unvouchered CoS`, tagged `AUTO-REVERSE = TRUE`).
  3. **Verify Revenue-to-Cost Pairing Exception Report:** Confirm `0` projects show recognized period revenue with missing subcontractor/delivery cost, and `0` subcontractor accruals lack paired WIP/Fixed-Price project tracking.
  4. Obtain Corporate Controller approval and execute the **Hard Sub-Ledger Lock** (`AP`, `AR`, `PSA`, `Fixed Assets`) at **`LBD 18:00`**.
- **Control Thresholds, Tolerances & Required Audit Evidence:** `100%` pairing of approved subcontractor hours to AP invoice or auto-reversing accrual (`0` unaccrued approved subcontractor hours permitted). Audit evidence: Paired WIP-vs-Subcontractor Cutoff Report and ERP Sub-Ledger Lock Confirmation Screenshots.
- **Downstream Impact & Escalation Protocol:** **Blocks `A12` (Fixed-Price `EAC` calculation must run strictly on locked, cost-complete sub-ledger actuals).** Any sub-ledger extension past `LBD 18:00` requires written CFO/Controller exception log (`FIN-CC-05`).

---

### Activity `A10` — Pre-Validated Recurring JE Approval & `Provisional` Flash Dashboard Watermark Check

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A10` — Phase 2: Payroll Lock, `4-4-5` Proration & Cutoff |
| **Control ID(s)** | `FIN-CC-06` (Automated Pre-Validated JEs & Flash Governance) · IFRS 18 `¶117` (MPM Alignment) |
| **SoD Preparer / Reviewer** | Corporate Controller (Approver) · Senior Accountant / FP&A Analyst (Flash Publisher) |
| **Hard Deadline & Gantt Slot** | **LBD · 18:00 CET** \| Gantt: `LBD` |
| **Gate Type** | Critical-Path Governance & Reporting Gate |

- **Purpose & Financial Risk Mitigated:** Eliminates post-cutoff surprises by batch-approving deterministic monthly journals before `LBD` closes, while enforcing clear governance labeling on Flash executive packs so provisional figures are never mistaken for attested statutory numbers.
- **Upstream Prerequisites & Source Inputs:** Pre-validated recurring schedules (`A6` depreciation, amortization, prepaid releases, IFRS 16 leases, IC eliminations `A7`, staged CoS `A8`), plus completed `A9` sub-ledger lock.
- **Detailed Step-by-Step Execution Procedure:**
  1. Run automated ERP rule validation across all recurring standard JEs verifying balanced debits/credits, valid cost centers, mandatory **IFRS 18 Function + Nature tags**, and `AUTO-REVERSE` flags where temporary.
  2. Controller executes single-batch approval for pre-validated deterministic journals (`<€0` rule exceptions) by `17:30`.
  3. Generate the **`LBD` Provisional Flash P&L & Cash Pack** showing preliminary Revenue, `1,500`-hr CoS, Operating Profit, and MPM (`¶117` Adjusted EBITDA) estimates.
  4. Verify mandatory **`PROVISIONAL — PRE-EAC & VARIANCE SIGN-OFF`** watermark appears on every BI dashboard tile, PDF header, and executive email summary released at `LBD 18:00`.
- **Control Thresholds, Tolerances & Required Audit Evidence:** `100%` of pre-validated JEs pass automated validation with zero manual overrides; `100%` watermark visibility on Flash Pack. Audit evidence: JE Batch Approval Log and archived Flash PDF copy.
- **Downstream Impact & Escalation Protocol:** Sets the baseline trial balance entering Phase 3 (`A11` Day-1 Auto-Reversals). Flash numbers missing mandatory Provisional watermark are recalled immediately by FP&A/Controller.

---

## 4. Phase 3 — Auto-Reversals, Exception-Only Variance & Attested IFRS 18 Lock (`Day+1 – Day+3+`)

### Activity `A11` — Mandatory Day-1 Auto-Reversals Fire *(HARD GATE)*

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A11` — Phase 3: Auto-Reversals, Variance & Attested Lock |
| **Control ID(s)** | `FIN-CC-02` (Zero-Tolerance Automated Day-1 Reversals) |
| **SoD Preparer / Reviewer** | ERP Automated Batch / Accounting Manager (Control Owner) |
| **Hard Deadline & Gantt Slot** | **Day+1 · 08:00 CET** \| Gantt: `D+1` |
| **Gate Type** | **Hard Gate / System Lock (`◆`)** |

- **Purpose & Financial Risk Mitigated:** Completely eliminates double-counted expenses and zombie accrual balances in the new open period caused by forgetting to reverse prior-month estimated accruals (payroll stub `A6`, unvouchered subcontractor CoS `A9`, bonus provisions) before actual vendor invoices post.
- **Upstream Prerequisites & Source Inputs:** Opening of New Accounting Period (`Day+1 00:01`) and all prior-period accruals tagged `AUTO-REVERSE = TRUE` (`A6`, `A9`, `A10`, `YE-01`).
- **Detailed Step-by-Step Execution Procedure:**
  1. Trigger scheduled ERP automated batch job at **`Day+1 06:00`** to generate and post exact mirror reversal entries dated `Day+1` for 100% of qualifying prior-month accruals.
  2. Execute Control Verification Query at **`07:30`** confirming:  
     `Count(Tagged Reversing Accruals in Closed Period) == Count(Posted Reversals in New Period)` and `Net Delta across Accrual Clearing Accounts == €0.00`.
  3. Block opening of new-period AP invoice matching for accrued supplier categories until Accounting Manager formally certifies the `08:00` Auto-Reversal Completion Check.
  4. Review automated exception log for any non-reversing permanent adjustments requiring explicit Controller justification (`FIN-CC-02`).
- **Control Thresholds, Tolerances & Required Audit Evidence:** **Zero-tolerance (`100.0%` reversal execution)** for every flagged accrual prior to `08:00`. Audit evidence: ERP Batch Job Execution ID, Reversal Completeness Query Output, and Accounting Manager `08:00` sign-off log.
- **Downstream Impact & Escalation Protocol:** **Blocks new-period AP posting and clean `A12`/`A13` roll-forward integrity.** Any failed reversal batch at `07:30` triggers an immediate P1 alert to ERP Admin & Corporate Controller to post batch before `09:00`.

---

### Activity `A12` — Fixed-Price `% of Completion` (`EAC`) Run & `1,500`-Hr Absorption `€0.00` GL Tie-Out

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A12` — Phase 3: Auto-Reversals, Variance & Attested Lock |
| **Control ID(s)** | `FIN-CC-09` (`EAC` after CoS cutoff) · `FIN-CC-10` (`1,500`-Hr Absorption Tie-Out) |
| **SoD Preparer / Reviewer** | Cost & Revenue Accounting (Preparer) → Corporate Controller (Reviewer) |
| **Hard Deadline & Gantt Slot** | **Day+2 · 12:00 CET** \| Gantt: `D+1` → `D+2` |
| **Gate Type** | Critical-Path Revenue & Cost Attestation Step |

- **Purpose & Financial Risk Mitigated:** Enforces strict IFRS 15 accuracy by computing Fixed-Price percentage-of-completion (`% Complete = Cumulative Actual CoS ÷ Total EAC`) *only after* all labor, `4-4-5` proration, and unvouchered subcontractor costs (`A8` + `A9`) are locked, while tying absorbed hourly Cost of Sales plus variances to the General Ledger to **`€0.00`**.
- **Upstream Prerequisites & Source Inputs:** Completed **Hard Gate `A9`** (Locked Sub-Ledgers & Unvouchered Subcontractor Accruals), **`A8`** (`4-4-5` CoS proration & `1,500`-hr absorption staging), and updated PM Estimate-at-Completion (`EAC`) project forecasts.
- **Detailed Step-by-Step Execution Procedure:**
  1. **Execute Fixed-Price `% of Completion` Calculation (`FIN-CC-09`):**
     - Pull locked cumulative project actual costs (internal `1,500`-hr CoS + direct project expenses + `A9` unvouchered subcontractor accruals).
     - Calculate `% Complete = Cumulative Locked Actual Cost ÷ Approved Project EAC`.
     - Compute `Cumulative Earned Revenue = Contract Value × % Complete` and book period WIP / Deferred Revenue adjustment (`Loss Contracts` recognized `100%` immediately per IAS 37 / IFRS 15).
  2. **Execute `1,500`-Hr CoS Absorption Tie-Out (`FIN-CC-10`):**
     - Reconcile **Actual Incurred Delivery Payroll Pool (`A5` + `A6` prorated via `A8`)** against **Standard Absorbed CoS (`Approved Billable Hours × [Annual Cost ÷ 1,500]`) + Rate Variance + Utilization/Volume Variance**.
     - Verify the identity holds strictly:  
       `Actual Delivery Cost Pool (4-4-5 Prorated) - [Absorbed CoS + Rate Variance + Volume Variance] = €0.00`.
  3. Map Cost of Sales variances into the **IFRS 18 P&L Function (`Cost of Sales`)** while preserving `¶83` Nature audit trail.
  4. Obtain Controller sign-off on both the Fixed-Price `% of Completion` schedule and the `€0.00` CoS Absorption Bridge by **`Day+2 12:00`**.
- **Control Thresholds, Tolerances & Required Audit Evidence:** **`€0.00` unallocated Cost of Sales residual** between Payroll/AP sub-ledgers and Project P&L CoS; mandatory written PM + Finance sign-off on any `EAC` upward/downward revision `>5%`. Audit evidence: Fixed-Price `EAC` Calculation Schedule, Loss-Contract Review Log, and `1,500`-Hr Absorption Bridge Workpaper.
- **Downstream Impact & Escalation Protocol:** **Directly feeds `A13` (Variance Review) and `A14` (IFRS 18 Sign-Off).** Any absorption gap `≠€0.00` or disputed `EAC` forecast at `Day+2 10:00` escalates immediately to CFO and Delivery VP.

---

### Activity `A13` — Working-Day Normalized `>5%` MRC Variance Review & Auto-Certification

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A13` — Phase 3: Auto-Reversals, Variance & Attested Lock |
| **Control ID(s)** | `FIN-CC-03` (Exception-Only Variance & Auto-Certified Balance Sheet) · `FIN-CC-08` (Working-Day Normalization) |
| **SoD Preparer / Reviewer** | GL Accountant (Preparer) → Corporate Controller / FP&A Lead (Reviewer) |
| **Hard Deadline & Gantt Slot** | **Day+2 · 17:00 CET** \| Gantt: `D+2` |
| **Gate Type** | Critical-Path Exception Analytics & Certification Step |

- **Purpose & Financial Risk Mitigated:** Replaces exhaustive manual review of 100% of GL accounts with risk-based **exception-only variance investigation**, normalizing Month-over-Month (`MoM`) comparisons for **`4-4-5` (`20 vs. 25` working days)** so reviewers focus exclusively on true operational anomalies.
- **Upstream Prerequisites & Source Inputs:** Completed `A12` (`EAC` revenue + `1,500`-hr CoS tie-out) and live Month-End Reporting & Close (`MRC`) Trial Balance.
- **Detailed Step-by-Step Execution Procedure:**
  1. **Apply `4-4-5` Working-Day Normalization (`FIN-CC-08`):** Before flagging P&L variances between a 4-week month (`20` days) and 5-week month (`25` days), normalize revenue and variable CoS run-rates to a daily rate (`Amount ÷ Period Working Days`), preventing false-positive `25%` (`25/20`) variance alerts.
  2. **Run Exception Materiality Filter (`FIN-CC-03`):**
     - Flag all Balance Sheet accounts with zero activity/reconciling deltas (`€0.00` unexplained difference vs. sub-ledger or roll-forward) and `0` aged exceptions (`>5d`) for **Automated System Certification**.
     - Isolate only **Exception Accounts** showing `>5%` normalized MoM/Budget variance **AND** `>€10,000` (configurable materiality floor) for mandatory written root-cause narrative.
  3. Verify `IFRS 18 ¶78–83` Nature-of-Expense reconciliation table (`CoS + R&D + SG&A by Function == Total Payroll + Depreciation + Amortization + Subcontractors + Other by Nature`).
  4. Document root-cause explanations for all flagged exceptions and obtain dual Controller + FP&A Lead sign-off by **`Day+2 17:00`**.
- **Control Thresholds, Tolerances & Required Audit Evidence:** Materiality thresholds: `>5%` normalized variance AND `>€10,000`; `100%` of Balance Sheet accounts certified (Automated or Exception-Reviewed); `€0.00` Function-vs-Nature tie-out delta. Audit evidence: Auto-Certification Summary, Normalized Variance Commentary Log, and IFRS 18 Function-to-Nature Matrix.
- **Downstream Impact & Escalation Protocol:** **Final analytical prerequisite for `A14` (Hard GL Lock).** Any unexplained variance `>€25,000` unresolved at `Day+2 15:30` triggers emergency Controller review to post substantiated correction or formal disclosure note before `Day+3`.

---

### Activity `A14` — IFRS 18 Subtotal / `¶117` MPM Sign-Off, Hard GL Lock & Attested Reporting *(HARD GATE)*

| Attribute | Specification |
| :--- | :--- |
| **Activity ID & Phase** | `A14` — Phase 3: Auto-Reversals, Variance & Attested Lock |
| **Control ID(s)** | `FIN-CC-05` (Hard GL Lock) · `FIN-CC-06` (Attested Reporting) · IFRS 18 (`Operating Profit`, `¶117 MPM`, `¶121–123`) |
| **SoD Preparer / Reviewer** | Corporate Controller (GL Lock Attester) & CFO (MPM & Executive Sign-Off) |
| **Hard Deadline & Gantt Slot** | **Day+3 · 16:00 CET** \| Gantt: `D+3+` |
| **Gate Type** | **Hard Gate / Final System Lock (`◆`)** |

- **Purpose & Financial Risk Mitigated:** Closes the monthly books with an auditable, immutable General Ledger lock, guaranteeing that external statutory subtotals (Operating, Investing, Financing), internal `4-4-5` operating KPIs, and CFO-communicated Management-defined Performance Measures (`MPMs`) are 100% reconciled and audit-defensible.
- **Upstream Prerequisites & Source Inputs:** Completed `A13` (Auto-Certification & Variance Sign-Off), `A12` (`EAC` & `1,500`-hr CoS tie-out), and `A7` (`€0.00` IC match).
- **Detailed Step-by-Step Execution Procedure:**
  1. **Verify IFRS 18 Category & Subtotal Integrity:** Confirm P&L structure cleanly segregates **Operating**, **Investing**, and **Financing** categories with zero misclassified lease interest, FX financing gains/losses, or equity-accounted items inside **Operating Profit**.
  2. **Approve `¶117` / `¶121–123` MPM Reconciliation Bridge:** Review and sign the quantitative reconciliation bridging Statutory Operating Profit to every CFO-reported MPM (e.g., Adjusted EBITDA, Recurring Gross Margin, Utilization-Adjusted Operating Margin), including tax and NCI effects of each reconciling item (`¶123`).
  3. **Execute Final Hard GL Lock (`FIN-CC-05`):** Corporate Controller and CFO record digital close attestation; ERP Period Status transitions permanently from `Open` → `Closed / Hard-Locked` (super-user reopening strictly logged with audit reason code).
  4. **Release Attested Monthly Close Pack (`Day+3 16:00`):** Remove the `PROVISIONAL` Flash watermark (`A10`) and publish the **Attested Executive Close Package** (P&L, Balance Sheet, Cash Flow, `1,500`-Hr CoS Utilization & Gross Margin Bridge, `¶117` MPM Schedule) to Board / Executive Leadership.
- **Control Thresholds, Tolerances & Required Audit Evidence:** **`0` uncertified accounts**, **`€0.00` MPM-to-Operating-Profit reconciliation gap**, and **`100%` immutable Hard GL Lock** by `Day+3 16:00`. Audit evidence: Signed CFO/Controller Attestation Certificate, ERP Hard-Lock Timestamp, and Archived Attested Reporting Package.
- **Downstream Impact & Escalation Protocol:** Concludes monthly close cycle and archives audit-ready binder (`FIN-CC-01`–`10`). Any failure to achieve Hard Lock by `Day+3 12:00` triggers formal CFO Close Post-Mortem and root-cause remediation entry prior to next `Day 1`.

---

## 5. Dual-Calendar & Year-End Overlay Activities (`FIN-CC-07`)

Because statutory financial reporting runs **01 January – 31 December** while internal operating budgets and management incentive plans run **01 July – 30 June** on a **`4-4-5` fiscal calendar**, two annual overlay activities run directly on top of the monthly cadence without breaking the 3-day close rhythm.

### Activity `YE-01` — 30 June Operating Budget Year-End Overlay (`01 Jul – 30 Jun`)

| Attribute | Specification |
| :--- | :--- |
| **Overlay ID & Scope** | `YE-01` — Operating Budget Year-End (`Period 12`, ending late June / `30-06`) |
| **Control ID(s)** | `FIN-CC-07` (Dual-Calendar Isolation) · `FIN-CC-02` (Day-1 Auto-Reversals) · `FIN-CC-10` (`1,500`-Hr Baseline Reset) |
| **SoD Preparer / Reviewer** | FP&A Lead & Corporate Controller (Preparers) · CFO (Approver) |
| **Hard Deadline** | **June Close Cycle (`LBD` through `Day+4`)** |
| **Gate Type** | Annual Budget-Year Governance Gate |

- **Purpose & Financial Risk Mitigated:** Prevents annual incentive true-ups (executive bonuses, sales commissions, annual vendor rebates, and discretionary write-offs) closed at `30 June` from spilling into **July (`Period 1` of New Budget Year)** and distorting initial gross margin or annual **`1,500`-hr Standard CoS Rates**.
- **Detailed Step-by-Step Execution Procedure:**
  1. **Isolate Annual Budget True-Ups:** Tag all annual bonus pool adjustments, commission accelerators, and annual volume vendor rebates in a dedicated Budget-YE closing ledger tag (`BYE-TRUEUP`).
  2. **Enforce Mandatory `Day+1` Auto-Reversals (`FIN-CC-02`):** Flag 100% of temporary June estimation accruals for `1 July` `08:00` reversal (`A11`) so actual payout settlements in Q1 (`Jul–Sep`) match cleanly against booked provisions with zero Period 1 P&L drag.
  3. **Reset New Budget-Year `1,500`-Hr Standard CoS Rates (`FIN-CC-10`):** Load approved `01 Jul – 30 Jun` salary pools (`÷ 1,500 billable hrs/yr`) into PSA/ERP rate tables immediately prior to `July Day 1` time capture (`A3`/`A8`).
  4. **Archive Full-Year `01 Jul – 30 Jun` Budget Package:** Publish final audited Budget vs. Actual variance bridge alongside updated MPM baselines (`¶117`).
- **Required Audit Evidence:** Tagged `BYE-TRUEUP` journal register, signed `1,500`-hr Annual Rate Table effective `01 July`, and CFO June Budget-Close Sign-Off.

---

### Activity `YE-02` — 31 December Statutory Fiscal Year-End Overlay (`01 Jan – 31 Dec`)

| Attribute | Specification |
| :--- | :--- |
| **Overlay ID & Scope** | `YE-02` — Statutory IFRS 18 Fiscal Year-End (`31 December` Statutory Cutoff) |
| **Control ID(s)** | `FIN-CC-07` (`1–5` Day Stub Bridge & Dual-Calendar Reconciliation) · IFRS 18 (`¶78–83`, `¶117`) |
| **SoD Preparer / Reviewer** | Group Financial Reporting Lead & Corporate Controller (Preparers) · CFO & External Auditors (Reviewers) |
| **Hard Deadline** | **December Statutory Close (`31 Dec Cutoff` through `Day+5` Stub Lock)** |
| **Gate Type** | **Statutory Audit Hard Gate** |

- **Purpose & Financial Risk Mitigated:** Reconciles the weekly Friday `4-4-5` close calendar cleanly to the exact **`31 December 23:59`** legal cutoff and delivers a **`€0.00`-reconciled bridge** linking two overlapping Budget Half-Years to Statutory IFRS 18 Financial Statements.
- **Detailed Step-by-Step Execution Procedure:**
  1. **Execute `1–5` Day Statutory Stub Bridge (`FIN-CC-07`):** When the final `4-4-5` Friday period ends on e.g. `26–30 December` (or runs past `31 Dec` in a 52/53-week year), compute exact daily stub accruals/deferrals for Revenue (`A9`/`A12`), Payroll (`A5`/`A6`), and `1,500`-hr CoS (`A8`) covering the `1–5` gap days through **`31 December 23:59`**, tagged `AUTO-REVERSE = TRUE` for `1 January` (`A11`).
  2. **Reconcile Budget Half-Years to Statutory FY (`€0.00` Bridge):** Build and tie out the formal Dual-Calendar Identity:  
     `[H2 Prior Budget Year: 01 Jan – 30 Jun] + [H1 Current Budget Year: 01 Jul – 31 Dec] ± [31-Dec Stub Adjustments] == Statutory FY (01 Jan – 31 Dec) [Delta = €0.00]`.
  3. **Compile Full IFRS 18 Statutory Audit Pack:**
     - Primary Statement of Profit or Loss across **Operating**, **Investing**, and **Financing** categories with mandatory **Operating Profit** subtotal.
     - **Function-to-Nature Reconciliation Note (`¶78–83`)** showing exact employee benefits (`¶83`), depreciation, amortization, and impairment embedded inside Cost of Sales, R&D, and SG&A.
     - **Audited MPM Disclosure Schedule (`¶117` & `¶121–123`)** documenting every non-IFRS performance measure (and confirming whether a `53rd-week` calendar anomaly, if present, is isolated outside MPMs).
  4. Obtain CFO + External Audit clearance sign-off prior to Statutory Hard GL Lock (`A14`).
- **Required Audit Evidence:** `1–5` Day Statutory Stub Workpaper, `€0.00` Dual-Calendar (`H2 + H1 = FY`) Tie-Out Schedule, and complete IFRS 18 `¶78–83` / `¶117` Statutory Audit Binder.

---

## 6. Master Control, Escalation & Audit Evidence Matrix

| ID | Activity Summary | Control | Preparer → Reviewer | Hard Deadline | Gate | Primary Audit Artifact |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **A1** | Daily bank, AP, AR & card auto-match | `FIN-CC-01` | GL Acct. → Acct. Mgr. | Daily 10:00 | Bar | Daily Bank/GL Auto-Match Log |
| **A2** | Weekly exception clearing (`<5d` aging) | `FIN-CC-01` | GL Acct. → Reviewer | Fri 16:00 | Bar | Aged Queue & Reason-Code Sign-Off |
| **A3** | Weekly PSA & subcontractor hours check | `FIN-CC-09` | Project Acct. → Delivery | Fri 17:00 | Bar | Locked Weekly PSA & PO Rate Log |
| **A4** | **Core Payroll Lock** | `FIN-CC-04` | Payroll Ops → HR/Ctrl | **Day 23 · 17:00** | **Hard Gate** | Locked Payroll Register Checksum |
| **A5** | 48-Hr HRIS-to-GL & `€0.00` clearing | `FIN-CC-04` | Payroll → GL Ctrl | Day 25 · 17:00 | Control | `€0.00` Payroll Clearing Tie-Out |
| **A6** | Stub, mobility, lease & Concur accruals | `FIN-CC-01` | Sr. Acct. → Acct. Mgr. | Day 28 · 15:00 | Accrual | IFRS 18 Tagged Accrual Schedule |
| **A7** | IC billing cutoff & bilateral match | `FIN-CC-05` | IC Acct. → Consol. Lead | LBD-2 · 17:00 | Gate | `€0.00` Bilateral IC Matrix |
| **A8** | `4-4-5` CoS, PTO & `1,500`-hr staging | `FIN-CC-08/10` | Cost/FP&A → Acct. Mgr. | LBD · 15:00 | Costing | `20/20/25` Proration & PTO Schedule |
| **A9** | **WIP Rev & SubCoS Cutoff + Sub-Ledger Lock** | `FIN-CC-09/05` | Rev Acct. → Controller | **LBD · 18:00** | **Hard Gate** | Paired WIP/SubCoS & Sub-Ledger Lock |
| **A10** | Pre-validated JEs & Provisional Flash | `FIN-CC-06` | Controller / FP&A | LBD · 18:00 | Control | JE Batch Log & Watermarked Flash |
| **A11** | **Mandatory Day-1 Auto-Reversals Fire** | `FIN-CC-02` | ERP Batch / Acct. Mgr. | **Day+1 · 08:00** | **Hard Gate** | `100%` Reversal Completeness Log |
| **A12** | Fixed-Price `EAC` & `1,500`-hr GL tie-out | `FIN-CC-09/10` | Cost/Rev → Controller | Day+2 · 12:00 | Control | `EAC` Schedule & `€0.00` Absorption |
| **A13** | Normalized `>5%` variance & auto-cert. | `FIN-CC-03` | GL Acct. → Ctrl / FP&A | Day+2 · 17:00 | Control | Auto-Cert. & Normalized Var. Log |
| **A14** | **IFRS 18 / ¶117 MPM Sign-Off & Hard Lock** | `FIN-CC-05/06` | Controller & CFO | **Day+3 · 16:00** | **Hard Gate** | Attestation Cert. & Hard GL Lock |
| **YE-01** | `30 Jun` Operating Budget YE Overlay | `FIN-CC-07/02` | FP&A / Ctrl → CFO | June Close Cycle | Annual | `BYE-TRUEUP` Log & `1,500`-Hr Reset |
| **YE-02** | `31 Dec` Statutory FYE Stub & Tie-Out | `FIN-CC-07` | Reporting / Ctrl → CFO | Dec Statutory Cycle | Audit Gate | Stub Bridge & `€0.00` `H2+H1=FY` Binder |
