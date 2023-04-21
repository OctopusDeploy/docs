---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Managing server configuration
description: The Octopus Server configuration can be managed programmatically through the Octopus.Client library and the API
navOrder: 1801
version: 4.0
---

Octopus Deploy is made up of a number of different configuration sets and managing them can be performed through a few different channels.

## Octopus Web Portal

In the Octopus Web Portal, you can access configuration by navigating to **{{Configuration,Settings}}**, this will show which configuration items are available.

![Web Portal Configuration](/docs/administration/managing-infrastructure/server-configuration/octopus-v4-config-webportal.png "width=500")

## Octopus.Client

Using [Octopus.Client](/docs/octopus-rest-api/octopus.client), each of the configuration types can be managed programmatically, reading from and writing back to the Octopus Deploy database.

The class definitions for each of the configurations is available by referencing the relevant `Octopus.Client.Extensibility.*` library, which are available via NuGet:

- [Octopus.Client.Extensibility.Authentication.Guest](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.Guest/)
- [Octopus.Client.Extensibility.Authentication.DirectoryServices](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.DirectoryServices/)
- [Octopus.Client.Extensibility.Authentication.UsernamePassword](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.UsernamePassword/)
- [Octopus.Client.Extensibility.Authentication.AzureAD](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.AzureAD/)
- [Octopus.Client.Extensibility.Authentication.GoogleApps](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.GoogleApps/)
- [Octopus.Client.Extensibility.Authentication.Okta](https://www.nuget.org/packages/Octopus.Client.Extensibility.Authentication.Okta/)

Web Portal and Authentication types are available in [Octopus.Client](https://www.nuget.org/packages/Octopus.Client/)

:::div{.hint}
This requires version 4.27.0 or later of the client library.
:::

### .Net / C#

To access the API from .Net you will need to add a NuGet reference to the [Octopus.Client](https://www.nuget.org/packages/Octopus.Client/) library and to at least one of the above Extensibility libraries.

```csharp
var server = "http://myoctopusserver";
var apikey = "API-XXXXXXXX";
var endpoint = new OctopusServerEndpoint(server, apikey);
var repository = new OctopusRepository(endpoint);
var guestConfig = repository.Configuration.Get<GuestConfigurationResource>();
guestConfig.IsEnabled = true;
guestConfig = repository.Configuration.Modify(guestConfig);
```

For the Web Portal and Authentication configurations, you need the [Octopus.Client](https://www.nuget.org/packages/Octopus.Client/) NuGet package:

```csharp
var server = "http://myoctopusserver/";   
var apiKey = "API-XXXXXXXX";             // Get this from your 'profile' page in the Octopus Web Portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
var repository = new OctopusRepository(endpoint);
var webportalConfig = repository.Configuration.Get<WebPortalConfigResource>();
webportalConfig.Security.HttpStrictTransportSecurityEnabled = true;
webportalConfig = repository.Configuration.Modify(webportalConfig);
```

### PowerShell

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

For more information on using the Octopus.Client library see [Octopus.Client](/docs/octopus-rest-api/octopus.client).
