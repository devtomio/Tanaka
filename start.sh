#!/bin/bash

# Start Bot and Build the Files
dotenv -- pm2 start src/index.js --name tanaka --watch
