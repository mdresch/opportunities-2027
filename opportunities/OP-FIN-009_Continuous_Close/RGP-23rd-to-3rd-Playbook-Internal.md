---
artifact: "internal-delivery-playbook"
classification: "CBa Consult — internal; tailor for client under NDA"
linked_hypothesis: "HYP-2027-007"
ip_provenance: "2007–2008 Resources Global Professionals (RGP) in-house methodology — Director institutional knowledge"
target_effort_cap: "≤15 hours codification (log below)"
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

## [CLIENT] 2. Seven Automated Accrual Guardrails & SoD Control Matrix

Cross-linked with [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) (EU-endorsed Feb 13, 2026; mandatory Jan 1, 2027) and PCAOB/ISA 265 ITGC/MRC audit standards:

| Control ID | Guardrail | Operational Rule (Zero New Software) | Preparer | Reviewer / Approver (SoD) | Audit Evidence & IFRS 18 Alignment |
| --- | --- | --- | --- | --- | --- |
| **`FIN-CC-01`** | **Explicit 23rd–Month-End Delta Rules** | Standard formula sheet calculating daily-rate payroll, overtime, bonus, and social-charge deltas between 23rd lock and calendar month-end; tagged to IFRS 18 `Operating` category. | Senior Accountant / Payroll Ops | Corporate Controller *(cannot edit payroll master)* | Versioned calculation workbook + signed delta threshold log |
| **`FIN-CC-02`** | **Mandatory Day-1 Auto-Reversals** | Every 23rd–month-end accrual JE must be flagged `AUTO-REVERSE = DAY 1` in native ERP before posting to eliminate double-counting in the next period. | Senior Accountant | Accounting Manager | ERP recurring/reversal batch log + zero residual accrual check |
| **`FIN-CC-03`** | **>5% Variance Alerts (MRC Precision)** | Documented Management Review Control (MRC) precision threshold: any account moving `>5%` MoM (or above client materiality floor) requires written root-cause explanation before close sign-off. | GL Accountant | Controller / FP&A Lead | Date-stamped variance exception log (closes ISA 265 MRC finding) |
| **`FIN-CC-04`** | **24th–25th HRIS-to-GL Sync Window** | Fixed 48-hour reconciliation window reconciling HRIS gross-to-net register against GL payroll clearing accounts (`€0.00` target variance) before month-end. | Payroll Specialist | GL Controller *(independent of HRIS edit rights)* | Signed HRIS-to-GL tie-out + zero-balance clearing proof |
| **`FIN-CC-05`** | **Sequenced Dependency Gates** | Hard close-checklist sequence: (1) Sub-ledgers closed → (2) Payroll & IC clearing = €0.00 → (3) Accruals posted → (4) Tax/NCI & IFRS 18 subtotal check → (5) Hard GL lock. | Close Coordinator | Controller | Timestamped close checklist + ERP period-lock audit screenshot |
| **`FIN-CC-06`** | **Tiered Human Sign-Off & MPM SoD** | Material JEs require tiered approval (Preparer ≠ Approver); any external Management-Defined Performance Measure (MPM, IFRS 18 ¶117) requires separate **MPM Owner + CFO/Disclosure sign-off** with tax & NCI reconciliation (¶121–123). | GL Preparer / FP&A | Controller (GL) & CFO / Disclosure Comm. (MPM) | Signed SoD matrix + single-note MPM reconciliation bridge |
| **`FIN-CC-07`** | **Dual-Calendar YTD & Accrual Bridge (`01-01–31-12` Fiscal vs. `01-07–30-06` Budget)** | Tag every recurring accrual, bonus/commission pool, and rate table with **both** `Statutory_Period (Jan–Dec)` and `Budget_Period (Jul–Jun)`; isolate `30-06` budget-close bonus/rebate true-ups with Day-1 reversals and reconcile **`H2 Prior Budget (Jan–Jun) + H1 Current Budget (Jul–Dec) = Statutory FY (Jan–Dec)`** to `€0.00` variance. | GL / FP&A Analyst | Corporate Controller | Dual-YTD reconciliation bridge (`€0.00` delta) + IFRS 18 mid-budget (`01-01-2027`) CoA mapping table |

---

## [CLIENT] 3. Baseline P&L & Balance Sheet Specification (RGP Legacy Structure)

| Close Domain | Standard Specification Rule (`$0` New Software) | IFRS 18 / Audit Control Check | Status |
| --- | --- | --- | --- |
| **Revenue Recognition Cutoffs** | Cut off billing/shipment/milestone feeds on Last Business Day (LBD); run automated deferred-revenue & unbilled-AR rollforward; flag any period-end contract amendments or side letters (`OP-FIN-012` cross-check). | Mapped to IFRS 18 `Operating`; ASC 606 / IFRS 15 cutoff evidence + zero unapproved manual top-side JEs. | ☑ Drafted *(tailor per client)* |
| **Payroll & Benefits Accrual Lines** | Lock core payroll on 23rd; tie HRIS gross-to-net to GL on 24th–25th (`FIN-CC-04`); book formulaic 23rd–LBD stub accrual (`FIN-CC-01`) with mandatory Day-1 auto-reversal (`FIN-CC-02`); align the **3 overlapping clocks** (`01-01` statutory tax/WKR/CLA reset, `Jun–May` Dutch *vakantiegeld*, and `01-07` company budget cost-rate/bonus reset — `FIN-CC-07`, feeding `OP-FIN-010`). | Payroll clearing = €0.00; employer taxes, pension, holiday, and split-year bonus accruals separated cleanly without `Jan–Jun` margin drift. | ☑ Drafted *(tailor per client)* |
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
