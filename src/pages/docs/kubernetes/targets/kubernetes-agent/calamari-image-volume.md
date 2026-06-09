---
layout: src/layouts/Default.astro
pubDate: 2026-06-05
modDate: 2026-06-05
title: Calamari Image Volume
description: How the Kubernetes agent uses Kubernetes Image Volumes to provide Calamari to script pods
navOrder: 35
---

Calamari is the command-line tool invoked by the Kubernetes agent during deployments. Currently Octopus Server, at the start of the deployment, verifies that the correct version of Calamari is present on the shared storage volume.

When a new version of Calamari is required, this is packaged by Octopus Server, sent to the agent, and then unpacked into the shared volume. Then, during deployment, Calamari is executed from the shared filesystem.

When the Calamari Image Volume feature is enabled, the agent instead mounts Calamari as a read-only [Kubernetes Image Volume](https://kubernetes.io/docs/concepts/storage/volumes/#image) directly into each script pod.

## Benefits

- **Eliminates the Calamari transfer step**: When Octopus Server ships a new version of Calamari, there is no longer a bundle transfer and unpack step. The cluster pulls the updated image through its normal container image pull mechanism.
- **Node-level caching**: The Calamari image is cached at the node level by the container runtime, consistent with how all other container images are managed.
- **Increased performance**: As Calamari is no longer being executed from the shared storage, performance is improved.
- **Reduced persistent storage**: Calamari is no longer stored on the shared persistent volume. Only workspace data and user packages remain on shared storage.

## Requirements

- **Kubernetes**: 1.35 or later. Image Volumes require the `ImageVolume` feature gate, which is enabled by default from Kubernetes 1.35 (Beta) and is GA from 1.36. Clusters running an older version will fall back to the existing transfer-and-unpack mechanism automatically and log a warning.
- **Kubernetes agent**: v3.5.0
- **Octopus Server**: 2026.3.892 or later

## Enabling the feature

Calamari Image Volume is opt-in. To enable it, set the following value in the Helm chart:

```yaml
scriptPods:
  calamariImageVolume:
    enabled: true
```

Or as a `--set` flag in your Helm command:

```bash
--set scriptPods.calamariImageVolume.enabled=true
```

## Using a private registry

By default, the Calamari image is pulled from the `octopusdeploy` repository on Docker Hub. If your cluster cannot access Docker Hub directly, you must mirror the Calamari image to your own registry and update the repository value accordingly:

```yaml
scriptPods:
  calamariImageVolume:
    enabled: true
    image:
      repository: "your-registry.example.com/octopusdeploy"
      pullPolicy: IfNotPresent
```

:::div{.warning}
When using a private registry, you are responsible for keeping the mirrored Calamari image up to date as new versions are released.
:::

### Changing the repository

The structure of the Calamari image name is `octopusdeploy/{CalamariTool}:{Version}` where the `{CalamariTool}` and `{Version}` are dictated and provided by Octopus Server during deployment execution.

This means that the `scriptPods.calamariImageVolume.image.repository` should *not* include the `{CalamariTool}` and `{Version}` part of image name.

For example, if your mirrored Calamari image names are like `your-registry.example.com/octopusdeploy/{CalamariTool}`, then the `scriptPods.calamariImageVolume.image.repository` should be `your-registry.example.com/octopusdeploy`.

## Fallback behavior

If Calamari Image Volume is enabled but the cluster is running Kubernetes 1.34 or earlier, the agent will log a warning and fall back to the existing Octopus Server delivery mechanism.

## Images

#### Source code

[GitHub](https://github.com/OctopusDeploy/Calamari)

### octopusdeploy/calamari

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari)

### octopusdeploy/calamari.azureappservice

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari.azureappservice)

### octopusdeploy/calamari.azureresourcegroup

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari.azureresourcegroup)

### octopusdeploy/calamari.azurescripting

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari.azurescripting)

### octopusdeploy/calamari.googlecloudscripting

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari.googlecloudscripting)

### octopusdeploy/calamari.terraform

#### Default registry

[Docker Hub](https://hub.docker.com/r/octopusdeploy/calamari.terraform)
