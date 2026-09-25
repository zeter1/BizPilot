#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8000}"
ROOT_URL="http://127.0.0.1:${PORT}/"
HTTP_LOG="/tmp/bizpilot-http.log"
DOM_DUMP="/tmp/bizpilot-dom.html"
CHROME_LOG="/tmp/bizpilot-chrome.log"

python3 -m http.server "$PORT" > "$HTTP_LOG" 2>&1 &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null || true' EXIT

for attempt in {1..20}; do
  if curl -fsS "$ROOT_URL" >/dev/null; then
    break
  fi
  sleep 0.25
done

curl -fsS "$ROOT_URL" >/dev/null
curl -fsS "${ROOT_URL}css/styles.css" >/dev/null
curl -fsS "${ROOT_URL}js/app.js" >/dev/null

chrome="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$chrome" ]]; then
  echo "Chrome/Chromium is not installed."
  exit 1
fi

timeout 35s "$chrome"   --headless=new   --no-sandbox   --disable-dev-shm-usage   --virtual-time-budget=9000   --dump-dom "$ROOT_URL"   > "$DOM_DUMP" 2> "$CHROME_LOG"

if ! grep -q 'data-bizpilot-boot="ready"' "$DOM_DUMP"; then
  echo "BizPilot did not reach the boot-ready marker."
  echo "--- HTTP log ---"
  cat "$HTTP_LOG"
  echo "--- Chrome log ---"
  cat "$CHROME_LOG"
  echo "--- DOM tail ---"
  tail -n 100 "$DOM_DUMP"
  exit 1
fi

if ! grep -q 'id="dashboard"' "$DOM_DUMP" && ! grep -q 'data-view="dashboard"' "$DOM_DUMP"; then
  echo "Boot marker is present, but the dashboard root was not found."
  tail -n 100 "$DOM_DUMP"
  exit 1
fi

echo "BizPilot browser boot smoke passed."
