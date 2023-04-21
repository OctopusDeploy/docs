---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Delete projects with no process 
description: An example script that deletes projects that have no deployment process in Octopus using the REST API and Octopus.Client.
---

This script demonstrates how to programmatically delete projects with no deployment process in Octopus Deploy.

## Usage

- Octopus URL
- Octopus API Key
- Name of the space to use

:::div{.warning}
**This script will delete projects with no deployment process. This operation is destructive and cannot be undone. Ensure you have a database backup and take care when running this script or one based on it**
:::

## Script

!include <delete-projects-without-processes-scripts>
