---
title: Show Master Key
description:  Print the server's Master Encryption Key, so that it can be backed up
position: 192
---

Use the show Master Key command to print the server's Master Encryption Key, so that it can be backed up.

**Show Master Key options**

```text
Usage: octopus.server show-master-key [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --format=VALUE         The format of the output (text,json). Defaults
                               to text.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples
This example will display the master key of the default instance
```
octopus.server show-master-key
```

This example will display the master key of the instance MyNewInstance in JSON format
```
octopus.server show-master-key --instance="MyNewInstance" --format="json"
```