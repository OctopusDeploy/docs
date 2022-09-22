---
title: Set Master Key
description: Sets the new master key in the config after rotation.
position: 124
---

Sets the new master key in the config after rotation.

:::warning
This command only updates the config file and does not mutate any data. Make sure to [rotate the Master Key](/docs/administration/managing-infrastructure/rotate-master-key.md) first.
:::

**set-master-key options**

```text
Usage: octopus.server set-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --masterKey=VALUE      Updates the configuration file with a new master key.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic example

This example will update the config file for the instance named `OctopusServer` with the provided master key .

```text
octopus.server set-master-key --instance="OctopusServer" --masterKey=NEW_MASTER_KEY
```
