---
title: Creating Packages
description: Creating packages for use in your Octopus deployments.
position: 4
---

Octopus expects your package to contain all of the files needed to run the application when it is deployed (along with [any scripts needed for deployment](/docs/deploying-applications/custom-scripts/index.md), and any [configuration transformation files](/docs/deployment-process/configuration-files/index.md), etc).

An ASP.NET MVC application, packaged using NuGet for example, would look like this:

![](/docs/images/3048093/3277771.png "width=500")

While a Windows Service application might look like this:

![](/docs/images/3048093/3277770.png "width=500")

Note that in both examples:

- Only binaries and files needed at runtime are included - C# source code files, for example, are not in the package
- The binaries aren't just for the current application - they also include any other assemblies needed for the application to run

## Create Your Packages

How you create your packages depends on which package type you wish to create. Octopus generally treats all packages the same, so choose the tooling and package type that is easiest for you to create. For example:

- ASP.NET apps (.NET Framework): use [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
- Windows Services (.NET Framework): use [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
- .NET Core apps: use `dotnet pack`.
- JavaScript apps: use [grunt, gulp, or octojs](/docs/deploying-applications/node-on-nix-deployments/create-&-push-node.js-project.md).
- Working with TeamCity: use our [extension](/docs/api-and-integration/teamcity.md), `octo.exe pack` or even the built in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
- Working with VSTS: use our [extension](/docs/api-and-integration/tfs-vsts/using-octopus-extension/index.md) and/or `octo.exe pack`.
- If you just want to package up a folder as-is: use `octo.exe pack` or just zip it up!

As long as you can create one of our [supported packages](/docs/packaging-applications/creating-packages/supported-packages.md), you can deploy your application with Octopus Deploy!