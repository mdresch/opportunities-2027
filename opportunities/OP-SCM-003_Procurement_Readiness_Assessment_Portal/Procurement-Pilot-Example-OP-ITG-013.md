# Procurement pilot example — buying `OP-ITG-013` via portal lessons

**Until `OP-SCM-003` graduates to PR** (`mdresch/cba-procurement-readiness-portal`), use this playbook: procurement treats the **Agent Governance** assessment as **SKU `CBA-ITG-013-T1`**, implemented today by [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) plus portfolio delegation assets.

---

## 1. Buying scenario (storyboard)

| Actor | Action |
| --- | --- |
| **Client Sponsor** (Procurement / IT category manager) | Initiates “pre-PO readiness” for *Enterprise AI Agent Governance Assessment*; sends workspace link to business |
| **Executive Sponsor** (CIO or CISO) | Accepts accountability; invites IAM, SOC, Finance delegates per matrix |
| **Contributors** | Complete **my queue** only (Tier 1 = 26 areas + P0, not all 40) |
| **CBa Account Manager** | Monitors [GTM-Prospect-Tracker.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/GTM-Prospect-Tracker.md)-style status / charter §2; nudges overdue; prepares proposal |
| **Client Sponsor** | Attaches export to internal requisition → releases PO for Tier 1 (`€2,500–€5,000`) or Tier 2 scope |

---

## 2. Map portal lessons → procurement steps

| PRMAP capability (target) | **Interim with `OP-ITG-013`** |
| --- | --- |
| Catalog pick SKU | Fixed offer: **Agent Governance Tier 1 Triage** — document as `CBA-ITG-013-T1` on PO cover sheet |
| Load questionnaire | [Tier-1-vs-Tier-2-Cut-Sheet.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Tier-1-vs-Tier-2-Cut-Sheet.md) + [Agent-Governance-Assessment-Questionnaire.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Agent-Governance-Assessment-Questionnaire.md) |
| Executive delegation | [Assessment-Delegation-and-Ownership-Matrix.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Assessment-Delegation-and-Ownership-Matrix.md) + [data/agent-governance-question-ownership.json](../OP-ITG-013_Enterprise_AI_Agent_Governance/data/agent-governance-question-ownership.json) |
| Sponsor dashboard | [Portal-Delegation-Dashboard-Spec.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Portal-Delegation-Dashboard-Spec.md) · mock: [Executive-Dashboard-Portal-Mockup.html](../OP-ITG-013_Enterprise_AI_Agent_Governance/Executive-Dashboard-Portal-Mockup.html) |
| Contributor queue | Single-user flow in onboarding portal today → **manual** delegate links/email per function (until multi-user ships) |
| Export for procurement file | Portal `.json` / PDF + [Executive-Readout-Template.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Executive-Readout-Template.md) |
| AM redistribution | Manual: AM edits assignee in tracker; **PRMAP** automates `reassign_contributor` ([portal-rbac](data/portal-rbac-and-workflows.json)) |

---

## 3. Role assignment (procurement lens)

| PRMAP role | Who in an `OP-ITG-013` buy | Notes |
| --- | --- | --- |
| Client Sponsor | Category manager / IT procurement lead | Owns buying file, not technical answers |
| Executive Sponsor | CIO **or** CISO (pick one primary) | Signs lane approvals |
| Function Lead | IAM manager, Controller, SOC lead | Optional bulk invite |
| Contributor | Entra admin, FinOps, DPO delegate, etc. | Per question JSON |
| CBa Account Manager | Named Menno / account owner | Same person as GTM until CRM round-robin |

Default **6-invite Tier 1 pack** (from matrix): IAM · M365/Power · SOC · Finance · Privacy · one business agent sponsor.

---

## 4. Procurement pack contents (attach to requisition)

Checklist for Client Sponsor before PO submission:

- [ ] SKU documented: `CBA-ITG-013-T1` (or `T2` if scoped)  
- [ ] [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](../OP-ITG-013_Enterprise_AI_Agent_Governance/One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx)  
- [ ] Portal **assessment export** (maturity draft + P0 count)  
- [ ] Executive Sponsor sign-off email or portal “release” event  
- [ ] Priced tier from [Pilot-Charter.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Pilot-Charter.md) / cut sheet  
- [ ] CBa proposal / SOW reference  

---

## 5. Lessons to carry into `cba-procurement-readiness-portal`

| Lesson | Detail | PRMAP action |
| --- | --- | --- |
| **L1 Delegation is mandatory** | Executives do not answer 40 questions | JSON ownership per question id (already in portfolio) |
| **L2 Tier modes** | Procurement buys Tier 1 first | `tier: triage` loads subset, not full 40 |
| **L3 P0 first** | Buying committees want red-flag count | Dashboard KPI before pillar depth |
| **L4 Evidence ≠ legal advice** | Procurement needs maturity, not certification | Footer + export disclaimer (Pilot-Charter §3) |
| **L5 AM visibility** | Stalled assessments kill PO timing | AM console + reassignment + audit log |
| **L6 Single SKU pilot proved UX** | Onboarding repo validates contributor flow | Port UI patterns, not fork business logic per SKU |
| **L7 Catalog versioning** | Template drift breaks audits | Pin `template_version` on workspace create |

---

## 6. Communications templates

### Procurement → Executive Sponsor

> We are evaluating **CBa Enterprise AI Agent Governance (Tier 1)**. Before PO release, please complete the linked readiness assessment and delegate IAM/SOC/Finance questions to your team. Export is required for our buying file. SKU: **CBA-ITG-013-T1**.

### Executive → Contributor

> Use the portal link for **your assigned questions only** (~15–30 min). Mark “I don’t know” if evidence is missing; procurement needs an honest baseline, not a polished story.

### CBa AM → Client Sponsor (stalled)

> Workspace is at **{n}%** complete; **{m}** P0 flags flagged. I can redistribute **{question ids}** to new emails if you send names — or we schedule a 20-min executive lane review.

---

## 7. Next engineering (only after OP → PR)

See [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md). Until then, deploy and operate **`agent-governance-onboarding`** per [Portal-Deploy-Checklist.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Portal-Deploy-Checklist.md) and label every engagement **procurement pilot** when Client Sponsor is procurement-led (log in CRM, not git).