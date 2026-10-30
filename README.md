# SinaAbdipoor.github.io

Personal website, CV, and resume of Sina Abdipoor, built with [al-folio](https://github.com/alshedivat/al-folio).

## Files

- `_data/cv.yaml`: all CV content, in [RenderCV](https://rendercv.com) format. Entries tagged `resume` also go into the resume.
- `_bibliography/papers.bib`: all publications. Papers with `selected = {true}` go on the home page and into the resume.
- `scripts/render_cv.py`: renders the full CV and the resume PDFs.
- `scripts/requirements.txt`: pinned Python dependencies for the script.
- `.github/workflows/cv-pdfs.yml`: rebuilds both PDFs into `assets/pdf/` when the CV or papers change.
- `scripts/orcid_sync.py` and `.github/workflows/orcid-sync.yml`: every Monday, open a pull request with any new paper from my public ORCID record.

## Build the PDFs

```sh
pip install -r scripts/requirements.txt
python scripts/render_cv.py build
```

This writes `build/cv.pdf` and `build/resume.pdf`.

## License

Content © Sina Abdipoor, all rights reserved. The al-folio theme code is under its MIT `LICENSE`.
