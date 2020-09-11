---
title: Delete targets by name
description: An example script to delete targets by matching a specified name.
---

This script demonstrates how to programmatically delete deployment targets which match a specified name.

## Usage

Provide values for the following:

- Octopus URL
- Octopus API Key
- Name of the space you want to use
- Name of the machine name to use

:::warning
**This script will delete deployment targets which match the specified name. This operation is destructive and cannot be undone.**
:::

## Scripts

!include <delete-targets-by-name-scripts>
