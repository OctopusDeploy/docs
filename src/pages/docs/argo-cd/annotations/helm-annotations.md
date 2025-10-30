---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Helm Image Tags Annotations
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

The annotation is as follows:

| Annotation                                                  | Value description                                                                             |
|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `argo.octopus.com/image-replace-paths[.<helm source name>]` | A comma-delimited Helm-template style string that builds a list of fully qualified image names |

Note that while the scoping annotation for the project/environment is defined for the source to be *updated*, the path annotation is defined for the chart/helm source. All value files for a given chart are assumed to have the same structure.

## Details

For Octopus to be able to update the tag of a container image, it must know the fully qualified name, including the registry. An example of a fully qualified name is: `docker.io/nginx/nginx:1.29.1`.
This is important so that Octopus doesn't erroneously update an image from a different registry. For example: images may be set to be sourced from a company-managed registry, where only vetted & tested tags are added. 
In this case, we don't want to update an image that looks like this: `my-company-registry.com/nginx/nginx:1.18.1`.

As described above however, the structure of Helm values files can vary significantly. Rather than Octopus guessing (and possibly making a mistake), the onus is on you to specify a Helm-template string that builds a fully qualified name.
Octopus can then use this to match on containers being updated and can then use this information to update the specific Helm value that contains the image tag. 

## Examples

### Image path templates

The following is some examples of how to format the Helm-templated string to put into the `argo.octopus.com/image-replace-paths[.<helm source name>]` annotation based on different values file structures.

#### Example 1

**values.yaml**

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

**annotation value**

```yaml
metadata:
  annotations:
    argo.octopus.com/image-replace-paths: "docker.io/{{ .Values.agent.image.repository }}:{{ .Values.agent.image.tag }}"
```

#### Example 2

**values.yaml**

```yaml
...
global:
  image:
    registry: custom-registry.com
    repositoryAndTag: octopusdeploy/kubernetes-agent-tentacle:8.3.3244
    pullPolicy: IfNotPresent
    tagSuffix: ""
...
```

**annotation value**

```yaml
metadata:
  annotations:
    argo.octopus.com/image-replace-paths: "{{ .Values.global.image.registry }}/{{ .Values.global.image.repositoryAndTag }}"
```

### Application examples

The following is a list of example Argo CD Application structures, the required annotations and sample values files.

#### Example 1

With a single Helm source, the Helm source can be unnamed and the paths annotation is unscoped. The same path is applied to all value files belonging to the chart/Helm source.

**application manifest**
```yaml
...
metadata:
  annotations:
    argo.octopus.com/project: "proj-1"
    argo.octopus.com/environment: "development"

    # When there is a single source, with a single inline file, we use a single annotation to specify call paths
    argo.octopus.com/image-replace-paths: "{{ .Values.image.name}}:{{ .Values.image.version}}, {{ .Values.another-image.name }}"
...
spec:
  sources:    
    - repoURL: https://github.com/my-org/my-argo-helm-app
      path: "chart"
      targetRevision: main
      helm:
        valueFiles:
          - values.yaml
```

**values.yaml**
```yaml
image:
  name: nginx/nginx
  version: 1.19.0

another-image:
  name: busybox:1
```

#### Example 2

A single Ref source used to source the values.yaml for the Helm source. In this scenario, both sources need to be named and the paths annotation must explicitly specify the helm source.

Note that the scoping annotation for the project/environment specifies the ref-source while the path annotation is specified for the chart/helm source.

```yaml
...
metadata:
  annotations:
    argo.octopus.com/project.ref-source: "proj-1"
    argo.octopus.com/environment.ref-source: "development"

    argo.octopus.com/image-replace-paths.helm-source: "{{ .Values.image.name}}:{{ .Values.image.version}}, {{ .Values.another-image.name }}"
...
spec:
  sources:    
    - repoURL: https://github.com/my-org/my-argo-helm-app
      path: "chart"
      targetRevision: main
      helm:
        valueFiles:
          - $remote-values/values.yaml
      name: helm-source
    - repoURL: https://github.com/another-repo/values-files-here
      targetRevision: main
      ref: remote-values
      name: ref-source
```

**values.yaml**
```yaml
image:
  name: nginx/nginx
  version: 1.19.0

another-image:
  name: busybox:1
```

#### Example 3

A Helm source that references both a ref sourced values file and also an in-repo value file.

```yaml
...
metadata:
  annotations:
    argo.octopus.com/project.helm-source: "proj-1"
    argo.octopus.com/environment.helm-source: "development"
    argo.octopus.com/project.ref-source: "proj-1"
    argo.octopus.com/environment.ref-source: "development"

    argo.octopus.com/image-replace-paths.helm-source: "{{ .Values.image.name}}:{{ .Values.image.version}}, {{ .Values.different.structure.here.image }}"
...
spec:
  sources:    
    - repoURL: https://github.com/my-org/my-argo-helm-app
      path: "chart"
      targetRevision: main
      helm:
        valueFiles:
          - app-files/values.yaml
          - $remote-values/values.yaml
      name: helm-source
    - repoURL: https://github.com/another-repo/values-files-here
      targetRevision: main
      ref: remote-values
      name: ref-source
```

**app-files/values.yaml**
```yaml
image:
  name: nginx/nginx
  version: 1.19.0
```
**$remote-values/values.yaml**
```yaml
different:
  structure:
    here:
      image: busybox:1
```


#### Example 4

A Helm source that has multiple ref sourced values files. Each ref source can be updated by a different project if required.

```yaml
...
metadata:
  annotations:
    argo.octopus.com/project.remote-source: "proj-1"
    argo.octopus.com/environment.remote-source: "development"
    argo.octopus.com/project.other-source: "proj-2"
    argo.octopus.com/environment.other-source: "development"

    argo.octopus.com/image-replace-paths.helm-source: "{{ .Values.image.name}}:{{ .Values.image.version}}, {{ .Values.another-image.name }}"
...
spec:
  sources:
    - repoURL: https://github.com/main-repo/values-files-here
      targetRevision: main
      ref: other-values
      name: other-source

- repoURL: https://github.com/another-repo/values-files-here
      targetRevision: main
      ref: remote-values
      name: remote-source

    - repoURL: https://github.com/my-repo/my-argo-app
      path: "./"
      targetRevision: main
      helm:
        valueFiles:
          - $other-values/values.yaml
          - $remote-values/values.yaml
      name: helm-source
```

**$remote-values/values.yaml**
```yaml
image:
  name: nginx/nginx
  version: 1.19.0
```
**$other-values/values.yaml**
```yaml
another-image:
  name: busybox:1
```

#### Example 5

Multiple Helm sources that reference different values files from the same ref source. If you need to update your value files independently, then we recommend letting the Helm sources reference different ref sources.

```yaml
...
metadata:
  annotations:
    argo.octopus.com/project.values-source: "proj-1"
    argo.octopus.com/environment.values-source: "development"

    argo.octopus.com/image-replace-paths.service-1-source: "{{ .Values.image.name}}:{{ .Values.image.version}}"
    argo.octopus.com/image-replace-paths.service-2-source: "{{ .Values.different.structure.here.image }}"
...
spec:
  sources:
    - repoURL: https://github.com/another-repo/shared-values-files-here
      targetRevision: main
      ref: shared-values
      name: values-source

    - repoURL: https://github.com/my-repo/my-argo-app-be
      path: "service-1-files"
      targetRevision: main
      helm:
        valueFiles:
          - $shared-values/some-path/values.yaml
      name: service-1-source

    - repoURL: https://github.com/my-repo/my-argo-app-fe
      path: "service-2-files"
      targetRevision: main
      helm:
        valueFiles:
          - $shared-values/another-path/values.yaml
      name: service-2-source
```

**$shared-values/some-path/values.yaml**
```yaml
image:
  name: nginx/nginx
  version: 1.19.0
```
**$shared-values/another-path/values.yaml**
```yaml
different:
  structure:
    here:
      image: busybox:1
```