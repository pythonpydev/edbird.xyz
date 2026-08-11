# DocSwap

A batch document converter GUI (Tkinter, powered by [pandoc](https://pandoc.org)) that converts files between docx, rtf, txt, md, html, epub, latex, and pdf — pick a folder or a batch of files, choose a target format, and convert.

Currently available as a **Linux `.deb`** below (Debian/Ubuntu). Arch and Fedora packages, plus a Windows installer, are built from the same source and will be added here once built on those platforms — see the [source repository](https://github.com/pythonpydev/DocSwap) if you want to build one yourself in the meantime (`packaging/arch/PKGBUILD`, `packaging/fedora/build_rpm.sh`, `packaging/windows/installer.iss`).

## Features

- **Batch conversion** — add individual files or whole folders (recursive by default) and convert them all in one pass
- **Per-file output renaming** — right-click any file in the batch to give its converted output a custom name, without affecting the rest of the batch
- **Clickable results** — after conversion, click a successfully converted file's name in the results panel to open it directly
- **PDF export with a quality warning** — prefers a LaTeX engine (best typography) and falls back to `wkhtmltopdf` with a visible warning if LaTeX isn't installed
- **In-app help** — Help > User Guide opens a full formatted guide in your browser

## Supported formats

Bidirectional: **docx, rtf, txt, md, html, epub, latex**.
Output-only: **pdf** (pandoc can't reliably parse PDF as input, so it's only ever a conversion target).

`.doc` (legacy binary Word format) is intentionally not supported — convert those to `.docx` first, e.g. via LibreOffice.

## Requirements

- [pandoc](https://pandoc.org/installing.html) — the `.deb` below declares this as a dependency, so `apt` installs it automatically
- For PDF export, one of:
  - A LaTeX distribution (recommended): `sudo apt install texlive-latex-base`
  - [wkhtmltopdf](https://wkhtmltopdf.org/) as a lower-quality fallback: `sudo apt install wkhtmltopdf`

## Installing (Debian/Ubuntu)

```bash
sudo apt install ./docswap-linux.deb
```

This installs a `docswap` launcher, a desktop menu entry (with icon), and the app itself. Launch it from your application menu, or run `docswap` from a terminal.

## Usage

1. **Add Files...** or **Add Folder...** (also under the **File** menu) to build a batch.
2. Right-click a file to rename its output filename, or to remove just that entry from the batch.
3. Pick the target format from **Convert to**.
4. Choose whether to save output next to each input file (default) or into one output folder.
5. Click **Convert** — successful conversions show as a clickable link in the results panel.

Full documentation is available in-app via **Help > User Guide**.
