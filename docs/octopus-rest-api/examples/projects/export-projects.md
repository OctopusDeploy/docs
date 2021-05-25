---
title: Export projects
description: An example script that will export projects that can be imported into a different space on the same, or different Octopus instance.
---

:::hint
**Note:** This script makes use of an API endpoint introduced in **Octopus 2021.1** for the [Export/Import Projects feature](/docs/projects/export-import/index.md). Using this script in earlier versions of Octopus will not work.
:::

This script will export projects from an Octopus space, that can then be imported into a different space on the same, or different Octopus instance.

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