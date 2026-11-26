# Ideation Spark — `OP-RSK-007`: Harmonized Multi-Regime Incident Triage & Regulatory Reporting Playbook

**Status:** 🔥 Spark — workspace opened (Stage 1a `G1a` complete), Tier 2 deeper research & Stage 2 hypotheses pending  
**Tier:** Active Backlog *(high-fit 2026–2027 regulatory gap — fast fixed-scope wedge feeding `OP-RSK-004` & `OP-ITG-018`)*  
**Strategic Asset:** 4. Evidence & Governance  
**Functional Area:** 12. Risk Management · **Signature Toolkit:** Risk Management *(bridges Operations)*  
**Category:** Advisory / Governance Playbook · **Size:** Small, Mid & Large  
**Source:** [inventory-of-ideas.md §12 Risk Management](../../inventory-of-ideas.md) · [Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md](../../docs/research/Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md)

## Positioning

> For **CISOs, DPOs, Chief Risk Officers, and Legal/Compliance Leads** at regulated enterprises who struggle with **clashing statutory incident-reporting clocks across DORA (4h), NIS2 (24h), GDPR (72h), EU AI Act, and SEC Reg S-P (30d)**, **Harmonized Multi-Regime Incident Triage & Reporting Playbook** is a **fixed-scope Governance & Operational Readiness Sprint** backed by **CBa Consult's Evidence & Governance architecture** that delivers **a single unified incident-intake triage workflow, harmonized evidence schema, and tabletop-tested escalation playbook** with \$0 initial working capital.

## The Problem (Before Solution)

Regulatory inspections across the EU and US repeatedly flag **siloed incident-response playbooks** that fail under live pressure:
- **Clashing Statutory Clocks:** During a single cyber, cloud, or AI incident, IT, Legal, and Privacy teams face conflicting notification windows — **DORA** (4-hour initial major incident notification), **NIS2** (24-hour early warning), **GDPR** (72-hour DPA breach notice), **EU AI Act** (serious AI incident reporting), and **SEC amended Reg S-P** (30-day customer notification).
- **Fragmented Evidence Capture:** Because Security, Privacy, and Compliance use separate intake forms, teams waste critical hours re-gathering facts instead of meeting statutory deadlines — creating direct regulatory enforcement exposure and board liability.
- **Unrehearsed Escalation:** Paper policies sit untouched until a real incident occurs; regulators now demand proof of operational execution, not static binders.

## What It Is

A lightweight, **3–4 week fixed-scope sprint** that unifies incident triage and regulatory reporting across all applicable regimes without buying new SOAR/GRC software:
1. **Unified Incident Intake & Severity Triage Matrix:** Single inception form that captures the exact data fields required to classify an incident simultaneously under DORA, NIS2, GDPR, EU AI Act, and SEC Reg S-P.
2. **Harmonized Clock & RACI Playbook:** Clear hour-by-hour escalation map (`T+0` → `T+4h` → `T+24h` → `T+72h` → `T+30d`) with named owners, board-notification triggers, and pre-drafted regulator notice templates.
3. **1-Hour Tabletop Walkthrough & Evidence Record:** Live dry-run on one realistic scenario (e.g., compromised SaaS vendor or rogue AI agent leaking PII), generating dated audit evidence of operational readiness.

## What This Is Not Yet *(Negative Scope Boundary — Stage 1a)*

- **Not 24/7 SOC monitoring, forensic incident response, or legal breach-notification counsel:** CBa Consult designs the governance triage, evidence schema, and reporting playbook; the client's MSSP/SOC handles live technical containment and client legal counsel signs off on final regulatory filings.
- **Not yet a Stage 2–4 Charter:** Buyer hypotheses (`HYP-2027-NNN`) and pilot scope remain pending Stage 2 and Director sign-off at `G4`.

## 7 Pivotal Questions

1. **Buyer & 2027 Trigger** — CISO, Data Protection Officer (DPO), Chief Risk Officer, and General Counsel. Triggered by overlapping **2026–2027 DORA, NIS2, GDPR, EU AI Act, and SEC Reg S-P** enforcement sweeps testing actual incident-reporting execution.
2. **The Wedge (Pain)** — Eliminates chaotic, siloed incident triage and prevents missed 4h/24h/72h regulatory notification deadlines that trigger fines and board personal liability.
3. **Deliverable & Existing IP** — Tangible **Unified Multi-Regime Triage Matrix**, **Clock-Synchronized Escalation Playbook + Notice Templates**, and **Dated Tabletop Evidence Report**; pairs directly with `OP-RSK-004` ("SOC 2 for AI"), `OP-RSK-005` (Evidence Assurance), and `OP-RSK-006` (DORA/NIS2 Third-Party ICT Risk).
4. **Sweat-Equity Feasibility** — 3–4 weeks (5–8 hrs/wk), Low–Medium effort, solo-deliverable with \$0 cash outlay using existing ITSM/SharePoint/Teams tools. Expected capital range: **€2,000–€5,000**.
5. **Outcome & Proof** — Single tabletop-verified intake-to-notification workflow proving the team can classify and draft a compliant initial notice within statutory clocks (≤4h DORA / ≤24h NIS2).
6. **Boundaries & Risk** — Strict **non-MSSP / non-legal boundary**: focuses on governance triage, RACI, and evidence readiness — never competes with the client's 24/7 SOC or external breach counsel.
7. **Compounding / Scale Path** — Fast, low-friction **entry wedge** into **`OP-RSK-006` (DORA/NIS2 Third-Party RoI)**, **`OP-RSK-004` ("SOC 2 for AI")**, **`OP-ITG-013` (AI Agent Governance)**, and **`OP-ITG-018` (MIP recurring governance retainer)**.

## Effort, Capital & Timeline

| Time Horizon | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| 3–4 wks (5–8 hrs/wk) | Low–Med | €2,000–€5,000 | Q2 2027 |

## Market Validation & Source Notes

- Grounded in 2026–2027 DORA/NIS2/GDPR/SEC Reg S-P supervisory inspection findings (see [Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md](../../docs/research/Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md) GAP 2).

## Related Opportunities

`OP-RSK-006` (DORA/NIS2 Third-Party RoI) · `OP-RSK-004` ("SOC 2 for AI") · `OP-RSK-005` (Evidence Assurance) · `OP-ITG-010` (Information Retention & Recovery) · `OP-ITG-018` (MIP retainer)

## Next Steps (Stage 1b → Stage 2 Hypothesis Gate)

- [ ] Build a reusable 1-page **Multi-Regime Reporting Clock & Intake Field Crosswalk** (DORA / NIS2 / GDPR / EU AI Act / SEC Reg S-P).
- [ ] Draft 1–2 falsifiable Stage 2 hypotheses (`HYP-2027-NNN`) in [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md) when promoted into Wave 2.
- [ ] Complete Tier 3 Pre-Pilot Gate (`G4`) before changing inventory status from `Idea` → `Pilot`.

## Assigned Source Documents (ADPA)

- [Source-Documents.md](Source-Documents.md) — full manifest
- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content
- [Business-Case.md](Business-Case.md) — extracted business case content
