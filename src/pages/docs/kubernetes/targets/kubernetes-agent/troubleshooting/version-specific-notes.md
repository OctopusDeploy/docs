---
layout: src/layouts/Default.astro
pubDate: 2026-04-30
modDate: 2026-05-01
title: Version specific notes
description: Contains a list of version specific notes
navOrder: 72
---

As the capabilities of the Kubernetes agent evolve and change, this page will document major version specific functionality that is different from the current major version.

## Version 2

### NFS storage

By default, the Kubernetes agent Helm chart will set up an NFS server suitable for use by the agent inside your cluster. The server runs as a `StatefulSet` in the same namespace as the Kubernetes agent, and uses `EmptyDir` storage, as the working files of the agent are not required to be long-lived.

This NFS server is referenced in the `StorageClass` that the Kubernetes agent and the script pod use. This `StorageClass` will then instruct the `NFS CSI Driver` to mount the server as directed.

This default implementation is made to let you try the Kubernetes agent without worrying about installing a `ReadWriteMany` compatible `StorageClass` yourself. There are  some drawbacks to this approach:

#### Privileges

The NFS server requires `privileged` access when running as a container, which may not be permitted depending on the cluster configuration. Access to the NFS pod should be kept to a minimum since it enables access to the host.

:::div{.warning}
Red Hat OpenShift does not enable `privileged` access by default. When enabled, we have also encountered inconsistent file access issues using the NFS storage. We highly recommend the use of a [custom storage class](/docs/infrastructure/deployment-targets/kubernetes/kubernetes-agent/storage#custom-storage-class) when using Red Hat OpenShift.
:::

#### Reliability

Since the NFS server runs inside your Kubernetes cluster, upgrades and other cluster operations can cause the NFS server to restart. Due to how NFS stores and allows access to shared data, script pods will not be able to recover cleanly from an NFS server restart. This causes running deployments to fail when the NFS server is restarted.

If you have a use case that can’t tolerate occasional deployment failures, it’s recommended to provide your own `StorageClass` instead of using the default NFS implementation.

#### NFS CSI driver

:::div{.hint}
With the release of V3 of the agent, this is no longer required in the default installation. However, if you want to continue using the NFS storage with the v3 agent, you will need to install the NFS CSI driver.
:::

If no [Storage Class](https://kubernetes.io/docs/concepts/storage/storage-classes/) name is set, the default NFS storage pod will be used. This runs a small NFS pod next to the agent pod and provides shared storage to the agent and script pods.

A requirement of using the NFS pod is the installation of the [NFS CSI Driver](https://github.com/kubernetes-csi/csi-driver-nfs). This can be achieved by executing the following helm command in a terminal connected to the target Kubernetes cluster.

```bash
helm upgrade --install --atomic --repo https://raw.githubusercontent.com/kubernetes-csi/csi-driver-nfs/master/charts --namespace kube-system --version "v4.*.*" csi-driver-nfs csi-driver-nfs
```

:::div{.warning}
If you receive an error with the text `failed to download` or `no cached repo found` when attempting to install the NFS CSI driver via helm, try executing the following command and then retrying the install command:
```bash
helm repo update
```

:::

#### NFS Server Pod Permissions

If you have not provided a predefined storageClassName for persistence, an NFS pod will be used. This NFS Server pod requires `privileged` access.

#### Migrating from NFS storage to a custom StorageClass

If you installed the Kubernetes agent using the default NFS storage, and want to change to a custom `StorageClass` instead, simply rerun the installation Helm command with specified values for `persistence.storageClassName`.

The following steps assume your Kubernetes agent is in the `octopus-agent-nfs-to-pv` namespace:

##### Step 1: Find your Helm release {#KubernetesAgentStorage-Step1-FindYourHelmRelease}

Take note of the current Helm release name and Chart version for your Kubernetes agent by running the following command:
```bash
helm list --namespace octopus-agent-nfs-to-pv
```

The output should look like this:
:::figure
![Helm list command](/docs/img/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-helm-list.png)
:::

In this example, the release name is `nfs-to-pv` while the chart version is `1.0.1`.
   
##### Step 2: Change Persistence {#KubernetesAgentStorage-Step2-ChangePersistence}

Run the following command (substitute the placeholders with your own values):
```bash
helm upgrade --reuse-values --atomic --set persistence.storageClassName="<storage class>" --namespace <namespace> --version "<chart version>" <release name> oci://registry-1.docker.io/octopusdeploy/kubernetes-agent`
```
   
Here is an example to convert the `nfs-to-pv` Helm release in the `octopus-agent-nfs-to-pv` namespace to use the `octopus-agent-nfs-migration` `StorageClass`:
```bash
helm upgrade --reuse-values --atomic --set persistence.storageClassName="octopus-agent-nfs-migration" --namespace octopus-agent-nfs-to-pv --version "1.0.1" nfs-to-pv oci://registry-1.docker.io/octopusdeploy/kubernetes-agent`
```

:::div{.warning}
If you are using an existing `PersistentVolume` via its `StorageClassName`, then you must set the `persistence.size` value in the Helm command to match the capacity of the `PersistentVolume` for the `PersistentVolume` to bind.
:::

