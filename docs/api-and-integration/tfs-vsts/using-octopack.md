---
title: Using Octopack and Octo.exe with XAML-based builds in TFS
description: Using Octopack
position: 1
---

!toc

## Packaging applications when building with Team Build (XAML-based builds) {#Packaging}

When Team Build builds your solution, you will need to package your applications ready to be deployed. This can be done by [installing OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md) on the projects that you plan to deploy.

When defining your build definition, you can expand the **Advanced** properties to specify custom arguments for MSBuild. At a minimum, you'll need to pass:

```
/p:RunOctoPack=true
```

![](/docs/images/3048175/3278177.png)

:::success
**OctoPack**
There are plenty of other properties that you can pass here. For example, you can tell OctoPack to publish the resulting packages to a file share or another NuGet repository. See the "Publishing a new package to Octopus" section below, or [Learn more in the section on OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
:::

Publishing a new package to Octopus

In most cases, you'll want to push your newly-created package to the built-in Octopus Deploy NuGet repository. To do this, you can use two additional MSBuild arguments to tell OctoPack to publish the package(s).

```
/p:OctoPackPublishPackageToHttp=http://my-octopus-server/nuget/packages
```

```
/p:OctoPackPublishApiKey=API-ABCDEFGMYAPIKEY
```

![](/docs/images/3048175/3278173.png)

:::success
**Built-in Nuget and API keys**
To find your Octopus NuGet repository URL, see the [Package repositories](/docs/packaging-applications/package-repositories/index.md) section.

To create an API key, see the [How to create an API key](/docs/how-to/how-to-create-an-api-key.md) section.
:::

## Deploying automatically after a build {#Deployingautomaticallyafterabuild}

### Using Octo.exe (recommended) {#Deployingautomaticallyafterabuild-Using-OctoExe}

`Octo.exe` is a command line tool built on top of our REST API. Its fairly easy to hook up into almost any process from a simple script. In the case of old XAML-based builds, we recommend user to include a call to `Octo.exe` in the *post-deploy script* of their build definition, so it gets called after MSBuild ran and Octopack created the package and pushed it to the repository.

`Octo.exe` has [plenty of commands](\docs\api-and-integration\octo.exe-command-line\index.md), but the ones you should look into for the post-deploy script are:

- [Create-Release](\docs\api-and-integration\octo.exe-command-line\creating-releases.md) to create a release in Octopus. 
- [Deploy-Release](\docs\api-and-integration\octo.exe-command-line\deploying-releases.md) to deploy the previously created release.

### Using Lifecycles and automatic deployments {#Deployingautomaticallyafterabuild-Using-AutomaticDeployments}

Version 2.6 of Octopus Deploy introduced [Lifecycles ](/docs/deployment-process/projects/lifecycles/index.md)and [Automatic Release Creation](/docs/deployment-process/steps/automatic-release-creation.md). You can use these two features to automatically deploy to one or more environments when a new package is pushed to the built-in NuGet repository.

First, turn on Automatic Release Creation to create a new release when your package is pushed. Then, using the project Lifecycle configure one or more environments in your first phase to deploy automatically when a new release is available.

By adding these features to the steps above, you can set up complete end-to-end continuous integration:

1. OctoPack will create new NuGet packages for your projects
2. OctoPack will push those packages to the built-in NuGet repository
3. Automatic Release Creation will create a new Release
4. Your Lifecycle will trigger a deployment when the release is created

## Video Walkthrough {#VideoWalkthrough}

This 6 minute video walks through the above steps to create an end-to-end continuous deployment process for Team Foundation Server.

:::Info
While the video was recorded using Octopus `2.6`, it is still valid for Octopus 3.X.
:::

<iframe src="//fast.wistia.net/embed/iframe/jmnuxifuyo" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="640" height="360" style="margin: 30px"></iframe>
