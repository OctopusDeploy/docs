---
title: TeamCity
description: Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.
position: 0
---

[TeamCity](http://www.jetbrains.com/teamcity/) from JetBrains is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

When using Octopus Deploy with TeamCity, TeamCity will usually be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet packages for deployment.

While Octopus Deploy will be used to take those NuGet packages and to push them to development, test and production environments.

Integration with TeamCity involves two major parts:

1. Creating the NuGet packages from your applications.
2. Optionally, when a build completes, having TeamCity make requests to your Octopus Server to:
   - Create releases
   - Trigger deployments and/or
   - Promote releases when a build completes

## Installing the Plugin {#TeamCity-InstallPluginInstallingtheplugin}

To make integrating with TeamCity easy, a [plugin is available](https://octopus.com/downloads) from our download page. The plugin is distributed as a ZIP file. To install:

1. Download the [TeamCity Plugin ZIP file](https://octopus.com/downloads).
2. Shut down your TeamCity server.
3. Copy the ZIP file with the plugin to `<TeamCity Data Directory>/plugins`.
4. Start TeamCity server: the plugin files will be unpacked and processed automatically.

The [TeamCity Data Directory](https://confluence.jetbrains.com/display/TCD10/TeamCity+Data+Directory) can be found on the **Administration | Global Settings** page for a running TeamCity server instance.

The TeamCity documentation has further instructions and options for [installing plugins](https://confluence.jetbrains.com/display/TCD18/Installing+Additional+Plugins).

## Creating Octopus-compatible NuGet Packages Using TeamCity {#TeamCity-CreateNuGetPackageCreatingOctopus-compatibleNuGetpackagesusingTeamCity}

Octopus requires that you package your applications into NuGet packages, whether or not you are using TeamCity. There are many ways to create [Octopus-compatible NuGet packages](/docs/packaging-applications/index.md), but the easiest way is with [OctoPack](https://github.com/OctopusDeploy/OctoPack).

:::hint
**Using OctoPack**
For more information on using OctoPack to create NuGet packages, see [using OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
:::

When you set up your build configuration in TeamCity, use either the MSBuild runner or the Visual Studio build runner. At the bottom of the runner settings, you'll see some options to run OctoPack during the build:

![](/docs/images/3048176/5865626.png)

The **OctoPack package version** setting should evaluate to a version number with multiple parts (e.g., **1.3.7**). It cannot be a single number. You may want to edit the General Settings for your project to ensure that the TeamCity build number uses multiple parts:

![](/docs/images/3048176/3278195.png)

With these options selected, NuGet packages will automatically be created using the version number of the current build. OctoPack will ensure that these packages appear in the artifacts tab of TeamCity:

![](/docs/images/3048176/3278194.png)

:::hint
**Can&#39;t use OctoPack?**
Don't worry, TeamCity comes with a built-in [NuGet Pack build step](https://confluence.jetbrains.com/display/TCD9/NuGet+Pack) that you can use to package up Octopus-compatible NuGet packages. Just point it to your .csproj file, or a .nuspec file and TeamCity will package up your project for you. Just be aware that OctoPack has extra features (like adding website content files by convention) but at the end of the day it's just producing a NuGet package.
:::

## Using Octopus as a Package Repository {#TeamCity-PushpackagestoOctopusUsingOctopusasaPackageRepository}

Octopus can be used as a [NuGet package package](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md), or can be configured to use an external feed (such as retrieving them from TeamCity).

To push packages to Octopus during the OctoPack phase, enter the NuGet endpoint url into the **Publish packages to http** field, and [an API key](/docs/api-and-integration/api/how-to-create-an-api-key.md) in the **Publish API Key** field.  OctoPack will then push the packages when the solution is built.  You'll find the URL to your repository on the **{{Library,Packages}}** tab in Octopus.  Simply click the `Show examples` link to see options to upload packages including the repository URL.

## Consuming the TeamCity NuGet feed in Octopus {#TeamCity-ConsumeNuGetFeedInOctopusConsumingtheTeamCityNuGetfeedinOctopus}

:::warning
**Octopus 3.4+** requires **TeamCity 9.0+** due to compatibility problems with the older NuGet v1 feed implemented by earlier versions of TeamCity. Refer to [this thread](http://help.octopus.com/discussions/problems/47581-teamcity-nuget-feed#comment_40952268) and this [GitHub Issue](https://github.com/OctopusDeploy/Issues/issues/2656) for more details.
:::

TeamCity 7 and up can act as a NuGet repository. You can enable this by navigating to **{{Administration,NuGet Settings}}** and enabling the inbuilt NuGet server. Any build artifacts ending with `.nupkg` will automatically be served as NuGet packages, which Octopus can consume.

### Connect Octopus to Your TeamCity server

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

The solution is to configure a secondary build configuration, and use a snapshot dependency and build trigger in TeamCity to run the deployment build configuration after the first build configuration completes. The video below demonstrates how to do this.
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

## Triggering Deployments From TeamCity {#TeamCity-TriggerDeploymentsTriggeringdeploymentsfromTeamCity}

The Octopus TeamCity plugin comes with these custom build runners:

1. **Octopus Deploy: Pack (TeamCity plugin 4.38.0 or newer)** Create a NuGet or Zip formatted package.
2. **Octopus Deploy: Push Packages (Octopus 3.3 and TeamCity plugin 3.3.1 or newer)** Push packages to the Octopus Deploy [built-in repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md), optionally using the TeamCity zip feature to create packages on-the-fly.
3. **Octopus Deploy: Create Release**
  Creates a new release in Octopus Deploy, and optionally deploys it to an environment.
4. **Octopus Deploy: Deploy Release**
  Deploys an *existing* release to a new environment.
5. **Octopus Deploy: Promote Release**
  Promotes an *existing* release from one environment to another.

The plugin is simply a wrapper for [Octo.exe](/docs/api-and-integration/octo.exe-command-line/index.md), the Octopus command line tool for creating and deploying releases.

![](/docs/images/3048176/3278185.jpg)

## Using the Plugin With Linux Build Agents {#TeamCity-LinuxAgentsUsingthepluginwithLinuxbuildagents}

Traditionally the Octopus TeamCity plugin required a Windows build agent to work. As of version 4.2.1 will run on Linux build agents if they meet either **one** of the following requirements:

1. Have [.NET Core](https://www.microsoft.com/net/core) installed on the build agent and in the PATH such that the `dotnet` command runs successfully. To install, follow the linked guide to install the .NET Core SDK for your distribution. Ensure that the `dotnet` command runs successfully. From version 4.15.10 of the plugin .NET Core v2 is required.
2. Have the Octo command line tool installed and in the PATH such that the `Octo` command runs successfully. To install, download the .tar.gz for you system from the [Octopus download page](https://octopus.com/downloads), extract somewhere appropriate and symlink `Octo` into your PATH. Again, ensure that `Octo` runs successfully. On Ubuntu you may need to install `libunwind8` using your package manager`.`
