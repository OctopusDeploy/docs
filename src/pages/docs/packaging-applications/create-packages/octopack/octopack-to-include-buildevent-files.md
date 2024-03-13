---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Include BuildEvent files
description: Using OctoPack when you have a PostBuild event in Visual Studio and want to include files that are not specifically part of your build.
navOrder: 10
---

This page gives an example of extending OctoPack for when you have a PostBuild event in Visual Studio and want to include files that are not specifically part of your build, such as files that have been moved using Xcopy.

This example demonstrates the use of a PostBuild event in Visual Studio and the OctoPack option `OctoPackEnforceAddingFiles`.

I created a Post-Build Event using the Visual Studio Build Events feature. It uses Xcopy to move files from a path to my solution:

:::figure
![Post-build event](/docs/packaging-applications/create-packages/octopack/images/post-build-event.png)
:::

However, when I use OctoPack to package my solution on build my moved files are not included in the build:

:::figure
![Sample package without files](/docs/packaging-applications/create-packages/octopack/images/sample-package-without-files.png)
:::

This is resolved by creating a NuSpec file, and creating a files tag to tell OctoPack to take my moved files, and put them inside a folder called `bin\test` in the package:

:::figure
![](/docs/packaging-applications/create-packages/octopack/images/nuspec-file.png)
:::

It is important to note here that for OctoPack to find and use a NuSpec file, it must be named the same as your project as seen above. For instance, in our example, the project is called `OctoFX.TradingWebsite` so our NuSpec file must be called `OctoFx.TragingWebsite.nuspec`.

To ensure I don't just get the files defined within the NeSpec file, I add `/p:OctoPackEnforceAddingFiles=true`, to tell OctoPack to also add the files it would normally add while building as well as those targeted by my files tag in the NuSpec file.

```powershell
F:\Workspace\OctoFX\source>msbuild OctoFX.sln /t:Build /p:RunOctoPack=true /p:OctoPackPackageVersion=1.0.0.7 /p:OctoPackEnforceAddingFiles=true
```

Now my test folder and files, as well as my build files, are included in the package.

## Next

 - [Packaging applications](/docs/packaging-applications)
 - [Use the Octopus CLI to create packages](/docs/packaging-applications/create-packages/octopus-cli)
 - [Troubleshooting OctoPack](/docs/packaging-applications/create-packages/octopack/troubleshooting-octopack)
 - [Package deployments](/docs/deployments/packages)
