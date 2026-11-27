# Wave 0 outreach — prospects #1–3 (`HYP-2027-013` activation)

**Goal:** Send the first three personal invites **before** broad LinkedIn waves.  
**Prerequisite:** Live portal URL in [data/portal-deploy-status.json](data/portal-deploy-status.json) (set when deployed).  
**Tracker:** [GTM-Prospect-Tracker.md](GTM-Prospect-Tracker.md) rows 1–3 · [Pilot-Charter.md](Pilot-Charter.md) §2

---

## Sequence

| Day | Action |
| --- | --- |
| D0 | Portal smoke test + booking link in completion screen |
| D1 | Personal invite **#1** (warmest path) |
| D3 | Personal invite **#2** |
| D5 | Personal invite **#3** + publish LinkedIn **Post 1** ([LinkedIn-GTM-Copy.md](LinkedIn-GTM-Copy.md)) |
| D7 | Follow up non-responders (one nudge only) |

On **first invite sent:** update `HYP-2027-013` status to `Testing` in [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md).

---

## UTM / source tags

Append to portal URL:

| Prospect # | `?src=` |
| --- | --- |
| 1 | `invite-insurer-w0` |
| 2 | `invite-rhine-w0` |
| 3 | `invite-logistics-w0` |
| LinkedIn Post 1 | `linkedin-post1` |

---

## Email / DM template A — CISO/CIO (Tier 1 wedge)

**Subject:** 15-minute agent sprawl triage before your next audit cycle?

> {First name},
>
> Mid-market teams are deploying Copilot Studio and Power agents faster than Entra and FinOps can keep up. I built a short **self-assessment** (no tenant creds, ~15 minutes) that surfaces P0 red flags — shared credentials, missing human sponsors, uncapped agent spend — mapped to **EU AI Act** and **ITGC** questions boards are already asking.
>
> **Link:** {PORTAL_URL}?src={SRC_TAG}  
> **Context one-pager (optional):** attach [One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx](One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx) offline
>
> If the index looks uncomfortable, book 30 minutes — I'll walk through a **Tier 1 Triage** scope (€2,500–€5,000, 2–3 weeks) vs. full 8-pillar assessment. No MSP takeover, no certification opinion — independent diagnostic only.
>
> Menno Drescher · CBa Consult

---

## Email template B — procurement-led (optional parallel path)

Use when **Client Sponsor** is category manager; executive still completes delegation.

> … attach export to your buying file before PO. SKU reference: **CBA-ITG-013-T1**. Playbook: [Procurement-Intake-PRMAP-Example.md](Procurement-Intake-PRMAP-Example.md)

---

## Per-prospect tailoring (planning names)

| # | Hook line to customize |
| --- | --- |
| 1 Benelux Insurer | Claims/IDP agents + DORA adjacent ITGC |
| 2 Rhine Manufacturing | Power Platform → SAP write-backs and SoD |
| 3 North Sea Logistics | Ops automation + joint CIO/CISO accountability |

---

## After reply or submission

1. Update tracker: `Invite status`, `Portal done?`, `P0 flags`.  
2. Copy row into Pilot-Charter §2.  
3. Book readout → consider `HYP-2027-014` → `Testing`.  
4. Pitch tier using [Tier-1-vs-Tier-2-Cut-Sheet.md](Tier-1-vs-Tier-2-Cut-Sheet.md).