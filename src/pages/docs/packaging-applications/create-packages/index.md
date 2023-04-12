---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Create packages
description: Create packages for deployment with Octopus Deploy.
navOrder: 10
hideInThisSection: true
---

There are a variety of tools you can use to package your applications, and as long as you can create [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.

We've created the following tools to help you package your applications:

 - The [Octopus CLI](/docs/packaging-applications/create-packages/octopus-cli.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [OctoPack](/docs/packaging-applications/create-packages/octopack/) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - The [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity.md).
 - The [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/).

In addition to these tools, you can use other tools to create your packages, for instance, you might use the following:

 - The built-in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
 - [NuGet.exe](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference) to create NuGet packages.
 - [NuGet Package Explorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer).
 - [Grunt, gulp, or octojs](/docs/deployments/node-js/node-on-linux.md#create-and-push-node.js-project) for JavaScript apps.
