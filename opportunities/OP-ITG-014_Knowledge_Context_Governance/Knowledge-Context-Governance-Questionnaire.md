---
opportunity_id: "OP-ITG-014"
artifact_type: "Domain Diagnostic & Context Maturity Questionnaire"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Knowledge Intelligence & Context Governance Diagnostic (`OP-ITG-014`)

Score each of the **25 diagnostic controls** (`1` to `5`) using verifiable M365/SharePoint/Confluence/Purview evidence:

| Score | Maturity Level | Evidence Standard |
| :---: | :--- | :--- |
| **1** | **Ungoverned Sprawl** | Duplicate/stale files everywhere; flat "Everyone" permissions; zero taxonomy or sensitivity labels. |
| **2** | **Folder-Level Hygiene** | Basic team folder conventions; partial labeling; high hallucination/oversharing risk under Copilot/RAG. |
| **3** | **Curated Authoritative Sources** | Designated systems of record, baseline Purview labels, and documented version-retirement rules. |
| **4** | **Semantic Context Layer** | Managed enterprise taxonomy, canonical entity definitions, automated stale-content quarantine, RBAC context scoping. |
| **5** | **Ontology-Driven Intelligence** | Cross-system Knowledge Graph (ADPA/ECS), continuous RAG quality scoring, Split-Clock GDPR/WORM provenance. |

---

## Pillar 1 — Content & RAG Readiness *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **1.1** | Are all SharePoint, Teams, Confluence, and file-share repositories inventoried and ranked for AI indexing eligibility? | Repository eligibility register | |
| **1.2** | What percentage of active knowledge repositories have been scanned for duplicate or conflicting policy versions? | Deduplication / conflict scan | |
| **1.3** | Are draft, archived, and superseded documents excluded from Copilot / RAG vector indexes? | Index exclusion / quarantine rule | |
| **1.4** | Is RAG retrieval accuracy (precision/citation correctness) benchmarked on a golden question set? | Golden-set evaluation scorecard | |
| **1.5** | Are document formats normalized (metadata headers, clean tables, OCR) for reliable chunking? | Ingestion quality standards | |

## Pillar 2 — Taxonomy & Canonical Entity Modeling
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **2.1** | Does an authoritative enterprise taxonomy exist for core business domains (Customer, Product, Contract, Policy, Control)? | Managed Metadata / Term Store | |
| **2.2** | Are mandatory metadata fields (Owner, Effective Date, Review Cycle, Domain, Confidentiality) enforced on upload? | Library content-type schema | |
| **2.3** | Are synonyms, acronyms, and legacy department names mapped to canonical business terms? | Canonical glossary / vocabulary | |
| **2.4** | Are cross-department naming conflicts resolved by a named Data/Knowledge Steward? | Steward RACI & change log | |
| **2.5** | Is taxonomy tagging automated or assisted rather than relying solely on manual user compliance? | Auto-classification rule config | |

## Pillar 3 — Ontology & Knowledge Graph Alignment (ADPA / ECS)
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **3.1** | Are relationships between policies, processes, controls, systems, and owners explicitly modeled (graph/schema)? | Context / Ontology diagram | |
| **3.2** | Can AI agents trace a policy statement back to its governing regulation, owner, and operational control? | Lineage / traceability proof | |
| **3.3** | Are structured ERP/CRM records linked semantically to unstructured SharePoint/Confluence documents? | Entity-linking mapping | |
| **3.4** | Are *Work IQ* / Fabric / OneLake semantic layers governed under the same canonical vocabulary? | Semantic layer governance spec | |
| **3.5** | Are ontology/schema updates versioned and regression-tested before deploying to production agents? | Schema versioning workflow | |

## Pillar 4 — Knowledge Lifecycle & Split-Clock Retention
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **4.1** | Does every authoritative SOP/policy have an explicit review date and automatic expiration/archive trigger? | Lifecycle policy & review log | |
| **4.2** | Are GDPR erasure rights reconciled cleanly with statutory WORM audit retention (Split-Clock model)? | Retention vs. erasure matrix | |
| **4.3** | When a source document is updated or deleted, how quickly is the RAG/vector index refreshed? | Index sync SLA & telemetry | |
| **4.4** | Is document provenance (author, approval timestamp, source system) preserved in AI citations? | Citation provenance sample | |
| **4.5** | Are abandoned Teams/SharePoint sites automatically detected and archived on a quarterly cadence? | Inactive-site governance report | |

## Pillar 5 — Context Security & Zero-Oversharing *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **5.1** | Have SharePoint "Everyone except external users" and broken inheritance sites been remediated? | Oversharing remediation report | |
| **5.2** | Are Microsoft Purview sensitivity labels enforced across all confidential HR, Finance, Legal, and M&A content? | Purview label coverage % | |
| **5.3** | Do AI agents inherit strict Role-Based Context Scoping (never exceeding the invoking user's permissions)? | Agent permission inheritance test | |
| **5.4** | Are external guests and third-party SaaS connectors blocked from reading restricted knowledge tiers? | External sharing & DLP policy | |
| **5.5** | Are anomalous bulk document queries by users or agents alerted in SIEM/Purview? | DLP / audit alert config | |

---

## Top-10 P0 Context & Oversharing Red-Flag Triage
1. **"Everyone" permissions** on HR, payroll, legal, or M&A SharePoint sites indexed by Copilot.
2. **Multiple conflicting versions** of active SOPs/pricing sheets in the same RAG corpus.
3. **Zero Purview sensitivity labels** applied prior to M365 Copilot rollout.
4. **No authoritative Source-of-Truth designation** between SharePoint, Teams, Confluence, and local drives.
5. **Stale vector embeddings** serving deleted or revoked policies.
6. **Agents running with tenant-wide read tokens** instead of user-scoped context boundaries.
7. **Zero metadata/owner attribution** on >50% of corporate knowledge documents.
8. **Unquarantined draft folders** polluting executive AI summaries.
9. **GDPR personal data embedded** inside immutable RAG indexes with no erasure workflow.
10. **No golden evaluation set** to detect silent RAG accuracy regressions.
