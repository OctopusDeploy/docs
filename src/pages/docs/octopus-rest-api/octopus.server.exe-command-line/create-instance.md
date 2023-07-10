---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Create instances
description:  Registers a new instance of the Octopus service
navOrder: 32
---

Use the create-instance command to register a new instance of the Octopus service.

**Create instance options**

```text
Usage: octopus.server create-instance [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to create. If not supplied,
                               creates an instance called OctopusServer.
      --config=VALUE         Path to configuration file to create
      --home=VALUE           [Optional] Path to the home directory - defaults
                               to the same directory as the config file
      --serverNodeName=VALUE [Optional] Unique Server Node name for a
                               clustered environment - defaults to the machine
                               name

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example creates a new Octopus Server instance on the machine named `MyNewInstance` and sets the home directory:

```
octopus.server create-instance --instance="MyNewInstance" --config="c:\MyNewInstance\MyNewInstance.config" --home="c:\MyNewInstance\Home"
```
