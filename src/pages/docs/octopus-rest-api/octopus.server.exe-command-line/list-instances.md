---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: List instances
description: Lists all installed Octopus instances
navOrder: 121
---

Use the list instance command to show all currently installed Octopus instances.

**List Instances options**

```text
Usage: octopus.server list-instances [<options>]

Where [<options>] is any of:

      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example lists all currently installed instances of Octopus on the machine:

```
octopus.server list-instances
```

On a machine with multiple instances installed, an example of the output is:

```
Instance 'MyNewInstance' uses configuration 'C:\MyNewInstance\MyNewInstance.config'.
Instance 'OctopusServer' uses configuration 'C:\Octopus\OctopusServer.config'.
```
