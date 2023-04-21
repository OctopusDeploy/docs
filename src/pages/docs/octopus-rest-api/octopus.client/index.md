---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Octopus.Client
description: Octopus.Client is an open source .NET library that makes it easy to write C# programs that interact with the Octopus Deploy REST API.
navOrder: 20
---

Octopus.Client is an [open source](https://github.com/OctopusDeploy/OctopusClients) .NET library that makes it easy to write C# programs or PowerShell scripts that manipulate the [Octopus Deploy REST API](/docs/octopus-rest-api).

Because the Octopus Deploy application itself is built entirely on the API, any programming language that can make HTTP requests to the API can do anything that could be done by a user of the application itself.

Octopus.Client is [published on NuGet](https://www.nuget.org/packages/Octopus.Client). The package contains both a .NET Framework build as well as a .NET Standard build. The .NET Framework build targets 4.5.2, and the .NET Standard build is cross-platform and compatible with a [variety of runtimes](https://docs.microsoft.com/en-us/dotnet/articles/standard/library), including .NET Core and can be used from PowerShell Core.

:::div{.hint}
Details for where to find the API, how to authenticate, can be found in our [REST API overview](/docs/octopus-rest-api) page, and [swagger documentation is also available](https://demo.octopus.app/swaggerui/index.html).
:::

## Octopus.Client Examples

We have many examples showing how to use Octopus.Client in both our [API examples](/docs/octopus-rest-api/examples), and on the [OctopusDeploy-API GitHub repository](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client).

