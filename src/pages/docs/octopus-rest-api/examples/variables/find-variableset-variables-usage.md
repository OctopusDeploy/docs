---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Find library variable set variables usage
description: An example script that loads variables from a library variable set and finds usages in project variables, and optionally deployment processes and runbooks.
---

This script demonstrates how to programmatically find usages of variables from a library variable set. It searches in all projects for a reference to each variable, and optionally deployment processes and runbook processes.

:::hint
**Limitations:** 
Please note the limitations with this example:
- It's not possible to use the REST API to search through sensitive variable values, as these values will be returned as `null`.
- Variables that are referenced inside of any packages included as part of a deployment or runbook are not searched.
:::

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space to search
- Name of the library variable set to use
- Boolean value to toggle searching in a project's deployment process
- Boolean value to toggle searching in a project's runbook processes
- Optional path to export the results to a csv file

## Script

!include <find-variableset-variables-usage-scripts>
