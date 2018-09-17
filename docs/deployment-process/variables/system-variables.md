---
title: System Variables
description: System variables are variables provided by Octopus that can be used in your deployments.
position: 50
---

This page lists built-in [variables](/docs/deployment-process/variables/index.md) provided by Octopus that can be used in your deployment [custom scripts](/docs/deployment-examples/custom-scripts/index.md).

## Deployment {#Systemvariables-Deployment}

Deployment-level variables are drawn from the project and release being deployed.

| Name and Description | Example|
| -------------------- | -------|
|**`Octopus.Acquire.MaxParallelism`** <br/>Controls the number of package acquisitions that will be allowed to run concurrently. Also controls retention processing at the end of the deployment. *Default: 10* | *2*|
|**`Octopus.Acquire.DeltaCompressionEnabled`** <br/>Toggle whether delta compression is enabled when sending packages to targets. | true|
|**`Octopus.Deployment.Comments`** <br/>User-provided comments on the deployment | *Signed off by Alice*|
|**`Octopus.Deployment.Created`** <br/>The date and time at which the deployment was created | *Tuesday 10th September 1:23 PM*|
|**`Octopus.Deployment.CreatedBy.DisplayName`** <br/>The full name of the user who initiated the deployment | *Alice King*|
|**`Octopus.Deployment.CreatedBy.EmailAddress`** <br/>The email address of the user who initiated the deployment | *[alice@example.com](mailto:alice@example.com)*|
|**`Octopus.Deployment.CreatedBy.Id`** <br/>The ID of the user who initiated the deployment | *users-123*|
|**`Octopus.Deployment.CreatedBy.Username`** <br/>The username of the user who initiated the deployment | *alice*|
|**`Octopus.Deployment.Error`** <br/>This variable outputs the error/exit code for a failed deployment. [See here](/docs/deployment-process/variables/system-variables.md) | *Script returned exit code 123*|
|**`Octopus.Deployment.ErrorDetail`** <br/>The error/exit code for the deployment along with the Octopus stack trace. [See here](/docs/deployment-process/variables/system-variables.md) | *System.IO.FileNotFoundException: file C:\Missing.txt does not exist (at...)*|
|**`Octopus.Deployment.ForcePackageDownload`** <br/>If true, the package will be freshly downloaded from the feed/repository regardless of whether it is already present on the endpoint *(Boolean)* | *False*|
|**`Octopus.Deployment.Id`** <br/>The ID of the deployment | *deployments-123*|
|**`Octopus.Deployment.Name`** <br/>The name of the deployment | *Deploy to Production*|
|**`Octopus.Deployment.PreviousSuccessful.Id`** <br/>The ID of the previous successful deployment of this project in the target environment | *deployments-122*|
|**`Octopus.Deployment.Machines`** <br/>Ids of machines being targeted by the deployment. | machines-123,machines-124|
|**`Octopus.Deployment.SpecificMachines`** <br/>Specific machines being targeted by the deployment, if any*(List)* | *machines-123,machines-124*|
|**`Octopus.Deployment.ExcludedMachines`** <br/>Ids of machines that have been excluded from the deployment (generally for being unavailable) | machines-123,machines-124|
|**`Octopus.Deployment.Tenant.Id`** <br/>The ID of the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present. | *Tenants-123*|
|**`Octopus.Deployment.Tenant.Name`** <br/>The name of the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present. | *Acme Corp*|
|**`Octopus.Deployment.Tenant.Tags`** <br/>Comma delimited list of tags that belong the the Tenant being deployed for. If the deployment is untenanted (or pre 3.4.0) then this variable will not be present. | *Tenant type/External, Upgrade ring/Early adopter*|
|**`Octopus.Endpoint.\_type\_.\_property\_`** <br/>Properties describing the endpoint being deployed | *ftp.example.com*|
|**`Octopus.Environment.Id`** <br/>The ID of the environment | *environments-123*|
|**`Octopus.Environment.MachinesInRole[\_role\_]`** <br/>Lists the machines in a specified role | *machines-123,machines-124*|
|**`Octopus.Environment.Name`** <br/>The name of the environment | *Production*|
|**`Octopus.Environment.SortOrder`** <br/>The ordering applied to the environment when it is displayed on the dashboard and elsewhere | *3*|
|**`Octopus.Machine.Id`** <br/>The ID of the machine | *machines-123*|
|**`Octopus.Machine.Name`** <br/>The name that was used to register the machine in Octopus. Not the same as *Hostname* | *WEBSVR01*|
|**`Octopus.Machine.Roles`** <br/>The roles applied to the machine *(List)* | *web-server,frontend*|
|**`Octopus.Machine.Hostname`** <br/>The host part of the URI that was used to register the machine, could be an IP, hostname depending on what was supplied. Only set for Listening Tentacles | Database01, Database01.local, 192.168.200.100|
|**`Octopus.Project.Id`** <br/>The ID of the project | *projects-123*|
|**`Octopus.Project.Name`** <br/>The name of the project | *OctoFx*|
|**`Octopus.ProjectGroup.Id`** <br/>The ID of the projectgroup | *projectgroups-123*|
|**`Octopus.ProjectGroup.Name`** <br/>The name of the projectgroup | *Public Web Properties*|
|**`Octopus.Release.Channel.Name`** <br/>The Channel name associated with the release | *2.x Feature Branch*|
|**`Octopus.Release.Notes`** <br/>Release notes associated with the release, in Markdown format | *Fixes bugs 1, 2 & 3*|
|**`Octopus.Release.Number`** <br/>The version number of the release | *1.2.3*|
|**`Octopus.Release.Id`** <br/>The ID of the release | *releases-123*|
|**`Octopus.Release.Previous.Id`** <br/>The ID of the last release of the project | *releases-122*|
|**`Octopus.Release.Previous.Number`** <br/>The version number of the last release of the project | *1.2.2*|
|**`Octopus.Release.PreviousForEnvironment.Id`** <br/>The ID of the last release of the project to the current environment | *releases-122*|
|**`Octopus.Release.PreviousForEnvironment.Number`** <br/>The version number of the last release of the project to the current environment | *1.2.2*|
|**`Octopus.Release.CurrentForEnvironment.Id`** <br/>The ID of the release of the last successful deployment to the current environment | *releases-122*|
|**`Octopus.Release.CurrentForEnvironment.Number`** <br/>The version number of the release the last successful deployment to the current environment | *1.2.2*|
|**`Octopus.Task.Argument[_name_]`** <br/>Argument values provided when creating the task | *deployments-123*|
|**`Octopus.Task.Id`** <br/>The ID of the task | *servertasks-123*|
|**`Octopus.Task.Name`** <br/>The name of the task | *Deploy release 1.2.3 to Production*|
|**`Octopus.Task.QueueTime`** <br/>The date and time the task should be queued for execution. ***Introduced in Octopus 3.17.3*** | *Tuesday 10th September 1:30 PM* |
|**`Octopus.Task.QueueTimeExpiry`** <br/>The date and time before which the task must start. ***Introduced in Octopus 3.17.3*** | *Tuesday 10th September 2:30 PM* |
|**`Octopus.Tentacle.CurrentDeployment.PackageFilePath`** <br/>The path to the package file being deployed | *C:\Octopus\Tentacle\Packages\OctoFx.1.2.3.nupkg*|
|**`Octopus.Tentacle.CurrentDeployment.TargetedRoles`** <br/>The intersection of the roles targeted by the step, and those applied to the machine | *web-server*|
|**`Octopus.Tentacle.PreviousInstallation.CustomInstallationDirectory`** <br/>The directory into which the previous version of the package was deployed | *C:\InetPub\WWWRoot\OctoFx*|
|**`Octopus.Tentacle.PreviousInstallation.OriginalInstalledPath`** <br/>The directory into which the previous version of the package was extracted | *C:\Octopus\Tentacle\Apps\Production\OctoFx\1.2.2*|
|**`Octopus.Tentacle.PreviousInstallation.PackageFilePath`** <br/>The path to the package file previously deployed | *C:\Octopus\Tentacle\Packages\OctoFx.1.2.2.nupkg*|
|**`Octopus.Tentacle.PreviousInstallation.PackageVersion`** <br/>The previous version of the package that was deployed to the Tentacle | *1.2.3*|
|**`Octopus.Web.DeploymentLink`** <br/>A path relative to the Octopus Server URL at which the deployment can be viewed | */app/deployment/deployments-123*|
|**`Octopus.Web.ProjectLink`** <br/>A path relative to the Octopus Server URL at which the project can be viewed | */app/projects/projects-123*|
|**`Octopus.Web.ReleaseLink`** <br/>A path relative to the Octopus Server URL at which the release can be viewed | */app/releases/releases-123*|


## Action {#Systemvariables-Action}

Action-level variables are available during execution of an action. Indexer notion such as `Octopus.Action[Website].TargetRoles` can be used to refer to values for different actions.

| Name and Description | Example |
| -------------------- | ------- |
|**`Octopus.Action.Id`** <br/>The ID of the action | *85287bef-fe6c-4eb7-beef-74f5e5a6b5b0*|
|**`Octopus.Action.IsSkipped`** <br/>Whether or not the action has been skipped in the current deployment *(Boolean)* | *True*|
|**`Octopus.Action.Manual.Instructions`** <br/>The instructions provided for a manual step | *Don't break anything :)*|
|**`Octopus.Action.Manual.ResponsibleTeamIds`** <br/>The teams responsible for completing a manual step*(List)* | *teams-123,teams-124*|
|**`Octopus.Action.MaxParallelism`** <br/>The maximum number of deployment targets on which the action will concurrently execute, and the maximum number of steps which will run in parallel. This value can be set in a project variable to change the default for the project. Additionally you can scope a value to specific actions to control concurrency across your deployment targets. This is the same variable which is set when configuring a [rolling deployment](/docs/deployment-patterns/rolling-deployments.md). *(Number - Default: 10)* | *5*|
|**`Octopus.Action.Name`** <br/>The name of the action | *Website*|
|**`Octopus.Action.Number`** <br/>The sequence number of the action in the deployment process *(Number)* | *5*|
|**`Octopus.Action.Package.CustomInstallationDirectory`** <br/>If set, a specific directory to which the package will be copied after extraction | *C:\InetPub\WWWRoot\OctoFx*|
|**`Octopus.Action.Package.CustomInstallationDirectoryShouldBePurgedBeforeDeployment`** <br/>If true, the all files in the `Octopus.Action.Package.CustomInstallationDirectory` will be deleted before deployment *(Boolean)* | *False*|
|**`Octopus.Action.Package.DownloadOnTentacle`** <br/>If true, the package will be downloaded by the Tentacle, rather than pushed by the Octopus Server*(Boolean)* | *False*|
|**`Octopus.Action.Package.TreatConfigTransformationWarningsAsErrors`** <br/>If true, any warnings in configuration transformations will be treated as errors and will fail the deployment** ***(Boolean)* | *True*|
|**`Octopus.Action.Package.IgnoreConfigTransformationErrors`** <br/>If true, any errors in configuration transformations will be treated as informational rather than errors that will fail the deployment** ***(Boolean)* | *False*|
|**`Octopus.Action.Package.IgnoreVariableReplacementErrors`** <br/>If true, any errors in variable replacement will be treated as a warning rather than an error that will fail the deployment. (*Boolean*) | *False*|
|**`Octopus.Action.Package.InstallationDirectoryPath`** <br/>The directory where the package was installed. It is not available prior to package extraction. | *C:\InetPub\WWWRoot\OctoFx*|
|**`Octopus.Action.Package.FeedId`** <br/>The ID of the feed from which the package being deployed was pulled | *feeds-123*|
|**`Octopus.Action.Package.PackageId`** <br/>The ID of the package being deployed | *OctoFx.RateService*|
|**`Octopus.Action.Package.PackageVersion`** <br/>The version of the package being deployed | *1.2.3*|
|**`Octopus.Action.Package.SkipIfAlreadyInstalled`** <br/>If true, and the version of the package being deployed is already present on the machine, its re-deployment will be skipped (use with caution) *(Boolean)* | *False*|
|**`Octopus.Action.Script.ScriptBody`** <br/>The script being run in a script step | *Write-Host 'Hello!'*|
|**`Octopus.Action.Script.Syntax`** <br/>The syntax of the script being run in a script step | *PowerShell*|
|**`Octopus.Action.SkipRemainingConventions`** <br/>If set by the user, completes processing of the action without runnning further conventions/scripts *(Boolean)* | *True*|
|**`Octopus.Action.TargetRoles`** <br/>Machine roles targeted by the action *(List)* | *web-server,frontend*|
|**`Octopus.Action.Template.Id`** <br/>If the action is based on a step template, the ID of the template | *actiontemplates-123*|
|**`Octopus.Action.Template.Version`** <br/>If the action is based on a step template, the version of the template in use *(Number)* | *123*|
|**`Octopus.Action.Status.Error`** <br/>If the action failed because of an error, a description of the error | *The server could not be contacted*|
|**`Octopus.Action.Status.ErrorDetail`** <br/>If the action failed because of an error, a full description of the error | *System.Net.SocketException: The server ...*|


## Azure {#Systemvariables-Azure}

|Name and Description | Example |
|-------------------- | ----------------------------------------|
|**`Octopus.Action.Azure.CertificateThumbprint`** <br/>The thumbprint of the X509 certificate used to authenticate with the Azure Subscription targeted by this action | *86B5C8E5553981FED961769B2DA3028C619596AC*|
|**`Octopus.Action.Azure.PackageExtractionPath`** <br/>If set by the user, the temporary path to extract Azure packages into during deployment | Z:\Temp\packages\|
|**`Octopus.Action.Azure.SubscriptionId`** <br/>The Azure Subscription Id being targeted by this action | *8affaa7d-3d74-427c-93c5-2d7f6a16e754*|
|**`Octopus.Action.Azure.ResourceGroupDeploymentName`** <br/>Override the auto-generated resource group deployment name when deploying a resource group | my-resourcegroupdeployment-name|


## Azure Cloud Service {#Systemvariables-AzureCloudService}

| Name and Description | Example |
|------------------------------- | ----------------------------------------|
|**`Octopus.Action.Azure.CloudServiceConfigurationFileRelativePath`** <br/>If set by the user, the relative path to the \*.cscfg file, with a fallback to ServiceConfiguration.{Environment}.cscfg or ServiceConfiguration.Cloud.cscfg | *ServiceConfiguration.Custom.cscfg*|
|**`Octopus.Action.Azure.CloudServiceName`** <br/>The name of the Cloud Service being targeted by this action | *my-cloudservice-web*|
|**`Octopus.Action.Azure.CloudServicePackageExtractionDisabled`** <br/>Octopus will not unpack the \*.cspkg file if this variable is set to True, instead the \*.cspkg file will be pushed to Azure as-is | True|
|**`Octopus.Action.Azure.CloudServicePackagePath`** <br/>The path of the \*.cspkg file used by this action | *Z:\Temp\packages\my-cloudservice-web.cspkg*|
|**`Octopus.Action.Azure.LogExtractedCspkg`** <br/>If true, the contents of the extracted \*.cspkg will be written to the log to help diagnose deployment issues *(Boolean)* | *True*|
|**`Octopus.Action.Azure.Slot`** <br/>The slot of the Cloud Service being targeted by this action | *Staging* or *Production*|
|**`Octopus.Action.Azure.StorageAccountName`** <br/>The name of the Azure Storage Account where \*.cspkg files will be uploaded to for deployment to the Cloud Service | *my-storage-account*|
|**`Octopus.Action.Azure.SwapIfPossible`** <br/>If true, the action will attempt to perform a VIP swap instead of deploying directly into the targeted Slot | *True*|
|**`Octopus.Action.Azure.UploadedPackageUri`** <br/>The Storage URI of the \*.cspkg file that will be deployed to the Cloud Service | https://my-storage-account/container/my-cloudservice.web.cspkg|
|**`Octopus.Action.Azure.UseCurrentInstanceCount`** <br/>If true, the action will maintain the number of Instances in the Cloud Service rather than reverting to what is defined in the \*.cspkg file | *True*|
|**`Octopus.Action.Azure.DeploymentLabel`** <br/>If set, the custom deployment label will be used for the Azure cloud service deployment. ***Introduced in Calamari version 3.4.1 which was released with Octopus 3.4.4.*** | my custom label for build 3.x.x|


## Azure Web Apps {#Systemvariables-AzureWebApps}

| Name and Description | Example |
| -------------------- | ------------------------|
|**`Octopus.Action.Azure.WebAppName`** <br/>The name of the Web App being targeted by this deployment | *my-web-app*|
|**`Octopus.Action.Azure.WebAppSlotName`** <br/>The name of the Web App slot being targeted by this deployment | *staging* |
|**`Octopus.Action.Azure.WebSpaceName`** <br/>The name of the Web Space being targeted by this deployment | *SoutheastAsiaWebSpace1*|
|**`Octopus.Action.Azure.RemoveAdditionalFiles`** <br/>When *True* instructs Web Deploy to delete files from the destination that aren't in the source package | *True*|
|**`Octopus.Action.Azure.PreserveAppData`** <br/>When *True* instructs Web Deploy to skip Delete operations in the **App\_Data** directory | *True*|
|**`Octopus.Action.Azure.AppOffline`** <br/>When *True* instructs Web Deploy to safely bring down the app domain by adding a blank **app\_offline.html** file in the site root | *True*|

## Output {#Systemvariables-Output}

Output variables are collected during execution of a step and made available to subsequent steps using notation such as `Octopus.Action[Website].Output[WEBSVR01].Package.InstallationDirectoryPath`to refer to values base on the action and machine that produced them. See also [Output variables](/docs/deployment-process/variables/output-variables.md).

| Name and Description | Example|
| -------------------- | ----------------------------------------|
|**`Octopus.Action[_name_].Output.\_property\_`** <br/>The results of calling `Set-OctopusVariable` during an action are exposed for use in other actions using this pattern | *Octopus.Action[Website].Output.WarmUpResponseTime*|
|**`Octopus.Action[_name_].Output.Manual.Notes`** <br/>Notes provided by the user who completed a manual step | *Signed off by Alice*|
|**`Octopus.Action[_name_].Output.Package.InstallationDirectoryPath`** <br/>The directory where the package was installed | *C:\Octopus\Tentacle\Apps\Production\MyApp\1.2.3*|
|**`Octopus.Action[_name_].Output.Manual.ResponsibleUser.DisplayName`** <br/>The full name of the user who completed the manual step | *Alice King*|
|**`Octopus.Action[_name_].Output.Manual.ResponsibleUser.EmailAddress`** <br/>The email address of the user who completed the manual step | *[alice@example.com](mailto:alice@example.com)*|
|**`Octopus.Action[_name_].Output.Manual.ResponsibleUser.Id`** <br/>The ID of the user who completed the manual step | *users-123*|
|**`Octopus.Action[_name_].Output.Manual.ResponsibleUser.Username`** <br/>The username of the user who completed the manual step | *alice*|
|**`Octopus.Action[_name_].Output.OctopusAzureCloudServiceDeploymentID`** <br/> The ID of the completed Azure Cloud Service deployment. ***Introduced in Calamari version 3.7.81 which was released with Octopus 3.14.15.***| *c9f52da2b00a4313b3b64bb2ad0f409f* |
|**`Octopus.Action[_name_].Output.OctopusAzureCloudServiceDeploymentUrl`** <br/>The Url of the completed Azure Cloud Service deployment. ***Introduced in Calamari version 3.7.81 which was released with Octopus 3.14.15.***| *http://c9f52da2b00a4313b3b64bb2ad0f409f.cloudapp.net/* |

## Step {#Systemvariables-Step}

Step-level variables are available during execution of a step. Indexer notion such as `Octopus.Step[Website].Number` can be used to refer to values for different steps.

| Name and Description | Example |
| -------------------- | ----------------------------------------|
|**`Octopus.Step.Id`** <br/>The ID of the step | *80b3ad09-eedf-40d6-9b66-cf97f5c0ffee*|
|**`Octopus.Step.Name`** <br/>The name of the step | *Website*|
|**`Octopus.Step.Number`** <br/>The number of the step*(Number)* | *2*|
|**`Octopus.Step.Status.Code`** <br/>A code describing the current status of the step | *Succeeded*|
|**`Octopus.Step.Status.Error`** <br/>If the step failed because of an error, a description of the error | *The server could not be contacted*|
|**`Octopus.Step.Status.ErrorDetail`** <br/>If the step failed because of an error, a full description of the error | *System.Net.SocketException: The server could not be contacted (at ...)*|


## Agent {#Systemvariables-Agent}

Agent-level variables describe the deployment agent or Tentacle on which the deployment is executing.

| Name and Description | Example |
| -------------------- | ----------------------------------------|
|**`Octopus.Tentacle.Agent.ApplicationDirectoryPath`** <br/>The directory under which the agent installs packages | *C:\Octopus\Tentacle\Apps*|
|**`Octopus.Tentacle.Agent.InstanceName`** <br/>The instance name that the agent runs under | *Tentacle*|
|**`Octopus.Tentacle.Agent.ProgramDirectoryPath`** <br/>The directory containing the agent's own executables | *C:\Program Files\Octopus Deploy\Tentacle*|
|**`Octopus.Agent.ProgramDirectoryPath`** <br/>The directory containing either the server or Tentacle's executables depending on which the step being executed on | *C:\Program Files\Octopus Deploy\Octopus*|


## Server {#Systemvariables-Server}

Server-level variables describe the Octopus Server on which the deployment is running.

| Name and Description | Example                                  |
| -------------------  | ---------------------------------------- |
| **`Octopus.Web.BaseUrl`** <br/>The default URL at which the server can be accessed. Note that this is based off the server's ListenPrefixes and works in simple configuration scenarios. If you have a load balancer or reverse proxy this value will likely not be suitable for use in referring to the server from a client perspective, e.g. in email templates etc. | *[https://my-octopus](https://my-octopus)* |

## Tracking Deployment Status {#Systemvariables-DeploymentStatusTrackingdeploymentstatus}

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

:::hint
**Error detail returned**
Octopus.Deployment.Error and Octopus.Deployment.ErrorDetail will only display the exit code and Octopus stack trace for the error. As we cannot parse the deployment log, we can only extract the exit/error codes. It cannot show detailed information on what caused the error. For full information on what happened when the deployment fails, you will need to reference the logs.
:::

## User-modifiable Settings {#Systemvariables-User-modifiablesettings}

The following variables can be defined as variables in your project to modify the way Octopus behaves.

| Name and Description | Example |
| -------------------- | ------- |
|**`Octopus.Acquire.MaxParallelism`** <br/>Maximum number of NuGet packages that should be downloaded at once when acquiring packages. | 3|
|**`Octopus.Action.MaxParallelism`** <br/>The maximum number of deployment targets on which the action will concurrently execute, and the maximum number of steps which will run in parallel. This value can be set in a project variable to change the default for the project. Additionally you can scope a value to specific actions to control concurrency across your deployment targets. This is the same variable which is set when configuring a [rolling deployment](/docs/deployment-patterns/rolling-deployments.md). *(Number - Default: 10)* | *5*|
|**`OctopusPrintVariables`** <br/>Set to "True" to tell Tentacle to print the value of all variables passed to it. We recommend only using this setting for non-production environments. | True|
|**`OctopusPrintEvaluatedVariables`** <br/>Set to "True" to tell Tentacle to print the value of all variables passed to it after evaluating them. We recommend only using this setting for non-production environments. | True|
|**`OctopusTreatWarningsAsErrors`** <br/>Set to "True" to have warnings from XML configuration transforms or PowerShell scripts treated as if they were errors, failing the deployment. | True|
|**`OctopusSkipFreeDiskSpaceCheck`** <br/>Set to "True" to skip the check for available free disk space when deploying packages. ***Introduced in Calamari version 3.1.30 which was released with Octopus 3.2.18.*** | True|
|**`OctopusFreeDiskSpaceOverrideInMegaBytes`** <br/>The amount (in megabytes) of available free disk space we should check for (overriding the default 500MB), failing the deployment if not enough free disk space is available. ***Introduced in Calamari version 3.1.30 which was released with Octopus 3.2.18.*** | 100|
|**`Octopus.Action.PowerShell.CustomPowerShellVersion`** <br/>If specified, your PowerShell scripts will be invoked using `PowerShell.exe -version {Version}` where {Version} is the value you specified. Accepted values are *2.0*, *3.0*, *4.0, 5.0* ***Introduced in Calamari version 3.3.13 which was released with Octopus 3.3.13.*** | 2.0|
|**`OctopusDeleteScriptsOnCleanup`** <br/>For packaged scripts, set to "False" to keep the PreDeploy/Deploy/PostDeploy scripts in the target directory (i.e. don't cleanup). | False|
|**`Octopus.Action.Script.SuppressEnvironmentLogging`** <br/>To suppress/disable the environment logging that occurs from script (eg. PowerShell or Bash Script Environment Variables logging). This only suppresses script logging and does not suppress the Octopus or Calamari environment logging. ***Introduced in Calamari version 3.6.5 which was released with Octopus 3.6.0.*** | True|
|**`Octopus.Action.PowerShell.ExecuteWithoutProfile`** <br/>Set to `true` to not run the Tentacle service account's PowerShell profile script when running PowerShell script steps (available in version 3.3.21+) | True|
|**`OctopusSuppressDuplicateVariableWarning`** <br/>Set to `true` to have the duplicate variable message logged as verbose instead of warning. ***Do this if you are aware of the duplication and that it isn't causing any issues in your deployment***  (available in version 3.17.0+) | True|
|**`Octopus.Action.Package.RunScripts`**  <br/>Set to `false` to prevent scripts inside packages from executing. ***Do this if you are aware of the duplication and that it isn't causing any issues in your deployment***  (available in version 4.1.10+) | True|
