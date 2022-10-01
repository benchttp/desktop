#!/bin/bash
set -e
source scripts/load-variables.sh

cd ./vendor/engine
go build -o ../../"${sidecar_path:?}""${binary_name:?}" ./cmd/server
