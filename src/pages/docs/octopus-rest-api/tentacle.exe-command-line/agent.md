---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Agent
description: Starts the Tentacle Agent in debug mode
---

Starts the Tentacle Agent in debug mode.

**agent options**

```
Usage: tentacle agent [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --wait=VALUE           Delay (ms) before starting
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example starts the default Tentacle in debug and console mode:

```
tentacle agent --console
```

## Docker container example

This example shows hows to run the Tentacle Agent for an instance named `Tentacle` when running in a custom Docker container. This is also how the official [Tentacle container](/docs/infrastructure/deployment-targets/tentacle/octopus-tentacle-container/) is launched too.

```
tentacle agent --instance Tentacle --noninteractive
```

:::hint
The `--noninteractive` parameter is required when running in a container, otherwise the Tentacle host would exit immediately after starting.
:::
