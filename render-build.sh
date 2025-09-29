#!/bin/bash
set -e

echo "Starting build process..."

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "npm could not be found"
    exit 1
fi

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "node could not be found"
    exit 1
fi

echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean install dependencies
echo "Installing dependencies..."
npm ci

# Check if react-scripts is available
echo "Checking react-scripts..."
npx react-scripts --version

# Set environment variables and build
echo "Building application..."
export CI=false
export GENERATE_SOURCEMAP=false
export NODE_ENV=production

# Run the build
npm run build

echo "Build completed successfully!"