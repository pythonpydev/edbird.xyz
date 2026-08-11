# Document Renamer

A small desktop app (Windows, plus Linux via `.deb`/Arch/Fedora packages — see "Linux packages" below) that scans a folder of ebooks/documents and renames each file using the Claude API, in one of three content-type modes:

- **Books** — identifies title/author, renames to `book_title-author_name.<ext>` (e.g. `applied_math-bill_smith.pdf`)
- **Journals** — identifies the first author, publication year and topic of a journal article, renames to `lastname-year-keyword.<ext>` (e.g. `smith-2023-neural-networks.pdf`)
- **Any** — no identification, no API calls; use this when your files don't fit either shape and you just want to tidy up their existing names (case/separator) with the Format button

Supported formats: **pdf, docx, epub, html, tex, txt, md**

(This app was previously called "Book Names," from when it only handled Books mode.)

New here? The app has a **Help > Getting Started** menu item that explains what you need and links straight to the Anthropic Console — you don't need to read this whole README first if you'd rather just launch it and click that.

## Requirements

- Python 3.10 or later
- An Anthropic API key with a funded credit balance (see below — this is **separate** from a Claude Pro/Max subscription). Not needed if you turn off the **AI search** toggle (see below) — the app then identifies files for free using local pattern matching instead, at a real cost to accuracy.

## Setup

Open a terminal in this folder and run:

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install -r requirements.txt
```

### Optional: OCR for scanned PDFs

A PDF with no text layer at all — a fully scanned book, or a scanned cover page followed by a few more scanned pages — normally can't be identified: there's no text to read. If you install OCR support, the app will fall back to reading the page as an image instead, whenever normal text extraction finds nothing on the first few pages.

This is entirely optional and off by default (well — automatic once installed, no toggle needed): without it, a scanned PDF just behaves exactly as it always has (logged as "could not determine title/author"). With it, some of those files can now be identified, at the cost of being slower for that subset of files and, like any OCR, not perfectly accurate.

Two things to install:

1. The Python packages:
   ```powershell
   .venv\Scripts\python -m pip install -r requirements-ocr.txt
   ```
2. The Tesseract OCR engine itself (a separate program, not a Python package):
   - **Windows** — download and run the installer from the [UB-Mannheim Tesseract build](https://github.com/UB-Mannheim/tesseract/wiki), then make sure its install folder (e.g. `C:\Program Files\Tesseract-OCR`) is on your `PATH`, or set `pytesseract.pytesseract.tesseract_cmd` — simplest is just adding it to `PATH` and restarting your terminal.
   - **Linux** — `sudo apt install tesseract-ocr` (Debian/Ubuntu) or your distro's equivalent.
   - **macOS** — `brew install tesseract`.

No restart of the app is needed beyond having both installed before you run it — it's detected automatically per file.

### Set your API key

The app calls the Claude API to read each file's extracted text and figure out its details (title/author for Books, author/year/topic for Journals — Any mode doesn't call the API at all). This needs its own API key from the [Anthropic Console](https://console.anthropic.com) (Settings → API Keys), with credit added under Plans & Billing. **This is not the same as a claude.ai or Claude Code subscription** — it's separate, pay-as-you-go usage. A few dollars of credit goes a very long way; each file identification typically costs a fraction of a cent.

The app's **Help > Getting Started** menu item walks through these same steps in-app (opened in your browser as a nicely formatted page), with a live check of whether the key is currently set, OS-specific instructions in tabs, and a link that opens the Console directly.

Don't want to set up an API key at all? Turn off **AI search** (next to the Content type radios) and the app will identify files for free instead, using local pattern matching on the extracted text — existing `Title:`/`Author:` metadata, a "by NAME" pattern, and the leading line of text as a fallback title. It's considerably less reliable than the Claude API (expect more "could not determine" results and the occasional wrong guess), but works instantly, offline, with no key and no cost.

The easiest way to set the key is **File > API Key...** (`Ctrl+K`) inside the app itself: paste your key and click Save. It's stored in the app's own settings (alongside your last-used folder, formats, etc.) and applied automatically every time you launch the app — no environment variable, no shell profile editing, no restart required.

Prefer a regular OS environment variable instead (e.g. so other tools can use the same key)?

**Windows (PowerShell):**

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

This only lasts for the current terminal session. To set it permanently so you don't have to repeat this every time:

```powershell
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-...", "User")
```

(then open a new terminal for it to take effect)

**Linux / macOS:**

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

This only lasts for the current terminal session. To set it permanently, add that line to your shell's profile file (`~/.bashrc` for bash, `~/.zshrc` for zsh — the default on modern macOS), then open a new terminal:

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
```

**Never paste your actual API key into a chat, email, or anywhere else it could be seen or logged.** If a key is ever exposed, revoke it in the Anthropic Console and generate a new one.

## Running the app

```powershell
.venv\Scripts\python main.py
```

## Using the app

1. **Files panel** — click **Folder...** (or use **File > Open Folder...** / **Ctrl+O**) to pick the folder containing your files; it's shown read-only next to the button once selected. The first time you run the app it starts at your system drive's root (`C:/` on Windows, `/` on Linux/Mac) — after that, it remembers whatever folder you last picked. Below that: **Include subfolders** to also scan every subfolder, not just the top level; **Preview only (no renaming)** to do a dry run — the app will identify each file's details and log what it *would* rename it to, without actually touching any files. Useful for sanity-checking before committing to a real run.
2. **File formats panel** — **Content type**: **Books** (renames to `book_title-author_name.<ext>`), **Journals** (renames to `lastname-year-keyword.<ext>`, e.g. `smith-2023-neural-networks.pdf`, following standard academic file-naming guidance — always lowercase/hyphenated, capped at 50 characters, and not user-configurable the way Books mode is), or **Any** (no identification scheme, so Start/Cancel are greyed out — only Format works, re-casing whatever's already on disk to your naming preference). Next to that, the **AI search** toggle (on by default) switches Books/Journals identification between the Claude API and free local pattern matching — see "Set your API key" above. Below that, check the file format(s) to process (pdf, docx, epub, html, tex, txt, md) — only **pdf** is checked by default — with **Check All** / **Check None** to quickly adjust.
3. The toolbar has three small buttons: green **▶** to start (or press **F5** — disabled in Any mode, or while a run is already underway), red **■** to cancel (or **Esc** — greyed out until a run is actually underway), and blue **T** to re-case files already in the app's naming shape without spending any API calls (or **F6**) — useful after changing your naming preference, or to normalize files someone renamed by hand. Files already in the target shape are left alone either way. Content type is locked while a run is in progress.
   - Starting a real (non-preview) run shows a confirmation dialog with the file count, selected content type, and (AI search on) a rough estimated API cost, or (AI search off) a note that it's free. Click **Yes** to proceed.
   - A progress bar and "X / Y files" counter track overall progress across every checked format, and the log pane below shows what's happening to each file live.
   - Cancelling: files already being identified (up to 5 concurrently by default) finish their lookup, but no further renaming happens after that — cancellation typically takes effect within a second or two, not instantly.
4. Made a mistake, or don't like the result? **File > Undo Last Run** (or **Ctrl+Z**) renames everything from the most recent real Start or Format run back to its original name — see "Undo" below.

Hover over any control for a couple of seconds to see a tooltip explaining what it does.

Your folder, content type, checked formats, and toggle choices (Include subfolders / Preview only / AI search) are remembered automatically between launches — no need to reconfigure every time.

### Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| Ctrl+O | File > Open Folder... |
| Ctrl+, | File > Preferences... |
| Ctrl+Z | File > Undo Last Run |
| Ctrl+L | View > Log File |
| F1 | Help > Getting Started... |
| F5 | Start (▶) |
| Esc | Cancel (■) |
| F6 | Format (T) |

### Naming preferences

**File > Preferences...** controls how Books mode (and Any mode's Format button) names files: the case style (lower case, Proper Case, ALL CAPS, snake_case, camelCase) and word separator (space, underscore, hyphen), with a live example. Click **Save** to make your choice the default; **Cancel** discards it. This doesn't apply to Journals mode, which always uses the fixed `lastname-year-keyword` shape described above.

### Undo

**File > Undo Last Run** (or **Ctrl+Z**) reverses the renames from the most recent real Start or Format run in the currently selected folder, putting every file back under its original name. A couple of things worth knowing:

- It's **one level deep, not a history** — running Start or Format again (or undoing) replaces what "last run" refers to. There's no way to undo an undo, or reach back further than the one most recent operation.
- Preview-only runs have nothing to undo (nothing was actually renamed), and don't affect what a previous real run's undo would do.
- If a file has since been moved, deleted, or renamed again by something else, or if its original name is now taken by a different file, that one file is left alone and logged as a failure — everything else still gets undone.
- The undo itself is logged to `rename_log.md` too, as a `## Undo` section, so there's always a record of what happened.

## What happens to your files

- Files are renamed **in place** — including in subfolders, if "Include subfolders" was checked. Nothing is moved to a different folder.
- If a file with the target name already exists, the app appends `_2`, `_3`, etc. rather than overwriting anything.
- If the app has already renamed a file in a previous run (its filename already looks like `title-author.ext`), it's automatically skipped on subsequent runs — no wasted API calls.
- If the title/author can't be determined (e.g. a scanned image cover with no extractable text), the file is left untouched and logged as a failure.

## The log file

Each run appends a section to `rename_log.md`, created inside the folder you scanned. It records, per run:

- **Renamed** — original filename → new filename
- **Not renamed** — filename and the reason (couldn't determine title/author, extraction error, rename error, etc.)
- **Skipped** — files that already looked renamed

Open it in any markdown viewer (or a plain text editor) to review what happened. The log accumulates across runs — it's never overwritten or cleared automatically.

Filenames in the log are clickable links to the documents themselves, so you can open a book straight from the log to check the app got it right. The link always points at whichever name is on disk: the **new** name after a real run, the **original** name for a preview run, and the original for anything skipped or not renamed. Targets are relative to the log file, so they keep working if you move or copy the whole folder — but you do need a markdown *viewer* for them to be clickable (a plain text editor will just show the raw link).

Click **View > Log File** to open `rename_log.md` for the currently selected folder in its default associated app (whatever's set up to open `.md` files on your system). If nothing's happened in that folder yet, you'll get a message instead of an error.

## Performance

Files are identified concurrently — up to 5 at once by default — since each identification is mostly waiting on a network round trip to the API, not CPU work. This speeds up large batches significantly. If you want to tune this (e.g. lower it to stay under a strict API rate limit, or raise it on a fast connection), set an environment variable before launching:

```powershell
$env:PDF_BOOK_NAMES_MAX_WORKERS = "10"
```

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `ANTHROPIC_API_KEY environment variable is not set.` | Set the key as described above, in the **same terminal window** you're running the app from. |
| `Your credit balance is too low to access the Anthropic API.` | Add credit to your Anthropic account under Plans & Billing at [console.anthropic.com](https://console.anthropic.com). |
| Many files show "could not determine title/author" | If **AI search** is off, this is expected far more often — local pattern matching only catches explicit metadata, a "by NAME" line, or similar; turn it back on for real identification. With AI search on, the file's extractable text likely doesn't contain a clear title/author on its first few pages (e.g. a scanned/image cover for PDFs, or a document that isn't front-matter-first). Try "Preview only" mode to check the reason logged for a specific file, or inspect the file manually. |
| Scanned PDFs always fail, even though the file clearly has a title page | Install OCR support (see "Optional: OCR for scanned PDFs" above) — without it, a PDF with no text layer at all can't be identified, since there's nothing for the app to read. |
| A `.tex` or `.html` file gets a strange title | Extraction pulls from raw markup/source text, so the accuracy depends on how the title/author is presented in the file. |

## Standalone .exe

If you'd rather not run the app through Python each time, you can build a standalone Windows executable that runs on its own (no Python install required to *use* it — you still need Python to build it):

```powershell
.venv\Scripts\python -m pip install -r requirements-build.txt
.venv\Scripts\python -m PyInstaller --onefile --windowed --name "Document Renamer" main.py
```

The finished executable is `dist\Document Renamer.exe`. Copy it wherever you like — it's fully self-contained. You still need to set `ANTHROPIC_API_KEY` as a **permanent** environment variable (the second `SetEnvironmentVariable` command above) since a double-clicked `.exe` doesn't inherit a terminal session's temporary variables.

If you want the bundled `.exe` to have OCR support (see above), `pip install -r requirements-ocr.txt` in the same virtual environment *before* running PyInstaller, so it gets bundled in — and the Tesseract engine still needs to be installed separately on any machine that runs the `.exe`, same as running from source.

## Linux packages (.deb / Arch / Fedora)

See [`packaging/linux/README.md`](packaging/linux/README.md) for build scripts producing a `.deb` (Debian/Ubuntu/Linux Mint), an Arch Linux package, and a Fedora/RHEL `.rpm` — each a self-contained PyInstaller build, same approach as the Windows `.exe` above.

## Running the test suite (for development)

```powershell
.venv\Scripts\python -m pip install -r requirements-dev.txt
.venv\Scripts\python -m pytest
```
