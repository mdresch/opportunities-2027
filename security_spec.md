# Security Specification — Opportunities 2027 Firestore Rules

## 1. Data Invariants
1. **PII Isolation (`scoping_inquiries`)**: Scoping inquiries contain client PII (`fullName`, `email`, `organization`, `notes`). Unauthenticated users and non-admin signed-in users MUST NEVER be able to `get`, `list`, `update`, or `delete` any inquiry document.
2. **Public Create-Only Intake**: Prospective clients visiting the public Client Showcase may ONLY `create` a new `scoping_inquiries/{inquiryId}` document when `inquiryId` passes `isValidId`, all required keys are present, no extra shadow keys exist, all string/array bounds match `firebase-blueprint.json`, `status == 'new'`, `adminNotes == ''`, and `createdAt == request.time && updatedAt == request.time`.
3. **Verified Admin Triage**: Only the bootstrapped verified admin (`menno.drescher@gmail.com` with `email_verified == true`) or a UID present in `/admins/{uid}` (with `email_verified == true`) may `get`, `list`, `update`, or `delete` inquiries.
4. **Immutable Audit Fields**: During admin updates, `createdAt` and `referenceId` MUST remain immutable, only `status`, `adminNotes`, and `updatedAt` may change, and `updatedAt == request.time`.
5. **No Self-Assigned Admin Roles**: Client writes (`create`, `update`, `delete`) to `/admins/{uid}` are strictly denied.

## 2. The Dirty Dozen Adversarial Payloads (All Must Return PERMISSION_DENIED)
1. **PII Scrape (`list`)**: Unauthenticated or non-admin user calls `list` on `/scoping_inquiries`.
2. **Direct PII Read (`get`)**: Non-admin signed-in user calls `get` on `/scoping_inquiries/CBA-2027-ABCD`.
3. **Shadow Field Injection (`create`)**: Public client submits valid inquiry plus `"isAdmin": true` or `"approved": true`.
4. **Status Forgery (`create`)**: Public client submits inquiry with `"status": "scheduled"` instead of `"new"`.
5. **Admin Note Injection (`create`)**: Public client submits inquiry with non-empty `"adminNotes": "Approved discount"`.
6. **Timestamp Spoofing (`create`)**: Public client sends client-controlled `createdAt` instead of `request.time`.
7. **ID Poisoning (`create`)**: Attacker uses a 200-character or special-character document ID (`../admins/uid`).
8. **Denial of Wallet — Oversized String (`create`)**: Attacker submits a 10,000-char `notes` or 500-char `organization` field.
9. **Denial of Wallet — Unbounded Array (`create`)**: Attacker submits 50 items in `selectedServices` (limit is 12) or non-string array element.
10. **Unverified Admin Email Spoof (`get`/`list`)**: User with email `menno.drescher@gmail.com` but `email_verified: false` attempts to read inquiries.
11. **Immutable Field Tampering (`update`)**: Admin update attempts to alter `createdAt` or `referenceId`, or injects an unknown field.
12. **Privilege Escalation (`create` on `/admins/{uid}`)**: Authenticated non-admin attempts to write their own `/admins/{uid}` document.
