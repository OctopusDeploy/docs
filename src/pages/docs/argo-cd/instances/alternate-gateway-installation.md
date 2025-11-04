---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Alternate Gateway Installation
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
| Values File field | Type | Required | Description|
|---|---|---|
|registration.octopus.name| string | Required | The unique name of this gateway, used within Octopus Deploy |
|registration.octopus.serverApiUrl| string | Required | The URL of the Octopus Server that the gateway will register |
|registration.octopus.serverAccessToken| string | Required | The bearer or API token used for authentication during initial registration process with Octopus Server |
|registration.octopus.spaceId| string | Required | The unique id of the Octopus Deploy space in which the gateway should reside |
|registration.argocd.webUiUrl| string | Optional | The URL of your Argo CD instance's Web UI, used for generating deeplinks within Octopus Deploy |   
|gateway.octopus.serverThumbprint| string | Optional | Needed only if your Octopus server uses a self-signed certificate for its grpc endpoints. The thumbprint of the X509 certificate used by Octopus's GRPC service |
|gateway.octopus.serverGrpcUrl| string | Required | The URL at which Octopus Server expects to receive grpc traffic (grpc://yourserver.com:8443) |
|gateway.argocd.serverGrpcUrl| string | Required |
|gateway.argocd.insecure| string | N/A |
|gateway.argocd.plaintext| string | N/A |

It should be noted that the gateway self-registers with Octopus Deploy Server when it is first installed.

## Scripted helm

## Terraform
The Gateway helm chart can be installed via a terraform - for a minimal install the following is required
```
resource "helm_release" "argo_gateway" {
  name             = "octopus-argo-gateway"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/octopus-argocd-gateway-chart"
  version          = "1.3.0"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-argo-gateway-yournamespace)}"
  timeout = 60 
    set = [
    {
      name = "registration.octopus.name",
      value = "<name of gateway in Octopus>
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
      value = <Argo Api Token>
    }
  ]



helm upgrade --install --atomic \
--create-namespace --namespace octo-argo-gateway-myinstance1 \
--version "*.*" \
--set registration.octopus.name="MyInstance1" \
--set registration.octopus.serverApiUrl="https://team-md-argocd-in-octopus.testoctopus.app/" \
--set registration.octopus.serverAccessToken="eyJhbGciOiJQUzI1NiIsImtpZCI6IjU3ODc0YjRmYzYwMjRiY2JiMjRmYmJjODFjNzU5MWI3IiwidHlwIjoiSldUIn0.eyJhdWQiOiJodHRwczovL3RlYW0tbWQtYXJnb2NkLWluLW9jdG9wdXMudGVzdG9jdG9wdXMuYXBwIiwiaXNzIjoiaHR0cHM6Ly90ZWFtLW1kLWFyZ29jZC1pbi1vY3RvcHVzLnRlc3RvY3RvcHVzLmFwcCIsImV4cCI6MTc2MjE2ODA0OCwiaWF0IjoxNzYyMTY0NDQ4LCJuYmYiOjE3NjIxNjQ0NDgsImp0aSI6ImMzODI1Y2M3YWQ3YjRjZmU4MGM3OThiMGEwZTIwMGY5Iiwic3ViIjoiNDA4YTMxOTAtYjk0MC00MTljLWIzZDUtMzhkOTUzM2VmN2Y1In0.YLVLd67BdZe-5j6fhq3-J0-kR-tsh-ryZhX997Mn9j45Jo0kukCFvCL_LjngjRu-CjxqpS6O8quauyKs9UUkKV4r4sbJJkUqzHIQjc6fgPe9HuWIkIBN8mIS70JLyBHL4bcshjX_rDe5GirXRZ7vQok0SOVIwwj3mk1GTVlCIP7LGfHzZlaW20HNTqKYrZLGASJipTqy75REkYGEWxJYRYcS7CoVSHhtr4lnSMhosbhQgAOvaZzBKRGjNDDJXo11V8UZaQXor_d2MchqH3O0Y5IYD_QXaWPRZWimLEOgXu4F_gsvixWRUMwclRuNfkpmaI3eVx_vDdQhXWrMDdMFsw" \
--set registration.octopus.environments="{dev,staging,production}" \
--set registration.octopus.spaceId="Spaces-2" \
--set registration.argocd.webUiUrl="http://localhost:8080" \
--set gateway.octopus.serverGrpcUrl="grpc://team-md-argocd-in-octopus.testoctopus.app:8443" \
--set gateway.argocd.serverGrpcUrl="grpc://argocd-server.argocd.svc.cluster.local" \
--set gateway.argocd.insecure="false" \
--set gateway.argocd.plaintext="false" \
--set gateway.argocd.authenticationToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJhZG1pbjphcGlLZXkiLCJuYmYiOjE3NjIxNjQ0MTcsImlhdCI6MTc2MjE2NDQxNywianRpIjoiMGI0MjM0NjItY2I0MS00N2U3LWJkZWMtN2E4OTBkNjU2NTcyIn0.9Ofyojv7bXky5Mdy8QiGvlV2UYnOjBL2DHBYHmMao28" \
myinstance1 \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart





## Installing as an Argo CD Application 