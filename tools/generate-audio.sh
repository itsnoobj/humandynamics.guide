#!/bin/bash
# Generate podcast MP3s for all chapters that don't have audio yet.
# Uses a Python 3.12 venv with Kokoro TTS. Safe to re-run (skips existing MP3s).
#
# Usage:
#   ./tools/generate-audio.sh          # Generate all missing MP3s
#   ./tools/generate-audio.sh 1 2 3    # Generate specific chapters only

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
VENV="$ROOT/.venv-audio"
PYTHON="/opt/homebrew/bin/python3.12"
PUBLIC="$ROOT/apps/web/public/content"

# --- Setup venv (once) ---
if [ ! -d "$VENV" ]; then
  echo "Creating venv at $VENV..."
  "$PYTHON" -m venv "$VENV"
  source "$VENV/bin/activate"
  pip install --quiet kokoro soundfile pydub
  echo "✓ Venv ready"
else
  source "$VENV/bin/activate"
fi

mkdir -p "$PUBLIC"

# --- Determine which chapters to generate ---
if [ $# -gt 0 ]; then
  CHAPTERS="$@"
else
  # Find all chapter JSONs, extract IDs, skip those that already have MP3s
  CHAPTERS=""
  for json in "$ROOT"/content/chapters/part-*/*.json; do
    [ -f "$json" ] || continue
    # Skip quiz files
    [[ "$json" == *.quiz.json ]] && continue
    id=$(basename "$json" .json)
    if [ ! -f "$PUBLIC/$id.mp3" ]; then
      CHAPTERS="$CHAPTERS $id"
    fi
  done
fi

if [ -z "$CHAPTERS" ]; then
  echo "✓ All chapters already have audio. Nothing to do."
  exit 0
fi

echo "Generating audio for chapters:$CHAPTERS"
echo "This takes ~5-10 min per chapter (CPU TTS)."
echo ""

# --- Generate ---
for id in $CHAPTERS; do
  # Find the chapter JSON
  json=$(find "$ROOT/content/chapters" -name "$id.json" -not -name "*.quiz.json" | head -1)
  if [ -z "$json" ]; then
    echo "✗ No JSON found for chapter $id, skipping"
    continue
  fi

  md="${json%.json}.md"

  echo "[$id] Converting JSON → MD..."
  python "$SCRIPT_DIR/json_to_md.py" "$json" "$md"

  echo "[$id] Generating MP3 (this takes a few minutes)..."
  python "$SCRIPT_DIR/chapter_to_podcast.py" "$md" -o "$PUBLIC/$id.mp3"

  echo "✓ [$id] Done → $PUBLIC/$id.mp3"
  echo ""
done

echo "✓ Audio generation complete!"
