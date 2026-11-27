# Approval path & cycle fields — PRMAP workspace (`OP-SCM-003`)

**Purpose:** Standard fields captured when a **Client Sponsor** opens a procurement workspace so CBa can estimate **PO cycle time** and route the proposal to the right **contracting entity**.

**Canonical ranges:** [docs/research/Enterprise-IT-Budget-Governance-Multinational.md](../../docs/research/Enterprise-IT-Budget-Governance-Multinational.md) **§12**

**Machine contract:** [data/portal-rbac-and-workflows.json](data/portal-rbac-and-workflows.json) → `approval_path_fields`

---

## 1. When to capture

| Moment | Who | Action |
| --- | --- | --- |
| Workspace create | Client Sponsor | Required fields §2.1 |
| Before export | Client Sponsor + Executive | Confirm §2.2 if anything changed |
| AM review | CBa Account Manager | Validate band vs §12.3; note in internal note |

---

## 2. Field set

### 2.1 Required at workspace create

| Field ID | Label | Type | Values / format | Notes |
| --- | --- | --- | --- | --- |
| `approval_layers_touched` | Approval layers touched | `multi_enum` | `local_branch`, `country_entity`, `regional`, `global_hq` | Lowest layer that **must** approve before PO; select **all** expected hops |
| `vendor_status` | CBa / vendor status | `enum` | See §3 | Drives onboarding critical path |
| `budget_line_status` | Budget status | `enum` | `in_annual_plan`, `in_entity_budget_not_central`, `unbudgeted_change_request`, `regulatory_mandate`, `unknown` | See §4 |
| `contracting_entity` | Contracting entity | `string` | Legal name of signer | Local BV vs group procurement; **must** match invoice legal name — [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../../docs/research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md) |
| `formal_procurement_path` | Formal procurement path confirmed | `enum` | `po_issued`, `po_pending`, `written_order_pending`, `card_declined_redirect` | CBa does **not** accept line-manager card as formal procurement |

### 2.2 Required before export release

| Field ID | Label | Type | Values / format | Notes |
| --- | --- | --- | --- | --- |
| `next_governance_forum_date` | Next governance forum date | `date` | ISO date | IT steerCo, CIO council, investment committee, or procurement board — **whichever gates this SKU** |
| `forum_name` | Forum name | `string` | Free text | e.g. "EMEA IT SteerCo", "Group CIO Council" |
| `target_po_date` | Target PO date | `date` | ISO date | Client goal; compare to `estimated_cycle_band` |
| `estimated_cycle_band` | Estimated cycle band | `enum` | See §5 | AM may override with `cycle_band_override_reason` |

### 2.3 Optional (recommended)

| Field ID | Label | Type | Notes |
| --- | --- | --- | --- |
| `procurement_contact_email` | Procurement owner | `email` | Category manager / CPO delegate |
| `infosec_review_required` | InfoSec review required | `boolean` | Default `true` if `vendor_status` = `new_vendor` |
| `tender_required` | Formal tender expected | `boolean` | If true, extend band per §12.3 |
| `estimated_po_value_eur` | Estimated PO value (EUR) | `number` | For threshold routing narrative |
| `currency_local` | Local currency | `string` | If ≠ EUR |
| `cycle_band_override_reason` | Cycle band override reason | `string` | AM only; audit logged |

---

## 3. `vendor_status` enumeration

| Value | Meaning | Default layer stress |
| --- | --- | --- |
| `on_group_msa` | CBa on group framework / existing supplier number | Country or local if in catalogue |
| `on_entity_msa` | Approved on **country** entity only | Country |
| `new_vendor_group` | Not on group vendor master — full onboarding | **Global** procurement + InfoSec |
| `new_vendor_entity` | New to entity only; group may already know vendor | Country (+ possible global) |
| `pilot_pre_vendor` | Workspace before vendor decision; onboarding in parallel | Treat as `new_vendor_*` until resolved |

---

## 4. `budget_line_status` → approval lane

| Value | Typical extra time | Sponsor tip |
| --- | --- | --- |
| `in_annual_plan` | Baseline §12.3 path | Reference budget line / WBS |
| `in_entity_budget_not_central` | +0–2 weeks if country CFO only | Entity opex |
| `unbudgeted_change_request` | **+2–6 weeks** finance | One-page change request per Truvara pattern |
| `regulatory_mandate` | Intent faster; procurement clock same | Cite deadline (DORA, EU AI Act, …) |
| `unknown` | Assume worst reasonable band | AM flags on create |

---

## 5. `estimated_cycle_band` (suggested mapping)

Auto-suggest rules (MVP: AM picks; product: derive from layers + vendor + tender):

| Band ID | Label | Indicative calendar | Match when |
| --- | --- | --- | --- |
| `band_a` | Local / catalogue | 2–5 days | `local_branch` only + `on_group_msa` or `on_entity_msa` |
| `band_b` | Country | 5–15 days | `country_entity` only |
| `band_c` | Country + region | 2–4 weeks | includes `regional` |
| `band_d` | Multi-tier + existing group vendor | 3–6 weeks | `global_hq` + group MSA |
| `band_e` | Multi-tier + new vendor | 6–12 weeks | `new_vendor_*` + 2+ layers |
| `band_f` | Architecture / council | +2–8 weeks on top of e/d | `next_governance_forum_date` >14d out or council quarterly |
| `band_g` | Tender / RFP | +8–20 weeks | `tender_required` = true |

Display on **Workspace home**: band label + link to §12 for client sponsor transparency.

---

## 6. Export payload (add to `export_schema.required`)

```json
[
  "approval_layers_touched",
  "vendor_status",
  "budget_line_status",
  "contracting_entity",
  "next_governance_forum_date",
  "forum_name",
  "target_po_date",
  "estimated_cycle_band"
]
```

---

## 7. Questionnaire hooks (future SKU)

Optional **readiness questions** for procurement-led SKUs (not scored maturity):

| Question ID | Prompt | Maps to field |
| --- | --- | --- |
| `PR-AP-001` | Which legal entity will sign the PO? | `contracting_entity` |
| `PR-AP-002` | Is this spend in the approved annual IT plan? | `budget_line_status` |
| `PR-AP-003` | Is the vendor on a group or entity MSA? | `vendor_status` |
| `PR-AP-004` | Which approval layers must sign off? | `approval_layers_touched` |
| `PR-AP-005` | When is the next IT governance forum that releases this category of spend? | `next_governance_forum_date` |
| `PR-AP-006` | Will finance release a PO or written order to the legal entity (not card-only)? | `formal_procurement_path` |

Add to [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md) as **core** block `PRMAP-APPROVAL-PATH` (all SKUs).

---

## 8. Invoicing alignment (no card checkout)

Packaged and consulting SKUs require **PO-backed invoice** — see [Commercial-Engagement-Invoicing-and-Procurement-Policy.md](../../docs/research/Commercial-Engagement-Invoicing-and-Procurement-Policy.md). If sponsor answers imply **card-only**, set `formal_procurement_path` = `card_declined_redirect` and AM uses §5 talk track; do not start billable work.

---

*Spec date: 2026-11-26. Paired with Enterprise-IT-Budget-Governance-Multinational.md §12.*