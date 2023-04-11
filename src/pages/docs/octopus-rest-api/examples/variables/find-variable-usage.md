---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Find variable usage
description: An example script that finds usages of a variable, searching in project variables, and optionally deployment processes and runbooks.
---

This script demonstrates how to programmatically find usages of a variable in all project variable sets (either a named match, or referenced in another variable), and optionally any deployment process or runbook processes.

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
- Name of the variable to search for
- Boolean value to toggle searching in a project's deployment process
- Boolean value to toggle searching in a project's runbook processes
- (Optional) Boolean value to toggle searching in library variable sets
- (Optional) path to export the results to a csv file

## Script

!include <find-variable-usage-scripts>
