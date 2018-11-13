---
title: Infrastructure
description: Configure your infrastructure so Octopus Deploy can deploy software to your Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, or Cloud Regions.
position: 2
hideInThisSection: True
---

With Octopus Deploy you can deploy software to Windows servers, Linux servers, Microsoft Azure, AWS, an offline package drop, cloud regions, or Kubernetes. These are known as your deployment targets. You deployment targets are organized into environments so you can promote your software from **Development** to **Testing** and finally into **Production**.

## Overview

From the **Overview** section of the **Infrastructure** tab of the Octopus Web Portal, you can quickly see your existing [Environments](#environments), [Deployment Targets](#deployment-targets), and [Worker Pools](#workers), check on the status of your deployment targets and access targets by [Target Role](/docs/infrastructure/deployment-targets/target-roles/index.md).

## Environments

Octopus organizes your deployment targets into groups called [environments](/docs/infrastructure/environments/index.md) so you can promote your software through the different stages of its lifecycle, for instance, from **Development** to **Test** and finally to **Production**.

Learn about [Environments](/docs/infrastructure/environments/index.md).

## Deployment Targets

The machines and services that you deploy to are your *deployment targets*. Learn about adding and configuring the different types of [deployment targets](/docs/infrastructure/deployment-targets/index.md), the [target roles](/docs/infrastructure/deployment-targets/target-roles/index.md) that are assigned to the deployment targets, and [dynamic infrastructure](/docs/infrastructure/deployment-targets/dynamic-infrastructure/index.md).

## Workers

You can use [workers](/docs/infrastructure/workers/index.md) to perform tasks that don't need to be performed on a deployment target or on the Octopus Server.

Learn about [Workers](/docs/infrastructure/workers/index.md) and [Worker Pools](/docs/infrastructure/worker-pools.md).

## Managing Your Infrastructure

Select the **Infrastructure** tab to manage your:

* [Environments](/docs/infrastructure/environments/index.md)
* [Deployment Targets](/docs/infrastructure/deployment-targets/index.md)
* [Workers](/docs/infrastructure/workers/index.md)
* [Worker Pools](/docs/infrastructure/worker-pools.md)
* [Machine Policies](/docs/infrastructure/machine-policies.md)
* [Proxies](/docs/infrastructure/deployment-targets/windows-targets/proxy-support.md)
* [Accounts](/docs/infrastructure/accounts/index.md)
