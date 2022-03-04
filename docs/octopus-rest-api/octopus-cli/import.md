---
title: Import
description: Using the Octopus CLI to import items exported from another Octopus Server.
position: 150
---

:::warning
This command is **Deprecated**. The recommended way to import data to an Octopus instance is with the **Export/Import Projects** feature that was released in **Octopus 2021.1**. Learn more: [Exporting and Importing Projects](/docs/projects/export-import/index.md).

If you are running an earlier version of Octopus, please see our [data migration](docs/administration/data/data-migration.md) section for alternative options.
:::

This command allows you to import items from one Octopus Server into another Octopus Server.

**Note:** Both the source and destination Octopus Servers should be running the same version.

We currently support importing:

- Projects
- Releases

[Usage:](/docs/octopus-rest-api/octopus-cli/import.md)

```text
The octo import/export commands have been deprecated. See [https://g.octopushq.com/DataMigration](https://g.octopushq.com/DataMigration) for alternative options.
Exit code: -1
```

## Import a project {#Import-Importaproject}

:::hint
**Prerequisites**
Before importing a project you have to ensure that the following exists on the Octopus Server you are importing to:

- The Project Group used by the Project
- The Environments used in the Project
- The Machines used in the Project
- The NuGet feeds used in the Project
- The Library Variable Sets (if any) used in the Project
- Corresponding Lifecycles (including those linked to channels)
  :::

The following options are required when importing a project.

**project import options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file
```

Usage:

```bash
octo import --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=project --filePath=C:\path\to\export\file.json
```

### Project import output when a prerequisite is missing {#Import-ProjectImportOutputwhenaprerequisiteismissing}

During the import, the Octopus CLI will validate that any dependencies, such as feeds and library variable sets, already exist on the target server. If one of these can't be found, the import will not continue, as shown below:

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0

Handshaking with Octopus Server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'project'
Beginning the import
Export file successfully loaded
Checking that all environments exist
Checking that all machines exist
Checking that all NuGet Feeds exist
Checking that all Library Variable Sets exist
Library Variable Set Logging Variables does not exist
Exit code: -1
```

### Project import output {#Import-ProjectImportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0

Handshaking with Octopus Server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'project'
Beginning the import
Export file successfully loaded
Checking that all environments exist
Checking that all machines exist
Checking that all NuGet Feeds exist
Checking that all Library Variable Sets exist
Checking that the Project Group exist
Beginning import of project 'OctoFX Rate Service'
Importing Project
Project does not exist, a new project will be created
Importing the Projects Deployment Process
Updating ID of NuGet Feed
Updating IDs of Environments
Updating ID of NuGet Feed
Updating IDs of Environments
Importing the Projects Variable Set
Updating the Environment IDs of the Variables scope
Updating the Environment IDs of the Variables scope
Updating the Environment IDs of the Variables scope
'Password' is a sensitive variable and it's value will be reset to a blank strin
g, once the import has completed you will have to update it's value from the UI
Updating the Environments of the Variable Sets Scope Values
Updating the Machines of the Variable Sets Scope Values
Successfully imported project 'OctoFX Rate Service'
```

## Import a release, or range of releases {#Import-Importarelease,orrangeofreleases}

:::hint
**Prerequisites**
Before importing a release, or range of releases, you have to ensure that the project exists on the Octopus Server you are importing to
:::

The following options are required when importing a release, or a range of releases.

**release import options**

```powershell
--type				The type of object to export
--filePath			The full path and name of the export file
--project			The name of the project to import the release to
```

Usage:

```bash
octo import --server=http://octopusdeploy/api --apiKey=ABCDEF123456 --type=release --project=projectname --filePath=C:\path\to\export\file.json
```

### Release import output {#Import-ReleaseImportOutput}

```powershell
Octopus Deploy Command Line Tool, version 1.0.0.0

Handshaking with Octopus Server: http://localhost/octopuslive/
Handshake successful. Octopus version: 2.4.4.43; API version: 3.0.0
Finding importer 'release'
Beginning the import
Export file successfully loaded
Importing release '2.7.2067
Creating new release '2.7.2067' for project OctoFX Rate Service
Successfully imported releases for project OctoFX Rate Service
```

## Learn more

- [Octopus CLI](/docs/octopus-rest-api/octopus-cli/index.md)
- [Creating API keys](/docs/octopus-rest-api/how-to-create-an-api-key.md)
