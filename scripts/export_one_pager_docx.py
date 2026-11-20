"""
CBa Consult — Reusable Executive Datasheet (.docx) Exporter
Applies the CBa Consult Executive Datasheet design system to any Tier A one-pager.
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
    p.paragraph_format.space_before = Pt(10)
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
    run.font.size = Pt(11.5)
    run.font.color.rgb = NAVY_RGB
    return p


def add_bold_bullet(doc, lead, body):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1.5)
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.line_spacing = 1.12
    r1 = p.add_run(lead)
    r1.bold = True
    r1.font.name = 'Segoe UI'
    r1.font.size = Pt(9.5)
    r1.font.color.rgb = NAVY_RGB
    r2 = p.add_run(body)
    r2.font.name = 'Segoe UI'
    r2.font.size = Pt(9.5)
    r2.font.color.rgb = CHARCOAL
    return p


def build_executive_datasheet(spec, output_path):
    doc = docx.Document()

    # A4 page setup with crisp executive margins
    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Inches(0.5)
        section.bottom_margin = Inches(0.55)
        section.left_margin = Inches(0.6)
        section.right_margin = Inches(0.6)
        section.different_first_page_header_footer = False

        # Branded Footer
        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.paragraph_format.space_before = Pt(4)
        fr = fp.add_run(
            f"CBa Consult  |  Menno Drescher  |  {spec['offer_id']} Executive Datasheet  |  2027–2030 Sovereign & Autonomous Systems Governance"
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
    er = bp1.add_run(spec['eyebrow'])
    er.bold = True
    er.font.name = 'Segoe UI'
    er.font.size = Pt(8.5)
    er.font.color.rgb = CYAN_RGB

    bp2 = bcell.add_paragraph()
    bp2.paragraph_format.space_after = Pt(4)
    tr = bp2.add_run(spec['title'])
    tr.bold = True
    tr.font.name = 'Segoe UI'
    tr.font.size = Pt(16.5)
    tr.font.color.rgb = WHITE

    bp3 = bcell.add_paragraph()
    bp3.paragraph_format.space_after = Pt(4)
    sr = bp3.add_run(spec['subtitle'])
    sr.font.name = 'Segoe UI'
    sr.font.size = Pt(10)
    sr.font.color.rgb = RGBColor(226, 232, 240)

    bp4 = bcell.add_paragraph()
    bp4.paragraph_format.space_after = Pt(0)
    mr = bp4.add_run(f"For: {spec['audience']}   |   Provider: {spec['provider']}")
    mr.font.name = 'Segoe UI'
    mr.font.size = Pt(8.5)
    mr.font.color.rgb = RGBColor(148, 163, 184)

    # Small spacer
    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(5)

    # 2. 4-TILE KPI METRIC STRIP
    kpi_tbl = doc.add_table(rows=1, cols=len(spec['kpis']))
    kpi_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(kpi_tbl)
    prevent_row_split(kpi_tbl.rows[0])
    for idx, (metric, label) in enumerate(spec['kpis']):
        c = kpi_tbl.cell(0, idx)
        set_cell_shading(c, SLATE_LIGHT)
        set_cell_margins(c, top=90, bottom=90, left=100, right=100)
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
        rm.font.size = Pt(14)
        rm.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        rl = p2.add_run(label)
        rl.font.name = 'Segoe UI'
        rl.font.size = Pt(8)
        rl.font.color.rgb = MUTED

    # Spacer
    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_before = Pt(0)
    sp2.paragraph_format.space_after = Pt(5)

    # 3. LEFT-ACCENTED EXECUTIVE CALLOUT BOX (THE PROBLEM & BREAKTHROUGH)
    callout = doc.add_table(rows=1, cols=1)
    callout.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(callout)
    prevent_row_split(callout.rows[0])
    cc = callout.cell(0, 0)
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
    cr0 = cp0.add_run(spec['callout_title'])
    cr0.bold = True
    cr0.font.name = 'Segoe UI'
    cr0.font.size = Pt(10)
    cr0.font.color.rgb = NAVY_RGB

    for lead, text in spec['callout_points']:
        cp = cc.add_paragraph()
        cp.paragraph_format.space_before = Pt(1)
        cp.paragraph_format.space_after = Pt(2)
        cp.paragraph_format.line_spacing = 1.1
        r_l = cp.add_run(f"• {lead} ")
        r_l.bold = True
        r_l.font.name = 'Segoe UI'
        r_l.font.size = Pt(9)
        r_l.font.color.rgb = CHARCOAL
        r_t = cp.add_run(text)
        r_t.font.name = 'Segoe UI'
        r_t.font.size = Pt(9)
        r_t.font.color.rgb = CHARCOAL

    cp_end = cc.add_paragraph()
    cp_end.paragraph_format.space_before = Pt(3)
    cp_end.paragraph_format.space_after = Pt(0)
    r_end = cp_end.add_run(spec['callout_conclusion'])
    r_end.bold = True
    r_end.font.name = 'Segoe UI'
    r_end.font.size = Pt(9)
    r_end.font.color.rgb = NAVY_RGB

    # 4. HOW THE ARCHITECTURE WORKS
    add_section_heading(doc, spec['how_title'])
    for lead, body in spec['how_bullets']:
        add_bold_bullet(doc, lead, body)

    # 5. MEASURABLE OUTCOMES COMPARISON TABLE
    add_section_heading(doc, spec['comparison_title'])
    comp_headers = spec['comparison_headers']
    comp_rows = spec['comparison_rows']
    ctbl = doc.add_table(rows=1 + len(comp_rows), cols=len(comp_headers))
    ctbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(ctbl)
    set_repeat_header(ctbl.rows[0])
    prevent_row_split(ctbl.rows[0])

    for i, h in enumerate(comp_headers):
        cell = ctbl.rows[0].cells[i]
        set_cell_shading(cell, NAVY_DARK if i == len(comp_headers) - 1 else NAVY_PRIMARY)
        set_cell_margins(cell, top=70, bottom=70, left=90, right=90)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.5)
        r.font.color.rgb = WHITE

    for r_idx, row_vals in enumerate(comp_rows):
        row = ctbl.rows[r_idx + 1]
        prevent_row_split(row)
        bg = SLATE_LIGHT if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_vals):
            cell = row.cells[c_idx]
            is_last = (c_idx == len(row_vals) - 1)
            set_cell_shading(cell, "E6F4FA" if is_last else bg)
            set_cell_margins(cell, top=60, bottom=60, left=90, right=90)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.5)
            if c_idx == 0 or is_last:
                r.bold = True
                r.font.color.rgb = NAVY_RGB if is_last else CHARCOAL
            else:
                r.font.color.rgb = CHARCOAL

    # 6. ENGAGEMENT ROADMAP TABLE
    add_section_heading(doc, spec['roadmap_title'])
    rm_headers = spec['roadmap_headers']
    rm_rows = spec['roadmap_rows']
    rtbl = doc.add_table(rows=1 + len(rm_rows), cols=len(rm_headers))
    rtbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(rtbl)
    set_repeat_header(rtbl.rows[0])
    prevent_row_split(rtbl.rows[0])

    col_widths = [Inches(1.65), Inches(0.95), Inches(4.5)]
    for i, h in enumerate(rm_headers):
        cell = rtbl.rows[0].cells[i]
        cell.width = col_widths[i]
        set_cell_shading(cell, NAVY_PRIMARY)
        set_cell_margins(cell, top=70, bottom=70, left=90, right=90)
        set_cell_borders(cell, bottom={'val': 'single', 'sz': 12, 'color': CYAN_ACCENT})
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        r = p.add_run(h)
        r.bold = True
        r.font.name = 'Segoe UI'
        r.font.size = Pt(8.5)
        r.font.color.rgb = WHITE

    for r_idx, row_vals in enumerate(rm_rows):
        row = rtbl.rows[r_idx + 1]
        prevent_row_split(row)
        bg = SLATE_LIGHT if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_vals):
            cell = row.cells[c_idx]
            cell.width = col_widths[c_idx]
            set_cell_shading(cell, bg)
            set_cell_margins(cell, top=60, bottom=60, left=90, right=90)
            set_cell_borders(cell, bottom={'val': 'single', 'sz': 4, 'color': SLATE_BORDER})
            p = cell.paragraphs[0]
            p.paragraph_format.space_after = Pt(0)
            r = p.add_run(val)
            r.font.name = 'Segoe UI'
            r.font.size = Pt(8.5)
            if c_idx == 0:
                r.bold = True
                r.font.color.rgb = NAVY_RGB
            else:
                r.font.color.rgb = CHARCOAL

    # 7. INVESTMENT & ENTRY OPTIONS (2-COLUMN CARDS)
    add_section_heading(doc, spec['investment_title'])
    inv_tbl = doc.add_table(rows=1, cols=len(spec['investment_cards']))
    inv_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders_none(inv_tbl)
    prevent_row_split(inv_tbl.rows[0])

    for idx, card in enumerate(spec['investment_cards']):
        c = inv_tbl.cell(0, idx)
        is_primary = (idx == 1)
        set_cell_shading(c, "E6F4FA" if is_primary else SLATE_LIGHT)
        set_cell_margins(c, top=100, bottom=100, left=130, right=130)
        set_cell_borders(
            c,
            top={'val': 'single', 'sz': 16, 'color': NAVY_PRIMARY if is_primary else CYAN_ACCENT},
            left={'val': 'single', 'sz': 6, 'color': 'FFFFFF'},
            right={'val': 'single', 'sz': 6, 'color': 'FFFFFF'},
            bottom={'val': 'single', 'sz': 6, 'color': SLATE_BORDER},
        )
        p1 = c.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(card['label'])
        r1.bold = True
        r1.font.name = 'Segoe UI'
        r1.font.size = Pt(9)
        r1.font.color.rgb = NAVY_RGB

        p2 = c.add_paragraph()
        p2.paragraph_format.space_after = Pt(3)
        r2 = p2.add_run(card['price'])
        r2.bold = True
        r2.font.name = 'Segoe UI'
        r2.font.size = Pt(12.5)
        r2.font.color.rgb = RGBColor(13, 27, 42)

        p3 = c.add_paragraph()
        p3.paragraph_format.space_after = Pt(0)
        p3.paragraph_format.line_spacing = 1.1
        r3 = p3.add_run(card['desc'])
        r3.font.name = 'Segoe UI'
        r3.font.size = Pt(8.5)
        r3.font.color.rgb = CHARCOAL

    # Small spacer before CTA
    sp3 = doc.add_paragraph()
    sp3.paragraph_format.space_before = Pt(0)
    sp3.paragraph_format.space_after = Pt(6)

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
    r_cta1 = cp.add_run("NEXT STEP  |  ")
    r_cta1.bold = True
    r_cta1.font.name = 'Segoe UI'
    r_cta1.font.size = Pt(9.5)
    r_cta1.font.color.rgb = CYAN_RGB
    r_cta2 = cp.add_run(spec['cta_text'])
    r_cta2.bold = True
    r_cta2.font.name = 'Segoe UI'
    r_cta2.font.size = Pt(9.5)
    r_cta2.font.color.rgb = WHITE

    doc.save(output_path)
    return output_path


OP_ITG_017_SPEC = {
    "offer_id": "OP-ITG-017",
    "eyebrow": "CBA CONSULT  |  TIER A FLAGSHIP SERVICE DATASHEET  |  OP-ITG-017",
    "title": "MXC Hyper-V Extension & <500ms JIT Scale-to-Zero VM Sandboxes",
    "subtitle": "Bank-Grade Hardware Isolation at Scale-to-Zero Economics — Waking in Under 500 Milliseconds",
    "audience": "CIOs, CTOs, CISOs, CFOs & Platform Engineering Directors (Mid-Market & Regulated Enterprises)",
    "provider": "Menno Drescher, CBa Consult",
    "kpis": [
        ("0.0%", "Idle CPU (Scale-to-Zero)"),
        ("<300ms", "Achieved Wake (<500ms SLA)"),
        ("3×–5×", "Host Workload Density"),
        ("Type-1", "Hyper-V Hardware Isolation"),
    ],
    "callout_title": "Solving the Enterprise Infrastructure Trilemma",
    "callout_points": [
        ("Always-On Virtual Machines (High Cost):", "Paying 24/7 for idle Windows Server CPU, memory, and licenses during nights, weekends, and quiet intervals."),
        ("Cold-Start Shutdowns (Broken UX):", "Turning VMs off saves money, but 14–45s Windows Server boots break webhooks, fail automated pipelines, and frustrate users."),
        ("Shared-Kernel Containers (Compliance Risk):", "Fast startup, but sharing the host OS kernel fails strict zero-trust, DORA, NIS2, and multi-tenant isolation requirements for sensitive data or autonomous AI agents."),
    ],
    "callout_conclusion": "OP-ITG-017 eliminates that tradeoff — delivering hardware-isolated Type-1 Hyper-V micro-enclaves on Windows Server 2025 / Windows 11 Enterprise that sleep at 0.0% idle CPU, wake in <500ms (<300ms achieved), and self-cleanse after every session.",
    "how_title": "How the Architecture Works",
    "how_bullets": [
        ("Preserved Sleep (0.0% Idle CPU): ", "Production Windows Server 2025 Golden Images stay pre-trimmed (~1.1 GB working set) and suspended in host RAM — virtual CPU scheduling drops strictly to zero when idle."),
        ("Sub-Second Wake-on-Demand (<300ms Unpause / <800ms TTFB): ", "A connection-buffering JIT Ingress Gateway holds incoming HTTPS/API requests, calls our Rust control plane (wxc-exec --features hyperv) to resume a standby VM, verifies guest health, and forwards payloads with zero dropped sockets. Username/password and MFA sign-ins ride the same wake."),
        ("Sterile Session Reset (.avhdx Differencing Disks): ", "Every workload or autonomous AI agent executes on an ephemeral differencing disk. On idle timeout or session release, the delta disk is discarded and the VM snaps back to an immutable, approved baseline checkpoint — eliminating state drift and malware persistence."),
        ("Elastic Warm-Pool Replenishment & Identity-Bound Leasing: ", "Adaptive watermark autoscaling proactively replenishes paused standby pools during traffic surges, while identity-bound leasing (ADR-008) pairs each isolated guest cleanly to a verified user or Entra AI Agent identity."),
    ],
    "comparison_title": "Measurable Outcomes vs. Legacy Options",
    "comparison_headers": ["Business & Technical Dimension", "Traditional Always-On VMs", "Shared-Kernel Containers", "MXC Hyper-V JIT Scale-to-Zero"],
    "comparison_rows": [
        ["Idle Compute Cost", "100% bill 24/7", "Medium (idle overhead)", "0.0% Idle CPU (Scale-to-Zero)"],
        ["Cold-Start Latency", "14 – 45 seconds", "1 – 3 seconds", "<500ms SLA (<300ms wake / <800ms TTFB)"],
        ["Host Workload Density", "5 – 8 apps / host", "20+ apps (shared kernel)", "30+ isolated apps / host (3×–5× ROI)"],
        ["Security Boundary", "Hardware-grade", "Shared OS kernel", "Type-1 Hypervisor Hardware Isolation"],
        ["Malware / State Drift", "Persists over time", "Risk across restarts", "Incinerated on Session Close (.avhdx reset)"],
    ],
    "roadmap_title": "Engagement Roadmap (6–10 Weeks, Fixed Scope)",
    "roadmap_headers": ["Phase", "Timeline", "Deliverables & Governance Outcomes"],
    "roadmap_rows": [
        ["1. Observe & Benchmark", "Weeks 1–2", "Workload profile & TCO audit (idle burn, cold-start pain, compliance boundaries) + live <300ms wake benchmark on representative Windows Server 2025 hardware."],
        ["2. Architect & Govern", "Weeks 3–4", "Target Golden Image Registry, NVMe/RAM standby-pool sizing, ADR-008 identity-bound leasing design, and DORA / NIS2 / EU AI Act isolation mapping."],
        ["3. Reference Implementation", "Weeks 5–8", "Deploy wxc-exec --features hyperv, JIT Ingress Gateway, automated Golden VHDX baker, sterile .avhdx reaper, and watermark pool autoscaling for 1–2 priority workloads."],
        ["4. Certify & Handover", "Weeks 9–10", "Automated acceptance verification (benchmark_jit_wake.py, AC-01–AC-05), operator runbooks, and CFO FinOps ROI scorecard."],
    ],
    "investment_title": "Investment & Entry Options",
    "investment_cards": [
        {
            "label": "PHASE 0 ENTRY WEDGE  ·  2–3 WEEKS",
            "price": "€2,000 – €4,500",
            "desc": "Live Benchmark & Feasibility Sprint: workload TCO baseline + live <500ms Hyper-V JIT wake demo on your target workload.",
        },
        {
            "label": "FULL TIER A REFERENCE IMPLEMENTATION  ·  6–10 WEEKS",
            "price": "€4,000 – €15,000+",
            "desc": "Fixed-scope architecture, Golden Image pipeline & pool rollout; scales into OP-ITG-013 (AI Agent Governance), OP-ITG-015 (Cryptographic Sovereignty) & OP-ITG-016 (COBIT for Agents).",
        },
    ],
    "cta_text": "Book a 30-minute Live <300ms Hyper-V Wake Demo & Infrastructure TCO Review with Menno Drescher (CBa Consult).",
}


OP_ITG_018_SPEC = {
    "offer_id": "OP-ITG-018",
    "eyebrow": "CBA CONSULT  |  TIER A FLAGSHIP UMBRELLA RETAINER  |  OP-ITG-018 (MIP)",
    "title": "Managed Intelligence Provider / Professional (MIP)",
    "subtitle": "Beyond MSP and MSSP: Conflict-Free Recurring Operations for Your Enterprise Intelligence Stack",
    "audience": "CEOs, CIOs, CFOs, CISOs & PE Operating Partners (Mid-Market & Regulated Enterprises)",
    "provider": "Menno Drescher, CBa Consult",
    "kpis": [
        ("5 Assets", "Unified Intelligence Stack"),
        ("100%", "Conflict-Free Pre-Assurance"),
        ("Zero Drift", "Continuous EU AI Act / ISO 42001"),
        ("€2.5k–12k", "Monthly Retainer vs. €250k+ CAIO"),
    ],
    "callout_title": "The Governance Vacuum Between Your MSP and MSSP",
    "callout_points": [
        ("Agent Sprawl & FinOps Shock:", "Copilot and custom AI agents proliferate without clear owners, Entra identity boundaries, or token/budget ceilings."),
        ("Context & Compliance Decay:", "SharePoint/RAG knowledge bases drift within weeks and one-off EU AI Act / ISO 42001 compliance binders go stale the day after an audit."),
        ("Talent & Independence Gap:", "Hiring a full-time Chief AI Officer + governance team costs €250k–€500k+/year, while Big Four auditors face strict PCAOB/EU PIE independence limits."),
    ],
    "callout_conclusion": "OP-ITG-018 (MIP) fills that vacuum — operating alongside your existing MSP and MSSP as your accountable, conflict-free Managed Intelligence Provider across all 5 Strategic Assets.",
    "how_title": "What Your MIP Retainer Governs (5 Intelligence Pillars)",
    "how_bullets": [
        ("1. Digital Labor & Agent Fleet Operations (OP-ITG-013 / 016): ", "Monthly agent inventory, Entra Agent Identity reviews, Agent 365 observability, token/FinOps ceilings, and human-escalation oversight."),
        ("2. Knowledge, Context & Ontology Stewardship (OP-ITG-014): ", "Continuous RAG quality scoring, taxonomy/ontology hygiene (ADPA / ECS), and M365 / Fabric / Work IQ context governance."),
        ("3. Continuous AI Compliance & Evidence Assurance (OP-RSK-004 / 005): ", "Always-on EU AI Act Annex III, ISO 42001, NIST AI RMF, and Split-Clock WORM retention evidence — continuously audit-ready."),
        ("4. Sovereign & Hardware-Isolated Execution (OP-ITG-015 / 017): ", "Ongoing Cryptographic Sovereignty / Trust Topology reviews and MXC Hyper-V <500ms JIT Scale-to-Zero sterile sandbox pool governance."),
        ("5. Executive & Board Intelligence Capital Reporting (OP-FIN-009 / 011): ", "Monthly Intelligence Health Scorecard and quarterly Board ROI brief tying AI and automation spend directly to measurable P&L truth."),
    ],
    "comparison_title": "MSP vs. MSSP vs. Managed Intelligence Provider (MIP)",
    "comparison_headers": ["Dimension", "MSP (Infrastructure)", "MSSP (Cybersecurity)", "MIP (CBa Consult — Managed Intelligence)"],
    "comparison_rows": [
        ["Core Mandate", "Uptime, patching, helpdesk", "Threat detection, 24/7 SOC", "Governed AI agents, trusted context & audit-ready truth"],
        ["Primary Assets", "Servers, endpoints, M365 seats", "Firewalls, SIEM, EDR", "Agent fleets, ontologies/RAG, compliance evidence, sovereign runtimes"],
        ["Governance Scope", "ITIL tickets & SLAs", "Incident response", "ISO 42001, EU AI Act, DORA/NIS2, Agent FinOps & Board ROI"],
        ["Auditor Independence", "N/A", "N/A", "100% Conflict-Free Pre-Assurance Partner"],
    ],
    "roadmap_title": "MIP Service Tiers & Monthly Cadence",
    "roadmap_headers": ["MIP Tier", "Monthly Anchor", "Scope & Operating Cadence"],
    "roadmap_rows": [
        ["MIP Essentials", "€2,500–€4,000 / mo", "Mid-market teams scaling Copilot & first AI workflows: Monthly Governance Scorecard, Agent Registry & FinOps check, EU AI Act / policy drift review (4 hrs/wk equiv.)."],
        ["MIP Core", "€5,000–€7,500 / mo", "Regulated enterprises with active AI agents & RAG stacks: Essentials + Knowledge/RAG stewardship, continuous ISO 42001 / EU AI Act evidence pack & quarterly Board brief (6–8 hrs/wk)."],
        ["MIP Enterprise (Fractional CAIO)", "€8,500–€12,000+ / mo", "Multi-entity, PE-backed, or sovereign-cloud organizations: Full 5-Asset stewardship — Agent Architecture (COBIT for Agents), Cryptographic Sovereignty / MXC Hyper-V pool governance & executive committee seat."],
    ],
    "investment_title": "How Clients Enter the MIP Retainer",
    "investment_cards": [
        {
            "label": "STEP 1  ·  FIXED-SCOPE BASELINE (3–6 WEEKS)",
            "price": "€2,500 – €10,000",
            "desc": "Start with any Tier A assessment (OP-ITG-013 Agent Gov, OP-ITG-014 Context, OP-RSK-004 SOC 2 for AI, or OP-ITG-017 MXC Hyper-V) to establish baseline truth.",
        },
        {
            "label": "STEP 2  ·  ONGOING MIP RETAINER (MONTHLY)",
            "price": "€2,500 – €12,000+ / mo",
            "desc": "Graduate into continuous Managed Intelligence operations — zero helpdesk overlap with your MSP/MSSP and zero independence conflict with external auditors.",
        },
    ],
    "cta_text": "Book a 30-minute Intelligence Stack Baseline & MIP Readiness Review with Menno Drescher (CBa Consult).",
}


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out17 = os.path.join(root, "One_Pager_OP-ITG-017_MXC_HyperV_JIT_Scale_to_Zero.docx")
    out18 = os.path.join(root, "One_Pager_OP-ITG-018_Managed_Intelligence_Provider_MIP.docx")
    build_executive_datasheet(OP_ITG_017_SPEC, out17)
    build_executive_datasheet(OP_ITG_018_SPEC, out18)
    print(f"GENERATED: {out17}")
    print(f"GENERATED: {out18}")
