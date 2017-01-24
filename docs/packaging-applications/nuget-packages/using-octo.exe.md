---
title: Using Octo.exe

---


If you don't want to (or can't) add [OctoPack](/docs/packaging-applications/nuget-packages/using-octopack/index.md) to your Visual Studio project, or you have a project that doesn't use Visual Studio then packaging your applications into a NuGet package would involve using NuGet.exe, together with a manifest file (.nuspec file), to create your packages.


There is, however, another way that you can create a NuGet package from just a folder of files and subdirectories. **Octo.exe** is our API command line tool that allows you to interact with your Octopus Deploy server using different **commands**, but, it also has a, not so known command, the **pack** command. The [Octo.exe Command Line](/docs/api-and-integration/octo.exe-command-line/index.md) page will show you how to get the API command line tool installed and ready to use.


The **pack** command turns any folder into a NuGet or Zip package - plain and simple!

## Packaging your application from a folder {#UsingOcto.exe-Packagingyourapplicationfromafolder}

:::hint
In Octo.exe version 3.3.8 we have expanded the functionality of the `pack` command to allow creating **zip** packages in addition to **NuGet** packages. [Learn more](/docs/packaging-applications/creating-zip-packages.md).
:::





For the purposes of this page, I have created an ASP.NET web site called OctoWeb, and when built the output folder contains all the files required to run my web site.


![](/docs/images/3048097/3277798.png "width=500")


To create a NuGet package of the application, open a command prompt and change directory to where the application is located.

```powershell
C:\>cd Code\OctoWeb\OctoWeb\OctoWeb\bin
```


When creating the NuGet package, we will call octo.exe with the pack command and give it a package Id

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin>octo.exe pack --id=OctoWeb
```


By default octo.exe will pack all the files that are in the current directory, and give it a timestamp based version number.

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> octo.exe pack --id=OctoWeb
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Packing OctoWeb version 2016.3.9.123003...
Saving OctoWeb.2016.3.9.123003.nupkg to C:\Code\OctoWeb\OctoWeb\OctoWeb\bin...
Done.
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dir *.nupkg


    Directory: C:\Code\OctoWeb\OctoWeb\OctoWeb\bin


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---         9/03/2016  12:30 PM   43628908 OctoWeb.2016.3.9.123003.nupkg

```


If you want to provide your own version, you can pass the --version parameter in the call to Octo.exe

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> octo.exe pack --id=OctoWeb --version=1.0.0.0
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Packing OctoWeb version 1.0.0.0...
Saving OctoWeb.1.0.0.0.nupkg to C:\Code\OctoWeb\OctoWeb\OctoWeb\bin...
Done.
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dir *.nupkg


    Directory: C:\Code\OctoWeb\OctoWeb\OctoWeb\bin


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---         9/03/2016  12:30 PM   43628908 OctoWeb.1.0.0.0.nupkg
```


Open the created NuGet package in NuGet Package Explorer and you should see the package contains all the same files as the output folder of your build


![](/docs/images/3048097/3277797.png "width=500")

## Usage {#UsingOcto.exe-Usage}


The Octo.exe pack command provides a number of other useful parameters that can be used to customize the way your package gets created, such as output folder, files to include and release notes.


To get help with what parameters allow you to do what, display the usage help for the pack command

```powershell
C:\> Octo.exe help pack
```


Which will explain how to use the command and the different parameters that can be passed to the command

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
