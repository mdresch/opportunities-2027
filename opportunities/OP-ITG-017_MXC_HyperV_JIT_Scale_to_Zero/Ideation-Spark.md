# Ideation Spark — `OP-ITG-017`: MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes

**Status:** 🔥 Track B Engineering Active (`mdresch/mxc` @ Stage 10, `4/6 Epics · 10/17 stories`, `PMP-BL-v1.0.0`) · Commercial packaging & Client Pilot #1 pending (`Idea`)
**Tier:** A — Flagship *(Strategic Asset 3: Digital Labor & Strategic Asset 5: Sovereign Information)*
**Functional Area:** 6. IT and Technology *(includes IT/ICT Governance)* · **Signature Toolkit:** Digital Transformation
**Category:** Platform-Backed Architecture / Advisory · **Size:** Medium & Large
**Source:** [inventory-of-ideas.md](../../inventory-of-ideas.md) · [market-analysis-2027.md](../../market-analysis-2027.md) · [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) · [Azure-Scale-Out-and-Boundary-Matrix.md](Azure-Scale-Out-and-Boundary-Matrix.md) · [Portfolio-Status-Register.md §2b](../../docs/registers/Portfolio-Status-Register.md#2b-graduated-track-b-repositories-non-duplicating-rollup) · **Graduated Track B SSOT:** [`mdresch/mxc` (`docs/registers/Project-Status-Register.md`)](https://github.com/mdresch/mxc)

## Positioning

> For **CIOs, CTOs, CISOs, and Enterprise Platform Architects** running regulated automation (ADPA / SIDPA), financial/PII processing, or autonomous AI agents on Windows Server 2025 / Windows 11 Enterprise, **MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes** is a **hardware-enforced Type-1 Hyper-V execution architecture** that resolves the **idle-cost vs. cold-boot (14–45s) vs. shared-kernel security trilemma** — waking dormant VMs in **<500ms (<300ms achieved unpause-to-available; <800ms TTFB)** at **0.0% idle CPU** with sterile `.avhdx` session reset and \$0 initial working capital.

## What it is

An enterprise extension of Microsoft eXecution Container (MXC) (`feat/hyperv-v2-rebased`) that replaces shared-kernel container assumptions with hardware-isolated Type-1 Hyper-V micro-instances managed by a Rust control plane (`wxc-exec --features hyperv`) and a connection-buffering JIT Ingress Gateway:

- **<500ms VM Image Start (<300ms achieved unpause-to-available; <800ms TTFB):** Paused Windows Server 2025 Golden Images stay in host RAM at **0.0% idle CPU** (working set pre-trimmed to ~1.1 GB) and resume before an incoming HTTPS/webhook request times out or a user finishes MFA sign-in.
- **Sterile Session Isolation (`.avhdx` Differencing Disks):** Every session executes on a transient differencing disk; upon idle reaping (`300s` timeout) or `pool-release`, the delta disk is discarded and the VM snaps back to an immutable, approved baseline checkpoint (`pool-clean-baseline`) to eliminate state drift and persistence attacks.
- **Dynamic Watermark Autoscaling & Multi-Pool Management:** Proactive warm standby pools (`pool_state.json` + `TransitionLock`) handle burst concurrency without sacrificing bank-grade hardware isolation.
- **Identity-Bound VM Leasing (`ADR-008`):** Authentication-gated, identity-bound leasing so username/password + MFA or agent identity (Entra Agent Identity) binds cleanly to an isolated guest instance.

## 7 Pivotal Questions

1. **Buyer & 2027 Trigger** — CIOs, CTOs, CISOs, and Platform Engineering leads in regulated industries (finance, healthcare, government, legal, enterprise AI). Triggered by 2027's twin mandates: (a) **autonomous AI agents executing untrusted code/tools** require harder boundaries than shared-kernel containers (DORA, NIS2, EU AI Act), and (b) **FinOps pressure** to eliminate 24/7 idle Windows Server VM & licensing burn without suffering 14–45s cold boots.
2. **The Wedge (Pain)** — Organizations face a broken trilemma: keep Windows VMs running 24/7 (high CPU/RAM/license burn), shut them down (14–45s cold boot breaks webhooks and UX), or use shared-kernel containers (unacceptable blast radius for financial, PII, or untrusted agent workloads).
3. **Deliverable & Existing IP** — **Already built & formally documented** in `c:\Users\MennoDrescher\source\repos\mxc`:
   - Rust control plane (`src/mxc-sdk/src/backends/hyperv/`), `wxc-exec --features hyperv`, JIT Ingress Gateway (`jit_ingress_gateway.py`), Golden Image baker (`bake_golden_image.ps1`), and automated benchmark harness (`benchmark_jit_wake.py`).
   - Full ARB-approved architecture suite: `ARCHITECTURE_DESIGN_DOCUMENT.md`, `ADR.md` (ADR-001–006 Accepted; ADR-008 Proposed), `FDD.md`, `BDR.md`, `USER_STORIES.md` (`AC-01`–`AC-05`), `IMPLEMENTATION_PLAN.md`, `GOLDEN_IMAGE_REGISTRY.md`, and `Spark-Capture.md`.
4. **Sweat-Equity Feasibility** — 6–10 wks (8–12 hrs/wk), High technical depth, \$0 initial working capital (core engineering and documentation already exist). Expected engagement range: €4,000–€15,000+.
5. **Outcome & Proof** — Verifiable benchmark metrics on client hardware (`benchmark_jit_wake.py`: `<500ms` SLA / `<300ms` unpause-to-available, `<800ms` TTFB, `0.0%` idle CPU, clean `.avhdx` checkpoint reset) + executive TCO/FinOps comparison vs. always-on Windows Server clusters.
6. **Boundaries & Risk** — Requires Windows Server 2025 or Windows 11 Enterprise Hyper-V hosts with NVMe storage tiering and host RAM capacity for warm standby pools; fork maintenance against upstream `microsoft/mxc` (`SCOPE_DRIFT_AND_UPSTREAM_MAINTENANCE.md`). Advisory/reference-architecture boundary: client owns host OS licensing and production SOC operations.
7. **Compounding / Scale Path** — **Assessment → Golden-Image & Pool Architecture → Reference Implementation → Managed Pool Blueprint**. Acts as the **physical/hypervisor containment layer** directly underpinning Tier A flagships `OP-ITG-013` (Enterprise AI Agent Governance), `OP-ITG-015` (Cryptographic Sovereignty), and `OP-ITG-016` ("COBIT for Agents").

## Effort, Capital & Timeline

| Time Horizon | Effort | Expected Capital | Target Qtr |
| --- | --- | --- | --- |
| 6–10 wks (8–12 hrs/wk) | High | €4,000–€15,000+ | Q2 2027 |

## Market Validation & Source Notes

- **Proprietary Built Asset:** `c:\Users\MennoDrescher\source\repos\mxc` (`feat/hyperv-v2-rebased`, first committed 15 Oct 2026; `Spark-Capture.md` 29 Oct 2026).
- **Direct Synergy:** Bridges **ICT Governance (`OP-ITG-002`)**, **Enterprise AI Agent Governance (`OP-ITG-013`)**, **Cryptographic Sovereignty (`OP-ITG-015`)**, **Personal Branding (`OP-MKT-007`)**, and **ADPA / SIDPA** execution into a tangible, demonstrable runtime moat that traditional Big Four advisory firms cannot match.
- **Commercial & Personal Branding Kit (`mdresch/mxc`):** [`docs/marketing/Opportunity-2027-Personal-Branding-and-Portfolio-Pack.md`](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/marketing/Opportunity-2027-Personal-Branding-and-Portfolio-Pack.md), `MXC-Product-One-Pager.pdf`, `MXC-Sales-Battlecard.md`, `MXC-Executive-Pitch-Narrative.md`, and `MXC-LinkedIn-and-Outreach-Kit.md` — cross-linked with [`OP-MKT-007`](../OP-MKT-007_Personal_Branding_Consultancy/Ideation-Spark.md) and [`mdresch/my-portfolio-menno`](https://github.com/mdresch/my-portfolio-menno) (`https://my-portfolio-menno.vercel.app/projects/mxc`).
- **Note on ADR Hygiene:** Resolve `ADR-007` heading gap (currently embedded in `ADR-006 §5/§7`) and finalize `ADR-008` (identity-bound VM leasing) before enterprise client pilot handoff.

## Next Steps (Tier 2 → Pilot Gate)

- [x] Package a 1-page client-facing executive brief (`MXC-Product-One-Pager.pdf`), sales battlecard, pitch narrative, LinkedIn kit, and live 5-Act demo script (`scripts/hyperv/demo_win11_agent_sandbox.ps1`), plus cross-link to `OP-MKT-007` and `my-portfolio-menno`.
- [ ] Draft the commercial `Ideation-Document.md` mapping the 4-step monetization ladder (Assessment → Architecture Blueprint → Reference Implementation → Pool Governance Retainer).
- [ ] Complete the Tier 3 pre-pilot gate (7 Pivotal Questions) and identify the first regulated-enterprise or sovereign-AI pilot sponsor.
