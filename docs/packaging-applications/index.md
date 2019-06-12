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
1. Host the package in a [package repository](/docs/packaging-applications/package-repositories/index.md), such as the Octopus [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md).

## Example Package

This is a simple example of a package that can be deployed by Octopus:

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

In this example, **hello-world** is the package ID, **1.0.0** is the version number, and **zip** is the format and file extension. Together, they uniquely identify the package.

> `<package-id>.<version>.<extension>`

## Package ID {#package-id}

Package IDs must conform to the following specifications:

- Package IDs must be unique within your Octopus Deploy instance.
- Package IDs consist of one or more segments separated by one of the following separator characters: `-` `.` `_`.
- Segments contain only alphanumeric characters.

For instance. The package ID in our sample package is `hello-world`.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Avoid using numbers in your package ID as it could result in your version number being incorrectly parsed.

## Version Numbers {#version-numbers}

Octopus supports [Semantic Versioning](/docs/packaging-applications/versioning.md#semver), unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds.md), in which case you will need to use [Maven Versions](/docs/packaging-applications/versioning.md#maven).

The version number needs to be applied to your package after the package ID and before the format. For instance. The version number in our sample package is **1.0.0**.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Learn more about [versioning schemes](/docs/packaging-applications/versioning.md).

## Supported Formats {#supported-formats}

It is important that your packages have the correct **file extension** because Octopus uses the **file extension** to determine the correct extraction algorithm to use with your packages.

| Package Type          | File Extensions           | Notes                                    |
| --------------------- | ------------------------- | ---------------------------------------- |
| NuGet        | .nupkg                   | Compatible with any NuGet repository (including the [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md)). Currently only NuGet packages will have extra metadata like release notes and description extracted from the package metadata. |
| Zip          | .zip                     | Standard zip file as created through most common zip programs. Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |
| JAR WAR EAR RAR | .jar, .war, .ear, .rar  | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) and [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md) from **Octopus 4.1**. |
| Tar          | .tar                   | Compatible with the [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |
| Tar + Gzip   | .tgz, .tar.gz, .tar.Z | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |                                          |
| Tar + Bzip2  | .tar.bz, .tar.bz2, .tbz* | Compatible with the [built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md) only. |                                          |
| Docker Image |                            | [Docker Registries](/docs/packaging-applications/package-repositories/docker-registries/index.md). Learn about [Docker](/docs/deployment-examples/docker-containers/index.md) and Octopus Deploy. |

## Creating Packages {#creating-packages}

We've created the following tools to help package your applications for deployment with Octopus:

 - [Octo.exe](/docs/packaging-applications/octo.exe.md) to create Zip Archives and NuGet packages for **.NET Core** apps and full **.NET framework** applications.
 - [Octopack](/docs/packaging-applications/octopack/index.md) to create NuGet packages for **ASP.NET** apps (.NET Framework) and **Windows Services** (.NET Framework).
 - A [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity.md).
 - An [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/index.md).

In addition to these tools, you can use other tools to create your packages, for instance, you might use the following:

 - The built-in tools for [TeamCity](https://blog.jetbrains.com/teamcity/2010/02/artifact-packaging-with-teamcity/).
 - [NuGet.exe](https://docs.microsoft.com/en-us/nuget/tools/nuget-exe-cli-reference) to create NuGet packages.
 - Using the [NuGet Package Explorer](/docs/packaging-applications/nuget-packages.md).
 - [Grunt, gulp, or octojs](/docs/deployment-examples/node-on-linux-deployments/create-and-push-node.js-project.md) for JavaScript apps.

There are many more tools you might choose to use, but as long as you can create one of our [supported packages](/docs/packaging-applications/index.md#supported-formats) you can deploy your applications with Octopus Deploy.

## Next

 - Choosing a [versioning scheme](/docs/packaging-applications/versioning.md).
 - Creating packages with [Octo.exe](/docs/packaging-applications/octo.exe.md).
 - Creating packages with [Octopack](/docs/packaging-applications/octopack/index.md).
 - Using the [TeamCity plugin](/docs/packaging-applications/build-servers/teamcity.md).
 - Using the [Azure DevOps plugin](/docs/packaging-applications/build-servers/tfs-azure-devops/using-octopus-extension/index.md).
 - Using [Package Repositories](/docs/packaging-applications/index.md).
 - Creating [Package Deployments](/docs/deployment-examples/package-deployments/index.md).
