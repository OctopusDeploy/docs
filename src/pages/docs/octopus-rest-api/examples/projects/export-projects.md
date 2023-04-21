---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Export projects
description: An example script that will export projects that can be imported into a different space on the same, or different Octopus instance.
---

This script will export projects from an Octopus space that can be imported into a different space on the same instance or a separate Octopus instance. 

:::div{.hint}
**Note:**
Please note there are some items to consider before using this script:

- This script uses an API endpoint introduced in **Octopus 2021.1** for the [Export/Import Projects feature](/docs/projects/export-import). Using this script in earlier versions of Octopus will not work.
- Automating the export of projects as part of a backup/restore process is **not recommended**. See our [supported scenarios](/docs/projects/export-import/#scenarios) when using the API from this feature.
:::

## Usage

Provide values for the following:
- Octopus URL
- Octopus API Key
- Name of the space where the projects to be exported can be found
- A list of project names to be exported
- A password to protect sensitive values in the exported data
- Boolean whether or not to wait for the export task to finish
    - Timeout in seconds to wait before attempting to cancel the task.

## Script

!include <export-projects-scripts>