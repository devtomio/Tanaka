#!/bin/bash

# Start Lavalink
pm2 start Lavalink.jar --name lavalink --interpreter java --interpreter-args "-jar"

# Start Bot
yarn build
dotenv -- pm2-runtime start dist/index.js --name tanaka
