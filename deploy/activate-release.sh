#!/usr/bin/env bash
# Runs on the server after CI uploads a release to ~/apps/sanchblackcar/releases/<sha>.
# Usage: activate-release.sh <sha>
set -euo pipefail

APP_DIR="$HOME/apps/sanchblackcar"
RELEASE="$APP_DIR/releases/$1"
KEEP=5
PORT=3030

[ -f "$RELEASE/server.js" ] || { echo "release $RELEASE missing server.js" >&2; exit 1; }

mkdir -p "$APP_DIR/shared"
touch "$APP_DIR/shared/.env"
chmod 600 "$APP_DIR/shared/.env"

previous="$(readlink -f "$APP_DIR/current" 2>/dev/null || true)"

ln -sfn "$RELEASE" "$APP_DIR/current.tmp"
mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"

cd "$APP_DIR"
pm2 startOrRestart ecosystem.config.cjs --update-env
pm2 save >/dev/null

healthy=""
for _ in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:$PORT/"; then healthy=1; break; fi
  sleep 1
done

if [ -z "$healthy" ]; then
  echo "health check failed for $1" >&2
  if [ -n "$previous" ] && [ -d "$previous" ]; then
    echo "rolling back to $previous" >&2
    ln -sfn "$previous" "$APP_DIR/current.tmp"
    mv -Tf "$APP_DIR/current.tmp" "$APP_DIR/current"
    pm2 startOrRestart ecosystem.config.cjs --update-env
  fi
  exit 1
fi

# Prune old releases, never the active one.
active="$(readlink -f "$APP_DIR/current")"
ls -1dt "$APP_DIR"/releases/*/ | sed 's:/$::' | tail -n +$((KEEP + 1)) | while read -r dir; do
  [ "$dir" = "$active" ] || rm -rf "$dir"
done

echo "deployed $1"
