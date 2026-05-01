---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2026-05-01
title: Storage
description: How to configure storage for a Kubernetes agent
navOrder: 30
---

:::div{.info}
The following is applicable to both Kubernetes Agent and Kubernetes Worker.
:::

During a deployment, Octopus Server first sends any required scripts and packages to [Tentacle](https://octopus.com/docs/infrastructure/deployment-targets/tentacle) which writes them to the file system. The actual script execution then takes place in a different process called [Calamari](https://github.com/OctopusDeploy/Calamari), which retrieves the scripts and packages directly from the file system.

On a Kubernetes agent (or worker), scripts are executed in separate Kubernetes pods (script pod) as opposed to in a local shell (Bash/PowerShell). This means the Tentacle pod and script pods don’t automatically share a common file system.

Since the Kubernetes agent/worker is built on the Tentacle codebase,  it is necessary to configure shared storage so that the Tentacle Pod can write the files in a place that the script pods can read from.

We offer two options for configuring the shared storage - you can use either the default ReadWriteOnce cluster default storage or specify a Storage Class name during setup:

:::figure
![Kubernetes Agent Wizard Config Page](/docs/img/infrastructure/deployment-targets/kubernetes/kubernetes-agent/kubernetes-agent-wizard-config.png)
:::

## Cluster default ReadWriteOnce

:::div{.info}
This is a new default in v3 of the Kubernetes agent
:::

By default, the Kubernetes agent will request the default storage class of the cluster and specify the `ReadWriteOnce` (also known as `RWO`) access mode. As each script pod needs access to the shared storage, this causes the script pods to be scheduled onto the same node as the main tentacle pod.

As a result, by default, the Kubernetes agent does not spread its work across multiple nodes, but performs all work on the same node.

This change was made from v2 due to reliability and security concerns with the previously default NFS storage.

## Custom StorageClass \{#custom-storage-class}

If distribution of script pods across multiple nodes is desired, then you can specify your own `StorageClass`. This `StorageClass` must be capable of `ReadWriteMany` (also known as `RWX`) access mode. 

Many managed Kubernetes offerings will provide storage that require little effort to set up. These will be a “provisioner” (named as such as they “provision” storage for a `StorageClass`), which you can then tie to a `StorageClass`. Some examples are listed below:

| **Offering**                                                                                                | **Provisioner**                | **Default StorageClass name** |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------------------------- |
| [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/concepts-storage)              | `file.csi.azure.com`           | `azurefile`                   |
| [Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/storage.html)           | `efs.csi.aws.com`              | `efs-sc`                      |
| [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs/concepts/storage-overview) | `filestore.csi.storage.gke.io` | `standard-rwx`                |

:::div{.info}
See this [blog post](https://octopus.com/blog/efs-eks) for a tutorial on connecting EFS to and EKS cluster.
:::

If you manage your own cluster and don’t have offerings from cloud providers available, there are some in-cluster options you could explore:
- [Longhorn](https://longhorn.io/)
- [Rook (CephFS)](https://rook.io/)
- [GlusterFS](https://www.gluster.org/)

## Azure Files CSI driver

It is highly recommended that when specifying a custom storage class that leverages [Azure Files CSI driver](https://learn.microsoft.com/en-us/azure/aks/create-volume-azure-files), that the backing storage account be provision with the `PremiumV2_LRS` or `PremiumV2_ZRS` SKU (`skuname`). This will improve deployment performance due to the high performance profile and low-latency SSD's.