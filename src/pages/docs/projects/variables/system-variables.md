---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-09-20
title: System variables
description: System variables are variables provided by Octopus that can be used in your deployments.
navOrder: 20
---

This page lists built-in [variables](/docs/projects/variables/) provided by Octopus that can be used in your deployment [custom scripts](/docs/deployments/custom-scripts).

Most of the variables listed here are available in modern versions of Octopus and Calamari. However, some are only available from a specific version. Where this is the case, the version will be noted alongside the variable.

:::div{.warning}
**All variables are strings**
Note that when evaluating values, **all Octopus variables are strings** even if they look like numbers or other data types.
:::

## Release {#release}

Release-level variables are drawn from the project and release being created.

`Octopus.Release.Id`

The ID of the release.

Example: *releases-123*

`Octopus.Release.Number`

The version number of the release.

Example: *1.2.3*

`Octopus.Release.Notes`

Release notes associated with the release, in Markdown format.

Example: *Fixes bugs 1, 2 & 3*

`Octopus.Release.Created`

The date and time at which the release was created.

Example: *Tuesday 10th September 1:23 PM*

### Release package build information {#release-package-build-information}

`Octopus.Release.Package`

Packages, including changes, associated with the release. See below. This is a collection.

`Octopus.Release.Builds`

Build and version control details associated with the release. This is a collection.

:::div{.hint} 

The `Octopus.Release.Package` and `Octopus.Release.Builds` variables:

* will only be populated if [build information](/docs/packaging-applications/build-servers/build-information) has been pushed from the build server.  
* is only available to be used by the project [release notes](/docs/releases/release-notes), it is not accessible from the project deployment steps.

:::

#### Octopus.Release.Package details

The `Octopus.Release.Package` variable is a collection of `Package` objects based on the following structures:

```csharp
public class Package
{
  public string PackageId { get; set; }
  public string Version { get; set; }
  public WorkItemLink[] WorkItems { get; set; }
  public Commit[] Commits { get; set; }
}

public class WorkItemLink
{
    public string Id { get; set; }
    public string LinkUrl { get; set; }
    public string Description { get; set; }
}

public class Commit
{
    public string CommitId { get; set; }
    public string LinkUrl { get; set; }
    public string Comment { get; set; }
}
```

The packages in a release are available as a collection which can be [iterated over](/docs/projects/variables/variable-substitutions/#VariableSubstitutionSyntax-Repetition).  e.g.

```
#{each package in Octopus.Release.Package}
    This release contains #{package.PackageId} #{package.Version}
#{/each}
```

A particular package can be selected by indexing on the package ID:

```
#{Octopus.Release.Package[Acme.Web].Version}
```

The variables available for packages are:

| Name | Example|
| -------------------- | -------|
|`PackageId`| `#{package.PackageId}` |
|`Version`| `#{package.Version}` |
|`Commits`| This is a collection.  See below. |
|`WorkItems`| This is a collection.  See below. |

On each package, the commits associated with that package are available as a collection which can be iterated over. e.g.:

```
#{each package in Octopus.Release.Package}
#{each commit in package.Commits}
- [#{commit.CommitId}](#{commit.LinkUrl}) - #{commit.Comment}
#{/each}
#{/each}
```

A particular commit can be selected by indexing on the commit ID (when using git the commit ID is the commit hash):

```
package.Commits[685afd4161d085e6e5f56a66e72e2298e402b114].Comment
```

The variables available for commits are:

| Name | Example|
| -------------------- | -------|
|`CommitId`| `#{commit.CommitId}` |
|`LinkUrl`| `#{commit.LinkUrl}` |
|`Comment`| `#{commit.Comment}` |

If the Octopus instance has one or more of the [Issue Tracker integrations](/docs/releases/issue-tracking) enabled, the commit messages will be parsed for issues. Any issues found will be displayed with the build information, and also available as variables:

```
#{each issue in package.WorkItems}
- [#{issue.Id}](#{issue.LinkUrl})
#{/each}
```

A particular issue can be selected by indexing on the ID:

```
package.WorkItems[4465].LinkUrl
```

The variables available for issues are:

| Name | Example|
| -------------------- | -------|
|`Id`| `#{issue.Id}` |
|`LinkUrl`| `#{issue.LinkUrl}` |

There is also a distinct list of issues across all packages available in:

```
#{each workItem in Octopus.Release.WorkItems}
- [#{workItem.Id}](#{workItem.LinkUrl}) - #{workItem.Description}
#{/each}
```

#### Octopus.Release.Builds details

The `Octopus.Release.Builds` variable is a collection of Build objects based on the following structures:

```csharp
public class Build
{
  public BuildPackage[] Packages { get; set; }
  public string BuildUrl { get; set; }
  public string Branch { get; set; }
  public string BuildEnvironment { get; set; }
  public string BuildNumber { get; set; }
  public string VcsRoot { get; set; }
  public string VcsType { get; set; }
  public string VcsCommitNumber { get; set; }
  public string VcsCommitUrl { get; set; }
}

public class BuildPackage
{
  public string PackageId { get; set; }
  public string Version { get; set; }
}
```

The builds in a release are available as a collection which can be [iterated over](/docs/projects/variables/variable-substitutions/#VariableSubstitutionSyntax-Repetition).  e.g.

```
#{each build in Octopus.Release.Builds}
    This release contains resources contributed by the build #{build.BuildUrl}
#{/each}
```

Builds have a zero-based integer index, meaning the first build can be selected at index 0:

```
Octopus.Release.Builds[0].BuildUrl
```

The variables available for builds are:

`Packages`

A JSON array with the packages created by a build.

Example: `#{build.Packages}`

`BuildUrl`

A link to the CI build.

Example: `#{build.BuildUrl}`

`Branch`

The VCS branch associated with the build.

Example: `#{build.Branch}`

`BuildEnvironment`

The CI server that executed the build.

Example: `#{build.BuildEnvironment}`

`BuildNumber`

The build number associated with the build.

Example: `#{build.BuildNumber}`

`VcsRoot`

A link to the VCS repository associated with the build.

Example: `#{build.VcsRoot}`

`VcsType`

The type of VCS associated with the build (e.g. git).

Example: `#{build.VcsType}`

`VcsCommitNumber`

The VCS commit ID associated with the build.

Example: `#{build.VcsCommitNumber}`

`VcsCommitUrl`

A link to the commit associated with the build.

Example: `#{build.VcsCommitUrl}`

The variables available for build packages are:

`PackageId`

The ID of the package created by the build.

Example: `#{build.Packages[0].PackageId}`

`Version`

The version of the package created by the build.

Example: `#{build.Packages[0].Version}`

### Release Branch information {#release-branch-information}

For projects that have [version control](/docs/projects/version-control) enabled, information about the branch and commit from which the release was created is also available.

 `Octopus.Release.Git.BranchName`
 
 The branch name. This variable was added in Octopus **2021.3.0**.
 
 Example: *features/some-new-feature*

 `Octopus.Release.Git.CommitHash`
 
 The commit hash. This variable was added in Octopus **2021.3.0**.
 
 Example: *0c708fdec272bc4446c6cabea4f0022c2b616eba*

 `Octopus.Release.Git.Ref`
 
 The git reference. This variable was added in Octopus **2021.3.0**.
 
 Example: *Version 1*

## Deployment

Deployment-level variables are drawn from the project and release being deployed.

`Octopus.Acquire.MaxParallelism`

This variable limits the maximum number of packages that can be concurrently deployed to multiple targets.

Default: *10*

Example: *2*

`Octopus.Acquire.DeltaCompressionEnabled`

Toggle whether delta compression is enabled when sending packages to targets.

Example: *true*

`Octopus.Deployment.Comments`

User-provided comments on the deployment.

Example: *Signed off by Alice*

`Octopus.Deployment.Created`

The date and time at which the deployment was created.

Example: *Tuesday 10th September 1:23 PM*

`Octopus.Deployment.CreatedBy.DisplayName`

The full name of the user who initiated the deployment.

Example: *Alice King*

`Octopus.Deployment.CreatedBy.EmailAddress`

The email address of the user who initiated the deployment | *[alice@example.com](mailto:alice@example.com)*|

`Octopus.Deployment.CreatedBy.Id`

The ID of the user who initiated the deployment.

Example: *users-123*

`Octopus.Deployment.CreatedBy.Username`

The username of the user who initiated the deployment.

Example: *alice*

`Octopus.Deployment.Error`

This variable outputs the error/exit code for a failed deployment. [See here](/docs/projects/variables/system-variables).

Example: *Script returned exit code 123*

`Octopus.Deployment.ErrorDetail`

The error/exit code for the deployment along with the Octopus stack trace. [See here](/docs/projects/variables/system-variables)

Example: *System.IO.FileNotFoundException: file C:\Missing.txt does not exist (at...)*|

`Octopus.Deployment.ForcePackageDownload`

If true, the package will be freshly downloaded from the feed/repository regardless of whether it is already present on the endpoint *(Boolean)*.

Example: *False*

`Octopus.Deployment.Id`

The ID of the deployment.

Example: *deployments-123*

`Octopus.Deployment.Name`

The name of the deployment.

Example: *Deploy to Production*

`Octopus.Deployment.PreviousSuccessful.Id`

The ID of the previous successful deployment of this project in the target environment.

Example: *deployments-122*

`Octopus.Deployment.Machines`

Ids of machines being targeted by the deployment.

Example: *machines-123,machines-124*

`Octopus.Deployment.SpecificMachines`

Specific machines being targeted by the deployment, if any *(List)*.

Example: *machines-123,machines-124*

`Octopus.Deployment.ExcludedMachines`

Ids of machines that have been excluded from the deployment (generally for being unavailable).

Example: machines-123,machines-124

`Octopus.Deployment.Tenant.Id`

The ID of the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present.

Example: *Tenants-123*

`Octopus.Deployment.Tenant.Name`

The name of the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present.

Example: *Acme Corp*

`Octopus.Deployment.Tenant.Tags`

Comma delimited list of tags that belong the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present.

Example: *Tenant type/External, Upgrade ring/Early adopter*

`Octopus.Deployment.Trigger.Id`

The ID of the Trigger that created the deployment.  It is possible for a deployment to be triggered due to multiple triggers. In this case, the variable will contain the ID of _one_ of the triggers.

Example: *ProjectTriggers-522*

`Octopus.Deployment.Trigger.Name`

The name of the Trigger that created the deployment. It is possible for a deployment to be triggered due to multiple triggers. In this case, the variable will contain the name of _one_ of the triggers.

*Nightly Deploy to Dev*

`Octopus.Deployment.WorkerLeaseCap`

This is an opt-in variable to help distribute multiple steps referencing the same package (including container) across a worker pool. By setting this, a worker will be reused for steps up to the cap, after which another worker will be selected and reused in the same way. If all workers have reached the cap, additional steps will be spread out evenly. By default this behavior is disabled, and the same worker will be reused for all steps referencing the same package. Opt in by setting the variable to a number higher than 0.

Example: `1` - achieves a similar effect to round robin.  
Example: `5` - a balance between reducing package transfer and distributing load.

Note: This value applies to both deployment processes and runbooks, as long as it's scoped to the particular scenario.

`Octopus.Endpoint.\_type\_.\_property\_`

Properties describing the endpoint being deployed.

Example: *ftp.example.com*

`Octopus.Environment.Id`

The ID of the environment.

Example: *environments-123*

`Octopus.Environment.MachinesInRole[\_role\_]`

Lists the machines in a specified role being deployed to.

Example: *machines-123,machines-124*

`Octopus.Environment.Name`

The name of the environment.

Example: *Production*

`Octopus.Environment.SortOrder`

The ordering applied to the environment when it is displayed on the dashboard and elsewhere.

Example: *3*

`Octopus.Machine.Id`

The ID of the machine.

Example: *machines-123*

`Octopus.Machine.Name`

The name that was used to register the machine in Octopus. Not the same as *Hostname*.

Example: *WEBSVR01*

`Octopus.Machine.Roles`

The roles applied to the machine *(List)*.

Example: *web-server,frontend*

`Octopus.Machine.Hostname`

The host part of the URI that was used to register the machine, could be an IP, hostname depending on what was supplied. Only set for Listening Tentacles.

Example: Database01, Database01.local, 192.168.200.100

`Octopus.Project.Id`

The ID of the project.

Example: *projects-123*

`Octopus.Project.Name`

The name of the project.

Example: *OctoFx*

`Octopus.ProjectGroup.Id`

The ID of the project group.

Example: *project-groups-123*

`Octopus.ProjectGroup.Name`

The name of the project group.

Example: *Public Web Properties*

`Octopus.Release.Channel.Name`

The Channel name associated with the release.

Example: *2.x Feature Branch*

`Octopus.Release.Notes`

Release notes associated with the release, in Markdown format.

Example: *Fixes bugs 1, 2 & 3*

`Octopus.Release.Number`

The version number of the release.

Example: *1.2.3*

`Octopus.Release.Id`

The ID of the release.

Example: *releases-123*

`Octopus.Release.Previous.Id`

The ID of the last release of the project.

Example: *releases-122*

`Octopus.Release.Previous.Number`

The version number of the last release of the project.

Example: *1.2.2*

`Octopus.Release.PreviousForEnvironment.Id`

The ID of the last release of the project to the current environment.

Example: *releases-122*

`Octopus.Release.PreviousForEnvironment.Number`

The version number of the last release of the project to the current environment.

Example: *1.2.2*

`Octopus.Release.CurrentForEnvironment.Id`

The ID of the release of the last successful deployment to the current environment.

Example: *releases-122*

`Octopus.Release.CurrentForEnvironment.Number`

The version number of the release the last successful deployment to the current environment.

Example: *1.2.2*

`Octopus.Release.Created`

The date and time at which the release was created.

Example: *Tuesday 10th September 1:23 PM*

`Octopus.Space.Id`

The ID of the Space.

Example: *Spaces-1*

`Octopus.Space.Name`

The name of the Space .

Example: *Dev Space*

`Octopus.Task.Argument[_name_]`

Argument values provided when creating the task.

Example: *deployments-123*

`Octopus.Task.Id`

The ID of the task.

Example: *server-tasks-123*

`Octopus.Task.Name`

The name of the task.

Example: *Deploy release 1.2.3 to Production*

`Octopus.Task.QueueTime`

The date and time the task should be queued for execution.

Example: *Tuesday 10th September 1:30 PM*

`Octopus.Task.QueueTimeExpiry`

The date and time before which the task must start.

Example: *Tuesday 10th September 2:30 PM*

`Octopus.Tentacle.CurrentDeployment.PackageFilePath`

The path to the package file being deployed.

Example: *C:\Octopus\Tentacle\Packages\OctoFx.1.2.3.nupkg*

`Octopus.Tentacle.CurrentDeployment.TargetedRoles`

The intersection of the roles targeted by the step, and those applied to the machine.

Example: *web-server*

`Octopus.Tentacle.PreviousInstallation.CustomInstallationDirectory`

The directory into which the previous version of the package was deployed.

Example: *C:\InetPub\WWWRoot\OctoFx*

`Octopus.Tentacle.PreviousInstallation.OriginalInstalledPath`

The directory into which the previous version of the package was extracted.

Example: *C:\Octopus\Tentacle\Apps\Production\OctoFx\1.2.2*

`Octopus.Tentacle.PreviousInstallation.PackageFilePath`

The path to the package file previously deployed.

Example: *C:\Octopus\Tentacle\Packages\OctoFx.1.2.2.nupkg*

`Octopus.Tentacle.PreviousInstallation.PackageVersion`

The previous version of the package that was deployed to the Tentacle.

Example: *1.2.3*

`Octopus.Web.ProjectLink`

A path relative to the Octopus Server URL at which the project can be viewed.

Example: */app/projects/projects-123*

`Octopus.Web.ReleaseLink`

A path relative to the Octopus Server URL at which the release can be viewed.

Example: */app/releases/releases-123*

`Octopus.Web.DeploymentLink`

A path relative to the Octopus Server URL at which the deployment can be viewed.

Example: */app/deployment/deployments-123*

### Deployment changes {#deployment-changes}

`Octopus.Deployment.Changes`

A JSON array of `ReleaseChanges` objects. These can be iterated over and the properties accessed using regular Octopus variable expressions (see below). This will be JSON (see below).

`Octopus.Deployment.WorkItems`

The distinct list of issues across all [changes in the deployment](/docs/releases/deployment-notes/). This is a JSON array of `WorkItemLink` objects, defined below. This data will be only be available where [build information](/docs/packaging-applications/build-servers/build-information/) has been pushed and an [issue tracker integration](/docs/releases/issue-tracking) is enabled. This will be JSON (see below).

`Octopus.Deployment.PackageBuildInformation`

The distinct list of package [build information](/docs/packaging-applications/build-servers/build-information/) across all [changes in the deployment](/docs/releases/deployment-notes/). This is a JSON array of `ReleasePackageVersionBuildInformation` objects, defined below. This data will be only be available where [build information](/docs/packaging-applications/build-servers/build-information) has been pushed. This will be JSON (see below).

The JSON structure contained in the `Octopus.Deployment.Changes` variables is an array of `ReleaseChanges` objects matching the following C# classes:

```csharp
public class ReleaseChanges
{
    public string Version { get; set; }
    public string ReleaseNotes { get; set; }
    public ReleasePackageVersionBuildInformation[] BuildInformation { get; set; }
    public WorkItemLink[] WorkItems { get; set; }
    public CommitDetails[] Commits { get; set; }
}

public class ReleasePackageVersionBuildInformation
{
    public string PackageId { get; set; }
    public string Version { get; set; }
    public string BuildEnvironment { get; set; }
    public string BuildNumber { get; set; }
    public string BuildUrl { get; set; }
    public string Branch { get; set; }
    public string VcsType { get; set; }
    public string VcsRoot { get; set; }
    public string VcsCommitNumber { get; set; }
    public string VcsCommitUrl { get; set; }
    public WorkItemLink[] WorkItems { get; set; }
    public CommitDetails[] Commits { get; set; }
}

public class WorkItemLink
{
    public string Id { get; set; }
    public string LinkUrl { get; set; }
    public string Source { get; set; }
    public string Description { get; set; }
}

public class CommitDetails
{
    public string Id { get; set; }
    public string LinkUrl { get; set; }
    public string Comment { get; set; }
}
```
There is an entry per release and it includes the release notes (**in markdown format**) and the build information for each of the packages in that release.

**Example:** The following iterates the changes in the deployment, printing the release version and the issues contained.

```
#{each change in Octopus.Deployment.Changes}
    #{change.Version}
    #{each issue in change.WorkItems}
        #{issue.Id} - #{issue.LinkUrl}
    #{/each}
#{/each}
```

### Deployment changes templates {#deployment-changes-templates}

`Octopus.Deployment.ChangesMarkdown`

The output of applying the project's deployment changes template. This will be markdown.

`Octopus.Deployment.Targets`

The distinct targets being deployed to.

This provides a dictionary of objects with ID and Name properties, keyed on ID. This is a distinct list across all steps in the deployment process.

## Action {#action}

Action-level variables are available during execution of an action. Indexer notion such as `Octopus.Action[Website].TargetRoles` can be used to refer to values for different actions.

`Octopus.Action.Container.Image`

The name of the container image being deployed.

Example: *OctoFx-RateService*

`Octopus.Action.Id`

The ID of the action.

Example: *85287bef-fe6c-4eb7-beef-74f5e5a6b5b0*

`Octopus.Action.IsSkipped`

Whether or not the action has been skipped in the current deployment *(Boolean)*.

Note: This value can be True or null (indicated by an empty string)

Example: *True*

`Octopus.Action.Manual.Instructions`

The instructions provided for a manual step.

Example: *Don't break anything*

`Octopus.Action.Manual.ResponsibleTeamIds`

The teams responsible for completing a manual step *(List)*.

Example: *teams-123,teams-124*

|`Octopus.Action.MaxParallelism`

The maximum number of deployment targets on which the action will concurrently execute, and the maximum number of steps which will run in parallel. This value can be set in a project variable to change the default for the project. Additionally you can scope a value to specific actions to control concurrency across your deployment targets. This is the same variable which is set when configuring a [rolling deployment](/docs/deployments/patterns/rolling-deployments). *(Number - Default: 10)*.

**Note:** Some built-in steps have their own concurrent limit and will ignore this value if set.

Example: *5*

`Octopus.Action.Name`

The name of the action.

Example: *Website*

`Octopus.Action.Number`

The sequence number of the action in the deployment process *(Number)*.

Example: *5*

`Octopus.Action.Package.CustomInstallationDirectory`

If set, a specific directory to which the package will be copied after extraction.

Example: *C:\InetPub\WWWRoot\OctoFx*

`Octopus.Action.Package.CustomInstallationDirectoryShouldBePurgedBeforeDeployment`

If true, the all files in the `Octopus.Action.Package.CustomInstallationDirectory` will be deleted before deployment *(Boolean)*.

Example: *False*

|`Octopus.Action.Package.DownloadOnTentacle`

If true, the package will be downloaded by the Tentacle, rather than pushed by the Octopus Server *(Boolean)*.

Example: *False*

`Octopus.Action.Package.TreatConfigTransformationWarningsAsErrors`

If true, any warnings in .NET configuration transformations will be treated as errors and will fail the deployment *(Boolean)*.

Example: *True*

`Octopus.Action.Package.IgnoreConfigTransformationErrors`

If true, any errors in .NET configuration transformations will be treated as informational rather than errors that will fail the deployment *(Boolean)*.

Example: *False*

`Octopus.Action.Package.IgnoreVariableReplacementErrors`

If true, any errors in variable replacement will be treated as a warning rather than an error that will fail the deployment. (*Boolean*).

Example: *False*

`Octopus.Action.Package.InstallationDirectoryPath`

The directory where the package was installed. It is not available prior to package extraction.

Example: *C:\InetPub\WWWRoot\OctoFx*

`Octopus.Action.Package.FeedId`

The ID of the feed from which the package being deployed was pulled.

Example: *feeds-123*

`Octopus.Action.Package.PackageId`

The ID of the package being deployed.

Example: *OctoFx.RateService*

`Octopus.Action.Package.PackageVersion`

The version of the package being deployed.

Example: *1.2.3*

`Octopus.Action.Package.SkipIfAlreadyInstalled`

If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped (use with caution) *(Boolean)*.

Example: *False*

`Octopus.Action.Script.ScriptBody`

The script being run in a script step.

Example: *Write-Host 'Hello!'*

`Octopus.Action.Script.Syntax`

The syntax of the script being run in a script step.

Example: *PowerShell*

`Octopus.Action.SkipRemainingConventions`

If set by the user, completes processing of the action without running further conventions/scripts *(Boolean)*. This should be set as an [output variable](/docs/projects/variables/output-variables). e.g. <br /> `Set-OctopusVariable -name 'Octopus.Action.SkipRemainingConventions' -value 'True'`

Example: *True*

`Octopus.Action.TargetRoles`

Machine roles targeted by the action *(List)*.

Example: *web-server,frontend*

`Octopus.Action.Template.Id`

If the action is based on a step template, the ID of the template.

Example: *action-templates-123*

`Octopus.Action.Template.Version`

If the action is based on a step template, the version of the template in use *(Number)*.

Example: *123*

`Octopus.Action.Status.Error`

If the action failed because of an error, a description of the error.

Example: *The server could not be contacted*

`Octopus.Action.Status.ErrorDetail`

If the action failed because of an error, a full description of the error.

Example: *System.Net.SocketException: The server ...*

`Octopus.Action.SubstituteInFiles.EnableNoMatchWarning`

Controls whether a warning is displayed in the Task log when no files are found matching one or more of the glob patterns in Substitute Variables in Files.

Example: *False*

### Reference package variables {#reference-package-variables}

When [referencing packages](/docs/deployments/custom-scripts/run-a-script-step/#referencing-packages) in custom scripts, they can contribute variables that can be used just like any other variable. The variables are available **per package**. Assuming a referenced package named `Acme`:

`Octopus.Action.Package[Acme].PackageId`

The package ID.

Example: *Acme*

`Octopus.Action.Package[Acme].FeedId`

The feed ID.

Example: *feeds-123*

`Octopus.Action.Package[Acme].PackageVersion`

The version of the package included in the release.

Example: *1.4.0*

`Octopus.Action.Package[Acme].OriginalPath`

The location of the zip file before any actions are taken.

Example: *C:\Octopus\Packages\Spaces-1\feeds-builtin\Acme\Acme.1.4.0.zip*

`Octopus.Action.Package[Acme].ExtractedPath`

The absolute path to the extracted directory (if the package is configured to be extracted).

Example: *C:\Octopus\Work\20210821060923-7117-31\Acme*

`Octopus.Action.Package[Acme].PackageFilePath`

The absolute path to the package file (if the package has been configured to not be extracted).

Example: *C:\Octopus\Work\20210821060923-7117-31\Acme.zip*

`Octopus.Action.Package[Acme].PackageFileName`

The name of the package file (if the package has been configured to not be extracted).

Example: *Acme.zip*

## Azure

`Octopus.Action.Azure.CertificateThumbprint`

The thumbprint of the X509 certificate used to authenticate with the Azure Subscription targeted by this action.

Example: *86B5C8E5553981FED961769B2DA3028C619596AC*

`Octopus.Action.Azure.PackageExtractionPath`

If set by the user, the temporary path to extract Azure packages into during deployment.

Example: Z:\Temp\packages\

`Octopus.Action.Azure.SubscriptionId`

The Azure Subscription Id being targeted by this action.

Example: *8affaa7d-3d74-427c-93c5-2d7f6a16e754*

`Octopus.Action.Azure.ResourceGroupDeploymentName`

Override the auto-generated resource group deployment name when deploying a resource group.

Example: my-resource-group-deployment-name

## Azure Cloud Service

`Octopus.Action.Azure.CloudServiceConfigurationFileRelativePath`

If set by the user, the relative path to the \*.cscfg file, with a fallback to ServiceConfiguration.{Environment}.cscfg or ServiceConfiguration.Cloud.cscfg

Example: *ServiceConfiguration.Custom.cscfg*

`Octopus.Action.Azure.CloudServiceName`

The name of the Cloud Service being targeted by this action.

Example: *my-cloud-service-web*

`Octopus.Action.Azure.CloudServicePackageExtractionDisabled`

Octopus will not unpack the \*.cspkg file if this variable is set to True, instead the \*.cspkg file will be pushed to Azure as-is.

Example: True

`Octopus.Action.Azure.CloudServicePackagePath`

The path of the \*.cspkg file used by this action.

Example: *Z:\Temp\packages\my-cloud-service-web.cspkg*

`Octopus.Action.Azure.LogExtractedCspkg`

If true, the contents of the extracted \*.cspkg will be written to the log to help diagnose deployment issues *(Boolean)*.

Example: *True*

`Octopus.Action.Azure.Slot`

The slot of the Cloud Service being targeted by this action.

Example: *Staging* or *Production*

`Octopus.Action.Azure.StorageAccountName`

The name of the Azure Storage Account where \*.cspkg files will be uploaded to for deployment to the Cloud Service.

Example: *my-storage-account*

`Octopus.Action.Azure.SwapIfPossible`

If true, the action will attempt to perform a VIP swap instead of deploying directly into the targeted Slot.

Example: *True*

`Octopus.Action.Azure.UploadedPackageUri`

The Storage URI of the \*.cspkg file that will be deployed to the Cloud Service.

Example: https://my-storage-account/container/my-cloudservice.web.cspkg

`Octopus.Action.Azure.UseCurrentInstanceCount`

If true, the action will maintain the number of Instances in the Cloud Service rather than reverting to what is defined in the \*.cspkg file.

Example: *True*

`Octopus.Action.Azure.DeploymentLabel`

If set, the custom deployment label will be used for the Azure cloud service deployment. **Introduced in Calamari version 3.4.1.**.

Example: my custom label for build 3.x.x

## Azure Web Apps

`Octopus.Action.Azure.WebAppName`

The name of the Web App being targeted by this deployment.

Example: *my-web-app*

`Octopus.Action.Azure.DeploymentSlot`

The name of the Web App slot being targeted by this deployment.

Example: *staging*

`Octopus.Action.Azure.ResourceGroupName`

The name of the resource group being targeted by this deployment.

Example: MyResourceGroup

`Octopus.Action.Azure.RemoveAdditionalFiles`

When *True* instructs Web Deploy to delete files from the destination that aren't in the source package.

Example: *True*

`Octopus.Action.Azure.PreserveAppData`

When *True* instructs Web Deploy to skip Delete operations in the **App\_Data** directory.

Example: *True*

`Octopus.Action.Azure.AppOffline`

When *True* instructs Web Deploy to safely bring down the app domain by adding a blank **app\_offline.html** file in the site root.

Example: *True*

## Output

Output variables are collected during execution of a step and made available to subsequent steps using notation such as `Octopus.Action[Website].Output[WEBSVR01].Package.InstallationDirectoryPath`to refer to values base on the action and machine that produced them. See also [Output variables](/docs/projects/variables/output-variables).

`Octopus.Action[_name_].Output.\_property\_`

The results of calling `Set-OctopusVariable` during an action are exposed for use in other actions using this pattern.

Example: *Octopus.Action[Website].Output.WarmUpResponseTime*

`Octopus.Action[_name_].Output.Manual.Notes`

Notes provided by the user who completed a manual step.

Example: *Signed off by Alice*

`Octopus.Action[_name_].Output.Package.InstallationDirectoryPath`

The directory where the package was installed.

Example: *C:\Octopus\Tentacle\Apps\Production\MyApp\1.2.3*

`Octopus.Action[_name_].Output.Manual.ResponsibleUser.DisplayName`

The full name of the user who completed the manual step.

Example: *Alice King*

`Octopus.Action[_name_].Output.Manual.ResponsibleUser.EmailAddress`

The email address of the user who completed the manual step.

Example: *[alice@example.com](mailto:alice@example.com)*

`Octopus.Action[_name_].Output.Manual.ResponsibleUser.Id`

The ID of the user who completed the manual step.

Example: *users-123*

`Octopus.Action[_name_].Output.Manual.ResponsibleUser.Username`

The username of the user who completed the manual step.

Example: *alice*

`Octopus.Action[_name_].Output.OctopusAzureCloudServiceDeploymentID`

The ID of the completed Azure Cloud Service deployment. **Introduced in Calamari version 3.7.81.**.

Example: *c9f52da2b00a4313b3b64bb2ad0f409f*

`Octopus.Action[_name_].Output.OctopusAzureCloudServiceDeploymentUrl`

The Url of the completed Azure Cloud Service deployment. **Introduced in Calamari version 3.7.81**.

Example: *http://c9f52da2b00a4313b3b64bb2ad0f409f.cloudapp.net/*

## Step

Step-level variables are available during execution of a step. Indexer notion such as `Octopus.Step[Website].Number` can be used to refer to values for different steps.

`Octopus.Step.Id`

The ID of the step.

Example: *80b3ad09-eedf-40d6-9b66-cf97f5c0ffee*

`Octopus.Step.Name`

The name of the step.

Example: *Website*

`Octopus.Step.Number`

The number of the step *(Number)*.

Example: *2*

`Octopus.Step.Status.Code`

A code describing the current status of the step.

Example: *Succeeded*

`Octopus.Step.Status.Error`

If the step failed because of an error, a description of the error.

Example: *The server could not be contacted*

`Octopus.Step.Status.ErrorDetail`

If the step failed because of an error, a full description of the error.

Example: *System.Net.SocketException: The server could not be contacted (at ...)*


## Agent

Agent-level variables describe the deployment agent or Tentacle on which the deployment is executing.

`Octopus.Tentacle.Agent.ApplicationDirectoryPath`

The directory under which the agent installs packages.

Example: *C:\Octopus\Tentacle\Apps*

`Octopus.Tentacle.Agent.InstanceName`

The instance name that the agent runs under.

Example: *Tentacle*

`Octopus.Tentacle.Agent.ProgramDirectoryPath`

The directory containing the agent's own executables.

Example: *C:\Program Files\Octopus Deploy\Tentacle*

`Octopus.Agent.ProgramDirectoryPath`

The directory containing either the server or Tentacle's executables depending on which the step being executed on.

Example: *C:\Program Files\Octopus Deploy\Octopus*

## Worker Pool

When a step is run on a worker, the following variables are available:

`Octopus.WorkerPool.Id`

The Id of the pool.

Example: WorkerPools-1

`Octopus.WorkerPool.Name`

The name of the pool.

Example: Default Worker Pool

## Server

Server-level variables describe the Octopus Server on which the deployment is running.

`Octopus.Web.BaseUrl`

The default URL at which the server API can be accessed. Note that this is based off the server's ListenPrefixes and works in simple configuration scenarios. If you have a load balancer or reverse proxy this value will likely not be suitable for use in referring to the server from a client perspective, e.g. in email templates etc.

Example: *[https://my-octopus](https://my-octopus)*

`Octopus.Web.ServerUri`

The default URL at which the server portal can be accessed, as configured in the **Configuration ➜ Nodes** settings. This variable was added in Octopus **2019.4.0**.

*[https://my-octopus](https://my-octopus)*

## Tracking deployment status {#tracking-deployment-status}

During deployment, Octopus provides variables describing the status of each step.

Where `S` is the step name, Octopus will set:

```powershell
Octopus.Step[S].Status.Code
Octopus.Step[S].Status.Error
Octopus.Step[S].Status.ErrorDetail
```

Status codes include `Pending`, `Skipped`, `Abandoned`, `canceled`, `Running`, `Succeeded` and `Failed`.

For an action `A:`

```powershell
Octopus.Action[A].IsSkipped
```

For the deployment as a whole:

```powershell
Octopus.Deployment.Error
Octopus.Deployment.ErrorDetail
```

:::div{.hint}
**Error detail returned**
Octopus.Deployment.Error and Octopus.Deployment.ErrorDetail will only display the exit code and Octopus stack trace for the error. As we cannot parse the deployment log, we can only extract the exit/error codes. It cannot show detailed information on what caused the error. For full information on what happened when the deployment fails, you will need to reference the logs.
:::

## Runbook

`Octopus.Runbook.Id`

The ID of the runbook.

Example: *Runbooks-123*

`Octopus.Runbook.Name`

The name of the runbook.

Example: *Restore Database*

`Octopus.RunbookRun.Created`

The date and time at which the runbook was run.

Example: *Friday, March 13, 2020 6:23:38 AM*

`Octopus.RunbookRun.CreatedUtc`

The date and time at which the runbook was run in UTC format.

Example: *3/13/20 6:23:38 AM +00:00*

`Octopus.RunbookRun.Id`

The ID of the run.

Example: *RunbookRuns-123*

`Octopus.RunbookRun.Name`

The name of the run.

Example: *Run on Production*

`Octopus.RunbookSnapshot.Id`

The ID of the snapshot being run.

Example: *RunbookSnapshots-123*

`Octopus.RunbookSnapshot.Name`

The name of the snapshot.

*Snapshot EXAMPLE3*

`Octopus.RunbookSnapshot.Notes`

Notes associated with the snapshot, in Markdown format.

Example: *Restores the database*

`Octopus.Web.RunbookSnapshotLink`

A path relative to the Octopus Server URL at which the runbook snapshot can be viewed.

Example: */app/snapshots/runbookSnapshots-123*

`Octopus.Web.RunbookRunLink`

A path relative to the Octopus Server URL at which the runbook run can be viewed.

Example: */app/runs/runbookRuns-123*

## User-modifiable settings {#user-modifiable-settings}

The following variables can be defined as variables in your project to modify the way Octopus behaves.

`Octopus.Acquire.MaxParallelism`

Maximum number of NuGet packages that should be downloaded at once when acquiring packages.

Example: 3

`Octopus.Action.MaxParallelism`

The maximum number of deployment targets on which the action will concurrently execute, and the maximum number of steps which will run in parallel. This value can be set in a project variable to change the default for the project. Additionally you can scope a value to specific actions to control concurrency across your deployment targets. This is the same variable which is set when configuring a [rolling deployment](/docs/deployments/patterns/rolling-deployments). *(Number - Default: 10)*.

Example: *5*

`OctopusPrintVariables`

Set to "True" to tell Tentacle to print the value of all variables passed to it. We recommend only using this setting for non-production environments.

Example: True

`OctopusPrintEvaluatedVariables`

Set to "True" to tell Tentacle to print the value of all variables passed to it after evaluating them. We recommend only using this setting for non-production environments.

Example: True

`OctopusSkipFreeDiskSpaceCheck`

Set to "True" to skip the check for available free disk space when deploying packages. **Introduced in Calamari version 3.1.30.**.

Example: True

`OctopusFreeDiskSpaceOverrideInMegaBytes`

The amount (in megabytes) of available free disk space we should check for (overriding the default 500MB), failing the deployment if not enough free disk space is available. **Introduced in Calamari version 3.1.30**.

Example: 100

`Octopus.Action.PowerShell.CustomPowerShellVersion`

If specified, Windows PowerShell scripts will be invoked using `PowerShell.exe -version {Version}` where {Version} is the value you specified. Accepted values are *2.0*, *3.0*, *4.0, 5.0*.<br/>PowerShell Core scripts will be invoked using the installed version of PowerShell core which matches the specified value. The value must match one of the directories contained within `%PROGRAMFILES%\PowerShell`. Example values include *6* and *7-preview*.<br/>**Introduced in Calamari version 3.3.13.**.

Example: 2.0

`OctopusDeleteScriptsOnCleanup`

For packaged scripts, set to "False" to keep the PreDeploy/Deploy/PostDeploy scripts in the target directory (i.e. don't cleanup).

Example: False

`Octopus.Action.Script.SuppressEnvironmentLogging`

To suppress/disable the environment logging that occurs from script (eg. PowerShell or Bash Script Environment Variables logging). This only suppresses script logging and does not suppress the Octopus or Calamari environment logging. **Introduced in Calamari version 3.6.5.**.

Example: True

`Octopus.Action.PowerShell.ExecuteWithoutProfile`

Set to `true` to not run the Tentacle service account's PowerShell profile script when running PowerShell script steps (available in version 3.3.21+).

Example: True

`OctopusSuppressDuplicateVariableWarning`

Set to `true` to have the duplicate variable message logged as verbose instead of warning. **Do this if you are aware of the duplication and that it isn't causing any issues in your deployment**  (available in version 3.17.0+).

Example: True

`Octopus.Action.Package.RunScripts`

Set to `false` to prevent scripts inside packages from executing. **Do this if you are aware of the duplication and that it isn't causing any issues in your deployment**  (available in version 4.1.10+).

Example: True

`Octopus.Calamari.CopyWorkingDirectoryIncludingKeyTo`

Set to a file-path and the Calamari working directory will be copied to the configured location. **Copied files include the one-time key to decrypt sensitive variables** [More details.](/docs/support/copy-working-directory).

Example: `c:\temp\octopus-debug`

`Octopus.Deployment.WorkerLeaseCap`

This is an opt-in variable to help distribute multiple steps referencing the same package (including container) across a worker pool. By setting this, a worker will be reused for steps up to the cap, after which another worker will be selected and reused in the same way. If all workers have reached the cap, additional steps will be spread out evenly. By default this behavior is disabled, and the same worker will be reused for all steps referencing the same package. Opt in by setting the variable to a number higher than 0.

Example: `1` - achieves a similar effect to round robin.  
Example: `5` - a balance between reducing package transfer and distributing load.

Note: This value applies to both deployment processes and runbooks, as long as it's scoped to the particular scenario.

`Octopus.Task.ConcurrencyTag`

Octopus will run one task at a time for a given concurrency tag. Set the variable to run tasks in parallel instead of serial or in serial instead of parallel. For example, tenanted deployments run in parallel by default. Removing tenants from the concurrency tag will run them serially: #{Octopus.Project.Id}/#{Octopus.Environment.Id}

Example: #{Octopus.Deployment.Tenant.Id}/#{Octopus.Project.Id}/#{Octopus.Environment.Id}

## Learn more

- [Variable blog posts](https://octopus.com/blog/tag/variables)
