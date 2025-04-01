---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-03-28
title: Kubernetes Monitor
description: How to manage the Kubernetes monitor component
navOrder: 25
---

The Kubernetes monitor is a component that runs alongside Tentacle in the cluster. The Kubernetes monitor tracks the health of resources deployed to the cluster via Octopus Server. 

## How it works

The Kubernetes monitor communicates with Octopus Server over gRPC on a new port (8443) to send back object information to Octopus Deploy. Communications are initiated by the Kubernetes monitor, so no endpoints on the Kubernetes cluster need to be exposed.

The monitor process utilizes the [Argo project gitops engine project](https://github.com/argoproj/gitops-engine) to internally keep track of the resources running on your cluster and react to changes as they occur.


## Required Kubernetes permissions

### Registration 

During registration, the Kubernetes monitor manages a secret to store it's authentication information.

To do so, a `Role` is created with the `get`, `list`, `create` and `update` verbs for the `secrets` resource.

Once registered, this `Role` is deleted.

### Normal operation

Once the monitor is registered, the Kubernetes monitor is a read only entity.

To enabled this a `ClusterRole` is created for use by the Kubernetes monitor with the `get`, `watch` and `list` verbs for all groups and resources.
 

## Troubleshooting

See [Kubernetes Live Object Status troubleshooting](../../live-object-status/troubleshooting)