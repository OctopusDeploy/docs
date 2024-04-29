---
layout: src/layouts/Default.astro
pubDate: 2024-04-29
modDate: 2024-04-29
title: Storage
description: How to configure storage for a Kubernetes agent
navOrder: 10
---

During a deployment, Octopus Server first sends any required scripts and packages to [Tentacle](https://octopus.com/docs/infrastructure/deployment-targets/tentacle) which writes them to the file system. The actual script execution then takes place in a different process called [Calamari](https://github.com/OctopusDeploy/Calamari), which retrieves the scripts and packages directly from the file system. 

On a Kubernetes agent, scripts are executed in separate Kubernetes pods (script pod) as opposed to in a local shell (Bash/Powershell). This means the Tentacle pod and script pods don’t automatically share a common file system.

Since the Kubernetes agent is built on the Tentacle codebase,  it is necessary to configure shared storage so that the Tentacle Pod can write the files in a place that the Script Pods can read from.

We offer two options for configuring the shared storage - you can use either the default NFS storage or specify a Storage Class name.


## NFS storage

By default, the Kubernetes agent Helm chart will set up an NFS server suitable for use by the agent inside your cluster. The server runs as a `StatefulSet` in the same namespace as the Kubernetes agent, and uses `EmptyDir` storage, as the working files of the agent are not required to be long-lived. 

This NFS server is referenced in the `StorageClass` that the Kubernetes agent and the script pod use. This `StorageClass` will then instruct the `NFS CSI Driver` to mount the server as directed.

This default implementation is made to let you try the Kubernetes agent without worrying about installing a `ReadWriteMany` compatible `StorageClass` yourself. There are  some drawbacks to this approach:

### Privileges
The NFS server requires `privileged` access when running as a container, which may not be permitted depending on the cluster configuration. Access to the NFS pod should be kept to a minimum since it enables access to the host. 

### Reliability
Since the NFS server runs inside your Kubernetes cluster, upgrades and other cluster operations can cause the NFS server to restart. Due to how NFS stores and allows access to shared data, script pods will not be able to recover cleanly from an NFS server restart. This causes running deployments to fail when the NFS server is restarted.

If you have a use case that can’t tolerate occasional deployment failures, it’s recommended to provide your own `StorageClass` instead of using the default NFS implementation.

## Custom StorageClass

If you need a more reliable storage solution, then you can specify your own `StorageClass`. This `StorageClass` must be capable of `ReadWriteMany` (also known as `RWX`) access mode. 

Many managed Kubernetes offerings will have offerings that require little effort to use. These will be a “provisioner” (named as such as they “provision” storage for a storage class), which you can then tie to a storage class. Some examples are listed below:

|**Offering**                      |**Provisioner**                    |**Default StorageClass name**       |
|----------------------------------|-----------------------------------|------------------------------------|
|[Azure Kubernetes Service (AKS)](https://learn.microsoft.com/en-us/azure/aks/concepts-storage)    |`file.csi.azure.com`               |`azurefile`                        |
|[Elastic Kubernetes Service (EKS)](https://docs.aws.amazon.com/eks/latest/userguide/storage.html)  |`efs.csi.aws.com`                  |`efs-sc`                            |
|[Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine/docs/concepts/storage-overview)    |`filestore.csi.storage.gke.io`     |`standard-rwx`                      |

If you manage your own cluster and don’t have offerings from cloud providers available, there are some in-cluster options you could explore:
- [Longhorn](https://longhorn.io/)
- [Rook (CephFS)](https://rook.io/)
- [GlusterFS](https://www.gluster.org/)
