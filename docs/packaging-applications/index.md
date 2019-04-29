---
title: Packaging Applications
description: Packaging applications for deployment with Octopus Deploy.
position: 40
hideInThisSection: true
---

Deploying software with Octopus often involves deploying packages. This section explains how to package your applications for deployment with Octopus.

Before you can deploy a package you need to:

1. Give your package a [package ID](#package-id).
1. Choose and apply a [versioning scheme](#version-numbers).
1. Create the package in a [supported format](#supported-formats).
1. Host the package in a [package repository](/docs/packaging-applications/package-repositories/index.md), for instance, the Octopus [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md).

## Example Package

This is a simple example of a package that can be deployed by Octopus:

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

In this example, **hello-world** is the package ID, **1.0.0** is the version number, and **zip** is the format and file extension. Together, they uniquely identify the package.

> `<package-id>.<version>.<extension>`

## Package ID {#package-id}

Package IDs must conform to following specifications:

- Package IDs must be unique within your Octopus Deploy instance.
- Package IDs consist of one or more segments separated by one of the following separator characters: `-` `.` `_`.
- Segments contain only alphanumeric characters.

For instance. The package ID in our sample package is `hello-world`.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Avoid using numbers in your package ID as it could result in your version number being incorrectly parsed.

## Version Numbers {#version-numbers}

Octopus supports [Semantic Versioning](http://semver.org/), unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds.md), in which case you will need to use [Maven Versions](https://octopus.com/blog/maven-versioning-explained).

The version number needs to be applied to your package after the package ID and before the format. For instance. The version number in our sample package is **1.0.0**.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

See also, [choosing a versioning scheme](/docs/packaging-applications/versioning.md).

## Supported Formats {#supported-formats}

It is important that your packages have the correct **file extension** because Octopus uses the **file extension** to determine the correct extraction algorithm to use with your packages.

| Package Type          | File Extensions           | Notes                                    |
| --------------------- | ------------------------- | ---------------------------------------- |
| NuGet        | *.nupkg*                   | Compatible with any NuGet repository (including the [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md)). Currently only NuGet packages will have extra metadata like release notes and description extracted from the package metadata. |
| Zip          | *.zip*                     | Standard zip file as created through most common zip programs. Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |
| JAR WAR EAR RAR | .jar, .war, .ear, .rar  | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) and [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md) from 4.1. |
| Tar          | *.tar*                   | Compatible with the [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |
| Tar + Gzip   | *.tgz, .tar.gz, .tar.Z | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |                                          |
| Tar + Bzip2  | *.tar.bz, .tar.bz2, .tbz* | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |                                          |
| Docker Image |                            | [Docker Registries](/docs/packaging-applications/package-repositories/docker-registries/index.md). Learn about [Docker](/docs/deployment-examples/docker-containers/index.md) and Octopus Deploy. |

:::warning
**Pre-Release packages and Multipart file extensions**

If you're planning to use a multi-part file extension (e.g. `.tar.gz`) with a pre-release naming convention (`MyApp.1.0.0-beta.tar.gz`) and use the *Run on Server* step option, this will result in an error message of `Unsupported file extension .gz`. This is because the `.tar` forms part of pre-release tag and not part of the file extension.

The error only occurs on *Run on Server* steps and deployments execute as expected on Tentacles.
:::

## Creating Packages {#creating-packages}

We've created the following tools to help package your applications for deployment with Octopus:

 - [Octo.exe](/docs/packaging-applications/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [Octopack](/docs/packaging-applications/octopack/index.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - A [TeamCity plugin](/docs/api-and-integration/teamcity.md).
 - An [Azure DevOps plugin](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md).

In addition to these tools, you can use other tools to create your packages, for instance, you might use the following:

 - The built-in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
 - [NuGet.exe](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference) to create NuGet packages.
 - [Grunt, gulp, or octojs](/docs/deployment-examples/node-on-linux-deployments/create-and-push-node.js-project.md) for JavaScript apps.

There are many more tools you might choose to use, but as long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.

## Next

 - [Octo.exe](/docs/packaging-applications/octo.exe.md)
 - [Octopack](/docs/packaging-applications/octopack/index.md)
 - [TeamCity plugin](/docs/api-and-integration/teamcity.md)
 - [Azure DevOps plugin](/docs/api-and-integration/tfs-azure-devops/using-octopus-extension/index.md)
