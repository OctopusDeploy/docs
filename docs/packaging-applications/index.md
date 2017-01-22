---
title: Packaging applications
position: 3
---


Before you can deploy an application using Octopus, you will need to bundle all of the executables, DLL's, configuration files, installation scripts, and anything else the application needs to run into a package.


See our [supported package types](/docs/packaging-applications/supported-packages.md).

:::hint
**Isn&#39;t Octopus Deploy all about NuGet?**
Originally, Octopus Deploy supported only [NuGet packages](/docs/packaging-applications/nuget-packages/index.md) but that is no longer the case. In Octopus 3.3 we added support for zip packages, and in Octopus 3.5 we added support for Docker images. We will be continuing to support other packaging concepts as they become relevant to the deployment ecosystem.


While some of our documentation may still refer to NuGet packages specifically, all packages are generally treated the same.
:::


On this page:


- Creating packages
- Hosting packages
- What's in a package?

## Creating packages


How you create your packages depends on which package type you wish to create. Octopus generally treats all packages the same, so choose the tooling and package type that is easiest for you to create. For example:

- ASP.NET apps (.NET Framework): use [OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md)
- Windows Services (.NET Framework): use [OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md)
- .NET Core apps: use `dotnet pack`
- JavaScript apps: use [grunt, gulp or octojs](/docs/guides/node-on-nix-deployments/create-&-push-node.js-project.md)
- Working with TeamCity: use our [extension](/docs/api-and-integration/teamcity.md), `octo.exe pack` or even the built in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/)
- Working with VSTS: use our [extension](/docs/api-and-integration/visual-studio-team-services-(vsts).md) and/or `octo.exe pack`
- Just want to package up a folder as-is: use `octo.exe pack` or just zip it up!



As long as you can create one of our [supported packages](/docs/packaging-applications/supported-packages.md), you can deploy your application with Octopus Deploy!

:::success
**Choosing the best versioning scheme**
When creating your packages you will need to choose a versioning scheme that is supported by Octopus Deploy and suits your needs. Learn about [versioning in Octopus Deploy](/docs/packaging-applications/versioning-in-octopus-deploy.md).
:::

## Hosting packages


Packages are kept in package repositories (or feeds). A repository can be as simple as a file share, or it could be a dedicated server. For more information, see the section on [choosing a package repository](/docs/packaging-applications/package-repositories/index.md).

## What's in a package?


Octopus expects your package to contain all of the files needed to run the application when it is deployed (along with [any scripts needed for deployment](/docs/deploying-applications/custom-scripts/index.md), and any [configuration transformation files](/docs/deploying-applications/configuration-files/index.md), etc).


An ASP.NET MVC application, packaged using NuGet for example, would look like this:


![](/docs/images/3048093/3277771.png "width=500")


While a Windows Service application might look like this:


![](/docs/images/3048093/3277770.png "width=500")


Note that in both examples:

- Only binaries and files needed at runtime are included - C# source code files, for example, are not in the package
- The binaries aren't just for the current application - they also include any other assemblies needed for the application to run
