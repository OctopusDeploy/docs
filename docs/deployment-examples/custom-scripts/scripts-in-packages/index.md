---
title: Scripts in Packages
description: Adding scripts to your packages in Octopus.
position: 20
---

You can add any of the following script files in any of the scripting languages supported by Octopus (where `<ext>` is the appropriate extension for your scripting language of choice) to your packages:

- `PreDeploy.<ext>`
- `Deploy.<ext>`
- `PostDeploy.<ext>`
- `DeployFailed.<ext>`

After extracting your package, Calamari will detect these scripts and invoke them. Which file you use depends on when you need your custom activity to run – see the section on [what order are conventions run in](/docs/deployment-examples/package-deployments/package-deployment-feature-ordering.md) for details. Your scripts can do anything your scripting language supports, as well as setting [output variables](/docs/deployment-process/variables/output-variables.md) and [collecting artifacts](/docs/deployment-process/artifacts.md). These scripts must be located in the root of your package.

As mentioned above, you can create a file named `DeployFailed.<ext>`, which will be invoked if the package deployment fails. Our blog post about this feature [describes how DeployFailed.<ext> works](https://octopus.com/blog/deployfailed).

As of 4.1.10, you can prevent the running of scripts in packages by adding the `Octopus.Action.Package.RunScripts` variable to your project (scoped as needed) and setting it to `false`.

:::hint
**Script Support on Deployment Targets**
Of course, Bash scripts will only be supported on Linux / OSX Targets and PowerShell and Script CS will only run on Windows. So ensure you've selected the correct language for your deployment target
:::


Make sure that the scripts are included in your package. If you are using OctoPack for an ASP.NET web application, you'll need to make sure the file is marked as **Build Action =** **Content**.

![](/docs/images/3048092/3277766.png)

If you are using OctoPack to package a Windows Service or console application, set **Copy to Output Directory** = **Copy if newer**.

![](/docs/images/3048092/3277765.png)

Read more about [using OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).

## Scripts in Package Steps {#scripts-in-package-steps}

Rather than embed scripts in packages, you can also define scripts within the package step definition in Octopus. This is a feature that can be enabled on package steps by clicking **CONFIGURE FEATURES** and selecting **custom deploy scripts**.

When enabled, you will see **Configuration Scripts** under the features section of the process definition.
