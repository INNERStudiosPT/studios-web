#!/bin/bash

# Auto-deploy script for studios-web (innerstudios-web)
# Runs inside the Linux VPS to update and recycle the Next.js app

# Exit on error
set -e

# Force PM2 to use the shared login environment
export PM2_HOME=/home/fivem/.pm2

echo "=================================================="
echo "⏳ [$(date)] Starting auto-deploy for studios-web"
echo "=================================================="

# Move to repo directory
cd /home/fivem/apps/studios-web

# Configure local git
git config core.autocrlf false

# Discard tracked changes and pull latest code
git fetch origin main
git reset --hard origin/main
git clean -fd --exclude=.env

echo "📦 Installing packages..."
npm install

echo "🏗️ Building Next.js app..."
npm run build

echo "🚀 Recycling PM2 process..."

if pm2 show studios-web > /dev/null 2>&1; then
    echo "Restarting studios-web..."
    pm2 restart studios-web
else
    echo "studios-web not found. Starting..."
    cd /home/fivem/apps/studios-web
    PORT=3102 pm2 start npm --name "studios-web" -- start
fi

pm2 save

echo "=================================================="
echo "✅ [$(date)] studios-web deployment finished!"
echo "=================================================="
