#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"
STRUCTURE_DIR="$SCRIPT_DIR/structure"
DB_PATH="${DB_PATH:-${TMPDIR:-/tmp}/obsigen-Biblia.db}"

if [[ -z "$DB_PATH" || "$DB_PATH" == "/" || "$DB_PATH" == "$REPO_ROOT" ]]; then
  echo "Refusing unsafe database path: ${DB_PATH:-<empty>}" >&2
  exit 1
fi

if [[ -d "$DB_PATH" ]]; then
  echo "Database path must not be a directory: $DB_PATH" >&2
  exit 1
fi

DB_PARENT="$(cd -- "$(dirname -- "$DB_PATH")" && pwd)"
DB_PATH="$DB_PARENT/$(basename -- "$DB_PATH")"

if [[ "$DB_PATH" == "/" || "$DB_PATH" == "$REPO_ROOT" ]]; then
  echo "Refusing unsafe database path: $DB_PATH" >&2
  exit 1
fi

if ! command -v sqlite3 >/dev/null 2>&1; then
  echo "sqlite3 is required to reset the Bible database." >&2
  exit 1
fi

SQL_FILES=(
  "$STRUCTURE_DIR/schema.sql"
  "$STRUCTURE_DIR/collections.sql"
  "$STRUCTURE_DIR/books.sql"
  "$STRUCTURE_DIR/50_San_Juan/parts.sql"
  "$STRUCTURE_DIR/50_San_Juan/sections.sql"
  "$STRUCTURE_DIR/50_San_Juan/chapters.sql"
  "$STRUCTURE_DIR/50_San_Juan/pericopes.sql"
  "$STRUCTURE_DIR/50_San_Juan/images.sql"
)

echo "Recreating disposable Bible database: $DB_PATH"
rm -f -- "$DB_PATH"

for sql_file in "${SQL_FILES[@]}"; do
  sqlite3 "$DB_PATH" < "$sql_file"
done

echo "Bible database recreated successfully."
