---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Find variable value usage
description: An example script that finds all variables with a specific value in project variables and library variable sets.
---

This script demonstrates how to programmatically find usages of a variable value in all projects and library variable sets. You could use this to help replace values in a connection string if a server name or IP has changed.

:::hint
**Limitations:** 
Please note the limitations with this example:
- It's not possible to use the REST API to search through sensitive variable values.
:::

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to search
- Name of the variable value to search for
- Optional path to export the results to a csv file

## Script

!include <find-variable-value-usage-scripts>
