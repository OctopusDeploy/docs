---
title: Deploying applications
position: 6
---


Now that you've [installed Octopus and Tentacle](/docs/home/installation.md), and you've created your [environments](/docs/home/key-concepts/environments.md) and a [project](/docs/home/key-concepts/projects.md), and your applications have been [packaged for deployment](/docs/home/packaging-applications.md), it's time to look at deploying applications with Octopus Deploy.


On this page:


- Deployment process
 - Adding steps
- Common step properties
 - Conditions
- Guides

## Deployment process


Each project has a **deployment process**, which can be found on the **Process** tab of the project in the Octopus web portal. The deployment process is like a recipe. It defines the set of instructions that will be run repeatably each time the project is deployed. The deployment process can have one or more steps, and the steps can be ordered using the **Reorder steps** link.


![](/docs/images/3048075/3277619.png)

:::hint
By default, the list of steps in a deployment process are run sequentially, one after another.


![](/docs/images/3048075/5865849.png)
Also by default, a step that is configured to execute across multiple deployment targets will execute across all of those deployment targets in parallel.

![](/docs/images/3048075/5865850.png)


For more information, see the section on [simple and advanced deployment processes](/docs/home/key-concepts/projects/deployment-processes.md) and [rolling deployments](/docs/home/patterns/rolling-deployments.md).
:::

### Adding steps


Steps can be added to the deployment process using the **Add step** button. There are many different types of steps supported by Octopus and we are adding more specific steps all the time. For more information, see the [add step](/docs/home/deploying-applications/adding-steps.md) section.

:::success
If a step you want isn't built-in you should check out the community contributed [step templates](/docs/home/deploying-applications/step-templates.md). If you still don't find it, don't forget: *Octopus can do anything, as long as you can script the instructions*. Maybe you could contribute your scripts back to the community?
:::


![](/docs/images/5671696/5865900.png)

## Common step properties


All steps have a name, which is used to identify the step.

:::success
**What&#39;s in a name?**
Be careful when changing names! Octopus commonly uses names as a convenient identity or handle to things, and the steps and actions in a deployment process are special in that way. For example you can use [output variables](/docs/home/deploying-applications/variables/output-variables.md) to chain steps together, and you use the name as the indexer for the output variable. For example: `#{Octopus.Action[StepA].Output.TestResult}`
:::

### Conditions


Steps can also have conditions. You can restrict a step so that it only runs when deploying to specific [environments](/docs/home/key-concepts/environments.md) (e.g., an Email step that only runs on production deployments).


![](/docs/images/3048075/3277617.png?effects=drop-shadow)


If you have created some [channels](/docs/home/key-concepts/projects/channels.md), you can also specify whether a step runs only when deploying a release through specific channels (e.g., a Script step that only runs for deployments through certain channels to configure extra telemetry). *This will only appear if you have created one or more non-default channels.*


![](/docs/images/3048075/3278573.png?effects=drop-shadow)


You can also specify whether a step runs only when previous steps are successful (default), when a previous step fails, or always.





![](/docs/images/3048075/3277616.png?effects=drop-shadow)

:::success
You can achieve very complex deployment processes in Octopus by leveraging advanced concepts like parallel execution of steps and rolling deployments. Learn more about [simple and complex deployment processes](/docs/home/key-concepts/projects/deployment-processes.md).
:::

## In this section


- [Adding steps](/docs/home/deploying-applications/adding-steps.md)
- [Deploying packages](/docs/home/deploying-applications/deploying-packages.md)
 - [Transfer Package](/docs/home/deploying-applications/deploying-packages/transfer-package.md)
 - [Troubleshoot missing packages](/docs/home/deploying-applications/deploying-packages/troubleshoot-missing-packages.md)
- [Configuration files](/docs/home/deploying-applications/configuration-files.md)
 - [Advanced Configuration Transforms Examples](/docs/home/deploying-applications/configuration-files/advanced-configuration-transforms-examples.md)
- [Custom Installation Directory](/docs/home/deploying-applications/custom-installation-directory.md)
- [IIS Websites and Application Pools](/docs/home/deploying-applications/iis-websites-and-application-pools.md)
- [Windows Services](/docs/home/deploying-applications/windows-services.md)
- [Custom scripts](/docs/home/deploying-applications/custom-scripts.md)
 - [Standalone scripts](/docs/home/deploying-applications/custom-scripts/standalone-scripts.md)
 - [Azure PowerShell scripts](/docs/home/deploying-applications/custom-scripts/azure-powershell-scripts.md)
 - [Naked Scripting](/docs/home/deploying-applications/custom-scripts/naked-scripting.md)
- [Delta compression for package transfers](/docs/home/deploying-applications/delta-compression-for-package-transfers.md)
- [Email notifications](/docs/home/deploying-applications/email-notifications.md)
- [Step Templates](/docs/home/deploying-applications/step-templates.md)
- [SQL Server databases](/docs/home/deploying-applications/sql-server-databases.md)
- [Guided failures](/docs/home/deploying-applications/guided-failures.md)
- [Manual intervention and approvals](/docs/home/deploying-applications/manual-intervention-and-approvals.md)
- [Scheduled Deployments](/docs/home/deploying-applications/scheduled-deployments.md)
- [Automatic Release Creation](/docs/home/deploying-applications/automatic-release-creation.md)
- [Automatic Deployment Triggers](/docs/home/deploying-applications/automatic-deployment-triggers.md)
- [Run steps in parallel](/docs/home/deploying-applications/run-steps-in-parallel.md)
- [Artifacts](/docs/home/deploying-applications/artifacts.md)
- [Variables](/docs/home/deploying-applications/variables.md)
 - [Scoping variables](/docs/home/deploying-applications/variables/scoping-variables.md)
 - [Binding syntax](/docs/home/deploying-applications/variables/binding-syntax.md)
 - [Library variable sets](/docs/home/deploying-applications/variables/library-variable-sets.md)
 - [Prompted variables](/docs/home/deploying-applications/variables/prompted-variables.md)
 - [Sensitive variables](/docs/home/deploying-applications/variables/sensitive-variables.md)
 - [System variables](/docs/home/deploying-applications/variables/system-variables.md)
 - [Output variables](/docs/home/deploying-applications/variables/output-variables.md)
 - [Variable templates](/docs/home/deploying-applications/variables/variable-templates.md)
- [Deploying to Azure](/docs/home/deploying-applications/deploying-to-azure.md)
 - [Deploying a package to an Azure Cloud Service](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service.md)
  - [Azure steps migrated from Octopus Deploy 2](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-cloud-service/azure-steps-migrated-from-octopus-deploy-2.md)
 - [Deploying a package to an Azure Web App](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app.md)
  - [Deploying Web Jobs](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/deploying-web-jobs.md)
  - [Using Deployment Slots with Azure Web Apps](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps.md)
  - [Using Deployment Slots with Azure Web Apps copy](/docs/home/deploying-applications/deploying-to-azure/deploying-a-package-to-an-azure-web-app/using-deployment-slots-with-azure-web-apps-copy.md)
- [Substitute Variables in Files](/docs/home/deploying-applications/substitute-variables-in-files.md)
- [Blocking Deployments](/docs/home/deploying-applications/blocking-deployments.md)
- [Docker Containers](/docs/home/deploying-applications/docker-containers.md)
 - [Docker Registries as Feeds](/docs/home/deploying-applications/docker-containers/docker-registries-as-feeds.md)
 - [Accessing Container Details](/docs/home/deploying-applications/docker-containers/accessing-container-details.md)
 - [Docker Compose](/docs/home/deploying-applications/docker-containers/docker-compose.md)
- [Deploying Virtual Hard Drives](/docs/home/deploying-applications/deploying-virtual-hard-drives.md)

## Guides


- [Azure deployments](/docs/home/guides/azure-deployments.md)
 - [Cloud Services](/docs/home/guides/azure-deployments/cloud-services.md)
  - [Getting started with Azure Cloud Services](/docs/home/guides/azure-deployments/cloud-services/getting-started-with-azure-cloud-services.md)
  - [VIP Swap](/docs/home/guides/azure-deployments/cloud-services/vip-swap.md)
  - [Cloud Service concepts](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts.md)
   - [Packaging Cloud Services](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/packaging-cloud-services.md)
   - [Cloud Service accounts](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/cloud-service-accounts.md)
   - [Cloud Service deployment step](/docs/home/guides/azure-deployments/cloud-services/cloud-service-concepts/cloud-service-deployment-step.md)
 - [Creating an Azure Account](/docs/home/guides/azure-deployments/creating-an-azure-account.md)
  - [Creating an Azure Management Certificate Account](/docs/home/guides/azure-deployments/creating-an-azure-account/creating-an-azure-management-certificate-account.md)
  - [Creating an Azure Service Principal Account](/docs/home/guides/azure-deployments/creating-an-azure-account/creating-an-azure-service-principal-account.md)
 - [Resource Groups](/docs/home/guides/azure-deployments/resource-groups.md)
  - [Deploy using an Azure Resource Group Template](/docs/home/guides/azure-deployments/resource-groups/deploy-using-an-azure-resource-group-template.md)
 - [Running Azure PowerShell](/docs/home/guides/azure-deployments/running-azure-powershell.md)
  - [Configuring the version of the Azure PowerShell modules](/docs/home/guides/azure-deployments/running-azure-powershell/configuring-the-version-of-the-azure-powershell-modules.md)
 - [Varying Azure Subscription by Environment](/docs/home/guides/azure-deployments/varying-azure-subscription-by-environment.md)
 - [Web Apps](/docs/home/guides/azure-deployments/web-apps.md)
  - [Getting started with Azure Web Apps](/docs/home/guides/azure-deployments/web-apps/getting-started-with-azure-web-apps.md)
  - [Web App concepts](/docs/home/guides/azure-deployments/web-apps/web-app-concepts.md)
   - [Packaging Web Apps](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/packaging-web-apps.md)
   - [Web App accounts](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-accounts.md)
   - [Web App deployment step](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step.md)
    - [Preserve Specific Paths When Deploying Azure Web App](/docs/home/guides/azure-deployments/web-apps/web-app-concepts/web-app-deployment-step/preserve-specific-paths-when-deploying-azure-web-app.md)
- [Deploying ASP.NET Core Web Applications](/docs/home/guides/deploying-asp.net-core-web-applications.md)
 - [JSON Configuration Variables Feature](/docs/home/guides/deploying-asp.net-core-web-applications/json-configuration-variables-feature.md)
 - [NanoPack](/docs/home/guides/deploying-asp.net-core-web-applications/nanopack.md)
- [Multi-tenant deployments](/docs/home/guides/multi-tenant-deployments.md)
 - [Multi-tenant deployment guide](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide.md)
  - [Creating your first tenant](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-tenant.md)
  - [Creating your first multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/creating-your-first-multi-tenant-project.md)
  - [Deploying a simple multi-tenant project](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/deploying-a-simple-multi-tenant-project.md)
  - [Working with tenant-specific variables](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-tenant-specific-variables.md)
  - [Working with groups of tenants using tags](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/working-with-groups-of-tenants-using-tags.md)
  - [Designing a multi-tenant hosting model](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-hosting-model.md)
  - [Designing a multi-tenant upgrade process](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/designing-a-multi-tenant-upgrade-process.md)
  - [Multi-tenant roles and security](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployment-guide/multi-tenant-roles-and-security.md)
 - [Multi-tenant deployments FAQ](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-faq.md)
 - [Other scenarios for multi-tenant deployments](/docs/home/guides/multi-tenant-deployments/other-scenarios-for-multi-tenant-deployments.md)
 - [Troubleshooting multi-tenant deployments](/docs/home/guides/multi-tenant-deployments/troubleshooting-multi-tenant-deployments.md)
 - [Multi-tenant deployments prior to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4.md)
  - [Migrating to Octopus 3.4](/docs/home/guides/multi-tenant-deployments/multi-tenant-deployments-prior-to-octopus-3.4/migrating-to-octopus-3.4.md)
- [Node on \*Nix deployments](/docs/home/guides/node-on-nix-deployments.md)
 - [Configuring Target Machine](/docs/home/guides/node-on-nix-deployments/configuring-target-machine.md)
 - [Create & Push Node.js Project](/docs/home/guides/node-on-nix-deployments/create-&-push-node.js-project.md)
 - [Configure Octopus Deploy Project](/docs/home/guides/node-on-nix-deployments/configure-octopus-deploy-project.md)
- [User Role & Teams Configurations](/docs/home/guides/user-role-&-teams-configurations.md)
 - [Creating teams for a user with mixed environment privileges](/docs/home/guides/user-role-&-teams-configurations/creating-teams-for-a-user-with-mixed-environment-privileges.md)
- [Use the Team Foundation Build Custom Task](/docs/home/guides/use-the-team-foundation-build-custom-task.md)
 - [Manually install the Build Task (not recommended)](/docs/home/guides/use-the-team-foundation-build-custom-task/manually-install-the-build-task-(not-recommended).md)
- [Elastic and Transient Environments](/docs/home/guides/elastic-and-transient-environments.md)
 - [Deploying to transient targets](/docs/home/guides/elastic-and-transient-environments/deploying-to-transient-targets.md)
 - [Deploying to transient targets copy](/docs/home/guides/elastic-and-transient-environments/deploying-to-transient-targets-copy.md)
 - [Keeping deployment targets up to date](/docs/home/guides/elastic-and-transient-environments/keeping-deployment-targets-up-to-date.md)
 - [Cleaning up environments](/docs/home/guides/elastic-and-transient-environments/cleaning-up-environments.md)
 - [Immutable Infrastructure](/docs/home/guides/elastic-and-transient-environments/immutable-infrastructure.md)
- [Server Extensibility](/docs/home/guides/server-extensibility.md)
 - [Authoring an Octopus Deploy server extension](/docs/home/guides/server-extensibility/authoring-an-octopus-deploy-server-extension.md)
 - [Building an Authentication Provider](/docs/home/guides/server-extensibility/building-an-authentication-provider.md)
  - [Building a Forms based Authentication Provider](/docs/home/guides/server-extensibility/building-an-authentication-provider/building-a-forms-based-authentication-provider.md)
  - [Building an External authentication provider](/docs/home/guides/server-extensibility/building-an-authentication-provider/building-an-external-authentication-provider.md)
 - [Customising an Octopus Deploy server extension](/docs/home/guides/server-extensibility/customising-an-octopus-deploy-server-extension.md)
 - [Installing a custom server extension](/docs/home/guides/server-extensibility/installing-a-custom-server-extension.md)
- [Octopus HA](/docs/home/guides/octopus-ha.md)
 - [Load balancers](/docs/home/guides/octopus-ha/load-balancers.md)
  - [Configuring Netscaler](/docs/home/guides/octopus-ha/load-balancers/configuring-netscaler.md)
- [Docker](/docs/home/guides/docker.md)
 - [Docker run with networking](/docs/home/guides/docker/docker-run-with-networking.md)
- [Coordinating Multiple Projects](/docs/home/guides/coordinating-multiple-projects.md)
 - [Project Coordination Code Samples](/docs/home/guides/coordinating-multiple-projects/project-coordination-code-samples.md)
- [Deploying HTML and JavaScript Applications](/docs/home/guides/deploying-html-and-javascript-applications.md)
- [Deploying Java applications](/docs/home/guides/deploying-java-applications.md)
