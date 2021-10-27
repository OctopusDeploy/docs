---
title: Octopus.Client
description: Octopus.Client is an open source .NET library that makes it easy to write C# programs that interact with the Octopus Deploy REST API.
position: 20
---

Octopus.Client is an [open source](https://github.com/OctopusDeploy/OctopusClients) .NET library that makes it easy to write C# programs or PowerShell scripts that manipulate the [Octopus Deploy REST API](/docs/octopus-rest-api/index.md).

Because the Octopus Deploy application itself is built entirely on the API, any programming language that can make HTTP requests to the API can do anything that could be done by a user of the application itself.

Octopus.Client is [published on NuGet](https://www.nuget.org/packages/Octopus.Client). The package contains both a .NET Framework build as well as a .NET Standard build. The .NET Framework build targets 4.5.2, and the .NET Standard build is cross-platform and compatible with a [variety of runtimes](https://docs.microsoft.com/en-us/dotnet/articles/standard/library), including .NET Core and can be used from PowerShell Core.

:::hint
Details for where to find the API, how to authenticate, and the resources that are available can be found on [the API documentation site](https://g.octopushq.com/ApiDocs), and [swagger documentation is also available](https://demo.octopus.app/swaggerui/index.html).
:::

## Octopus.Client Examples

We have many examples showing how to use Octopus.Client in both our [API examples](/docs/octopus-rest-api/examples/index.md), and on the [OctopusDeploy-API GitHub repository](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client).

