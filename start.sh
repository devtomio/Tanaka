#!/bin/bash

# Start Lavalink
pm2 start andesite-0.20.2-all.jar --name lavalink --interpreter java --interpreter-args "-jar"

# Start Bot and Build the Files
yarn build
dotenv -- pm2-runtime start dist/index.js --name tanaka
