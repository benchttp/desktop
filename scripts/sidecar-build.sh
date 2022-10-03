#!/bin/bash
set -e
source scripts/load-variables.sh
source scripts/detect-os.sh

root="../../"
if [[ $os = "windows" ]]; then root=$(cygpath -w $root); fi

source="./cmd/server"
if [[ $os = "windows" ]]; then source=$(cygpath -w $source); fi

cd ./vendor/engine
go build -o "$root""${sidecar_path:?}""${binary_name:?}" "$source"
