---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-05-01
title: Keeping deployment targets up to date
description: Octopus can ensure that deployment targets are kept up to date with the relevant releases. This can be useful when deploying to transient targets or when new deployment targets are added to an environment.
navOrder: 2
---

Octopus Deploy can ensure that deployment targets are kept up to date with the relevant releases.  This can be useful when [deploying to transient targets](/docs/deployments/patterns/elastic-and-transient-environments/deploying-to-transient-targets) or when new deployment targets are added to an environment.

## Triggers {#triggers}

Triggers are per-project settings that execute an action in response to an event. For this example we will create an automatic deployment trigger so that machines associated with the **TradingWebServer** [target tag](/docs/infrastructure/deployment-targets/#target-roles) are automatically kept up to date with the latest releases for OctoFX.  Triggers can be found by selecting the *Triggers* menu item on the project screen.

## Creating an automatic deployment trigger {#create-automatic-deployment-trigger}

1. Navigate to the project *Triggers* page.
2. Create a new trigger by selecting **Create trigger**:

:::figure
![](/docs/deployments/patterns/elastic-and-transient-environments/images/5865570.png)
:::

3. Add events to the trigger.
  - For **Octopus 3.6** and above, select the event group *"Machine becomes available for deployment"*.

4. Select the environments (**Test A**) that this trigger applies to.

5. Select the deployment target tags (**TradingWebServer**) that this trigger applies to.

:::figure
![](/docs/deployments/patterns/elastic-and-transient-environments/images/5865705.png)
:::

Once the trigger has been created, it will ensure that any deployment targets matching the trigger criteria will be kept up to date with the latest release of the project.

## Triggering an automatic deployment {#trigger-automatic-deployment}

To test the trigger, we will disable a deployment target, deploy to that target's environment and then re-enable the target.  Octopus should automatically deploy the release to the target when it is re-enabled.

1. Disable a target with the target tag **TradingWebServer** in the **Test A** environment:

:::figure
![](/docs/deployments/patterns/elastic-and-transient-environments/images/5865573.png)
:::

2. Create a new release of OctoFX and deploy it to the **Test A** environment.  It will skip the steps that have been scoped to the **TradingWebServer** target tag because no deployment targets are associated with that tag:

:::figure
![](/docs/deployments/patterns/elastic-and-transient-environments/images/5865574.png)
:::

3. Enable the deployment target **TAWeb01.** Octopus will automatically determine that it is missing the release we just deployed.  The deployment is re-queued and will run only for the **TAWeb01** target, creating a new log section below the original deployment log:

:::figure
![](/docs/deployments/patterns/elastic-and-transient-environments/images/5865575.png)
:::

## Overriding the release used for automatic deployments {#override-release-for-automatic-deployments}

Automatic deployments attempts to calculate the release to use for a project and environment (using the *current* and *successful* release that has been deployed, as shown in your Project Overview dashboard).  In some cases the calculated release may not be the release that should be automatically deployed, or Octopus may not be able to find a deployment for an environment (maybe you have a release, but have not yet deployed it anywhere).  It is possible to explicitly set the release that should be automatically deployed by overriding the automatic-deployment-release. Overrides can be configured using the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/) or through [Octopus.Client](/docs/octopus-rest-api/octopus.client).  Overrides define a release for a project when deploying to an environment (this can, for example, be useful for cloud-testing-automation when standing up new cloud infrastructure).  For multi-tenanted deployments, overrides may be configured for each environment/tenant combination.

**Octopus CLI**

```bash
octo create-autodeployoverride --server http://octopus/ --apiKey API-ABCDEF123456 --project HelloWorld --environment Test -version 1.3.0
octo delete-autodeployoverride --server http://octopus/ --apiKey API-ABCDEF123456 --project HelloWorld --environment Test
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

Automatic deployment overrides are cleared when a deployment is performed to the same project/environment/tenant combination as the override.  For example: if an override is set for version 1.2 of HelloWorld to the Test environment and version 1.3 of HelloWorld is deployed to the Test environment, the 1.2 override will be deleted. Release overrides will be cleared as soon as they have automated an actual deployment.

## Troubleshooting automatic deployments {#troubleshoot-automatic-deployments}

Octopus will attempt to automatically deploy the current releases for the environments that are appropriate for a machine. The current release is the one that was most recently *successfully* deployed as shown on the project dashboard. If a release is deployed and it fails, the previous successful release will continue to be automatically deployed. Octopus will not attempt automatic deployments for a project/environment/tenant while a release is being deployed to that project/environment/tenant. Once the deployment finishes, Octopus will deploy to any machines that require the deployment.

Troubleshoot automatic deployment by viewing the auto deploy logs from the diagnostics page in the configuration section or viewing the [Audit log](/docs/security/users-and-teams/auditing).

:::div{.success}
**Why isn&#39;t my trigger working?**
The verbose logs usually contain the reason why a project trigger didn't take any action. For example:

`Auto-deploy: Machine 'Local' does not need to run release '2.6.6' for project 'My Project' and tenant <none> because it already exists on the machine or is pending deployment.`
:::

## Next steps {#next-steps}

With machines now being kept up to date automatically you may be interested in [cleaning up environments](/docs/deployments/patterns/elastic-and-transient-environments/cleaning-up-environments) to automatically remove machines when they are terminated.

## Learn more

- [Deployment patterns blog posts](https://octopus.com/blog/tag/Deployment%20Patterns).