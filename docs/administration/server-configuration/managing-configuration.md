---
title: Managing Server Configuration
description: The Octopus Server Configuration can be managed programmatically through the Octopus.Client library and the API
position: 1801
version: 4.0
---

Octopus Deploy is made up of a number of different configuration sets and managing them can be performed through a few different channels.

:::hint
In Octopus Deploy version 4.0, we added the ability to manage most of the available configuration, without needing to be directly on the server.
:::

## Web Portal

In the Octopus Deploy web portal, you can access configuration by navigating to {{Configuration,Settings}}, this will show which configuration items are available.

![Web Portal Configuration](octopus-v4-config-webportal.png "width=500")

## Octopus.Client

Using [Octopus.Client](/docs/api-and-integration/octopus.client.md), each of the configuration types can be managed programmatically, reading from and writing back to the Octopus Deploy database.

The class definitions for each of the configurations is available by referencing the relevant `Octopus.Client.Extensibility.*` library, which are available via NuGet:

- [Octopus.Client.Extensibility.Authentication.Guest](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.Guest/)
- [Octopus.Client.Extensibility.Authentication.DirectoryServices](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.DirectoryServices/)
- [Octopus.Client.Extensibility.Authentication.UsernamePassword](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.UsernamePassword/)
- [Octopus.Client.Extensibility.Authentication.AzureAD](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.AzureAD/)
- [Octopus.Client.Extensibility.Authentication.GoogleApps](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.GoogleApps/)
- [Octopus.Client.Extensibility.Authentication.Okta](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.Okta/)

Web Portal and Authentication types are available in [Octopus.Client.Extensibility](https://www.nuget.org/packages/Octopus.Client.Extensibility/)

### .Net / C#

To access the API from .Net you will need to add a NuGet reference to the [Octopus.Client](https://www.nuget.org/packages/Octopus.Client/) library and to at least one of the above Extensibility libraries.

```cs
var server = "http://myoctopusserver";
var apikey = "API-XXXXXXXX";
var endpoint = new OctopusServerEndpoint(server, apikey);
var repository = new OctopusRepository(endpoint);
var guestConfig = repository.Configuration.Get<GuestConfigurationResource>();
guestConfig.IsEnabled = true;
guestConfig = repository.Configuration.Modify(guestConfig);
```

For the Web Portal and Authentication configurations, you need the [Octopus.Client](https://www.nuget.org/packages/Octopus.Client/) and the [Octopus.Client.Extensibility](https://www.nuget.org/packages/Octopus.Node.Extensibility.Authentication/) NuGet packages

```cs
var server = "http://myoctopusserver/";   
var apiKey = "API-XXXXXXXX";             // Get this from your 'profile' page in the Octopus web portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
var repository = new OctopusRepository(endpoint);
var webportalConfig = repository.Configuration.Get<WebPortalConfigResource>();
webportalConfig.Security.HttpStrictTransportSecurityEnabled = true;
webportalConfig = repository.Configuration.Modify(webportalConfig);
```

### Powershell

```powershell
add-type -path 'C:\PathTo\Octopus.Client.dll'
add-type -path 'C:\PathTo\Octopus.Client.Extensibility.Authentication.Guest.dll'
$server = 'http://myoctopusserver/'
$apikey = 'API-XXXXXXXX';
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint $server,$apikey
$repo = New-Object Octopus.Client.OctopusRepository $endpoint
$getMethod = $repo.Configuration.GetType().GetMethod("Get").MakeGenericMethod([Octopus.Client.Extensibility.Authentication.Guest.Configuration.GuestConfigurationResource])
$modifyMethod = $repo.Configuration.GetType().GetMethod("Modify").MakeGenericMethod([Octopus.Client.Extensibility.Authentication.Guest.Configuration.GuestConfigurationResource])
$guestConfig = $getMethod.Invoke($repo.Configuration, $null)
$guestConfig.IsEnabled = $true;
$guestConfig = $modifyMethod.Invoke($repo.Configuration, $guestConfig)
```

For more information on using the Octopus.Client library see [Octopus.Client](/docs/api-and-integration/octopus.client.md).