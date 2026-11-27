---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-CX-003"
execution_track: "Track B (AI Micro-Service — Small-Tier CX Voice Sprint)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Opportunities to Publish/Voice App & Skill Developer.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-CX-003`: Voice App & Skill Developer

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Upstream framing is documented in [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Executive Summary

| Commercial Dimension | Locked Pre-Pilot Parameter |
| :--- | :--- |
| **Opportunity & Tier** | `OP-CX-003` — Core & Specialty Backlog (AI Micro-Service, Small Tier) |
| **Target Buyer** | CCOs, Heads of Customer Success, and Operations Leads |
| **Delivery Horizon & Effort** | 6 weeks, Medium effort (sweat-equity advisory + conversational prototyping) |
| **Capital & Target Window** | €500–€2,000 expected studio band (with \$0 upfront working capital) · Target Q3 2027 |
| **Compounding Vector** | Productize vertical voice-assistant templates and feed referenceable `OP-X-004` proof |

## 2. Business Need & Cost of Inaction

Small and mid-market service teams lose skilled agent capacity to repetitive status inquiries, appointment confirmations, and manual hands-free data entry. Delaying structured conversational automation leaves teams absorbing rising labor costs or deploying brittle DIY chatbots that degrade CSAT and create compliance exposure around unannounced AI voice interactions.

For field-service, logistics, and clinical operations, keyboard-bound workflows also create avoidable data-entry delays and transcription errors. A narrow, fixed-scope voice micro-interface resolves the bottleneck rapidly without locking the buyer into an expensive multi-year CCaaS migration.

> *Illustrative Pre-Pilot ADPA Source Modeling — Not Realized Client Actuals:* The legacy ADPA source (`Opportunities to Publish/Voice App & Skill Developer.docx`) frames a multi-app consumer voice portfolio targeting five launched skills and brand-engagement lift. Because platform demand for standalone consumer Alexa/Google skills has narrowed since 2024, those legacy portfolio projections are treated strictly as illustrative pre-pilot modeling. Commercial viability for 2027 rests on B2B operational micro-interfaces scoped inside the €500–€2,000 studio band rather than speculative B2C app-store returns.

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Option | Description | Expected Benefit | Risk & Effort Profile | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Option A — Do Nothing / Defer** | Keep `OP-CX-003` dormant indefinitely | Zero delivery distraction during Q1–Q2 Tier A push | Misses niche CX micro-service upsells in Q3 2027 | Reject (keep Q3 backlog slot) |
| **Option B — Broad B2C Voice App Studio** | Build 5 consumer Alexa/Google skills per legacy ADPA `.docx` | Potential brand showcase | High platform-churn risk, weak B2B buyer urgency, maintenance drag | Reject |
| **Option C — Fixed-Scope B2B CX Voice Micro-Service** | 6-week sprint converting 10–15 operational intents into a compliant voice skill + vertical template | Low-risk €500–€2,000 cash flow, rapid proof (`OP-X-004`), reusable IP | Medium effort; mitigated by client-owned cloud accounts and strict scope | **Recommended** |

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

- **Packaging & Pricing Anchor:** Fixed-scope 6-week Voice & Hands-Free Micro-Interface Sprint aligned to the €500–€2,000 Small-tier studio band, structured as 50% kickoff / 50% pilot-handover milestone invoicing.
- **Zero Working-Capital Mechanics:** All voice SDKs, LLM/speech APIs, and webhook hosts are provisioned inside the client's existing cloud tenant or free-tier sandbox during prototyping; CBa Consult contributes only methodology and Director/associate hours.
- **Unit-Economics Guardrail:** Restrict custom intent coverage to 10–15 flows and a maximum of two backend webhook endpoints so Medium delivery effort stays profitable inside the Small-tier fee band.
- **Compounding Path:** Each engagement harvests a sanitized intent taxonomy and dialogue template for one vertical (e.g., field maintenance, clinic intake, logistics dispatch), reducing build effort on subsequent clients and creating a warm bridge to broader CX or AI governance retainers.

## 5. Risk Register & Compensating Controls

| Risk ID | Risk Description | Likelihood / Impact | Compensating Control |
| :--- | :--- | :--- | :--- |
| `R-CX3-01` | Narrow platform demand for legacy smart-speaker skills | High / Medium | Pivot positioning from Alexa/Google consumer skills to B2B web/telephony/hands-free voice workflows |
| `R-CX3-02` | Post-delivery SDK deprecation and maintenance overhead | Medium / Medium | Deliver under client-owned repos with documented runbooks; exclude ongoing SLA from fixed sprint |
| `R-CX3-03` | Voice recording privacy or AI disclosure non-compliance | Low / High | Enforce EU AI Act Art. 50 disclosure prompt and zero persistent audio storage on CBa infrastructure |
| `R-CX3-04` | Poor speech recognition accuracy in noisy field environments | Medium / Medium | Mandate noisy-environment acoustic QA in Week 5 and provide crisp DTMF/text fallback paths |

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Criterion | Current Status | Evidence Required to Promote `Idea` to `Pilot` |
| :--- | :--- | :--- |
| **Approval Status** | `PENDING_DIRECTOR_SIGNOFF` | Formal Director sign-off after Q1–Q2 Tier A flagship execution capacity clears |
| **Discovery Validation** | Pending | 2–3 structured interviews with CCO/Ops buyers confirming hands-free/voice micro-interface willingness to pay |
| **Pilot Scope & KPI Lock** | Pending | Named pilot client, baseline call/ticket deflection metric, and signed client-account provisioning clause |
| **Director Decision** | `PENDING` | Adjudicate Q3 2027 launch vs. folding conversational UX into broader CX/AI offers |

**Gate Execution Rule:** `OP-CX-003` remains at status `Idea` (`PENDING_DIRECTOR_SIGNOFF`) until the Director records explicit approval above and locks the pilot client's cloud provisioning and EU AI Act Art. 50 disclosure scope.
