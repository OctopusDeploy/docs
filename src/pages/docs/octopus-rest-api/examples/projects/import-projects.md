---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Import projects
description: An example script that will import projects from a previously executed export task from another space on an Octopus instance.
---

This script demonstrates how you can import projects into an Octopus space. It uses a previously executed export task from another space as the source for the import.

:::hint
**Note:**
Please note there are some items to consider before using this script:

- This script uses an API endpoint introduced in **Octopus 2021.1** for the [Export/Import Projects feature](/docs/projects/export-import/index.md). Using this script in earlier versions of Octopus will not work.
- Automating the import of projects as part of a backup/restore process is **not recommended**. See our [supported scenarios](/docs/projects/export-import/index.md#scenarios) when using the API from this feature.
:::

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space where the projects were exported from
- Name of the space where the projects are to be exported into
- The export Server Task Id to use as the source for import e.g. `ServerTasks-12345`
- The password used to protect sensitive values in the exported data
- Boolean whether or not to wait for the import task to finish
    - Timeout in seconds to wait before attempting to cancel the task.

## Script

!include <import-projects-scripts>