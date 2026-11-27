---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Commercial & GTM Policy"
lifecycle_stage: "Stage 1b"
inputs:
  - "Enterprise-IT-Budget-Governance-Multinational.md"
outputs:
  - "Commercial-Engagement-Invoicing-and-Procurement-Policy.md"
date: 2026-11-26
---

# Commercial engagement — invoicing, procurement, and why we do not use card checkout

**Audience:** Client sponsors, procurement, finance, line managers, CBa Account Managers.

**Scope:** **Packaged diagnostics** (catalog SKU / fixed-scope wedge) and **consulting engagements** (advisory, assessments, retainers) in the 2027 portfolio. Excludes informal **discovery calls** and unpaid sparks.

**Read with:** [Rules-of-Engagement.md](../governance/Rules-of-Engagement.md) *(parent policy — multiparty approved engagement)* · [Enterprise-IT-Budget-Governance-Multinational.md](Enterprise-IT-Budget-Governance-Multinational.md) · [`OP-SCM-003` Approval-Path-and-Cycle-Fields.md](../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/Approval-Path-and-Cycle-Fields.md)

**Policy role:** This file is the **commercial and invoicing basis** under the [Rules of engagement](../governance/Rules-of-Engagement.md). CBa does **not render services inside a client organisation without explicit multiparty approved engagement** (sponsor, executive/budget owner, finance procurement, CBa acceptance).

---

## 1. Position in one sentence

**CBa Consult sells B2B professional services and packaged diagnostics against a signed order (PO or equivalent) and tax-compliant invoice to a legal entity—not via a line manager’s corporate credit card as substitute for procurement.**

---

## 2. Why card payment is not formal procurement (buyer side)

Enterprise buyers use cards for **low-value, pre-approved consumables** (travel, minor supplies). **Consulting and packaged assessments** fail the usual card policy tests:

| Requirement enterprises enforce | Why a line manager’s card fails |
| --- | --- |
| **Delegation of Authority (DoA)** | Card holder often **is** the requestor; maker–checker and spend limits break down 🟢 |
| **Budget commitment** | Card hits a personal/corporate card account, not always the **approved cost centre / project WBS** until expense report—after work may start |
| **Procurement policy** | Professional services typically require **PO**, category owner, and often **vendor master** even below tender thresholds 🟢 |
| **Segregation of duties** | Same person cannot **select vendor, approve scope, and bind payment** without audit finding 🟢 |
| **Three-way match** | Finance matches **PO – receipt/deliverable – invoice**; card-only flows often lack PO and acceptance record 🟢 |
| **Vendor risk** | New advisory vendor triggers **InfoSec, legal, DPA**; card bypasses onboarding ([§12 vendor onboarding](Enterprise-IT-Budget-Governance-Multinational.md)) |
| **Contracting entity** | Subsidiary vs group HQ must **sign**; card may charge wrong legal person |
| **Regulated sectors** | FS/third-party ICT (DORA) expects **documented third-party register**, not ad hoc card spend 🟡 |

**Line manager sign-off** may suffice to **start internal approval**; it does **not** replace **finance-validated commitment** (PO or delegated purchasing order) for scoped services.

---

## 3. Why card payment is not acceptable on the CBa side (supplier side)

| CBa need | Card / “just swipe it” gap |
| --- | --- |
| **Legal counterparty** | Invoice must name the **correct client legal entity**, address, and contact for contract law and dispute resolution |
| **VAT / tax evidence** | EU B2B requires valid **VAT ID**, reverse-charge rules where applicable, and auditable invoice fields |
| **Scope & liability** | Packaged and consulting deliverables need **SKU, SOW reference, fees, term, IP, confidentiality, DPA**—not a generic merchant descriptor |
| **Revenue recognition** | Milestones, acceptance criteria, and **deliverable-based** billing align with fixed-scope wedges; card prepay does not map cleanly |
| **Insurance & independence** | Pre-assurance positioning assumes **arm’s-length** professional engagement, not informal expense |
| **Audit trail** | PO number, cost centre, and sponsor identity on the invoice support **both** parties’ audits |

CBa may use card acquirers for **unrelated** retail-style products only where explicitly productised as **consumer/SMB self-serve** (e.g. low-touch templates)—**not** for catalog **`OP-*`** diagnostics or consulting listed in [inventory-of-ideas.md](../../inventory-of-ideas.md).

---

## 4. What we require instead (minimum commercial path)

### 4.1 Client commitments

| Step | Owner (typical) | Artefact |
| --- | --- | --- |
| 1 | Client Sponsor + Executive Sponsor | Agreed **SKU / SOW** (scope, fees, timeline) |
| 2 | Budget holder + finance | **PO** or written order on **contracting entity** letterhead / e-procurement |
| 3 | Procurement (if applicable) | Vendor onboarding complete; MSA or order terms |
| 4 | Legal / DPO (if data access) | DPA or security addendum **before** production data |
| 5 | CBa | **Tax-compliant invoice** to PO; deliver per acceptance rules |

**PRMAP** captures approval path and cycle expectations before step 1 completes — [Approval-Path-and-Cycle-Fields.md](../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/Approval-Path-and-Cycle-Fields.md).

### 4.2 Invoice requirements (finance-ready)

Provide before first invoice:

| Field | Purpose |
| --- | --- |
| **Legal billing name** | Matches contracting entity on PO |
| **Registered address** | VAT / statutory |
| **VAT / tax ID** | NL/EU B2B validation |
| **PO number** | Client three-way match |
| **Cost centre / WBS / project code** | As required by client ERP |
| **Accounts payable contact / email** | Routing and remittance |
| **Payment terms** | Per PO or agreed MSA (e.g. Net 30) |

Invoice line items reference **SKU or SOW line**, **fixed fee or milestone**, and **service period**.

### 4.3 Packaged vs consulting (same commercial rail)

| Type | Examples | Commercial shape |
| --- | --- | --- |
| **Packaged diagnostic** | Tier 1 triage, readiness screen, Phase 0 wedge | **Fixed fee** per catalog SKU; deliverable list in SOW; single or two milestone invoice |
| **Consulting** | Tier 2 assessment, advisory, retainer | **Fixed scope** preferred; time-boxed; change control for out-of-scope |

Both require **§4.1**—packaged does **not** mean “expense-able without PO.”

---

## 5. What to say when a line manager offers a card

Use neutral, policy-aligned language:

1. **Acknowledge** urgency and sponsor support.  
2. **Explain** your engagements are **invoice + PO** services for audit, tax, and scope control (this document).  
3. **Offer** a **short path**: Phase 0 wedge fee band, draft SOW for internal PO, PRMAP export if procurement needs readiness evidence.  
4. **Do not** start billable delivery without **written order** covering entity, scope, and fee.

Escalate to **Client Sponsor / procurement** if the manager insists card is the only path—either the account is **not ICP** or an **exception process** (e.g. prepaid invoice to corporate AP, not personal card) must run through **client finance**, not CBa switching to card checkout.

---

## 6. Exceptions (narrow)

| Scenario | Handling |
| --- | --- |
| **Prepaid invoice** requested by client AP | Allowed if **entity + PO/process letter** precedes payment; not the same as card at point of sale |
| **Paid discovery / validation sprint** (`OP-X-001`) | Same rail; fee in SOW; invoice after order |
| **Micro digital self-serve** (if offered) | Separate product policy; **not** mixed with `OP-*` consulting SKUs in this doc |

CBa does not accept **personal** cards or **reimbursement** arrangements (“I’ll expense it”) for B2B engagements.

---

## 7. Related portfolio & systems

| Asset | Role |
| --- | --- |
| [Rules-of-Engagement.md](../governance/Rules-of-Engagement.md) | Multiparty gate; no shadow delivery |
| [market-analysis-2027.md §3](../../market-analysis-2027.md) | Fee bands vs procurement thresholds |
| [Enterprise-IT-Budget-Governance-Multinational.md](Enterprise-IT-Budget-Governance-Multinational.md) | Approval layers & cycle times |
| [`OP-SCM-003`](../opportunities/OP-SCM-003_Procurement_Readiness_Assessment_Portal/Ideation-Spark.md) | Readiness before PO |
| `portal-rbac-and-workflows.json` → `commercial_engagement` | Machine-readable payment policy flag |

---

*Policy note: 2026-11-26. Not legal advice; client statutory rules always prevail.*