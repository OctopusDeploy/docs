---
title: Amazon ECS cluster
description: How to configure an Amazon ECS cluster target in Octopus Deploy
position: 30
---

ECS Cluster targets are used by the [ECS steps](/docs/deployments/aws/index.md) to define the context in which deployments and scripts are run.

:::hint
From version 2022.??? Octopus can discover ECS targets for you using tags on your ECS Cluster.
:::

:::hint
Refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create_cluster.html) for detailed instructions on how to provision a new ECS cluster.
:::

## Discovering an ECS cluster target

Octopus can discover ECS targets as part of your deployment using tags on your cluster. To discover targets use the following steps.

- Add an AWS account variable **Octopus.AWS.Account** to your project.
- Add tags to your ECS cluster so that Octopus can match it to your deployment step and environment.
- Add a "Deploy Amazon ECS Service" or "Update Amazon ECS Service" step to your deployment process. The target role on the step will be used along with the environment being deployed to, to discover the ECS cluster and then deploy to it.

See [cloud target discovery](/docs/infrastructure/deployment-targets/cloud-target-discovery/index.md) for more information.

## Creating an ECS cluster target

1. Navigate to **{{Infrastructure,Deployment Targets}}**, and click **ADD DEPLOYMENT TARGET**.
2. Select **AWS** and click **ADD** on the Amazon ECS Cluster target type.
3. Enter a display name for the Amazon ECS Cluster.
4. Select at least one [environment](/docs/infrastructure/environments/index.md) for the target.
5. Select at least one [target role](/docs/infrastructure/deployment-targets/index.md#target-roles) for the target.
6. In the **ECS Cluster** section:

   - Select an AWS account. If you don't have an `AWS Account` defined yet, check our [documentation on how to set one up](/docs/infrastructure/accounts/aws/index.md).
   - Enter the AWS region where the ECS cluster is running in AWS.
   - Enter a cluster name that matches the cluster name running in your AWS region.

   ![ECS Cluster Deployment Target Settings](images/aws-ecs-target.png "width=500")
