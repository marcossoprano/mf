#!/bin/bash
set -e

echo "=== Render Build Script Started ==="

# Print environment info
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"

# List package.json to verify it exists
echo "=== Checking package.json ==="
if [ -f "package.json" ]; then
    echo "package.json found"
    cat package.json | grep -A 10 "scripts"
else
    echo "ERROR: package.json not found"
    exit 1
fi

# Clean install with verbose logging
echo "=== Installing dependencies ==="
npm install --verbose --legacy-peer-deps

# Verify react-scripts installation
echo "=== Verifying react-scripts ==="
npm list react-scripts
ls -la node_modules/.bin/react-scripts || echo "react-scripts binary not found"

# Check if react-scripts can be executed
echo "=== Testing react-scripts ==="
npx react-scripts --version

# Build the application
echo "=== Building application ==="
export CI=false
export GENERATE_SOURCEMAP=false
npm run build:simple

echo "=== Build completed successfully ==="