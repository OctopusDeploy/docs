---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or Cloud Regions.
position: 2
hideInThisSection: True
---

With Octopus Deploy, you can deploy software to Windows servers, Linux servers, Microsoft Azure, an offline package drop, cloud regions, or Kubernetes. These are known as your deployment targets. You deployment targets are organized into environments so you can promote your software, for instance, from **Development** to **Testing** and finally into **Production**.

## Overview

From the **Overview** section of the **Infrastructure** tab of the Octopus Web Portal, you can quickly see your existing [environments](#environments), [deployment targets](#deployment-targets), and [worker pools](#workers), check on the status of your deployment targets and access targets by [target role](/docs/infrastructure/deployment-targets/target-roles/index.md).

## Environments

Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md) so you can promote your software through the different stages of its lifecycle, for instance, from **Development** to **Test** and finally to **Production**.

Learn how to add and manage your [environments](/docs/infrastructure/environments/index.md).

## Deployment Targets

The machines and services that you deploy your software to are your **deployment targets**. Learn about adding and configuring the different types of [deployment targets](/docs/infrastructure/deployment-targets/index.md), the [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md) that are assigned to the deployment targets, and using [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).

## Worker Pools

Worker pools are groups of machines (workers) that can be used to perform tasks that don't need to be executed on the Octopus Server or on deployment targets, for instance, if you are deploying a package to an API or running a script.

Learn more about adding and managing [worker pools](/docs/infrastructure/worker-pools.md)

## Workers

[Workers](/docs/infrastructure/workers/index.md) are the individual machines in worker pools that are used to perform tasks that don't need to be performed on a deployment target or on the Octopus Server.

Learn about [Workers](/docs/infrastructure/workers/index.md).

## Accounts

In addition to the deployment targets listed above, you add an [AWS account](/docs/infrastructure/accounts/aws/index.md) to Octopus and deploy to Amazon Web Services. You can also add account details for other services you use with Octopus.

Learn more about [accounts](/docs/infrastructure/accounts/index.md)

## Managing Your Infrastructure

Select the **Infrastructure** tab to manage your:

* [Environments](/docs/infrastructure/environments/index.md)
* [Deployment targets](/docs/infrastructure/deployment-targets/index.md)
* [Worker pools](/docs/infrastructure/worker-pools.md)
* [Workers](/docs/infrastructure/workers/index.md)
* [Machine policies](/docs/infrastructure/machine-policies.md)
* [Proxies](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md)
* [Accounts](/docs/infrastructure/accounts/index.md)
