---
title: Agent
description: Starts the Tentacle Agent in debug mode
---

Starts the Tentacle Agent in debug mode

**agent options**

```text
Usage: tentacle agent [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --wait=VALUE           Delay (ms) before starting
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example starts the default tentacle in debug and console mode:

```text
tentacle agent --console
```
