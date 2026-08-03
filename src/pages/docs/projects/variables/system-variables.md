---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-08-03
title: System variables
sidebarLabel: System variables
navOrder:
description: The built-in variables Octopus provides for use in deployment processes, runbooks, and custom scripts.
subject: system variables, release variables, deployment variables, action variables, output variables, runbook variables
type: reference
audience: [devops-eng, power-user]
image:
imageAlt:
---

This page lists built-in Octopus provides for use in deployment processes, runbooks, and [custom scripts](/docs/deployments/custom-scripts).

**All Octopus variables are strings**, even when the value looks like a number or a boolean. 

## Release variables
 
Release-level variables are drawn from the project and release being created, and are available throughout a deployment or runbook run.
 
| Variable | Description | Example |
| --- | --- | --- |
| `Octopus.Release.Id` | The ID of the release. | `releases-123` |
| `Octopus.Release.Number` | The version number of the release. | `1.2.3` |
| `Octopus.Release.Notes` | Release notes associated with the release, in Markdown format. | Fixes bugs 1, 2, and 3 |
| `Octopus.Release.Created` | The date and time the release was created. | Tuesday, September 10, 1:23 PM |
| `Octopus.Release.CustomFields[name]` | The value of a custom field set on the release. | `TST-123` |
| `Octopus.Release.Channel.Name` | The channel name associated with the release. | 2.x Feature Branch |
| `Octopus.Release.Previous.Id` | The ID of the previous release of the project. | `releases-122` |
| `Octopus.Release.Previous.Number` | The version number of the previous release of the project. | `1.2.2` |
| `Octopus.Release.PreviousForEnvironment.Id` | The ID of the previous release of the project to the current environment. | `releases-122` |
| `Octopus.Release.PreviousForEnvironment.Number` | The version number of the previous release of the project to the current environment. | `1.2.2` |
| `Octopus.Release.CurrentForEnvironment.Id` | The ID of the release of the last successful deployment to the current environment. | `releases-122` |
| `Octopus.Release.CurrentForEnvironment.Number` | The version number of the release of the last successful deployment to the current environment. | `1.2.2` |
| `Octopus.Release.Git.BranchName` | The branch name the release was created from. Available for version-controlled projects. | `features/some-new-feature` |
| `Octopus.Release.Git.CommitHash` | The commit hash the release was created from. Available for version-controlled projects. | `0c708fdec272bc4446c6cabea4f0022c2b616eba` |
| `Octopus.Release.Git.Ref` | The git reference the release was created from. Available for version-controlled projects. | `refs/heads/main` |

## Release package and build information variables
 
These variables expose the build information pushed from your build server for the packages in a release. They're populated only when build information has been pushed, and they're available only in project release notes, not in deployment steps. Each variable is a collection; see [Variable substitution syntax](/docs/projects/variables/variable-substitutions/) for how to iterate and index collections.
 
| Variable | Description | Example |
| --- | --- | --- |
| `Octopus.Release.Package` | The packages, with their commits and work items, associated with the release. A collection of package objects. | `#{Octopus.Release.Package[Acme.Web].Version}` |
| `Octopus.Release.Builds` | The build and version-control details associated with the release. A collection of build objects. | `#{Octopus.Release.Builds[0].BuildUrl}` |
| `Octopus.Release.WorkItems` | The distinct work items across all packages in the release. A collection of work item objects. | `#{Octopus.Release.WorkItems[0].Id}` |

### Package properties
 
| Property | Description | Example |
| --- | --- | --- |
| `PackageId` | The ID of the package. | `#{package.PackageId}` |
| `Version` | The version of the package. | `#{package.Version}` |
| `Commits` | The commits associated with the package. A collection. | `#{package.Commits[0].CommitId}` |
| `WorkItems` | The work items associated with the package. A collection. | `#{package.WorkItems[0].Id}` |

### Commit properties
 
| Property | Description | Example |
| --- | --- | --- |
| `CommitId` | The commit ID. When using Git, this is the commit hash. | `#{commit.CommitId}` |
| `LinkUrl` | A link to the commit. | `#{commit.LinkUrl}` |
| `Comment` | The commit message. | `#{commit.Comment}` |

### Work item properties
 
| Property | Description | Example |
| --- | --- | --- |
| `Id` | The work item ID. | `#{issue.Id}` |
| `LinkUrl` | A link to the work item. | `#{issue.LinkUrl}` |
| `Description` | A description of the work item. | `#{issue.Description}` |

### Build properties
 
| Property | Description | Example |
| --- | --- | --- |
| `Packages` | A JSON array of the packages created by the build. A collection. | `#{build.Packages}` |
| `BuildUrl` | A link to the CI build. | `#{build.BuildUrl}` |
| `Branch` | The version-control branch associated with the build. | `#{build.Branch}` |
| `BuildEnvironment` | The CI server that ran the build. | `#{build.BuildEnvironment}` |
| `BuildNumber` | The build number associated with the build. | `#{build.BuildNumber}` |
| `VcsRoot` | A link to the version-control repository associated with the build. | `#{build.VcsRoot}` |
| `VcsType` | The type of version control associated with the build. | `#{build.VcsType}` |
| `VcsCommitNumber` | The commit ID associated with the build. | `#{build.VcsCommitNumber}` |
| `VcsCommitUrl` | A link to the commit associated with the build. | `#{build.VcsCommitUrl}` |

### Build package properties
 
| Property | Description | Example |
| --- | --- | --- |
| `PackageId` | The ID of the package created by the build. | `#{build.Packages[0].PackageId}` |
| `Version` | The version of the package created by the build. | `#{build.Packages[0].Version}` |

## Deployment variables
 
Deployment-level variables are drawn from the project and release being deployed, and the infrastructure being deployed to.
 
| Variable | Description | Example |
| --- | --- | --- |
| `Octopus.Acquire.MaxParallelism` | The maximum number of packages deployed concurrently to multiple targets. Default: 10. | `2` |
| `Octopus.Acquire.DeltaCompressionEnabled` | Whether delta compression is used when sending packages to targets. | `true` |
| `Octopus.Deployment.Comments` | User-provided comments on the deployment. | Signed off by Alice |
| `Octopus.Deployment.Created` | The date and time the deployment was created. | Tuesday, September 10, 1:23 PM |
| `Octopus.Deployment.CreatedBy.DisplayName` | The full name of the user who started the deployment. | Alice King |
| `Octopus.Deployment.CreatedBy.EmailAddress` | The email address of the user who started the deployment. | `alice@example.com` |
| `Octopus.Deployment.CreatedBy.Id` | The ID of the user who started the deployment. | `users-123` |
| `Octopus.Deployment.CreatedBy.Username` | The username of the user who started the deployment. | `alice` |
| `Octopus.Deployment.Error` | The error or exit code for a failed deployment. | Script returned exit code 123 |
| `Octopus.Deployment.ErrorDetail` | The error or exit code for a failed deployment, with the Octopus stack trace. | `System.IO.FileNotFoundException: file C:\Missing.txt does not exist` |
| `Octopus.Deployment.ForcePackageDownload` | Whether the package is downloaded fresh from the feed regardless of whether it's already on the target. | `False` |
| `Octopus.Deployment.Id` | The ID of the deployment. | `deployments-123` |
| `Octopus.Deployment.Name` | The name of the deployment. | Deploy to Production |
| `Octopus.Deployment.PreviousSuccessful.Id` | The ID of the previous successful deployment of this project to the target environment. | `deployments-122` |
| `Octopus.Deployment.Machines` | The IDs of the machines targeted by the deployment. | `machines-123,machines-124` |
| `Octopus.Deployment.SpecificMachines` | The specific machines targeted by the deployment, if any. | `machines-123,machines-124` |
| `Octopus.Deployment.ExcludedMachines` | The IDs of machines excluded from the deployment, usually because they were unavailable. | `machines-123,machines-124` |
| `Octopus.Deployment.Tenant.Id` | The ID of the tenant being deployed for. Not present for untenanted deployments. | `Tenants-123` |
| `Octopus.Deployment.Tenant.Name` | The name of the tenant being deployed for. Not present for untenanted deployments. | Acme Corp |
| `Octopus.Deployment.Tenant.Tags` | A comma-separated list of the tenant's tags. Not present for untenanted deployments. | Tenant type/External, Upgrade ring/Early adopter |
| `Octopus.Deployment.Trigger.Id` | The ID of the trigger that created the deployment. If several triggers apply, the ID of one of them. | `ProjectTriggers-522` |
| `Octopus.Deployment.Trigger.Name` | The name of the trigger that created the deployment. If several triggers apply, the name of one of them. | Nightly Deploy to Dev |
| `Octopus.Deployment.WorkerLeaseCap` | An opt-in cap on how many steps referencing the same package reuse a single worker before another is selected. Disabled by default; set to a number above zero to opt in. Applies to deployments and runbooks. | `5` |
| `Octopus.Deployment.Targets` | The distinct targets being deployed to across all steps. A dictionary of objects with `Id` and `Name` properties, keyed on ID. | `#{Octopus.Deployment.Targets[machines-123].Name}` |
| `Octopus.Endpoint.type.property` | Properties describing the endpoint being deployed to. | `ftp.example.com` |
| `Octopus.Environment.Id` | The ID of the environment. | `environments-123` |
| `Octopus.Environment.MachinesInRole[role]` | The machines with the specified target tag being deployed to. | `machines-123,machines-124` |
| `Octopus.Environment.Name` | The name of the environment. | Production |
| `Octopus.Environment.SortOrder` | The order applied to the environment on the dashboard and elsewhere. | `3` |
| `Octopus.Machine.Id` | The ID of the machine. | `machines-123` |
| `Octopus.Machine.Name` | The name used to register the machine in Octopus. Not the same as the hostname. | `WEBSVR01` |
| `Octopus.Machine.Roles` | The target tags associated with the machine. | `web-server,frontend` |
| `Octopus.Machine.Hostname` | The host part of the URI used to register the machine. Set only for Listening Tentacles. | `192.168.200.100` |
| `Octopus.Project.Id` | The ID of the project. | `projects-123` |
| `Octopus.Project.Name` | The name of the project. | `OctoFx` |
| `Octopus.ProjectGroup.Id` | The ID of the project group. | `project-groups-123` |
| `Octopus.ProjectGroup.Name` | The name of the project group. | Public Web Properties |
| `Octopus.Space.Id` | The ID of the space. | `Spaces-1` |
| `Octopus.Space.Name` | The name of the space. | Dev Space |
| `Octopus.Task.Argument[name]` | An argument value provided when the task was created. | `deployments-123` |
| `Octopus.Task.Id` | The ID of the task. | `server-tasks-123` |
| `Octopus.Task.Name` | The name of the task. | Deploy release 1.2.3 to Production |
| `Octopus.Task.QueueTime` | The date and time the task should be queued for execution. | Tuesday, September 10, 1:30 PM |
| `Octopus.Task.QueueTimeExpiry` | The date and time before which the task must start. | Tuesday, September 10, 2:30 PM |
| `Octopus.Tentacle.CurrentDeployment.PackageFilePath` | The path to the package file being deployed. | `C:\Octopus\Tentacle\Packages\OctoFx.1.2.3.nupkg` |
| `Octopus.Tentacle.CurrentDeployment.TargetedRoles` | The intersection of the target tags targeted by the step and those on the machine. | `web-server` |
| `Octopus.Tentacle.PreviousInstallation.CustomInstallationDirectory` | The directory the previous version of the package was deployed to. | `C:\InetPub\WWWRoot\OctoFx` |
| `Octopus.Tentacle.PreviousInstallation.OriginalInstalledPath` | The directory the previous version of the package was extracted to. | `C:\Octopus\Tentacle\Apps\Production\OctoFx\1.2.2` |
| `Octopus.Tentacle.PreviousInstallation.PackageFilePath` | The path to the previously deployed package file. | `C:\Octopus\Tentacle\Packages\OctoFx.1.2.2.nupkg` |
| `Octopus.Tentacle.PreviousInstallation.PackageVersion` | The previous version of the package deployed to the Tentacle. | `1.2.2` |
| `Octopus.Web.ProjectLink` | A path relative to the Octopus Server URL where the project can be viewed. | `/app/projects/projects-123` |
| `Octopus.Web.ReleaseLink` | A path relative to the Octopus Server URL where the release can be viewed. | `/app/releases/releases-123` |
| `Octopus.Web.DeploymentLink` | A path relative to the Octopus Server URL where the deployment can be viewed. | `/app/deployment/deployments-123` |

## Deployment change variables
 
These variables expose the changes included in a deployment, aggregated across the releases being deployed. They're available only where build information has been pushed and, for work items, an issue tracker integration is enabled. Several are JSON collections; see [Variable substitution syntax](/docs/projects/variables/variable-substitutions/) for how to iterate and index them.
 
| Variable | Description | Example |
| --- | --- | --- |
| `Octopus.Deployment.Changes` | A JSON array of release-change objects, one per release, each with its release notes and build information. | `#{Octopus.Deployment.Changes[0].Version}` |
| `Octopus.Deployment.WorkItems` | A JSON array of the distinct work items across all changes in the deployment. | `#{Octopus.Deployment.WorkItems[0].Id}` |
| `Octopus.Deployment.PackageBuildInformation` | A JSON array of the distinct package build information across all changes in the deployment. | `#{Octopus.Deployment.PackageBuildInformation[0].PackageId}` |
| `Octopus.Deployment.ChangesMarkdown` | The output of applying the project's deployment changes template, in Markdown. | `#{Octopus.Deployment.ChangesMarkdown}` |

### Release change properties
 
| Property | Description | Example |
| --- | --- | --- |
| `Version` | The release version. | `#{change.Version}` |
| `ReleaseNotes` | The release notes, in Markdown. | `#{change.ReleaseNotes}` |
| `BuildInformation` | The build information for each package in the release. A collection. | `#{change.BuildInformation[0].PackageId}` |
| `WorkItems` | The work items for the release. A collection. | `#{change.WorkItems[0].Id}` |
| `Commits` | The commits for the release. A collection. | `#{change.Commits[0].Id}` |

### Package build information properties
 
| Property | Description | Example |
| --- | --- | --- |
| `PackageId` | The ID of the package. | `#{info.PackageId}` |
| `Version` | The version of the package. | `#{info.Version}` |
| `BuildEnvironment` | The CI server that ran the build. | `#{info.BuildEnvironment}` |
| `BuildNumber` | The build number associated with the build. | `#{info.BuildNumber}` |
| `BuildUrl` | A link to the CI build. | `#{info.BuildUrl}` |
| `Branch` | The version-control branch associated with the build. | `#{info.Branch}` |
| `VcsType` | The type of version control associated with the build. | `#{info.VcsType}` |
| `VcsRoot` | A link to the version-control repository. | `#{info.VcsRoot}` |
| `VcsCommitNumber` | The commit ID associated with the build. | `#{info.VcsCommitNumber}` |
| `VcsCommitUrl` | A link to the commit associated with the build. | `#{info.VcsCommitUrl}` |
| `WorkItems` | The work items for the package. A collection. | `#{info.WorkItems[0].Id}` |
| `Commits` | The commits for the package. A collection. | `#{info.Commits[0].Id}` |

### Work item properties
 
| Property | Description | Example |
| --- | --- | --- |
| `Id` | The work item ID. | `#{workItem.Id}` |
| `LinkUrl` | A link to the work item. | `#{workItem.LinkUrl}` |
| `Source` | The issue tracker the work item came from. | `#{workItem.Source}` |
| `Description` | A description of the work item. | `#{workItem.Description}` |

 ### Commit properties
  
 | Property | Description | Example |
 | --- | --- | --- |
 | `Id` | The commit ID. | `#{commit.Id}` |
 | `LinkUrl` | A link to the commit. | `#{commit.LinkUrl}` |
 | `Comment` | The commit message. | `#{commit.Comment}` |

 ## Action variables
  
 Action-level variables are available while an action runs.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Container.Image` | The name of the container image being deployed. | `OctoFx-RateService` |
 | `Octopus.Action.Id` | The ID of the action. | `85287bef-fe6c-4eb7-beef-74f5e5a6b5b0` |
 | `Octopus.Action.IsSkipped` | Whether the action was skipped in the current deployment. Can be `True` or empty. | `True` |
 | `Octopus.Action.Manual.Instructions` | The instructions provided for a manual step. | Don't break anything |
 | `Octopus.Action.Manual.ResponsibleTeamIds` | The teams responsible for completing a manual step. | `teams-123,teams-124` |
 | `Octopus.Action.MaxParallelism` | The maximum number of targets an action runs on concurrently, and the maximum number of steps that run in parallel. Some built-in steps ignore this value. Default: 10. | `5` |
 | `Octopus.Action.Name` | The name of the action. | Website |
 | `Octopus.Action.Number` | The sequence number of the action in the deployment process. | `5` |
 | `Octopus.Action.Package.CustomInstallationDirectory` | The specific directory the package is copied to after extraction, if set. | `C:\InetPub\WWWRoot\OctoFx` |
 | `Octopus.Action.Package.CustomInstallationDirectoryShouldBePurgedBeforeDeployment` | Whether all files in the custom installation directory are deleted before deployment. | `False` |
 | `Octopus.Action.Package.DownloadOnTentacle` | Whether the package is downloaded by the Tentacle rather than pushed by the Octopus Server. | `False` |
 | `Octopus.Action.Package.TreatConfigTransformationWarningsAsErrors` | Whether warnings in .NET configuration transformations fail the deployment. | `True` |
 | `Octopus.Action.Package.IgnoreConfigTransformationErrors` | Whether errors in .NET configuration transformations are treated as informational rather than failing the deployment. | `False` |
 | `Octopus.Action.Package.IgnoreVariableReplacementErrors` | Whether errors in variable replacement are treated as a warning rather than failing the deployment. | `False` |
 | `Octopus.Action.Package.InstallationDirectoryPath` | The directory the package was installed to. Not available before extraction. | `C:\InetPub\WWWRoot\OctoFx` |
 | `Octopus.Action.Package.FeedId` | The ID of the feed the package was pulled from. | `feeds-123` |
 | `Octopus.Action.Package.PackageId` | The ID of the package being deployed. | `OctoFx.RateService` |
 | `Octopus.Action.Package.PackageVersion` | The version of the package being deployed. | `1.2.3` |
 | `Octopus.Action.Package.SkipIfAlreadyInstalled` | Whether re-deployment is skipped when the package version is already on the machine. | `False` |
 | `Octopus.Action.Script.ScriptBody` | The script being run in a script step. | `Write-Host 'Hello'` |
 | `Octopus.Action.Script.Syntax` | The syntax of the script being run in a script step. | PowerShell |
 | `Octopus.Action.Script.CSharp.NuGetSource` | The NuGet source used by the dotnet executor for C# script steps. | `https://my-nuget-server/nuget` |
 | `Octopus.Action.SkipRemainingConventions` | Set as an output variable to finish the action without running further conventions or scripts. | `True` |
 | `Octopus.Action.TargetRoles` | The machine target tags targeted by the action. | `web-server,frontend` |
 | `Octopus.Action.Template.Id` | The ID of the step template the action is based on, if any. | `action-templates-123` |
 | `Octopus.Action.Template.Version` | The version of the step template in use, if any. | `123` |
 | `Octopus.Action.Status.Error` | A description of the error, if the action failed. | The server could not be contacted |
 | `Octopus.Action.Status.ErrorDetail` | A full description of the error, if the action failed. | `System.Net.SocketException: The server could not be contacted` |
 | `Octopus.Action.SubstituteInFiles.EnableNoMatchWarning` | Whether a warning is logged when no files match a glob pattern in Substitute Variables in Files. | `False` |

 ### Package reference variables
  
 When you reference a package in a custom script, that package contributes its own variables, available per package. The examples below assume a package reference named `Acme`.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Package[Acme].PackageId` | The package ID. | `Acme` |
 | `Octopus.Action.Package[Acme].FeedId` | The feed ID. | `feeds-123` |
 | `Octopus.Action.Package[Acme].PackageVersion` | The version of the package included in the release. | `1.4.0` |
 | `Octopus.Action.Package[Acme].OriginalPath` | The location of the package file before any actions are taken. | `C:\Octopus\Packages\Spaces-1\feeds-builtin\Acme\Acme.1.4.0.zip` |
 | `Octopus.Action.Package[Acme].ExtractedPath` | The absolute path to the extracted directory, if the package is extracted. | `C:\Octopus\Work\20210821060923-7117-31\Acme` |
 | `Octopus.Action.Package[Acme].PackageFilePath` | The absolute path to the package file, if the package isn't extracted. | `C:\Octopus\Work\20210821060923-7117-31\Acme.zip` |
 | `Octopus.Action.Package[Acme].PackageFileName` | The name of the package file, if the package isn't extracted. | `Acme.zip` |

 ### Docker image package variables
  
 When the package reference is a Docker image, these additional variables are contributed.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Package[Acme].Image` | The fully qualified image name. | `index.docker.io/Acme:1.4.0` |
 | `Octopus.Action.Package[Acme].Registry` | The URI of the registry the image was acquired from. | `index.docker.io` |
 | `Octopus.Action.Package[Acme].Version` | The version of the image included in the release. | `1.4.0` |
 | `Octopus.Action.Package[Acme].Feed.UserName` | The username for the feed the image was acquired from, if the feed uses credentials. | Alice |
 | `Octopus.Action.Package[Acme].Feed.Password` | The password for the feed the image was acquired from, if the feed uses credentials. | `Password01!` |

 ## Azure variables
  
 These variables are available during Azure deployment actions.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Azure.CertificateThumbprint` | The thumbprint of the X.509 certificate used to authenticate with the target Azure subscription. | `86B5C8E5553981FED961769B2DA3028C619596AC` |
 | `Octopus.Action.Azure.PackageExtractionPath` | The temporary path Azure packages are extracted to during deployment, if set. | `Z:\Temp\packages\` |
 | `Octopus.Action.Azure.SubscriptionId` | The Azure subscription ID targeted by the action. | `8affaa7d-3d74-427c-93c5-2d7f6a16e754` |
 | `Octopus.Action.Azure.ResourceGroupDeploymentName` | Overrides the auto-generated resource group deployment name when deploying a resource group. | `my-resource-group-deployment-name` |

 ### Azure Cloud Service variables
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Azure.CloudServiceConfigurationFileRelativePath` | The relative path to the `.cscfg` file, if set. Falls back to `ServiceConfiguration.{Environment}.cscfg` or `ServiceConfiguration.Cloud.cscfg`. | `ServiceConfiguration.Custom.cscfg` |
 | `Octopus.Action.Azure.CloudServiceName` | The name of the cloud service targeted by the action. | `my-cloud-service-web` |
 | `Octopus.Action.Azure.CloudServicePackageExtractionDisabled` | Whether Octopus pushes the `.cspkg` file to Azure as-is without unpacking it. | `True` |
 | `Octopus.Action.Azure.CloudServicePackagePath` | The path of the `.cspkg` file used by the action. | `Z:\Temp\packages\my-cloud-service-web.cspkg` |
 | `Octopus.Action.Azure.LogExtractedCspkg` | Whether the contents of the extracted `.cspkg` are written to the log. | `True` |
 | `Octopus.Action.Azure.Slot` | The slot of the cloud service targeted by the action. | Staging |
 | `Octopus.Action.Azure.StorageAccountName` | The Azure storage account `.cspkg` files are uploaded to. | `my-storage-account` |
 | `Octopus.Action.Azure.SwapIfPossible` | Whether the action attempts a VIP swap instead of deploying directly into the targeted slot. | `True` |
 | `Octopus.Action.Azure.UploadedPackageUri` | The storage URI of the `.cspkg` file to be deployed. | `https://my-storage-account/container/my-cloudservice.web.cspkg` |
 | `Octopus.Action.Azure.UseCurrentInstanceCount` | Whether the action keeps the current instance count rather than reverting to the `.cspkg` definition. | `True` |
 | `Octopus.Action.Azure.DeploymentLabel` | The custom deployment label used for the Azure cloud service deployment, if set. | my custom label for build 3.x.x |

 ### Azure Web App variables
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Azure.WebAppName` | The name of the web app targeted by the deployment. | `my-web-app` |
 | `Octopus.Action.Azure.DeploymentSlot` | The name of the web app slot targeted by the deployment. | `staging` |
 | `Octopus.Action.Azure.ResourceGroupName` | The name of the resource group targeted by the deployment. | `MyResourceGroup` |
 | `Octopus.Action.Azure.RemoveAdditionalFiles` | Whether Web Deploy deletes files at the destination that aren't in the source package. | `True` |
 | `Octopus.Action.Azure.PreserveAppData` | Whether Web Deploy skips delete operations in the `App_Data` directory. | `True` |
 | `Octopus.Action.Azure.AppOffline` | Whether Web Deploy takes the app domain down by adding an `app_offline.html` file in the site root. | `True` |

 ## Output variables
  
 Output variables are collected while a step runs and made available to later steps.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action[name].Output.property` | The result of calling `Set-OctopusVariable` during an action, exposed for use in other actions. | `Octopus.Action[Website].Output.WarmUpResponseTime` |
 | `Octopus.Action[name].Output.Manual.Notes` | Notes provided by the user who completed a manual step. | Signed off by Alice |
 | `Octopus.Action[name].Output.Package.InstallationDirectoryPath` | The directory the package was installed to. | `C:\Octopus\Tentacle\Apps\Production\MyApp\1.2.3` |
 | `Octopus.Action[name].Output.Manual.ResponsibleUser.DisplayName` | The full name of the user who completed the manual step. | Alice King |
 | `Octopus.Action[name].Output.Manual.ResponsibleUser.EmailAddress` | The email address of the user who completed the manual step. | `alice@example.com` |
 | `Octopus.Action[name].Output.Manual.ResponsibleUser.Id` | The ID of the user who completed the manual step. | `users-123` |
 | `Octopus.Action[name].Output.Manual.ResponsibleUser.Username` | The username of the user who completed the manual step. | `alice` |
 | `Octopus.Action[name].Output.OctopusAzureCloudServiceDeploymentID` | The ID of the completed Azure cloud service deployment. | `c9f52da2b00a4313b3b64bb2ad0f409f` |
 | `Octopus.Action[name].Output.OctopusAzureCloudServiceDeploymentUrl` | The URL of the completed Azure cloud service deployment. | `http://c9f52da2b00a4313b3b64bb2ad0f409f.cloudapp.net/` |

 ## Step variables
  
 Step-level variables are available while a step runs.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Step.Id` | The ID of the step. | `80b3ad09-eedf-40d6-9b66-cf97f5c0ffee` |
 | `Octopus.Step.Name` | The name of the step. | Website |
 | `Octopus.Step.Number` | The number of the step. | `2` |
 | `Octopus.Step.Status.Code` | A code describing the current status of the step. | `Succeeded` |
 | `Octopus.Step.Status.Error` | A description of the error, if the step failed. | The server could not be contacted |
 | `Octopus.Step.Status.ErrorDetail` | A full description of the error, if the step failed. | `System.Net.SocketException: The server could not be contacted` |
  
 The status codes returned by `Octopus.Step.Status.Code` are `Pending`, `Skipped`, `Abandoned`, `Canceled`, `Running`, `Succeeded`, and `Failed`.

 ## Agent variables
  
 Agent-level variables describe the deployment agent or Tentacle the deployment runs on.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Tentacle.Agent.ApplicationDirectoryPath` | The directory the agent installs packages under. | `C:\Octopus\Tentacle\Apps` |
 | `Octopus.Tentacle.Agent.InstanceName` | The instance name the agent runs under. | `Tentacle` |
 | `Octopus.Tentacle.Agent.ProgramDirectoryPath` | The directory containing the agent's own executables. | `C:\Program Files\Octopus Deploy\Tentacle` |
 | `Octopus.Agent.ProgramDirectoryPath` | The directory containing the server's or Tentacle's executables, depending on where the step runs. | `C:\Program Files\Octopus Deploy\Octopus` |

 ## Worker pool variables
  
 When a step runs on a worker, these variables are available.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.WorkerPool.Id` | The ID of the pool. | `WorkerPools-1` |
 | `Octopus.WorkerPool.Name` | The name of the pool. | Default Worker Pool |

 ## Server variables
  
 Server-level variables describe the Octopus Server the deployment runs on.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Web.BaseUrl` | The default URL the server API can be accessed at, based on the server's listen prefixes. May not be suitable behind a load balancer or reverse proxy. | `https://my-octopus` |
 | `Octopus.Web.ServerUri` | The default URL the server portal can be accessed at, as configured in Configuration ➜ Nodes. | `https://my-octopus` |

 ## Runbook variables
  
 These variables are available during a runbook run.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Runbook.Id` | The ID of the runbook. | `Runbooks-123` |
 | `Octopus.Runbook.Name` | The name of the runbook. | Restore Database |
 | `Octopus.RunbookRun.Created` | The date and time the runbook was run. | Friday, March 13, 2020 6:23:38 AM |
 | `Octopus.RunbookRun.CreatedUtc` | The date and time the runbook was run, in UTC. | `3/13/20 6:23:38 AM +00:00` |
 | `Octopus.RunbookRun.Git.BranchName` | The branch name, if the run was created from a branch. | `branch-abc` |
 | `Octopus.RunbookRun.Git.CommitHash` | The commit hash used to create the run, for a version-controlled runbook. | `14677f79e59df2a55e3904a7020fd14e96b8a1e9` |
 | `Octopus.RunbookRun.Git.Ref` | The full git ref used to create the run, for a version-controlled runbook. | `refs/heads/branch-abc` |
 | `Octopus.RunbookRun.Git.TagName` | The tag name, if the run was created for a tag. | `v1.0.234` |
 | `Octopus.RunbookRun.Id` | The ID of the run. | `RunbookRuns-123` |
 | `Octopus.RunbookRun.Name` | The name of the run. | Run on Production |
 | `Octopus.RunbookSnapshot.Id` | The ID of the snapshot being run. | `RunbookSnapshots-123` |
 | `Octopus.RunbookSnapshot.Name` | The name of the snapshot. | Snapshot EXAMPLE3 |
 | `Octopus.RunbookSnapshot.Notes` | Notes associated with the snapshot, in Markdown. | Restores the database |
 | `Octopus.Web.RunbookSnapshotLink` | A path relative to the Octopus Server URL where the runbook snapshot can be viewed. | `/app/snapshots/runbookSnapshots-123` |
 | `Octopus.Web.RunbookRunLink` | A path relative to the Octopus Server URL where the runbook run can be viewed. | `/app/runs/runbookRuns-123` |

 ## Kubernetes variables
  
 This variable controls Kubernetes CLI output during Kubernetes deployment actions.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Action.Kubernetes.LogCliOutputAsInfo` | Whether successful output from Kubernetes CLI tools (`kubectl`, `helm`, `aws`, `az`, `gcloud`) is logged at the Info level instead of Verbose. | `True` |

 ## User-modifiable settings
  
 You define these variables in your project to change how Octopus behaves. Unlike the variables above, you set these values and Octopus reads them.
  
 | Variable | Description | Example |
 | --- | --- | --- |
 | `Octopus.Acquire.MaxParallelism` | The maximum number of NuGet packages downloaded at once when acquiring packages. | `3` |
 | `Octopus.Action.MaxParallelism` | The maximum number of targets an action runs on concurrently, and the maximum number of steps that run in parallel. Default: 10. | `5` |
 | `OctopusPrintVariables` | Set to `True` to have Tentacle print the value of all variables passed to it. | `True` |
 | `OctopusPrintEvaluatedVariables` | Set to `True` to have Tentacle print the value of all variables passed to it after evaluation. | `True` |
 | `OctopusSkipFreeDiskSpaceCheck` | Set to `True` to skip the free disk space check when deploying packages. | `True` |
 | `OctopusFreeDiskSpaceOverrideInMegaBytes` | The amount of free disk space, in megabytes, to check for, overriding the 500 MB default. | `100` |
 | `OctopusShouldFailDeploymentOnSubstitutionFails` | Set to `True` to fail the deployment if any variable substitution fails. | `True` |
 | `Octopus.Action.PowerShell.CustomPowerShellVersion` | The version Windows PowerShell scripts are invoked with (2.0, 3.0, 4.0, 5.0). For PowerShell Core, the value must match a directory in `%PROGRAMFILES%\PowerShell`. | `2.0` |
 | `OctopusDeleteScriptsOnCleanup` | Set to `False` to keep packaged PreDeploy, Deploy, and PostDeploy scripts in the target directory. | `False` |
 | `Octopus.Action.Script.SuppressEnvironmentLogging` | Set to `True` to suppress script environment-variable logging. | `True` |
 | `Octopus.Action.PowerShell.ExecuteWithoutProfile` | Set to `True` to skip the Tentacle service account's PowerShell profile when running PowerShell steps. | `True` |
 | `OctopusSuppressDuplicateVariableWarning` | Set to `True` to log the duplicate-variable message as verbose instead of a warning. | `True` |
 | `Octopus.Action.Package.RunScripts` | Set to `False` to prevent scripts inside packages from running. | `True` |
 | `Octopus.Calamari.CopyWorkingDirectoryIncludingKeyTo` | A file path the Calamari working directory is copied to, including the one-time key used to decrypt sensitive variables. | `c:\temp\octopus-debug` |
 | `Octopus.Deployment.WorkerLeaseCap` | An opt-in cap on how many steps referencing the same package reuse a single worker. Disabled by default; set above zero to opt in. Applies to deployments and runbooks. | `5` |
 | `Octopus.Task.ConcurrencyTag` | Runs one task at a time per concurrency tag. Set to run tasks in parallel instead of serial, or in serial instead of parallel. | `#{Octopus.Deployment.Tenant.Id}/#{Octopus.Project.Id}/#{Octopus.Environment.Id}` |
  
 ## Version notes
  
 Some variables are available only from a specific version of Octopus. This topic lists those variables and the version each became available in.
  
 | Variable | Available from |
 | --- | --- |
 | `Octopus.Release.Git.BranchName`, `Octopus.Release.Git.CommitHash`, `Octopus.Release.Git.Ref` | Octopus 2021.3 |
 | `Octopus.Web.ServerUri` | Octopus 2019.4.0 |
 | `Octopus.Deployment.Tenant.Id`, `Octopus.Deployment.Tenant.Name`, `Octopus.Deployment.Tenant.Tags` | Octopus 3.4 |
 | `OctopusShouldFailDeploymentOnSubstitutionFails` | Octopus 2025.1.0 |

 ## Related links
  
 - [Variable substitution syntax](/docs/projects/variables/variable-substitutions/)
 - [Variable filters](/docs/projects/variables/variable-filters/)
 - [Custom scripts](/docs/deployments/custom-scripts)
