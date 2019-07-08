---
title: Infrastructure
description: The infrastructure tab in the Octopus Web Portal is where you manage your environments, deployment targets, and other infrastructure.
position: 30
hideInThisSection: True
---

With Octopus Deploy the machines and services you deploy your software to are managed on the **Infrastructure** tab of the Octopus Web Portal.

## Deployment Targets

With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, Kubernetes Clusters, Cloud Regions, or an Offline Package Drop. Regardless of where you're deploying your software, these machines and services are known as your [deployment targets](/docs/infrastructure/deployment-targets/index.md).

## Environments

Before you can add your deployment targets to Octopus, you need to configure your [environments](/docs/infrastructure/environments/index.md). Environments represent the different stages of your deployment pipeline and ensure that the software that's deployed is the same as it moves through those stages from, for instance, **Development**, into **Test**, and finally to **Production**.

Typical environments include:

 - Development
 - Test
 - Production

You can add as many or as few environments as you require in your deployment pipeline, and you can add as many deployment targets to each environment as you need.

## Workers

[Workers](/docs/infrastructure/workers/index.md) are machines that are used to execute tasks that don't need to be performed on the Octopus server or specific deployment targets, for instance, if you are deploying a package to an API or running a script. You can register multiple workers and assign them to worker pools.

## Next Steps

 - [Configure your Environments](/docs/infrastructure/environments/index.md)
 - [Configure your Deployment Targets](/docs/infrastructure/deployment-targets/index.md)
 - [Configure your Workers](/docs/infrastructure/workers/index.md)
