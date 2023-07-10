---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Version
description: Output the Octopus CLI command line tool version.
navOrder: 290
---

This command returns the version of the Octopus CLI tool version.

```text
Outputs Octopus CLI version.

Usage: octo version [<options>]

Where [<options>] is any of:

Common options:

      --help                 [Optional] Print help for a command.
      --helpOutputFormat=VALUE
                             [Optional] Output format for help, valid options
                             are Default or Json
```

## Basic example
This example displays the version of the Octopus CLI:

```
octo --version
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key)
