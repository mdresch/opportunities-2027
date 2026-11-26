import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import type {
  ArtifactFile,
  BaselineFeedback,
  ClientCatalogItem,
  ClientFlagshipService,
  ClientPortfolioData,
  ClientReportEntry,
  CoreDocumentEntry,
  CoreFlagship,
  DeliveryChannelStatus,
  EmailDeliveryStatus,
  GraduatedRepo,
  HtmlReportEntry,
  Hypothesis,
  Opportunity,
  PortfolioData,
  PortfolioTier,
  ScopingInquiryPayload,
  ScopingInquiryResponse,
  ValidationLevel,
  WaveItem,
} from './src/types';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD =
  process.env.NODE_ENV === 'production' ||
  (process.env.NODE_ENV !== 'development' &&
    fs.existsSync(path.join(DIST_DIR, 'index.html')));

const TIER_A_IDS = new Set([
  'OP-FIN-009',
  'OP-ITG-014',
  'OP-RSK-004',
  'OP-ITG-013',
  'OP-ITG-018',
]);

const TIER_B_IDS = new Set([
  'OP-HR-009',
  'OP-HR-010',
  'OP-CX-002',
  'OP-ITG-010',
  'OP-ITG-011',
  'OP-ITG-012',
  'OP-DTX-005',
  'OP-ITG-017',
  'OP-FIN-010',
  'OP-ITG-015',
  'OP-ITG-016',
  'OP-STR-004',
  'OP-STR-005',
  'OP-HR-002',
  'OP-OPS-003',
]);

const TIER_D_IDS = new Set(['OP-ITG-009', 'OP-FIN-011', 'OP-RSK-005']);

const HTML_REPORTS: HtmlReportEntry[] = [
  {
    slug: 'client-executive-summary',
    title: 'Opportunities 2027 — Executive Summary (Client-Facing)',
    subtitle:
      'External executive brief: Truth Production Governance, flagship engagements, MIP retainers & 2027 scoping guide',
    sourcePath: 'docs/reports/Opportunities_2027_Client_Executive_Summary.html',
    url: '/reports/client-executive-summary',
    audience: 'client',
  },
  {
    slug: 'client-priority-report',
    title: 'Executive Summary — Priority Report (Client-Facing)',
    subtitle:
      'External priority roadmap by executive mandate, 2027–2028 regulatory triggers & 16 practice areas',
    sourcePath: 'docs/reports/Opportunities_2027_Client_Priority_Report.html',
    url: '/reports/client-priority-report',
    audience: 'client',
  },
  {
    slug: 'op-itg-013-benchmark-cta',
    title: 'OP-ITG-013 — AI Agent Governance Benchmark (CTA One-Pager)',
    subtitle:
      'Client-facing 1-page executive flyer promoting the 5-min P0 Triage & 40-control 8-pillar self-assessment benchmark',
    sourcePath: 'docs/reports/OP-ITG-013_Agent_Governance_Benchmark_CTA_One_Pager.html',
    url: '/reports/op-itg-013-benchmark-cta',
    audience: 'client',
  },
  {
    slug: 'adpa-risk-scenario-brief',
    title: 'ADPA Risk Management & Scenario Building (Market Development Brief)',
    subtitle:
      '5-step foresight-to-risk approach: PESTLE drivers, 2027–2030 Axes of Uncertainty, Futures Table & backcasting wedge',
    sourcePath: 'docs/reports/ADPA_Risk_Management_Scenario_Building_2027.html',
    url: '/reports/adpa-risk-scenario-brief',
    audience: 'client',
    referencePdfUrl: '/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf',
    referencePdfLabel: 'Scenario Planning Guide (PDF)',
  },
  {
    slug: 'op-itg-017-mxc-one-pager',
    title: 'OP-ITG-017 — MXC Hyper-V <500ms JIT Scale-to-Zero (Executive One-Pager)',
    subtitle:
      'Publication-ready 1-page A4 product brief with <300ms wake benchmarks, sterile .avhdx reset & 6-level Azure Standby Pool matrix',
    sourcePath:
      'opportunities/OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero/MXC_HyperV_JIT_Scale_to_Zero_One_Pager.html',
    url: '/reports/op-itg-017-mxc-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-fin-009-continuous-close-one-pager',
    title: 'OP-FIN-009 — Continuous Close & Real-Time Reconciliation Bridge (One-Pager)',
    subtitle:
      '23rd payroll close to post-3rd attested reporting loop, 10 automated accrual guardrails, IFRS 18 MPM shield & 4-4-5 tie-outs',
    sourcePath: 'docs/reports/OP-FIN-009_Continuous_Close_One_Pager.html',
    url: '/reports/op-fin-009-continuous-close-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-itg-013-agent-governance-one-pager',
    title: 'OP-ITG-013 — Enterprise AI Agent Governance Assessment (Service One-Pager)',
    subtitle:
      '8-pillar 40-point maturity audit, Entra Agent ID / NHI kill-switch architecture, Agent 365 FinOps & two-tier commercial packaging',
    sourcePath: 'docs/reports/OP-ITG-013_Enterprise_AI_Agent_Governance_One_Pager.html',
    url: '/reports/op-itg-013-agent-governance-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-itg-014-context-governance-one-pager',
    title: 'OP-ITG-014 — Knowledge Intelligence & Context Governance (One-Pager)',
    subtitle:
      'RAG & Work IQ readiness, ADPA/ECS taxonomy & ontology architecture, lifecycle provenance & zero-oversharing M365 roadmap',
    sourcePath: 'docs/reports/OP-ITG-014_Knowledge_Context_Governance_One_Pager.html',
    url: '/reports/op-itg-014-context-governance-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-rsk-004-ai-certification-one-pager',
    title: 'OP-RSK-004 — AI Governance Certification Readiness ("SOC 2 for AI")',
    subtitle:
      'Unified ISO/IEC 42001, NIST AI RMF & EU AI Act Annex III crosswalk, AI Purpose Clause pack & pre-Dec 2027 audit-evidence plan',
    sourcePath: 'docs/reports/OP-RSK-004_AI_Governance_Certification_One_Pager.html',
    url: '/reports/op-rsk-004-ai-certification-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-itg-018-mip-one-pager',
    title: 'OP-ITG-018 — Managed Intelligence Provider / Professional (MIP One-Pager)',
    subtitle:
      'MSP vs. MSSP vs. MIP positioning, 5 Intelligence Pillars & predictable Essentials / Core / Fractional CAIO monthly retainer tiers',
    sourcePath: 'docs/reports/OP-ITG-018_Managed_Intelligence_Provider_MIP_One_Pager.html',
    url: '/reports/op-itg-018-mip-one-pager',
    audience: 'client',
  },
  {
    slug: 'op-ops-001-quote-to-onboarding-one-pager',
    title: 'OP-OPS-001 → OP-CX-001 — Quote-to-Delivery & 90-Day Onboarding Sprint',
    subtitle:
      '4-week fixed-scope sprint eliminating Sales-to-Delivery handoff friction, billing leaks & Day 1–90 NRR drop-offs inside existing tools',
    sourcePath: 'docs/reports/OP-OPS-001_CX-001_Quote_to_Onboarding_One_Pager.html',
    url: '/reports/op-ops-001-quote-to-onboarding-one-pager',
    audience: 'client',
  },
  {
    slug: 'exec-brief-ifrs-18-close-controls',
    title: 'Executive Brief — IFRS 18 Close, Cost-of-Sales & KPI Control Checklist (2027)',
    subtitle:
      'Five structural IFRS 18 monthly close changes, ¶117 audited MPM watermarking, ¶78–83 CoS-by-nature tie-outs & 6-point CFO checklist',
    sourcePath: 'docs/reports/Executive_Brief_IFRS_18_Close_and_KPI_Controls_2027.html',
    url: '/reports/exec-brief-ifrs-18-close-controls',
    audience: 'client',
  },
  {
    slug: 'exec-brief-accounting-ai-pricing',
    title: 'Executive Brief — Accounting, Audit & Future AI Pricing Strategies (2027–2030)',
    subtitle:
      '5-model GAAP/IFRS audit matrix, Subscription Retention Trap, SEC/EU AI Act WORM mandates & 4 winning 2027–2030 AI pricing models',
    sourcePath:
      'docs/reports/Executive_Brief_Accounting_Audit_and_Future_AI_Pricing_Strategies_2027_2030.html',
    url: '/reports/exec-brief-accounting-ai-pricing',
    audience: 'client',
  },
  {
    slug: 'exec-brief-international-expansion',
    title: 'Executive Brief — International Expansion Scaling Limitations: US & EU (2026–2027)',
    subtitle:
      'US State→Federal gates (FedRAMP/CMMC/nexus) vs. Pan-EU friction (44%/110% IMF Draghi/Letta), EOR→Subsidiary & Transfer Pricing checklist',
    sourcePath:
      'docs/reports/Executive_Brief_International_Expansion_Scaling_Limitations_2026_2027.html',
    url: '/reports/exec-brief-international-expansion',
    audience: 'client',
  },
  {
    slug: 'exec-brief-signature-methodology',
    title: 'Executive Brief — Signature Methodology Framework & Value Proposition (2027–2030)',
    subtitle:
      '6-Stage Truth Production Governance loop, 5 strategic assets, complete 18-toolkit crosswalk & zero-capital commercial delivery funnel',
    sourcePath: 'docs/reports/Executive_Brief_Signature_Methodology_Value_Proposition_2027.html',
    url: '/reports/exec-brief-signature-methodology',
    audience: 'client',
  },
  {
    slug: 'executive-summary',
    title: 'Opportunities 2027 — Executive Summary',
    subtitle: 'Board-ready portfolio brief, Core 5 flagships, and Tailored Hybrid SIDPA funnel',
    sourcePath: 'docs/reports/Opportunities_2027_Executive_Summary.html',
    url: '/reports/executive-summary',
    pdfSourcePath: 'docs/reports/Opportunities_2027_Executive_Summary.pdf',
    pdfUrl: '/reports/executive-summary/pdf',
    audience: 'internal',
  },
  {
    slug: 'priority-report',
    title: 'Opportunities 2027 — Priority Report',
    subtitle: 'Strategic-value priority index, execution waves, and evidence coverage',
    sourcePath: 'docs/reports/Opportunities_2027_Priority_Report.html',
    url: '/reports/priority-report',
    pdfSourcePath: 'docs/reports/Opportunities_2027_Priority_Report.pdf',
    pdfUrl: '/reports/priority-report/pdf',
    audience: 'internal',
  },
  {
    slug: 'continuous-close-gantt',
    title: 'OP-FIN-009 — Continuous Close Monthly Gantt',
    subtitle: '23rd payroll close to post-3rd reporting monthly cadence timeline',
    sourcePath: 'opportunities/OP-FIN-009_Continuous_Close/Continuous_Close_Monthly_Gantt_Chart.html',
    url: '/reports/continuous-close-gantt',
    pdfSourcePath:
      'opportunities/OP-FIN-009_Continuous_Close/Continuous_Close_Monthly_Gantt_Chart.pdf',
    pdfUrl: '/reports/continuous-close-gantt/pdf',
    audience: 'internal',
  },
  {
    slug: 'design-reference',
    title: 'Opportunities 2027 — Layout & Colour Reference',
    subtitle: 'CBa Consult visual specification: deep navy, signal teal, mint, and slate',
    sourcePath: '.pandaos/designs/ab84d569d9a45662/v2.html',
    url: '/reports/design-reference',
    audience: 'internal',
  },
];

const CLIENT_REPORTS: ClientReportEntry[] = [
  {
    slug: 'client-executive-summary',
    title: 'Opportunities 2027 — Executive Summary',
    subtitle:
      'Executive overview of CBa Consult’s conflict-free 2027 advisory portfolio, five strategic assets, flagship engagements, Managed Intelligence retainers, and scoping model.',
    editionLabel: 'Client Edition · 26 Nov 2026',
    pagesLabel: 'Cover + 3 A4 Pages',
    url: '/api/client-reports/client-executive-summary',
    category: 'Executive Reports',
    featuredOnHome: true,
    audience: 'Boards, CEOs, CFOs, CIOs & PE Operating Partners',
    keyHighlights: [
      'Five strategic assets & 6-stage Truth Production Governance operating model',
      'Core flagship engagement anchors & Managed Intelligence (MIP) retainer overview',
      '100% conflict-free pre-assurance positioning alongside statutory auditors',
    ],
  },
  {
    slug: 'client-priority-report',
    title: 'Executive Summary — Priority Report',
    subtitle:
      'Decision-oriented client roadmap ranking 2027–2028 engagements by executive mandate, regulatory deadlines, fastest proof wedges, and 16 consulting practice areas.',
    editionLabel: 'Client Priority Edition · 26 Nov 2026',
    pagesLabel: 'Cover + 4 A4 Pages',
    url: '/api/client-reports/client-priority-report',
    category: 'Executive Reports',
    featuredOnHome: true,
    audience: 'Executive Committees, CFOs, CIOs, CISOs & Transformation Leads',
    keyHighlights: [
      'Prioritizes IFRS 18 (Jan 2027) and EU AI Act Annex III (Dec 2027) readiness windows',
      'Maps fastest 2–4 week entry wedges directly into 6–10 week Tier A flagships',
      'Covers all 16 Forbes/Statista functional areas plus Pillar 17 Autonomous Systems',
    ],
  },
  {
    slug: 'op-itg-013-benchmark-cta',
    title: 'OP-ITG-013 — AI Agent Governance Benchmark',
    subtitle:
      'Executive Call-to-Action one-pager introducing the 5-minute P0 Red-Flag Triage, 40-control 8-pillar maturity audit, instant PDF scorecard, and fixed-scope follow-on tiers.',
    editionLabel: 'CTA One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-itg-013-benchmark-cta',
    category: 'Flagship One-Pagers',
    featuredOnHome: true,
    opportunityId: 'OP-ITG-013',
    audience: 'CIOs, CISOs, Chief AI Officers & Risk Leaders',
    duration: '5-min triage · 2–10 wk tiers',
    investmentAnchor: 'Free Diagnostic → €2.5k–€18k+',
    keyHighlights: [
      'Interactive 5-minute P0 Red-Flag Triage + full 40-control 8-pillar self-assessment',
      'Instant downloadable executive PDF scorecard mapped to EU AI Act & ISO 42001',
    ],
  },
  {
    slug: 'adpa-risk-scenario-brief',
    title: 'ADPA Risk Management & Scenario Building',
    subtitle:
      'Market development brief integrating 5-step scenario planning (PESTLE scanning, Axes of Uncertainty, Futures Table & backcasting) into conflict-free 2027–2030 risk governance.',
    editionLabel: 'Market Development Brief · 26 Nov 2026',
    pagesLabel: '2 A4 Pages',
    url: '/api/client-reports/adpa-risk-scenario-brief',
    category: 'Market Development',
    featuredOnHome: true,
    opportunityId: 'OP-ITG-019',
    audience: 'Boards, Strategy Leads, Chief Risk Officers & Enterprise Architects',
    duration: '3–6 week scenario sprint',
    investmentAnchor: '€2,500 – €8,500',
    keyHighlights: [
      'Operationalizes 5-step PESTLE & Axes of Uncertainty foresight inside ADPA',
      'Includes downloadable companion Scenario Planning Step-by-Step Guide (PDF)',
    ],
    referencePdfUrl: '/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf',
    referencePdfLabel: 'Scenario Planning Guide (PDF)',
  },
  {
    slug: 'op-fin-009-continuous-close-one-pager',
    title: 'OP-FIN-009 — Continuous Close & Real-Time Reconciliation Bridge',
    subtitle:
      'Bridges your 23rd payroll close to post-3rd attested GAAP/IFRS/IFRS 18 reporting using 10 automated accrual, 4-4-5, and CoS guardrails inside your existing ERP and BI stack.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-fin-009-continuous-close-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-FIN-009',
    audience: 'CFOs, Corporate Controllers & Finance Leaders',
    duration: '6–8 weeks fixed-scope pilot',
    investmentAnchor: '€1,500 – €5,000',
    keyHighlights: [
      '3-phase exception-based close loop (Days 1–22 → 23rd Payroll → Days 1–3+ Close)',
      '10 built-in guardrails (FIN-CC-01–10): Day-1 auto-reversals, 4-4-5 proration & €0.00 HRIS tie-out',
      'Zero new close software licenses required; embeds IFRS 18 ¶117 & ¶78–83 watermarking',
    ],
  },
  {
    slug: 'op-itg-013-agent-governance-one-pager',
    title: 'OP-ITG-013 — Enterprise AI Agent Governance Assessment',
    subtitle:
      'Conflict-free, fixed-scope operating model, 12-field Enterprise Agent Inventory, Entra Agent ID & SoD blueprint, and Agent 365 FinOps guardrails ahead of Dec 2, 2027 EU AI Act deadlines.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-itg-013-agent-governance-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-ITG-013',
    audience: 'CIOs, CISOs & Chief AI Officers (250–2,500+ seats)',
    duration: 'Tier 1: 2–3 wks · Tier 2: 6–10 wks',
    investmentAnchor: '€2,500 – €18,000+',
    keyHighlights: [
      'Full 8-pillar, 40-point maturity audit covering discovery, NHI kill-switch & FinOps caps',
      'Aligns Microsoft Agent 365 / Entra Agent ID with EU AI Act Annex III, DORA & SOX 404',
      'Clear conflict-free RACI boundary with client IT/MSP, 24/7 MSSP & statutory auditors',
    ],
  },
  {
    slug: 'op-itg-014-context-governance-one-pager',
    title: 'OP-ITG-014 — Knowledge Intelligence & Context Governance',
    subtitle:
      'Transforms sprawling SharePoint, Teams, M365, and Confluence libraries into a governed, zero-oversharing Context Layer backed by ADPA, ECS, and Enterprise Knowledge Graphs.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-itg-014-context-governance-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-ITG-014',
    audience: 'CIOs, CDOs, Chief AI Officers & Enterprise Architects',
    duration: '6–10 weeks (or 3-wk baseline)',
    investmentAnchor: '€3,500 – €10,000',
    keyHighlights: [
      'Assesses RAG & Work IQ readiness, taxonomy/ontology maturity, lifecycle & permission hygiene',
      'Eliminates Copilot oversharing and stale-policy hallucinations across M365 & Confluence',
      'Delivers a 30/60/90-day roadmap enabling OP-DTX-005 and OP-ITG-013 agent scale-up',
    ],
  },
  {
    slug: 'op-rsk-004-ai-certification-one-pager',
    title: 'OP-RSK-004 — AI Governance Certification Readiness ("SOC 2 for AI")',
    subtitle:
      'Map your AI inventory, purpose clauses, and technical controls once across ISO/IEC 42001, NIST AI RMF, and the EU AI Act ahead of December 2, 2027 Annex III enforcement.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-rsk-004-ai-certification-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-RSK-004',
    audience: 'CISOs, Chief Risk/Compliance Officers, General Counsel & DPOs',
    duration: '6–10 weeks fixed scope',
    investmentAnchor: '€4,000 – €12,000+',
    keyHighlights: [
      'Unified 3-framework crosswalk eliminating duplicated ISO 42001 / NIST / EU AI Act audits',
      'Includes Unified AI System Register, Risk Map, AI Purpose Clause & Audit-Evidence Playbook',
      '100% conflict-free pre-certification readiness ahead of accredited registrar assessment',
    ],
  },
  {
    slug: 'op-itg-018-mip-one-pager',
    title: 'OP-ITG-018 — Managed Intelligence Provider / Professional (MIP)',
    subtitle:
      'Operates above your MSP and MSSP as an ongoing, conflict-free Intelligence Operations retainer governing AI agents, RAG hygiene, compliance evidence, sovereign runtimes, and Board ROI.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-itg-018-mip-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-ITG-018',
    audience: 'CEOs, CIOs, CFOs, CISOs & PE Operating Partners',
    duration: 'Ongoing monthly retainer',
    investmentAnchor: '€2,500 – €12,000+ / mo',
    keyHighlights: [
      'Closes the 2027 governance gap between IT infrastructure (MSP) and 24/7 SOC (MSSP)',
      'Covers 5 Intelligence Pillars across Essentials, Core, and Enterprise (Fractional CAIO) tiers',
      'Avoids €250k–€500k+/yr full-time CAIO overhead with zero statutory auditor conflict',
    ],
  },
  {
    slug: 'op-ops-001-quote-to-onboarding-one-pager',
    title: 'OP-OPS-001 → OP-CX-001 — Quote-to-Delivery & 90-Day Onboarding Sprint',
    subtitle:
      'Fixes the Quote → Contract → Handover → Delivery → Onboarding → Adoption chain in one focused sprint to stop early churn, missed billing, and Day 1–90 NRR leakage.',
    editionLabel: 'Flagship One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-ops-001-quote-to-onboarding-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-OPS-001',
    audience: 'Founders, COOs, CROs & Customer Success Leaders (B2B)',
    duration: '3–5 weeks fixed-scope sprint',
    investmentAnchor: '€1,000 – €3,500',
    keyHighlights: [
      'Traces 3–5 live closed-won deals end-to-end across Sales, Legal, Delivery & Finance',
      'Balances automated intake gates with high-trust human checkpoints (UniCorn COAS aligned)',
      'Delivered inside existing CRM/PM/billing tools; €500–€1.5k founder-led entry wedge available',
    ],
  },
  {
    slug: 'op-itg-017-mxc-one-pager',
    title: 'OP-ITG-017 — MXC Hyper-V <500ms JIT Scale-to-Zero',
    subtitle:
      'Publication-ready executive one-pager detailing Type-1 Hyper-V <300ms wake benchmarks, 0.0% idle CPU density, sterile .avhdx resets, and the 6-level Azure VMSS Standby Pool scale-out ladder.',
    editionLabel: 'Product One-Pager · 26 Nov 2026',
    pagesLabel: '1 A4 Page',
    url: '/api/client-reports/op-itg-017-mxc-one-pager',
    category: 'Flagship One-Pagers',
    featuredOnHome: false,
    opportunityId: 'OP-ITG-017',
    audience: 'CTOs, CISOs, Platform Engineering & Sovereign Cloud Architects',
    duration: '4–8 week sovereign pilot',
    investmentAnchor: '€2,500 – €15,000+',
    keyHighlights: [
      'Type-1 Hyper-V isolation with <300ms warm wake, 0.0% idle CPU & sterile .avhdx reset',
      'Includes the 6-Level Azure VMSS Standby Pool Scale-Out & Boundary Matrix (L1–L6)',
    ],
  },
  {
    slug: 'exec-brief-ifrs-18-close-controls',
    title: 'IFRS 18 Close, Cost-of-Sales & KPI Control Checklist (2027)',
    subtitle:
      'CFO & Controller brief covering the 5 structural IFRS 18 monthly close changes (effective Jan 1, 2027), ¶117 audited MPM watermarking, ¶78–83 CoS-by-nature tie-outs, dual calendars, and a 6-point self-check.',
    editionLabel: 'Executive Brief · Nov 2026',
    pagesLabel: '2 A4 Pages',
    url: '/api/client-reports/exec-brief-ifrs-18-close-controls',
    category: 'Executive Briefs',
    featuredOnHome: false,
    opportunityId: 'OP-FIN-009',
    audience: 'CFOs, Corporate Controllers & Audit Committees',
    keyHighlights: [
      'EU-endorsed Feb 13, 2026; mandatory Jan 1, 2027 with 2026 comparative shadow year',
      'Mandatory SoD separation between GL Close Approver and MPM Definition / Tax-NCI Owner',
      'Actionable 6-point CFO & Controller Readiness Self-Check ahead of Q1 2027 close',
    ],
  },
  {
    slug: 'exec-brief-accounting-ai-pricing',
    title: 'Accounting, Audit, Retention & Future AI Pricing Strategies (2027–2030)',
    subtitle:
      'Compares GAAP/IFRS and external audit overhead across Build, Lease, Subscription, Tokens & Services — exposing the Subscription Retention Trap and defining 4 winning 2027–2030 AI pricing archetypes.',
    editionLabel: 'Executive Brief · Nov 2026',
    pagesLabel: '2 A4 Pages',
    url: '/api/client-reports/exec-brief-accounting-ai-pricing',
    category: 'Executive Briefs',
    featuredOnHome: false,
    opportunityId: 'OP-FIN-012',
    audience: 'CFOs, Controllers, CIOs, CISOs & Audit Committees',
    keyHighlights: [
      'Full 5-model US GAAP / IFRS & external audit overhead matrix (IAS 38, IFRS 16, IFRS 15/18)',
      'Maps EU AI Act (6 mo / 10 yr), SEC 17a-4 (3–6 yr) & SOX/Tax (7–15 yr) WORM retention clocks',
      'Applies 30-year telecom/cable/satellite pricing lessons to 4 winning AI monetization models',
    ],
  },
  {
    slug: 'exec-brief-international-expansion',
    title: 'International Expansion Scaling Limitations: U.S. & Europe (2026–2027)',
    subtitle:
      'Analyzes transatlantic scaling walls — U.S. tax nexus, 20+ state privacy/AI patchwork & FedRAMP/CMMC vs. Pan-EU 44%/110% internal friction (IMF/Draghi/Letta) — with a 4-phase multi-entity checklist.',
    editionLabel: 'Executive Brief · Nov 2026',
    pagesLabel: '2 A4 Pages',
    url: '/api/client-reports/exec-brief-international-expansion',
    category: 'Executive Briefs',
    featuredOnHome: false,
    opportunityId: 'OP-STR-004',
    audience: 'CEOs, CFOs, CIOs, CISOs & PE Operating Partners',
    keyHighlights: [
      'Quantifies US FedRAMP 20x / CMMC L2 ($100k–$400k+) vs. EU 44% goods / 110% services friction',
      '4-phase cross-border checklist: EOR→Subsidiary tipping point, Multi-Entity ERP, TP & Sovereignty',
      'Maps every cross-border bottleneck directly to fixed-scope CBa Consult 2027 offerings',
    ],
  },
  {
    slug: 'exec-brief-signature-methodology',
    title: 'CBa Consult Signature Methodology Framework & Value Proposition (2027–2030)',
    subtitle:
      'Defines CBa Consult’s 6-Stage Truth Production Governance loop, five strategic assets, complete 18-toolkit portfolio crosswalk, 16+1 functional areas, and zero-capital commercial delivery funnel.',
    editionLabel: 'Executive Brief · v2.0 (2027–2030)',
    pagesLabel: '2 A4 Pages',
    url: '/api/client-reports/exec-brief-signature-methodology',
    category: 'Executive Briefs',
    featuredOnHome: false,
    audience: 'Boards, Executive Sponsors, Enterprise Buyers & PE Operating Partners',
    keyHighlights: [
      '6-Stage Truth Production Governance loop: Observe → Measure → Govern → Trace → Certify → Improve',
      'Complete crosswalk mapping all 18 Signature Toolkits into 2027–2030 Tier A–D opportunities',
      'Phase 0 Entry Wedge → Phase 1 Tier A Flagship → Phase 2 Compounding IP / MIP funnel',
    ],
  },
];

const CORE_DOCUMENTS: CoreDocumentEntry[] = [
  {
    title: 'Tier A Executive Summary (2027–2030)',
    category: 'Executive Brief',
    path: 'Tier_A_Executive_Summary_2027.md',
    description: 'Core 5 Active Flagships, Truth Production Governance thesis, and Q1–Q4 execution sequence.',
  },
  {
    title: 'Portfolio Status Register',
    category: 'Governance Register',
    path: 'docs/registers/Portfolio-Status-Register.md',
    description: 'Live orientation snapshot, Q1–Q4 priority waves, Track B rollups, and open BFI items.',
  },
  {
    title: 'Wave 1 Execution Playbook',
    category: 'Execution Playbook',
    path: 'docs/registers/Wave-1-Execution-Playbook.md',
    description: 'Parallel Q1 2027 execution tracks (OP-OPS-001 → OP-CX-001 & OP-FIN-009) and G4 decision rule.',
  },
  {
    title: 'Hypothesis Register (Stage 2)',
    category: 'Governance Register',
    path: 'docs/registers/Hypothesis-Register.md',
    description: 'Falsifiable desirability, viability, feasibility, and scalability hypotheses across Waves 1–3.',
  },
  {
    title: 'Market Analysis 2027',
    category: 'Market Research',
    path: 'market-analysis-2027.md',
    description: '2027 market signals, regulatory deadlines, and sourced validation ratings across all pillars.',
  },
  {
    title: 'Tailored Hybrid SIDPA Governance',
    category: 'Governance Model',
    path: 'docs/governance/Tailored-Hybrid-SIDPA-Governance.md',
    description: 'Stages 1–4 lightweight portfolio funnel and Track A / Track B graduation criteria.',
  },
  {
    title: 'One-Pager: Flagship Opportunities 2027',
    category: 'Client Brief',
    path: 'docs/reports/One_Pager_Flagship_Opportunities_2027.md',
    description: 'Unified client-facing brief spanning all Core 5 Tier A flagship offerings.',
  },
  {
    title: 'One-Pager: Quote-to-Onboarding Wedge',
    category: 'Client Brief',
    path: 'docs/reports/One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md',
    description: 'Priority #1 fast-proof cross-opportunity wedge combining OP-OPS-001 and OP-CX-001.',
  },
  {
    title: 'OP-ITG-013 Benchmark — LinkedIn Post & Outreach Kit',
    category: 'Promotional Copy',
    path: 'opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/OP-ITG-013_Benchmark_LinkedIn_Post.md',
    description: 'Ready-to-publish CIO/CISO LinkedIn launch post, first comment, CFO FinOps variant & 10-prospect DM copy.',
  },
  {
    title: 'ADPA Risk Management & Scenario Building — Market Development Playbook',
    category: 'Market Development',
    path: 'docs/research/ADPA-Risk-Management-Scenario-Building-Market-Development-2027.md',
    description:
      'Applies Futures Platform 5-step scenario planning (Axes of Uncertainty, 6-driver Futures Table & backcasting) across OP-ITG-019, OP-RSK-001–007 & MIP.',
    referencePdfUrl: '/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf',
    referencePdfLabel: 'Scenario Planning Guide (PDF)',
  },
  {
    title: 'ADPA Risk & Scenario Module Spec (OP-ITG-019)',
    category: 'Market Development',
    path: 'opportunities/OP-ITG-019_ADPA_Platform_Database_Reimplementation/ADPA-Risk-Management-Scenario-Module.md',
    description:
      'PostgreSQL schema & workflow specification embedding PESTLE drivers, scenario narratives, and backcast indicators inside ADPA.',
    referencePdfUrl: '/assets/aistudio/ScenarioPlanning-2026pdf_f094711b.pdf',
    referencePdfLabel: 'Scenario Planning Guide (PDF)',
  },
  {
    title: 'Ideation Template & 2027 Thesis',
    category: 'Methodology',
    path: 'ideation-template.md',
    description: 'Methodology, goals, 7 pivotal questions, and zero-working-capital reinvestment loop.',
  },
  {
    title: 'Lessons Learned Register',
    category: 'Governance Register',
    path: 'docs/registers/Lessons-Learned-Register.md',
    description: 'Append-only execution lessons for quarterly portfolio reviews.',
  },
];

function stripMarkdown(input: string): string {
  return input
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\\(\$)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitMarkdownRow(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) return [];
  const inner = trimmed.replace(/^\|/, '').replace(/\|$/, '');
  return inner.split('|').map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function classifyTier(id: string, size: string): PortfolioTier {
  if (TIER_A_IDS.has(id)) return 'Tier A';
  if (TIER_B_IDS.has(id)) return 'Tier B';
  if (TIER_D_IDS.has(id)) return 'Tier D';
  if (
    id.startsWith('OP-MKT-') ||
    id.startsWith('OP-SLS-') ||
    id.startsWith('OP-X-') ||
    size.toLowerCase().includes('small')
  ) {
    return 'Tier C';
  }
  return 'Backlog';
}

function detectValidationLevel(text: string): ValidationLevel {
  if (text.includes('🟢🟢')) return 'strong';
  if (text.includes('🟢')) return 'validated';
  if (text.includes('🟡')) return 'emerging';
  return 'unvalidated';
}

function formatArtifactLabel(fileName: string): string {
  const base = fileName.replace(/\.(md|html|docx|pdf)$/i, '');
  if (base === 'Ideation-Spark') return 'Ideation Spark';
  if (base === 'BD-Quick-Reference') return 'BD Quick Reference';
  if (base === 'Pilot-Charter') return 'Pilot Charter';
  if (base === 'Tier-2-Market-Research') return 'Tier 2 Market Research';
  if (base === 'Delivery-Playbook-and-SOW') return 'Delivery Playbook & SOW';
  if (base.startsWith('One_Pager_')) return 'Client One-Pager';
  return base.replace(/[-_]+/g, ' ');
}

function scanOpportunityFolders(): Map<string, { folder: string; artifacts: ArtifactFile[] }> {
  const map = new Map<string, { folder: string; artifacts: ArtifactFile[] }>();
  const oppDir = path.join(ROOT_DIR, 'opportunities');
  if (!fs.existsSync(oppDir)) return map;

  const entries = fs.readdirSync(oppDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const match = entry.name.match(/^(OP-[A-Z]+-\d+)/);
    if (!match) continue;
    const id = match[1];
    const folderRel = `opportunities/${entry.name}`;
    const fullFolder = path.join(oppDir, entry.name);
    const files = fs
      .readdirSync(fullFolder, { withFileTypes: true })
      .filter((f) => f.isFile())
      .map((f) => {
        const ext = path.extname(f.name).toLowerCase();
        const relPath = `${folderRel}/${f.name}`;
        const reportMatch = HTML_REPORTS.find((r) => r.sourcePath === relPath);
        return {
          name: f.name,
          label: formatArtifactLabel(f.name),
          path: relPath,
          ext,
          isMarkdown: ext === '.md',
          isHtml: ext === '.html',
          reportSlug: reportMatch?.slug,
        };
      })
      .sort((a, b) => {
        const order = (x: ArtifactFile) => {
          if (x.name === 'Ideation-Spark.md') return 0;
          if (x.name.startsWith('One_Pager_') && x.isMarkdown) return 1;
          if (x.name === 'Pilot-Charter.md') return 2;
          if (x.name === 'Tier-2-Market-Research.md') return 3;
          if (x.name === 'Delivery-Playbook-and-SOW.md') return 4;
          if (x.name === 'BD-Quick-Reference.md') return 5;
          if (x.isMarkdown) return 6;
          if (x.isHtml) return 7;
          return 8;
        };
        return order(a) - order(b) || a.name.localeCompare(b.name);
      });

    map.set(id, { folder: folderRel, artifacts: files });
  }
  return map;
}

function parseInventory(folderMap: Map<string, { folder: string; artifacts: ArtifactFile[] }>): Opportunity[] {
  const filePath = path.join(ROOT_DIR, 'inventory-of-ideas.md');
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const opportunities: Opportunity[] = [];
  let currentPillar = '';
  let currentPillarNumber = 0;
  let headers: string[] = [];
  let inOpportunitySection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const numberedMatch = line.match(/^##\s+(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      const num = Number(numberedMatch[1]);
      if (num >= 1 && num <= 16) {
        currentPillarNumber = num;
        currentPillar = stripMarkdown(numberedMatch[2]).replace(/\s*\(.*\)\s*$/, '').trim();
        inOpportunitySection = true;
        headers = [];
        continue;
      } else {
        inOpportunitySection = false;
        headers = [];
        continue;
      }
    }

    if (line.startsWith('## Cross-Pillar')) {
      currentPillarNumber = 17;
      currentPillar = 'Cross-Pillar Ecosystem';
      inOpportunitySection = true;
      headers = [];
      continue;
    }

    if (line.startsWith('## ')) {
      inOpportunitySection = false;
      headers = [];
      continue;
    }

    if (!inOpportunitySection) continue;

    if (line.trim().startsWith('|')) {
      const cells = splitMarkdownRow(line);
      if (isSeparatorRow(cells)) continue;

      const firstCellClean = stripMarkdown(cells[0] || '');
      if (firstCellClean === 'ID') {
        headers = cells.map((h) => stripMarkdown(h).toLowerCase());
        continue;
      }

      if (headers.length > 0 && /^OP-[A-Z]+-\d+/.test(firstCellClean)) {
        const idMatch = firstCellClean.match(/^(OP-[A-Z]+-\d+)/);
        if (!idMatch) continue;
        const id = idMatch[1];

        const getCol = (predicate: (h: string) => boolean): string => {
          const idx = headers.findIndex(predicate);
          return idx >= 0 && idx < cells.length ? cells[idx] : '';
        };

        const rawValidation = getCol((h) => h.includes('market validation'));
        const size = stripMarkdown(getCol((h) => h === 'size'));
        const folderInfo = folderMap.get(id);

        opportunities.push({
          id,
          pillar: currentPillar,
          pillarNumber: currentPillarNumber,
          category: stripMarkdown(getCol((h) => h.startsWith('category'))),
          signatureToolkit: stripMarkdown(getCol((h) => h.includes('signature toolkit'))),
          size,
          title: stripMarkdown(getCol((h) => h === 'idea')),
          description: stripMarkdown(getCol((h) => h === 'description')),
          primarySkills: stripMarkdown(getCol((h) => h.includes('primary skills'))),
          timeHorizon: stripMarkdown(getCol((h) => h.includes('time horizon'))),
          effort: stripMarkdown(getCol((h) => h === 'effort')),
          expectedCapital: stripMarkdown(getCol((h) => h.includes('expected capital'))),
          scalabilityPath: stripMarkdown(getCol((h) => h.includes('scalability'))),
          risks: stripMarkdown(getCol((h) => h.includes('risks'))),
          status: stripMarkdown(getCol((h) => h === 'status')),
          targetQuarter: stripMarkdown(getCol((h) => h.includes('target qtr'))),
          marketValidation: stripMarkdown(rawValidation),
          validationLevel: detectValidationLevel(rawValidation),
          tier: classifyTier(id, size),
          owner: stripMarkdown(getCol((h) => h === 'owner')) || undefined,
          folder: folderInfo?.folder,
          artifacts: folderInfo?.artifacts ?? [],
        });
      }
    }
  }

  return opportunities;
}

function parseHypotheses(): Hypothesis[] {
  const filePath = path.join(ROOT_DIR, 'docs/registers/Hypothesis-Register.md');
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const hypotheses: Hypothesis[] = [];
  let currentWave = 'Wave 1';
  let inTable = false;

  for (const line of lines) {
    if (line.startsWith('### ')) {
      currentWave = stripMarkdown(line.replace(/^###\s+/, '')).split('(')[0].trim();
      inTable = false;
      continue;
    }

    if (line.trim().startsWith('|')) {
      const cells = splitMarkdownRow(line);
      if (isSeparatorRow(cells)) continue;
      const first = stripMarkdown(cells[0] || '');
      if (first === 'ID') {
        inTable = true;
        continue;
      }
      if (inTable && first.startsWith('HYP-')) {
        hypotheses.push({
          id: first,
          wave: currentWave,
          opportunity: stripMarkdown(cells[1] || ''),
          type: stripMarkdown(cells[2] || ''),
          statement: stripMarkdown(cells[3] || ''),
          testPlan: stripMarkdown(cells[4] || ''),
          successThreshold: stripMarkdown(cells[5] || ''),
          falsificationCriteria: stripMarkdown(cells[6] || ''),
          evidence: stripMarkdown(cells[7] || ''),
          status: stripMarkdown(cells[8] || ''),
        });
      }
    }
  }
  return hypotheses;
}

function parseStatusRegister(): {
  currentPhase: string;
  capacityCap: string;
  lastUpdated: string;
  owner: string;
  waves: WaveItem[];
  graduatedRepos: GraduatedRepo[];
  baselineFeedback: BaselineFeedback[];
} {
  const filePath = path.join(ROOT_DIR, 'docs/registers/Portfolio-Status-Register.md');
  const defaults = {
    currentPhase: 'Pre-Pilot Packaging & Q1 2027 Readiness (Tailored SIDPA Stages 1–2)',
    capacityCap: '10–15 hrs/week · $0 working capital',
    lastUpdated: '2026-11-24',
    owner: 'Menno Drescher (Director, CBa Consult)',
    waves: [] as WaveItem[],
    graduatedRepos: [] as GraduatedRepo[],
    baselineFeedback: [] as BaselineFeedback[],
  };
  if (!fs.existsSync(filePath)) return defaults;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const updatedMatch = raw.match(/last_updated:\s*"([^"]+)"/);
  if (updatedMatch) defaults.lastUpdated = updatedMatch[1];
  const ownerMatch = raw.match(/owner:\s*"([^"]+)"/);
  if (ownerMatch) defaults.owner = ownerMatch[1];

  let section = '';
  for (const line of lines) {
    if (line.startsWith('## 1.')) {
      section = 'orientation';
      continue;
    }
    if (line.startsWith('## 2.')) {
      section = 'waves';
      continue;
    }
    if (line.startsWith('### 2b.')) {
      section = 'graduated';
      continue;
    }
    if (line.startsWith('## 3.')) {
      section = 'bfi';
      continue;
    }
    if (line.startsWith('## 4.')) {
      section = 'other';
      continue;
    }

    if (!line.trim().startsWith('|')) continue;
    const cells = splitMarkdownRow(line);
    if (isSeparatorRow(cells) || cells.length < 2) continue;

    const first = stripMarkdown(cells[0]);
    if (section === 'orientation') {
      if (first === 'Current Portfolio Phase') defaults.currentPhase = stripMarkdown(cells[1]);
      if (first === 'Active Capacity Cap') defaults.capacityCap = stripMarkdown(cells[1]);
    } else if (section === 'waves' && first !== 'Wave') {
      defaults.waves.push({
        wave: first,
        targetWindow: stripMarkdown(cells[1] || ''),
        leadIds: stripMarkdown(cells[2] || ''),
        currentStage: stripMarkdown(cells[3] || ''),
        nextGate: stripMarkdown(cells[4] || ''),
        track: stripMarkdown(cells[5] || ''),
      });
    } else if (section === 'graduated' && first !== 'Opportunity ID') {
      const repoCell = cells[1] || '';
      const urlMatch = repoCell.match(/\((https:\/\/github\.com\/[^)]+)\)/);
      const repoUrl = urlMatch ? urlMatch[1] : '';
      const repoName = repoUrl ? repoUrl.replace('https://github.com/', '') : stripMarkdown(repoCell);
      defaults.graduatedRepos.push({
        opportunityId: first,
        repoName,
        repoUrl,
        stage: stripMarkdown(cells[2] || ''),
        progress: stripMarkdown(cells[3] || ''),
        commercialStatus: stripMarkdown(cells[4] || ''),
        asOf: stripMarkdown(cells[5] || ''),
      });
    } else if (section === 'bfi' && first.startsWith('BFI-')) {
      defaults.baselineFeedback.push({
        id: first,
        affectedArtifacts: stripMarkdown(cells[1] || ''),
        finding: stripMarkdown(cells[2] || ''),
        resolution: stripMarkdown(cells[3] || ''),
        status: stripMarkdown(cells[4] || ''),
      });
    }
  }

  return defaults;
}

function parseCoreFlagships(): CoreFlagship[] {
  const filePath = path.join(ROOT_DIR, 'Tier_A_Executive_Summary_2027.md');
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split(/\r?\n/);

  const flagships: CoreFlagship[] = [];
  let inTable = false;

  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      const cells = splitMarkdownRow(line);
      if (isSeparatorRow(cells)) continue;
      const first = stripMarkdown(cells[0] || '');
      if (first === 'Strategic Asset') {
        inTable = true;
        continue;
      }
      if (inTable && cells.length >= 6) {
        const id = stripMarkdown(cells[1]);
        if (id.startsWith('OP-')) {
          flagships.push({
            strategicAsset: first,
            id,
            offering: stripMarkdown(cells[2]),
            buyers: stripMarkdown(cells[3]),
            triggerIp: stripMarkdown(cells[4]),
            scopeAnchor: stripMarkdown(cells[5]),
          });
        }
      }
    } else if (inTable && line.trim() === '') {
      inTable = false;
    }
  }

  return flagships;
}

function buildPortfolioData(): PortfolioData {
  const folderMap = scanOpportunityFolders();
  const opportunities = parseInventory(folderMap);
  const hypotheses = parseHypotheses();
  const statusReg = parseStatusRegister();
  const coreFlagships = parseCoreFlagships();

  const pillars = Array.from(new Set(opportunities.map((o) => o.pillar)));
  const activePilots = opportunities.filter((o) => o.status.toLowerCase() === 'pilot').length;
  const testingHypotheses = hypotheses.filter((h) => h.status.toLowerCase() === 'testing').length;
  const openFeedbackCount = statusReg.baselineFeedback.filter((b) =>
    b.status.toLowerCase().includes('open')
  ).length;

  const resolvedHtmlReports = HTML_REPORTS.map((rep) => {
    if (!rep.pdfSourcePath || !rep.pdfUrl) return rep;
    const htmlPath = path.resolve(ROOT_DIR, rep.sourcePath);
    const pdfPath = path.resolve(ROOT_DIR, rep.pdfSourcePath);
    if (!fs.existsSync(pdfPath)) {
      return { ...rep, pdfSourcePath: undefined, pdfUrl: undefined };
    }
    if (fs.existsSync(htmlPath)) {
      const htmlMtime = fs.statSync(htmlPath).mtimeMs;
      const pdfMtime = fs.statSync(pdfPath).mtimeMs;
      if (htmlMtime > pdfMtime) {
        return { ...rep, pdfSourcePath: undefined, pdfUrl: undefined };
      }
    }
    return rep;
  });

  return {
    summary: {
      totalOpportunities: opportunities.length,
      totalFolders: folderMap.size,
      tierACount: opportunities.filter((o) => o.tier === 'Tier A').length,
      tierBCount: opportunities.filter((o) => o.tier === 'Tier B').length,
      tierCCount: opportunities.filter((o) => o.tier === 'Tier C').length,
      tierDCount: opportunities.filter((o) => o.tier === 'Tier D').length,
      activePilots,
      testingHypotheses,
      totalHypotheses: hypotheses.length,
      openFeedbackCount,
      capacityCap: statusReg.capacityCap,
      currentPhase: statusReg.currentPhase,
      lastUpdated: statusReg.lastUpdated,
      owner: statusReg.owner,
    },
    coreFlagships,
    waves: statusReg.waves,
    graduatedRepos: statusReg.graduatedRepos,
    baselineFeedback: statusReg.baselineFeedback,
    opportunities,
    pillars,
    hypotheses,
    htmlReports: resolvedHtmlReports,
    coreDocuments: CORE_DOCUMENTS,
  };
}

const CLIENT_FLAGSHIP_SERVICES: ClientFlagshipService[] = [
  {
    id: 'OP-FIN-009',
    title: 'Continuous Close & Real-Time Reconciliation Bridge',
    strategicAsset: 'Financial Truth',
    audiences: ['CFO & Finance', 'Board & PE'],
    buyerLine: 'CFOs, Corporate Controllers & Finance Directors',
    headline: 'Close cleanly after the 3rd — using your existing ERP and BI stack',
    summary:
      'Bridges the 23rd payroll close to your post-3rd monthly close through a 3-phase exception-based reconciliation loop, IFRS 18 readiness, and Segregation of Duties controls — without buying enterprise close software.',
    outcomes: [
      '23rd-to-3rd+ Continuous Close calendar and dependency-gate blueprint',
      '10 automated accrual, Day-1 reversal, and variance-exception guardrails',
      'GAAP / IFRS 18 and SoD control matrix validated in one live dry-run close',
    ],
    duration: '6–8 weeks',
    investmentRange: '€1,500 – €5,000',
    entryWedge: 'Companion CFO wedge: Annual Accountant Review Findings & Side Letters',
    onePagerPath: 'opportunities/OP-FIN-009_Continuous_Close/One_Pager_OP-FIN-009_Continuous_Close.md',
    featuredWide: true,
  },
  {
    id: 'OP-ITG-013',
    title: 'Enterprise AI Agent Governance Assessment',
    strategicAsset: 'Digital Labor',
    audiences: ['CIO & CISO', 'Board & PE'],
    buyerLine: 'CIOs, CISOs & Chief AI Officers',
    headline: 'Move from unmanaged copilots to auditable, cost-controlled digital labor',
    summary:
      'Establishes an 8-pillar governance operating model across Copilot Studio, Power Platform, SaaS, and custom agents — covering agent inventory, Entra Agent Identity, SoD boundaries, Agent 365 observability, and FinOps ceilings.',
    outcomes: [
      '12-field Enterprise Agent Inventory Register and 40-point scored maturity audit',
      'Entra Agent Identity, Read/Write SoD, and sub-5-minute kill-switch blueprint',
      'Agent FinOps cost-center attribution and hard monthly spending ceilings',
    ],
    duration: '2–3 wk Triage · 6–10 wk Full',
    investmentRange: '€2,500 – €18,000+',
    entryWedge: 'Tier 1 Agent Sprawl & Identity Triage (2–3 weeks · €2,500–€5,000)',
    onePagerPath:
      'opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.md',
    featuredWide: true,
  },
  {
    id: 'OP-ITG-014',
    title: 'Knowledge Intelligence & Context Governance',
    strategicAsset: 'Organizational Intelligence',
    audiences: ['CIO & CISO'],
    buyerLine: 'CIOs, CDOs, Chief AI Officers & Enterprise Architects',
    headline: 'Turn SharePoint, Teams, and Confluence sprawl into an agent-ready context layer',
    summary:
      'Assesses RAG readiness, taxonomy maturity, canonical ontologies, and permission hygiene so Copilot, Work IQ, and autonomous agents retrieve authoritative, properly scoped corporate knowledge.',
    outcomes: [
      'RAG & Work IQ readiness scorecard with deduplication and quarantine rules',
      'Canonical taxonomy, ontology, and Knowledge Graph architecture blueprint',
      'Zero-oversharing permission and Split-Clock lifecycle remediation roadmap',
    ],
    duration: '6–10 weeks',
    investmentRange: '€3,500 – €10,000',
    entryWedge: 'IT Technical & Information Quality Baseline (3 weeks · €2,000–€5,000)',
    onePagerPath:
      'opportunities/OP-ITG-014_Knowledge_Context_Governance/One_Pager_OP-ITG-014_Knowledge_Context_Governance.md',
  },
  {
    id: 'OP-RSK-004',
    title: 'AI Governance Certification Readiness ("SOC 2 for AI")',
    strategicAsset: 'Evidence & Governance',
    audiences: ['CIO & CISO', 'Board & PE'],
    buyerLine: 'CISOs, Chief Risk Officers, General Counsel & DPOs',
    headline: 'Map AI controls once across ISO 42001, NIST AI RMF, and EU AI Act Annex III',
    summary:
      'Prepares regulated organizations ahead of the December 2, 2027 EU AI Act Annex III deadline with a single cross-walked AI register, binding Purpose Clause policy pack, and audit-ready conformity evidence.',
    outcomes: [
      'Unified AI System Register and EU AI Act Annex III risk classification map',
      'Cross-walked gap-to-certification matrix (ISO 42001 / NIST / EU AI Act)',
      'Board-ready AI governance policies and pre-registrar evidence playbook',
    ],
    duration: '6–10 weeks',
    investmentRange: '€4,000 – €12,000+',
    onePagerPath:
      'opportunities/OP-RSK-004_AI_Governance_Certification/One_Pager_OP-RSK-004_AI_Governance_Certification.md',
  },
  {
    id: 'OP-ITG-017',
    title: 'MXC Hyper-V <500ms JIT Scale-to-Zero VM Sandboxes',
    strategicAsset: 'Sovereign Infrastructure',
    audiences: ['CIO & CISO', 'CFO & Finance'],
    buyerLine: 'CIOs, CTOs, CISOs & Platform Engineering Directors',
    headline: 'Hardware-isolated Type-1 Hyper-V sandboxes that sleep at 0.0% idle CPU',
    summary:
      'Eliminates 24/7 idle VM spend and shared-kernel container risk with sub-500ms wake-on-demand Windows Server 2025 sandboxes and sterile .avhdx session resets for sensitive financial and AI agent workloads.',
    outcomes: [
      'Live sub-300ms Hyper-V JIT wake benchmark and infrastructure TCO audit',
      'Golden Image Registry, identity-bound leasing, and sterile .avhdx reaper',
      'Automated acceptance verification suite and CFO FinOps ROI scorecard',
    ],
    duration: '6–10 weeks',
    investmentRange: '€4,000 – €15,000+',
    entryWedge: 'Live Benchmark & Feasibility Sprint (2–3 weeks · €2,000–€4,500)',
    onePagerPath:
      'opportunities/OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero/One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.md',
  },
  {
    id: 'OP-OPS-001',
    title: 'Quote-to-Delivery & 90-Day Onboarding Sprint',
    strategicAsset: 'Commercial & Operational Proof',
    audiences: ['COO & Commercial', 'CFO & Finance'],
    buyerLine: 'Founders, COOs, CROs & Customer Success Leaders',
    headline: 'Eliminate margin leakage and churn between signed contract and Day 90',
    summary:
      'Traces real closed-won deals from Quote to Kickoff and Invoicing, locking down Sales-to-Delivery handoffs and human-balanced 90-day onboarding milestones using your existing CRM and PM stack.',
    outcomes: [
      'End-to-end Quote-to-Delivery Handoff Map across Sales, Legal, Delivery & Finance',
      '90-Day Client Onboarding & Time-to-Value Playbook with RACI ownership',
      'Live pilot validation on incoming client deals within 4 weeks',
    ],
    duration: '3–5 weeks',
    investmentRange: '€1,000 – €3,500',
    entryWedge: 'Founder-focused Quote-to-Delivery Handoff Map (€500–€1,500)',
    onePagerPath: 'docs/reports/One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md',
  },
];

function sanitizeClientTitle(raw: string): string {
  return raw
    .replace(/\s*\((?:Root(?:\s*#\d+)?|2026 addition|from Parking lot|Opportunities to Publish|Opportunities Business|2027\.1 Pillar 17|2027 Agentic Finance[^)]*|2027–2030 Tier [A-D][^)]*)\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeClientDuration(raw: string): string {
  const cleaned = raw
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*\+\s*ongoing\b.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned || '4–8 weeks';
}

function sanitizeClientInvestmentRange(raw: string): string {
  const cleaned = raw.replace(/\s*\([^)]*\)/g, '').trim();
  const euroMatch = cleaned.match(
    /€\s?[\d,.]+k?(?:\s*[–-]\s*€?\s?[\d,.]+k?)?\+?(?:\s*\/\s*(?:mo|session|event|partner|launch))?/i
  );
  if (euroMatch) {
    return euroMatch[0].replace(/\s+/g, ' ').trim();
  }
  return 'Scoped on request';
}

function buildClientPortfolioData(): ClientPortfolioData {
  const folderMap = scanOpportunityFolders();
  const allOpportunities = parseInventory(folderMap);
  const flagshipIds = new Set(CLIENT_FLAGSHIP_SERVICES.map((f) => f.id));

  const catalog: ClientCatalogItem[] = allOpportunities
    .filter((o) => {
      const st = o.status.toLowerCase();
      return st !== 'parked' && st !== 'retired' && st !== 'killed' && o.tier !== 'Tier D';
    })
    .map((o) => {
      const onePager = o.artifacts.find((a) => a.name.startsWith('One_Pager_') && a.isMarkdown);
      const flagshipMatch = CLIENT_FLAGSHIP_SERVICES.find((f) => f.id === o.id);
      return {
        id: o.id,
        practice: o.pillar,
        title: sanitizeClientTitle(o.title),
        description: o.description,
        category: o.category.replace(/\s*\([^)]*\)/g, '').trim(),
        organizationSize: o.size || 'All',
        duration: sanitizeClientDuration(o.timeHorizon),
        investmentRange: sanitizeClientInvestmentRange(o.expectedCapital || ''),
        toolkit: o.signatureToolkit,
        onePagerPath: flagshipMatch?.onePagerPath || onePager?.path,
        isFlagship: flagshipIds.has(o.id) || o.id === 'OP-ITG-018',
      };
    });

  const practices = Array.from(new Set(catalog.map((c) => c.practice)));

  return {
    principal: 'Menno Drescher',
    firm: 'CBa Consult',
    flagships: CLIENT_FLAGSHIP_SERVICES,
    catalog,
    practices,
    mipOnePagerPath:
      'opportunities/OP-ITG-018_Managed_Intelligence_Provider_MIP/One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.md',
    flagshipOverviewPath: 'docs/reports/One_Pager_Flagship_Opportunities_2027.md',
    clientReports: CLIENT_REPORTS,
  };
}

const recentInquiries: ScopingInquiryResponse[] = [];

const ALLOWED_ROOT_MD = new Set([
  'README.md',
  'Tier_A_Executive_Summary_2027.md',
  'ideation-template.md',
  'inventory-of-ideas.md',
  'market-analysis-2027.md',
]);

const PUBLIC_CLIENT_ONE_PAGERS = new Set([
  'docs/reports/One_Pager_Flagship_Opportunities_2027.md',
  'docs/reports/One_Pager_OP-OPS-001_CX-001_Quote_to_Onboarding.md',
]);

function normalizeRelPath(relPath: string): string {
  return relPath.replace(/\\/g, '/').replace(/^\/+/, '');
}

function isPublicClientDocument(relPath: string): boolean {
  const normalized = normalizeRelPath(relPath);
  if (normalized.includes('..')) return false;
  if (PUBLIC_CLIENT_ONE_PAGERS.has(normalized)) return true;
  return /^opportunities\/[^/]+\/One_Pager_[^/]+\.md$/.test(normalized);
}

function resolveSafeMarkdownPath(relPath: string): string | null {
  if (!relPath || typeof relPath !== 'string') return null;
  const normalized = normalizeRelPath(relPath);
  if (normalized.includes('..') || !normalized.toLowerCase().endsWith('.md')) return null;

  const isAllowed =
    ALLOWED_ROOT_MD.has(normalized) ||
    normalized.startsWith('docs/') ||
    normalized.startsWith('opportunities/');
  if (!isAllowed) return null;

  const resolved = path.resolve(ROOT_DIR, normalized);
  if (!resolved.startsWith(ROOT_DIR + path.sep)) return null;
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) return null;
  return resolved;
}

const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 10;

interface ClaimedAdmin {
  username: string;
  salt: string;
  hash: string;
}

interface ActiveSession {
  username: string;
  expiresAt: number;
}

let claimedAdmin: ClaimedAdmin | null = null;
const activeSessions = new Map<string, ActiveSession>();
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function hasEnvAdminCredentials(): boolean {
  return Boolean(process.env.ADMIN_USERNAME?.trim() && process.env.ADMIN_PASSWORD);
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const digestA = crypto.createHash('sha256').update(a, 'utf8').digest();
  const digestB = crypto.createHash('sha256').update(b, 'utf8').digest();
  return crypto.timingSafeEqual(digestA, digestB);
}

function verifyAdminCredentials(username: string, password: string): boolean {
  const cleanUser = username.trim();
  if (!cleanUser || !password) return false;

  if (hasEnvAdminCredentials()) {
    const envUser = process.env.ADMIN_USERNAME!.trim();
    const envPass = process.env.ADMIN_PASSWORD!;
    const userOk = timingSafeStringEqual(cleanUser, envUser);
    const passOk = timingSafeStringEqual(password, envPass);
    return userOk && passOk;
  }

  if (claimedAdmin) {
    const userOk = timingSafeStringEqual(cleanUser, claimedAdmin.username);
    const derived = crypto.scryptSync(password, claimedAdmin.salt, 64);
    const stored = Buffer.from(claimedAdmin.hash, 'hex');
    const passOk = derived.length === stored.length && crypto.timingSafeEqual(derived, stored);
    return userOk && passOk;
  }

  return false;
}

function createAdminSession(username: string): string {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (session.expiresAt <= now) {
      activeSessions.delete(token);
    }
  }
  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, {
    username,
    expiresAt: now + SESSION_TTL_MS,
  });
  return token;
}

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  const token = header.slice('Bearer '.length).trim();
  return token || null;
}

function getAuthenticatedSession(req: Request): ActiveSession | null {
  const token = extractBearerToken(req);
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    activeSessions.delete(token);
    return null;
  }
  return session;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const session = getAuthenticatedSession(req);
  if (!session) {
    res.status(401).json({ error: 'Authentication required to access internal portfolio data.' });
    return;
  }
  next();
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() > entry.resetAt) {
    loginAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_LOGIN_ATTEMPTS;
}

function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function clearLoginAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/auth/status', (req, res) => {
    const session = getAuthenticatedSession(req);
    const configuredViaEnv = hasEnvAdminCredentials();
    res.json({
      authenticated: Boolean(session),
      username: session?.username ?? null,
      needsSetup: !configuredViaEnv && !claimedAdmin,
      configuredViaEnv,
    });
  });

  app.post('/api/auth/setup', (req, res) => {
    if (hasEnvAdminCredentials() || claimedAdmin) {
      res.status(409).json({
        error: 'Internal explorer credentials are already configured. Please sign in.',
      });
      return;
    }

    const body = req.body as { username?: unknown; password?: unknown };
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (username.length < 2 || username.length > 64 || /[\r\n\t]/.test(username)) {
      res.status(400).json({ error: 'Username must be between 2 and 64 characters.' });
      return;
    }
    if (password.length < 8 || password.length > 128) {
      res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    claimedAdmin = { username, salt, hash };

    const token = createAdminSession(username);
    res.status(201).json({ token, username });
  });

  app.post('/api/auth/login', (req, res) => {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      res.status(429).json({
        error: 'Too many failed sign-in attempts. Please wait 15 minutes and try again.',
      });
      return;
    }

    if (!hasEnvAdminCredentials() && !claimedAdmin) {
      res.status(409).json({
        error: 'Admin credentials have not been set up yet. Complete first-time setup first.',
      });
      return;
    }

    const body = req.body as { username?: unknown; password?: unknown };
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!verifyAdminCredentials(username, password)) {
      recordFailedLogin(ip);
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    clearLoginAttempts(ip);
    const resolvedUsername = hasEnvAdminCredentials()
      ? process.env.ADMIN_USERNAME!.trim()
      : claimedAdmin!.username;
    const token = createAdminSession(resolvedUsername);
    res.json({ token, username: resolvedUsername });
  });

  app.post('/api/auth/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      activeSessions.delete(token);
    }
    res.json({ ok: true });
  });

  app.get('/api/portfolio', requireAdminAuth, (_req, res) => {
    try {
      const data = buildPortfolioData();
      res.json(data);
    } catch (err) {
      console.error('Error building portfolio data:', err);
      res.status(500).json({ error: 'Failed to load portfolio data' });
    }
  });

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get('/api/client-portfolio', (_req, res) => {
    try {
      const data = buildClientPortfolioData();
      res.json(data);
    } catch (err) {
      console.error('Error building client portfolio data:', err);
      res.status(500).json({ error: 'Failed to load client portfolio data' });
    }
  });

const ALLOWED_TARGET_WINDOWS = new Set([
  'Q1 2027',
  'Q2 2027',
  'H2 2027',
  'Immediate / Exploratory',
]);

function generateInquiryReferenceId(): string {
  const year = new Date().getFullYear();
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(6);
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[bytes[i] % alphabet.length];
  }
  return `CBA-${year}-${suffix}`;
}

function isSafeExternalHttpsUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '0.0.0.0' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

function getDeliveryConfig() {
  const resendApiKey = process.env.RESEND_API_KEY?.trim() || '';
  const notifyEmail = process.env.SCOPING_NOTIFY_EMAIL?.trim() || '';
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || 'CBa Consult <onboarding@resend.dev>';
  const webhookUrl = process.env.SCOPING_WEBHOOK_URL?.trim() || '';
  const webhookSecret = process.env.SCOPING_WEBHOOK_SECRET?.trim() || '';

  return {
    resendApiKey,
    notifyEmail,
    fromEmail,
    webhookUrl,
    webhookSecret,
    emailConfigured: Boolean(resendApiKey && notifyEmail),
    webhookConfigured: Boolean(webhookUrl && isSafeExternalHttpsUrl(webhookUrl)),
  };
}

async function dispatchInquiryNotifications(
  referenceId: string,
  submittedAt: string,
  inquiry: ScopingInquiryPayload
): Promise<EmailDeliveryStatus> {
  const cfg = getDeliveryConfig();
  if (!cfg.emailConfigured && !cfg.webhookConfigured) {
    return 'not_configured';
  }

  let anySent = false;
  let anyFailed = false;

  if (cfg.emailConfigured) {
    const servicesText =
      inquiry.selectedServices.length > 0
        ? inquiry.selectedServices.map((s) => `- ${s}`).join('\n')
        : '- Executive Discovery & Wedge Selection';

    const textBody = [
      `New Scoping Call Request (${referenceId})`,
      `Submitted: ${submittedAt}`,
      '',
      `Name: ${inquiry.fullName}`,
      `Role: ${inquiry.role}`,
      `Organization: ${inquiry.organization}`,
      `Work Email: ${inquiry.email}`,
      `Target Window: ${inquiry.targetWindow}`,
      '',
      'Shortlisted Engagements:',
      servicesText,
      '',
      'Context & Objectives:',
      inquiry.notes || '(None provided)',
    ].join('\n');

    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cfg.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: cfg.fromEmail,
          to: [cfg.notifyEmail],
          reply_to: inquiry.email,
          subject: `New Scoping Call Request (${referenceId}) — ${inquiry.organization}`,
          text: textBody,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (emailRes.ok) {
        anySent = true;
      } else {
        anyFailed = true;
        console.error('Email notification failed with status:', emailRes.status);
      }
    } catch (err) {
      anyFailed = true;
      console.error('Email notification error:', err);
    }
  }

  if (cfg.webhookConfigured) {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (cfg.webhookSecret) {
        headers['X-Webhook-Secret'] = cfg.webhookSecret;
      }
      const hookRes = await fetch(cfg.webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          event: 'scoping_inquiry.created',
          referenceId,
          submittedAt,
          inquiry,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (hookRes.ok) {
        anySent = true;
      } else {
        anyFailed = true;
        console.error('Webhook notification failed with status:', hookRes.status);
      }
    } catch (err) {
      anyFailed = true;
      console.error('Webhook notification error:', err);
    }
  }

  if (anySent) return 'sent';
  if (anyFailed) return 'failed';
  return 'not_configured';
}

  app.get('/api/inquiries/delivery-status', requireAdminAuth, (_req, res) => {
    const cfg = getDeliveryConfig();
    const payload: DeliveryChannelStatus = {
      emailConfigured: cfg.emailConfigured,
      webhookConfigured: cfg.webhookConfigured,
      notifyEmail: cfg.emailConfigured ? cfg.notifyEmail : null,
    };
    res.json(payload);
  });

  app.post('/api/inquiries', async (req, res) => {
    const body = req.body as Partial<ScopingInquiryPayload>;
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 160) : '';
    const organization =
      typeof body.organization === 'string' ? body.organization.trim().slice(0, 160) : '';
    const role =
      (typeof body.role === 'string' ? body.role.trim().slice(0, 120) : '') || 'Executive Sponsor';
    const rawWindow = typeof body.targetWindow === 'string' ? body.targetWindow.trim() : 'Q1 2027';
    const targetWindow = ALLOWED_TARGET_WINDOWS.has(rawWindow) ? rawWindow : 'Q1 2027';
    const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 2000) : '';
    const selectedServices = Array.isArray(body.selectedServices)
      ? body.selectedServices
          .filter((s): s is string => typeof s === 'string')
          .map((s) => s.trim().slice(0, 160))
          .filter((s) => s.length > 0)
          .slice(0, 12)
      : [];

    if (
      fullName.length < 2 ||
      organization.length < 2 ||
      email.length < 5 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      res
        .status(400)
        .json({ error: 'Please provide your name, organization, and a valid work email.' });
      return;
    }

    const referenceId = generateInquiryReferenceId();
    const submittedAt = new Date().toISOString();
    const inquiry: ScopingInquiryPayload = {
      fullName,
      email,
      organization,
      role,
      targetWindow,
      selectedServices,
      notes,
    };

    const emailDeliveryStatus = await dispatchInquiryNotifications(
      referenceId,
      submittedAt,
      inquiry
    );

    const record: ScopingInquiryResponse = {
      referenceId,
      submittedAt,
      emailDeliveryStatus,
      inquiry,
    };
    recentInquiries.push(record);
    res.status(201).json(record);
  });

  app.get('/api/document', (req, res) => {
    const reqPath = typeof req.query.path === 'string' ? req.query.path : '';
    if (!isPublicClientDocument(reqPath) && !getAuthenticatedSession(req)) {
      res.status(401).json({ error: 'Authentication required to view internal documents.' });
      return;
    }

    const safePath = resolveSafeMarkdownPath(reqPath);
    if (!safePath) {
      res.status(404).json({ error: 'Document not found or not accessible' });
      return;
    }
    try {
      const content = fs.readFileSync(safePath, 'utf-8');
      res.json({
        path: reqPath,
        name: path.basename(safePath),
        content,
      });
    } catch (err) {
      console.error('Error reading document:', err);
      res.status(500).json({ error: 'Failed to read document' });
    }
  });

  app.get('/reports/:slug/pdf', requireAdminAuth, (req, res) => {
    const entry = HTML_REPORTS.find((r) => r.slug === req.params.slug);
    if (!entry || !entry.pdfSourcePath) {
      res.status(404).json({ error: 'Pre-built PDF not found for this report' });
      return;
    }
    const fullPath = path.resolve(ROOT_DIR, entry.pdfSourcePath);
    if (!fullPath.startsWith(ROOT_DIR + path.sep) || !fs.existsSync(fullPath)) {
      res.status(404).json({ error: 'Report PDF file missing' });
      return;
    }
    const fileName = path.basename(fullPath).replace(/[^a-zA-Z0-9._-]/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.sendFile(fullPath);
  });

  app.get('/api/client-reports/:slug', (req, res) => {
    const entry = HTML_REPORTS.find(
      (r) => r.slug === req.params.slug && r.audience === 'client'
    );
    if (!entry) {
      res.status(404).send('Client report not found');
      return;
    }
    const fullPath = path.resolve(ROOT_DIR, entry.sourcePath);
    if (!fullPath.startsWith(ROOT_DIR + path.sep) || !fs.existsSync(fullPath)) {
      res.status(404).send('Client report file missing');
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(fullPath);
  });

  app.get('/reports/:slug', requireAdminAuth, (req, res) => {
    const entry = HTML_REPORTS.find((r) => r.slug === req.params.slug);
    if (!entry) {
      res.status(404).send('Report not found');
      return;
    }
    const fullPath = path.resolve(ROOT_DIR, entry.sourcePath);
    if (!fullPath.startsWith(ROOT_DIR + path.sep) || !fs.existsSync(fullPath)) {
      res.status(404).send('Report file missing');
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(fullPath);
  });

  const serveStaticDist = () => {
    app.use(express.static(DIST_DIR));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
  };

  if (!IS_PROD) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn('Vite dev middleware unavailable, serving built dist assets:', err);
      serveStaticDist();
    }
  } else {
    serveStaticDist();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Opportunities 2027 Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
