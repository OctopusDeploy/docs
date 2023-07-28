---
layout: src/layouts/Default.astro
pubDate: 2023-07-28
modDate: 2023-07-28
title: Deploy Raw YAML
description: Deploy Raw YAML to a Kubernetes cluster.
navOrder: 8
---

Octopus supports the deployment of Kubernetes resources through the `Deploy Raw Kubernetes YAML` step.

This step allows you to configure Kubernetes manually, leveraging the full power of Octopus features to support your setup. 
This approach is more flexible and gives you complete control over the YAML but requires deeper knowledge of Kubernetes configuration.

# YAML Sources

You can source your YAML from three different sources:
- Git Repository - *New!*
- Package
- Inline Script

## Git Repository

:::div{.hint}
Sourcing from Git Repositories was added in Octopus **2023.3**.

You can find more information about this feature in [this blog post](https://octopus.com/blog/manifests-from-git).
:::

Sourcing from a Git Repository can streamline your deployment process by reducing the amount of steps required to get your YAML into Octopus.
In Octopus, when YAML is sourced from a Git repository, we call it a Git Manifest.

To configure a Git Repository source, select the `Git Repository` option as your YAML Source.

:::figure
![Deploy Raw Kubernetes YAML with a Git Manifest](/docs/deployments/kubernetes/deploy-raw-yaml/git-repository.png "width=500")
:::
 
:::div{.hint}
When you choose the tip of a branch for your Git Manifest when creating a Release, the commit hash is saved to the Release. 
This means redeploying that release will only ever use that specific commit and not the _new_ tip of the branch.
:::
## Package

Sourcing from a Package is the traditional way to load data from external sources. 
You can specify the Package Feed and Package ID as well as a path or paths† to the file(s) in the package that you want to deploy.

To configure a package source, select the `Package` option as your YAML Source.

:::figure
![Deploy Raw Kubernetes YAML with a Package](/docs/deployments/kubernetes/deploy-raw-yaml/package.png "width=500")
:::

†In 2023.3, sourcing from packages can take advantage of [Glob Patterns and Multiple Paths](/docs/deployments/kubernetes/deploy-raw-yaml#glob-patterns-and-multiple-paths).

## Inline YAML

The simplest way to get going with this step is to use Inline YAML. 
You can create your YAML resources in the inline editor which will be saved in the project in Octopus.

To configure an inline YAML source, select the `Inline YAML` as your YAML Source, click `Add Source Code` and start writing!

:::figure
![Deploy Raw Kubernetes YAML with an Inline Script](/docs/deployments/kubernetes/deploy-raw-yaml/inline-yaml.png "width=500")
:::

:::div{.warning}
This is **not** the recommended approach for advanced cases as it does not allow for version management unless you are using it in conjunction with [Config As Code](/docs/projects/version-control).
:::

## Glob Patterns and Multiple Paths

The Git Repository and Package data sources require you to specify which files you would like to apply from the git repo or package. 
Previously we only allowed a single file to be applied via an explicit path. 
In release 2023.3, we have added the ability to source multiple files via multiple paths for both Git Repositories and Packages.

There are a few different ways to take advantage of this feature:
1. You can list several paths by separating them with a new line.
   ```
   deployments/apply-first.yaml
   services/apply-second.yml
   ```
   
   **Note:** *Each path will be applied in order from top to bottom.*

2. You can use a glob pattern to select multiple files in a single path.
   ```
   **/*.{yaml,yml}
   ```
   
   **Note:** *All files matching a glob pattern will be applied at the same time.*

3. Both options at the same time. This gives you the best of both worlds!

    **Note:** *If multiple glob patterns find the same file, the file will be applied twice.*

### Glob Pattern Cheat Sheet

Patterns are always relative so start them with a file or folder name. eg: `my/folder/*.yml` and `**/dep.yml`

:::div{.hint}
Glob patterns cannot contain folders stemming from a root directory. eg: `/` and `C:\`

Glob patterns cannot start with a relative path indicator. eg: `./` and `.\`

The directory traversal path `../` is not supported.
:::

`?` matches any single character in a file or directory name:
```
deployments/resource-?.yaml => deployments/resource-1.yaml, deployments/resource-g.yaml
```

`*` matches zero or more characters in a file or directory name:
```
deployments/*.yaml => deployments/anything-here.yaml, deployments/123-another-file.yaml
*/resource.yaml => deployments/resource.yaml, services/resource.yaml
```

`**` matches zero or more recursive directories:
```
**/resource.yaml => deployments/resource.yaml, services/resource.yaml, deployments/child-folder/resource.yaml
```

:::div{.hint}
Group pattern matching is **coming soon**!
<span style="font-size:14pt;">**Group pattern matching is coming soon**!</span>

`[123]` matches a set of characters in a name. Syntax is similar to character groups in Regex:
```
deployments/resource-[123].yaml => deployments/resource-1.yaml, deployments/resource-2.yaml, deployments/resource-3.yaml
"deployments/resource-g.yaml" would not match the example glob pattern.

deployments/resource-[1-3].yaml => deployments/resource-1.yaml, deployments/resource-2.yaml, deployments/resource-3.yaml
"deployments/resource-g.yaml" would not match the example glob pattern.
```

`{abc,123,xyz}` matches any of the comma separated strings:
```
deployments/resource-{123,abc}.yaml => deployments/resource-123.yaml, deployments/resource-abc.yaml
```
:::