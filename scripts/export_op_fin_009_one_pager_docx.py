"""
CBa Consult — Client Service One-Pager (.docx) Exporter for OP-FIN-009
Generates: opportunities/OP-FIN-009_Continuous_Close/One_Pager_OP-FIN-009_Continuous_Close.docx
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
    p.paragraph_format.space_before = Pt(7)
    p.paragraph_format.space_after = Pt(3.5)
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
    run.font.size = Pt(10.8)
    run.font.color.rgb = NAVY_RGB
    return p


def add_body_para(doc, text, space_after=3.5):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.13
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(8.8)
    run.font.color.rgb = CHARCOAL
    return p


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
        set_cell_margins(cell, top=50, bottom=50, left=75, right=75)
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
            set_cell_margins(cell, top=42, bottom=42, left=75, right=75)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.07
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(7.9)
            if c_idx == 0 or is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(2.5)
    return tbl


def build_one_pager(output_path):
    doc = docx.Document()

    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.42)
        section.bottom_margin = Inches(0.44)
        section.left_margin = Inches(0.55)
        section.right_margin = Inches(0.55)
        section.different_first_page_header_footer = False

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(2)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Client Service Datasheet: Continuous Close & Real-Time Reconciliation Bridge (OP-FIN-009)  |  2027 Core Flagship"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(7.6)
        fr.font.color.rgb = MUTED

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(8.8)
    normal.font.color.rgb = CHARCOAL

    # 1. HEADER BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=120, bottom=120, left=170, right=170)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(2)
    r = bp1.add_run("CBA CONSULT  |  CLIENT SERVICE DATASHEET  |  CORE 5 TIER A FLAGSHIP (OP-FIN-009)")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.1)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(2.5)
    r = bp2.add_run("Continuous Close & Real-Time Reconciliation Bridge")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(15.5)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(2.5)
    r = bp3.add_run(
        "Close Faster After the 3rd — Bridging 23rd Payroll, 4-4-5 Revenue/CoS, Dual Calendars & IFRS 18 With $0 New Close Software"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.1)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("For: CFOs, Corporate Controllers & PE Portfolio Finance Leads   |   Provider: Menno Drescher, CBa Consult   |   Nov 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(7.9)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(3)

    # 2. 4-TILE KPI STRIP
    kpis = [
        ("$0 Software", "Runs on Your Existing ERP,\nHRIS & BI (No FCCS/BlackLine)"),
        ("≤2–3 Days", "Target Post-3rd Attested\nClose & €0.00 Clearing Delta"),
        ("Jan 1, 2027", "EU-Endorsed IFRS 18\nSubtotals & Audited MPMs"),
        ("10 Guardrails", "23rd→3rd+, 4-4-5, Dual-Cal\n& 1,500-hr CoS Tie-Out"),
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
        rm.font.size = Pt(11.2)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.3)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(2)

    # 3. WHY NOW
    add_section_heading(doc, "1. The 23rd → 3rd+ Blind Spot & 2027 IFRS 18 Pressure")
    add_body_para(
        doc,
        "Most mid-market finance teams lock payroll around the 23rd yet still scramble for 6–10+ business days after month-end reconciling clearing accounts, 4-4-5 weekly revenue vs. monthly salaried payroll, late subcontractor accruals, and split Fiscal (01-01–31-12) vs. Budget (01-07–30-06) calendars. With IFRS 18 officially EU-endorsed (Feb 13, 2026) and mandatory Jan 1, 2027, unwatermarked 'flash' KPIs risk triggering audited Management-Defined Performance Measure (MPM, ¶117) disclosures and Cost-of-Sales-by-nature (¶78–83) audit exceptions. OP-FIN-009 codifies CBa Consult's battle-tested RGP Continuous Close methodology on your existing ERP — with $0 new software spend."
    )

    # 4. 3-PHASE LOOP
    add_section_heading(doc, "2. The 3-Phase Exception-Based Close Loop")
    add_styled_table(
        doc,
        ["Close Window", "Operational Phase", "Controller Actions & Automated Controls"],
        [
            ["Days 1–22", "1. Continuous Transaction Matching", "Daily bank, AP, AR & card feeds auto-match; unmatched exceptions carry standardized Reason Codes and clear weekly (<5-day aging)."],
            ["23rd – Month-End", "2. Payroll Lock & Pre-Validated JEs", "23rd payroll lock triggers 24th–25th HRIS-to-GL sync (€0.00 clearing), 4-4-5 CoS proration, WIP + subcontractor accruals & Preparer→Approver JEs."],
            ["Days 1–3+", "3. Exception-Only Variance & Lock", "Day-1 auto-reversals fire; in-tolerance accounts auto-certify; Controller reviews only working-day normalized >5% breaks; attested IFRS 18 KPIs publish post-3rd."],
        ],
        col_widths=[Inches(1.15), Inches(1.85), Inches(4.1)],
    )

    # 5. 10 GUARDRAILS SUMMARY
    add_section_heading(doc, "3. Ten Built-In Financial Truth & Revenue-vs.-CoS Guardrails (FIN-CC-01–10)")
    add_styled_table(
        doc,
        ["Control Group", "Guardrails & Audit-Ready Standards Embedded"],
        [
            ["Core Close & SoD\n(FIN-CC-01–06)", "23rd–cutoff delta formulas; mandatory Day-1 auto-reversals; working-day normalized >5% MRC variance alerts; 24th–25th HRIS-to-GL sync; sequenced dependency gates; tiered Preparer≠Approver & IFRS 18 ¶117 MPM SoD."],
            ["Dual-Calendar & 4-4-5\n(FIN-CC-07–08)", "Dual period tags (01-01–31-12 Fiscal vs. 01-07–30-06 Budget; H2+H1 = Statutory FY, €0.00 delta); 1–5 day 31-12/30-06 stub-day bridge; 4-4-5 working-day CoS proration (20/20/25 days) & PTO liability drawdown."],
            ["WIP, Subcontractors & 1,500-hr CoS\n(FIN-CC-09–10)", "Simultaneous Unbilled WIP Revenue & Unvouchered Subcontractor CoS cutoff prior to Fixed-Price % of Completion; 1,500 billable hrs/yr Standard CoS Rate (115.38h / 144.23h 4-4-5) tied to actual HRIS payroll at €0.00 variance (IFRS 18 ¶83)."],
        ],
        col_widths=[Inches(1.85), Inches(5.25)],
    )

    # 6. SCOPE & INVESTMENT
    add_section_heading(doc, "4. Fixed-Scope 6–8 Week Pilot & Natural Extensions")
    add_styled_table(
        doc,
        ["Engagement", "Timeline & Deliverables", "Investment"],
        [
            [
                "OP-FIN-009 Pilot\n(Zero New Software)",
                "6–8 weeks (6–10 hrs/wk): (1) 23rd→3rd+ Close Calendar & Dependency Gate Blueprint, (2) 10-Guardrail Accrual & Revenue/CoS Playbook, (3) IFRS 18 + SoD & Official KPI Matrix, (4) Live Monthly Dry-Run Validation (≤2–3 days post-3rd, €0.00 clearing delta).",
                "€1,500–€5,000\nfixed scope"
            ],
            [
                "Phase 2 Extensions\n(Conflict-Free)",
                "OP-FIN-010 (7-Layer Statutory-to-Contract Rate Engine on 1,500-hr baseline), OP-FIN-012 (Annual Accountant Findings & Side-Letter Readiness), or OP-ITG-018 (Managed Intelligence Retainer).",
                "Scoped post-\ndry-run readout"
            ],
        ],
        col_widths=[Inches(1.55), Inches(4.35), Inches(1.2)],
        highlight_last_col=True,
    )

    # 7. CTA BANNER
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
        "Book a 25-minute Close-Bottleneck & IFRS 18 Review with Menno Drescher (CBa Consult) to benchmark your 23rd → 3rd+ close calendar and identify immediate $0-software reconciliation wins."
    )
    r2.bold = True
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(8.6)
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
        "One_Pager_OP-FIN-009_Continuous_Close.docx",
    )
    build_one_pager(out)
    print(f"GENERATED: {out}")
