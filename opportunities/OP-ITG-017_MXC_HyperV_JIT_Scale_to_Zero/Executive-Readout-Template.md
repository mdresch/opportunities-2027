# Executive readout — `OP-ITG-017` (Tier 1 / Tier 2)

**Duration:** 45 min (Tier 1 benchmark) · 60 min (Tier 2 handover)

## 1. Trilemma & trigger (5 min)

Always-on cost vs cold boot vs container blast radius — tie to EU AI Act / DORA where relevant.

## 2. Evidence (15 min)

| Metric | Target | Measured |
| --- | --- | --- |
| Unpause / wake | ≤300ms platform | |
| TTFB (AC-01.1) | ≤800ms | |
| Idle CPU at scale-to-zero | ~0% | |
| Sterile reset | Checkpoint restore | Y/N |

Source: benchmark output + questionnaire P0.

## 3. Architecture snapshot (15 min)

- Golden image & `.avhdx`  
- JIT ingress gateway  
- Pool tiers (hot/warm/cold as applicable)  
- Identity-bound lease (ADR-008)  

Diagram: cite `mxc` ARCHITECTURE / USER_GUIDE — do not redraw from memory.

## 4. TCO & FinOps (10 min)

Idle VM hours eliminated vs warm pool RAM cost; license narrative (client validates).

## 5. Next steps (5 min)

| Option | Band |
| --- | --- |
| Tier 2 reference impl | €6k–€15k+ |
| Bundle `OP-ITG-013` agent governance | Add-on |
| MIP pool governance | `OP-ITG-018` |

**Ask:** Sponsor + host access + Tier 2 LOA within 14 days.