# Firestore brief intake — Portfolio Explorer (`mdresch/oppurtunities-2027`)

**Purpose:** Record where the **brief request → Firestore** path lives in this repo and what payload shape is allowed (not the full assessment).

**Live host:** [https://oppurtunities-2027.ai.studio/](https://oppurtunities-2027.ai.studio/)  
**Privacy model:** [Assessment-Intake-Privacy-Model.md](../../opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/Assessment-Intake-Privacy-Model.md)  
**Payload schema:** [brief-request-firestore-schema.json](../../opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/data/brief-request-firestore-schema.json)

---

## Intended architecture

| Layer | Storage | Contents |
| --- | --- | --- |
| Assessment UI | Browser (`localStorage` / session) | All control answers + exports (`.json` / `.md` / print) |
| Opt-in brief request | **Firestore** (this repo’s client + rules) | `BriefingSubmissionPayload` only — contact + summary aggregates |
| Full assessment | **Never** Firestore on public intake | User export only |

Related assessment logic may also exist in [`mdresch/agent-governance-onboarding`](https://github.com/mdresch/agent-governance-onboarding) (`briefingPayload.ts`, `intakeRelay.ts`); **Firestore wiring for Portfolio Explorer belongs in this repo.**

---

## Code location (fill in when synced)

> **Agent check (2026-11-26):** After `git pull origin master`, this clone has **no** `firebase` / `firestore` imports under `src/` or `server.ts` on GitHub `master` (no matching git history). If Firestore exists in Google AI Studio only, **push/sync** to `master` so portfolio docs and code stay aligned.

| Artifact | Expected path (convention) | Status |
| --- | --- | --- |
| Firestore client write | `src/**/firestore*.ts` or `src/infra/briefIntake.ts` | *Not found on master — verify after push* |
| Env / project id | `.env.example` → `VITE_FIREBASE_*` | *Verify* |
| Security rules | `firestore.rules` or `firebase/` | *Verify* |
| Tests | `tests/**/brief-intake*.ts` | *Verify* |

**When located:** update this table and [portal-deploy-status.json](../../opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/data/portal-deploy-status.json) `code_paths` array.

---

## Allowed Firestore document shape

Must match `BriefingSubmissionPayload` (see schema JSON). **Exclude** `responses`, `organizationContext`, per-control evidence, and delegate/workspace fields.

Maximum serialized size: **51,200 bytes** (50 KB), consistent with onboarding `intakeRelay.ts` guards.