export interface AssessmentQuestion {
  id: string;
  pillarId: number;
  prompt: string;
  evidenceHint: string;
}

export interface AssessmentPillar {
  id: number;
  shortName: string;
  title: string;
  auditCritical: boolean;
  weight: number;
  questions: AssessmentQuestion[];
}

export interface RedFlagItem {
  id: string;
  title: string;
  detail: string;
  exposureArea: string;
  pillarId: number;
}

export interface MaturityLevelInfo {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  shortLabel: string;
  description: string;
}

export type RedFlagAnswer = 'yes' | 'unsure' | 'no';
export type AssessmentMode = 'triage' | 'full';

export const SEAT_BANDS = [
  'Under 250 seats',
  '250–1,000 seats',
  '1,000–2,500 seats',
  '2,500–10,000 seats',
  '10,000+ seats',
] as const;

export const AGENT_PLATFORMS = [
  'Microsoft 365 Copilot / Copilot Studio',
  'Power Platform / Power Automate',
  'Azure AI Foundry / OpenAI API',
  'Salesforce Agentforce / ServiceNow',
  'AWS Bedrock / Google Vertex AI',
  'Custom / n8n / MCP Agents',
] as const;

export const MATURITY_RUBRIC: MaturityLevelInfo[] = [
  {
    level: 1,
    label: 'Ad Hoc / Shadow',
    shortLabel: 'Ad Hoc',
    description:
      'No formal visibility, policy, or technical control; agents run on personal accounts or unmanaged API keys.',
  },
  {
    level: 2,
    label: 'Emerging / Informal',
    shortLabel: 'Emerging',
    description:
      'Partial spreadsheets or local team rules exist; inconsistent enforcement; high audit and breach exposure.',
  },
  {
    level: 3,
    label: 'Defined / Standardized',
    shortLabel: 'Defined',
    description:
      'Documented enterprise policy, named human sponsors, and baseline Entra/IAM controls applied to primary platforms.',
  },
  {
    level: 4,
    label: 'Managed / Measured',
    shortLabel: 'Managed',
    description:
      'Automated discovery, least-privilege NHIs, FinOps ceilings, and centralized SIEM / Agent 365 telemetry with periodic reviews.',
  },
  {
    level: 5,
    label: 'Optimized / Auditable',
    shortLabel: 'Optimized',
    description:
      'Continuous control monitoring, tamper-evident audit trails, tested kill switches, and board-ready EU AI Act / ISO 42001 assurance.',
  },
];

export const TOP_10_RED_FLAGS: RedFlagItem[] = [
  {
    id: 'RF-01',
    title: 'Shared human accounts or static API keys',
    detail:
      'One or more production agents authenticate via an employee account or long-lived static API key instead of a dedicated Non-Human Identity.',
    exposureArea: 'Entra Agent ID / IAM',
    pillarId: 3,
  },
  {
    id: 'RF-02',
    title: 'Unchecked write access to ERP, banking, or payroll',
    detail:
      'Agents can create, modify, or trigger financial, payroll, or procurement transactions without Segregation of Duties (SoD) or human approval gates.',
    exposureArea: 'SOX 404 / ISA 265 SoD',
    pillarId: 4,
  },
  {
    id: 'RF-03',
    title: 'Orphaned or "zombie" agents without a Human Sponsor',
    detail:
      'Active copilots or automations have no recorded business owner, or remain active after their creator changed roles or left.',
    exposureArea: 'Accountability & IAM',
    pillarId: 2,
  },
  {
    id: 'RF-04',
    title: 'Uncapped token spend with no FinOps loop breaker',
    detail:
      'Consumption-based LLM or agent workflows run without hard monthly budget ceilings or automated rate limits to stop runaway loops.',
    exposureArea: 'Agent FinOps',
    pillarId: 7,
  },
  {
    id: 'RF-05',
    title: 'RAG grounding on unlabeled SharePoint or Confluence folders',
    detail:
      'Agents retrieve internal documents from broadly shared repositories exposing HR, M&A, legal, or executive PII.',
    exposureArea: 'Oversharing / DLP',
    pillarId: 8,
  },
  {
    id: 'RF-06',
    title: 'Unvetted third-party MCP servers or external AI APIs',
    detail:
      'Agents connect to external Model Context Protocol (MCP) servers or SaaS endpoints without an allowlist, DLP, or zero-data-retention DPA.',
    exposureArea: 'Supply Chain & Privacy',
    pillarId: 4,
  },
  {
    id: 'RF-07',
    title: 'No centralized logging of prompts, tool calls, or outputs',
    detail:
      'Agent actions are not captured in SIEM / Agent 365 / WORM storage, making decisions non-reconstructible for auditors or regulators.',
    exposureArea: 'EU AI Act Art. 12 / Audit',
    pillarId: 6,
  },
  {
    id: 'RF-08',
    title: 'No tested sub-5-minute agent kill switch',
    detail:
      'Security or IT teams cannot provably revoke a compromised agent’s identity and terminate active sessions within five minutes.',
    exposureArea: 'Incident Containment',
    pillarId: 3,
  },
  {
    id: 'RF-09',
    title: 'High-risk agents lacking EU AI Act / GDPR Art. 22 impact review',
    detail:
      'Agents influencing HR, credit, customer eligibility, or compliance operate without documented Annex III / DPIA / FRIA assessments.',
    exposureArea: 'EU AI Act Annex III',
    pillarId: 8,
  },
  {
    id: 'RF-10',
    title: 'Direct production edits to prompts or models without change control',
    detail:
      'System prompts, tool schemas, or LLM versions are modified live in production with no Git versioning or segregated approval trail.',
    exposureArea: 'Change Management',
    pillarId: 5,
  },
];

export const ASSESSMENT_PILLARS: AssessmentPillar[] = [
  {
    id: 1,
    shortName: 'Inventory',
    title: 'Pillar 1 — Agent Inventory & Discovery',
    auditCritical: true,
    weight: 1.25,
    questions: [
      {
        id: '1.1',
        pillarId: 1,
        prompt:
          'Is there a single, authoritative registry of all active AI agents across M365 Copilot Studio, Power Platform, cloud AI, SaaS, and custom stacks?',
        evidenceHint: 'Exported Agent Inventory Register / Agent 365 registry',
      },
      {
        id: '1.2',
        pillarId: 1,
        prompt:
          'How are unmanaged ("shadow") agents and citizen-built copilots discovered automatically across tenants and developer environments?',
        evidenceHint: 'Discovery scan logs / Defender / CASB / Agent 365 telemetry',
      },
      {
        id: '1.3',
        pillarId: 1,
        prompt:
          'Does every registered agent carry a formal risk classification (Low / Medium / High / EU AI Act Annex III) tied to data sensitivity and autonomy?',
        evidenceHint: 'Risk-tier rubric & tagged inventory export',
      },
      {
        id: '1.4',
        pillarId: 1,
        prompt:
          'Are third-party vendor-embedded AI agents (SaaS copilots, external MCP servers) tracked alongside internally built agents?',
        evidenceHint: 'Vendor/SaaS AI inventory + DPA/RoI mapping',
      },
      {
        id: '1.5',
        pillarId: 1,
        prompt:
          'How frequently is the agent inventory reconciled against active cloud/tenant credentials to detect orphaned or "zombie" agents?',
        evidenceHint: 'Quarterly reconciliation log & variance closure record',
      },
    ],
  },
  {
    id: 2,
    shortName: 'Owners',
    title: 'Pillar 2 — Agent Owners & Human Accountability',
    auditCritical: false,
    weight: 1.0,
    questions: [
      {
        id: '2.1',
        pillarId: 2,
        prompt:
          'Does every production and pilot agent have a named Human Sponsor (business owner) and technical custodian recorded in the directory?',
        evidenceHint: 'Entra Agent ID sponsor attribute / ownership register',
      },
      {
        id: '2.2',
        pillarId: 2,
        prompt:
          'What happens automatically when an agent’s Human Sponsor changes roles or leaves the organization (Mover/Leaver trigger)?',
        evidenceHint: 'HRIS → IAM transfer/suspension workflow log',
      },
      {
        id: '2.3',
        pillarId: 2,
        prompt:
          'Is there an explicit Human-in-the-Loop (HITL) escalation matrix defining which actions an agent may execute autonomously vs. requiring sign-off?',
        evidenceHint: 'Signed Decision Authority Matrix / approval thresholds',
      },
      {
        id: '2.4',
        pillarId: 2,
        prompt:
          'Is executive accountability (CIO / CISO / CAIO / Risk Committee) formally chartered for approving high-risk agent deployments?',
        evidenceHint: 'Governance charter / ARB meeting minutes',
      },
      {
        id: '2.5',
        pillarId: 2,
        prompt:
          'Can an incident responder identify and reach the responsible human owner for any anomalous agent within 15 minutes?',
        evidenceHint: 'Escalation runbook + on-call contact test',
      },
    ],
  },
  {
    id: 3,
    shortName: 'Identity',
    title: 'Pillar 3 — Agent Identity & Non-Human Access (Entra Agent ID / NHI)',
    auditCritical: true,
    weight: 1.25,
    questions: [
      {
        id: '3.1',
        pillarId: 3,
        prompt:
          'Do agents authenticate using dedicated Non-Human Identities (Entra Agent ID / workload identity federation) rather than shared accounts or static keys?',
        evidenceHint: 'Entra / IAM credential audit export',
      },
      {
        id: '3.2',
        pillarId: 3,
        prompt:
          'Are Agent Identity Blueprints (or equivalent IAM policy templates) used to enforce consistent baseline security across agent fleets?',
        evidenceHint: 'Blueprint / IaC policy definitions',
      },
      {
        id: '3.3',
        pillarId: 3,
        prompt:
          'Are Conditional Access policies (location, risk score, token lifetime, workload posture) enforced specifically for agent identities?',
        evidenceHint: 'Conditional Access policy export',
      },
      {
        id: '3.4',
        pillarId: 3,
        prompt:
          'Are agent tokens short-lived (JIT / OAuth 2.0 scoped) with automated secret rotation and zero hardcoded keys in prompts or repositories?',
        evidenceHint: 'Token TTL settings + secret-scanning report',
      },
      {
        id: '3.5',
        pillarId: 3,
        prompt:
          'Does a tested, sub-5-minute "kill switch" exist to revoke an agent’s identity and terminate active sessions immediately upon anomaly detection?',
        evidenceHint: 'Revocation runbook + last tabletop/drill timestamp',
      },
    ],
  },
  {
    id: 4,
    shortName: 'Tools & SoD',
    title: 'Pillar 4 — Tool, API Permissions & Segregation of Duties (SoD)',
    auditCritical: true,
    weight: 1.25,
    questions: [
      {
        id: '4.1',
        pillarId: 4,
        prompt:
          'Are agent tool/API permissions strictly partitioned between Read-Only and Write / Transactional scopes across ERP, CRM, HRIS, banking, and email?',
        evidenceHint: 'API permission matrix & OAuth scope review',
      },
      {
        id: '4.2',
        pillarId: 4,
        prompt:
          'Are Segregation of Duties (SoD) rules enforced for financial, payroll, and procurement agents (cannot both create and approve/post)?',
        evidenceHint: 'SoD conflict matrix & compensating control log',
      },
      {
        id: '4.3',
        pillarId: 4,
        prompt:
          'Are external MCP (Model Context Protocol) servers and Agent-to-Agent (A2A) tool calls restricted to an approved allowlist with signed schemas?',
        evidenceHint: 'MCP/A2A allowlist & gateway policy',
      },
      {
        id: '4.4',
        pillarId: 4,
        prompt:
          'Are untrusted code-execution or file-processing agents isolated in hardened sandboxes (hardware Type-1 VM / ephemeral container) rather than shared hosts?',
        evidenceHint: 'Runtime isolation architecture diagram & config',
      },
      {
        id: '4.5',
        pillarId: 4,
        prompt:
          'Are periodic User & Agent Access Reviews (UARs) executed and evidenced for external audit (SOX 404 / ISA 265 ITGC)?',
        evidenceHint: 'Signed quarterly access-review evidence packs',
      },
    ],
  },
  {
    id: 5,
    shortName: 'Lifecycle',
    title: 'Pillar 5 — Lifecycle & "Disposable App" Control',
    auditCritical: false,
    weight: 1.0,
    questions: [
      {
        id: '5.1',
        pillarId: 5,
        prompt:
          'Is there a formal Dev → Test → Prod promotion gate testing prompt injection, hallucination bounds, and tool-call safety before release?',
        evidenceHint: 'Promotion checklist & pre-prod test evidence',
      },
      {
        id: '5.2',
        pillarId: 5,
        prompt:
          'Are model versions, system prompts, and tool definitions under version control with segregated change approval to prevent silent drift?',
        evidenceHint: 'Git/CI change logs + CAB/ARB approval trail',
      },
      {
        id: '5.3',
        pillarId: 5,
        prompt:
          'Do pilot and citizen-built "disposable" agents have mandatory Time-to-Live (TTL) expiration dates forcing renewal or automatic decommissioning?',
        evidenceHint: 'Lifecycle expiry policy & archival logs',
      },
      {
        id: '5.4',
        pillarId: 5,
        prompt:
          'Is there a clean Decommissioning Protocol revoking credentials, archiving logs per statutory retention, and purging stale RAG indexes?',
        evidenceHint: 'Decommissioning SOP + sample closure ticket',
      },
      {
        id: '5.5',
        pillarId: 5,
        prompt:
          'How are third-party foundation-model updates (e.g., deprecated LLM snapshots) regression-tested before impacting production workflows?',
        evidenceHint: 'Model-pinning policy & regression suite results',
      },
    ],
  },
  {
    id: 6,
    shortName: 'Observability',
    title: 'Pillar 6 — Agent Observability & Immutable Audit Trail',
    auditCritical: true,
    weight: 1.25,
    questions: [
      {
        id: '6.1',
        pillarId: 6,
        prompt:
          'Are agent prompts, retrieved context references, tool/API invocations, outputs, and human overrides logged centrally (Agent 365 / Sentinel / SIEM)?',
        evidenceHint: 'SIEM / Agent 365 log schema & sample event',
      },
      {
        id: '6.2',
        pillarId: 6,
        prompt:
          'Do high-impact agent logs capture the 5 minimum audit fields (timestamp/ID, pinned model & policy hash, input lineage, output, human override)?',
        evidenceHint: 'Audit log field verification against EU AI Act Art. 12',
      },
      {
        id: '6.3',
        pillarId: 6,
        prompt:
          'Are audit logs stored in tamper-evident / WORM (Write-Once-Read-Many) storage aligned with statutory retention (6–10 years)?',
        evidenceHint: 'WORM/immutability config + retention schedule',
      },
      {
        id: '6.4',
        pillarId: 6,
        prompt:
          'Are real-time anomaly alerts configured for prompt injection, abnormal tool-call spikes, mass data exfiltration, or privilege escalation?',
        evidenceHint: 'SOC/SIEM alert rules + sample incident ticket',
      },
      {
        id: '6.5',
        pillarId: 6,
        prompt:
          'Can the organization reconstruct a complete decision provenance chain for an external auditor or regulator within 24–48 hours?',
        evidenceHint: 'Mock audit-retrieval drill timing & evidence',
      },
    ],
  },
  {
    id: 7,
    shortName: 'FinOps',
    title: 'Pillar 7 — Agent FinOps, Token Metering & Throttling',
    auditCritical: false,
    weight: 1.0,
    questions: [
      {
        id: '7.1',
        pillarId: 7,
        prompt:
          'Are token, API, and compute costs attributed to specific cost centers, business units, and individual agent IDs (chargeback / showback)?',
        evidenceHint: 'FinOps tagging schema & monthly cost report',
      },
      {
        id: '7.2',
        pillarId: 7,
        prompt:
          'Are hard rate limits, loop breakers, and monthly spending ceilings enforced technically to prevent runaway recursive agent loops?',
        evidenceHint: 'Gateway throttling / budget cap configuration',
      },
      {
        id: '7.3',
        pillarId: 7,
        prompt:
          'Does every production agent track a defined ROI / business-value metric (hours saved, cycle-time delta, error reduction) against run cost?',
        evidenceHint: 'Agent business-case & quarterly ROI review',
      },
      {
        id: '7.4',
        pillarId: 7,
        prompt:
          'Are LLM routing policies optimized (routing routine tasks to smaller models and reserving frontier models for high-complexity reasoning)?',
        evidenceHint: 'Model-routing policy & cost-per-task benchmark',
      },
      {
        id: '7.5',
        pillarId: 7,
        prompt:
          'Are consumption-based AI vendor contracts reconciled monthly against internal metering logs for ASC 606 / IFRS 15 / accrual accuracy?',
        evidenceHint: 'Monthly FinOps-to-GL reconciliation sign-off',
      },
    ],
  },
  {
    id: 8,
    shortName: 'Sovereign',
    title: 'Pillar 8 — Sovereign, Privacy & Regulatory Guardrails',
    auditCritical: false,
    weight: 1.0,
    questions: [
      {
        id: '8.1',
        pillarId: 8,
        prompt:
          'Are Data Loss Prevention (DLP) and sensitivity labels (e.g., Microsoft Purview) enforced on agent inputs, grounding data, and external API calls?',
        evidenceHint: 'Purview / DLP policy export & test block log',
      },
      {
        id: '8.2',
        pillarId: 8,
        prompt:
          'Are zero-data-retention (ZDR) and no-training contractual clauses verified across all LLM and agent API providers?',
        evidenceHint: 'Signed enterprise DPA / AI addendum registry',
      },
      {
        id: '8.3',
        pillarId: 8,
        prompt:
          'Are regional data-residency and cross-border transfer boundaries (GDPR Chapter V, sovereign cloud) enforced per agent workload?',
        evidenceHint: 'Data-flow map & region-pinning configuration',
      },
      {
        id: '8.4',
        pillarId: 8,
        prompt:
          'Are high-risk agents mapped to EU AI Act Annex III (Dec 2, 2027), GDPR Art. 22, and DORA/NIS2 obligations with documented AI Impact Assessments?',
        evidenceHint: 'Completed DPIA / FRIA / Annex III mapping',
      },
      {
        id: '8.5',
        pillarId: 8,
        prompt:
          'Are statutory record-retention requirements (7–10 yr tax/audit) cleanly decoupled from GDPR erasure obligations (pseudonymized/split-clock)?',
        evidenceHint: 'Split-clock retention & erasure SOP',
      },
    ],
  },
];

export interface PillarScoreSummary {
  pillarId: number;
  shortName: string;
  title: string;
  auditCritical: boolean;
  weight: number;
  answeredCount: number;
  totalQuestions: number;
  average: number | null;
}

export interface AgentGovernanceResult {
  mode: AssessmentMode;
  answeredQuestions: number;
  totalQuestions: number;
  weightedIndex: number;
  estimatedFromTriageOnly: boolean;
  maturity: MaturityLevelInfo;
  exposureLabel: 'Critical Exposure' | 'Elevated Exposure' | 'Developing Baseline' | 'Audit-Ready Foundation';
  confirmedRedFlags: RedFlagItem[];
  unsureRedFlags: RedFlagItem[];
  controlledRedFlagsCount: number;
  pillarScores: PillarScoreSummary[];
  lowestPillars: PillarScoreSummary[];
  recommendedTier: {
    code: 'Tier 1 Triage' | 'Tier 2 Full Assessment' | 'MIP Retainer';
    title: string;
    duration: string;
    investmentRange: string;
    rationale: string;
    serviceLabel: string;
  };
}

export function getMaturityForScore(score: number): MaturityLevelInfo {
  if (score < 1.75) return MATURITY_RUBRIC[0];
  if (score < 2.65) return MATURITY_RUBRIC[1];
  if (score < 3.55) return MATURITY_RUBRIC[2];
  if (score < 4.35) return MATURITY_RUBRIC[3];
  return MATURITY_RUBRIC[4];
}

export function calculateAgentGovernanceScore(
  mode: AssessmentMode,
  redFlagAnswers: Record<string, RedFlagAnswer>,
  questionScores: Record<string, number>
): AgentGovernanceResult {
  const confirmedRedFlags = TOP_10_RED_FLAGS.filter((rf) => redFlagAnswers[rf.id] === 'yes');
  const unsureRedFlags = TOP_10_RED_FLAGS.filter((rf) => redFlagAnswers[rf.id] === 'unsure');
  const controlledRedFlagsCount = TOP_10_RED_FLAGS.filter((rf) => redFlagAnswers[rf.id] === 'no').length;

  const pillarScores: PillarScoreSummary[] = ASSESSMENT_PILLARS.map((pillar) => {
    const answeredVals = pillar.questions
      .map((q) => questionScores[q.id])
      .filter((v): v is number => typeof v === 'number' && v >= 1 && v <= 5);
    const avg =
      answeredVals.length > 0
        ? answeredVals.reduce((acc, v) => acc + v, 0) / answeredVals.length
        : null;
    return {
      pillarId: pillar.id,
      shortName: pillar.shortName,
      title: pillar.title,
      auditCritical: pillar.auditCritical,
      weight: pillar.weight,
      answeredCount: answeredVals.length,
      totalQuestions: pillar.questions.length,
      average: avg !== null ? Number(avg.toFixed(2)) : null,
    };
  });

  const answeredQuestions = pillarScores.reduce((acc, p) => acc + p.answeredCount, 0);
  const totalQuestions = ASSESSMENT_PILLARS.reduce((acc, p) => acc + p.questions.length, 0);

  let weightedIndex: number;
  let estimatedFromTriageOnly = false;

  const scoredPillars = pillarScores.filter((p) => p.average !== null);
  if (scoredPillars.length > 0) {
    const weightedSum = scoredPillars.reduce((acc, p) => acc + (p.average ?? 0) * p.weight, 0);
    const totalWeight = scoredPillars.reduce((acc, p) => acc + p.weight, 0);
    weightedIndex = Number((weightedSum / totalWeight).toFixed(2));
  } else {
    estimatedFromTriageOnly = true;
    const penalty = confirmedRedFlags.length * 0.38 + unsureRedFlags.length * 0.16;
    weightedIndex = Number(Math.max(1.0, Math.min(4.6, 4.4 - penalty)).toFixed(2));
  }

  const maturity = getMaturityForScore(weightedIndex);

  let exposureLabel: AgentGovernanceResult['exposureLabel'];
  if (confirmedRedFlags.length >= 3 || weightedIndex < 2.2) {
    exposureLabel = 'Critical Exposure';
  } else if (confirmedRedFlags.length >= 1 || unsureRedFlags.length >= 4 || weightedIndex < 3.0) {
    exposureLabel = 'Elevated Exposure';
  } else if (weightedIndex < 3.9) {
    exposureLabel = 'Developing Baseline';
  } else {
    exposureLabel = 'Audit-Ready Foundation';
  }

  const lowestPillars = [...scoredPillars]
    .sort((a, b) => (a.average ?? 5) - (b.average ?? 5))
    .slice(0, 3);

  let recommendedTier: AgentGovernanceResult['recommendedTier'];
  if (confirmedRedFlags.length >= 2 || weightedIndex < 2.65) {
    recommendedTier = {
      code: 'Tier 1 Triage',
      title: 'Tier 1 — Agent Sprawl & Identity Triage (Phase 0)',
      duration: '2–3 weeks',
      investmentRange: '€2,500 – €5,000',
      rationale:
        'Fast containment sprint to inventory active agents, assign Human Sponsors, close P0 shared-credential / SoD / FinOps red flags, and establish an executive 90-day remediation roadmap without buying new software.',
      serviceLabel: 'OP-ITG-013 — Tier 1 Agent Sprawl & Identity Triage (€2,500–€5,000)',
    };
  } else if (weightedIndex < 3.85 || confirmedRedFlags.length === 1 || unsureRedFlags.length >= 2) {
    recommendedTier = {
      code: 'Tier 2 Full Assessment',
      title: 'Tier 2 — Full 8-Pillar Enterprise AI Agent Governance Assessment',
      duration: '6–10 weeks',
      investmentRange: '€6,000 – €18,000+',
      rationale:
        'Comprehensive 40-control evidence audit, 12-field Enterprise Agent Inventory Register, Entra Agent ID & Agent 365 target blueprint, and pre-assurance mapping for EU AI Act Annex III (Dec 2, 2027) and SOX/DORA ITGC.',
      serviceLabel: 'OP-ITG-013 — Tier 2 Full 8-Pillar Agent Governance Assessment (€6,000–€18,000+)',
    };
  } else {
    recommendedTier = {
      code: 'MIP Retainer',
      title: 'Managed Intelligence Provider (MIP) — Continuous Agent Stewardship',
      duration: 'Monthly Retainer',
      investmentRange: '€2,500 – €12,000+ / mo',
      rationale:
        'Your baseline controls are strong. Sustain governance above your MSP and MSSP with monthly Agent Registry & FinOps drift checks, RAG quality audits, and quarterly board-ready regulatory packs.',
      serviceLabel: 'Managed Intelligence Provider (MIP) — Continuous Agent Governance',
    };
  }

  return {
    mode,
    answeredQuestions,
    totalQuestions,
    weightedIndex,
    estimatedFromTriageOnly,
    maturity,
    exposureLabel,
    confirmedRedFlags,
    unsureRedFlags,
    controlledRedFlagsCount,
    pillarScores,
    lowestPillars,
    recommendedTier,
  };
}

export function formatAssessmentInquiryNotes(params: {
  result: AgentGovernanceResult;
  seatBand: string;
  platforms: string[];
  clientNotes: string;
}): string {
  const { result, seatBand, platforms, clientNotes } = params;
  const modeText =
    result.answeredQuestions > 0
      ? `Full 8-Pillar (${result.answeredQuestions}/${result.totalQuestions} controls)`
      : 'Quick P0 Red-Flag Triage (10/10)';
  const rfList =
    result.confirmedRedFlags.length > 0
      ? result.confirmedRedFlags.map((r) => r.id).join(', ')
      : 'None confirmed';
  const unsureList =
    result.unsureRedFlags.length > 0
      ? ` | Unverified: ${result.unsureRedFlags.map((r) => r.id).join(', ')}`
      : '';
  const pillarLine = result.pillarScores
    .filter((p) => p.average !== null)
    .map((p) => `P${p.pillarId} ${p.shortName} ${p.average?.toFixed(1)}${p.auditCritical ? '*' : ''}`)
    .join(' | ');

  const lines = [
    '[OP-ITG-013 SELF-ASSESSMENT]',
    `Mode: ${modeText}`,
    `Seat Band: ${seatBand}`,
    `Platforms: ${platforms.length > 0 ? platforms.join(', ') : 'Not specified'}`,
    `Governance Index: ${result.weightedIndex.toFixed(2)} / 5.00 (${result.maturity.label}${result.estimatedFromTriageOnly ? ' · Triage Estimate' : ''})`,
    `Exposure Posture: ${result.exposureLabel}`,
    `P0 Red Flags: ${result.confirmedRedFlags.length}/10 (${rfList})${unsureList}`,
    `Recommended Tier: ${result.recommendedTier.code} (${result.recommendedTier.investmentRange})`,
  ];

  if (pillarLine) {
    lines.push(`Pillar Scores: ${pillarLine}`);
  }
  if (clientNotes.trim()) {
    lines.push(`Client Context: ${clientNotes.trim()}`);
  }

  return lines.join('\n').slice(0, 2000);
}

export interface ParsedPortalAssessment {
  mode: string;
  seatBand: string;
  platforms: string;
  governanceIndex: string;
  exposurePosture: string;
  redFlags: string;
  recommendedTier: string;
  pillarScores?: string;
  clientContext?: string;
}

export function parseAssessmentInquiryNotes(notes: string): ParsedPortalAssessment | null {
  if (!notes.startsWith('[OP-ITG-013 SELF-ASSESSMENT]')) return null;
  const lines = notes.split('\n');
  const getVal = (prefix: string): string => {
    const found = lines.find((l) => l.startsWith(prefix));
    return found ? found.slice(prefix.length).trim() : '';
  };
  const contextIdx = lines.findIndex((l) => l.startsWith('Client Context:'));
  const clientContext =
    contextIdx >= 0
      ? [
          lines[contextIdx].slice('Client Context:'.length).trim(),
          ...lines.slice(contextIdx + 1),
        ]
          .filter(Boolean)
          .join('\n')
      : '';

  return {
    mode: getVal('Mode:'),
    seatBand: getVal('Seat Band:'),
    platforms: getVal('Platforms:'),
    governanceIndex: getVal('Governance Index:'),
    exposurePosture: getVal('Exposure Posture:'),
    redFlags: getVal('P0 Red Flags:'),
    recommendedTier: getVal('Recommended Tier:'),
    pillarScores: getVal('Pillar Scores:') || undefined,
    clientContext: clientContext || undefined,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildAgentGovernanceScorecardHtml(params: {
  organization: string;
  contactName: string;
  role: string;
  seatBand: string;
  platforms: string[];
  result: AgentGovernanceResult;
  referenceId?: string;
}): string {
  const { organization, contactName, role, seatBand, platforms, result, referenceId } = params;
  const orgLabel = escapeHtml(organization.trim() || 'Executive Self-Assessment');
  const contactLabel = escapeHtml(
    contactName.trim() ? `${contactName.trim()} (${role.trim() || 'Executive Sponsor'})` : role.trim() || 'Executive Sponsor'
  );
  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const pillarRows = result.pillarScores
    .map((p) => {
      const pct = p.average !== null ? Math.round((p.average / 5) * 100) : 0;
      const scoreText = p.average !== null ? `${p.average.toFixed(2)} / 5.00` : 'Not scored';
      return `<tr>
        <td><b>${escapeHtml(p.title)}</b>${p.auditCritical ? ' <span class="pill">1.25× AUDIT-CRITICAL</span>' : ''}</td>
        <td style="width:120px">
          <div style="background:#e6eef2;height:7px;border-radius:3px;overflow:hidden;margin-top:3px">
            <div style="background:${p.average !== null && p.average < 2.5 ? '#b91c1c' : '#0c8b82'};height:100%;width:${pct}%"></div>
          </div>
        </td>
        <td style="text-align:right;font-weight:bold;white-space:nowrap">${scoreText}</td>
      </tr>`;
    })
    .join('');

  const redFlagRows =
    result.confirmedRedFlags.length > 0
      ? result.confirmedRedFlags
          .map(
            (rf) =>
              `<tr><td><b>${escapeHtml(rf.id)}</b></td><td><b>${escapeHtml(rf.title)}</b><br><span class="small">${escapeHtml(rf.detail)}</span></td><td><span class="pill pill-red">P0 CONFIRMED</span><br><span class="small">${escapeHtml(rf.exposureArea)}</span></td></tr>`
          )
          .join('')
      : `<tr><td colspan="3">No P0 critical red flags confirmed in self-assessment (${result.unsureRedFlags.length} flagged as unverified/unsure; ${result.controlledRedFlagsCount} reported controlled).</td></tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>OP-ITG-013 | Enterprise AI Agent Governance Scorecard</title>
<style>
@page{size:A4;margin:14mm 15mm 15mm}
*{box-sizing:border-box}
body{font-family:Arial,Helvetica,sans-serif;color:#17243a;font-size:9pt;line-height:1.4;margin:0}
h1,h2,h3,p{margin-top:0}
h1{font-size:28pt;line-height:1.08;letter-spacing:-.7px;margin:0 0 10px;color:#fff}
h2{font-size:15.5pt;line-height:1.15;margin:0 0 8px;color:#142a48}
h3{font-size:9.4pt;margin:0 0 4px;color:#075d68}
p{margin:0 0 7px}
.cover{height:262mm;background:#10253f;color:white;padding:20mm 17mm;position:relative}
.eyebrow{color:#64d4c4;text-transform:uppercase;font-size:8.5pt;letter-spacing:2px;font-weight:bold;margin-bottom:18mm}
.sub{font-size:14pt;line-height:1.35;color:#d8e4f0;max-width:155mm}
.rule{height:4px;width:28mm;background:#48c5b2;margin:12mm 0}
.covermeta{position:absolute;bottom:20mm;left:17mm;color:#c4d1df;font-size:9pt;line-height:1.6}
.covermeta strong{color:white}
.tag{display:inline-block;color:#133450;background:#cff4ee;padding:5px 10px;border-radius:12px;font-size:7.6pt;font-weight:bold;margin-top:10mm}
.page{page-break-before:always;position:relative;min-height:260mm;padding-bottom:11mm}
.kicker{font-size:7.8pt;text-transform:uppercase;color:#088477;font-weight:bold;letter-spacing:1.4px;margin-bottom:4px}
.lead{font-size:9.8pt;line-height:1.45;color:#40536b;margin-bottom:9px}
.stats{display:flex;gap:8px;margin:10px 0}
.stat{background:#eef5f7;padding:8px 10px;flex:1;border-top:3px solid #0c8b82}
.stat b{display:block;font-size:15pt;color:#142a48;line-height:1.18}
.stat span{font-size:7.4pt;color:#53667b}
.callout{background:#f0f7f7;border-left:3px solid #0c8b82;padding:8px 10px;margin:8px 0;font-size:8.4pt}
.small{font-size:7.5pt;color:#52647a;line-height:1.34}
table{width:100%;border-collapse:collapse;font-size:7.6pt;margin:6px 0 9px}
th{background:#163451;color:white;text-align:left;padding:5px 6.5px;font-size:7.1pt}
td{border-bottom:1px solid #dbe4ea;padding:4.8px 6.5px;vertical-align:top}
tr:nth-child(even) td{background:#f5f8fa}
.pill{font-size:6.4pt;white-space:nowrap;color:#075d68;font-weight:bold;background:#dff3f0;padding:1.5px 5px;border-radius:8px;display:inline-block}
.pill-red{color:#991b1b;background:#fee2e2}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:8px}
.step{background:#f3f6f8;padding:8px;border-radius:4px;border-top:2px solid #0c8b82}
.step b{color:#087d76;font-size:8.2pt;display:block;margin-bottom:3px}
.footer{position:absolute;bottom:0;border-top:1px solid #d8e1e7;padding-top:4px;width:100%;font-size:6.9pt;color:#62758a;display:flex;justify-content:space-between}
</style>
</head>
<body>
<section class="cover">
  <div class="eyebrow">CBa Consult &nbsp;&nbsp; / &nbsp;&nbsp; OP-ITG-013 Diagnostic Scorecard</div>
  <h1>Enterprise AI Agent<br>Governance Scorecard</h1>
  <p class="sub">${orgLabel}<br>8-Pillar Maturity Index · Top-10 P0 Red-Flag Triage · Recommended 2027 Remediation Path</p>
  <div class="rule"></div>
  <p style="font-size:11.2pt;max-width:148mm;color:#e5edf5;line-height:1.45">Independent, vendor-neutral diagnostic benchmarked against Microsoft Entra Agent ID &amp; Agent 365, COBIT 2019, NIST AI RMF, ISO/IEC 42001, EU AI Act Annex III (Dec 2, 2027), and SOX 404 / ISA 265 ITGC controls.</p>
  <span class="tag">EXECUTIVE DIAGNOSTIC · ${escapeHtml(result.exposureLabel.toUpperCase())}</span>
  <div class="covermeta">
    <strong>Prepared for:</strong> ${contactLabel} · ${orgLabel}<br>
    <strong>Profile:</strong> ${escapeHtml(seatBand)} &nbsp; | &nbsp; ${escapeHtml(platforms.length > 0 ? platforms.join(', ') : 'Enterprise AI Estate')}<br>
    <strong>Assessment Date:</strong> ${escapeHtml(dateStr)}${referenceId ? ` &nbsp; | &nbsp; <strong>Ref:</strong> ${escapeHtml(referenceId)}` : ''}<br>
    <strong>Advisory Lead:</strong> Menno Drescher · Director, CBa Consult (100% Conflict-Free Pre-Assurance)
  </div>
</section>

<section class="page">
  <div class="kicker">01 / Diagnostic Readout &amp; Pillar Breakdown</div>
  <h2>Weighted Agent Governance Index: ${result.weightedIndex.toFixed(2)} / 5.00</h2>
  <p class="lead">Maturity Classification: <strong>Level ${result.maturity.level} — ${escapeHtml(result.maturity.label)}</strong>. ${escapeHtml(result.maturity.description)}</p>
  <div class="stats">
    <div class="stat"><b>${result.weightedIndex.toFixed(2)} / 5</b><span>Weighted Governance Index${result.estimatedFromTriageOnly ? ' (Triage Est.)' : ''}</span></div>
    <div class="stat"><b>${result.confirmedRedFlags.length} / 10</b><span>P0 Critical Red Flags confirmed</span></div>
    <div class="stat"><b>${result.unsureRedFlags.length} / 10</b><span>Unverified controls requiring evidence</span></div>
    <div class="stat"><b>${escapeHtml(result.recommendedTier.code)}</b><span>${escapeHtml(result.recommendedTier.investmentRange)}</span></div>
  </div>
  <div class="callout"><b>Recommended Engagement Path — ${escapeHtml(result.recommendedTier.title)}</b><br>${escapeHtml(result.recommendedTier.rationale)} <em>Indicative scope: ${escapeHtml(result.recommendedTier.duration)} · ${escapeHtml(result.recommendedTier.investmentRange)} (€0 new software licenses required).</em></div>
  <h3>8-Pillar Maturity Profile (Pillars 1, 3, 4 &amp; 6 carry 1.25× audit-criticality weight)</h3>
  <table>
    <thead><tr><th>Governance Pillar</th><th>Readiness Bar</th><th style="text-align:right">Score</th></tr></thead>
    <tbody>${pillarRows}</tbody>
  </table>
  <div class="footer"><span>OP-ITG-013 · ENTERPRISE AI AGENT GOVERNANCE SCORECARD</span><span>CBa Consult &nbsp; | &nbsp; 1</span></div>
</section>

<section class="page">
  <div class="kicker">02 / P0 Critical Red Flags &amp; 90-Day Action Plan</div>
  <h2>Immediate P0 red flags requiring containment</h2>
  <p class="lead">Controls flagged below represent immediate audit, financial, or security exposures across Non-Human Identities, Segregation of Duties, FinOps ceilings, and EU AI Act Art. 12 / Annex III accountability.</p>
  <table>
    <thead><tr><th style="width:52px">ID</th><th>Risk Finding &amp; Control Exposure</th><th style="width:120px">Status / Domain</th></tr></thead>
    <tbody>${redFlagRows}</tbody>
  </table>
  <h3>Recommended 3-Step CBa Consult Delivery Path</h3>
  <div class="steps">
    <div class="step"><b>1 · 30-Min Executive Briefing</b><p class="small">Review your P0 red flags, tenant stack, and audit calendar with Menno Drescher (Director, CBa Consult). Complimentary &amp; confidential.</p></div>
    <div class="step"><b>2 · Tier 1 Triage or Tier 2 Audit</b><p class="small">Build your 12-field Enterprise Agent Inventory Register, Entra Agent ID / SoD blueprint, and EU AI Act Annex III readiness pack in 2–10 weeks.</p></div>
    <div class="step"><b>3 · Managed Intelligence (MIP)</b><p class="small">Sustain agent inventory hygiene, FinOps ceilings, and quarterly board evidence packs cleanly above your MSP and MSSP (€2.5k–€12k+/mo).</p></div>
  </div>
  <div class="callout" style="margin-top:10px"><b>Scope &amp; Independence Notice</b><br>CBa Consult delivers 100% conflict-free pre-assurance and operational governance architecture on your existing stack. Assessments do not replace your statutory auditor’s formal attestation, accredited ISO/IEC 42001 certification body, MSP tenant administration, or 24/7 MSSP SOC operations.</div>
  <div class="footer"><span>Prepared for ${orgLabel} · ${escapeHtml(dateStr)}</span><span>CBa Consult &nbsp; | &nbsp; 2</span></div>
</section>
</body>
</html>`;
}
