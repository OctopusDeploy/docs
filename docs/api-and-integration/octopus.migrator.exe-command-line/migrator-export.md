---
title: Migrator Export
description: Using the Octopus.Migrator.exe command line tool to export data to a directory.
---

This command exports configuration data to a directory.

Usage:

```bash
Octopus.Migrator export [<options>]
```

Where `[<options>]` is any of:

**Export options**

```text
Export:
      --instance=VALUE       [Optional] Name of the instance to use
      --directory=VALUE      Directory for exported files
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the
                               export.
     
Common Options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```
