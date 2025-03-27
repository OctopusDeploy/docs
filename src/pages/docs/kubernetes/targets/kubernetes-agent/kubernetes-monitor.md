---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2024-07-31
title: Kubernetes Monitor
description: How to manage the Kubernetes monitor component
navOrder: 30
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
  
## Log view permissions

Viewing the data returned from the Kubernetes monitor from within Octopus requires `DeploymentView` permissions.

This data includes pod logs for objects being monitored. This may be a change in security posture that your team should carefully consider.

## Secrets

### Octopus sensitive variables

As always, we treat secret data as carefully as we possibly can.

Practically, this means that we redact any detected Octopus sensitive variables from:

- Manifests
- Logs
- Events

If we do not have all the required information to adequately redact something coming back from a Kubernetes cluster, we will opt to prevent the user from seeing this all together.

With that said, we highly recommend:

1. Containing all sensitive information to Kubernetes secrets so they can be redacted at the source
2. Never logging sensitive values in containers
  
The flexibility that Octopus variables provide mean that sensitive variables can turn up in unexpected ways and so our redaction can only be best effort.

### Kubernetes secrets

The well defined structure of Kubernetes secrets allow us to confidently redact secret data.

To ensure that we never exfiltrate secret data that Octopus is not privy to, the Kubernetes monitor salts and hashes the secret data using sha256. By hashing secrets Octopus can tell you when something changed in your secret, but Octopus will never know what the secrets are unless you have populated them using Octopus sensitive variables.

Please be aware that outputting Kubernetes secrets into pod logs may result in them being sent un-redacted if they are not sourced from Octopus sensitive variables originally.

## Troubleshooting

See [Kubernetes Live Object Status troubleshooting](../../live-object-status/troubleshooting/index.md)