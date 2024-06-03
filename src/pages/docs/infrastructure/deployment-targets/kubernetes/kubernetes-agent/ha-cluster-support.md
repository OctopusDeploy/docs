---
layout: src/layouts/Default.astro
pubDate: 2024-05-14
modDate: 2024-05-14
title: HA Cluster Support
description: How to install/update the agent when running Octopus in an HA Cluster
navOrder: 60
---

## Octopus Deploy HA Cluster

Similarly to Polling Tentacles, the Kubernetes agent must have a URL for each individual node in the HA Cluster so that it receive commands from all clusters. These URLs must be provided when registering the agent or some deployments may fail depending on which node the tasks are executing.

To read more about selecting the right URL for your nodes, see [Polling Tentacles and Kubernetes agents with HA](/docs/administration/high-availability/maintain/polling-tentacles-with-ha).

## Agent Installation on an HA Cluster

To make things easier, Octopus will detect when it's running HA and show an extra configuration page in the Kubernetes agent creation wizard which asks you to give a unique URL for each cluster node.

:::figure
![Kubernetes Agent HA Cluster Configuration Page](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-ha-cluster-configuration-page.png)
:::

Once these values are provided the generated helm upgrade command will configure your new agent to receive commands from all nodes.

## Upgrading the Agent after Adding/Removing Cluster nodes

If you add or remove cluster nodes, you need to update your agent's configuration so that it continues to connect to all nodes in the cluster. To do this, you can simply run a helm upgrade command with the urls of all current cluster nodes. The agent will take remove any old urls and replace them with the provided ones.

```bash
helm upgrade --atomic \
--reuse-values \
--set agent.serverCommsAddresses="{https://<node-one-url>:<node-one-port>/,https://<node-two-url>:<node-two-port>/,https://<node-three-url>:<node-three-port>/}" \
--namespace <agent-namespace> \
<agent-release-name> \
oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```
