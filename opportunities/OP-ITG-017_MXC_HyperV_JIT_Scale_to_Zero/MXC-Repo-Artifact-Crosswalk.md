# MXC repo artifact crosswalk — `OP-ITG-017`

**Rule:** Engineering SSOT is [`github.com/mdresch/mxc`](https://github.com/mdresch/mxc). This file is the **portfolio index** only — link, do not duplicate ADRs or specs.

**Default branch for links:** `feat/hyperv-v2-rebased` (confirm before client-facing emails).

---

## Governance & status

| Artifact | Path in `mxc` |
| --- | --- |
| Live orientation | [`docs/registers/Project-Status-Register.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/registers/Project-Status-Register.md) |
| Audit trail | [`docs/registers/Audit-Register.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/registers/Audit-Register.md) |
| Phase 4 outcomes | [`docs/project-docs/OUTCOME-Phase-4-Actual-Outcomes.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/project-docs/OUTCOME-Phase-4-Actual-Outcomes.md) |

---

## Architecture (selected)

| ID | Topic |
| --- | --- |
| ADR-002 / Epic 002 | JIT ingress gateway, connection buffering |
| ADR-008 / Epic 012 | Identity-bound VM leasing |
| ADR-012 / Epic 010 | Image supply chain / SLSA |
| ADR-014–016 / Epics 013–015 | Sidecar, VMBus, parallelism |

Full list: `docs/07-architecture/ADR-*.md` in repo.

---

## Verification & demo

| Use case | Path |
| --- | --- |
| JIT wake benchmark | `scripts/hyperv/dev_harness/benchmark_jit_wake.py` |
| Ingress gateway (dev) | `scripts/hyperv/dev_harness/jit_ingress_gateway.py` |
| Win11 agent demo | `scripts/hyperv/demo_win11_agent_sandbox.ps1` (per Spark) |
| Operator guide | [`docs/hyperv/USER_GUIDE.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/hyperv/USER_GUIDE.md) |
| Acceptance criteria | AC-01.1–01.3, AC-02.x in USER_GUIDE & contract tests |

---

## Commercial GTM (in repo)

| Asset | Path |
| --- | --- |
| Product one-pager (MD) | [`docs/marketing/MXC-Product-One-Pager.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/marketing/MXC-Product-One-Pager.md) |
| PDF | `docs/marketing/MXC-Product-One-Pager.pdf` |
| Battlecard | [`docs/marketing/MXC-Sales-Battlecard.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/marketing/MXC-Sales-Battlecard.md) |
| Executive narrative | `docs/marketing/MXC-Executive-Pitch-Narrative.md` |
| LinkedIn kit | `docs/marketing/MXC-LinkedIn-and-Outreach-Kit.md` |
| Branding bridge | `docs/marketing/Opportunity-2027-Personal-Branding-and-Portfolio-Pack.md` |

**Portfolio one-pager:** [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) (CBa service framing).

---

## Portfolio ↔ repo workflow

1. **Sell** using portfolio charter + one-pager + repo battlecard.  
2. **Demo** using repo scripts on lab host (see [Benchmark-Demo-Checklist.md](Benchmark-Demo-Checklist.md)).  
3. **Deliver** reference implementation against repo user stories / IMPs — change requests back to `mxc`, not duplicate specs in `oppurtunities-2027`.