---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Server configuration and file storage
description: Octopus Server configuration command reference including how to specify your file storage locations.
navOrder: 1100
---

Occasionally, it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance, you may also want to clean up the Octopus Home folder after migrating from Octopus Server 2.6 to a modern version of Octopus Server. This page will explain what settings can be configured using the command-line on the Octopus Server and what folders can safely be removed from the Octopus Home folder after successfully migrating to a modern version of Octopus Server.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

## Server configuration {#ServerconfigurationandFilestorage-ConfigurationServerconfiguration}

If you need to re-configure your Octopus Server instance, you can do that using the Octopus Server [configure](/docs/octopus-rest-api/octopus.server.exe-command-line/configure/) command.

## Server folders {#ServerconfigurationandFilestorage-Serverfolders}

If you need to move folders other than the Octopus Home folder, you can do that using the Octopus Server [path](/docs/octopus-rest-api/octopus.server.exe-command-line/path/) command. Also see [moving Octopus Server folders](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-OctopusHome).

## File storage {#ServerconfigurationandFilestorage-FileStorageFilestorage}

The Octopus Server stores files in the following folders by default:

- `C:\Octopus`
    - This is where the Octopus Server config file and deployment journal is stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-OctopusHome) on how to move the Octopus home folder
- `C:\Octopus\Artifacts`
    - This is where artifacts created by deployments are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-Artifacts) on how to move the Octopus Server artifacts folder
- `C:\Octopus\Logs`
    - This is where the Octopus Server log file is stored.
- `C:\Octopus\OctopusServer\PackageCache`
    - This is where the signature and delta files used for package acquisitions are stored.
- `C:\Octopus\Packages`
    - This is where the packages pushed to the Octopus Server built-in package repository are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-NuGetRepository) on how to move the Octopus Server built-in package folder
- `C:\Octopus\TaskLogs`
    - This is where all logs from deployments and other server tasks are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-TaskLogs) on how to move the Octopus Server task logs folder
- `C:\Octopus\Telemetry`
    - This is where all performance and other temporal telemetry files are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-Telemetry) on how to move the Octopus Server telemetry folder
- `C:\Octopus\Imports`
    - This folder was added in **Octopus 2021.1**
    - This is where imported zip files are stored when using the [Export/Import Projects feature](/docs/projects/export-import/).
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders/#MovingOctopusServerfolders-Imports) on how to move the Octopus Server imports folder

## Clean up post-2.6 migration {#ServerconfigurationandFilestorage-CleanUpCleanuppost-2.6migration}

In **Octopus 2.6** the Server stored files in the following folders by default:

- `C:\Octopus`
- `C:\Octopus\Backup`
- `C:\Octopus\Logs`
- `C:\Octopus\OctopusServer`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository\Index`
- `C:\Octopus\OctopusServer\Repository\Packages`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`

Once you have migrated to a modern version of Octopus Server the following folders can safely be removed:

- `C:\Octopus\Backup`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`
