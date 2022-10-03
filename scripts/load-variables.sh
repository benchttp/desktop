#!/bin/bash
set -e

source scripts/detect-os.sh
[[ $os = "windows" ]] && ext=".exe" || ext=""

# Identify the platform.
target_triple=$(rustc -Vv | grep host | cut -f2 -d' ')

binary_name="benchttp-server""$ext"

# The binary is suffixed with the triple target as required by tauri sidecar api.
sidecar="$binary_name-$target_triple""$ext"

sidecar_path="src-tauri/bin/"
