---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Migrator export
description: Using the Octopus.Migrator.exe command line tool to export data to a directory.
---

This command exports configuration data to a directory.

Usage:

```
Usage: octopus.migrator export [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --directory=VALUE      The target directory for the exported data file-
                               s. This directory will be created if it does not
                               already exist. Use the --clean argument to purge
                               an existing directory before exporting the data
                               files.
      --clean                [Optional] Remove all contents of target
                               directory before exporting the data files. This
                               cannot be undone.
      --password=VALUE       Password used to encrypt any sensitive values.
                               This is the password you will use when importing
                               the data into another Octopus Server.
      --include-tasklogs     [Optional] Use this argument to include the task
                               log folder as part of the data export. Default
                               is to ignore task logs.
      --inline-scripts=VALUE [Optional] Use this argument to choose how
                               inline scripts in your deployment processes will
                               be exported. Valid options for --inline-scripts
                               are CopyToFiles, ExtractToFiles, LeaveInline.
                               Default is CopyToFiles.

Or one of the common options:

      --help                 Show detailed help for this command
```

