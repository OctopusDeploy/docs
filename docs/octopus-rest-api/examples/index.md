---
title: API examples
description: A set of examples using the Octopus REST API to accomplish tasks.
position: 115
---

As you work with the Octopus API, you may need some guidance on how to perform actions or what parameters to provide. The [OctopusDeploy-API GitHub repository](https://github.com/OctopusDeploy/OctopusDeploy-Api) has many examples using the API. Our plan is to migrate those examples to this site and provide solutions for PowerShell with REST requests, PowerShell using Octopus.Client, and C# using Octopus.Client.

## Using the scripts

To use the example scripts, you'll need to provide your Octopus Server URL and an [API Key](/docs/octopus-rest-api/how-to-create-an-api-key.md). There may be other values that need to be updated to fit your scenario such as Space, Project, and Environment names.

:::hint
**The examples provided are for reference and should be modified and tested prior to using in a production Octopus instance.**
:::

### C# examples

The C# examples are written using [dotnet script](https://github.com/filipw/dotnet-script). The same logic can be used in a standard C# application.

### Octopus.Client examples

Examples using [Octopus.Client](/docs/octopus-rest-api/octopus.client.md) require the library to be installed and a path to the library to be provided.
