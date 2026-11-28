---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-015"
execution_track: "Tier A - Flagship (Pillar 17 Priority #5)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Tier_A_Executive_Summary_2027.md & inventory-of-ideas.md (0 ADPA .docx assigned)"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — OP-ITG-015: Cryptographic Sovereignty & Trust Architecture Assessment

> **Governance & SSOT:** Governed under [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md) (PMBOK 8 Initiating, Stage 1b). Tier A Priority #5 positioning is anchored in [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) and [inventory-of-ideas.md](../../inventory-of-ideas.md); sibling files are [Ideation-Spark.md](./Ideation-Spark.md) and [Source-Documents.md](./Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Regulated European enterprises, healthcare institutions, defense suppliers, and public-sector boards face an acute architectural blind spot in 2027: cloud compliance programs still ask "Where is my data stored?" rather than **"Can anyone, anywhere, reconstruct my data?"** Under DORA, NIS2, EU tech-sovereignty mandates, and ongoing CLOUD Act extraterritorial subpoena exposure, storing encrypted data in an EU region with a US-headquartered hyperscaler or single KMS/HSM operator fails true reconstruction resistance. CIOs, CISOs, and Risk Committees need an independent, mathematically grounded assessment that tests whether any single cloud provider, jurisdiction, legal authority, identity domain, or privileged insider can unilaterally reconstruct crown-jewel artifacts.

## 2. Solution Architecture & Delivery Workflow

Backed by CBa Consult's **Risk Management** signature toolkit, `OP-ITG-015` delivers a 6–10 week Platform-Backed Assessment (8–12 hrs/wk, $0 initial working capital):

1. **Crown-Jewel Asset & Adversary Scope (Weeks 1–2):** Classify high-sensitivity artifacts (IP, defense/health records, arbitration/WORM archives) and bind explicit threat-model boundaries.
2. **8-Domain Bayesian Trust Topology Scoring (Weeks 3–5):** Execute active evidence-seeking across all eight sovereignty domains — *Jurisdiction, Ownership, Infrastructure, Identity, Cryptography, Operations, Network, and Financial* — to locate single points of reconstruction control.
3. **Threshold & Partitioning Architecture Design (Weeks 6–8):** Specify Shamir/MPC threshold cryptography, multi-jurisdiction share partitioning, and in-memory attested client assembly so no single cloud, HSM, or court order can assemble a complete artifact.
4. **Board Readout & Reference Blueprint (Weeks 9–10):** Deliver scored Trust Topology dossier, remediation roadmap, and integration hooks for `OP-ITG-010` (12-year WORM/arbitration archives) and `OP-ITG-014`.

## 3. Market Comparables & CBa Consult Differentiation

| Comparable / Alternative | Typical Positioning | Structural Limitation | CBa Consult Differentiation |
| --- | --- | --- | --- |
| Hyperscaler "Sovereign Cloud" Controls | Regional hosting + customer-managed keys (BYOK/HYOK) | Still vulnerable to single-vendor control-plane, legal-entity ownership, or root-IAM correlation | Evaluates full 8-domain reconstruction paths across ownership, jurisdiction, and MPC thresholds |
| Big Four Cyber / DORA Advisory | Policy gap checklists & compliance workshops | Focuses on paper compliance ("where data sits"), lacks cryptographic threshold topology scoring | Conflict-free mathematical reconstruction scoring + actionable Shamir/MPC blueprint |
| HSM / KMS Hardware Vendors | Key vault appliances or cloud HSMs | Single-vendor hardware/firmware trust anchor; does not partition across legal jurisdictions | Vendor-neutral multi-jurisdiction partitioning with attested client-side assembly |
| Open-Source MPC Toolkits | Raw cryptographic libraries | Unusable by CIO/CISO boards without governance, threat-model clarity, and evidence scoring | Executive-ready Trust Topology model bridging board risk governance and crypto engineering |

## 4. Internal IP & Source Provenance Crosswalk

| Source / Asset | Status in Workspace | Relevance to OP-ITG-015 | Required Adaptation for 2027 Pilot |
| --- | --- | --- | --- |
| [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) | Active Executive SSOT | Designates OP-ITG-015 as Tier A Priority #5 (Pillar 17, Strategic Asset #5: Sovereign Information) | Align Q3–Q4 2027 pilot rollout with Pillar 17 flagship sequence |
| [inventory-of-ideas.md](../../inventory-of-ideas.md) | Active SSOT | Documents 8-domain model, Shamir/MPC stack, and €4,000–€15,000+ capital band | Codify 8-domain scoring rubric and evidence checklist |
| [Ideation-Spark.md](./Ideation-Spark.md) | Active Sibling | Defines explicit threat model and cross-links to `OP-ITG-010` and `OP-ITG-014` | Translate threat boundaries into formal client engagement letter language |
| [Source-Documents.md](./Source-Documents.md) | Active (0 ADPA `.docx`) | Confirms greenfield Sovereign Information IP with no legacy `.docx` dependency | Author standalone Trust Topology Assessment template pack |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **Explicit Threat-Model Boundaries (Does NOT Protect Against):** Endpoint or client-device compromise, credential theft of an authorized user, malicious actions by a legitimate authorized user, or collusion exceeding the configured cryptographic threshold.
- **Service Scope Exclusion:** Assessment and architecture blueprint only in Stage 1; does not include writing production cryptography libraries, operating managed HSM hardware, or providing formal legal opinions on foreign statutes.
- **Stage 1b Gate Decision:** Priority Tier A flagship ready for Stage 2 CISO/CIO hypothesis validation and Stage 3 commercial sign-off for Q3–Q4 2027 scale-out.
