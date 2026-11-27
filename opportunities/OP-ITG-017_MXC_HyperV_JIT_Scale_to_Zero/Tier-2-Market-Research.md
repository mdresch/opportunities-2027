---
opportunity_id: "OP-ITG-017"
lifecycle_stage: "Stage 1b (Tier 2 Market Research)"
date: "2026-11-26"
owner: "Menno Drescher (Director, CBa Consult)"
track_b_repo: "https://github.com/mdresch/mxc"
---

# Tier 2 Market Research — `OP-ITG-017`: MXC Hyper-V JIT Scale-to-Zero

**Portfolio position:** Tier B (Track B build **complete** in repo; commercial **`Idea`** in portfolio) · Wave 3 Q2–Q4 2027 · Strategic assets **Digital Labor** + **Sovereign Information**

---

## 1. Problem: the infrastructure trilemma

Regulated Windows estates cannot choose cleanly between:

| Option | Benefit | Cost |
| --- | --- | --- |
| Always-on VMs | Instant response | 24/7 CPU/RAM/license burn |
| Cold-stopped VMs | Lower idle cost | 14–45s boot breaks webhooks & UX |
| Shared-kernel containers | Fast start | Kernel blast radius; weak for untrusted agents & PII |

**2027 triggers:** EU AI Act Annex III (Dec 2027), DORA/NIS2 isolation expectations, agentic workloads executing tools/code, FinOps pressure on idle Windows Server.

---

## 2. Solution position (MXC)

**MXC** on Type-1 Hyper-V: paused golden images at **0.0% idle CPU**, **≤300ms** unpause platform overhead, **≤800ms** TTFB (AC-01.1), sterile **`.avhdx`** session reset, identity-bound leasing (ADR-008 / Epic 012).

**Proof status (repo SSOT):** [`mdresch/mxc`](https://github.com/mdresch/mxc) — Program at **Stage 18** / `PMP-BL-v4.0.0`, Phases 1–4 complete, **460/460** Python + Phase 4 Rust tests (see [Project-Status-Register](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/registers/Project-Status-Register.md)). Portfolio rollup may lag; trust repo register for engineering truth.

---

## 3. Competitive landscape

Primary comparison: [MXC-Sales-Battlecard.md](https://github.com/mdresch/mxc/blob/feat/hyperv-v2-rebased/docs/marketing/MXC-Sales-Battlecard.md)

| Alternative | When buyer considers it | MXC wedge |
| --- | --- | --- |
| Docker/Kubernetes on Windows | Dev teams want fast CI | No Win11 GUI fidelity; shared kernel for agents |
| Always-on Hyper-V / VDI | Legacy Windows apps | Idle cost; density |
| Cloud sandboxes (E2B, Modal, Firecracker) | Greenfield Linux agents | Data leaves EU perimeter; no native Windows |
| Big Four architecture | Brand trust | No shipping reference runtime; 6–9 month SI |

**CBa message:** *Reference implementation already exists — advisory scopes benchmark, golden-image design, and pool governance on **your** Hyper-V hosts.*

---

## 4. ICP & segments

1. **Regulated mid-market (250–2,500 seats)** — FS, insurance, legal, health ops on M365 + Windows Server.
2. **Platform engineering / internal AI** — Copilot Studio, custom agents, ADPA/SIDPA-style automation needing **hardware** isolation.
3. **Sovereign / on-prem EU** — cannot use US SaaS sandboxes for source code or PII.
4. **Attach:** Buyers already in `OP-ITG-013` (agents) or `OP-ITG-015` (sovereignty) — MXC is **runtime containment** proof.

---

## 5. Commercial ladder (four steps)

| Step | Offering | Price anchor | Weeks |
| --- | --- | --- | --- |
| **0** | Live benchmark & feasibility | €2,000–€4,500 | 2–3 |
| **1** | Architecture & TCO assessment | €4,000–€8,000 | 3–4 |
| **2** | Reference implementation (1–2 workloads) | €8,000–€15,000+ | 6–10 |
| **3** | Pool governance / MIP (`OP-ITG-018`) | Retainer | Ongoing |

Detail: [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md) · [Delivery-Playbook-and-SOW.md](Delivery-Playbook-and-SOW.md)

---

## 6. Honest IP boundary

| In `mdresch/mxc` (do not re-document here) | In `oppurtunities-2027` (commercial pack) |
| --- | --- |
| ADRs, BRDs, FDDs, user stories, benchmarks, demo scripts | Tier 2 research, pilot charter, questionnaires, GTM |
| `benchmark_jit_wake.py`, `demo_win11_agent_sandbox.ps1` | [Benchmark-Demo-Checklist.md](Benchmark-Demo-Checklist.md) |
| Marketing PDF/battlecard/LinkedIn kit | [MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md) |

**Client boundary:** CBa delivers assessment, architecture, guided PoC, runbooks; client owns Hyper-V licensing, host ops, production SOC.

---

## 7. Stage 2 quantification (`HYP-2027-020`–`022`)

1. **Wake SLA on client silicon** — Achieve AC-01.1 on representative host?  
2. **TCO delta** — Idle VM burn vs. MXC pool economics (CFO narrative).  
3. **CISO sign-off** — Would containment replace blocked agent rollout?  
4. **Phase 0 → reference conversion** within 60 days.  
5. **MIP attach** after reference handover.

---

## 8. Sources

- Repo: `mdresch/mxc` (`feat/hyperv-v2-rebased` unless `main` promoted)
- Marketing: `docs/marketing/*`
- Hyper-V user guide & AC-01: `docs/hyperv/USER_GUIDE.md`
- Portfolio: [inventory-of-ideas.md](../../inventory-of-ideas.md) · [market-analysis-2027.md](../../market-analysis-2027.md)