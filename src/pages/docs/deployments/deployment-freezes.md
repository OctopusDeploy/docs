---
layout: src/layouts/Default.astro
pubDate: 2024-03-25
modDate: 2024-04-10
title: Deployment freezes
description: Deployment freezes allow you to pause deployments for a specified time range
navOrder: 170
---

:::div{.hint}
Deployment freezes will be available for early access from Octopus Deploy **2024.2**. Please contact michelle.obrien@octopus.com if you would like to turn this feature on.
:::

Deployment freezes allow you to pause deployments across all spaces for a configured amount of time. This is useful when you want to prevent certain projects deploying to certain environments within a specific time frame. Without deployment freezes, you would need to manually disable specific projects or machines to stop the deployments. 

An example of how deployment freezes could be used is:

- Freezing deployments for all projects to the production environment during the holiday shut-down period.

As deployment freezes are scoped to projects and environments, both projects and environments will need to be assigned to the freeze. This will ensure that projects and environments that are not frozen will still deploy.


## Pre-requisites
As a deployment freeze needs to be scoped to projects and environments, projects and environments will need to be created before a deployment freeze can be created.


## Create a deployment freeze
1. Navigate to **Configuration ➜ Deployment Freezes** and click **ADD DEPLOYMENT FREEZE**
2. Enter a name for your deployment freeze
3. Set a start and end time for your freeze
4. Assign projects and environments to your freeze by clicking **ASSIGN SCOPE** and navigating through the wizard. At least 1 project and 1 environment per project must be selected to create a freeze.
5. Save


## Scoping deployment freezes
Deployment freezes can be scoped in the following ways:
- Projects
- Environments

During deployment, Octopus will block deployments for projects to a certain environment if a freeze is scoped to that project and environment. For example, if a freeze is active and is assigned to Project A in Production, Project A will not be deployed to Production but can still be deployed to any other environment according to the lifecycle.


## Permissions
To create and edit a deployment freeze, the DeploymentFreezeAdminister system permission is required. In addition, permissions will need to be scoped to all requested projects and environments when creating, editing or overriding a deployment freeze.

For example, imagine a deployment freeze that applies to
* Car Rental project 
* To the Production environment 

You will be allowed to view this deployment freeze on the **Deployment Freezes** page if your user doesn't have the DeploymentFreezeAdminister system permission. If your user has the DeploymentFreezeAdminister system permission and permissions scoped to the Car Rental project and Production environment, they will be able to view, edit and override this freeze.

The DeploymentFreezeAdminister permission is included in the System Administrator, System Manager and Space Manager roles.

## Overriding a freeze
Following on from the example above, imagine a scenario where a deployment freeze is currently active for the Car Rental project to the Production environment. While the freeze is active, a developer discovers that there is a bug in the production code and a fix needs to be rolled out immediately. In this scenario, the freeze can be overridden to deploy the fix to Production even while the freeze is active. After the fix is deployed, the freeze will still be in place and behave as expected. 

To override a freeze:
- Navigate to the **Deploy A Release** page of your chosen project.
- You should see an information box that shows the affected environments in the freeze
- If you have the correct permissions, the Deploy button should be green.

:::figure
![Override a deployment freeze from deploy a release page](/docs/deployments/deployment-freeze-override.png)
:::

- Click the **DEPLOY** button and enter a reason for the override in the dialog box.
- Click **OVERRIDE AND DEPLOY**

:::figure
![Override a deployment freeze confirmation dialog](/docs/deployments/deployment-freeze-override-dialog-confirm.png)
:::


## Current limitations

:::div{.hint}
As this is an early access feature, we are aware of some flaws in the UI when assigning projects and environments to the deployment freeze. If you have feedback regarding this feature please contact michelle.obrien@octopus.com.
:::

- Deployment freezes are not yet integrated with our [Executions API](https://octopus.com/blog/faster-deployments-with-the-executions-api).
- Deployment freezes currently block [automatic deployments](/docs/deployments/patterns/elastic-and-transient-environments/immutable-infrastructure/#automatically-deploying)


## Learn more

- [Projects](/docs/projects/)
- [Environments](/docs/infrastructure/environments)
- Learn more about our concept of [Spaces](/docs/administration/spaces)
