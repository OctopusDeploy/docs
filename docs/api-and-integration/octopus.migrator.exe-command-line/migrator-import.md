---
title: Migrator Import
description: Using the Octopus.Migrator.exe command line tool to import data from an Octopus 3.0 or newer directory.
---

This command imports data from an Octopus 3.0+ export directory.

The export must have been made from an Octopus Server running the same release version as the intended import server.

Usage:

```bash
Octopus.Migrator import [<options>]
```

Where `[<options>]` is any of:

**Import options**

```text
Import:
      --instance=VALUE       [Optional] Name of the instance to use
      --directory=VALUE      Directory for imported files
      --password=VALUE       Password to decrypt any sensitive values
      --dry-run		     Do not commit changes, just print what would have happened
      --overwrite            If a document with the same name already exists, it will be skipped by default.
                             Use --overwrite to force it to be replaced.
      --force 		     Imports even if there are validation errors
                             (CAUTION: this may put the database in a bad state)
      --include-tasklogs     Include the task log folder as part of the import process
 
Common Options:
      --console              Don't attempt to run as a service, even if the user is non-interactive
      --nologo               Don't print title or version information
```
