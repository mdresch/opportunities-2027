# Context source inventory register (schema)

**Use:** One row per knowledge repository (SharePoint site, Teams channel/files, Confluence space, file share, Fabric lake shortcut). Same role as the agent inventory register in `OP-ITG-013`.

| Field | Description |
| --- | --- |
| **Source ID** | Stable id (e.g. `KS-001`) |
| **Display name** | Site / space name |
| **Platform** | SharePoint / Teams / Confluence / OneDrive / Other |
| **Business domain** | HR, Finance, Legal, Ops, Product, … |
| **Authoritative SoT?** | Y/N/Shared — if Shared, name primary |
| **Copilot / RAG indexed?** | Y/N/Unknown |
| **Sensitivity label coverage** | % or High/Med/Low |
| **Permission model risk** | None / Inherited / Everyone / Broken inheritance |
| **Owner (human)** | Named steward |
| **Review cycle** | Monthly / Quarterly / Annual / None |
| **Last substantive update** | Date |
| **Conflict / duplicate risk** | Low / Med / High (+ peer source ids) |
| **Remediation priority** | P0 / P1 / P2 |
| **Notes** | Free text |

**Tier 1:** Complete for **5–10** priority sources (P0 candidates).  
**Tier 2:** Expand to domain coverage map for all major domains.