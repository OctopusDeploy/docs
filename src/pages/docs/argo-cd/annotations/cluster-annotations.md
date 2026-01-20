---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Cluster Annotations
description: Cluster annotations to support operations
navTitle: Cluster Annotations
hideInThisSectionHeader: true
---

By default, a Kubernetes cluster will use `docker.io` as the image registry when none is defined. This means that if an image is defined without the registry, for example `nginx/nginx:latest`, then this image will be resolved from the `docker.io` registry.

This default registry can be changed via the [kubeadm init --image-repository](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/) command & flag. When executing the [Update Argo CD Image Tags](/docs/argo-cd/steps/update-application-image-tags) step, Octopus will exactly match the specified image using the registry and name.

If the default cluster version has been changed, then Octopus needs to be made aware so that it correctly matches images.

:::div{.info}
If the cluster default registry has not been changed, then you do not need to do the following steps.
:::

## Setting the default container registry annotation

To make Octopus aware of a clusters default registry, an annotation needs to be added to each cluster object in Argo CD instance.

The annotation and value is:

```yaml
argo.octopus.com/default-container-registry : <registry hostname>
```

For example:

```yaml
argo.octopus.com/default-container-registry : my-company-registry.com
```

This should be added via the Argo CD web UI by selecting from the menu Settings --> Clusters, then editing the annotations
field on the cluster of interest.

![Default Registry Cluster Annotation](/docs/img/argo-cd/default-registry-annotation.png)
