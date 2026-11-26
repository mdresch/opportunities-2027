# Delivery playbook & SOW shell — `OP-ITG-017`

**Repo implementation detail:** `mdresch/mxc` user stories & IMPs — not duplicated here.

---

## Phase 0 — Tier 1 (weeks 1–3)

| Week | Activity | Output |
| --- | --- | --- |
| 1 | Kickoff; [Runtime-Containment-Assessment-Questionnaire.md](Runtime-Containment-Assessment-Questionnaire.md) | P0 + trilemma baseline |
| 1–2 | Host prerequisites (Hyper-V, NVMe, RAM) | Go/no-go |
| 2 | Run `benchmark_jit_wake.py` (lab or client) | AC-01.1 report |
| 3 | [Executive-Readout-Template.md](Executive-Readout-Template.md) | Tier 2 proposal |

## Tier 2 — Reference implementation (weeks 4–10)

Align to one-pager phases: Golden registry → gateway → pool → sterility → handover (see [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md)).

## SOW shell

- **Fees:** 50% kickoff / 50% readout (Tier 1); milestone-based Tier 2  
- **Client provides:** Hyper-V admin, hardware, test workload, change window  
- **CBa provides:** Architecture, guided deploy, benchmarks, runbooks  
- **Explicit out of scope:** MSP L1; MSSP SOC; unbounded image migration  

## Evidence for `G4`

- Signed AC-01.1 summary (attach benchmark output; redact hostnames)  
- CFO TCO one-pager (idle VM hours × cost)  
- CISO containment sign-off or documented gap list  