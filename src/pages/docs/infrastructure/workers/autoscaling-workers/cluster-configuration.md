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

There's three factors which affect the effort the likelihood of success:
1. Kubernetes distribution (eg AKS, EKS, GKE ...)
2. Storage provider type (i.e. the filesystem shared between worker and pods)
3. The Operating System of the Kubernetes nodes

When trying to determine the best combination of these for your situation, it may be simplest to start small and iterate.

| Distribution  | Storage Solution: | Approach                                               |
|:-------------:|:-----------------:|--------------------------------------------------------|
|      AKS      |        NFS        | No additional configuration required                   |
|               |    Azure Files    | No additional configuration required                   |
|      GKE      |        NFS        | No additional configuration required                   |
|      EKS      |        NFS        | No additional configuration required                   |
|               |        EFS        | Requires Octopus Server 2024.3+                        |
|     RKE2      |     Longhorn      | Requires pre-configured storage - email [support@octopus.com](mailto:support@octopus.com) |
|   OpenShift   |        NFS        | Requires specific configuration - email [support@octopus.com](mailto:support@octopus.com) |

While the above defines extensively tested configurations, there are many other configurations which are likely to 
produce a valid system.
Any Storage class which support being mounted in [ReadWriteMany](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
mode is likely to satisfy the Kubernetes worker's storage requirements.

The Kubernetes worker is compatible with most Ubuntu-based nodes and also those running Amazon Linux.

:::div{.warning}
The NFS Storage solution cannot be used with [BottleRocket](https://aws.amazon.com/bottlerocket/?amazon-bottlerocket-whats-new.sort-by=item.additionalFields.postDateTime&amazon-bottlerocket-whats-new.sort-order=desc) nodes
as [selinux](https://github.blog/developer-skills/programming-languages-and-frameworks/introduction-to-selinux/)  enforcement prevents NFS container execution.

The Kubernetes worker is not compatible with Windows nodes, and currently unable to create script-pods based on Windows images.
:::

## First Steps
There are a variety of Kubernetes implementations which can be used locally, as you start out with the Kubernetes worker.
The following distributions were used extensively during our development, and work well for exploratory testing: 
* [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Farm64%2Fstable%2Fbinary+download)
* [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
* [MicroK8s](https://microk8s.io/)

These have all bee proven to work well with the default NFS storage solution, so no advanced setup is required.

Such a setup is unsuitable for production deployments, but will get a Kubernetes worker running quickly so you can
see how it works, and determine how you may make the most of it.

## And Onwards
The Kubernetes worker installs and works with the cloud-based Kubernetes services offered by Azure (AKS), Aws (EKS) and Google (GKE).
The NFS storage solution works well in these environments, though other storage solutions become available eg [Azure Files](https://learn.microsoft.com/en-us/azure/aks/azure-csi-files-storage-provision)
which may offers greater durability by moving storage out of the cluster.