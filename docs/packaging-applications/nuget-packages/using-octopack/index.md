---
title: Using OctoPack
---

The easiest way to package .NET applications from your continuous integration/automated build process is to use OctoPack. OctoPack adds a custom MSBuild target that hooks into the build process of your solution. When enabled, OctoPack will package your Windows Service and ASP.NET applications when MSBuild runs. This makes it easy to integrate OctoPack with your build server - as long as you can pass properties to MSBuild, you can use OctoPack.

:::hint
**OctoPack is open-source**
OctoPack is built and maintained by the Octopus Deploy team, but it is also open source. You can [view the OctoPack project on GitHub](https://github.com/OctopusDeploy/OctoPack).
:::

:::hint
**OctoPack uses nuget.exe**
Under the hood, OctoPack eventually calls good old `nuget.exe pack` to build the NuGet package, and `nuget.exe push` to publish the package (if so desired). OctoPack adds value because it understands .NET applications and uses that knowledge to build the right kind of package for each kind of .NET application.
:::

:::success
**Octopus now supports multiple package types**
Did you know Octopus now [supports other package types](/docs/packaging-applications/supported-packages.md) too? Now you can simply pack all the files you need straight into a specially named zip file, or any of the other [supported package types](/docs/packaging-applications/supported-packages.md), and Octopus will deploy it for you just like you'd expect. When OctoPack works for your situation, it's brilliant! However, if you find yourself wrestling with OctoPack, perhaps dropping the files you want deployed into a folder, and zipping it up for Octopus will turn out a lot simpler?
:::

This three minute video (with captions) will walk you through the process of installing and using OctoPack.

<iframe src="//fast.wistia.net/embed/iframe/e9f3yhlvsr" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen="" oallowfullscreen="" msallowfullscreen="" width="640" height="360" style="margin: 30px"></iframe>

## Installing OctoPack {#UsingOctoPack-InstallingOctoPack}

OctoPack is, itself, a NuGet package. You can install it using the NuGet package installer, or any of the other ways you love to install NuGet packages:

![](/docs/images/3048095/3277789.png "width=500")

OctoPack should only be installed on projects that you are going to deploy - that means the console application projects, Windows Service projects, and ASP.NET web applications. Unit tests, class libraries, and other supporting projects wouldn't be selected.

![](/docs/images/3048095/3277788.png "width=500")

## Building packages {#UsingOctoPack-Buildingpackages}

To have OctoPack create a NuGet package from your build, set the **RunOctoPack** MSBuild property to true. For example, if you are compiling from the command line, you might use:

```powershell
msbuild MySolution.sln /t:Build /p:RunOctoPack=true
```

After the build completes, in the output directory you will find a NuGet package. This package is ready to be deployed using your [Octopus Deploy server](/docs/installation/installing-octopus/index.md).

## Adding a NuSpec {#UsingOctoPack-AddingaNuSpec}

A `.nuspec` file describes the contents of your NuGet package. OctoPack automatically creates one if you haven't provided one, by guessing some of the settings from your project. But you may wish to provide your own simple `.nuspec` file to your project. The file name should match the name of your C# project - for example, `Sample.Web.nuspec` if your ASP.NET project is named **Sample.Web**. The `.nuspec` file needs to be in the same directory as your `.csproj` file.

Here is an example of the `.nuspec` file contents:

**Sample NuSpec file**

```xml
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>Sample.Web</id>
    <title>Your Web Application</title>
    <version>1.0.0</version>
    <authors>Your name</authors>
    <owners>Your name</owners>
    <licenseUrl>http://yourcompany.com</licenseUrl>
    <projectUrl>http://yourcompany.com</projectUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>A sample project</description>
    <releaseNotes>This release contains the following changes...</releaseNotes>
  </metadata>
</package>
```

:::hint
Learn more about the [NuSpec file format](http://docs.nuget.org/docs/reference/nuspec-reference).
:::

## What is packaged? {#UsingOctoPack-Whatispackaged?}

Since OctoPack is built for .NET applications, with special knowledge about the types of applications you can build, it is smart enough to only package the files required to deploy them.

If you are packaging a .NET application, OctoPack will **automatically package all of the files in the build output directory for the project**. In most cases this will be the `bin`, `bin\Debug` or `bin\Release` folder, depending on the build configuration and whether you have[ changed the build output directory for your project in Visual Studio](https://msdn.microsoft.com/en-us/library/ms165410.aspx).

For Windows Service or Console applications, and many Windows Forms or WPF applications, the build output directory contains everything you need to deploy your application.

The example below shows a Windows Service called `OctoFX.RateService.exe` and all of the files required to run the application, including libraries and configuration files.

![](/docs/images/3048095/3277787.png "width=500")

### Including web application content files {#UsingOctoPack-Includingwebapplicationcontentfiles}

Web applications require additional files to run, such as Razor/ASPX files, configuration files, and assets such as images, CSS and JavaScript files. OctoPack automatically determines whether a project is a web application or not based on whether it finds a `web.config` file.

When packaging a web application, OctoPack will automatically include the `bin` folder and any files configured with **Build Action: Content.** You can see **Build Action** in the Solution Explorer properties window for the currently selected file in Visual Studio:

![](/docs/images/3048095/3277786.png)

The example below shows a web application called **OctoFX.TradingWebsite** and you can see that all the files required to host the web application have been packaged, including the contents of the `bin` folder and any files with **Build Action: Content**.

![](/docs/images/3048095/3277785.png "width=500")

:::hint
**Config Transformation is part of the deployment process**
OctoPack won't run web.config transformation files, because these will be run as [part of the deployment instead](/docs/deploying-applications/configuration-files/index.md). Make sure you set **Build Action: Content** for your config transform files (like `web.Release.config`) to ensure these files are packaged and used as part of your deployment.
:::

### Including additional files using Copy to Output Directory {#UsingOctoPack-IncludingadditionalfilesusingCopytoOutputDirectory}

If you need to include other files in your package for deployment, use the Visual Studio properties panel to set the **Copy to Output Directory** attribute to **Copy if newer** or **Copy always**. These files will be copied to the build output directory when the project builds, and subsequently packaged by OctoPack.

:::success
**Config Transforms for other types of .NET applications**
Did you know you can use XML Config Transforms on any XML files including the `app.config` file for Windows Service, Console, Windows Forms or WPF applications? Make sure the transform files are copied to the build output directory as part of your build, and the will be packaged by OctoPack so you can[use them as part of the deployment](/docs/deploying-applications/configuration-files/index.md).
:::

### Including additional files using a NuSpec file (.nuspec) {#UsingOctoPack-IncludingadditionalfilesusingaNuSpecfile(.nuspec)}

If you need to go beyond this and include additional files, or you want to control explicitly which files are included in the package, you can do so using the `<files>` element in your custom `.nuspec` file. For example:

```xml
<files>
  <file src="bin\*.dll" target="bin" />
  <file src="Content\*.css" target="Content" />
</files>
```

:::warning
If the `<files>` section exists, OctoPack by default won't attempt to automatically add any extra files to your package, so you'll need to be explicit about which files you want to include. You can override this behavior with `/p:OctoPackEnforceAddingFiles=true` which will instruct OctoPack to package a combination of files using its conventions, and those defined by your `<files>` section.
:::

:::success
See the [NuSpec documentation](http://docs.nuget.org/docs/reference/nuspec-reference) for more examples on how the `<files>` secion of the `.nuspec` file is interpreted by `nuget.exe`.
:::

## Version numbers {#UsingOctoPack-Versionnumbers}

NuGet packages have version numbers. When you use OctoPack, the NuGet package version number will come from (in order of priority):

1. The command line, if you pass `/p:OctoPackPackageVersion=<version>` as an MSBuild parameter when building your project.
2. If the `[assembly: FileVersion]` is the same as the `[assembly: AssemblyInformationalVersion]` (AKA ProductVersion), then we'll use the `[assembly: AssemblyVersion]` attribute in your `AssemblyInfo.cs` file
3. Otherwise we take the `[assembly: AssemblyInformationalVersion]`.

## Adding release notes {#UsingOctoPack-Addingreleasenotes}

NuSpec files can contain release notes, which show up on the Octopus Deploy release page. OctoPack can add these notes to your NuGet package if you pass a path to a file containing the notes. For example:

```powershell
msbuild MySolution.sln /t:Build /p:RunOctoPack=true /p:OctoPackReleaseNotesFile=..\ReleaseNotes.txt
```

Note that the file path should always be relative to the C#/VB project file (not the solution file).

## Replacement tokens {#UsingOctoPack-Replacementtokens}

You can make use of NuGet replacement tokens inside your NuSpec file:

**Sample NuSpec file**

```xml
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>Sample.$suffix$</id>
    <title>$title$</title>
    <version>$version$</version>
    <authors>$myname$</authors>
    <owners>Your name</owners>
    <licenseUrl>http://yourcompany.com</licenseUrl>
    <projectUrl>http://yourcompany.com</projectUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>A sample project</description>
    <releaseNotes>This release contains the following changes...</releaseNotes>
  </metadata>
</package>
```

To set a value for these parameters, use the MSBuild property OctoPackNuGetProperties:

```powershell
msbuild MySolution.sln /t:Build /p:RunOctoPack=true "/p:OctoPackNuGetProperties=suffix=release;title=My Title;version=1.0.0;myname=Paul"
```

## Publishing {#UsingOctoPack-Publishing}

To publish your package to a NuGet feed, you can optionally use some extra MSBuild properties:

- `/p:OctoPackPublishPackageToFileShare=C:\MyPackages` - copies the package to the path given
- `/p:OctoPackPublishPackageToHttp=http://my-nuget-server/api/v2/package` - pushes the package to the NuGet server
- `/p:OctoPackPublishApiKey=ABCDEFGMYAPIKEY` - API key to use when publishing

:::success
**Want to use the Octopus built-in repository?**
Octopus provides a [built-in package repository](/docs/packaging-applications/package-repositories/index.md) for your deployment packages. The Octopus built-in repository is generally the best choice for deployment packages because it offers better performance and most suitable [retention policies](/docs/administration/retention-policies/index.md).

To push your packages to the Octopus built-in repository use the following settings:

- `/p:OctoPackPublishPackageToHttp=http://your.octopusserver.com/nuget/packages` - this is the URL to your Octopus Server noting the `/nuget/packages` path
- `/p:OctoPackPublishApiKey=API-ABCDEFGMYAPIKEY` - the [Octopus API key](/docs/how-to/how-to-create-an-api-key.md) you you want to use for pushing packages noting [these security considerations](/docs/packaging-applications/package-repositories/index.md)

Read more about [pushing packages to the Octopus built-in repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md).
:::

## All supported parameters {#UsingOctoPack-Allsupportedparameters}

In addition to the common arguments above, OctoPack has a number of other parameters. The full list is documented in the table below.

| Parameter                              | Example value                           | Description                              |
| -------------------------------------- | --------------------------------------- | ---------------------------------------- |
| `RunOctoPack`                          | `True`                                  | Set to `True` for OctoPack to run and create packages during the build. Default: OctoPack won't run. |
| `OctoPackPackageVersion`               | `1.0.0`                                 | Version number of the NuGet package. By default, OctoPack gets the version from your assembly version attributes. Set this parameter to use an explicit version number. |
| `OctoPackAppConfigFileOverride`        | `Foo.config`                            | When packaging a project called YourApp, containing a file named `App.config`, OctoPack will automatically ignore it, and instead look for `YourApp.exe.config`. Provide this setting to have OctoPack select your specified config file, instead. |
| `OctoPackAppendToPackageId`            | `Release`                               | A fragment that will be appended to the NuGet package ID, allowing you to create different NuGet packages depending on the build configuration. E.g., if the ID element in the NuSpec is set to "`MyApp`", and this parameter is set to "`Release`", the final package ID will be "`MyApp.Release`". |
| `OctoPackAppendToVersion`              | `beta025`                               | Define a pre-release tag to be appended to the end of your package version. |
| `OctoPackEnforceAddingFiles`           | `True`                                  | By default, when your NuSpec file has a `<files>` element, OctoPack won't automatically add any of the other files that it would usually add to the package. Set this parameter to `true` to force OctoPack to add all the files it would normally add. |
| `OctoPackIgnoreNonRootScripts`         | `True`                                  | Octopus Deploy only calls `Deploy.ps1` files etc., that are at the root of the NuGet package. If your project emits `Deploy.ps1` files that are not at the root, OctoPack will usually warn you when packaging these. Set this parameter to `true` to suppress the warning. |
| `OctoPackIncludeTypeScriptSourceFiles` | `True`                                  | If your project has TypeScript files, OctoPack will usually package the corresponding `.js` file produced by the TypeScript compiler, instead of the `.ts` file. Set this parameter to `true` to force OctoPack to package the `.ts` file instead. |
| `OctoPackNuGetArguments`               | `-NoDefaultExcludes`                    | Use this parameter to specify additional command line parameters that will be passed to `NuGet.exe pack`. See the [NuGet pack command description](http://docs.nuget.org/docs/reference/command-line-reference#Pack_Command). |
| `OctoPackNuGetExePath`                 | `C:\Tools\NuGet.exe`                    | OctoPack comes with a bundled version of `NuGet.exe`. Use this parameter to force OctoPack to use a different `NuGet.exe` instead. |
| `OctoPackNuGetProperties`              | `foo=bar;baz=bing`                      | If you use replacement tokens in your NuSpec file (e.g., `$foo$`, `$bar$`, `$version$`, etc.), this parameter allows you to set the value for those tokens. See the section above on replacement tokens, and see the [NuSpec reference for details on replacement tokens](http://docs.nuget.org/docs/reference/nuspec-reference#Replacement_Tokens). |
| `OctoPackNuGetPushProperties`          | `-Timeout 500`                          | Additional arguments that will be passed to `NuGet.exe push` if you are pushing to an HTTP/HTTPS NuGet repository. See the [NuGet push command description](http://docs.nuget.org/docs/reference/command-line-reference#Push_Command). |
| `OctoPackNuSpecFileName`               | `MyApp.nuspec`                          | The NuSpec file to use. Defaults to `"<C#/VB project name>.nuspec"`. If the file doesn't exist, OctoPack generates a NuSpec based on your project metadata. |
| `OctoPackPublishApiKey`                | `API-ABCDEFGMYAPIKEY`                   | Your API key to use when publishing to a HTTP/HTTPS based NuGet repository |
| `OctoPackPublishPackagesToTeamCity`    | `False`                                 | By default, if OctoPack detects that the build is running under TeamCity, the NuGet package that is produced is registered as an artifact in TeamCity. Use this parameter to suppress this behavior. |
| `OctoPackPublishPackageToFileShare`    | `\\server\packages`                     | OctoPack can publish packages to a file share or local directory after packaging |
| `OctoPackPublishPackageToHttp`         | `http://my-nuget-server/api/v2/package` | OctoPack can publish packages to a HTTP/HTTPS NuGet repository (or the [Octopus built-in repository](/docs/packaging-applications/package-repositories/index.md)) after packaging. |
| `OctoPackReleaseNotesFile`             | `myreleasenotes.txt`                    | Use this parameter to have the package release notes read from a file. |
| `OctoPackProjectName`                  | `YourProjectName`                       | Use this parameter to override the name of your package so its not necessarily identical to your Visual Studio Project. This will only work when building a single Project/Package. For multiple projects you do not use this parameter and instead set the below property on your project's csproj file `<PropertyGroup><OctoPackProjectName>Foo</OctoPackProjectName></PropertyGroup>` |

## Troubleshooting OctoPack {#UsingOctoPack-TroubleshootingOctoPack}

Sometimes OctoPack doesn't work the way you expected it to, or perhaps you are having trouble configuring your `.nuspec` file. Here are some steps to help you diagnose what is going wrong, and fix the problem.

1. Run the build in your local development environment using the Visual Studio developer command prompt using arguments something like this:

```powershell
msbuild MySolution.sln /t:Build /p:Configuration=Release /p:RunOctoPack=true /fl
```
    The `/p:RunOctoPack=true` argument configures OctoPack to run as part of the build process
The `/fl` argument configures `msbuild.exe` to write the output to a log file which will usually look like `msbuild.log`. Refer to the [MSBuild documentation](https://msdn.microsoft.com/en-us/library/ms171470.aspx) for more details.
Note: You may need to change some of these parameters to match the process you are using on your build server. Take a look at the build server logs and try to emulate the process as closely as possible.
2. Inspect the [MSBuild output log file](https://msdn.microsoft.com/en-us/library/ms171470.aspx). If OctoPack has executed successfully you should see log entries like the ones shown below generated using OctoPack 3.0.42:

```powershell
Target "OctoPack" in file "c:\dev\MyApplication\source\packages\OctoPack.3.0.42\tools\OctoPack.targets" from project "c:\dev\MyApplication\source\MyApplication.Web\MyApplication.Web.csproj" (target "Build" depends on it):
Using "GetAssemblyVersionInfo" task from assembly "c:\dev\MyApplication\source\packages\OctoPack.3.0.42\tools\OctoPack.Tasks.dll".
Task "GetAssemblyVersionInfo"
  OctoPack: Get version info from assembly: c:\dev\MyApplication\source\MyApplication.Web\bin\MyApplication.Web.dll
Done executing task "GetAssemblyVersionInfo".
Task "Message"
  Using package version: 0.0.0.0
Done executing task "Message".
Using "CreateOctoPackPackage" task from assembly "c:\dev\MyApplication\source\packages\OctoPack.3.0.42\tools\OctoPack.Tasks.dll".
Task "CreateOctoPackPackage"
  OctoPack: ---Arguments---
  OctoPack: Content files: 12
  OctoPack: ProjectDirectory: c:\dev\MyApplication\source\MyApplication.Web
  OctoPack: OutDir: bin\
  OctoPack: PackageVersion: 0.0.0.0
  OctoPack: ProjectName: MyApplication.Web
  OctoPack: PrimaryOutputAssembly: c:\dev\MyApplication\source\MyApplication.Web\bin\MyApplication.Web.dll
  OctoPack: NugetArguments: 
  OctoPack: NugetProperties: 
  OctoPack: ---------------
  OctoPack: Written files: 299
  OctoPack: Create directory: c:\dev\MyApplication\source\MyApplication.Web\obj\octopacking
  OctoPack: Create directory: c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked
  OctoPack: Copy file: c:\dev\MyApplication\source\MyApplication.Web\MyApplication.Web.nuspec
  OctoPack: Packaging an ASP.NET web application (Web.config detected)
  OctoPack: Add content files
  OctoPack: Added file: content\images\favicon.ico
  OctoPack: Added file: Web.config

...
  OctoPack: Add binary files to the bin folder
  OctoPack: Added file: bin\MyApplication.Web.dll.config
  OctoPack: Added file: bin\MyApplication.Web.dll
  OctoPack: Added file: bin\MyApplication.Web.pdb
 
...
  OctoPack: NuGet.exe path: c:\dev\MyApplication\source\packages\OctoPack.3.0.42\tools\NuGet.exe
  OctoPack: Running NuGet.exe with command line arguments: pack "c:\dev\MyApplication\source\MyApplication.Web\obj\octopacking\MyApplication.Web.nuspec"  -NoPackageAnalysis -BasePath "c:\dev\MyApplication\source\MyApplication.Web" -OutputDirectory "c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked" -Version 0.0.0.0
  OctoPack: Attempting to build package from 'MyApplication.Web.nuspec'.
  OctoPack: Successfully created package 'c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked\MyApplication.Web.0.0.0.0.nupkg'.
  OctoPack: Packaged file: c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked\MyApplication.Web.0.0.0.0.nupkg
  OctoPack: Copy file: c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked\MyApplication.Web.0.0.0.0.nupkg
  OctoPack: Packages have been copied to: c:\dev\MyApplication\source\MyApplication.Web\bin\
  OctoPack: OctoPack successful
Done executing task "CreateOctoPackPackage".
Task "Message"
  Built package: c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked\MyApplication.Web.0.0.0.0.nupkg
Done executing task "Message".
Task "Message"
  NuGet.exe: c:\dev\MyApplication\source\packages\OctoPack.3.0.42\tools\NuGet.exe
Done executing task "Message".
Task "Message"
  Publish to file share: ..\..\artifacts
Done executing task "Message".
Task "Copy"
  Copying file from "c:\dev\MyApplication\source\MyApplication.Web\obj\octopacked\MyApplication.Web.0.0.0.0.nupkg" to "..\..\artifacts\MyApplication.Web.0.0.0.0.nupkg".
Done executing task "Copy".
Task "Message" skipped, due to false condition; ('$(OctoPackPublishPackageToHttp)' != '') was evaluated as ('' != '').
Task "Exec" skipped, due to false condition; ('$(OctoPackPublishPackageToHttp)' != '') was evaluated as ('' != '').
Done building target "OctoPack" in project "MyApplication.Web.csproj".
```

 1. If you cannot see any OctoPack-related log messages, perhaps OctoPack isn't installed into your project(s) correctly?
 2. Try completely uninstalling OctoPack and installing it again
 3. Check inside your `.csproj` or `.vbproj` file for an include statement like the following example:

```powershell
<Import Project="..\packages\OctoPack.3.0.42\tools\OctoPack.targets" Condition="Exists('..\packages\OctoPack.3.0.42\tools\OctoPack.targets')" />
```
 2. If OctoPack is running but your files are not being packed correctly, see if the file is mentioned in the build log.
 3. Files that are copied to the build output directory will be included in the package. Take a look at the contents of your build output directory and compare that with the messages in the build log.
 4. For web applications, files that are configured with the Visual Studio property **Build Action: Content** will be included in the package
 5. If you have specified the `<files>` element in a custom `.nuspec` file, perhaps you need to add the `/p:OctoPackEnforceAddingFiles=true` MSBuild argument as discussed above?
 6. If you have specified the `<files>` element in a custom `.nuspec` file, perhaps you need to experiment with some different combinations of include and exclude?
