---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: API examples
description: A set of examples using the Octopus REST API to accomplish tasks.
navOrder: 40
hideInThisSectionHeader: true
---

As you work with the Octopus API, you may need some guidance on how to perform certain actions or what parameters to provide. The [OctopusDeploy-API GitHub repository](https://github.com/OctopusDeploy/OctopusDeploy-Api) contains many examples using the API, with solutions covering:

- PowerShell using the REST API.
- PowerShell using Octopus.Client.
- C# using Octopus.Client.
- Python using the REST API.
- Go using the [Go API Client for Octopus Deploy](https://github.com/OctopusDeploy/go-octopusdeploy).
- Java using the [java-octopus-deploy](https://github.com/OctopusDeployLabs/java-octopus-deploy) Client.
- TypeScript using the [TypeScript API Client for Octopus Deploy](https://github.com/OctopusDeploy/api-client.ts).

In addition, we also have a wide range of some of the more common examples here as well.

## Using the scripts

To use the example scripts, you'll need to provide your Octopus Server URL and an [API Key](/docs/octopus-rest-api/how-to-create-an-api-key). There may be other values that need to be updated to fit your scenario such as Space, Project, and Environment names.

:::div{.hint}
**The examples provided are for reference and should be modified and tested prior to using in a production Octopus instance.**
:::

### C# examples

The C# examples are written using [dotnet script](https://github.com/filipw/dotnet-script). The same logic can be used in a standard C# application.

### Octopus.Client examples

Examples using [Octopus.Client](/docs/octopus-rest-api/octopus.client) require the library to be installed and a path to the library to be provided.

### Python examples

The Python examples are written using **Python 3** and use the [Requests](https://requests.readthedocs.io/en/master/) library. Some examples also use the [urllib](https://docs.python.org/3/library/urllib.html) module.

### Go examples

The Go examples are written using the [Go API Client for Octopus Deploy](https://github.com/OctopusDeploy/go-octopusdeploy).

### Java examples

The Java examples are written using the [java-octopus-deploy](https://github.com/OctopusDeployLabs/java-octopus-deploy) Client.

The Java Client library requires **Java 1.8** or above.

### TypeScript examples

The TypeScript examples are written using the [TypeScript API Client for Octopus Deploy](https://github.com/OctopusDeploy/api-client.ts).

## Bulk operations

Sometimes you want to perform an action on a resource in Octopus multiple times. For example, connecting a tenant to all of your projects. Having to run a script that performs an operation once, repeatedly, can become tedious.

To help with this, we've included examples of [bulk operations](/docs/octopus-rest-api/examples/bulk-operations) using the Octopus REST API.

## Explore examples

Explore the REST API examples further in this section:

- [Accounts](/docs/octopus-rest-api/examples/accounts)
- [Artifacts](/docs/octopus-rest-api/examples/artifacts)
- [Certficates](/docs/octopus-rest-api/examples/certificates)
- [Channels](/docs/octopus-rest-api/examples/channels)
- [Deployment process](/docs/octopus-rest-api/examples/deployment-process)
- [Deployment targets](/docs/octopus-rest-api/examples/deployment-targets)
- [Deployments](/docs/octopus-rest-api/examples/deployments)
- [Environments](/docs/octopus-rest-api/examples/environments)
- [Events](/docs/octopus-rest-api/examples/events)
- [Feeds](/docs/octopus-rest-api/examples/feeds)
- [Lifecycles](/docs/octopus-rest-api/examples/lifecycles)
- [Project Groups](/docs/octopus-rest-api/examples/project-groups)
- [Projects](/docs/octopus-rest-api/examples/projects)
- [Releases](/docs/octopus-rest-api/examples/releases)
- [Reports](/docs/octopus-rest-api/examples/reports)
- [Runbooks](/docs/octopus-rest-api/examples/runbooks)
- [Spaces](/docs/octopus-rest-api/examples/spaces)
- [Step Templates](/docs/octopus-rest-api/examples/step-templates)
- [Tag sets](/docs/octopus-rest-api/examples/tagsets)
- [Tasks](/docs/octopus-rest-api/examples/tasks)
- [Tenants](/docs/octopus-rest-api/examples/tenants)
- [Users and Teams](/docs/octopus-rest-api/examples/users-and-teams)
- [Variables](/docs/octopus-rest-api/examples/variables)
- [Bulk Operations](/docs/octopus-rest-api/examples/bulk-operations)