---
title: Octopus.Migrator.exe Command Line
description: Octopus.Migrator.exe is an Octopus command line tool that provides the ability to back-up and restore parts of an Octopus Deploy instance as well as migrate data from 2.6 builds.
position: 120
---

**Octopus.Migrator.exe** is a command line tool that provides the ability to back-up and restore parts of an Octopus Deploy instance as well as migrate data from **Octopus 2.6** builds.

The latest version is available in the Octopus Deploy installation directory from version 3.0 onward, usually located in *C:\Program Files\Octopus Deploy*.

## Commands {#Octopus.Migrator.exeCommandLine-Commands}

Octopus.Migrator.exe supports the following commands:

- **`migrate`**: Imports data from an **Octopus 2.6** backup
- **`import`**: Imports data from an **Octopus 3.0**+ export directory. [Learn more](/docs/api-and-integration/octopus.migrator.exe-command-line/migrator-import.md)
- **`export`**: Exports all configuration data to a directory. [Learn more](/docs/api-and-integration/octopus.migrator.exe-command-line/migrator-export.md)
- **`partial-export`**: Exports configuration data to a directory filtered by a single project. [Learn more](/docs/api-and-integration/octopus.migrator.exe-command-line/partial-export.md)

## General Usage {#Octopus.Migrator.exeCommandLine-Generalusage}

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

All commands assume that you are running on the server where the Octopus Deploy Server is installed which has access to the relevant database.
