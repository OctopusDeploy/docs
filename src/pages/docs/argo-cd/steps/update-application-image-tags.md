---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Update Argo CD Application Image Tags
description: Deployment steps to modify your Argo CD Applications
navOrder: 30
---

The Update Argo CD Application Image Tags step is responsible for iterating over your Argo Application's repository, and
updating the image tag for referenced container images.

The following instructions can be followed to configure the `Update Argo CD Image Tags`.

:::div{.info}
When deploying a Helm Chart with multiple values files, specific annotations must be added to your Argo CD Application to
ensure the correct sections of the relevant values files are updated. See [Helm Annotations](/docs/argo-cd/annotations/helm-annotations) for
more information.
:::

## Add the Update Argo CD Application Image Tags step
Add the `Update Argo CD Image Tags` step to the project, and provide it a name.

## Provide the required configuration

1. Specify an execution location

This step will execute on a worker of your choosing - if required it can run within a container on the worker, though this should not be necessary.

### Inputs

1. Specify the Container Images which are to be updated  in your Argo Application.
`Note`: These packages can then be used in an [external feed trigger](/docs/projects/project-triggers/external-feed-triggers), such that your cluster is automatically updated when new image versions become available.


### Outputs
The output section allows you to configure how changes are to be merged into your repository.

1. Deployment Preview is an aid to help determine which instances, and which applications are going to be updated when executing this step
   * More information can be found [here](/docs/argo-cd/steps/deployment-preview)
2. Commit message allows you to specify the summary, and description of the change. The description will be automatically populated if left empty.
   * The content here will be reused for Pull Request messages if you have selected for the change to merge via Pull Request
3. Git Commit Method specifies _how_ changes are merged - merging directly into the repo, or going via a PR.
   * A third option exists whereby you can specify which environments should use Pull Requests, with all others falling back to a direct commit
   * This is useful if your Production environment requires PRs, but early environments do not.
:::div{.warning}
Currently, Pull Requests can only be created for GitHub-based repositories. Please [let us know](https://oc.to/roadmap-argo-cd) which other providers you would like to see supported.
:::

## Creating and Deploying a Release
:::div{.info}
The step will fail to execute if no git credentials exist for repositories references by your Argo CD Applications.
As such, prior to execution, it is recommended to use the [Deployment Preview](/docs/argo-cd/steps/deployment-preview) to ensure
no outstanding configuration is required.
:::

When a release of the project is created, the versions of packages referenced in the step's input are snapshotted as part of the
release.

When deploying the release, Octopus will:
* For each annotation-mapped application (all apps with relevant scoping annotations)
  * Checkout each repository using git credentials determined via [Git AllowListing](/docs/infrastructure/git-credentials#repository-restrictions)
  * If the source is kubernetes raw yaml
    * Search k8s resources which are known to reference images (does not look into other CRDs)
    * If a resource references an image from the set configured in the step's inputs - the image tag is updated to match that in the release
  * If the source is a helm chart
    * The image fields are extracted from the [Helm Annotations](/docs/argo-cd/annotations/helm-annotations)
    * The matching image-tags in the `values.yaml` are replaced with container image versions configured in the step's inputs.
  * If the source is a kustomize based install (i.e. supplied path contains  `kustomization.yaml`, `kustomization.yml` or `Kustomization`)
    * Octopus will _only_ update the `newTag` field(s) found in the kustomize file. No other files will be edited
  * Changed files are committed, and pushed back to the repo/branch as specified in the Argo CD Application
    * A PR will be created (rather than merging to the targetRevision branch) if configured in the step UI 