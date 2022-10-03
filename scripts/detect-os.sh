#!/bin/bash

os="notset"

case $(uname | tr '[:upper:]' '[:lower:]') in
linux*)
    os="linux"
    ;;
darwin*)
    os="macos"
    ;;
msys*)
    os="windows"
    ;;
esac
