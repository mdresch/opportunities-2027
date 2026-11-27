# Executive readout template — `OP-ITG-013`

**Meeting:** Agent Sprawl, Identity & FinOps Briefing (Tier 1) or Full Assessment Readout (Tier 2)  
**Duration:** 45 min (Tier 1) · 60 min (Tier 2)  
**Audience:** CIO, CISO, CAIO, Internal Audit liaison (optional)

---

## Slide / section outline

### 1. Context (5 min)

- **Why now:** Gartner agentic cancellation risk; EU AI Act Annex III (Dec 2027); SOX/ITGC agent questions  
- **Scope boundary:** Assessment & blueprint — client IT/MSP implements; no certification opinion  
- **Engagement type:** Tier 1 Triage *or* Tier 2 Full Assessment

### 2. Current exposure summary (10 min)

| Metric | Value |
| --- | --- |
| Agents inventoried (known) | {n} |
| **P0 red flags** (Top-10 checklist) | {n} critical |
| Shadow / undocumented agents | {n} or TBD |
| Shared human credentials for agents | Y/N |
| Uncapped FinOps loops | Y/N |
| Central audit logging | Y/N |

*Source: portal self-assessment + evidence workshops.*

### 3. P0 register (top 5 on screen) (10 min)

| # | P0 theme | Business impact | Owner (client) | Target fix (30d) |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| … | | | | |

*Full list: Top-10 from [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) §4.*

### 4. Maturity snapshot (Tier 2 only) (10 min)

| Pillar | Score (1–5) | Audit-critical weight |
| --- | --- | --- |
| 1 Inventory | | 1.25× |
| 2 Accountability | | 1.0× |
| 3 Identity | | 1.25× |
| 4 SoD | | 1.25× |
| 5 Lifecycle | | 1.0× |
| 6 Observability | | 1.25× |
| 7 FinOps | | 1.0× |
| 8 Regulatory | | 1.0× |

**Weighted Agent Governance Index:** {x.x}  
**Interpretation:** &lt;2.5 Ad Hoc · 2.5–3.2 Emerging · 3.3–4.0 Defined/Managed · &gt;4.0 Optimized

### 5. Target architecture (10 min)

- **Human sponsors** + Mover/Leaver  
- **Entra Agent ID / NHI** pattern (no shared accounts)  
- **SoD** on write paths  
- **Agent 365 / SIEM** logging minimum fields  
- **FinOps** monthly ceilings per agent ID  

*One architecture slide — reference `ICT-Governance-Framework-Application` controls as applicable.*

### 6. 90-day roadmap (10 min)

| Phase | Days | Actions | Success metric |
| --- | --- | --- | --- |
| **Stabilize** | 0–30 | Kill P0s (credentials, caps, logging) | P0 count → 0 |
| **Structure** | 31–60 | Inventory + sponsors + IAM blueprint | 100% prod agents in register |
| **Assure** | 61–90 | Access reviews + audit drill | Mock retrieval &lt; 48h |

### 7. Commercial next step (5 min)

| Option | Investment | When |
| --- | --- | --- |
| Tier 2 full assessment (if Tier 1 only) | €6,000–€18,000+ | Start within 30 days |
| **OP-ITG-018 MIP** retainer | €2,500–€12,000+/mo | After Tier 2 or if P0 ≥ 3 |
| Client self-execute | €0 CBa | Risks: timeline, audit repeat findings |

### 8. Decisions requested

- [ ] Executive sponsor named for agent governance workstream  
- [ ] IAM/M365 owner assigned for evidence sprints  
- [ ] Go / no-go on Tier 2 or MIP proposal by {date}  
- [ ] Permission to sanitize outcome as anonymized case study (`OP-X-004`)

---

## Appendix (leave-behind)

- Agent Inventory Register (excerpt)  
- P0 register (full)  
- Link to portal for extended teams (optional)  
- [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx)