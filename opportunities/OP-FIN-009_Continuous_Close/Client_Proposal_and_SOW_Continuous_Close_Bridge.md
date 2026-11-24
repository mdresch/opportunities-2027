# Client Proposal & Fixed-Scope Statement of Work: Continuous Close & Real-Time Reconciliation Bridge

**Prepared for:** Chief Financial Officer & Corporate Controller  
**Prepared by:** Menno Drescher, Director — CBa Consult  
**Date:** November 2026  
**Engagement Type:** Fixed-Scope Advisory & Close-Control Implementation (Zero New Software Licenses Required)

---

## 1. Executive Summary & Target Outcomes

Mid-market finance teams routinely lock payroll around the 23rd of each month, yet still spend 6 to 10+ business days after month-end resolving clearing breaks, manual accruals, mismatched `4-4-5` weekly revenue vs. monthly salaried payroll, late subcontractor invoices, and divergent **Statutory Fiscal (`01-01–31-12`)** vs. **Company Budget (`01-07–30-06`)** reporting calendars. With **IFRS 18** officially EU-endorsed (13 February 2026) and mandatory for annual periods beginning **1 January 2027**, unwatermarked "flash" KPIs also expose finance teams to statutory-audited **Management-Defined Performance Measure (MPM, ¶117)** disclosures and **Cost-of-Sales-by-nature (¶78–83)** audit findings.

Using your **existing ERP, HRIS, bank feeds, and BI stack (\$0 new close-software spend)**, CBa Consult bridges your **23rd payroll lock** to an **attested monthly close within ≤2–3 business days post-3rd** with **€0.00 payroll clearing variance** — deploying a battle-tested, exception-based Continuous Close architecture originally proven in multi-entity European consulting operations.

| Target Metric | Baseline State (Typical) | Post-Engagement Target |
| --- | --- | --- |
| **Post-3rd Close Speed** | 6–10+ business days after month-end | **≤2–3 business days post-3rd** |
| **Payroll Clearing Variance** | Recurring open balances & manual true-ups | **€0.00 clearing variance** (24th–25th HRIS sync) |
| **Close-Week Exception Load** | ~80% time checking zero-variance accounts | **Exception-only review** (normalized >5% breaks) |
| **New Close-Software Spend** | €50k–€150k+ BlackLine / FCCS / Workiva | **\$0 new software** (runs on existing ERP & BI) |

---

## 2. The Three Financial Truth Pillars (Ten Built-In Close & Audit Guardrails)

Rather than adding manual spreadsheets, the engagement embeds **10 structured close guardrails (`FIN-CC-01`–`10`)** across three plain-English CFO pillars:

| Pillar | Guardrails Included | What This Fixes for Your P&L & External Audit |
| --- | --- | --- |
| **Pillar 1 · Close Speed, Automated Accruals & SoD** | `FIN-CC-01` to `FIN-CC-06`: 23rd–cutoff delta formulas, mandatory **Day-1 auto-reversals**, working-day normalized `>5%` MRC alerts, 24th–25th HRIS-to-GL sync, sequenced dependency gates, tiered Preparer ≠ Approver sign-off | Eliminates double-counted reversals, late adjusting journal entries (AJEs), and recurring external-auditor findings around undocumented Management Review Controls (MRCs) and Segregation of Duties (SoD). |
| **Pillar 2 · Dual-Calendar & `4-4-5` Margin Truth** | `FIN-CC-07` & `FIN-CC-08`: Dual period tagging (`01-01–31-12` Fiscal vs. `01-07–30-06` Budget), `31-12` / `30-06` stub-day bridge, `4-4-5` (`20/20/25` working-day) salaried CoS proration & Vacation Liability drawdown | Ends the artificial Gross Margin sawtooth between 4-week and 5-week periods, reconciles `H2 Prior Budget + H1 Current Budget = Statutory FY` to `€0.00`, and prevents June bonus/rebate accruals from distorting Q3 P&L. |
| **Pillar 3 · WIP, Subcontractors, `1,500`-Hr CoS & IFRS 18** | `FIN-CC-09` & `FIN-CC-10`: Simultaneous Unbilled WIP Revenue & Unvouchered Subcontractor CoS cutoff, **`1,500`-hr/yr Standard CoS Rate** (`115.38h`/`144.23h` `4-4-5`) tied to actual HRIS payroll (`€0.00` delta), IFRS 18 ¶78–83 Nature & ¶117 MPM watermarking | Prevents Fixed-Price `% of Completion` (`EAC`) revenue distortion, isolates unabsorbed bench vs. over-absorption, ties CoS + SG&A Employee Benefits cleanly to HRIS, and shields internal flash KPIs from unintended ¶117 MPM audit scope. |

---

## 3. Eight-Week Sprint Timeline & Milestone Acceptance

| Sprint Window | Phase | Key Workshops & Activities | Deliverable & Acceptance Gate |
| --- | --- | --- | --- |
| **Weeks 1–2** | **Baseline & 23rd→3rd+ Critical Path** | Execute 25-control Continuous Close diagnostic; map current close path from 23rd payroll lock to post-3rd publication; inventory manual JEs, clearing breaks & calendar gaps. | **1. Close Calendar & Dependency Gate Blueprint** *(reviewed within 5 business days)* |
| **Weeks 3–4** | **Accrual, `4-4-5` & CoS Matching Playbook** | Configure all 10 guardrails (`FIN-CC-01`–`10`): 23rd–cutoff deltas, Day-1 auto-reversals, normalized `>5%` alerts, 24th–25th HRIS sync, dual-calendar & `4-4-5` CoS proration, simultaneous WIP + Subcontractor accrual, and `1,500`-hr absorption tie-out. | **2. Automated Accrual & Revenue-vs.-CoS Playbook** *(Option A concludes at Week 4)* |
| **Weeks 5–6** | **IFRS 18, Official KPIs & SoD Matrix** | Watermark provisional Days 23–3 views; lock Official Real-Time KPI whitelist; map IFRS 18 Operating Profit subtotals, ¶78–83 Nature tie-out & ¶117 MPM owner separation; enforce GDPR payroll PII masking. | **3. GAAP / IFRS 18 + SoD & Official KPI Matrix** |
| **Weeks 7–8** | **Live Monthly Close Dry-Run & Handover** *(Option B)* | Shadow one live monthly close cycle (23rd through 3rd+); verify `≤2–3` business-day close & `€0.00` payroll clearing variance; train Controller & GL team; close open exceptions. | **4. Live Dry-Run Validation Report & Team Handover** *(5-business-day acceptance)* |

*Milestone Acceptance Rule:* Each deliverable is deemed accepted if Client provides written sign-off or raises no material scope discrepancy within **5 business days** of delivery.

---

## 4. Client vs. CBa Consult RACI & Weekly Time Commitment

Designed specifically so your finance team is **never overloaded during month-end close**:

| Role | Responsibilities (`R / A / C / I`) | Expected Effort |
| --- | --- | --- |
| **Client CFO / Finance Director** | Executive Sponsor (**Accountable**); approves IFRS 18 MPM policy, KPI whitelist & final SOW milestones. | **0.5 – 1.0 hr / week** |
| **Client Corporate Controller** | Operational Lead (**Consulted / Sign-Off**); joins baseline & close-gate workshops and validates live dry-run results. | **2.0 – 3.0 hrs / week** |
| **Client Payroll & GL Leads** | Subject-Matter Inputs (**Consulted**); provide anonymized clearing reconciliations, HRIS cutoffs & ERP workflow walkthroughs. | **1.0 – 2.0 hrs / week** |
| **Client IT / BI Admin** | Read-Only Data Exports (**Informed / Consulted**); grants read-only/sandboxed close calendar & report exports (no custom coding). | **0.5 – 1.0 hr total** |
| **CBa Consult (Menno Drescher)** | Lead Architect & Delivery (**Responsible**); executes diagnostic, authors blueprints/matrices & shadows live dry-run. | **6.0 – 10.0 hrs / week** |

---

## 5. Two Fixed-Scope Commercial Options

| Option | Scope & Deliverables Included | Duration | Fixed Investment & Billing |
| --- | --- | --- | --- |
| **Option A — Close Diagnostic & Guardrail Blueprint** | Deliverables 1–3: Baseline Close Blueprint, 10-Guardrail Accrual & Revenue/CoS Playbook, and IFRS 18 + SoD Control Matrix *(Client executes live dry-run internally)*. | **4 weeks** | **€1,750 – €2,500** *(fixed fee)*<br>50% on SOW signature · 50% at Week 4 delivery |
| **Option B — Full Continuous Close Bridge + Live Dry-Run** *(Recommended)* | Deliverables 1–4: Full Option A blueprint **plus** CBa Consult shadowing one live 23rd→3rd+ close cycle, verifying `€0.00` payroll clearing delta, and hands-on Controller handover. | **6–8 weeks** | **€4,000 – €5,000** *(fixed fee)*<br>50% on SOW signature · 50% at Week 8 Dry-Run sign-off |

*Optional Phase 2 Continuations (scoped separately after Executive Readout):* 7-Layer Statutory-to-Contract Rate Engine (`1,500`-hr all-in CoS reconciliation), Pre-Audit Findings & Side-Letter Readiness, or ongoing Monthly Intelligence & Governance Stewardship.

---

## 6. Explicit Scope Boundaries, Auditor Independence & GDPR Protection

To protect both parties and ensure **zero regulatory or audit conflicts**:

1. **100% Conflict-Free Advisory (Auditor Independence):** CBa Consult is not a statutory audit firm and delivers management-readiness controls and close-process design only. Your external statutory auditor retains full independence and sole authority over the audit opinion; legal/tax counsel retains formal tax and statutory-filing sign-off.
2. **Zero New Close-Software Procurement:** All deliverables operate on your existing ERP, HRIS, bank feeds, and BI stack; no FCCS, BlackLine, or third-party license purchase is included or required.
3. **Configuration Over Custom Software Engineering:** Scope covers close calendars, accrual formulas, ERP configuration rules, and reconciliation templates — not custom API software development.
4. **GDPR & Payroll PII Minimization:** No individual employee salaries, bank IBANs, or household tax details leave your tenant. Analysis uses aggregated/anonymized payroll clearing totals, role-level standard rates (`1,500`-hr model), and policy rules only.

---

## 7. Authorization & Statement of Work Sign-Off

| For Client Organization | For CBa Consult |
| --- | --- |
| **Selected Option:** ☐ Option A (`€1,750–€2,500`) &nbsp; ☐ Option B (`€4,000–€5,000`) | **Advisor:** Menno Drescher, Director — CBa Consult |
| **Name & Title:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | **Signature:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
| **Signature & Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | **Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ |
