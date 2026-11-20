"""
CBa Consult — Executive Brief (.docx) Exporter
Generates: docs/reports/Executive_Brief_International_Expansion_Scaling_Limitations_2026_2027.docx
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


def set_cell_margins(cell, top=80, bottom=80, left=120, right=120):
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
    p.paragraph_format.space_before = Pt(12)
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
    run.font.size = Pt(12)
    run.font.color.rgb = NAVY_RGB
    return p


def add_sub_heading(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.bold = True
    run.font.name = 'Segoe UI'
    run.font.size = Pt(10)
    run.font.color.rgb = NAVY_RGB
    return p


def add_body_para(doc, text, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(9.5)
    run.font.color.rgb = CHARCOAL
    return p


def add_bold_bullet(doc, lead, body):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1.5)
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.line_spacing = 1.14
    r1 = p.add_run(lead)
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.2)
    r1.font.color.rgb = NAVY_RGB
    r2 = p.add_run(body)
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(9.2)
    r2.font.color.rgb = CHARCOAL
    return p


def add_callout_box(doc, title, points, conclusion=None):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    prevent_row_split(tbl.rows[0])
    cc = tbl.cell(0, 0)
    set_cell_shading(cc, SLATE_LIGHT)
    set_cell_margins(cc, top=100, bottom=100, left=160, right=140)
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
    cr0.font.size = Pt(10)
    cr0.font.color.rgb = NAVY_RGB

    for lead, text in points:
        cp = cc.add_paragraph()
        cp.paragraph_format.space_before = Pt(1)
        cp.paragraph_format.space_after = Pt(2)
        cp.paragraph_format.line_spacing = 1.12
        r_l = cp.add_run(f"• {lead} ")
        r_l.bold = True
        r_l.font.name = 'Segoe UI'
        r_l.font.size = Pt(9)
        r_l.font.color.rgb = CHARCOAL
        r_t = cp.add_run(text)
        r_t.font.name = 'Segoe UI'
        r_t.font.size = Pt(9)
        r_t.font.color.rgb = CHARCOAL

    if conclusion:
        cp_end = cc.add_paragraph()
        cp_end.paragraph_format.space_before = Pt(3)
        cp_end.paragraph_format.space_after = Pt(0)
        r_end = cp_end.add_run(conclusion)
        r_end.bold = True
        r_end.font.name = 'Segoe UI'
        r_end.font.size = Pt(9)
        r_end.font.color.rgb = NAVY_RGB

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
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
        set_cell_margins(cell, top=70, bottom=70, left=85, right=85)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.5)
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
            set_cell_margins(cell, top=55, bottom=55, left=85, right=85)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.1
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.3)
            if c_idx == 0:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            elif is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(4)
    return tbl


def build_executive_brief(output_path):
    doc = docx.Document()

    # A4 page setup
    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.55)
        section.bottom_margin = Inches(0.6)
        section.left_margin = Inches(0.6)
        section.right_margin = Inches(0.6)
        section.different_first_page_header_footer = False

        # Branded Footer
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(4)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Executive Brief: International Expansion Scaling Limitations (US & EU, 2026–2027)  |  Confidential"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(8)
        fr.font.color.rgb = MUTED

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(9.5)
    normal.font.color.rgb = CHARCOAL

    # 1. FULL-WIDTH NAVY HEADER BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=160, bottom=160, left=200, right=200)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(3)
    r = bp1.add_run("CBA CONSULT  |  EXECUTIVE BRIEF  |  2026–2027 STRATEGIC PORTFOLIO INTELLIGENCE")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.5)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(4)
    r = bp2.add_run("International Expansion Scaling Limitations: U.S. (State → Federal) & Europe (Country → Pan-EU)")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(15.5)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(4)
    r = bp3.add_run(
        "Structural Regulatory, Tax, Financial, Operational & Technical Barriers Capping High-Growth Revenue Conversion — and the Concrete Requirements to Clear Them"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.5)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("Prepared for: CEOs, CFOs, CIOs, CISOs & PE Operating Partners   |   Author: Menno Drescher, CBa Consult   |   Date: November 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.3)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(5)

    # 2. 4-TILE EXECUTIVE KPI STRIP
    kpis = [
        ("44% / 110%", "EU Internal Friction Tariff\n(Goods / Services — IMF)"),
        ("20+ States", "US Privacy & AI Patchwork\n(No Federal Preemption)"),
        ("$100k–$400k+", "FedRAMP 20x / CMMC L2\nFederal Revenue Gate"),
        (">50% Gap", "Mid-Market Firms Lacking\nFormal Transfer Pricing"),
    ]
    kpi_tbl = doc.add_table(rows=1, cols=4)
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(kpis):
        c = kpi_tbl.cell(0, idx)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=85, bottom=85, left=80, right=80)
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
        rm.font.size = Pt(13)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.8)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(5)

    # 3. EXECUTIVE SUMMARY CALLOUT
    add_callout_box(
        doc,
        "Executive Thesis: Why High-Growth Mid-Market & S&P MidCap Firms Stall at the Border",
        [
            ("Demand Is Not the Bottleneck:", "Across 2025–2026, S&P 500 and mid-sized firms generated major top-line gains from embedded/agentic AI, recurring ARR/servitization, hybrid cloud migration, and bolt-on M&A. Yet scaling from $20M–$50M toward $150M+ ARR routinely hits an operational, tax, and governance ceiling."),
            ("Asymmetric Transatlantic Walls:", "In the United States, scaling from single-state to multi-state/federal hits economic tax nexus, a 20+ state privacy/AI patchwork enforced by State AG coalitions, and hard FedRAMP/CMMC federal gates. In Europe, scaling from one country to pan-EU hits 27 national silos and directive 'gold-plating' equivalent to a 44% tariff on goods and 110% on services (IMF / Draghi Report)."),
            ("Compounding Cross-Border Failure:", "Multi-entity ERP fractures, 5–15 country payroll/CLA rate chaos, undocumented transfer pricing (>50% of expanding mid-sized firms), and data-sovereignty conflicts convert top-line expansion into 4–6 week reporting lag, margin leakage, and repeat audit Material Weaknesses (~36% repeat rate)."),
        ],
        "Bottom Line: Capturing cross-border AI, ARR, and M&A revenue requires building a unified, highest-common-denominator financial, data, and governance backbone BEFORE adding entities or software headcount.",
    )

    # 4. SECTION 1: UNITED STATES SCALING WALL
    add_section_heading(doc, "1. United States: Scaling from Single-State → Multi-State → Federal")
    add_body_para(
        doc,
        "U.S. mid-sized firms scaling nationally face an acute compliance paradox: even where traditional federal oversight narrows, state capitals and multi-state Attorneys General coalitions have aggressively filled the vacuum, while federal procurement gates (FedRAMP 20x, CMMC 2.0) remain hard contractual prerequisites."
    )
    add_styled_table(
        doc,
        ["U.S. Scaling Barrier", "Quantified Threshold / Cost / Deadline", "Operational Requirement to Clear", "Impact on Revenue Growth"],
        [
            [
                "Economic Tax Nexus & Conformity Divergence",
                "$100k sales or 200 transactions per state; $1,500–$5,000/state remediation + $5k–$15k+/yr multi-state payroll ops",
                "Automated real-time nexus tracking; pre-hire state withholding, SUI, local tax & PFML registration (4+ touchpoints per remote hire); state-by-state IRC §174/depreciation mapping",
                "Retroactive back-taxes & penalties erode SaaS/ARR margins across new states"
            ],
            [
                "20+ State Privacy & AI Patchwork",
                "20+ comprehensive state privacy laws (CA, CO, MD, TX) + state high-risk AI / ADMT statutes (e.g., Colorado AI Act)",
                "Baseline architecture once to the strictest state denominator (CA/CO); unify DPIAs with AI Impact Assessments; automate data-asset mapping",
                "Eliminates impossible geo-fencing of SaaS/AI products and accelerates enterprise security reviews"
            ],
            [
                "Multi-State AG Coalitions",
                "Lower settlement thresholds & faster investigative posture than federal agencies",
                "Monitor multi-state AG sweeps on data security, AI claims & pricing transparency; maintain defensible evidence trails",
                "Prevents sudden injunctions or consent decrees stalling national GTM launches"
            ],
            [
                "Federal Procurement Gates (FedRAMP 20x & CMMC 2.0)",
                "FedRAMP 20x (CR26 mandatory Jan 1, 2027): $100k–$300k (6–12 mo; 3PAO $30k–$80k+) vs. legacy $500k–$2M+. CMMC L2: $150k–$400k+ / 3-yr cycle (C3PAO $60k–$118k)",
                "Machine-readable OSCAL & Key Security Indicators (FedRAMP 20x); 110 NIST SP 800-171 controls, FIPS MFA, CUI enclave isolation & SPRS score maintenance (CMMC L2)",
                "Hard gate unlocking federal agency and defense-prime contract pools"
            ],
        ],
        col_widths=[Inches(1.4), Inches(1.65), Inches(2.25), Inches(1.8)],
    )

    # 5. SECTION 2: EUROPE SCALING WALL
    add_section_heading(doc, "2. Europe: Scaling from Single Country → Pan-European (Draghi & Letta Findings)")
    add_body_para(
        doc,
        "Despite the Single Market, Europe functions as 27 distinct national legal, tax, VAT, and labor economies. Both Mario Draghi ('The Future of European Competitiveness') and Enrico Letta ('Much More Than a Market') cite IMF gravity-model research (IMF Regional Economic Outlook: Europe, Oct 2024 — Adilbish et al.) showing that total internal EU cross-border frictions act like an ad valorem tariff equivalent of ~44% on manufactured goods (vs. ~15% across U.S. states — roughly 3× higher) and ~110% on services. Note: these are econometric tariff equivalents capturing both policy-amenable barriers (directive gold-plating, licensing, 27 labor/VAT regimes) and structural factors (language, local preferences), not actual border customs duties."
    )
    add_styled_table(
        doc,
        ["European Scaling Barrier", "Regulatory Reality & 2026–2027 Milestones", "Operational Requirement to Clear", "Impact on Revenue Growth"],
        [
            [
                "National 'Gold-Plating' of EU Directives",
                "Member states add extra local rules when transposing NIS2, CSRD, and labor/consumer directives (driving the push for the optional 28th Regime / 'EU Inc.')",
                "Design modular core controls anchored to EU Regulations (DORA, GDPR, EU AI Act) with lightweight country-specific addendum layers",
                "Prevents costly product/compliance re-engineering at every national border"
            ],
            [
                "27-Country Labor, CLA & Pay Transparency",
                "EU Pay Transparency Directive (2023/970) transposition deadline June 7, 2026 (uneven national rollout); divergent CLAs/CAOs, social security & real-time payroll (e.g., Germany)",
                "Implement a 7-layer statutory-to-contract rate waterfall (Global → Country → Sector → CLA → Entity → Dept → Contract); pre-hiring pay brackets & equity reporting",
                "Prevents accidental Permanent Establishment (PE) tax exposure and restores Revenue-vs-CoS margin truth"
            ],
            [
                "VAT & E-Invoicing Silos (ViDA)",
                "Fragmented national VAT rules transitioning into EU 'VAT in the Digital Age' (ViDA) mandatory cross-border B2B e-invoicing & real-time digital reporting",
                "Synchronize ERP billing, tax master data, and e-invoicing connectors prior to multi-country rollout",
                "Eliminates manual VAT filing bottlenecks and cross-border invoicing delays"
            ],
            [
                "Multi-Supervisor & Residency Fragmentation",
                "27 national DPAs (EDPB 2027 Recruitment AI / Art. 22 sweep), national financial regulators (AFM/DNB, BaFin, AMF), DORA 4h / NIS2 24h / GDPR 72h clocks",
                "Deploy unified multi-regime incident triage, DORA Art. 28+ Register of Information (RoI), and sovereign/partitioned data architecture",
                "Accelerates regulated enterprise procurement in banking, health, and critical infrastructure"
            ],
        ],
        col_widths=[Inches(1.4), Inches(1.7), Inches(2.25), Inches(1.75)],
    )

    # 6. SECTION 3: OPERATIONAL REQUIREMENTS CHECKLIST (EOR, ERP, TRANSFER PRICING, SOVEREIGNTY)
    add_section_heading(doc, "3. Cross-Border Operational Requirements Checklist (Multi-Entity Inflection Points)")
    add_body_para(
        doc,
        "Scaling from domestic operations into a 5–15 jurisdiction footprint requires clearing four structural inflection points in sequence:"
    )

    add_sub_heading(doc, "Phase A — Entity Architecture: EOR vs. Local Subsidiary Tipping Point")
    add_bold_bullet(doc, "EOR Sweet Spot (<5–15 employees/country): ", "Use an Employer of Record (EOR) for rapid market-testing or non-revenue remote clusters without incurring local incorporation and statutory audit overhead.")
    add_bold_bullet(doc, "Subsidiary Tipping Point (25–50 employees/country — or earlier on 4 triggers): ", "Incorporate a local entity immediately when (1) local staff sign binding contracts creating Permanent Establishment (PE) tax risk, (2) local licensing/RFP bidding requires a domestic entity, (3) local R&D creates IP requiring direct corporate ownership, or (4) visa sponsorship is required.")

    add_sub_heading(doc, "Phase B — Multi-Entity ERP Consolidation & Continuous Close")
    add_bold_bullet(doc, "Global Chart-of-Accounts (CoA) & Intercompany (IC) Elimination: ", "Standardize a global master CoA translation layer and automate IC matching/elimination (management fees, cost-plus billings, IP royalties, loans) to eliminate 4–6 week reporting lag.")
    add_bold_bullet(doc, "FX Revaluation, Audit Trails & Macro Standards: ", "Automate spot/historical FX revaluation, log every manual journal touching IC accounts, and embed IFRS 18 (Jan 2027) presentation and Pillar Two global minimum tax data feeds.")

    add_sub_heading(doc, "Phase C — Transfer Pricing (TP) Thresholds & Contemporaneous Documentation")
    add_bold_bullet(doc, "Threshold Tracking (€50M Master/Local File; €750M CbCR): ", "Over 50% of expanding mid-sized companies lack formal TP documentation — exposing them to double taxation and audit penalties. Track €50M consolidated turnover triggers (and lower local thresholds) and €750M Country-by-Country Reporting (CbCR).")
    add_bold_bullet(doc, "Contemporaneous ICAs & Operational Transfer Pricing (OTP): ", "Sign arm's-length Intercompany Agreements (ICAs) backed by economic benchmarking BEFORE cross-border invoicing begins; replace retroactive year-end spreadsheet adjustments with continuous OTP margin monitoring.")

    add_sub_heading(doc, "Phase D — Data Sovereignty, Quote-to-Cash & Highest-Common-Denominator Controls")
    add_bold_bullet(doc, "Quote-to-Cash & ASC 606 / IFRS 15 Metering: ", "Hybrid AI/SaaS pricing requires edge metering, mid-cycle amendment sync, automated SSP allocation, and a centralized Side-Letter Disclosure Registry (protecting CFOs signing AS 2805 / ISA 580 Management Representation Letters).")
    add_bold_bullet(doc, "Sovereign Partitioning & Application Rationalization: ", "Rationalize 50–100+ sprawling SaaS apps to stop in-scope SOX systems from doubling, and architect localized/cryptographic data boundaries so cross-border payroll and customer records never breach GDPR or CLOUD Act constraints.")

    # 7. SECTION 4: CBA CONSULT 2027 PORTFOLIO ALIGNMENT & EXECUTION SEQUENCING
    add_section_heading(doc, "4. CBa Consult 2027 Portfolio Alignment: Conflict-Free Pre-Assurance & Scaling Backbone")
    add_body_para(
        doc,
        "Because statutory external auditors and PE-backed Alternative Practice Structures (APS) are barred by PCAOB/AICPA and EU PIE independence rules from designing remediation controls for their own audit clients, CBa Consult operates as an independent, conflict-free pre-assurance and operating-system partner — closing the exact operational gaps that block cross-border revenue:"
    )
    add_styled_table(
        doc,
        ["Expansion Scaling Bottleneck", "CBa Consult 2027 Offering(s)", "Fixed-Scope Anchor", "Scope Boundary (Specialist Referral)"],
        [
            [
                "Handoff & Day 1–90 NRR Leakage (up to 30% context loss)",
                "OP-OPS-001 → OP-CX-001 (Quote-to-Onboarding) & OP-OPS-003 (Q2C Diagnostic)",
                "€500–€6,000+ · 3–12 wks",
                "Uses existing CRM/PM tools ($0 new software buy)"
            ],
            [
                "Multi-Entity Close Lag, AJEs & Side-Letter Audit Risk",
                "OP-FIN-009 (Continuous Close) & OP-FIN-012 (Annual Findings & Side Letters)",
                "€1,500–€5,000 · 3–8 wks",
                "Non-auditor / non-legal (external auditor keeps opinion; counsel reviews binding clauses)"
            ],
            [
                "27-Country / Multi-State Payroll, CLA & Margin Chaos",
                "OP-FIN-010 (7-Layer Statutory-to-Contract Rate Engine)",
                "€2,500–€8,000 · 8–10 wks",
                "Transfer Pricing legal filings & local VAT returns referred to licensed tax partners"
            ],
            [
                "US State + EU AI / Privacy Patchwork & Recruitment AI",
                "OP-RSK-004 ('SOC 2 for AI'), OP-HR-003 (Recruitment AI / Art. 22), OP-ITG-013 (Agent Gov)",
                "€500–€12,000+ · 4–10 wks",
                "Non-accredited ISO 42001 readiness; FedRAMP 3PAO / CMMC C3PAO referred to accredited assessors"
            ],
            [
                "EU Gold-Plating, DORA/NIS2 RoI & Clashing Incident Clocks",
                "OP-RSK-006 (DORA/NIS2 Third-Party RoI & Exit Plans) & OP-RSK-007 (Multi-Regime Incident Triage)",
                "€2,000–€8,000 · 3–8 wks",
                "Governance & triage readiness only (client MSSP/SOC owns live containment)"
            ],
            [
                "Cross-Border Data Sovereignty & Isolated Execution",
                "OP-ITG-015 (Cryptographic Sovereignty), OP-ITG-017 (MXC Hyper-V <500ms JIT), OP-ITG-010 (Retention)",
                "€2,500–€15,000+ · 4–10 wks",
                "Client owns host OS licensing & production SOC operations"
            ],
            [
                "Cross-Border M&A / PMI & Ongoing Drift Prevention",
                "OP-STR-004 / 005 (M&A Readiness & PMI Gov) & OP-ITG-018 (Managed Intelligence Provider — MIP)",
                "€2,500–€12,000+/mo (MIP)",
                "Operates above client MSP/MSSP; 100% conflict-free from statutory auditors"
            ],
        ],
        col_widths=[Inches(1.85), Inches(2.25), Inches(1.3), Inches(1.7)],
        highlight_last_col=False,
    )

    # 8. NEXT STEP CTA BANNER
    cta = doc.add_table(rows=1, cols=1)
    cta.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(cta)
    prevent_row_split(cta.rows[0])
    cta_c = cta.cell(0, 0)
    set_cell_shading(cta_c, NAVY_PRIMARY)
    set_cell_margins(cta_c, top=100, bottom=100, left=160, right=160)
    set_cell_borders(cta_c, left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})
    cp = cta_c.paragraphs[0]
    cp.paragraph_format.space_after = Pt(0)
    r1 = cp.add_run("EXECUTIVE NEXT STEP  |  ")
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.5)
    r1.font.color.rgb = CYAN_RGB
    r2 = cp.add_run(
        "Schedule a 30-minute Cross-Border Scaling & Pre-Assurance Readiness Review with Menno Drescher (CBa Consult) to benchmark your multi-entity close, rate engine, side-letter, and DORA/AI governance posture."
    )
    r2.bold = True
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(9.2)
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
        "Executive_Brief_International_Expansion_Scaling_Limitations_2026_2027.docx",
    )
    build_executive_brief(out)
    print(f"GENERATED: {out}")
