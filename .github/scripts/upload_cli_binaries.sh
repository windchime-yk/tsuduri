#!/usr/bin/env bash
# cli のシングルバイナリを全ターゲットでコンパイルし、指定された GitHub Release に添付する。
# 既存アセットがある場合は --clobber で置き換える。
set -euo pipefail

TAG=$1

TARGETS=(
  "x86_64-unknown-linux-gnu"
  "aarch64-unknown-linux-gnu"
  "x86_64-apple-darwin"
  "aarch64-apple-darwin"
  "x86_64-pc-windows-msvc"
)

mkdir -p dist
for target in "${TARGETS[@]}"; do
  ext=""
  if [ "$target" = "x86_64-pc-windows-msvc" ]; then
    ext=".exe"
  fi

  deno compile \
    --allow-read \
    --allow-write \
    --target "$target" \
    --output "dist/tsuduri-${target}${ext}" \
    cli/mod.ts

  gh release upload "$TAG" "dist/tsuduri-${target}${ext}" --clobber
done
