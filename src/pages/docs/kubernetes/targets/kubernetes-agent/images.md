---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-08-08
title: Octopus Kubernetes agent
navTitle: Overview
description: How to configure a Kubernetes agent as a deployment target in Octopus
navOrder: 80
---

The following is a list of the default container images used as part of the Kubernetes agent & worker.

| Image                                                                                                          | Source                                                                   | Helm values path                     | Purpose                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [octopusdeploy/kubernetes-agent-tentacle](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-tentacle)         | [GitHub](https://github.com/OctopusDeploy/OctopusTentacle)               | `.agent.image`                       | The main application container. Provides registration and communication with Octopus Server and manages the script pods.                                                                        |
| [octopusdeploy/nfs-server](https://hub.docker.com/r/octopusdeploy/nfs-server)                                       | [GitHub](https://github.com/OctopusDeploy/nfs-server-alpine)             | `.persistence.nfs.image`             | A small Alpine-based NFS server. Runs in a separate pod when a custom storage class is not provided.                                                                                            |
| [octopusdeploy/kubernetes-agent-nfs-watchdog](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-nfs-watchdog) | [GitHub](https://github.com/OctopusDeploy/kubernetes-agent-nfs-watchdog) | `.persistence.nfs.watchdog.image`    | A small application that monitors the health of the NFS mount. Terminates the Tentacle or running script pod if the NFS mount is deemed to be unhealthy. Only runs when the NFS pod is running. |
| [octopusdeploy/kubernetes-agent-tools-base](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-tools-base)     | [GitHub](https://github.com/OctopusDeploy/kubernetes-agent-tools-base)   | `.scriptPods.deploymentTarget.image` | The default image used for deployments when running as a deployment target. If no values are specified, uses the tag that matches the cluster version.                                          |
| [octopusdeploy/worker-tools](https://hub.docker.com/r/octopusdeploy/worker-tools)                                   | [GitHub](https://github.com/OctopusDeploy/WorkerTools)                   | `.scriptPods.worker.image`           | The default image used for workloads when running as a worker.                                                                                                                                  |