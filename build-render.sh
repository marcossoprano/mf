#!/bin/bash
set -e

echo "=== Render Build Script Started ==="

# Set memory optimization
export NODE_OPTIONS="--max_old_space_size=4096"
export CI=false
export GENERATE_SOURCEMAP=false
export DISABLE_ESLINT_PLUGIN=true

# Print environment info
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current directory: $(pwd)"
echo "Memory limit: $NODE_OPTIONS"

# List package.json to verify it exists
echo "=== Checking package.json ==="
if [ -f "package.json" ]; then
    echo "package.json found"
    cat package.json | grep -A 10 "scripts"
else
    echo "ERROR: package.json not found"
    exit 1
fi

# Clean npm cache to free memory
echo "=== Cleaning npm cache ==="
npm cache clean --force

# Install with minimal logging to save memory
echo "=== Installing dependencies ==="
npm install --legacy-peer-deps --silent --no-audit --no-fund

# Verify react-scripts installation
echo "=== Verifying react-scripts ==="
npm list react-scripts --depth=0

# Build the application with memory optimization
echo "=== Building application ==="
node --max_old_space_size=4096 node_modules/.bin/react-scripts build

echo "=== Build completed successfully ==="