---
title: Creating Packages
description: Creating packages for use in your Octopus deployments.
position: 10
---

When you deploy a package with Octopus, you need to include all the files the application needs to run, this includes [scripts needed for deployment](/docs/deployment-examples/custom-scripts/index.md) and [configuration transformation files](/docs/deployment-process/configuration-features/index.md).

How you create your packages depends on which package type you wish to create. Octopus generally treats all packages the same, so choose the tooling and package type that is easiest for you to create. For example:

- To package a folder with and maintain it's existing structure, use `octo.exe pack` or create a zip archive.
- ASP.NET apps (.NET Framework): use [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
- Windows Services (.NET Framework): use [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
- .NET Core apps: use `dotnet publish` on the project followed by `octo.exe pack` on the output directory.
- JavaScript apps: use [grunt, gulp, or octojs](/docs/deployment-examples/node-on-linux-deployments/create-and-push-node.js-project.md).
- Working with TeamCity: use our [extension](/docs/api-and-integration/teamcity.md), `octo.exe pack` or even the built in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
- Working with Azure DevOps: use our [extension](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md) and/or `octo.exe pack`.

As long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats), you can deploy your application with Octopus Deploy.

## Example Packages

An ASP.NET MVC application, packaged using NuGet for example, would look like this:

![](/docs/images/3048093/3277771.png)

While a Windows Service application might look like this:

![](/docs/images/3048093/3277770.png)

Note that in both examples:

- Only binaries and files needed at runtime are included - C# source code files, for example, are not in the package.
- The binaries aren't just for the current application - they also include any other assemblies needed for the application to run.
