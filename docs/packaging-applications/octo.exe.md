---
title: Create packages with Octo.exe
description: Using the octo.exe command line tool to create packages for deployment.
position: 20
---

**Octo.exe** is a command line tool that interacts with the [Octopus Deploy REST API](/docs/api-and-integration/api/index.md) and includes a `pack` command to create packages either as [Zip](#create-zip-packages) or [NuGet](#create-nuget-packages) packages for deployment with Octopus. You can [learn more about NuGet and NuGet Packages](http://docs.nuget.org/docs/start-here/overview) on the official NuGet website.

## Installation

We recommend installing Octo as a global tool using .NET Core which makes Octo available as a command via the .NET CLI.

If you have the .NET Core `2.1.300` SDK available you can install Octo onto a machine or build agent as a global tool with the following command:

```bash
dotnet tool install Octopus.DotNet.Cli --global
```

For more installation details, options, and update instructions, see [Octo Command Line Global Tool](/docs/api-and-integration/octo.exe-command-line/install-global-tool.md).

## Usage

At a minimum `octo pack` requires an ID to be provided:

```powershell
dotnet octo pack --id="OctoWeb"
```
The above command will generate a package in the current working directory and provide a timestamp based version number such as `2018.6.26.190140.nupkg`.

If you want to provide your own version, you can pass the `--version` parameter in the call to Octo:

```powershell
dotnet octo pack --id="OctoWeb" --version="1.0.0"
```

You can also change the output directory and folder which will be packed with the `--outFolder` and `--basePath` parameters respectively.

```powershell
dotnet octo pack --id="OctoWeb" --version="1.0.0" --basePath="folder/to/pack" --outFolder="destination/folder/path"
```

You specify the format of package we want to use with the `--format` parameter:

```powershell
dotnet octo pack --id="OctoWeb" --version="1.0.0" --format=zip
```

For a full list of the `pack` command options see [Octo.exe Command Line Pack](/docs/api-and-integration/octo.exe-command-line/pack.md) or run the following command:

```powershell
C:\> dotnet octo help pack
```

## Creating Zip Packages {#create-zip-packages}

You can use any zip program or library to create your packages, however, using Octo will:

- Help you get the filename format correct.
- Ensure file timestamps are retained when extracting which helps with some forms of content delivery networks (CDN) and caching.
- Ensure [delta compression for package transfers](/docs/deployment-examples/package-deployments/delta-compression-for-package-transfers.md) works as expected.
- Avoid [known issues with other compression libraries](#known-issues).

To create a zip package of the application, open a command prompt and change into the directory where the application is located:

```powershell
C:\>cd Code\OctoWeb\OctoWeb\OctoWeb\bin
```

Call Octo with the `pack` command, provide a package ID, specify the format, and any other parameters you want to use:

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dotnet octo pack --id=OctoWeb --version=1.0.0.0 --format=zip
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Packing OctoWeb version 1.0.0.0...
Saving OctoWeb.1.0.0.0.zip to C:\Code\OctoWeb\OctoWeb\OctoWeb\bin...
Done.
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dir *.1.0.0.0.zip

    Directory: C:\Code\OctoWeb\OctoWeb\OctoWeb\bin

Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---         9/03/2016  12:31 PM   43624075 OctoWeb.1.0.0.0.zip
```

Open the created zip package and you should see the package contains all the same files as the output folder of your build.

See also, [known issues with other compression libraries](#known-issues).

## Packaging a .NET Core application

To package a .NET core application, first publish the application, and then call `octo pack` on the output folder for example:

```powershell
dotnet publish ./OctoWeb.csproj --output ./dist
dotnet octo pack ./dist --id="OctoWeb" --version="1.0.0"
```

Please refer to [Microsoft's publish and packing](/docs/deployment-examples/asp.net-core-web-application-deployments/index.md#DeployoingASP.NETCoreWebApplications-PublishingandPackingtheWebsite) documentation for more information.

## Packaging a .NET Core Library

If you are using .NET Core for class libraries, we recommend using [dotnet pack from Microsoft](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-pack).

```powershell
dotnet pack ./SomeLibrary.csproj --output ./dist
dotnet octo pack ./dist --id="SomeLibrary" --version="1.0.0"
```

## Packaging a .NET Framework Web application

There are usually some extra steps required to get the resulting application built and deployable. Full framework web applications are a good example of this, where simply building the application will not give you the desired output. We still recommend [Octopack](/docs/packaging-applications/octopack/index.md) for these cases. However, you may be able to achieve this using msbuild parameters such as:
```
msbuild ./OctoWeb.csproj /p:DeployDefaultTarget=WebPublish /p:DeployOnBuild=true /p:WebPublishMethod=FileSystem /p:SkipInvalidConfigurations=true /p:publishUrl=dist
dotnet octo pack ./dist --id="OctoWeb" --version="1.0.0-alpha0001"
```

## Packaging Your Application From a Folder {#UsingOcto.exe-Packagingyourapplicationfromafolder}

If you have a build process which places all build outputs into a final destination folder (such as gulp, grunt or webpack), you can package it using octo as well. For example, let's assume you have defined an npm script which runs your build and places all associated content into the `dist` folder:

```powershell
npm run build
dotnet octo pack ./dist --id="OctoWeb" --version="1.0.0"
```

## Known Issues with Other Compression Libraries {#known-issues}

These are known issues to be aware of with other compression libraries:

- Atlassian Bamboo users who are using [Adam Myatt's  Zip File Task](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks) and are extracting to a Linux machine may find that the contents don't get extracted into the correct folder structure but instead flattened with the path as the file name. This is the result of a [known issue](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks/issues/4/change-request-use-forward-slashes-as-file) whereby the task does not confirm to the correct [PKWARE ZIP §4.4.17.1](http://help.octopus.com/discussions/problems/48081/r?go=aHR0cHM6Ly9wa3dhcmUuY2FjaGVmbHkubmV0L3dlYmRvY3MvY2FzZXN0dWRpZXMvQVBQTk9URS5UWFQ= "Link outside Support: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT") specifications and is using a back slash instead of forward slash as the file separator. We would recommend avoiding this task where possible.
- Prior to the .NET framework 4.6.1, the *System.IO.Compression* library incorrectly preserved the windows-style back slash separator for file paths. This has since been fixed from [.NET Framework 4.6.1](https://msdn.microsoft.com/en-us/library/mt712573) and the fix carried over into [.NET Core](https://github.com/dotnet/corefx/commit/7b9331e89a795c72709aef38898929e74c343dfb).
- The above *System.IO.Compression bug* found its way into [Octo.exe](https://github.com/OctopusDeploy/Issues/issues/2583) when support for zip compression was added. A fix was not included until release 3.3.18 of Octo.exe to manually convert a back slash the to forward slash.
- The PKZIP specification requires that Zip files only need to store dates in the internal file headers with two bytes in the [MS-DOS format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html) (whereas tar file headers are stored in [UNIX epoch format](http://www.gnu.org/software/tar/manual/html_node/Standard.html)). This means that unless the compression library makes use of extra fields in the file headers, that a file compressed at some point in time on a machine in one timezone, may result in misleading dates when uncompressed in a different timezone.
