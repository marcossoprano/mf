#!/bin/bash
# Render Build Script

# Install dependencies
npm ci

# Build the project with CI disabled
CI=false npm run build:production