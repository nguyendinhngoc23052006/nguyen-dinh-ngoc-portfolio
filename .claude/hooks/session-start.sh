#!/bin/bash
# Runs at session start: install deps if needed, then load memory + branch into context.
set -euo pipefail

if [ ! -d node_modules ]; then
  npm install
fi

echo "=== MEMORY.md ==="
cat MEMORY.md 2>/dev/null || echo "(empty)"
echo ""
echo "=== Current branch ==="
git branch --show-current 2>/dev/null || echo "unknown"
