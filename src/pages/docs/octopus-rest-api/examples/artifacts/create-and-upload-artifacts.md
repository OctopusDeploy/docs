---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Upload Artifact to Existing Deployment 
description: An example script to upload an existing local file as an artifact to an existing deployment.
---

This script provides an example of how to programmatically upload an [artifact](/docs/projects/deployment-process/artifacts.md) to an existing deployment.

## Usage

Provide values for the following:

- Octopus URL
- Space Name
- API Key
- Project Name 
- Release Version
- Environment Name
- File Path to Upload
- File Name for Octopus

## Script

!include <upload-artifact-to-deployment-scripts>
