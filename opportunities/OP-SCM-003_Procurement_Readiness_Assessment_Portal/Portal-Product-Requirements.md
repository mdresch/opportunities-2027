# Portal product requirements — `OP-SCM-003` (PRMAP)

**Consumers:** Client procurement, executive sponsors, contributors, CBa Account Managers.  
**Machine contract:** [data/portal-rbac-and-workflows.json](data/portal-rbac-and-workflows.json)

---

## 1. Role model

| Role | Org side | Responsibilities |
| --- | --- | --- |
| **Client Sponsor** | Client | Opens workspace; links SKU; invites executives & delegates; tracks PO timeline; releases export to procurement file |
| **Executive Sponsor** | Client | Accountable for assessment truth; approves question batches in their lane (CIO/CFO/CISO/CEO/CAIO pattern) |
| **Function Lead** | Client | Optional; bulk-manages contributors in one function (IAM, Finance, …) |
| **Contributor** | Client | Answers assigned questions; attaches evidence notes |
| **CBa Account Manager** | CBa Consult | Assigned per workspace; views progress; **redistributes** questions; nudges; cannot alter client scores |
| **CBa Delivery Lead** | CBa Consult | Read-only post-release; pulls export into proposal/SOW |

---

## 2. Journeys

### 2.1 Procurement initiates buying

```text
Catalog → Select SKU (e.g. OP-ITG-013 Tier 1)
     → Create workspace (Client Sponsor)
     → Link RFP / category / estimated PO value (optional)
     → Invite Executive Sponsor(s)
     → Portal loads questionnaire_template_id
     → Executive delegates (function pack or per-question)
```

### 2.2 Executive delegates (≤20 min)

```text
Executive opens dashboard
     → Sees overdue by function
     → Invite function leads OR paste emails
     → Contributors receive "my queue" links
     → Executive reviews "exec_review" items → Accept lane
```

### 2.3 CBa Account Manager

```text
AM receives workspace assignment (email / CRM)
     → Dashboard: completion, blocked, P0 flags
     → Reassign question to different contributor (with reason)
     → Nudge overdue (templated email)
     → Internal note (not visible to client)
     → Alert when client releases export → proposal workflow
```

---

## 3. Screens

| Screen | Primary user | Content |
| --- | --- | --- |
| **Catalog** | Client Sponsor | SKU cards: name, duration, price band, question count |
| **Workspace home** | Sponsor / Exec | KPIs, progress bar, tabs (exec / function / pillar / P0) |
| **My queue** | Contributor | Cards; score 1–5; evidence; "I don't know" |
| **Approvals** | Executive | Batch accept; see delegate evidence |
| **AM console** | CBa AM | All workspaces; reassignment drawer; activity log |
| **Export** | Sponsor | JSON + PDF; lock after release |

*Reference executive layout:* [`OP-ITG-013` Executive-Dashboard-Portal-Mockup.html](../OP-ITG-013_Enterprise_AI_Agent_Governance/Executive-Dashboard-Portal-Mockup.html)

---

## 4. Questionnaire generation rules

| Rule | Behavior |
| --- | --- |
| **SKU → template** | 1:1 primary; optional `tier` flag (screen vs full) |
| **Template composition** | `core_questions[]` + `p0_flags[]` + `delegation` metadata |
| **Inherited templates** | e.g. `OP-ITG-013` imports `agent-governance-question-ownership.json` by reference id |
| **Custom SKU** | Future: composite SKU = union of two templates with de-dupe |

See [Service-Catalog-Questionnaire-Map.md](Service-Catalog-Questionnaire-Map.md).

---

## 5. Redistribution (AM)

| Action | Effect |
| --- | --- |
| **Reassign contributor** | New email; prior answers draft unless accepted |
| **Reassign function lead** | Bulk invite for function code |
| **Extend deadline** | Workspace-level; notifies sponsor |
| **Mark blocked** | Requires client sponsor comment; AM can flag for call |

All redistribution events append to **audit_log** (exportable).

---

## 6. Commercial hooks

| Event | CBa action |
| --- | --- |
| Workspace created | AM assigned round-robin or named in CRM |
| ≥80% accepted | AM notified → schedule readout |
| Export released | Auto-attach to opportunity record; proposal draft |
| Stalled >14d | AM escalation playbook |

---

## 7. MVP catalog (proposed)

| SKU | Offering | Template source |
| --- | --- | --- |
| `CBA-ITG-013-T1` | Agent governance Tier 1 | `OP-ITG-013` cut sheet + P0 |
| `CBA-FIN-009-P0` | Continuous Close readiness screen | `OP-FIN-009` intake (TBD JSON) |
| `CBA-RSK-004-SCREEN` | AI governance certification screen | `OP-RSK-004` intake (TBD JSON) |

---

## 8. Success metrics (product)

| Metric | Target (MVP) |
| --- | --- |
| Median time to 80% complete | <21 days |
| Contributor completion rate | ≥75% of assigned |
| AM interventions per workspace | <5 median |
| Export → paid proposal | ≥40% of released exports (hypothesis) |