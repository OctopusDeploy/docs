---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Working directly with the Client
description: How to use the IOctopusClient type in the Octopus.Client library.
navOrder: 30
---

For some operations not available through [repositories](/docs/octopus-rest-api/octopus.client/using-resources/), it will be necessary to use the `IOctopusClient` type:

```powershell PowerShell
$connection = $repository.Client.Get($machine.Links["Connection"]);
```
```csharp C#
// Sync
var connection = repository.Client.Get(machine.Links["Connection"]);
 
// Async
var connection = await client.Get(machine.Links["Connection"]);
```

The entire API is accessible by traversing links - each resource carries a collection of links, like the `Connection` link on `MachineResource` shown above.

:::warning
Always access objects by traversing the links; avoid using direct url segments, as they may change in the future.
:::

To start traversing links, the `IOctopusClient.RootDocument` is provided:

```powershell PowerShell
$link = $repository.Client.RootDocument.Links["CurrentUser"].ToString()
$method = $repository.Client.GetType().GetMethod("Get").MakeGenericMethod([Octopus.Client.Model.UserResource])
$me = $method.invoke($repository.Client, @($link, $null))
```
```csharp C#
// Sync
var me = repository.Client.Get<UserResource>(repository.Client.RootDocument.Links["CurrentUser"]);
 
// Async
var me = await client.Get<UserResource>(client.RootDocument.Links["CurrentUser"])
```
*(This is only an example. This common operation is also available via `repository.Users.GetCurrent()`.)*