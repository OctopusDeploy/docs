---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: octopus config
description: Manage CLI configuration
navOrder: 23
---

Manage the CLI configuration


```
Usage:
  octopus config [command]

Available Commands:
  get Gets the value of config key for Octopus CLI
  help Help about any command
  list List values from config file
  set Set will write the value for given key to Octopus CLI config file

Global Flags:
  -h, --help                   Show help for a command
      --no-prompt              Disable prompting in interactive mode
  -f, --output-format string   Specify the output format for a command ("json", "table", or "basic") (default "table")
  -s, --space string           Specify the space for operations


Use "octopus config [command] --help" for more information about a command.
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/cli/)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key/)