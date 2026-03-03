---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Supported Use Cases
description: Supported Argo CD Application configurations and constraints for use with Octopus
navTitle: Supported Use Cases
navSection: Resources
navOrder: 30
---
The Octopus and Argo CD integration supports a variety of application configurations. This page covers how each step behaves for different application shapes, and any constraints to be aware of.

## Constraints

- Octopus updates content in the repositories referenced by your application. It does not update pinned `TargetRevisions` in your `Application.yaml`.
  - If your application specifies a constant `TargetRevision`, Octopus treats it as a branch and will fail to push back to your repository.
- Helm sources that directly reference a chart from a Helm repository or OCI feed are read-only and can't be updated by Octopus.
  - If your application is represented as a Helm chart *in a directory*, Octopus can update the directory content in the application's repository.
- Pull requests can be created for GitHub, GitLab, and Azure DevOps hosted repositories (e.g. *.github.com, *.gitlab.com).
  - At this time, only vendor-hosted repositories of these providers are available (eg .github.com//, .gitlab.com//).
  - Please [let us know](https://oc.to/roadmap-argo-cd) which other providers you would like to see supported.
- Multiple source applications require Argo CD 2.14.0 or above (corresponding to the introduction of named sources in Argo CD).
  - Single source applications are supported in all versions of Argo CD.

## Update Argo CD Application Image Tags

The Update Argo CD Application Image Tags step's behavior changes based on the content of the application's repository:

| Repository Content | Behavior                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yaml Manifests     | Will recursively update image-tag fields in k8s resource files                                                                                            |
| Kustomize          | Will replace image tag values in the `kustomization.yaml` or `kustomization.yml` file                                                                     |
| Helm Chart         | Will update image-tag fields specified in the `values.yaml` or `values.yml` file, requires [helm-annotations](/docs/argo-cd/annotations/helm-annotations) |

## Update Argo CD Application Manifests

The Update Argo CD Application Manifests step's behavior is agnostic of the application source repository content.
Regardless of the content of the source repository, the step is responsible for writing the populated templates to the path specified in the Argo CD application source.
