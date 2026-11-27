---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-MKT-005"
execution_track: "Track A — Lightweight Advisory / Toolkit"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Email Deliverability Consultant.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Stage 1b Ideation Document — `OP-MKT-005`: Email Deliverability Consultant

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> **Sibling Context:** [Ideation-Spark.md](Ideation-Spark.md) · [Source-Documents.md](Source-Documents.md)

## 1. Problem Context & 2027 Market Trigger

Small and mid-sized B2B organizations invest heavily in CRM sequences, lifecycle automation, and newsletters, yet silently lose pipeline when misconfigured SPF, DKIM, or DMARC records, unsegmented stale lists, and aggressive sending patterns push legitimate emails into spam folders. Marketing teams often diagnose poor campaign ROI as a copywriting problem when the actual failure is technical sender reputation and domain authentication.

In 2027, stricter inbox-provider enforcement (Google, Microsoft, and Yahoo bulk-sender authentication and spam-complaint thresholds) alongside tight marketing budgets makes inbox placement an immediate, quantifiable revenue leak.

- **Target Buyer Segment:** Founders, CMOs, and B2B Marketing Leads in Small & Mid organizations.
- **Core Wedge Pain:** Broken SPF/DKIM/DMARC alignment, degraded sender reputation, and unhygienic CRM lists throttling outbound/lifecycle conversion.
- **Positioning Anchor:** Fixed-scope 2–4 week technical diagnostic backed by the **Sales, Marketing & Communication Strategy** toolkit with `$0` initial CBa working capital.

## 2. Solution Architecture & Delivery Workflow

Distilling the three-phase methodology from `Email Deliverability Consultant.docx` into CBa Consult's lean **2–4 week** Track A **Audit / Diagnostic**:

| Phase | Timing | Core Activities | Concrete Client Deliverables |
| :--- | :--- | :--- | :--- |
| **1. Authentication & Reputation Audit** | Week 1 | Inspect DNS records (SPF, DKIM, DMARC, custom tracking domains), blacklist status, ESP configuration, and historical bounce/complaint logs. | Deliverability Diagnostic Scorecard & DNS Gap Report |
| **2. Technical Fix & List Hygiene** | Weeks 2–3 | Guide client IT/DNS owner through SPF/DKIM/DMARC alignment; clean suppressed/stale CRM segments and standardize opt-out/cadence rules. | Verified DNS Authentication Pack & CRM List-Hygiene Ruleset |
| **3. Template & Monitoring Handover** | Week 4 | Review high-converting lifecycle/outbound template hygiene (spam-trigger and rendering checks) and establish ongoing Postmaster/DMARC monitoring. | Deliverability Ops Runbook & Before/After Placement Check |

### Stakeholder & Channel Alignment (from ADPA)

- **Cross-Team Coordination:** Bridges Marketing Ops (campaign/list hygiene), IT/DNS Admins (SPF/DKIM/DMARC record publishing), Compliance (opt-out/GDPR alignment), and ESP configuration.
- **Continuous Verification:** Replaces one-off guesswork with Postmaster/DMARC reporting thresholds so internal teams spot reputation drift early.
- **Deliverability Triage:** Separates technical authentication defects from segmentation/engagement fatigue before changing copy or switching ESPs.

## 3. Market Comparables & CBa Consult Differentiation

| Alternative | Typical Model & Pricing | Key Limitations | CBa Consult `$0`-Capital Differentiation |
| :--- | :--- | :--- | :--- |
| **Deliverability SaaS Tools (Warmly, GlockApps, MailReach)** | Monthly SaaS subscriptions (€50–€400/mo) | Provide diagnostics or automated warm-up only; fail to fix CRM hygiene or DNS strategy. | Fixed-scope human diagnostic + implementation guidance in 2–4 weeks (€500–€2,000). |
| **Full-Service Outbound/CRM Agencies** | Monthly retainers (€3k–€10k/mo, 3–6 month minimums) | Bundle deliverability inside expensive ongoing campaign management. | Conflict-free technical diagnostic with zero agency retainer lock-in; pairs cleanly with `OP-MKT-001`. |
| **Internal Trial-and-Error by Marketing Ops** | Ad-hoc ESP support tickets | High risk of breaking live domain DNS or worsening sender reputation during guesswork. | Structured PMBOK-aligned checklist coordinating Marketing, IT/DNS, and Compliance cleanly. |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Origin & Location | Extracted Capabilities Reused in `OP-MKT-005` | Reuse Classification |
| :--- | :--- | :--- | :--- |
| `Email Deliverability Consultant.docx` | ADPA Projects Lists ([Source-Documents.md](Source-Documents.md)) | Three-phase workflow (Assessment → Implementation/Optimization → Monitoring), DNS auth + list hygiene + template optimization structure, cross-team alignment. | Primary Ideation Source |
| **Sales, Marketing & Communication Strategy Toolkit** | CBa Consult Signature Toolkit ([inventory-of-ideas.md](../../inventory-of-ideas.md)) | Small & Mid quick-start diagnostic framing and `OP-MKT-001` marketing-ops integration path. | Core Methodology |
| **Portfolio Inventory (`OP-MKT-005` Entry)** | [inventory-of-ideas.md](../../inventory-of-ideas.md) | 2–4 week Low-effort envelope (€500–€2,000) and `OP-MKT-001` add-on pairing. | Scoping SSOT |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **In Scope:** SPF/DKIM/DMARC audit and remediation guidance, CRM/ESP list-hygiene rules, outbound/lifecycle template deliverability review, and postmaster monitoring setup.
- **Explicitly Out of Scope:** Running ongoing cold-email outbound campaigns, purchasing/managing third-party sending domains at scale, or guaranteeing inbox placement if the client violates sending discipline.
- **Required Delivery Skills:** Email authentication, DNS/deliverability troubleshooting, and CRM hygiene (Director-led, zero external tools spend).
- **Client Prerequisites:** Named DNS/IT administrator and read-only ESP/Postmaster access available in Week 1.
- **Target Outcome & Proof (`OP-X-004`):** Fast before/after DNS alignment, bounce-rate drop, and sender-reputation recovery supporting `OP-X-004` proof.
- **Compounding / Scale Path:** Pair directly with `OP-MKT-001` Marketing-ops quick-start as a fast-turnaround technical add-on.
- **Primary Boundary Risk:** Dependent on timely client DNS registrar access and disciplined post-audit sending practices.
- **Lifecycle & Gate Status:** `Status = Idea` | `Active Pilots = 0`. Promotion to Stage 2 (`Hypothesis-Register.md`) and Stage 4 (`G4`) requires locking the DNS/ESP audit checklist and testing buyer demand as a standalone quick-audit or `OP-MKT-001` technical add-on.
