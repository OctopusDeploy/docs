---
title: export
description: Exports all configuration data to a directory
---

Exports all configuration data to a directory

**export options**

```text
Usage: octopus.migrator export [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --directory=VALUE      Directory for exported files
      --clean                Remove all contents of directory before
                               exporting files; This cannot be undone
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the export
      --inline-scripts=VALUE Use this argument to choose how inline scripts
                               in your deployment processes will be exported.
                               Valid options for --inline-scripts are
                               CopyToFiles, ExtractToFiles, LeaveInline.
                               Default is CopyToFiles.

Or one of the common options:

      --help                 Show detailed help for this command
```

