---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Synchronize packages
description: An example script that synchronizes packages from the built-in feed between two spaces in Octopus using the REST API.
---

This script synchronizes packages from the [built-in feed](/docs/packaging-applications/package-repositories/built-in-repository/index.md) between two [spaces](/docs/administration/spaces/index.md). The spaces can be on the same Octopus instance, or in different instances.

## Usage

Provide values for:

- `VersionSelection` - the version selection of packages to sync. Choose from:
    - **FileVersions** - sync versions specified in the file specified by the `Path` parameter.
    - **LatestVersion** - sync the latest version of packages in the built-in feed.
    - **AllVersions** - sync all versions of packages in the built-in feed.
- `PackageListFilePath` - the path to a file containing details of the packages and versions to sync. The file input format is:

    ```json
    [
        {
            "Id": "WebApp1",
            "Versions": [
            "1.0.0",
            "1.0.1"
            ]
        },
        {
            "Id": "WebApp2",
            "Versions": [
            "1.0.0",
            "1.0.2"
            ]
        }
    ]
    ```
- `SourceUrl` - Octopus URL used as the source for package synchronization.
- `SourceApiKey` - Octopus API Key used with the source Octopus server.
- `SourceSpace` - Name of the space to use from the source Octopus server.
- `DestinationUrl` - Octopus URL used as the destination for package synchronization.
- `DestinationApiKey` - Octopus API Key used with the destination Octopus server.
- `DestinationSpace` - Name of the space to use for the destination Octopus server.
- `CutOffDate` - *Optional* cut-off date for a package's published date to be included in the synchronization.

### Example usage

This example takes packages specified in the `packages.json` file, finding all versions found in the source Octopus instance which have a published date greater than `2021-02-11` and synchronizing them with the destination Octopus instance:

```powershell
/SyncPackages.ps1 `
-VersionSelection AllVersions `
-PackageListFilePath "packages.json" `
-SourceUrl https://source.octopus.app `
-SourceApiKey "API-SOURCEKEY" `
-SourceSpace "Default" `
-DestinationUrl https://destination.octopus.app `
-DestinationApiKey "API-DESTKEY" `
-DestinationSpace "Default" `
-CutOffDate (Get-Date "2021-02-11")
```

## Script

!include <sync-packages-scripts>
