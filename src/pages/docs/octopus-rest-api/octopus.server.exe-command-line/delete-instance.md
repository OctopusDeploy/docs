---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Delete instances
description:  Deletes an instance of the Octopus service
navOrder: 41
---

Use the Delete Instance command to delete an instance of the Octopus service.

**Delete Instance options**

```text
Usage: octopus.server delete-instance [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example deletes the Octopus Server instance on the machine named `MyNewInstance`:

```
octopus.server delete-instance --instance="MyNewInstance"
```
