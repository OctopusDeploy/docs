---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or Cloud Regions.
position: 2
hideInThisSection: True
---

With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, an offline package drop, cloud regions, or Kubernetes, these are known as your deployment targets, and they are organized into environments so you can promote your software through your deployment pipeline, for instance, from **Development** to **Testing** and finally into **Production**.

## Managing Your Infrastructure

You can manage your infrastructure by navigating to the **Infrastructure** tab in the Octopus Web Portal. From there you can access the following options:

* [Overview](#overview)
* [Deployment targets](#deployment-targets)
* [Environments](#environments)
* [Workers](#workers)
* [Worker pools](#worker-pools)
* [Machine policies](#machine-policies)
* [Proxies](#proxies)
* [Accounts](#accounts)

## Overview

From the **Overview** section of the **Infrastructure** tab of the Octopus Web Portal, you can quickly see your existing [environments](#environments), [deployment targets](#deployment-targets), [worker pools](#worker-pools), and [workers](#workers), check on the status of your deployment targets and workers, and access targets by [target role](/docs/infrastructure/deployment-targets/target-roles/index.md).

## Deployment Targets

The machines and services that you deploy your software to are your **deployment targets**. Learn about adding and configuring the different types of [deployment targets](/docs/infrastructure/deployment-targets/index.md), the [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md) that are assigned to the deployment targets, and using [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).

## Environments

Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md) so you can promote your software through your deployment pipeline, for instance, from **Development** to **Test** and finally into **Production**.

Learn how to add and manage your [environments](/docs/infrastructure/environments/index.md).

## Workers

[Workers](/docs/infrastructure/workers/index.md) are machines that are used to execute tasks that don't need to be performed on the Octopus server or specific deployment targets, for instance, if you are deploying a package to an API or running a script. You can register multiple workers and assign them to worker pools.

Learn about [Workers](/docs/infrastructure/workers/index.md).

## Worker Pools

Worker pools are groups of workers that can be used to perform tasks that don't need to be executed on the Octopus server or on deployment targets

Learn more about adding and managing [worker pools](/docs/infrastructure/worker-pools.md)

## Machine Policies

Machine policies are groups of settings that can be applied to Tentacle and SSH endpoints to modify their behavior.

Learn more about [machine policies](/docs/infrastructure/machine-policies.md).

## Proxies

Octopus can communicate with deployment targets through proxies.

Learn about Octopus's [proxy support](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md).

## Accounts

In addition to the deployment targets listed above, you add an [AWS account](/docs/infrastructure/accounts/aws/index.md) to Octopus and deploy to Amazon Web Services. You can also add account details for you Azure subscriptions, SSH targets, and authentication tokens to use with remote hosts.

Learn more about [accounts](/docs/infrastructure/accounts/index.md).
