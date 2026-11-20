"""
CBa Consult — Executive Brief (.docx) Exporter
Generates: docs/reports/Executive_Brief_Accounting_Audit_and_Future_AI_Pricing_Strategies_2027_2030.docx
Uses the CBa Consult Executive Datasheet design system (Navy/Cyan/Slate, Segoe UI, A4).
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

# CBa Consult Brand Palette
NAVY_DARK = "0D1B2A"
NAVY_PRIMARY = "1F4E79"
CYAN_ACCENT = "00A8E8"
SLATE_LIGHT = "F2F5F9"
SLATE_BORDER = "CBD5E1"
TINT_BLUE = "E6F4FA"
CHARCOAL = RGBColor(30, 41, 59)
MUTED = RGBColor(100, 116, 139)
WHITE = RGBColor(255, 255, 255)
NAVY_RGB = RGBColor(31, 78, 121)
CYAN_RGB = RGBColor(0, 168, 232)


def set_cell_shading(cell, fill_hex):
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shading)


def set_cell_margins(cell, top=75, bottom=75, left=110, right=110):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)


def set_cell_borders(cell, top=None, bottom=None, left=None, right=None):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement('w:tcBorders')
    for side, cfg in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        if cfg is None:
            continue
        b = OxmlElement(f'w:{side}')
        b.set(qn('w:val'), cfg.get('val', 'single'))
        b.set(qn('w:sz'), str(cfg.get('sz', 4)))
        b.set(qn('w:space'), '0')
        b.set(qn('w:color'), cfg.get('color', SLATE_BORDER))
        tcBorders.append(b)
    tcPr.append(tcBorders)


def set_table_borders_none(table):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        '<w:top w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '<w:left w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '<w:bottom w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '<w:right w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '<w:insideH w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '<w:insideV w:val="none" w:sz="0" w:space="0" w:color="auto"/>'
        '</w:tblBorders>'
    )
    tblPr.append(borders)


def prevent_row_split(row):
    trPr = row._tr.get_or_add_trPr()
    trPr.append(OxmlElement('w:cantSplit'))


def set_repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    trPr.append(OxmlElement('w:tblHeader'))


def add_section_heading(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(11)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.keep_with_next = True
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(
        f'<w:pBdr {nsdecls("w")}>'
        f'<w:bottom w:val="single" w:sz="6" w:space="2" w:color="{CYAN_ACCENT}"/>'
        '</w:pBdr>'
    )
    pPr.append(pBdr)
    run = p.add_run(text)
    run.bold = True
    run.font.name = 'Segoe UI'
    run.font.size = Pt(11.5)
    run.font.color.rgb = NAVY_RGB
    return p


def add_body_para(doc, text, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.14
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(9.2)
    run.font.color.rgb = CHARCOAL
    return p


def add_bold_bullet(doc, lead, body):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1.5)
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.line_spacing = 1.13
    r1 = p.add_run(lead)
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.0)
    r1.font.color.rgb = NAVY_RGB
    r2 = p.add_run(body)
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(9.0)
    r2.font.color.rgb = CHARCOAL
    return p


def add_callout_box(doc, title, points, conclusion=None):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    prevent_row_split(tbl.rows[0])
    cc = tbl.cell(0, 0)
    set_cell_shading(cc, SLATE_LIGHT)
    set_cell_margins(cc, top=95, bottom=95, left=150, right=135)
    set_cell_borders(
        cc,
        left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT},
        top={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        right={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
    )
    cp0 = cc.paragraphs[0]
    cp0.paragraph_format.space_after = Pt(3)
    cr0 = cp0.add_run(title)
    cr0.bold = True
    cr0.font.name = 'Segoe UI'
    cr0.font.size = Pt(9.8)
    cr0.font.color.rgb = NAVY_RGB

    for lead, text in points:
        cp = cc.add_paragraph()
        cp.paragraph_format.space_before = Pt(1)
        cp.paragraph_format.space_after = Pt(2)
        cp.paragraph_format.line_spacing = 1.12
        r_l = cp.add_run(f"• {lead} ")
        r_l.bold = True
        r_l.font.name = 'Segoe UI'
        r_l.font.size = Pt(8.8)
        r_l.font.color.rgb = CHARCOAL
        r_t = cp.add_run(text)
        r_t.font.name = 'Segoe UI'
        r_t.font.size = Pt(8.8)
        r_t.font.color.rgb = CHARCOAL

    if conclusion:
        cp_end = cc.add_paragraph()
        cp_end.paragraph_format.space_before = Pt(3)
        cp_end.paragraph_format.space_after = Pt(0)
        r_end = cp_end.add_run(conclusion)
        r_end.bold = True
        r_end.font.name = 'Segoe UI'
        r_end.font.size = Pt(8.8)
        r_end.font.color.rgb = NAVY_RGB

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(4)


def add_styled_table(doc, headers, rows, col_widths=None, highlight_last_col=False):
    tbl = doc.add_table(rows=1 + len(rows), cols=len(headers))
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    set_repeat_header(tbl.rows[0])
    prevent_row_split(tbl.rows[0])

    for i, h in enumerate(headers):
        cell = tbl.rows[0].cells[i]
        if col_widths:
            cell.width = col_widths[i]
        is_last = highlight_last_col and (i == len(headers) - 1)
        set_cell_shading(cell, NAVY_DARK if is_last else NAVY_PRIMARY)
        set_cell_margins(cell, top=65, bottom=65, left=75, right=75)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.2)
        r.font.color.rgb = WHITE

    for r_idx, row_vals in enumerate(rows):
        row = tbl.rows[r_idx + 1]
        prevent_row_split(row)
        bg = SLATE_LIGHT if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_vals):
            cell = row.cells[c_idx]
            if col_widths:
                cell.width = col_widths[c_idx]
            is_last = highlight_last_col and (c_idx == len(row_vals) - 1)
            set_cell_shading(cell, TINT_BLUE if is_last else bg)
            set_cell_margins(cell, top=50, bottom=50, left=75, right=75)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.09
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.0)
            if c_idx == 0 or is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(4)
    return tbl


def build_brief(output_path):
    doc = docx.Document()

    # A4 page setup
    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.55)
        section.left_margin = Inches(0.55)
        section.right_margin = Inches(0.55)
        section.different_first_page_header_footer = False

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(4)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Executive Brief: Accounting, Audit, Retention & Future AI Pricing Strategies (2027–2030)"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(7.8)
        fr.font.color.rgb = MUTED

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(9.2)
    normal.font.color.rgb = CHARCOAL

    # 1. HEADER BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=150, bottom=150, left=190, right=190)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(3)
    r = bp1.add_run("CBA CONSULT  |  CFO, CIO & AUDIT COMMITTEE EXECUTIVE BRIEF  |  2027–2030")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.5)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(4)
    r = bp2.add_run("Accounting, Audit & Retention Comparison: Build, Lease, Subscription, Tokens & Services — and Future AI Pricing Strategies")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(14.5)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(4)
    r = bp3.add_run(
        "Comparing US GAAP / IFRS Treatment, External Audit Overhead, Subscription Retention Traps, Immutable AI Audit Trails, and Winning 2027–2030 AI Monetization Models"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.2)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("Prepared for: CFOs, Controllers, CIOs, CISOs & Audit Committees   |   Author: Menno Drescher, CBa Consult   |   Date: November 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.2)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(4)

    # 2. KPI STRIP
    kpis = [
        ("7–15 Yrs", "Statutory Retention vs.\n30–90 Day SaaS Purge"),
        ("6 Mo / 10 Yr", "EU AI Act Logs vs. Tech\nDocs (5–7+ Yr FinServ)"),
        ("3–6 / 7 Yrs", "SEC 17a-4 WORM/Audit\nTrail & SOX 404 ICFR"),
        ("4 Archetypes", "Winning 2027–2030 AI\nPricing Architectures"),
    ]
    kpi_tbl = doc.add_table(rows=1, cols=4)
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(kpis):
        c = kpi_tbl.cell(0, idx)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=80, bottom=80, left=75, right=75)
        set_cell_borders(
            c,
            top={'val': 'single', 'sz': 16, 'color': CYAN_ACCENT},
            left={'val': 'single', 'sz': 4, 'color': 'FFFFFF'},
            right={'val': 'single', 'sz': 4, 'color': 'FFFFFF'},
            bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        )
        c.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        p1 = c.paragraphs[0]
        p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p1.paragraph_format.space_after = Pt(1)
        rm = p1.add_run(metric)
        rm.bold = True
        rm.font.name = 'Segoe UI'
        rm.font.size = Pt(12.5)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.6)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(4)

    # 3. EXECUTIVE THESIS CALLOUT
    add_callout_box(
        doc,
        "Executive Thesis: Pricing Architecture Is Now an Accounting, Audit & Retention Decision",
        [
            ("No Model Is 'Free' of Hidden Charges:", "Switching from Product Build (CapEx) to Lease, Subscription, or Per-Usage AI Tokens shifts not only P&L/EBITDA optics, but also ITGC/SOC 1 audit scope, unbilled-usage close accruals, and multi-year retention liabilities."),
            ("The Subscription Retention Trap:", "A SaaS or AI subscription can be cancelled in Year 2, but tax (7–15 yrs), SOX (7 yrs), SEC 17a-4 (3–6 yrs), and EU AI Act / MiFID II (5–10 yrs) clocks keep running — creating 'zombie archive license' OpEx and IAS 37 / ASC 420 onerous-contract risk unless decoupled into WORM storage."),
            ("Telecom/Cable/Satellite Precedent for AI:", "Just as telcos, cable, and satellite operators moved from $/GB and naive 'unlimited' to speed-tiered, CIR SLA-backed, and converged FMC bundles, enterprise AI is rapidly moving past raw tokens and flat seats into 4 durable 2027–2030 pricing archetypes."),
        ],
        "Design Rule: The winning 2027–2030 AI pricing model pairs a predictable governance/SLA floor with capped variable capacity or verified outcomes — with client-owned WORM audit trails decoupled from Day 1.",
    )

    # 4. SECTION 1: 5-MODEL ACCOUNTING & AUDIT MATRIX
    add_section_heading(doc, "1. Accounting & Audit Comparison Across Five Commercial Models")
    add_styled_table(
        doc,
        ["Commercial Model", "Standards (GAAP / IFRS)", "Buyer P&L & Balance Sheet", "Seller RevRec", "External Audit Focus & Additional Charges"],
        [
            [
                "1. Product Build (CapEx / Software)",
                "IAS 38, ASC 350-40, ASC 985-20, IAS 16",
                "CapEx on Balance Sheet; amortized 3–5 yrs (boosts EBITDA)",
                "Point-in-time transfer (or PoC for custom builds)",
                "Med–High overhead: research (OpEx) vs. dev (CapEx) timesheets, labor-rate testing, annual impairment, U.S. IRC §174 tax conformity"
            ],
            [
                "2. Lease (Infra / Embedded Lease)",
                "IFRS 16 / ASC 842",
                "ROU Asset + Lease Liability (IFRS 16 boosts EBITDA; ASC 842 Operating = straight-line OpEx)",
                "Operating vs. Finance / Sales-Type lessor",
                "High overhead: lease software, IBR curves, embedded-lease reviews (dedicated GPUs/servers/terminals), IFRS 16 vs. ASC 842 dual-GAAP"
            ],
            [
                "3. Subscription (SaaS Recurring)",
                "IFRS 15 / ASC 606, ASC 340-40, ASC 350-40",
                "OpEx ratable over term (upfront cash = Prepaid Asset)",
                "Straight-line over term (upfront = Deferred Revenue)",
                "Medium overhead (spikes if on Excel): billing/ARM subledger, commission capitalization (ASC 340-40), SSP studies, side-letter checks (AS 2805)"
            ],
            [
                "4. Per-Usage / Token-Based (AI / API)",
                "IFRS 15 / ASC 606 (variable, breakage), IFRS 18",
                "Variable OpEx as consumed; unbilled usage = month-end accrual",
                "As consumed; prepaid pools = Deferred Rev + breakage",
                "HIGHEST overhead per euro: edge metering pipeline, SOC 1 / ITGC scope expansion, monthly unbilled accruals, breakage modeling, AI FinOps margin matching"
            ],
            [
                "5. Purchase of a Service (Advisory / T&M)",
                "IFRS 15 / ASC 606",
                "OpEx as delivered or milestones accepted; period-end WIP",
                "Over time (hours/milestones) or point-in-time acceptance",
                "Low–Med overhead: SOW/milestone acceptance sign-offs, period-end cutoff, verifying no undisclosed refund/clawback side letters"
            ],
        ],
        col_widths=[Inches(1.15), Inches(1.15), Inches(1.35), Inches(1.2), Inches(2.35)],
    )

    # 5. SECTION 2: SUBSCRIPTION RETENTION TRAP & IMMUTABLE AI AUDIT TRAILS
    add_section_heading(doc, "2. The Subscription Retention Trap & Immutable AI Audit-Trail Mandates")
    add_body_para(
        doc,
        "SaaS and AI subscriptions create a structural mismatch: vendors purge tenant data 30–90 days after cancellation unless buyers pay 7–12 years of zero-utility 'archive' licenses (risking IAS 37 / ASC 420 onerous-contract provisions and GDPR Art. 5(1)(e) over-retention). Simultaneously, regulators now treat AI prompts, RAG context, tool calls, and outputs as immutable business records:"
    )
    add_styled_table(
        doc,
        ["Regulatory Regime", "Mandated Records", "Minimum Retention", "Immutability & Architectural Requirement"],
        [
            [
                "EU AI Act — Art. 12, 19 & 26(6)",
                "High-Risk AI operational event logs (inputs, DBs, outputs, human oversight)",
                "≥6 months floor (Art. 19(2): 5–7+ yrs for FinServ via MiFID II / DORA)",
                "Automatic lifetime logging; financial entities integrate into DORA tamper-evident ICT governance"
            ],
            [
                "EU AI Act — Art. 18",
                "Technical docs, risk management, data governance, conformity assessments",
                "10 years after market placement / deployment",
                "Maintained at disposal of National Competent Authorities"
            ],
            [
                "SEC Rule 17a-4 / 204-2 / FINRA 4511",
                "AI-assisted client comms, research, advisory prompts, outputs & tool calls",
                "3–6 years (most recent 2 yrs readily accessible)",
                "Dual-path: Traditional WORM (S3 Object Lock / Azure Immutable Blob) OR time-stamped, hash-chained Audit-Trail Alternative"
            ],
            [
                "SOX 404 / PCAOB & Fiscal Tax (AWR / GoBD / IRS)",
                "AI financial summaries, reconciliations, metering logs, subledgers & side letters",
                "7 years (10–15 yrs for NL 30%-ruling / real estate / arbitration)",
                "100% GL tie-out (€0.00 variance + SHA-256 hash), schema-documented & queryable; GDPR Art. 18 quarantine for statutory PII"
            ],
            [
                "HIPAA & GDPR Art. 22",
                "AI logs touching PHI (HIPAA) or automated HR/profiling decisions (2027 EDPB sweep)",
                "6 yrs (HIPAA); justified statutory basis (GDPR)",
                "Pseudonymize/separate PII from immutable logs + strict RBAC to avoid GDPR over-retention penalties"
            ],
        ],
        col_widths=[Inches(1.5), Inches(1.85), Inches(1.5), Inches(2.35)],
    )

    add_bold_bullet(doc, "5-Field Minimum Immutable AI Audit Log: ", "(1) Authenticated User or Entra AI Agent ID + UTC timestamp; (2) System/user prompt + pinned model version & parameters; (3) Exact RAG document IDs / vector hashes / DB snapshots; (4) Full output, ERP/API tool calls & human approval/override; (5) Hash-chained append-only or WORM lock decoupled from vendor subscription (OP-ITG-010 / OP-RSK-005).")

    # 6. SECTION 3: LESSONS FROM TELECOM, CABLE & SATELLITE PRICING
    add_section_heading(doc, "3. Lessons from 30 Years of Telecom, Cable & Satellite Pricing (Applied to AI)")
    add_body_para(
        doc,
        "AI pricing is re-living the exact 4-stage commercial cycle proven across Nokia 5G, Starlink LEO, SES Multi-Orbit, and Comcast/Liberty Global cable: (1) Metered Scarcity ($/min, $/MB, $/1K tokens) → (2) Flat 'Unlimited' Land Grab ($20/seat) → (3) Capacity & Quality Tiering (5G speed tiers, Starlink $100–$1,500 cell surcharges, AI reasoning quotas) → (4) Converged SLA / Outcome Bundles."
    )
    add_bold_bullet(doc, "Raw Units Always Commoditize: ", "Just as $/GB collapsed into flat ARPU (forcing Nokia into 5G SA slicing and SES into CIR SLAs), raw $/million tokens is deflating 80–90%/yr. Margin shifts to determinism, latency/isolation SLAs, and verified outcomes.")
    add_bold_bullet(doc, "Flat Unlimited Breaks Under Non-Zero Marginal Cost: ", "Heavy users saturated finite radio/orbital cells; continuous autonomous AI agents break $20–$30/seat subscriptions due to real GPU inference costs.")
    add_bold_bullet(doc, "Pure Pay-Per-Use Causes CFO Bill Shock: ", "Cable 'bill roulette' drove churn until Comcast adopted 5-Year All-In Price Locks; pure token billing triggers runaway-agent FinOps shocks, forcing hybrid ceilings.")

    # 7. SECTION 4: FUTURE PROJECTION — 4 BEST AI PRICING STRATEGIES (2027–2030)
    add_section_heading(doc, "4. Projected Best-in-Class AI Pricing Strategies (2027–2030)")
    add_styled_table(
        doc,
        ["Winning AI Pricing Archetype", "Best-Fit Horizon & Segment", "Commercial & Margin Mechanics", "Accounting, Audit & Retention Advantage"],
        [
            [
                "1. Hybrid Base + Pooled Credits + Hard FinOps Ceiling",
                "2027–2028 · Mid-Market & Enterprise SaaS Default",
                "Predictable monthly platform floor + shared org token pool + hard automated budget cap & opt-in 'boost' packs",
                "Base fee recognizes ratably; pooled credits bound variable-consideration accruals; hard caps prevent CFO bill shock & late AJEs"
            ],
            [
                "2. SLA / Quality-Tiered 'CIR for AI' (Deterministic & Sovereign)",
                "2027–2029 · Regulated Finance, Health, Gov & Defense",
                "Prices reasoning depth, latency SLA, Type-1 Hyper-V / sovereign isolation & WORM auditability instead of raw tokens (SES CIR / Nokia SA model)",
                "Insulates margin from token deflation; crisp performance obligations simplify ASC 606 / IFRS 15 SSP allocation"
            ],
            [
                "3. Verified-Outcome Pricing (with Floor & Cap)",
                "2028–2030 · Vertical Workflows (Finance, Claims, Support)",
                "Charges per verified outcome (reconciled account, closed audit finding, resolved ticket) bounded by monthly floor & cap",
                "Direct CFO P&L alignment; 5-field immutable AI audit logs serve simultaneously as regulatory proof and deterministic billing proof"
            ],
            [
                "4. Decoupled Pass-Through Compute + Managed Intelligence Retainer (MIP)",
                "2027–2030 · Conflict-Free Advisory & Mid-Market (OP-ITG-018)",
                "Client owns cloud/LLM compute & WORM archive at pass-through cost; pays predictable monthly MIP retainer for governance, RAG hygiene & compliance",
                "Eliminates the Subscription Retention Trap (zero zombie archive licenses, zero IAS 37 onerous-contract risk) with clean OpEx accounting"
            ],
        ],
        col_widths=[Inches(1.5), Inches(1.25), Inches(2.2), Inches(2.25)],
        highlight_last_col=True,
    )

    # 8. CTA BANNER
    cta = doc.add_table(rows=1, cols=1)
    cta.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(cta)
    prevent_row_split(cta.rows[0])
    cta_c = cta.cell(0, 0)
    set_cell_shading(cta_c, NAVY_PRIMARY)
    set_cell_margins(cta_c, top=95, bottom=95, left=150, right=150)
    set_cell_borders(cta_c, left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})
    cp = cta_c.paragraphs[0]
    cp.paragraph_format.space_after = Pt(0)
    r1 = cp.add_run("CBA CONSULT 2027–2030 ALIGNMENT  |  ")
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.0)
    r1.font.color.rgb = CYAN_RGB
    r2 = cp.add_run(
        "Operationalize audit-ready AI pricing, WORM retention decoupling & Continuous Close via OP-FIN-009, OP-FIN-012, OP-ITG-010, OP-ITG-013, OP-RSK-004/005 & OP-ITG-018 (MIP)."
    )
    r2.bold = True
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(8.8)
    r2.font.color.rgb = WHITE

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    return output_path


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(
        root,
        "docs",
        "reports",
        "Executive_Brief_Accounting_Audit_and_Future_AI_Pricing_Strategies_2027_2030.docx",
    )
    build_brief(out)
    print(f"GENERATED: {out}")
