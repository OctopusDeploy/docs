---
title: Reflected Targets
description: Octopus resources created in cloud providers can be discovered automatically by Octopus
position: 100
---

Octopus can automatically discover deployment targets during deployment using tags added to cloud resources. These targets that are automatically discovered will also be removed from Octopus when the associated cloud resource is removed. Automatic discovery will take place before the relevant deployment step and can be used as part of deployment processes that create your cloud infrastructure before deployment.

:::hint
Using automatic discovery of deployment targets is recommended over the existing [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure) functionality.
:::

To enable automatic discovery and clean up of targets use the following steps:

## Enable dynamic infrastructure

Dynamic infrastructure is enabled by default when a new environment is created, or it can be enabled or disabled for existing environments.

1. Navigate to **{{Infrastructure,Environments}}**.
1. Click the ... overflow menu for the environment you want to enable or disable dynamic infrastructure on and select **Edit**.
1. Expand the **Dynamic infrastructure** section and tick or untick the check-box to enable or disable managing dynamic infrastructure.
1. Click **SAVE**.

## Enable deployments without a target

Using automatic discovery of targets during means that there may be no existing targets at the start of a deployment. The deployment setting allowing deployments without a target is enabled by default for new projects, or it can be enabled or disabled for existing projects.

1. Navigate to **{{Projects,{Project name},Deployments,Settings}}**.
1. Expand the **Deployment Targets Required** and select the "Allow deployments to be created when there are no deployment targets" option.
1. Click **SAVE**.

## Configure credentials for discovery

To perform discovery of targets from cloud resources, Octopus uses a well-known set of variables from within your project to provide the credentials for authentication to the cloud provider. Variables can be [scoped](/docs/projects/variables/index.md#scoping-variables) allowing for different credentials to be used when performing discovery as required (for example in different environments).

The variables used are different for each supported cloud provider.

### Azure

To discover Azure cloud resources, Octopus uses an [Azure account](/docs/projects/variables/azure-account-variables.md) variable named **Octopus.Azure.Account**.

### AWS

To discover AWS cloud resources, Octopus uses an [AWS account](/docs/projects/variables/aws-account-variables.md) variable named **Octopus.AWS.Account**. TODO: Additional variables ??? can be used to authenticate using an EC2 IAM role.

## Tag cloud resources

Octopus looks for tags applied to cloud resources to discover and create deployment targets automatically for you.

Tags are in the format `octopus-{scope}` and support the following for discovery. Note that only a single value is supported in tags at the moment.

- `octopus-environment`: The name of the [environment](/docs/infrastructure/environments) the target can be used in during deployments. This tag is required and only deployments for the environment will discover the target.
- `octopus-role`: The [role](/docs/infrastructure/deployment-targets#target-roles) that should be applied to the target. This tag is required and only deployments with a step that matches the role will discover the target.
- `octopus-space`: The name of the [space](/docs/administration/spaces) the target can be used in. This tag is optional and if present only deployments within the matching space can discover the target.
- `octopus-project`: The name of the [project](/docs/projects) the target will be discovered by. This tag is optional and if present only deployments for the matching project can discover the target.
- `octopus-tenant`: The name of the [tenant](/docs/projects) the target can be discovered for. This tag is optional and if present only deployments for the matching tenant will discover the target.

## Examples

### ECS Cluster

As an example, let's say you have an project in Octopus called _Pet Shop_ that deploys an application to an ECS cluster in a _Development_ environment using a role of _PetShopFrontEnd_ and this cluster is dynamically created as part of the deployment using a CloudFormation template.

To use this ECS cluster previously in Octopus you might have had to put in a [manual intervention step](/docs/projects/built-in-step-templates/manual-intervention-and-approvals) and manually create the target, or add a [script step](/docs/infrastructure/deployment-targets/dynamic-infrastructure/new-octopustarget.md) with custom code to try and find and create the ECS cluster target. In addition, previously when this cluster was no longer needed you might have needed to either [run a script](/docs/infrastructure/deployment-targets/dynamic-infrastructure/remove-octopustarget.md) or manually remove the target in Octopus.

By configuring credentials in a variable and adding tags to the deployment of the ECS cluster Octopus can automatically discover this target and also remove the target from Octopus when it is removed in AWS.

- Configure an [AWS account](/docs/projects/variables/aws-account-variables.md) variable in your project named **Octopus.AWS.Account**, selecting an account that has permissions to be able to find the ECS cluster.
- Add tags to the CloudFormation template for the ECS cluster to allow Octopus to discover it automatically. For our example we can add the following tags to ensure that it is discovered correctly by our (and only by our project) using [variable substitution](/docs/projects/variables/variable-substitutions.md):

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

Octopus will now discover the ECS cluster automatically as a target before deploying to it, matching the environment, role and project from the deployment to the tags created with the CloudFormation template, without any custom scripts or manual intervention steps! Octopus will also automatically remove this target if it is later removed from AWS.
