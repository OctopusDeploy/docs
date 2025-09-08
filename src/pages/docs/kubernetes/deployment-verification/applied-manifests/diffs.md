---
layout: src/layouts/Default.astro
pubDate: 2025-05-02
modDate: 2025-05-02
title: Applied Manifest Diffs
navTitle: Diffs
description: Applied Manifests Diffs guide
navOrder: 20
---

Sometimes it is difficult to know what changes have occurred to your Kubernetes manifests between deployments. Being able to compare the changes in manifests between deployments allows for easier resolution and debugging of issues.

By enabling the `Show Diffs` toggle on the `Applied Manifests` view on the `KUBERNETES` tab.

:::figure
![A screenshot of the Kubernetes Applied Manifests diffs toggle](/docs/img/deployments/kubernetes/deployment-verification/applied-manifests-diffs-toggle.png)
:::

## How it works

When `Show Diffs` is toggled on, the current Deployment is compared to the previous Deployment. You can change the deployment to compare against using the drop down.

:::figure
![A screenshot of the Kubernetes Applied Manifests diffs deployment selector](/docs/img/deployments/kubernetes/deployment-verification/applied-manifests-diffs-selector.png)
:::

When comparing manifests between Deployments, Octopus uses the Resource information (Name, Namespace, Kind) as well as the Deployment step to match manifests. This means that if a resource has been renamed, or changes namespaces, it will be shown as a new manifest, not an changed manifest.

Current deployments can only be compared with older ones. To compare a deployment with a more recent one, first select the recent deployment in the timeline, and then compare it to your current one.

### Manifest differences

In the navigation tree on the left hand side, there are 4 icons that indicate the changes for a manifest between deployments.

| Label                         |                      Icon                      | Description                                                                                          |
| :---------------------------- | :--------------------------------------------: | :--------------------------------------------------------------------------------------------------- |
| Manifest changed in VERSION   | <i class="fa-solid fa-arrows-rotate blue"></i> | The manifest was changed in the current deployment                                                   |
| Manifest added in VERSION     | <i class="fa-solid fa-plus-square green"></i>  | The manifest was added in the current deployment                                                     |
| Manifest not found in VERSION |  <i class="fa-solid fa-minus-square red"></i>  | The manifest was not found in the current deployment. This maybe for a number of reasons (See below) |
| Manifest unchanged in VERSION |    <i class="fa-solid fa-equals grey"></i>     | The manifest was unchanged in the current deployment                                                 |

#### Why is my manifest showing as removed?

There is a couple of reasons why a manifest may show as removed when compared to a previous Deployment. They are:

1. The manifest is no longer in the source Git repository or Package or Inline Yaml
2. The resource name or namespace changed
3. The step that manifest was deployed in was not executed (either due to being skipped or not executed due to rules)
4. The step was removed and re-added between deployments

In cases 2,3 and 4; as Octopus Server matches manifests on the resource details and the step details, any changes to these will result in the 

### Diff options

Next to the `Show Diffs` toggle, there is a menu for changing diff options. This allows you to either view the diffs in split view or a unified view and allows you hide manifests that were unchanged.

:::figure
![A screenshot of the Kubernetes Applied Manifests diffs menu](/docs/img/deployments/kubernetes/deployment-verification/diffs-menu.png)
:::

## Kubernetes Secret resources and Octopus sensitive variable changes

As detailed in the [Applied Manifest](/docs/kubernetes/deployment-verification/applied-manifests#kubernetes-secret-resources-and-octopus-sensitive-variables) documentation, Octopus will obfuscate values in Kubernetes Secrets and well as any identified sensitive Octopus variable.

When performing a diff, Octopus continues to obfuscate the secrets, but will still indicate if the obfuscated value has changed between deployments.

:::figure
![A screenshot of the Kubernetes Applied Manifests diffs for secrets](/docs/img/deployments/kubernetes/deployment-verification/secret-diffs.png)
:::

## Can I compare to my live resources?

The `Applied Manifest` view allows users to independently compare manifests generated at each step. In contrast, the live view aggregates the manifests, displaying the combined manifest from all steps completed during a deployment. You cannot compare or view the combined manifest on this page. Navigate to the Live page for the combined manifest. To learn more about the live status page and combined manifests, see the docs [here](/docs/kubernetes/live-object-status).