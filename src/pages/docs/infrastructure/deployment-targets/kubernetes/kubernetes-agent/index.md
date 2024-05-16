---
layout: src/layouts/Default.astro
pubDate: 2024-04-22
modDate: 2024-05-15
title: Kubernetes agent
navTitle: Overview
navSection: Kubernetes agent
description: How to configure a Kubernetes agent as a deployment target in Octopus
navOrder: 10
---

Kubernetes agent targets are a mechanism for executing [Kubernetes steps](/docs/deployments/kubernetes) from inside the target Kubernetes cluster, rather than via an external API connection.

Similar to the [Octopus Tentacle](/docs/infrastructure/deployment-targets/tentacle), the Kubernetes agent is a small, lightweight application that is installed into the target Kubernetes cluster.

## Benefits of the Kubernetes agent

The Kubernetes agent provides a number of improvements over the [Kubernetes API](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-api) target:

### Polling communication

The agent uses the same [polling communication](/docs/infrastructure/deployment-targets/tentacle/tentacle-communication#polling-tentacles) protocol as [Octopus Tentacle](/docs/infrastructure/deployment-targets/tentacle). It lets the agent initiate the connection from the cluster to Octopus Server, solving network access issues such as publicly addressable clusters..

### In-cluster authentication

As the agent is already running inside the target cluster, Octopus Server no longer needs authentication credentials to the cluster to perform deployments. It can use the in-cluster authentication support of Kubernetes to run deployments using Kubernetes Service Accounts and Kubernetes RBAC local to the cluster.

### Cluster-aware tooling

As the agent is running in the cluster, it can retrieve the cluster's version and correctly use tooling that's specific to that version. You also need a lot less tooling as there are no longer any requirements for custom authentication plugins.

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
3. Select at least one [target tag](/docs/infrastructure/deployment-targets/#target-roles) for the target.
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

## Upgrading the Kubernetes agent

The Kubernetes agent can be upgraded automatically by Octopus Server, manually in the the Octopus portal or via a `helm` command.

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