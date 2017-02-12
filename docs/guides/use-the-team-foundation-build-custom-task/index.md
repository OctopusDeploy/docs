---
title: Using the Team Foundation Build Custom Task
description: This guide walks you through integrating Octopus with Microsoft TFS or VSTS using the Octopus extension.
position: 5
---

The new structure of Team Foundation Build gives us a great opportunity to integrate better with your build and release processes from Visual Studio Team Services (VSTS) (formerly VSO) and on-premises Team Foundation Server (TFS) servers. We've created a [public extension](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) you can install into your VSTS instance or TFS 2017 server.  This extension makes the following tasks available to your Build and Release processes:

- Packaging your application
- Pushing your package to Octopus
- Creating a Release in Octopus
- Deploying a Release to an Environment in Octopus
- Promoting a Release from one Environment to the next

We've open-sourced the [OctoTFS repository in GitHub](https://github.com/OctopusDeploy/OctoTFS) if you'd like to contribute.

## Installing the extension {#UsetheTeamFoundationBuildCustomTask-Installingtheextension}

If you're using **Visual Studio Team Services (VSTS) or on-premises Team Foundation Server (TFS) 2017 (or newer)** you can simply [install the extension from the marketplace](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) and follow the instructions below.

If you're using an **on-premises TFS 2015 Update 2 or 3 server**, see [this document](/docs/api-and-integration/team-foundation-server-tfs.md) for details on where to get a compatible extension. 

If you're using an **on-premises TFS server older than 2015 Update 2**, the extension is currently not available. You'll have to manually install the task by following [these instructions](/docs/guides/use-the-team-foundation-build-custom-task/manually-install-the-build-task.md). Alternatively, [D'Arcy Lussier has put together a complete walkthrough](http://geekswithblogs.net/dlussier/archive/2016/01/04/170820.aspx) that's very easy to follow.

After installing the extension, follow the below steps to get it running for your build.

:::success
**Manually installing the extension (not recommended)**
If you want to make changes to the build task that might not be appropriate for everyone, you can download and manually install the build task yourself. See [Manually install the Build Task (not recommended)](/docs/guides/use-the-team-foundation-build-custom-task/manually-install-the-build-task.md) for details.
:::

## Add a Connection to Octopus Deploy {#UsetheTeamFoundationBuildCustomTask-AddaConnectiontoOctopusDeploy}

Hover over the **Manage Project** cog in the top right corner of the project screen in Visual Studio Team Services, and click the **Services** link.

![](/docs/images/3048587/services-setting.jpg "width=206")

Click **New Service Endpoint** and choose **Octopus Deploy**.

![](/docs/images/3048587/new-octopus-connection.jpg "width=241")

Specify a **Connection Name** and specify the **Server Url** to your Octopus Server (including the port if required).

Enter a valid [Octopus API Key](/docs/how-to/how-to-create-an-api-key.md) in the **API Key** field.

![](/docs/images/3048587/new-octopus-connection-2.jpg "width=500")

After you've saved the connection, it should be available from the Octopus Deploy Build Tasks.

## Package your Application and Push to Octopus {#UsetheTeamFoundationBuildCustomTask-PackageyourApplicationandPushtoOctopus}

To integrate with Octopus Deploy, an application must be packaged into either a NuGet or Zip package, and pushed to Octopus Deploy (or any NuGet repository).

There are two options for packaging and pushing:

- [Use OctoPack](/docs/guides/use-the-team-foundation-build-custom-task/index.md) as part of your build process.
- Use the [Package Application](/docs/guides/use-the-team-foundation-build-custom-task/index.md) and [Push Package to Octopus](/docs/guides/use-the-team-foundation-build-custom-task/index.md) Steps added by this extension.

:::hint
There are a number of useful variables provided by Visual Studio Team Services to help you locate files and folders. For a full list, look at the [build variables documentation](https://www.visualstudio.com/docs/build/define/variables).
:::

### Using OctoPack to Create and Push a Package {#UsetheTeamFoundationBuildCustomTask-using-octopackUsingOctoPacktoCreateandPushaPackage}

Follow the [OctoPack instructions](/docs/packaging-applications/nuget-packages/using-octopack/index.md) to add OctoPack to your project and configure the msbuild arguments.

In the new Team Foundation build process, the arguments below should be in the **MSBuild Arguments** field for the **Visual Studio Build** or **MSBuild** step. Here is a list of the available variables that you can use from the Microsoft [Build use variables](https://msdn.microsoft.com/Library/vs/alm/Build/scripts/variables).

```powershell
/p:RunOctoPack=true /p:OctoPackPublishPackageToHttp=http://path.to.octopus/nuget/packages /p:OctoPackPublishApiKey=API-ABCDEFGHIJLKMNOP
```

![](/docs/images/3048587/3278377.png "width=500")

## Add Steps to your Build or Release Process {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess}

:::hint
**Build or Release steps**
The following steps can all be added to either your Build or Release process, depending on which you prefer.

To add a step to your Build process, edit your Build Definition and click **Add build step**.

To add a step to your Release process, edit your Release Definition, select the Environment, and click **Add tasks**.
:::

### Add a Package Application step {#UsetheTeamFoundationBuildCustomTask-package-application-stepAddaPackageApplicationstep}

:::hint
**If not using OctoPack**
This step is only required if you are not [using OctoPack](/docs/guides/use-the-team-foundation-build-custom-task/index.md) to create your package.
:::

Add a step to your Build or Release process, choose **Package**, click **Add** next to the **Package Application** task.

![](/docs/images/3048587/add-package-step.jpg "width=500")

![](/docs/images/3048587/configure-package-step.jpg "width=500")

:::hint
**Package versioning**
In the above image, the package version is defined as $(Build.BuildNumber).
It's a common (and handy) practice to do this, and set the Build Number to be a format that corresponds to a valid NuGet version number.

To do this, in the **General** tab, you can set the Build Number format to something like `1.0.$(BuildID)$(Rev:.r)`.
That will produce version numbers like `1.0.123.1`, incrementing the minor version each build.

For more details on setting the Build Number format, see [the Microsoft documentation](https://www.visualstudio.com/en-us/docs/build/define/general).
:::

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/packaging-applications/nuget-packages/using-octo.exe.md) for more details).

#### Publish Package Artifact {#UsetheTeamFoundationBuildCustomTask-PublishPackageArtifact}

If your Package Application step is part of your Build process and your Push Packages to Octopus step is part of your Release process, then you will need to add a **Utility &#10140; Publish** Artifact step to make the package available to the Release process.

![](/docs/images/3048587/5865475.png "width=500")

![](/docs/images/3048587/5865476.png "width=500")

### Add a Push Package(s) to Octopus Step {#UsetheTeamFoundationBuildCustomTask-push-packages-stepAddaPushPackage(s)toOctopusStep}

Add a step to your Build or Release process, choose **Package**, click **Add** the **Push Packages(s) to Octopus** task.

![](/docs/images/3048587/add-push-step.jpg "width=500")

![](/docs/images/3048587/configure-push-step.jpg "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/pushing-packages.md) for more details).

### Add a Create Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaCreateOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Create Octopus Release** task.

![](/docs/images/3048587/add-createrelease-step.jpg "width=500")

![](/docs/images/3048587/configure-createrelease-step.jpg "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/creating-releases.md) for more details).

Enabling the Include Changeset Comments and/or Include Work Items options will result in release notes which include deep-links into the TFS Work Items and Changesets.

![](/docs/images/3048587/3278502.png "width=500")

### Add a Deploy Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaDeployOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Deploy Octopus Release** task.

![](/docs/images/3048587/add-deploy-step.jpg "width=500")

![](/docs/images/3048587/configure-deploy-step.jpg "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) for more details).

## Add a Promote Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaPromoteOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Promote Octopus Release** task.

![](/docs/images/3048587/add-promote-step.jpg "width=500")

![](/docs/images/3048587/configure-promote-step.jpg "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) for more details).
