---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Partial export
description: Using the Octopus.Migrator.exe command line tool to export data to a directory filtered by a single project.
---

This command exports configuration data to a directory filtered by a single project.

Usage:

```
Usage: octopus.migrator partial-export [<options>]

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
      --projectGroup=VALUE   The name of a project group you want to export
                               including all its projects. Specify this
                               argument multiple times to add multiple project
                               groups.
      --project=VALUE        The name of a project you want to export.
                               Specify this argument multiple times to add
                               multiple projects.
      --releaseVersion=VALUE [Optional] An expression for the releases you
                               want to export. This can be a specific version
                               like --releaseVersion=2.5.0, or a version range
                               like --releaseVersion=2.5.0-3.1.0, or --
                               releaseVersion=* to export all releases. Where
                               possible semantic version comparison is used,
                               and any matching releases will be exported.
                               Leaving this argument empty is the equivalent to
                               all releases.
      --ignore-history       [Optional] Excludes all historical documents
                               like releases, deployments, deployment related
                               tasks, and auto-deploy history. Use this switch
                               if you want to export the current state of a
                               project without its history.
      --ignore-deployments   [Optional] Excludes deployments, deployment
                               related tasks, and auto-deploy history. Releases
                               are still exported. Use --ignore-history to
                               exclude all historical documents.
      --ignore-tenants       [Optional] Excludes tenants from partial export.
      --ignore-certificates  [Optional] Excludes certificates from partial
                               export.
      --ignore-machines      [Optional] Excludes deployment targets and
                               workers from partial export.

Or one of the common options:

      --help                 Show detailed help for this command
```

## Basic examples {#PartialExport-Basicexamples}

This will export the project files from *AcmeWebStore* and then spider back through the relevant linked documents in the database and back up *only those that are required in some way* to reproduce that project in its entirety.

```bash
Octopus.Migrator.exe partial-export --instance=MyOctopusInstanceName --project=AcmeWebStore --password=5uper5ecret --directory=C:\Temp\AcmeWebStore
```
