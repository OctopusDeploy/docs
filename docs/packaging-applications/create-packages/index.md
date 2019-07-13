---
title: Create Packages
description: Create packages for deployment with Octopus Deploy.
position: 10
hideInThisSection: true
---

We've created the following tools to help package your applications for deployment with Octopus:

 - [Octo.exe](/docs/packaging-applications/create-packages/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [Octopack](/docs/packaging-applications/create-packages/octopack/index.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - A [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity.md).
 - An [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/index.md).

In addition to these tools, you can use other tools to create your packages, for instance, you might use the following:

 - The built-in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
 - [NuGet.exe](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference) to create NuGet packages.
 - Using the [NuGet Package Explorer](/docs/packaging-applications/create-packages/nuget-packages.md).
 - [Grunt, gulp, or octojs](/docs/deployment-examples/node-on-linux-deployments/create-and-push-node.js-project.md) for JavaScript apps.

There are many more tools you might choose to use, but as long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.
