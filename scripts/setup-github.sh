#!/usr/bin/env bash
set -euo pipefail

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null)
if [ -z "$REPO" ]; then
  echo "Error: Not in a GitHub repository. Push to GitHub first."
  exit 1
fi

echo "Configuring $REPO..."
echo ""

echo "1/2  Enabling auto-merge..."
gh api -X PATCH "repos/$REPO" \
  -f allow_auto_merge=true \
  -f delete_branch_on_merge=true \
  --silent
echo "     Done."

echo "2/2  Enabling Dependabot alerts..."
gh api -X PUT "repos/$REPO/vulnerability-alerts" --silent 2>/dev/null || true
gh api -X PUT "repos/$REPO/automated-security-fixes" --silent 2>/dev/null || true
echo "     Done."

echo ""
echo "================================================"
echo "  Setup complete for $REPO"
echo ""
echo "  Auto-merge: enabled (Dependabot minor/patch)"
echo "  Dependabot: alerts + security fixes enabled"
echo "  Stale branches: auto-deleted after merge"
echo "================================================"
