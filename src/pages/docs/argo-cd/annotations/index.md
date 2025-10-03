---
layout: src/layouts/Default.astro
pubDate: 2025-09-15
modDate: 2025-09-15
title: Scoping Annotations
description: What annotations are required to link Argo CD applications to Octopus Projects/Environments/Tenants
navTitle: Scoping Annotations
navSection: Annotations
navOrder: 20
hideInThisSectionHeader: true
---

For Octopus to deploy to the correct Argo CD Applications for the target Project/Environment/Tenant in the deployment, the relationship between Argo CD Applications and a Project, Environment and/or a Tenant must be defined.
By setting up these relationships, you answer the question:

> When I deploy `Project-X` to the `Staging` environment - which Argo CD Application(s) should be updated?

This is done by adding "Scoping" annotations to the Argo CD Application definition, either through the Argo CD Web UI, or directly in the Argo CD Application resource manifest (YAML).

The three scoping annotations are:

| Annotation                     | Required | Value description                             |
|--------------------------------|----------|-----------------------------------------------|
| `argo.octopus.com/project`     | true     | This is the _slug_ of the Octopus Project     |
| `argo.octopus.com/environment` | true     | This is the _slug_ of the Octopus Environment |
| `argo.octopus.com/tenant`      | false    | This is the _slug_ of the Octopus Tenant      |

## Updating in Argo CD Web UI

You can update the annotations for an Argo CD Application via the Argo CD Web UI.

1. Navigate to the Web UI
2. Navigate to the application page of the target application
3. Click the **Details** button, the details drawer should slide out.
4. On the **Summary** tab in the drawer, click the **Edit** button in the top section
5. You can add new annotations by pressing the **+** button in the Annotations section
6. Click **Save**

:::figure
![Argo CD Application Edit](/docs/img/argo-cd/argo-cd-app-annotation-edit.png)
:::

## Updating the Argo CD Application resource manifest~~
~~
If you are managing your Argo CD Application manifests in YAML files, you can add the annotations directly into the `metadata.annotations` node.

Example:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: guestbook
  namespace: argocd
  annotations:
    argo.octopus.com/environment: development
    argo.octopus.com/project: argo-cd-guestbook
spec:
  ...
```

### Generating the yaml annotations

To help generate the correct annotations, in the Octopus UI there is a form that allows for easy selection of projects, environments and/or tenants and the correct scoping annotations will be generated for you.

To find this form go to:

1. Navigate to **Infrastructure ➜ Argo CD Instances**, then click the name of the relevant Argo CD instance
2. On the Argo CD instance Settings page, click the **Generate Scoping Annotations** button
3. In the drawer, you can select a **Project**, **Environment** and optionally a **Tenant**. The annotation yaml will be generated and can be copied directly into the manifest.

:::figure
![Generate Scoping Annotations drawer](/docs/img/argo-cd/generate-scoping-annotations-drawer.png)
:::