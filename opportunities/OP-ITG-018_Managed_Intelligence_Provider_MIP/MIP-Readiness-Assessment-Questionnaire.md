---
opportunity_id: "OP-ITG-018"
artifact_type: "Domain Diagnostic & Readiness Questionnaire"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
---

# MIP Readiness & Intelligence Operations Diagnostic (`OP-ITG-018`)

Score each of the **25 diagnostic controls** (`1` to `5`) based on **verifiable operational evidence** (scorecards, registries, SIEM/FinOps logs, retention proofs, board packs):

| Score | Maturity Level | Evidence Standard |
| :---: | :--- | :--- |
| **1** | **Ad Hoc / Vacuum** | Neither MSP, MSSP, nor internal team owns ongoing intelligence governance; controls decay immediately after pilots. |
| **2** | **Informal / Reactive** | Sporadic manual checks triggered only by audit findings, bill shocks, or user complaints. |
| **3** | **Defined Cadence** | Documented monthly/quarterly review calendar, named business owners, and baseline reporting across primary AI tools. |
| **4** | **Managed & Measured** | Automated telemetry, FinOps caps, RAG quality scoring, and continuous compliance evidence collection. |
| **5** | **Continuous Truth Governance** | Closed-loop 6-stage operating model (`Observe → Measure → Govern → Trace → Certify → Improve`) with board-level P&L attribution. |

---

## Pillar 1 — Digital Labor & Agent Fleet Operations (`OP-ITG-013`/`016`) *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **1.1** | Is the enterprise Agent Inventory reconciled monthly against Entra Agent ID / cloud workload identities? | Monthly reconciliation log | |
| **1.2** | Are hard token/API FinOps budgets and anomaly alerts enforced per department and agent? | FinOps ceiling config + alert log | |
| **1.3** | Does every active agent have a verified Human Sponsor with automated Mover/Leaver revocation? | Sponsor register + IAM trigger log | |
| **1.4** | Are agent actions logged centrally (Agent 365 / SIEM) with sub-5-minute kill-switch testing? | SIEM dashboard + last drill date | |
| **1.5** | Is a clear RACI boundary documented separating MSP (infra), MSSP (SOC), and Intelligence Ops? | Signed MSP/MSSP/MIP RACI matrix | |

## Pillar 2 — Knowledge, Context & Ontology Stewardship (`OP-ITG-014`)
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **2.1** | Are SharePoint/Teams/Confluence RAG sources scored monthly for staleness, duplication, and conflicts? | RAG freshness & hygiene scorecard | |
| **2.2** | Are canonical business entities and domain taxonomies governed under change control? | Enterprise taxonomy/ontology register | |
| **2.3** | Are superseded policies and draft documents quarantined automatically from AI retrieval indexes? | Quarantine / lifecycle automation rule | |
| **2.4** | Are sensitivity labels and least-privilege context boundaries audited before new Copilot/agent rollouts? | Purview / oversharing audit report | |
| **2.5** | Are human-reported hallucination or citation errors tracked to root-cause context fixes? | Context defect register & SLA | |

## Pillar 3 — Continuous AI Compliance & Evidence Assurance (`OP-RSK-004`/`005`) *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **3.1** | Is the EU AI Act Annex III / ISO 42001 / NIST AI RMF control matrix updated continuously (not once a year)? | Live compliance evidence pack | |
| **3.2** | Are high-risk AI decisions backed by immutable evidence chains (model version, dataset, human reviewer)? | Decision traceability / WORM log | |
| **3.3** | Are AI Purpose Clauses and negative-exclusion rules enforced across all vendor & internal AI contracts? | Executed policy & vendor register | |
| **3.4** | Is pre-assurance documentation kept conflict-free and export-ready for external statutory auditors/registrars? | Auditor-ready evidence index | |
| **3.5** | Are regulatory changes (EU AI Act implementing acts, DORA/NIS2, IFRS 18) mapped to controls quarterly? | Quarterly regulatory change log | |

## Pillar 4 — Sovereign & Hardware-Isolated Execution (`OP-ITG-015`/`017`)
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **4.1** | Are untrusted agent code/tool executions isolated in hardware-virtualized sterile sandboxes (e.g., MXC Hyper-V)? | Isolation architecture & audit proof | |
| **4.2** | Are golden base images separated from dev toolchains and verified immutable after every session? | Offline VHDX audit + parent invariance log | |
| **4.3** | Are data residency and cryptographic sovereignty boundaries mapped across cloud/LLM providers? | Trust topology & egress whitelist | |
| **4.4** | Are sandbox standby pools monitored for wake SLA, memory footprint, and clean teardown hygiene? | Pool telemetry & sterility report | |
| **4.5** | Are secrets and guest credentials isolated from prompts, repos, and wire payloads? | Credential Manager / vault audit | |

## Pillar 5 — Executive & Board Intelligence Capital Reporting (`OP-FIN-009`/`011`)
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **5.1** | Does leadership receive a monthly Intelligence Health & Risk Scorecard covering all 5 pillars? | Monthly scorecard archive | |
| **5.2** | Is AI/agent spend tied directly to measurable operational or financial P&L outcomes quarterly? | Quarterly Board ROI brief | |
| **5.3** | Are financial flash vs. attested close metrics clearly separated with zero unverified AI figures in board packs? | Provisional vs. Attested policy | |
| **5.4** | Does an executive sponsor (CEO/CIO/CFO/CISO) review P0 intelligence risks at least monthly? | Steering committee minutes | |
| **5.5** | Are lessons learned and governance changes tracked in a closed-loop improvement register? | Adaptation / improvement register | |

---

## Top-10 P0 MIP Vacuum Red-Flag Triage
1. **No named owner** between MSP and MSSP for AI agent governance.
2. **Uncapped LLM/agent API keys** with zero monthly FinOps alerting.
3. **Stale compliance binder** (>90 days old) ahead of Dec 2, 2027 EU AI Act Annex III deadline.
4. **Copilot/RAG oversharing** exposing HR, payroll, or M&A folders to general staff.
5. **Orphaned agents** still authenticating after their creator left the company.
6. **Untrusted agent execution** running directly on shared developer/production hosts without VM isolation.
7. **Big Four independence conflict** blocking the statutory auditor from engineering remediation controls.
8. **Zero decision traceability** for high-risk automated HR, credit, or finance outputs.
9. **Unreviewed vendor AI features** auto-enabled in SaaS platforms without DPO/CISO sign-off.
10. **No Board ROI visibility** — growing AI license spend with zero measured P&L return.
