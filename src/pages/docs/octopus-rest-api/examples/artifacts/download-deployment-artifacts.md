---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Download Deployment Artifact 
description: An example script to download a deployment artifact to a specified location.
---

This script provides an example of how to programmatically download an existing [artifact](/docs/projects/deployment-process/artifacts.md) created as part of a deployment to a specified location.

## Usage

Provide values for the following:

- Octopus URL
- Space Name
- API Key
- Project Name
- Release Version
- Environment Name
- File Download Path
- File Name for Octopus

## Script

!include <download-artifact-from-deployment-scripts>
