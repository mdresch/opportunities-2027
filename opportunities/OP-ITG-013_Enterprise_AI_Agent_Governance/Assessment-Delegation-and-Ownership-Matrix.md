# Assessment delegation & ownership — `OP-ITG-013`

**Audience:** CEO, CFO, CIO, CISO, CAIO — and the specialists they delegate to.  
**Instrument:** [Agent-Governance-Assessment-Questionnaire.md](Agent-Governance-Assessment-Questionnaire.md) (40 questions + P0 triage).  
**Machine-readable roster:** [data/agent-governance-question-ownership.json](data/agent-governance-question-ownership.json) (import into client portal).  
**Portal behavior:** [Portal-Delegation-Dashboard-Spec.md](Portal-Delegation-Dashboard-Spec.md).

---

## Why executives do not answer all 40 questions themselves

Most controls require **tenant exports, IAM policy extracts, SoD matrices, SIEM samples, or FinOps reports** that live with IT, security, finance, or operations. Executives remain **accountable (A)** for their domain; they **delegate (R)** evidence collection to named professionals and **approve** scores before submission.

| Role in this assessment | Meaning |
| --- | --- |
| **Accountable executive** | One of CEO, CFO, CIO, CISO, or CAIO — signs off that answers in their lane are accurate enough for a board or audit conversation. |
| **Owner function** | Department that normally holds the evidence (11 function codes — see §2). |
| **Delegate** | Named employee (email in portal) who completes the question, attaches evidence notes, and marks status. |
| **Consulted** | Other functions that must confirm before the executive accepts a score. |

---

## 1. Three-step flow for any executive sponsor

```text
1. Sponsor creates assessment workspace (org name, tier: Tier 1 screen vs Tier 2 full).
2. Sponsor assigns **function leads** (e.g. IAM lead, Controller, SOC manager) — portal auto-routes questions.
3. Sponsor reviews dashboard → releases package to CBa for briefing / Tier 2 proposal.
```

**Time for a sponsor (guided):** ~20 minutes to invite leads; **1× 30 min** review when delegates mark ≥80% complete.

---

## 2. Function codes (assign one lead per code)

| Code | Function | Typical delegate titles |
| --- | --- | --- |
| **ITG** | IT, cloud, M365, integration | M365 Admin, Cloud Architect, Application Owner |
| **SEC** | Cybersecurity & GRC | Security Architect, GRC Analyst |
| **IAM** | Identity & access | Entra Admin, PAM Owner, IAM Manager |
| **ENG** | AI, automation, engineering | Copilot/Power Admin, ML Ops, DevSecOps |
| **FIN** | Finance & control | Controller, FinOps, ERP SoD admin |
| **AUD** | Internal audit / SOX ITGC | SOX ITGC Lead, IT Audit |
| **LEG** | Legal & privacy | DPO, Privacy Counsel |
| **RSK** | Risk & compliance programs | EU AI Act lead, Compliance Manager |
| **HR** | Workforce systems | HRIS Manager, JML process owner |
| **OPS** | Business & process owners | Business sponsor, process owner |
| **SOC** | Security operations & logging | SIEM Admin, SOC Manager, IR Lead |

---

## 3. Default accountable executive by pillar (delegation map)

Use this when the sponsor is unsure whom to nudge first.

| Pillar | Accountable executive (default) | Delegate primarily to |
| --- | --- | --- |
| **1 — Inventory** | **CIO** (1.1, 1.4) · **CISO** (1.2, 1.3, 1.5) | ITG, SEC, IAM, ENG |
| **2 — Accountability** | **CAIO** (2.1, 2.3) · **CIO** (2.2) · **CEO** (2.4) · **CISO** (2.5) | OPS, HR, RSK, SOC |
| **3 — Identity / NHI** | **CISO** | IAM (+ ENG for implementation detail) |
| **4 — SoD & permissions** | **CISO** (4.1, 4.3, 4.4) · **CFO** (4.2, 4.5) | IAM, FIN, ENG, AUD |
| **5 — Lifecycle** | **CIO** · **CAIO** (5.5) | ENG, ITG |
| **6 — Observability** | **CISO** | SOC, AUD (6.5 drill) |
| **7 — FinOps** | **CFO** | FIN, ENG (routing), OPS (7.3 value) |
| **8 — Regulatory** | **CISO** (8.1–8.3, 8.5) · **CEO** (8.4 Annex III program) | LEG, RSK, SEC |

**Smallest viable Tier 1 delegation (6 invites):** IAM lead, M365/Power admin, SOC/SIEM owner, Controller or FinOps, DPO or privacy counsel, one business agent sponsor (OPS).

---

## 4. Per-question routing table (all 40)

**A** = accountable executive · **F** = owner function · **Delegates** = typical job titles to assign in portal.

### Pillar 1 — Inventory & discovery

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 1.1 | CIO | ITG | M365 Admin, Power Platform Admin, Enterprise Architect |
| 1.2 | CISO | SEC | Defender/CASB owner, Cloud security engineer |
| 1.3 | CISO | RSK | GRC / AI risk analyst |
| 1.4 | CIO | ITG | SaaS/vendor application owner |
| 1.5 | CISO | IAM | Entra admin, credential hygiene owner |

### Pillar 2 — Owners & accountability

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 2.1 | CAIO | OPS | Business sponsor per production agent |
| 2.2 | CIO | HR | HRIS / joiners-movers-leavers owner |
| 2.3 | CAIO | RSK | AI governance / decision authority matrix owner |
| 2.4 | CEO | RSK | Risk committee / ARB secretary |
| 2.5 | CISO | SOC | SOC manager, on-call runbook owner |

### Pillar 3 — Identity (NHI)

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 3.1–3.4 | CISO | IAM | Entra / workload identity team |
| 3.5 | CISO | SOC | Incident response + IAM on-call |

### Pillar 4 — SoD & permissions

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 4.1 | CISO | IAM | API / OAuth scope reviewer |
| 4.2 | CFO | FIN | ERP SoD administrator, controller |
| 4.3 | CISO | ENG | MCP / integration gateway owner |
| 4.4 | CISO | ENG | Sandbox / isolation architect |
| 4.5 | CFO | AUD | SOX ITGC / access review coordinator |

### Pillar 5 — Lifecycle

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 5.1, 5.2, 5.5 | CIO / CAIO | ENG | Release manager, DevOps, MLOps |
| 5.3, 5.4 | CIO | ITG | Power Platform CoE, records/archival |

### Pillar 6 — Observability

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 6.1–6.4 | CISO | SOC | SIEM / Agent 365 logging owner |
| 6.5 | CISO | AUD | Internal audit + evidence retrieval drill |

### Pillar 7 — FinOps

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 7.1, 7.2, 7.5 | CFO | FIN | FinOps, controller |
| 7.3 | CFO | OPS | Business owner for ROI narrative |
| 7.4 | CFO | ENG | Model routing / platform owner |

### Pillar 8 — Regulatory

| Q | A | F | Delegate to |
| --- | --- | --- | --- |
| 8.1 | CISO | SEC | Purview / DLP administrator |
| 8.2, 8.3, 8.5 | CISO | LEG | DPO, vendor legal, records management |
| 8.4 | CEO | RSK | EU AI Act / compliance program lead |

---

## 5. P0 red flags — who must respond first

| P0 # | Topic | Executive ping | Delegate first |
| --- | --- | --- | --- |
| 1 | Human credentials / static keys | CISO | IAM |
| 2 | ERP write without SoD | CFO | FIN / ERP |
| 3 | No human sponsor | CAIO | OPS + HR |
| 4 | No FinOps ceiling | CFO | FIN |
| 5 | Unlabeled data grounding | CISO | SEC / Purview |
| 6 | Unvetted MCP / external API | CISO | ENG |
| 7 | No centralized logging | CISO | SOC |
| 8 | No kill switch | CISO | SOC + IAM |
| 9 | No Annex III / Art. 22 assessment | CEO | RSK + LEG |
| 10 | No version control on prod prompts | CIO | ENG |

Portal should show **P0 assignment** before pillar deep-dives.

---

## 6. Client-facing email snippet (sponsor → delegate)

> Subject: Agent governance assessment — your questions ([function], ~[n] items)  
>  
> We are running a short agent governance maturity check before our CBa briefing.  
> Please open the link, complete **only the questions assigned to you** (about [n] minutes), and upload or describe where evidence lives (export name, ticket #).  
> You do not need to score policy intent — mark **Unknown** if evidence is missing; we will triage.  
> Deadline: [date].  
>  
> Questions? Reply to [sponsor]. Technical access issues: [IT contact].

---

## 7. Workshop alignment

In facilitated Tier 1/Tier 2 workshops, use [Workshop-Agenda.md](Workshop-Agenda.md) sessions **by function** (IAM week, FinOps week) so delegates attend only relevant deep dives; executives join kickoff + readout only.