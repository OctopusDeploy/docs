---
title: Creating ZIP Packages
description: Using the octo.exe command line tool to create ZIP packages is fast and easy.
position: 2
---

In **Octo.exe version 3.3.8** we have expanded the functionality of the `pack` command to allow creating **zip** packages in addition to **NuGet** packages.

This page describes how to use `octo.exe` to create **zip** packages. You could use any zip program or library, but **octo.exe pack** will:

- help you get the filename format correct.
- ensure file timestamps are retained when extracting which helps with some forms of content delivery networks (CDN) and caching.
- ensure [delta compression for package transfers](/docs/deployment-process/steps/deploying-packages/delta-compression-for-package-transfers.md) works as expected.
- Avoid [known issues](/docs/packaging-applications/creating-packages/creating-zip-packages.md) with other compression libraries.

To create a zip package of the application, open a command prompt and change directory to where the application is located.

```powershell
C:\>cd Code\OctoWeb\OctoWeb\OctoWeb\bin
```

When creating the zip package, we will call octo.exe with the pack command and give it a package Id and specify the format of package we want to use by adding the `--format` option

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin>octo.exe pack --id=OctoWeb --format=zip
```

By default octo.exe will pack all the files that are in the current directory, and give it a timestamp based version number.

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> octo.exe pack --id=OctoWeb --format=zip
Octopus Deploy Command Line Tool, version 3.3.8+Branch.master.Sha.f8a34fc6097785d7d382ddfaa9a7f009f29bc5fb

Packing OctoWeb version 2016.3.9.123003...
Saving OctoWeb.2016.3.9.123003.zip to C:\Code\OctoWeb\OctoWeb\OctoWeb\bin...
Done.
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dir *.zip

    Directory: C:\Code\OctoWeb\OctoWeb\OctoWeb\bin

Mode                LastWriteTime     Length Name
----                -------------     ------ ----
-a---         9/03/2016  12:31 PM   43624075 OctoWeb.2016.3.9.123122.zip

```

If you want to provide your own version, you can pass the --version parameter in the call to Octo.exe

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> octo.exe pack --id=OctoWeb --version=1.0.0.0 --format=zip
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

Open the created zip package and you should see the package contains all the same files as the output folder of your build

## Usage {#CreatingZIPpackages-Usage}

The Octo.exe pack command provides a number of other useful parameters that can be used to customize the way your package gets created, such as output folder, files to include and release notes.

To get help with what parameters allow you to do what, display the usage help for the pack command

```powershell
C:\>Octo.exe help pack
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

## Known Issues in Other Packaging Libraries {#CreatingZIPpackages-KnownIssuesinotherpackaginglibrariesknownissues}

- Atlassian Bamboo users who are using [Adam Myatt's  Zip File Task](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks) and are extracting to a Linux machine may find that the contents don't get extracted into the correct folder structure but instead flattened with the path as the file name. This is the result of a [known issue](https://bitbucket.org/adammyatt/bamboo-zip-file-tasks/issues/4/change-request-use-forward-slashes-as-file) whereby the task does not confirm to the correct [PKWARE ZIP §4.4.17.1](http://help.octopusdeploy.com/discussions/problems/48081/r?go=aHR0cHM6Ly9wa3dhcmUuY2FjaGVmbHkubmV0L3dlYmRvY3MvY2FzZXN0dWRpZXMvQVBQTk9URS5UWFQ= "Link outside Support: https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT") specifications and is using a back slash instead of forward slash as the file separator. We would recommend avoiding this task where possible.
- Prior to the .NET framework 4.6.1, the *System.IO.Compression* library incorrectly preserved the windows-style back slash separator for file paths. This has since been fixed from [.NET Framework 4.6.1](https://msdn.microsoft.com/en-us/library/mt712573) and the fix carried over into [.NET Core](https://github.com/dotnet/corefx/commit/7b9331e89a795c72709aef38898929e74c343dfb).
- The above *System.IO.Compression bug* found its way into [Octo.exe](https://github.com/OctopusDeploy/Issues/issues/2583) when support for zip compression was added. A fix was not included until release 3.3.18 of Octo.exe to manually convert a back slash the to forward slash.
- The PKZIP specification requires that Zip files only need to store dates in the internal file headers with two bytes in the [MS-DOS format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html) (whereas tar file headers are stored in [UNIX epoch format](http://www.gnu.org/software/tar/manual/html_node/Standard.html)). This means that unless the compression library makes use of extra fields in the file headers, that a file compressed at some point in time on a machine in one timezone, may result in misleading dates when uncompressed in a different timezone.
