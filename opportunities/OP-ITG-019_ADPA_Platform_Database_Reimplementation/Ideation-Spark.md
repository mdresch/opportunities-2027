# Ideation Spark — `OP-ITG-019`: ADPA 2027 Platform Evolution (Database Layer & Project Reimplementation)

**Status:** 🌱 Future Development Spark — **commercial opportunity not yet defined** (`Idea` · Future 2027 Backlog; technical prerequisites identified)
**Tier:** Active Backlog *(Future 2027 Platform Development — Strategic Asset 2: Organizational Intelligence & Strategic Asset 4: Evidence & Governance)*
**Functional Area:** 6. IT and Technology *(includes IT/ICT Governance)* · **Signature Toolkit:** Digital Transformation
**Category:** Future Platform Development / Internal-to-Commercial Asset · **Size:** TBD *(Commercial offer undefined)*
**Source:** [inventory-of-ideas.md](../../inventory-of-ideas.md) §6 · [op-itg-tracker.md](../../docs/registers/op-itg-tracker.md) · **Upstream PoC Repo:** [`mdresch/adpa`](https://github.com/mdresch/adpa) *(Advanced Data Processing Automation — PoC)*

## Positioning *(Working / Pre-Commercial)*

> **ADPA (Advanced Data Processing Automation)** is a **2027 future development initiative** to evolve the existing ADPA PoC into a persistent, **database-backed platform** and **reimplement existing projects into ADPA** — establishing the unified operational backbone that can later power CBa Consult’s knowledge/context, evidence, and managed-intelligence offers once a concrete commercial opportunity is defined.

## What It Is *(Current Scope & Technical Prerequisites)*

The standalone commercial offer for ADPA is **intentionally left undefined** at Stage 1a (per CBa Consult’s Honest Evidence Baseline). Two concrete 2027 engineering prerequisites are captured here so ADPA stays visible on the portfolio roadmap without prematurely inventing a business case:

1. **Persistent Database Architecture:** Design and implement a durable database layer for ADPA (replacing PoC/file-only storage) to manage projects, document lineages, structured metadata, ontologies, and audit/version histories reliably.
2. **Project Reimplementation into ADPA:** Migrate and reimplement existing CBa Consult projects and recurring delivery pipelines into ADPA so projects share one consistent data model, template engine, and governance backbone rather than living as disconnected scripts/repos.
3. **Future Commercial Framing (Deferred):** Once database persistence and project reimplementation stabilize, evaluate whether ADPA remains an **internal delivery accelerator** (multiplying margin on `OP-ITG-014` and `OP-ITG-018`) or graduates into a **client-facing platform / SaaS / licensed offering**.

## 7 Pivotal Questions *(Stage 1a — Explicitly Provisional)*

1. **Buyer & 2027 Trigger** — **Undefined (Commercial Buyer TBD).** Immediate internal trigger: scaling CBa Consult’s 121-opportunity portfolio and multi-project governance (`OP-ITG-014`, `OP-ITG-018`) requires a structured database and unified project execution inside ADPA rather than scattered PoCs.
2. **The Wedge (Pain)** — Without a persistent database and unified project reimplementation, ADPA remains a PoC whose artifacts, state, and cross-project learnings cannot be queried, reused, or scaled reliably across engagements.
3. **Deliverable & Existing IP** — Existing PoC codebase in [`mdresch/adpa`](https://github.com/mdresch/adpa) (and `mdresch/adpa-onboarding`). Target 2027 deliverables: (a) database schema & persistence layer, (b) reimplementation of core projects into ADPA, and (c) commercial opportunity framing once technical foundation is proven.
4. **Sweat-Equity Feasibility** — High engineering effort (multi-sprint build; must be strictly time-boxed outside Q1 2027 client-pilot hours to protect the 10–15 hrs/wk cap and \$0 working-capital rule).
5. **Outcome & Proof** — **Technical proof first:** (a) ADPA running cleanly on a persistent database with automated migrations/tests, and (b) ≥1–2 existing projects successfully reimplemented and operated end-to-end inside ADPA. Commercial KPIs remain TBD until Stage 1b/2.
6. **Boundaries & Risk** — **Primary risk: premature platform engineering** consuming Q1–Q2 2027 commercial pilot bandwidth before a paying buyer or internal bottleneck justifies it. Keep strictly in **Future 2027 Developments** until Wave 1 client proof is underway, and govern any full build under **Track B (`sidpa-template`)**.
7. **Compounding / Scale Path** — Serves as the internal execution/knowledge engine behind **`OP-ITG-014` (Knowledge & Context Governance)**, **`OP-ITG-018` (Managed Intelligence Provider / MIP)**, **`OP-FIN-011` (Intelligence Capital)**, and **`OP-RSK-005` (Evidence Assurance)**; optional future graduation to a standalone Track B commercial product.

## Effort, Capital & Timeline

| Time Horizon | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| TBD (multi-sprint) | High | TBD *(commercial opportunity undefined; \$0 cash cap)* | Q3–Q4 2027 *(Future Dev)* |

## Market Validation & Source Notes

- **Existing PoC Repo:** [`mdresch/adpa`](https://github.com/mdresch/adpa) (*Advanced Data Processing Automation (PoC)*, last updated Oct 2026).
- **Governance Track:** **Track B Candidate** — when ready to begin database design and project reimplementation formally, adopt `sidpa-template` (`docs/registers/Project-Status-Register.md` + `scripts/export_portfolio_rollup.py`) and report macro progress back to [Portfolio-Status-Register.md §2b](../../docs/registers/Portfolio-Status-Register.md#2b-graduated-track-b-repositories-non-duplicating-rollup).

## Next Steps (When Scheduled for Future 2027 Work)

- [ ] Define the exact commercial role of ADPA (internal margin multiplier for `OP-ITG-014`/`018` vs. standalone client-facing product) before committing build hours.
- [ ] Draft the target database requirements (data model, persistence engine, migration strategy, \$0/low-cost hosting constraints).
- [ ] Select the first 1–2 existing projects to reimplement into ADPA as a bounded validation slice.
- [ ] If greenlit for build, instantiate Track B SIDPA governance in `mdresch/adpa` and wire up `scripts/export_portfolio_rollup.py`.

## Assigned Source Documents (ADPA)

- [Source-Documents.md](Source-Documents.md) — full manifest
- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content
- [Business-Case.md](Business-Case.md) — extracted business case content
