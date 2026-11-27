---
artifact: "internal-delivery-playbook"
classification: "CBa Consult — internal; tailor for client under NDA"
linked_hypothesis: "HYP-2027-007"
ip_provenance: "2007–2008 Resources Global Professionals (RGP) in-house methodology — Director institutional knowledge"
target_effort_cap: "≤15 hours codification (log below)"
companion_artifacts:
  - Close-Calendar-Dependency-Gate-Blueprint-Internal.md
  - SoD-Official-KPI-Control-Matrix-Internal.md
  - IFRS-18-Close-Relevance-Notes.md
---

# Internal Playbook — 23rd Payroll → Post-3rd Continuous Close Bridge

> **Purpose:** Satisfy `HYP-2027-007` by documenting ≥70% of Pilot #1 deliverables at \$0 cash outlay. **Do not ship this file verbatim to clients** — export a redacted client edition from sections marked `[CLIENT]`.

---

## Codification Time Log (`HYP-2027-007`)

| Date | Hours | Activity |
| --- | ---: | --- |
| 2026-11-24 | 0.0 | Scaffold created; extraction sprint initialized |
| 2026-11-24 | *(log Director review hrs)* | Codified 6-guardrail SoD Control Matrix (`FIN-CC-01`–`06`), Baseline P&L/BS spec template, Official KPI attestation table, and verified IFRS 18 ¶117/¶121 cross-links |
| | | **Running total:** *(Director to log actual hours)* / 15 hrs |

---

## [CLIENT] 1. Three-Phase Exception-Based Close Loop

*(Aligned with [One_Pager_OP-FIN-009_Continuous_Close.md](One_Pager_OP-FIN-009_Continuous_Close.md) — tailor exact cut-off dates to client payroll calendar during Pilot #1.)*

| Window | Phase | Controller & Accounting Actions | Exit Gate |
| --- | --- | --- | --- |
| **Days 1–22** | Continuous Transaction Matching | Daily bank/AP/AR/sub-ledger feeds; mandatory reason codes on unmatched exceptions; clear routine suspense items weekly instead of at month-end. | Exception aging <5 business days; zero stale suspense items >€5k |
| **23rd – Month-End** | Payroll Lock & Pre-Validated JEs | Lock payroll on 23rd → run HRIS-to-GL sync on 24th–25th → compute 23rd–month-end accrual deltas → stage recurring JEs through Preparer → Reviewer → Approver before Day 1. | Payroll clearing variance = €0.00; all recurring JEs staged & pre-approved |
| **Days 1–3+** | Exception-Only Variance & Close | Auto-reverse Day-1 accruals; auto-certify balances within tolerance (`≤5%` / materiality floor); investigate only flagged exceptions; publish attested KPIs after Day-3 sign-off. | Close locked ≤3 business days post-3rd; signed Management Review Control (MRC) log |

**Director RGP Archive Notes (optional legacy additions):** *[append any client-specific RGP journal templates or edge-case notes here]*

---

## [CLIENT] 2. Ten Automated Accrual & Matching Guardrails (SoD Control Matrix)

Cross-linked with [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) (EU-endorsed Feb 13, 2026; mandatory Jan 1, 2027) and PCAOB/ISA 265 ITGC/MRC audit standards:

| Control ID | Guardrail | Operational Rule (Zero New Software) | Preparer | Reviewer / Approver (SoD) | Audit Evidence & IFRS 18 Alignment |
| --- | --- | --- | --- | --- | --- |
| **`FIN-CC-01`** | **Explicit 23rd–Month-End Delta Rules** | Standard formula sheet calculating daily-rate payroll, overtime, bonus, and social-charge deltas between 23rd lock and period cutoff; tagged by **both** IFRS 18 *Function* (`CoS` vs. `SG&A`) and *Nature* (`Employee Benefits`, ¶78–83). | Senior Accountant / Payroll Ops | Corporate Controller *(cannot edit payroll master)* | Versioned calculation workbook + signed delta threshold log |
| **`FIN-CC-02`** | **Mandatory Day-1 Auto-Reversals** | Every 23rd–cutoff stub, `4-4-5` proration, and `30-06` / `31-12` accrual JE must be flagged `AUTO-REVERSE = DAY 1` in native ERP before posting to eliminate double-counting in the next period. | Senior Accountant | Accounting Manager | ERP recurring/reversal batch log + zero residual accrual check |
| **`FIN-CC-03`** | **>5% Variance Alerts (Working-Day Normalized MRC)** | Documented Management Review Control (MRC) precision threshold: normalize P&L lines to **per-working-day / weekly run-rate** (eliminating false `+25% / -20%` `4-4-5` month jumps) before flagging `>5%` variances requiring written root-cause sign-off. | GL Accountant | Controller / FP&A Lead | Date-stamped normalized variance exception log (closes ISA 265 MRC finding) |
| **`FIN-CC-04`** | **24th–25th HRIS-to-GL Sync Window** | Fixed 48-hour reconciliation window reconciling HRIS gross-to-net register against GL payroll clearing accounts (`€0.00` target variance) + CoS vs. SG&A Employee-Benefits tie-out (IFRS 18 ¶83). | Payroll Specialist | GL Controller *(independent of HRIS edit rights)* | Signed HRIS-to-GL tie-out + zero-balance clearing proof |
| **`FIN-CC-05`** | **Sequenced Dependency Gates** | Hard close sequence: (1) PSA/Sub-ledgers & WIP/GR-IR locked (`FIN-CC-09`) → (2) Payroll/IC clearing = €0.00 → (3) `4-4-5` CoS proration (`FIN-CC-08`) → (4) Fixed-Price `% of Completion` run → (5) IFRS 18 subtotal check → (6) Hard GL lock. | Close Coordinator | Controller | Timestamped close checklist + ERP period-lock audit screenshot |
| **`FIN-CC-06`** | **Tiered Human Sign-Off & MPM SoD** | Material JEs require tiered approval (Preparer ≠ Approver); any external Management-Defined Performance Measure (MPM, IFRS 18 ¶117 — incl. *"52-week comparable"* 53rd-week adjustments) requires separate **MPM Owner + CFO sign-off** with tax & NCI reconciliation (¶121–123). | GL Preparer / FP&A | Controller (GL) & CFO / Disclosure Comm. (MPM) | Signed SoD matrix + single-note MPM reconciliation bridge |
| **`FIN-CC-07`** | **Dual-Calendar & `31-12` / `30-06` Stub-Day Bridge** | Tag recurring accruals, bonuses, and rates with `Statutory_Period (01-01–31-12)`, `Budget_Period (01-07–30-06)`, and `4-4-5_Period`; bridge the **1–5 stub days** between Friday `4-4-5` period-end and hard `31-12` statutory / `30-06` budget cutoffs (`H2+H1 = Statutory FY`, `€0.00` delta). | GL / FP&A Analyst | Corporate Controller | Dual-YTD & stub-day reconciliation bridge (`€0.00` delta) + IFRS 18 mid-budget CoA map |
| **`FIN-CC-08`** | **`4-4-5` Working-Day CoS Proration & PTO Drawdown** | Eliminate the Gross Margin sawtooth (`28/28/35`-day weekly revenue vs. `1/12` monthly payroll): prorate salaried Direct Labor CoS & fixed delivery OPEX by exact working days (`20/20/25`), draw down PTO/vacation taken against the **Vacation Liability Provision** (not CoS), and enforce consistent Billable CoS vs. Bench SG&A rules. | Cost / Payroll Accountant | Corporate Controller | Monthly Gross Margin bridge + Vacation Liability rollforward + IFRS 18 CoS policy check |
| **`FIN-CC-09`** | **Simultaneous WIP Revenue & Subcontractor CoS Cutoff** | Lock `Approved Timesheets → Unbilled WIP (Contract Assets)` and `Approved Subcontractor/ZZP Hours × PO Rate → Unvouchered CoS Accrual (GR/IR)` in the **same period** *before* running Fixed-Price `% of Completion` (`Actual CoS ÷ EAC`) so timing lags never misstate IFRS 15 revenue or Gross Profit. | Revenue / Project Accountant | Controller *(independent of Project Managers)* | WIP-to-PSA tie-out + Unvouchered Subcontractor AP accrual schedule + EAC review sign-off |
| **`FIN-CC-10`** | **`1,500`-Hour Standard CoS Rate & Absorption Tie-Out** | Compute project CoS at `Actual Billable Hours × (7-Layer Loaded Annual Cost ÷ 1,500 billable hrs/yr)` (`115.38h` per 4-wk / `144.23h` per 5-wk `4-4-5` period, or `125.0h`/calendar mo); at Day-3 close, reconcile **`Absorbed Project CoS + Unabsorbed Bench/Capacity Variance − Over-Absorption Credit + Rate/Payroll Spending Variance = Actual Prorated HRIS Payroll`** to `€0.00` delta so peak billing never creates phantom profit or inflates IFRS 15 EAC revenue. | Cost / FP&A Accountant | Corporate Controller | Monthly 3-line absorption bridge (`€0.00` clearing delta) + IFRS 18 ¶83 Employee Benefits tie-out (`OP-FIN-010` link) |

---

## [CLIENT] 3. Baseline P&L & Balance Sheet Specification (RGP Legacy Structure)

| Close Domain | Standard Specification Rule (`$0` New Software) | IFRS 18 / Audit Control Check | Status |
| --- | --- | --- | --- |
| **Revenue & Cost of Sales Matching** | Cut off PSA/timesheets on `4-4-5` Friday close *and* `31-12` statutory stub (`FIN-CC-07`); book **Unbilled WIP** & **Unvouchered Subcontractor CoS (`Hours × PO Rate`)** simultaneously (`FIN-CC-09`) *before* Fixed-Price `% of Completion` (`EAC`) runs; check period-end side letters (`OP-FIN-012`). | Mapped to IFRS 18 `Operating` (*Revenue* & *Cost of Sales* by function + ¶83 *Nature* note); ASC 606 / IFRS 15 matching & cutoff proof. | ☑ Drafted *(tailor per client)* |
| **Payroll, CoS Proration & Benefits** | Lock core payroll on 23rd; tie HRIS to GL on 24th–25th (`FIN-CC-04`); prorate salaried CoS across `4-4-5` working days (`20/20/25`) & draw down PTO against Vacation Liability (`FIN-CC-08`); align the **3 clocks** (`01-01` statutory tax/CLA, `Jun–May` *vakantiegeld*, `01-07` budget rate/bonus — feeding `OP-FIN-010`). | Payroll clearing = €0.00; eliminates `4-4-5` Gross Margin sawtooth & `Jan–Jun` rate drift; CoS vs. SG&A Employee Benefits reconciled. | ☑ Drafted *(tailor per client)* |
| **Intercompany & Clearing Accounts** | Cut off intercompany (IC) billings on LBD-2; force bilateral IC matching and zero-out clearing accounts (bank, payroll, GR/IR, suspense) prior to consolidation. | Zero uneliminated IC variance; manual IC journals logged with preparer/approver SoD. | ☑ Drafted *(tailor per client)* |
| **Flash vs. Attested KPI Definitions** | Strict separation between **Provisional Internal Flash** (Days 23–3, watermarked) and **Attested Close Numbers** (Post-Day 3+, GL-locked and IFRS 18 subtotal-compliant). | Prevents unverified flash metrics from leaking into external investor decks as unaudited ¶117 MPMs. | ☑ Drafted *(IFRS 18 verified)* |

---

## [CLIENT] 4. Official Real-Time KPI Set (Provisional vs. Attested Rules)

| KPI | Window Available | Provisional Allowed? | Mandatory Attestation & IFRS 18 Rule |
| --- | --- | :---: | --- |
| **Cleared Cash & Liquidity Position** | Daily (Days 1–31) | **Yes** *(Bank-feed verified)* | Reconciled daily to bank statements; zero unallocated cash >48 hrs; watermarked `BANK-CLEARED` until GL bank-rec sign-off. |
| **23rd Locked Payroll & FTE Headcount** | From Day 25 onward | **Yes** *(Locked base)* | Based on locked 23rd payroll + HRIS tie-out (`FIN-CC-04`); 23rd–LBD stub clearly labeled `ESTIMATED ACCRUAL` until Day-3 close. |
| **Close Readiness Score (%)** | Daily (Days 23–3+) | **Yes** *(Internal Ops)* | `%` of close checklist tasks, clearing accounts, and `>5%` variance explanations signed off (`FIN-CC-05`); internal-only operational metric (not an IFRS 18 MPM). |
| **Flash Operating Profit / EBITDA** | Days 28–3 *(Internal)* → Day 3+ *(Attested)* | **Internal Only (Watermarked)** | Must display `PROVISIONAL — INTERNAL MANAGEMENT VIEW ONLY` prior to Day-3+ GL lock; external publication requires IFRS 18 `Operating Profit` subtotal alignment and ¶121–123 MPM reconciliation (incl. tax & NCI effects). |

---

## Internal Completion Checklist (`HYP-2027-007` Gate)

- [x] Sections 1–4 drafted covering **4 of 4** one-pager deliverables (3-Phase Loop, 6 Guardrails + SoD Matrix, Baseline P&L/BS Spec, Official Real-Time KPI Set)
- [x] [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) verified against EU endorsement (Feb 13, 2026) & ¶117/¶121–123 MPM rules and cross-linked into §2–§4
- [ ] Director review of RGP legacy nuances + actual codification hours logged (`≤15 hrs`) to classify `HYP-2027-007` (`Testing` → `Validated`)
