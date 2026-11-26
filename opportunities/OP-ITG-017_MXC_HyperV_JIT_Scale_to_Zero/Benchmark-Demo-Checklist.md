# Benchmark & live demo checklist — `OP-ITG-017`

**SSOT scripts:** [`mdresch/mxc`](https://github.com/mdresch/mxc) — paths in [MXC-Repo-Artifact-Crosswalk.md](MXC-Repo-Artifact-Crosswalk.md)

---

## A. Pre-demo (host)

- [ ] Windows Server 2025 or Win11 Enterprise with Hyper-V role  
- [ ] NVMe storage for VHDX; RAM for ≥1 warm-paused instance (~1.1 GB+ working set guidance)  
- [ ] Repo checkout: `git clone https://github.com/mdresch/mxc` (branch per crosswalk)  
- [ ] Python venv / deps for `benchmark_jit_wake.py` (see `docs/hyperv/USER_GUIDE.md`)  
- [ ] Demo script dry-run: `demo_win11_agent_sandbox.ps1` (if 5-Act narrative)  

## B. Benchmark run (Tier 1 minimum)

- [ ] `python scripts/hyperv/dev_harness/benchmark_jit_wake.py` (add `--dry-run` first if unsure)  
- [ ] Capture: wake ms, TTFB ms, AC-01.1 PASS/FAIL line  
- [ ] Store output in **CRM / secure share** — not git with client hostnames  

## C. Executive narrative (10 min)

- [ ] Trilemma slide (always-on / cold boot / containers)  
- [ ] Live numbers vs. AC-01.1 SLA (≤300ms wake / ≤800ms TTFB)  
- [ ] Sterile `.avhdx` story (Epic 005)  
- [ ] Identity lease (ADR-008) — roadmap if not enabled in demo host  

## D. Commercial follow-up

- [ ] Attach [One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md](One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md)  
- [ ] Optional: repo `MXC-Product-One-Pager.pdf`  
- [ ] Tier 2 / bundle (`OP-ITG-013`) pricing from [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md)  

## E. Rollback

If demo fails: show recorded benchmark artifact from lab + contract test count from Project-Status-Register; reschedule on client silicon.