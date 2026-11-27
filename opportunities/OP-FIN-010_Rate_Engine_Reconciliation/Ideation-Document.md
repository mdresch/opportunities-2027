---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-FIN-010"
execution_track: "Track A — Advisory / Diagnostic (Tier A Flagship, Q3–Q4 2027 Scale-Out)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "2005–2006 Unified-Payroll Baseline Methodology (Menno Drescher IP); inventory-of-ideas.md (§1 Finance); Tier_A_Executive_Summary_2027.md"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-FIN-010`: Statutory-to-Contract Rate Engine & Revenue/CoS Reconciliation

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md), [Source-Documents.md](Source-Documents.md), and [BD-Quick-Reference.md](BD-Quick-Reference.md).

## 1. Problem Context & 2027 Market Trigger

Small-and-mid professional-services firms routinely price billable hours and report engagement margins using static, disconnected spreadsheets. A 7-layer statutory-to-contract waterfall (Global -> Country Tax/Social Security -> Sector -> CLA/CAO -> Entity -> Division/Department -> Employment Contract) plus Cost of Sales (CoS) benefit and asset allocations (company car, laptop, study allowance, flex-benefits schema, and individual cost exceptions) rarely reconciles to commercial sales rates, recognized Revenue, and actual CoS. As a result, CFOs and Practice Leads manage utilization and project margin on stale assumptions.

Two 2027–2028 triggers sharpen buyer urgency: persistent margin compression in consulting/services firms and the Dutch *Wet toekomst pensioenen* (Wtp) transition deadline (targeted January 2028 — verify current statutory cutoff from primary Dutch pension sources prior to client quoting), which forces statutory-to-contract payroll and pension cost modeling onto 2027 finance roadmaps.

### Buyer & Tier Positioning

- **Target Buyers:** CFOs, Controllers, and Practice Leads (Small & Mid professional-services firms).
- **Strategic Asset & Tier:** Tier A — Flagship (Q3–Q4 2027 scale-out) · Asset 1: **Financial Truth**.
- **Signature Toolkit:** `Financial Modeling, Planning & Analysis` (€2,500–€8,000 · 8–10 wks at `8–12 hrs/wk`).

## 2. Solution Architecture & Delivery Workflow

`OP-FIN-010` is sequenced behind a completed `OP-FIN-009` continuous-close pilot. It reconciles HR/statutory payroll reality into commercial Revenue and CoS truth across five workflow steps:

1. **7-Layer Policy & Exception Mapping:** Inventory Global, Country Tax/Social Security, Sector, CLA/CAO, Entity, Division/Dept, and Employment Contract rules with versioned effective-dating.
2. **CoS Benefit & Asset Inclusion Baseline:** Normalize non-base-salary employer burdens (company car inclusion, laptop, study budget, flex-benefits, individual exceptions) into a unified payroll baseline.
3. **Standard All-In Hourly CoS Rate Calibration:** Anchor rates to `1,500` net annual billable hours/year (`~72.1%` net billable utilization on a `2,080`-hr `52 x 40h` FTE year — `125.0` hrs/calendar month, or `115.38` hrs per 4-week / `144.23` hrs per 5-week `4-4-5` period).
4. **Revenue / CoS & WIP Separation Controls:** Tie hourly CoS rates to sales rates, Revenue, and CoS with Autonomous Accounting Readiness controls and `€0.00` monthly absorption-variance tie-out (`FIN-CC-10`), keeping GAAP/IFRS Revenue strictly separated from operational WIP until post-3rd close.
5. **Close & Q2C Integration Blueprint:** Connect `OP-FIN-009` (23rd payroll -> 3rd+ close) with `OP-OPS-002` (Quote-to-Cash) into an end-to-end P&L margin-truth operating model.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Archetype | Typical Packaging & Pricing | Target Buyer | CBa Consult Differentiation |
| --- | --- | --- | --- |
| **Big Four HR/Tax & Finance Transformation** | Multi-month advisory + ERP SI (€50k–€250k+) | Large enterprise CFO/CHRO | Conflict-free, fixed-scope €2,500–€8,000 diagnostic tailored to Small & Mid services firms without multi-year ERP lock-in. |
| **PSA / ERP Vendors (Kimble, Kantata, Exact, AFAS)** | Annual SaaS license + implementation | Mid-market IT / Ops | Vendors sell software configuration; CBa fixes the underlying statutory-to-CoS mathematical baseline and accounting tie-out first. |
| **Payroll Bureaus & Generic AI Templates** | Monthly payslip runs or static Excel sheets | HR / Payroll Admins | Payroll bureaus stop at gross-to-net statutory filings; CBa bridges statutory payroll through to billable-hour CoS and `€0.00` absorption variance. |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance & Availability | Coverage Role | Gaps / Pre-Pilot Actions Required |
| --- | --- | --- | --- |
| **2005–2006 Unified-Payroll Baseline IP** | Menno Drescher personal IP (initiated 1 Jan 2006) | Core company-car-to-payroll & unified CoS baseline logic (~75% conceptual IP) | Must be written up as a standalone reference doc (mirroring `OP-FIN-009` RGP write-up) before client/collaborator handoff. |
| **`OP-FIN-009` Close Bridge (`FIN-CC-10`)** | Related Tier A workspace (`OP-FIN-009`) | `1,500`-hr benchmark, `4-4-5` cadence, `€0.00` absorption tie-out | Sequence `OP-FIN-010` behind a completed `OP-FIN-009` pilot; do not launch cold. |
| **`BD-Quick-Reference.md`** | Sibling local BD index | Local CBa BD evidence pointers (outside git) | Extract anonymized case proof for Stage 2 buyer outreach. |
| **`Source-Documents.md`** | Sibling manifest | Confirms `0` ADPA `.docx` files assigned | Governed via `inventory-of-ideas.md`, `Tier_A_Executive_Summary_2027.md`, and personal IP. |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Not Formal Tax/Legal Opinion or Statutory Payroll Filing:** CBa Consult designs the rate-reconciliation logic and control model; licensed tax/legal advisors and payroll processors validate jurisdiction-specific statutory filings and Wtp pension plan amendments.
- **Not a Custom ERP/PSA Software Build:** Delivered on existing client spreadsheets, BI, or ERP exports under `` `$0` `` initial working capital.
- **Sequencing Guardrail:** Do not initiate standalone delivery until `OP-FIN-009` is piloted and close cadence is stabilized.

### Stage 1b Gate (`G1b`) Checklist

- [ ] Write up the 2005–2006 unified-payroll baseline methodology as a standalone internal reference doc.
- [ ] Verify current Dutch Wtp Jan 2028 statutory guidance from primary sources prior to client quoting.
- [ ] Confirm `OP-FIN-009` pilot traction before registering Stage 2 `HYP-2027-NNN` rows.

### Quantitative Baseline Anchors (`FIN-CC-10` Alignment)

- **Annual Billable Benchmark:** `1,500` net billable hours/year (`~72.1%` net utilization on a `2,080`-hr `52 x 40h` FTE year).
- **Period Cadence Equivalence:** `125.0` hrs/calendar month, or `115.38` hrs per 4-week / `144.23` hrs per 5-week `4-4-5` fiscal period.
- **Monthly Control Target:** `€0.00` unexplained monthly absorption variance between statutory payroll/CoS inputs and recognized engagement CoS.
- **Downstream Bridge:** Connects directly into `OP-OPS-002` (Quote-to-Cash) and `OP-STR-004`/`OP-STR-005` (M&A/PMI payroll & pension harmonization).
