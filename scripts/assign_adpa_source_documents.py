#!/usr/bin/env python3
"""
Assign Word documents from ADPA Projects Lists to opportunity workspaces.
Generates per-opportunity Source-Documents.md, Ideation-Document.md, and Business-Case.md.
"""

from __future__ import annotations

import argparse
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from datetime import date
from difflib import SequenceMatcher
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
ADPA_ROOT = Path(r"F:\OneDrive - CBA\Documenten\ADPA - Projects Lists")
INVENTORY = REPO_ROOT / "inventory-of-ideas.md"
OPP_ROOT = REPO_ROOT / "opportunities"
REGISTER = REPO_ROOT / "docs" / "registers" / "Source-Document-Assignment-Register.md"

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
MAX_EXTRACT_CHARS = 80_000

# Folder-level primary assignments (relative to ADPA_ROOT, forward slashes)
FOLDER_PRIMARY: dict[str, str] = {
    "Opportunities Business/Online Tutoring or Coaching": "OP-HR-005",
    "Opportunities Business/ADPA - Client Onboarding Assessments Systems": "OP-CX-002",
    "Opportunities Business/Kairos Bay": "OP-STR-003",
    "Opportunities Business/AI Microservices & Prompt Engineering": "OP-DTX-004",
    "Opportunities Business/ADPA - Implementation of OpenUI and UI Generation": "OP-ITG-019",
    "Opportunities to Publish": "OP-X-008",
    "SocalEngage": "OP-MKT-009",
    "Priorities Explored 2026": "OP-ITG-002",
    "Priorities Explored 2026/Applications": "OP-DTX-001",
    "Priorities Explored 2026/Data": "OP-ITG-014",
    "Priorities Explored 2026/Infrastructure & Operations": "OP-ITG-001",
    "Priorities Explored 2026/Security": "OP-RSK-006",
    "ADPA AI Driven Risk Management": "OP-RSK-001",
    "ADPA ICT Governance Framework": "OP-ITG-002",
    "European Aviation Resilience Network": "OP-ITG-016",
    "Drone Spectrum Analysis IoT devices": "OP-ITG-023",
    "Defense 24-7 SOCs Architecture": "OP-ITG-024",
}

# Additional OPs that receive a full folder manifest without changing primary ownership above.
FOLDER_CLUSTER_SECONDARY: dict[str, list[str]] = {
    "ADPA ICT Governance Framework": ["OP-ITG-013"],
    "ADPA AI Driven Risk Management": ["OP-ITG-013"],
}

# Filename / pattern → primary OP (basename or substring match, case-insensitive)
FILENAME_PRIMARY: list[tuple[str, str]] = [
    ("AI Purpose Clause", "OP-LEG-001"),
    ("ADPA Business Case", "OP-ITG-019"),
    ("ADPA - ICT Governance Framework", "OP-ITG-002"),
    ("ICT Governance", "OP-ITG-002"),
    ("ADPA AI Driven Risk", "OP-RSK-001"),
    ("adpa-ai-risk", "OP-RSK-001"),
    ("Project-to-Operations SOP Handover", "OP-OPS-007"),
    ("SOP Handover Document", "OP-OPS-007"),
    ("ADPA Client Onboarding Assessment System", "OP-CX-002"),
    ("ADPA - Onboarding", "OP-CX-001"),
    ("Communication Management Plan", "OP-CHG-001"),
    ("ADPA - Communication Management Plan", "OP-CHG-001"),
    ("Data_Governance_Charter", "OP-ITG-014"),
    ("Data_Modeling_Standards", "OP-ITG-014"),
    ("Data_Quality_Management", "OP-ITG-014"),
    ("Master_Data_Management", "OP-ITG-014"),
    ("Metadata_Management", "OP-ITG-014"),
    ("Enterprise_Data_Architecture", "OP-ITG-014"),
    ("ADPA - Advanced Document Processing", "OP-ITG-019"),
    ("ADPA_Playbook", "OP-ITG-018"),
    ("ADPA Playbook", "OP-ITG-018"),
    ("Patent and IP Opportunities", "OP-FIN-011"),
    ("Growth and possible opportunities 2026", "OP-X-001"),
    ("opportunities 2026", "OP-X-001"),
]

# Portfolio/meta sources — leave unassigned (governance narrative, not an OP workspace)
IGNORE_ADPA_BASENAMES = frozenset({"opportunities no working capital 2026.docx"})

# Generic ADPA platform docs → platform evolution opportunity
ADPA_PLATFORM_PREFIXES = (
    "ADPA - ",
    "ADPA_",
    "ADPA ",
)


def extract_docx_text(path: Path) -> str:
    try:
        with zipfile.ZipFile(path) as zf:
            xml_bytes = zf.read("word/document.xml")
    except (zipfile.BadZipFile, KeyError, OSError):
        return f"*(Could not read document: {path.name})*"

    root = ET.fromstring(xml_bytes)
    paragraphs: list[str] = []
    for p in root.iter(f"{W_NS}p"):
        parts: list[str] = []
        for node in p.iter():
            if node.tag == f"{W_NS}t" and node.text:
                parts.append(node.text)
        if parts:
            paragraphs.append("".join(parts))
    text = "\n\n".join(paragraphs).strip()
    if len(text) > MAX_EXTRACT_CHARS:
        text = text[:MAX_EXTRACT_CHARS] + "\n\n---\n\n*(Truncated — see source .docx on OneDrive.)*"
    return text or f"*(No extractable text in {path.name})*"


def normalize_rel(path: Path) -> str:
    try:
        rel = path.relative_to(ADPA_ROOT)
    except ValueError:
        return path.as_posix()
    return rel.as_posix()


def parse_inventory_sources() -> dict[str, list[str]]:
    """OP-ID → list of source path fragments from inventory table notes."""
    text = INVENTORY.read_text(encoding="utf-8")
    by_op: dict[str, list[str]] = defaultdict(list)
    for line in text.splitlines():
        if not line.startswith("| `OP-"):
            continue
        m_id = re.match(r"\|\s*`(OP-[A-Z]+-\d+)`", line)
        if not m_id:
            continue
        op_id = m_id.group(1)
        for sm in re.finditer(r"Source:\s*`([^`]+)`", line):
            by_op[op_id].append(sm.group(1).strip())
        # Tier-2 table paths without "Source:" label
        if "Full 35-doc" in line and "Online Tutoring" in line:
            by_op["OP-HR-005"].append("Opportunities Business\\Online Tutoring or Coaching\\")
        if "33-doc" in line and "Client Onboarding" in line:
            by_op["OP-CX-002"].append("Opportunities Business\\ADPA - Client Onboarding Assessments Systems\\")
        if "AI Purpose Clause" in line and "Adapt existing" in line:
            by_op["OP-LEG-001"].append("AI Purpose Clause.docx")
    return dict(by_op)


def resolve_fragment(fragment: str, all_docx: list[Path]) -> list[Path]:
    frag = fragment.replace("\\", "/").strip().rstrip("/")
    if frag.endswith("/") or ("/" in frag and not frag.lower().endswith(".docx")):
        prefix = frag.lower()
        return [p for p in all_docx if normalize_rel(p).lower().startswith(prefix.lower())]
    base = Path(frag).name.lower()
    exact = [p for p in all_docx if p.name.lower() == base]
    if exact:
        return exact
    return [p for p in all_docx if base in p.name.lower()]


def list_opportunity_dirs() -> dict[str, Path]:
    mapping: dict[str, Path] = {}
    for d in OPP_ROOT.iterdir():
        if not d.is_dir():
            continue
        m = re.match(r"(OP-[A-Z]+-\d+)_", d.name)
        if m:
            mapping[m.group(1)] = d
    return mapping


def slug_tokens(folder_name: str) -> set[str]:
    slug = re.sub(r"^OP-[A-Z]+-\d+_", "", folder_name)
    parts = re.split(r"[_\s]+", slug.lower())
    return {p for p in parts if len(p) > 2}


def score_match(op_id: str, opp_dir: Path, doc: Path) -> float:
    stem = doc.stem.lower().replace("_", " ").replace("-", " ")
    tokens = slug_tokens(opp_dir.name)
    if not tokens:
        return 0.0
    hits = sum(1 for t in tokens if t in stem)
    ratio = SequenceMatcher(None, " ".join(sorted(tokens)), stem).ratio()
    return hits * 0.25 + ratio


def pick_ideation_file(docs: list[Path], prefer: set[Path] | None = None) -> Path | None:
    if prefer:
        preferred = [p for p in docs if p in prefer]
        if preferred:
            docs = preferred
    def rank(p: Path) -> tuple[int, str]:
        n = p.name.lower()
        if "business case" in n or "business_case" in n:
            return (99, n)
        score = 50
        if "ideation" in n:
            score = 0
        elif "project charter" in n or "project_charter" in n:
            score = 10
        elif n.startswith("adpa") and "overview" in n:
            score = 15
        return (score, n)

    candidates = [p for p in docs if "business case" not in p.name.lower()]
    if not candidates:
        return None
    return min(candidates, key=rank)


def pick_business_case_file(docs: list[Path], prefer: set[Path] | None = None) -> Path | None:
    if prefer:
        preferred = [p for p in docs if p in prefer]
        if preferred:
            docs = preferred
    def rank(p: Path) -> tuple[int, str]:
        n = p.name.lower()
        score = 50
        if "business_case" in n or "business case" in n:
            score = 0
        elif "business_benefit" in n:
            score = 5
        elif "business_value" in n:
            score = 8
        elif "strategy_analy" in n:
            score = 12
        return (score, n)

    return min(docs, key=rank) if docs else None


def folder_primary_assignment(rel: str) -> str | None:
    rel_norm = rel.replace("\\", "/")
    best: tuple[int, str] | None = None
    for folder, op in FOLDER_PRIMARY.items():
        if rel_norm.lower().startswith(folder.lower() + "/") or rel_norm.lower() == folder.lower():
            depth = len(folder)
            if best is None or depth > best[0]:
                best = (depth, op)
    return best[1] if best else None


def filename_primary_assignment(name: str) -> str | None:
    nl = name.lower()
    for pattern, op in FILENAME_PRIMARY:
        if pattern.lower() in nl:
            return op
    if nl.startswith("adpa") or any(name.startswith(p) for p in ADPA_PLATFORM_PREFIXES):
        return "OP-ITG-019"
    return None


def parse_inventory_row(op_id: str) -> dict[str, str]:
    """Best-effort parse of description / capital from inventory row."""
    text = INVENTORY.read_text(encoding="utf-8")
    pattern = rf"\|\s*`{re.escape(op_id)}`[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|([^|]+)\|[^|]*\|[^|]*\|[^|]*\|([^|]+)\|"
    m = re.search(pattern, text)
    if not m:
        return {}
    return {"description": m.group(1).strip(), "expected_capital": m.group(2).strip()}


def md_header(title: str, op_id: str, source: str | None) -> str:
    lines = [
        f"# {title} — `{op_id}`",
        "",
        f"**Generated:** {date.today().isoformat()} (from ADPA Projects Lists source assignment script)",
        f"**Stage:** Tier 2 — Ideation / Benefit framing (see [Tailored-Hybrid-SIDPA-Governance.md](../../docs/governance/Tailored-Hybrid-SIDPA-Governance.md))",
    ]
    if source:
        lines.append(f"**Primary source:** `{source}`")
    lines.extend(["", "> Canonical paths remain on OneDrive; this markdown is an extracted working copy.", ""])
    return "\n".join(lines)


def update_ideation_spark(opp_dir: Path, op_id: str, has_sources: bool) -> None:
    spark = opp_dir / "Ideation-Spark.md"
    if not spark.exists():
        return
    content = spark.read_text(encoding="utf-8")
    assets_block = (
        "\n## Assigned Source Documents (ADPA)\n\n"
        "- [Source-Documents.md](Source-Documents.md) — full manifest\n"
        "- [Ideation-Document.md](Ideation-Document.md) — extracted ideation content\n"
        "- [Business-Case.md](Business-Case.md) — extracted business case content\n"
    )
    if "## Assigned Source Documents (ADPA)" not in content:
        content = content.rstrip() + "\n" + assets_block
    if has_sources and "- [ ] Review any referenced source document" in content:
        content = content.replace(
            "- [ ] Review any referenced source document in `ADPA - Projects Lists` or existing CBa Consult templates.",
            "- [x] Review any referenced source document in `ADPA - Projects Lists` or existing CBa Consult templates.",
        )
        content = content.replace(
            "- [ ] Decide whether to pair this offer as a wedge/add-on to a Tier A/B flagship or advance to a standalone `Ideation-Document.md`.",
            "- [x] Assigned ADPA sources extracted to `Ideation-Document.md` / `Business-Case.md` (Tier 2 draft — Director review still required).",
        )
    spark.write_text(content, encoding="utf-8")


def is_curated_markdown(path: Path) -> bool:
    """Return True when a workspace doc has curated SIDPA single-line YAML frontmatter."""
    if not path.exists():
        return False
    raw = path.read_text(encoding="utf-8", errors="replace")
    return raw.startswith("---\npmbok_edition:") or raw.startswith("---\r\npmbok_edition:")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Assign ADPA .docx source documents without clobbering curated workspace docs."
    )
    parser.add_argument(
        "--force-overwrite",
        action="store_true",
        help="Overwrite even curated Ideation-Document.md and Business-Case.md files.",
    )
    args = parser.parse_args()

    if not ADPA_ROOT.is_dir():
        raise SystemExit(f"ADPA root not found: {ADPA_ROOT}")

    all_docx = sorted(ADPA_ROOT.rglob("*.docx"))
    opp_dirs = list_opportunity_dirs()
    inv_sources = parse_inventory_sources()

    primary: dict[Path, str] = {}
    explicit_inventory: set[Path] = set()
    ops_with_explicit: set[str] = set()

    # Pass 1: inventory explicit sources
    for op_id, fragments in inv_sources.items():
        for frag in fragments:
            for p in resolve_fragment(frag, all_docx):
                primary[p] = op_id
                explicit_inventory.add(p)
                ops_with_explicit.add(op_id)

    # Pass 2: folder rules
    for p in all_docx:
        if p in primary or p.name in IGNORE_ADPA_BASENAMES:
            continue
        rel = normalize_rel(p)
        op = folder_primary_assignment(rel)
        if op:
            primary[p] = op

    # Pass 3: filename rules
    for p in all_docx:
        if p in primary or p.name in IGNORE_ADPA_BASENAMES:
            continue
        op = filename_primary_assignment(p.name)
        if op:
            primary[p] = op

    # Known folder prefixes per OP (for fuzzy guardrails)
    op_folder_hints: dict[str, set[str]] = defaultdict(set)
    for p, op in primary.items():
        rel = normalize_rel(p).lower()
        if "/" in rel:
            op_folder_hints[op].add(rel.rsplit("/", 1)[0])

    # Pass 4: fuzzy to best opportunity (only unassigned; conservative)
    unassigned: list[Path] = []
    for p in all_docx:
        if p in primary:
            continue
        if p.name in IGNORE_ADPA_BASENAMES:
            unassigned.append(p)
            continue
        rel = normalize_rel(p).lower()
        parent = rel.rsplit("/", 1)[0] if "/" in rel else ""
        best_op = None
        best_score = 0.55
        for op_id, opp_dir in opp_dirs.items():
            if op_id in ops_with_explicit and parent:
                hints = op_folder_hints[op_id]
                if hints and parent not in hints and not any(
                    parent.startswith(h) or h.startswith(parent) for h in hints
                ):
                    continue
            s = score_match(op_id, opp_dir, p)
            if parent and parent in op_folder_hints[op_id]:
                s += 0.2
            if s > best_score:
                best_score = s
                best_op = op_id
        if best_op:
            primary[p] = best_op
        else:
            unassigned.append(p)

    suite_prefer: dict[str, set[Path]] = defaultdict(set)
    for folder, op in FOLDER_PRIMARY.items():
        fp = folder.lower()
        for p in all_docx:
            rel = normalize_rel(p).lower()
            if rel == fp or rel.startswith(fp + "/"):
                suite_prefer[op].add(p)

    by_op_docs: dict[str, list[Path]] = defaultdict(list)
    for p, op in primary.items():
        by_op_docs[op].append(p)

    for folder, extra_ops in FOLDER_CLUSTER_SECONDARY.items():
        fp = folder.lower()
        cluster_files = [
            p
            for p in all_docx
            if (rel := normalize_rel(p).lower()) == fp or rel.startswith(fp + "/")
        ]
        for op_id in extra_ops:
            have = {id(x) for x in by_op_docs[op_id]}
            for p in cluster_files:
                if id(p) not in have:
                    by_op_docs[op_id].append(p)
                    have.add(id(p))
            suite_prefer[op_id].update(cluster_files)

    stats = {
        "ops_with_docs": 0,
        "ideation_written": 0,
        "business_written": 0,
        "preserved_curated": 0,
        "total_docx": len(all_docx),
    }

    for op_id, opp_dir in sorted(opp_dirs.items()):
        docs = sorted(by_op_docs.get(op_id, []), key=lambda x: normalize_rel(x).lower())
        if docs:
            stats["ops_with_docs"] += 1

        # Source manifest
        manifest_lines = [
            f"# Source Documents — `{op_id}`",
            "",
            f"**ADPA root:** `{ADPA_ROOT}`",
            f"**Assigned files:** {len(docs)}",
            "",
            "| Role | Relative path | File name |",
            "| --- | --- | --- |",
        ]
        prefer = {p for p in docs if p in explicit_inventory or p in suite_prefer.get(op_id, set())}
        ideation_pick = pick_ideation_file(docs, prefer)
        bc_pick = pick_business_case_file(docs, prefer)
        for p in docs:
            rel = normalize_rel(p)
            role = []
            if ideation_pick and p.samefile(ideation_pick):
                role.append("**Ideation**")
            if bc_pick and p.samefile(bc_pick):
                role.append("**Business case**")
            primary_op = primary.get(p)
            if primary_op and primary_op != op_id:
                role.append(f"Cluster ref. (primary `{primary_op}`)")
            if not role:
                role.append("Supporting")
            manifest_lines.append(f"| {' / '.join(role)} | `{rel}` | {p.name} |")
        if not docs:
            manifest_lines.append("| — | *(No .docx assigned — see [inventory-of-ideas.md](../../inventory-of-ideas.md))* | — |")
        (opp_dir / "Source-Documents.md").write_text("\n".join(manifest_lines) + "\n", encoding="utf-8")

        # Ideation document
        if ideation_pick:
            body = extract_docx_text(ideation_pick)
            doc_md = md_header("Ideation Document", op_id, normalize_rel(ideation_pick)) + body + "\n"
            stats["ideation_written"] += 1
        else:
            row = parse_inventory_row(op_id)
            spark = opp_dir / "Ideation-Spark.md"
            spark_excerpt = ""
            if spark.exists():
                spark_excerpt = spark.read_text(encoding="utf-8")[:4000]
            doc_md = (
                md_header("Ideation Document", op_id, None)
                + "## Portfolio-derived ideation (no dedicated .docx assigned)\n\n"
                + (f"**Inventory description:** {row.get('description', '—')}\n\n" if row else "")
                + "### From Ideation-Spark.md\n\n"
                + spark_excerpt
                + "\n"
            )
        id_target = opp_dir / "Ideation-Document.md"
        if args.force_overwrite or not is_curated_markdown(id_target):
            id_target.write_text(doc_md, encoding="utf-8")
        else:
            stats["preserved_curated"] += 1

        # Business case
        if bc_pick and (bc_pick != ideation_pick or len(docs) == 1):
            body = extract_docx_text(bc_pick)
            bc_md = md_header("Business Case", op_id, normalize_rel(bc_pick)) + body + "\n"
            stats["business_written"] += 1
        elif bc_pick and "business" in bc_pick.name.lower():
            body = extract_docx_text(bc_pick)
            bc_md = md_header("Business Case", op_id, normalize_rel(bc_pick)) + body + "\n"
            stats["business_written"] += 1
        else:
            row = parse_inventory_row(op_id)
            bc_md = (
                md_header("Business Case", op_id, None)
                + "## Business case outline (derived from portfolio inventory)\n\n"
                + "| Field | Value |\n| --- | --- |\n"
                + f"| **Opportunity** | `{op_id}` |\n"
                + f"| **Value proposition** | {row.get('description', 'See Ideation-Spark.md')} |\n"
                + f"| **Expected capital / pricing band** | {row.get('expected_capital', 'See inventory-of-ideas.md')} |\n"
                + "| **$0 working capital thesis** | Sweat-equity delivery per [ideation-template.md](../../ideation-template.md) |\n\n"
                + "### Next step\n\n"
                + "Add a dedicated `Business Case` or `Business_Case_*.docx` under ADPA Projects Lists, then re-run "
                + "`python scripts/assign_adpa_source_documents.py`.\n"
            )
            if ideation_pick:
                bc_md += f"\n### Supporting context (from primary ideation source)\n\n"
                bc_md += extract_docx_text(ideation_pick)[:12_000] + "\n"

        bc_target = opp_dir / "Business-Case.md"
        if args.force_overwrite or not is_curated_markdown(bc_target):
            bc_target.write_text(bc_md, encoding="utf-8")
        else:
            stats["preserved_curated"] += 1
        update_ideation_spark(opp_dir, op_id, bool(docs))

    # Portfolio register
    reg_lines = [
        "# Source Document Assignment Register",
        "",
        f"**Last run:** {date.today().isoformat()}",
        f"**ADPA root:** `{ADPA_ROOT}`",
        f"**Total .docx scanned:** {len(all_docx)}",
        f"**Assigned:** {len(primary)} · **Unassigned:** {len(unassigned)}",
        f"**Opportunities with ≥1 assigned doc:** {stats['ops_with_docs']} / {len(opp_dirs)}",
        "",
        "Regenerate: `python scripts/assign_adpa_source_documents.py`",
        "",
        "## Summary by opportunity",
        "",
        "| OP-ID | Assigned .docx count | Ideation source | Business case source |",
        "| --- | ---: | --- | --- |",
    ]
    for op_id in sorted(opp_dirs):
        docs = by_op_docs.get(op_id, [])
        prefer = {p for p in docs if p in explicit_inventory or p in suite_prefer.get(op_id, set())}
        ide = pick_ideation_file(docs, prefer)
        bc = pick_business_case_file(docs, prefer)
        reg_lines.append(
            f"| `{op_id}` | {len(docs)} | "
            f"{ide.name if ide else '—'} | "
            f"{bc.name if bc else '—'} |"
        )
    reg_lines.extend(["", "## Unassigned documents", ""])
    if unassigned:
        for p in unassigned[:200]:
            reg_lines.append(f"- `{normalize_rel(p)}`")
        if len(unassigned) > 200:
            reg_lines.append(f"- *… and {len(unassigned) - 200} more*")
    else:
        reg_lines.append("*(None — all documents have a primary assignment.)*")

    reg_lines.extend(["", "## Assignment JSON (machine-readable)", "", "```json"])
    reg_lines.append(
        json.dumps(
            {op: [normalize_rel(p) for p in paths] for op, paths in sorted(by_op_docs.items())},
            indent=2,
        )
    )
    reg_lines.append("```\n")
    REGISTER.write_text("\n".join(reg_lines), encoding="utf-8")

    print(json.dumps(stats, indent=2))
    print(f"Register: {REGISTER}")
    print(f"Unassigned: {len(unassigned)}")


if __name__ == "__main__":
    main()