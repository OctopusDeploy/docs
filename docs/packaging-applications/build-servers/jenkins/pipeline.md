---
title: Jenkins Pipeline projects
description: Managing Octopus steps in a Jenkins pipeline project
position: 20
---

## Pack

Step name: **_octopusPack_**

_**octopusPack** allows you to create a package from files on disk during your pipeline execution_

| Parameters                    | Required | Description                                                                                                      |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `packageId`                   | Yes      | The id of the package                                                                                  |
| `packageFormat`               | Yes      | The format of the package, `zip` or `nupkg`                                                              |
| `overwriteExisting`           | Yes      | Overwrite an existing package with the same name and version                                        |
| `includePaths`                | No       | New-line seperated paths to include files                              |
| `sourcePath`                  | No       | Path containing files and directories to include in package. Defaults to working directory |
| `outputPath` | No | |
| `packageVersion` | No | |

| `toolId`                      | Yes    | The Octopus CLI tool to use |
| `verboseLogging | No | |
| `additionalArgs | Yes | |

Example:
```powershell
octopusPack additionalArgs: '-author "My Company"', includePaths: './bin/Release/publish/', outputPath: './artifacts/', overwriteExisting: false, packageFormat: 'zip', packageId: '', packageVersion: '', sourcePath: '', toolId: 'octocli', verboseLogging: false
```

## Push

Step name: **_octopusPushPackage_**

_**octopusPushPackage** allows you to push packages to the package repository in an Octopus Server_

| Parameters                    | Required | Description                                                                                                      |
|-------------------------------|--------|------------------------------------------------------------------------------------------------------------|
| `serverId`                    | Yes    | The id of the target server to push the package |
| `spaceId`                     | Yes    | The id Space on the server to push the package |
| `packagePaths`                | Yes    | The path to the package |
| `overwriteMode`               | Yes    | Options are `FailIfExists`, `OverwriteExisting` or `IgnoreIfExists` |
| `toolId`                      | Yes    | The Octopus CLI tool to use |
| `verboseLogging`              | No     | Logging level for command output|
| `additionalArgs`              | No     | Additional arguments to pass to Octo CLI |

Example:
```powershell
octopusPushPackage additionalArgs: '', overwriteMode: 'FailIfExists', packagePaths: 'blah.1.0.0.zip', serverId: 'ben-test', spaceId: 'Spaces-1', toolId: 'octocli', verboseLogging: false
```

## Create Release

Step: **_octopusCreateRelease_**

_**octopusCreateRelease** allows you to push packages to the package repository in an Octopus Server_

| Parameters                    | Required | Description                                                                                                |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `serverId`                    | Yes      | The id of the target server to push the package |
| `spaceId`                     | Yes      | The id Space on the server to push the package |
| `project`                     | Yes      | The id of the Project to create the release in |
| `releaseVersion`              | Yes      | The version number for the release |
| `channel`                     | No       | The name of the target channel. Defaults to `Default` channel |
| `toolId`                      | Yes      | The Octopus CLI tool to use |
| `packageConfigs`              | No | Collection of Package versions to set when creating the release |
| `defaultPackageVersion`       | No | The default version to use for packages associated with the release |
| `deployThisRelease`           | No       | Deploy release after creation. Valid values are `true` or `false` |
| `cancelOnTimeout`             | No       | Cancel the deployment Valid values are `true` or `false` |
| `tenant`                      | No | The tenant to create the release for |
| `tenantTag`                   | No | The tenant tag to create the release for |
| `waitForDeployment`           | No | Wait for deployment to complete before continuing. Valid values are `true` or `false` |
| `deploymentTimeout`           | No | How long to wait for deployment. Format is `HH:mm:ss`. Default is `00:10:00` |
| `environment`                 | No | Environment to deploy release |
| `jenkinsUrlLinkback`          | No | Include link to the Jenkins build that created the release. Valid values are `true` or `false` |
| `releaseNotes`                | No | Inclide release notes in release. Valid values are `true` or `false` |
| `releaseNotesSource`          | No | Valid values are `file` or `scm` |
| `releaseNotesFile`            | Maybe | The file path for release notes, required if `releaseNotesSource` is `file`  |
| `verboseLogging`              | No | Logging level for command output|
| `additionalArgs`              | No | Additional arguments to pass to Octo CLI |

Example:
```powershell
octopusCreateRelease 
    serverId: 'octopus-server', 
    spaceId: 'Spaces-1', 
    project: 'Random Quotes', 
    releaseVersion: '0.0.0', 
    channel: 'Default', 
    toolId: 'octocli', 
    packageConfigs: [[packageName: 'package', packageReferenceName: 'refName', packageVersion: '1.2.3']]
    defaultPackageVersion: '', 

    deployThisRelease: false, 
    cancelOnTimeout: false, 
    deploymentTimeout: '', 
    environment: 'test', 
    
    tenant: 'Tenant 1', 
    tenantTag: 'importance/high', 
    jenkinsUrlLinkback: false, 
    releaseNotes: false, 
    releaseNotesSource: 'scm',
    
    verboseLogging: false,
    waitForDeployment: false,
    additionalArgs: '', 
```