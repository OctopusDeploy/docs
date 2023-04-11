---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Deploy existing release with prompted variables
description: An example script to deploy an existing release with prompted variables.
---

This script demonstrates how to programmatically deploy an existing release with prompted variables.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Space Name
- Project Name
- Environment Name
- Release Version
- Prompted Variables (the format is variable name::variable value, can be multi-line)

## Script

!include <deploy-release-with-prompted-variables-scripts>