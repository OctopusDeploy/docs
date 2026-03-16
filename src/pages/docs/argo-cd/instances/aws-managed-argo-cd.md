---
layout: src/layouts/Default.astro
pubDate: 2026-03-13
modDate: 2026-03-13
title: AWS Managed Argo CD
description: Install Argo CD Gateway on EKS with Argo CD Capability
navOrder: 10
hideInThisSectionHeader: true
---

The Argo CD Gateway can be installed into an AWS EKS cluster and connect to an Argo CD instance managed by the Argo CD Capability.

## Differences from a Standard Argo CD Instance

AWS managed Argo CD instances differ from standard self-hosted installations in the following ways:

### External URL

Standard installations connect to Argo CD using the in-cluster Kubernetes service DNS name (e.g. `argocd-server.argocd.svc.cluster.local`). AWS managed Argo CD instances are not accessible via in-cluster DNS, so the publicly accessible EKS capabilities URL must be used instead.

### Valid TLS Certificate

AWS managed Argo CD instances are served with a publicly trusted TLS certificate. Unlike self-hosted installations that may use self-signed certificates, the **Argo CD instance uses self-signed certificates** option should remain unchecked to keep certificate verification enabled.

### gRPC-Web

AWS EKS Argo CD instances are exposed through a load balancer that does not support native gRPC (HTTP/2). The gateway must be configured to use gRPC-Web, which encapsulates gRPC communication over HTTP/1.1, by setting `gateway.argocd.grpcWeb="true"` or `gateway.argocd.grpcWebRootPath="/argo/api"`.

## Installation

The installation process follows the [standard process](/docs/argo-cd/instances#installing-the-octopus-argo-cd-gateway), with a few adjustments required for AWS managed Argo CD instances.

1. Replace the default value for the Argo CD service DNS name with the publicly accessible URL for the Argo CD instance, without the protocol prefix. For example: `xxxxxxxx.eks-capabilities.ap-southeast-2.amazonaws.com`
2. Uncheck the **Argo CD instance uses self-signed certificates** option
3. Copy the generated Helm command and append the following value: `--set gateway.argocd.grpcWeb="true"`, if your Argo CD instance's API is not hosted at the root path you can set the following value instead: `--set gateway.argocd.grpcWebRootPath="/argo/api"`

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
--set gateway.argocd.authenticationToken="<Argo API Token>" \
--set gateway.argocd.grpcWeb="true" \
<instance-name> \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```
