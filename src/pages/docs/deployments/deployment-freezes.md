---
layout: src/layouts/Default.astro
pubDate: 2024-03-25
modDate: 2024-05-22
title: Deployment freezes
description: Deployment freezes allow you to pause deployments for a specified time range
navOrder: 170
---

Deployment freezes allow you to prevent deployments for a configured amount of time. This is useful when you want to prevent certain projects deploying to certain environments within a specific time frame. Without deployment freezes, you would need to manually disable specific projects or machines to stop the deployments. 

Examples of how deployment freezes could be used:

- Freezing deployments for all projects to the production environment during the holiday shut-down period
- Preventing deployments to production during business hours using recurring freezes
- Blocking deployments to specific tenants during their critical business periods

As deployment freezes are scoped to projects and environments, both projects and environments will need to be assigned to the freeze. This will ensure that projects and environments that are not frozen will still deploy.

While a deployment freeze is in place for a project and environment:
- New deployments are prevented from being created
- Any existing deployments that start executing during the freeze will fail
- Automatically triggered deployments fail, except for deployments created by machine triggers


## Pre-requisites
As a deployment freeze needs to be scoped to projects and environments, projects and environments will need to be created before a deployment freeze can be created. If you plan to use tenant-scoped freezes, you'll need to have tenants configured as well.


## Create a deployment freeze
1. Navigate to **Configuration ➜ Deployment Freezes** and click **ADD DEPLOYMENT FREEZE**
2. Enter a name for your deployment freeze
3. Set a start and end time for your freeze
4. (Optional) Configure recurring schedules if you want the freeze to repeat automatically
5. Set up the scope for your freeze by clicking **ASSIGN SCOPE**. You must configure either:
   - Project scope: Select at least one project and environment combination, or
   - Tenant scope: Select at least one tenant with its associated project and environment, or
   - Both project and tenant scope together
6. Save

Note: You must have at least one type of scope (project or tenant) configured before you can save the deployment freeze.


## Scoping deployment freezes
Deployment freezes can be scoped in the following ways:
- Projects
- Environments
- Tenants

During deployment, Octopus will block deployments for projects to a certain environment if a freeze is scoped to that project and environment. For example, if a freeze is active and is assigned to Project A in Production, Project A will not be deployed to Production but can still be deployed to any other environment according to the lifecycle.

### Tenant scope
When using tenant scoping, deployments will only be blocked for the specific tenants included in the freeze while other tenants can still receive deployments. In the tenant scope section of the freeze configuration:

1. Click **Assign Tenants** to select the tenants to include in the freeze
2. For each tenant, you can specify:
   - The tenant it applies to
   - The project it applies to
   - The environment where the freeze will be active

The tenant scope table will show you all assigned tenants and their associated project and environment combinations.

## Recurring freezes
You can set up deployment freezes that automatically repeat on a schedule. This is useful for:
- Daily protection windows during business hours
- Weekly maintenance windows
- Monthly release cycles
- Annual business events

The system supports these recurring patterns:
- Daily
- Weekly
- Monthly
- Annual
- Custom... (for more complex recurrence patterns)

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

## Deployment freezes and automatic deployments
During deployment freezes, automatic deployments based on deployment target triggers are allowed. This ensures that your deployment targets will be updated with the latest deployments when you scale up.

All other automatic deployments, such as scheduled deployment or automatic lifecycle promotions, are blocked by deployment freezes.

## Automation and integration
You can automate and integrate deployment freezes into your workflows using:
- The Octopus REST API with the Go client
- The Terraform provider with the `octopusdeploy_deployment_freeze` resource

For examples and detailed information, refer to:
- [Octopus REST API - Go Client](https://github.com/OctopusDeploy/go-octopusdeploy)
- [Terraform provider: Deployment Freeze example](https://github.com/OctopusDeployLabs/terraform-provider-octopusdeploy/tree/main/examples/resources/octopusdeploy_deployment_freeze)

## Learn more

- [Projects](/docs/projects/)
- [Environments](/docs/infrastructure/environments)
- [Tenants](/docs/tenants)
- Learn more about our concept of [Spaces](/docs/administration/spaces)
