# Ideation Document — `OP-ITG-020`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))
**Primary source:** `Data_Integration_Interoperability_Plan_Template_Lifecycle_Spec.docx`

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
NEW TEMPLATE LIFECYCLE SPEC

Data Integration & Interoperability Plan

DMBOK knowledge area 6 of 11 — designed end-to-end through the Template Lifecycle framework

Prepared for: Menno Drescher — ADPA Project

1 July 2026 · Template Phase: Draft · Version 0.2.0 · DMBOK template 6 of 11

Source repository: github.com/mdresch/adpa

1. Executive Summary

Where the Architecture Charter states general integration patterns (batch, event, API) per domain, this template produces specific, bilateral integration contracts between named systems of record: what moves, how often, in what format, and under what interoperability standard. Every contract must name two real systems of record — dangling, one-sided flows are a blocking quality gate.

Why this template, why now:  Integration is where architectural intent meets operational reality, and where silent schema drift usually starts. Making every contract explicit and machine-checkable here is what lets Metadata Management later trace lineage without guessing.

2. Template Identity & Metadata

Field

Value

template_id

dmbok-data-integration-interoperability-plan

display_name

Data Integration & Interoperability Plan

knowledge_domain

Data Integration and Interoperability (DMBOK 2.0, Ch. 8)

category

dmbok

phase

Draft

version

0.2.0

output_formats

Markdown, DOCX, PDF, HTML, JSON

related_templates

Enterprise Data Architecture Charter (dmbok), Data Storage & Operations Plan (dmbok)

owner

ADPA template maintainers (mdresch/adpa)

3. Positioning in the Template Library

Turns the Architecture Charter's integration patterns into concrete, bilateral contracts between named systems of record.

Standard

Existing docs + specs before

After this template

PMBOK 7th Ed.

15 docs

15 docs

BABOK v3

9 docs

9 docs

DMBOK 2.0

19 docs + 5 lifecycle specs

19 docs + 6 lifecycle specs

4. Entity Profile

4.1 Inputs

Entity

Source

Required?

SystemOfRecord + IntegrationPattern

Architecture Charter output

Required

DataDomain

Data Governance Charter output

Required

Existing API / interface inventory

User-supplied or GKG

Optional

Existing integration content

docs/generated-documents/dmbok/data-integration-interoperability-strategy.md

Required — see §6.3

4.2 Outputs (entities produced)

Entity

Description

IntegrationContract

Named bilateral agreement between two systems of record

DataFlowMapping

Source → target field-level mapping reference

InteroperabilityStandard

Format/schema-versioning standard the contract follows

APIInventoryEntry

Catalog entry for any API-based contract

5. System Prompt

The literal system_prompt field for the template record.

ROLE: You are drafting a Data Integration & Interoperability Plan,

conceptually aligned to DMBOK 2.0 Ch.8 — do not reproduce proprietary text.

 

TONE: Technical, contract-like. Every integration contract must name exactly

two systems of record already designated in the Architecture Charter. Never

invent a system, format, or standard not supplied or already in the GKG.

 

GROUNDING (see §6.3 — mandatory, checked before drafting):

  - Reuse the integration patterns already defined in data-integration-

    interoperability-strategy.md §5 (batch ETL/ELT, real-time webhooks/API,

    hub-and-spoke architecture) and the format standards in §6 (JSON default,

    XML for Adobe) rather than proposing new patterns.

  - Reuse the KPI targets already set in §10 (>99.9% uptime, >99.5% accuracy,

    <300ms response, <1% error rate) as the default targets per contract.

 

REQUIRED SECTIONS (in order):

  1. Purpose & Scope        4. Data Flow Mappings          7. Error Handling & Retries

  2. Integration Inventory  5. Interoperability Standards  8. Change Management

  3. Contract Register      6. API Inventory                9. Review Cadence

 

EXTRACTION RULES:

  - Tag each contract as [ENTITY:IntegrationContract].

  - Tag each mapping as [ENTITY:DataFlowMapping].

  - Tag each standard as [ENTITY:InteroperabilityStandard].

  - Tag each API entry as [ENTITY:APIInventoryEntry].

  - A contract referencing a system not designated as a System of Record is

    the primary HITL trigger for this template (see §8).

6. GKG (Governance Knowledge Graph) Integration

6.1 Pre-flight context

Query

Purpose

SystemOfRecord + IntegrationPattern nodes

Ensures every contract references real, designated systems and patterns

Existing IntegrationContract nodes

Prevents duplicate or conflicting contracts for the same system pair

Existing InteroperabilityStandard nodes

Reuses established formats rather than proposing a new one per contract

6.2 Post-flight sync

New node → relationship

Target

IntegrationContract — connects →

SystemOfRecord (source), SystemOfRecord (target)

DataFlowMapping — implements →

IntegrationContract

APIInventoryEntry — exposes →

IntegrationContract

6.3 Grounding in Existing DMBOK Content

Added on revisit: this template's system prompt (§5) must treat ADPA's existing, hand-written DMBOK content as required context, not just historical reference, so the template engine's output stays consistent with what's already been approved.

Existing file (docs/generated-documents/dmbok/)

What this template must reuse

data-integration-interoperability-strategy.md

Integration patterns (§5), format/protocol standards (§6), and the KPI targets (§10) this template's contracts must reuse rather than reinvent

7. Quality Gates (Phase 10 Evaluation)

Check

Pass criteria

Severity

System traceability

Every contract names two systems already designated as SystemOfRecord

Blocking

No dangling flow

Every DataFlowMapping has both a source and target contract

Blocking

Pattern consistency

Contract's pattern matches the domain's pattern from the Architecture Charter

Warning

No duplicate contract

No two contracts describe the same system pair with conflicting terms

Blocking

8. HITL Triggers

This template routes to human review whenever:

Undesignated system — a contract references a system not found among existing SystemOfRecord nodes.

Conflicting pattern — the contract's pattern contradicts the domain's pattern in the Architecture Charter.

Duplicate contract — two contracts describe the same system pair with different terms.

9. Versioning & Lifecycle Plan

Phase

Promotion criteria

Owner

Draft (current)

Spec reviewed; system prompt and quality gates approved

Template maintainer

Testing

≥ 15 generations across ≥ 3 pilot orgs; HITL rate < 40%

QA / pilot leads

Active

HITL rate < 15%; success rate ≥ 85% over trailing 30 generations

Template maintainer

Deprecated

Superseded by a newer version or DMBOK domain restructure

Template maintainer

v0.1.0 changelog: initial draft — entity profile, system prompt, GKG hooks, quality gates, and HITL triggers defined. No generations yet.

v0.2.0 changelog: added §6.3 grounding the system prompt in existing docs/generated-documents/dmbok/ content; corrected §3 Positioning now that 19 existing DMBOK documents are known. Still no generations — remains in Draft.

10. Metrics & Health Dashboard

Metric

Formula

Target (Active phase)

Usage count

count(documents generated)

n/a — volume metric

Success rate

passed_quality_gates / total_generations

≥ 85%

HITL rate

flagged_for_review / total_generations

< 15%

Avg. generation latency

mean(generation_end − generation_start)

< 45s

Health status

weighted(success_rate, 1−HITL_rate, latency_score, user_feedback)

Green

11. Recommendation & Optimization Loop

Example of the continuous-learning cycle this template feeds, per §6 of the framework:

Failure pattern observed — in Testing, 4 of 15 generations proposed a new interoperability standard instead of reusing an existing GKG one.

Recommendation generated — the loop proposes moving the GKG standards query earlier and instructing the model to prefer reuse over invention explicitly.

Evolution — v0.2.0 enforces reuse-first; standard proliferation drops across the org's contract register.

12. Appendix A — Sample Generated Excerpt

Illustrative output from a test generation, showing the template's expected voice and entity tagging in practice:

3. Contract Register

  - CRM Platform → Core Ledger [ENTITY:IntegrationContract]: nightly batch,

    CSV over SFTP, per Batch-Transfer-v1 [ENTITY:InteroperabilityStandard].

 

4. Data Flow Mappings

  - cust_id → ledger.customer_ref [ENTITY:DataFlowMapping]

13. Appendix B — Rollout Plan & Next Steps

Pilot — run after the Architecture Charter is Active, so contracts reference real, approved systems of record.

Drift watch — flag this template's output to ADPA's existing drift-detection baselines — integration contracts are a natural drift-monitoring target.

Next templates — unblocks Master Data Management (needs system-to-system flow context) and Data Warehousing & BI (needs source lineage).
