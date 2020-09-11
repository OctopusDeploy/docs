---
title: Delete targets by role
description: An example script to delete targets by role.
---

This script demonstrates how to programmatically delete deployment targets with the specified role from the Octopus Server.

## Usage
Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space you want to use
- Name of the role to use

:::warning
**This script will delete deployment targets matching the specified role. This operation is destructive and cannot be undone.**
:::

## Scripts

!include <delete-targets-by-role-scripts>
