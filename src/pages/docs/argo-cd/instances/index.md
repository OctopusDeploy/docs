---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Argo CD Instances
description: How Octopus tracks your Argo CD Instances
navOrder: 10
hideInThisSectionHeader: true
---

Argo CD Instances are a first class infrastructure component within Octopus Deploy.

To connect OctopusDeploy to an Argo CD instance, a network gateway must first be installed in your cluster.

The gateway creates an ssl-encrypted, grpc outgoing connection to OctopusDeploy, and routes data from Argo CD to your Octopus
instance. This network topology is considered safer than leaving an open, listening connection on your Argo CD instance.

A gateway is required for each Argo CD Instance being connected to Octopus.

## The Octopus-ArgoCD-Gateway
The gateway is installed using [Helm](https://helm.sh) via the [octopusdeploy/octopus-argocd-gateway-chart](https://hub.docker.com/r/octopusdeploy/octopus-argocd-gateway-chart) chart.

To simplify this, there is an installation wizard in Octopus to generate the required values.

:::div{.warning}
Helm will use your current kubectl config, so make sure your kubectl config is pointing to the correct cluster before executing the following helm commands.
You can see the current kubectl config by executing:
```bash
kubectl config view
```
:::

### Installation
1. Navigate to **Infrastructure ➜ Argo CD Instances**, and click "Add Argo CD Instance"
2. This launches the Add new Argo CD Instance dialog

:::figure
![Octopus-Argo-Gateway Wizard Config Page](/docs/img/argo-cd/gateway-wizard-config.png)
:::

1. Enter the unique name for the instance. This name is used to generate the Kubernetes namespace, as well as the Helm release name.
2. Select at least 1 environment the instance will be responsible for servicing.
3. Set the Argo instances 'in-cluster' URL - the default value will work for many cases.
4. Add URL used to access Argo's web frontend (this is optional, but will add value during deployment investigations)
5. Use the Argo CD CLI too to generate an Authentication token, and add it to the dialog
6. Press "Next" to move to the next screen

### Health Checks and Updating
The Octopus performs health checks on the gateway in a manner similar to that used for workers and deployment targets.

The gateway uses an internal cronjob to ensure it is always running the latest version.

## System Configuration
Before executing deployment processes against your Argo CD Applications the relationship between Octopus Projects/Environments/Tenants
and Argo CD Applications must be defined. This is to solve the problem:

`When I deploy Project-X to Staging environment - which Argo CD Application should be updated?`

To answer this, Octopus requires additional 'Scoping' annotations be added to your Argo CD Applications:
* argo.octopus.com/project <-- the _slug_ of the Octopus project responsible for updating the application
* argo.octopus.com/environment <-- the _slug_ of the Octopus environment this application is part of 
* argo.octopus.com/tenant <-- the _slug_ of the Octopus tenant representing this application (optional)

Additional annotations are required when 'Updating Image tags in a helm chart', and are documented as part of the deployment
step process (TODO: add link)

## Status Display
Your connected 'Argo CD Instances' appear under the Octopus' Infrastructure menu.
These pages allow you to:
* View and edit the Octopus-managed properties of your Argo CD Instance (eg permitted environments),
* View known Argo Applications, and how they map to Octopus project/environment/tenants
* View connectivity and health related data of the instance and gateway

