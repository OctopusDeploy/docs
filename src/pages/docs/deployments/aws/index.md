---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: AWS
description: Octopus Deploy provides built-in support for deploying to Amazon Web Services (AWS).
navOrder: 20
hideInThisSectionHeader: true
---

Octopus Deploy includes dedicated integration with Amazon Web Services (AWS) to help you achieve repeatable, recoverable, secure, and auditable deployments:

- [Deploy Amazon ECS Service](/docs/deployments/aws/ecs/) is a UI-driven step with an opinionated deployment workflow that builds the CloudFormation template for you.
- [Deploy an AWS CloudFormation Template](/docs/deployments/aws/cloudformation/) allows you to create or update a CloudFormation stack. It offers more flexibility than the UI step.
- [Delete an AWS CloudFormation stack](/docs/deployments/aws/removecloudformation/) deletes existing CloudFormation stacks.
- [Upload a package to an AWS S3 bucket](/docs/deployments/aws/s3/) allows you to upload files and packages to S3 buckets.
- [Run an AWS CLI Script](/docs/deployments/custom-scripts/aws-cli-scripts/) runs a custom script with AWS credentials pre-loaded.

:::hint
**Where do AWS Steps execute?**
All AWS steps execute on a worker. By default, that will be the [built-in worker](/docs/infrastructure/workers/#built-in-worker) in the Octopus Server. Learn about [workers](/docs/infrastructure/workers/) and the different configuration options.
:::

## Get started with ECS or deploy a new service

The [Deploy Amazon ECS Service](/docs/deployments/aws/ecs/) step makes it easier to get started or deploy a new service through Octopus.

The step guides you through the configuration of the task definition and service with built-in validation. Octopus generates and executes the CloudFormation templates, so you don't have to write any YAML or JSON.

![A rocket links the Deploy Amazon ECS Service step in Octopus with tasks performed by Octopus in AWS to deploy the Octo Pet Shop website. Octopus generated the CloudFormation template and created and deployed the CloudFormation stack.](/docs/deployments/aws/octopus-ecs-integration-deploy-to-fargate.png)

With the UI step, you can:

- Monitor the deployment and service status, feedback, and error messages from Octopus. You don't need to open the AWS Console.
- Deploy updates to your containerized apps without changing the deployment process. Create a release with the new version, and Octopus updates the task definition and service for you.
- Set a timeout duration so you're not waiting hours to learn a deployment is stuck.

When you outgrow the guided UI step or need more flexibility, you can expose the underlying CloudFormation YAML and paste it into the [Deploy an AWS CloudFormation Template](/docs/deployments/aws/cloudformation/) step. 

## Centralize and secure your ECS deployments with Octopus

Octopus offers a central platform to manage your AWS resources, including account credentials, ECS clusters, certificates, configuration, and scripts.

The ECS [deployment target](/docs/getting-started/first-deployment/add-deployment-targets/) and steps integrate with other Octopus features, including [built-in AWS service accounts](/docs/infrastructure/accounts/aws/), [runbooks](/docs/runbooks/), [variables](/docs/projects/variables/), [channels](/docs/releases/channels/), and [lifecycles](/docs/releases/lifecycles/).

Octopus projects and runbooks share the same variables and accounts, making it easier to capture shared procedures, automate routine maintenance and respond quickly to emergencies.

Flexible, [role-based security](/docs/security/users-and-teams/user-roles/) allows you to decide who can deploy to production and trigger runbooks against specific clusters. You can view the history of significant events and changes in the Octopus [audit log](/docs/security/users-and-teams/auditing/).

## Learn more

- [AWS blog posts](https://octopus.com/blog/tag/aws)
- [AWS runbook examples](/docs/runbooks/runbook-examples/aws/)