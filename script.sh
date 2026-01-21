#!/bin/bash

# Load environment variables from .env file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SCRIPT_DIR/.env" ]; then
    export $(grep -v '^#' "$SCRIPT_DIR/.env" | xargs)
fi

# Check if PATH_TO_REPO is set
if [ -z "$PATH_TO_REPO" ]; then
    echo "Error: PATH_TO_REPO is not defined in .env file"
    exit 1
fi

echo "Script executed at: $(date)"
echo "Navigating to: $PATH_TO_REPO"

cd "$PATH_TO_REPO" || { echo "Error: Could not navigate to $PATH_TO_REPO"; exit 1; }

echo "Running git stash..."
git stash

echo "Running git pull..."
git pull

echo "Done!"
