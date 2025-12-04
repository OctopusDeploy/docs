---
layout: src/layouts/Default.astro
pubDate: 2025-03-28
modDate: 2025-05-16
navTitle: Troubleshooting
title: Troubleshooting
navSection: Troubleshooting
description: How to troubleshoot common Kubernetes Live Object Status issues
navOrder: 70
---

This page will help you diagnose and solve issues with Kubernetes Live Object Status.

## Installation \{#installation}

### The Kubernetes monitor can't connect gRPC port 8443

Some firewalls may prevent the applications from making outbound connections over non-standard ports. If this is preventing the Kubernetes monitor from connecting to your Octopus Server, configure your environment to allow outbound connections.

For customers running a self-hosted instance, ensure that Octopus Server's `grpcListenPort` parameter is configured to be 8443. If using a port other than 8443, ensure the Kubernetes monitor's `server-grpc-url` parameter has been updated to match.

If you haven't enabled Octopus Server's gRPC port before, the port Octopus Server uses can be [changed from the command line](/docs/octopus-rest-api/octopus.server.exe-command-line/configure/) using the `--grpcListenPort` option.

:::div{.info}
Support for running the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) with high availability Octopus clusters was added in v2025.4
:::

## Runtime

### Failed to establish connection with Kubernetes Monitor \{#failed-to-establish–connection-with-kubernetes-monitor}

Some actions, such as logs and events, require per request communication with the Kubernetes monitor running in your cluster. 

If the Kubernetes monitor cannot be accessed, follow these steps to determine why:

1. Confirm that the Kubernetes monitor is connected by reviewing the `Kubernetes monitor Status` on the Connectivity page of your Kubernetes agent
2. Confirm that the Kubernetes monitor pod is running on your cluster. This pod is located in the same namespace that the Kubernetes agent is installed in, normally named starting with `octopus-agent-`
3. Confirm that the Kubernetes monitor pod logs report no errors. If the logs indicate failure, please confirm that connectivity to your Octopus server instance has not changed and reach out to support for assistance.

In almost all cases, we have found restarting the Kubernetes monitor pod will re-establish connection if there are no external factors at play. Please reach out to support if you are finding cases of repeated, unexpected failure.

### We couldn’t find a Kubernetes monitor associated with the deployment target \{#kubernetes-monitor-not-found}

Similar to the [error above](#failed-to-establish–connection-with-kubernetes-monitor), however more severe.

This error will be shown when Octopus fails to find the registration of a Kubernetes monitor at all. If the Kubernetes agent and monitor are both still running in your Kubernetes cluster, this means the Kubernetes monitor will need to be re-registered with Octopus.

The cleanest way to do this is to delete and re-install your Kubernetes agent entirely. If there are no deployments currently running on the agent, this is a safe operation that will not affect future deployments.

If deleting your Kubernetes agent is not an option for your use case, you can also delete the Kubernetes monitor's authentication secret and restart the Kubernetes monitor pod to trigger re-registration.
The authentication secret lives in the same namespace that your Kubernetes agent was installed in and has a name similar to `<agent name>-kubernetesmonitor-authentication`.

## Unexpected object statuses

### Out of date or slow to update object statuses

Kubernetes Live Object Status deals with potentially large and unbounded quantities of data. In the case of some deployments and workloads, very frequent updates as well.

As a safe guard to ensure that your Octopus Server instance remains free from interference from this new feature, we have conservative rate limits in place to reduce load spikes during larger work loads. As we progress through the early access period, we will open up limitations and increase the ceiling of how many clusters and resources can be monitored.

The rate limit is not a hard stop to messages being sent between Octopus Server and the Kubernetes monitor. Instead we are slowing messages down to better handle burst-y traffic.

### Why is an object out of sync? \{#why-is-an-object-out-of-sync}

Objects are reported out of sync when the manifest the Kubernetes cluster sends back to use does not match the one that Octopus applied in your deployment.

This can happen for a number of reasons, including
- Someone has made an update to the object outside of Octopus deployments
- A controller is automatically making changes to the object on your cluster
- There are additional fields that Kubernetes does not recognize in the applied manifest that Kubernetes automatically removes from the reported live manifest

If possible, we recommend ensuring that
- Octopus is the only entity to modify your deployments
- You craft your Kubernetes manifests to ensure that there are no invalid fields
