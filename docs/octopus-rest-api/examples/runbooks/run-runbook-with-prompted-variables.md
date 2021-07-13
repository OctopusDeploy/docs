---
title: Run a runbook with prompted variables
description: An example script to run a runbook with prompted variables.
---

This script demonstrates how to programmatically run a runbook when the runbook has prompted variables.  It will also wait for the runbook run to complete.

## Usage

Provide values for the following:

- Runbook Base URL
- Runbook API Key
- Name of the space
- Name of the project
- Name of the runbook
- Name of the environment
- Wait for finish
- Use guided failure mode
- Use a published snapshot only
- Cancel in seconds
- Prompted variables 

### Prompted variable format

In the PowerShell script the prompted variables should be provided in the format `Name::Value` with a new line separating them:

```
PromptedVariableName::My Super Awesome Value
OtherPromptedVariable::Other Super Awesome Value
```

## Script

!include <run-a-runbook-with-prompted-variables>
