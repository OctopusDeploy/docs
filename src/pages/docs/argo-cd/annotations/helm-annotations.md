---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Helm Image Update Annotations
description: What annotations are required to
navTitle: Helm Annotations
hideInThisSectionHeader: true
---

When executing the [Update Argo CD Application Image Tags step](/docs/argo-cd/steps#update-application-image-tags) against an Argo CD Application that is deploying a Helm chart,
it is necessary to provide extra annotations to define which fields in the Helm values file represent an image to be updated.

This is because an image reference could be made up of multiple different values file entries. Consider the image fields in [values.yaml](https://github.com/OctopusDeploy/helm-charts/blob/main/charts/kubernetes-agent/values.yaml) for the Kubernetes agent Helm chart:

```yaml
...
agent:
  image:
    repository: octopusdeploy/kubernetes-agent-tentacle
    pullPolicy: IfNotPresent
    tag: "8.3.3244"
    tagSuffix: ""
...
```
In this case, the `agent.image.tag` contains the tag of the image to be updated. However, consider the image fields in this example:

```yaml
...
global:
  image:
    registry: docker.io
    repositoryAndTag: octopusdeploy/kubernetes-agent-tentacle:8.3.3244
...
```
In this case, the `global.image.repositoryAndTag` contains the tag to be updated.

As the structure of Helm values files can vary widely between charts, it's necessary to require you to specify custom annotations on the Argo CD Applications.

The annotations are:

| Annotation                                     | Alias required | Required | Value description                                                                |
|------------------------------------------------|----------------|----------|----------------------------------------------------------------------------------|
| `argo.octopus.com/image-replace-paths.{alias}` | false          | true     | A Helm-template style string that builds a full qualified image name             |
| `argo.octopus.com/image-replace-alias.{alias}` | true           | false    | The path of a ValueFiles entry in the `spec.destinations.helm.valuesFiles` field |

## Further details