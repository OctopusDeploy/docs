---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Working directly with the Client
description: How to use the IOctopusClient type in the Octopus.Client library.
navOrder: 30
---

For some operations not available through [repositories](/docs/octopus-rest-api/octopus.client/using-resources), it will be necessary to use the `IOctopusClient` type:

<details data-group="using-client-directly">
<summary>PowerShell</summary>

```powershell
$connection = $repository.Client.Get($machine.Links["Connection"]);
```

</details>
<details data-group="using-client-directly">
<summary>C#</summary>

```csharp
// Sync
var connection = repository.Client.Get(machine.Links["Connection"]);
 
// Async
var connection = await client.Get(machine.Links["Connection"]);
```

</details>

The entire API is accessible by traversing links - each resource carries a collection of links, like the `Connection` link on `MachineResource` shown above.

:::div{.warning}
Always access objects by traversing the links; avoid using direct url segments, as they may change in the future.
:::

To start traversing links, the `IOctopusClient.RootDocument` is provided:

<details data-group="using-client-directly-traversing">
<summary>PowerShell</summary>

```powershell
$link = $repository.Client.RootDocument.Links["CurrentUser"].ToString()
$method = $repository.Client.GetType().GetMethod("Get").MakeGenericMethod([Octopus.Client.Model.UserResource])
$me = $method.invoke($repository.Client, @($link, $null))
```

</details>
<details data-group="using-client-directly-traversing">
<summary>C#</summary>

```csharp
// Sync
var me = repository.Client.Get<UserResource>(repository.Client.RootDocument.Links["CurrentUser"]);
 
// Async
var me = await client.Get<UserResource>(client.RootDocument.Links["CurrentUser"])
```

</details>

*(This is only an example. This common operation is also available via `repository.Users.GetCurrent()`.)*
