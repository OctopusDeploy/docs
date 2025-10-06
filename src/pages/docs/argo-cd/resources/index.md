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
your desired outcomes may not be immediate obvious.

The following explores how best to use Octopus for various Argo CD Application shapes.

## Global Constraints
There are a number of use cases which Octopus _cannot_ support due to data access.

* Octopus will not update "pinned" `TargetRevisions` in your `Application.yaml` - Octopus will _only_ update content in the repositories referenced by your application
    * If your application specifies a constant `TargetRevision`, Octopus will treat it as a branch - and fail to push back to your repository.
* Octopus cannot update the content of Helm Sources as they typically references a chart from a Helm Repository or OCI feed which is static content.
    * However, if your application is represented as a helm chart _in a directory_, Octopus can interact with the directory content via the applications repository
* Octopus can create PRs for github based repositories only - support for other platforms is coming in later builds.


## Update Argo Manifest Step
| Argo Source Type | Repository Content | Behavior                                                                                  |
|------------------|--------------------|-------------------------------------------------------------------------------------------|
| Directory        | Kubernetes Yaml    | &#x2705; Will successfully inject Octopus variables to the yaml                           |
| Directory        | Kubernetes Yaml    | &#x2705; Will successfully inject Octopus variables to the yaml                           |
| Directory        | Helm Chart         | &#x2705; Will successfully inject variables to any file in the repository's path          |
 | Directory | Kustomize |  &#x2705; Will successfully inject variables to any file in the repository's path |
| Multiple Source  | Any                | &#x274C; Not currently supported - work coming to update specifically referenced sources  |
| Helm             | Helm Chart         | &#x274C; Not currently supported - work coming to update *referenced* `values.yaml` files |

## Update Argo Image Tags
| Argo Source Type     | Repository Content                 | Behavior                                                                                                 |
|----------------------|------------------------------------|----------------------------------------------------------------------------------------------------------|
| Directory            | Kubernetes Yaml                    | &#x2705; Will update image-tag fields without requiring additional annotations                           |
| Directory | Kustomize | &#x2705; Will replace image tag values in the kustomize file |
| Directory            | Helm Chart w/internal values.yaml  | &#x2705; Will update image-tag fields, requires helm-annotations to identify image-fields in values file |
| Multiple Directories | Helm Char w/referenced values.yaml | &#x2705; Will update image-tag fields, requires multiple helm annotations                                |

