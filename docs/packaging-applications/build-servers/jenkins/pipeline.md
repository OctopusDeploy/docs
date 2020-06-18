---
title: Jenkins Pipeline projects
description: Managing Octopus steps in a Jenkins pipeline project
position: 20
---

## Pack {#pack}

Step name: **_octopusPack_**

_**octopusPack** allows you to create a package from files on disk during your pipeline execution_

| Parameters                    | Required | Description                                                                                                      |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `toolId`                      | Yes      | The Octopus CLI tool to use |
| `packageId`                   | Yes      | The id of the package                                                                                  |
| `packageFormat`               | Yes      | The format of the package, `zip` or `nupkg`                                                              |
| `sourcePath`                  | Yes      | Path containing files and directories to include in package |
| `overwriteExisting`           | No       | Overwrite an existing package with the same name and version. Valid values are `true` or `false`. Defaults to `false`    |
| `includePaths`                | No       | New-line seperated paths to include files                              |
| `outputPath`                  | No       | Path to write final package. Defaults to `.` |
| `packageVersion`              | No       | Package version, defaults to a timestamp-based version. |
| `verboseLogging`              | No       | Turn on verbose logging. Valid values are `true` or `false`. |
| `additionalArgs`              | No       | Additional arguments to pass to the Octo CLI [pack](/docs/octopus-rest-api/octopus-cli/pack.md) command|

Example:
```powershell
octopusPack additionalArgs: '-author "My Company"', includePaths: './bin/Release/publish/', outputPath: './artifacts/', overwriteExisting: false, packageFormat: 'zip', packageId: '', packageVersion: '', sourcePath: '', toolId: 'octocli', verboseLogging: false
```

## Push {#push}

Step name: **_octopusPushPackage_**

_**octopusPushPackage** allows you to push packages to the package repository in an Octopus Server_

| Parameters                    | Required | Description                                                                                                      |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `toolId`                      | Yes      | The Octopus CLI tool to use |
| `serverId`                    | Yes      | The id of the target server to push the package |
| `spaceId`                     | Yes      | The id Space on the server to push the package |
| `packagePaths`                | Yes      | The path to the package |
| `overwriteMode`               | Yes      | Valid values are `FailIfExists`, `OverwriteExisting` or `IgnoreIfExists` |
| `verboseLogging`              | No       | Turn on verbose logging. Valid values are `true` or `false`. |
| `additionalArgs`              | No       | Additional arguments to pass to the Octo CLI [push](/docs/octopus-rest-api/octopus-cli/push.md) command|

Example:
```powershell
octopusPushPackage overwriteMode: 'FailIfExists', packagePaths: 'blah.1.0.0.zip', serverId: 'octopus-server', spaceId: 'Spaces-1', toolId: 'octocli'
```

## Create Release {#create-release}

Step: **_octopusCreateRelease_**

_**octopusCreateRelease** allows you to push packages to the package repository in an Octopus Server_

| Parameters                    | Required    | Description                                                                                                |
|-------------------------------|-------------|------------------------------------------------------------------------------------------------------------|
| `toolId`                      | Yes         | The Octopus CLI tool to use |
| `serverId`                    | Yes         | The id of the target server to push the package |
| `spaceId`                     | Yes         | The id Space on the server to push the package |
| `project`                     | Yes         | The id of the Project to create the release in |
| `releaseVersion`              | Yes         | The version number for the release |
| `channel`                     | No          | The name of the target channel. Defaults to `Default` channel |
| `packageConfigs`              | No          | Collection of Package versions to set when creating the release |
| `defaultPackageVersion`       | No          | The default version to use for packages associated with the release |
| `deployThisRelease`           | No          | Deploy release after creation. Valid values are `true` or `false`. Defaults to `false`. |
| `waitForDeployment`           | No          | Wait for deployment to complete before continuing. Valid values are `true` or `false`. Defaults to `false`. |
| `cancelOnTimeout`             | No          | Cancel the deployment after the `waitForDeployment` time. Valid values are `true` or `false`. Defaults to `false`. |
| `tenant`                      | No          | The tenant to deploy the release to |
| `tenantTag`                   | No          | The tenant tag to deploy the release to |
| `deploymentTimeout`           | No          | How long to wait for deployment. Format is `HH:mm:ss`. Default is `00:10:00` |
| `environment`                 | Conditional | The environment to deploy release to. Required if `deployThisRelease` is `true` |
| `jenkinsUrlLinkback`          | No          | Include link to the Jenkins build that created the release. Valid values are `true` or `false`. Default is `false` |
| `releaseNotes`                | No          | Include release notes in release. Valid values are `true` or `false`. Default is `false` |
| `releaseNotesSource`          | No          | Valid values are `file` or `scm` |
| `releaseNotesFile`            | Conditional | The file path for release notes, required if `releaseNotesSource` is `file`  |
| `verboseLogging`              | No          | Turn on verbose logging. Valid values are `true` or `false`. |
| `additionalArgs`              | No          | Additional arguments to pass to the Octo CLI [create-release](/docs/octopus-rest-api/octopus-cli/create-release.md) command|

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

## Deploy Release {#deploy-release}

Step: **_octopusDeployRelease_**

_**octopusDeployRelease** allows you to push packages to the package repository in an Octopus Server_

| Parameters                    | Required | Description                                                                                                |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `toolId`                      | Yes      | The Octopus CLI tool to use |
| `serverId`                    | Yes      | The id of the target server to push the package |
| `spaceId`                     | Yes      | The id Space on the server to push the package |
| `project`                     | Yes      | The id of the Project to create the release in |
| `environment`                 | Yes      | Environment to deploy release |
| `releaseVersion`              | Yes      | The version number for the release |
| `cancelOnTimeout`             | No       | Cancel the deployment after the `waitForDeployment` time. Valid values are `true` or `false`. Defaults to `false`.  |
| `tenant`                      | No       | The tenant to deploy the release to |
| `tenantTag`                   | No       | The tenant tag to deploy the release to |
| `waitForDeployment`           | No       | Wait for deployment to complete before continuing. Valid values are `true` or `false` |
| `deploymentTimeout`           | No       | How long to wait for deployment. Format is `HH:mm:ss`. Default is `00:10:00` |
| `variables`                   | No       | Set prompted variable values. Format is `key1=value1\nkey2=value2` |
| `verboseLogging`              | No       | Turn on verbose logging. Valid values are `true` or `false`.|
| `additionalArgs`              | No       | Additional arguments to pass to the Octo CLI [deploy-release](/docs/octopus-rest-api/octopus-cli/deploy-release.md) command.|

Example:
```powershell
octopusDeployRelease 
    toolId: 'octocli', 
    serverId: 'octopus-server', 
    spaceId: 'Spaces-1', 
    project: '1', 
    environment: 'test', 
    releaseVersion: '1.2.4', 
    tenant: 'tenant 1', 
    tenantTag: 'importance/high', 
    variables: '', 
    deploymentTimeout: '00:01:00',
    waitForDeployment: true
    cancelOnTimeout: true,
    verboseLogging: false, 
    additionalArgs: ''
```

## Push Package Info {#build-information}

Step: **_octopusPushBuildInformation_**

_**octopusPushBuildInformation** allows you to push package information to an Octopus Server

| Parameters                    | Required | Description                                                                                                      |
|-------------------------------|----------|------------------------------------------------------------------------------------------------------------|
| `toolId`                      | Yes      | The Octopus CLI tool to use |
| `serverId`                    | Yes      | The id of the target server to push the package |
| `spaceId`                     | Yes      | The id Space on the server to push the package |
| `packageId`                   | Yes      | The id of the packages to push the version information, multiple values can be provided seperated by `\n` |
| `commentParser`               | Yes      | Valid values are `GitHub` and `Jira`  |
| `overwriteMode`               | Yes      | Valid values are `FailIfExists`, `OverwriteExisting` or `IgnoreIfExists` |
| `verboseLogging`              | No       | Turn on verbose logging. Valid values are `true` or `false`. |
| `additionalArgs`              | No       | Additional arguments to pass to the Octo CLI [build-information](/docs/octopus-rest-api/octopus-cli/build-information.md) command.|

Example:
```powershell
octopusPushBuildInformation 
    toolId: 'octocli', 
    serverId: 'octopus-server', 
    spaceId: 'Spaces-1', 
    commentParser: 'GitHub', 
    overwriteMode: 'FailIfExists', 
    packageId: 'packageId1\npackageId2', 
    packageVersion: '1.2.3', 
    verboseLogging: false,
    additionalArgs: ''
```