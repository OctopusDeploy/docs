---
title: Agent
description: Starts the Tentacle Agent in debug mode
---

Starts the Tentacle Agent in debug mode.

**agent options**

```text
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

```text
tentacle agent --console
```

## Docker container example

This example shows hows to run the Tentacle Agent for an instance named `Tentacle` when using either the official [Tentacle container](/docs/installation/octopus-in-container/octopus-tentacle-container.md) or a custom Docker container.

```text
tentacle agent --instance Tentacle --noninteractive
```

:::warning
When launching a Tentacle in a container using `docker run` **without** an interactive terminal attached (e.g. with the `-it` parameter), the `--noninteractive` parameter is required, otherwise the Tentacle host would exit immediately after starting.
:::