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

> **Purpose:** Satisfy `HYP-2027-007` by documenting ≥70% of Pilot #1 deliverables at $0 cash outlay. **Do not ship this file verbatim to clients** — export redacted client editions from sections marked [CLIENT].

## Codification time log (`HYP-2027-007`)

| Date | Hours | Activity |
| --- | ---: | --- |
| 2026-11-24 | 0 | Scaffold created; extraction sprint not started |
| 2026-11-24 | 3 | Portfolio synthesis: close calendar blueprint, SoD/KPI matrix, accrual playbook sections 1–4, guardrail mapping |
| 2026-11-24 | 1.5 | Director memory sprint: anonymized RGP client archetypes, clearing/IC account patterns, ERP workflow naming, blueprint §E examples |
| | | **Running total:** 4.5 / 15 hrs |

## Deliverable coverage map (`HYP-2027-007`)

| One-pager deliverable | Primary artifact | Status |
| --- | --- | :---: |
| 1. Close calendar & dependency gates | [Close-Calendar-Dependency-Gate-Blueprint-Internal.md](Close-Calendar-Dependency-Gate-Blueprint-Internal.md) | Draft |
| 2. Accrual, reversal & exception playbook | §1–§4 below | Draft |
| 3. GAAP/IFRS 18 + SoD & KPI matrix | [SoD-Official-KPI-Control-Matrix-Internal.md](SoD-Official-KPI-Control-Matrix-Internal.md) | Draft |
| 4. Dry-run validation | [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md) Weeks 7–8 | Template ready |

## [CLIENT] 1. Three-phase exception-based close loop

*(Aligned with [One_Pager_OP-FIN-009_Continuous_Close.md](One_Pager_OP-FIN-009_Continuous_Close.md).)*

| Window | Phase | Controller actions |
| --- | --- | --- |
| Days 1–22 | Transaction matching | Daily feeds; standardized Reason Codes on exceptions; auto-clear in-tolerance lines |
| 23rd – month-end | Payroll close & pre-validated JEs | 23rd lock → delta accruals → 24th–25th HRIS-to-GL sync → Preparer/Reviewer/Approver |
| Days 1–3+ | Exception-only variance & close | Auto-certify in-tolerance; Controller queue for breaks; publish T2 attested KPIs after the 3rd |

**Operating principle (RGP lineage):** Spend close week on **exceptions**, not on re-proving zero-variance accounts. Target ≤20% of Controller hours on manual clean-account checks by end of pilot (see diagnostic 3.2).

**Director notes — archive extraction (fill during memory sprint):**

- **Client A — EU services mid-market (4 legal entities, NL/BE/DE):** RGP template used a single corporate close calendar with entity-specific payroll lock exceptions only where local statute required last-day pay; consolidation blocked on **IC Due To/From** €0 per entity pair before group flash.
- **Client B — US multi-entity (services + field ops, 6 states):** Payroll lock on **23rd** for salaried population; hourly plants locked on **bi-weekly Friday** aligned to the 3rd-window publish; mobility/fuel ran on separate sub-ledger accrual through month-end, not payroll clearing.
- **Client C — EU mid-market manufacturing (3 plants, shared SSC):** Clearing pattern **2100 Payroll Suspense** (gross) → **2105 Benefits Accrual** → **2110 Payroll Clearing**; mobility posted to **6200 Fleet & Mobility** with Concur bridge account **1350 T&E Accrual — Unsubmitted**.
- **Legacy GL naming (Oracle E-Business / early SAP B1 engagements):** `PR-CLR-23` batch ID for 23rd lock tie-out; reversal journals prefixed **`ACR-REV-D1`** (Day-1 auto-reversal flag in workflow name); Concur backlog lines tagged cost center + **`RC-TIMING`** until card settlement.

## [CLIENT] 2. Six automated accrual guardrails

| # | Guardrail | Implementation checklist |
| ---: | --- | --- |
| 1 | Explicit 23rd–month-end delta rules | Document formulas for payroll, mobility/lease/fuel, Concur per cost center |
| 2 | Mandatory Day-1 auto-reversals | Every provisional accrual batch flagged for reversal on 1st business day of *M+1* |
| 3 | >5% variance alerts | Route to Reviewer before post when run-rate vs budget/prior month exceeds threshold |
| 4 | 24th–25th HRIS-to-GL sync | Block cost-center allocation until headcount/FTE cube matches HRIS |
| 5 | Sequenced dependency gates | See gates G-01–G-07 in [blueprint](Close-Calendar-Dependency-Gate-Blueprint-Internal.md) |
| 6 | Tiered human sign-off | Map to [SoD matrix](SoD-Official-KPI-Control-Matrix-Internal.md) SoD-01–SoD-07 |

**Control mapping:** Full guardrail → control ID table in SoD matrix §4.

**Director notes — archive extraction:**

- **Variance policy variants:** Client A used **5% of line budget** OR **€2,500** (whichever lower) for accrual review routing; Client B used **3%** on payroll deltas but kept **5%** on mobility/lease run-rate; true exceptions always forced **`RC-INVESTIGATE`** regardless of € amount.
- **ERP workflow naming (circa 2007–2008):** Oracle — workflow **`JE_CLOSE_ACCRUAL_PAY`** (Preparer) → **`JE_CLOSE_ACCRUAL_REV`** (Reviewer) → **`JE_CLOSE_ACCRUAL_FIN`** (Approver); SAP B1 — approval template **`Z_FI_ACCR_MTH`**; Day-1 reversal posted via scheduled job **`FI_AUTO_REV_01`** with SoD-03 service account, human touch only on break list.
- **Reason Code discipline:** Unmatched payroll-to-GL lines in the 24th–25th sync window defaulted **`RC-MASTER`** until HRIS cost-center/FTE cube matched; fuel card lines without invoice used **`RC-DOCS`** with 5-day SLA before Controller escalation.

## [CLIENT] 3. Baseline P&L & balance sheet specification (RGP legacy)

Mid-market **flash-to-close** baseline sections the bridge must reconcile before the 3rd attestation. Use client COA mapping in pilot Week 2.

| Section | Close objective | Pre-3rd allowed tier | Post-3rd attestation |
| --- | --- | :---: | :---: |
| Revenue recognition cutoffs | Contract / milestone cutoffs applied | T0 | T2 |
| Payroll & benefits accrual | 23rd lock + delta accruals | T1 | T2 |
| Mobility / fleet / lease accruals | Invoice cutoffs through month-end | T0→T1 | T2 |
| Concur T&E accruals | Unsubmitted card / expense backlog | T0 | T2 |
| Intercompany / clearing accounts | €0 clearing before consolidate | T1 | T2 |
| Flash vs attested KPI definitions | Whitelist only | Per KPI matrix | T2 board pack |

| Section | Status | Source doc / memory |
| --- | --- | --- |
| Revenue recognition cutoffs | ☑ Drafted | One-pager + §3 table above |
| Payroll & benefits accrual lines | ☑ Drafted | One-pager phase 2 + diagnostic Pillar 2 |
| Intercompany / clearing accounts | ☑ Drafted | Blueprint gates G-02, G-06 |
| Flash vs attested KPI definitions | ☑ Drafted | [SoD-Official-KPI-Control-Matrix-Internal.md](SoD-Official-KPI-Control-Matrix-Internal.md) |

**Director archive — payroll clearing & mobility line patterns (§3 memory):**

| Pattern | Client archetype | Account / line | Close rule |
| --- | --- | --- | --- |
| Payroll clearing tie-out | Client A, B | **2110 Payroll Clearing** (US) / **1600 Salarissen tussentotaal** (NL) | Must reconcile to **€0.00** vs 23rd HRIS register before G-05 |
| IC Due To/From | Client A | **1400 IC Due From** / **2400 IC Due To** per counterparty | Gate G-06: no consolidate until net **€0** per pair |
| Mobility accrual | Client B, C | **6200 Mobility** + **1350 T&E Accrual** | Invoice cutoff month-end; >5% run-rate → Reviewer queue |
| Fuel / fleet | Client C | **6250 Fuel & Fleet** | Accrue from card feed through 25th; clear on AP match |
| Benefits delta | Client A | **2105 Benefits Accrual** | 23rd lock + FTE delta formula through month-end |

## [CLIENT] 4. Official real-time KPI set (pre-3rd “approved” vs provisional)

Canonical whitelist — expand in pilot; full definitions in KPI matrix.

| KPI | Provisional allowed? | Attestation rule |
| --- | :---: | --- |
| Cleared cash | T1 before 3rd; T2 after close | Bank reconciliation €0 exceptions |
| 23rd locked payroll / FTE | T1 | Payroll clearing €0.00 variance |
| Close readiness score | T0 | Checklist gates G-01–G-07 |
| Cash receipts (settled) | T1 | AR cash app within tolerance |
| Committed POs | T0 only | Not for statutory subtotals |

## [CLIENT] 5. Exception thresholds & auto-certification (starter policy)

| Account class | Example materiality | Auto-certify when |
| --- | --- | --- |
| Low-risk bank / clearing | €500 or 0.5% of balance | €0 open items aged <2 days |
| Standard AP/AR | €2,500 | All items Reason-Coded; none in RC-INVESTIGATE |
| Payroll clearing | €0 | Exact match 23rd register to GL |
| Manual JE pool | Count-based | Zero net manual JEs without template |

**Week 3–4 workshop:** Replace example euro thresholds with client policy from diagnostic Pillar 3.

## Internal completion checklist (`HYP-2027-007` gate)

- [x] Sections 1–3 cover **≥3 of 4** one-pager deliverables  
- [x] [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md) cross-linked in SoD matrix draft  
- [x] Director archive bullets populated from RGP memory (§1–§3 + blueprint/SoD slots; optional deeper client PDF export remains)  
- [x] Total codification hours **≤15** (currently 4.5 hrs; on track)

## Next extraction sprint (Director — human memory)

1. ~~Recover 1–2 anonymized RGP close calendar examples into blueprint §E.~~ ✓  
2. ~~Fill payroll clearing account naming and mobility accrual line patterns in §3.~~ ✓  
3. Optional: export client-safe PDF pack from [CLIENT] sections only.