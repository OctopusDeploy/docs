---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-12-08
navSection: Argo CD Instances
navTitle: Overview
title: Overview
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

:::div{.info}

The Argo/Octopus integration requires only the Octopus/Argo gateway to enable all features.

The [Kubernetes agent](/docs/kubernetes/targets/kubernetes-agent) and the [Kubernetes monitor](/docs/kubernetes/targets/kubernetes-agent/kubernetes-monitor) are not required.

:::

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

    :::div{.warning}
    The JWT token must belong to an Argo CD user with permission to read Application and Cluster resources.
    :::

6. Press "Next" to move to the next screen

#### Installation helm command

At the end of the wizard, Octopus generates a Helm command that you copy and paste into a terminal connected to the target cluster. After it's executed, Helm installs all the required resources and starts the gateway.

:::div{.hint}
Full documentation for the Octopus Argo CD gateway Helm chart values can be found in this [Github repository](https://github.com/OctopusDeploy/octopus-argocd-gateway-chart-docs/tree/main)
:::

:::figure
![Octopus Argo CD Gateway Wizard Helm command Page](/docs/img/argo-cd/gateway-wizard-helm-comand.png)
:::

:::div{.hint}
The helm command includes a 1 hour bearer token that is used when the gateway first initializes, to register itself with Octopus Server.
:::

:::div{.hint}
The terminal Kubernetes context must have enough permissions to create namespaces and install resources into that namespace. If you wish to install the gateway into an existing namespace, remove the `--create-namespace` flag and change the value after `--namespace`
:::

:::div{.warning}

By default, the Octopus Argo CD gateway will verify TLS certificates before making a connection, if your Argo CD instance is hosted with a self-signed TLS certificate or isn't using a TLS certificate at all the gateway will fail to connect, this can be prevented by setting one of the following value on the Helm install.

```bash
# For self-signed certificates - Disables TLS certificate verification
gateway.argocd.insecure="true"

# For no certificates - Disables TLS entirely, all traffic between the gateway and Argo traffic will be unencrypted
gateway.argocd.plaintext="true"
```

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

- View and edit the Octopus-managed properties of your Argo CD Instance (eg permitted environments),
- View known Argo Applications, and how they map to Octopus project/environment/tenants
- View connectivity and health related data of the instance and gateway

## Next steps

After the gateway has been configured, you need to define the relationships between Argo CD Applications and Octopus Projects, Environments and/or Tenants.

See [Scoping Annotations](/docs/argo-cd/annotations) for more information

## Versioning

The Octopus Argo CD gateway Helm chart follows [Semantic Versioning](https://semver.org/). Generally, version updates can be interpreted as follows:

- *major* - Breaking changes to the chart. This may include adding or removing of resources, breaking changes in the Octopus Argo CD gateway application image, breaking changes to the structure of the `values.yaml`. Upgrading to a major version might involve modifying your gateway's configuration or upgrading to a version of Octopus that supports the major version
- *minor* - New non-breaking features. New features or improvements to the Octopus Argo CD gateway application or helm chart itself.
- *patch* - Minor non-breaking bug fixes or changes that do not introduce new features.

## Troubleshooting

### Argo CD TLS Errors

If your gateway is unable to connect to your Argo CD instance due to TLS errors it is likely due to the certificate that Argo CD is serving traffic with.

#### Self Signed Certificate

If you are getting an error that looks like this:

```text
tls: failed to verify certificate: x509: certificate signed by unknown authority
```

It is most likely due to Argo CD using a self-signed certificate, if it is intended that your certificate is self-signed you can disable certificate verification by doing the following:

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
**WARNING:** By setting `gateway.argocd.insecure="true"` TLS certificate verification will no longer be performed between the gateway and the Argo CD instance ensure that it is necessary that you set this configuration to avoid potential security issues.
:::

#### No Certificate

If you are running your Argo CD instance without a certificate due to terminating SSL at a load balancer level the gateway will likely fail to connect with the following error:

```text
transport: authentication handshake failed: EOF
```

This is because the gateway is configured by default to require encrypted traffic, if it is intended that you don't have a certificate you can disable encryption between the gateway and Argo CD by doing the following:

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
**WARNING:** By setting `gateway.argocd.plaintext="true"` all traffic between the gateway and Argo CD will be unencrypted, ensure that it is necessary that you set this configuration to avoid potential security issues.
:::

## Deleting an Octopus Argo CD Gateway

When removing a gateway two operations are required:

1. Deregister the gateway from Octopus Server
2. Remove the application from your cluster

The Octopus UI allows you to perform both of these operations.

Navigate to Infrastructure --> Argo CD Instances, and select the instance whose gateway is to be removed.

From the overflow menu, select "Delete" which will display a confirmation dialog containing the Helm command which when
executed will remove the gateway from your cluster.
