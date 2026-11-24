---
opportunity_id: "OP-RSK-004"
artifact_type: "Domain Diagnostic & ISO 42001 / EU AI Act Readiness Questionnaire"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
---

# AI Governance Certification Readiness Diagnostic (`OP-RSK-004` — "SOC 2 for AI")

Score each of the **25 diagnostic controls** (`1` to `5`) using verifiable governance & technical evidence mapped across **ISO/IEC 42001**, **NIST AI RMF**, and **EU AI Act**:

| Score | Maturity Level | Evidence Standard |
| :---: | :--- | :--- |
| **1** | **Unclassified / Shadow** | No AI system inventory, no AI-use policy, zero EU AI Act risk classification. |
| **2** | **Policy-Only Draft** | Generic AI guidelines exist on intranet; no system register, technical controls, or conformity evidence. |
| **3** | **Inventoried & Mapped** | AI systems cataloged and classified (Art. 5 / Art. 50 / Annex III); baseline ISO 42001 gap analysis complete. |
| **4** | **Controlled & Evidenced** | Binding AI Purpose Clauses, human-oversight logs, bias/explainability testing, and vendor DPA/AI addenda active. |
| **5** | **Audit & Registrar Ready** | Unified "SOC 2 for AI" evidence repository continuously maintained; ready for accredited ISO 42001 / regulatory inspection. |

---

## Pillar 1 — AI System Inventory & EU AI Act Risk Classification *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **1.1** | Are all internal, SaaS-embedded, and agentic AI systems cataloged in a single authoritative AI Register? | Unified AI System Register | |
| **1.2** | Has every system been screened for **EU AI Act Article 5 Prohibited Practices**? | Art. 5 negative-screening sign-off | |
| **1.3** | Have all **Annex III High-Risk** systems (HR/hiring, credit, essential services, safety) been formally tagged? | Annex III risk classification map | |
| **1.4** | Are **Article 50 transparency obligations** (AI disclosure, synthetic content labeling) mapped to customer/employee touchpoints? | Transparency disclosure matrix | |
| **1.5** | Is the organization's legal role (**Provider vs. Deployer vs. Importer**) documented per AI system? | EU AI Act role determination log | |

## Pillar 2 — Unified Control Cross-Walk (ISO 42001 / NIST AI RMF / EU AI Act) *(Weight: 1.25x)*
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **2.1** | Are AI controls mapped once across **ISO/IEC 42001**, **NIST AI RMF**, and **EU AI Act** without duplicate spreadsheets? | Cross-walk control matrix | |
| **2.2** | Is an **AI Management System (AIMS)** scope and Statement of Applicability (SoA) drafted per ISO 42001? | Draft AIMS scope & SoA | |
| **2.3** | Are AI risk assessments integrated with existing enterprise ISMS (ISO 27001), GDPR DPIAs, and DORA/NIS2? | Integrated risk register | |
| **2.4** | Are non-conformities and corrective actions tracked with named owners and target closure dates? | CAPA / remediation tracker | |
| **2.5** | Has an internal pre-audit readiness review been scheduled ahead of external registrar assessment? | Pre-audit schedule & scope | |

## Pillar 3 — Policy, Purpose Clause & Negative-Exclusion Guardrails
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **3.1** | Is a board-approved Corporate AI Policy & **AI Purpose Clause** binding across all employees and contractors? | Signed AI Policy & Purpose Clause | |
| **3.2** | Are explicit **negative exclusions** (prohibited data inputs, banned shadow tools, no unreviewed HR/credit decisions) enforced? | Acceptable-use & DLP rules | |
| **3.3** | Are third-party AI vendors vetted for training-data rights, sub-processors, and EU AI Act Art. 25–26 compliance? | Vendor AI risk assessment pack | |
| **3.4** | Are HR / Responsible AI guardrails (§8.2) enforced on any recruitment, performance, or workforce-analytics AI? | HR AI impact assessment | |
| **3.5** | Do employees complete documented AI literacy training (EU AI Act Article 4 requirement)? | AI literacy training completion log | |

## Pillar 4 — Human Oversight, Explainability & Decision Evidence
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **4.1** | Can human reviewers meaningfully understand, challenge, and override high-risk AI recommendations? | HITL override SOP & UI proof | |
| **4.2** | Are model versions, prompt templates, training/RAG datasets, and human approvals logged per high-risk decision? | Immutable decision evidence log | |
| **4.3** | Are pre-deployment bias, fairness, accuracy, and robustness tests documented for high-risk systems? | Model evaluation & bias test report | |
| **4.4** | Are security/red-team tests (prompt injection, data exfiltration, model evasion) executed before release? | AI red-team / security test log | |
| **4.5** | Are logs retained securely in tamper-evident (WORM) storage for statutory inspection periods? | WORM retention configuration | |

## Pillar 5 — Conformity Readiness & Post-Market Monitoring
| # | Diagnostic Control Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **5.1** | Is Annex IV technical documentation assembled for every high-risk AI system? | Technical documentation folder | |
| **5.2** | Are post-market drift, accuracy degradation, and serious-incident monitoring rules active in production? | Production monitoring & alert log | |
| **5.3** | Is there a documented EU AI Act **serious incident reporting** workflow (Article 73 timelines)? | Incident notification runbook | |
| **5.4** | Are management review meetings held quarterly to evaluate AIMS effectiveness and risk posture? | Management review minutes | |
| **5.5** | Is a clear roadmap funded and staffed to close all Annex III gaps well before **December 2, 2027**? | Pre-Dec 2027 remediation plan | |

---

## Top-10 P0 EU AI Act / ISO 42001 Red-Flag Triage
1. **No AI System Register** — organization cannot list its active AI tools or vendor AI features.
2. **Unscreened HR/recruitment or credit-scoring AI** operating without Annex III controls.
3. **Zero AI literacy training** despite EU AI Act Article 4 already being in force.
4. **No binding AI-use policy** or negative exclusions preventing confidential data paste into public LLMs.
5. **No human-override mechanism** on automated customer or employee decisions.
6. **Zero decision traceability** — unable to reconstruct model version, input data, or reviewer for an audit.
7. **Unvetted SaaS AI add-ons** auto-enabled without DPO/CISO sign-off or updated DPA.
8. **Duplicate compliance silos** burning budget separately on GDPR, NIS2, NIST, ISO 42001, and EU AI Act.
9. **No serious-incident notification procedure** aligned to regulatory reporting clocks.
10. **Waiting until Q4 2027** when accredited ISO 42001 registrars and compliance teams are bottlenecked.
