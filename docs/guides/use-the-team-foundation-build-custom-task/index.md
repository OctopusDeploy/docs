---
title: Use the Team Foundation Build Custom Task
position: 5
---

The new structure of Team Foundation Build gives us a great opportunity to integrate better with your build and release processes from Visual Studio Team Services (VSTS) (formerly VSO) and on-premises Team Foundation Server (TFS) servers. We've created a [public extension](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) you can install into your VSTS instance or TFS 2015 server.  This extension makes the following tasks available to your Build and Release processes:

- Installing the extension
- Add a Connection to Octopus Deploy
- Package your Application and Push to Octopus
 - Using OctoPack to Create and Push a Package
- Add Steps to your Build or Release Process
 - Add a Package Application step
  - Publish Package Artifact
 - Add a Push Package(s) to Octopus Step
 - Add a Create Octopus Release Step
 - Add a Deploy Octopus Release Step

We've open-sourced the [OctoTFS repository in GitHub](https://github.com/OctopusDeploy/OctoTFS) if you'd like to contribute.

# Installing the extension {#UsetheTeamFoundationBuildCustomTask-Installingtheextension}

If you're using **Visual Studio Team Services (VSTS) or on-premises Team Foundation Server (TFS) 2015 Update 2 (or newer)** you can simply [install the extension from the marketplace](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) and follow the instructions below.

If you're using an **on-premises TFS server (before 2015 Update 2)**, the extension is currently not available. You'll have to manually install the task by following [these instructions](/docs/guides/use-the-team-foundation-build-custom-task/manually-install-the-build-task-(not-recommended).md). Alternatively, [D'Arcy Lussier has put together a complete walkthrough](http://geekswithblogs.net/dlussier/archive/2016/01/04/170820.aspx) that's very easy to follow.

After installing the extension, follow the below steps to get it running for your build.

:::success
**Manually installing the extension (not recommended)**
If you want to make changes to the build task that might not be appropriate for everyone, you can download and manually install the build task yourself. See [Manually install the Build Task (not recommended)](/docs/guides/use-the-team-foundation-build-custom-task/manually-install-the-build-task-(not-recommended).md) for details.
:::

# Add a Connection to Octopus Deploy {#UsetheTeamFoundationBuildCustomTask-AddaConnectiontoOctopusDeploy}

Click the **Manage Project** cog in the top right corner of the project screen.

Click **New Service Endpoint** and choose **Generic**.

![](/docs/images/3048587/3278381.png "width=500")

Specify a **Connection Name** and specify the **Server Url** to your Octopus Server (including the port if required).

You can enter anything for the **User name** (we don't use it), but make sure you put a valid [Octopus API Key](/docs/how-to/how-to-create-an-api-key.md) in the **Password/Token Key** field.

![](/docs/images/3048587/3278382.png "width=500")

After you've saved the connection, close the management window and click the refresh button next to the Manage link. You should now be able to choose the connection.

# Package your Application and Push to Octopus {#UsetheTeamFoundationBuildCustomTask-PackageyourApplicationandPushtoOctopus}

To integrate with Octopus Deploy, an application must be packaged into either a NuGet or Zip package, and pushed to Octopus Deploy (or any NuGet repository).

There are two options for packaging and pushing:

- [Use OctoPack](/docs/guides/use-the-team-foundation-build-custom-task/index.md) as part of your build process.
- Use the [Package Application](/docs/guides/use-the-team-foundation-build-custom-task/index.md) and [Push Package to Octopus](/docs/guides/use-the-team-foundation-build-custom-task/index.md) Steps added by this extension.

:::hint
There are a number of useful variables provided by Visual Studio Team Services to help you locate files and folders. For a full list, look at the [build variables documentation](https://www.visualstudio.com/docs/build/define/variables).
:::

## Using OctoPack to Create and Push a Package {#UsetheTeamFoundationBuildCustomTask-using-octopackUsingOctoPacktoCreateandPushaPackage}

Follow the [OctoPack instructions](/docs/packaging-applications/nuget-packages/using-octopack/index.md) to add OctoPack to your project and configure the msbuild arguments.

In the new Team Foundation build process, the arguments below should be in the **MSBuild Arguments** field for the **Visual Studio Build** or **MSBuild** step. Here is a list of the available variables that you can use from the Microsoft [Build use variables](https://msdn.microsoft.com/Library/vs/alm/Build/scripts/variables).

```powershell
/p:RunOctoPack=true /p:OctoPackPublishPackageToHttp=http://path.to.octopus/nuget/packages /p:OctoPackPublishApiKey=API-ABCDEFGHIJLKMNOP
```

![](/docs/images/3048587/3278377.png "width=500")

# Add Steps to your Build or Release Process {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess}

:::hint
**Build or Release steps**
The following steps can all be added to either your Build or Release process, depending on which you prefer.

To add a step to your Build process, edit your Build Definition and click **Add build step**.

To add a step to your Release process, edit your Release Definition, select the Environment, and click **Add tasks**.
:::

## Add a Package Application step {#UsetheTeamFoundationBuildCustomTask-package-application-stepAddaPackageApplicationstep}

:::hint
**If not using OctoPack**
This step is only required if you are not [using OctoPack](/docs/guides/use-the-team-foundation-build-custom-task/index.md) to create your package.
:::

Add a step to your Build or Release process, choose **Package**, click **Add** the **Package Application** task.

![](/docs/images/3048587/5865473.png "width=500")

![](/docs/images/3048587/5865474.png "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/packaging-applications/nuget-packages/using-octo.exe.md) for more details).

### Publish Package Artifact {#UsetheTeamFoundationBuildCustomTask-PublishPackageArtifact}

If your Package Application step is part of your Build process and your Push Packages to Octopus step is part of your Release process, then you will need to add a **Utility &#10140; Publish** Artifact step to make the package available to the Release process.

![](/docs/images/3048587/5865475.png "width=500")

![](/docs/images/3048587/5865476.png "width=500")

## Add a Push Package(s) to Octopus Step {#UsetheTeamFoundationBuildCustomTask-push-packages-stepAddaPushPackage(s)toOctopusStep}

Add a step to your Build or Release process, choose **Package**, click **Add** the **Push Packages(s) to Octopus** task.

![](/docs/images/3048587/5865477.png "width=500")

![](/docs/images/3048587/5865724.png "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/pushing-packages.md) for more details).

## Add a Create Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaCreateOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** the **Create Octopus Release** task.

![](/docs/images/3048587/5865479.png "width=500")

![](/docs/images/3048587/5865480.png "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/creating-releases.md) for more details).

Enabling the Include Changeset Comments and/or Include Work Items options will result in release notes which include deep-links into the TFS Work Items and Changesets.

![](/docs/images/3048587/3278502.png "width=500")

## Add a Deploy Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaDeployOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** the **Deploy****Octopus Release** task.

![](/docs/images/3048587/5865481.png "width=500")

![](/docs/images/3048587/5865482.png "width=500")

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/deploying-releases.md) for more details).
