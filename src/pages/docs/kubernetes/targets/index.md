---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-08-08
title: Kubernetes Targets
navTitle: Overview
navSection: Targets
description: Kubernetes deployment targets
navOrder: 10
---

To deploy your application to a Kubernetes cluster, you need Octopus Deploy to know that the cluster exists and how to access it. The cluster is your deployment destination. To represent deployment destinations, Octopus uses [deployment targets](/docs/infrastructure/deployment-targets) (a virtual entity). 

There are two different deployment targets for deploying to Kubernetes, the [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent) and the [Kubernetes API](/docs/kubernetes/targets/kubernetes-api) targets.

The Kubernetes API target allows the Octopus Server to connect to a cluster via the API. In this scenario, your deployment tasks run outside of a cluster, typically on a worker.

The Kubernetes agent target requires the installation of a small executable in a cluster (agent).  Octopus Server connects to the agent for deployments. In this scenario, your deployment tasks run inside the cluster.

:::figure
![Kubernetes agent and Kubernetes API diagram](/docs/infrastructure/deployment-targets/kubernetes/diagram-kubernetes-targets.png)
:::

The following table summarizes the key differences between the two targets.

|                                                      | [Kubernetes Agent](/docs/kubernetes/targets/kubernetes-agent)                                                                         | [Kubernetes API](/docs/kubernetes/targets/kubernetes-api)                 |
| :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Connection method                                    | [Polling agent](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication#polling-tentacles) in cluster                                                                                                                                        | Direct API communication                                                                            |
| Setup complexity                                     | Generally simpler                                                                                                                                               | Requires more setup                                                                                 |
| Security                                             | No need to configure firewall<br />No need to provide external access to cluster                                                                                | Depends on the cluster configuration                                                                |
| Requires workers                                     | No                                                                                                                                                              | Yes                                                                                                 |
| Requires public IP                                   | No                                                                                                                                                              | Yes                                                                                                 |
| Requires service account in Octopus                  | No                                                                                                                                                              | Yes                                                                                                 |
| Limit deployments to a namespace                     | Yes                                                                                                                                                             | No                                                                                                  |
| Planned support for upcoming observability  features | Yes                                                                                                                                                             | No                                                                                                  |
| Recommended usage scenario                           | <ul><li>For deployments and maintenance tasks (runbooks) on Kubernetes</li><li>If you want to run a worker on Kubernetes (to deploy to other targets)</li></ul> | If you cannot install an agent on a cluster                                                         |
| Step configuration                                   | Simple (you need to specify target tag)                                                                                                                         | More complex (requires target tags, workers, execution container images)                            |
| Maintenance                                          | <ul><li>Upgradeable via Octopus Server</li><li>No need to add and manage</li></ul> credentials                                                                   | <ul><li>You need to update/rotate credentials</li><li>Requires worker maintenance updates</li></ul> |
