#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -f apps/api/src/QuitLoop.Api/Program.cs ]]; then
  echo "Run this from the QuitLoop repo root so apps/api/src exists." >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  echo "Missing .env in the repo root. Copy .env.example and set POSTGRES_PASSWORD." >&2
  exit 1
fi

docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
curl -fsS http://127.0.0.1:8080/health
echo
