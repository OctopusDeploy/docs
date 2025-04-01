---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-03-28
navTitle: Troubleshooting
title: Troubleshooting
navSection: Troubleshooting
description: How to troubleshoot common Kubernetes Live Object Status issues
navOrder: 70
---

This page will help you diagnose and solve issues with Kubernetes Live Object Status.

## Installation

### The Kubernetes monitor can't connect gRPC port 8443

Some firewalls may prevent the applications from making outbound connections over non-standard ports. If this is preventing the Kubernetes monitor from connecting to your Octopus Server, configure your environment to allow outbound connections.

## Runtime

### Connection ID was not found

Some actions, such as logs and events, require per request communication with the Kubernetes monitor running in your cluster. 

If the Kubernetes monitor cannot be accessed, follow these steps to determine why:

1. Confirm that the Kubernetes monitor is connected by reviewing the `Kubernetes monitor Status` on the Connectivity page of your Kubernetes agent
2. Confirm that the Kubernetes monitor pod is running on your cluster. This pod is located in the same namespace that the Kubernetes agent is installed in, normally named started with `octopus-agent-`
3. Confirm that the Kubernetes monitor pod logs report no errors. If the logs indicate failure, please confirm that connectivity to your Octopus server instance has not changed and reach out to support for assistance.

## Unexpected object statuses

### Why is an object out of sync?

Objects are reported out of sync when the manifest the Kubernetes cluster sends back to use does not match the one that Octopus applied in your deployment.

This can happen for a number of reasons, including
- Someone has made an update to the object outside of Octopus deployments
- A controller is automatically making changes to the object on your cluster
- There are additional fields that Kubernetes does not recognize in the applied manifest that Kubernetes automatically removes from the reported live manifest

If possible, we recommend ensuring that
- Octopus is the only entity to modify your deployments
- You craft your Kubernetes manifests to ensure that there are no invalid fields
