---
layout: src/layouts/Default.astro
pubDate: 2026-04-30
modDate: 2026-04-30
title: Version specific notes
description: Contains a list of version specific notes
navOrder: 72
---

## Version 2

### NFS CSI driver

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
