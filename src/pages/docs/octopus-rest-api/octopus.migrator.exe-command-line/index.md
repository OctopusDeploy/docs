---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus.Migrator.exe command line
description: Octopus.Migrator.exe is an Octopus command line tool that provides the ability to back-up and restore parts of an Octopus Deploy instance as well as migrate data from 2.6 builds.
navOrder: 80
---

**Octopus.Migrator.exe** is a command line tool that provides the ability to back-up and restore parts of an Octopus Deploy instance as well as migrate data from **Octopus 2.6** builds.

:::warning
Octopus.Migrator.exe is not designed to support migrating projects between spaces. Issues and unintended results may occur when attempting to use the tool in this manner. If you wish to migrate projects between spaces or from an on-premise installation to a cloud instance, please see our [Exporting and Importing Projects](/docs/projects/export-import) documentation.
:::

For more in depth information about applicable data migration scenarios and tips, please reference the [data migration documentation](/docs/administration/data/data-migration).


The latest version of **Octopus.Migrator.exe** is available in the Octopus Deploy installation directory and is usually located in:

```powershell
C:\Program Files\Octopus Deploy\Octopus
```

## Commands {#octopus.migrator.exeCommandLine-Commands}

`octopus.migrator.exe` supports the following commands:

- **[export](/docs/octopus-rest-api/octopus.migrator.exe-command-line/export)**:  Exports all configuration data to a directory.
- **[import](/docs/octopus-rest-api/octopus.migrator.exe-command-line/import)**:  Imports data from an Octopus 3.0+ export directory.
- **[migrate](/docs/octopus-rest-api/octopus.migrator.exe-command-line/migrate)**:  Imports data from an Octopus 2.6 backup.
- **[partial-export](/docs/octopus-rest-api/octopus.migrator.exe-command-line/partial-export)**:  Exports configuration data to a directory filtered by projects.
- **[version](/docs/octopus-rest-api/octopus.migrator.exe-command-line/version)**:  Shows the version information for this release of the Octopus Migrator.

## General usage {#Octopus.Migrator.exeCommandLine-Generalusage}

All commands take the form of:

```powershell
Octopus.Migrator <command> [<options>]
```

You can see a list of commands using:

```powershell
Octopus.Migrator help
```

And you can get help for a specific command using:

```powershell
Octopus.Migrator help <command>
```

Arguments are not case sensitive and can take the following forms:

```powershell
--project OctoFX                # Space between argument name and value
--project=OctoFX                # Equal sign between argument name and value
--project "OctoFX Web Site"     # Argument values with spaces need to be quoted
"--project=OctoFX Web Site"     # If using equals, quote both the name and value, not just the value
```

All commands assume that you are running on the server where the Octopus Server is installed which has access to the relevant database.
