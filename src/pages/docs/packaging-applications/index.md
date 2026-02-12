---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 202-12-16
title: Packaging applications
subtitle: How to package your applications for deployment with Octopus
icon: fa-solid fa-cubes
navTitle: Overview
navSection: Packaging applications
description: Packaging applications for deployment with Octopus Deploy.
navOrder: 40
hideInThisSection: true
---

Deploying software with Octopus often involves deploying packages. This section explains how to package your applications for deployment with Octopus.

Before you can deploy a package you need to:

1. Give your package a [package ID](#package-id).
1. Choose and apply a [versioning scheme](#version-numbers).
1. Create the package in a [supported format](#supported-formats).
1. Host the package in a [package repository](/docs/packaging-applications/package-repositories).

## Package ID {#package-id}

Package IDs must conform to the following specifications:

- Package IDs must be unique within your Octopus Deploy instance.
- Package IDs consist of one or more segments separated by one of the following separator characters: `-` `.` `_`.
- Segments contain only alphanumeric characters.

For instance, the package ID in this sample package is `hello-world`.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Avoid using numbers in your package ID as it could result in the version number being incorrectly parsed.

## Version numbers {#version-numbers}

Octopus supports [Semantic Versioning](/docs/packaging-applications/create-packages/versioning/#semver), unless you are deploying artifacts to a [Maven repository](/docs/packaging-applications/package-repositories/maven-feeds) in which case you will need to use [Maven Versions](/docs/packaging-applications/create-packages/versioning/#maven).

The version number needs to be applied to your package after the package ID and before the format. For instance. The version number in our sample package is **1.0.0**.

> [hello-world.1.0.0.zip](https://octopus.com/images/docs/hello-world.1.0.0.zip)

Learn more about [versioning schemes](/docs/packaging-applications/create-packages/versioning).

## Package dependencies and structure

When you package your applications, you need to include all the binaries that are required to run the application, and structure the package the way you want it to appear after it has been extracted.

## Supported formats {#supported-formats}

It is important that your packages have the correct **file extension** because Octopus uses the **file extension** to determine the correct extraction algorithm to use with your packages. Only NuGet packages will have extra metadata like release notes and description extracted from the package metadata.

| Package type    | File Extensions          | Built-in repository | External feed | Notes on external feeds                                                                                                                                                        |
| --------------- | ------------------------ | ------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NuGet           | .nupkg                   | Yes                 | Yes           | Learn about NuGet on the [official NuGet website](http://docs.nuget.org/docs/start-here/overview).                                                                             |
| Zip             | .zip                     | Yes                 | Yes           |                                                                                                                                                                                |
| JAR WAR EAR RAR | .jar, .war, .ear, .rar   | Yes                 | Yes           | Learn about [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds) and Octopus. RAR files a Java Resource Adaptor files, not compressed archive formats. |
| Tar             | .tar                     | Yes                 | Yes           |                                                                                                                                                                                |
| Tar + Gzip      | .tgz, .tar.gz, .tar.Z    | Yes                 | Yes           |                                                                                                                                                                                |
| Tar + Bzip2     | .tar.bz, .tar.bz2, .tbz* | Yes                 |               |                                                                                                                                                                                |
| NPM             | .tgz, .tar.gz            |                     | Yes           |                                                                                                                                                                                |
| Docker Image    |                          |                     | Yes           | [Docker Registries](/docs/packaging-applications/package-repositories/docker-registries/). Learn about [Docker](/docs/deployments/docker) and Octopus.                         |
| Helm Chart      | .tgz                     | Yes                 | Yes           | [Helm Chart Repositories](https://helm.sh/docs/topics/chart_repository/). Learn about [Helm](/docs/deployments/kubernetes/helm-update) and Octopus.                            |

## Learn more

- [Create packages](/docs/packaging-applications/create-packages)
- [Build servers](/docs/packaging-applications/build-servers)
- [Package repositories](/docs/packaging-applications/package-repositories)
