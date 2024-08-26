---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Cluster Configuration
description: Cluster Configurations
navOrder: 20
---

The Kubernetes worker has been proven to be effective on a variety of installations.
But some configurations are more complex than others!

There's three factors which affect the likelihood of success:
1. Kubernetes distribution/Manged Service (eg AKS, EKS, GKE ...)
2. Storage provider type (i.e. the filesystem shared between worker and pods)
3. The Operating System of the Kubernetes nodes

When trying to determine the best combination of these for your situation, it may be simplest to start small and iterate.

The following table defines known good configurations, though there are many other configurations which are likely to
produce a valid system.

| Distribution / Managed Servicer | Storage Solution: | Approach                                                                                  |
|:-------------------------------:|:-----------------:|-------------------------------------------------------------------------------------------|
|            Minikube             | NFS | No additional configuration required - recommended for local or edge usage                |
|            MicroK8s             | NFS | No additional configuration required - recommended for local or edge usage                             |
|              Kind               | NFS | No additional configuration required - recommended for local or edge usage                             |
|               AKS               |        NFS        | No additional configuration required                                                      |
|                                 |    Azure Files    | No additional configuration required                                                      |
|               GKE               |        NFS        | No additional configuration required                                                      |
|               EKS               |        NFS        | No additional configuration required                                                      |
|                                 |        EFS        | Requires Octopus Server 2024.3+                                                           |
|              RKE2               |     Longhorn      | Requires pre-configured storage - email [support@octopus.com](mailto:support@octopus.com) |
|            OpenShift            |        NFS        | Requires specific configuration - email [support@octopus.com](mailto:support@octopus.com) |


Any Storage class which supports being mounted in [ReadWriteMany](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
mode is likely to satisfy the Kubernetes worker's storage requirements.

The Kubernetes worker is compatible with most Ubuntu-based nodes and also those running Amazon Linux.

:::div{.warning}
The NFS Storage solution cannot be used with [BottleRocket](https://aws.amazon.com/bottlerocket/?amazon-bottlerocket-whats-new.sort-by=item.additionalFields.postDateTime&amazon-bottlerocket-whats-new.sort-order=desc) nodes
as [selinux](https://github.blog/developer-skills/programming-languages-and-frameworks/introduction-to-selinux/)  enforcement prevents NFS container execution.

The Kubernetes worker is not compatible with Windows nodes, and currently unable to create script-pods based on Windows images.
:::

## Local development and Proof Of Concept
There are a variety of Kubernetes distributions which can be used locally to support exploratory testing.
The following distributions were used extensively during the Kubernetes worker development: 
* [Minikube](https://minikube.sigs.k8s.io/docs/start)
* [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
* [MicroK8s](https://microk8s.io/)

These have all been proven to work well with the default NFS storage solution and require no advanced setup.

Such a setup is unsuitable for production deployments, but will get a Kubernetes worker running quickly so you can
see how it works, and determine how you may make the most of it.

## Production Systems
The Kubernetes worker installs and works with the cloud-based Kubernetes services offered by Azure (AKS), Aws (EKS) and Google (GKE).
The NFS storage solution works well in these environments, though other storage solutions become available eg [Azure Files](https://learn.microsoft.com/en-us/azure/aks/azure-csi-files-storage-provision)
which may offers greater durability by moving storage out of the cluster.