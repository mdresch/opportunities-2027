import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import type {
  ArtifactFile,
  BaselineFeedback,
  CoreDocumentEntry,
  CoreFlagship,
  GraduatedRepo,
  HtmlReportEntry,
  Hypothesis,
  Opportunity,
  PortfolioData,
  PortfolioTier,
  ValidationLevel,
  WaveItem,
} from './src/types';

const ROOT_DIR = process.cwd();
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

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
    slug: 'executive-summary',
    title: 'Opportunities 2027 — Executive Summary',
    subtitle: 'Board-ready portfolio brief, Core 5 flagships, and Tailored Hybrid SIDPA funnel',
    sourcePath: 'docs/reports/Opportunities_2027_Executive_Summary.html',
    url: '/reports/executive-summary',
  },
  {
    slug: 'priority-report',
    title: 'Opportunities 2027 — Priority Report',
    subtitle: 'Strategic-value priority index, execution waves, and evidence coverage',
    sourcePath: 'docs/reports/Opportunities_2027_Priority_Report.html',
    url: '/reports/priority-report',
  },
  {
    slug: 'continuous-close-gantt',
    title: 'OP-FIN-009 — Continuous Close Monthly Gantt',
    subtitle: '23rd payroll close to post-3rd reporting monthly cadence timeline',
    sourcePath: 'opportunities/OP-FIN-009_Continuous_Close/Continuous_Close_Monthly_Gantt_Chart.html',
    url: '/reports/continuous-close-gantt',
  },
  {
    slug: 'design-reference',
    title: 'Opportunities 2027 — Layout & Colour Reference',
    subtitle: 'CBa Consult visual specification: deep navy, signal teal, mint, and slate',
    sourcePath: '.pandaos/designs/ab84d569d9a45662/v2.html',
    url: '/reports/design-reference',
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
    htmlReports: HTML_REPORTS,
    coreDocuments: CORE_DOCUMENTS,
  };
}

const ALLOWED_ROOT_MD = new Set([
  'README.md',
  'Tier_A_Executive_Summary_2027.md',
  'ideation-template.md',
  'inventory-of-ideas.md',
  'market-analysis-2027.md',
]);

function resolveSafeMarkdownPath(relPath: string): string | null {
  if (!relPath || typeof relPath !== 'string') return null;
  const normalized = relPath.replace(/\\/g, '/').replace(/^\/+/, '');
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

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/portfolio', (_req, res) => {
    try {
      const data = buildPortfolioData();
      res.json(data);
    } catch (err) {
      console.error('Error building portfolio data:', err);
      res.status(500).json({ error: 'Failed to load portfolio data' });
    }
  });

  app.get('/api/document', (req, res) => {
    const reqPath = typeof req.query.path === 'string' ? req.query.path : '';
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

  app.get('/reports/:slug', (req, res) => {
    const entry = HTML_REPORTS.find((r) => r.slug === req.params.slug);
    if (!entry) {
      res.status(404).send('Report not found');
      return;
    }
    const fullPath = path.resolve(ROOT_DIR, entry.sourcePath);
    if (!fs.existsSync(fullPath)) {
      res.status(404).send('Report file missing');
      return;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(fullPath);
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(ROOT_DIR, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Opportunities 2027 Portfolio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
