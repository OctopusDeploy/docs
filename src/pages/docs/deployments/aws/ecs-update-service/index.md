---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Update Amazon ECS Service
description: Update an existing Amazon ECS Service.
---

Octopus supports deploying a new release to an existing ECS Service through the `Update Amazon ECS Service` step.
This step provides an opinionated deployment workflow that allows new released to be deployed to an ECS Cluster that is managed externally, for example manually or via Terraform.

Choose this step if you have an existing ECS cluster, service, and task definition, and want Octopus to update your task definition for you during deployments.  

:::div{.hint}
The `Update Amazon ECS Step` was added in Octopus **2021.3**.
:::

At a high level, the `Update Amazon ECS Service` step will:

* Select the Docker image tags for the task definition (version selection is performed when creating a release).
* Fetch an existing Task Definition to use as a template.
* Create a new Task Definition revision based on the template definition and the step configuration provided.
* Update the Service to use the newly created Task Definition.

The following instructions can be followed to configure the `Update Amazon ECS Service` step.

## Step 1: Make a note of your ECS cluster's settings

:::div{.hint}
Refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create_cluster.html) for detailed instructions on how to provision a new ECS cluster.
:::

The following settings will need to be configured:

* Name of the ECS cluster
* Cluster's region

## Step 2: Create a deployment target for your ECS cluster

The `Update Amazon ECS Service` step requires [a deployment target](/docs/infrastructure/deployment-targets) to be defined.

Select the `AWS Account` under the `ECS Cluster` section and provide the cluster's AWS region and name.
If you don't have an `AWS Account` defined yet, check our [documentation on how to set one up](/docs/infrastructure/accounts/aws).

:::figure
![ECS Cluster Deployment Target Settings](/docs/deployments/aws/ecs-update-service/images/target.png)
:::

:::div{.hint}
The benefits of using deployment targets for ECS are outlined in the [ECS RFC blog post](https://octopus.com/blog/rfc-ecs-integration-with-octopus#why-use-targets).
:::

## Step 3: Add the Update ECS Service step

Add the `Update Amazon ECS Service` step to the project, and provide it a name.

As the step is using a deployment target a target role will also need to be specified.
The role will be used to determine which ECS cluster to deploy to.
Use the same role that you applied to your deployment target in Step 2.

:::figure
![Update ECS Step General Settings](/docs/deployments/aws/ecs-update-service/images/update-ecs-general-settings.png)
:::

### Configuration section

Specify the name of your Destination Task Definition.
This is the task definition that will receive a new revision upon deploy.

Lastly, specify the name of the service to be updated.
Upon deployment, the named service will be updated to refer to the newly created task definition revision.

:::figure
![Update ECS Step Configuration Section](/docs/deployments/aws/ecs-update-service/images/update-ecs-configuration.png)
:::

### Container Definitions section

At least one container definition must be specified when updating a task definition.

:::figure
![Update ECS Step Container Definitions Section](/docs/deployments/aws/ecs-update-service/images/update-ecs-container-definitions.png)
:::

Specify the container name that will be used to locate the container definition within your task and select a feed and image that will be run by your task.
The specific image version will be specified later, when creating a release.

:::figure
![ECS Step Container Definition Parameters](/docs/deployments/aws/ecs-update-service/images/update-ecs-container-definition.png)
:::

#### Environment Files

List up to 10 environment files to be added to the container.
Environment files should be stored in S3, they must have a ".env" extension, and each line should contain a "VARIABLE=VALUE" variable definition.

The configured environment file list can be used to either completely replace or be appended to the container's existing environment file list.

Each environment file has a type to configure the storage device (S3 is currently the only option) and a source to specify the location within that storage (for S3, this is an ARN).

:::figure
![Update ECS Step Container Definition Environment Files](/docs/deployments/aws/ecs-update-service/images/update-ecs-environment-files.png)
:::

#### Environment Variables

You can add either plain text or secret environment variables to the container.
Plain text environment variables will use the value provided, while secret variables refer to a secret value stored in the AWS Secrets Manager.

The configured environment variables can either completely replace the container's existing environment variables or be merged with them.
Merging environment variables will add any new variables and overwrite the value of any existing variables with the same key.

:::figure
![Update ECS Step Container Definition Environment Variables](/docs/deployments/aws/ecs-update-service/images/update-ecs-environment-variables.png)
:::

### Tags section

Specify any additional tags that should be added to the task definition and service. Tags can be used to attach arbitrary metadata to categorize and organize resources. For more information see the [ECS Documentation](https://oc.to/ECSUsingTags)

:::figure
![ECS Step Tags](/docs/deployments/aws/ecs-update-service/images/update-ecs-tags.png)
:::

### Advanced Options section

Optionally, specify the name of the Template Source Task Definition.
If provided, this task definition will be used as a template for the new task definition.
This configuration allows the template task definition to be updated without conflicting with the changes made to the target task definition during deployment.

:::figure
![ECS Advanced Options](/docs/deployments/aws/ecs-update-service/images/update-ecs-advanced-options.png)
:::

### Deployment Options section

You can optionally change whether the step should wait until the release is fully deployed by changing the `Wait Option` selection.
By default, the step will wait until all of the ECS Tasks within the target service are running (or failed to run).

:::figure
![ECS Step Deployment Options section](/docs/deployments/aws/ecs-update-service/images/update-ecs-deployment-option.png)
:::

:::div{.hint}
Selecting the `Don't wait` option means that the step will not fail if the tasks fail to properly start.
:::

#### Variable replacements

Any of the input fields can be bound to an Octostache expression. [Variable substitution](/docs/projects/variables/variable-substitutions) will be performed before the release is deployed.

### Output variables

Presently, the step outputs the following variables.

| Name        | Description |
| ------------| ----------- |
|`TaskDefinitionRevision` | The revision number of the newly created task (if a new revision was created) |
|`TaskDefinitionFamily` | The name of a family that the new task definition is registered to (if a new revision was created) |
|`ClusterName` | The name of the cluster to which the updated service belongs |
|`ServiceName` | The name of the updated service |
|`Region` | The AWS region in which the operations were executed |

## Error messages

If a deployment failure is detected, the step will attempt to extract error messages from the task spawned from the ECS service and task definitions. In some cases, these messages can include errors and warnings from previous deployment attempts. Unfortunately, the step cannot distinguish which errors are relevant and will err on the side of over-communication. In most cases, the error log should provide enough information to resolve any issues without referring to the AWS Dashboard or other tools.

### ECS Update Validation Error

This error indicates that one or more of the step's inputs are invalid. Typically, this can happen when values are supplied as bound expressions and could not be resolved until a new release is deployed. The ECS step will run an additional validation check before attempting to perform the deployment. Some examples of input values that can cause this error are:
* Non-unique tag and/or environment variable keys.
* Bound expressions resolving to empty values when the field is required.