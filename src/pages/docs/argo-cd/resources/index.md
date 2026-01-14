---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Supported Use Cases
description: Octopus Deploy can help you manage your Argo CD applications navigate lifecycle promotion
navTitle: Supported Use Cases
navSection: Resources
navOrder: 30
---
Initially setting up Octopus to interact with your Argo CD instance(s) can be complex, and the best way to accomplish
your desired outcomes may not be immediately obvious.

The following explores how best to use Octopus for various Argo CD Application shapes.

## Global Constraints

There are a number of use cases which Octopus *cannot* support due to data access.

- Octopus will not update "pinned" `TargetRevisions` in your `Application.yaml` - Octopus will *only* update content in the repositories referenced by your application
  - If your application specifies a constant `TargetRevision`, Octopus will treat it as a branch - and fail to push back to your repository.
- Octopus cannot update the content of Helm Sources which directly reference a chart from a Helm Repository or OCI feed  - these are effectively static content.
  - However, if your application is represented as a Helm Chart *in a directory*, Octopus can update the directory content in the applications repository.
- Octopus can create Pull Requests for GitHub, GitLab and Azure Devops based repositories.
  - At this time, only vendor-hosted repositories of these providers are available (eg *.github.com/*/*, *.gitlab.com/*/*).
  - Please [let us know](https://oc.to/roadmap-argo-cd) which other providers you would like to see supported.
- Octopus requires Argo CD version of 2.14.0 or above to support applications with multiple sources (corresponding to the introduction of named sources in Argo CD)
  - Applications with a single source can be updated in all versions of Argo CD.

## Update Argo Image Tags

The Update Argo Image Tags step's behavior changes based on the content of the application's repository:

Repository Content                 | Behavior                                                                                                                                                  |
-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
Yaml Manifests                     | Will recursively update image-tag fields in k8s resource files                                                                                            |
Kustomize                          | Will replace image tag values in the `kustomization.yaml` or `kustomization.yml` file                                                                     |
Helm Chart                         | Will update image-tag fields specified in the `values.yaml` or `values.yml` file, requires [helm-annotations](/docs/argo-cd/annotations/helm-annotations) |

## Update Argo Manifest Step

The Update Argo Manifest step's behavior is agnostic of the application source repository content.
Regardless of the content of the source repository, the step is responsible for writing the populated templates to the path specified in the Argo CD application source.
