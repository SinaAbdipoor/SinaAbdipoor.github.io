"""Render the full CV and the resume PDFs from _data/cv.yaml and _bibliography/papers.bib.

The resume is industry focused: it uses the headline, summary, social networks,
and footer from the top-level `resume` block, then shows RESUME_SECTIONS in that order, keeping only
entries tagged `resume`, with `resume_summary` and `resume_highlights` in place
of `summary` and `highlights` (dropped when an entry has no `resume_highlights`).

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
    "Talks",
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
    if fields.get("resume") == "true":
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


def cv_entry(entry):
    if not isinstance(entry, dict):
        return entry
    return {key: value for key, value in entry.items() if not key.startswith("resume_")}


def resume_entry(entry):
    entry = {key: value for key, value in entry.items() if key != "highlights"}
    for field in ("summary", "highlights"):
        if f"resume_{field}" in entry:
            entry[field] = entry.pop(f"resume_{field}")
    return entry


def resume_sections(sections, summary):
    # The CV splits work into academic and professional sections. The resume merges them.
    sections = dict(sections)
    sections["Experience"] = sorted(
        sections["Academic Positions"] + sections["Professional Experience"],
        key=lambda e: str(e["start_date"]),
        reverse=True,
    )
    kept = {"Summary": [summary]}
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
    resume = cv.pop("resume")
    sections = cv["cv"]["sections"]
    sections["Publications"] = publications()
    cv["cv"]["sections"] = {name: [cv_entry(e) for e in entries] for name, entries in sections.items()}
    render(cv, out / "cv.yaml", extra_args)

    cv["cv"]["headline"] = resume["headline"]
    cv["cv"]["social_networks"] = [s for s in cv["cv"]["social_networks"] if s["network"] in resume["networks"]]
    cv["cv"]["sections"] = resume_sections(sections, resume["summary"])
    cv["design"]["templates"]["footer"] = resume["footer"]
    cv["settings"] = {"pdf_title": "NAME - Resume"}
    render(cv, out / "resume.yaml", extra_args)


if __name__ == "__main__":
    main()
