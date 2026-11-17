# SinaAbdipoor.github.io

Personal website, CV, and resume of Sina Abdipoor, built with [al-folio](https://github.com/alshedivat/al-folio).

## Files

- `_data/cv.yaml`: all CV content, in [RenderCV](https://rendercv.com) format. Entries tagged `resume` also go into the resume (using `resume_summary` and `resume_highlights` when given), and the `resume` block at the end sets its headline, summary, and resume-only sections.
- `_bibliography/papers.bib`: all publications. Papers with `selected = {true}` go on the Research page, and those with `resume = {N}` go into the resume, in that order.
- `_news/`: news items, each with its own page, listed as photo cards on `/news/`. Photos go in `assets/img/news/`.
- `_pages/`: the site's pages. Teaching, talks, awards, peer review, and the home page numbers and biography read their facts from `_data/cv.yaml`, so update the CV and the site follows.
- `_layouts/`: our versions of al-folio's home page (`about.liquid`) and page layout (`page.liquid`, a plain title header).
- `_includes/`: our versions of al-folio's header, footer, news cards (`image` in a news item's front matter sets its photo) and project cards (`label` and `cover` in a project's front matter), plus small helpers for CV dates, CV text, and profile icons, and the giscus embed for student feedback on the Teaching page (settings under `giscus` in `_config.yml`).
- `assets/js/site.js`: drawn thumbnails for research areas and projects, the tile spotlight, and copy buttons.
- `scripts/render_cv.py`: renders the full CV and the resume PDFs.
- `scripts/requirements.txt`: pinned Python dependencies for the script.
- `.github/workflows/cv-pdfs.yml`: builds both PDFs when the CV or papers change and saves them in `assets/pdf/`. Only the resume is on the website. The full CV stays in the repo and is left out of the site in `_config.yml`.
- `assets/css/main.scss`: the site's dark design, on top of al-folio's styles.
- `scripts/orcid_sync.py` and `.github/workflows/orcid-sync.yml`: every Monday, open a pull request with any new paper from my public ORCID record.

## Build the PDFs

```sh
pip install -r scripts/requirements.txt
python scripts/render_cv.py build
```

This writes `build/cv.pdf` and `build/resume.pdf`.

## License

Content © Sina Abdipoor, all rights reserved. The al-folio theme code is under its MIT `LICENSE`.
