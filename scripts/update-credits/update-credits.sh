#!/bin/bash
set -e

if [ ! -d .git ]; then
    echo "This script must be run from the root of the cloned Git repository"
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "You'll want the GITHUB_TOKEN variable set to a valid GitHub access token before this script will work :)"
    exit 1
fi

set -ux

./scripts/update-credits/01-git-clone-octopusdeploy.sh
docker run --rm -v "${PWD}:/src" docker.packages.octopushq.com/octopusdeploy/tool-containers/build-base-dotnet /src/scripts/update-credits/02-make-code-change.sh
docker run --rm -v "${PWD}:/src" docker.packages.octopushq.com/octopusdeploy/tool-containers/tool-github-cli /src/scripts/update-credits/03-create-and-push-branch.sh
docker run --rm -e GITHUB_TOKEN -v "${PWD}:/src" docker.packages.octopushq.com/octopusdeploy/tool-containers/tool-github-cli /src/scripts/update-credits/04-create-pull-request.sh
./scripts/update-credits/05-clean-up.sh
