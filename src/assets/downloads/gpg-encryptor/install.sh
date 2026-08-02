#!/usr/bin/env bash
set -Eeuo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

app_id="gpg-encryptor"
desktop_dir="$HOME/.local/share/applications"
icon_dir="$HOME/.local/share/icons/hicolor/scalable/apps"

echo "Checking prerequisites..."

if ! python3 -c "import tkinter" >/dev/null 2>&1; then
    echo "Error: python3-tk (Tkinter) is not installed." >&2
    echo "Install it first with: sudo apt install python3-tk" >&2
    exit 1
fi

if ! command -v pipx >/dev/null 2>&1; then
    echo "Error: pipx is not installed." >&2
    echo "Install it first with: sudo apt install pipx && pipx ensurepath" >&2
    exit 1
fi

if ! command -v gpg >/dev/null 2>&1; then
    echo "Warning: gpg was not found in PATH. Install it with: sudo apt install gnupg" >&2
fi

echo "Installing $app_id with pipx..."
pipx install --force "$script_dir"

echo "Installing desktop launcher and icon..."
mkdir -p "$desktop_dir" "$icon_dir"
install -m 644 "$script_dir/packaging/${app_id}.desktop" "$desktop_dir/${app_id}.desktop"
install -m 644 "$script_dir/packaging/${app_id}.svg" "$icon_dir/${app_id}.svg"

if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database "$desktop_dir" >/dev/null 2>&1 || true
fi
if command -v gtk-update-icon-cache >/dev/null 2>&1; then
    gtk-update-icon-cache "$HOME/.local/share/icons/hicolor" >/dev/null 2>&1 || true
fi

echo
echo "Done. 'GPG Encryptor' should now appear in your applications menu."
echo "You can also launch it from a terminal with: gpg-encryptor"
