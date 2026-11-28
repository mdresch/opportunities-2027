---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Benefits & Commercial Viability (Stage 3 Business Case)"
lifecycle_stage: "Stage 3 (Commercial Viability & Options Analysis)"
opportunity_id: "OP-ITG-003"
execution_track: "Track A — Lightweight AI Micro-Service / Advisory Wedge (stays in oppurtunities-2027)"
requires_human_approval: "true"
approval_status: "PENDING_DIRECTOR_SIGNOFF"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Portfolio Spark & 2026 OP-IE-004 adaptation (Ideation-Spark.md)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Business Case — `OP-ITG-003`: Custom GPT / RAG for Internal Governance & Policy Docs

> **Authoritative SSOT & Governance Notice:** Authoritative inventory fields (`Core & Specialty Backlog` · `Medium & Large` · `8 wks` · `High` effort · `€1,500–€5,000` · `Q2–Q3 2027` · `Status = Idea`) live in [inventory-of-ideas.md](../../inventory-of-ideas.md). Authoritative delivery priorities live in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md). Companion files: [Ideation-Spark.md](Ideation-Spark.md), [Ideation-Document.md](Ideation-Document.md), [Source-Documents.md](Source-Documents.md).

---

## 1. Executive Summary

| Dimension | Business Case Summary |
| --- | --- |
| **Offering** | **Custom GPT / RAG for Internal Governance & Policy Docs (`OP-ITG-003`)** — fixed-scope policy Q&A micro-service built on existing client IT/security/HR documentation |
| **Economic Buyers** | CIOs, CTOs, CISOs, and Enterprise Architecture / HR Ops Leads (`Medium & Large` firms) |
| **Strategic Role** | **Backlog Wedge / `OP-ITG-014` Extension** — concrete implementation add-on after a Context Governance assessment or standalone vertical Q&A wedge |
| **Working Capital & Effort** | **`$0` initial working capital** · `8 wks` (`High` solo effort) · client pays own tenant/LLM usage |
| **Recommended Option** | **Option 3 — Tenant-Native Policy Q&A Micro-Service & Corpus Hygiene (`€1,500–€5,000`)** |

**Recommendation:** Hold `OP-ITG-003` as **`PARKED_IN_INVENTORY`** in the Core & Specialty Backlog. Given `High` effort (`8 wks`) against a modest `€1,500–€5,000` cap, pitch primarily as a follow-on or vertical wedge anchored to Tier A **`OP-ITG-014`** (`€3,500–€10,000`) rather than a standalone cold-outreach lead.

---

## 2. Business Need & Cost of Inaction

Employees and IT/HR service desks lose hours weekly hunting through fragmented policy PDFs, SharePoint folders, and Confluence spaces—or worse, follow superseded security and compliance rules:

- **Service-Desk Bottlenecks:** Repeat policy clarification tickets pull senior IT, Legal, and HR specialists away from strategic work.
- **Uncontrolled Shadow AI:** Frustrated staff paste internal policies into unapproved public LLMs or deploy uncurated Copilot bots that cite outdated procedures.
- **Audit Non-Conformance:** Inconsistent policy execution across teams creates DORA, NIS2, and ISO findings.

*Note: `OP-ITG-003` has no assigned ADPA `.docx` ROI model; pricing (`€1,500–€5,000`) is an unvalidated inventory benchmark.*

---

## 3. Strategic Options Analysis (BABOK v3 Aligned)

| Criterion | Option 1: Status Quo *(Static Policy Portals)* | Option 2: Enterprise AI Search SaaS / Custom Vector Build | Option 3: `OP-ITG-003` Tenant-Native Policy Q&A *(Recommended)* |
| --- | --- | --- | --- |
| **Core Mechanism** | Keyword search across SharePoint / PDF folders | Procure Glean/Moveworks or build bespoke RAG microservice | Curate policy corpus + configure Q&A assistant inside client's existing stack |
| **Total Client Outlay** | `$0` direct · high ticket & compliance drag | `€40,000–€150,000+` licenses or agency build | **`€1,500–€5,000` fixed fee · `$0` new SaaS spend** |
| **Access & Security Risk** | Low tech risk, high human error | Complex enterprise connector security | **Scoped ACL boundaries + mandatory source citations** |
| **Solo Margin Efficiency** | N/A | Requires engineering team | **Low-to-moderate solo margin unless standardized (`OP-ITG-014` bundle)** |
| **Verdict** | Rejected — friction persists | Rejected — over-scoped for policy Q&A | **Recommended** as `OP-ITG-014` companion or standardized template |

---

## 4. Commercial Packaging, $0 Working-Capital Model & Compounding Path

| Package Tier | Scope & Domain | Timeline & Effort | Price Anchor | Compounding Path |
| --- | --- | --- | --- | --- |
| **Tier 1: Single-Domain Policy Q&A** | 1 domain (IT/Security *or* HR policies, `≤50` core docs) + golden eval set | `4–6 wks` (tightly scoped) | **€1,500 – €3,000** | Upsells into `OP-ITG-014` (full Context Governance) |
| **Tier 2: Multi-Domain Policy Assistant + Refresh Runbook** | IT + Security + HR docs, RBAC audit, eval scorecard & owner handover | `8 wks` (`High` effort) | **€3,000 – €5,000** | Converts to `OP-ITG-018` (MIP quarterly curation) or vertical template reuse |

- **Margin Protection Note:** Delivering `8 wks` of custom RAG tuning for `€1,500` risks under-earning per hour. Standardize vertical templates (IT, HR, compliance) first under `OP-ITG-014` before offering standalone maintenance subscriptions.

---

## 5. Risk Register & Compensating Controls

| Risk / Constraint | Business Impact | Compensating Control |
| --- | --- | --- |
| **Dirty or conflicting source policies** | Assistant answers inaccurately, eroding sponsor trust | Enforce mandatory Week 1–2 corpus sign-off by client policy owners; block ingest of unapproved drafts |
| **Permission leakage / access-control gaps** | Restricted security or HR docs exposed to unauthorized users | Restrict pilot corpus to public-internal policies or inherit verified tenant RBAC before launch |
| **Low effective hourly yield on `8 wk / High` build** | Consumes `10–15 hrs/wk` cap for `€1,500–€5,000` | Gate behind `OP-ITG-014` discovery or cap custom effort via standardized vertical templates |

---

## 6. Stage 4 (G4) Pre-Pilot Gate & Director Adjudication

| Gate Field | Status / Entry |
| --- | --- |
| **Decision Owner** | Menno Drescher (Director, CBa Consult) |
| **Gate Status** | `PARKED` (`PARKED_IN_INVENTORY` — Core & Specialty Backlog; Pre-Stage 2, zero hypotheses registered; subordinate to Tier A `OP-ITG-014`) |
| **Re-Activation Trigger** | Client request during `OP-ITG-014` pilot readout OR standardization of ≥70% reusable vertical policy-RAG pack + Stage 2 hypothesis (`HYP-2027-NNN`) |
| **Approval Date & Notes** | *—* |
