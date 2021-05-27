#!/bin/bash

# Start Bot and Build the Files
dotenv -- pm2-runtime start src/index.js --name tanaka
