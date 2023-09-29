---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Kustomize  
description: Use Kustomize to deploy resources to a Kubernetes cluster.
navOrder: 9
---

Octopus supports the deployment of Kubernetes resources through the **Kustomize** step.

This step allows you to source your **Kustomize** files from git, perform variable substitutions based on your environment and/or tenant and finally apply the changes to your Kubernetes clusters.

:::figure
![Kustomize step](/docs/deployments/kubernetes/kustomize/kustomize-step.png)
:::

[Kustomize](https://kustomize.io) introduces a template-free way to customize application configuration that simplifies the use of off-the-shelf applications.

## Recommended usages for this step

We list a few different scenarios below to help you figure out what is the best setup for you to deploy your applications to a Kubernetes cluster with Octopus.

### When you use Kustomize for one application configuration

1. **Multiple overlays**  
   This is the recommended usage if you are already using Kustomize and just want Octopus to orchestrate the deployment.
   In this scenario, our recommendation is to use `.env` files with Octopus [variable substitution syntax](/docs/projects/variables/variable-substitutions), so we can replace secrets and any other data managed via Octopus variables. These `.env` files are then used by [secretGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_secretgenerator_) and/or [configMapGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_configmapgenerator_).  
   Everything else is defined in the `kustomization.yaml` files directly, and overlays should match the same environment structure defined in Octopus itself. 

2. **Single overlay for Octopus**  
   In this scenario, you may define two overlays, one being for local use outside Octopus, so you can test your `yaml` files. The other overlay is used exclusively by Octopus.  
   In the Octopus overlay, you add [variable substitution syntax](/docs/projects/variables/variable-substitutions) directly into `kustomization.yaml` and any other `yaml` files in the overlay folder, as well as `.env` files.  
   This scenario is better suited for customers with many environments and/or tenants, where customisations are needed for each target.

3. **A mix of both**  
   This would be the ideal scenario when you have a small number of environments and many tenants.  
   In this scenario, you model your overlays based on the environments, with the different settings hardcoded in the `kustomization.yaml` file, and you use Octopus [substitution syntax](/docs/projects/variables/variable-substitutions) to define the different tenant properties in `kustomization.yaml` file.  
   Again as in the previous scenarios, we would use `.env` files for secrets via [secretGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_secretgenerator_).

### When you use Kustomize to template configurations for many applications

1. **A mix of both — templates**  
   You can go beyond configuration for a single application with Octopus and Kustomize. Imagine you have a hundred applications you deploy to Kubernetes. Some of them might have universal traits, like a group of API applications or a group of databases. Therefore, parts of the configuration will be universal for all the apps or a group of apps. There likely be app-unique parameters (like a container image).  
   You can combine overlays and Octopus variables to create and use one template for all the apps. In this scenario, you would have a set of base files same for all the apps. One or more levels of overlays to add customizations for an app group. You can introduce another layer of overlays for environments. Finally, app-specific parameters (e.g. container images, tags and labels) can be defined in Octopus variables.  
   In this scenario, tenant or environment-specific parameters can be added to any overlay. For example, you can add prefixes for tenants; also consider using [system variables](/docs/projects/variables/system-variables).

## Kustomization file directory

This field must be a path to a directory containing the `kustomization.yaml` file.
During deployment, **Kustomize** reads the `kustomization.yaml` file located at this path to perform manifest yaml transforms.  
The path is relative to the root of the git repository.
When using overlays, ensure the path is to the overlay directory containing `kustomization.yaml` file.  
Also, remember that in Linux workers, the paths are case-sensitive, so it is always good practice to check this. 

## Substitute Variables in Files

This setting is useful, for example, when you want to put your application specific configuration settings in a `.env` file and also have the value scoped per environment and/or tenant, see more information regarding [variable scoping](/docs/projects/variables#scoping-variables).  
The target file paths are relative to the root of the git repository.
Again remember that in Linux workers, paths are case-sensitive, so it is always good practice to check this.  
You can use glob patterns to target multiple files. [Learn more about glob patterns](/docs/deployments/kubernetes/glob-patterns).
