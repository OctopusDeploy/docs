---
title: Using the Octopus Extension
description: Octopus Deploy and Azure DevOps can work together to make automated, continuous delivery easy.
position: 1
---

The new structure of Team Foundation Build gives us a great opportunity to integrate better with your build and release processes from Azure DevOps (formerly VSO) and on-premises Team Foundation Server (TFS) servers. We've created a [public extension](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) you can install into your Azure DevOps instance or TFS 2017 server.  This extension makes the following tasks available to your Build and Release processes:

- Octo Installer task.
- Packaging your application.
- Pushing your package to Octopus.
- Creating a Release in Octopus.
- Deploying a Release to an Environment in Octopus.
- Promoting a Release from one Environment to the next.

You can also view the status of a project in an environment using the Dashboard Widget.

On this page:

!toc

We've open-sourced the [OctoTFS repository in GitHub](https://github.com/OctopusDeploy/OctoTFS) if you'd like to contribute.

## Installing the Extension

If you're using **Azure DevOps or on-premises Team Foundation Server (TFS) 2017 (or newer)** you can simply [install the extension from the marketplace](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) and follow the instructions below.

If you're using an earlier version of TFS, see the [Extension Compatibility documentation](extension-compatibility.md) for details on where to get a compatible extension.

After installing the extension, follow the below steps to get it running for your build.

:::hint
**Manually installing the extension (not recommended)**
If you want to make changes to the build task that might not be appropriate for everyone, you can download and manually install the build task yourself. See [Manually install the Build Task (not recommended)](manually-install-the-build-task.md) for details.
:::

## Use Your Own Version of Octo

You can bring your own version of Octo and avoid the use of installer tasks or accessing the internet by [registering Octo as a capability](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/install-octo-capability.md).

## Add a Connection to Octopus Deploy

Hover over the **Manage Project** cog in the top right corner of the project screen in Visual Studio Team Services, and click the **Services** link.

![](/docs/images/3048587/services-setting.jpg "width=206")

Click **New Service Endpoint** and choose **Octopus Deploy**.

![](/docs/images/3048587/new-octopus-connection.jpg "width=241")

Specify a **Connection Name** and specify the **Server Url** to your Octopus Server (including the port if required).

Enter a valid [Octopus API Key](/docs/api-and-integration/api/how-to-create-an-api-key.md) in the **API Key** field.

![](/docs/images/3048587/new-octopus-connection-2.jpg)

After you've saved the connection, it should be available from the Octopus Deploy Build Tasks.

:::hint
if you plan to use the Octopus widgets and want them to function for users other than project collaborators, such as stakeholders, then those users must be explicitly allowed to use the service endpoint. This can be achieved by adding those users to the service endpoint `Users` group.
:::

### Permissions Required by the API Key

The API key you choose needs to have sufficient permissions to perform all the tasks specified by your builds.

For the tasks themselves, these are relatively easy to determine (for example, creating a Release for Project A will require release creation permissions for that project).

For the Azure DevOps UI elements provided by the extension, the API key must also have the below permissions. If one or more are missing, you should still be able to use the extension, however the UI may encounter failures and require you to type values rather than select them from drop-downs. The dashboard widget will not work at all without its required permissions.

If there are scope restrictions (e.g. by Project or Environment) against the account, the UI should still work, but results will be similarly restricted.

- ProjectView (for project drop-downs)
- EnvironmentView (for environment drop-downs)
- TenantView (for tenant drop-downs)
- ProcessView (for channel drop-downs)
- DeploymentView (for the dashboard widget)
- TaskView (for the dashboard widget)

## Demands and the Octo Installer Task

The Azure DevOps extension tasks require Octo to be available on the path when executing on a build agent and must have the .net core 2.0.0 runtime or newer installed. This may not always be possible such as with the Azure DevOps hosted agents. In order to
make this work, all Octopus tasks will automatically attempt to download and use the latest version of Octo tools unless they're [available on the build agent](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/install-octo-capability.md) as specified above. If you would like to avoid any additional downloads or to use a specific Octo version then you can by adding the Octo Installer task to the start of your build definition. No attempt will be made to download Octo if the capability is detected on your build agent.

:::hint
Version 2.x.x of the extension included a bundled version of the Octo tools and did not require the agent to be setup with Octo in the path and did not support running on Linux or Mac build agents.
:::

## Package Your Application and Push to Octopus {#PackageyourApplicationandPushtoOctopus}

To integrate with Octopus Deploy, an application must be packaged into either a NuGet or Zip package, and pushed to Octopus Deploy (or any NuGet repository).

:::hint
We strongly recommend reading the [Build Versions in Team Build](build-versions-in-team-build.md) guide for advice around build and package versions.
:::

There are two options for packaging and pushing:

- Use the [Package Application](#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess-packageUsingExtension) Steps added by this extension.
- [Use OctoPack](#PackageyourApplicationandPushtoOctopus-UsingOctoPack) as part of your build process.


### Using OctoPack to Create and Push a Package {#PackageyourApplicationandPushtoOctopus-UsingOctoPack}

Follow the [OctoPack instructions](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md) to add OctoPack to your project and configure the msbuild arguments.

In the new Team Foundation build process, the arguments below should be in the **MSBuild Arguments** field for the **Visual Studio Build** or **MSBuild** step. Here is a list of the available variables that you can use from the Microsoft [Build use variables](https://msdn.microsoft.com/Library/vs/alm/Build/scripts/variables).

```powershell
/p:RunOctoPack=true /p:OctoPackPublishPackageToHttp=http://path.to.octopus/nuget/packages /p:OctoPackPublishApiKey=API-ABCDEFGHIJLKMNOP
```

:::warning
**Octopack and .NET Core**
Octopack is not supported for .NET Core and we suggest using the Azure DevOps extensions instead.
:::

![](/docs/images/3048587/3278377.png)

## Add Steps to Your Build or Release Process {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess}

:::hint
**Build or Release steps**
The following steps can all be added to either your Build or Release process, depending on which you prefer.

To add a step to your Build process, edit your Build Definition and click **Add build step**.

To add a step to your Release process, edit your Release Definition, select the Environment, and click **Add tasks**.
:::

### Add a Package Application Step {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess-packageUsingExtension}

:::hint
**If not using OctoPack**
This step is only required if you are not [using OctoPack](\docs\api-and-integration\tfs-azure-devops\using-octopack.md) to create your package.
:::

Add a step to your Build or Release process, choose **Package**, click **Add** next to the **Package Application** task.

![](/docs/images/3048587/add-package-step.jpg)

![](/docs/images/3048587/configure-package-step.jpg)

:::success
**Package Versioning**
In the above image, the package version is defined as $(Build.BuildNumber).
It's a common (and handy) practice to do this, and set the Build Number to be a format that corresponds to a valid NuGet version number.

We recommend you read the [Build Versions in Team Build](build-versions-in-team-build.md) document for full details on versioning builds and packages.
:::

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/packaging-applications/creating-packages/nuget-packages/using-octo.exe.md) for more details).

#### Publish Package Artifact {#UsetheTeamFoundationBuildCustomTask-PublishPackageArtifact}

If your Package Application step is part of your Build process and your Push Packages to Octopus step is part of your Release process, then you will need to add a **{{Utility,Publish}}** Artifact step to make the package available to the Release process.

![](/docs/images/3048587/5865475.png)

![](/docs/images/3048587/5865476.png)

### Add a Push Package(s) to Octopus Step {#UsetheTeamFoundationBuildCustomTask-push-packages-stepAddaPushPackage(s)toOctopusStep}

Add a step to your Build or Release process, choose **Package**, click **Add** the **Push Packages(s) to Octopus** task.

![](/docs/images/3048587/add-push-step.jpg)

![](/docs/images/3048587/configure-push-step.jpg)

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/push.md) for more details).

### Add a Create Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaCreateOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Create Octopus Release** task.

![](/docs/images/3048587/add-createrelease-step.jpg)

![](/docs/images/3048587/configure-createrelease-step.jpg)

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/create-release.md) for more details).

Enabling the Include Changeset Comments and/or Include Work Items options will result in release notes which include deep-links into the TFS Work Items and Changesets.

![](/docs/images/3048587/3278502.png)

### Add a Deploy Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaDeployOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Deploy Octopus Release** task.

![](/docs/images/3048587/add-deploy-step.jpg)

![](/docs/images/3048587/configure-deploy-step.jpg)

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/deploy-release.md) for more details).

## Add a Promote Octopus Release Step {#UsetheTeamFoundationBuildCustomTask-AddaPromoteOctopusReleaseStep}

Add a step to your Build or Release process, choose **Deploy**, click **Add** next to the **Promote Octopus Release** task.

![](/docs/images/3048587/add-promote-step.jpg)

![](/docs/images/3048587/configure-promote-step.jpg)

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octo.exe command-line options](/docs/api-and-integration/octo.exe-command-line/deploy-release.md) for more details).

## Using the Dashboard Widget

On your Azure DevOps dashboard, click the `+` icon to add a new widget, then search for "Octopus Deploy". Add the **Octopus Deploy Status** widget.

Hover over the widget and click the wrench icon to configure the widget.

Select an Octopus Deploy connection (see the [Add a Connection](#add-a-connection-to-octopus-deploy) section for details), a Project, and an Environment.

![](widget-setup-preview.jpg)

The widget should refresh to show the current status of the selected project in the selected environment.

![](/docs/images/3048587/multiple-widget-preview.jpg)
