# Procurement portal — build requirements assessment (`OP-SCM-003`)

**Purpose:** Decide **what to build** before committing engineering. Complements [Portal-Product-Requirements.md](Portal-Product-Requirements.md).

---

## 1. Problem statement

| Today | Target |
| --- | --- |
| PDF / email questionnaires per deal | One portal workspace per procurement case |
| Executives overwhelmed | Executives **delegate** by function; see dashboard only |
| CBa blind until kickoff | **Account Manager** sees progress, reassigns, escalates |
| Each `OP-*` reinvented | **Catalog SKU** picks questionnaire template |

---

## 2. In-scope (MVP)

| # | Requirement | Priority |
| --- | --- | --- |
| R1 | **Service catalog** — pick CBa offering (SKU); load linked questionnaire | P0 |
| R2 | **Workspace** — org name, case ID, optional PO/RFP reference | P0 |
| R3 | **Client Sponsor** — procurement owner; invites users; closes case | P0 |
| R4 | **Executive Sponsor** — accountable exec; approves lane batches | P0 |
| R5 | **Contributor** — assigned questions only (“my queue”) | P0 |
| R6 | **CBa Account Manager** — read all; reassign question; nudge; internal notes | P0 |
| R7 | **Delegation** — default owner function + executive per question (JSON-driven) | P0 |
| R8 | **Progress dashboard** — % complete, P0/blockers, by exec & function | P0 |
| R9 | **Export** — `assessment-export.json` + PDF summary for PO pack | P0 |
| R10 | **Audit trail** — who answered, who reassigned, timestamps | P1 |

---

## 3. Out of scope (MVP)

| Item | Notes |
| --- | --- |
| Full e-procurement / ERP PO creation | Integrate via export only |
| CLM / contract authoring | Pair with `OP-LEG-002` |
| Client SSO (Entra) | Phase 2; MVP magic links |
| Multi-language | EN first; NL Phase 2 |
| Custom questionnaires per client | Use catalog templates + “blocked/NA” |

---

## 4. Non-functional

| Area | MVP bar |
| --- | --- |
| **Tenancy** | One workspace per client case; hard isolation |
| **Privacy** | PII in hosted DB only; no client emails in git manifests |
| **Availability** | 99.5% static tier acceptable for MVP |
| **Accessibility** | WCAG 2.1 AA on contributor forms |
| **Retention** | Configurable export + 12-mo workspace archive |

---

## 5. Technical shape (recommended)

| Layer | Choice | Rationale |
| --- | --- | --- |
| UI | SPA (React/Next or Vue) on Static Web Apps | Matches `agent-governance-onboarding` skill set |
| API | Functions / edge API | Assignment, status, export |
| Data | Postgres or Cosmos per tenant key | Structured questionnaires + audit |
| Templates | Git-backed JSON in CBa repo | Versioned with `OP-*` folders |
| Auth | Email magic link → Entra SSO | Fast MVP |

---

## 6. Delivery phases

| Phase | Weeks | Outcome |
| --- | --- | --- |
| **0 — Design** | 2 | PRD frozen; 3 SKU templates; RBAC JSON |
| **1 — Core** | 6 | Roles, assign, answer, sponsor dashboard |
| **2 — CBa AM** | 3 | Reassign, nudge, internal timeline |
| **3 — Catalog** | 4 | Admin UI to attach new `OP-*` JSON |
| **4 — SSO & hardening** | 4 | Entra, pentest, DPA template |

---

## 7. Acceptance (MVP sign-off)

- [ ] Client Sponsor creates workspace and invites Executive + 2 contributors.
- [ ] Contributor completes 5 questions; Executive accepts 1 batch.
- [ ] CBa AM reassigns 1 question to another email; audit shows change.
- [ ] Export validates against schema in [data/portal-rbac-and-workflows.json](data/portal-rbac-and-workflows.json).
- [ ] At least **3 catalog SKUs** demonstrably load different question counts.

---

## 8. Dependencies on portfolio IP

| Dependency | Use |
| --- | --- |
| `OP-ITG-013` delegation matrix | Pattern for executive / function routing |
| `inventory-of-ideas.md` | SKU list & pricing bands |
| `OP-CX-002` COAS | Scoring / maturity language |
| `OP-OPS-003` | Methodology productization metadata |