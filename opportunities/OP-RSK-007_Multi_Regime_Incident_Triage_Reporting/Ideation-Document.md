---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-RSK-007"
execution_track: "Active Backlog — High-Fit 2026-2027 Wedge (12. Risk Management / Strategic Asset 4)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "docs/research/Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md (GAP 2)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-RSK-007`: Harmonized Multi-Regime Incident Triage & Regulatory Reporting Playbook

> [!NOTE]
> **Governance SSOT:** This Stage 1b framing operates under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> Sibling workspace files: [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).
> **Execution Role:** High-fit 2026–2027 regulatory gap wedge feeding `OP-RSK-006`, `OP-RSK-004`, and `OP-ITG-018`.

## 1. Problem Context & 2027 Market Trigger

Regulated enterprises across Europe and North America face an acute operational failure mode during live cyber, cloud, and AI incidents: **clashing statutory notification clocks** managed by siloed teams. A single vendor compromise or AI data leak can simultaneously trigger **DORA** (4-hour initial major incident notification), **NIS2** (24-hour early warning), **GDPR** (72-hour DPA breach notification), **EU AI Act** (serious AI incident reporting), and **SEC amended Reg S-P** (30-day customer notification).

As documented in `docs/research/Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md` (GAP 2), 2026–2027 supervisory inspections repeatedly penalize organizations whose Security, Privacy, Risk, and Legal teams maintain separate intake forms and unrehearsed paper binders:

- **Wasted Statutory Hours:** Teams spend critical triage hours re-gathering basic facts across conflicting forms instead of meeting 4h/24h/72h deadlines.
- **Audit Evidence Demand:** Regulators increasingly inspect tabletop-tested operational readiness rather than static compliance binders, making `OP-RSK-007` a fast, software-free sprint anchored in Strategic Asset 4 (*Evidence & Governance*).

## 2. Solution Architecture & Delivery Workflow

Delivered over **3–4 weeks (5–8 hrs/wk)** inside the client's existing ITSM, SharePoint, or Microsoft Teams environment without buying new SOAR or GRC tools:

1. **Multi-Regime Applicability & Intake Audit (Week 1):** Map which statutory regimes apply to the client (DORA, NIS2, GDPR, EU AI Act, SEC Reg S-P) and consolidate disparate Security/Privacy/Legal intake fields into one **Unified Incident Intake & Severity Triage Matrix**.
2. **Harmonized Clock & RACI Playbook (Week 2):** Build an hour-by-hour escalation map (`T+0` -> `T+4h` -> `T+24h` -> `T+72h` -> `T+30d`) with named RACI owners, materiality thresholds, board-notification triggers, and pre-drafted initial regulator notice templates.
3. **1-Hour Tabletop Walkthrough (Week 3):** Facilitate a live cross-functional dry-run on one high-relevance scenario (e.g., compromised critical ICT vendor or rogue AI agent exposing PII) to stress-test intake speed and handoffs.
4. **Dated Audit Evidence Pack & Wedge Handoff (Week 4):** Issue a timestamped **Tabletop Evidence Report** proving operational readiness for auditors/regulators, plus prioritized next-step gaps feeding `OP-RSK-006`, `OP-RSK-004`, and `OP-ITG-018`.

**Core Fixed-Scope Deliverables:**
- **Unified Multi-Regime Triage Matrix:** Single intake schema satisfying DORA, NIS2, GDPR, EU AI Act, and SEC Reg S-P fields.
- **Clock-Synchronized Escalation Playbook + Notice Templates:** Hour-by-hour RACI from `T+0` to `T+30d`.
- **Dated Tabletop Evidence Report:** Audit-ready record of live cross-functional dry-run execution.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable Category | Typical Market Offering | Limitations for 2027 Regulated Buyers | CBa Consult Differentiation (`OP-RSK-007`) |
| :--- | :--- | :--- | :--- |
| MSSP / Incident Response Retainers | 24/7 SOC monitoring, forensic containment, malware eradication | Focuses on technical containment; rarely harmonizes DORA/NIS2/GDPR/AI Act/SEC legal clocks | Complements the client's SOC/MSSP by unifying cross-regime triage, RACI, and evidence schema |
| Breach Counsel Law Firms | Legal advice and regulatory filing sign-off during/after an incident | High hourly rates; reactive post-breach engagement without operational intake workflows | Prepares clean, clock-synchronized facts in advance so counsel signs off within 4h/24h windows |
| Enterprise GRC / SOAR Platforms | Heavy workflow software suites requiring 6-month integrations | Slow procurement; software fails when underlying RACI and severity thresholds remain siloed | Software-free 3–4 week sprint running on existing ITSM/Teams/SharePoint tools |

**Positioning Takeaway:** Bridges the exact governance gap between technical SOC containment and legal breach filing without competing with either.

## 4. Internal IP & Source Provenance Crosswalk

| Source / Asset | Role in `OP-RSK-007` | Provenance & Availability | Integration Notes |
| :--- | :--- | :--- | :--- |
| `Regulatory-Findings-and-Service-Gap-Analysis-2026-2027.md` | Regulatory inspection evidence (GAP 2) | Workspace research doc (`docs/research/`) | Grounds exact DORA/NIS2/GDPR/EU AI Act/SEC Reg S-P clock conflicts |
| Risk Management Signature Toolkit | Triage, RACI & tabletop methodology | CBa Consult core advisory library | Supplies risk-scoring matrices and audit-evidence structure |
| ADPA `.docx` Repository | Legacy dump status | Confirmed **0 files assigned** in [Source-Documents.md](Source-Documents.md) | Clean greenfield regulatory product built directly from 2026–2027 supervisory findings |
| `OP-RSK-006`, `OP-RSK-004`, `OP-ITG-018` | Downstream compounding portfolio | [inventory-of-ideas.md](../../inventory-of-ideas.md) | Converts 3–4 week sprint buyers into DORA/NIS2 RoI, SOC 2 for AI, and MIP retainers |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Strict Non-MSSP / Non-Legal Boundary:** CBa Consult designs governance triage workflows, harmonized evidence schemas, RACI escalation maps, and tabletop readiness records only. Live technical containment remains with the client's SOC/MSSP, and final statutory filings require client legal counsel sign-off.
- **No GRC/SOAR Software Reselling:** Playbooks operate in existing client productivity/ITSM tools with \$0 software procurement.
- **Pre-Stage 2 Hypothesis Lock:** Stage 2 buyer hypotheses (`HYP-2027-NNN`) are not yet registered in `Hypothesis-Register.md`.

**Stage 1b Gate Decision:** **HIGH-FIT WAVE 2 CANDIDATE.** Ready for Stage 3 commercial review; build 1-page Multi-Regime Clock Crosswalk and log 1–2 Stage 2 hypotheses when promoted toward `G4`.
