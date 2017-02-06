---
title: Octopus.Client
position: 7
---

Octopus.Client is an [open source](https://github.com/OctopusDeploy/OctopusClients) .NET library that makes it easy to write C# programs that manipulate the [Octopus Deploy REST API](/docs/api-and-integration/octopus-rest-api.md).

Because the Octopus Deploy application itself is built entirely on the API, C# programs using the API can do anything that could be done by a user of the application itself.

The NuGet package contains both a .NET Framework build as well as a .NET Standard build. The .NET Framework build targets 4.5 or later and contains both the synchronous and asynchronous API. The .NET Standard build is compatible with a [variety of runtimes](https://docs.microsoft.com/en-us/dotnet/articles/standard/library), including .NET Core 1.0 and only contains the asynchronous API.

- Getting started
 - Synchronous API
 - Asynchronous API (Octopus.Client 4.0+)
 - Powershell
- Working with resources
- Working directly with the client
- Loading in an octopus step
- Documentation and samples

## Getting started {#Octopus.Client-Gettingstarted}

:::hint
The complete details for the API itself - where to find it, how to authenticate, the available resources and so-on - are available at [the API documentation site](http://g.octopushq.com/ApiDocs).
:::

To use the C# client, first install the package via NuGet:

```powershell
Install-Package Octopus.Client
```

### Synchronous API {#Octopus.Client-SynchronousAPI}

The easiest way to use the client is via the `OctopusRepository` helper:

```c#
var server = "http://myoctopusserver/";   
var apiKey = "API-XXXXXXXX";             // Get this from your 'profile' page in the Octopus web portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
var repository = new OctopusRepository(endpoint);
```

If you don't want to provide an API key for authentication, you can leave it out and authenticate with the `SignIn()` method instead:

```c#
repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```

### Asynchronous API (Octopus.Client 4.0+) {#Octopus.Client-AsynchronousAPI(Octopus.Client4.0+)}

The easiest way to use the client is via the `OctopusAsyncClient`:

```c#
var server = "http://myoctopusserver/";   
var apiKey = "API-XXXXXXXX";             // Get this from your 'profile' page in the Octopus web portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
using (var client = await OctopusAsyncClient.Create(endpoint))
{
}
```

If you don't want to provide an API key for authentication, you can leave it out and authenticate with the `SignIn()` method instead:

```c#
await client.Repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```

### Powershell {#Octopus.Client-Powershell}

```powershell
Add-Type -Path 'C:\PathTo\Octopus.Client.dll'
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint("http://localhost",$ApiKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
```

:::success
**OctoPosh**
Also see the [OctoPosh ](https://github.com/Dalmirog/OctoPosh)project, which provides PowerShell commandlet wrappers around Octopus.Client
:::

## Working with resources {#Octopus.Client-Workingwithresources}

Resources can be loaded and saved with code like the following:

```c#
// Sync
var machine = repository.Machines.Get("machines-1");
machine.Name = "Test Server 1";
repository.Machines.Modify(machine);
 
// Async
var machine = await repository.Machines.Get("machines-1");
machine.Name = "Test Server 1";
await repository.Machines.Modify(machine);
```

The repository methods all make direct HTTP requests, there's no "session" abstraction or transaction support.

## Working directly with the client {#Octopus.Client-Workingdirectlywiththeclient}

For some operations not available through repositories it will be necessary to use the `IOctopusClient` type:

```c#
// Sync
var connection = repository.Client.Get(machine.Links["Connection"]);
 
// Async
var connection = await client.Get(machine.Links["Connection"]);
```

The entire API is accessible by traversing links - each resource carries a collection of links, like the "Connection" link on `MachineResource` shown above.

To start traversing links, `IOctopusClient.RootDocument` is provided:

```c#
// Sync
var me = repository.Client.Get<UserResource>(repository.Client.RootDocument.Links["CurrentUser"]);
 
// Async
var me = await client.Get<UserResource>(client.RootDocument.Links["CurrentUser"])
```

*(This example is superfluous as `repository.Users.GetCurrent()` wraps this common operation.)*

## Loading in an octopus step {#Octopus.Client-Loadinginanoctopusstep}

To use Octopus.Client from inside an octopus (for example in a script step, a package install script, or the script console) by loading it from the server or tentacle application directory. The credentials would still need to be supplied to establish the connection. For example:

**PowerShell**

```powershell
Add-Type -Path 'C:\Program Files\Octopus Deploy\Octopus\Octopus.Client.dll'
```

**C# Script**

```c#
#r "C:\\Program Files\\Octopus Deploy\\Octopus\\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
```

:::hint
**Tip**
The variable `Octopus.Tentacle.Agent.ProgramDirectoryPath` was added in server version 3.7.12, which can be used to obtain the directory that contains the Octopus.Client assembly. For prior versions of the server, the variable `Octopus.Tentacle.Agent.ProgramDirectoryPath` can be used, but that will not work for steps that run on the octopus server or cloud regions.
:::

## 
Documentation and samples {#Octopus.Client-Documentationandsamples}

[Documentation](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki) and [samples](https://github.com/OctopusDeploy/OctopusDeploy-Api) for the Octopus Deploy REST API are available on the **[Octopus REST API GitHub site](https://github.com/OctopusDeploy/OctopusDeploy-Api)**, along with [Octopus.Client samples](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client).
