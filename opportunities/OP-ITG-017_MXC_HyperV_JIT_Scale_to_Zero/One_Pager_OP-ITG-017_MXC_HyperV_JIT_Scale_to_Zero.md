# Client Service One-Pager: MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes (`OP-ITG-017`)

**For:** CIOs, CTOs, CISOs, CFOs & Platform Engineering Directors (Mid-Market & Regulated Enterprises)   |   **Provider:** Menno Drescher, CBa Consult

---

## Bank-Grade Hardware Isolation at Scale-to-Zero Economics — Waking in Under 500 Milliseconds

Regulated enterprises running mission-critical automation, financial/PII processing, or autonomous AI agents have been trapped in an expensive **Infrastructure Trilemma**:

1. **Always-On Virtual Machines (High Cost):** Paying 24/7 for idle Windows Server CPU, memory, and software licenses during nights, weekends, and quiet intervals.
2. **Cold-Start Shutdowns (Broken UX):** Turning VMs off saves money, but a 14–45 second Windows Server boot breaks webhooks, fails automated pipelines, and leaves users watching a spinner.
3. **Shared-Kernel Containers (Compliance Risk):** Containers start fast, but sharing the host OS kernel fails strict zero-trust, DORA, NIS2, and multi-tenant isolation standards for sensitive data or untrusted AI-agent tool execution.

**`OP-ITG-017` eliminates that tradeoff.** Backed by our production-engineered **MXC Hyper-V Subsystem & JIT Scale-to-Zero Engine** on Windows Server 2025 / Windows 11 Enterprise, dormant VMs sleep at **0.0% idle CPU**, wake on demand in **<500ms** (**<300ms** unpause-to-available; **<800ms** TTFB per **AC-01.1**), and self-cleanse after every session.

**Engineering reference:** Implementation and automated acceptance tests live in [`github.com/mdresch/mxc`](https://github.com/mdresch/mxc) (portfolio index: [MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md) — internal / technical due diligence).

---

## How the Architecture Works

- **Preserved Sleep (`0.0%` Idle CPU):** Production Windows Server 2025 Golden Images stay pre-trimmed (~1.1 GB working set) and suspended in host RAM — virtual CPU scheduling drops strictly to zero when idle.
- **Sub-Second Wake-on-Demand (`<300ms` Unpause):** A connection-buffering **JIT Ingress Gateway** holds the incoming HTTPS/API request, calls our Rust control plane (`wxc-exec --features hyperv`) to resume a standby VM, verifies guest health, and forwards the payload with zero dropped sockets. Username/password and MFA sign-ins ride the same wake so users never wait on a boot.
- **Sterile Session Reset (`.avhdx` Differencing Disks):** Every workload or AI agent runs on an ephemeral differencing disk. On idle timeout or session release, the delta disk is discarded and the VM snaps back to an immutable, approved baseline checkpoint — eliminating state drift and malware persistence.
- **Elastic Warm-Pool Replenishment & Identity-Bound Leasing:** Adaptive watermark autoscaling proactively replenishes paused standby pools during traffic surges, while identity-bound leasing (**ADR-008**) pairs each isolated guest cleanly to a verified user or Entra AI Agent identity.

---

## Measurable Outcomes vs. Legacy Options

| Dimension | Traditional Always-On VMs | Shared-Kernel Containers | **MXC Hyper-V JIT Scale-to-Zero** |
| --- | --- | --- | --- |
| **Idle Compute Cost** | 100% bill 24/7 | Medium (idle overhead) | **0.0% Idle CPU (Scale-to-Zero)** |
| **Cold-Start Latency** | 14 – 45 seconds | 1 – 3 seconds | **<500ms SLA (<300ms wake / <800ms TTFB)** |
| **Host Workload Density** | 5 – 8 apps / host | 20+ apps (shared kernel) | **30+ isolated apps / host (3×–5× density)** |
| **Security Boundary** | Hardware-grade | Shared OS kernel | **Type-1 Hypervisor Hardware Isolation** |
| **Malware / State Drift** | Persists over time | Risk across restarts | **Incinerated on Session Close (`.avhdx` reset)** |

---

## Elastic Cloud Scale-Out on Microsoft Azure (6-Level Ladder)

For enterprises scaling beyond single-host clusters, MXC pairs as a **Two-Tier Cascading Pool** with **Microsoft Azure VMSS (Flexible) + Azure Standby Pools** (full technical specification: [Azure-Scale-Out-and-Boundary-Matrix.md](Azure-Scale-Out-and-Boundary-Matrix.md)):

- **L1–L3 (Single Node → Elastic Cell → M-Series Density):** Run nested Type-1 Hyper-V hosts on `Dv5`/`Ev5`/`v6` or `M-series` (up to 128 vCPUs / ~4 TiB RAM). Linking MXC's watermark autoscaler to an Azure Standby Pool (`Hibernated`/`Deallocated`, up to **1,000 host VMs** per scale set) delivers **~30,000+ concurrent `<500ms` sandboxes per cell** while draining idle hosts back to zero compute billing.
- **L4–L6 (Dedicated Hosts → Multi-Region Global → Sovereign Bare-Metal):** Scale up to **Azure Dedicated Hosts** (single-tenant DORA/NIS2 isolation), sharded multi-region cells up to your **maximum Azure EA vCPU quota**, or **Azure Local (Azure Stack HCI)** for zero-egress bare-metal sovereignty.
- **Transparent Cloud Boundaries:** Azure Confidential VMs (`DC`/`EC`) and GPU VMs (`NC`/`NV`/`ND`) do not support nested Hyper-V; GPU-heavy AI workloads pair `<500ms` MXC CPU agent sandboxes with private-VNet Azure AI Foundry / GPU inference endpoints.

---

## Engagement Roadmap (6–10 Weeks, Fixed Scope)

| Phase | Timeline | What We Deliver |
| --- | --- | --- |
| **1. Observe & Benchmark** | Weeks 1–2 | Workload profile & TCO audit (idle burn, cold-start pain, compliance boundaries) + live wake benchmark on **your** Windows Server 2025 / Win11 Hyper-V host (`benchmark_jit_wake.py`, **AC-01.1**). |
| **2. Architect & Govern** | Weeks 3–4 | Target **Golden Image Registry**, NVMe/RAM standby-pool sizing, **ADR-008** identity-bound leasing design, and DORA/NIS2/EU AI Act isolation mapping. |
| **3. Reference Implementation** | Weeks 5–8 | Deploy JIT Ingress Gateway, golden VHDX workflow, sterile `.avhdx` reaper, and watermark pool autoscaling for 1–2 priority workloads. |
| **4. Certify & Handover** | Weeks 9–10 | Acceptance verification, operator runbooks, and CFO FinOps ROI scorecard. |

*Optional **2–3 week Phase 0** covers Phase 1 only — see pricing below.*

---

## Investment & Entry Options

| Tier | Duration | Investment | Outcome |
| --- | --- | --- | --- |
| **Phase 0 — Live Benchmark & Feasibility** | 2–3 weeks | **€2,000–€4,500** | TCO baseline + live wake demo on target workload |
| **Full Reference Implementation** | 6–10 weeks | **€6,000–€15,000+** | Golden image, gateway, pool, handover |
| **Combined agent + runtime wedge** | 4–5 weeks (parallel) | **€4,500–€8,500** bundle | `OP-ITG-013` (governance) + `OP-ITG-017` Phase 0 — see [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md) |

**Natural follow-ons:** `OP-ITG-013` (Agent Governance) · `OP-ITG-015` (Cryptographic Sovereignty) · `OP-ITG-016` (Agent Operating Architecture) · `OP-ITG-018` (Managed Intelligence Provider retainer).

**Scope boundary:** CBa delivers assessment, architecture, guided reference deployment, and runbooks; your IT/MSP owns production host operations and licensing. Not a 24/7 managed SOC.

---

## Next Step

Book a **30-minute Live Hyper-V Wake Demo & Infrastructure TCO Review** with **Menno Drescher (CBa Consult)**.

**Internal CBa pack (not for client attachment):** [Pilot-Charter.md](Pilot-Charter.md) · [Benchmark-Demo-Checklist.md](Benchmark-Demo-Checklist.md) · [Runtime-Containment-Assessment-Questionnaire.md](Runtime-Containment-Assessment-Questionnaire.md)