[TeamCity](http://www.jetbrains.com/teamcity/) from JetBrains is a popular continuous integration server that supports a variety of different version control systems and build runners. Octopus Deploy and TeamCity can work together to make automated, continuous delivery easy.

When using Octopus Deploy with TeamCity, TeamCity will usually be responsible for:

- Checking for changes in source control.
- Compiling the code.
- Running unit tests.
- Creating NuGet packages for deployment.

And Octopus Deploy will be used to take those NuGet packages and to push them to development, test and production environments.

Integration with TeamCity involves two major parts:

1. Creating the NuGet packages from your applications.
2. Optionally, when a build completes, having TeamCity make requests to your Octopus Server to:
   - Create releases.
   - Trigger deployments.
   - Promote releases when a build completes.

## Installing the Plugin {#TeamCity-InstallPluginInstallingtheplugin}

To make integrating with TeamCity easy, you can use the Octopus Deploy plugin for TeamCity that's available in the [Jetbrains Plugin Repository](https://plugins.jetbrains.com/plugin/9038-octopus-deploy-integration). You can install this directly in TeamCity in the **{{Administration,Plugins List}}** or manually. The TeamCity documentation has further instructions and options for [installing plugins](https://confluence.jetbrains.com/display/TCD18/Installing+Additional+Plugins).

## Creating Octopus-compatible NuGet Packages Using TeamCity {#TeamCity-CreateNuGetPackageCreatingOctopus-compatibleNuGetpackagesusingTeamCity}

Octopus requires that you package your applications into NuGet packages, whether or not you are using TeamCity. There are many ways to create [Octopus-compatible NuGet packages](/docs/packaging-applications/index.md), but the easiest way is with [OctoPack](https://github.com/OctopusDeploy/OctoPack).

:::hint
**Using OctoPack**
For more information on using OctoPack to create NuGet packages, see [using OctoPack](/docs/packaging-applications/octopack/index.md).
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
