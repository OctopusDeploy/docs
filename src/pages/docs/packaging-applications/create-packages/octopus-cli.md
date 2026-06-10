---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2025-07-15
title: Create packages with the Octopus CLI
description: Using the Octopus CLI (octopus) command line tool to create packages for deployment.
navOrder: 30
---
<!-- spell-checker:ignore Myatt's, PKWARE, Packagingyourapplicationfromafolder -->
The Octopus CLI (`octopus`) is a command line tool that interacts with the [Octopus Deploy REST API](/docs/octopus-rest-api/) and includes packaging commands to create packages either as [Zip](#create-zip-packages) or [NuGet](#create-nuget-packages) packages for deployment with Octopus.

## Installation

The [Octopus CLI downloads page](https://github.com/OctopusDeploy/cli/blob/main/README.md#installation) provides installation options for various platforms.

After installation, you can run the following to verify the version of the Octopus CLI that was installed (if you're using Windows, remember to open a new command prompt):

```
octopus --version
```

For more installation details, options, and update instructions, see [The Octopus CLI Global Tool](/docs/octopus-rest-api/cli).

For a full list of the `package` command options see [Octopus CLI - Package](/docs/octopus-rest-api/cli/octopus-package) or run the following command:

```powershell
octopus package --help
```

## Usage

The Octopus CLI supports two package formats: NuGet packages and ZIP packages

## Configuration Options

Both NuGet and ZIP packaging commands support the following configuration options:

- **--id**: The ID of the package
- **--version**: The version of the package, must be a valid SemVer
- **--base-path**: Root folder containing the contents to zip
- **--out-folder**: Folder into which the zip file will be written
- **--include**: Add a file pattern to include, relative to the base path e.g. /bin/*.dll; defaults to "**"
- **--verbose**: Verbose output
- **--overwrite**: Allow an existing package file of the same ID/version to be overwritten

Additional NuGet-specific options:
- **--author**: Add author/s to the package metadata
- **--title**: The title of the package
- **--description**: A description of the package, defaults to "A deployment package created from files on disk."
- **--releaseNotes**: Release notes for this version of the package
- **--releaseNotesFile**: A file containing release notes for this version of the package

### Create NuGet packages {#create-nuget-packages}

Basic usage:

```powershell
octopus package nuget create
```

### Create ZIP packages {#create-zip-packages}

Basic usage:

```powershell
octopus package zip create
```

## Packaging a .NET Core application

To package a .NET core application, first publish the application, and then call `octopus package` on the output folder for example:

```powershell
dotnet publish ./OctoWeb.csproj --output ./dist
octopus package zip create --id="OctoWeb" --version="1.0.0" --base-path="./dist"
```

Please refer to [Microsoft's publish and packing](/docs/deployments/dotnet/netcore-webapp/#publishing-and-packing-the-website) documentation for more information.

## Packaging a .NET Core library

If you are using .NET Core for class libraries, we recommend using [dotnet pack from Microsoft](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-pack).

```powershell
dotnet pack ./SomeLibrary.csproj --output ./dist
octopus package zip create --id="SomeLibrary" --version="1.0.0" --base-path="./dist"
```

## Packaging a .NET Framework web application

There are usually some extra steps required to get the resulting application built and deployable. Full framework web applications are a good example of this, where simply building the application will not give you the desired output. We still recommend [Octopack](/docs/packaging-applications/create-packages/octopack) for these cases. However, you may be able to achieve this using msbuild parameters such as:

```
msbuild ./OctoWeb.csproj /p:DeployDefaultTarget=WebPublish /p:DeployOnBuild=true /p:WebPublishMethod=FileSystem /p:SkipInvalidConfigurations=true /p:publishUrl=dist
octopus package zip create --id="OctoWeb" --version="1.0.0-alpha0001" --base-path="./dist"
```

## Packaging your application from a folder

If you have a build process that places all build outputs into a final destination folder (such as gulp, grunt, or webpack), you can package it using the Octopus CLI as well. For example, if you've defined an npm script which runs your build and places all associated content into the `dist` folder:

```powershell
npm run build
octopus package zip create --id="OctoWeb" --version="1.0.0" --base-path="./dist"
```

## Known issues with other compression libraries {#known-issues}

These are known issues to be aware of with other compression libraries:

- Atlassian Bamboo users who are using [Adam Myatt's Zip File Task](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks) and are extracting to a Linux machine may find that the contents don't get extracted into the correct folder structure but instead flattened with the path as the file name. This is the result of a [known issue](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks/issues/4/change-request-use-forward-slashes-as-file) whereby the task does not confirm to the correct [PKWARE ZIP §4.4.17.1](https://help.octopus.com/t/octopus-deploy-to-linux-vm/2047 "Link outside Support: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT") specifications and is using a back slash instead of forward slash as the file separator. We would recommend avoiding this task where possible.
- Prior to the .NET framework 4.6.1, the *System.IO.Compression* library incorrectly preserved the Windows-style back slash separator for file paths. This has since been fixed from [.NET Framework 4.6.1](https://msdn.microsoft.com/en-us/library/mt712573) and the fix carried over into [.NET Core](https://github.com/dotnet/corefx/commit/7b9331e89a795c72709aef38898929e74c343dfb).
- The PKZIP specification requires that Zip files only need to store dates in the internal file headers with two bytes in the [MS-DOS format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html) (whereas tar file headers are stored in [UNIX epoch format](http://www.gnu.org/software/tar/manual/html_node/Standard.html)). This means that unless the compression library makes use of extra fields in the file headers, that a file compressed at some point in time on a machine in one timezone, may result in misleading dates when uncompressed in a different timezone.

## Learn more

 - [Packaging application](/docs/packaging-applications)
 - [Create packages with Octopack](/docs/packaging-applications/create-packages/octopack).
 - [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity).
 - [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension).
 - [Package repositories](/docs/packaging-applications).
 - [Package deployments](/docs/deployments/packages).
