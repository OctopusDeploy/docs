---
title: Octopus REST API
description: Octopus Deploy is built **API-first** and all data and operations are available over its REST API.
position: 8
---

Architecturally, Octopus Deploy is built **API-first**. This means that Octopus is built in layers - all data and operations are available over its REST API. The Octopus Web Portal (the main Octopus UI) is actually built on top of this API. In the Octopus Web Portal, we don't use any shortcuts - 100% of the data and operations that you can see and perform in the Octopus UI can be performed over the REST API.

![](/docs/images/3048161/3278405.png)

The Octopus REST API is designed:

1. To be friendly and easy to figure out
2. To be [hypermedia driven](http://en.wikipedia.org/wiki/HATEOAS), using links and the occasional [URI template](http://tools.ietf.org/html/rfc6570) ([read more](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Links))
3. To be comprehensive - 100% of the actions that you perform via the Octopus UI can be performed via the API
4. To have a nice [client library](http://www.nudoq.org/#!/Projects/Octopus.Client) for .NET [available via NuGet](http://www.nuget.org/packages/Octopus.Client/)

:::success
**Using C#?**
If you plan to use the REST API from C# or another .NET project, see the [Octopus.Client](/docs/api-and-integration/octopus.client.md) assembly.
:::

## Documentation and samples {#OctopusRESTAPI-Documentationandsamples}

[Documentation](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki) and [samples](https://github.com/OctopusDeploy/OctopusDeploy-Api) for the Octopus Deploy REST API are available on the **[Octopus REST API GitHub site](https://github.com/OctopusDeploy/OctopusDeploy-Api)**.
