---
opportunity_id: "OP-ITG-019"
lifecycle_stage: "Stage 2 (Technical Architecture, Persistent Database Schema & MXC Integration Blueprint)"
date: "2026-11-24"
owner: "Menno Drescher (Director, CBa Consult)"
upstream_repos:
  - "mdresch/adpa (ADPA PoC)"
  - "mdresch/mxc (MXC Hyper-V Sterile Execution Fabric — OP-ITG-017)"
  - "mdresch/sidpa-template (18-Stage Closed-Loop Governance)"
---

# ADPA 2027 Enhancement Architecture & Persistent Database Blueprint (`OP-ITG-019`)

## 1. Strategic Role of ADPA in 2027 (Commercial Framing Resolved)

To protect the **10–15 hrs/week** capacity cap and **\$0 working-capital** rule, ADPA's 2027 evolution follows a strict **Internal-First → Client-Facing** progression:

1. **Phase A (Q2–Q3 2027 — Internal Margin Multiplier):** Reimplement CBa Consult's **Unified Assessment & Executive Report Engine** (powering all Core 5 Tier A Questionnaires + `OP-CX-002` COAS) onto a persistent PostgreSQL database with automated CBa Consult PDF/DOCX generation and SIDPA closed-loop governance tracking.
2. **Phase B (Q4 2027+ — Sovereign Client Execution Platform):** Couple ADPA's document-processing and AI-agent pipelines natively with **`mdresch/mxc` (Hyper-V `<500ms` JIT Scale-to-Zero + `win11-agent-lean.vhdx`)** to offer regulated enterprises hardware-isolated, zero-trust tenant execution under **`OP-ITG-018` (MIP Enterprise)**.

---

## 2. Target Reference Architecture (4-Layer Stack)

```text
+-----------------------------------------------------------------------------+
|  LAYER 1: PRESENTATION & REPORT ENGINE                                      |
|  - Client Intake / Self-Assessment Portal (extends agent-governance-onboard)|
|  - Consultant Workbench (Scoring, P0 Red-Flag Triage, MoM MIP Drift Views)  |
|  - Automated CBa Consult PDF / DOCX Executive Report Generator              |
+-----------------------------------------------------------------------------+
                                      |
+-----------------------------------------------------------------------------+
|  LAYER 2: ADPA APPLICATION & GOVERNANCE API (Python / TypeScript)           |
|  - Assessment Scoring Engine (Weighted Pillars + Maturity 1-5 Rubric)       |
|  - Ontology & Knowledge Graph Service (ADPA / ECS Canonical Entities)       |
|  - SIDPA Closed-Loop Engine (Stages 1-18, Spec Gates, LL-###, IMP-###)      |
+-----------------------------------------------------------------------------+
                                      |
+-----------------------------------------------------------------------------+
|  LAYER 3: PERSISTENT MULTI-TENANT DATABASE (PostgreSQL — $0 Local/Supabase) |
|  - Strict tenant_id isolation (Row-Level Security ready)                    |
|  - Immutable audit_events (WORM-aligned decision & score lineage)           |
+-----------------------------------------------------------------------------+
                                      |
+-----------------------------------------------------------------------------+
|  LAYER 4: STERILE HARDWARE EXECUTION FABRIC (mdresch/mxc — OP-ITG-017)      |
|  - wxc-exec.exe (Hyper-V Gen2 micro-VMs + win11-agent-lean.vhdx)            |
|  - Airgapped VMBus (PowerShell Direct + copy-file), differencing sterility  |
|  - Multi-Tier Standby Pools (Hot <=5ms / Warm <=250ms / Cold 0 MB RAM)      |
+-----------------------------------------------------------------------------+
```

---

## 3. Persistent Multi-Tenant Database Schema (PostgreSQL Core ERD)

Designed to unify **all 5 Core Tier A Flagships**, **`OP-CX-002` (COAS)**, and **SIDPA governance** under one clean, queryable relational schema:

```sql
-- 1. Multi-Tenant Client & Engagement Registry
CREATE TABLE tenants (
    tenant_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    sector          TEXT,
    seat_band       TEXT,                       -- e.g. '50-250', '250-2500'
    regulatory_tags TEXT[] DEFAULT '{}',        -- e.g. {'EU_AI_ACT', 'IFRS_18', 'DORA'}
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE engagements (
    engagement_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenants(tenant_id),
    opportunity_id  TEXT NOT NULL,              -- e.g. 'OP-ITG-013', 'OP-ITG-018', 'OP-FIN-009', 'OP-CX-002'
    tier            TEXT NOT NULL,              -- 'Tier 1 Wedge', 'Tier 2 Full', 'MIP Core'
    status          TEXT NOT NULL DEFAULT 'discovery', -- discovery | pilot | active_mip | closed
    fee_eur         NUMERIC(10,2),
    started_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Unified Assessment & Diagnostic Scoring Engine (All 6 Questionnaires!)
CREATE TABLE assessment_templates (
    template_id     TEXT PRIMARY KEY,           -- e.g. 'op-itg-013-v1', 'op-cx-002-v1', 'op-rsk-004-v1'
    opportunity_id  TEXT NOT NULL,
    title           TEXT NOT NULL,
    version         TEXT NOT NULL,
    pillars_json    JSONB NOT NULL              -- [{id, name, weight, controls: [{code, prompt, evidence}]}]
);

CREATE TABLE assessment_runs (
    run_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id   UUID NOT NULL REFERENCES engagements(engagement_id),
    template_id     TEXT NOT NULL REFERENCES assessment_templates(template_id),
    period_label    TEXT NOT NULL,              -- e.g. '2027-Q1-Baseline', '2027-04-MIP'
    weighted_index  NUMERIC(3,2),               -- 1.00 to 5.00
    p0_red_flags    JSONB NOT NULL DEFAULT '[]',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE control_scores (
    score_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id          UUID NOT NULL REFERENCES assessment_runs(run_id) ON DELETE CASCADE,
    control_code    TEXT NOT NULL,              -- e.g. '1.1', '3.4'
    score           SMALLINT NOT NULL CHECK (score BETWEEN 1 AND 5),
    evidence_ref    TEXT,                       -- artifact URI / hash / tenant export proof
    notes           TEXT,
    UNIQUE (run_id, control_code)
);

-- 3. Document Lineage, Ontologies & Immutable Compliance Evidence (OP-ITG-014 / OP-RSK-004)
CREATE TABLE document_lineages (
    doc_id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenants(tenant_id),
    source_system   TEXT NOT NULL,              -- 'SharePoint', 'Confluence', 'ERP', 'MXC_Sandbox'
    canonical_uri   TEXT NOT NULL,
    sha256_hash     TEXT NOT NULL,
    sensitivity     TEXT,                       -- 'Public', 'Internal', 'Confidential', 'Restricted'
    status          TEXT NOT NULL DEFAULT 'active', -- active | quarantined | retired
    owner_name      TEXT,
    last_verified   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. MXC Hyper-V Sterile Sandbox Execution Audit Log (OP-ITG-017 Integration)
CREATE TABLE sandbox_executions (
    exec_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenants(tenant_id),
    engagement_id   UUID REFERENCES engagements(engagement_id),
    sandbox_id      TEXT NOT NULL,              -- e.g. 'hv:6b34439e'
    base_image_id   TEXT NOT NULL,              -- e.g. 'img-win11-agent-lean'
    wake_tier       TEXT NOT NULL,              -- 'HotRunning' | 'WarmPaused' | 'ColdSaved'
    wake_ms         NUMERIC(8,2),
    parent_sterile  BOOLEAN NOT NULL DEFAULT true,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    deprovisioned_at TIMESTAMPTZ
);

-- 5. SIDPA Closed-Loop Governance & Reusable IP Store
CREATE TABLE governance_records (
    record_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    engagement_id   UUID REFERENCES engagements(engagement_id),
    record_type     TEXT NOT NULL,              -- 'HYP' | 'LL' | 'IMP' | 'AUDIT' | 'BFI'
    code            TEXT NOT NULL,              -- e.g. 'HYP-2027-018A', 'LL-010', 'IMP-MXC-016'
    title           TEXT NOT NULL,
    status          TEXT NOT NULL,
    payload_json    JSONB NOT NULL DEFAULT '{}',
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 4. Bounded Q2–Q3 2027 Track B Validation Slice (Anti-Overengineering Guardrail)

To prevent premature platform engineering from eating Wave 1 client-pilot bandwidth, Track B execution in `mdresch/adpa` is strictly time-boxed into **3 bounded milestones**:

1. **Milestone 1 — Persistent Schema & Migrations (2 Sprints):** Instantiate `sidpa-template` Track B governance in `mdresch/adpa`; deploy the 5 core PostgreSQL tables above with automated migrations and `pytest` contract tests.
2. **Milestone 2 — Reimplement 2 Live Projects into ADPA (2 Sprints):**
   - **Project #1:** Load all **6 Diagnostic Questionnaires** (`OP-ITG-013`, `OP-ITG-018`, `OP-FIN-009`, `OP-ITG-014`, `OP-RSK-004`, `OP-CX-002`) into `assessment_templates` with automated weighted scoring + CBa Consult PDF export.
   - **Project #2:** Wire **MXC Hyper-V (`wxc-exec` + `win11-agent-lean.vhdx`)** as ADPA's sterile document/agent execution backend logging every run to `sandbox_executions`.
3. **Milestone 3 — Commercial Proof Gate:** Run 1–2 real Tier A / COAS client engagements end-to-end through ADPA; measure consultant hours saved per engagement (target: **≥40% delivery time reduction**) before deciding whether to productize ADPA as a standalone client-facing SaaS.
