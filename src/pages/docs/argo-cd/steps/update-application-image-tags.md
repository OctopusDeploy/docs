---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2026-03-11
title: Update Argo CD Application Image Tags
description: Deployment steps to modify your Argo CD Applications
navOrder: 30
---

The Update Argo CD Application Image Tags step is responsible for iterating over your Argo CD Application's repository, and
updating the image tag for referenced container images.

:::div{.info}
When deploying a Helm Chart with multiple values files, specific annotations must be added to your Argo CD Application to
ensure the correct sections of the relevant values files are updated. See [Helm Annotations](/docs/argo-cd/annotations/helm-annotations) for
more information.
:::

## Container Images

Add package references for each container image you would like to update when you run your deployment. Unreferenced container images in your manifests will not be changed by Octopus.

When targeting a Helm-based application source, each referenced container image should have a populated **Helm image tag path** field. This is the YAML path to the specific field in your values file that contains the tag of the referenced container image (for example, `agent.image.tag`). This can be set in the **Reference a package** drawer when adding or editing a package reference. This is not required for directory or Kustomize sources.

:::figure
![The Helm image tag path field in the Reference a package drawer](/docs/img/argo-cd/update-application-image-tags-helm-values-tag.png)
:::

If the application cluster's default registry has been changed, see [cluster annotations](/docs/argo-cd/annotations/cluster-annotations) to ensure
the correct default registry is shared with Octopus.

:::div{.info}
These packages can then be used in an [external feed trigger](/docs/projects/project-triggers/external-feed-triggers), such that your cluster is automatically updated when new image versions become available.
:::

## Creating and Deploying a Release

:::div{.info}
The step will fail to execute if no git credentials exist for repositories referenced by your Argo CD Applications.
As such, prior to execution, it is recommended to use the [Argo CD Applications View](/docs/argo-cd/steps/argo-cd-applications-view) to ensure
no outstanding configuration is required.
:::

When a release of the project is created, a snapshot of the versions of container images referenced in the step is taken.

For each application with relevant scoping annotations found during a deployment, Octopus will checkout each repository using git credentials determined based on [repository restrictions](/docs/infrastructure/git-credentials#repository-restrictions).

### How Octopus updates image tags varies for each source type

For Kubernetes YAML:

- Octopus searches for Kubernetes resources which are known to reference images (CRDs are not included)
- If a resource references an image configured as a referenced container image, the image tag is updated to match that in the release

For Helm charts:

- Image fields are extracted from the [Helm Annotations](/docs/argo-cd/annotations/helm-annotations)
- Matching image tags in the `values.yaml` are replaced with container image versions from the release
  
For Kustomize applications (i.e. supplied path contains  `kustomization.yaml`, `kustomization.yml` or `Kustomization`):

- Octopus will *only* update the `newTag` field(s) found in the Kustomize file. No other files will be edited.
  
Finally, changed files are committed and pushed back to the repo/branch specified by the Argo CD Application
  
A PR will be created (rather than merging to the `targetRevision` branch) if configured in the step UI.
