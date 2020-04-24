#!/bin/bash

set -e

modulePath="react-router-native"
srcPath="./node_modules/$modulePath"
destPath="./dist/bundle/$modulePath"

mkdir -p "$destPath"
npx babel "$srcPath" --out-dir "$destPath"
mv "$destPath/main.js" "$destPath/index.js"
