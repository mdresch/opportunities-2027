---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing & Competitive/IP Research (Stage 1b Ideation)"
lifecycle_stage: "Stage 1b (Tier 2 Ideation & Capability Framing)"
opportunity_id: "OP-ITG-023"
execution_track: "Track B (Niche OT / Drone–IoT RF Posture Diagnostic)"
linked_hypotheses: "None yet (Pre-Stage 2)"
primary_source: "Drone Spectrum Analysis IoT devices/Drone Spectrum Analysis IoT Devices.docx"
date: "2026-11-27"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Ideation Document — `OP-ITG-023`: Drone Spectrum Analysis & IoT RF Posture Assessment

> **Governance SSOT:** Governed by [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md), [inventory-of-ideas.md](../../inventory-of-ideas.md), and [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md). Local source context is tracked in [Ideation-Spark.md](Ideation-Spark.md) and [Source-Documents.md](Source-Documents.md).

## 1. Problem Context & 2027 Market Trigger

Civilian infrastructure operators, industrial campuses, logistics hubs, and critical-site security teams increasingly blend commercial UAS/drones, RF-dependent IoT sensors, and edge gateways on shared sites. In 2027, rising GPS spoofing/jamming incidents, contested electromagnetic environments, and EU NIS2 / critical-entity resilience mandates expose a blind spot: IT security teams monitor corporate networks while physical/drone/IoT RF dependencies sit unmapped and unmonitored.

`OP-ITG-023` is a focused 4–6 week **Audit / Diagnostic** backed by CBa Consult's **Risk Management** Signature Toolkit. Rather than selling specialized defence hardware or full OT systems integration, it gives operations, security, and infrastructure leads a consolidated inventory of RF spectrum exposure, UAS command-and-control dependencies, edge-gateway posture, and a prioritized hardening and anomaly-monitoring checklist.

Key operational triggers driving buyer interest in 2027 include:

- **GNSS / RF Fragility:** Over-reliance on unauthenticated GPS and ISM links without autonomous fallback states when interference occurs.
- **Edge-Gateway Exposure:** Unpatched cellular/LoRaWAN/Wi-Fi edge gateways bridging physical sensors directly into corporate OT/IT networks.
- **Resilience & NIS2 Scrutiny:** Need for continuous telemetry anomaly detection and documented incident-fallback procedures across critical facilities.

## 2. Solution Architecture & Delivery Workflow

Executed at 4–8 hours/week over 4–6 weeks using structured desktop, telemetry, and configuration review:

1. **Weeks 1–2 — RF & Edge Asset Inventory:** Catalog drone/UAS platforms, ISM/cellular/GNSS frequency dependencies, IoT sensor protocols, and edge gateways; map critical single points of RF/GPS failure.
2. **Weeks 3–4 — Posture & Fallback Gap Assessment:** Evaluate authentication, encryption, firmware hygiene, GPS-denied fallback procedures, and interference/jamming resilience against operational continuity and NIS2/MITRE-style resilience baselines.
3. **Weeks 5–6 — Hardening & Monitoring Checklist Handover:** Deliver a prioritized remediation roadmap, anomaly-telemetry monitoring checklist, and clear escalation triggers into `OP-RSK-001` (Risk Management) or `OP-ITG-016` (EARN resilience architecture).

Core tangible deliverables produced across the diagnostic:

- **Site RF & Edge Dependency Map:** Consolidated register of UAS, IoT sensors, frequency bands, and single points of disruption.
- **Posture & Fallback Gap Scorecard:** Risk-ranked assessment of gateway security, link encryption, and degraded-mode continuity.
- **Prioritized Hardening & Monitoring Checklist:** Actionable telemetry-alerting and remediation backlog ready for Ops/IT execution.

## 3. Market Comparables & CBa Consult Differentiation

| Market Comparable | Typical Positioning & Pricing | Structural Gap in 2027 | CBa Consult Differentiation (`OP-ITG-023`) |
| :--- | :--- | :--- | :--- |
| Defence / Counter-UAS Hardware Vendors | €50k–€500k+ RF sensors & mitigation rigs | Hardware-led sales pitch; overkill and unlicensed for routine civil/industrial posture checks | Vendor-neutral €1,500–€5,000 diagnostic focused on operational posture and monitoring gaps |
| Traditional IT Penetration Testers | €10k–€30k corporate network/web pentests | Ignore GNSS/RF dependencies, drone C2 links, and physical-to-edge fallback states | Bridges IT/OT risk governance with UAS/RF continuity and fallback checklists |
| Generic NIS2 Compliance Advisors | €15k+ legal/policy gap reports | Lack practical IoT gateway, telemetry, and RF operational resilience specificity | Concrete site-level RF/IoT posture map + actionable hardening checklist in 4–6 weeks |

## 4. Internal IP & Source Provenance Crosswalk

| Source Artifact | Provenance Status | Core Contribution to `OP-ITG-023` | Disposition for 2027 Offer |
| :--- | :--- | :--- | :--- |
| `Drone Spectrum Analysis IoT devices/Drone Spectrum Analysis IoT Devices.docx` | Assigned ADPA source ([Source-Documents.md](Source-Documents.md)) | Contested electromagnetic environment framing (NATO DIANA 2026 themes: spoofing, GPS jamming, autonomous fallback, telemetry anomaly detection) | Translated from defence/cohort signal brief into civilian/industrial RF & IoT posture checklist |
| Risk Management Signature Toolkit | Internal CBa Signature Toolkit | Threat/vulnerability scoring matrices, continuity checklists, NIS2/resilience risk registers | Core scoring and remediation prioritization engine |
| [Ideation-Spark.md](Ideation-Spark.md) | Workspace Spark | Tier C niche OT diagnostic positioning, €1,500–€5,000 band, `OP-RSK-001` / `OP-ITG-016` wedge | Locks Stage 1b negative boundaries and cross-sell path |

## 5. Explicit Negative Scope Boundaries & Stage 1b Gate

- **No active RF jamming, spoofing, or unlicensed spectrum transmission:** CBa Consult performs passive configuration, architecture, and telemetry-log posture assessments; active RF interference testing is strictly prohibited by EU/national telecom law.
- **No full OT/SCADA systems integration or drone fleet procurement:** Hardware installation, firmware engineering, and physical C-UAS deployments remain with licensed integrators.
- **No binding EU member-state aviation/telecom legal certification:** Regulatory mapping is advisory and excludes formal CAA/BIPT/RDI legal filings.

| Stage 1b Criterion | Status | Readiness Note |
| :--- | :--- | :--- |
| Problem & 2027 Buyer Trigger Defined | Complete | Ops/Security/Infra leads managing mixed civil drone, IoT sensor, and edge-gateway estates |
| Legal & Safety Boundaries Locked | Complete | Explicitly forbids active RF jamming/testing and OT hardware integration builds |
| Stage 2 Hypothesis Formulation | Pending | Evaluate whether to keep standalone or subsume as a diagnostic module under `OP-ITG-016` / `OP-RSK-001` |
