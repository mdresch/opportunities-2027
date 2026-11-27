---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-017"
execution_track: "Track B — Platform-Backed / Graduated Build"
linked_hypotheses: "HYP-2027-020 (Formulated), HYP-2027-021 (Formulated), HYP-2027-022 (Testing)"
primary_source: "Portfolio Inventory & Market Analysis 2027 (Track B: mdresch/mxc)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Stage 1b Ideation Document — `OP-ITG-017`: MXC Hyper-V JIT Scale-to-Zero VM Sandboxes

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md).
> **Sibling SSOTs:** [Ideation-Spark.md](Ideation-Spark.md) · [Tier-2-Market-Research.md](Tier-2-Market-Research.md) · [MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md) · [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md) · [Source-Documents.md](Source-Documents.md)

## 1. Problem Context & 2027 Market Trigger

Regulated Windows estates (banks, healthcare, legal, and public sector running Windows Server 2025 or Windows 11 Enterprise) face an intractable runtime trilemma when hosting autonomous AI agents, ADPA/SIDPA document pipelines, or PII processing workloads:
- **Always-on VMs** deliver instant responsiveness but burn 24/7 CPU, RAM, and Windows licensing costs while accumulating session state drift.
- **Cold-stopped VMs** cut idle compute cost but suffer 14–45 second boot latencies that break webhook timeouts and interactive UX.
- **Shared-kernel containers** start quickly but expose kernel-level blast radius unsuitable for untrusted tool execution or strict regulatory isolation.

In 2027, **EU AI Act Annex III** controls (Dec 2027), **DORA/NIS2** containment expectations, FinOps scrutiny on idle Windows Server estates, and surging agentic code/tool execution force CIOs, CTOs, and CISOs to seek hardware-enforced isolation without always-on cost.

## 2. Solution Architecture & Delivery Workflow

Engineering is complete in the graduated Track B repository (`mdresch/mxc`, Stage 18, `PMP-BL-v4.0.0`). `OP-ITG-017` packages that production-tested Type-1 Hyper-V subsystem into a two-tier commercial advisory flow ([Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md)):

| Phase | Timing | Core Activities | Concrete Client Deliverables |
| :--- | :--- | :--- | :--- |
| **Tier 1: Benchmark Sprint** | Weeks 1–3 | Run [Runtime-Containment-Assessment-Questionnaire.md](Runtime-Containment-Assessment-Questionnaire.md), validate Hyper-V/NVMe/RAM prerequisites, execute `benchmark_jit_wake.py` (lab or client host), and present [Executive-Readout-Template.md](Executive-Readout-Template.md). | P0 Trilemma Baseline, AC-01.1 Benchmark Report & Tier 2 Proposal |
| **Tier 2: Reference Implementation** | Weeks 4–10 | Deploy golden registry, JIT ingress gateway, warm-pool watermark autoscaler, `.avhdx` sterile reset validation, and operator runbook handover. | Production Reference Implementation, Sterility Proof & Ops Runbooks |

### Core Graduated Technical Capabilities (`mdresch/mxc`)

- **Sub-Second Wake & Zero Idle Burn:** Achieves **<500ms VM image start** (**≤300ms** unpause platform overhead, **≤800ms TTFB** under AC-01.1) and **0.0% idle CPU** via paused golden pools and a JIT connection-buffering ingress gateway.
- **Sterile `.avhdx` Session Hygiene:** Resets differencing disks cleanly back to immutable golden checkpoints after every agent/document run, preventing lateral persistence.
- **Identity-Bound Leasing (ADR-008) & Autoscaling:** Enforces watermark warm-pool scaling and identity-bound VM leases suited to sovereign Windows Server 2025 / Win11 Enterprise estates.

## 3. Market Comparables & CBa Consult Differentiation

| Alternative | Typical Model & Pricing | Key Limitations | CBa Consult `$0`-Capital Differentiation |
| :--- | :--- | :--- | :--- |
| **Cloud MicroVM SaaS (E2B, Modal, Fly Machines)** | Linux-only cloud SaaS billing per vCPU-second + data egress | Requires shipping regulated PII/ADPA data off-premises onto Linux cloud stacks. | Runs sovereignly on client's existing Windows Server 2025 / Win11 Hyper-V hosts with `$0` third-party SaaS lock-in. |
| **Always-On Hyper-V / VDI Pools** | Static VM pools + traditional Citrix/VMware VDI licensing | High idle compute/license waste and persistent session contamination risks. | `0.0%` idle CPU paused golden pools + sterile `.avhdx` checkpoint reset per session. |
| **Docker / Shared-Kernel Windows Containers** | Standard container orchestration | Shared kernel attack surface fails strict CISO containment for untrusted AI agents. | Hardware-enforced Type-1 Hyper-V boundary backed by `mdresch/mxc` ADRs and benchmarks. |

## 4. Internal IP & Source Provenance Crosswalk

| Source Asset | Origin & Location | Extracted Capabilities Reused in `OP-ITG-017` | Reuse Classification |
| :--- | :--- | :--- | :--- |
| `mdresch/mxc` (Stage 18 Track B Repo) | External Graduated Repo ([MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md)) | MXC Hyper-V subsystem (`feat/hyperv-v2-rebased`), ADR-001–008, `benchmark_jit_wake.py`, `demo_win11_agent_sandbox.ps1`. | Core Track B Engineering SSOT |
| Commercial Delivery Pack | Sibling Docs ([Pilot-Charter.md](Pilot-Charter.md), [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md), [Workshop-Agenda.md](Workshop-Agenda.md)) | Assessment questionnaire, Tier 1/Tier 2 pricing cut sheet, SOW shell, 5-act demo checklist, GTM tracker. | Track A Commercial Layer |
| Portfolio Strategic Assets | [inventory-of-ideas.md](../../inventory-of-ideas.md) | Physical/hypervisor containment underpinning `OP-ITG-013`, `OP-ITG-015`, `OP-ITG-016`, and `OP-ITG-018`. | Cross-Portfolio Architecture |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **In Scope:** Runtime containment assessment, host prerequisite validation, AC-01.1 JIT wake benchmarking, golden-image/warm-pool architecture, `.avhdx` sterility verification, and handover runbooks.
- **Explicitly Out of Scope:** MSP L1 operations, 24/7 MSSP SOC monitoring, unbounded legacy VM/image migration, or procuring client Hyper-V hardware/Windows licensing.
- **Client Prerequisites:** Windows Server 2025 or Windows 11 Enterprise Hyper-V host, NVMe storage/RAM headroom for standby pools, and named Hyper-V admin.
- **Upstream OSS Governance:** Pin tested `feat/hyperv-v2-rebased` release baselines ([IP-Readiness-and-MXC-Audit.md](IP-Readiness-and-MXC-Audit.md)); separate advisory scope from upstream `microsoft/mxc` maintenance.
- **Delivery Cadence:** Tier 1 Benchmark Sprint runs 2–3 weeks; optional Tier 2 Reference Implementation spans Weeks 4–10.
- **Target Outcome & Proof (`OP-X-004`):** Demonstrated AC-01.1 benchmark (`≤300ms` unpause / `≤800ms` TTFB), verified sterile `.avhdx` reset, and optional 5-Act demo (`Benchmark-Demo-Checklist.md`).
- **Compounding / Scale Path:** Physical/hypervisor containment substrate underpinning `OP-ITG-013`, `OP-ITG-015`, `OP-ITG-016`, and `OP-ITG-018`.
- **Related Ecosystem:** Cross-linked in [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md), [Workshop-Agenda.md](Workshop-Agenda.md), and [Azure-Scale-Out-and-Boundary-Matrix.md](Azure-Scale-Out-and-Boundary-Matrix.md).
- **Crosswalk Discipline:** All technical implementation specifications remain exclusively in `mdresch/mxc` (`MXC-Repo-Artifact-Crosswalk.md`); commercial documents reference rather than duplicate engineering artifacts.
- **Lifecycle & Gate Status:** `Status = Idea` | `Active Pilots = 0`. Engineering is complete in `mdresch/mxc` (Stage 18); commercial promotion from `Idea` → `Pilot` awaits lab/client AC-01.1 benchmark logging, Wave 1 discovery (`HYP-2027-020`–`022`), and `G4` Director sign-off.
