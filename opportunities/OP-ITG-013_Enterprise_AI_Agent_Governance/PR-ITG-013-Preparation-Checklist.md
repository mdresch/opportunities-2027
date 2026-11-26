# PR-ITG-013 preparation checklist *(before OP → PR / `G4`)*

**Opportunity:** `OP-ITG-013` remains inventory **`Idea`**.  
**Target project ID (after `G4` only):** `PR-ITG-013`  
**Governance:** [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md) · [Pilot-Charter.md](Pilot-Charter.md) §4–§5  
**Rule:** Completing this checklist **does not** authorize `Idea` → `Pilot`. It only de-risks portal launch, outreach, and Pilot #1 delivery.

---

## Phase P1 — Portal go-live (Track B)

Repo: [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding)

| # | Task | Owner | Done |
| --- | --- | --- | --- |
| P1.1 | Work through [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) A–E | Director | [ ] |
| P1.2 | Pick host (GitHub Pages / Azure SWA / Cloudflare); record **live URL** in [Pilot-Charter.md](Pilot-Charter.md) §2b and [data/portal-deploy-status.json](data/portal-deploy-status.json) | Director | [ ] |
| P1.3 | Smoke test: Tier 1 subset + export + booking CTA &lt; 15 min | Director | [ ] |
| P1.4 | Tag repo release `v0.1.0-intake` when URL is stable | Director | [ ] |
| P1.5 | File portal engineering items from [Portal-Engineering-Backlog.md](Portal-Engineering-Backlog.md) (delegation MVP optional for Wave 0) | Director | [ ] |

---

## Phase P2 — Wave 0 outreach (prospects #1–3)

| # | Task | Owner | Done |
| --- | --- | --- | --- |
| P2.1 | Execute [Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md) (invite copy + LinkedIn Post 1) | Director | [ ] |
| P2.2 | Update rows #1–3 in [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md) (`Invite status` → Sent / Replied) | Director | [ ] |
| P2.3 | Mirror portal metrics into [Pilot-Charter.md](Pilot-Charter.md) §2 when submissions arrive | Director | [ ] |
| P2.4 | Set `HYP-2027-013` → **`Testing`** in [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md) when first invite **sent** (not when validated) | Director | [ ] |
| P2.5 | Set `HYP-2027-014` → **`Testing`** when first **30-min readout** is booked | Director | [ ] |

---

## Phase P3 — PR-ITG-013 draft pack (Track A, no status flip)

| # | Task | Owner | Done |
| --- | --- | --- | --- |
| P3.1 | Keep [Pilot-Charter.md](Pilot-Charter.md) as **Pre-Pilot** SSOT; use §6 PR Preparation Mode | — | [x] |
| P3.2 | Open [Pilot-1-Delivery-Log-Template.md](Pilot-1-Delivery-Log-Template.md) when Pilot #1 sponsor is named (CRM only until then) | Director | [ ] |
| P3.3 | Rehearse delivery path: [Workshop-Agenda.md](Workshop-Agenda.md) + [Executive-Readout-Template.md](Executive-Readout-Template.md) | Director | [ ] |
| P3.4 | Procurement-led path ready: [Procurement-Intake-PRMAP-Example.md](Procurement-Intake-PRMAP-Example.md) | — | [x] |

---

## Phase P4 — Evidence & BD hygiene

| # | Task | Owner | Done |
| --- | --- | --- | --- |
| P4.1 | Re-run BD inventory: `py -3 scripts/inventory-bd-folder.py --opp OP-ITG-013` when `BD_DOCUMENTS_ROOT` is set | Director | [ ] |
| P4.2 | Refresh [BD-Reuse-Inventory.md](BD-Reuse-Inventory.md) from output | Director | [ ] |
| P4.3 | Quarterly note in [Portfolio-Status-Register.md](../../docs/registers/Portfolio-Status-Register.md) §1 — *prep only, status stays Idea* | Director | [ ] |

---

## Phase P5 — Explicit non-actions *(honest baseline)*

- [ ] **Do not** change `inventory-of-ideas.md` `Status` to `Pilot` until [Pilot-Charter.md](Pilot-Charter.md) §5 Director sign-off.
- [ ] **Do not** mark `HYP-2027-013` / `014` as `Validated` without proposal or paid evidence.
- [ ] **Do not** create `projects/PR-ITG-013/` or a second advisory repo until `G4` closes.
- [ ] **Do not** conflate with `OP-SCM-003` PRMAP repo ([OP-to-PR graduation](../OP-SCM-003_Procurement_Readiness_Assessment_Portal/OP-to-PR-Graduation-Gate.md) is separate).

---

## Exit criteria → request `G4` review

Request Director **G4** review when **all** are true:

1. Live portal URL recorded and ≥1 non-test submission logged.  
2. ≥3 qualified prospects invited (#1–3 minimum); ≥1 completed portal or booked briefing.  
3. Named **Pilot #1 sponsor** (LOA or Tier 1 PO path documented in CRM).  
4. [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) §E gates met.

Then: complete Pilot-Charter §5 → flip to **`PR-ITG-013`** / inventory **`Pilot`** per [OP-to-PR-Graduation-Gate.md](OP-to-PR-Graduation-Gate.md).