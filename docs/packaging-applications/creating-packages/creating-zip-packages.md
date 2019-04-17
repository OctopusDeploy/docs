---
title: Creating ZIP Packages With Octo.exe
description: Using the octo.exe command line tool to create ZIP packages is fast and easy.
position: 2
---

In **Octo 3.3.8** we have expanded the functionality of the `pack` command to allow creating **zip** packages in addition to **NuGet** packages. All examples on this page assumes
that you have installed octo as a global tool using dotnet core which makes octo available as a command via the dotnet cli. This is our preferred method for installing and working with Octo. You can
refer to [Octo Command Line Documentation](/docs/api-and-integration/octo.exe-command-line/index.md) for other methods to install Octo.

This page describes how to use `Octo` to create **zip** packages. You could use any zip program or library, but **octo pack** will:

- Help you get the filename format correct.
- Ensure file timestamps are retained when extracting which helps with some forms of content delivery networks (CDN) and caching.
- Ensure [delta compression for package transfers](/docs/deployment-examples/package-deployments/delta-compression-for-package-transfers.md) works as expected.
- Avoid [known issues with other compression libraries](/docs/packaging-applications/creating-packages/known-issues-with-other-compression-libraries.md].

To create a zip package of the application, open a command prompt and change directory to where the application is located.

```powershell
C:\>cd Code\OctoWeb\OctoWeb\OctoWeb\bin
```

When creating the zip package, we will call octo with the pack command and give it a package ID and specify the format of package we want to use by adding the `--format` option:

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin>dotnet octo pack --id=OctoWeb --format=zip
```

By default octo will pack all the files that are in the current directory, and give it a timestamp based version number.

```powershell
C:\Code\OctoWeb\OctoWeb\OctoWeb\bin> dotnet octo pack --id=OctoWeb --format=zip
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

If you want to provide your own version, you can pass the --version parameter in the call to Octo:

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

## Usage {#CreatingZIPpackages-Usage}

The Octo pack command provides a number of other useful parameters that can be used to customize the way your package gets created, such as output folder, files to include and release notes.

For a full list of the pack command options see [Octo.exe Command Line Pack](/docs/api-and-integration/octo.exxe-command-line/pack.md) or run the following command:

```powershell
C:\> dotnet octo help pack
```
