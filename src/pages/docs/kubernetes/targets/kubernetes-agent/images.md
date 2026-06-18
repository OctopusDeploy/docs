---
layout: src/layouts/Default.astro
pubDate: 2024-09-24
modDate: 2024-09-24
title: Octopus Kubernetes agent default images
navTitle: Default images
description: Details the default container images used by the Kubernetes agent
navOrder: 80
---

The following is a list of the default container images used as part of the Kubernetes agent & worker.

**Note**  
The Helm values paths are based on the `v2` version of the Helm chart.

## octopusdeploy/kubernetes-agent-tentacle

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-tentacle)

**Source code**

[GitHub](https://github.com/OctopusDeploy/OctopusTentacle)

**Helm values path**

`.agent.image`

**Purpose**

The main application container. Provides registration and communication with Octopus Server and manages the script pods.

## octopusdeploy/nfs-server

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopusdeploy/nfs-server)

**Source code**

[GitHub](https://github.com/OctopusDeploy/nfs-server-alpine)

**Helm values path**

`.persistence.nfs.image` 

**Purpose**

A small Alpine-based NFS server. Runs in a separate pod when a custom storage class is not provided.

## octopusdeploy/kubernetes-agent-nfs-watchdog

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-nfs-watchdog)

**Source code**

[GitHub](https://github.com/OctopusDeploy/kubernetes-agent-nfs-watchdog)

**Helm values path**

`.persistence.nfs.watchdog.image`

**Purpose**

A small application that monitors the health of the NFS mount. Terminates the Tentacle or running script pod if the NFS mount is deemed to be unhealthy. Only runs when the NFS pod is running.

## octopusdeploy/kubernetes-agent-tools-base

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopusdeploy/kubernetes-agent-tools-base)

**Source code**

[GitHub](https://github.com/OctopusDeploy/kubernetes-agent-tools-base)

**Helm values path**

`.scriptPods.deploymentTarget.image`

**Purpose**

The default image used for deployments when running as a deployment target. If no values are specified, uses the tag that matches the cluster version.  

## octopusdeploy/worker-tools

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopusdeploy/worker-tools)

**Source code**

[GitHub](https://github.com/OctopusDeploy/WorkerTools)

**Helm values path**

`.scriptPods.worker.image`  

**Purpose**

The default image used for workloads when running as a worker.


:::div{.hint}

For ARM workloads use **octopuslabs/k8s-workertools** or your own [custom Docker image](/docs/projects/steps/execution-containers-for-workers#custom-docker-images). 

### octopuslabs/k8s-workertools

**Default registry**

[Docker Hub](https://hub.docker.com/r/octopuslabs/k8s-workertools)

**Source code**

[GitHub](https://github.com/OctopusDeployLabs/workertools)

:::