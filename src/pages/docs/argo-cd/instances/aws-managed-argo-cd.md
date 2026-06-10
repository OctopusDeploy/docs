---
layout: src/layouts/Default.astro
pubDate: 2026-03-13
modDate: 2026-06-03
title: AWS Managed Argo CD
description: Install Argo CD Gateway on EKS with Argo CD Capability
navOrder: 10
hideInThisSectionHeader: true
---

The Argo CD Gateway can be installed into an AWS EKS cluster and connect to an Argo CD instance managed by the Argo CD Capability.

## Differences from a standard Argo CD instance

AWS managed Argo CD instances differ from standard self-hosted installations in the following ways:

### Authentication

AWS enforces a maximum lifetime of 12 hours for account tokens due to this project role authentication tokens must be used instead. The majority of the APIs that the Argo CD Gateway calls are project-scoped. However, if the Gateway needs to make a request to an API that is not project-scoped it will choose the first available authentication token, if you would like to provide a specific token to be used for these calls you can add it to the value `gateway.argocd.projectAuthentication` using the project name `octo-gateway-unscoped`.

The project auth tokens can also be provided using a external secret, for example:

```yaml
apiVersion: v1
kind: Secret
metadata:
  # Pass this name to gateway.argocd.projectAuthenticationSecretName
  name: octopus-argocd-project-tokens
  # Must be the same namespace your Helm release is installed into
  namespace: octo-argo-gateway-local-dev
type: Opaque
stringData:
  # One key per Argo CD AppProject.
  # Key format:  PROJECT_AUTH_TOKEN_<project>
  # Env at runtime: OCTOPUS_ARGOCD_PROJECT_AUTH_TOKEN_<project>  (chart adds OCTOPUS_ARGOCD_ prefix via envFrom)
  PROJECT_AUTH_TOKEN_default: ""
  PROJECT_AUTH_TOKEN_my-project: ""
```

This secret can then be passed to the helm chart by setting the value `gateway.argocd.projectAuthenticationSecretName`.

### External URL

Standard installations connect to Argo CD using the in-cluster Kubernetes service DNS name (e.g. `argocd-server.argocd.svc.cluster.local`). AWS managed Argo CD instances are not accessible via in-cluster DNS, so the publicly accessible EKS capabilities URL must be used instead.

### Valid TLS certificate

AWS managed Argo CD instances are served with a publicly trusted TLS certificate. Unlike self-hosted installations that may use self-signed certificates, the **Argo CD instance uses self-signed certificates** option should remain unchecked to keep certificate verification enabled.

### gRPC-Web

AWS EKS Argo CD instances are exposed through a load balancer that does not support native gRPC (HTTP/2). The gateway must be configured to use gRPC-Web, which encapsulates gRPC communication over HTTP/1.1, by setting `gateway.argocd.grpcWeb="true"` or `gateway.argocd.grpcWebRootPath="/argo/api"`.

### Cluster annotation

Project role auth tokens do not have permission to query Argo CD Cluster resources unless they are scoped to the project. This means the Gateway won't be able to retrieve the default image registry annotation from the cluster resource. If you need to be able to add this annotation it can be added to the application along side the other Octopus annotations. [See the Cluster annotation doc for more details](/docs/argo-cd/annotations/cluster-annotations)

## Installation

The installation process follows the [standard process](/docs/argo-cd/instances#installing-the-octopus-argo-cd-gateway), with a few adjustments required for AWS managed Argo CD instances.

1. Replace the default value for the Argo CD service DNS name with the publicly accessible URL for the Argo CD instance, without the protocol prefix. For example: `xxxxxxxx.eks-capabilities.ap-southeast-2.amazonaws.com`
2. Uncheck the **Argo CD instance uses self-signed certificates** option
3. Append the following value to the generated helm command: `--set gateway.argocd.grpcWeb="true"`, if your Argo CD instance's API is not hosted at the root path you can set the following value instead: `--set gateway.argocd.grpcWebRootPath="/argo/api"`
4. Replace `--set gateway.argocd.authenticationToken` with `--set-json gateway.argocd.projectAuthentication=[{"project":"project-1","token":"<Argo API Token>"},{"project":"project-2","token":"<Argo API Token>"}]`

The resulting Helm command will look similar to the following:

```bash
helm install --atomic \
--create-namespace --namespace octo-argo-gateway-<instance-name> \
--version "*.*" \
--set registration.octopus.name="<instance-name>" \
--set registration.octopus.serverApiUrl="https://your-instance.octopus.app/" \
--set registration.octopus.serverAccessToken="API-XXXXXXXXXXXXXXXX" \
--set registration.octopus.spaceId="Spaces-1" \
--set gateway.octopus.serverGrpcUrl="grpc://your-instance.octopus.app:8443" \
--set gateway.argocd.serverGrpcUrl="grpc://xxxxxxxx.eks-capabilities.<region>.amazonaws.com" \
--set gateway.argocd.insecure="false" \
--set gateway.argocd.plaintext="false" \
--set gateway.argocd.grpcWeb="true" \
--set-json gateway.argocd.projectAuthentication=[{"project":"project-1","token":"<Argo API Token>"},{"project":"project-2","token":"<Argo API Token>"}] \
<instance-name> \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

Alternatively using a values file

```yaml
registration:
  octopus:
    name: "<instance-name>"
    serverApiUrl: "https://your-instance.octopus.app/"
    serverAccessToken: "API-XXXXXXXXXXXXXXXX"
    spaceId: "Spaces-1"
    environments:
      - dev
gateway:
  octopus:
    serverGrpcUrl: "grpc://your-instance.octopus.app:8443"
  argocd:
    serverGrpcUrl: "grpc://xxxxxxxx.eks-capabilities.<region>.amazonaws.com"
    grpcWeb: "true"
    insecure: "false"
    plaintext: "false"
    projectAuthenticationSecretName: <your-secret-name>
    projectAuthentication:
     - project: project-1
       token: <Argo API Token>
     - project: project-2
       token: <Argo API Token>
```

```bash
helm install --atomic \
--create-namespace --namespace octo-argo-gateway-<instance-name> \
--version "*.*" \
-f "my-values.yaml" \
<instance-name> \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```
