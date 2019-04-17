
Moved into the main page.

---
title: Creating Packages
description: Creating packages for use in your Octopus deployments.
hideInThisSection: true
position: 10
---

We've created the following tools to help package your applications for deployment with Octopus:

- [Octo.exe](/docs/packaging-applications/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps.
- [Octopack](/docs/packaging-applications/octopack.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
- A [TeamCity plugin](/docs/api-and-integration/teamcity.md).
- An [Azure DevOps plugin](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md).

In addition to these tools, you can use other tools to create your packages, for instance, you might use the following:

- The built-in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
- [Grunt, gulp, or octojs](/docs/deployment-examples/node-on-linux-deployments/create-and-push-node.js-project.md) for JavaScript apps.

As long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats), you can deploy your application with Octopus Deploy.
