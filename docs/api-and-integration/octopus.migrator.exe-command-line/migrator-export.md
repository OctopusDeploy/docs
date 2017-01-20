---
title: Migrator Export

---


This command exports configuration data to a directory.


Usage:

```text
Octopus.Migrator export [<options>]
```


Where `[&lt;options&gt;]` is any of:

**Create release options**

```text
Partial export:
      --instance=VALUE       Name of the instance to use
      --directory=VALUE      Directory for exported files
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the
                               export.
      --project=VALUE        Project to filter export for
     
Common Options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```
