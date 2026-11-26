---
opportunity_id: "OP-ITG-019"
module: "ADPA Risk Management & Scenario Building"
lifecycle_stage: "Stage 1b–2 (Market Development & Platform Module Spec)"
date: "2026-11-26"
owner: "Menno Drescher (Director, CBa Consult)"
reference_source: "Scenario Planning: A Step-by-Step Guide (Dr. Tuomo Kuosa & Max Stucki, Futures Platform, ISSN 2814-5089 / ISBN 978-952-69987-1-8)"
reference_asset: "/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf"
---

# ADPA Risk Management & Scenario Building Module (`OP-ITG-019`)

## 1. Purpose Within the ADPA 2027 Architecture

The **ADPA Risk Management Approach** combines operational risk registers (`OP-RSK-001`, `OP-RSK-004`, `OP-RSK-006`, `OP-RSK-007`) with continuous **Strategic Foresight & Scenario Planning** (grounded in *Scenario Planning: A Step-by-Step Guide*, Kuosa & Stucki, Futures Platform).

Instead of storing static likelihood × impact rows that go stale between annual audits, ADPA models **change drivers, stakeholder ratings, multi-future scenario narratives, and backcast early-warning indicators** as first-class database entities—so every risk control and quarterly **Managed Intelligence (`OP-ITG-018`)** review adapts as external signals shift.

---

## 2. Five-Step Workflow Mapped to ADPA Capabilities

1. **Scope & Horizon Definition:** Captures the strategic risk question, target year (e.g., 2027–2030), regulatory scope (EU AI Act, DORA/NIS2, IFRS 18, SOX), and executive sponsors.
2. **PESTLE & Foresight Signal Ingestion:** Classifies internal and external directional drivers across **Political, Economic, Social, Technological, Legal, and Environmental** dimensions—tagging each signal as a **Megatrend, Trend, Weak Signal, or Wild Card**.
3. **Collaborative Voting & Rating:** Captures multi-stakeholder scores (Uncertainty × Threat × Strategic Fit) to isolate the **2–10 critical drivers** without losing dissenting risk perspectives.
4. **Dual Scenario Engine:**
   - **Axes of Uncertainty (2×2):** Pairs the top 2 high-impact, high-uncertainty drivers into 4 mutually exclusive executive narratives.
   - **Futures Table (Morphological Matrix):** Maps 3–10 drivers × 3–4 Future States (*Minimum / Modest / Large / Maximum* or *Weakening / BAU / Strengthening*) and traces logically compatible **future images**.
5. **Decision Integration & Backcasting Telemetry:** Links each scenario to **Strategy Stress-Test scores**, **1–3 / 4–6 / 7–9 yr Action Plans**, and **Backcast Early-Warning Indicators** monitored continuously inside `OP-ITG-018` (MIP).

---

## 3. PostgreSQL Schema Extension (Extending `ADPA-2027-Architecture-and-DB-Blueprint.md`)

Adds four tenant-isolated tables alongside `engagements`, `assessment_runs`, `document_lineages`, and `governance_records` in `OP-ITG-019`:

```sql
-- 7. ADPA Risk Management & Scenario Building Extension
CREATE TABLE scenario_sets (
    scenario_set_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id       UUID NOT NULL REFERENCES tenants(tenant_id),
    engagement_id   UUID REFERENCES engagements(engagement_id),
    title           TEXT NOT NULL,              -- e.g. '2027-2030 Enterprise AI & Regulatory Risk'
    focal_question  TEXT NOT NULL,
    horizon_year    SMALLINT NOT NULL,          -- e.g. 2030
    method          TEXT NOT NULL,              -- 'axes_of_uncertainty' | 'futures_table' | 'hybrid'
    status          TEXT NOT NULL DEFAULT 'draft', -- draft | active | archived
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE change_drivers (
    driver_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_set_id UUID NOT NULL REFERENCES scenario_sets(scenario_set_id) ON DELETE CASCADE,
    pestle_domain   TEXT NOT NULL,              -- Political | Economic | Social | Tech | Legal | Env
    signal_type     TEXT NOT NULL,              -- megatrend | trend | weak_signal | wild_card
    direction_label TEXT NOT NULL,              -- directional phrasing (e.g. 'Autonomous ERP Agent Adoption')
    uncertainty_avg NUMERIC(3,2),               -- stakeholder rating 1.00-5.00
    threat_avg      NUMERIC(3,2),               -- stakeholder rating 1.00-5.00
    selected_top    BOOLEAN NOT NULL DEFAULT false,
    future_states   JSONB NOT NULL DEFAULT '[]' -- [{code:'A1', label:'Minimum', description:'...'}]
);

CREATE TABLE scenarios (
    scenario_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_set_id UUID NOT NULL REFERENCES scenario_sets(scenario_set_id) ON DELETE CASCADE,
    code            TEXT NOT NULL,              -- e.g. 'S1', 'S2', 'S3', 'S4'
    title           TEXT NOT NULL,
    quadrant_or_path JSONB NOT NULL DEFAULT '{}', -- {x:'high',y:'high'} or ['A3','B3','C2',...]
    narrative_md    TEXT NOT NULL,
    threats_json    JSONB NOT NULL DEFAULT '[]',
    opportunities_json JSONB NOT NULL DEFAULT '[]',
    action_plan_json JSONB NOT NULL DEFAULT '{}'  -- {near_1_3y:[], mid_4_6y:[], long_7_9y:[]}
);

CREATE TABLE scenario_indicators (
    indicator_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id     UUID NOT NULL REFERENCES scenarios(scenario_id) ON DELETE CASCADE,
    milestone_label TEXT NOT NULL,              -- backcast observable trigger
    target_window   TEXT,                       -- e.g. 'Q2 2027'
    current_status  TEXT NOT NULL DEFAULT 'watching', -- watching | emerging | triggered
    linked_risk_id  TEXT,                       -- e.g. 'OP-RSK-004', 'OP-ITG-013-RF02'
    last_reviewed   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## 4. Market Development Alignment Across Opportunities 2027

- **Primary Market Development Playbook:** [`docs/research/ADPA-Risk-Management-Scenario-Building-Market-Development-2027.md`](../../docs/research/ADPA-Risk-Management-Scenario-Building-Market-Development-2027.md)
- **Client-Facing Market Development Brief (HTML/PDF):** [`docs/reports/ADPA_Risk_Management_Scenario_Building_2027.html`](../../docs/reports/ADPA_Risk_Management_Scenario_Building_2027.html)
- **Source Methodology PDF:** [Futures Platform — Scenario Planning: A Step-by-Step Guide](/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf)
- **Cross-Opportunity Links:** Feeds `OP-RSK-001` (Risk Register Starter), `OP-RSK-004` ("SOC 2 for AI"), `OP-RSK-006` (DORA Cloud Exit Scenarios), `OP-RSK-007` (Incident Triage Tabletops), `OP-ITG-013` (Agent Governance), and `OP-ITG-018` (Quarterly MIP Backcasting).
