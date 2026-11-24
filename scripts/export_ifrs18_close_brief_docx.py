"""
CBa Consult — Client-Facing Executive Brief (.docx) Exporter for IFRS 18 Close Readiness
Generates: opportunities/OP-FIN-009_Continuous_Close/Executive_Brief_IFRS_18_Close_and_KPI_Controls_2027.docx
Uses the CBa Consult Executive Datasheet design system (Navy/Cyan/Slate, Segoe UI, A4).
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

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


def set_cell_margins(cell, top=55, bottom=55, left=95, right=95):
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
    p.paragraph_format.space_before = Pt(8.5)
    p.paragraph_format.space_after = Pt(4)
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
    run.font.size = Pt(11)
    run.font.color.rgb = NAVY_RGB
    return p


def add_body_para(doc, text, space_after=4, font_size=8.6, color=CHARCOAL):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.13
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(font_size)
    run.font.color.rgb = color
    return p


def add_callout_box(doc, title, points, conclusion=None):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    prevent_row_split(tbl.rows[0])
    cc = tbl.cell(0, 0)
    set_cell_shading(cc, SLATE_LIGHT)
    set_cell_margins(cc, top=80, bottom=80, left=135, right=120)
    set_cell_borders(
        cc,
        left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT},
        top={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        right={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
    )
    cp0 = cc.paragraphs[0]
    cp0.paragraph_format.space_after = Pt(2.5)
    cr0 = cp0.add_run(title)
    cr0.bold = True
    cr0.font.name = 'Segoe UI'
    cr0.font.size = Pt(9.6)
    cr0.font.color.rgb = NAVY_RGB

    for lead, text in points:
        cp = cc.add_paragraph()
        cp.paragraph_format.space_before = Pt(1)
        cp.paragraph_format.space_after = Pt(2)
        cp.paragraph_format.line_spacing = 1.12
        r_l = cp.add_run(f"• {lead} ")
        r_l.bold = True
        r_l.font.name = 'Segoe UI'
        r_l.font.size = Pt(8.6)
        r_l.font.color.rgb = CHARCOAL
        r_t = cp.add_run(text)
        r_t.font.name = 'Segoe UI'
        r_t.font.size = Pt(8.6)
        r_t.font.color.rgb = CHARCOAL

    if conclusion:
        cp_end = cc.add_paragraph()
        cp_end.paragraph_format.space_before = Pt(2.5)
        cp_end.paragraph_format.space_after = Pt(0)
        r_end = cp_end.add_run(conclusion)
        r_end.bold = True
        r_end.font.name = 'Segoe UI'
        r_end.font.size = Pt(8.6)
        r_end.font.color.rgb = NAVY_RGB

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(3)


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
        set_cell_margins(cell, top=52, bottom=52, left=78, right=78)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.1)
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
            set_cell_margins(cell, top=44, bottom=44, left=78, right=78)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.08
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.0)
            if c_idx == 0 or is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(3)
    return tbl


def build_brief(output_path):
    doc = docx.Document()

    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.45)
        section.bottom_margin = Inches(0.46)
        section.left_margin = Inches(0.55)
        section.right_margin = Inches(0.55)
        section.different_first_page_header_footer = False

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(2)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Executive Brief: IFRS 18 Close, Cost-of-Sales & KPI Control Checklist (2027)"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(7.7)
        fr.font.color.rgb = MUTED

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(8.9)
    normal.font.color.rgb = CHARCOAL

    # 1. HEADER BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=125, bottom=125, left=175, right=175)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(2)
    r = bp1.add_run("CBA CONSULT  |  CFO & CONTROLLER EXECUTIVE BRIEF  |  2027 IFRS 18 READINESS")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.2)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(3)
    r = bp2.add_run("IFRS 18 Close, Cost-of-Sales & KPI Control Checklist (2027)")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(15.5)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(3)
    r = bp3.add_run(
        "Practical Close-Control Guardrails for Operating Profit Subtotals, Audited MPMs (¶117), CoS-by-Nature Tie-Outs (¶78–83), Dual Calendars & 4-4-5 Cutovers"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.0)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("Prepared for: CFOs, Corporate Controllers & Audit Committees   |   Author: Menno Drescher, CBa Consult   |   November 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.0)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(3.5)

    # 2. 4-TILE KPI STRIP
    kpis = [
        ("Feb 13, 2026", "EU Endorsement Confirmed\n(Official Journal Feb 16, 2026)"),
        ("Jan 1, 2027", "Mandatory Effective Date\n(2026 Comparative Shadow Year)"),
        ("¶117 & ¶121–123", "Audited MPM Single-Note\n+ Tax & NCI Reconciliation"),
        ("¶78–83", "CoS by Function Must Tie\nto Expenses-by-Nature Note"),
    ]
    kpi_tbl = doc.add_table(rows=1, cols=4)
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(kpis):
        c = kpi_tbl.cell(0, idx)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=65, bottom=65, left=65, right=65)
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
        rm.font.size = Pt(11.0)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.3)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(2.5)

    # 3. EXECUTIVE CALLOUT BOX
    add_callout_box(
        doc,
        "Why IFRS 18 Changes Monthly Close Controls — Not Just Year-End Footnotes",
        [
            ("Chart-of-Accounts & Close Cutover:", "IFRS 18 supersedes IAS 1 on 1 January 2027 (with 2026 comparative restatement), forcing every automated accrual, payroll allocation, and sub-ledger feed into standardized Operating, Investing, and Financing categories."),
            ("Flash KPIs & 53-Week MPM Risk:", "Unwatermarked intra-month 'Adjusted EBITDA' dashboards, split-budget presentations, or external '52-week comparable' adjustments risk falling under IFRS 18 ¶117 audited Management-Defined Performance Measures (MPMs)."),
            ("Calendar Collisions:", "Groups running 01-01–31-12 Statutory Fiscal Years alongside 01-07–30-06 Company Budgets and 4-4-5 weekly periods hit IFRS 18 dead center at Month 7 (H2) of their BY26/27 budget."),
        ],
        "Operational Mandate: Align CoA tags, provisional KPI watermarks, CoS-by-nature tie-outs, and SoD before January 2027 close cycles begin.",
    )

    # 4. SECTION 1: 5 STRUCTURAL CHANGES
    add_section_heading(doc, "1. Five Structural IFRS 18 Changes Impacting Monthly Close & Margin Truth")
    add_styled_table(
        doc,
        ["IFRS 18 Mandate", "Standard Requirement (Effective Jan 1, 2027)", "Direct Monthly Close & Margin Impact"],
        [
            [
                "1. Five P&L Categories & Operating Profit",
                "All income and expenses classify into Operating, Investing, Financing, Income Taxes, or Discontinued Operations with mandatory Operating Profit subtotals.",
                "Requires clean CoA mapping on all 23rd-payroll, FX, and recurring accrual templates so postings never require late year-end reclass AJEs."
            ],
            [
                "2. Audited MPMs (¶117 & ¶121–123)",
                "Non-IFRS subtotals used in public communications communicating management's performance view require a single audited note with tax & NCI reconciliations.",
                "Unwatermarked flash EBITDA/margin packs or unapproved investor-deck adjustments create unverified MPMs inside statutory audit scope."
            ],
            [
                "3. CoS by Function vs. Nature Note (¶78–83)",
                "Entities presenting Cost of Sales by function must enforce consistent CoS vs. SG&A boundaries and disclose total Employee Benefits & D&A by nature.",
                "HRIS gross-to-net payroll must tie cleanly (€0.00 variance) to CoS Employee Benefits + SG&A Employee Benefits with zero ad-hoc bench shifting."
            ],
            [
                "4. Mid-Budget Cutover (01-01 vs. 01-07)",
                "2026–2027 comparative restatement applies from 1 January 2027 regardless of internal commercial budget calendars.",
                "Companies on 01-07–30-06 budgets cross from legacy IAS 1 (Jul–Dec 2026 H1) to IFRS 18 (Jan–Jun 2027 H2) mid-year, breaking Budget-vs-Actuals without a bridge."
            ],
            [
                "5. 4-4-5 Stub Days & 53rd-Week Adjustments",
                "Statutory reporting requires exact fiscal period cutoffs and transparent MPM reconciliations for non-GAAP calendar normalizing adjustments.",
                "Requires a documented 1–5 day 31-12 stub bridge plus ¶117 MPM controls whenever '52-week comparable Operating Profit' is communicated externally."
            ],
        ],
        col_widths=[Inches(1.5), Inches(2.65), Inches(2.95)],
    )

    # 5. SECTION 2: MANDATORY CLOSE-CONTROL & SOD DESIGN RULES
    add_section_heading(doc, "2. Mandatory Close-Control & Segregation-of-Duties (SoD) Guardrails")
    add_styled_table(
        doc,
        ["Control Domain", "Mandatory Design Rule (Zero New Software Required)", "Audit & Governance Outcome"],
        [
            [
                "Provisional Dashboard Watermarking",
                "Watermark every flash report issued between the 23rd payroll lock and Day-3+ GL lock as: 'PROVISIONAL — INTERNAL MANAGEMENT VIEW ONLY (NOT AN IFRS 18 SUBTOTAL OR PUBLIC MPM)'.",
                "Eliminates accidental ¶117 public MPM classification while keeping management visibility live."
            ],
            [
                "CoA Category, Function & Nature Tagging",
                "Tag every recurring accrual, 4-4-5 proration, and Day-1 auto-reversal template with Category (Operating), Function (CoS vs. SG&A), and Nature (Employee Benefits vs. Subcontractors).",
                "Automates ¶78–83 single-note extraction and prevents late year-end adjusting journal entries."
            ],
            [
                "MPM vs. GL Close SoD Separation",
                "Separate GL Close Preparer/Approver (Controller / Accounting) from MPM Definition & Tax/NCI Reconciliation Owner (CFO / FP&A / Disclosure Committee).",
                "Closes ISA 265 / PCAOB Management Review Control (MRC) and SoD audit findings."
            ],
            [
                "Dual-Calendar, 4-4-5 & 1,500-Hr Tie-Out",
                "Prorate monthly salaried CoS across 20/20/25 workdays, reconcile H2 Prior + H1 Current Budget = Statutory FY (€0.00 delta), and tie 1,500-hr standard CoS absorption to actual HRIS payroll.",
                "Eliminates 4-4-5 Gross Margin sawtooth, Jun 30 bonus distortion, and phantom EAC revenue."
            ],
        ],
        col_widths=[Inches(1.6), Inches(3.3), Inches(2.2)],
    )

    # 6. SECTION 3: 6-POINT CFO READINESS SELF-CHECK
    add_section_heading(doc, "3. Six-Point CFO & Controller Readiness Self-Check (Ahead of Jan 1, 2027)")
    add_styled_table(
        doc,
        ["#", "2027 IFRS 18 Close Readiness Verification Question", "Target State", "Ready?"],
        [
            ["1", "Are all 2026 comparative and 2027 GL accounts mapped to IFRS 18's 5 P&L categories & Operating Profit subtotal?", "100% CoA mapped", "[  ] Y / [  ] N"],
            ["2", "Have all investor/board KPIs been inventoried against ¶117 to separate internal flash metrics from audited MPMs?", "MPM register locked", "[  ] Y / [  ] N"],
            ["3", "Do Days 23–3 provisional close dashboards carry mandatory non-public / non-MPM watermarking?", "Watermark enforced", "[  ] Y / [  ] N"],
            ["4", "Does HRIS payroll reconcile monthly (€0.00 delta) to CoS Employee Benefits + SG&A Employee Benefits per ¶83?", "€0.00 monthly tie-out", "[  ] Y / [  ] N"],
            ["5", "Is an H2+H1 Budget-to-Statutory bridge in place if Company Budget (01-07–30-06) differs from Fiscal (01-01–31-12)?", "Dual-YTD bridge active", "[  ] Y / [  ] N"],
            ["6", "Are Preparer/Reviewer SoD and MPM tax/NCI reconciliation owners formally assigned ahead of external audit?", "Signed SoD matrix", "[  ] Y / [  ] N"],
        ],
        col_widths=[Inches(0.35), Inches(4.55), Inches(1.25), Inches(0.95)],
        highlight_last_col=False,
    )

    # 7. SCOPE NOTICE & SOURCES
    add_body_para(
        doc,
        "Scope Notice & Primary Sources: This Executive Brief provides operational close-control and Management Review Control (MRC) readiness guidance only and does not constitute formal statutory accounting advice or an audit opinion (your statutory external auditor retains sole authority over financial-statement attestation). Sources: IFRS Foundation IFRS 18 Presentation and Disclosure in Financial Statements (¶78–83, ¶117, ¶121–123); EU Commission Endorsement (13 February 2026, Official Journal 16 February 2026; mandatory 1 January 2027).",
        space_after=5,
        font_size=7.7,
        color=MUTED,
    )

    # 8. CTA BANNER
    cta = doc.add_table(rows=1, cols=1)
    cta.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(cta)
    prevent_row_split(cta.rows[0])
    cta_c = cta.cell(0, 0)
    set_cell_shading(cta_c, NAVY_PRIMARY)
    set_cell_margins(cta_c, top=75, bottom=75, left=130, right=130)
    set_cell_borders(cta_c, left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})
    cp = cta_c.paragraphs[0]
    cp.paragraph_format.space_after = Pt(0)
    r1 = cp.add_run("NEXT STEP  |  ")
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9)
    r1.font.color.rgb = CYAN_RGB
    r2 = cp.add_run(
        "Schedule a 25-minute Close-Bottleneck & IFRS 18 Readiness Review with Menno Drescher (CBa Consult) to benchmark your CoA mapping, MPM governance, and 23rd → 3rd+ close controls — 100% conflict-free from your statutory auditor."
    )
    r2.bold = True
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(8.5)
    r2.font.color.rgb = WHITE

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    return output_path


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(
        root,
        "opportunities",
        "OP-FIN-009_Continuous_Close",
        "Executive_Brief_IFRS_18_Close_and_KPI_Controls_2027.docx",
    )
    build_brief(out)
    print(f"GENERATED: {out}")
