# Business Development → Portfolio crosswalk

**Purpose:** Map local CBa practice library folders to `OP-*` opportunities. Assets live on the Director workstation only — **do not commit client or PII content**.

**Root (local):** `C:\Users\menno\CBA\Business Development - Documents`

**Per-opportunity stub:** `opportunities/<folder>/BD-Quick-Reference.md` (generated via `scripts/sync-bd-quick-references.py`).

---

## Tier A flagships

| ID | BD folders (relative to root) | Typical reuse |
| --- | --- | --- |
| `OP-FIN-009` | `Build Shared Servcies Operations`, `Build on Compensation and Benefits Practice`, `Build a Payroll Providers Integration SaaS`, `Build Market Integration ADP Marketplace`, `Build a Portfolio Program Project Management Practice`, `Financial Models`, `General\Meetings` | SSC kickoff, payroll/CoS workshops, PMI kickoff kits, partner P&L models |
| `OP-ITG-013` | `Build a CoPilot Demo`, `ICT Governance Framework`, `Build a Security and Compliance Practice`, `Azure AI Data` | Agent demo kit, ICT gov summary, compliance pre-engagement decks |
| `OP-ITG-014` | `Build a CoPilot Demo`, `Product Development`, `Build a Analytics and AI` | Knowledge/RAG narrative, meeting books |
| `OP-ITG-018` | `Build Shared Servcies Operations`, `Microsoft 365 Digital Workforce Workshop`, `ICT Governance Framework` | MIP retainer packaging, Viva/M365 workshop delivery guides |
| `OP-RSK-004` | `Build a Security and Compliance Practice` | EU/compliance kickoff decks, data risk pre-engagement |

**Graduated delivery repo (`OP-FIN-009` Track A):** `D:\Source\repos\pr-fin-009-continuous-close-playbook` — kickoff [Pilot-1-Kickoff-Agenda-Client.docx](https://github.com/mdresch/pr-fin-009-continuous-close-playbook/blob/main/docs/delivery/Pilot-1-Kickoff-Agenda-Client.docx), meeting segments, CMI pack (authoritative for pilot execution).

---

## Tier B / GTM sequence (high signal)

| ID | BD folders | Typical reuse |
| --- | --- | --- |
| `OP-FIN-010` | `Build on Compensation and Benefits Practice`, `Financial Models` | Rate/CoS, rewards guides |
| `OP-HR-002` | `HR Maturity Model`, `Build on Compensation and Benefits Practice` | Dimensional maturity workshops |
| `OP-OPS-001` | `Service Hub for Enterprise Clients`, `Build a Customer Success Managers - Operations practice` | APQC BPM, Q2D handoff |
| `OP-OPS-003` | Same as `OP-OPS-001` | Q2C diagnostic framing |
| `OP-CX-001` | `Service Hub for Enterprise Clients`, `Build a Customer Success Managers - Operations practice` | Onboarding friction |
| `OP-CHG-001` | `CBA - Change Management`, `Building an adoption and change management practice` | Adoption PAL, change playbooks |
| `OP-CHG-002` | `CBA - Change Management`, `General\Meetings` | Town hall / meeting structure |
| `OP-STR-001` | `Cascade Executive Strategy` | OKR / strategic plan kits |
| `OP-STR-004` / `005` | `Cascade Executive Strategy`, `Build a Portfolio Program Project Management Practice`, `CBA - Change Management` | M&A / PMI governance |
| `OP-DTX-005` | `Build a CoPilot Demo` | Copilot Studio / FinOps demos |
| `OP-ITG-002` | `ICT Governance Framework` | ICT maturity baseline |
| `OP-ITG-004` | `Microsoft 365 Digital Workforce Workshop`, `Build a Modern Workspace Practice`, `Build Secure Remote Work Practice` | M365 migration / workforce workshops |
| `OP-FIN-008` | `Build a Payroll Providers Integration SaaS`, `Build Market Integration ADP Marketplace` | Payroll marketplace integration |
| `OP-FIN-012` | `Build a Security and Compliance Practice` | SoD, side-letter / compliance tone |

---

## Supporting / absorbed (reference only)

| ID | BD folders |
| --- | --- |
| `OP-FIN-001`, `OP-FIN-002` | `Financial Models`, `Build Shared Servcies Operations` |
| `OP-HR-008` | `Build Secure Remote Work Practice`, `Microsoft 365 Digital Workforce Workshop` |
| `OP-ITG-011` | `Build a CoPilot Demo`, `ICT Governance Framework` |
| `OP-LEG-003` | `Build a Security and Compliance Practice` |

---

## Low portfolio priority (partner enablement shelf)

AWS/Azure partner training, MPN fundamentals, Retail/Surface/Food Truck/Bentley folders — **capability building only** unless a client names a vertical pull. No per-opportunity `BD-Quick-Reference.md` unless promoted in [inventory-of-ideas.md](../../inventory-of-ideas.md).

---

## Maintenance

```bash
py -3 scripts/sync-bd-quick-references.py
```

Updates `BD-Quick-Reference.md` in each mapped opportunity folder and ensures [Ideation-Spark.md](../../opportunities/) links to it.