#!/bin/bash
set -eux

# Add GitHub's host key to our known hosts.
mkdir -p ~/.ssh
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

mkdir -p tmp
pushd tmp
git clone --depth 1 git@github.com:OctopusDeploy/OctopusDeploy.git
popd
