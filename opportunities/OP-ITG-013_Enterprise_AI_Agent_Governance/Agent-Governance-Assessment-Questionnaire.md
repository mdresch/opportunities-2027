---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Executing / Advisory Delivery Asset"
lifecycle_stage: "Stage 1b–2 Deliverable Template (OP-ITG-013)"
opportunity_id: "OP-ITG-013"
version: "1.0"
date: "2026-11-23"
owner: "Menno Drescher, CBa Consult"
---

# Enterprise AI Agent Governance Assessment — 8-Pillar Diagnostic Questionnaire & Maturity Scorecard (`OP-ITG-013`)

**Purpose:** Deliverable-ready, vendor-neutral diagnostic instrument for **Tier 1 (Phase 0 Agent Sprawl & Identity Triage, €2,500–€5,000)** and **Tier 2 (Full 8-Pillar Assessment, €6,000–€18,000+)**. Aligned with **Microsoft Entra Agent ID & Agent 365**, **COBIT 2019**, **NIST AI RMF**, **ISO/IEC 42001**, **EU AI Act (Annex III, Dec 2, 2027)**, **DORA/NIS2**, and **SOX 404 / ISA 265 ITGC** controls.

---

## 1. Scoring Scale & 5-Level Maturity Rubric

Score each of the **40 diagnostic questions** (`0` to `5`) based on **verifiable evidence** (tenant exports, IAM policies, logs, written SOPs) — never verbal assurance alone:

| Score | Maturity Level | Evidence Standard |
| :---: | --- | --- |
| **1** | **Ad Hoc / Shadow** | No formal visibility, policy, or technical control; agents run on personal accounts or unmanaged API keys. |
| **2** | **Emerging / Informal** | Partial spreadsheets or local team rules exist; inconsistent enforcement; high audit/breach exposure. |
| **3** | **Defined / Standardized** | Documented enterprise policy, named owners, and baseline Entra/IAM controls applied to primary platforms. |
| **4** | **Managed / Measured** | Automated discovery, least-privilege NHIs, FinOps caps, and centralized SIEM/Agent 365 telemetry with periodic access reviews. |
| **5** | **Optimized / Auditable** | Continuous control monitoring, cryptographic/immutable audit trails, automated kill switches, and board-ready EU AI Act / ISO 42001 assurance. |

**Pillar Score** = Average of its 5 questions (`1.0–5.0`). **Overall Agent Governance Index** = Weighted average across all 8 pillars (Pillars 1, 3, 4, and 6 carry `1.25×` audit-criticality weight).

---

## 2. The 40-Question Diagnostic (8 Governance Pillars)

### Pillar 1 — Agent Inventory & Discovery *(Audit-Critical: 1.25×)*
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **1.1** | Is there a single, authoritative registry of all active AI agents across M365 Copilot Studio, Power Platform, Azure/AWS/GCP, SaaS (Salesforce, ServiceNow), and custom/n8n/MCP stacks? | Exported Agent Inventory Register / Agent 365 registry | |
| **1.2** | How are unmanaged ("shadow") agents and citizen-built copilots discovered automatically across tenants and developer environments? | Discovery scan logs / Defender / CASB / Agent 365 telemetry | |
| **1.3** | Does every registered agent carry a formal risk classification (Low / Medium / High / EU AI Act Annex III) tied to data sensitivity and action autonomy? | Risk-tier rubric & tagged inventory export | |
| **1.4** | Are third-party vendor-embedded AI agents (SaaS copilots, external MCP servers) tracked alongside internally built agents? | Vendor/SaaS AI inventory + DPA/RoI mapping | |
| **1.5** | How frequently is the agent inventory reconciled against active cloud/tenant credentials to detect orphaned or "zombie" agents? | Quarterly reconciliation log & variance closure record | |

### Pillar 2 — Agent Owners & Human Accountability
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **2.1** | Does every production and pilot agent have a named **Human Sponsor** (business owner) and technical custodian recorded in the directory? | Entra Agent ID sponsor attribute / ownership register | |
| **2.2** | What happens automatically when an agent's Human Sponsor changes roles or leaves the organization (Mover/Leaver trigger)? | HRIS → IAM transfer/suspension workflow log | |
| **2.3** | Is there an explicit **Human-in-the-Loop (HITL) / Human-on-the-Loop** escalation matrix defining which actions an agent may execute autonomously vs. requiring human sign-off? | Signed Decision Authority Matrix (FULL vs. LOW / approval thresholds) | |
| **2.4** | Is executive accountability (CIO / CISO / CAIO / Risk Committee) formally chartered for approving high-risk agent deployments? | Governance charter / ARB meeting minutes | |
| **2.5** | Can an incident responder identify and reach the responsible human owner for any anomalous agent within 15 minutes? | Escalation runbook + on-call contact test | |

### Pillar 3 — Agent Identity & Non-Human Access (Entra Agent ID / NHI) *(Audit-Critical: 1.25×)*
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **3.1** | Do agents authenticate using dedicated **Non-Human Identities (NHIs)** (e.g., Entra Agent ID / workload identity federation) rather than shared human accounts or static API keys? | Entra / IAM credential audit export | |
| **3.2** | Are **Agent Identity Blueprints** (or equivalent IAM policy templates) used to enforce consistent baseline security across agent fleets? | Blueprint / IaC policy definitions | |
| **3.3** | Are **Conditional Access** policies (location, risk score, token lifetime, device/workload posture) enforced specifically for agent identities? | Conditional Access policy export | |
| **3.4** | Are agent tokens short-lived (just-in-time / OAuth 2.0 scoped) with automated secret/certificate rotation and zero hardcoded keys in prompts or repos? | Token TTL settings + secret-scanning report | |
| **3.5** | Does a tested, sub-5-minute **"kill switch"** exist to revoke an agent's identity and terminate active sessions immediately upon anomaly detection? | Revocation runbook + last tabletop/drill timestamp | |

### Pillar 4 — Tool, API Permissions & Segregation of Duties (SoD) *(Audit-Critical: 1.25×)*
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **4.1** | Are agent tool/API permissions strictly partitioned between **Read-Only** and **Write / Transactional** scopes (ERP, CRM, HRIS, banking, email)? | API permission matrix & OAuth scope review | |
| **4.2** | Are **Segregation of Duties (SoD)** rules enforced for financial, payroll, and procurement agents (e.g., an agent cannot both create a vendor/journal and approve/post it)? | SoD conflict matrix & compensating control log | |
| **4.3** | Are external **MCP (Model Context Protocol)** servers and **Agent-to-Agent (A2A)** tool calls restricted to an approved allowlist with signed schemas? | MCP/A2A allowlist & gateway policy | |
| **4.4** | Are untrusted code-execution or file-processing agents isolated in hardened sandboxes (e.g., hardware Type-1 VM / ephemeral container) rather than shared host kernels? | Runtime isolation architecture diagram & config | |
| **4.5** | Are periodic **User & Agent Access Reviews (UARs)** executed and evidenced for external audit (SOX 404 / ISA 265 ITGC)? | Signed quarterly access-review evidence packs | |

### Pillar 5 — Lifecycle & "Disposable App" Control
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **5.1** | Is there a formal **Dev → Test → Prod** promotion gate for agents (testing prompt injection, hallucination bounds, and tool-call safety before production)? | Promotion checklist & pre-prod test evidence | |
| **5.2** | Are model versions, system prompts, and tool definitions under **version control** with segregated change approval (preventing silent drift)? | Git/CI change logs + CAB/ARB approval trail | |
| **5.3** | Do pilot and "disposable" citizen-built agents have mandatory **Time-to-Live (TTL)** expiration dates forcing renewal or automatic decommissioning? | Lifecycle expiry policy & archival logs | |
| **5.4** | Is there a clean **Decommissioning Protocol** that revokes credentials, archives audit logs per statutory retention, and purges stale RAG indexes? | Decommissioning SOP + sample closure ticket | |
| **5.5** | How are third-party foundation-model updates (e.g., deprecated LLM snapshots) regression-tested before impacting production workflows? | Model-pinning policy & regression suite results | |

### Pillar 6 — Agent Observability & Immutable Audit Trail *(Audit-Critical: 1.25×)*
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **6.1** | Are agent prompts, retrieved context references, tool/API invocations, outputs, and human overrides logged centrally (e.g., **Agent 365 / Microsoft Sentinel / SIEM**)? | SIEM/Agent 365 log schema & sample event | |
| **6.2** | Do high-impact agent logs capture the **5 minimum audit fields** (timestamp + actor/agent ID, pinned model & policy hash, input/retrieval lineage, action/output, human-override record)? | Audit log field verification against EU AI Act Art. 12 | |
| **6.3** | Are audit logs stored in **tamper-evident / WORM** (Write-Once-Read-Many) or cryptographically hashed storage aligned with statutory retention (6–10 yrs)? | WORM/immutability config + retention schedule | |
| **6.4** | Are real-time anomaly alerts configured for prompt injection, abnormal tool-call spikes, mass data exfiltration, or privilege-escalation attempts? | SOC/SIEM alert rules + sample incident ticket | |
| **6.5** | Can the organization reconstruct a complete decision provenance chain for an external auditor or regulator within 24–48 hours? | Mock audit-retrieval drill timing & evidence | |

### Pillar 7 — Agent FinOps, Token Metering & Throttling
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **7.1** | Are token, API, and compute costs attributed to specific **cost centers, business units, and individual agent IDs** (chargeback / showback)? | FinOps tagging schema & monthly cost report | |
| **7.2** | Are hard **rate limits, loop breakers, and monthly spending ceilings** enforced technically to prevent runaway recursive agent loops? | Gateway throttling / budget cap configuration | |
| **7.3** | Does every production agent track a defined **ROI / business-value metric** (hours saved, cycle-time delta, error reduction) against its total run cost? | Agent business-case & quarterly ROI review | |
| **7.4** | Are LLM routing policies optimized (routing routine tasks to smaller/cheaper models and reserving frontier models for high-complexity reasoning)? | Model-routing policy & cost-per-task benchmark | |
| **7.5** | Are consumption-based AI vendor contracts reconciled monthly against internal metering logs for **ASC 606 / IFRS 15 / accrual accuracy**? | Monthly FinOps-to-GL reconciliation sign-off | |

### Pillar 8 — Sovereign, Privacy & Regulatory Guardrails
| # | Diagnostic Question | Required Evidence | Score (1–5) |
| --- | --- | --- | :---: |
| **8.1** | Are **Data Loss Prevention (DLP)** and sensitivity labels (e.g., Microsoft Purview) enforced on agent inputs, grounding data, and external API calls? | Purview/DLP policy export & test block log | |
| **8.2** | Are **zero-data-retention (ZDR)** and **no-training** contractual clauses verified across all LLM/agent API providers? | Signed enterprise DPA / AI addendum registry | |
| **8.3** | Are regional data-residency and cross-border transfer boundaries (GDPR Chapter V, CLOUD Act, sovereign cloud) enforced per agent workload? | Data-flow map & region-pinning configuration | |
| **8.4** | Are high-risk agents mapped to **EU AI Act Annex III (Dec 2, 2027)**, **GDPR Art. 22** (automated decisions), and **DORA/NIS2** obligations with documented AI Impact Assessments? | Completed DPIA / FRIA / Annex III mapping | |
| **8.5** | Are statutory **record-retention** requirements (7–10 yr tax/audit) cleanly decoupled from **GDPR erasure** obligations in agent logs (pseudonymized/split-clock architecture)? | Split-clock retention & erasure SOP | |

---

## 3. Enterprise Agent Inventory Register Schema (Deliverable #1 Template)

Every client engagement populates this minimum 12-column register during Weeks 1–2:

| Field | Description / Allowed Values |
| --- | --- |
| `Agent_ID` | Unique immutable identifier (e.g., `AGT-FIN-001`) |
| `Agent_Name & Platform` | Display name + host (`Copilot Studio`, `Power Automate`, `Azure AI Foundry`, `AWS Bedrock`, `n8n`, `Custom`, `SaaS`) |
| `Human_Sponsor` | Named accountable business owner (synced to HRIS Mover/Leaver) |
| `Technical_Custodian` | IT/Engineering owner responsible for patches, prompts & keys |
| `Identity_Type` | `Entra Agent ID` / `Service Principal` / `Shared Human Account [RED FLAG]` / `Static API Key [RED FLAG]` |
| `Autonomy_Level` | `L1 Assistive` / `L2 Human-in-the-Loop` / `L3 Autonomous with Cap` / `L4 Unbounded [RED FLAG]` |
| `Connected_Systems` | ERP, CRM, HRIS, SharePoint, External APIs / MCP Servers (`Read` vs. `Write`) |
| `Data_Classification` | `Public` / `Internal` / `Confidential` / `PII / Financial / Regulated` |
| `Regulatory_Scope` | `EU AI Act Annex III` / `SOX ITGC` / `DORA` / `NIS2` / `GDPR Art. 22` / `Standard` |
| `Monthly_FinOps_Cap` | Hard EUR/USD monthly ceiling + loop-breaker status (`Enforced` / `None [RED FLAG]`) |
| `Audit_Log_Sink` | `Agent 365` / `Sentinel/SIEM` / `WORM Archive` / `Unlogged [RED FLAG]` |
| `Lifecycle_Status & TTL` | `Pilot` / `Prod` / `Sunset` + mandatory review/expiry date |

---

## 4. Top-10 Immediate Red-Flag Triage Checklist (Tier 1 Phase 0 Output)

Flag any of the following as **Critical (P0)** during the 2–3 week Tier 1 Triage (`€2,500–€5,000`):
1. Production agent authenticating via a **human employee's credentials** or long-lived static API key.
2. Agent with **write access to ERP/banking/payroll** without Segregation of Duties (SoD) or human approval gate.
3. Active agent with **no named Human Sponsor** (or sponsor has left the company — "zombie agent").
4. Uncapped consumption-based LLM/agent workflow with **no rate limit or monthly FinOps ceiling** (runaway loop exposure).
5. Agent grounding on **unlabeled SharePoint/Confluence folders** exposing HR, M&A, or executive PII (oversharing).
6. Agent invoking **unvetted third-party MCP servers or external APIs** without DLP or zero-data-retention DPA.
7. Zero centralized logging of agent prompts, tool calls, or outputs (**non-auditable** under EU AI Act Art. 12 / SOX).
8. No tested **<5-minute kill switch** to revoke a compromised agent's access.
9. High-risk HR/credit/compliance agent operating without a **GDPR Art. 22 / EU AI Act Annex III** impact assessment.
10. Production prompts or model versions mutated directly in prod with **no version control or change-approval trail**.
