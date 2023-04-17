---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Delete a feed
description: An example script that deletes an existing feed in Octopus using the REST API and Octopus.Client.
---

This script demonstrates how to programmatically delete an existing feed in Octopus.

## Usage

Provide values for:

- Octopus URL
- Octopus API Key
- Name of the space to use
- Name of the feed to delete

:::warning
**This script will delete the feed with the specified name. This operation is destructive and cannot be undone.**
:::

## Script

!include <delete-feed-scripts>
