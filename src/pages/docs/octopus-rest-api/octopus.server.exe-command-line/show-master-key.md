---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Show Master Key
description:  Print the server's Master Encryption Key, so that it can be backed up
navOrder: 192
---

Use the show Master Key command to print the server's Master Encryption Key, so that it can be backed up.

**Show Master Key options**

```text
Usage: octopus.server show-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples

This example displays the master key of the default instance:

```
octopus.server show-master-key
```

This example displays the master key of the instance named `MyNewInstance` in JSON format:

```
octopus.server show-master-key --instance="MyNewInstance" --format="json"
```
