"""Render the full CV and the resume PDFs from _data/cv.yaml and _bibliography/papers.bib.

The resume is industry focused: it shows RESUME_SECTIONS in that order, keeping
only entries tagged `resume`, without their highlights, and with `resume_summary`
in place of `summary` when an entry has one.

Usage: python scripts/render_cv.py OUTPUT_DIR [extra rendercv args]
"""

import subprocess
import sys
from pathlib import Path

import bibtexparser
from bibtexparser.middlewares import (
    LatexDecodingMiddleware,
    MonthIntMiddleware,
    SeparateCoAuthors,
    SplitNameParts,
)
from ruamel.yaml import YAML

ROOT = Path(__file__).resolve().parent.parent
ME = "Sina Abdipoor"
RESUME_SECTIONS = [
    "Experience",
    "Skills",
    "Projects",
    "Education",
    "Publications",
    "Awards",
    "Certificates",
]


def publication(entry):
    fields = {key: field.value for key, field in entry.fields_dict.items()}
    authors = [" ".join(a.first + a.last) for a in fields["author"]]
    item = {
        "title": fields["title"],
        "authors": [f"**{a}**" if a == ME else a for a in authors],
        "journal": fields.get("journal") or fields["booktitle"],
        "date": f"{fields['year']}-{fields['month']:02d}" if "month" in fields else int(fields["year"]),
    }
    # RenderCV shows one link per entry, so prefer the DOI.
    if "doi" in fields:
        item["doi"] = fields["doi"]
    elif "url" in fields:
        item["url"] = fields["url"]
    if "note" in fields:
        item["summary"] = fields["note"]
    # al-folio's `selected` flag also picks the papers for the resume.
    if fields.get("selected") == "true":
        item["tags"] = "resume"
    return item


def publications():
    library = bibtexparser.parse_file(
        ROOT / "_bibliography" / "papers.bib",
        append_middleware=[
            LatexDecodingMiddleware(),
            MonthIntMiddleware(True),
            SeparateCoAuthors(),
            SplitNameParts(),
        ],
    )
    items = [publication(entry) for entry in library.entries]
    return sorted(items, key=lambda item: str(item["date"]), reverse=True)


def resume_entry(entry):
    entry = {key: value for key, value in entry.items() if key != "highlights"}
    if "resume_summary" in entry:
        entry["summary"] = entry.pop("resume_summary")
    return entry


def resume_sections(sections):
    # The CV splits work into academic and professional sections. The resume merges them.
    sections = dict(sections)
    sections["Experience"] = sorted(
        sections["Academic Positions"] + sections["Professional Experience"],
        key=lambda e: str(e["start_date"]),
        reverse=True,
    )
    kept = {}
    for name in RESUME_SECTIONS:
        kept["Selected Publications" if name == "Publications" else name] = [
            resume_entry(e)
            for e in sections[name]
            if isinstance(e, dict) and "resume" in e.get("tags", "")
        ]
    return kept


def render(data, path, extra_args):
    with path.open("w") as f:
        YAML().dump(data, f)
    subprocess.run(
        ["rendercv", "render", str(path), "--pdf-path", str(path.with_suffix(".pdf")),
         "--typst-path", str(path.with_suffix(".typ")), "-nomd", "-nohtml", "-nopng", *extra_args],
        check=True,
    )


def main():
    out = Path(sys.argv[1]).resolve()
    out.mkdir(parents=True, exist_ok=True)
    extra_args = sys.argv[2:]

    cv = YAML().load(ROOT / "_data" / "cv.yaml")
    sections = cv["cv"]["sections"]
    sections["Publications"] = publications()
    render(cv, out / "cv.yaml", extra_args)

    cv["cv"]["sections"] = resume_sections(sections)
    # Only the resume links to the full CV.
    cv["cv"]["custom_connections"] = [
        {"placeholder": "Full CV", "url": f"{cv['cv']['website']}/cv/", "fontawesome_icon": "file-lines"}
    ]
    render(cv, out / "resume.yaml", extra_args)


if __name__ == "__main__":
    main()
