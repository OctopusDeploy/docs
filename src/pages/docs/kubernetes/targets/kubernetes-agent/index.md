---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-07-31
title: Kubernetes agent
navTitle: Overview
navSection: Kubernetes agent
description: How to configure a Kubernetes agent as a deployment target in Octopus
navOrder: 10
---

Kubernetes agent targets are a mechanism for executing [Kubernetes steps](/docs/kubernetes/steps) from inside the target Kubernetes cluster, rather than via an external API connection.

Similar to the [Octopus Tentacle](/docs/infrastructure/deployment-targets/tentacle), the Kubernetes agent is a small, lightweight application that is installed into the target Kubernetes cluster.

## Benefits of the Kubernetes agent

The Kubernetes agent provides a number of improvements over the [Kubernetes API](/docs/kubernetes/targets/kubernetes-api) target:

### Polling communication

The agent uses the same [polling communication](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication#polling-tentacles) protocol as [Octopus Tentacle](/docs/infrastructure/deployment-targets/tentacle). It lets the agent initiate the connection from the cluster to Octopus Server, solving network access issues such as publicly addressable clusters.

### In-cluster authentication

As the agent is already running inside the target cluster, Octopus Server no longer needs authentication credentials to the cluster to perform deployments. It can use the in-cluster authentication support of Kubernetes to run deployments using Kubernetes Service Accounts and Kubernetes RBAC local to the cluster.

### Cluster-aware tooling

As the agent is running in the cluster, it can retrieve the cluster's version and correctly use tooling that's specific to that version. You also need a lot less tooling as there are no longer any requirements for custom authentication plugins. See the [agent tooling](#agent-tooling) section for more details.

## How the agent works

When you install the agent, several resources will be created within a cluster, all running in the same namespace. Please refer to the diagram below (some details such as ServiceAccounts have been omitted).

:::figure
![Kubernetes agent component diagram](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-diagram-components.png)
:::

- Certain resource names may vary based on the target name and any overrides.

- The NFS section to the right is created only when a user-defined storageClassName is not included.

- `tentacle-certificate` is only created if you provide your own certificate during installation.

- `octopus-server-certificate` is created when you provide the full chain cert for communicating back to the Octopus Server (e.g. if it is self-signed).

During a deployment, the agent generates temporary pods for each deployment task. These pods are not shown in the diagram above as they are not part of the installation process. Refer to the next diagram to understand how they are created and removed.

:::figure
![Kubernetes agent how it works diagram](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-diagram-how-it-works.png)
:::

1. Octopus Tentacle, which runs inside the `kubernetes-agent-tentacle` pod, maintains a connection to the Octopus Server.

2. Prior to task execution, various files and tools are transferred from the Octopus Server to a shared storage location. This location will later be accessible by the tasks themselves.

3. Octopus Tentacle creates a new pod to run each individual task, where all user-defined operations will take place.

4. The pod is created. Multiple pods can run simultaneously, to accommodate various tasks within the cluster.

5. The task accesses the shared storage and retrieves any required tools or scripts.

6. The task is executed, and the customer application resources are created.

7. While the task is running, the Octopus Tentacle Pod streams the task pod logs back to the Octopus Server.

Upon completion of the task, the pod will terminate itself.

## Requirements

The Kubernetes agent follows [semantic versioning](https://semver.org/), so a major agent version is locked to a Octopus Server version range. Updating to the latest major agent version requires updating to a supported Octopus Server. The supported versions for each agent major version are:

| Kubernetes agent | Octopus Server           | Kubernetes cluster   |
| ---------------- | ------------------------ | -------------------- |
| 1.\*.\*          | **2024.2.6580** or newer | **1.26** to **1.29** |

Additionally, the Kubernetes agent only supports **Linux AMD64** and **Linux ARM64** Kubernetes nodes.

## Installing the Kubernetes agent

The Kubernetes agent is installed using [Helm](https://helm.sh) via the [octopusdeploy/kubernetes-agent](https://hub.docker.com/r/octopusdeploy/kubernetes-agent) chart.

To simplify this, there is an installation wizard in Octopus to generate the required values.

:::div{.warning}
Helm will use your current kubectl config, so make sure your kubectl config is pointing to the correct cluster before executing the following helm commands.
You can see the current kubectl config by executing:
```bash
kubectl config view
```
:::

### Configuration

1. Navigate to **Infrastructure ➜ Deployment Targets**, and click **Add Deployment Target**.
2. Select **KUBERNETES** and click **ADD** on the Kubernetes Agent card.    
3. This launches the Add New Kubernetes Agent dialog

:::figure
![Kubernetes Agent Wizard Config Page](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-wizard-config.png)
:::

1. Enter a unique display name for the target. This name is used to generate the Kubernetes namespace, as well as the Helm release name
2. Select at least one [environment](/docs/infrastructure/environments) for the target.
3. Select at least one [target tag](/docs/infrastructure/deployment-targets/target-tags) for the target.
4. Optionally, add the name of an existing [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) for the agent to use. The storage class must support the ReadWriteMany [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes).  
If no storage class name is added, the default Network File System (NFS) storage will be used.

#### Advanced options

:::figure
![Kubernetes Agent default namespace](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-default-namespace.png)
:::

You can choose a default Kubernetes namespace that resources are deployed to. This is only used if the step configuration or Kubernetes manifests don’t specify a namespace.

### NFS CSI driver

If no [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) name is set, the default NFS storage pod will be used. This runs a small NFS pod next to the agent pod and provides shared storage to the agent and script pods.

A requirement of using the NFS pod is the installation of the [NFS CSI Driver](https://github.com/kubernetes-csi/csi-driver-nfs). This can be achieved by executing the presented helm command in a terminal connected to the target Kubernetes cluster.

:::figure
![Kubernetes Agent Wizard NFS CSI Page](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-wizard-nfs.png)
:::

:::div{.warning}
If you receive an error with the text `failed to download` or `no cached repo found` when attempting to install the NFS CSI driver via helm, try executing the following command and then retrying the install command:
```bash
helm repo update
```
:::

### Installation helm command

At the end of the wizard, Octopus generates a Helm command that you copy and paste into a terminal connected to the target cluster. After it's executed, Helm installs all the required resources and starts the agent.

:::figure
![Kubernetes Agent Wizard Helm command Page](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-wizard-helm-command.png)
:::

:::div{.hint}
The helm command includes a 1 hour bearer token that is used when the agent first initializes, to register itself with Octopus Server.
:::

:::div{.hint}
The terminal Kubernetes context must have enough permissions to create namespaces and install resources into that namespace. If you wish to install the agent into an existing namespace, remove the `--create-namespace` flag and change the value after `--namespace`
:::

If left open, the installation dialog waits for the agent to establish a connection and run a health check. Once successful, the Kubernetes agent target is ready for use!

:::figure
![Kubernetes Agent Wizard successful installation](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-wizard-success.png)
:::

:::div{.hint}
A successful health check indicates that deployments can successfully be executed.
:::

## Configuring the agent with Tenants

While the wizard doesn't support selecting Tenants or Tenant tags, the agent can be configured for tenanted deployments in two ways:

1. Use the Deployment Target settings UI at **Infrastructure ➜ Deployment Targets ➜ [DEPLOYMENT TARGET] ➜ Settings** to add a Tenant and set the Tenanted Deployment Participation as required. This is done after the agent has successfully installed and registered.

:::figure
![Kubernetes Agent ](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-settings-page-tenants.png)
:::

2. Set additional variables in the helm command to allow the agent to register itself with associated Tenants or Tenant tags. You also need to provider a value for the `TenantedDeploymentParticipation` value. Possible values are `Untenanted` (default), `Tenanted`, and `TenantedOrUntenanted`.

example to add these values:
```bash
--set agent.tenants="{<tenant1>,<tenant2>}" \
--set agent.tenantTags="{<tenantTag1>,<tenantTag2>}" \
--set agent.tenantedDeploymentParticipation="TenantedOrUntenanted" \
```

:::div{.hint}
You don't need to provide both Tenants and Tenant Tags, but you do need to provider the tenanted deployment participation value.
:::

In a full command:
```bash
helm upgrade --install --atomic \
--set agent.acceptEula="Y" \
--set agent.targetName="<name>" \
--set agent.serverUrl="<serverUrl>" \
--set agent.serverCommsAddress="<serverCommsAddress>" \
--set agent.space="Default" \
--set agent.targetEnvironments="{<env1>,<env2>}" \
--set agent.targetRoles="{<targetRole1>,<targetRole2>}" \
--set agent.tenants="{<tenant1>,<tenant2>}" \
--set agent.tenantTags="{<tenantTag1>,<tenantTag2>}" \
--set agent.tenantedDeploymentParticipation="TenantedOrUntenanted" \
--set agent.bearerToken="<bearerToken>" \
--version "1.*.*" \
--create-namespace --namespace <namespace> \
<release-name> \
oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```

## Trusting custom/internal Octopus Server certificates

:::div{.hint}
Server certificate support was added in Kubernetes agent 1.7.0
:::

It is common for organizations to have their Octopus Deploy server hosted in an environment where it has an SSL/TLS certificate that is not part of the global certificate trust chain. As a result, the Kubernetes agent will fail to register with the target server due to certificate errors. A typical error looks like this:

```
2024-06-21 04:12:01.4189 | ERROR | The following certificate errors were encountered when establishing the HTTPS connection to the server: RemoteCertificateNameMismatch, RemoteCertificateChainErrors
Certificate subject name: CN=octopus.corp.domain
Certificate thumbprint:   42983C1D517D597B74CDF23F054BBC106F4BB32F
```

To resolve this, you need to provide the Kubernetes agent with a base64-encoded string of the public key of the certificate in either `.pem` or `.crt` format. When viewed as text, this will look similar to this:

```
-----BEGIN CERTIFICATE-----
MII...
-----END CERTIFICATE-----
```

Once encoded, this string can be provided as part of the agent installation helm command via the `agent.serverCertificate` helm value.

To include this in the installation command, add the following to the generated installation command:

```bash
--set agent.serverCertificate="<base64-encoded-cert>"
```

## Agent tooling

By default, the agent will look for a [container image](/docs/projects/steps/execution-containers-for-workers) for the workload it's executing against the cluster. If one isn't specified, Octopus will execute the Kubernetes workload using the `octopusdeploy/kubernetes-agent-tools-base` container. It will correctly select the version of the image that's specific to the cluster's version. 

This image contains the minimum required tooling to run Kubernetes workloads for Octopus Deploy, namely:

- `kubectl`
- `helm`
- `powershell`

## Upgrading the Kubernetes agent

The Kubernetes agent can be upgraded automatically by Octopus Server, manually in the Octopus portal or via a `helm` command.

### Automatic updates

:::div{.hint}
Automatic updating was added in 2024.2.8584
:::

By default, the Kubernetes agent is automatically updated by Octopus Server when a new version is released. These version checks typically occur after a health check. When an update is required, Octopus will start a task to update the agent to the latest version.

This behavior is controlled by the [Machine Policy](/docs/infrastructure/deployment-targets/machine-policies) associated with the agent. You can change this behavior to **Manually** in the [Machine policy settings](/docs/infrastructure/deployment-targets/machine-policies#configure-machine-updates).

### Manual updating via Octopus portal

To check if a Kubernetes agent can be manually upgraded, navigate to the **Infrastructure ➜ Deployment Targets ➜ [DEPLOYMENT TARGET] ➜ Connectivity** page. If the agent can be upgraded, there will be an *Upgrade available* banner. Clicking **Upgrade to latest** button will trigger the upgrade via a new task. If the upgrade fails, the previous version of the agent is restored.

:::figure
![Kubernetes Agent updated interface](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-upgrade-portal.png)
:::

### Helm upgrade command

To upgrade a Kubernetes agent via `helm`, note the following fields from the **Infrastructure ➜ Deployment Targets ➜ [DEPLOYMENT TARGET] ➜ Connectivity** page:
* Helm Release Name
* Namespace

Then, from a terminal connected to the cluster containing the instance, execute the following command:

```bash
helm upgrade --atomic --namespace NAMESPACE HELM_RELEASE_NAME oci://registry-1.docker.io/octopusdeploy/kubernetes-agent
```
__Replace NAMESPACE and HELM_RELEASE_NAME with the values noted__

If after the upgrade command has executed, you find that there is issues with the agent, you can rollback to the previous helm release by executing:

```bash
helm rollback --namespace NAMESPACE HELM_RELEASE_NAME
```


## Uninstalling the Kubernetes agent

To fully remove the Kubernetes agent, you need to delete the agent from the Kubernetes cluster as well as delete the deployment target from Octopus Deploy

The deployment target deletion confirmation dialog will provide you with the commands to delete the agent from the cluster.Once these have been successfully executed, you can then click **Delete** and delete the deployment target.

:::figure
![Kubernetes Agent delete dialog](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-delete-dialog.png)
:::
