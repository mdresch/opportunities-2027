#!/usr/bin/env python3
"""Inventory Business Development - Documents subfolders for one opportunity (local machine)."""

from __future__ import annotations

import argparse
import os
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs" / "crosswalk" / "bd-sources-registry.yaml"

EXTS = {".pptx", ".docx", ".pdf", ".xlsx", ".md", ".zip", ".mp4", ".url"}


def load_bd_root(registry: dict) -> Path:
    bd = os.environ.get("BD_DOCUMENTS_ROOT") or registry.get("bd_root", "")
    return Path(bd).expanduser()


def find_opp_entry(registry: dict, opp_id: str) -> tuple[str, dict] | None:
    for folder_name, entry in registry.get("opportunities", {}).items():
        if entry.get("id") == opp_id or opp_id in folder_name:
            return folder_name, entry
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--opp", default="OP-ITG-013", help="Opportunity ID")
    parser.add_argument("--out", help="Output markdown path")
    args = parser.parse_args()

    with REGISTRY.open(encoding="utf-8") as f:
        registry = yaml.safe_load(f)

    found = find_opp_entry(registry, args.opp)
    if not found:
        raise SystemExit(f"No registry entry for {args.opp}")

    opp_folder, entry = found
    bd_root = load_bd_root(registry)
    opp_dir = ROOT / "opportunities" / opp_folder
    out_path = Path(args.out) if args.out else opp_dir / "BD-Reuse-Inventory.md"

    lines = [
        f"# Business Development reuse inventory — `{args.opp}`",
        "",
        f"**Generated:** {date.today().isoformat()}",
        f"**BD root:** `{bd_root}`",
        f"**Registry:** [bd-sources-registry.yaml](../../docs/crosswalk/bd-sources-registry.yaml)",
        "",
        "> Files listed here are **local only**. Do not copy client content into git.",
        "",
    ]

    if not bd_root.is_dir():
        lines.extend(
            [
                "## Status: BD root not reachable from this machine",
                "",
                "Set `BD_DOCUMENTS_ROOT` or update `bd_root` in the registry, then re-run:",
                "",
                "```bash",
                f"py -3 scripts/inventory-bd-folder.py --opp {args.opp}",
                "```",
                "",
                "## Expected folders (from registry)",
                "",
            ]
        )
        for sub in entry.get("folders", []):
            lines.append(f"- `{sub}`")
        out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote template (BD root missing): {out_path}")
        return

    lines.append("## Folder inventory")
    lines.append("")

    for sub in entry.get("folders", []):
        folder = bd_root / sub
        lines.append(f"### `{sub}`")
        if not folder.is_dir():
            lines.append("")
            lines.append("*Folder not found on disk.*")
            lines.append("")
            continue
        rows: list[tuple[str, int, str]] = []
        for path in sorted(folder.rglob("*")):
            if not path.is_file():
                continue
            if path.suffix.lower() not in EXTS:
                continue
            rel = path.relative_to(folder).as_posix()
            size_kb = path.stat().st_size // 1024
            rows.append((rel, size_kb, path.suffix.lower()))
        lines.append("")
        lines.append("| Relative path | Size (KB) | Type | Suggested GTM use |")
        lines.append("| --- | ---: | --- | --- |")
        for rel, kb, ext in rows[:200]:
            use = _suggest_use(sub, rel)
            lines.append(f"| `{rel}` | {kb} | {ext} | {use} |")
        if len(rows) > 200:
            lines.append(f"| *… {len(rows) - 200} more files* | | | |")
        lines.append("")

    lines.extend(
        [
            "## GTM mapping (OP-ITG-013)",
            "",
            "| BD folder | Use in engagement |",
            "| --- | --- |",
            "| `Build a CoPilot Demo` | Portal follow-up demos, LinkedIn video stills |",
            "| `ICT Governance Framework` | Maturity framing, kickoff deck shells |",
            "| `Build a Security and Compliance Practice` | SoD / EU AI Act narrative, pre-engagement compliance story |",
            "| `Azure AI Data` | FinOps + data residency slides for Pillar 7–8 |",
            "",
        ]
    )

    out_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out_path} ({len(lines)} lines)")


def _suggest_use(subfolder: str, relpath: str) -> str:
    name = relpath.lower()
    if "kickoff" in name or "kick-off" in name:
        return "Kickoff / workshop"
    if "demo" in name or "copilot" in name:
        return "Portal follow-up demo"
    if "governance" in name or "maturity" in name:
        return "Pillar framing"
    if "security" in name or "compliance" in name or "sod" in name:
        return "P0 / SoD narrative"
    if "finops" in name or "cost" in name:
        return "Pillar 7 FinOps"
    if subfolder == "Build a CoPilot Demo":
        return "LinkedIn / briefing demo"
    return "Reference"


if __name__ == "__main__":
    main()