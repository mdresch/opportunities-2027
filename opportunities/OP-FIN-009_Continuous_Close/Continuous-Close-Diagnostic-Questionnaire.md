---
opportunity_id: "OP-FIN-009"
artifact_type: "Domain Diagnostic & Close Bottleneck Questionnaire"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Continuous Close & Reconciliation Bridge Diagnostic (`OP-FIN-009`)

Score each of the **25 diagnostic controls** (`1` to `5`) using verifiable close artifacts (close calendar, GL clearing aging, JE logs, BI dashboards, SoD matrices):

| Score | Maturity Level | Evidence Standard |
| :---: | :--- | :--- |
| **1** | **Ad Hoc / Fire Drill** | Manual spreadsheets, post-month-end batch reconciliations, >8 business days close, frequent post-close adjustments. |
| **2** | **Calendarized Manual** | Documented checklist exists, but 80%+ of effort still spent manually verifying clean zero-variance accounts. |
| **3** | **Standardized Pre-Close** | 23rd payroll-to-GL bridge defined, standard Reason Codes used, basic accrual templates in place. |
| **4** | **Exception-Based Continuous** | Daily auto-matching (Days 1–22), automated Day-1 accrual reversals, threshold-based auto-certification. |
| **5** | **Attested Continuous Truth** | ≤2–3 business days post-3rd close, €0.00 payroll/clearing variance, full IFRS 18 + SoD + GDPR/PII compliance. |

---

## Pillar 1 — 23rd → 3rd+ Close Calendar & Dependency Gates *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **1.1** | Is the monthly close calendar anchored explicitly to the **23rd payroll lock** and **3rd+ publication**? | Close calendar & critical path | |
| **1.2** | Are bank, AP, AR, and corporate-card feeds matched daily (Days 1–22) rather than queued to month-end? | Sub-ledger clearing aging report | |
| **1.3** | Is HRIS-to-GL master data synchronized on a fixed **24th–25th** cadence before accruals run? | HRIS/ERP sync log | |
| **1.4** | Are hard dependency gates enforced so downstream consolidations cannot run on uncertified sub-ledgers? | Close checklist sign-off trail | |
| **1.5** | What is the current average business-day close duration after the 3rd (target: ≤2–3 days)? | Last 6 months close timestamps | |

## Pillar 2 — Automated Accrual & Day-1 Reversal Guardrails *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **2.1** | Are 23rd-to-month-end delta accrual rules explicitly documented (payroll, mobility/fuel/lease, Concur)? | Accrual policy & calculation sheet | |
| **2.2** | Are **mandatory Day-1 auto-reversals** enforced on all provisional accruals to prevent double-counting? | ERP auto-reversal JE log | |
| **2.3** | Do automated alerts trigger whenever an accrual deviates >5% from historical run-rate or budget? | Variance threshold alert config | |
| **2.4** | Are unmatched clearing items tagged with standardized Reason Codes and aged SLA owners? | Open-item aging by Reason Code | |
| **2.5** | Is payroll clearing reconciled to **€0.00** variance prior to publishing monthly financials? | Last 3 payroll clearing recs | |

## Pillar 3 — Exception-Only Variance & Auto-Certification
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **3.1** | Are materiality/tolerance thresholds defined so low-risk zero-variance accounts auto-certify? | Auto-certification threshold policy | |
| **3.2** | What percentage of Controller close time is spent on true exceptions vs. clean accounts? | Close effort breakdown | |
| **3.3** | Are recurring manual JEs tracked and targeted for template/automation conversion each quarter? | Manual JE volume trend | |
| **3.4** | Are intercompany eliminations and FX revaluations pre-checked before Day 1? | IC reconciliation pre-close log | |
| **3.5** | Are post-close audit adjustments tracked by root cause to eliminate repeat breaks? | Post-close adjustment register | |

## Pillar 4 — Provisional vs. Attested Reporting & IFRS 18 Readiness
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **4.1** | Are all intra-month operational BI views clearly watermarked `Provisional / Pre-Close`? | BI dashboard screenshot proof | |
| **4.2** | Is there an explicit whitelist of **Approved Real-Time Official KPIs** (Cleared Cash, 23rd Locked Payroll/FTE, Committed POs)? | Official KPI governance table | |
| **4.3** | Are P&L categories and Management-Defined Performance Measures (MPMs) mapped for **IFRS 18 (Jan 2027)**? | IFRS 18 chart-of-accounts mapping | |
| **4.4** | Are flash-to-actual reconciliation bridges automatically published after the 3rd? | Flash vs. Official variance bridge | |
| **4.5** | Do board/management reports lock against finalized, immutable period-close snapshots? | ERP period-lock audit trail | |

## Pillar 5 — Segregation of Duties (SoD) & Payroll PII / GDPR Controls
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **5.1** | Is strict **Preparer → Reviewer → Approver** SoD enforced on all JEs and accrual rule changes? | ERP role/SoD access matrix | |
| **5.2** | Are rule authors prevented from approving their own rules or bypassing GL period locks? | Privileged access review log | |
| **5.3** | Do routine automated posting batches run under non-interactive service accounts (never personal logins)? | Service account posting log | |
| **5.4** | Is individual employee salary / household PII strictly masked/aggregated before entering company-wide BI? | BI data-masking & GDPR check | |
| **5.5** | Are all reconciliation approvals retained in an immutable audit trail for statutory auditors? | Audit trail retention check | |

---

## Top-10 P0 Continuous Close Red-Flag Triage
1. **No Day-1 auto-reversals** on provisional accruals (double-counting risk).
2. **Unreconciled payroll clearing balance** rolling forward across multiple months.
3. **Unwatermarked flash BI figures** contradicting post-3rd attested GAAP/IFRS reports.
4. **Same user prepares and posts JEs** without independent reviewer sign-off (SoD failure).
5. **Individual salary PII exposed** in shared finance/BI reporting cubes (GDPR breach).
6. **Zero IFRS 18 mapping** for 2027 operating/investing/financing subtotals and MPMs.
7. **>8 business days post-3rd** to close a standard non-quarter month.
8. **Personal admin credentials** executing scheduled ERP/BI integration jobs.
9. **No 24th–25th HRIS-to-GL sync**, causing late headcount/cost-center reclassifications.
10. **>50% of close hours spent** manually checking zero-variance accounts.
