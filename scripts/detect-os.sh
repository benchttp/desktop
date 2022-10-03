#!/bin/bash

os=false

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
*)
    os="notset"
    ;;
esac
