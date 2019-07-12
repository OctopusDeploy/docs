---
title: TeamCity
description: Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.
position: 70
---

!include <teamcity-intro>

The Octopus TeamCity plugin comes with these custom build runners:

1. **Octopus Deploy: Pack** Create a NuGet or Zip formatted package.
2. **Octopus Deploy: Metadata** add information about the build, including work items and commit messages, that is then stored in custom metadata in Octopus Deploy.
3. **Octopus Deploy: Push Packages** Push packages to the Octopus Deploy [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md), optionally using the TeamCity zip feature to create packages on-the-fly.
4. **Octopus Deploy: Create Release**
  Creates a new release in Octopus Deploy, and optionally deploys it to an environment.
5. **Octopus Deploy: Deploy Release**
  Deploys an *existing* release to a new environment.
6. **Octopus Deploy: Promote Release**
  Promotes an *existing* release from one environment to another.

The plugin is simply a wrapper for [Octo.exe](/docs/octopus-rest-api/octo.exe-command-line/index.md), the Octopus command line tool for creating and deploying releases.

!include <teamcity-install>

!include <teamcity-pack>

## Using Octopus as a Package Repository {#TeamCity-PushpackagestoOctopusUsingOctopusasaPackageRepository}

Octopus can be used as a [NuGet package repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md), or it can be configured to use an external feed (such as retrieving them from TeamCity).

To push packages to Octopus during the OctoPack phase, enter the NuGet endpoint URL into the **Publish packages to http** field, and [an API key](/docs/octopus-rest-api/how-to-create-an-api-key.md) in the **Publish API Key** field.  OctoPack will then push the packages when the solution is built.  You'll find the URL to your repository on the **{{Library,Packages}}** tab in Octopus.  Simply click the `Show examples` link to see options to upload packages including the repository URL.

## Consuming the TeamCity NuGet feed in Octopus {#TeamCity-ConsumeNuGetFeedInOctopusConsumingtheTeamCityNuGetfeedinOctopus}

!include <teamcity-feed>

## Creating and Pushing Packages From TeamCity to Octopus {#TeamCity-CreateAndPushPackageToOctopusCreatingandpushingpackagesfromTeamCitytoOctopus}

:::hint
In version 4.38.0 of the TeamCity Plugin we have added a new build runner that can be used to package your applications as either a NuGet or Zip formatted package.
:::

![Octopus Pack](images/teamcity-pack-step.png)

:::hint
In version 3.3.1 of the TeamCity Plugin we have added a new build runner that can be used to package and push your applications from TeamCity to Octopus.
:::

![Octopus Push](images/5275665.png)


## Using the Plugin With Linux Build Agents {#TeamCity-LinuxAgentsUsingthepluginwithLinuxbuildagents}

Traditionally the Octopus TeamCity plugin required a Windows build agent to work. As of version 4.2.1 will run on Linux build agents if they meet either **one** of the following requirements:

1. Have [.NET Core](https://www.microsoft.com/net/core) installed on the build agent and in the PATH such that the `dotnet` command runs successfully. To install, follow the linked guide to install the .NET Core SDK for your distribution. Ensure that the `dotnet` command runs successfully. From version 4.15.10 of the plugin .NET Core v2 is required.
2. Have the Octo command line tool installed and in the PATH such that the `Octo` command runs successfully. To install, download the .tar.gz for you system from the [Octopus download page](https://octopus.com/downloads), extract somewhere appropriate and symlink `Octo` into your PATH. Again, ensure that `Octo` runs successfully. On Ubuntu you may need to install `libunwind8` using your package manager.
