# SinaAbdipoor.github.io

Personal website, CV, and resume of Sina Abdipoor.

## Files

- `cv.yaml`: all CV content, in [RenderCV](https://rendercv.com) format. Entries tagged `resume` also go into the resume.
- `papers.bib`: all publications. Papers with `selected = {true}` go into the resume.
- `scripts/render_cv.py`: renders the full CV and the resume PDFs.
- `requirements.txt`: pinned Python dependencies.

## Build

```sh
pip install -r requirements.txt
python scripts/render_cv.py build
```

This writes `build/cv.pdf` and `build/resume.pdf`.

## License

Content © Sina Abdipoor, all rights reserved.
