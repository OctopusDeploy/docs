---
title: Octopus REST API
description: Octopus Deploy is built **API-first** and all data and operations are available over its REST API.
position: 80
---

## Octopus as an API-First Application

Architecturally, Octopus Deploy is built **API-first**. This means that Octopus is built in layers - all data and operations are available over its REST API. The Octopus Web Portal (the main Octopus UI) is actually built on top of this API. In the Octopus Web Portal, we don't use any shortcuts - 100% of the data and operations that you can see and perform in the Octopus UI can be performed over the REST API.

![](/docs/images/3048161/3278405.png)

The Octopus REST API is designed:

1. To be friendly and easy to figure out.
2. To be [hypermedia driven](http://en.wikipedia.org/wiki/HATEOAS), using links and the occasional [URI template](http://tools.ietf.org/html/rfc6570) ([read more](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Links)).
3. To be comprehensive - 100% of the actions that you perform via the Octopus UI can be performed via the API.
4. To have a nice [client library](http://www.nudoq.org/#!/Projects/Octopus.Client) for .NET [available via NuGet](http://www.nuget.org/packages/Octopus.Client/).

:::success
**Using C#?**
If you plan to use the REST API from C# or another .NET project, see the [Octopus.Client](/docs/api-and-integration/octopus.client.md) assembly.
:::

## REST API Documentation via Swagger

As of **Octopus 3.17**, Octopus now includes the default Swagger UI for displaying the API documentation in a nice human readable way. To browse that UI just open your browser and go to `[OctopusServerURL]/swaggerui/`. The original Non-Swagger API page is still available and can always be accessed via `[OctopusServerURL]/api/`.

![](/docs/images/3048161/3278406.png)

You can view the API through the Octopus Demo server at [demo.octopus.com/swaggerui/index.html](https://demo.octopus.com/swaggerui/index.html).
