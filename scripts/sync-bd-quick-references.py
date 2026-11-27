#!/usr/bin/env python3
"""Write BD-Quick-Reference.md per opportunity and link from Ideation-Spark.md."""

from __future__ import annotations

import re
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None  # type: ignore

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "docs" / "crosswalk" / "bd-sources-registry.yaml"
CROSSWALK = ROOT / "docs" / "crosswalk" / "BD-Business-Development-Sources.md"
SPARK_MARKER = "## Business Development sources (local)"
LINK_BLOCK = (
    f"\n{SPARK_MARKER}\n\n"
    "See [BD-Quick-Reference.md](BD-Quick-Reference.md) — CBa Business Development "
    "folders on the Director machine (**not in git**). Master index: "
    "[BD-Business-Development-Sources.md](../../docs/crosswalk/BD-Business-Development-Sources.md).\n"
)


def load_registry() -> dict:
    if yaml is None:
        raise SystemExit("PyYAML required: pip install pyyaml")
    with REGISTRY.open(encoding="utf-8") as f:
        return yaml.safe_load(f)


def render_quick_ref(opp_id: str, folder_name: str, entry: dict, bd_root: str) -> str:
    lines = [
        f"# Business Development quick reference — `{opp_id}`",
        "",
        "> **Local only** — assets under the path below are not versioned in `oppurtunities-2027`.",
        "",
        f"**BD root:** `{bd_root}`",
        "",
        "## Folders to reuse",
        "",
        "| Practice folder | Typical use |",
        "| --- | --- |",
    ]
    for sub in entry.get("folders", []):
        lines.append(f"| `{sub}` | Kickoff, GTM, or workshop collateral |")
    notes = entry.get("notes", [])
    if notes:
        lines.extend(["", "## Notes", ""])
        for n in notes:
            lines.append(f"- {n}")
    track_a = entry.get("track_a_repo")
    artifacts = entry.get("track_a_artifacts", [])
    if track_a and artifacts:
        lines.extend(
            [
                "",
                "## Track A delivery repo (authoritative pilot IP)",
                "",
                f"**Path:** `{track_a}`",
                "",
                "| Artifact |",
                "| --- |",
            ]
        )
        for a in artifacts:
            lines.append(f"| `{a}` |")
    lines.extend(
        [
            "",
            "## Portfolio index",
            "",
            f"- [BD crosswalk (all opportunities)](../../docs/crosswalk/BD-Business-Development-Sources.md)",
            "- Regenerate this file: `py -3 scripts/sync-bd-quick-references.py`",
            "",
        ]
    )
    return "\n".join(lines)


def ensure_spark_link(spark_path: Path) -> bool:
    if not spark_path.is_file():
        return False
    text = spark_path.read_text(encoding="utf-8")
    if SPARK_MARKER in text:
        return False
    spark_path.write_text(text.rstrip() + LINK_BLOCK, encoding="utf-8")
    return True


def main() -> None:
    data = load_registry()
    bd_root = data.get("bd_root", "")
    opps = data.get("opportunities", {})
    written = 0
    linked = 0
    for folder_name, entry in sorted(opps.items()):
        opp_dir = ROOT / "opportunities" / folder_name
        if not opp_dir.is_dir():
            print(f"skip missing folder: {folder_name}")
            continue
        opp_id = entry.get("id", folder_name)
        out = opp_dir / "BD-Quick-Reference.md"
        out.write_text(render_quick_ref(opp_id, folder_name, entry, bd_root), encoding="utf-8")
        written += 1
        spark = opp_dir / "Ideation-Spark.md"
        if ensure_spark_link(spark):
            linked += 1
    print(f"Wrote {written} BD-Quick-Reference.md files; appended spark link on {linked} Ideation-Sparks.")


if __name__ == "__main__":
    main()