# Tier 1 vs Tier 2 cut sheet — `OP-ITG-017`

| Tier | Name | Price | Duration | Primary proof |
| --- | --- | --- | --- | --- |
| **Tier 1 (Phase 0)** | Live Benchmark & Feasibility Sprint | €2,000–€4,500 | 2–3 weeks | `benchmark_jit_wake.py` + TCO snapshot |
| **Tier 2** | Reference Implementation & Handover | €6,000–€15,000+ | 6–10 weeks | Golden image, pool, gateway, AC-01 sign-off |

**Assessment-only (optional Tier 1.5):** Architecture & governance mapping without full deploy — €4,000–€8,000, 3–4 weeks (see [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md)).

---

## Tier 1 scope

| Included | Excluded |
| --- | --- |
| Workload profile & idle-cost interview | Production cutover |
| One Hyper-V host benchmark (lab or client) | Multi-site HA |
| AC-01.1 run + executive readout | Custom ADR beyond ADR-008 tailoring |
| Roadmap to Tier 2 | 24/7 managed pool ops |

**Questionnaire:** P0 + pillars 1, 2, 5 from [Runtime-Containment-Assessment-Questionnaire.md](Runtime-Containment-Assessment-Questionnaire.md)

---

## Tier 2 scope

| Workstream | Repo anchors |
| --- | --- |
| Golden image & registry | `GOLDEN_IMAGE_REGISTRY.md`, bake scripts |
| JIT gateway + pool | Epics 002, 006, 007 |
| Sterile `.avhdx` sessions | Epic 005 |
| Identity-bound lease | Epic 012 / ADR-008 |
| Operator runbooks | USER_GUIDE, benchmark harness |

**Questionnaire:** All **20** controls.

---

## Bundle offers

| Bundle | Opportunities |
| --- | --- |
| Agent + runtime | `OP-ITG-013` Tier 2 + `OP-ITG-017` Tier 1 or 2 |
| Sovereign stack | `OP-ITG-015` assessment + MXC Tier 2 |
| MIP | `OP-ITG-018` pool governance retainer post-handover |