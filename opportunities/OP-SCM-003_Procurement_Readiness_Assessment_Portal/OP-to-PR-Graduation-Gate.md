# OP → PR graduation gate — `OP-SCM-003` (PRMAP)

**Opportunity:** `OP-SCM-003` — Procurement Readiness & Pre-Sales Assessment Portal  
**Target project (upon approval):** `PR-SCM-003` *(or org naming: `PR-PRMAP-001` — lock at charter sign-off)*  
**Target repository:** [github.com/mdresch/cba-procurement-readiness-portal](https://github.com/mdresch/cba-procurement-readiness-portal) *(create only after this gate — not before)*

---

## 1. What changes at OP → PR

| Dimension | `OP-SCM-003` (now) | After PR approval |
| --- | --- | --- |
| **Purpose** | Spec, catalog model, pilot pattern | Build, operate, secure multi-SKU portal |
| **Code location** | Portfolio markdown + JSON in `oppurtunities-2027` | **`mdresch/cba-procurement-readiness-portal`** |
| **Pilot stand-in** | [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) for SKU `CBA-ITG-013-T1` only | First-class SKU loader + AM console in PRMAP repo |
| **Delivery owner** | Director + product spec | Named tech lead + CBa AM ops playbook |

---

## 2. Interim rule (until PR approval)

> **Do not** fork the full multi-tenant platform in a new repo yet.  
> **Do** treat **[Procurement-Pilot-Example-OP-ITG-013.md](Procurement-Pilot-Example-OP-ITG-013.md)** as the reference implementation for **procuring `OP-ITG-013`** using lessons from the existing onboarding portal.

Procurement narrative:

1. **Client Sponsor** (procurement / IT sourcing) opens the assessment link tied to **SKU `CBA-ITG-013-T1`**.  
2. **Executive Sponsor** (CIO/CISO) delegates via [Assessment-Delegation-and-Ownership-Matrix.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Assessment-Delegation-and-Ownership-Matrix.md).  
3. **CBa Account Manager** tracks progress manually (tracker + export) until PRMAP AM console ships.  
4. Completed export attaches to **internal buying file** before PO for Tier 1 / Tier 2 engagement.

---

## 3. Graduation criteria (Director sign-off)

| # | Criterion | Evidence |
| --- | --- | --- |
| G1 | `HYP-2027-016` passes or reaches `Testing` with ≥1 design partner | Hypothesis register |
| G2 | ≥1 paid or LOA engagement used **procurement + portal export** in buying file | Redacted screenshot / CRM note (not in git) |
| G3 | Build requirements frozen ([Procurement-Portal-Build-Requirements.md](Procurement-Portal-Build-Requirements.md)) | PRD version tag |
| G4 | Repo scaffold approved: `cba-procurement-readiness-portal` | Empty repo + README charter |
| G5 | SKU catalog ≥3 with JSON templates versioned | `catalog/skus.json` in new repo |
| G6 | Security: tenant isolation + DPA template reviewed | Legal checklist |

**Status:** `OP-SCM-003` remains **`Idea`** until G1–G2 show signal; **PR charter** opens when G3–G6 ready.

---

## 4. Repo bootstrap checklist (post-approval only)

```text
mdresch/cba-procurement-readiness-portal/
  README.md                 # links PR-SCM-003 charter
  catalog/skus.json         # from oppurtunities-2027 OP-SCM-003 data
  templates/                # per OP-* questionnaire JSON
  delegation/               # ownership profiles
  apps/web/                 # SPA
  apps/api/                 # workspace, assign, export
  docs/am-playbook.md       # CBa Account Manager procedures
```

**Port from interim pilot (do not rewrite blind):**

| Lesson source (`OP-ITG-013`) | PRMAP module |
| --- | --- |
| [data/agent-governance-question-ownership.json](../OP-ITG-013_Enterprise_AI_Agent_Governance/data/agent-governance-question-ownership.json) | `delegation/OP-ITG-013.json` |
| [Portal-Delegation-Dashboard-Spec.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Portal-Delegation-Dashboard-Spec.md) | `docs/dashboard-spec.md` (generalize) |
| [Tier-1-vs-Tier-2-Cut-Sheet.md](../OP-ITG-013_Enterprise_AI_Agent_Governance/Tier-1-vs-Tier-2-Cut-Sheet.md) | `templates/OP-ITG-013-tier1.json` question sets |
| `agent-governance-onboarding` UX patterns | Contributor queue + export |

---

## 5. Relationship to `agent-governance-onboarding`

| Repo | Role |
| --- | --- |
| `mdresch/agent-governance-onboarding` | **Track B** for `OP-ITG-013` GTM (CIO/CISO discovery). May remain single-SKU or merge into PRMAP later. |
| `mdresch/cba-procurement-readiness-portal` | **Procurement-led** multi-SKU intake (starts with same `OP-ITG-013` template as pilot SKU). |

**Merge decision (PR Phase 2):** Either embed onboarding as a catalog route inside PRMAP, or keep two repos with shared `templates/` npm package — decide at PR kickoff.