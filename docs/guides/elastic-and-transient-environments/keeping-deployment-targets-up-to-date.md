---
title: Keeping deployment targets up to date
description: Octopus can ensure that deployment targets are kept up to date with the relevant releases. This can be useful when deploying to transient targets or when new deployment targets are added to an environment.
position: 2
---

:::hint
The features discussed in this guide are available in Octopus 3.4 and newer.
:::

Octopus Deploy can ensure that deployment targets are kept up to date with the relevant releases.  This can be useful when [deploying to transient targets](/docs/guides/elastic-and-transient-environments/deploying-to-transient-targets.md) or when new deployment targets are added to an environment.

## Triggers {#Keepingdeploymenttargetsuptodate-Triggers}

Triggers are per-project settings that execute an action in response to an event. For this example we will create an automatic deployment trigger so that machines in the **TradingWebServer** role are automatically kept up to date with the latest releases for OctoFX.  Triggers can be found by selecting the *Triggers* menu item on the project screen.

## Creating an automatic deployment trigger {#Keepingdeploymenttargetsuptodate-Creatinganautomaticdeploymenttrigger}

1. Navigate to the project *Triggers* page

2. Create a new trigger by selecting **Create trigger**

![](/docs/images/5669262/5865570.png "width=500")

3. Add events to the trigger

 1. For Octopus 3.6 and above, select the event group *"Machine becomes available for deployment"*.
 
 2. For Octopus 3.4 and 3.5, select both available events so that it will fire when a *new deployment target becomes available* (eg. when a new deployment target is provisioned and added to Octopus) or when an *existing deployment target changes state* (eg. from unavailable to available, joins an environment, changes roles, etc.).
 
4. Select the environments (**Test A**) that this trigger applies to.

5. Select the deployment target roles (**TradingWebServer**) that this trigger applies to.

![](/docs/images/5669262/5865705.png)

Once the trigger has been created, it will ensure that any deployment targets matching the trigger criteria will be kept up to date with the latest release of the project.

## Triggering an automatic deployment {#Keepingdeploymenttargetsuptodate-Triggeringanautomaticdeployment}

To test the trigger, we will disable a deployment target, deploy to that target's environment and then re-enable the target.  Octopus should automatically deploy the release to the target when it is re-enabled.

1. Disable a target with the role **TradingWebServer**in the **Test A** environment:

![](/docs/images/5669262/5865573.png "width=500")

2. Create a new release of OctoFX and deploy it to the **Test A** environment.  It will skip the steps that have been scoped to the **TradingWebServer** role because no deployment targets are available in that role:

![](/docs/images/5669262/5865574.png "width=500")

3. Enable the deployment target **TAWeb01.** Octopus will automatically determine that it is missing the release we just deployed.  The deployment is re-queued and will run only for the **TAWeb01** target, creating a new log section below the original deployment log:

![](/docs/images/5669262/5865575.png "width=500")

## Overriding the release used for automatic deployments {#Keepingdeploymenttargetsuptodate-Overridingthereleaseusedforautomaticdeploymentsoverriderelease}

Automatic deployments attempts to calculate the release to use for a project and environment (using the *current* and *successful* release that has been deployed, as shown in your Project Overview dashboard).  In some cases the calculated release may not be the release that should be automatically deployed, or Octopus may not be able to find a deployment for an environment (maybe you have a release, but have not yet deployed it anywhere).  It is possible to explicitly set the release that should be automatically deployed by overriding the automatic-deployment-release. Overrides can be configured using [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md) or through [Octopus.Client](/docs/api-and-integration/octopus.client.md).  Overrides define a release for a project when deploying to an environment (this can, for example, be useful for cloud-testing-automation when standing up new cloud infrastructure).  For multi-tenanted deployments, overrides may be configured for each environment/tenant combination.

**Octo.exe**

```bash
octo.exe create-autodeployoverride --server http://octopus/ --apiKey API-ABCDEF123456 --project HelloWorld --environment Test -version 1.3.0
octo.exe delete-autodeployoverride --server http://octopus/ --apiKey API-ABCDEF123456 --project HelloWorld --environment Test
```

**Octopus.Client**

```powershell
Add-Type -Path 'Octopus.Client.dll' 

$octopusURI = 'http://octopus'
$apiKey = "API-ABCDEF123456"

$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $octopusURI, $apiKey
$repository = New-Object Octopus.Client.OctopusRepository $endpoint

$project = $repository.Projects.Get("Projects-1")
$environment = $repository.Environments.Get("Environments-1")
$release = $repository.Releases.Get("Releases-1")

$project.AddAutoDeployReleaseOverride($environment, $release)
$repository.Projects.Modify($project)
```

Automatic deployment overrides are cleared when a deployment is performed to the same project/environment/tenant combination as the override.  For example: if an override is set for version 1.2 of HelloWorld to the Test environment and version 1.3 of HelloWorld is deployed to the Test environment, the 1.2 override will be deleted. Release overrides will be cleared as soon as they have automated an actual deployment.

## Troubleshooting automatic deployments {#Keepingdeploymenttargetsuptodate-TroubleshootingTroubleshootingautomaticdeployments}

Octopus will attempt to automatically deploy the current releases for the environments that are appropriate for a machine. The current release is the one that was most recently *successfully* deployed as shown on the project dashboard. Octopus will not automatically deploy a release if the deployment for that release was not successful. If the initial deployment of a release was successful but an automatic deployment of that release fails, **Octopus will stop automatically deploying that release**.

:::hint
For example: If you cancel a deployment or a deployment fails for whatever reason, auto-deploy will now be blocked for the given release and any new machines that come online will **not** be auto-deployed to. You will need you to complete a successful deployment again before auto-deployments can continue for the given release.
:::

Troubleshoot automatic deployment by viewing the auto deploy logs from the diagnostics page in the configuration section or viewing the [Audit log](/docs/administration/auditing.md):

![](/docs/images/5669262/5865582.png "width=500")

:::success
**Why isn&#39;t my trigger working?**
The verbose logs usually contain the reason why a project trigger didn't take any action. For example:

`Auto-deploy: Machine 'Local' does not need to run release '2.6.6' for project 'My Project' and tenant '&lt;none&gt;' because it already exists on the machine or is pending deployment.`
:::

## Next steps {#Keepingdeploymenttargetsuptodate-Nextsteps}

With machines now being kept up to date automatically you may be interested in [cleaning up environments](/docs/guides/elastic-and-transient-environments/cleaning-up-environments.md) to automatically remove machines when they are terminated.
