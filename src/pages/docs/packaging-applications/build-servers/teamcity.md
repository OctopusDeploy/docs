---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: TeamCity
description: Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.
navOrder: 70
---

!include <teamcity-intro>

The Octopus TeamCity plugin comes with these custom build runners:

1. **Octopus Deploy: Pack** Create a NuGet or Zip formatted package.
2. **Octopus Deploy: Build Information** add information about the build, including work items and commit messages, that is then stored in Octopus Deploy.
3. **Octopus Deploy: Push Packages** Push packages to the Octopus Deploy [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/#pushing-packages-to-the-built-in-repository), optionally using the TeamCity zip feature to create packages on-the-fly.
4. **Octopus Deploy: Create Release**
    Creates a new release in Octopus Deploy, and optionally deploys it to an environment.
5. **Octopus Deploy: Deploy Release**
    Deploys an *existing* release to a new environment.
6. **Octopus Deploy: Promote Release**
    Promotes an *existing* release from one environment to another.

The plugin is simply a wrapper for the [Octopus CLI](/docs/octopus-rest-api/octopus-cli/), the Octopus command line tool for creating and deploying releases.

!include <teamcity-install>

!include <teamcity-pack>

## Using Octopus as a package repository {#TeamCity-PushpackagestoOctopusUsingOctopusasaPackageRepository}

Octopus can be used as a [NuGet package repository](/docs/packaging-applications/package-repositories/built-in-repository/), or it can be configured to use an external feed (such as retrieving them from TeamCity).

To push packages to Octopus during the OctoPack phase, enter the NuGet endpoint URL into the **Publish packages to http** field, and [an API key](/docs/octopus-rest-api/how-to-create-an-api-key/) in the **Publish API Key** field.  OctoPack will then push the packages when the solution is built.  You'll find the URL to your repository on the **{{Library,Packages}}** tab in Octopus.  Simply click the `Show examples` link to see options to upload packages including the repository URL.

## Consuming the TeamCity NuGet feed in Octopus {#TeamCity-ConsumeNuGetFeedInOctopusConsumingtheTeamCityNuGetfeedinOctopus}

!include <teamcity-feed>

## Creating and pushing packages from TeamCity to Octopus {#TeamCity-CreateAndPushPackageToOctopusCreatingandpushingpackagesfromTeamCitytoOctopus}

:::hint
In version **4.38.0** of the TeamCity Plugin we have added a new build runner that can be used to package your applications as either a NuGet or Zip formatted package.
:::

![Octopus Pack](/docs/packaging-applications/build-servers/images/teamcity-pack-step.png "width=500")

:::hint
In version **3.3.1** of the TeamCity Plugin we added a new build runner that can be used to package and push your applications from TeamCity to Octopus.
:::

![Octopus Push](/docs/packaging-applications/build-servers/images/5275665.png "width=500")

## Pushing build information from TeamCity to Octopus {#TeamCity-pushing-build-info-from-teamcity-to-octopus}

Support for pushing information (metadata) to Octopus about the build has been available in the TeamCity plugin since version **5.1.3**.

- In versions **{{5.1.3,5.3.0}}**, the build runner was called **Octopus Deploy: Metadata**
- In version **5.4.0** onwards, the build runner was renamed to **Octopus Deploy: Build Information**

![Octopus Build information](/docs/packaging-applications/build-servers/images/teamcity-build-information-step.png "width=500")

:::hint
A **Branch specification** is required on the TeamCity VCS configuration to populate the `Branch` field for Build Information in Octopus Deploy.  For example, `+:*`
![](/docs/packaging-applications/build-servers/images/teamcity-branch-specification.png "width=500")

The part of the branch name matched by the asterisk (`*`) wildcard becomes the short branch name to be displayed in the TeamCity user-level interface. This is also known as the **logical branch name** and it's this value that is passed to Octopus Deploy by the TeamCity Plugin.

For more information about configuring a branch specification, see the [TeamCity - working with feature branches](https://www.jetbrains.com/help/teamcity/working-with-feature-branches.html#Configuring+branches) documentation.
:::

## Using the plugin with Linux build agents {#TeamCity-LinuxAgentsUsingthepluginwithLinuxbuildagents}

Traditionally the Octopus TeamCity plugin required a Windows build agent to work. As of version 4.2.1 it will run on Linux build agents if they meet either of the following requirements:

1. [.NET Core](https://www.microsoft.com/net/core) must be installed on the build agent and in the PATH such that the `dotnet` command runs successfully. To install, follow the linked guide to install the .NET Core SDK for your distribution. Ensure that the `dotnet` command runs successfully. From version 4.15.10 of the plugin .NET Core v2 is required.
2. For Octopus CLI versions prior to `7.0.0` .Net Core must be installed as above. *Versions later than `7.0.0` are self contained and do not require .Net Core to be installed*. The Octopus CLI tool must be installed and in the PATH such that the `octo` command runs successfully. To install, download the .tar.gz for your system from the [Octopus download page](https://octopus.com/downloads), extract somewhere appropriate and symlink `octo` into your PATH. Again, ensure that `octo` runs successfully. On some platforms you may need to install [additional dependencies](https://docs.microsoft.com/en-gb/dotnet/core/install/dependencies?pivots=os-linux&tabs=netcore31#linux-distribution-dependencies).

## Learn more

- Generate an Octopus guide for [TeamCity and the rest of your CI/CD pipeline](https://octopus.com/docs/guides?buildServer=TeamCity).
