# SinaAbdipoor.github.io

Personal website, CV, and resume of Sina Abdipoor, built with [al-folio](https://github.com/alshedivat/al-folio).

## Files

- `_data/cv.yaml`: all CV content, in [RenderCV](https://rendercv.com) format. Entries tagged `resume` also go into the resume (using `resume_summary` and `resume_highlights` when given), and the `resume` block at the end sets its headline and summary.
- `_bibliography/papers.bib`: all publications. Papers with `selected = {true}` go on the home page, and those with `resume = {true}` go into the resume.
- `_news/`: news items, each with its own page. The home page shows the newest four as photo cards, and `/news/` lists all. Photos go in `assets/img/news/`.
- `_layouts/about.liquid`: the home page design. Its text (hero, stats, research tiles, bio) is in `_pages/about.md`.
- `_includes/`: our versions of al-folio's header, footer, news cards (`image` in a news item's front matter sets its photo) and project cards (`label` and `cover` in a project's front matter).
- `assets/js/site.js`: the hero background, drawn thumbnails for research tiles and projects, and copy buttons.
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
