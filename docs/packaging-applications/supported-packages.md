---
title: Supported Formats
description: Octopus Deploy supports numerous package formats including NuGet, Tar, ZIP and docker images.
position: 1
---

Octopus Deploy supports several package types that can be used when [packaging your applications](/docs/packaging-applications/index.md) and will continue to add more in the future.

Octopus uses the **file extension** to determine the correct extraction algorithm to use, so it is important that your package has the correct extension for the package format.

Learn more about [creating packages](docs/packaging-applications/creating-packages/index.md).

| Package Type | File Extensions           | Notes                                    |
| ------------ | ------------------------- | ----------- | ---------------------------------------- | ---------------------------------------- |
| NuGet        | *.nupkg*                   |Any NuGet repository (including the [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md)) | Currently only NuGet packages will have extra metadata like release notes and description extracted from the package metadata. |
| Tar          | *.tar*                   | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only | An archive file primarily used in non Windows environments. |
| Tar + Gzip   | *.tgz, .tar.gz, .tar.Z | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Tar + Bzip2  | *.tar.bz, .tar.bz2, .tbz* | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Zip          | *.zip*                     | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only | Standard zip file as created through most common zip programs. |
| Docker Image |                            | [Docker Registries](/docs/packaging-applications/package-repositories/registries/index.md) | Learn about [Docker](/docs/deploying-applications/docker-containers/index.md) and Octopus Deploy. || JAR WAR EAR RAR | .jar, .war, .ear, .rar  |  [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) (and [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md) from 4.1) |  Learn about [Maven Feeds](/docs/packaging-applications/package-repositories/maven-feeds.md). |

Learn about [package IDs](/docs/packaging-applications/package-id.md), [versioning](/docs/packaging-applications/versioning.md), [creating packages](/docs/packaging-applications/creating-packages/index.md), and [package repositories](/docs/packaging-applications/package-repositories/index.md).
