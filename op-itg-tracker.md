# OP-ITG Tracker — Pillar 6: IT and Technology

**Owner:** Director (all 16 items) | **Created:** 2026-11-19 | **Source of truth for item details:** [inventory-of-ideas.md](inventory-of-ideas.md) §6

Scope of this file: tracking and next steps only. No delivery work has been started on any item. Statuses are copied from the inventory; nothing has been piloted yet.

## 1. Tracker

Priority scale: **P1** = pursue first (Q1–Q2 2027 execution sequence), **P2** = next wave / entry wedges, **P3** = opportunistic or supporting, **Hold** = flagged for scope review.

| ID | Name | Status | Next step (planning only) | Dependencies | Suggested priority | Project / assets |
| --- | --- | --- | --- | --- | --- | --- |
| `OP-ITG-001` | Cloud governance quick-start | Idea (Q2 2027) | Confirm which parts of the ICT-Governance platform can be reused unchanged, and run a short market check (the inventory says this pillar is unresearched). | Platform repo; entry point to `OP-ITG-002` | P3 | [Repo](https://github.com/CBA-Consult/ICT-Governance-Framework-Application), `ADPA ICT Governance Framework\` (external, not in this repo) |
| `OP-ITG-002` | ICT Governance Maturity Assessment & Multi-Cloud Compliance Audit | Idea (Q2–Q3 2027) | Find one external pilot candidate (none found yet). Decide whether it stays standalone or is folded into `OP-ITG-013`. | Platform repo; `OP-ITG-001` | P2 | [Repo](https://github.com/CBA-Consult/ICT-Governance-Framework-Application), `ADPA ICT Governance Framework\` (14 docs, external) |
| `OP-ITG-003` | Custom GPT / RAG for internal governance & policy docs | Idea (Q2–Q3 2027) | Check overlap with `OP-ITG-014` (RAG readiness). Decide keep, merge or park. | `OP-ITG-014` (overlap) | P3 | None |
| `OP-ITG-004` | Managed Microsoft 365 Migration Services | Idea (Q2 2027) | Decide whether this is a standalone offer or only an entry wedge into `OP-ITG-001`/`002`. | Feeds `OP-ITG-001`/`002`, `OP-ITG-010`, `OP-ITG-012`, `OP-HR-008` | P3 | None (source doc `Opportunities Business\Managed Microsoft 365 Migration Services.docx`, external) |
| `OP-ITG-005` | AI Infrastructure Consultancy | Idea (Q2–Q3 2027) | Validate demand and check overlap with `OP-STR-002` before any scoping. | Pairs with `OP-ITG-002` | P3 | None |
| `OP-ITG-006` | Data Annotation Microservices | Idea (Q2 2027) | Check fit with the Tier A portfolio and the 10–15 hrs/wk cap. Likely a candidate to park. | None stated | P3 | None |
| `OP-ITG-007` | Power Apps Center of Excellence | Idea (Q2–Q3 2027) | Confirm the link with `OP-DTX-003`, and with `OP-ITG-011` (Copilot Studio CoE). | `OP-DTX-003`, `OP-ITG-004`, `OP-ITG-011` | P3 | None |
| `OP-ITG-008` | Spatial / AR Content Design | Idea (Q3 2027) | Owner decision: move to the Digital Transformation or CX pillar, or park. See §3. | None | **Hold** (scope flag) | None |
| `OP-ITG-009` | Global Data Centers in Space | Parked | Owner decision: keep parked as a Tier D foresight brief, or move to Strategy. See §3. | None | **Hold** (scope flag) | None |
| `OP-ITG-010` | Information Retention and Recovery Specialist | Idea (Q2 2027) | Confirm the Tier B scope. It is also a named input to `OP-STR-004`/`005` and `OP-ITG-014`, so decide its place relative to those. | Pairs with `OP-FIN-009`/`010`, `OP-ITG-004`, `OP-LEG-002`; anchors `OP-ITG-015` | P2 | None (referenced in [flagship one-pager](One_Pager_Flagship_Opportunities_2027.md)) |
| `OP-ITG-011` | Agent 365 & Entra AI-Agent Governance Quick-Start | Idea (Q1–Q2 2027) | Decide whether this is the Phase 0 wedge into `OP-ITG-013`. The one-pager already names it that way (€2,500–€7,500). | Wedge for `OP-ITG-002`, `OP-ITG-007`, `OP-ITG-013` | P2 (wedge for P1) | None (mentioned in the `OP-ITG-013` one-pager) |
| `OP-ITG-012` | Purview-to-Fabric/OneLake & Sovereign Control Panel Readiness | Idea (Q2 2027) | Check preview-feature stability (Sovereign Control Panel, Fabric licensing) before committing. | Pairs with `OP-ITG-010`, `OP-ITG-004` | P3 | None |
| `OP-ITG-013` | Enterprise AI Agent Governance Assessment | Idea (Q1–Q2 2027) | Confirm the sequencing decision in §2, then list the reusable platform assets and the Phase 0 wedge. | `OP-ITG-011` wedge, platform repo; leads into `OP-ITG-016`, `OP-HR-009` | **P1** | [One-pager](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md); [Tier A summary](Tier_A_Executive_Summary_2027.md) |
| `OP-ITG-014` | Knowledge Intelligence & Context Governance Assessment | Idea (Q1–Q2 2027) | Confirm the sequencing decision in §2, then list the ADPA/ECS assets to reuse. | ADPA/ECS IP; `OP-DTX-005`; enables `OP-ITG-013`; links to `OP-ITG-010` | **P1** | [One-pager](One_Pager_OP-ITG-014_Knowledge_Context_Governance.md); [Tier A summary](Tier_A_Executive_Summary_2027.md) |
| `OP-ITG-015` | Cryptographic Sovereignty & Trust Architecture Assessment | Idea (Q2 2027 in the inventory; Q3–Q4 in the exec summary) | Resolve the quarter mismatch (see §2). Write the explicit threat model into a brief. | Anchors `OP-ITG-010`, `OP-ITG-014`; SIDPA document | P2 | [Flagship one-pager](One_Pager_Flagship_Opportunities_2027.md) (no dedicated file); [Tier A summary](Tier_A_Executive_Summary_2027.md) |
| `OP-ITG-016` | Enterprise Agent Operating Architecture ("COBIT for Agents") | Idea (Q3 2027) | Keep as the follow-on to `OP-ITG-013`. No action until `OP-ITG-013` has a pilot. | `OP-ITG-013`, `OP-HR-009` | P2 (later wave) | [Flagship one-pager](One_Pager_Flagship_Opportunities_2027.md) (no dedicated file); [Tier A summary](Tier_A_Executive_Summary_2027.md) |

## 2. Ranking conflict: `OP-ITG-013`

**The conflict.** The Priority Index in `inventory-of-ideas.md` (§17) ranks `OP-ITG-013` **#1**. `Tier_A_Executive_Summary_2027.md` (§3) ranks it **#5**. The `README.md` and the `OP-ITG-013` one-pager also say #5.

**Why they differ.** The two lists measure different things:

- The inventory index is a **strategic-value** ranking: it covers Tier A–D and has no OPS or FIN wedge ahead of the ITG items.
- The executive summary is an **execution sequence** under the 10–15 hrs/wk cap. It puts the fastest-proof pilots first (`OP-OPS-001 → OP-CX-001` as #1, `OP-FIN-009` as #2), then `OP-ITG-014` (#3), `OP-RSK-004` (#4) and `OP-ITG-013` (#5).

**Ranking kept: the executive summary's #5, for execution order.** Reasons:

1. The README and the one-pagers already use it, so keeping it avoids changing four other files.
2. It is the later-dated, delivery-oriented document (2026-11-18), and it accounts for the capacity cap.
3. It agrees with the inventory's own Q2 2027 execution queue (§17) on timing: `OP-ITG-013` is a Q2 pilot there, not Q1. That queue lists `OP-ITG-013` first among three Q2 items, so it does not settle the order inside Q2. The inventory is not fully consistent here either.

**What I did.** I did not renumber the inventory index, because it is a valid strategic-value ranking. I added a note below the OP-ITG table in the inventory stating that the executive summary is the authoritative delivery order. The index numbers are unchanged.

**Open point for the Director.** If you would rather make `OP-ITG-013` the first ITG delivery, the executive summary should be changed instead. That is a commercial decision. I have not made it.

**Related mismatch.** `OP-ITG-015` is #5 in the inventory index and tagged Q2 2027 in its row. The executive summary schedules it for Q3–Q4 2027. The same reasoning applies, so I treat Q3–Q4 as current. `OP-ITG-016` is consistent across the files (Q3 2027 and later).

## 3. Scope flags

Both items remain in the inventory and in the tracker.

- **`OP-ITG-008` Spatial / AR Content Design.** The offering is spatial UX, AR authoring and 3D content, and its toolkit tag is Customer Experience Strategy & Design Thinking. That is content or design work, not IT consulting. It resembles `OP-HR-006` (AR/VR Training Scene Builder), which sits under Human Resources. Suggested home: Digital Transformation or CX.
- **`OP-ITG-009` Global Data Centers in Space.** The inventory already describes it as speculative research with no capital path. It is Parked and listed as Tier D thought leadership. Its toolkit tag is Corporate/Business Strategy, and it is not an IT consulting service. Suggested home: Strategy, or a foresight brief.

Neither has been moved or re-tagged. That is the Director's decision.

## 4. Existing projects and assets

| Item | What exists in this repo | External / not verified |
| --- | --- | --- |
| `OP-ITG-013` | [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md) | Platform repo (see below) |
| `OP-ITG-014` | [One_Pager_OP-ITG-014_Knowledge_Context_Governance.md](One_Pager_OP-ITG-014_Knowledge_Context_Governance.md) | ADPA / ECS assets |
| `OP-ITG-015` | No dedicated file. Covered in [One_Pager_Flagship_Opportunities_2027.md](One_Pager_Flagship_Opportunities_2027.md) and the [Tier A summary](Tier_A_Executive_Summary_2027.md) | `SIDPA ... .docx` on `F:\OneDrive - CBA\` |
| `OP-ITG-016` | No dedicated file. Covered in the same two documents | None |
| `OP-ITG-001`, `OP-ITG-002` | None in this repo | [ICT-Governance-Framework-Application](https://github.com/CBA-Consult/ICT-Governance-Framework-Application) and `ADPA ICT Governance Framework\` (14 docs). I could not open either from here. |

So of the four items you named, only `OP-ITG-013` and `OP-ITG-014` have their own one-pager. `OP-ITG-015` and `OP-ITG-016` appear only in the combined flagship material. Items `OP-ITG-003` to `012` have no project or asset beyond their inventory row.

## 5. Changes made in this pass

- `inventory-of-ideas.md`: added an **Owner** column (value: Director) to the OP-ITG table, plus a short ownership, ranking and scope note under it. Nothing was removed or renumbered.
- `op-itg-tracker.md`: this file, created.
- The pre-existing uncommitted edits in `inventory-of-ideas.md` and `Tier_A_Executive_Summary_2027.md` were not touched.
