---
layout: src/layouts/Default.astro
pubDate: 2024-08-22
modDate: 2024-08-22
title: Cluster Configuration
description: Cluster Configurations
navOrder: 30
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

| Distribution / Managed Servicer | Storage Solution: | Approach                                     |
|:-------------------------------:|:-----------------:|----------------------------------------------|
|            Minikube             | NFS | No additional configuration required&dagger; |
|            MicroK8s             | NFS | No additional configuration required&dagger; |
|              Kind               | NFS | No additional configuration required&dagger; |
|               AKS               |        NFS        | No additional configuration required         |
|                                 |    Azure Files    | No additional configuration required         |
|               GKE               |        NFS        | No additional configuration required         |
|               EKS               |        NFS        | No additional configuration required         |
|                                 |        EFS        | Requires Octopus Server 2024.3+              |
|              RKE2               |     Longhorn      | Requires pre-configured storage&Dagger;      |
|            OpenShift            |        NFS        | Requires specific configuration&Dagger;      |

_&dagger; Recommended for local development or edge usage_  
_&Dagger; Please [contact support](https://octopus.com/support) for additional information_ 


Any Storage class which supports being mounted in [ReadWriteMany](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
mode is likely to satisfy the Kubernetes worker's storage requirements.

The Kubernetes worker is compatible with most Ubuntu-based nodes and also those running Amazon Linux.

:::div{.warning}
The NFS Storage solution cannot be used with [BottleRocket](https://aws.amazon.com/bottlerocket/?amazon-bottlerocket-whats-new.sort-by=item.additionalFields.postDateTime&amazon-bottlerocket-whats-new.sort-order=desc) nodes
as [a current issue with SELinux enforcement](https://github.com/bottlerocket-os/bottlerocket/issues/4116) prevents execution from the NFS share.

The Kubernetes worker is not compatible with Windows nodes, and currently unable to create script-pods based on Windows images.
:::