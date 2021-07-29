---
title: Add a script step to runbook
description: An example script that adds a simple PowerShell script to a runbook.
---

This script demonstrates how to programmatically add a simple PowerShell script to a runbook.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Name of the runbook
- Source PowerShell script 
- *Optional* Target role to run the script against.

:::hint
**Note:** The source script provided to Octopus must be properly escaped.
:::

## Script

!include <add-script-step-to-runbook-scripts>
