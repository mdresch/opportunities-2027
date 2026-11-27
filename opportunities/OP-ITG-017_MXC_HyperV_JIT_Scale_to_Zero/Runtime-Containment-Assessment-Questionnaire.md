---
opportunity_id: "OP-ITG-017"
artifact_type: "Runtime Containment & JIT Readiness Questionnaire"
date: "2026-11-26"
---

# Runtime containment assessment — `OP-ITG-017` (20 controls)

Score **1–5** (1 = ad hoc Windows VMs/containers · 5 = MXC-class JIT pools with sterile reset & identity lease).

| Score | Level |
| ---: | --- |
| 1 | Always-on or cold-boot pain accepted |
| 2 | Containers for some workloads; Windows gap |
| 3 | Hyper-V golden images; manual reset |
| 4 | Paused pools + gateway; partial automation |
| 5 | Sub-second wake, `.avhdx` sterility, ADR-008-style leasing |

---

## Pillar 1 — Infrastructure trilemma & FinOps *(1.25×)*

| # | Control | Evidence |
| --- | --- | --- |
| 1.1 | Idle Windows Server / VDI cost quantified (monthly)? | CFO/FinOps export |
| 1.2 | Cold-start latency breaks automations or webhooks? | Incident examples |
| 1.3 | Target idle CPU policy for non-prod Windows defined? | Policy doc |

## Pillar 2 — Hyper-V & host readiness

| # | Control | Evidence |
| --- | --- | --- |
| 2.1 | Windows Server 2025 / Win11 Enterprise Hyper-V available? | Host inventory |
| 2.2 | NVMe tier for golden VHDX / checkpoints? | Storage spec |
| 2.3 | RAM headroom for warm-paused pools sized? | Capacity model |

## Pillar 3 — Isolation & agent containment *(1.25×)*

| # | Control | Evidence |
| --- | --- | --- |
| 3.1 | Untrusted agent/tool code runs only in hardware VM today? | Architecture diagram |
| 3.2 | Shared-kernel containers blocked for regulated workloads? | CISO standard |
| 3.3 | Session state reset guaranteed after agent run? | Runbook / none |

## Pillar 4 — JIT gateway & benchmarks

| # | Control | Evidence |
| --- | --- | --- |
| 4.1 | Ingress buffers requests during VM wake (no 502 storm)? | Arch / pain |
| 4.2 | Measured TTFB on representative workload? | APM logs |
| 4.3 | Acceptance criteria for wake SLA documented? | NFR / none |

## Pillar 5 — Golden image & sterility

| # | Control | Evidence |
| --- | --- | --- |
| 5.1 | Immutable golden checkpoint for automation workloads? | Image registry |
| 5.2 | Differencing disk discarded per session? | Hygiene process |
| 5.3 | Supply-chain signing / attestation for images? | ADR-012 alignment |

## Pillar 6 — Identity & lease (ADR-008)

| # | Control | Evidence |
| --- | --- | --- |
| 6.1 | VM/session bound to human MFA or agent identity? | Design / gap |
| 6.2 | Entra Agent ID considered for automation leases? | Roadmap |

## Pillar 7 — Compliance mapping

| # | Control | Evidence |
| --- | --- | --- |
| 7.1 | DORA/NIS2 isolation narrative for critical workloads? | Risk register |
| 7.2 | EU AI Act containment for high-risk automation? | AI program |

---

## Top-10 P0 runtime red flags

1. Agents execute with **tenant-wide** credentials on shared hosts.  
2. **No sterile reset** after untrusted tool runs.  
3. **14s+ cold boots** on user-facing automation paths.  
4. **24/7 Windows VMs** with &lt;5% utilization and no decommission plan.  
5. Confidential code sent to **US SaaS sandboxes**.  
6. Hyper-V available but **no golden image discipline**.  
7. Docker used for **Windows-native** workloads unsuitable for containers.  
8. No **benchmark harness** for wake/latency regressions.  
9. Gateway drops connections on pause/resume.  
10. CISO **blocked** agent rollout with no alternative isolation path.

---

## Weighted index (Tier 2)

Pillars **1** and **3** weighted **1.25×**. Bands: &lt;2.5 Exposed · 2.5–3.2 Transitioning · 3.3–4.0 Engineered · &gt;4.0 MXC-aligned.