---
title: Packaging Applications
description: Packaging applications for deployment with Octopus Deploy.
position: 40
hideInThisSection: true
---

Deploying software with Octopus often involves deploying a package. This section explains how to package your applications for deployment with Octopus.

Before you can deploy your software you need to:

1. Give your package a [package ID](#package-id).
1. Choose and apply a [versioning scheme](/docs/packaging-applications/versioning.md).
1. [Create the package](/docs/packaging-applications/creating-packages/index.md) with all the files your software needs to run in a [supported format](#supported-formats).
1. Host the package in a [package repository](/docs/packaging-applications/package-repositories/index.md), for instance, the Octopus [built-in repository](/docs/packaging-applications/package-repositories/built-in-repository/index.md).

## Example Package

This is a simple example of a package that is deployable by Octopus:

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

In this example, **hello-world** is the package ID, **1.0.0** is the version number of the package, and **zip** is the format.

## Package ID {#package-id}

Package IDs must conform to following specifications:

- Package IDs must be unique within your Octopus Deploy instance.
- Package IDs consist of one or more segments separated by one of the following separator characters: `-` `.` `_`.
- Segments contain only alphanumeric characters.

For instance. The package ID in our sample package is `hello-world`.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Avoid using numbers in your package ID as it could result in your version number being incorrectly parsed.

## Version Numbers

Octopus supports [Semantic Versioning](http://semver.org/) for your software, unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds.md), in which case you will need to use [Maven Versions](https://octopus.com/blog/maven-versioning-explained).

The version number needs to be applied to your package after the package ID and before the format. For instance. The version number in our sample package is `1.0.0`.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

See also, [choosing a versioning scheme](/docs/packaging-applications/versioning.md).

## Supported Formats {#supported-formats}

It is important that your packages have the correct **file extension** because Octopus uses the **file extension** to determine the correct extraction algorithm to use with your packages.

| Package Type | File Extensions           | Notes                                    |
| --------------------- | ----------------- | ------------------------- |
| NuGet        | *.nupkg*                   |Any NuGet repository (including the [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md)). Currently only NuGet packages will have extra metadata like release notes and description extracted from the package metadata. |
| Tar          | *.tar*                   | [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) only |
| Tar + Gzip   | *.tgz, .tar.gz, .tar.Z | [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Tar + Bzip2  | *.tar.bz, .tar.bz2, .tbz* | [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Zip          | *.zip*                     | [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) only. Standard zip file as created through most common zip programs. |
| Docker Image |                            | [Docker Registries](/docs/packaging-applications/package-repositories/docker-registries/index.md). Learn about [Docker](/docs/deployment-examples/docker-containers/index.md) and Octopus Deploy. |
| JAR WAR EAR RAR | .jar, .war, .ear, .rar  |  [Built-In repository](/docs/packaging-applications/package-repositories/built-in-repository/pushing-packages-to-the-built-in-repository.md) (and [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md) from 4.1). Learn about [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md). |

:::warning
**Pre-Release packages and Multipart file extensions**

If you're planning to use a multi-part file extension (e.g. `.tar.gz`) with a pre-release naming convention (`MyApp.1.0.0-beta.tar.gz`) and use the *Run on Server* step option, this will result in an error message of `Unsupported file extension .gz`. This is because the `.tar` forms part of pre-release tag and not part of the file extension.

The error only occurs on *Run on Server* steps and deployments execute as expected on Tentacles.
:::

## Next

 - [Creating Packages](/docs/packaging-applications/creating-packages/index.md)
 - [Package Repositories](/docs/packaging-applications/package-repositories/index.md)
