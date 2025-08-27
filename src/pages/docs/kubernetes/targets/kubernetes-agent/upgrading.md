---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Upgrading the Agent
navTitle: Upgrading
navSection: Kubernetes agent
description: How a Kubernetes agent is upgraded
navOrder: 60
---

The Kubernetes agent is automatically kept up to date by Octopus Server when running periodic health checks.

## Disabling automatic upgrades

Automatic upgrades can be disabled by updating the machine updates settings in your applied [machine policy](/docs/infrastructure/deployment-targets/machine-policies)

## V1

Changes to the Kubernetes agent Helm Chart necessitated a breaking change.

The version of a Kubernetes agent is found by going to **Infrastructure** then into **DeploymentTargets**; from there click on the **Kubernetes agent** of interest; on its **Connectivity** sub-page you will see 'Current Version'.

:::figure
![Kubernetes agent default namespace](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-upgrade-version.png)
:::

Installed v1 instances will continue to operate as expected, however they will receive no further updates other than security updates.

While you may continue to use v1 of the helm-chart, it is highly recommended to perform an upgrade to v2 to you receive ongoing functional and security updates.

As of Octopus Server 2024.4, version 1 Helm charts can be automatically upgraded to version 2 without manual intervention.

For older versions of Octopus Server you can manually upgrade a v1 instance following the guide in the Kubernetes agent [documentation](https://github.com/OctopusDeploy/helm-charts/blob/main/charts/kubernetes-agent/migrations).

Alternatively, existing v1 Kubernetes agents can be deleted from your server instance, and recreated as v2 agents via the installation workflow available in Octopus Server.
