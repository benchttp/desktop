#!/bin/bash
set -e
source scripts/load-variables.sh

rm -f "${sidecar_path:?}""${sidecar:?}"
