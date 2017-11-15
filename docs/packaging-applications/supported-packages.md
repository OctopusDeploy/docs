---
title: Supported Packages
description: Octopus Deploy supports numerous package formats including NuGet, Tar, ZIP and docker images.
position: 1
---
Octopus Deploy supports several package types and will continue to add more in the future.

Octopus Deploy uses the **file extension** to determine the correct extraction algorithm to use, so it is important that your package has the correct extension for the package format.

| Package Type | File Extensions          | Supported In | Repositories                             | Notes                                    |
| ------------ | ------------------------- | ----------- | ---------------------------------------- | ---------------------------------------- |
| NuGet        | *.nupkg*                  | All |Any NuGet repository (including the [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md)) | Currently only NuGet packages will have extra metadata like release notes and description extracted from the package metadata. |
| Tar          | *.tar*                    | All | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only | An archive file primarily used in non Windows environments. |
| Tar + Gzip   | *.tgz, .tar.gz, .tar.Z*  | All | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Tar + Bzip2  | *.tar.bz, .tar.bz2, .tbz* | All | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only |                                          |
| Zip          | *.zip*                    | 3.3+ | [Built-In repository](/docs/packaging-applications/package-repositories/pushing-packages-to-the-built-in-repository.md) only | Standard zip file as created through most common zip programs. |
| Docker Image |                           | 3.5+ | [Docker Registries](/docs/deploying-applications/docker-containers/registries/index.md) | Learn about [Docker](/docs/guides/docker/index.md) in Octopus Deploy. |

## Package Metadata {#SupportedPackages-PackageMetadata}

The only required pieces of information Octopus Deploy **requires** for a package are an ID, Version and Format. Other metadata like release notes or descriptions are optional.

- NuGet packages: NuGet packages support embedding metadata within the contents of the package. We use this metadata to determine the version of the package.
- All other packages: In all other cases we have to parse the file name itself and extract the ID, Version and Format.

The expected package convention is therefore:

> `<id>.<version>.<extension>`

So for example the package name for version *2.3* of you project *Sample.Web*, archived with tar & gzip should be named

> `Sample.Web.2.3.tar.gz`

:::success
**Avoid putting numbers into your Package ID**
Notice that the version is defined as consisting of the part of the file name from the first instance of a digit, until the file extension. So long as your project name doesn't contain a "*.&lt;number&gt;" component it will parse the version correctly. Note that this means you can also have pre-release tags as part of your version number. This approach allows Octopus to support as generic a package format as possible, while still extracting the information needed for it to do its job.
:::

:::success
Learn about [versioning in Octopus Deploy](/docs/packaging-applications/versioning-in-octopus-deploy.md).
:::
