#!/bin/bash
set -eux

# Run the licence-generation tooling
dotnet tool restore
dotnet tool run octopus-creditsfilegenerator --repositoryPath=tmp/OctopusDeploy --templatePath=docs/credits.template.md --outputPath=docs/credits.md
