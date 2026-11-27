---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing (Stage 1b — Tier 2 Deeper Research)"
lifecycle_stage: "Stage 1b (Ideation / Tier 2 Research)"
opportunity_id: "OP-ITG-013"
inputs:
  - "Ideation-Spark.md"
  - "One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md"
  - "Primary vendor & analyst sources (Gartner June 2025 press release, Microsoft Entra Agent ID / Agent 365 documentation, ServiceNow AI Control Tower, Okta NHI, SailPoint ISC, Wiz, EU AI Act / DORA / ISO 42001)"
  - "Live repository audit of CBA-Consult/ICT-Governance-Framework-Application, mdresch/sidpa-template, and mdresch/mxc"
outputs:
  - "Tier-2-Market-Research.md"
---

# Tier 2 Market Research — `OP-ITG-013`: Enterprise AI Agent Governance Assessment

**Date:** 2026-11-23  
**Portfolio Position:** Core 5 Active Tier A Flagship · Strategic Value **#1** · Authoritative Delivery Sequence **#5** (Q2 2027)  
**Scope:** Empirical market demand, competitive control-plane landscape (Microsoft Agent 365 / Entra Agent ID, ServiceNow AI Control Tower, Okta, SailPoint, Wiz), honest CBa Consult IP readiness audit, target-segment prioritization, two-tier commercial packaging, and Stage 2 Business Case quantification requirements.

---

## 1. Market Demand & Primary-Source Evidence (2025–2027)

Enterprises have shifted rapidly from isolated chatbots to autonomous, multi-step **agentic AI** systems that hold credentials, invoke APIs, and mutate ERP/CRM/HRIS records. Traditional IAM and IT governance models — built around human employees and static application registrations — break under **"agent sprawl"**:

- **Cancellation Risk (Primary Source — Gartner, June 25, 2025):** *"Over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value or inadequate risk controls."* (Anushree Verma, Senior Director Analyst, Gartner, Inc.).
- **Specialized Market Emergence (2025–2026):** Industry analysts estimate the dedicated enterprise AI agent governance and control-plane market (agent registries, non-human identity governance, gateways, and runtime observability) at **\$1.0B–\$1.5B** in 2026, accelerating rapidly as shadow agents proliferate across Copilot Studio, Power Platform, AWS Bedrock, Salesforce Agentforce, n8n, and custom MCP/A2A pipelines.
- **Hard Regulatory Forcing Functions (2026–2027):**
  - **EU AI Act Annex III (December 2, 2027):** High-risk AI systems require logging, human oversight, risk management, and traceability (Art. 12, 14, 18, 19, 26).
  - **DORA & NIS2 (Active in EU):** Financial and essential entities must govern ICT third-party risk, non-human privileged access, and immutable incident audit trails.
  - **SOX 404 / ISA 265 ITGC Escalation:** Autonomous agents posting or reconciling financial data without Segregation of Duties (SoD), human sponsors, or change-control logs directly trigger ITGC Significant Deficiencies and Material Weaknesses (direct upstream bridge from `OP-FIN-012`).

---

## 2. Competitive Control-Plane Landscape & The Mid-Market Gap

Major software vendors have converged on treating AI agents as **Non-Human Identities (NHIs)** — yet each vendor solves only one slice of the stack and prices for Fortune 500 enterprises:

| Vendor / Platform | Primary Entry Point | Core Capabilities (2025–2026) | Structural Gap CBa Consult Closes |
| --- | --- | --- | --- |
| **Microsoft Entra Agent ID & Agent 365** | M365 / Azure Identity & Control Plane | First-class agent NHIs, Agent Identity Blueprints, mandatory Human Sponsors, Conditional Access for agents, Purview/Defender integration, OAuth 2.0 / MCP / A2A + Auth SDK sidecar for third-party agents. | Powerful primitives, **zero turnkey operating model** — mid-market IT teams lack the inventory discipline, SoD policy matrix, FinOps caps, and cross-functional CIO/CISO/CFO governance to configure and audit it. |
| **ServiceNow AI Control Tower** *(+ Late-2026 Control Tower Alliance: OpenAI, Anthropic, AWS, Cisco, NVIDIA, Okta)* | Enterprise Workflow / ITSM | Central "air traffic controller," Traceloop runtime observability, EU AI Act/NIST mapping, Veza access kill switch. | Enterprise licensing + SI rollout (\$250k–\$1M+) is out of reach for 250–2,500 seat mid-market organizations. |
| **Okta (NHI Governance)** | Identity & Access Management | Agent authentication, scoped token lifecycles, Identity Threat Protection & instant access revocation ("kill switch"). | Solves token auth/revocation, not business-owner accountability, disposable-app lifecycle, or FinOps ROI ceilings. |
| **SailPoint (Identity Security Cloud)** | Identity Governance & Admin (IGA) | Agentic workflow discovery connectors, lineage mapping, automated access certifications. | Heavy IGA platform footprint; requires existing SailPoint estate and specialist implementation. |
| **Wiz (CNAPP / AI-SPM)** | Cloud & Runtime Security | Cloud-native AI posture, LLM misconfiguration scanning, shadow-AI pipeline detection across AWS/Azure/GCP. | Infrastructure/cloud-posture focus; does not define human accountability, ERP/CRM SoD, or board-level compliance readiness. |
| **Big Four & Statutory Auditors** | Enterprise Advisory | Multi-month AI governance frameworks (\$150k–\$500k+). | **Independence conflict:** PCAOB/AICPA and EU PIE rules bar statutory auditors from designing and remediating ITGC/SoD agent controls for their own audit clients. |

**Core Commercial Message:** *"Platform vendors sell agent control planes; statutory auditors flag your ITGC gaps — CBa Consult delivers the conflict-free, fixed-scope operating model, inventory, SoD blueprint, and FinOps guardrails that turn unmanaged agents into auditable digital labor."*

---

## 3. Priority Target Segments (Where Buyer Pain & Budget Peak)

Rather than pitching generic AI strategy, `OP-ITG-013` concentrates on three high-urgency segments:

1. **M365 / Copilot Studio & Power Platform Mid-Market Enterprises (250–2,500 seats — Primary Wedge):** Rapidly accumulating unmanaged Copilot Studio bots, Power Automate flows, and third-party agents on shared human credentials; already licensed for Microsoft Entra / M365, making **Entra Agent ID + Agent 365** readiness immediately actionable without buying ServiceNow or SailPoint.
2. **Regulated Financial, Insurance & Healthcare Firms (EU DORA / NIS2 / EU AI Act Annex III):** Facing hard compliance deadlines and external audit ITGC scrutiny over automated workflows, non-human credentials, and immutable AI logging.
3. **PE-Backed Portfolio Companies & Acquisition-Active Mid-Market Firms:** High agent experimentation across acquired entities with lean IT/security teams — direct cross-sell from **`OP-FIN-012`** (when annual Management Letters flag ITGC/SoD/zombie-account findings).

*(Low-fit segment to avoid: <50-seat early startups with no compliance triggers or formal CIO/CISO sponsor.)*

---

## 4. Honest CBa Consult IP Readiness Audit (Zero Fabrication)

Live repository inspection (`2026-11-23`) confirms what is genuinely reusable today vs. what is methodology-delivered — preventing overclaiming during CIO/CISO discovery:

| CBa Consult Asset | Verified Current State | Role in `OP-ITG-013` Pilot #1 | Honest Boundary |
| --- | --- | --- | --- |
| **`CBA-Consult/ICT-Governance-Framework-Application`** | Active multi-cloud (AWS/Azure/GCP) Zero Trust, tenant isolation, IaC lifecycle, drift detection & cost-control platform (last pushed `2026-09-13`). | Provides the **governance control model** (lifecycle, Zero Trust, drift, cost control) adapted for AI agents. | Does **not** yet ship native Microsoft Agent 365 / Entra Agent ID API connectors — Pilot #1 is methodology/scorecard-led, not a SaaS connector install. |
| **`mdresch/sidpa-template`** | Live, pytest-verified (`21/21` passing) Bayesian `DecisionFrame` governance scaffold (`DecisionAuthority.FULL` vs. `LOW`, `minimum_margin = 0.05` tie-break halting, `requires_human_approval: true`, Permanent Lineage Freeze). | Live **reference pattern** for human-in-the-loop escalation, audit-trail governance, and verifiable decision authority. | Reference architecture & governance proof — not deployed as client production software in a 6-week advisory assessment. |
| **`mdresch/mxc` (`OP-ITG-017`)** | Track B program **Stage 18 complete** (`PMP-BL-v4.0.0`, Phases 1–4) per [mxc Project-Status-Register](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/registers/Project-Status-Register.md). | Tangible **hardware-isolation proof layer** for clients asking how to safely sandbox untrusted agent code execution ([OP-ITG-017 commercial pack](../OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero/MXC-Repo-Artifact-Crosswalk.md)). | Client Pilot #1 on customer silicon still required for `G4`; advisory attach in Q2–Q4 2027. |
| **Existing Portfolio Docs** | [One_Pager_OP-ITG-013](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md) (8 Governance Pillars) + [Accounting & AI Pricing Executive Brief](../../docs/reports/Executive_Brief_Accounting_Audit_and_Future_AI_Pricing_Strategies_2027_2030.docx) (immutable AI audit trails + FinOps ceilings). | Directly powers Pillars 6 (Observability/Audit), 7 (Agent FinOps), and 8 (Sovereign/Regulatory Guardrails). | Standalone **8-Pillar Assessment Questionnaire & Maturity Scorecard** still needs to be authored before Pilot #1 kickoff (next build step). |

---

## 5. Realistic Two-Tier Commercial Packaging & MIP Conversion

Applying the margin-protection lesson from `OP-FIN-012` (where 45–100+ hours of enterprise interviews, tenant review, and blueprint design underprice at a flat €4k), `OP-ITG-013` is packaged in **two explicit tiers** plus recurring conversion:

1. **Tier 1 — Phase 0 Agent Sprawl & Identity Triage (`€2,500–€5,000` | 15–30 hrs | 2–3 weeks):**
   - *Wedge overlap:* Aligns directly with `OP-ITG-011` (Agent 365 & Entra Quick-Start).
   - *Deliverables:* Rapid tenant/shadow-agent inventory snapshot, shared-credential & over-permissioned API red-flag scan, executive Top-10 risk register, and Phase 1 business case.
2. **Tier 2 — Full 8-Pillar Enterprise AI Agent Governance Assessment (`€6,000–€18,000+` | 45–100+ hrs | 6–10 weeks):**
   - *Deliverables:* (1) Enterprise Agent Inventory & Risk-Tier Register, (2) Entra Agent ID / Human Sponsor / SoD Least-Privilege Blueprint, (3) Agent 365 Observability, Immutable Audit-Trail & FinOps Spending-Ceiling Framework, and (4) Prioritized 90-Day Remediation Roadmap mapped to EU AI Act / ISO 42001 / DORA.
3. **Recurring Conversion — `OP-ITG-018` Managed Intelligence Provider / MIP (`€2,500–€12,000+/mo`):**
   - Quarterly agent-fleet access & drift reviews, FinOps ceiling tuning, new-agent onboarding gatekeeping, and continuous EU AI Act / ISO 42001 evidence stewardship — operating cleanly **above** the client's MSP (L1 IT) and MSSP (24/7 SOC).

*Explicit Scope Boundary:* CBa Consult delivers conflict-free assessment, governance architecture, and remediation blueprints; client IT/MSP owns production tenant administration, client MSSP owns 24/7 SOC containment, and accredited bodies retain formal ISO 42001 certification.

---

## 6. Stage 2 (Business Case) Next Quantification Requirements

To graduate `OP-ITG-013` from Stage 1b (Tier 2 Research) to an investment-grade Stage 2 Business Case and Pre-Pilot Gate (`G4`), the following five commercial variables must be quantified via primary CIO/CISO discovery (`HYP-2027-013` through `HYP-2027-015` in [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md)):

1. **Shadow-Agent Density:** Average number of unmanaged Copilot Studio / Power Platform / custom / third-party agents discovered per 250–2,500 seat mid-market target.
2. **Wedge-to-Assessment Conversion Rate:** Share of CIO/CISO buyers preferring Tier 1 Phase 0 Triage (`€2.5k–€5k`) vs. jumping straight to Tier 2 Full Assessment (`€6k–€18k+`).
3. **Budget Ownership & Cycle Time:** Whether budget clears faster under CISO (security/NHI), CIO (M365/Agent 365), or Risk/Compliance (EU AI Act Dec 2027), and typical procurement lead time.
4. **Serviceable Addressable Market (SAM):** Quantified count of M365-heavy and regulated mid-market enterprises in Benelux / EU lacking ServiceNow/SailPoint AI Control Towers.
5. **MIP Retainer Attach Rate:** Empirical probability of converting a completed `OP-ITG-013` assessment into an ongoing `OP-ITG-018` (MIP) retainer within 60 days of readout.

---

## 7. Sources Reviewed
- Gartner Press Release (June 25, 2025): *"Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027"* (Anushree Verma, Senior Director Analyst)
- Microsoft Documentation & Ignite 2026 Architecture: **Microsoft Entra Agent ID** (Agent Identity Blueprints, Human Sponsors, OAuth 2.0 / MCP / A2A, Entra ID Auth SDK sidecar) & **Microsoft Agent 365** (Observe, Govern, Secure, Operate)
- Enterprise AI Governance Vendor Positioning (2025–2026): ServiceNow AI Control Tower & Late-2026 Control Tower Alliance, Okta Non-Human Identity (NHI) Governance, SailPoint Identity Security Cloud (ISC) Agentic Workflow Discovery, Wiz AI-SPM
- EU AI Act (Art. 12, 14, 18, 19, 26; Annex III Dec 2, 2027), EU DORA / NIS2, ISO/IEC 42001, NIST AI RMF, PCAOB/AICPA & EU PIE auditor independence rules
- Live CBa Consult repository audit (`2026-11-23`): `CBA-Consult/ICT-Governance-Framework-Application`, `mdresch/sidpa-template`, `mdresch/mxc` (`origin/feat/hyperv-v2-rebased`)
