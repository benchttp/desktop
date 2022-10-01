#!/bin/bash
set -e
source scripts/load-variables.sh

flag="--auto-port=false"
"${sidecar_path:?}""${sidecar:?}" $flag
