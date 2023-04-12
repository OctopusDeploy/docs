---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Troubleshooting OctoPack
description: Troubleshooting NuGet packages and Octopack
navOrder: 30
---

Sometimes OctoPack doesn't work the way you expected it to, or perhaps you are having trouble configuring your `.nuspec` file. Here are some steps to help you diagnose what is going wrong, and fix the problem.

1. Run the build in your local development environment using the Visual Studio developer command prompt using arguments something like this:

  ```powershell
  msbuild MySolution.sln /t:Build /p:Configuration=Release /p:RunOctoPack=true /fl
  ```
  The `/p:RunOctoPack=true` argument configures OctoPack to run as part of the build process
  The `/fl` argument configures `msbuild.exe` to write the output to a log file which will usually look like `msbuild.log`.   Refer to the [MSBuild documentation](https://msdn.microsoft.com/en-us/library/ms171470.aspx) for more details.
  Note: You may need to change some of these parameters to match the process you are using on your build server. Take a look   at the build server logs and try to emulate the process as closely as possible.

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

 * If you cannot see any OctoPack-related log messages, perhaps OctoPack isn't installed into your project(s) correctly?
   * Try completely uninstalling OctoPack and installing it again.
   * Check inside your `.csproj` or `.vbproj` file for an include statement like the following example:

```powershell
<Import Project="..\packages\OctoPack.3.0.42\tools\OctoPack.targets" Condition="Exists('..\packages\OctoPack.3.0.42\tools\OctoPack.targets')" />
```
 * If OctoPack is running but your files are not being packed correctly, see if the file is mentioned in the build log.
   * Files that are copied to the build output directory will be included in the package. Take a look at the contents of your build output directory and compare that with the messages in the build log.
   * For web applications, files that are configured with the Visual Studio property **Build Action: Content** will be included in the package.
   * If you have specified the `<files>` element in a custom `.nuspec` file, perhaps you need to add the `/p:OctoPackEnforceAddingFiles=true` MSBuild argument as discussed above?
   * If you have specified the `<files>` element in a custom `.nuspec` file, perhaps you need to experiment with some different combinations of include and exclude?

## Next

 - [Packaging applications](/docs/packaging-applications/)
 - [Use the Octopus CLI to create packages](/docs/packaging-applications/create-packages/octopus-cli.md)
 - Use [OctoPack to Include BuildEvent files](/docs/packaging-applications/create-packages/octopack/octopack-to-include-buildevent-files.md)
 - [Troubleshooting OctoPack](/docs/packaging-applications/create-packages/octopack/troubleshooting-octopack.md)
 - [Package deployments](/docs/deployments/packages/)
