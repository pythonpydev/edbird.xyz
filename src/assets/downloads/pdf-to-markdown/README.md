# PDF to Markdown Converter

This project provides a small Python script to convert a PDF file to a simple Markdown (`.md`) file.

Script: [pdf_to_markdown.py](pdf_to_markdown.py)

It works on both Windows and Linux.

---

## 1. Prerequisites

- Python 3.9 or newer installed
- Ability to open a terminal / command prompt

Check Python:

- Windows: `python --version` (or `py --version`)
- Linux: `python3 --version`

If you get a "command not found" error, install Python first from https://www.python.org.

---

## 2. Set up a virtual environment (recommended)

### 2.1 Windows (PowerShell or Command Prompt)

1. Change into the project folder (where `pdf_to_markdown.py` is located):

   ```bash
   cd "C:\Users\ebird\OneDrive - University College Birmingham\CEBE Team - School Research Group"
   ```

2. Create a virtual environment (folder name: `.venv`):

   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:

   - PowerShell:

     ```bash
     .venv\Scripts\Activate.ps1
     ```

   - Command Prompt (cmd.exe):

     ```bash
     .venv\Scripts\activate.bat
     ```

   After activation, your prompt should show `(.venv)` at the beginning.

### 2.2 Linux (bash, zsh, etc.)

1. Change into the project folder (adjust the path if different):

   ```bash
   cd /path/to/"CEBE Team - School Research Group"
   ```

2. Create a virtual environment:

   ```bash
   python3 -m venv .venv
   ```

3. Activate the virtual environment:

   ```bash
   source .venv/bin/activate
   ```

   Your prompt should now show `(.venv)`.

To leave the virtual environment at any time, run:

```bash
deactivate
```

---

## 3. Install dependencies

With the virtual environment **activated**, install the required library:

```bash
pip install pdfplumber
```

You can also save dependencies to a requirements file if you wish:

```bash
pip freeze > requirements.txt
```

Then you (or someone else) can later run:

```bash
pip install -r requirements.txt
```

---

## 4. Run the script

Basic usage (Windows and Linux):

```bash
python pdf_to_markdown.py INPUT_PDF [OUTPUT_MD]
```

- `INPUT_PDF`: path to the source PDF file
- `OUTPUT_MD` (optional): path to the output Markdown file
  - If omitted, the script will create a `.md` file next to the PDF with the same name.

### Examples (Windows)

From the project folder:

```bash
python pdf_to_markdown.py "C:\Users\ebird\Documents\paper.pdf"
```

Specify an output file:

```bash
python pdf_to_markdown.py "C:\Users\ebird\Documents\paper.pdf" "C:\Users\ebird\Documents\paper_converted.md"
```

### Examples (Linux)

```bash
python3 pdf_to_markdown.py "/home/user/documents/paper.pdf"
```

Specify an output file:

```bash
python3 pdf_to_markdown.py "/home/user/documents/paper.pdf" "/home/user/documents/paper_converted.md"
```

---

## 5. Creating an executable application

You can bundle the script into a standalone executable using [PyInstaller](https://pyinstaller.org/). This lets you run the tool on a machine without manually installing Python and dependencies.

> Note: Executables are **platform-specific**. You must build the Windows executable on Windows, and the Linux executable on Linux.

### 5.1 Install PyInstaller

With your virtual environment activated:

```bash
pip install pyinstaller
```

(Optional) Save the dependency:

```bash
pip freeze > requirements.txt
```

### 5.2 Build the executable (Windows)

From the project folder (with `.venv` activated):

```bash
pyinstaller --onefile pdf_to_markdown.py
```

This will create:

- `dist/pdf_to_markdown.exe` – the standalone Windows executable

You can then run:

```bash
./dist/pdf_to_markdown.exe "C:\path\to\input.pdf" "C:\path\to\output.md"
```

Or, if you are in PowerShell:

```bash
& .\dist\pdf_to_markdown.exe "C:\path\to\input.pdf"
```

### 5.3 Build the executable (Linux)

On a Linux machine (with `.venv` activated and PyInstaller installed):

```bash
pyinstaller --onefile pdf_to_markdown.py
```

This will create:

- `dist/pdf_to_markdown` – the standalone Linux binary

Run it with:

```bash
./dist/pdf_to_markdown /path/to/input.pdf /path/to/output.md
```

### 5.4 Notes about executables

- The executable is self-contained and includes Python and required libraries.
- You can copy the file in the `dist` folder to another computer with the same operating system and run it there.
- For best results, build the executable on a system similar to your target system (same OS and architecture: 64-bit vs 32-bit).

---

## 6. Updating or extending the script

If you change [pdf_to_markdown.py](pdf_to_markdown.py) (for example, to improve bullet handling, detect headings, or handle tables), you must **rebuild** the executable with PyInstaller:

```bash
pyinstaller --onefile pdf_to_markdown.py
```

If you’d like, you can describe the PDFs you work with (e.g. simple articles, multi-column layouts, lots of tables), and we can refine the script to produce better Markdown for your use case.
