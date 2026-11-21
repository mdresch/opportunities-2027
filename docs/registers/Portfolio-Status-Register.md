---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Cross-Cutting (All Process Groups)"
pmbok_process: "4.3 Direct & Manage Portfolio Work (Orientation Snapshot)"
lifecycle_stage: "Live — tracks active portfolio funnel position"
governance_policy: "none (orientation snapshot, not a governed approval artifact)"
artifact_id: "portfolio-status-register"
version: "1.0 (live — overwritten in place whenever orientation changes)"
owner: "Menno Drescher (Director, CBa Consult)"
last_updated: "2026-11-21"
---

# Portfolio Status Register — Opportunities 2027

> **Purpose:** The single live snapshot answering, in under a minute, *"where is the 2027 portfolio right now, what just finished, what is next, and what baseline defects are open?"*
>
> **Not a governed approval artifact** — overwritten in place at natural pauses and milestone shifts (SIDPA `sequence-and-lessons.md` Rules #23–24). Authoritative per-idea data stays in [inventory-of-ideas.md](../../inventory-of-ideas.md).

## 1. Current Orientation (Read This First)

| Field | Value |
| --- | --- |
| **Current Portfolio Phase** | Pre-Pilot Packaging & Q1 2027 Readiness (Tailored SIDPA Stages 1–2) |
| **Active Capacity Cap** | 10–15 hrs/week · \$0 initial working capital |
| **Portfolio Coverage** | **120 / 120** opportunities have `Ideation-Spark.md` workspaces (Stage 1a complete): 13 Tier A, 7 Tier B, 41 Tier C, 3 Tier D, 51 Active Backlog, 5 Parked |
| **Active Pilots (`Status = Pilot`)** | **0** (all 120 items remain `Idea` or `Parked`; no delivery work started yet) |
| **Authoritative Execution Sequence** | [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3: #1 `OP-OPS-001 → OP-CX-001`, #2 `OP-FIN-009`, #3 `OP-ITG-014`, #4 `OP-RSK-004`, #5 `OP-ITG-013` |
| **Last Milestone Completed** | Root directory cleanup (21 → 5 core root files, 0 broken links) + Tailored Hybrid SIDPA governance integration |
| **Next Priority Unit of Work** | Complete Tier 2 deeper research & Tier 3 Pre-Pilot Gate for Q1 lead wedges (`OP-OPS-001 → OP-CX-001` and `OP-FIN-009`) and validate hypotheses in [Hypothesis-Register.md](Hypothesis-Register.md) |
| **Graduated Standalone SIDPA Repos** | **`OP-ITG-017`** → [`mdresch/mxc`](https://github.com/mdresch/mxc) (Stage 10, `4/6 Epics · 10/17 stories` — see §2b below) *(other existing proprietary assets: `ICT-Governance-Framework-Application` for `OP-ITG-002`/`013`, `sidpa-template` for governance reference)* |

## 2. Q1–Q4 2027 Priority Wave Status

| Wave | Target Window | Lead Opportunity ID(s) | Current SIDPA Stage | Next Gate | Engagement Track |
| --- | --- | --- | --- | --- | --- |
| **Wave 1 (Fastest Proof)** | Q1 2027 | `OP-OPS-001 → OP-CX-001` | Stage 2 (Hypotheses `HYP-2027-001`, `005`, `006` formulated) | Execute Q1 outreach (`HYP-2027-001` → `Testing`) → Stage 3–4 Pre-Pilot Gate | Lightweight Advisory (Track A) |
| **Wave 1 (Financial Truth)** | Q1 2027 | `OP-FIN-009` | Stage 2 (Hypotheses `HYP-2027-002`, `007`, `008`, `009` formulated) | Run internal RGP IP sprint (`HYP-2027-007`) + Q1 CFO outreach (`HYP-2027-002`) → Stage 3–4 Gate | Lightweight Advisory (Track A) |
| **Wave 2 (AI & Compliance)** | Q2 2027 | `OP-ITG-014`, `OP-RSK-004`, `OP-ITG-013` | Stage 1a (Sparks + One-Pagers) | Tier 2 Research → Stage 3–4 Pre-Pilot Gate | Hybrid / Platform-Backed |
| **Wave 3 (Scale & Retainer)** | Q2–Q4 2027 | `OP-ITG-017`, `OP-ITG-018` (MIP), `OP-FIN-010`, `OP-ITG-015`, `OP-STR-004`/`005`, `OP-ITG-016` | `OP-ITG-017` Track B Stage 10 (see §2b); others Stage 1a | Deferred until Wave 1–2 pilot signal (`OP-ITG-017` awaiting Phase 1 completion / commercial pilot) | Platform-Backed / Retainer |

### 2b. Graduated Track B Repositories *(Non-Duplicating Rollup)*

*Generated via `python scripts/export_portfolio_rollup.py` in each graduated `sidpa-template` repo. All ADRs, stories, subsidiary plans, gate JSONs, and execution queues stay exclusively in the graduated repository; refresh only at macro gate crossings (Stage 8, Phase/Epic completion / Stage 11 Audit, Stage 12/18 close).*

| Opportunity ID | Graduated Track B Repo (SSOT) | Macro Stage & Baseline | Coarse Delivery Progress | Commercial / Pilot Status | As Of |
| --- | --- | --- | --- | --- | --- |
| `OP-ITG-017` | [`https://github.com/mdresch/mxc`](https://github.com/mdresch/mxc) (`origin/feat/hyperv-v2-rebased` @ `fcc7aa56`) → `docs/registers/Project-Status-Register.md` | Stage 10 (Execution & Verification) (`PMP-BL-v1.0.0`) | 4/6 Epics · 10/17 stories | Track B technical build active; commercial pilot status governed in upstream portfolio (`Idea`) | 2026-11-21 |

## 3. Pending Design-Time Baseline Feedback (`BFI-NNN`)

*Per SIDPA `chain-coverage.md` §3.1, document/ranking inconsistencies found before execution are logged here (`evidence_basis: design_time`) — never mixed into [Lessons-Learned-Register.md](Lessons-Learned-Register.md).*

| ID | Affected Artifacts | Finding | Resolution | Status |
| --- | --- | --- | --- | --- |
| `BFI-001` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §17 vs. [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3 | `OP-ITG-013` is #1 in strategic-value Priority Index vs. #5 in delivery execution sequence (documented in [op-itg-tracker.md](op-itg-tracker.md) §2). | Confirmed by Director (2026-11-20): keep Executive Summary #5 as authoritative delivery order; inventory #1 remains strategic-value ranking. | **Closed** (2026-11-20) |
| `BFI-002` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §6 vs. [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3 | `OP-ITG-015` tagged `Q2 2027` in inventory row vs. `Q3–Q4 2027` in Executive Summary. | Confirmed by Director (2026-11-20): aligned `OP-ITG-015` in `inventory-of-ideas.md` and `op-itg-tracker.md` to `Q3–Q4 2027`. | **Closed** (2026-11-20) |
| `BFI-003` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §6, [op-itg-tracker.md](op-itg-tracker.md) §3 | Scope flags on `OP-ITG-008` (Spatial/AR Content Design) and `OP-ITG-009` (Global Data Centers in Space) — likely not IT consulting items. | Confirmed by Director (2026-11-20): keep both in place as-is (`OP-ITG-009` remains Parked / Tier D). | **Closed** (2026-11-20) |

## 4. Maintenance Cadence

- Update §1 and §2 whenever an opportunity advances a tier (`Spark` → `Tier 2` → `Tier 3 Gate` → `Pilot`), graduates to a standalone `sidpa-template` repo, or closes a quarterly review.
- Log new cross-document discrepancies in §3 (`BFI-NNN`) and close them when reconciled.
- Do not duplicate per-idea inventory fields here; cite [inventory-of-ideas.md](../../inventory-of-ideas.md) and pillar trackers like [op-itg-tracker.md](op-itg-tracker.md).
