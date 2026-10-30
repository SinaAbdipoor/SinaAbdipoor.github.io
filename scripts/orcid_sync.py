"""Add papers from my public ORCID record that are not yet in papers.bib.

For each new work with a DOI, the BibTeX entry is fetched from doi.org and
appended to papers.bib. Works without a DOI are only listed, to add by hand.
Prints a Markdown summary, which the workflow uses as the pull request text.
Also lists papers in papers.bib that are missing from ORCID, to add there by hand.

Usage: python scripts/orcid_sync.py
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BIB = ROOT / "_bibliography" / "papers.bib"
SOCIALS = ROOT / "_data" / "socials.yml"


def get(url, accept):
    request = urllib.request.Request(url, headers={"Accept": accept, "User-Agent": "orcid-sync (sinaabdipoor.github.io)"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def normalize(title):
    return re.sub(r"[^a-z0-9]", "", title.lower())


def orcid_works(orcid_id):
    data = json.loads(get(f"https://pub.orcid.org/v3.0/{orcid_id}/works", "application/json"))
    works = []
    for group in data.get("group", []):
        summary = group["work-summary"][0]
        title = summary["title"]["title"]["value"]
        ids = group.get("external-ids", {}).get("external-id", [])
        doi = next((i["external-id-value"] for i in ids if i["external-id-type"] == "doi"), None)
        works.append({"title": title, "doi": doi.lower() if doi else None})
    return works


def bib_papers(bib):
    papers = []
    for entry in re.split(r"(?m)^@", bib)[1:]:
        title = re.search(r"^\s*title\s*=\s*\{(.*)\},?\s*$", entry, re.M | re.I)
        doi = re.search(r"^\s*doi\s*=\s*\{([^}]*)\}", entry, re.M | re.I)
        if title:
            papers.append({"title": title.group(1), "doi": doi.group(1).lower() if doi else None})
    return papers


def main():
    orcid_id = re.search(r"^orcid_id:\s*(\S+)", SOCIALS.read_text(), re.M).group(1)
    bib = BIB.read_text()
    papers = bib_papers(bib)
    dois = {p["doi"] for p in papers if p["doi"]}
    titles = {normalize(p["title"]) for p in papers}

    works = orcid_works(orcid_id)
    added, by_hand = [], []
    for work in works:
        if work["doi"] in dois or normalize(work["title"]) in titles:
            continue
        if work["doi"]:
            bib = bib.rstrip("\n") + "\n\n" + get(f"https://doi.org/{work['doi']}", "application/x-bibtex").strip() + "\n"
            dois.add(work["doi"])
            added.append(work)
        else:
            by_hand.append(work)

    if added:
        BIB.write_text(bib)
    lines = []
    if added:
        lines.append("New papers from ORCID, added to `papers.bib`:\n")
        lines += [f"- {w['title']} (https://doi.org/{w['doi']})" for w in added]
        lines.append("\nBefore merging, check each entry and add `abbr`, and `selected = {true}` if it should be on the resume.")
    if by_hand:
        lines.append("\nNew works on ORCID without a DOI, to add by hand if wanted:\n")
        lines += [f"- {w['title']}" for w in by_hand]
    on_orcid_dois = {w["doi"] for w in works if w["doi"]}
    on_orcid_titles = {normalize(w["title"]) for w in works}
    missing = [p for p in papers if p["doi"] not in on_orcid_dois and normalize(p["title"]) not in on_orcid_titles]
    if missing:
        lines.append("\nPapers in `papers.bib` that are missing from ORCID, to add there by hand:\n")
        lines += [f"- {p['title']}" + (f" (https://doi.org/{p['doi']})" if p["doi"] else "") for p in missing]
    print("\n".join(lines) if lines else "papers.bib and ORCID list the same papers.")
    # GitHub Actions shows these lines as notices on the run page.
    print(f"::notice title=ORCID sync::ORCID lists {len(works)} public works: {len(added)} added, "
          f"{len(by_hand)} new without a DOI, {len(missing)} missing from ORCID.", file=sys.stderr)
    for p in missing:
        print(f"::notice title=Missing from ORCID::{p['title']}", file=sys.stderr)


if __name__ == "__main__":
    main()
