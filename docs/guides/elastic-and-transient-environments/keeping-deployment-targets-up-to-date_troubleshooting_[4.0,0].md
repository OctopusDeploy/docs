## Troubleshooting automatic deployments {#Keepingdeploymenttargetsuptodate-TroubleshootingTroubleshootingautomaticdeployments}

Octopus will attempt to automatically deploy the current releases for the environments that are appropriate for a machine. The current release is the one that was most recently *successfully* deployed as shown on the project dashboard. If a release is deployed and it fails, the previous successful release will continue to be automatically deployed. Octopus will not attempt automatic deployments for a project/environment/tentant while a release is being deployed to that project/environment/tenant. Once the deployment finishes, Octopus will deploy to any machines that require the deployment.

Troubleshoot automatic deployment by viewing the auto deploy logs from the diagnostics page in the configuration section or viewing the [Audit log](/docs/administration/auditing.md):

![](/docs/images/5669262/5865582.png "width=500")

:::success
**Why isn&#39;t my trigger working?**
The verbose logs usually contain the reason why a project trigger didn't take any action. For example:

`Auto-deploy: Machine 'Local' does not need to run release '2.6.6' for project 'My Project' and tenant <none> because it already exists on the machine or is pending deployment.`
:::