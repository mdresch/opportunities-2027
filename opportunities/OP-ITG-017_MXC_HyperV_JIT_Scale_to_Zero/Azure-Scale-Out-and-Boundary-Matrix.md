---
opportunity_id: "OP-ITG-017"
artifact_type: "CTO & Platform Engineering Architecture Briefing"
lifecycle_stage: "Stage 2–3 (Enterprise Cloud Scale-Out & Architectural Boundaries)"
date: "2026-11-26"
owner: "Menno Drescher (Director, CBa Consult)"
upstream_ssot: "mdresch/mxc (feat/hyperv-v2-rebased · wxc-exec --features hyperv)"
---

# Azure Scale-Out & Boundary Matrix — `OP-ITG-017`: MXC Hyper-V `<500ms` JIT Scale-to-Zero

**Audience:** CTOs, CIOs, CISOs, Cloud Architects & Platform Engineering Directors  
**Core Pattern:** **Two-Tier Cascading Pool** — MXC Hyper-V handles sub-500ms micro-sandbox wake inside each host while **Microsoft Azure VMSS (Flexible Orchestration) + Azure Standby Pools** elastically scale host nodes up to maximum Azure Enterprise Agreement (EA) capacity.

---

## 1. The Two-Tier Cascading Pool Architecture

Azure VM Standby Pools alone cannot meet a `<500ms` SLA (`Hibernated` VMs resume in tens of seconds; `Running` standby VMs incur 100% compute billing and multi-second load-balancer attach). Coupling **MXC** as Tier 1 with **Azure Standby Pools** as Tier 2 resolves both latency and elastic cloud ceiling:

```text
Incoming Request / Agent Task
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  JIT INGRESS GATEWAY (Multi-Host Capacity Router + Auth / ADR-008)      │
│  Holds socket during <300ms unpause; routes to active MXC host pool     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌─────────────────────────────────────┐  ┌────────────────────────────────────────┐
│ TIER 1 · <500ms MICRO-SANDBOX POOL  │  │ TIER 2 · ELASTIC HOST BURST POOL       │
│ Inside each active Azure MXC Host   │  │ Azure VMSS (Flexible) + Standby Pool   │
│ • Nested Type-1 Hyper-V (WS 2025)   │◄─┤ • Pre-baked MXC Host + Golden .vhdx    │
│ • 30+ paused sandboxes (~1.1 GB ea) │  │ • State: Hibernated or Deallocated     │
│ • <300ms unpause · 0.0% idle vCPU   │  │ • Triggered at 65–70% Tier-1 watermark │
│ • .avhdx sterile reset on release   │  │ • Drains & hibernates back to $0 CPU   │
└─────────────────────────────────────┘  └────────────────────────────────────────┘
```

---

## 2. Six-Level Azure Architectural Scale-Out Matrix (`L1`–`L6`)

| Level | Azure Architecture Tier | Supported Azure SKUs & Control Mechanism | Effective MXC Scale & Target Use Case |
| :---: | :--- | :--- | :--- |
| **L1** | **Single-Node Pilot** | Single Gen-2 Nested Hyper-V VM: `Dv5/Dsv5/Ddsv5`, `Ev5/Esv5/Edsv5`, v6 (`Dsv6/Esv6/Dasv6/Easv6`), `Fsv2/Fasv6/FX` *(A/B-series unsupported)* | **15–60 `<500ms` sandboxes** on 1 host · Phase 0 live `<300ms` wake demo & TCO baseline |
| **L2** | **Elastic Scale Cell** | **VMSS (Flexible Orchestration) + Azure Standby Pool** (`Hibernated` or `Deallocated`; single region/subscription; `Fault Domain = 1`; **1,000 combined host VM cap**) | **~30,000+ concurrent `<500ms` sandboxes** per cell (at ~30+ micro-sandboxes per host) · Primary mid-market & enterprise production pattern |
| **L3** | **Ultra-Dense Memory Host** | Nested Hyper-V on **Azure M-Series** (up to **128 vCPUs & ~4 TiB RAM** per node, e.g. `Standard_M128ms` + Windows Server 2025 exceeding >64 vCPU guest OS support) | **Hundreds to 1,500+ RAM-paused sandboxes** (`~1.1 GB` trimmed working set) on a single host · Massive burst pools with minimal inter-host networking |
| **L4** | **Physical Single-Tenant Isolation** | **Azure Dedicated Hosts** (physical servers matched to D/E/F/M host SKUs; host-group scaling; Azure Hybrid Benefit aligned) | Strict **DORA / NIS2 / banking** physical single-tenant isolation *(scaled via Dedicated Host groups rather than per-VM Standby Pools)* |
| **L5** | **Multi-Cell / Multi-Region Global Fabric** | Sharded **VMSS + Standby Pool cells** across Availability Zones, Subscriptions & EEA Regions behind Azure Front Door / global JIT Ingress | **Maximum Azure EA vCPU & region quota** (100,000+ concurrent `<500ms` sandboxes with strict EU/EEA data residency) |
| **L6** | **Sovereign Hybrid Bare-Metal** | **Azure Local (Azure Stack HCI) + Azure Arc** — native bare-metal Type-1 Hyper-V managed from Azure with zero nesting overhead | Zero-egress / sovereign environments pairing directly with **`OP-ITG-015` (Cryptographic Sovereignty)** |

---

## 3. Two Hard Azure Platform Boundaries (Honest Technical Scope)

To maintain architectural honesty in CTO and CISO briefings, two Azure compute families **do not** support nested Hyper-V today:

| Azure Offering | Hard Technical Boundary | Recommended CBa Consult Architecture Pattern |
| :--- | :--- | :--- |
| **Azure Confidential VMs** (`DC` / `EC`-series — AMD SEV-SNP / Intel TDX) | **Nested virtualization is not supported** inside Azure Confidential VMs (legacy `DCas_cc_v5` nested preview retired). | When hardware memory encryption against the cloud provider is non-negotiable, deploy workloads directly as native Confidential VMs using Azure Standby Pools (accepting multi-second resume instead of `<500ms` nested MXC) or move to **L6 Azure Local** bare-metal. |
| **Azure GPU VMs** (`NC` / `NV` / `ND`-series) | **Direct GPU passthrough / vGPU is not supported** inside nested Hyper-V guests. | Run untrusted AI agent code/tool execution inside **L2/L3 `<500ms` MXC CPU sandboxes** while invoking dedicated Azure GPU or **Azure AI Foundry** inference endpoints over private VNet / Private Link boundaries. |

---

## 4. Engineering & FinOps Checklist for Azure Production Rollout

1. **Standby Pool Constraints Verified:** Use **VMSS Flexible Orchestration** (Uniform is unsupported), `faultDomainCount = 1`, same region/subscription, 1 standby pool per scale set, and stay within the **1,000 combined VM cap** per cell before sharding to **L5**.
2. **Hibernation vs. Local NVMe Storage Trade-Off:** Enabling Azure VM `hibernationEnabled = true` requires an OS disk large enough to hold the full host RAM dump and has SKU-specific restrictions. When selecting `Ddsv5`/`Edsv5`/`Ddsv6` for high-IOPS local NVMe `.avhdx` differencing disks, benchmark **`Hibernated`** vs. **`Deallocated` Standby Pool** (with pre-baked Golden `.vhdx` on managed OS/data disk) since Tier-2 host expansion runs proactively ahead of the `<500ms` request path.
3. **Control-Plane Integration (`ADR-009` Candidate for `mdresch/mxc`):**
   - Extend `wxc-exec` watermark telemetry to emit scale-out/scale-in metrics to **Azure Monitor / VMSS Autoscale** at `65–70%` aggregate warm-pool utilization.
   - Add **graceful host drain** (`pool-drain`) before Azure deallocates or hibernates an idle host so active `.avhdx` sessions complete and incinerate cleanly without dropped connections.
4. **Windows Server Licensing & FinOps:** Windows Server / Azure Hybrid Benefit applies per *running* Azure host VM. Total cost savings derive from (a) **3×–5× workload density** via MXC's `0.0%` idle vCPU micro-sandboxes and (b) hibernating/deallocating surplus Azure hosts via Standby Pools during off-peak hours.
