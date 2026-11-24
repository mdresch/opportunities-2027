"""
CBa Consult — Client Proposal & Fixed-Scope SOW (.docx) Exporter for OP-FIN-009
Generates: opportunities/OP-FIN-009_Continuous_Close/Client_Proposal_and_SOW_Continuous_Close_Bridge.docx
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
    p.paragraph_format.space_before = Pt(9)
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


def add_body_para(doc, text, space_after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.14
    run = p.add_run(text)
    run.font.name = 'Segoe UI'
    run.font.size = Pt(9)
    run.font.color.rgb = CHARCOAL
    return p


def add_callout_box(doc, title, points, conclusion=None):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    prevent_row_split(tbl.rows[0])
    cc = tbl.cell(0, 0)
    set_cell_shading(cc, SLATE_LIGHT)
    set_cell_margins(cc, top=85, bottom=85, left=140, right=125)
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
        r_l.font.size = Pt(8.7)
        r_l.font.color.rgb = CHARCOAL
        r_t = cp.add_run(text)
        r_t.font.name = 'Segoe UI'
        r_t.font.size = Pt(8.7)
        r_t.font.color.rgb = CHARCOAL

    if conclusion:
        cp_end = cc.add_paragraph()
        cp_end.paragraph_format.space_before = Pt(3)
        cp_end.paragraph_format.space_after = Pt(0)
        r_end = cp_end.add_run(conclusion)
        r_end.bold = True
        r_end.font.name = 'Segoe UI'
        r_end.font.size = Pt(8.7)
        r_end.font.color.rgb = NAVY_RGB

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(3.5)


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
        set_cell_margins(cell, top=55, bottom=55, left=80, right=80)
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
            set_cell_margins(cell, top=46, bottom=46, left=80, right=80)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.09
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.1)
            if c_idx == 0 or is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(3.5)
    return tbl


def build_proposal_sow(output_path):
    doc = docx.Document()

    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.45)
        section.bottom_margin = Inches(0.48)
        section.left_margin = Inches(0.55)
        section.right_margin = Inches(0.55)
        section.different_first_page_header_footer = False

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(2)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Client Proposal & Fixed-Scope SOW: Continuous Close & Reconciliation Bridge  |  November 2026"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(7.7)
        fr.font.color.rgb = MUTED

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(9)
    normal.font.color.rgb = CHARCOAL

    # 1. HEADER BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=130, bottom=130, left=180, right=180)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(2)
    r = bp1.add_run("CBA CONSULT  |  CLIENT PROPOSAL & FIXED-SCOPE STATEMENT OF WORK")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.2)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(3)
    r = bp2.add_run("Continuous Close & Real-Time Reconciliation Bridge")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(16)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(3)
    r = bp3.add_run(
        "Fixed-Scope Advisory & Close-Control Implementation: Bridging 23rd Payroll, 4-4-5 Margin Truth, Dual Calendars & IFRS 18 With $0 New Software"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.1)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("Prepared for: Chief Financial Officer & Corporate Controller   |   Advisor: Menno Drescher, Director — CBa Consult   |   November 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(4)

    # 2. 4-TILE KPI STRIP
    kpis = [
        ("≤2–3 Days", "Target Attested Monthly\nClose Post-3rd"),
        ("€0.00 Delta", "24th–25th HRIS-to-GL\nPayroll Clearing Target"),
        ("$0 Software", "Runs Inside Your Existing\nERP, HRIS & BI Stack"),
        ("100% Conflict-Free", "Independent From Your\nExternal Statutory Auditor"),
    ]
    kpi_tbl = doc.add_table(rows=1, cols=4)
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(kpis):
        c = kpi_tbl.cell(0, idx)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=70, bottom=70, left=70, right=70)
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
        rm.font.size = Pt(11.5)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.5)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(3)

    # 3. EXECUTIVE SUMMARY CALLOUT
    add_callout_box(
        doc,
        "1. Executive Summary & Target Business Outcomes",
        [
            ("Eliminate Close Bottlenecks:", "Move from a 6–10+ business-day month-end scramble to an exception-based attested close in ≤2–3 business days post-3rd, with €0.00 payroll clearing variance."),
            ("Fix Revenue-vs.-CoS & Calendar Distortion:", "Harmonize 23rd-locked payroll, 4-4-5 weekly revenue/CoS cutoffs (20/20/25 workdays), 1,500-hr standard CoS absorption, and split Statutory Fiscal (01-01–31-12) vs. Company Budget (01-07–30-06) calendars."),
            ("2027 IFRS 18 & Audit Readiness:", "Embed EU-endorsed IFRS 18 compliance (mandatory Jan 1, 2027) covering Operating Profit subtotals, ¶78–83 Cost-of-Sales-by-nature tie-outs, ¶117 MPM watermarking, and PCAOB/ISA 265 SoD controls."),
        ],
        "Commercial Promise: Delivered strictly on your existing ERP, HRIS, bank feeds, and BI tools — zero BlackLine, Workiva, or FCCS software purchase required.",
    )

    # 4. 3 CFO CONTROL PILLARS
    add_section_heading(doc, "2. The Three Financial Truth Pillars (10 Built-In Close & Audit Guardrails)")
    add_styled_table(
        doc,
        ["CFO Control Pillar", "Embedded Guardrails (FIN-CC-01–10)", "What This Fixes for Your P&L & External Audit"],
        [
            [
                "Pillar 1 · Close Speed, Automated Accruals & SoD",
                "FIN-CC-01–06: 23rd–cutoff delta formulas; Day-1 auto-reversals; working-day normalized >5% MRC alerts; 24th–25th HRIS sync; sequenced dependency gates; Preparer ≠ Approver SoD.",
                "Eliminates double-counted reversals, late year-end AJEs, and repeat auditor findings on Management Review Control (MRC) precision and Segregation of Duties."
            ],
            [
                "Pillar 2 · Dual-Calendar & 4-4-5 Margin Truth",
                "FIN-CC-07–08: Dual period tags (01-01–31-12 Fiscal vs. 01-07–30-06 Budget); 31-12/30-06 stub-day bridge; 4-4-5 (20/20/25 day) CoS proration & Vacation Liability drawdown.",
                "Stops the Gross Margin sawtooth between 4-wk and 5-wk months, ties H2 Prior + H1 Current Budget to Statutory FY (€0.00 delta), and isolates June bonus true-ups."
            ],
            [
                "Pillar 3 · WIP, Subcontractors, 1,500-Hr CoS & IFRS 18",
                "FIN-CC-09–10: Simultaneous Unbilled WIP & Unvouchered Subcontractor CoS cutoff; 1,500-hr/yr Standard CoS Rate (115.38h/144.23h) absorption bridge; IFRS 18 ¶78–83 & ¶117 rules.",
                "Prevents Fixed-Price % of Completion revenue errors, surfaces bench vs. over-absorption, ties CoS + SG&A Employee Benefits to HRIS, and shields flash KPIs from ¶117 MPM scope."
            ],
        ],
        col_widths=[Inches(1.65), Inches(2.65), Inches(2.8)],
    )

    # 5. 8-WEEK TIMELINE
    add_section_heading(doc, "3. Sprint Timeline, Deliverables & 5-Business-Day Acceptance")
    add_styled_table(
        doc,
        ["Window", "Sprint Phase", "Workshops & Core Activities", "Signed Deliverable"],
        [
            ["Weeks 1–2", "Baseline & Bottleneck Map", "Run 25-control diagnostic; map critical path from 23rd payroll lock to post-3rd close; inventory manual JEs, clearing breaks & calendar gaps.", "1. Close Calendar & Dependency Gate Blueprint"],
            ["Weeks 3–4", "Guardrail & Matching Playbook", "Configure 10 guardrails: 23rd deltas, Day-1 reversals, normalized >5% alerts, 24th–25th HRIS sync, Dual-Cal & 4-4-5 CoS proration, WIP/subcontractor & 1,500-hr tie-out.", "2. Accrual & Revenue-vs.-CoS Playbook (Option A ends)"],
            ["Weeks 5–6", "IFRS 18, Official KPIs & SoD", "Watermark provisional views; lock Official KPI whitelist; map IFRS 18 subtotals, ¶78–83 Nature tie-out & ¶117 MPM SoD; enforce GDPR PII masking.", "3. GAAP / IFRS 18 + SoD & Official KPI Matrix"],
            ["Weeks 7–8", "Live Monthly Dry-Run & Handover", "Shadow one live monthly close cycle (23rd→3rd+); verify ≤2–3 day close & €0.00 clearing delta; train Controller team & close exceptions.", "4. Live Dry-Run Validation Report (Option B ends)"],
        ],
        col_widths=[Inches(0.85), Inches(1.45), Inches(3.0), Inches(1.8)],
    )

    # 6. CLIENT EFFORT & RACI
    add_section_heading(doc, "4. Client vs. CBa Consult RACI & Weekly Time Commitment (Close-Safe)")
    add_styled_table(
        doc,
        ["Role", "Responsibilities (R / A / C / I)", "Weekly Effort"],
        [
            ["Client CFO / Finance Director", "Executive Sponsor (Accountable); approves IFRS 18 MPM policy, Official KPI whitelist & SOW sign-off.", "0.5 – 1.0 hr / wk"],
            ["Client Corporate Controller", "Operational Lead (Consulted / Sign-Off); joins bottleneck workshops and validates live dry-run.", "2.0 – 3.0 hrs / wk"],
            ["Client Payroll & GL Leads", "Subject-Matter Inputs (Consulted); share anonymized clearing recs, HRIS cutoffs & ERP walkthroughs.", "1.0 – 2.0 hrs / wk"],
            ["Client IT / BI Admin", "Read-Only Support (Informed); supplies read-only/sandboxed close & BI exports (zero coding).", "0.5 – 1.0 hr total"],
            ["CBa Consult (Menno Drescher)", "Lead Architect & Delivery (Responsible); executes diagnostic, builds playbooks & shadows dry-run.", "6.0 – 10.0 hrs / wk"],
        ],
        col_widths=[Inches(1.85), Inches(4.05), Inches(1.2)],
    )

    # 7. TWO FIXED-SCOPE OPTIONS
    add_section_heading(doc, "5. Fixed-Scope Investment Options & Payment Terms")
    add_styled_table(
        doc,
        ["Commercial Option", "Included Scope & Deliverables", "Timeline", "Fixed Investment & Billing"],
        [
            [
                "Option A\nClose Diagnostic & Guardrail Blueprint",
                "Deliverables 1–3: Baseline Close Blueprint, 10-Guardrail Accrual & Revenue/CoS Playbook, and IFRS 18 + SoD Control Matrix (Client runs dry-run in-house).",
                "4 weeks",
                "€1,750 – €2,500\n50% SOW / 50% Wk 4"
            ],
            [
                "Option B (Recommended)\nFull Continuous Close Bridge + Live Dry-Run",
                "Deliverables 1–4: Full Option A blueprint PLUS CBa Consult shadowing one live 23rd→3rd+ close cycle, €0.00 clearing proof, and team handover.",
                "6–8 weeks",
                "€4,000 – €5,000\n50% SOW / 50% Wk 8"
            ],
        ],
        col_widths=[Inches(1.65), Inches(3.25), Inches(0.8), Inches(1.4)],
        highlight_last_col=True,
    )

    # 8. SCOPE BOUNDARIES, INDEPENDENCE & GDPR
    add_callout_box(
        doc,
        "6. Scope Boundaries, Auditor Independence & GDPR Data Protection",
        [
            ("100% Conflict-Free Advisory:", "CBa Consult is independent of your statutory external auditor and provides management readiness and process design only; your external auditor retains sole statutory opinion."),
            ("No Software Sales or Custom API Coding:", "Zero BlackLine/FCCS/Workiva license buy and zero custom software API engineering — all controls use your existing ERP, HRIS, and BI configuration."),
            ("GDPR & Payroll PII Minimization:", "Zero raw employee salary amounts, IBANs, or personal HR records leave your tenant; workshops rely strictly on aggregated clearing totals and 1,500-hr role-level standard rates."),
            ("Milestone Acceptance:", "Each milestone is deemed accepted upon written sign-off or 5 business days after delivery if no material scope discrepancy is raised."),
        ],
    )

    # 9. SIGN-OFF BLOCK
    add_section_heading(doc, "7. Statement of Work Authorization")
    sig_tbl = doc.add_table(rows=1, cols=2)
    sig_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(sig_tbl)
    prevent_row_split(sig_tbl.rows[0])

    left_txt = (
        "FOR CLIENT ORGANIZATION\n"
        "Selected Option:   [  ] Option A (€1,750–€2,500)     [  ] Option B (€4,000–€5,000)\n\n"
        "Name & Title:   ___________________________________________\n\n"
        "Signature & Date: _________________________________________"
    )
    right_txt = (
        "FOR CBA CONSULT\n"
        "Advisor:   Menno Drescher — Director, CBa Consult\n\n"
        "Signature: ___________________________________________\n\n"
        "Date:      ___________________________________________"
    )
    for idx, txt in enumerate([left_txt, right_txt]):
        c = sig_tbl.cell(0, idx)
        c.width = Inches(3.55)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=80, bottom=80, left=110, right=110)
        set_cell_borders(
            c,
            top={'val': 'single', 'sz': 8, 'color': NAVY_PRIMARY},
            bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
            left={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
            right={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        )
        p = c.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.2
        r = p.add_run(txt)
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.3)
        r.font.color.rgb = CHARCOAL

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    return output_path


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(
        root,
        "opportunities",
        "OP-FIN-009_Continuous_Close",
        "Client_Proposal_and_SOW_Continuous_Close_Bridge.docx",
    )
    build_proposal_sow(out)
    print(f"GENERATED: {out}")
