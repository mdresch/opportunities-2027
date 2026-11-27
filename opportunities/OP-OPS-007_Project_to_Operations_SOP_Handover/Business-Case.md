# Business Case — `OP-OPS-007`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
## Business case outline (derived from portfolio inventory)

| Field | Value |
| --- | --- |
| **Opportunity** | `OP-OPS-007` |
| **Value proposition** | Customer Experience |
| **Expected capital / pricing band** | Strategy |
| **$0 working capital thesis** | Sweat-equity delivery per [ideation-template.md](../../ideation-template.md) |

### Next step

Add a dedicated `Business Case` or `Business_Case_*.docx` under ADPA Projects Lists, then re-run `python scripts/assign_adpa_source_documents.py`.

### Supporting context (from primary ideation source)

ADPA

Project-to-Operations SOP Handover Framework

Binding Project-Produced SOPs to Reusable, Client-Context-Aware ADPA Templates

Version 1.0 — Design Document (no code changes; ADPA repository not connected in this session)

Prepared for: Menno Drescher

Date: [Insert Date]

1. Purpose & Problem Statement

Projects — like the recent SOX offboarding remediation that produced the Employee Offboarding SOP v2.2.1 — generate real operational knowledge: control language, RACI ownership, jurisdiction-specific guidance, and hard-won corrections (e.g., the Dutch Ziektewet nawerking period is 4 weeks, and only applies if the ex-employee has no new employer). Today that knowledge lives in a single Word document tied to one client and one project.

Without a formal binding mechanism, three things go wrong: the knowledge is not reusable for the next client or the next process; Operations has no formal moment at which it accepts ownership of a delivered SOP; and deliberately deferred items (a known gap, a declined refinement) are easy to lose between versions instead of carrying forward as visible backlog.

This framework defines two things: how a Project's SOPs bind to ADPA Templates so client context can drive generation instead of manual editing, and the structure of the Handover Document that formally transfers a completed SOP from a Project to the Operating Organization.

2. Scope

This framework applies to SOPs produced across Finance, Human Resources, ICT, and each company's Operating Organization. It defines the binding model and the Handover Document structure; it does not itself catalogue every SOP those departments need — that is a separate, ongoing template-library effort (see Section 7).

This is a design document only. The ADPA codebase (Postgres schema, API routes, seed scripts) was not connected in this session — only the two ADPA skill references (Template Lifecycle, Template Management) were available. Section 8 lists exact integration touchpoints so engineering work can start immediately once the repository is connected.

3. The Binding Model: Project SOP → ADPA Template

Every SOP produced in a project becomes an ADPA Template with a framework value, a structured content.sections[] payload, and an entity_profile describing what client context it needs and what entities it produces. The worked example in Section 9 shows this applied to the actual Offboarding SOP.

Client context via Handlebars

Sections that vary by client are written with {{variable}} placeholders rather than hard-coded client detail — the same pattern already used informally in the Offboarding SOP, where “a large industry provider” and “Provider A” replaced a named vendor. In ADPA this becomes explicit: {{client_name}}, {{identity_provider}}, {{jurisdictions}}, {{payroll_system}}, and so on, resolved at generation time from the entity_profile inputs.

Template lifecycle applied to what we already did manually

The Offboarding SOP moved through v1.0 → v2.2.1 by hand, with a Revision History appendix tracking what changed and why on every version. That is functionally the Draft → Testing → Active → Deprecated lifecycle ADPA manages natively — the manual revision history becomes the template's version log, and “Active” is the point at which a template is trusted to generate a client SOP without a full manual rebuild.

4. Entity Profile Design for SOP Templates

Proposed inputs (client context)

Variable

Type

Description

client_name

string

Legal/trading name used throughout the document.

industry

string

Drives which CUEC/SOC cross-references and control examples are relevant.

jurisdictions

array

Countries with employees. Drives which jurisdiction-specific appendices are generated or flagged as “localization pack required.”

identity_provider

string

e.g. Azure AD / Entra ID, Okta, Google Workspace — drives revocation-step wording.

payroll_system

string

Used in payroll sign-off section wording.

regulatory_frameworks

array

e.g. SOX, SOC 2, ISO 27001, GDPR — drives which control-mapping rows generate.

critical_systems

array

e.g. SAP, GitHub, Key Vault — feeds privileged/service-account and secrets-review wording.

Proposed outputs (synced to the Governance Knowledge Graph)

Entity Type

Why It Matters

Control

One node per control ID generated (e.g. LA-OFFBOARD-nn); a future Access Recertification template can reference the same control IDs instead of re-deriving them.

RACI_Owner

One node per distinct role in the RACI table, reusable across every SOP for the same client.

Critical_Role

Rows from a Critical Role Register become entities a future Business Continuity or Incident Response template can reuse directly.

KPI

One node per KPI, tagged with target and cadence, so a future Ops Dashboard template can pull them rather than re-authoring.

Open_Gap

Deliberately-not-closed items (a known limitation, a declined refinement) so they surface automatically in the next Handover Document instead of being lost between versions.

5. Quality Gates & HITL — Mapped From What We Already Did Manually

This project's own workflow already performed the functions ADPA's Quality Gates and HITL review are meant to formalize. The table below maps what happened manually onto the ADPA concept it corresponds to, so the gate design is grounded in a real case rather than invented from scratch.

What Happened in This Project

ADPA Equivalent

External audit review returned 14 numbered gap items; each was triaged and either built or explicitly scoped out.

Feedback ingestion → optimization loop recommendation.

Draft said the Ziektewet window was 8 weeks; verified sources said 4 weeks, and only if the ex-employee has no new employer.

legal_sensitive quality gate forcing mandatory human review regardless of confidence.

Large structural edits (new appendices, new controls) were confirmed with the client before being written into the document.

HITL gate for any change altering required sections or control IDs.

A reviewer scored the document and proposed three further refinements; the client explicitly chose to defer all three rather than accept them silently.

Open_Gap entity created and carried into the next Handover Document instead of being dropped.

Every version bump included a Revision History entry stating what changed and why.

Automated version-log entry generated on every Draft → Testing → Active transition.

6. The Project → Operations Handover Document

This is a distinct document type from the SOPs it references — it is the formal record that a Project handed a specific set of SOPs to the Operating Organization, and that Operations accepted them. Section 10 (companion document) is a filled first instance of this structure, built from the Offboarding SOP project.

Required structure

Header: project name, client, department(s), handover date, project lead, operations owner, client sponsor.

SOP Inventory table: SOP name, ADPA template ID, version, domain, quality-gate status, operating owner, next review date.

Outstanding Items: every Open_Gap entity tied to the handed-over SOPs — explicitly carried forward, not silently dropped.

Acceptance & sign-off block: project lead, operations owner, client sponsor.

Review cadence commitment for each SOP handed over.

7. Departmental SOP Taxonomy (Roadmap)

Illustrative only — to be confirmed with each department before committing to a build order. Offboarding is the only row marked Complete; everything else is a placeholder showing where this framework is headed, not a committed backlog.

Domain

Example Process Areas

Status

Human Resources

Onboarding / Provisioning, Offboarding, Performance Management, Payroll Change

Offboarding: Complete (v2.2.1). Others: Not started.

ICT

Access Provisioning, Change Management, Incident Response, Backup & Disaster Recovery, Access Recertification

Not started — Access Recertification already referenced by control LA-OFFBOARD-04 in the Offboarding SOP.

Finance

Procure-to-Pay, Vendor Onboarding, Journal Entry Approval, Month-End Close

Not started.

Operating Organization (per company)

Client Onboarding, Service Delivery Handover, SLA Management

Not started — this framework document is itself the first artifact in this domain.

8. Engineering Integration Touchpoints

Per the ADPA Template Management skill's Framework Expansion Workflow, adding SOPs as a first-class framework requires touching these files, in order, once the repository is connected:

server/src/middleware/validation.ts — add the new framework value(s) to the createTemplate enum. Decide here whether to use a single “SOP” value or four department-scoped values (Finance / HR / ICT / OperatingOrg) per the taxonomy in Section 7 — the latter allows templates.ts and the UI to filter by department natively.

server/src/routes/templates.ts — update GET/PUT filters to recognize the new framework value(s).

app/templates/page.tsx — update the UI framework dropdown.

server/src/database/seed.ts — insert the Offboarding SOP template (see the accompanying JSON payload, adpa_template_sop_offboarding.json) with the standard idempotency check (SELECT id FROM templates WHERE name = ... before INSERT).

The accompanying JSON file is a ready-to-review payload built directly from the real, delivered Offboarding SOP structure — engineering can adapt it rather than starting from a blank schema.

9. Worked Example: Employee Offboarding SOP

The companion file adpa_template_sop_offboarding.json is the concrete illustration of Sections 3–5 applied to real, already-delivered content: 14 numbered sections and 13 lettered appendices (A–M), each mapped to a content.sections[] entry, with Handlebars variables for the client-context fields identified in Section 4, an entity_profile listing the Control/RACI_Owner/Critical_Role/KPI/Open_Gap outputs it produces, and quality gates including the legal_sensitive flag on jurisdiction-specific content (Section 13, Appendix J, Appendix M).

This is the pattern to repeat for every future SOP: build the document with a real client the way Offboarding was built, then extract the template payload from the finished, validated version — not the other way around. Templates built before a real SOP exists tend to guess at structure that turns out wrong.

10. Next Steps

Connect the ADPA repository so the integration touchpoints in Section 8 can be implemented and reviewed.

Seed the Offboarding SOP as the first Active template using the companion JSON payload, adjusted per engineering review.

Use the companion filled Handover Document (Project_Handover_Offboarding_SOP.docx) as the first real instance of Section 6's structure — it already carries forward CUEC-15 and the three declined v2.3 refinements as Open_Gap items.

Pick the next process (Onboarding is the natural mirror of Offboarding) and run it through the same pipeline: build the real SOP first, then extract its template.
