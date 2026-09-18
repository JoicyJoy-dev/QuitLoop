#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
WEB_DIR="$ROOT/apps/web"
DEST="${WEB_ROOT:-/var/www/quitloop-web}"

cd "$WEB_DIR"

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

npm run build

if [ ! -d "$WEB_DIR/out" ]; then
  echo "Build did not produce apps/web/out" >&2
  exit 1
fi

mkdir -p "$DEST"
rsync -a --delete "$WEB_DIR/out/" "$DEST/"

echo "Deployed $WEB_DIR/out -> $DEST"