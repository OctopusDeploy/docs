---
title: Find variable usage
description: An example script that finds usages of a variable, searching in project variables, and optionally deployment processes and runbooks.
---

This script demonstrates how to programmatically find usages of a variable in all project variable sets (either a named match, or referenced in another variable), and optionally any deployment process or runbook processes.

:::hint
Note: It's not possible to use the REST API to search through Sensitive variable values, as these values will be returned as `null`.
:::

## Usage

Provide values for the following::
- Octopus URL
- Octopus API Key
- Name of the space to search
- Name of the variable to search for
- Boolean value for searching in a project's deployment processes
- Boolean value for searching in a project's runbook processes
- A Path to export the results to a csv file

## Script

!include <find-variable-usage-scripts>