---
title: Partial Export
description: Using the Octopus.Migrator.exe command line tool to export data to a directory filtered by a single project.
---

This feature is available in **Octopus 3.4** and newer.

This command exports configuration data to a directory filtered by a single project.

Usage:

```text
Usage: octopus.migrator partial-export [<options>]

Where [<options>] is any of:

      --instance=VALUE       Name of the instance to use
      --directory=VALUE      Directory for exported files
      --clean                Remove all contents of directory before
                               exporting files; This cannot be undone
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the export
      --project=VALUE        Project to filter export for. Specify this
                               argument multiple times to add multiple projects
      --releaseVersion=VALUE [Optional] Release of provided project to filter
                               export for (only to be used when specifying a
                               single project)
      --ignore-certificates  [Optional] Excludes certificates from partial
                               export
      --ignore-machines      [Optional] Excludes machines from partial export
      --ignore-deployments   [Optional] Excludes deployments from partial
                               export
      --ignore-tenants       [Optional] Excludes tenants from partial export

Or one of the common options:

      --help                 Show detailed help for this command
```

Where `[<options>]` is any of:

**Partial export options**

```text
Partial export:
      --instance=VALUE       [Optional] Name of the instance to use
      --directory=VALUE      Directory for exported files
      --password=VALUE       Password to encrypt any sensitive values
      --include-tasklogs     Include the task log folder as part of the
                               export.
      --project=VALUE        Project to filter export for

      --sourceSpaceId=VALUE   [Optional] If not using the Spaces feature. The Space which houses the project's being exported
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
