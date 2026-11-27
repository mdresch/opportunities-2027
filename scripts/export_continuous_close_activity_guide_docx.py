"""
CBa Consult — Client-Facing Continuous Close Operating Handbook (.docx) Exporter
Reads:  opportunities/OP-FIN-009_Continuous_Close/Continuous_Close_Enhanced_Activity_Guide.md
Writes: opportunities/OP-FIN-009_Continuous_Close/Continuous_Close_Enhanced_Activity_Guide.docx
Uses the CBa Consult Executive Design System (Navy/Cyan/Teal/Amber/Slate, Segoe UI, A4 Portrait).
"""

import os
import re
import docx
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

NAVY_DARK = "0D1B2A"
NAVY_PRIMARY = "1F4E79"
CYAN_ACCENT = "00A8E8"
TEAL = "0C8B82"
AMBER = "D97706"
AMBER_BG = "FEF3C7"
SLATE_LIGHT = "F2F5F9"
SLATE_BORDER = "CBD5E1"

CHARCOAL = RGBColor(30, 41, 59)
MUTED = RGBColor(100, 116, 139)
WHITE = RGBColor(255, 255, 255)
NAVY_RGB = RGBColor(31, 78, 121)
NAVY_DARK_RGB = RGBColor(13, 27, 42)
CYAN_RGB = RGBColor(0, 168, 232)
AMBER_TEXT_RGB = RGBColor(146, 64, 14)

PAGE_WIDTH_CM = 21.0
MARGIN_TB_CM = 1.6
MARGIN_LR_CM = 1.5
USABLE_WIDTH_CM = PAGE_WIDTH_CM - (2 * MARGIN_LR_CM)  # 18.0 cm


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


def add_page_number_field(run_container_para):
    fld_begin = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>')
    instr = parse_xml(f'<w:instrText {nsdecls("w")} xml:space="preserve"> PAGE </w:instrText>')
    fld_sep = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="separate"/>')
    fld_end = parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>')

    r = run_container_para.add_run()
    r.font.name = 'Segoe UI'
    r.font.size = Pt(7.8)
    r.font.color.rgb = MUTED
    r._r.append(fld_begin)
    r._r.append(instr)
    r._r.append(fld_sep)
    r._r.append(fld_end)


INLINE_TOKEN_RE = re.compile(
    r'(\*\*[^*]+?\*\*|`[^`]+?`|\[[^\]]+?\]\([^)]+?\)|\*[^*\s][^*]*?\*)'
)


def add_formatted_runs(p, text, font_size=8.6, color=CHARCOAL, bold=False, italic=False):
    pos = 0
    for m in INLINE_TOKEN_RE.finditer(text):
        if m.start() > pos:
            r = p.add_run(text[pos:m.start()])
            r.font.name = 'Segoe UI'
            r.font.size = Pt(font_size)
            r.font.color.rgb = color
            r.bold = bold
            r.italic = italic

        tok = m.group(0)
        if tok.startswith('**') and tok.endswith('**'):
            inner = tok[2:-2]
            add_formatted_runs(p, inner, font_size=font_size, color=color, bold=True, italic=italic)
        elif tok.startswith('`') and tok.endswith('`'):
            inner = tok[1:-1]
            r = p.add_run(inner)
            r.font.name = 'Consolas'
            r.font.size = Pt(max(font_size - 0.4, 7.2))
            r.font.color.rgb = NAVY_RGB
            r.bold = True if bold else False
            r.italic = italic
        elif tok.startswith('[') and '](' in tok and tok.endswith(')'):
            label = tok[1:tok.index('](')]
            add_formatted_runs(p, label, font_size=font_size, color=NAVY_RGB, bold=bold, italic=italic)
        elif tok.startswith('*') and tok.endswith('*'):
            inner = tok[1:-1]
            add_formatted_runs(p, inner, font_size=font_size, color=color, bold=bold, italic=True)
        pos = m.end()

    if pos < len(text):
        r = p.add_run(text[pos:])
        r.font.name = 'Segoe UI'
        r.font.size = Pt(font_size)
        r.font.color.rgb = color
        r.bold = bold
        r.italic = italic


def add_section_heading(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(11)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.keep_with_next = True
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(
        f'<w:pBdr {nsdecls("w")}>'
        f'<w:bottom w:val="single" w:sz="8" w:space="2" w:color="{CYAN_ACCENT}"/>'
        '</w:pBdr>'
    )
    pPr.append(pBdr)
    run = p.add_run(text.replace('`', '').strip())
    run.bold = True
    run.font.name = 'Segoe UI'
    run.font.size = Pt(11.5)
    run.font.color.rgb = NAVY_DARK_RGB
    return p


def add_activity_subbanner(doc, heading_text):
    clean = heading_text.replace('*', '').replace('`', '').strip()
    is_hard_gate = (
        'HARD GATE' in heading_text.upper()
        or any(tag in clean for tag in ['Activity A4 ', 'Activity A9 ', 'Activity A11 ', 'Activity A14 ', 'Activity YE-02 '])
    )

    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    prevent_row_split(tbl.rows[0])

    cell = tbl.cell(0, 0)
    cell.width = Cm(USABLE_WIDTH_CM)
    fill = AMBER_BG if is_hard_gate else SLATE_LIGHT
    accent = AMBER if is_hard_gate else TEAL
    set_cell_shading(cell, fill)
    set_cell_margins(cell, top=65, bottom=65, left=120, right=110)
    set_cell_borders(
        cell,
        left={'val': 'single', 'sz': 24, 'color': accent},
        top={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        right={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
        bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER},
    )

    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.keep_with_next = True

    if is_hard_gate:
        badge = p.add_run("◆ HARD GATE  |  ")
        badge.bold = True
        badge.font.name = 'Segoe UI'
        badge.font.size = Pt(9.2)
        badge.font.color.rgb = AMBER_TEXT_RGB

    title_txt = clean.replace('(HARD GATE)', '').strip()
    r = p.add_run(title_txt)
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.6)
    r.font.color.rgb = AMBER_TEXT_RGB if is_hard_gate else NAVY_RGB

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(2)
    sp.paragraph_format.keep_with_next = True


def add_styled_table(doc, headers, rows):
    n_cols = len(headers)
    if n_cols == 2:
        col_widths = [Cm(4.7), Cm(13.3)]
        font_sz = 8.0
    elif n_cols == 7:
        # Master Control, Escalation & Audit Evidence Matrix (sum = 18.0 cm)
        col_widths = [Cm(1.1), Cm(4.2), Cm(1.9), Cm(2.9), Cm(2.2), Cm(1.5), Cm(4.2)]
        font_sz = 7.4
    else:
        w_each = USABLE_WIDTH_CM / n_cols
        col_widths = [Cm(w_each)] * n_cols
        font_sz = 7.8

    tbl = doc.add_table(rows=1 + len(rows), cols=n_cols)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(tbl)
    set_repeat_header(tbl.rows[0])
    prevent_row_split(tbl.rows[0])

    for i, h in enumerate(headers):
        cell = tbl.rows[0].cells[i]
        cell.width = col_widths[i]
        set_cell_shading(cell, NAVY_PRIMARY)
        set_cell_margins(cell, top=48, bottom=48, left=75, right=75)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        add_formatted_runs(p, h.strip(), font_size=font_sz, color=WHITE, bold=True)

    for r_idx, row_vals in enumerate(rows):
        row = tbl.rows[r_idx + 1]
        prevent_row_split(row)
        row_text = ' '.join(row_vals)
        is_gate_row = ('Hard Gate' in row_text) or ('Audit Gate' in row_text)
        bg = AMBER_BG if is_gate_row else (SLATE_LIGHT if r_idx % 2 == 1 else "FFFFFF")
        for c_idx, val in enumerate(row_vals):
            cell = row.cells[c_idx]
            cell.width = col_widths[c_idx]
            set_cell_shading(cell, bg)
            set_cell_margins(cell, top=40, bottom=40, left=75, right=75)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.08
            cell_color = AMBER_TEXT_RGB if (is_gate_row and c_idx in (0, 1, 5)) else (NAVY_RGB if c_idx == 0 else CHARCOAL)
            add_formatted_runs(p, val.strip(), font_size=font_sz, color=cell_color, bold=(c_idx == 0))

    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(3)


def parse_markdown_table(lines, start_idx):
    raw_rows = []
    i = start_idx
    while i < len(lines) and lines[i].strip().startswith('|'):
        raw_rows.append(lines[i].strip())
        i += 1
    if len(raw_rows) < 2:
        return None, None, start_idx + 1

    def split_row(line):
        inner = line.strip()
        if inner.startswith('|'):
            inner = inner[1:]
        if inner.endswith('|') and not inner.endswith(r'\|'):
            inner = inner[:-1]
        parts = [c.replace(r'\|', '|').strip() for c in re.split(r'(?<!\\)\|', inner)]
        return parts

    headers = split_row(raw_rows[0])
    # raw_rows[1] is alignment separator :---
    body = [split_row(r) for r in raw_rows[2:]]
    return headers, body, i


def build_handbook(md_path, output_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        lines = f.read().splitlines()

    doc = docx.Document()

    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Cm(MARGIN_TB_CM)
        section.bottom_margin = Cm(MARGIN_TB_CM)
        section.left_margin = Cm(MARGIN_LR_CM)
        section.right_margin = Cm(MARGIN_LR_CM)
        section.different_first_page_header_footer = True

        # Running Header (pages 2+)
        hdr = section.header
        hp = hdr.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hp.paragraph_format.space_after = Pt(4)
        pPr = hp._p.get_or_add_pPr()
        pBdr = parse_xml(
            f'<w:pBdr {nsdecls("w")}>'
            f'<w:bottom w:val="single" w:sz="4" w:space="2" w:color="{SLATE_BORDER}"/>'
            '</w:pBdr>'
        )
        pPr.append(pBdr)
        hr = hp.add_run("CBa Consult — Continuous Close Operating Handbook & Control SOPs")
        hr.font.name = 'Segoe UI'
        hr.font.size = Pt(7.8)
        hr.font.color.rgb = MUTED

        # Running Footer (pages 2+)
        ftr = section.footer
        fp = ftr.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(3)
        fr_left = fp.add_run("FIN-CC-01 to FIN-CC-10  |  IFRS 18 Ready (Jan 2027)  |  Page ")
        fr_left.font.name = 'Segoe UI'
        fr_left.font.size = Pt(7.8)
        fr_left.font.color.rgb = MUTED
        add_page_number_field(fp)

    normal = doc.styles['Normal']
    normal.font.name = 'Segoe UI'
    normal.font.size = Pt(8.6)
    normal.font.color.rgb = CHARCOAL

    # PAGE 1 HERO BANNER
    banner = doc.add_table(rows=1, cols=1)
    banner.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(banner)
    bcell = banner.cell(0, 0)
    bcell.width = Cm(USABLE_WIDTH_CM)
    set_cell_shading(bcell, NAVY_DARK)
    set_cell_margins(bcell, top=140, bottom=140, left=180, right=180)
    set_cell_borders(bcell, bottom={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})

    bp1 = bcell.paragraphs[0]
    bp1.paragraph_format.space_after = Pt(2)
    r1 = bp1.add_run("CBA CONSULT  |  CLIENT OPERATING HANDBOOK & CONTROL SOPs")
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(8.2)
    r1.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(4)
    r2 = bp2.add_run("Continuous Close — Enhanced Operating Activity Guide")
    r2.bold = True
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(16.0)
    r2.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(4)
    r3 = bp3.add_run(
        "Days 1–22 Continuous Matching → Day 23 Payroll Lock → 4-4-5 / Month-End Cutoff (LBD) → Day+1 to Day+3+ Attested IFRS 18 GL Lock"
    )
    r3.font.name = 'Segoe UI'
    r3.font.size = Pt(8.8)
    r3.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r4 = bp4.add_run(
        "Prepared by: Menno Drescher, CBa Consult   |   Controls: FIN-CC-01 through FIN-CC-10   |   IFRS 18 Mandatory: Jan 1, 2027"
    )
    r4.font.name = 'Segoe UI'
    r4.font.size = Pt(7.9)
    r4.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(3)

    # 4-TILE EXECUTIVE SUMMARY KPI STRIP
    kpis = [
        ("Close Target: ≤3 Days", "Month-End GL Hard Lock\nby Day+3 16:00 CET"),
        ("Hard Gates: A4 · A9 · A11 · A14", "Four Immutable System Locks\nwith Dual SoD Sign-Off"),
        ("CoS Baseline: 1,500 Hrs/Yr", "4-4-5 Proration (20/20/25)\n& €0.00 GL Absorption Tie-Out"),
        ("IFRS 18: Jan 2027", "Operating Profit Subtotals,\n¶78–83 Nature & ¶117 MPMs"),
    ]
    kpi_tbl = doc.add_table(rows=1, cols=4)
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(kpis):
        c = kpi_tbl.cell(0, idx)
        c.width = Cm(USABLE_WIDTH_CM / 4.0)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=65, bottom=65, left=60, right=60)
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
        p1.paragraph_format.space_after = Pt(1.5)
        rm = p1.add_run(metric)
        rm.bold = True
        rm.font.name = 'Segoe UI'
        rm.font.size = Pt(9.2)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        p2.paragraph_format.line_spacing = 1.06
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.2)
        rl.font.color.rgb = MUTED

    # Companion documents plain-text bar
    comp = doc.add_paragraph()
    comp.paragraph_format.space_before = Pt(4)
    comp.paragraph_format.space_after = Pt(2)
    add_formatted_runs(
        comp,
        "**Companion Client Package:** Continuous Close Monthly Gantt Chart (1-Page Landscape A4 PDF) · IFRS 18 Close, Cost-of-Sales & KPI Control Executive Brief (DOCX)",
        font_size=7.9,
        color=MUTED,
    )

    # PARSE MARKDOWN BODY AFTER FIRST ---
    i = 0
    while i < len(lines) and lines[i].strip() != '---':
        i += 1
    if i < len(lines) and lines[i].strip() == '---':
        i += 1

    while i < len(lines):
        raw = lines[i]
        stripped = raw.strip()

        if not stripped or stripped == '---':
            i += 1
            continue

        if stripped.startswith('## '):
            add_section_heading(doc, stripped[3:].strip())
            i += 1
            continue

        if stripped.startswith('### '):
            heading_txt = stripped[4:].strip()
            if heading_txt.startswith('Activity '):
                add_activity_subbanner(doc, heading_txt)
            else:
                p = doc.add_paragraph()
                p.paragraph_format.space_before = Pt(6)
                p.paragraph_format.space_after = Pt(2.5)
                p.paragraph_format.keep_with_next = True
                add_formatted_runs(p, heading_txt, font_size=9.5, color=NAVY_RGB, bold=True)
            i += 1
            continue

        if stripped.startswith('|'):
            headers, body, next_i = parse_markdown_table(lines, i)
            if headers is not None:
                add_styled_table(doc, headers, body)
            i = next_i
            continue

        # Numbered sub-step (indented "  1. " or top-level "1. ")
        num_sub_m = re.match(r'^(\s*)(\d+\.)\s+(.*)$', raw)
        if num_sub_m:
            indent_len = len(num_sub_m.group(1))
            num_label = num_sub_m.group(2)
            body_txt = num_sub_m.group(3)
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(1.15 if indent_len >= 2 else 0.55)
            p.paragraph_format.first_line_indent = Cm(-0.42)
            p.paragraph_format.space_before = Pt(0.5)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.12
            r_num = p.add_run(f"{num_label} ")
            r_num.bold = True
            r_num.font.name = 'Segoe UI'
            r_num.font.size = Pt(8.4)
            r_num.font.color.rgb = NAVY_RGB
            add_formatted_runs(p, body_txt, font_size=8.4, color=CHARCOAL)
            i += 1
            continue

        # Bullet item ("- " or "  - ")
        bul_m = re.match(r'^(\s*)-\s+(.*)$', raw)
        if bul_m:
            indent_len = len(bul_m.group(1))
            body_txt = bul_m.group(2)
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(1.05 if indent_len >= 2 else 0.45)
            p.paragraph_format.first_line_indent = Cm(-0.32)
            p.paragraph_format.space_before = Pt(1)
            p.paragraph_format.space_after = Pt(2.2)
            p.paragraph_format.line_spacing = 1.12
            bullet_char = "▪ " if indent_len >= 2 else "• "
            r_b = p.add_run(bullet_char)
            r_b.bold = True
            r_b.font.name = 'Segoe UI'
            r_b.font.size = Pt(8.4)
            r_b.font.color.rgb = CYAN_RGB if indent_len == 0 else NAVY_RGB
            add_formatted_runs(p, body_txt, font_size=8.4, color=CHARCOAL)
            i += 1
            continue

        # Standard paragraph (handles multi-line soft break)
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.13
        add_formatted_runs(p, stripped, font_size=8.6, color=CHARCOAL)
        i += 1

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    doc.save(output_path)
    print("Generated:", output_path, "| Size:", os.path.getsize(output_path), "bytes")


if __name__ == "__main__":
    base = r"c:\Users\menno\Projects\oppurtunities-2027\opportunities\OP-FIN-009_Continuous_Close"
    build_handbook(
        os.path.join(base, "Continuous_Close_Enhanced_Activity_Guide.md"),
        os.path.join(base, "Continuous_Close_Enhanced_Activity_Guide.docx"),
    )
