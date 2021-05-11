---
title: Octopus REST API
description: Octopus integrates with build servers, scripts, .NET applications and anything else with its REST API.
position: 100
---

!include <rest-api>

The Octopus REST API is designed:

1. To be friendly and easy to figure out.
2. To be [hypermedia driven](http://en.wikipedia.org/wiki/HATEOAS), using links and the occasional [URI template](http://tools.ietf.org/html/rfc6570) ([read more](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Links)).
3. To be comprehensive - 100% of the actions that you perform via the Octopus UI can be performed via the API.
4. To have a nice [client library](http://www.nudoq.org/#!/Projects/Octopus.Client) for .NET [available via NuGet](http://www.nuget.org/packages/Octopus.Client/).

:::success
**Using C#?**
If you plan to use the REST API from C# or another .NET project, see the [Octopus.Client](/docs/octopus-rest-api/octopus.client/index.md) assembly.
:::

## REST API Documentation via Swagger

Octopus includes the default Swagger UI for displaying the API documentation in a nice human readable way. To browse that UI just open your browser and go to `[OctopusServerURL]/swaggerui/`. The original Non-Swagger API page is still available and can always be accessed via `[OctopusServerURL]/api/`.

![Server API](images/server-api.png "width=500")

You can view the API through the Octopus Demo server at [demo.octopus.com/swaggerui/index.html](https://demo.octopus.com/swaggerui/index.html).

## API and Spaces

If you are using spaces, you need to include the `SpaceID` in your API calls. If you do not include the `SpaceID`, your API calls will automatically use the default space.

## Documentation and Samples {#Octopus.Client-Documentationandsamples}

[Documentation](https://g.octopushq.com/ApiDocs) and samples for the Octopus Deploy REST API are available both in our [API examples](/docs/octopus-rest-api/examples/index.md) and on the [OctopusDeploy-API GitHub repository](https://github.com/OctopusDeploy/OctopusDeploy-Api).
