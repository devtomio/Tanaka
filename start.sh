#!/bin/bash

# Install Deps
yarn install --force

# See if a process is already there
pm2 delete tanaka || :

# Start Bot and Build the Files
dotenv -- pm2 start src/index.js --name tanaka --watch
