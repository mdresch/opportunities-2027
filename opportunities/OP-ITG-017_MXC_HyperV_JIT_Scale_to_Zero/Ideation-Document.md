# Ideation Document — `OP-ITG-017`

**Generated:** 2026-11-26 (from ADPA Projects Lists source assignment script)
**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))

> Canonical paths remain on OneDrive; this markdown is an extracted working copy.
## Portfolio-derived ideation (no dedicated .docx assigned)

**Inventory description:** Deploy hardware-enforced Type-1 Hyper-V execution sandboxes (MXC Hyper-V subsystem on Windows Server 2025 / Windows 11 Enterprise) with **<500ms VM image start (<300ms achieved unpause-to-available; <800ms TTFB)**, **0.0% idle CPU**, JIT connection-buffering ingress gateway, sterile `.avhdx` differencing-disk session reset to immutable golden checkpoints, watermark warm-pool autoscaling, and identity-bound VM leasing (ADR-008) for autonomous AI agents, ADPA/SIDPA workloads, and regulated financial/PII processing.

### From Ideation-Spark.md

# Ideation Spark — `OP-ITG-017`: MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes

**Status:** 🔥 Track B Engineering Active (`mdresch/mxc` @ Stage 10, `4/6 Epics · 10/17 stories`, `PMP-BL-v1.0.0`) · Commercial packaging & Client Pilot #1 pending (`Idea`)
**Tier:** A — Flagship *(Strategic Asset 3: Digital Labor & Strategic Asset 5: Sovereign Information)*
**Functional Area:** 6. IT and Technology *(includes IT/ICT Governance)* · **Signature Toolkit:** Digital Transformation
**Category:** Platform-Backed Architecture / Advisory · **Size:** Medium & Large
**Source:** [inventory-of-ideas.md](../../inventory-of-ideas.md) · [market-analysis-2027.md](../../market-analysis-2027.md) · [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md) · [Portfolio-Status-Register.md §2b](../../docs/registers/Portfolio-Status-Register.md#2b-graduated-track-b-repositories-non-duplicating-rollup) · **Graduated Track B SSOT:** [`mdresch/mxc` (`docs/registers/Project-Status-Register.md`)](https://github.com/mdresch/mxc)

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
   - Rust control plane (`src/mxc-sdk/
