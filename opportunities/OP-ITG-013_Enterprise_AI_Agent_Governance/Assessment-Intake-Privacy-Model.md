# Assessment intake privacy model — `OP-ITG-013` *(Director decision)*

**Decision date:** 2026-11-26  
**Host:** [Opportunities 2027 — Portfolio Explorer](https://oppurtunities-2027.ai.studio/) (integrated `OP-ITG-013` diagnostic)  
**Status:** **Wave 0 shipping pattern** — no change to inventory `Idea` until `G4`.

---

## Design choice

Public self-assessment is **lightweight and non-retentive**:

| Shipped (Wave 0) | **Not** shipped on CBa infrastructure |
| --- | --- |
| Interactive P0 triage + Tier 1 / full control questionnaire in the browser | **Personalized workspaces** tied to org identity on CBa servers |
| **Client-side completion** — answers stay in-session unless the user exports PDF/JSON | **Server-side save** of per-control answers, evidence notes, or full scorecard JSON |
| **Brief request** → **Firestore** (contact + scoping only — see §2) | **CxO “forward question to delegate”** flows; posting the **full assessment** to any backend |

**Why:** Delegation and personalization imply **information retention**, **data-processor obligations**, and **CxO sign-off** before CBa stores organizational or employee-linked content. That belongs on a **paid, contracted** track (Tier 1/2 workshop or future **client-tenant** PRMAP — `OP-SCM-003`), not on a free public triage surface.

---

## 2. Firestore / intake relay — briefing payload only (not the full assessment)

**Engineering SSOT (Firestore path):** [`mdresch/oppurtunities-2027`](https://github.com/mdresch/oppurtunities-2027) — Portfolio Explorer brief intake → **Firestore** ([docs/engineering/Firestore-Brief-Intake.md](../../docs/engineering/Firestore-Brief-Intake.md)). Payload builder pattern also in [`agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) (`briefingPayload.ts`).

After explicit **`consentGranted: true`**, the client POSTs **`BriefingSubmissionPayload`** (≤ **50 KB**). It is **not** the full export file.

| **Sent on opt-in relay / Firestore** | **Stays local unless user downloads export** |
| --- | --- |
| `contact`: name, email, company, roleTitle, optional preferredTimeframe | All **40 control responses** + evidence notes (`responses` object) |
| `summary`: weightedGovernanceIndex, maturityBand, completionPct | Full `ExportedAssessmentV1` JSON / `.md` (includes every answer) |
| `summary.pillarScores[]`: pillar id, short label, normalized % only | `organizationContext` free-text notes from deep export |
| `summary.triggeredRedFlagIds[]` (P0 **ids**, not narratives) | Delegate / workspace / personalization data |
| Consent audit: `consentVersion`, `submittedUtc`, `classification` | Honeypot must be empty; oversize payloads rejected |

**Schema (portfolio mirror):** [data/brief-request-firestore-schema.json](data/brief-request-firestore-schema.json) · **ADR:** onboarding repo `ADR-002`, `ADR-004`.

**Local persistence:** assessment progress in browser `localStorage` (`ago:assessment:v1`) until user clears — CBa does not receive that blob unless the user separately attaches an export file.

**Operational flow:**

```text
Browser: complete assessment → (optional) export PDF/JSON locally
         → submit brief request form → Firestore { contact + scoping fields only }
CBa:     notification / CRM row → schedule 30-min readout (client may bring export on call)
```

Retention: treat brief requests as **sales leads** (minimal PII); define TTL / deletion in hosting privacy notice; **never** merge brief-request docs with full assessment exports server-side.

---

## How executives still delegate (off-portal)

Use [Assessment-Delegation-and-Ownership-Matrix.md](Assessment-Delegation-and-Ownership-Matrix.md) as a **delivery and workshop** guide during **paid** Tier 1 Triage or Tier 2 Assessment:

1. Sponsor runs the **public diagnostic** locally (or downloads the questionnaire pack).
2. Sponsor shares **function-owned sections** offline inside their tenant (Teams, email, internal GRC tool).
3. CBa facilitates **executive review** in the 30-minute briefing or scoped engagement — CBa does **not** need a copy of raw tenant exports on public intake.

Optional future: multi-delegate dashboards only when hosted **in the client’s environment** or under **PR-ITG-013** with DPA ([Portal-Delegation-Dashboard-Spec.md](Portal-Delegation-Dashboard-Spec.md) — aspirational).

---

## GTM language (use verbatim where helpful)

> “Your detailed assessment stays in your browser unless you export it yourself. If you request a briefing, we only save your **contact details and scoping notes** — not your full questionnaire — so we can schedule a readout.”

---

## Qualification metrics (`HYP-2027-013` / `014`)

| Old assumption | **Revised signal** |
| --- | --- |
| Full assessment on server | **Brief request** in Firestore (allowed fields only) **or** briefing booked via CRM |
| Auto-captured per-control data | Optional **aggregate** index/P0 count on brief request only if user consents |
| ≥3 portal completions | ≥3 **brief requests** or booked readouts from Wave 0 |

---

## Engineering backlog impact

- **Wave 0** ([Portal-Engineering-Backlog.md](Portal-Engineering-Backlog.md)): in scope (browser UI, export, CTA, privacy footer).
- **Wave 1 delegation MVP:** **withdrawn** from public host; revisit under `OP-SCM-003` / client tenant only.
- **PO-006 UTM in export metadata:** client-side export field only — no beaconing of answer text to CBa.

---

## Related

[Pilot-Charter.md](Pilot-Charter.md) §2 · [Portal-Deploy-Checklist.md](Portal-Deploy-Checklist.md) · [data/portal-deploy-status.json](data/portal-deploy-status.json)