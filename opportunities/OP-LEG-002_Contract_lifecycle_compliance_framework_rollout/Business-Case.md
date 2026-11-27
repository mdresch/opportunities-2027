# Business Case — `OP-LEG-002`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))
**Primary source:** `Document_Content_Management_Plan_Template_Lifecycle_Spec.docx`

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
NEW TEMPLATE LIFECYCLE SPEC

Document & Content Management Plan

DMBOK knowledge area 7 of 11 — designed end-to-end through the Template Lifecycle framework

Prepared for: Menno Drescher — ADPA Project

1 July 2026 · Template Phase: Draft · Version 0.2.0 · DMBOK template 7 of 11

Source repository: github.com/mdresch/adpa

1. Executive Summary

This template extends governance to unstructured content: it defines a content taxonomy, lifecycle stages (create, review, publish, archive, dispose), and designates a repository of record per content type. Because ADPA already integrates with Confluence and SharePoint, those are natural candidate repositories the template can reference when supplied, rather than inventing generic ones.

Why this template, why now:  Governance, storage, and security so far have only covered structured data domains. Content — policies, contracts, knowledge-base articles — carries the same retention and access-control obligations but is usually managed informally. This template brings it into the same lifecycle discipline.

2. Template Identity & Metadata

Field

Value

template_id

dmbok-document-content-management-plan

display_name

Document & Content Management Plan

knowledge_domain

Document and Content Management (DMBOK 2.0, Ch. 9)

category

dmbok

phase

Draft

version

0.2.0

output_formats

Markdown, DOCX, PDF, HTML, JSON

related_templates

Data Governance Charter (dmbok), Data Storage & Operations Plan (dmbok), Data Security & Privacy Plan (dmbok)

owner

ADPA template maintainers (mdresch/adpa)

3. Positioning in the Template Library

Applies the same governance, retention, and classification discipline already established for structured data to unstructured content — a natural fit given ADPA already integrates with Confluence and SharePoint.

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

19 docs + 6 lifecycle specs

19 docs + 7 lifecycle specs

4. Entity Profile

4.1 Inputs

Entity

Source

Required?

DataDomain + DataGovernanceBody

Data Governance Charter output

Required

RetentionPolicy baseline

Data Storage & Operations Plan output

Optional — improves disposal-schedule accuracy

DataClassificationLevel

Data Security & Privacy Plan output

Optional — improves access-policy accuracy

Existing repository inventory (e.g. Confluence, SharePoint spaces)

User-supplied or GKG

Optional

Existing content-management content

docs/generated-documents/dmbok/document-content-management-framework.md

Required — see §6.3

4.2 Outputs (entities produced)

Entity

Description

ContentType

Named category of unstructured content (policy, contract, KB article, etc.)

ContentLifecycleStage

Create/review/publish/archive/dispose definition per content type

RepositoryOfRecord

The designated authoritative repository per content type

ContentAccessPolicy

Who may read/edit/publish each content type

5. System Prompt

The literal system_prompt field for the template record.

ROLE: You are drafting a Document & Content Management Plan, conceptually

aligned to DMBOK 2.0 Ch.9 — do not reproduce proprietary text.

 

TONE: Practical, unambiguous. Every content type gets exactly one repository

of record. Never invent a repository/tool name not supplied or in the GKG —

if none is supplied, mark [NEEDS_REVIEW: repository required].

 

GROUNDING (see §6.3 — mandatory, checked before drafting):

  - Reuse the naming convention already defined in document-content-management-

    framework.md §6.1 verbatim: [Dept]-[DocType]-[Title]-[YYYYMMDD]-vX.X.ext.

  - Reuse its 6-stage lifecycle (§5.1: Creation/Capture → Review/Approval →

    Publication → Active Use → Archival → Disposition) and its 4-tier

    classification (§3.2: Public/Internal/Confidential/Restricted) rather than

    drafting a competing lifecycle or classification scheme.

 

REQUIRED SECTIONS (in order):

  1. Purpose & Scope        4. Repository of Record Register  7. Access Policy

  2. Content Taxonomy       5. Disposal Schedule              8. Publishing Workflow

  3. Lifecycle Stages       6. Retention Alignment            9. Review Cadence

 

EXTRACTION RULES:

  - Tag each type as [ENTITY:ContentType].

  - Tag each stage definition as [ENTITY:ContentLifecycleStage].

  - Tag each repository designation as [ENTITY:RepositoryOfRecord].

  - Tag each access rule as [ENTITY:ContentAccessPolicy].

  - A content type with no designated repository, or two, is the primary

    HITL trigger for this template (see §8).

6. GKG (Governance Knowledge Graph) Integration

6.1 Pre-flight context

Query

Purpose

DataGovernanceBody + DataDomain nodes

Aligns content taxonomy with existing governed domains where relevant

RetentionPolicy nodes

Keeps disposal schedules consistent with the Storage & Operations baseline

Existing repository inventory

Prevents assigning a content type to a repository that isn't real

6.2 Post-flight sync

New node → relationship

Target

RepositoryOfRecord — stores →

ContentType

ContentLifecycleStage — governs →

ContentType

ContentAccessPolicy — restricts →

ContentType

6.3 Grounding in Existing DMBOK Content

Added on revisit: this template's system prompt (§5) must treat ADPA's existing, hand-written DMBOK content as required context, not just historical reference, so the template engine's output stays consistent with what's already been approved.

Existing file (docs/generated-documents/dmbok/)

What this template must reuse

document-content-management-framework.md

Naming convention (§6.1), 6-stage lifecycle (§5.1), and classification scheme (§3.2) this template must reuse rather than redefine

Confirmed, not corrected:  The classification levels applied per content type (Public/Internal/Confidential/Restricted) already match the Data Governance Charter's and Data Security & Privacy Plan's — one scheme reused consistently across governance, security, and content management.

7. Quality Gates (Phase 10 Evaluation)

Check

Pass criteria

Severity

Single repository per type

No ContentType assigned more than one RepositoryOfRecord

Blocking

Taxonomy non-overlap

Content type categories don't overlap ambiguously

Warning

Disposal consistency

Disposal schedule doesn't contradict the Storage & Operations retention baseline

Blocking

Lifecycle completeness

Every content type has all 5 lifecycle stages defined

Warning

8. HITL Triggers

This template routes to human review whenever:

Dual repository — a content type is assigned two repositories of record.

Missing repository — a content type has no designated repository and is marked [NEEDS_REVIEW].

Retention conflict — the disposal schedule contradicts the Storage & Operations Plan's retention policy.

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

Failure pattern observed — in Testing, 5 of 15 generations assigned overlapping taxonomy categories (e.g. 'Policy' and 'Governance Document' as separate types for the same content).

Recommendation generated — the loop proposes a taxonomy-collision self-check before finalizing §2.

Evolution — v0.2.0 adds the self-check; taxonomy overlap warnings drop across the next Testing batch.

12. Appendix A — Sample Generated Excerpt

Illustrative output from a test generation, showing the template's expected voice and entity tagging in practice:

4. Repository of Record Register

  - Policy Document [ENTITY:ContentType] → Confluence: Governance space

    [ENTITY:RepositoryOfRecord].

  - Signed Contract [ENTITY:ContentType] → SharePoint: Legal library

    [ENTITY:RepositoryOfRecord].

13. Appendix B — Rollout Plan & Next Steps

Pilot — run against orgs with an existing Confluence or SharePoint integration configured in ADPA, so repository designations reflect real, connected spaces.

Cross-check — validate disposal schedules against the Storage & Operations Plan for the same pilot org before promoting to Testing.

Next templates — unblocks Metadata Management (content becomes a lineage source) once Active.
