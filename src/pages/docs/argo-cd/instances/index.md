---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Argo CD Instances
description: How Octopus tracks your Argo CD Instances
navOrder: 10
hideInThisSectionHeader: true
---

An Argo CD instance is represented in Octopus as a separate Infrastructure component, distinct from Deployment Targets or Workers.

Each Argo CD instance in Octopus represents a connection to a running Argo CD instance and is used as the anchor in which Argo CD applications are retrieved.

To connect Octopus Deploy to an Argo CD instance, a network gateway must first be installed in your Kubernetes cluster, the `Octopus Argo CD Gateway`.,

The gateway creates a TLS-encrypted, outgoing gRPC connection from the host Kubernetes cluster to Octopus Server, and routes data from Argo CD to your Octopus
Server instance. This gateway means that no publicly accessible HTTP/gRPC URL is required for communication, providing added security.

A gateway is required for each Argo CD Instance being connected to Octopus.

## Installing the Octopus Argo CD Gateway

The gateway is installed using [Helm](https://helm.sh) via the [octopusdeploy/octopus-argocd-gateway-chart](https://hub.docker.com/r/octopusdeploy/octopus-argocd-gateway-chart) chart.

To simplify this, there is an installation wizard in Octopus to generate the required values.

:::div{.warning}
Helm will use your current kubectl config, so make sure your kubectl config is pointing to the correct cluster before executing the following helm commands.
You can see the current kubectl config by executing:
```bash
kubectl config view
```
:::

### Configuration 
1. Navigate to **Infrastructure ➜ Argo CD Instances**, and click **Add Argo CD Instance**
2. This launches the Register Argo CD Instance dialog

:::figure
![Octopus-Argo-Gateway Wizard Config Page](/docs/img/argo-cd/gateway-wizard-config.png)
:::

1. Enter the unique name for the instance. This name is used to generate the Kubernetes namespace, as well as the Helm release name.
2. Select at least one [environment](https://octopus.com/docs/infrastructure/environments) the instance will be responsible for servicing.
3. If required, change the [in-cluster](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#services) URL of the Argo CD API Server service. In many cases the default value provided will work.
4. Optionally, add the URL used to access Argo CD's web frontend. This will be used for linking from Octopus to Argo CD to aid with deployment investigations.
5. A valid Argo CD JWT authentication token is required. To generate this, you can use the [Argo CD CLI](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/).
6. Press "Next" to move to the next screen

#### Installation helm command

At the end of the wizard, Octopus generates a Helm command that you copy and paste into a terminal connected to the target cluster. After it's executed, Helm installs all the required resources and starts the gateway.

:::figure
![Octopus Argo CD Gateway Wizard Helm command Page](/docs/img/argo-cd/gateway-wizard-helm-comand.png)
:::

:::div{.hint}
The helm command includes a 1 hour bearer token that is used when the gateway first initializes, to register itself with Octopus Server.
:::

:::div{.hint}
The terminal Kubernetes context must have enough permissions to create namespaces and install resources into that namespace. If you wish to install the gateway into an existing namespace, remove the `--create-namespace` flag and change the value after `--namespace`
:::

If left open, the installation dialog waits for the gateway to establish a connection and run a health check. Once successful, the Octopus Argo CD gateway is ready for use!

:::figure
![Octopus Argo CD Gateway Wizard successful installation](/docs/img/argo-cd/gateway-wizard-success.png)
:::

:::div{.hint}
A successful health check indicates that the gateway can successfully connect to the target Argo CD instance and is communicating with Octopus Server.
:::

### Health Checks and Updating

Octopus performs health checks on the gateway in a manner similar to that used for workers and deployment targets.

The gateway uses an internal cronjob to ensure it is always running the latest version.

## Status Display
Your connected 'Argo CD Instances' appear under the Octopus' Infrastructure menu.
These pages allow you to:
* View and edit the Octopus-managed properties of your Argo CD Instance (eg permitted environments),
* View known Argo Applications, and how they map to Octopus project/environment/tenants
* View connectivity and health related data of the instance and gateway

## Next steps

After the gateway has been configured, you need to define the relationships between Argo CD Applications and Octopus Projects, Environments and/or Tenants.

See [Scoping Annotations](/docs/argo-cd/annotations) for more information