#!/bin/bash
set -e

# Identify the platform.
target_triple=$(rustc -Vv | grep host | cut -f2 -d' ')

binary_name="benchttp-server"

# The binary is suffixed with the triple target as required by tauri sidecar api.
sidecar="$binary_name-$target_triple"

sidecar_path="src-tauri/bin/"
