---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2024-06-27
title: Run a script step
description: Standalone scripts allow you to run scripts contained in a package, in a git repository, or ad-hoc scripts you've saved as part of the step.
navOrder: 10
---

Octopus also allows you to run standalone scripts as part of your deployment process. You can run a script on the Octopus Server, on [workers](/docs/infrastructure/workers/) or across the deployment targets in [tags](/docs/infrastructure/deployment-targets/target-tags). You can run scripts contained in a [package](/docs/deployments/packages/), in a git repository, or ad-hoc scripts you've saved as part of the [step](/docs/projects/steps).

You can use all of the features we provide for [custom scripts](/docs/deployments/custom-scripts/), like [variables](/docs/deployments/custom-scripts/using-variables-in-scripts/), [passing parameters](/docs/deployments/custom-scripts/passing-parameters-to-scripts/), publishing [output variables](/docs/deployments/custom-scripts/output-variables), and [collecting artifacts](/docs/deployments/custom-scripts/#Customscripts-Collectingartifacts).

## Choosing where the script will run

When adding a script you choose where the script will run, and in which context the script will run.

The options will vary based on the infrastructure that's available to you. For instance, if you do not have any [workers](/docs/infrastructure/workers) configured you will see the following options:

 - Run on the Octopus Server
 - Run on the Octopus Server on behalf of each deployment target
 - Run on each deployment target (default)

If you do have workers configured you will see the following options:

- Run once on a worker
- Run on a worker on behalf of each deployment target
- Run on each deployment target (default)

If you choose to run the step on a worker, you will also need to select which [worker pool](/docs/infrastructure/workers/worker-pools) Octopus should use for the step.



Choosing the right combination of **Target** and **Roles** enables some really interesting scenarios. See below for some common examples:

| Target            | Roles                  | Description                              | Variables                                | Example scenarios                        |
| ----------------- | ---------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Deployment target | `web-server` `app-server` | The script will run on each deployment target with either of the `web-server` or `app-server` roles | The variables scoped to the deployment target will be available to the script. For example, `Octopus.Machine.Name` will be the deployment target's name | Apply server hardening or ensure standard pre-requisites are met on each deployment target |
| Octopus Server    |                        | The script will run once on the Octopus Server | Scope variables to the Step in order to customize variables for this script | Calculate some output variables to be used by other steps or run a database upgrade process |
| Octopus Server    | `web-server`           | The script will run on the Octopus Server on behalf of the deployment targets with the `web-server` role. The script will execute once per deployment target | The variables scoped to the deployment target will be available to the script. For example, `Octopus.Machine.Name` will be the deployment target's name | Remove web servers from a load balancer as part of a [rolling deployment](/docs/deployments/patterns/rolling-deployments-with-octopus) where access to the load balancer API is restricted |

## Choosing where to source the script {#choosing-where-to-source-scripts}

You may also select the source of the script, either:

- An ad-hoc or inline script, saved as part of the step itself, or
- A script file in a git repository, or
- A script file inside a package (shown below).

:::figure
![](/docs/deployments/custom-scripts/images/script-file-in-package.png)
:::

:::div{.success}
**Scripts from packages or git repository, versioning and source control**
Using scripts from inside a package or a git repository are a great way to version and source control your scripts. (You can be assured the correct version of your script will be run when deploying each version of your application.) Both methods have benefits and suit different applications: choose the method best suited to your situation.
:::

:::div{.hint}
From Octopus **2024.1**, if you are storing your project configuration in a Git repository using the [Configuration as code feature](/docs/projects/version-control), you can source files from the same Git repository as your deployment process by selecting Project as the Git repository source. When creating a Release, the commit hash used for your deployment process will also be used to source the files.

You can find more information about this feature in this [blog post on using Git resources directly in deployments](https://octopus.com/blog/git-resources-in-deployments).
:::

:::div{.hint}
When sourcing a script from a file inside a package you cannot choose to run the step before packages are acquired.
:::

## Passing parameters to scripts

When you call external scripts (sourced from a file inside a package or git repository) you can pass parameters to your script. This means you can write "vanilla" scripts that are unaware of Octopus, and test them in your local development environment. Read about [passing parameters to scripts](/docs/deployments/custom-scripts/passing-parameters-to-scripts).

:::figure
![](/docs/deployments/custom-scripts/images/5865636.png)
:::

## Referencing packages

In addition to being able to [source the custom script from a package](#choosing-where-to-source-scripts), it is often desirable to reference other packages.  Scenarios where this can be useful include:

- Executing a utility contained in a package
- Deploying a package in a manner for which there is no built-in steps available; for example pushing a package to a Content-Management-System
- Performing tasks which require multiple packages.  For example:
    - Executing `NuGet.exe` to push another package (e.g. `Acme.Web`)
    - Referencing multiple container images and performing `docker compose`

:::figure
![Script Step Package References](/docs/deployments/custom-scripts/images/script-step-package-references.png)
:::

Package references can be added regardless of whether the script is sourced inline, from a git repository or from a package.

### Package reference fields

When adding a package reference, you must supply:

#### Package ID
The ID of the package to be referenced, or a variable-expression.

#### Feed
The feed the package is sourced from, or a variable-expression.

#### Name {#package-reference-fields-name}
A unique identifier for the package-reference. In general the Package ID is a good choice for the name. The reasons the Package ID may not be suitable as the name include:

- The Package-ID may be bound to a variable-expression (e.g. `#{Acme.Package.Id}`). Some of the places the name is used are not suitable for variable-expressions.
- In rare situations it may be desirable to reference multiple versions of the same package.  In this case they would need to be given different names.

#### Extract
Whether the package should be extracted. See [below](#referencing-packages-package-files) for information on the package file locations.
This will not be displayed for certain package-types (i.e. container images). This may also be bound to a variable-expression.

:::figure
![Script Step Package References](/docs/deployments/custom-scripts/images/script-step-package-reference-add.png)
:::

### Accessing package references from a custom script

Having added one or more package references, it's reasonable to assume you wish to do something with them in your custom script.

#### Package variables
Package-references contribute variables which can be used just as any other variable. These variables are (assuming a package-reference named `Acme`):

| Variable name and description | Example |
| ----------------------------- | ------- |
| `Octopus.Action.Package[Acme].PackageId` <br/>The package ID | *Acme* |
| `Octopus.Action.Package[Acme].FeedId` <br/>The feed ID | *feeds-123* |
| `Octopus.Action.Package[Acme].PackageVersion` <br/>The version of the package included in the release | *1.4.0* |
| `Octopus.Action.Package[Acme].ExtractedPath` <br/>The absolute path to the extracted directory (if the package is configured to be extracted) |  *C:\Octopus\Work\20210821060923-7117-31\Acme* |
| `Octopus.Action.Package[Acme].PackageFilePath` <br/>The absolute path to the package file (if the package has been configured to not be extracted) | *C:\Octopus\Work\20210821060923-7117-31\Acme.zip* |
| `Octopus.Action.Package[Acme].PackageFileName` <br/>The name of the package file (if the package has been configured to not be extracted) | *Acme.zip* |

The following PowerShell script example shows how to find the extracted path for a referenced package named `Acme`:

```powershell
$ExtractedPath = $OctopusParameters["Octopus.Action.Package[Acme].ExtractedPath"]
Write-Host "PWD: $PWD"
Write-Host "ExtractedPath: $ExtractedPath"
```

#### Package files {#referencing-packages-package-files}

If the package reference was configured to be extracted, then the package will be extracted to a sub-directory in the working-directory of the script. This directory will be named the same as the package-reference.  For example, a package reference named `Acme` would be extracted to directory similar to `C:\Octopus\Work\20180821060923-7117-31\Acme` (this is obviously a Windows directory; a script executing on a Linux target may have a path such as `/home/ubuntu/.octopus/Work/20180821062148-7121-35/Acme`).

If the package reference was _not_ configured to be extracted, then the un-extracted package file will be placed in the working directory. The file will be named as the package reference name, with the same extension as the original package file.  For example, for a package reference named `Acme`, which resolved to a zip package, the file would be copied to a path such as `C:\Octopus\Work\20180821060923-7117-31\Acme.zip` (for Linux: `/home/ubuntu/.octopus/Work/20180821062148-7121-35/Acme.zip`).

These locations were designed to be convenient for use from custom scripts, as the relative path can be predicted, e.g. `./Acme` or `./Acme.zip`.  If the absolute path is required the variables above may be used.
