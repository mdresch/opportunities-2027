# Portal engineering backlog — `agent-governance-onboarding`

**SSOT repo:** [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding)  
**Specs (portfolio):** [Portal-Delegation-Dashboard-Spec.md](Portal-Delegation-Dashboard-Spec.md) · [data/agent-governance-question-ownership.json](data/agent-governance-question-ownership.json)

Implement in the **portal repo**; keep this file as the cross-reference for `OP-ITG-013` prep (no status upgrade required).

---

## Wave 0 — minimum viable intake *(ship before delegation)*

| ID | Story | Acceptance |
| --- | --- | --- |
| PO-001 | Tier 1 question subset loads (not all 40) | Matches [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md) |
| PO-002 | Top-10 P0 triage section | Same ids as questionnaire |
| PO-003 | Export JSON (+ optional print/PDF) | Download on completion |
| PO-004 | Completion CTA → Bookings URL | From [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) §C |
| PO-005 | Privacy + out-of-scope footer | Pilot-Charter §3 |
| PO-006 | `?src=` UTM captured in export metadata | [Wave-0-Outreach-Playbook.md](Wave-0-Outreach-Playbook.md) |

---

## Wave 1 — delegation MVP *(after first 3 submissions or sponsor demand)*

| ID | Story | Acceptance |
| --- | --- | --- |
| PO-010 | Load ownership JSON by question id | Contributor queue filter |
| PO-011 | Sponsor invites by email (manual list OK) | ≥6 default roles from delegation matrix |
| PO-012 | Dashboard: % complete by function/pillar | Spec KPIs |
| PO-013 | Release export at ≥80% or sponsor override | Audit event in export |

---

## Wave 2 — PRMAP alignment *(optional; full platform is `OP-SCM-003`)*

| ID | Story | Notes |
| --- | --- | --- |
| PO-020 | SKU header `CBA-ITG-013-T1` on workspace | [Procurement-Intake-PRMAP-Example.md](Procurement-Intake-PRMAP-Example.md) |
| PO-021 | AM read-only progress view | Until PRMAP ships |

---

## Suggested GitHub issues (copy to portal repo)

```text
[PO-001] Tier 1 question subset from portfolio cut sheet
[PO-003] Assessment export JSON for briefing booking
[PO-004] Wire Microsoft Bookings / Calendly on completion screen
```

Track releases: `v0.1.0-intake` (Wave 0) · `v0.2.0-delegation` (Wave 1).