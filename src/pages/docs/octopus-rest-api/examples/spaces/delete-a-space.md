---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Delete a Space
description: An example script to delete a space.
---

This script deletes a [Space](/docs/administration/spaces) from your Octopus instance.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Space Name to delete the space with the given name.

:::warning
**Be very careful when deleting a Space. This operation is destructive and cannot be undone.**
:::

## Script

!include <delete-a-space-scripts>
