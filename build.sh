#!/bin/bash

if [[ "$*" =~ "-install" ]]; then
  npm install
fi

webpack --display-minimal --config ./build/core.webpack.config.js