---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Automated Installation
description: How Octopus tracks your Argo CD Instances
navOrder: 10
hideInThisSectionHeader: true
---

With the Octopus Argo CD Gateway being published as a helm chart, several options exist to install it through automated
means:
* scripted install using the helm cli
* Terraform
* Argo CD Application

The Gateway requires the following configuration items which define how it connects to both OctopusDeploy an Argo CD:

| Value                                  | Type | Required                  | Description                                                                                                                                                     |
|----------------------------------------|---|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| registration.octopus.name              | string | Required                  | The unique name of this gateway, used within Octopus Deploy                                                                                                     |
| registration.octopus.serverApiUrl      | string | Required                  | The URL of the Octopus Server that the gateway will register                                                                                                    |
| registration.octopus.serverAccessToken | string | Required                  | The bearer or API token used for authentication during initial registration process with Octopus Server                                                         |
| registration.octopus.spaceId           | string | Required                  | The unique id of the Octopus Deploy space in which the gateway should reside                                                                                    |
| registration.argocd.webUiUrl           | string | Optional (default: null)  | The URL of your Argo CD instance's Web UI, used for generating deep-links within Octopus Deploy                                                                 |   
| gateway.octopus.serverThumbprint       | string | Optional                  | Needed only if your Octopus server uses a self-signed certificate for its grpc endpoints. The thumbprint of the X509 certificate used by Octopus's GRPC service |
| gateway.octopus.serverGrpcUrl          | string | Required                  | The URL at which Octopus Server expects to receive grpc traffic (grpc://your-server.com:8443)                                                                   |
| gateway.octopus.plainText              | string | Optional (default: false) | True if Octopus' grpc endpoint is using un-encrypted connections, false otherwise.                                                                              |
| gateway.argocd.serverGrpcUrl           | string | Required                  | The URL on which your Argo CD instance is listening for connections                                                                                             |
| gateway.argocd.insecure                | string | Optional (default: false) | Set to True if your Argo CD instance is using a self-signed cert, false otherwise                                                                               |
| gateway.argocd.plaintext               | string | Optional (default: false) | Set to True if your Argo CD instance is using un-encrypted connections, false otherwise. If true, Insecure is not considered.                                   |

It should be noted that the gateway self-registers with Octopus Deploy Server when it is first installed.

## Scripted helm
The Octopus Server webUI offers a process to aid in the creation of the required helm command to install the Gateway chart.
However it can also be scripted, using a command similar to the following:
```
helm upgrade --install --atomic \
--create-namespace --namespace octo-argo-gateway-release-name \
--version "*.*" \
--set registration.octopus.name="<name of gateway in Octopus>" \
--set registration.octopus.serverApiUrl="https://your-server.octopus.app" \
--set registration.octopus.serverAccessToken="API-123456789...." \
--set registration.octopus.environments="{dev,staging,production}" \
--set registration.octopus.spaceId="Spaces-X" \
--set gateway.octopus.serverGrpcUrl="grpc://your-server.octopus.app:8443" \
--set gateway.argocd.serverGrpcUrl="grpc://argocd-server.argocd.svc.cluster.local" \
--set gateway.argocd.authenticationToken="<Argo Api Token>" \
octo-argo-gateway-release-name \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

## Terraform
The Gateway helm chart can be installed via a terraform - for a minimal install the following is required:
```
resource "helm_release" "argo_gateway" {
  name             = "octopus-argo-gateway"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/octopus-argocd-gateway-chart"
  version          = "1.3.0"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-argo-gateway-your-namespace)}"
  timeout = 60 
    set = [
    {
      name = "registration.octopus.name",
      value = "<name of gateway in Octopus>"
    },
    {
      name  = "registration.octopus.serverApiUrl"
      value = "https://your-server.octopus.app"
    },
    {
      name  = "registration.octopus.serverAccessToken"
      value = "API-123456789...."
    },
    {
      name  = "registration.octopus.spaceId"
      value = "Spaces-X"
    },
    {
      name  = "gateway.octopus.serverGrpcUrl"
      value = "grpc://your-server.octopus.app:8443"
    },
    {
      name  = "gateway.argocd.serverGrpcUrl"
      value = "grpc://argocd-server.argocd.svc.cluster.local"
    },
    {
      name  = "gateway.argocd.insecure"
      value = "true"
    },
    {
      name  = "gateway.argocd.plaintext"
      value = "false"
    },
    {
      name  = "gateway.argocd.authenticationToken"
      value = "<Argo Api Token>"
    }
  ]
  
  set_list = [{
    name = "registration.octopus.environments"
    value = [octopusdeploy_environment.dev_env.name, octopusdeploy_environment.prod_env.id] 
  }]
}
```

## Installing as an Argo CD Application
The Octopus-Argo Gateway's helm chart can be installed via an Argo CD Application.

The application yaml required to install the helm chart is as follows (replacing values as per previous examples):
```
project: default
source:
  repoURL: registry-1.docker.io/octopusdeploy
  targetRevision: 1.3.0
  helm:
    parameters:
      - name: registration.octopus.name
        value: <name of gateway in Octopus>
      - name: registration.octopus.serverAccessToken
        value: API-123456789....
      - name: registration.octopus.serverApiUrl
        value: https://your-server.octopus.app
      - name: registration.octopus.spaceId
        value: Spaces-X
      - name: gateway.argocd.authenticationToken
        value: >-
          <Argo Api Token>
      - name: gateway.argocd.serverGrpcUrl
        value: grpc://argocd-server.argocd.svc.cluster.local"
      - name: gateway.octopus.serverGrpcUrl
        value: grpc://your-server.octopus.app:8443
  chart: octopus-argocd-gateway-chart
destination:
  server: https://kubernetes.default.svc
  namespace: new-gateway
```
