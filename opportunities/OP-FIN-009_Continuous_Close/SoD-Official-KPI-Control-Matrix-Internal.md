---
artifact: "internal-control-matrix"
classification: "CBa Consult — internal; export redacted [CLIENT] sections under NDA"
linked_hypothesis: "HYP-2027-007"
linked_deliverable: "GAAP / IFRS / IFRS 18 + SoD & Official Real-Time KPI Control Matrix"
cross_reference: "IFRS-18-Close-Relevance-Notes.md, Continuous-Close-Diagnostic-Questionnaire.md (Pillars 4–5)"
---

# [CLIENT] GAAP / IFRS / IFRS 18 + SoD & Official Real-Time KPI Control Matrix — `OP-FIN-009`

> **Usage:** Weeks 5–6 of [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md). Tailor control IDs, ERP role names, and KPI owners during Pilot #1. **Not statutory accounting advice.**

## 1. Provisional vs. attested reporting tiers

| Tier | Label (BI watermark) | Who may consume | Publishing rule |
| --- | --- | --- | --- |
| **T0 — Operational flash** | `Provisional / Pre-Close` | Ops & finance managers only | No board pack, no lender covenant, no external MPM |
| **T1 — 23rd-locked payroll truth** | `23rd Locked / Pre-Close` | Finance leadership | May share internally; not a statutory subtotal |
| **T2 — Attested close** | `Official / Post-3rd` | Board, auditors, lenders | Only after exception-only close sign-off |

**IFRS 18 bridge:** T2 numbers must reconcile to IFRS 18 P&L subtotals and disclosed MPM definitions. See [IFRS-18-Close-Relevance-Notes.md](IFRS-18-Close-Relevance-Notes.md).

## 2. Approved real-time official KPI whitelist (pre-3rd)

| KPI ID | Metric | Allowed tier before 3rd | Attestation owner | ERP / BI source | Auto-certify threshold (example) |
| --- | --- | :---: | --- | --- | --- |
| **KPI-01** | Cleared cash (bank-settled) | T1→T2 | Treasury / Controller | Bank feed + cash sub-ledger | €0 unreconciled items >2 business days |
| **KPI-02** | Cash receipts (settled) | T1 | AR Manager | AR cash application | Within 0.5% of bank deposit |
| **KPI-03** | 23rd locked payroll / FTE | T1 | Payroll / Controller | HRIS payroll register @ 23rd lock | €0 payroll clearing variance |
| **KPI-04** | Committed POs (open qty × price) | T0 | Procurement | ERP PO module | N/A (operational only) |
| **KPI-05** | Close readiness score | T0 | Controller | Close checklist automation | ≥90% gates green |
| **KPI-06** | Utilization / capacity (if in scope) | T0 | Ops finance | Time / billing sub-ledger | Policy-defined |

**Client tailoring column (Pilot #1):** *[add/remove rows; never promote T0 metrics to board packs without T2 bridge.]*

## 3. Segregation of duties (SoD) — close & accrual chain

| Control ID | Activity | Preparer | Reviewer | Approver | Rule author | System enforcement |
| --- | --- | :---: | :---: | :---: | :---: | --- |
| **SoD-01** | Daily sub-ledger matching (Days 1–22) | Staff accountant | Lead accountant | — | — | Reason Code required on exceptions |
| **SoD-02** | 23rd payroll accrual batch | Payroll accountant | Controller delegate | Corporate Controller | — | ERP workflow; no self-approve |
| **SoD-03** | Day-1 auto-reversal batch | *System (service acct)* | Lead accountant | — | Rule author | Mandatory reversal flag |
| **SoD-04** | Accrual rule / threshold change | — | Controller | Corporate Controller | Finance systems lead | Rule author ≠ approver |
| **SoD-05** | GL period lock / unlock | — | — | Corporate Controller | — | No rule author lock bypass |
| **SoD-06** | Official KPI whitelist change | Finance systems lead | Controller | Corporate Controller | — | Change log + effective date |
| **SoD-07** | BI publish to board pack | Reporting analyst | Controller | CFO | — | T2 snapshot only post-close |

## 4. Automated accrual guardrails → control mapping

| Guardrail # | Guardrail (from one-pager) | Primary controls | Evidence artifact |
| ---: | --- | --- | --- |
| 1 | 23rd–month-end delta rules | SoD-02, diagnostic 2.1 | Accrual policy sheet |
| 2 | Mandatory Day-1 auto-reversals | SoD-03, diagnostic 2.2 | Auto-reversal JE log |
| 3 | >5% variance alerts | SoD-02, diagnostic 2.3 | Alert routing config |
| 4 | 24th–25th HRIS-to-GL sync | SoD-01, diagnostic 1.3 | HRIS sync log |
| 5 | Sequenced dependency gates | SoD-01, diagnostic 1.4 | Close checklist trail |
| 6 | Tiered human sign-off | SoD-02–05 | ERP approval audit |

## 5. GDPR / payroll PII (company-wide BI)

| Control ID | Requirement | Verification |
| --- | --- | --- |
| **PII-01** | No individual salary in shared BI cubes | Role-based aggregation only |
| **PII-02** | HR detail reports restricted to HR + payroll roles | Access review quarterly |
| **PII-03** | Service accounts for batch posting (no personal logins) | SoD-03, diagnostic 5.3 |

## 6. Pilot #1 sign-off (matrix complete when…)

- [ ] Whitelist KPIs agreed with Controller (minimum KPI-01, KPI-03, KPI-05)
- [ ] ERP roles mapped to SoD-01–SoD-07 (names filled in)
- [ ] IFRS 18 MPM / subtotal mapping row added or N/A documented (US GAAP-only client)
- [ ] BI watermarks T0/T1 applied on all intra-month dashboards

**Director archive slot:** *[RGP-era SoD examples or role naming conventions from 2007–2008 engagement templates]*