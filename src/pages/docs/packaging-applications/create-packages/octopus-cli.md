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

For a full list of the `pack` command options see [Octopus CLI - Package](/docs/octopus-rest-api/cli/octopus-package) or run the following command:

```powershell
octopus package --help
```

## Usage

The Octopus CLI supports two package formats: NuGet packages and ZIP packages

### Create NuGet packages {#create-nuget-packages}

At a minimum, `octopus package nuget create` requires an ID:

```powershell
octopus package nuget create --id="OctoWeb"
```

The above command will generate a NuGet package in the current working directory with a time-stamp based version number such as:

> `OctoWeb.2018.6.26.190140.nupkg`.

If you want to provide your own version, you can pass the `--version` parameter:

```powershell
octopus package nuget create --id="OctoWeb" --version="1.0.0"
```

When you run this command, you'll be prompted for additional configuration options:

```
? Base Path .
? Out Folder .
? Include patterns
? Verbose Yes
? Overwrite Yes
? Author (leave blank to continue)
```

Here's what each configuration does:

- **Base Path**: Root folder containing the contents to package (defaults to current directory)
- **Out Folder**: Folder where the package file will be written (defaults to current directory)
- **Include patterns**: File patterns to include, relative to base path (defaults to "**" for all files)
- **Verbose**: Enable verbose output during packaging
- **Overwrite**: Allow overwriting an existing package file with the same ID/version
- **Author**: Add author metadata to the package (optional)

You can accept the defaults by pressing Enter, or provide your own values. This will create:

> `OctoWeb.1.0.0.nupkg`

You can also change the output directory with the `--out-folder` parameter, and the folder which will be packed with the `--base-path` parameter:

```powershell
octopus package nuget create --id="OctoWeb" --version="1.0.0" --base-path="folder/to/pack" --out-folder="destination/folder/path"
```


### Create ZIP packages {#create-zip-packages}

At a minimum, `octopus package zip create` requires an ID:

```powershell
octopus package zip create --id="OctoWeb"
```

The above command will generate a ZIP package in the current working directory with a time-stamp based version number such as:

> `OctoWeb.2018.6.26.190140.zip`

If you want to provide your own version, you can pass the `--version` parameter:

```powershell
octopus package zip create --id="OctoWeb" --version="1.0.0"
```

When you run this command, you'll be prompted for additional configuration options:

```
? Base Path .
? Out Folder .
? Include patterns
? Verbose Yes
? Overwrite Yes
? Author (leave blank to continue)
```

Here's what each configuration does:

- **Base Path**: Root folder containing the contents to zip (defaults to current directory)
- **Out Folder**: Folder where the zip file will be written (defaults to current directory)
- **Include patterns**: File patterns to include, relative to base path (defaults to "**" for all files)
- **Verbose**: Enable verbose output during packaging
- **Overwrite**: Allow overwriting an existing package file with the same ID/version
- **Author**: Add author metadata to the package (optional)

You can accept the defaults by pressing Enter, or provide your own values. This will create:

> `OctoWeb.1.0.0.zip`

You can also change the output directory with the `--out-folder` parameter, and the folder which will be packed with the `--base-path` parameter:

```powershell
octopus package zip create --id="OctoWeb" --version="1.0.0" --base-path="folder/to/pack" --out-folder="destination/folder/path"
```

This will create a zip package that contains the same files as the output folder of your build.

See also, [known issues with other compression libraries](#known-issues).

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
- Prior to the .NET framework 4.6.1, the *System.IO.Compression* library incorrectly preserved the windows-style back slash separator for file paths. This has since been fixed from [.NET Framework 4.6.1](https://msdn.microsoft.com/en-us/library/mt712573) and the fix carried over into [.NET Core](https://github.com/dotnet/corefx/commit/7b9331e89a795c72709aef38898929e74c343dfb).
- The PKZIP specification requires that Zip files only need to store dates in the internal file headers with two bytes in the [MS-DOS format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html) (whereas tar file headers are stored in [UNIX epoch format](http://www.gnu.org/software/tar/manual/html_node/Standard.html)). This means that unless the compression library makes use of extra fields in the file headers, that a file compressed at some point in time on a machine in one timezone, may result in misleading dates when uncompressed in a different timezone.

## Learn more

 - [Packaging application](/docs/packaging-applications)
 - [Create packages with Octopack](/docs/packaging-applications/create-packages/octopack).
 - [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity).
 - [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension).
 - [Package repositories](/docs/packaging-applications).
 - [Package deployments](/docs/deployments/packages).
