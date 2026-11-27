---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Cross-Cutting (All Process Groups)"
pmbok_process: "4.3 Direct & Manage Portfolio Work (Orientation Snapshot)"
lifecycle_stage: "Live — tracks active portfolio funnel position"
governance_policy: "none (orientation snapshot, not a governed approval artifact)"
artifact_id: "portfolio-status-register"
version: "1.0 (live — overwritten in place whenever orientation changes)"
owner: "Menno Drescher (Director, CBa Consult)"
last_updated: "2026-11-27"
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
| **Portfolio Coverage** | **131 / 131** opportunities have `Ideation-Spark.md` workspaces (Stage 1a complete): **5 Core Active Tier A**, 15 Tier B *(7 Growth + 8 Deferred/Pull-Only former Tier A)*, 41 Tier C, 3 Tier D, 62 Active Backlog *(incl. built-asset Sparks: SocialEngage, RPAS, n8n, iq-series, Obsidian vaults, ai-bot, portfolio site, liquidity simulator, enterprise-work-hierarchy)*, 5 Parked |
| **Active Pilots (`Status = Pilot`)** | **0** (all 131 items remain `Idea` or `Parked`; no commercial delivery work started yet) |
| **Authoritative Execution Sequence** | [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3: Core 5 Tier A (`OP-FIN-009`, `OP-ITG-014`, `OP-RSK-004`, `OP-ITG-013`, `OP-ITG-018` MIP) + Q1 wedge `OP-OPS-001 → OP-CX-001` |
| **Last Milestone Completed** | Upgraded **`OP-X-004`** (*Case study series on 2027 operating-model pilots*) to Stage 2–3 Readiness with Day-1 Capture & 3-Tier Anonymization Kit (`OP-X-006` co-design clause), Wave 1 Charter wiring, A4/GEO Proof Architecture brief, and `HYP-2027-023`–`025` (2026-11-27) |
| **Next Priority Unit of Work** | **Execute Wave 1 tests:** 15 founder outreach (`HYP-2027-001`) + 10 CFO discovery (`HYP-2027-002`) + ≤15 hr RGP playbook sprint (`HYP-2027-007`); record **first `G4` Director sign-off** when sponsor or hypothesis threshold met — [Wave-1-Execution-Playbook.md](Wave-1-Execution-Playbook.md) |
| **Graduated Standalone SIDPA Repos** | **`OP-ITG-017`** → [`mdresch/mxc`](https://github.com/mdresch/mxc) (Stage 10, `Phase 1 Complete (6/6 Epics · 17/17 stories) + Phase 2 Epics 007-009 Complete (271/271 tests + Win11 Lean Agent VM verified)` — see §2b below) *(other existing proprietary assets: `ICT-Governance-Framework-Application` for `OP-ITG-002`/`013`, `sidpa-template` for governance reference)* |

## 2. Q1–Q4 2027 Priority Wave Status

| Wave | Target Window | Lead Opportunity ID(s) | Current SIDPA Stage | Next Gate | Engagement Track |
| --- | --- | --- | --- | --- | --- |
| **Wave 1 (Fastest Proof)** | Q1 2027 | `OP-OPS-001 → OP-CX-001` | Stage 2–3 (`HYP-2027-001` **Testing**; [Pilot-Charter](../../opportunities/OP-OPS-001_Quote_to_delivery_handoff_map/Pilot-Charter.md) draft) | **15 outreach conversations** → paid pilot or sponsor → **`G4` sign-off** | Lightweight Advisory (Track A) |
| **Wave 1 (Financial Truth)** | Q1 2027 | `OP-FIN-009` | Stage 2–3 (`HYP-2027-002`, `007` **Testing**; [Pilot-Charter](../../opportunities/OP-FIN-009_Continuous_Close/Pilot-Charter.md) draft) | **RGP playbook ≤15 hrs** + **10 CFO interviews** → named client → **`G4` sign-off** | Lightweight Advisory (Track A) |
| **Wave 2 (AI & Compliance)** | Q2 2027 | `OP-ITG-014`, `OP-RSK-004`, `OP-ITG-013` | Stage 3-4 Pre-Pilot Packaged (Market Research + Questionnaires + Pilot Charters + Delivery Playbooks) | Tier 2 Research → Stage 3–4 Pre-Pilot Gate | Hybrid / Platform-Backed |
| **Wave 3 (Scale & Retainer)** | Q2–Q4 2027 | `OP-ITG-017`, `OP-ITG-018` (MIP), `OP-FIN-010`, `OP-ITG-015`, `OP-STR-004`/`005`, `OP-ITG-016` | `OP-ITG-017` Track B Stage 10 (see §2b); others Stage 1a | Deferred until Wave 1–2 pilot signal (`OP-ITG-017` awaiting Phase 1 completion / commercial pilot) | Platform-Backed / Retainer |

### 2b. Graduated Track B Repositories *(Non-Duplicating Rollup)*

*Generated via `python scripts/export_portfolio_rollup.py` in each graduated `sidpa-template` repo. All ADRs, stories, subsidiary plans, gate JSONs, and execution queues stay exclusively in the graduated repository; refresh only at macro gate crossings (Stage 8, Phase/Epic completion / Stage 11 Audit, Stage 12/18 close).*

| Opportunity ID | Graduated Track B Repo (SSOT) | Macro Stage & Baseline | Coarse Delivery Progress | Commercial / Pilot Status | As Of |
| --- | --- | --- | --- | --- | --- |
| `OP-ITG-017` | [`https://github.com/mdresch/mxc`](https://github.com/mdresch/mxc) (`feat/hyperv-v2-rebased`) → `docs/registers/Project-Status-Register.md` | **Stage 18** Program complete (`PMP-BL-v4.0.0`; Phases 1–4; ready for commercial pilots per repo register) | Engineering SSOT in repo; portfolio [OP-ITG-017 commercial pack](../../opportunities/OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero/Ideation-Spark.md) (Tier 2 research 2026-11-26) | Track B **build done**; portfolio inventory **`Idea`** until client Pilot #1 & `G4` | 2026-11-26 |
| `OP-ITG-013` *(Portal)* | [`https://github.com/mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) (`main` @ `c8ba282`) → `docs/registers/Project-Status-Register.md` | Stage 1 (Initiating — `sidpa-template` initialized; pre-Stage-8 prototype in `prototype/index.html`) | 0 epics (Initiating) | **`Idea`** — **PR preparation mode** ([PR-ITG-013-Preparation-Checklist.md](../../opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/PR-ITG-013-Preparation-Checklist.md)); `G4` not signed; `HYP-2027-013`/`014` = `Formulated` until Wave 0 invites | 2026-11-26 |

## 3. Pending Design-Time Baseline Feedback (`BFI-NNN`)

*Per SIDPA `chain-coverage.md` §3.1, document/ranking inconsistencies found before execution are logged here (`evidence_basis: design_time`) — never mixed into [Lessons-Learned-Register.md](Lessons-Learned-Register.md).*

| ID | Affected Artifacts | Finding | Resolution | Status |
| --- | --- | --- | --- | --- |
| `BFI-001` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §17 vs. [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3 | `OP-ITG-013` is #1 in strategic-value Priority Index vs. #5 in delivery execution sequence (documented in [op-itg-tracker.md](op-itg-tracker.md) §2). | Confirmed by Director (2026-11-20): keep Executive Summary #5 as authoritative delivery order; inventory #1 remains strategic-value ranking. | **Closed** (2026-11-20) |
| `BFI-002` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §6 vs. [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3 | `OP-ITG-015` tagged `Q2 2027` in inventory row vs. `Q3–Q4 2027` in Executive Summary. | Confirmed by Director (2026-11-20): aligned `OP-ITG-015` in `inventory-of-ideas.md` and `op-itg-tracker.md` to `Q3–Q4 2027`. | **Closed** (2026-11-20) |
| `BFI-003` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §6, [op-itg-tracker.md](op-itg-tracker.md) §3 | Scope flags on `OP-ITG-008` (Spatial/AR Content Design) and `OP-ITG-009` (Global Data Centers in Space) — likely not IT consulting items. | Confirmed by Director (2026-11-20): keep both in place as-is (`OP-ITG-009` remains Parked / Tier D). | **Closed** (2026-11-20) |
| `BFI-004` | [inventory-of-ideas.md](../../inventory-of-ideas.md) §7 (`OP-OPS-001`, `OP-OPS-002`, `OP-OPS-003` rows), [market-analysis-2027.md](../../market-analysis-2027.md) §5, §7, [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §2–3, [Opportunities_2027_Priority_Report.html](../reports/Opportunities_2027_Priority_Report.html) §02 | **Quote-to-Cash carries a stronger evidence badge than its evidence chain supports.** (a) `OP-OPS-003`'s "🟢🟢 Best-evidenced idea in the entire inventory" cites market-analysis §5, which is the *Sales* section: SyncGTM (78% of 1,200+ B2B firms run a dedicated RevOps function) and ISG (>50% of revenue leaders embed RevOps in strategic planning by 2027). Both establish that RevOps is permanent *infrastructure*; neither evidences demand or willingness-to-pay for a Q2C handoff **diagnostic**. (b) `OP-OPS-001`'s badge reads "Fastest, most concrete pilot candidate — see `OP-OPS-003`", so the two rows cite each other as support; three rows appear to corroborate but resolve to two third-party statistics and a cross-reference. (c) market-analysis §7 marks the whole cluster 🟡 "still no hard universal $-leakage figure for handoff friction" — the largest gap in a CFO/COO business case. (d) No supply-side or competitive analysis exists anywhere (client's own RevOps team, CPQ/CRM vendors, Big Four process mining), so differentiation is unevidenced. (e) Placement differs by view: Tier A flagship in the Executive Summary §2 but "A — Unranked" in Priority Report §02 strategic-value index, and `OP-OPS-003` holds no proprietary IP anchor (cf. `OP-FIN-009`/`010` RGP provenance, `OP-ITG-013`/`014` ADPA/ECS/MXC), making it the least defensible flagship long-term. *Not a ranking error:* the high placement is defensible as an **entry-and-proof vehicle** (cheapest Tier A build at 8–12 wks / €1,500–€6,000+, reachable COO/CRO/CFO buyer below procurement threshold, €0 new software spend, rides Wave 1 `OP-OPS-001` fieldwork) and overstated as a **market-evidenced flagship**. | Logged 2026-11-23 (Director). Proposed resolution, not yet approved: (1) downgrade `OP-OPS-003`'s note from "best-evidenced idea in the entire inventory" to "best-evidenced *entry wedge*; flagship status rests on scaling leverage, not market proof"; (2) remove the circular `OP-OPS-001 → OP-OPS-003` badge reference and cite §7 instead; (3) relabel the Priority Report entry as "A – Unranked (entry/proof vehicle)" with that rationale; (4) add a competitive/supply-side paragraph before the Tier 3 Pre-Pilot Gate; (5) treat the D3 leakage register benchmark (≥5 traced deal sets) as the compensating control that closes gap (c). | **Open** (2026-11-23) |

## 4. Maintenance Cadence

- Update §1 and §2 whenever an opportunity advances a tier (`Spark` → `Tier 2` → `Tier 3 Gate` → `Pilot`), graduates to a standalone `sidpa-template` repo, or closes a quarterly review.
- Log new cross-document discrepancies in §3 (`BFI-NNN`) and close them when reconciled.
- Do not duplicate per-idea inventory fields here; cite [inventory-of-ideas.md](../../inventory-of-ideas.md) and pillar trackers like [op-itg-tracker.md](op-itg-tracker.md).
