# IP readiness audit — `OP-ITG-014` (honest baseline)

**Date:** 2026-11-26  
**Rule:** No fabricated repo maturity scores or client metrics.

---

## 1. Terminology (client-safe)

| Acronym | Expansion | Use in engagements |
| --- | --- | --- |
| **ADPA** | Advanced Data Processing Automation (`mdresch/adpa` PoC) | Document/knowledge pipeline patterns, template extraction, classification metaphors |
| **ECS** | **Evidence Chain & Context Scoring** | Provenance, citation trust, human vs. AI-generated evidence (align with `OP-RSK-005` narrative) |
| **SoT** | System / Source of Truth | Per domain library or system designation |
| **Split-Clock** | GDPR erasure clock vs. WORM audit clock | Lifecycle pillar; legal review on client side |

---

## 2. Asset inventory

| Asset | Location | Reuse for `OP-ITG-014` | Gap |
| --- | --- | --- | --- |
| Questionnaire (25 controls) | [Knowledge-Context-Governance-Questionnaire.md](Knowledge-Context-Governance-Questionnaire.md) | Day-1 diagnostic | Add client workshop evidence checklist |
| Source register schema | [Context-Source-Inventory-Register.md](Context-Source-Inventory-Register.md) | Parallel to ITG-013 agent register | Populate per client |
| ADPA cluster (10 DOCX) | Assigned paths — [Source-Documents.md](Source-Documents.md) | Charter/plan templates for taxonomy & MDM sections | Not in git; Director machine |
| One-pager | [One_Pager_OP-ITG-014_Knowledge_Context_Governance.md](One_Pager_OP-ITG-014_Knowledge_Context_Governance.md) | GTM attach | Optional `.docx` export |
| Delivery playbook | [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md) | SOW shell | Legal review per client |
| `mdresch/adpa` | GitHub PoC | Reference for ontology automation story | **Not** production multi-tenant platform |

---

## 3. What Pilot #1 is (and is not)

| In scope | Out of scope |
| --- | --- |
| Sampled site/library audit, permission & label review | Full tenant file migration |
| Taxonomy/ontology **blueprint** | Building custom graph database |
| RAG golden-set **design** + baseline run (client runs queries) | Hosting production vector index |
| 30/60/90 remediation backlog | MSP execution of every remediation item |

---

## 4. Build backlog (internal ≤15 hrs target — `HYP-2027-019`)

| # | Task | Est. hrs | Status |
| --- | --- | --- | --- |
| 1 | Tier-2 market research + IP audit | 4 | Done (2026-11-26) |
| 2 | GTM pack (tracker, LinkedIn, readout, workshop) | 4 | Done (2026-11-26) |
| 3 | Tier cut sheet + combined wedge | 2 | Done (2026-11-26) |
| 4 | Pilot charter §2 planning names | 1 | Done (2026-11-26) |
| 5 | Optional: context portal / shared intake with ITG-013 | 4+ | Deferred |

Log cumulative hours in CRM when starting client work; update hypothesis register when ≥15 hrs or Pilot #1 completes.