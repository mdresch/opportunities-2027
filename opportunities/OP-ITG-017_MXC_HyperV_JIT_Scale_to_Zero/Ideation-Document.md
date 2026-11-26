# Ideation Document — `OP-ITG-017`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
## Portfolio-derived ideation (no dedicated .docx assigned)

**Inventory description:** Deploy hardware-enforced Type-1 Hyper-V execution sandboxes (MXC Hyper-V subsystem on Windows Server 2025 / Windows 11 Enterprise) with **<500ms VM image start (<300ms achieved unpause-to-available; <800ms TTFB)**, **0.0% idle CPU**, JIT connection-buffering ingress gateway, sterile `.avhdx` differencing-disk session reset to immutable golden checkpoints, watermark warm-pool autoscaling, and identity-bound VM leasing (ADR-008) for autonomous AI agents, ADPA/SIDPA workloads, and regulated financial/PII processing.

### From Ideation-Spark.md

# Ideation Spark — `OP-ITG-017`: MXC Hyper-V JIT Scale-to-Zero VM Sandboxes

**Status:** 🔥 **Track B program complete** in [`mdresch/mxc`](https://github.com/mdresch/mxc) (Stage **18**, `PMP-BL-v4.0.0`, Phases 1–4) · **Commercial `Idea`** — Tier 2 research & delivery pack complete 2026-11-26 · Client Pilot #1 pending  
**Tier:** B — Track B flagship *(commercial Q2–Q4 2027)* · Strategic assets **Digital Labor** + **Sovereign Information**  
**Functional Area:** 6. IT and Technology *(includes IT/ICT Governance)* · **Signature Toolkit:** Digital Transformation  
**Category:** Platform-Backed Architecture / Advisory · **Size:** Medium & Large  
**Source:** [inventory-of-ideas.md](../../inventory-of-ideas.md) · [market-analysis-2027.md](../../market-analysis-2027.md) · [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) · [Tier-2-Market-Research.md](Tier-2-Market-Research.md) · [MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md) · [Azure-Scale-Out-and-Boundary-Matrix.md](Azure-Scale-Out-and-Boundary-Matrix.md) · [Portfolio-Status-Register.md §2b](../../docs/registers/Portfolio-Status-Register.md#2b-graduated-track-b-repositories-non-duplicating-rollup) · **Graduated Track B SSOT:** [`mdresch/mxc`](https://github.com/mdresch/mxc)

## Positioning

> For **CIOs, CTOs, and CISOs** on **Windows Server 2025 / Win11 Enterprise Hyper-V** who face the **idle-cost vs cold-boot vs shared-kernel** trilemma for **agents, ADPA automation, and regulated PII workloads**, **MXC Hyper-V JIT Scale-to-Zero** delivers **hardware isolation** with **≤300ms unpause / ≤800ms TTFB** and **sterile `.avhdx` sessions** — backed by a **production-tested** repo, not slideware.

## 7 Pivotal Questions (locked)

1. **Buyer & trigger** — Regulated Windows estates + agent containment + FinOps (EU AI Act, DORA/NIS2).  
2. **Wedge** — Trilemma pain on every automation webhook path.  
3. **IP** — Built in `mdresch/mxc`; commercial docs in this folder; **crosswalk, not duplicate**.  
4. **Feasibility** — Engineering done; commercial 2–10 weeks advisory/PoC on client hosts.  
5. **Proof** — `benchmark_jit_wake.py` + AC-01.1 + optional 5-Act demo.  
6. **Boundaries** — Client owns Hyper-V licensing, hosts, SOC; CBa assessment + reference + runbooks.  
7. **Compounding** — Runtime under `OP-ITG-013`, sovereign layer `OP-ITG-015`, architecture `OP-ITG-016`, MIP `OP-ITG-018`.

## Existing assets

| Portfolio | Repo (`mdresch/mxc`) |
| --- | --- |
| [One_Pager_OP-ITG-017_…](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) | `docs/marketing/MXC-Product-One-Pager.pdf` |
| [Runtime-Containment-Assessment-Questionnaire.md](Runtime-Containment-Assessment-Questionnaire.md) | USER_GUIDE, ADRs, benchmarks |
| [Pilot-Charter.md](Pilot-Charter.md) | Project-Status-Register (Stage 18) |
| [Benchmark-Demo-Checklist.md](Benchmark-Demo-Checklist.md) | `demo_win11_agent_sandbox.ps1` |

## Related opportunities

`OP-ITG-013` · `OP-ITG-015` · `OP-ITG-016` · `OP-ITG-018` · `OP-MKT-007` (portfolio pack in repo marketing folder)

## Next steps

- [x] Tier 2 market research + IP audit + repo crosswalk.  
- [x] Questionnaire, tier cut sheet, charter, GTM tracker, demo checklist.  
- [x] Link marketing kit in repo (already present).  
- [ ] Record **client/lab** benchmark + update Portfolio §2b date.  
- [ ] Wave 1 discovery (#1–3) → `HYP-2027-020` `Testing`.  
- [ ] Paid Tier 1/2 → `G4` Director sign-off.

## Assigned Source Documents (ADPA)

- [Source-Documents.md](Source-Documents.md) — full manifest
- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content
- [Business-Case.md](Business-Case.md) — extracted business case content

