---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Delete instance
description: Using the Tentacle.exe command line executable to delete an instance of the Tentacle service.
---

Deletes an instance of the Tentacle service.

**Delete instance options**

```text
Usage: tentacle delete-instance [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example deletes the Tentacle instance `MyNewInstance`:

```text
tentacle delete-instance --instance="MyNewInstance"
```
