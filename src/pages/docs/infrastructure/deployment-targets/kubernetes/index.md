---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-04-24
title: Kubernetes
description: Kubernetes deployment targets
navOrder: 50
---

Comparison table for 

|                                                                         | Kubernetes Tentacle                                             | Kubernetes API Connection                                                           |
| :---------------------------------------------------------------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| Connection method                                                       | Polling agent in cluster                                        | Direct API communication                                                            |
| Setup complexity                                                        | Generally simpler                                               | Requires more setup                                                                 |
| Security                                                                | No need to configure firewall<br />No need to provide external access to cluster                            |     Depends on the cluster configuration                                                                                 |
| Requires workers                                                        | No                                                              | Yes                                                                                 |
| Requires public IP                                                      | No                                                              | Yes                                                                                 |
| Requires service account in Octopus                                     | No                                                              | Yes                                                                                 |
| Limit deployments to a namespace                                        | Yes                                                             | No                                                                                  |
| Planned support for upcoming observability  features                    | Yes                                                             | No                                                                                  |
| Recommended usage scenario                                              | For deployments and maintenance tasks (runbooks) on Kubernetes <br />If you want to run a worker on Kubernetes (to deploy to other targets) | If you cannot install an agent on a  | If you cannot install an agent on a cluster                                                                                    |
| Step configuration                                                      | Simple (you need to specify target role)                        | More complex (requires target roles, workers, execution container images, see docs) |
| Maintenance                                                             | Octopus will update the agent<br />No need to add and manage credentials                                 |                         You need to update/rotate credentials<br />Requires worker maintenance updates                                                    |
|                                  |                           |                                                                                     |