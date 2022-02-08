---
title: Cloud Target Discovery
description: Resources created in cloud providers can be discovered as deployment targets by Octopus
position: 100
---

Octopus can discover deployment targets during deployments using tags added to your cloud resources. Octopus will remove any discovered targets when the associated cloud resource is removed. Target discovery takes place before deployment steps, and is useful when your deployment process creates your target cloud infrastructure before deploying software to it.

:::hint
Using discovery of deployment targets is recommended over the existing [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md) functionality.
:::

To enable discovery use the following steps.

## Configure credentials for discovery

To perform discovery of targets from cloud resources, Octopus uses a well-known set of variables configured within your project to provide the credentials for authentication to the cloud provider. Variables can be [scoped](/docs/projects/variables/index.md#scoping-variables) allowing for different credentials to be used when performing discovery as required (for example in different environments).

The variables used are different for each supported cloud provider.

### Azure

To discover Azure cloud resources, Octopus uses an [Azure account](/docs/projects/variables/azure-account-variables.md) variable named **Octopus.Azure.Account**.

### AWS

To discover AWS cloud resources, Octopus uses an [AWS account](/docs/projects/variables/aws-account-variables.md) variable named **Octopus.AWS.Account**. TODO: Additional variables ??? can be used to authenticate using an EC2 IAM role.

## Tag cloud resources

Octopus looks for tags applied to cloud resources to discover and create deployment targets for you.

Tags are in the format `octopus-{scope}` and support the following for discovery. Note that only a single value is supported in tags at the moment.

| Tag                   | Required | Description                                                                                                                                                                         | Example                             |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `octopus-environment` | Yes      | The name of the [environment](/docs/infrastructure/environments/index.md) the target can be used in during deployments. Only deployments matching the environment will discover the target.  | `octopus-environment = Development` |
| `octopus-role`        | Yes      | The [role](/docs/infrastructure/deployment-targets/index.md#target-roles) that should be applied to the target. Only deployments with a step that matches the role will discover the target. | `octopus-role = PetShotFrontEnd`    |
| `octopus-space`       | No       | The name of the [space](/docs/administration/spaces/index.md) the target can be used in. If present only deployments within the matching space can discover the target.                      | `octopus-space = PetShopTeam`       |
| `octopus-project`     | No       | The name of the [project](/docs/projects/index.md) the target will be discovered by. If present only deployments for the matching project can discover the target.                           | `octopus-project = PetShop`         |
| `octopus-tenant`      | No       | The name of the [tenant](/docs/projects/index.md) the target can be discovered for. If present only deployments for the matching tenant will discover the target.                            | `octopus-tenant = MyClient`         |

## Add step to deployment process

Octopus will discover targets if one of the following steps are in your deployment process. Each step will discover targets that match it's target role before the step is run.

- Deploy an Azure App Service
- Deploy an Azure Web App (Web Deploy)
- Deploy Amazon ECS Service
- Update Amazon ECS Service

## Enabling discovery for existing projects

Target discovery is enabled for all new projects by default, to enable it for existing projects use the following steps.

### Enable dynamic infrastructure

To discover targets for an environment, dynamic infrastructure needs to be enabled. To enable for an existing environment:

1. Navigate to **{{Infrastructure,Environments}}**.
1. Click the ... overflow menu for the environment you want to enable or disable dynamic infrastructure on and select **Edit**.
1. Expand the **Dynamic infrastructure** section and tick or untick the check-box to enable or disable managing dynamic infrastructure.
1. Click **SAVE**.

### Enable deployments without a target

Using target discovery during a deployment means that there may be no existing targets at the start of a deployment. To allow deployments to start without any targets for an existing project:

1. Navigate to **{{Projects,{Project name},Deployments,Settings}}**.
1. Expand the **Deployment Targets Required** and select the "Allow deployments to be created when there are no deployment targets" option.
1. Click **SAVE**.

## Examples

### ECS Cluster

Let's say you have an project in Octopus called _Pet Shop_ that deploys an application to an ECS cluster in a _Development_ environment using a role of _PetShopFrontEnd_ and this cluster is dynamically created as part of the deployment using a CloudFormation template.

To use this ECS cluster previously in Octopus you might have either registered the target manually, or used a [script step](/docs/infrastructure/deployment-targets/dynamic-infrastructure/new-octopustarget.md) with custom code to try and find and create the ECS cluster target. In addition, previously when this cluster was no longer needed you might have needed to either [run a script](/docs/infrastructure/deployment-targets/dynamic-infrastructure/remove-octopustarget.md) or manually remove the target in Octopus.

By configuring credentials in a variable and adding tags to the deployment of the ECS cluster Octopus can discover this target for you and also remove the target from Octopus when it is removed in AWS.

- Configure an [AWS account](/docs/projects/variables/aws-account-variables.md) variable in your project named **Octopus.AWS.Account**, selecting an account that has permissions to be able to find the ECS cluster.
- Add tags to the CloudFormation template for the ECS cluster to allow Octopus to discover it. For our example we can add the following tags to ensure that it is discovered correctly by our (and only by our project) using [variable substitution](/docs/projects/variables/variable-substitutions.md):

```json
Tags: [
    {
        Key: "octopus-environment",
        Value: "#{Octopus.Environment.Name}"
    },
    {
        Key: "octopus-role",
        Value: "PetShopFrontEnd"
    },
    {
        Key: "octopus-project",
        Value: "#{Octopus.Project.Name}"
    }
]
```

Octopus will now discover the ECS cluster as a target before deploying to it, matching the environment, role and project from the deployment to the tags created with the CloudFormation template, without any custom scripts or manual intervention steps! Octopus will also remove this target if it is later removed from AWS.

### Azure Web App

TODO: Should we have two examples?
