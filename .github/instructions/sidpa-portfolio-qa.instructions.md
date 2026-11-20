---
description: Tailored SIDPA Governance QA Directives for the Opportunities 2027 Portfolio
applyTo: '**'
---

# Tailored SIDPA Portfolio Governance Directives

Adapted from `sidpa-template` (`.github/instructions/sidpa-governance-qa.instructions.md` and `docs/sequence-and-lessons.md`) for a **pre-project portfolio funnel** operating under a 10–15 hrs/week sweat-equity cap. Full stage definitions and completion gates live in [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md).

## 1. Five Universal Artifact QA Invariants

1. **Negative Scope Boundary ("What this is not yet"):**
   - Every early-stage artifact (`Ideation-Spark.md`, Tier 2 research notes, Tier 3 Opportunity Briefs) MUST respect stage boundaries and declare what is intentionally deferred.
   - **Anti-Stage Collapsing:** Do not draft full software specs (ADRs, BRDs, FDDs, 9 PMBOK subsidiary plans) inside a `Spark` folder before an opportunity clears the Tier 3 Pre-Pilot Gate.

2. **Problem-Before-Solution Discipline:**
   - State the concrete operational friction, compliance trigger, or financial leakage before introducing CBa Consult’s framework, platform, or retainer.

3. **Non-Duplication Principle:**
   - [inventory-of-ideas.md](../../inventory-of-ideas.md) is the single source of truth for opportunity status, effort, capital, and target quarter.
   - [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) is the single source of truth for the authoritative Q1–Q4 delivery sequence.
   - Downstream one-pagers, trackers, and workspaces MUST cite these upstream documents rather than copying numbers that drift out of sync.

4. **Human Adjudication Gate (`requires_human_approval: true`):**
   - No opportunity may move from `Idea` → `Pilot` (Tier 3 Gate), be re-ranked in the delivery sequence, or graduate into a standalone `sidpa-template` build repo without explicit Director confirmation.
   - Never fabricate approval records, client validation, or ROI outcomes.

5. **Honest Evidence Baseline & Two-Loop Separation:**
   - Keep **design-time baseline defects** (doc inconsistencies, ranking/quarter mismatches, scope flags) logged as `BFI-NNN` items in [Portfolio-Status-Register.md](../../docs/registers/Portfolio-Status-Register.md) (`evidence_basis: design_time`).
   - Reserve [Lessons-Learned-Register.md](../../docs/registers/Lessons-Learned-Register.md) strictly for **empirical execution evidence** (`evidence_basis: execution`) from real client conversations, pilots, or deliveries.

## 2. Hybrid Tailoring Rule (Advisory vs. Build-Heavy)

Follow `sidpa-template` (`docs/sequence-and-lessons.md` Rules #18, #30, and #32) — match governance weight to uncertainty and build complexity:
- **Portfolio Funnel (Stages 1–4, inside `oppurtunities-2027`):** All 117 ideas stay lightweight (`Spark` → `Hypothesis` → `Tier 3 Pre-Pilot Brief / Charter`). Do not copy `sidpa-template` policy stores or 9 subsidiary plans into `opportunities/<ID>/`.
- **Advisory / Assessment Pilots (Track A)** (e.g., `OP-OPS-001`, `OP-FIN-009`, `OP-HR-002`): Stay lightweight inside `opportunities/<ID>/` using tailored Stages 1–4 + 9–15 (Charter → Delivery → Actual Outcome → Lessons Learned).
- **Platform-Backed / Build-Heavy Flagships (Track B)** (e.g., `OP-ITG-013`–`018`): Graduate into a dedicated repository initialized from `sidpa-template` (`python scripts/init_project.py --name <op-id>`) for full Stages 5–18 governance.
- **Session Orientation (Rule #23–24):** Update [Portfolio-Status-Register.md](../../docs/registers/Portfolio-Status-Register.md) at every natural pause or milestone so the current state is never reconstructed from scattered files.
