---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Complete
description: Supports command line auto completion.
navOrder: 25
---

Supports command line auto completion.

**complete options**

```text
Supports command line auto completion.

Usage: octo complete <command> [<options>]

Where <command> is the current command line to filter auto-completions.

Where [<options>] is any of:

Common options:

      --help                 [Optional] Print help for a command.
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, valid options
                             are Default or Json
```

## Basic example

This example displays supported commands that start with `list`:

```text
octo complete list
```

This returns the following results:

```text
list-deployments
list-environments
list-latestdeployments
list-machines
list-projects
list-releases
list-tenants
list-workerpools
list-workers
```
