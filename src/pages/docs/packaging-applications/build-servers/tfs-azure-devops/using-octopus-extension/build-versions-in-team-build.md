---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Build versions and packaging in Azure DevOps
description: A guide to build version numbers in Azure DevOps, and how they work with packages for Octopus.
---

Correctly versioning the packages you deploy with Octopus Deploy is important so the right version gets deployed at the right time. With Azure DevOps, specifying a package version isn't always straightforward.

This guide shows you how best to version your builds and packages in Azure DevOps, when using the recommended [Archive Files](http://go.microsoft.com/fwlink/?LinkId=809083) task.

!include <tfs-notice>

## Build numbers in Azure DevOps

In Azure DevOps, build numbers may be in a format that doesn't represent a valid SemVer number.

For example, Microsoft's [Build Number format documentation](https://www.visualstudio.com/en-gb/docs/build/define/general#build-number-format) gives an example: `$(TeamProject)_$(BuildDefinitionName)_$(SourceBranchName)_$(Date:yyyyMMdd)$(Rev:.r)` will result in a version number like `Fabrikam_CIBuild_main_20090805.2`.

While this is a valid Azure DevOps build number, it can cause issues when trying to pack the build output into a NuGet package, a ZIP archive or tarball to be consumed by Octopus Server.

## SemVer

Packages used by Octopus must conform to [SemVer 1.0 or 2.0](/docs/packaging-applications/create-packages/versioning/) depending on the version of Octopus you're using.

The link above explains versioning in detail, but in its simplest form it means two things:

1. Numbered versions in 3 or 4 segments that can be interpreted as `major.minor.patch`, with an optional "prerelease tag" afterwards in the form `-tag`.
2. Versions can be sorted predictably. For example, `1.2.3` is newer than `1.2.0`.

As you can see, a package version of `Fabrikam_CIBuild_main_20090805.2` won't be valid will cause issues!

### Setting a SemVer-compliant build number

The recommendations below generally rely on the build number itself being SemVer compliant. To do this, you can change the build number format.

Our recommended build number format is: `x.y.$(BuildID)` where `x` and `y` are integers. You can change them when you want to bump a version. This format will produce a three-part version number like `1.2.350`.

If you have a build for a separate branch, it's a good idea to add the version tag. For example: `x.y.$(BuildID)-feature-1` will produce a version number like `1.2.350-feature1`. Even better, you can use the `$(Build.SourceBranchName)` variable to set it to the branch name.

Please refer to [this](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/run-number) documentation on how to set the build number in your pipeline.

:::warning
The only downside of this numbering format is the `$(BuildID)` variable _always_ increases, and does so at the Project Collection level. That means it doesn't reset when you increment your major and minor versions, and if you have multiple builds in your Collection, numbers will be skipped.
:::

:::hint
Other extensions such as [gitversion](https://github.com/GitTools/GitVersion) can also be used to easily get SemVer compliant build numbers.
:::

## Packaging in Azure DevOps

As mentioned above the recommended approach to package your application is to use the [Archive Files](http://go.microsoft.com/fwlink/?LinkId=809083) task.

### Versioning

This task does not provide you with a default version number - this is something you have to set yourself as part of the naming of the output file. Clearly it wouldn't be feasible to change this value every time you do a build, so we recommend you make use of the build variables that Azure DevOps provides.

Build and Release variables can be found in [the Microsoft Documentation](https://www.visualstudio.com/en-us/docs/build/define/variables), but the more useful ones include:

- `$(Build.BuildNumber)` - This is the full build number (see [above](#setting-a-semver-compliant-build-number) for setting an appropriate format).
- `$(Build.BuildID)` - This is a unique, incrementing ID at the Project collection level. Every new build will give you a new number.
- `$(Build.SourceBranchName)` - this is the last path segment in the name of the branch. For example, a branch of `refs/heads/main` will return `main`.

### Recommendation

There are two options we recommend for specifying a version number.

1. Use a combination of static values and variables directly. For example, `1.0.$(Build.BuildID)` will always give you a new version number.
2. Use the full build number, and format that number appropriately as [described above](#setting-a-semver-compliant-build-number).

We recommend the second option for a few reasons.

First, it's very easy to match the build to the package because they'll have the same number, and secondly, if you have multiple pack steps, you only need to change a single version number.
