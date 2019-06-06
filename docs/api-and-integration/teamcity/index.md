---
title: TeamCity
description: Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.
position: 70
---

[TeamCity](http://www.jetbrains.com/teamcity/) from JetBrains is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

When using Octopus Deploy with TeamCity, TeamCity will usually be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet or Zip packages for deployment.

Octopus Deploy will be used to take those packages and to push them to development, test, and production environments.

The Octopus TeamCity plugin comes with these custom build runners:

1. **Octopus Deploy: Pack** Create a NuGet or Zip formatted package.
2. **Octopus Deploy: Metadata** add information about the build, including work items and commit messages, that is then stored in custom metadata in Octopus Deploy.
3. **Octopus Deploy: Push Packages** Push packages to the Octopus Deploy [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md), optionally using the TeamCity zip feature to create packages on-the-fly.
4. **Octopus Deploy: Create Release**
  Creates a new release in Octopus Deploy, and optionally deploys it to an environment.
5. **Octopus Deploy: Deploy Release**
  Deploys an *existing* release to a new environment.
6. **Octopus Deploy: Promote Release**
  Promotes an *existing* release from one environment to another.

The plugin is simply a wrapper for [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), the Octopus command line tool for creating and deploying releases.

## Installing the Octopus TeamCity Plugin

The Octopus Deploy TeamCity plugin is available in the following places:

- The [Jetbrains Plugin Repository](https://plugins.jetbrains.com/plugin/9038-octopus-deploy-integration).
- The [Octopus Downloads page](https://octopus.com/downloads).
- In TeamCity by navigating to **{{Administraton,Plugins List,Browse plugin respository}}** and searching for **Octopus Deploy Integration**.

The TeamCity documentation has instructions and options for [installing plugins](https://www.jetbrains.com/help/teamcity/installing-additional-plugins.html).

## Create Packages with TeamCity

Octopus supports multiple [package formats](/docs/packaging-applications/index.md#supported-formats) for deploying your software. TeamCity can be configured to monitor you source control and package your applications when changes are made.

You configure TeamCity to package your applications by creating a [build configuration](https://www.jetbrains.com/help/teamcity/build-configuration.html), and adding a step to the configuration of runner type, **Octopus Deploy: Pack**.

1. Give the step a name.
2. Enter the [package ID](/docs/packaging-applications/index.md#package-id).
3. Select the type of **package format** you want to create, NuGet(default) or Zip.
4. Enter the **package version**. The package version cannot be a single number (learn about [version numbers in Octopus](/docs/packaging-applications/index.md##version-numbers)). Make sure this evaluates to a multi-part number, for instance, **1.1.3.**. You may want to edit the General Settings for your project to ensure that the TeamCity build number uses multiple parts:

![](/docs/images/3048176/3278195.png)

5. Enter the **source path**. <!-- what is an example of this? -->
6. enter the **output path**. <!-- what is an example of this? -->

<!-- is there more to do? -->


With these options selected, your packages will automatically be created using the version number of the current build. OctoPack will ensure these packages appear in the artifacts tab of TeamCity:

![](/docs/images/3048176/3278194.png)


## Using Octopus as a Package Repository {#TeamCity-PushpackagestoOctopusUsingOctopusasaPackageRepository}

Octopus can be used as a [NuGet package repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md), or it can be configured to use an external feed (such as retrieving them from TeamCity).

To push packages to Octopus during the OctoPack phase, enter the NuGet endpoint URL into the **Publish packages to http** field, and [an API key](/docs/api-and-integration/api/how-to-create-an-api-key.md) in the **Publish API Key** field.  OctoPack will then push the packages when the solution is built.  You'll find the URL to your repository on the **{{Library,Packages}}** tab in Octopus.  Simply click the `Show examples` link to see options to upload packages including the repository URL.

## Consuming the TeamCity NuGet feed in Octopus {#TeamCity-ConsumeNuGetFeedInOctopusConsumingtheTeamCityNuGetfeedinOctopus}

TeamCity 7 and above can act as a NuGet repository. You can enable this by navigating to **{{Administration,NuGet Settings}}** and enabling the inbuilt NuGet server. Any build artifacts ending with `.nupkg` will automatically be served as NuGet packages, which Octopus can consume.

## Connect Octopus to Your TeamCity Server

1. In the Octopus Web Portal navigate to **{{Library,External Feeds}}**.
1. Click **ADD FEED**.
1. Leave the feed type as **NuGet Feed**.
1. Enter a name for the feed.
1. Enter the authenticated feed URL.
1. Click **SAVE**.

Once added, the TeamCity feed will appear in the NuGet feed list.

You can use the *Test* link to make sure that the NuGet package is available, before creating your Octopus project:

:::success
**Tip: delayed package publishing**
NuGet packages created from your build **won't appear in the TeamCity NuGet feed until after the build fully completes**. If you plan to trigger a deployment during a build, this creates a problem: the package won't be in the feed until the build is published, so you won't be able to deploy it.

The solution is to configure a secondary build configuration, and use a snapshot dependency and build trigger in TeamCity to run the deployment build configuration after the first build configuration completes.
:::


## Creating and Pushing Packages From TeamCity to Octopus {#TeamCity-CreateAndPushPackageToOctopusCreatingandpushingpackagesfromTeamCitytoOctopus}

:::hint
In version 4.38.0 of the TeamCity Plugin we have added a new build runner that can be used to package your applications as either a NuGet or Zip formatted package.
:::

![Octopus Pack](teamcity-pack-step.png)

:::hint
In version 3.3.1 of the TeamCity Plugin we have added a new build runner that can be used to package and push your applications from TeamCity to Octopus.
:::

![Octopus Push](/docs/images/3048176/5275665.png)


## Using the Plugin With Linux Build Agents {#TeamCity-LinuxAgentsUsingthepluginwithLinuxbuildagents}

Traditionally the Octopus TeamCity plugin required a Windows build agent to work. As of version 4.2.1 will run on Linux build agents if they meet either **one** of the following requirements:

1. Have [.NET Core](https://www.microsoft.com/net/core) installed on the build agent and in the PATH such that the `dotnet` command runs successfully. To install, follow the linked guide to install the .NET Core SDK for your distribution. Ensure that the `dotnet` command runs successfully. From version 4.15.10 of the plugin .NET Core v2 is required.
2. Have the Octo command line tool installed and in the PATH such that the `Octo` command runs successfully. To install, download the .tar.gz for you system from the [Octopus download page](https://octopus.com/downloads), extract somewhere appropriate and symlink `Octo` into your PATH. Again, ensure that `Octo` runs successfully. On Ubuntu you may need to install `libunwind8` using your package manager.
