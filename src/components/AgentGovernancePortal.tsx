import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  Download,
  FileDown,
  Lock,
} from 'lucide-react';
import {
  AGENT_PLATFORMS,
  ASSESSMENT_PILLARS,
  buildAgentGovernanceScorecardHtml,
  calculateAgentGovernanceScore,
  formatAssessmentInquiryNotes,
  MATURITY_RUBRIC,
  SEAT_BANDS,
  TOP_10_RED_FLAGS,
  type AssessmentMode,
  type RedFlagAnswer,
} from '../data/agentGovernanceAssessment';
import { saveScopingInquiryToFirestore } from '../firebase';
import type { ScopingInquiryResponse } from '../types';
import { exportHtmlStringToPdf } from '../utils/pdfExport';

interface AgentGovernancePortalProps {
  onBackToShowcase: () => void;
  onSwitchToInternal: () => void;
}

export const AgentGovernancePortal: React.FC<AgentGovernancePortalProps> = ({
  onBackToShowcase,
  onSwitchToInternal,
}) => {
  const [mode, setMode] = useState<AssessmentMode>('triage');
  const [seatBand, setSeatBand] = useState<string>('250–1,000 seats');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'Microsoft 365 Copilot / Copilot Studio',
  ]);
  const [redFlagAnswers, setRedFlagAnswers] = useState<Record<string, RedFlagAnswer>>({});
  const [questionScores, setQuestionScores] = useState<Record<string, number>>({});
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // Executive Briefing Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('CIO / CISO');
  const [targetWindow, setTargetWindow] = useState('Q2 2027');
  const [clientNotes, setClientNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ScopingInquiryResponse | null>(null);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const result = useMemo(
    () => calculateAgentGovernanceScore(mode, redFlagAnswers, questionScores),
    [mode, redFlagAnswers, questionScores]
  );

  const triageAnsweredCount = Object.keys(redFlagAnswers).length;
  const activePillar = ASSESSMENT_PILLARS[activePillarIndex] ?? ASSESSMENT_PILLARS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const setRedFlag = (id: string, answer: RedFlagAnswer) => {
    setRedFlagAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const setQuestionScore = (questionId: string, score: number) => {
    setQuestionScores((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleCopyShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.set('assessment', 'agent-governance');
    navigator.clipboard?.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadPdf = async () => {
    if (exportingPdf) return;
    setExportingPdf(true);
    setExportError(null);
    try {
      const html = buildAgentGovernanceScorecardHtml({
        organization,
        contactName: fullName,
        role,
        seatBand,
        platforms: selectedPlatforms,
        result,
        referenceId: confirmation?.referenceId,
      });
      const slugOrg = (organization.trim() || 'enterprise')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 32);
      await exportHtmlStringToPdf(html, `OP-ITG-013-Scorecard-${slugOrg}`);
    } catch {
      setExportError('Unable to export PDF scorecard right now. Please try again.');
    } finally {
      setExportingPdf(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const mdLines = [
      '# OP-ITG-013 — Enterprise AI Agent Governance Self-Assessment Findings',
      '',
      `- **Organization:** ${organization.trim() || 'Not specified'}`,
      `- **Contact:** ${fullName.trim() || 'Not specified'} (${role.trim() || 'Executive Sponsor'})`,
      `- **Seat Band:** ${seatBand}`,
      `- **Agent Platforms:** ${selectedPlatforms.join(', ') || 'Not specified'}`,
      `- **Weighted Governance Index:** ${result.weightedIndex.toFixed(2)} / 5.00 (Level ${result.maturity.level} — ${result.maturity.label})`,
      `- **Exposure Posture:** ${result.exposureLabel}`,
      `- **Recommended Entry:** ${result.recommendedTier.title} (${result.recommendedTier.duration} · ${result.recommendedTier.investmentRange})`,
      '',
      '## Top-10 P0 Red-Flag Triage',
      ...TOP_10_RED_FLAGS.map((rf) => {
        const ans = redFlagAnswers[rf.id];
        const status =
          ans === 'yes'
            ? 'P0 EXPOSURE CONFIRMED'
            : ans === 'unsure'
            ? 'Unverified / Unsure'
            : ans === 'no'
            ? 'Controlled'
            : 'Not answered';
        return `- **${rf.id} (${rf.title}):** ${status}`;
      }),
      '',
      '## 8-Pillar Maturity Breakdown',
      ...result.pillarScores.map(
        (p) =>
          `- **${p.title}${p.auditCritical ? ' (1.25×)' : ''}:** ${
            p.average !== null ? `${p.average.toFixed(2)} / 5.00` : 'Not scored'
          }`
      ),
      '',
      '_Generated via CBa Consult Opportunities 2027 — OP-ITG-013 Self-Assessment Portal_',
    ];

    const blob = new Blob([mdLines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OP-ITG-013-Findings-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmitBriefing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = fullName.trim().slice(0, 120);
    const cleanEmail = email.trim().slice(0, 160);
    const cleanOrg = organization.trim().slice(0, 160);
    const cleanRole = (role.trim() || 'CIO / CISO').slice(0, 120);

    if (cleanName.length < 2 || cleanOrg.length < 2) {
      setFormError('Please enter your full name and organization (at least 2 characters).');
      return;
    }
    if (cleanEmail.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setFormError('Please enter a valid work email address.');
      return;
    }

    const structuredNotes = formatAssessmentInquiryNotes({
      result,
      seatBand,
      platforms: selectedPlatforms,
      clientNotes,
    });

    const selectedServices = [
      result.recommendedTier.serviceLabel,
      `OP-ITG-013 Portal · Index ${result.weightedIndex.toFixed(2)}/5.00 · ${result.confirmedRedFlags.length} P0 Red Flags`,
    ];

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          organization: cleanOrg,
          role: cleanRole,
          targetWindow,
          selectedServices,
          notes: structuredNotes,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || 'Unable to submit your executive briefing request.');
        return;
      }

      const confirmed = json as ScopingInquiryResponse;
      await saveScopingInquiryToFirestore(
        confirmed.referenceId,
        confirmed.inquiry,
        confirmed.emailDeliveryStatus
      );
      setConfirmation(confirmed);
    } catch {
      setFormError('Unable to save your briefing request right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-[#17243a] flex flex-col">
      {/* Top Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#dae3e9]">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={onBackToShowcase}
            className="font-display text-lg font-bold tracking-tight text-[#10253f] whitespace-nowrap shrink-0 cursor-pointer"
          >
            CBa Consult
          </button>

          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#40536b]"
            aria-label="Assessment steps"
          >
            <button
              type="button"
              onClick={() => scrollToSection('portal-context')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              01. Profile
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('portal-redflags')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              02. P0 Red Flags
            </button>
            {mode === 'full' && (
              <button
                type="button"
                onClick={() => scrollToSection('portal-pillars')}
                className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                03. 8-Pillar Audit
              </button>
            )}
            <button
              type="button"
              onClick={() => scrollToSection('portal-scorecard')}
              className="hover:text-[#10253f] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {mode === 'full' ? '04. Scorecard & Briefing' : '03. Scorecard & Briefing'}
            </button>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('portal-scorecard')}
              className="px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Executive Briefing
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Band */}
        <section className="bg-white border-b border-[#dae3e9]">
          <div className="max-w-[1280px] mx-auto px-6 py-10 lg:py-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBackToShowcase}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#40536b] hover:text-[#10253f] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to CBa Consult Client Portfolio
              </button>

              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0c8b82] hover:text-[#075d68] cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedLink ? 'Assessment Link Copied' : 'Copy Shareable Assessment Link'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="text-xs font-semibold text-[#0c8b82]">
                  OP-ITG-013 · Enterprise AI Agent Governance Self-Assessment · Vendor-Neutral
                </div>
                <h1 className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-bold text-[#10253f] leading-[1.1] tracking-tight max-w-3xl">
                  Benchmark your enterprise AI agent governance before regulators or auditors do
                </h1>
                <p className="text-[15.5px] leading-[1.6] text-[#40536b] max-w-[66ch]">
                  Surface shadow copilots, shared credentials, uncapped token spend, and EU AI Act
                  Annex III (December 2, 2027) gaps across Microsoft Copilot Studio, Power Platform,
                  SaaS, and custom agents. Complete the 5-minute P0 Red-Flag Triage or the full
                  40-control diagnostic to generate an executive PDF scorecard.
                </p>
              </div>

              {/* Mode Selector Card */}
              <div className="lg:col-span-4 bg-[#f5f8fa] border border-[#dae3e9] rounded-md p-5 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-[#10253f]">Choose Assessment Depth</div>
                  <p className="text-xs text-[#52647a] mt-1">
                    Switch between quick triage and full 8-pillar scoring at any time without losing
                    your answers.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('triage')}
                    className={`w-full text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                      mode === 'triage'
                        ? 'bg-white border-[#0c8b82]'
                        : 'bg-white/60 border-[#dae3e9] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#10253f]">Quick P0 Red-Flag Triage</span>
                      <span className="font-mono text-[#0c8b82] tabular-nums">5 min · 10 checks</span>
                    </div>
                    <p className="text-xs text-[#52647a] mt-1">
                      Fast exposure check across the 10 most critical identity, SoD, FinOps, and
                      audit risks.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('full')}
                    className={`w-full text-left p-3.5 rounded-md border transition-colors cursor-pointer ${
                      mode === 'full'
                        ? 'bg-white border-[#0c8b82]'
                        : 'bg-white/60 border-[#dae3e9] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#10253f]">Full 8-Pillar Maturity Audit</span>
                      <span className="font-mono text-[#0c8b82] tabular-nums">
                        15 min · 40 controls
                      </span>
                    </div>
                    <p className="text-xs text-[#52647a] mt-1">
                      Evidence-backed 1–5 scoring with 1.25× audit-critical pillar weighting.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* 4-Column Benchmark Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dae3e9] border border-[#dae3e9] rounded-md overflow-hidden">
              <div className="bg-[#f5f8fa] p-4">
                <div className="text-xs text-[#52647a]">Live Governance Index</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#10253f] mt-0.5">
                  {result.weightedIndex.toFixed(2)} / 5.00
                </div>
                <div className="text-xs text-[#0c8b82] mt-0.5">
                  Level {result.maturity.level} · {result.maturity.label}
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-4">
                <div className="text-xs text-[#52647a]">P0 Red Flags Confirmed</div>
                <div
                  className={`text-xl font-bold font-mono tabular-nums mt-0.5 ${
                    result.confirmedRedFlags.length > 0 ? 'text-[#b91c1c]' : 'text-[#0c8b82]'
                  }`}
                >
                  {result.confirmedRedFlags.length} / 10
                </div>
                <div className="text-xs text-[#52647a] mt-0.5">
                  {result.unsureRedFlags.length} unverified · {result.controlledRedFlagsCount}{' '}
                  controlled
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-4">
                <div className="text-xs text-[#52647a]">Regulatory Alignment</div>
                <div className="text-xl font-bold font-mono tabular-nums text-[#10253f] mt-0.5">
                  Dec 2, 2027
                </div>
                <div className="text-xs text-[#52647a] mt-0.5">
                  EU AI Act Annex III · ISO 42001 · SOX ITGC
                </div>
              </div>
              <div className="bg-[#f5f8fa] p-4">
                <div className="text-xs text-[#52647a]">Recommended Entry</div>
                <div className="text-lg font-bold text-[#10253f] mt-0.5 truncate">
                  {result.recommendedTier.code}
                </div>
                <div className="text-xs font-mono tabular-nums text-[#0c8b82] mt-0.5">
                  {result.recommendedTier.investmentRange}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Organization Profile */}
        <section id="portal-context" className="max-w-[1280px] mx-auto px-6 py-10 space-y-6">
          <div>
            <div className="text-xs font-semibold text-[#0c8b82] mb-1">01. Organization Context</div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#10253f] tracking-tight">
              Define your seat band and active AI agent estate
            </h2>
          </div>

          <div className="bg-white border border-[#dae3e9] rounded-md p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#10253f]">Organization Seat Band</div>
              <div className="flex flex-wrap gap-2">
                {SEAT_BANDS.map((band) => {
                  const active = seatBand === band;
                  return (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setSeatBand(band)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#10253f] text-white border-[#10253f]'
                          : 'bg-[#f5f8fa] text-[#40536b] border-[#dae3e9] hover:bg-[#eef5f7]'
                      }`}
                    >
                      {band}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs font-semibold text-[#10253f]">
                Active or Piloted Agent Platforms (Select all that apply)
              </div>
              <div className="flex flex-wrap gap-2">
                {AGENT_PLATFORMS.map((platform) => {
                  const active = selectedPlatforms.includes(platform);
                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#eef5f7] text-[#075d68] border-[#0c8b82]'
                          : 'bg-white text-[#40536b] border-[#dae3e9] hover:bg-[#f5f8fa]'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Top-10 P0 Red-Flag Triage */}
        <section id="portal-redflags" className="max-w-[1280px] mx-auto px-6 pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-[#0c8b82] mb-1">
                02. Top-10 Immediate P0 Red-Flag Triage
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#10253f] tracking-tight">
                Check for high-impact identity, SoD, FinOps, and audit exposures
              </h2>
              <p className="text-sm text-[#40536b] mt-1">
                Answer based on verifiable tenant evidence—not informal verbal assurance. Mark{' '}
                <strong>Unsure / Unverified</strong> wherever no current audit artifact exists.
              </p>
            </div>
            <div className="text-xs font-mono tabular-nums text-[#52647a] whitespace-nowrap shrink-0">
              {triageAnsweredCount} / 10 reviewed
            </div>
          </div>

          <div className="bg-white border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9]">
            {TOP_10_RED_FLAGS.map((rf) => {
              const current = redFlagAnswers[rf.id];
              return (
                <div
                  key={rf.id}
                  className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#52647a]">
                      <span className="font-mono font-semibold text-[#10253f]">{rf.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#0c8b82] font-medium">{rf.exposureArea}</span>
                      <span aria-hidden="true">·</span>
                      <span>Pillar {rf.pillarId}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#10253f]">{rf.title}</h3>
                    <p className="text-xs text-[#40536b] leading-relaxed">{rf.detail}</p>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-[#f5f8fa] border border-[#dae3e9] rounded-md shrink-0 self-start lg:self-center">
                    <button
                      type="button"
                      onClick={() => setRedFlag(rf.id, 'yes')}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        current === 'yes'
                          ? 'bg-[#b91c1c] text-white'
                          : 'text-[#52647a] hover:text-[#10253f]'
                      }`}
                    >
                      P0 Exposure
                    </button>
                    <button
                      type="button"
                      onClick={() => setRedFlag(rf.id, 'unsure')}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        current === 'unsure'
                          ? 'bg-[#76520a] text-white'
                          : 'text-[#52647a] hover:text-[#10253f]'
                      }`}
                    >
                      Unsure
                    </button>
                    <button
                      type="button"
                      onClick={() => setRedFlag(rf.id, 'no')}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        current === 'no'
                          ? 'bg-[#0c8b82] text-white'
                          : 'text-[#52647a] hover:text-[#10253f]'
                      }`}
                    >
                      Controlled
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {mode === 'triage' && (
            <div className="bg-[#eef5f7] border border-[#dae3e9] rounded-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#10253f]">
                  Want a weighted pillar-by-pillar Maturity Index across all 40 controls?
                </div>
                <p className="text-xs text-[#40536b]">
                  Expand into the full 8-pillar diagnostic (or scroll directly below to export your
                  P0 Triage Scorecard and request a 30-minute briefing).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMode('full');
                  setTimeout(() => scrollToSection('portal-pillars'), 60);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#10253f] bg-white hover:bg-[#f5f8fa] border border-[#dae3e9] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Expand 8-Pillar Audit (40 Controls)
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </section>

        {/* Step 3: Full 8-Pillar 40-Control Audit (Shown in Full Mode) */}
        {mode === 'full' && (
          <section
            id="portal-pillars"
            className="bg-white border-y border-[#dae3e9] py-12"
          >
            <div className="max-w-[1280px] mx-auto px-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="text-xs font-semibold text-[#0c8b82] mb-1">
                    03. Full 8-Pillar Maturity Assessment (40 Controls)
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#10253f] tracking-tight">
                    Rate each control from 1 (Ad Hoc) to 5 (Optimized / Auditable)
                  </h2>
                  <p className="text-sm text-[#40536b] mt-1">
                    Pillars 1, 3, 4, and 6 carry a <strong>1.25× audit-criticality weight</strong>{' '}
                    in the Overall Agent Governance Index.
                  </p>
                </div>
                <div className="text-xs font-mono tabular-nums text-[#52647a] whitespace-nowrap shrink-0">
                  {result.answeredQuestions} / {result.totalQuestions} controls scored
                </div>
              </div>

              {/* Rubric Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                {MATURITY_RUBRIC.map((r) => (
                  <div
                    key={r.level}
                    className="bg-[#f5f8fa] border border-[#dae3e9] rounded-md p-3"
                  >
                    <div className="font-bold text-[#10253f] font-mono tabular-nums">
                      {r.level} · {r.shortLabel}
                    </div>
                    <div className="text-[11px] text-[#52647a] mt-1 leading-snug">
                      {r.description}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Pillar Selector */}
                <div className="xl:col-span-4 border border-[#dae3e9] rounded-md divide-y divide-[#dae3e9] overflow-hidden">
                  {ASSESSMENT_PILLARS.map((pillar, idx) => {
                    const summary = result.pillarScores[idx];
                    const active = idx === activePillarIndex;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={`w-full text-left p-3.5 transition-colors cursor-pointer ${
                          active ? 'bg-[#eef5f7]' : 'bg-white hover:bg-[#f8fbfc]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="font-mono text-[#52647a]">
                            Pillar {pillar.id}
                            {pillar.auditCritical ? ' · 1.25× Critical' : ''}
                          </span>
                          <span className="font-mono tabular-nums font-semibold text-[#0c8b82]">
                            {summary.average !== null
                              ? `${summary.average.toFixed(1)}/5`
                              : `${summary.answeredCount}/5`}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-[#10253f] mt-0.5">
                          {pillar.title.replace(/^Pillar \d+\s*—\s*/, '')}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Questions */}
                <div className="xl:col-span-8 border border-[#dae3e9] rounded-md overflow-hidden">
                  <div className="px-5 py-4 bg-[#f5f8fa] border-b border-[#dae3e9] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-[#0c8b82] font-semibold">
                        {activePillar.auditCritical
                          ? 'Audit-Critical Pillar · 1.25× Weight'
                          : 'Standard Pillar · 1.00× Weight'}
                      </div>
                      <h3 className="text-base font-bold text-[#10253f] mt-0.5">
                        {activePillar.title}
                      </h3>
                    </div>
                    <div className="text-xs font-mono tabular-nums text-[#10253f] font-semibold">
                      Pillar Avg:{' '}
                      {result.pillarScores[activePillarIndex]?.average !== null
                        ? `${result.pillarScores[activePillarIndex].average?.toFixed(2)} / 5.00`
                        : '—'}
                    </div>
                  </div>

                  <div className="divide-y divide-[#dae3e9]">
                    {activePillar.questions.map((q) => {
                      const val = questionScores[q.id];
                      return (
                        <div key={q.id} className="p-5 space-y-3">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-[#10253f] leading-relaxed">
                              <span className="font-mono font-bold text-[#0c8b82] mr-2">
                                {q.id}
                              </span>
                              {q.prompt}
                            </div>
                            <div className="text-xs text-[#52647a]">
                              Required evidence: {q.evidenceHint}
                            </div>
                          </div>

                          <div className="grid grid-cols-5 gap-1.5">
                            {MATURITY_RUBRIC.map((levelInfo) => {
                              const selected = val === levelInfo.level;
                              return (
                                <button
                                  key={levelInfo.level}
                                  type="button"
                                  onClick={() => setQuestionScore(q.id, levelInfo.level)}
                                  className={`py-2 px-2 text-xs font-medium rounded border transition-colors cursor-pointer text-center ${
                                    selected
                                      ? 'bg-[#10253f] text-white border-[#10253f]'
                                      : 'bg-[#f5f8fa] text-[#40536b] border-[#dae3e9] hover:bg-[#eef5f7]'
                                  }`}
                                >
                                  <span className="font-mono tabular-nums font-bold">
                                    {levelInfo.level}
                                  </span>
                                  <span className="hidden sm:inline"> · {levelInfo.shortLabel}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-5 py-3.5 bg-[#f5f8fa] border-t border-[#dae3e9] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActivePillarIndex((i) => Math.max(0, i - 1))}
                      disabled={activePillarIndex === 0}
                      className="px-3.5 py-1.5 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] disabled:opacity-40 rounded-md cursor-pointer"
                    >
                      Previous Pillar
                    </button>
                    {activePillarIndex < ASSESSMENT_PILLARS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setActivePillarIndex((i) => i + 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
                      >
                        Next Pillar ({activePillarIndex + 2} of {ASSESSMENT_PILLARS.length})
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollToSection('portal-scorecard')}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#0c8b82] hover:bg-[#075d68] rounded-md cursor-pointer"
                      >
                        Review Executive Scorecard
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Executive Scorecard & Briefing Request */}
        <section id="portal-scorecard" className="max-w-[1280px] mx-auto px-6 py-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-[#0c8b82] mb-1">
                {mode === 'full' ? '04.' : '03.'} Executive Scorecard &amp; 30-Minute Briefing
              </div>
              <h2 className="text-2xl font-bold text-[#10253f] tracking-tight">
                Download your diagnostic scorecard or book a confidential readout
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#10253f] bg-white border border-[#dae3e9] hover:bg-[#eef5f7] rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download Findings (.md)
              </button>
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={exportingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                {exportingPdf ? 'Exporting PDF...' : 'Download PDF Scorecard'}
              </button>
            </div>
          </div>

          {exportError && (
            <div className="px-4 py-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs font-medium text-[#b91c1c]">
              {exportError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Live Scorecard Summary Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="bg-white border border-[#dae3e9] rounded-md p-6 space-y-5">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#dae3e9]">
                  <div>
                    <div className="text-xs text-[#52647a]">Weighted Agent Governance Index</div>
                    <div className="text-3xl font-bold font-mono tabular-nums text-[#10253f] mt-1">
                      {result.weightedIndex.toFixed(2)}{' '}
                      <span className="text-base font-normal text-[#52647a]">/ 5.00</span>
                    </div>
                    <div className="text-xs font-semibold text-[#0c8b82] mt-1">
                      Level {result.maturity.level} — {result.maturity.label}
                      {result.estimatedFromTriageOnly ? ' · Estimated from P0 Triage' : ''}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#52647a]">Exposure Posture</div>
                    <div
                      className={`text-sm font-bold mt-1 ${
                        result.exposureLabel === 'Critical Exposure'
                          ? 'text-[#b91c1c]'
                          : result.exposureLabel === 'Elevated Exposure'
                          ? 'text-[#76520a]'
                          : 'text-[#0c8b82]'
                      }`}
                    >
                      {result.exposureLabel}
                    </div>
                    <div className="text-xs font-mono tabular-nums text-[#52647a] mt-0.5">
                      {result.confirmedRedFlags.length} P0 Red Flags
                    </div>
                  </div>
                </div>

                {/* Recommended Engagement Box */}
                <div className="bg-[#eef5f7] border border-[#dae3e9] rounded-md p-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#10253f]">
                      Recommended Entry: {result.recommendedTier.title}
                    </span>
                    <span className="text-xs font-mono tabular-nums font-semibold text-[#075d68]">
                      {result.recommendedTier.duration} · {result.recommendedTier.investmentRange}
                    </span>
                  </div>
                  <p className="text-xs text-[#40536b] leading-relaxed">
                    {result.recommendedTier.rationale}
                  </p>
                </div>

                {/* 8-Pillar Bars */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-[#10253f]">
                    8-Pillar Readiness Profile
                  </div>
                  {result.pillarScores.map((p) => {
                    const pct = p.average !== null ? Math.round((p.average / 5) * 100) : 0;
                    return (
                      <div key={p.pillarId} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#40536b]">
                            P{p.pillarId} · {p.shortName}
                            {p.auditCritical ? (
                              <span className="text-[#0c8b82] font-medium"> (1.25×)</span>
                            ) : null}
                          </span>
                          <span className="font-mono tabular-nums text-[#10253f] font-medium">
                            {p.average !== null ? `${p.average.toFixed(2)} / 5` : 'Not scored'}
                          </span>
                        </div>
                        <div className="h-2 bg-[#eef5f7] rounded-xs overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              p.average !== null && p.average < 2.5
                                ? 'bg-[#b91c1c]'
                                : 'bg-[#0c8b82]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Confirmed P0 List */}
                {result.confirmedRedFlags.length > 0 && (
                  <div className="pt-3 border-t border-[#dae3e9] space-y-2">
                    <div className="text-xs font-semibold text-[#b91c1c]">
                      Confirmed P0 Critical Red Flags ({result.confirmedRedFlags.length})
                    </div>
                    <ul className="space-y-1 text-xs text-[#40536b]">
                      {result.confirmedRedFlags.map((rf) => (
                        <li key={rf.id}>
                          <strong className="font-mono text-[#10253f]">{rf.id}:</strong> {rf.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Executive Briefing Submission Column */}
            <div className="lg:col-span-6 bg-white border border-[#dae3e9] rounded-md p-6 sm:p-7">
              {confirmation ? (
                <div className="space-y-5">
                  <div className="pb-4 border-b border-[#dae3e9]">
                    <div className="text-xs font-semibold text-[#0c8b82]">
                      OP-ITG-013 Briefing Request Recorded
                    </div>
                    <h3 className="text-xl font-bold text-[#10253f] mt-0.5">
                      Reference {confirmation.referenceId}
                    </h3>
                  </div>

                  <p className="text-sm text-[#40536b] leading-relaxed">
                    Thank you, <strong>{confirmation.inquiry.fullName}</strong>. Your{' '}
                    <strong>OP-ITG-013</strong> scorecard for{' '}
                    <strong>{confirmation.inquiry.organization}</strong> (Index{' '}
                    <span className="font-mono font-semibold text-[#10253f]">
                      {result.weightedIndex.toFixed(2)}/5.00
                    </span>
                    , {result.confirmedRedFlags.length} P0 red flags) has been securely logged for
                    review with Menno Drescher.
                  </p>

                  <div className="p-4 bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-xs space-y-1.5 text-[#40536b]">
                    <div>
                      <strong className="text-[#10253f]">Recommended Scope:</strong>{' '}
                      {result.recommendedTier.title} ({result.recommendedTier.investmentRange})
                    </div>
                    <div>
                      <strong className="text-[#10253f]">Seat Band:</strong> {seatBand}
                    </div>
                    <div>
                      <strong className="text-[#10253f]">Target Window:</strong>{' '}
                      {confirmation.inquiry.targetWindow}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={exportingPdf}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] rounded-md cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      {exportingPdf ? 'Exporting PDF...' : 'Download PDF with Reference ID'}
                    </button>
                    <button
                      type="button"
                      onClick={onBackToShowcase}
                      className="text-xs font-medium text-[#0c8b82] hover:text-[#075d68] cursor-pointer"
                    >
                      Return to Client Portfolio
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitBriefing} className="space-y-4" noValidate>
                  <div className="pb-3 border-b border-[#dae3e9]">
                    <h3 className="text-lg font-bold text-[#10253f]">
                      Book a 30-Minute Executive Briefing
                    </h3>
                    <p className="text-xs text-[#52647a] mt-1 leading-relaxed">
                      Submit your self-assessment scorecard directly to Menno Drescher to review
                      your P0 exposures and receive a fixed-scope Tier 1 Triage or Tier 2 proposal
                      within 5 business days.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="portal-name"
                        className="block text-xs font-semibold text-[#10253f] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="portal-name"
                        type="text"
                        required
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Pieter de Vries"
                        className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="portal-email"
                        className="block text-xs font-semibold text-[#10253f] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="portal-email"
                        type="email"
                        required
                        maxLength={160}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="portal-org"
                        className="block text-xs font-semibold text-[#10253f] mb-1.5"
                      >
                        Organization *
                      </label>
                      <input
                        id="portal-org"
                        type="text"
                        required
                        maxLength={160}
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Company or Group name"
                        className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="portal-role"
                        className="block text-xs font-semibold text-[#10253f] mb-1.5"
                      >
                        Executive Role
                      </label>
                      <input
                        id="portal-role"
                        type="text"
                        maxLength={120}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="CIO, CISO, CAIO, CFO..."
                        className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="portal-window"
                      className="block text-xs font-semibold text-[#10253f] mb-1.5"
                    >
                      Target Engagement Window
                    </label>
                    <select
                      id="portal-window"
                      value={targetWindow}
                      onChange={(e) => setTargetWindow(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                    >
                      <option value="Immediate / Exploratory">Immediate / Exploratory</option>
                      <option value="Q1 2027">Q1 2027</option>
                      <option value="Q2 2027">Q2 2027</option>
                      <option value="H2 2027">H2 2027</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="portal-notes"
                      className="block text-xs font-semibold text-[#10253f] mb-1.5"
                    >
                      Additional Context (Audit Dates, Microsoft 365 / Copilot Goals)
                    </label>
                    <textarea
                      id="portal-notes"
                      rows={3}
                      maxLength={900}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Optional context on upcoming SOX/DORA/EU AI Act milestones or agent rollouts..."
                      className="w-full px-3.5 py-2 text-sm bg-[#f5f8fa] border border-[#dae3e9] rounded-md text-[#10253f] focus:outline-none focus:bg-white focus:border-[#0c8b82]"
                    />
                  </div>

                  {formError && (
                    <div className="text-xs font-medium text-[#dc2626]">{formError}</div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-[#52647a]">
                      Your scorecard scores &amp; P0 flags are attached automatically.
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2.5 text-sm font-medium text-white bg-[#10253f] hover:bg-[#1e3b5c] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {submitting ? 'Submitting Scorecard...' : 'Submit & Request Briefing'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#10253f] text-[#c4d1df] border-t border-[#1e3b5c]">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-display font-bold text-white">CBa Consult</span> · Menno Drescher
            · OP-ITG-013 Enterprise AI Agent Governance Diagnostic (100% Conflict-Free)
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onBackToShowcase}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Client Portfolio Showcase
            </button>
            <button
              type="button"
              onClick={onSwitchToInternal}
              className="inline-flex items-center gap-1.5 text-[#48c5b2] hover:text-white transition-colors font-medium cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              Internal Portfolio Explorer
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
