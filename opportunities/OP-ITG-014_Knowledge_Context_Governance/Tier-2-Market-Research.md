---
pmbok_edition: "PMBOK 8"
pmbok_process_group: "Initiating"
pmbok_process: "Opportunity Framing (Stage 1b — Tier 2 Deeper Research)"
lifecycle_stage: "Stage 1b (Ideation / Tier 2 Research)"
opportunity_id: "OP-ITG-014"
inputs:
  - "Ideation-Spark.md"
  - "One_Pager_OP-ITG-014_Knowledge_Context_Governance.md"
  - "Knowledge-Context-Governance-Questionnaire.md"
  - "ADPA assigned sources (Source-Document-Assignment-Register.md)"
  - "Microsoft Work IQ / IQ Platform (Ignite 2026), Gartner AI Context Platforms, Purview / SharePoint governance"
outputs:
  - "Tier-2-Market-Research.md"
date: "2026-11-26"
owner: "Menno Drescher (Director, CBa Consult)"
---

# Tier 2 Market Research — `OP-ITG-014`: Knowledge Intelligence & Context Governance Assessment

**Date:** 2026-11-26  
**Portfolio Position:** Core 5 Active Tier A Flagship · Strategic Value **#2** · Authoritative Delivery Sequence **#3** (Q1–Q2 2027)  
**Scope:** Enterprise context bottleneck, competitive landscape (M365-native vs. enterprise search vs. data fabric), CBa ADPA/ECS/ontology IP audit, wedge packaging with `OP-ITG-013`, target segments, Stage 2 quantification requirements.

---

## 1. Market Demand & Primary-Source Framing (2025–2027)

Enterprises shifted from “which LLM?” to **“which context is trustworthy?”** Copilot, *Work IQ* / IQ Platform, Fabric semantic layers, and agentic workflows all assume **governed, permission-safe, non-contradictory** organizational knowledge. Failure modes are operational, not algorithmic:

| Failure mode | Typical symptom | Business impact |
| --- | --- | --- |
| **Stale / duplicate corpora** | Agents cite superseded SOPs or three conflicting policy versions | Wrong operational decisions; audit findings |
| **Oversharing + flat permissions** | Copilot surfaces HR/payroll/M&A content to unauthorized users | GDPR breach risk; executive trust collapse |
| **No semantic backbone** | Search returns keywords, not governed entities (Customer, Contract, Control) | RAG hallucination; no cross-system traceability |
| **Index–source drift** | Embeddings lag deletes/retentions | “Ghost policies” in AI answers |
| **Unowned knowledge lifecycle** | Abandoned Teams sites indexed forever | Noise amplification as agent count grows |

**Analyst & platform signals (verify before client slides):**

- **Gartner** positions **AI Context Platforms** as a distinct capability layer (connecting data, documents, graphs, and policies for trustworthy agent context) — aligns with inventory validation 🟢🟢🟢.
- **Microsoft Ignite 2026:** *Work IQ* and the broader **IQ Platform** narrative pushes “organizational knowledge as a product” inside M365/Fabric — buyers already budget under CIO/CDO lines.
- **Industry surveys (directional):** Multiple 2024–2025 enterprise AI studies report **roughly half** of initiatives blocked on data/context readiness (not model quality). Treat as **directional** until pinned to a named survey in client materials.

**Regulatory & audit pressure (EU mid-market):**

- **GDPR Art. 17** vs. statutory/WORM retention → **Split-Clock** knowledge lifecycle (pairs with `OP-ITG-010`).
- **EU AI Act** transparency & logging expectations for high-risk use cases → provenance and authoritative source-of-truth matter for defensible AI answers.
- **DORA / NIS2** → evidence of controlled access to operational and policy documentation used in automated decisions.

---

## 2. Competitive Landscape & Mid-Market Gap

| Player | Entry | Strength | Gap CBa closes |
| --- | --- | --- | --- |
| **Microsoft (Purview, SharePoint, Copilot, Fabric IQ)** | Existing M365 estate | Native labels, DLP, Copilot admin controls | **Operating model:** which sites are authoritative, taxonomy/ontology design, RAG golden sets, oversharing remediation **without** a 12-month data platform program |
| **Enterprise search / “work AI” (e.g. Glean-class)** | SaaS overlay | Unified search across SaaS | Does not replace **taxonomy, SoT, lifecycle, or ERP–document entity linking**; enterprise pricing |
| **SI / data fabric boutiques** | Fabric/Lakehouse programs | Deep engineering | **€150k+ / 9–12 months** — overkill for “make SharePoint safe for Copilot” |
| **M365 licensing partners** | Seat rollout + training | Speed to Copilot toggle | Little semantic architecture or conflict resolution |
| **Big Four advisory** | Enterprise data governance | Brand | Independence / cost / timeline for 250–2,500 seat mid-market |

**Core commercial message:** *"Vendors sell Copilot seats and search appliances — CBa Consult delivers the conflict-free context layer: authoritative sources, taxonomy, ontology traceability, and zero-oversharing roadmaps that make agents and Copilot trustworthy."*

---

## 3. Priority Target Segments

1. **M365-heavy mid-market (250–2,500 seats)** — Copilot or internal RAG already live; executive complaints about wrong answers or oversharing.
2. **Hybrid SharePoint + Confluence engineering/professional services** — duplicate SOPs across systems; no SoT.
3. **Regulated services (FS, insurance, healthcare operations)** — Purview labels immature; audit asks “how do you know the AI read the right policy version?”
4. **Combined wedge buyers** — same account buying **`OP-ITG-013` + `OP-ITG-014`** as [Combined-ITG-013-014-Phase-0-Wedge.md](Combined-ITG-013-014-Phase-0-Wedge.md) (agents **plus** context).

**Low-fit:** &lt;250 seats with no Copilot/RAG initiative and no CDO/CIO sponsor; pure Confluence-only without M365 overlap (narrow tooling unless bundle with Atlassian partner).

---

## 4. Honest CBa Consult IP Readiness Audit

See [IP-Readiness-and-ADPA-ECS-Audit.md](IP-Readiness-and-ADPA-ECS-Audit.md). Summary:

| Asset | Client-facing expansion | Role in Pilot #1 | Boundary |
| --- | --- | --- | --- |
| **ADPA** | Advanced Data Processing Automation — document ingestion, classification, lifecycle templates | Accelerates inventory & maturity scoring; reuse data-governance charter templates from assigned ADPA sources | Not a turnkey Purview connector product in a 6-week assessment |
| **ECS** | **Evidence Chain & Context Scoring** — provenance, source reliability, citation-grade context (portfolio usage; align wording per engagement) | Scoring rubric for “trustworthy context” pillars | Thought-leadership depth > production SaaS in Pilot #1 |
| **Ontologies & Knowledge Graphs** | Canonical entities + cross-links (policy → control → system) | Blueprint deliverable | Client stewards maintain Term Store / graph post-readout |
| **Assigned ADPA data templates** (10 docs) | Data governance charter, MDM, metadata, quality plans | Seed [Knowledge-Context-Governance-Questionnaire.md](Knowledge-Context-Governance-Questionnaire.md) evidence lists | Paths on Director machine — [Source-Documents.md](Source-Documents.md) |

**Verified in git today:** 25-control questionnaire, delivery playbook, one-pager, pilot charter draft. **Not yet built:** GTM wave execution, portal intake (optional Phase 2), formal `HYP-2027-017`–`019` test runs.

---

## 5. Two-Tier Commercial Packaging & Bundles

| Tier | Name | Price (anchor) | Duration | Deliverables |
| --- | --- | --- | --- | --- |
| **Tier 1** | Information Quality & Oversharing Baseline | €2,000–€5,000 | 3 weeks | Top-10 P0 scan, 5–10 priority sites, executive readout, Tier 2 proposal |
| **Tier 2** | Full Context Governance Assessment | €3,500–€10,000 | 6–10 weeks | Full scorecard, ontology/taxonomy blueprint, lifecycle playbook, 30/60/90 roadmap |

**Bundle:** **IT Technical & Information Quality Baseline** with `OP-ITG-013` Tier 1 — see combined wedge doc (single executive sponsor, two readouts or one joint readout).

**Recurring:** Graduate to **`OP-ITG-018` MIP** for quarterly oversharing drift, taxonomy stewardship, and RAG golden-set regression.

**Out of scope:** Terabyte-scale manual migration, bespoke vector DB engineering, LLM fine-tuning.

---

## 6. Stage 2 Quantification Requirements (`HYP-2027-017`–`019`)

Before `G4` Director sign-off, quantify via discovery (see [Hypothesis-Register.md](../../docs/registers/Hypothesis-Register.md)):

1. **Oversharing incidence** — % of pilot accounts with P0 “Everyone” libraries indexed by Copilot.
2. **Baseline → full conversion** — Tier 1 → Tier 2 within 60 days.
3. **RAG golden-set baseline** — Can client supply 20–50 golden Q&A in week 1?
4. **Budget owner** — CIO vs. CDO vs. CAIO vs. Compliance for context remediation.
5. **Bundle attach** — Joint `OP-ITG-013` + `014` win rate vs. standalone `014`.

---

## 7. Falsifiable Hypotheses (register IDs)

| ID | Statement (short) |
| --- | --- |
| `HYP-2027-017` | ≥6/10 CIO/CDO/CAIO confirm stale/conflicting or overshared context blocked Copilot/RAG |
| `HYP-2027-018` | ≥1 paid Tier 1 or Tier 2 within 8 weeks of discovery |
| `HYP-2027-019` | Methodology deliverable pack built ≤15 hrs internal; Pilot #1 ≤100 hrs solo |

*(Legacy labels `HYP-2027-014A/B` in early drafts — superseded by register IDs above.)*

---

## 8. Sources & Further Reading

- Microsoft documentation: **Microsoft Purview**, SharePoint advanced management, Copilot data boundaries, **Fabric / IQ Platform** (Ignite 2026 announcements — pin exact URLs per release at GTM time).
- Gartner: **AI Context Platforms** category and data-readiness for agentic AI (client slides should cite retrieved report IDs).
- Portfolio: [market-analysis-2027.md](../../market-analysis-2027.md), [Tier_A_Executive_Summary_2027.md](../../Tier_A_Executive_Summary_2027.md) §3.
- ADPA assigned list: [Source-Documents.md](Source-Documents.md) · register `OP-ITG-014` cluster (10 templates).