export type ValidationLevel = 'strong' | 'validated' | 'emerging' | 'unvalidated';

export type PortfolioTier = 'Tier A' | 'Tier B' | 'Tier C' | 'Tier D' | 'Backlog';

export interface ArtifactFile {
  name: string;
  label: string;
  path: string;
  ext: string;
  isMarkdown: boolean;
  isHtml: boolean;
  reportSlug?: string;
}

export interface Opportunity {
  id: string;
  pillar: string;
  pillarNumber: number;
  category: string;
  signatureToolkit: string;
  size: string;
  title: string;
  description: string;
  primarySkills: string;
  timeHorizon: string;
  effort: string;
  expectedCapital: string;
  scalabilityPath: string;
  risks: string;
  status: string;
  targetQuarter: string;
  marketValidation: string;
  validationLevel: ValidationLevel;
  tier: PortfolioTier;
  owner?: string;
  folder?: string;
  artifacts: ArtifactFile[];
}

export interface Hypothesis {
  id: string;
  wave: string;
  opportunity: string;
  type: string;
  statement: string;
  testPlan: string;
  successThreshold: string;
  falsificationCriteria: string;
  evidence: string;
  status: string;
}

export interface WaveItem {
  wave: string;
  targetWindow: string;
  leadIds: string;
  currentStage: string;
  nextGate: string;
  track: string;
}

export interface BaselineFeedback {
  id: string;
  affectedArtifacts: string;
  finding: string;
  resolution: string;
  status: string;
}

export interface CoreFlagship {
  strategicAsset: string;
  id: string;
  offering: string;
  buyers: string;
  triggerIp: string;
  scopeAnchor: string;
}

export interface GraduatedRepo {
  opportunityId: string;
  repoName: string;
  repoUrl: string;
  stage: string;
  progress: string;
  commercialStatus: string;
  asOf: string;
}

export interface HtmlReportEntry {
  slug: string;
  title: string;
  subtitle: string;
  sourcePath: string;
  url: string;
  pdfSourcePath?: string;
  pdfUrl?: string;
  audience?: 'internal' | 'client';
  referencePdfUrl?: string;
  referencePdfLabel?: string;
}

export type ClientReportCategory =
  | 'Executive Reports'
  | 'Flagship One-Pagers'
  | 'Executive Briefs'
  | 'Market Development';

export interface ClientReportEntry {
  slug: string;
  title: string;
  subtitle: string;
  editionLabel: string;
  pagesLabel: string;
  url: string;
  category?: ClientReportCategory;
  featuredOnHome?: boolean;
  opportunityId?: string;
  audience?: string;
  duration?: string;
  investmentAnchor?: string;
  keyHighlights?: string[];
  referencePdfUrl?: string;
  referencePdfLabel?: string;
}

export interface CoreDocumentEntry {
  title: string;
  category: string;
  path: string;
  description: string;
  referencePdfUrl?: string;
  referencePdfLabel?: string;
}

export interface PortfolioData {
  summary: {
    totalOpportunities: number;
    totalFolders: number;
    tierACount: number;
    tierBCount: number;
    tierCCount: number;
    tierDCount: number;
    activePilots: number;
    testingHypotheses: number;
    totalHypotheses: number;
    openFeedbackCount: number;
    capacityCap: string;
    currentPhase: string;
    lastUpdated: string;
    owner: string;
  };
  coreFlagships: CoreFlagship[];
  waves: WaveItem[];
  graduatedRepos: GraduatedRepo[];
  baselineFeedback: BaselineFeedback[];
  opportunities: Opportunity[];
  pillars: string[];
  hypotheses: Hypothesis[];
  htmlReports: HtmlReportEntry[];
  coreDocuments: CoreDocumentEntry[];
}

export type ExecutiveAudience =
  | 'CFO & Finance'
  | 'CIO & CISO'
  | 'COO & Commercial'
  | 'Board & PE';

export interface ClientFlagshipService {
  id: string;
  title: string;
  strategicAsset: string;
  audiences: ExecutiveAudience[];
  buyerLine: string;
  headline: string;
  summary: string;
  outcomes: string[];
  duration: string;
  investmentRange: string;
  entryWedge?: string;
  onePagerPath: string;
  featuredWide?: boolean;
}

export interface ClientCatalogItem {
  id: string;
  practice: string;
  title: string;
  description: string;
  category: string;
  organizationSize: string;
  duration: string;
  investmentRange: string;
  toolkit: string;
  onePagerPath?: string;
  isFlagship: boolean;
}

export interface ClientPortfolioData {
  principal: string;
  firm: string;
  flagships: ClientFlagshipService[];
  catalog: ClientCatalogItem[];
  practices: string[];
  mipOnePagerPath: string;
  flagshipOverviewPath: string;
  clientReports: ClientReportEntry[];
}

export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'archived';

export type EmailDeliveryStatus = 'sent' | 'not_configured' | 'failed';

export interface ScopingInquiryPayload {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  targetWindow: string;
  selectedServices: string[];
  notes: string;
}

export interface ScopingInquiryResponse {
  referenceId: string;
  submittedAt: string;
  emailDeliveryStatus: EmailDeliveryStatus;
  inquiry: ScopingInquiryPayload;
}

export interface PersistedScopingInquiry extends ScopingInquiryPayload {
  id: string;
  referenceId: string;
  status: InquiryStatus;
  adminNotes: string;
  emailDeliveryStatus: EmailDeliveryStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DeliveryChannelStatus {
  emailConfigured: boolean;
  webhookConfigured: boolean;
  notifyEmail: string | null;
}


