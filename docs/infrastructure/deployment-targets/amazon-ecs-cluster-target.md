---
title: Amazon ECS cluster
description: How to configure an Amazon ECS cluster target in Octopus Deploy
position: 30
---

ECS Cluster targets are used by the [ECS steps](/docs/deployments/aws/index.md) to define the context in which deployments and scripts are run.

:::hint
Refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create_cluster.html) for detailed instructions on how to provision a new ECS cluster.
:::

## Creating an ECS cluster target

1. Navigate to **{{Infrastructure,Deployment Targets}}**, and click **ADD DEPLOYMENT TARGET**.
2. Select **AWS** and click **ADD** on the Amazon ECS Cluster target type.
3. Enter a display name for the Amazon ECS Cluster.
4. Select at least one [environment](/docs/infrastructure/environments/index.md) for the target.
5. Select at least one [target role](/docs/infrastructure/deployment-targets/index.md#target-roles) for the target.
6. In the **Authentication** section (see the [authentication](#authentication) section for more information):
   - Select whether to use an AWS account configured in Octopus or to use credentials from the worker on which your deployment runs.
     - Select an AWS account if necessary. If you don't have an `AWS Account` defined yet, check our [documentation on how to set one up](/docs/infrastructure/accounts/aws/index.md).
   - Select whether to assume an IAM role during authentication.
7. In the **ECS Cluster** section:

   - Enter the AWS region where the ECS cluster is running in AWS.
   - Enter a cluster name that matches the cluster name running in your AWS region.

   ![ECS Cluster Deployment Target Settings](images/aws-ecs-target-cluster.png "width=500")

### Authentication

There are multiple authentication options supported for ECS clusters.

#### Worker Credentials

Authentication can be configured to use credentials from the worker on which a deployment or cluster health check runs. AWS supports sourcing these credentials in several different ways, including environment variables and EC2 instance roles. See [Setting credentials in node.js](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html) for more information on the different ways credentials can be provided.

To configure the ECS cluster to use worker credentials select the "Use credentials provided on the worker" option in the Credentials field.

![ECS Cluster Worker Credentials](images/aws-ecs-target-worker-credentials.png "width=500")

#### AWS Account

Authentication can be configured to use an [AWS Account](/docs/infrastructure/accounts/aws/index.md). To configure your ECS cluster to use an account select the "Use account" option in the Credentials field.

![ECS Cluster Account Credentials](images/aws-ecs-target-account-credentials.png "width=500")

### Assuming an IAM role

AWS supports assuming a specific role when interacting with services, allowing you to configure granular permissions for a given operation. See [Using IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html) for more information on using and assuming roles.

To configure the ECS cluster to use an assumed role select the "Assume role" option in the Assume IAM role field.

When assuming a role there are a number of options which can be configured.

| Field            | Description                                                                                                                                                                                                                      | Required |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Role ARN         | The ARN of the role to be assumed                                                                                                                                                                                                | Y        |
| Session Name     | The name of the session to use when assuming the role. If this is not provided a default session will be automatically generated.                                                                                                | N        |
| Session Duration | The duration that the session will be available for. If this is not provided the default session duration for the role will be used.                                                                                             | N        |
| External ID      | An external ID which can be provided to authorise third-party access. See the [AWS documentation on External Id](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) for more information | N        |

![ECS Cluster Assume Role](images/aws-ecs-target-assume-role.png "width=500")
