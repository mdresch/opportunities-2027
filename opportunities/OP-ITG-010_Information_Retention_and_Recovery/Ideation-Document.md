---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-010"
execution_track: "Tier B Growth (Pillar 6: IT and Technology)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "inventory-of-ideas.md (§6 IT & Technology + Finance Companion §3-4)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-010`: Information Retention and Recovery Specialist

> **Governance & SSOT Callout:** This Stage 1b document consolidates the retention and forensic recovery blueprint from [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md) under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). It anchors Strategic Asset 4 (Evidence & Governance) in [inventory-of-ideas.md](../../inventory-of-ideas.md) alongside [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).

## 1. Problem Context & 2027 Market Trigger

- **Target Buyer:** CIOs, DPOs, General Counsel, and CFOs in Medium & Large organizations navigating ERP/payroll migrations, M&A carve-outs, or active regulatory disputes.
- **2027 Market Trigger:** Microsoft Ignite 2026 Purview Compliance and Fabric/OneLake catalog shifts, aggressive SaaS vendor renewal lock-ins, and intensifying clashes between GDPR erasure mandates (Art. 5(1)(e), Art. 17) and mandatory statutory retention laws.
- **The Multi-Jurisdiction Trap:** Organizations face 12-year SaaS licensing traps just to read historical records, non-deletable legacy payroll databases, uncleaned recruitment CV inboxes, and conflicting retention clocks (NL *Belastingdienst* 7/10-year + 15-year *actualiteitswaarde* 30%-ruling, UK 6-year, US 4–7 year).
- **Forensic Recovery Urgency:** During tax audits, GDPR disputes, or international arbitrations, fragmented legacy ERP, SAP Concur, pension, and M&A escrow archives fail chain-of-custody scrutiny.

## 2. Solution Architecture & Delivery Workflow

Built on CBa Consult's **Risk Management** Toolkit, **2-Bucket Indefinite-Core Standard**, and **Split-Clock WORM Architecture**, the 4–8 week (6–10 hrs/wk) engagement executes in four stages:

1. **Stage 1 — Legal Hold & Retention Clock Mapping (Weeks 1–2):** Classify records across statutory tax, 30%-ruling, pension, and GDPR Art. 18 restriction rules; establish DPO/SoD break-glass authorization.
2. **Stage 2 — Split-Clock & 2-Bucket WORM Architecture (Weeks 3–4):** Decouple long-term immutable WORM archives (12–15 year retention) from expensive active SaaS licenses, enabling clean legacy system decommissioning without data loss.
3. **Stage 3 — Quarantine & Hygiene Remediation (Weeks 5–6):** Execute GDPR Art. 18 legacy payroll DB quarantine design, recruitment CV inbox cleansing protocols, and GitHub/repository PII remediation workflows.
4. **Stage 4 — Forensic Reconstruction & Chain-of-Custody Dossier (Weeks 7–8):** Reconstruct legacy ERP, payroll, Concur, pension, and M&A escrow records under auditable chain-of-custody for tax authorities or arbitration counsel.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Buyer Experience | Limitation in 2027 Governance | CBa Consult Differentiation (`OP-ITG-010`) |
| --- | --- | --- | --- |
| Big Four Forensic / eDiscovery | High-cost litigation discovery teams (€50k–€250k+) | Reactive dispute focus; rarely fixes underlying SaaS license trap | Combines forensic recovery with proactive Split-Clock WORM decoupling |
| Pure Privacy / GDPR Consultancies | Policy binders and RoPA spreadsheets | Lack hands-on ERP, payroll DB, and M365/Purview architectural depth | Bridges DPO legal rules with technical Art. 18 quarantine and WORM design |
| Legacy ERP / SaaS Vendors | Push expensive "read-only" renewal licenses | Financial incentive to prolong 12-year legacy seat maintenance | Enables "Retain Right & Decommission Without Data Loss" license exit |
| Archival Storage Vendors | Sell WORM cloud buckets or backup appliances | No cross-border tax/30%-ruling clock logic or SoD chain-of-custody | Vendor-neutral 2-Bucket Indefinite-Core governance blueprint |

## 4. Internal IP & Source Provenance Crosswalk

| Asset / Source | Provenance Role | Reusable IP & Methodology Contribution |
| --- | --- | --- |
| [inventory-of-ideas.md](../../inventory-of-ideas.md) (§6 & Finance §3–4) | Deep architectural blueprint | 2-Bucket Indefinite-Core Standard, Split-Clock WORM, NL/UK/US clocks, Art. 18 quarantine |
| [Ideation-Spark.md](Ideation-Spark.md) | Stage 1a Spark & Tier B framing | Positioning, €2,500–€8,000 fee band, 4–8 week horizon, M&A/Ignite 2026 triggers |
| [Source-Documents.md](Source-Documents.md) | Provenance manifest | Confirms zero `.docx` required; architecture originates in portfolio research |
| Risk Management Signature Toolkit | CBa Consult core IP | Break-glass DPO authorization templates, SoD chain-of-custody logs, PII remediation checklists |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **In Scope:** Split-Clock retention architecture, SaaS archival decoupling design, GDPR Art. 18 quarantine specification, recruitment/GitHub PII hygiene plans, and chain-of-custody record reconstruction.
- **Explicit Negative Scope (Out of Scope):** CBa Consult does **not** provide formal legal representation in court/arbitration, execute unapproved production database deletions without DPO/SoD break-glass sign-off, or store raw client PII on CBa Consult infrastructure.
- **Stage 1b Gate Criteria:** Finalize standardized DPO break-glass authorization and zero-raw-PII handling protocols; confirm joint cross-sell packaging with `OP-FIN-009`/`010`, `OP-ITG-004`, and `OP-LEG-002`.
