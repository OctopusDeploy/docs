---
title: AWS
description: Octopus Deploy provides built-in support for deploying to AWS.
position: 20
hideInThisSectionHeader: true
---

Octopus Deploy includes dedicated integration with Amazon Web Services (AWS) to help you achieve repeatable, recoverable, secure, and auditable deployments to the Elastic Container Service (ECS).

**[Deploy Amazon ECS Service](/docs/deployments/aws/ecs/index.md)** is a UI-driven step with an opinionated deployment workflow that builds the CloudFormation template for you.

Where you need more flexibility, the **[Deploy an AWS CloudFormation Template](/docs/deployments/aws/cloudformation/index.md)** step can be used to create or update a CloudFormation stack. You can delete existing CloudFormation stacks with the **[Delete an AWS CloudFormation stack](https://octopus.com/docs/deployments/aws/removecloudformation)** step.

Upload files and packages to S3 buckets with the **[Upload to AWS S3 template](/docs/deployments/aws/s3/index.md)** step.

:::hint
**Where do AWS Steps execute?**
All AWS steps execute on a worker. By default, that will be the built-in worker in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/index.md) and the different configuration options.
:::

##  Get started with ECS or deploy a new service

The **[Deploy Amazon ECS Service](/docs/deployments/aws/ecs/index.md)** step makes it easier to get started or deploy a new service through Octopus.

The step guides you through the configuration of the task definition and service with built-in validation. Octopus generates and executes the CloudFormation templates, so you don't have to write any YAML or JSON.

![A rocket links the Deploy Amazon ECS Service step in Octopus with tasks performed by Octopus in AWS to deploy the Octo Pet Shop website. Octopus generated the CloudFormation template and created and deployed the CloudFormation stack.](octopus-ecs-integration-deploy-to-fargate.png)

With the UI step, you can:

- Monitor the deployment and service status, feedback, and error messages from Octopus. You don't need to open the AWS Console.
- Deploy updates to your containerized apps without changing the deployment process. Create a release with the new version, and Octopus updates the task definition and service for you.
- Set a timeout duration so you're not waiting hours to learn a deployment is stuck.

When you outgrow the guided UI step or need more flexibility, you can expose the underlying CloudFormation YAML and paste it into the **[Deploy an AWS CloudFormation Template](/docs/deployments/aws/cloudformation/index.md)** step. 

## Centralize and secure your ECS deployments with Octopus

Octopus offers a central platform to manage your AWS resources, including account credentials, ECS clusters, certificates, configuration, and scripts.

The ECS [deployment target](/docs/getting-started/first-deployment/add-deployment-targets.md) and steps integrate with other Octopus features, including [built-in AWS service accounts](/docs/infrastructure/accounts/aws/index.md), [runbooks](/docs/runbooks/index.md), [variables](/docs/projects/variables/index.md), [channels](/docs/releases/channels/index.md), and [lifecycles](/docs/releases/lifecycles/index.md).

Octopus and projects share the same variables and accounts, making it easier to capture shared procedures, automate routine maintenance and respond quickly to emergencies.

Flexible, role-based security allows you to decide who can deploy to production and trigger runbooks against specific clusters. You can view the history of significant events and changes in the Octopus [audit log](/docs/security/users-and-teams/auditing.md).

## Learn more

- [AWS blog posts](https://octopus.com/blog/tag/aws)
- [AWS runbook examples](/docs/runbooks/runbook-examples/aws/index.md)