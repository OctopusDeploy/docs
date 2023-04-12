---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Download Runbook Artifact 
description: An example script to download a runbook artifact to a specified location.
---

This script provides an example of how to programmatically download an existing [artifact](/docs/projects/deployment-process/artifacts/) created as part of a runbook to a specified location. The latest runbook run will be chosen as the task to retrieve the artifact from.

## Usage

Provide values for the following:

- Octopus URL
- API Key
- Space Name
- Project Name
- Runbook Name
- Environment Name
- File Download Path
- File Name for Octopus

## Script

!include <download-artifact-from-runbook-scripts>
