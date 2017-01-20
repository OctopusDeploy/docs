---
title: NuGet packages
position: 2
---


:::hint
**NuGet packages**
NuGet packages are basically ZIP files with extra metadata describing the contents of the package. They follow the [Open Packaging Conventions,](http://en.wikipedia.org/wiki/Open_Packaging_Conventions) and use the .nupkg file extension. You can [learn more about NuGet and NuGet Packages](http://docs.nuget.org/docs/start-here/overview) on the official NuGet website.
:::





NuGet is a good choice for packaging your applications, for the following reasons:

1. NuGet packages have rich metadata, such as versioning, release notes, and author information
2. Many tools exist to make creating and publishing NuGet packages easy
3. NuGet packages can be consumed via a feed, so other applications can easily query the available packages
4. Developer familiarity


## Creating NuGet packages


You can create NuGet packages in a number of ways:

- [Manually using a GUI](http://docs.octopusdeploy.com/display/OD/Manually)
- Automatically [using OctoPack](http://docs.octopusdeploy.com/display/OD/Using+OctoPack)
- Automatically [using NuGet.exe](http://docs.octopusdeploy.com/display/OD/Using+NuGet.exe)





:::success
**Tip: Structure the package as you want it extracted on disk**
NuGet was designed for packaging libraries to be used in Visual Studio, which is a different usage scenario than that of deploying applications. When creating a library NuGet package, for example, NuGet encourages you to put binaries in a **lib** folder, and content files in the **content** folder. But for Octopus Deploy, this convention doesn't make sense - your ASP.NET application will expect binaries to be in a **bin** folder for example. Instead, just ignore the NuGet package structure conventions, and **simply structure your package exactly like you want it to appear when extracted on disk**.
:::

:::success
**Tip: No dependencies**
NuGet packages can have dependencies - library A might depend on library B, for example. Again, this works fine for managing libraries in Visual Studio. But when deploying applications, your application will expect library A and library B to be in the same folder as the rest of the binaries needed to run the application. For this reason, **Octopus ignores any NuGet package dependencies**. Instead, simply ensure your package contains all of the binaries needed to run the application, as in the screenshots above.
:::
