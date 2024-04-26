---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-24
title: Kubernetes
navTitle: Overview
navSection: Kubernetes
description: Kubernetes deployment targets
navOrder: 50
---

There are two different deployment targets for deploying to Kubernetes using Octopus Deploy, the [Kubernetes Agent](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent) and the [Kubernetes API](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api) targets.

The following table summarizes the key differences between the two targets.

|                                                      | [Kubernetes Agent](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent)                                                                         | [Kubernetes API](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api)                 |
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
