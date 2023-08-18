---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: kustomize  
description: Use kustomize to deploy resources to a Kubernetes cluster.
navOrder: 9
---

Octopus supports the deployment of Kubernetes resources through the `kustomize` step.

This step allows you to source your kustomize files from git, perform variable substitutions based on your environment and/or tenant and finally apply the changes to your Kubernetes clusters.

[Kustomize](https://kustomize.io) introduces a template-free way to customize application configuration that simplifies the use of off-the-shelf applications.

## Recommended usages for this step

We list three different scenarios below to help you figure out what is the best setup for you to deploy your applications to a Kubernetes cluster with Octopus.

1. **The kustomize way**  
   This is the recommended usage if you are already using Kustomize and just want Octopus to orchestrate the deployment.
   In this screnario our recomendation is to use `.env` files with Octopus [variable substitution syntax](/docs/projects/variables/variable-substitutions), so we can replace secrets and any other data managed via Octopus variables. These `.env` files are then used by [secretGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_secretgenerator_) and/or [configMapGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_configmapgenerator_).
   Everything else is defined in the `kustomization.yaml` files directly and overlays should match the same environment structure defined in Octopus itself. 

2. **No overlays**  
   In this scenario you may define two overlays, one being for local use outside Octopus, so you can test your `yaml`` files. The other overlay is used exclusively by Octopus.
   In the Octopus overlay you add [variable substitution syntax](/docs/projects/variables/variable-substitutions) directly into `kustomization.yaml` and any other `yaml` files in the overlay folder, as well as `.env` files.
   This scenario is better suited for customers with many environments and/or tenants, where customisations are needed for each target.

3. **A mix of both!**  
   This would be the ideal scenario when you have a small number of environments and many tenants.
   In this scenario you model your overlays based on the environments, with the different setting hardcoded in the `kustomization.yaml` file, and you use Octopus [substitution syntax](/docs/projects/variables/variable-substitutions) to define the different tenant properties in `kustomization.yaml` file.
   Again as the previous scenarios, we would use `.env` files for secrets via [secretGenerator](https://kubectl.docs.kubernetes.io/references/kustomize/builtins/#_secretgenerator_).


## kustomization file directory

This field must be a path to a directory containing the `kustomization.yaml` file.
The path is relative to the root of the git repository.
When using overlays ensure the path is to the overlay directory containing `kustomization.yaml` file.
Also remember that in Linux workers, the paths are case sensitive, so it is always good practice to check this. 

## Substitute Variables in Files

The target file paths are relative to the root of the git repository.
Again remember that in Linux workers, paths are case sensitive, so it is always good practice to check this.
You can use glob patterns to target multiple files. [Learn more about glob patterns](/docs/deployments/kubernetes/glob-patterns.md).