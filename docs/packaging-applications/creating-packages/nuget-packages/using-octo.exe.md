---
title: Using Octo.exe
description: Packaging applications using the octo.exe command line tool for use in your deployments.
---

!toc

Octo.exe is the preferred method when packaging .NET Core applications or applications which generally don't use Visual Studio. Octo can also be used with full .NET framework applications if you require more flexibility than what [OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md) provides. There are other ways to create packages which do not involve our tooling such as using NuGet.exe together with a manifest file (.nuspec file).

 **Octo.exe** is our API command line tool that allows you to interact with your Octopus Deploy server using different **commands**, one of which is the **pack** command which can turn any ordinary folder into a NuGet or Zip package - plain and simple. The [Octo.exe Command Line](/docs/api-and-integration/octo.exe-command-line/index.md) page will show you how to get the API command line tool installed and ready to use.

In **Octo.exe version 3.3.8** we have expanded the functionality of the `pack` command to allow creating **zip** packages in addition to **NuGet** packages. [Learn more](/docs/packaging-applications/creating-packages/creating-zip-packages.md).

## Octo Basic Usage
At a minimum `octo pack` requires an id to be provided:

```powershell
octo pack --id="MyPackage"
```
The above command will generate a package in the current working directory and provide a timestamp based
version number such as `2018.6.26.190140.nupkg`.

If you want to provide your own version, you can pass the --version parameter in the call to Octo
```powershell
octo pack --id="MyPackage" --version="1.0.0"
```
You can also change the output directory and folder which will be packed with the `--outFolder` and `--basePath` parameters respectively.
```powershell
octo pack --id="MyPackage" --version="1.0.0" --basePath="folder/to/pack" --outFolder="destination/folder/path"
```

## Packaging a .NET Core application
The process for packaging a .NET core applications is pretty straightforward and can usually be achieved by publishing the application and then using `octo pack` on the resultant output folder for example:

```powershell
dotnet publish ./OctoWeb.csproj --output ./dist
octo pack ./dist --id="OctoWeb" --version="1.0.0"
```
:::hint
**Dotnet Core Publish vs Octopack**
dotnet publish performs a lot of the heavy lifting that Octopack used to provide and therefore removes much of the need for it in .NET Core.
:::

Please refer to [Microsoft's publish and packing](/docs/deployment-examples/deploying-asp.net-core-web-applications/index.md#DeployoingASP.NETCoreWebApplications-PublishingandPackingtheWebsite) documentation for more information.

## Packaging a .NET Core Library
If you are using .NET Core for class libraries, we recommend using [dotnet pack from Microsoft](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-pack).

```powershell
dotnet pack ./SomeLibrary.csproj --output ./dist
octo pack ./dist --id="SomeLibrary" --version="1.0.0"
```

## Packaging a .NET Framework Web application
There are usually some extra steps required to get the resulting application built and deployable. Full framework web applications are a good example of this, where simply building the application will not give you the desired output. We still recommend [Octopack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md) for these cases. However, you may be able to achieve this using msbuild parameters such as:
```
msbuild ./OctoWeb.csproj /p:DeployDefaultTarget=WebPublish /p:DeployOnBuild=true /p:WebPublishMethod=FileSystem /p:SkipInvalidConfigurations=true /p:publishUrl=dist
octo pack ./dist --id="OctoWeb" --version="1.0.0-alpha0001"
```

## Packaging Your Application From a Folder {#UsingOcto.exe-Packagingyourapplicationfromafolder}
If you have a build process which places all build outputs into a final destination folder (such as gulp, grunt or webpack), you can package it using octo as well. For example, let's assume you have defined an npm script which runs your build and places all associated content into the `dist` folder:
```powershell
npm run build
octo pack ./dist --id="SomeApplication" --version="1.0.0"
```
## Usage {#UsingOcto.exe-Usage}

The Octo.exe pack command provides a number of other useful parameters that can be used to customize the way your package gets created such as including release notes.

You can get help with the pack command parameters by executing the pack command with `--help` switch
```powershell
C:\> Octo.exe pack --help
```

The output will explain how to use the command and the different parameters that can be passed to the command

```powershell
C:\> Octo.exe help pack
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Usage: Octo pack [<options>]

Where [<options>] is any of:

Basic options:

      --id=VALUE             The ID of the package; e.g. MyCompany.MyApp
      --format=VALUE         Package format. Options are: NuPkg, Zip.
                             Defaults to NuPkg, though we recommend Zip going
                             forward.
      --version=VALUE        [Optional] The version of the package; must be a
                             valid SemVer; defaults to a timestamp-based
                             version
      --outFolder=VALUE      [Optional] The folder into which the generated
                             NUPKG file will be written; defaults to '.'
      --basePath=VALUE       [Optional] The root folder containing files and
                             folders to pack; defaults to '.'
      --verbose              [Optional] List more detailed output.
                               e.g. Which files are being added.

NuGet packages:

      --author=VALUE         [Optional, Multiple] Add an author to the
                             package metadata; defaults to the current user
      --title=VALUE          [Optional] The title of the package
      --description=VALUE    [Optional] A description of the package;
                             defaults to a generic description
      --releaseNotes=VALUE   [Optional] Release notes for this version of the
                             package
      --releaseNotesFile=VALUE
                             [Optional] A file containing release notes for
                             this version of the package

Advanced options:

      --include=VALUE        [Optional, Multiple] Add a file pattern to
                             include, relative to the base path e.g. /bin/-
                             *.dll - if none are specified, defaults to **
      --overwrite            [Optional] Allow an existing package file of the
                             same ID/version to be overwritten
```
