#!/bin/bash
set -eux

export BRANCH_NAME=docbot/auto-update-credits
export COMMIT_MESSAGE="Automatically update credits file with latest licence information"

/scripts/push-automated-changes.sh

# export GIT_AUTHOR_NAME="Octobob"
# export GIT_AUTHOR_EMAIL="bob@octopus.com"
# export GIT_COMMITTER_NAME="Octobob"
# export GIT_COMMITTER_EMAIL="bob@octopus.com"

# git checkout -b docbot/auto-update-credits
# git add docs/credits.md
# git commit -m "Automatically update credits file with latest licence information"
# git push --force --set-upstream origin docbot/auto-update-credits
