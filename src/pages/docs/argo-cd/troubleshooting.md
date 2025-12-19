---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Troubleshooting Argo CD in Octopus
navTitle: Troubleshooting
description: How to resolve configuration issues
navSection: Argo CD
navOrder: 50
hideInThisSectionHeader: true
---
Minor issues in your configuration can prevent Octopus from integrating effectively with Argo CD.

The most common issues encountered while setting up Argo CD integration are listed below along with the steps to be followed to reach a resolution.

## Gateway Installation

### Argo CD Gateway install dialog stuck in progressing

Behaviour:

- Helm install dialog stuck in progressing (Waiting for <name> to establish a connection)
- Helm command halted showing chart pulled for >= 5 minutes
- In a Kubernetes viewer (e.g. K9s), the gateway pod logs state "Failed to register ArgoCD Gateway with Octopus Serer"

Cause:

- Gateway cannot reach Octopus Server at the url specified in `registration.octopus.serverApiUrl` using the token specified in `registration.octopus.serverAccessToken`
  - Url may be incorrect, or not reachable from within your cluster
    - Note: local clusters require specialist hostnames to reach your host computer (eg. host.minikube.internal)
  - Token may be expired

Resolution:

- Confirm serverUrl is set correctly, and is resolvable/reachable from with your cluster
- Re-execute the installation process, ensuring to complete within lifetime of supplied bearer token

### Argo CD Gateway install fails initial health check

Behaviour:

- Install Argo CD Gateway dialog states:
  - "established a connection" was successful
  - Health check failed
- The Gateway pod is in a CrashLoopBackoff
- In a Kubernetes viewer (e.g. K9s), the gateway pod logs state "*error validating connection to Argo CD*"
- In Octopus, the healthcheck task log contains: "The Argo CD Gateway has not established a gRPC connection to Octopus Server" 

Cause:

- Unable to create a connection to your Argo CD instance

Resolution:

- Confirm the URL specified for the `gateway.argocd.serverGrpcUrl` matches the expected grpc endpoint of your argo instance (`<servicename>.<namespace>.svc.cluster.local`)
- If your Argo CD instance is using a self-signed certificate ensure `gateway.argocd.insecure` is set to `true`
- If your Argo CD instance is running in "insecure" mode, ensure `gateway.argocd.plaintext` is set to `true` (false otherwise)
- In Octopus, delete the registered Argo CD Gateway, follow all required helm deletion commands, and reinstall

## Application/Project mapping

### No applications are listed on the Argo CD Instance --> Applications page

Behaviour

- Argo CD web UI shows existing applications, however they do not appear in the Octopus UI
  
Cause:

- Argo CD Token used by the gateway has insufficient permissions to access applications resources in Argo

Resolution:

- Create required RBAC entries for the account being used by the Octopus Gateway as per [this](/docs/argo-cd/instances/argo-user).

## Step Configuration

### Argo Applications in step shows "You don't have any Argo CD instance to preview yet"

Behaviour:

- The "Argo Applications" section on the step indicates that no Argo CD instances exist

Cause:

- No Argo CD instances are registered in the current space

Resolution:

- Navigate to Infrastructure --> Argo CD Instances and confirm an instance is visible in this space
- If not - add a new Argo CD instance using the installation wizard

## Step Execution

### No Applications are updated during a deployment

Behaviour:

- Deployment Passes with warnings
- Octopus deployment task log contains `No annotated Argo CD applications could be found for this deployment.`

Cause:

- No applications have been annotated for this project/environment/tenant deployment

Resolution:

- Confirm/update annotations on the target Argo Application match the deployments Project/Environment/Tenant and update as appropriate

### Deployment fails on an Argo CD step (no git credentials)

Behaviour:

- Octopus deployment task log contains "Could not find a Git Credential associated with <url>"

Cause:

- One of the Argo CD Application Sources to be updated references a git repository for which Octopus has no Git Credential

Resolution:

- Add/Update a Git Credential to Octopus, specifying a repository-allowlist which includes the url specified in the error message.

### Deployment fails on Argo CD Step (source is not a git repository)

Behaviour:

- Octopus deployment task log contains `Failed to clone Git repository at <url>`

Cause:

- The mapped Argo Application source is not a git repository (eg helm-repository or OCI)
- The provided git credentials for the url have insufficient privileges

Resolution:

- Octopus cannot update charts sourced from a help repository or OCI feed - contact support to determine way forward.
- Ensure the associated git credential has appropriate permissions

## Deploment Fails on Argo CD Step (insufficient permissions)

Behaviour:

- Octopus deployment task log contains "http status code: 403"

Cause:

- Octopus Git credential associated with mapped Argo CD Application Source has insufficient privileges to read/write the git repository

Resolution:

- Create a new credential in your git provider, store it in an Octopus Git Credential, and ensure the "Allow List" includes your Application Source repository

## Argo CD Live View not visible on dashboard

Behaviour:

- Live Status Panel is not visible on the project/space dashboard

Cause:

- Live Status is not enabled

Resolution:

- Enable Live Status via the "live Status" toggle switch at the top of the dashboard.
