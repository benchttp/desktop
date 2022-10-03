#!/bin/bash
set -e
source scripts/load-variables.sh

echo "rm -f ${sidecar_path:?}""${sidecar:?}"
rm -f "${sidecar_path:?}""${sidecar:?}"
