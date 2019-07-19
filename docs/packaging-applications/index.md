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

Octopus supports [Semantic Versioning](/docs/packaging-applications/create-packages/versioning.md#semver), unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds.md), in which case you will need to use [Maven Versions](/docs/packaging-applications/create-packages/versioning.md#maven).

The version number needs to be applied to your package after the package ID and before the format. For instance. The version number in our sample package is **1.0.0**.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Learn more about [versioning schemes](/docs/packaging-applications/create-packages/versioning.md).

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

## Next

 - [Create Packages](/docs/packaging-applications/create-packages/index.md).
 - [Build Servers](/docs/packaging-applications/build-servers/index.md)
 - [Package Repositories](/docs/packaging-applications/package-repositories/index.md)
