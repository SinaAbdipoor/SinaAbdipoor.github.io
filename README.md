# SinaAbdipoor.github.io

Personal website, CV, and resume of Sina Abdipoor, built with [al-folio](https://github.com/alshedivat/al-folio).

## Files

- `_data/cv.yaml`: all CV content, in [RenderCV](https://rendercv.com) format. Entries tagged `resume` also go into the resume (using `resume_summary` and `resume_highlights` when given), and the `resume` block at the end sets its headline and summary.
- `_bibliography/papers.bib`: all publications. Papers with `selected = {true}` go on the home page, and those with `resume = {true}` go into the resume.
- `_news/`: news items, each with its own page. The home page lists the newest five, and `/news/` lists all. Photos go in `assets/img/news/`.
- `_includes/news.liquid`: al-folio's news list, showing month and year only.
- `scripts/render_cv.py`: renders the full CV and the resume PDFs.
- `scripts/requirements.txt`: pinned Python dependencies for the script.
- `.github/workflows/cv-pdfs.yml`: rebuilds both PDFs into `assets/pdf/` when the CV or papers change.
- `assets/css/main.scss`: theme colors and a few size tweaks on top of al-folio.
- `scripts/orcid_sync.py` and `.github/workflows/orcid-sync.yml`: every Monday, open a pull request with any new paper from my public ORCID record.

## Build the PDFs

```sh
pip install -r scripts/requirements.txt
python scripts/render_cv.py build
```

This writes `build/cv.pdf` and `build/resume.pdf`.

## License

Content © Sina Abdipoor, all rights reserved. The al-folio theme code is under its MIT `LICENSE`.
