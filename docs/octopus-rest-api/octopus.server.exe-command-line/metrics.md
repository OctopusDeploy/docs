---
title: Metrics
description: Configure metrics logging
position: 130
---

Configure metrics logging

**metrics options**

```text
Usage: octopus.server metrics [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --enable               Turns on all metric logging
      --disable              Turns off all metric logging
      --tasks=VALUE          Whether to enable logging of tasks metrics
      --webapi=VALUE         Whether to enable logging of web api metrics

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples
This example disables all metrics for the default instance:
```text
octopus.server metrics --disable
```

This example enables tasks metrics on instance `MyNewInstance`:
```text
octopus.server metrics --tasks="true" --instance="MyNewInstance"
```
