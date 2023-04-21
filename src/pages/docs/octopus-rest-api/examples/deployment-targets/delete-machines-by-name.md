---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
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

:::div{.warning}
**This script will delete deployment targets which match the specified name. This operation is destructive and cannot be undone.**
:::

## Script

!include <delete-targets-by-name-scripts>
