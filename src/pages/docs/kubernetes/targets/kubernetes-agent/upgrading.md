---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Upgrading the agent
navTitle: Overview
navSection: Kubernetes agent
description: How a Kubernetes Agent is upgraded
navOrder: 10
---

Recent changes to the Kubernetes-Agent Helm Chart have necessitated a breaking change, meaning existing installations
of the v1 Kubernetes-Agent helm chart are (currently) unable to automatically upgrade to thew new version (v2).

The version of a Kuberentes Agent is found by going to Infrastructure->DeploymentTargets, then click on the 
**Kubernetes Agent** of interest. On the **Connectivity** sub-page you will see 'Current Version'.

Installed v1 instances will continue to operate as expected, however they will receive no further updates (bugfixes or enhancements). 
While you may continue to use v1 of the helm-chart, it is highly recommended to perform a manual upgrade to v2
ensuring you receive ongoing functional and security updates.

Steps required to manually upgrade a v1 instance can be found in the Kubernetes Agent [documentation](https://github.com/OctopusDeploy/helm-charts/blob/main/charts/kubernetes-agent/migrations.md).

Alternatively, existing v1 Kubernetes Agents can be deleted from your server instance, and recreated as v2 Agents via the installation workflow available in Octopus Server. 

Octopus Server is being upgraded to support automated upgrades across major Helm Chart versions, however this will not be available until
September 2024 for cloud instances, and December 2024 for self-hosted instances. 
