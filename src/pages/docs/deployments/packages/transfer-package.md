---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Transfer package
description: Transfer Package step allows you to simply transfer a package to your deployment target without extracting it.
---

## Transferring a package to your target without extraction {#TransferPackage-Transferringapackagetoyourtargetwithoutextraction}

If you just want to transfer a package to your remote target without extracting or processing its contents like the standard [Deploy a package](/docs/deployments/packages/) step, then you will want to use the Transfer a package step. When adding this step to your deployment process, choose the **Transfer a Package** option. For more information, see the [add step](/docs/projects/steps) section.

:::figure
![](/docs/deployments/packages/images/5866194.png)
:::

When transferring a package you will need to specify a location that the file will be copied to once it has been uploaded from the server. This can be either a hard-coded path, or a bound variable.

:::figure
![](/docs/deployments/packages/images/5866214.png)
:::

This package will be transferred to the target during the package acquisition phase, and then copied to the specified location at the appropriate time during the deployment process. The copy process is used as opposed to moving or simply transferring it directly to the requested location during acquisition for a number of reasons. First, this will allow the package location to be derived from output variables from previous steps while allowing the full acquisition process to occur up-front, and secondly it will allow the [delta compression](/docs/deployments/packages/delta-compression-for-package-transfers) checks to take place to reduce to amount of data that needs to be transferred on subsequent deployments.

## Output variables {#TransferPackage-OutputVariables}

Since the Transfer a Package step has been kept simple by-design, most deployments will probably want to use the transferred package for some further processing. For this purpose, the following [output variables](/docs/projects/variables/output-variables) are generated for access by subsequent steps.

- `Octopus.Action[StepName].Output.Package.DirectoryPath`- The directory the package was transferred to
- `Octopus.Action[StepName].Output.Package.FileName` - The name of the package
- `Octopus.Action[StepName].Output.Package.FilePath`- The full path to the package

Note that once transferred the package file name will take the format of `<PackageId>.<PackageName>.<FileExtension>`however the expectation is that this should be the original filename to begin with.
