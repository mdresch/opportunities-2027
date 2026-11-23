"""
CBa Consult — Client Service One-Pager (.docx) Exporter for OP-ITG-013
Generates: opportunities/OP-ITG-013_Enterprise_AI_Agent_Governance/One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx
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


def set_cell_margins(cell, top=60, bottom=60, left=100, right=100):
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
    p.paragraph_format.space_before = Pt(8)
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
        r.font.size = Pt(8.3)
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
            set_cell_margins(cell, top=45, bottom=45, left=80, right=80)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            p.paragraph_format.line_spacing = 1.08
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
    sp.paragraph_format.space_after = Pt(3)
    return tbl


def build_one_pager(output_path):
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
        fp.paragraph_format.space_before = Pt(3)
        fr = fp.add_run(
            "CBa Consult  |  Menno Drescher  |  Client Service Datasheet: Enterprise AI Agent Governance Assessment (OP-ITG-013)  |  2027 Core Flagship"
        )
        fr.font.name = 'Segoe UI'
        fr.font.size = Pt(7.8)
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
    r = bp1.add_run("CBA CONSULT  |  CLIENT SERVICE DATASHEET  |  CORE 5 TIER A FLAGSHIP (OP-ITG-013)")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8.2)
    r.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(3)
    r = bp2.add_run("Enterprise AI Agent Governance Assessment")
    r.bold = True
    r.font.name = 'Segoe UI'
    r.font.size = Pt(16)
    r.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(3)
    r = bp3.add_run(
        "Move From Unmanaged Copilots & Shadow Agents to Auditable, Identity-Isolated, Cost-Controlled Digital Labor"
    )
    r.font.name = 'Segoe UI'
    r.font.size = Pt(9.3)
    r.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    r = bp4.add_run("For: CIOs, CISOs & Chief AI Officers (250–2,500+ Seat Enterprises)   |   Provider: Menno Drescher, CBa Consult   |   Nov 2026")
    r.font.name = 'Segoe UI'
    r.font.size = Pt(8)
    r.font.color.rgb = RGBColor(148, 163, 184)

    sp = doc.add_paragraph()
    sp.paragraph_format.space_after = Pt(4)

    # 2. 4-TILE KPI STRIP
    kpis = [
        (">40%", "Agentic AI Projects Canceled\nby End of 2027 (Gartner)"),
        ("Dec 2, 2027", "EU AI Act Annex III\nHigh-Risk Compliance Gate"),
        ("8 Pillars / 40 Qs", "Scored Maturity Audit &\n12-Field Agent Register"),
        ("100% Conflict-Free", "Independent From Statutory\nAuditors, MSPs & MSSPs"),
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

        p2 = c.paragraphs[0].insert_paragraph_before() if False else c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(7.5)
        rl.font.color.rgb = MUTED

    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_after = Pt(3)

    # 3. WHY NOW
    add_section_heading(doc, "1. The Enterprise Agent Sprawl Gap (Why Vendors & Auditors Don't Solve It)")
    add_body_para(
        doc,
        "On June 25, 2025, Gartner predicted that over 40% of agentic AI projects will be canceled by the end of 2027 due to escalating costs, unclear business value, or inadequate risk controls. While Microsoft Entra Agent ID, Agent 365, ServiceNow AI Control Tower, Okta, and SailPoint provide powerful technical primitives, mid-market enterprises lack the operating model, Segregation of Duties (SoD), FinOps ceilings, and audit-ready documentation to govern autonomous digital labor. Meanwhile, PCAOB/AICPA and EU PIE rules bar statutory external auditors from designing controls for their own audit clients. CBa Consult closes this exact gap — 100% conflict-free and aligned with COBIT 2019, NIST AI RMF, ISO/IEC 42001, DORA/NIS2, and EU AI Act Annex III."
    )

    # 4. 8 GOVERNANCE PILLARS
    add_section_heading(doc, "2. The 8 Governance Pillars Assessed (40-Question Scored Maturity Diagnostic)")
    add_styled_table(
        doc,
        ["Governance Pillar", "Core Audit & Control Question Answered", "Primary Evidence / Control Standard"],
        [
            ["1. Agent Inventory & Discovery*", "Which Copilot Studio, Power Platform, SaaS, custom & MCP agents exist?", "12-field Agent Register · Agent 365 / CASB scan"],
            ["2. Owners & Human Accountability", "Which named Human Sponsor owns actions, Mover/Leaver handoff & HITL?", "Entra Sponsor attribute · Decision Authority Matrix"],
            ["3. Agent Identity (Entra / NHI)*", "Are agents on dedicated NHIs, Conditional Access, JIT tokens & <5m kill switch?", "Entra Agent ID Blueprints · OAuth 2.0 / MCP / A2A"],
            ["4. Tool/API Permissions & SoD*", "Where are Read vs. Write limits, ERP/payroll SoD & sandbox isolation enforced?", "OAuth scope matrix · SOX 404 / ISA 265 ITGC UARs"],
            ["5. Lifecycle & Disposable Apps", "How are pilot/ephemeral agents promoted, versioned, expired (TTL) & retired?", "Dev→Prod gates · Git/CAB logs · Decommission SOP"],
            ["6. Observability & Audit Trail*", "Are prompts, tool calls, model versions & overrides logged immutably?", "Agent 365 / Sentinel / WORM · EU AI Act Art. 12"],
            ["7. Agent FinOps & Throttling", "Are cost-center chargeback, loop breakers & hard monthly caps enforced?", "Gateway rate limits · Model routing · GL accrual"],
            ["8. Sovereign & Regulatory Guardrails", "Are Purview DLP, ZDR DPAs, GDPR Art. 22 & split-clock retention active?", "EU AI Act Annex III · DORA/NIS2 · Purview DLP"],
        ],
        col_widths=[Inches(1.85), Inches(3.15), Inches(2.1)],
    )

    # 5. TWO-TIER PACKAGING & MIP CONVERSION
    add_section_heading(doc, "3. Two-Tier Commercial Packaging & Managed Intelligence (MIP) Continuity")
    add_styled_table(
        doc,
        ["Engagement Tier", "Timeline & Scope", "Concrete Deliverables", "Investment Anchor"],
        [
            [
                "Tier 1 — Phase 0 Agent Sprawl & Identity Triage",
                "2–3 weeks\n(15–30 hrs)",
                "Shadow-agent discovery snapshot, shared-credential & SoD red-flag scan, Top-10 P0 Risk Register, Phase 1 business case",
                "€2,500–€5,000"
            ],
            [
                "Tier 2 — Full 8-Pillar Governance Assessment",
                "6–10 weeks\n(45–100+ hrs)",
                "12-field Agent Inventory Register, 40-point Maturity Scorecard, Entra Agent ID & SoD Blueprint, Agent 365 & FinOps Ceiling Framework, 90-Day Roadmap",
                "€6,000–€18,000+"
            ],
            [
                "Ongoing — Managed Intelligence Provider (OP-ITG-018)",
                "Monthly retainer\n(above MSP/MSSP)",
                "Quarterly agent-fleet UAR & drift reviews, FinOps cap tuning, new-agent onboarding gates, continuous EU AI Act / ISO 42001 evidence stewardship",
                "€2,500–€12,000+ / mo"
            ],
        ],
        col_widths=[Inches(1.65), Inches(1.15), Inches(3.1), Inches(1.2)],
        highlight_last_col=True,
    )

    add_body_para(
        doc,
        "Scope Boundary & Proprietary Backbone: Backed by CBa Consult's ICT-Governance-Framework-Application control model, SIDPA Bayesian DecisionFrame governance patterns, and MXC Type-1 Hyper-V isolation blueprints. Client IT/MSP retains production tenant operations; client MSSP retains 24/7 SOC containment; accredited bodies retain formal ISO 42001 certification.",
        space_after=5,
    )

    # 6. CTA BANNER
    cta = doc.add_table(rows=1, cols=1)
    cta.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(cta)
    prevent_row_split(cta.rows[0])
    cta_c = cta.cell(0, 0)
    set_cell_shading(cta_c, NAVY_PRIMARY)
    set_cell_margins(cta_c, top=85, bottom=85, left=140, right=140)
    set_cell_borders(cta_c, left={'val': 'single', 'sz': 24, 'color': CYAN_ACCENT})
    cp = cta_c.paragraphs[0]
    cp.paragraph_format.space_after = Pt(0)
    r1 = cp.add_run("NEXT STEP  |  ")
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.2)
    r1.font.color.rgb = CYAN_RGB
    r2 = cp.add_run(
        "Book a 30-minute Agent Sprawl, Identity & FinOps Briefing with Menno Drescher (CBa Consult) to benchmark your current tenant exposure ahead of 2027 ITGC audits and the Dec 2, 2027 EU AI Act deadline."
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
        "opportunities",
        "OP-ITG-013_Enterprise_AI_Agent_Governance",
        "One_Pager_OP-ITG-013_Enterprise_AI_Agent_Governance.docx",
    )
    build_one_pager(out)
    print(f"GENERATED: {out}")
