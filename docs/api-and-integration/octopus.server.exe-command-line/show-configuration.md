---
title: Show Configuration
description:  Outputs the server configuration
---

Use the show configuration command to output the server configuration.

**Show configuration options**

```text
Usage: Octopus.Server show-configuration [<options>]

Where [<options>] is any of:
      --file=VALUE           Exports the server configuration to a file.
                               If not specified output goes to the console
      --format=VALUE         The format of the export (XML, json, json-hierarchical)
                               default is XML

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
      --noconsolelogging     Don't log to the console
```
