#!/bin/bash

set -e

modulePath="react-router-native"
srcPath="./node_modules/$modulePath"
destPath="./dist/node_modules/$modulePath"

mkdir -p "$destPath"
npx babel "$srcPath" --out-dir "$destPath"
