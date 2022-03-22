---
title: Using the Octopus extension
description: Octopus Deploy and Azure DevOps can work together to make automated, continuous delivery easy.
position: 1
---

We've created a [public extension](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) you can install into your Azure DevOps instance.  This extension makes the following tasks available to your Build and Release processes:

- The Octopus Tools installer task.
- Pushing your package to Octopus.
- Push package build Information to Octopus
- Creating a release in Octopus.
- Deploying a release to an environment in Octopus.
- Promoting a release from one environment to the next.

You can also view the status of a project in an environment using the Dashboard Widget.

We've open-sourced the [OctoTFS repository in GitHub](https://github.com/OctopusDeploy/OctoTFS) if you'd like to contribute.

## Installing the extension

You can [install the extension from the marketplace](https://marketplace.visualstudio.com/items/octopusdeploy.octopus-deploy-build-release-tasks) and follow the instructions below.

If you're using an earlier version of TFS, see the [Extension Compatibility documentation](extension-compatibility.md) for details on where to get a compatible extension.

After installing the extension, follow the below steps to get it running for your build.

## Use your own version of Octo

You can bring your own version of the Octopus CLI and avoid the use of installer tasks or accessing the Internet by [registering octo as a capability](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/install-octopus-cli-capability.md).

## Add a connection to Octopus Deploy

Follow [these](https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints) instructions to create a new service connection and make sure you pick **Octopus Deploy**.

Enter a valid [Octopus API Key](/docs/octopus-rest-api/how-to-create-an-api-key.md) in the **API Key** field and the Octopus server url.

After you've saved the connection, it should be available from the Octopus Deploy Build Tasks.

:::hint
if you plan to use the Octopus widgets and want them to function for users other than project collaborators, such as stakeholders, then those users must be explicitly allowed to use the service endpoint. This can be achieved by adding those users to the service endpoint `Users` group.
:::

### Permissions required by the API key

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

## Demands and the Octopus tools installer task

The Azure DevOps extension tasks require the Octopus CLI to be available on the path when executing on a build agent. Because of this we have created the "Octopus Tools installer" task that will download the Octopus CLI for you, you need to specify the version of the CLI you want to use. Alternative you can have the Octopus CLI [available on the build agent](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/install-octopus-cli-capability.md). 


## Package your application and push to Octopus {#PackageyourApplicationandPushtoOctopus}

To integrate with Octopus Deploy, an application must be packaged into either a NuGet, Zip or tar package, and pushed to Octopus Deploy (or any NuGet repository).

:::hint
We strongly recommend reading the [Build Versions in Team Build](build-versions-in-team-build.md) guide for advice around build and package versions.
:::

There are many ways to create such package formats in Azure DevOps, our recommended approach is to use [Archive Files](http://go.microsoft.com/fwlink/?LinkId=809083) task.

## Add steps to your build or release process {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess}

:::hint
**Build or Release steps**
The following steps can all be added to either your Build or Release process, depending on which you prefer.

To add a step to your Build process, edit your Build Definition and click **Add build step**.

To add a step to your Release process, edit your Release Definition, select the Environment, and click **Add tasks**.
:::

### Add a package application step {#UsetheTeamFoundationBuildCustomTask-AddStepstoyourBuildorReleaseProcess-packageUsingExtension}

Add a step to your Build or Release process, our recommended approach is to use [Archive Files](http://go.microsoft.com/fwlink/?LinkId=809083) task.

:::success
**Package versioning**
We recommend you read the [Build Versions in Team Build](build-versions-in-team-build.md) document for full details on versioning builds and packages.
:::

#### Publish package artifact {#UsetheTeamFoundationBuildCustomTask-PublishPackageArtifact}

If your Package Application step is part of your Build process and your Push Packages to Octopus step is part of your Release process, then you will need to add a **{{Utility,Publish}}** Artifact step to make the package available to the Release process.

```yaml
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```

### Add a push package(s) to Octopus step {#UsetheTeamFoundationBuildCustomTask-push-packages-stepAddaPushPackagestoOctopusStep}

Add a step to your build or release process, search for **Push Packages(s) to Octopus** task.

```yaml
- task: OctopusPush@4
  inputs:
    OctoConnectedServiceName: 'Octopus Server'
    Space: 'Default'
    Package: '$(Build.ArtifactStagingDirectory)/packages/*.zip'
    Replace: 'true'
```

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octopus CLI options](/docs/octopus-rest-api/octopus-cli/push.md) for more details).

### Add a push package build information to Octopus step {#UsetheTeamFoundationBuildCustomTask-AddBuildInformationStep}

Add a step to your Build or Release process, search for **Push Package Build Information to Octopus** task.

```yaml
- task: OctopusMetadata@4
  inputs:
    OctoConnectedServiceName: 'Octopus Server'
    Space: 'Default'
    PackageId: |
      OctoFX.Database
      OctoFX.RateService
    PackageVersion: '$(Build.BuildNumber)'
    Replace: 'false'
```

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octopus CLI options](/docs/octopus-rest-api/octopus-cli/build-information.md) for more details).

:::hint
There are known compatibility issues with the build link generated by the Octopus extension in some versions of TFS. See our [extension compatibility](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/extension-compatibility.md#build-information-compatibility) page for more information.
:::

### Add a create Octopus release step {#UsetheTeamFoundationBuildCustomTask-AddaCreateOctopusReleaseStep}

Add a step to your Build or Release process, search for **Create Octopus Release** task.

```yaml
- task: OctopusCreateRelease@5
  inputs:
    OctoConnectedServiceName: 'Octopus Server'
    Space: 'Default'
    ProjectName: 'OctoFX'
```

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octopus CLI options](/docs/octopus-rest-api/octopus-cli/create-release.md) for more details).

### Add a deploy Octopus release step {#UsetheTeamFoundationBuildCustomTask-AddaDeployOctopusReleaseStep}

Add a step to your Build or Release process,search for **Deploy Octopus Release** task.

```yaml
- task: OctopusDeployRelease@5
  inputs:
    OctoConnectedServiceName: 'Octopus Server'
    Space: 'Default'
    Project: 'OctoFX'
    ReleaseNumber: 'latest'
    Environments: 'Test'
```

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octopus CLI options](/docs/octopus-rest-api/octopus-cli/deploy-release.md) for more details).

## Add a promote Octopus release step {#UsetheTeamFoundationBuildCustomTask-AddaPromoteOctopusReleaseStep}

Add a step to your build or release process, search for **Promote Octopus Release** task.

```yaml
- task: OctopusPromote@4
  inputs:
    OctoConnectedServiceName: 'Octopus Server'
    Space: 'Default'
    Project: 'OctoFX'
    From: 'Test'
    To: 'Production'
```

See the [Extension Marketplace page](https://marketplace.visualstudio.com/items?itemName=octopusdeploy.octopus-deploy-build-release-tasks) for a description of the fields (or the [Octopus CLI options](/docs/octopus-rest-api/octopus-cli/deploy-release.md) for more details).

## Use the dashboard widget

On your Azure DevOps dashboard, click the `+` icon to add a new widget, then search for "Octopus Deploy". Add the **Octopus Deploy Status** widget.

Hover over the widget and click the wrench icon to configure the widget.

Select an Octopus Deploy connection (see the [Add a Connection](#add-a-connection-to-octopus-deploy) section for details), a Project, and an Environment.

![](images/widget-setup-preview.jpg "width=500")

The widget should refresh to show the current status of the selected project in the selected environment.

![](images/multiple-widget-preview.jpg "width=500")
