---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Add a run a script step
description: An example script to add a run a script step to a project.
---

This script demonstrates how to programmatically add a [Run A Script](/docs/deployments/custom-scripts/run-a-script-step/) step to a project, which runs on a deployment target that matches a specified [target role](/docs/infrastructure/deployment-targets/index.md#target-roles).

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Project name
- Machine role

## Script

!include <create-script-step-scripts>
