---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create instance
description: Using the Tentacle.exe command line executable to register a new instance of the Tentacle service.
---

Registers a new instance of the Tentacle service.

**Create instance options**

```
Usage: tentacle create-instance [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to create
      --config=VALUE         Path to configuration file to create
      --home=VALUE           [Optional] Path to the home directory - defaults
                               to the same directory as the config file

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example creates a new Tentacle instance named `MyNewInstance`:

Windows:

```
tentacle create-instance --instance="MyNewInstance" --config="c:\MyNewInstance\MyNewInstance.config" --home="c:\MyNewInstance\Home"
```
Linux:

```
Tentacle create-instance --instance="MyNewInstance" --config="/MyNewInstance/MyNewInstance.config" --home="/MyNewInstance/Home"
```
