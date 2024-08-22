---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Upgrading the Agent
navTitle: Upgrading
navSection: Kubernetes agent
description: How a Kubernetes Agent is upgraded
navOrder: 70
---

Recent changes to the Kubernetes-Agent Helm Chart have necessitated a breaking change, meaning existing installations
of the v1 Kubernetes-Agent helm chart are (currently) unable to automatically upgrade to the new version (v2).

The version of a Kubernetes Agent is found by going to **Infrastructure** then into **DeploymentTargets**; from there click on the 
**Kubernetes Agent** of interest; on its **Connectivity** sub-page you will see 'Current Version'.

:::figure
![Kubernetes Agent default namespace](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-upgrade-version.png)
:::

Installed v1 instances will continue to operate as expected, however they will receive no further updates other than security updates. 
While you may continue to use v1 of the helm-chart, it is highly recommended to perform a manual upgrade to v2
ensuring you receive ongoing functional and security updates.

Steps required to manually upgrade a v1 instance can be found in the Kubernetes Agent [documentation](https://github.com/OctopusDeploy/helm-charts/blob/main/charts/kubernetes-agent/migrations.md).

Alternatively, existing v1 Kubernetes Agents can be deleted from your server instance, and recreated as v2 Agents via the installation workflow available in Octopus Server. 

## Automatic Updates (coming in 2023.4)
Octopus Server is being upgraded to support automated upgrades across major Helm Chart versions, and will be available as part of the 2024.4.
This capability will be available to cloud instances in  September 2024, and December 2024 for self-hosted instances. 

## Impacts to Terraform Installation
Existing Terraform scripts installing the Kubernetes Helm chart will continue to work, provided a version constraint is specified (1.\*\*).
Otherwise, you will be required to update your scripts according to the supplied [documentation](https://github.com/OctopusDeploy/helm-charts/blob/main/charts/kubernetes-agent/migrations.md), to ensure values are set
correctly.