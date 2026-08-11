---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2026-07-21
title: Automated Installation
description: Install Argo CD instances via scripting or IAC
navOrder: 10
hideInThisSectionHeader: true
---

With the Octopus Argo CD Gateway being published as a helm chart, several options exist to install it through automated
means:

- Scripted install using the Helm CLI
- Terraform
- Argo CD Application

Full documentation for all available Helm values is available on [GitHub](https://github.com/OctopusDeploy/octopus-argocd-gateway-chart-docs).

These examples, and the Helm command provided in the Octopus Server portal, describe the minimum configuration required to install an Argo Gateway.

## Scripted helm

The Octopus Server portal offers a process to aid in the creation of the required helm command to install the Gateway chart.
However, it can also be scripted using a command similar to the following:

```bash
helm upgrade --install --atomic \
--create-namespace --namespace octo-argo-gateway-release-name \
--version "*.*" \
--set registration.octopus.name="<display name of gateway in Octopus>" \
--set registration.octopus.serverApiUrl="https://your-instance.octopus.app" \
--set registration.octopus.serverAccessToken="API-XXXXXXXXXXXXXXXX" \
--set registration.octopus.environments="{dev,staging,production}" \
--set registration.octopus.spaceId="Spaces-1" \
--set gateway.octopus.serverGrpcUrl="grpc://your-instance.octopus.app:8443" \
--set gateway.argocd.serverGrpcUrl="grpc://argocd-server.argocd.svc.cluster.local" \
--set gateway.argocd.authenticationToken="<Argo Api Token>" \
octo-argo-gateway-release-name \
oci://registry-1.docker.io/octopusdeploy/octopus-argocd-gateway-chart
```

## Terraform

The Gateway helm chart can be installed via Terraform. For a minimal install the following is required.

Update the version line to the most recent tag found on [dockerhub](https://hub.docker.com/r/octopusdeploy/octopus-argocd-gateway-chart)

```hcl
locals {
  gatewayName          = "<display name of gateway in Octopus>"
  octopus_api_key      = "API-XXXXXXXXXXXXXXXX"
  octopus_address      = "https://your-instance.octopus.app"
  octopus_grpc_address = "https://your-instance.octopus.app:8443"
  argo_auth_token      = "<your Argo JWT>"
}

resource "helm_release" "argo_gateway" {
  name             = "octopus-argo-gateway"
  repository       = "oci://registry-1.docker.io"
  chart            = "octopusdeploy/octopus-argocd-gateway-chart"
  version          = "1.*.*"
  atomic           = true
  create_namespace = true
  namespace        = "octopus-argo-gateway-your-namespace"
  timeout          = 60

  set = [
    {
      name  = "registration.octopus.name",
      value = local.gatewayName
    },
    {
      name  = "registration.octopus.serverApiUrl"
      value = local.octopus_address
    },
    {
      name  = "registration.octopus.serverAccessToken"
      value = local.octopus_api_key
    },
    {
      name  = "registration.octopus.spaceId"
      value = "Spaces-1"
    },
    {
      name  = "gateway.octopus.serverGrpcUrl"
      value = local.octopus_grpc_address
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
      value = local.argo_auth_token
    }
  ]

  set_list = [{
    name  = "registration.octopus.environments"
    value = [octopusdeploy_environment.dev_env.name, octopusdeploy_environment.prod_env.id]
  }]
}
```

## Registering a gateway in multiple spaces

From `2026.3.7755` onwards, a single gateway installation can be registered in more than one space, making the same Argo CD instance available in each of them.

By default, every registered space discovers all of the instance's applications. To limit an application to specific spaces, use the [space scoping annotation](/docs/argo-cd/annotations#scoping-applications-to-spaces).

### Using Helm values

Set `registration.octopus.spaceIds` and the gateway registers itself into each listed space:

```bash
--set 'registration.octopus.spaceIds={Spaces-1,Spaces-2,Spaces-3}' \
```

### Using the REST API

You can also register an already-installed gateway in another space with the REST API by setting `PreserveAuthenticationToken` to `true`.

First, find the gateway's client ID by getting its registration from the space it was initially installed into. The gateway ID (e.g. `ArgoCDGateways-1`) is shown in the URL of the Argo CD instance page in Octopus.

```bash
curl -H "X-Octopus-ApiKey: API-YOUR-KEY" \
  "https://your-octopus-url/api/Spaces-1/argocdgateways/ArgoCDGateways-1"
```

The response includes a `ClientId` value, which is used to re-register the gateway in the new space. To run the registration in a new space:

```bash
curl -X POST \
  -H "X-Octopus-ApiKey: API-YOUR-KEY" \
  -H "Content-Type: application/json" \
  "https://your-octopus-url/api/<new space ID>/argocdgateways" \
  -d '{
    "SpaceId": "<new space ID>",
    "ClientId": "<client id from the existing registration>",
    "Name": "<display name of gateway in Octopus>",
    "Environments": [],
    "PreserveAuthenticationToken": true
  }'
```

When `PreserveAuthenticationToken` is `true`, the response's `AuthenticationToken` is null and the existing token remains valid.

Deleting a registration only removes the gateway from that space. The gateway's authentication token stays valid while it's registered in at least one space.

## Installing as an Argo CD Application

The Octopus-Argo Gateway's helm chart can be installed via an Argo CD Application.

The application YAML required to install the helm chart is as follows (replacing values as per previous examples):

1. Create the namespace

   ```shell
   kubectl create ns octopus-argo-gateway-your-namespace
   ```

2. Generate Argo CD Authentication Token
   2.1. Follow the instructions on the [Argo CD Authentication](/docs/argo-cd/instances/argo-user) guide
   2.2. Save the token in a secret

   ```shell
   kubectl create secret generic argocd-auth-token -n octopus-argo-gateway-your-namespace --from-literal=ARGOCD_AUTH_TOKEN=<token>
   ```

3. Generate Octopus Deploy Api-Key
   3.1. Follow the instructions on the [How to Create an API Key](/docs/octopus-rest-api/how-to-create-an-api-key) guide
   3.2. Save the token in a secret

   ```shell
   kubectl create secret generic octopus-server-access-token -n octopus-argo-gateway-your-namespace --from-literal=OCTOPUS_SERVER_ACCESS_TOKEN=<token>
   ```

4. Apply the Argo CD application (or commit this manifest to your git-ops repository already synced by Argo CD)

   ```yaml
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     finalizers:
       - resources-finalizer.argocd.argoproj.io
     name: octopus-argo-gateway
   spec:
     project: default
     source:
       repoURL: registry-1.docker.io/octopusdeploy
       chart: octopus-argocd-gateway-chart
       targetRevision: 1.23.0
       helm:
         valuesObject:
           registration:
             octopus:
               name: <display name of gateway in Octopus>
               serverApiUrl: https://your-instance.octopus.app
               serverAccessTokenSecretName: octopus-server-access-token
               serverAccessTokenSecretKey: OCTOPUS_SERVER_ACCESS_TOKEN
               spaceId: Spaces-1
           gateway:
             octopus:
               serverGrpcUrl: grpc://your-instance.octopus.app:8443
             argocd:
               serverGrpcUrl: grpc://argocd-server.argocd.svc.cluster.local
               authenticationTokenSecretName: argocd-auth-token
               authenticationTokenSecretKey: ARGOCD_AUTH_TOKEN
           autoUpdate:
             # should be disabled, otherwise the auto-update job will keep trying to update the instance, while argo cd syncs it back to original state
             enabled: false
     destination:
       server: https://kubernetes.default.svc
       namespace: octopus-argo-gateway-your-namespace
   ```
