---
title: Partial Export
description: Using the Octopus.Migrator.exe command line tool to export data to a directory filtered by a single project.
---

This feature is available in **Octopus 3.4** and newer.

This command exports configuration data to a directory filtered by a single project.

Usage:

```text
Octopus.Migrator partial-export [<options>]

Where `[<options>]` is any of:

**Partial export options**

Partial export:
      --instance=VALUE       [Optional] Name of the instance to use
      --directory=VALUE      Directory for exported files
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the
                               export.
      --project=VALUE        Project to filter export for

      --releaseVersion=VALUE [Optional] Release of provided project to filter
                               export for
      --ignore-deployments   [Optional] Excludes deployments from partial
                               export
      --ignore-machines      [Optional] Excludes machines from partial export
      --ignore-tenants       [Optional] Excludes tenants from partial export

Common Options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```

## Basic Examples {#PartialExport-Basicexamples}

This will export the project files from *AcmeWebStore* and then spider back through the relevant linked documents in the database and back up *only those that are required in some way* to reproduce that project in its entirety.

```bash
Octopus.Migrator.exe partial-export --instance=MyOctopusInstanceName --project=AcmeWebStore --password=5uper5ecret --directory=C:\Temp\AcmeWebStore
```
