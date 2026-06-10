---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2026-06-10
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

Behavior:

- Helm install dialog stuck in progressing (Waiting for <name> to establish a connection)
- Helm command halted showing chart pulled for >= 5 minutes
- In a Kubernetes viewer (e.g. K9s), the gateway pod logs state "Failed to register ArgoCD Gateway with Octopus Server"

Cause:

- Gateway cannot reach Octopus Server at the url specified in `registration.octopus.serverApiUrl` using the token specified in `registration.octopus.serverAccessToken`
  - Url may be incorrect, or not reachable from within your cluster
    - Note: local clusters require specialist hostnames to reach your host computer (eg. host.minikube.internal)
  - Token may be expired

Resolution:

- Confirm serverUrl is set correctly, and is resolvable/reachable from inside your cluster
- Re-execute the installation process, ensuring to complete within lifetime of supplied bearer token

### Argo CD Gateway install fails initial health check

#### Failed to connect to Octopus

Behavior:

- Install Argo CD Gateway dialog states:
  - "Gateway registered with Octopus" was successful
  - "Failed to connect to Octopus" and "Failed to connect to Argo CD" both show as failed
- The gateway pod is in a CrashLoopBackoff
- In a Kubernetes viewer (e.g. K9s), the gateway pod logs state "*Gateway failed to connect to Octopus*"
- If installed with `helm install --atomic`, the install fails and rolls back, removing the gateway from the cluster. The registered gateway still appears under **Infrastructure ➜ Argo CD Instances** but will never become healthy

Cause:

- The gateway cannot establish a gRPC connection to Octopus Server. Both "Failed to connect" rows in the dialog are caused by this single problem, not two separate ones
- Registration uses the REST API url (`registration.octopus.serverApiUrl`), while the running gateway connects to a separate gRPC endpoint (`gateway.octopus.serverGrpcUrl`, port `8443` by default), so a successful registration does not mean the gRPC endpoint is reachable

Resolution:

- Confirm port `8443` is open and routed through to Octopus Server. A load balancer, proxy, or firewall that only forwards HTTPS (`443`) is a common cause. Probe it from inside the cluster:

```bash
kubectl run port-check --image=busybox --restart=Never --rm -it -- \
  sh -c 'nc -z -w 5 your-octopus-url 8443 && echo REACHABLE || echo UNREACHABLE'
```

- Confirm `gateway.octopus.serverGrpcUrl` points at your Octopus Server's gRPC endpoint, including the port (not the web url)
- If the gateway logs a certificate thumbprint mismatch, confirm `gateway.octopus.serverThumbprint` matches your Octopus Server's certificate thumbprint
- Inspect the gateway pod logs for connection details: `kubectl logs deploy/octopus-argocd-gateway -n <namespace>`
- If the install was rolled back (e.g. `helm install --atomic` failed and cleaned up the cluster), delete the orphaned Argo CD Gateway in Octopus, resolve the connection issue, and re-run the installation

#### Failed to connect to ArgoCD

Behavior:

- Install Argo CD Gateway dialog states:
  - "Gateway registered with Octopus" was successful
  - "Failed to connect to Argo CD" show as failed
- In a Kubernetes viewer (e.g. K9s), the gateway pod logs state "*error validating connection to Argo CD*"
- In Octopus when navigating to newly added ArgoCD instance "Gateway connectivity" tab show "Argo CD Connectivity Issues" warning

Cause:

- Unable to create a connection to your Argo CD instance

Resolution:

- Confirm the URL specified for the `gateway.argocd.serverGrpcUrl` matches the expected grpc endpoint of your argo instance (`<servicename>.<namespace>.svc.cluster.local`)
- If your Argo CD instance is using a self-signed certificate ensure `gateway.argocd.insecure` is set to `true` (see [TLS errors](#argo-cd-gateway-cannot-connect-to-argo-cd-due-to-tls-errors) below)
- If your Argo CD instance is running in "insecure" mode, ensure `gateway.argocd.plaintext` is set to `true` (false otherwise)
- In Octopus, delete the registered Argo CD Gateway, follow all required helm deletion commands, and reinstall

### Argo CD Gateway cannot connect to Argo CD due to TLS errors

If your gateway is unable to connect to your Argo CD instance due to TLS errors it is likely due to the certificate that Argo CD is serving traffic with.

#### Self Signed Certificate

Behavior:

- The gateway is unable to connect to your Argo CD instance
- The gateway pod logs contain:

```text
tls: failed to verify certificate: x509: certificate signed by unknown authority
```

Cause:

- Argo CD is using a self-signed certificate

Resolution:

- Configure the gateway to trust your certificate, as described in [Trusting Certificates](/docs/argo-cd/instances#trusting-certificates)
- Alternatively, if it is intended that your certificate is self-signed, you can disable certificate verification by doing the following:

Using Helm for existing installation:

```bash
helm upgrade --atomic \
--version "1.0.0" \
--namespace "{{GATEWAY_NAMESPACE}}" \
--reset-then-reuse-values \
--set gateway.argocd.insecure="true" \
--set gateway.argocd.plaintext="false" \
{{EXISTING_HELM_RELEASE_NAME}} \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

:::div{.warning}
By setting `gateway.argocd.insecure="true"`, TLS certificate verification will no longer be performed between the gateway and the Argo CD instance. Make sure this configuration is necessary to avoid potential security issues.
:::

#### No Certificate

Behavior:

- The gateway fails to connect to your Argo CD instance
- The gateway pod logs contain:

```text
transport: authentication handshake failed: EOF
```

Cause:

- Your Argo CD instance is running without a certificate (e.g. SSL is terminated at a load balancer), while the gateway is configured by default to require encrypted traffic

Resolution:

- If it is intended that you don't have a certificate, you can disable encryption between the gateway and Argo CD by doing the following:

```bash
helm upgrade --atomic \
--version "1.0.0" \
--namespace "{{GATEWAY_NAMESPACE}}" \
--reset-then-reuse-values \
--set gateway.argocd.insecure="false" \
--set gateway.argocd.plaintext="true" \
{{EXISTING_HELM_RELEASE_NAME}} \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

:::div{.warning}
By setting `gateway.argocd.plaintext="true"`, all traffic between the gateway and Argo CD will be unencrypted. Make sure this configuration is necessary to avoid potential security issues.
:::

## Gateway Connectivity

### Gateway connection drops at regular intervals (load balancer idle timeout)

Behavior:

- The gateway installs and connects successfully, but loses its connection to Octopus Server after every quiet period of the same length (e.g. 60 seconds without activity)
- Deployments with Argo CD steps fail intermittently with gRPC connection errors, and succeed when retried
- The "Gateway connectivity" tab of the Argo CD instance intermittently shows "Unavailable", depending on when the last health check ran
- The gateway pod logs show stream errors followed by an immediate reconnection
- If the load balancer drops connections silently instead of closing them, the logs show failing keep alives (`keep alive check failed - cancelling subscribers` with `DeadlineExceeded` errors) and the gateway pod restart count climbs at a regular cadence

Cause:

- A load balancer or proxy between the gateway and Octopus Server closes connections it considers idle
- The gateway sends a keep alive to Octopus Server every 30 seconds by default to hold the connection open. If the load balancer's idle timeout is shorter than the keep alive interval (or keep alives are disabled), the connection is terminated before the next keep alive is sent

Resolution:

- Increase the idle timeout on your load balancer so it comfortably exceeds the keep alive interval (`gateway.octopus.keepAlive.intervalSeconds`, default 30 seconds)
- Alternatively, reduce the keep alive interval below the load balancer's idle timeout:

```bash
helm upgrade --atomic \
--version "1.0.0" \
--namespace "{{GATEWAY_NAMESPACE}}" \
--reset-then-reuse-values \
--set gateway.octopus.keepAlive.intervalSeconds="15" \
{{EXISTING_HELM_RELEASE_NAME}} \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

## Application/Project mapping

### No applications are listed on the **Argo CD Instance ➜ Applications** page

Behavior:

- Argo CD web UI shows existing applications, however they do not appear in the Octopus UI
  
Cause:

- Argo CD Token used by the gateway has insufficient permissions to access applications resources in Argo

Resolution:

- Create required RBAC entries for the account being used by the Octopus Gateway as per [Argo CD Authentication](/docs/argo-cd/instances/argo-user).

## Step Configuration

### Argo Applications in step shows "You don't have any Argo CD instance to preview yet"

Behavior:

- The "Argo Applications" section on the step indicates that no Argo CD instances exist

Cause:

- No Argo CD instances are registered in the current space

Resolution:

- Navigate to **Infrastructure ➜ Argo CD Instances** and confirm an instance is visible in this space
- If not - add a new Argo CD instance using the installation wizard

## Step Execution

### No Applications are updated during a deployment

Behavior:

- Deployment passes with warnings
- Octopus deployment task log contains `No annotated Argo CD applications could be found for this deployment.`

Cause:

- No applications have been annotated for this project/environment/tenant deployment

Resolution:

- Confirm/update annotations on the target Argo Application match the deployments Project/Environment/Tenant and update as appropriate

### Deployment fails on an Argo CD step (no git credentials)

Behavior:

- Octopus deployment task log contains "Could not find a Git Credential associated with <url>"

Cause:

- One of the Argo CD Application Sources to be updated references a git repository for which Octopus has no Git Credential

Resolution:

- Add/Update a Git Credential to Octopus, specifying a repository-allowlist which includes the url specified in the error message.

### Deployment fails on Argo CD step (source is not a git repository)

Behavior:

- Octopus deployment task log contains `Failed to clone Git repository at <url>`

Cause:

- The mapped Argo Application source is not a git repository (e.g. Helm repository or OCI)
- The provided git credentials for the url have insufficient privileges

Resolution:

- Octopus cannot update charts sourced from a Helm repository or OCI feed - contact support to determine way forward.
- Ensure the associated git credential has appropriate permissions

### Deployment fails on Argo CD step (insufficient permissions)

Behavior:

- Octopus deployment task log contains "http status code: 403"

Cause:

- Octopus Git credential associated with mapped Argo CD Application Source has insufficient privileges to read/write the git repository

Resolution:

- Create a new credential in your git provider, store it in an Octopus Git Credential, and ensure the "Allow List" includes your Application Source repository

## Argo CD live view not visible on dashboard

Behavior:

- Live Status Panel is not visible on the project/space dashboard

Cause:

- Live Status is not enabled

Resolution:

- Enable Live Status via the "Live Status" toggle switch at the top of the dashboard.
