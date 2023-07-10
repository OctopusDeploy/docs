---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Show configuration
description:  Outputs the server configuration
navOrder: 191
---

Use the show configuration command to output the server configuration.

**Show configuration options**

```text
Usage: octopus.server show-configuration [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --file=VALUE           Exports the server configuration to a file. If
                               not specified output goes to the console
      --format=VALUE         The format of the output (XML,json,json-
                               hierarchical); defaults to XML

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the configuration of the default instance:

```
octopus.server show-configuration
```

This example displays the configuration of the instance named `MyNewInstance` in JSON format:

```
octopus.server show-configuration --instance="MyNewInstance" --format="json"
```

This example exports the default instance configuration to a file in JSON hierarchical format:

```
octopus.server show-configuration --file="c:\temp\config.json" --format="json-hierarchical"
```
