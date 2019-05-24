---
title: Manually Creating NuGet Packages
description: Using NuGet to package applications for use in your deployments.
position: 40
---

NuGet packages are basically ZIP files with extra metadata describing the contents of the package. They follow the [Open Packaging Conventions,](http://en.wikipedia.org/wiki/Open_Packaging_Conventions) and use the .nupkg file extension. You can [learn more about NuGet and NuGet Packages](http://docs.nuget.org/docs/start-here/overview) on the official NuGet website.

NuGet is a good choice for packaging your applications, for the following reasons:

1. NuGet packages have rich metadata, such as versioning, release notes, and author information.
2. Many tools exist to make creating and publishing NuGet packages easy.
3. NuGet packages can be consumed via a feed, so other applications can easily query the available packages.

## Creating NuGet Packages {#NuGetpackages-CreatingNuGetpackages}

You can create NuGet packages in a number of ways:

- [Manually using a GUI](#manually-create-nuget-packages).
- Automatically [using NuGet.exe](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference).
- Automatically [using Octo.exe](/docs/packaging-applications/octo.exe.md).
- Automatically [using OctoPack](/docs/packaging-applications/octopack/index.md).

:::success
**Tip: Structure the Package as You Want It Extracted on Disk**
NuGet was designed for packaging libraries to be used in Visual Studio, which is a different usage scenario than that of deploying applications. When creating a library NuGet package, for example, NuGet encourages you to put binaries in a **lib** folder, and content files in the **content** folder. But for Octopus Deploy, this convention doesn't make sense - your ASP.NET application will expect binaries to be in a **bin** folder for example. Instead, just ignore the NuGet package structure conventions, and **simply structure your package exactly like you want it to appear when extracted on disk**.
:::

:::success
**Tip: No Dependencies**
NuGet packages can have dependencies - library A might depend on library B, for example. Again, this works fine for managing libraries in Visual Studio. But when deploying applications, your application will expect library A and library B to be in the same folder as the rest of the binaries needed to run the application. For this reason, **Octopus ignores any NuGet package dependencies**. Instead, simply ensure your package contains all of the binaries needed to run the application, as in the screenshots above.
:::

## Manually Create NuGet Packages {#manually-create-nuget-packages}

The simplest way to create a NuGet package is to create it manually, using the NuGet Package Explorer. This isn't how we recommend creating your packages most of the time (read more about [Octo](/docs/packaging-applications/octo.exe.md)), but it's a good way to get started, or when deploying one-off utilities.

NuGet Package Explorer is an open source desktop application that makes it easy to view and create NuGet packages. You can download it from [NuGet Package Explorer GitHub repository](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer).

This six minute video (with captions) will guide you through the entire process of creating a package manually using NuGet Package Explorer, and then deploying that package to a remote IIS web site.

<iframe src="//fast.wistia.net/embed/iframe/qc0mx7cyto" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360" style="margin: 30px"></iframe>
