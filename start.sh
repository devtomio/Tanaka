#!/bin/bash

# Start Lavalink
pm2 start Lavalink.jar --name lavalink

# Start Bot
yarn build
dotenv -- pm2-runtime start dist/index.js --name tanaka
