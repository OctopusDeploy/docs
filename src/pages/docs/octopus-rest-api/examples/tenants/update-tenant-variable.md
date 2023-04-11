---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Update tenant variables
description: An example script that updates tenant variables for a specific project template with a single value across each connected environment in Octopus using the REST API and Octopus.Client.
---

This script demonstrates how to programmatically update tenant variables with a single value across each connected environment in Octopus.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Name of the tenant
- Name of the Project template
- The new variable value
- Choose whether the new variable value is bound to an Octopus variable value e.g. `#{MyVariable}`

## Script

!include <update-tenant-variable-scripts>
