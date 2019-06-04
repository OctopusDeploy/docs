## Installing the Plugin {#TeamCity-InstallPluginInstallingtheplugin}

To make integrating with TeamCity easy, you can use the Octopus Deploy plugin for TeamCity.

The plugin is available in the following places:

- The [Jetbrains Plugin Repository](https://plugins.jetbrains.com/plugin/9038-octopus-deploy-integration).
- The [Octopus Downloads page](https://octopus.com/downloads).
- In TeamCity by navigating to **{{Administraton,Plugins List,Browse plugin respository}}** and searching for **Octopus Deploy Integration**.

The TeamCity documentation has instructions and options for [installing plugins](https://www.jetbrains.com/help/teamcity/installing-additional-plugins.html).

## Creating Octopus-compatible NuGet Packages Using TeamCity {#TeamCity-CreateNuGetPackageCreatingOctopus-compatibleNuGetpackagesusingTeamCity}

Octopus can deploy different types of packages

Octopus requires that you package your applications into NuGet packages, whether or not you are using TeamCity. There are many ways to create [Octopus-compatible NuGet packages](/docs/packaging-applications/index.md), but the easiest way is with [OctoPack](/docs/packaging-applications/octopack/index.md).

When you set up your build configuration in TeamCity, use either the MSBuild runner or the Visual Studio build runner. At the bottom of the runner settings, you'll see some options to run OctoPack during the build:

![](/docs/images/3048176/5865626.png)

The **OctoPack package version** setting should evaluate to a version number with multiple parts (e.g., **1.3.7**). It cannot be a single number. You may want to edit the General Settings for your project to ensure that the TeamCity build number uses multiple parts:

![](/docs/images/3048176/3278195.png)

With these options selected, NuGet packages will automatically be created using the version number of the current build. OctoPack will ensure that these packages appear in the artifacts tab of TeamCity:

![](/docs/images/3048176/3278194.png)

:::hint
**Can't use OctoPack?**
Don't worry, TeamCity comes with a built-in [NuGet Pack build step](https://confluence.jetbrains.com/display/TCD9/NuGet+Pack) that you can use to package up Octopus-compatible NuGet packages. Just point it to your .csproj file, or a .nuspec file and TeamCity will package up your project for you. Just be aware that OctoPack has extra features (like adding website content files by convention) but at the end of the day it's just producing a NuGet package.
:::
