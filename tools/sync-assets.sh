#!/bin/bash
# Sync content assets (SVGs) to the web app's public directory
# and generate a manifest of available chapter IDs.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"

mkdir -p "$ROOT/apps/web/public/content"

# Copy all SVGs from content chapters to public
find "$ROOT/content/chapters" -name '*.svg' -exec cp {} "$ROOT/apps/web/public/content/" \;

# Generate manifest of available chapter IDs (for locked/unlocked state)
MANIFEST="$ROOT/content/available.json"
IDS=$(find "$ROOT/content/chapters" -name '*.json' ! -name '*.quiz.json' -exec basename {} .json \; | sort -n | awk '{printf "\"%s\"", $0; if (NR > 1) printf ""; }' | sed 's/""$//' | sed 's/""/", "/g')
echo "[$IDS]" > "$MANIFEST"

echo "✓ Synced SVGs to apps/web/public/content/"
echo "✓ Generated content/available.json"
