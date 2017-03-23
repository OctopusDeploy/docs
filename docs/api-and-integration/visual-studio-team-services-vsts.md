---
title: Visual Studio Team Services (VSTS)
description: Octopus Deploy and Visual Studio Team Services (VSTS) can work together to make automated, continuous delivery easy.
position: 1
---

If you are using Visual Studio Team Services (VSTS) (formerly VSO) or an on-premises Team Foundation Server (TFS) 2017 (or newer) you can use the [open-source](https://github.com/OctopusDeploy/OctoTFS) extension for Octopus [available in the VSTS marketplace](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks). For TFS 2015 Update 2 or 3, see the [Team Foundation Server extension documentation](/docs/api-and-integration/team-foundation-server-tfs.md) for a compatible download.

:::success
Take a look at our end-to-end guide on [using the Octopus extension for VSTS and TFS](/docs/guides/use-the-team-foundation-build-custom-task/index.md).
:::

Using this extension, you can make use of the following additional Build and Release tasks:

- [Package](/docs/guides/use-the-team-foundation-build-custom-task/index.md#UsetheTeamFoundationBuildCustomTask-package-application-stepAddaPackageApplicationstep) your built application ([See more about packaging here](/docs/packaging-applications/index.md))
- [Push](/docs/guides/use-the-team-foundation-build-custom-task/index.md#UsetheTeamFoundationBuildCustomTask-push-packages-stepAddaPushPackage(s)toOctopusStep) those packages to the Octopus [built-in repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md)
- [Create releases](/docs/guides/use-the-team-foundation-build-custom-task/index.md#UsetheTeamFoundationBuildCustomTask-AddaCreateOctopusReleaseStep) in Octopus
- [Deploy releases](/docs/guides/use-the-team-foundation-build-custom-task/index.md#UsetheTeamFoundationBuildCustomTask-AddaDeployOctopusReleaseStep) to your environments
- [Promote releases](/docs/guides/use-the-team-foundation-build-custom-task/index.md#UsetheTeamFoundationBuildCustomTask-AddaPromoteOctopusReleaseStep) between environments

![](/docs/images/3048587/add-package-step.jpg "width=500")

![](/docs/images/3048587/add-createrelease-step.jpg "width=500")

You can also view the status of a deployment in any environment using the [Dashboard widget](/docs/guides/use-the-team-foundation-build-custom-task/index.md#Using-The-Dashboard-Widget):

![](/docs/images/3048587/multiple-widget-preview.jpg)