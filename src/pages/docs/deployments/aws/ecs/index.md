---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Deploy Amazon ECS Service
description: Deploy a service to an Amazon ECS cluster.
---

Octopus supports deployments to ECS clusters through the `Deploy Amazon ECS Service` step. This step provides an opinionated deployment workflow that combines a Fargate task definition and service into a single step.

Choose this step if you have an ECS cluster, and want Octopus to create and manage your service and task definition for you.  

:::div{.hint}
The `Deploy Amazon ECS Service` step was added in Octopus **2021.3**. Presently only **Fargate** clusters are supported.
:::

At a high level, the `Deploy Amazon ECS Service` step will:

* Select the Docker image tags for the task definition (version selection is performed when creating a release).
* Build a CloudFormation template with:
    * A task definition with the details specific to the deployment for the selected environment and docker image tags.
    * A service that references the task definition.
* Perform variable substitution on the CloudFormation template.
* Deploy a CloudFormation stack with the template.
* In subsequent deployments, update the deployed CloudFormation stack with an updated task definition.

The followed instructions can be used to configure the `Deploy Amazon ECS Service` step. We have chosen not to document some fields here as they map directly to ECS settings and are well documented in the AWS documentation (a link to the relevant documentation section is typically provided in each fields' notes in the Octopus UI). 

## Step 1: Make a note of your ECS cluster's settings

:::div{.hint}
Refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create_cluster.html) for detailed instructions on how to provision a new ECS cluster. When presented with the `Select cluster compatibility` screen select the `Networking only` option, this will automatically associate your cluster with the `FARGATE` capacity provider.
:::

Configuring an ECS service for the first time can be quite intimidating due to a large number of available options. Fortunately, most of them are optional. At a minimum the following settings will need to be configured:

* Name of the ECS cluster
* Cluster's region
* Ids of the VPC subnets the service and task will be deployed within
* Ids of the security groups the service and task will be associated with

## Step 2: Create a deployment target for your ECS cluster

The `Deploy Amazon ECS Service` step requires [a deployment target](/docs/infrastructure/deployment-targets) to be defined.

Select the `AWS Account` under the `ECS Cluster` section and provide the cluster's AWS region and name. If you don't have an `AWS Account` defined yet, check our [documentation on how to set one up](/docs/infrastructure/accounts/aws).

:::figure
![ECS Cluster Deployment Target Settings](/docs/deployments/aws/ecs/images/target.png)
:::

:::div{.hint}
The benefits of using deployment targets for ECS are outlined in the [ECS RFC blog post](https://octopus.com/blog/rfc-ecs-integration-with-octopus#why-use-targets).
:::

## Step 3: Add the ECS step

Add the `Deploy Amazon ECS Service` step to the project, and provide it a name.

As the step is using a deployment target a target role will also need to be specified. The role will be used to determine which ECS cluster to deploy to. Use the same role that you applied to your deployment target in Step 2.

:::figure
![ECS Step General Settings](/docs/deployments/aws/ecs/images/ecs-step-1.png)
:::

:::div{.hint}
CloudFormation service names will be automatically generated and cannot be changed manually.
:::

### Configuration section

Specify a name for your task definition. Up to 255 letters (uppercase and lowercase), numbers, hyphens, and underscores are allowed.

The task role controls access from within the task running the container. For example, task role can be used to control access to other AWS resources such as S3 buckets.

:::figure
![ECS Step Configuration Section](/docs/deployments/aws/ecs/images/ecs-configuration.png)
:::

### Task Execution IAM Role section

Under the **Task Execution IAM Role** section, the Task Execution Role can optionally be defined. If you don't specify it, the step will create one automatically and assign the `arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy` role to it.

Task Execution Role is used by ecs-agent which runs on ECS to access AWS resources (for example, ECR feeds) and write logs to CloudWatch. The `AmazonECSTaskExecutionRolePolicy` role assigned by default should be sufficient for most scenarios.

:::div{.hint}
Additional permissions might need to be assigned to the task execution role if your tasks pull container images from private repositories. For more information, refer to the [AWS documentation](https://oc.to/ECSContainerDefinitionRegistryAuth).
:::

:::figure
![ECS Step Task Execution IAM Role](/docs/deployments/aws/ecs/images/ecs-task-execution-role.png)
:::

### Task Size section

Specify the total memory and CPU limits for the task definition. The sum of each individual containers' limits cannot exceed the total limit defined here.

:::figure
![ECS Step Task Size](/docs/deployments/aws/ecs/images/ecs-task-size.png)
:::

### Network Configuration section

Specify the Security Groups and Subnets in the clusters VPC that will be attached to the resulting service.

:::figure
![ECS Step Network Configuration](/docs/deployments/aws/ecs/images/ecs-network-configuration.png)
:::

### Tags section

Specify whether to enable Amazon ECS managed tags. Changing this value will force the service to be re-created.

:::div{.hint}
Octopus automatically adds stack-level tags that propagate to the task definition and the service. The full list of these auto-generated tags can be found in our [Architecture repository](https://github.com/OctopusDeploy/Architecture/blob/main/Steps/StepDesignGuidelines/#tags-and-labels).
:::

No more than 20 additional tags can be provided.

:::figure
![ECS Step Tags](/docs/deployments/aws/ecs/images/ecs-tags.png)
:::

### Container Definitions section

At least one container definition must be specified when registering a task definition.

:::figure
![ECS Step Container Definitions Section](/docs/deployments/aws/ecs/images/ecs-container-section.png)
:::

Specify the container name that will be used to reference the particular container definition within your task, and select a feed and image that will be run by your task. The specific image version will be specified later, when creating a release.

To authenticate with private repositories you can either rely on the default IAM authentication or manually provide the ARN of the secret created in AWS Secrets Manager. For more information, refer to the [AWS documentation](https://oc.to/ECSContainerDefinitionRegistryAuth). For images stored in Amazon ECR no further configuration is required.

Specify the ports exposed by the container here. These can be referenced in the overall step configuration in the **Load Balancer Mappings** section if you wish to publicly expose the ports.

:::figure
![ECS Step Container Definition Parameters](/docs/deployments/aws/ecs/images/ecs-container-definition.png)
:::

#### Health Check section

This section directly corresponds to Docker health check parameters. Specifying these settings will override the values built into the container image. For more information, refer to the [Docker documentation](https://docs.docker.com/engine/reference/builder/#healthcheck).

:::figure
![ECS Step Container Definition Health Check](/docs/deployments/aws/ecs/images/ecs-health-check.png)
:::

#### Environment section

Specify additional options for the running container, such as `Entry Point`, `Working Directory` and `Environment Variables`.

:::figure
![ECS Step Container Definition Environment](/docs/deployments/aws/ecs/images/ecs-container-environment.png)
:::

#### Container Storage and Logging section

In this section, you can specify mount points for the running container. Mount points can refer to the volumes specified in the **Volumes** section of the ECS step.

For container logging the step can either auto-configure CloudWatch logs, or you can provide logging configuration manually. If you choose to have CloudWatch logs auto-configured, please ensure that you have specified a Task Execution Role ARN for this step. 

:::figure
![ECS Step Container Definition Storage and Logging](/docs/deployments/aws/ecs/images/ecs-container-storage-and-logging.png)
:::

#### FireLens Configuration section

In this section, you can enable a container to act as a log router using AWS FireLens. When enabled you can configure the configuration format to use, as well as properties for metadata and custom configuration files.

:::div{.hint}
To enable FireLens configuration, your Deploy Amazon ECS Service step needs to be upgraded to use version 2. See [Automatic Step Template Updates](/docs/projects/built-in-step-templates/automatic-updates) for more information on automatic updates to steps and updating to new major versions of steps.
:::

:::figure
![ECS Step Container Definition FireLens Configuration](/docs/deployments/aws/ecs/images/ecs-container-firelens.png)
:::

### Deployment section

Specify the minimum and maximum health percentages for the resulting service. These settings enable scenarios such as [Rolling deployments](/docs/deployments/patterns/rolling-deployments). When the maximum health percentage is set above 100% ECS will attempt to start new tasks before bringing down old ones. On the other hand, the minimum health percentage will allow ECS to bring down tasks when the cluster does not have enough capacity to handle the load.

:::figure
![ECS Step Deployment section](/docs/deployments/aws/ecs/images/ecs-deployment.png)
:::

### Deployment Options section

You can optionally change whether the step should wait until the CloudFormation stack fully deploys by changing the `Wait Option` selection. By default, the step will wait until the CloudFormation stack deployment is complete and the resulting ECS Task is running (or failed to run).

:::figure
![ECS Step Deployment Options section](/docs/deployments/aws/ecs/images/ecs-deployment-options.png)
:::

:::div{.hint}
Selecting the `Don't wait` option means that the step will not fail if the CloudFormation deployment fails.
:::

A snippet of the deployment verification logic we have implemented can be seen in the diagram provided below in `CloudFormation deployment workflow` section.

### Load Balancer Mappings section

Specify how exposed container ports map to Target Groups attached to your Load Balancer. `Container Name` and `Container Port` fields must match the values specified in the `Container Definitions` section of the same task definition. For more information refer to the [AWS Documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html).

:::figure
![ECS Step Load Balancer Mappings](/docs/deployments/aws/ecs/images/ecs-load-balancer.png)
:::

### Volumes section

Specify volumes that can be referenced by each individual container within the task definition. `Bind` and `EFS` volume types are supported.

:::figure
![ECS Step Volumes](/docs/deployments/aws/ecs/images/ecs-volumes.png)
:::

### Export to CloudFormation template

The ECS step operates entirely via CloudFormation templates, which means that every input field corresponds to a set of options in the generated template. To cater for more advanced deployment scenarios the step provides an option to export the CloudFormation template as YAML text. This template can be used via AWS CLI or as input in the [Deploy an AWS CloudFormation Template](/docs/deployments/aws/cloudformation) step.

Some options will be converted to CloudFormation parameters with default values matching the specific values provided in the step. This allows you to easily override these values, while maintaining a simple conversion process between the ECS step and the `Deploy an AWS CloudFormation Template` step.

:::div{.hint}
Some values cannot be resolved until deployment time and will be replaced with their respective Octopus variable representations. Namely, container image reference will be exported as `#{Octopus.Action.Package[YOUR_IMAGE_NAME].Image`, which represents a fully qualified container image, including tag (for example, `docker.io/nginx:latest`). If you use the template in other Octopus steps, such as `Deploy an AWS CloudFormation Template` step, your image reference name must match the one exported from the ECS step.

![Reference Image Dialog](/docs/deployments/aws/ecs/images/reference-image.png)
:::

To access the `Export to CloudFormation template` use the step's overflow menu in the top right-hand corner directly below the dotted menu for the overall deployment process.

:::figure
![Export to CloudFormation Menu](/docs/deployments/aws/ecs/images/ecs-cf-export-menu.png)
:::

The dialog window will appear, showing the complete CloudFormation template and an option to copy it.

:::figure
![Export to CloudFormation Dialog](/docs/deployments/aws/ecs/images/ecs-cf-export-dialog.png)
:::

#### Variable replacements

Any of the input fields can be bound to an Octostache expression. [Variable substitution](/docs/projects/variables/variable-substitutions) will be performed before the template is deployed.

### Output variables

Presently, the step does not output any variables. We expect to add output variables containing stack and service information in a future version of the step.

## CloudFormation deployment workflow

The AWS CLI makes a clear distinction between creating and updating CloudFormation stacks. When using the CLI directly, it is up to you to know if the stack exists, and what state the stack is in, in order to know whether to create or update the stack.

Octopus takes a different approach. The CloudFormation steps are designed to be idempotent, which means you can run them multiple times and the result will be the same. This means that Octopus will create the stack if it doesn't exist, update the stack if it does exist, and ignore cases where the stack has no updates. Likewise, deleting a stack will complete successfully if there is no stack to delete.

In addition, there are several states that a stack can be in where the only way to apply updates is to first delete the stack. A stack can enter one of these states for a variety of reasons, such as failing to be successfully created the first time.

The following states are those that require the stack to be deleted before it can be recreated:

* CREATE_FAILED
* ROLLBACK_COMPLETE
* ROLLBACK_FAILED
* DELETE_FAILED
* UPDATE_ROLLBACK_FAILED

The [AWS documentation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html#w2ab2c15c15c17c11) contains more details on the CloudFormation state states.

:::figure
![ECS Stack Creation Strategy Flowchart](/docs/deployments/aws/ecs/images/ecs-stack-creation-strategy.png)
:::

## Error messages

If a deployment failure is detected, the step will attempt to extract error messages from both the CloudFormation stack and the task spawned from service and task definitions. In some cases, these messages can include errors and warnings from previous deployment attempts. Unfortunately, the step cannot distinguish which errors are relevant and will err on the side of over-communication. In most cases, the error log should provide enough information to resolve any issues without referring to the AWS Dashboard or other tools.

### ECS Deployment Deploy Failed

This error is raised if the CloudFormation stack is not in one of the expected states after the deployment has completed. 

:::div{.hint}
CloudFormation stack only owns the task definition and the service. Therefore this failure indicates that either the task definition or service definition themselves has failed to deploy (for example, due to an invalid set of parameters), not the tasks spawned from the service definition.
:::

We will attempt to retrieve the error message behind the stack's status and any events that have occurred. Please note, that due to the limitations in the AWS SDK, some presented events could be related to previous deployments.

The following states are considered unsuccessful:
* `UPDATE_ROLLBACK_COMPLETE`
* `UPDATE_ROLLBACK_FAILED`
* `ROLLBACK_COMPLETE`
* `ROLLBACK_FAILED`
* `DELETE_FAILED`
* `CREATE_FAILED`
* `UPDATE_FAILED`

### ECS Deploy Validation Error

This error indicates that one or more of the step's inputs are invalid. Typically, this can happen when values are supplied as bound expressions and could not be resolved until a new release is deployed. The ECS step will run an additional validation check before attempting to perform the deployment. Some examples of input values that can cause this error are:
* Specifying more than 20 tags per task definition.
* Non-unique tag keys.
* Bound expressions resolving to empty values when the field is required.
