---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Governance & Commercial Policy"
lifecycle_stage: "Always-on (CBa Consult operating rules)"
inputs:
  - "../research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md"
  - "../research/Enterprise-IT-Budget-Governance-Multinational.md"
outputs:
  - "Rules-of-Engagement.md"
date: 2026-11-26
status: binding
---

# Rules of engagement — CBa Consult

**Purpose:** Non-negotiable operating rules for **how CBa Consult may work inside or for a client organisation**. These rules protect **client governance**, **finance and procurement compliance**, **independence**, and **CBa’s ability to deliver defensible professional services**.

**Hierarchy:**

| Layer | Document |
| --- | --- |
| **This document** | Rules of engagement (principles, multiparty gate, no shadow delivery) |
| **Commercial basis** | [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md) — PO, invoice, no card checkout |
| **Buyer mechanics** | [Enterprise-IT-Budget-Governance-Multinational.md](../research/Enterprise-IT-Budget-Governance-Multinational.md) — approval layers & cycles |
| **Readiness tooling** | [`OP-SCM-003` PRMAP](../../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/Ideation-Spark.md) — capture before PO |

**Applies to:** All portfolio **`OP-*`** packaged diagnostics, consulting, validation sprints, and platform-backed assessments unless a **separate written exception** is recorded by the Director.

---

## 1. Core rule — no rendering without multiparty approved engagement

> **CBa Consult does not render services within a client company without an explicit, multiparty approved engagement.**

**“Render services”** includes any of the following on the client side:

- Access to **production** systems, data rooms, or employee‑identifiable HR/finance records  
- Workshops, interviews, or assessments billed under an **`OP-*`** SKU  
- Delivery of **scored diagnostics**, board packs, or assurance‑readiness artefacts  
- Use of client **trademarks** or **named** references in deliverables  
- **On-site** or **VPN / tenant** presence for paid or unpaid “pilot” work beyond an approved discovery call  

**Permitted without full engagement (non-exhaustive):**

- Public web research; published regulatory material  
- **Unpaid** introductory conversation (no client confidentials; no claims of engagement)  
- Marketing / thought leadership with **no client identification**

---

## 2. Multiparty approval — minimum parties

An engagement is **approved** only when **all required parties** below have explicitly aligned **in writing** (email, PO, SOW signature, or e‑procurement record—not verbal line‑manager assent alone).

| Party | Role | Minimum evidence |
| --- | --- | --- |
| **Client Sponsor** | Owns business need and procurement timeline | Named in SOW/PO; accepts scope |
| **Executive Sponsor** (or delegated **budget owner**) | Accountable for outcomes and internal truth of readiness | Signs or emails approval of scope/SOW tier |
| **Finance / procurement** | **Commits funds** to correct **legal entity** | **PO** or equivalent written order; cost centre/WBS where required |
| **CBa Consult** | Accepts scope, fee, independence boundaries | Signed SOW or order acceptance; conflict check logged |

**Additional parties when triggered:**

| Trigger | Extra party |
| --- | --- |
| Data processing / tenant access | **DPO / legal** — DPA or security addendum before access |
| Regulated ICT / third party | **Risk / compliance** — third‑party lane documented |
| IT architecture / agent tools | **CIO / CISO** (or delegate) — scope touches production IT |

**Line manager alone** may **champion** work internally; they are **not** sufficient as the only approver. See [Commercial-Engagement-Invoicing-and-Procurement-Policy.md §2](../research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md).

**Multiparty pattern mirrors PRMAP roles:** Client Sponsor + Executive Sponsor + finance/procurement path — [Approval-Path-and-Cycle-Fields.md](../../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/Approval-Path-and-Cycle-Fields.md).

---

## 3. Commercial rules (summary — detail in policy)

1. **No credit card or P-card** as substitute for formal procurement.  
2. **Invoice** to PO against the **contracting legal entity** with finance-required fields.  
3. **Packaged SKU and consulting** use the **same** commercial rail.  
4. **No billable delivery** before written order covers **entity, scope, fee, and term**.  
5. **No “expense it later”** or personal reimbursement paths.

Full text: [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md).

---

## 4. Independence and scope boundaries

- CBa provides **pre-assurance readiness and evidence**; we do **not** sign audit opinions or act as statutory auditor.  
- We do **not** bypass client procurement to “get started quickly.” Speed belongs in **Phase 0 fixed scope**, not in **shadow delivery**.  
- Out-of-scope work requires **change control**, not side agreements with a single manager.

---

## 5. Operational gates for CBa staff

| Gate | Stop condition | Escalation |
| --- | --- | --- |
| **G0 — Interest** | No written multiparty path | AM: PRMAP or discovery only |
| **G1 — Order** | No PO / written order | No billable hours; no data access |
| **G2 — Data** | No DPA / security clearance if required | No tenant/VPN |
| **G3 — Delivery** | Milestone acceptance per SOW | Invoice per agreed terms |

If a contact pressures **“just start, we’ll sort procurement after”** → **decline billable work**; offer readiness export or draft SOW for internal approval.

---

## 6. Client-facing statement (short)

*CBa Consult works through an approved engagement: a clear scope, sponsors from the business and leadership, and finance commitment on the correct legal entity. We do not deliver billable consulting on a manager’s card or informal approval—so your audit, procurement, and independence standards stay intact.*

---

## 7. Systems & registers

| Asset | Field / use |
| --- | --- |
| [portal-rbac-and-workflows.json](../../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/data/portal-rbac-and-workflows.json) | `rules_of_engagement`, `commercial_engagement`, `multiparty_approval_required` |
| CRM / opportunity record | Store PO ref, sponsor emails, `formal_procurement_path` |
| [Hypothesis-Register.md](../registers/Hypothesis-Register.md) | Pilot evidence must cite RoE compliance |

---

## 8. Alignment — interim-management professional standards (reference)

**Naming note:** In the Netherlands, sector standards for **written assignments** and bureau conduct sit with the **Raad voor Interim Management ([RIM](https://rim.nl/))** (Bureaucode RIM, 2024; modelovereenkomst / wet DBA). **IPB Group** ([ipb.group](https://ipb.group/interim/)) is a UK **search and placement** firm; it does not publish an equivalent public assignment checklist—in the UK, the closest **professional body** code is the [Institute of Interim Management (IIM) Code of Professional Conduct](https://iim.org.uk/resources/code-of-conduct/). Belgium: [Federgon deontological code for interim management](https://federgon.be/fileadmin/media/doc/Kwaliteitslabels/NL/Deontologische_codes/FED_DeontoCode_IM_NL_FINAL.pdf).

CBa Consult delivers **fixed-scope consulting and diagnostics** (not RIM-style placement of a named interim manager into line authority). RoE is **aligned in spirit** with those codes on **written wilsovereenstemming before work**, **independence**, and **quality of intake**—expressed as **multiparty SOW + PO** rather than a three-party bureau–interim–client employment triangle.

| Professional expectation (RIM / Federgon / IIM) | CBa RoE today | Practical engagement detail to document in **SOW** |
| --- | --- | --- |
| **Written agreement before work** (scope, fee, duration) | ✅ G1 — no delivery without order | SKU, fixed fee, start/end, entity |
| **Beoogde resultaten / deliverables / KPI’s** | 🟡 Implied in `OP-*` sparks; not in RoE text | Milestones, acceptance criteria, P0 register where relevant |
| **Mandaat, bevoegdheden, reporting lines** (Federgon governance) | 🟡 Partial — Executive Sponsor + triggers | Named approver, RACI for client inputs, steering cadence |
| **Multiparty client commitment** (not one line manager) | ✅ §2 multiparty gate | Sponsor + budget owner + finance/procurement |
| **Geheimhouding / confidentiality** | 🟡 Assumed in SOW; not RoE § | NDA/DPA refs; no client name in marketing without consent |
| **Conflict of interest disclosed early** (IIM / Federgon) | 🟡 “Conflict check logged” in §2 | Written conflict waiver for assurance independence |
| **Progress reporting** (IIM; RIM begeleiding) | 🟡 AM nudges in PRMAP only | Agree rhythm (e.g. weekly % complete; milestone readouts) |
| **Change when scope/cost diverges** (honorarium/costen raming) | ✅ §4 change control | Written change request, not manager side-deal |
| **Beëindiging, notice, handover** (RIM list) | 🔴 Not in RoE | Termination for convenience/cause; deliverable handoff |
| **Nazorg / aftercare** (RIM) | 🔴 Optional for diagnostics | e.g. 30-day Q&A window post-report—state in SOW |
| **Insurance** (RIM: beroeps- en bedrijfsaansprakelijkheid) | 🔴 Not in RoE | Maintain PI insurance; certificate on request |
| **No shadow / informal start** (Federgon professional treatment) | ✅ Core rule §1 | Same as “no render without approved engagement” |
| **Competence — accept only fitting work** (IIM; Federgon §4) | 🟡 Portfolio SKU fit | Decline or partner if outside `OP-*` / skills |
| **Procurement / PO (enterprise)** | ✅ Commercial policy | Not substituted by card or expense |

**RIM bureau practices CBa mirrors (consulting variant):** zorgvuldige **intake** (“vraag achter de vraag”), **heldere offerte**, **contract** with opdrachtgever, **bewaking voortgang** (AM / milestone), **evaluatie** (lessons + acceptance)—see [RIM Bureaucode](https://rim.nl/bureaucode-rim/) · [written assignment checklist (ManagementSite)](https://www.managementsite.nl/tql/management/interim-management/wat-ligt-er-volgens-de-gedragscode-in-de-schriftelijke-opdracht-voor-interim-management-vast).

**Gaps to close in templates (not by weakening RoE):** Add standard **SOW clauses**: deliverables/KPIs, reporting, termination/handover, optional aftercare, insurance reference; PRMAP export should populate **mandate + forum date** fields for enterprise buyers.

---

## 9. Related governance

| Document | Relationship |
| --- | --- |
| [Tailored-Hybrid-SIDPA-Governance.md](Tailored-Hybrid-SIDPA-Governance.md) | Portfolio stage gates (ideas → delivery) |
| [Practice-Area-Introductions.md](../practices/Practice-Area-Introductions.md) | GTM segments |
| [inventory-of-ideas.md](../../inventory-of-ideas.md) | Commercial tiers and fees |
| [Enterprise-IT-Budget-Governance-Multinational.md](../research/Enterprise-IT-Budget-Governance-Multinational.md) | Client approval layers |
| External (reference only) | [RIM Bureaucode](https://rim.nl/bureaucode-rim/) · [IIM Code of Conduct](https://iim.org.uk/resources/code-of-conduct/) |

---

*Effective: 2026-11-26. §8 crosswalk added 2026-11-26. Director may amend with dated revision note in this file.*