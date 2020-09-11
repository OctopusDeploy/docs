---
title: Delete projects with no process 
description: An example script that deletes projects that have no deployment process using the REST API and Octopus.Client in Octopus.
---

This script demonstrates how to programmatically delete projects with no deployment process in Octopus Deploy.

## Usage

- Octopus URL
- Octopus API Key
- Name of the space to use

:::warning
**This script will delete projects with no deployment process. This operation is destructive and cannot be undone. Ensure you have a database backup and take care when running this script or one based on it**
:::

## Scripts

!include <delete-projects-without-processes-scripts>
