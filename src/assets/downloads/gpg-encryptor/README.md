# GPG Encryptor Desktop App

*A point-and-click Tkinter GUI for encrypting and decrypting files and folders with GPG.*

This project is a Python desktop app, packaged for installation, built with Tkinter + ttk. It uses a Windows-style theme when available (`vista` / `winnative`) and provides a graphical alternative to the Bash script version.

Looking for the command-line script instead? See the sibling `script_project/` project (`../script_project/README.md`).

---

## Table of Contents

1. [What This App Does](#what-this-app-does)
2. [Prerequisites](#prerequisites)
3. [Installing on Linux Mint / Ubuntu / Debian](#installing-on-linux-mint--ubuntu--debian)
4. [Uninstalling](#uninstalling)
5. [Running Without Installing](#running-without-installing)
6. [Workflow Tabs](#workflow-tabs)
7. [What You Can Select](#what-you-can-select)
8. [GUI Features](#gui-features)
9. [Notes on Mode Behavior](#notes-on-mode-behavior)
10. [Decrypt Tab Workflows](#decrypt-tab-workflows)

---

## What This App Does

The app has two workflow tabs:

* **Encrypt**
* **Decrypt**

It offers the same core encryption modes as the shell script, plus decrypt and tar-restore workflows, dry run previews, progress tracking, and logging — all through a GUI.

---

## Prerequisites

* Python 3 with Tkinter — on Debian/Ubuntu/Mint: `sudo apt install python3-tk`
* [`pipx`](https://pipx.pypa.io/) — on Debian/Ubuntu/Mint: `sudo apt install pipx && pipx ensurepath`
* `gpg` installed and in `PATH` — `sudo apt install gnupg`
* `tar` installed and in `PATH` (for `tar-password` and tar-restore modes)
* for `recipient` mode: recipient public key available in local keyring

---

## Installing on Linux Mint / Ubuntu / Debian

This installs the app as a `gpg-encryptor` command (via `pipx`, in an isolated environment — no system Python packages are touched) and adds a **GPG Encryptor** entry to your applications menu with an icon, so it can be launched like any other desktop app.

From this project directory:

```bash
./install.sh
```

The script will:

1. Check that Tkinter, `pipx`, and `gpg` are available (and tell you the `apt install` command if not).
2. Install the app with `pipx install --force .`.
3. Copy the `.desktop` launcher and icon into `~/.local/share/applications` and `~/.local/share/icons`.

Afterwards, search for **GPG Encryptor** in your Mint menu, or run `gpg-encryptor` from any terminal.

---

## Uninstalling

From this project directory:

```bash
./uninstall.sh
```

This removes the `pipx`-installed package, the desktop launcher, and the icon.

---

## Running Without Installing

You can also run the app directly from source without installing it, e.g. while developing:

```bash
cd /home/ed/MEGA/GPG/app
PYTHONPATH=src python3 -m gpg_encryptor
```

---

## Workflow Tabs

* **Encrypt** — same three modes as the shell script:
  * `recipient` (public key)
  * `password` (symmetric)
  * `tar-password` (archive then encrypt)
* **Decrypt** — two modes:
  * file/folder decrypt (`.gpg` -> plaintext)
  * tar archive restore (`.tar.gpg` -> extracted files)

---

## What You Can Select

* single file
* multiple files
* single folder
* multiple folders (add folders one by one)

---

## GUI Features

* dry run preview (`-n` equivalent)
* optional deletion of originals after successful encryption
* optional overwrite of existing `.gpg` outputs
* optional skip of `.gpg` files and `.git` folders
* dedicated progress bar (lime green fill) with per-file progress and live ETA
* tiny **Show advanced progress details** toggle to reveal filename-level progress only when needed
* live activity log panel
* optional `.log` file output to a chosen directory

---

## Notes on Mode Behavior

* `recipient` and `password` modes:
  * files are encrypted as `filename.ext.gpg`
  * folders are processed recursively
* `tar-password` mode:
  * each selected item (file or folder) becomes `name.tar.gpg`
  * temporary plaintext `.tar` is deleted after encryption

---

## Decrypt Tab Workflows

* **File / Folder Decrypt mode**
  * decrypts `.gpg` files back to plaintext (same location by default)
  * optional **Decrypt to separate output folder** toggle for writing outputs to another directory
  * when decrypting folders with separate output enabled, the folder structure is preserved under the selected output directory
  * supports single file, multiple files, single folder, or multiple folders
  * supports dry run, overwrite control, and optional delete of encrypted source
* **Tar Archive Restore mode**
  * restores `.tar.gpg` archives by decrypting and extracting to a chosen restore directory
  * works for selected files directly, or recursively when folders are selected
  * supports dry run and optional delete of encrypted archive after successful restore
</content>
