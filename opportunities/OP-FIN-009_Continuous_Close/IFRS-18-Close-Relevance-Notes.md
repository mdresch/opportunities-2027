---
artifact: "tier-2-primary-source-check"
linked_spark_task: "Confirm IFRS 18 (Jan 2027) implications before client use"
last_reviewed: "2026-11-24"
review_status: "Primary-source confirmed (EU endorsement Feb 13, 2026; mandatory Jan 1, 2027)"
---

# IFRS 18 — Close & KPI Relevance Notes (Verified Primary-Source Check)

> **Scope:** Supports the **`OP-FIN-009`** Continuous Close control matrix, Chart-of-Accounts close mapping, and provisional vs. attested KPI governance — **not** statutory accounting advice (client's external auditor retains statutory opinion).

---

## 1. Verified Standard & EU Endorsement Status (2026–2027)

- **Standard:** **IFRS 18** *Presentation and Disclosure in Financial Statements* supersedes **IAS 1** for annual reporting periods beginning **on or after 1 January 2027** (comparative 2026 periods must be restated, making 2026 the critical "shadow year").
- **EU Endorsement Confirmed:** Officially endorsed by the European Union on **13 February 2026** (published in the Official Journal on **16 February 2026**), making IFRS 18 legally binding for EU IFRS preparers on 1 January 2027.

---

## 2. Three Structural Changes Directly Impacting `OP-FIN-009`

1. **Five Mandatory P&L Categories & Standardized Operating Profit:**
   - Every income and expense line must classify into one of five categories: **Operating**, **Investing**, **Financing**, **Income Taxes**, and **Discontinued Operations**.
   - **Operating profit or loss** (and **Profit or loss before financing and income taxes**) become mandatory standardized subtotals — requiring Chart-of-Accounts (CoA) re-mapping and strict close-cutover validation so payroll, FX, and accrual JEs land in the exact IFRS 18 category.
2. **Management-Defined Performance Measures — MPMs (Paragraphs 117 & 121–123):**
   - Per **¶117**, any subtotal of income and expenses (e.g., *Adjusted EBITDA*, *Adjusted Operating Profit*) used in **public communications outside the financial statements** that communicates management's view and is not an IFRS-specified subtotal is legally an **MPM** and enters the **scope of the statutory audit**.
   - Per **¶121–123**, all MPMs must be disclosed in a **single audited note** with a full reconciliation to the most directly comparable IFRS 18 subtotal — including the **income tax effect** and **non-controlling interest (NCI) effect** for every reconciling item, plus explicit justification for any definition change.
3. **Enhanced Aggregation & Disaggregation (Labeling Discipline):**
   - Eliminates opaque "Other expenses" buckets in close packages; requires clean underlying sub-ledger reason codes during Days 1–22 transaction matching.
4. **Mid-Budget IFRS 18 Cutover & `4-4-5` Calendar Traps (`01-01–31-12` Fiscal vs. `01-07–30-06` Budget vs. `4-4-5` Ops):**
   - Multi-entity groups running a **`01-07 – 30-06` Company Budget Year** alongside a **`01-01 – 31-12` Statutory Fiscal Year** hit mandatory IFRS 18 adoption on **`01-01-2027` right at Month 7 (`H2`) of their active `BY26/27` budget year**.
   - Groups also running **`4-4-5` (`28/28/35`-day) operational periods** face two additional IFRS 18 audit triggers: (a) non-month-end Friday cutoffs require a documented **1–5 day `31-12` Stub-Day Revenue & CoS Bridge**, and (b) stripping out the periodic **53rd leap week** to present *"52-week comparable Operating Profit"* externally creates a **statutory-audited MPM under ¶117** requiring full ¶121–123 tax & NCI reconciliation.
5. **Cost of Sales *By Function* vs. Mandatory *By Nature* Note (Paragraphs 78–83):**
   - Entities presenting **Cost of Sales** (by function) to show **Gross Profit** under IFRS 18 `Operating` must (a) enforce strict, consistent policy boundaries between **Billable Direct CoS** and **Bench/Internal SG&A** (no ad-hoc shifting of bench time or `30-06` bonus true-ups), and (b) disclose specified expenses **by nature** (total employee benefits, depreciation, amortization) in a **single audited note** — requiring a monthly `€0.00` tie-out between HRIS payroll and `CoS Employee Benefits + SG&A Employee Benefits`.

---

## 3. Concrete Design Rules for `OP-FIN-009` Delivery & SoD Matrix

| Control Area | Mandatory `OP-FIN-009` Playbook Rule | Cross-Link |
| --- | --- | --- |
| **Provisional Dashboard Watermarking (Days 23–3)** | Every flash KPI published before Day-3+ sign-off MUST carry an explicit watermark (`PROVISIONAL — INTERNAL MANAGEMENT VIEW ONLY · NOT AN IFRS 18 SUBTOTAL OR PUBLIC MPM`) to prevent accidental ¶117 public MPM scope. | [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) §4 |
| **CoA Category, Function & Nature Tagging** | Every automated accrual, `4-4-5` proration, and Day-1 auto-reversal (`FIN-CC-01`/`02`/`08`/`09`) must carry IFRS 18 **Category** (`Operating`), **Function** (`CoS` vs. `SG&A`), and **Nature** (`Employee Benefits` vs. `Subcontractors`, ¶78–83) tags. | [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) §2–§3 |
| **Segregation of Duties (MPM vs. GL Close)** | The **SoD Matrix** must separate the **GL Close Preparer/Approver** from the **MPM Definition & Tax/NCI Reconciliation Owner** (including 53-week comparable adjustments under ¶117/¶121–123). | Links directly to `OP-FIN-012` |
| **Dual-Calendar, `4-4-5` CoS Proration & Stub Bridge (`FIN-CC-07`–`09`)** | Reconcile `01-07–30-06` Budget vs. `01-01–31-12` Statutory (`H2+H1 = FY`), bridge `4-4-5` `31-12` stub days, prorate monthly salaried CoS across `20/20/25` working days (`FIN-CC-08`), and lock WIP Revenue + Unvouchered Subcontractor CoS simultaneously before Fixed-Price `% of Completion` (`FIN-CC-09`). | [RGP-23rd-to-3rd-Playbook-Internal.md](RGP-23rd-to-3rd-Playbook-Internal.md) §2 (`FIN-CC-07`–`09`) |

---

## 4. Primary Sources Verified

| Source | Reference |
| --- | --- |
| IFRS Foundation — IFRS 18 standard & project page | https://www.ifrs.org/issued-standards/ifrs-18-presentation-and-disclosure-in-financial-statements/ |
| EU Endorsement (13 Feb 2026; OJ 16 Feb 2026) | European Commission / IAS Plus endorsement tracker (mandatory 1 Jan 2027) |
| IFRS 18 ¶117, ¶121–123 (MPM definition, single-note reconciliation, tax & NCI effects) | IFRS Foundation / Big Four IFRS 18 implementation guidance (EY, PwC, KPMG 2025–2026) |

---

## 5. Review Log

| Date | Reviewer | Result |
| --- | --- | --- |
| 2026-11-24 | Menno Drescher | Initial primary-source pointers recorded. |
| 2026-11-24 | Menno Drescher (with primary-source verification) | **Confirmed:** EU endorsement (Feb 13, 2026), 5 P&L categories, mandatory Operating Profit subtotal, and ¶117 / ¶121–123 audited MPM reconciliation rules mapped into `OP-FIN-009` Playbook §2–§4. |
