---
title: Octopus.Client
description: Octopus.Client is an open source .NET library that makes it easy to write C# programs that interact with the Octopus Deploy REST API.
position: 110
---

Octopus.Client is an [open source](https://github.com/OctopusDeploy/OctopusClients) .NET library that makes it easy to write C# programs or PowerShell scripts that manipulate the [Octopus Deploy REST API](/docs/octopus-rest-api/index.md).

Because the Octopus Deploy application itself is built entirely on the API, any programming language that can make HTTP requests to the API can do anything that could be done by a user of the application itself.

Octopus.Client is [published on NuGet](https://www.nuget.org/packages/Octopus.Client). The package contains both a .NET Framework build as well as a .NET Standard build. The .NET Framework build targets 4.5 and later, and the .NET Standard build is cross-platform and compatible with a [variety of runtimes](https://docs.microsoft.com/en-us/dotnet/articles/standard/library), including .NET Core and can be used from PowerShell Core.

## Getting Started {#Octopus.Client-Gettingstarted}

:::hint
Details for where to find the API, how to authenticate, and the available resources are available at [the API documentation site](https://g.octopushq.com/ApiDocs), and [swagger documentation is also available](https://demo.octopus.com/swaggerui).
:::

To use from PowerShell, use the `Install-Package` command from the Microsoft [PackageManagement](https://docs.microsoft.com/en-us/powershell/module/packagemanagement) module:
```powershell
Install-Package Octopus.Client -source https://www.nuget.org/api/v2 -SkipDependencies
$path = Join-Path (Get-Item ((Get-Package Octopus.Client).source)).Directory.FullName "lib/net45/Octopus.Client.dll"
Add-Type -Path $path
```

For PowerShell Core, the path needs to be slightly different:
```powershell
Install-Package Octopus.Client -source https://www.nuget.org/api/v2 -SkipDependencies
$path = Join-Path (Get-Item ((Get-Package Octopus.Client).source)).Directory.FullName "lib/netstandard2.0/Octopus.Client.dll"
Add-Type -Path $path
```

Note that if you're referencing the netstandard version of Octopus.Client, you may find you also need to add a reference to `NewtonSoft.Json.dll` and `Octodiff`:
```powershell
# if you're using `Install-Package`
$path = Join-Path (Get-Item ((Get-Package NewtonSoft.Json).source)).Directory.FullName "lib/netstandard2.0/NewtonSoft.Json.dll"
Add-Type -Path $path
$path = Join-Path (Get-Item ((Get-Package Octodiff).source)).Directory.FullName "lib/netstandard2.0/Octodiff.dll"
Add-Type -Path $path

# alternatively, if you are referencing from the Tentacle directory
Add-Type -Path '/path-to/NewtonSoft.Json.dll'
Add-Type -Path '/path-to/Octodiff.dll'
```

To use from C#, first install the package via the NuGet Package Manager:

```powershell
PM> Install-Package Octopus.Client
```

Alternatively, the client is available in both the installation directory of Octopus Deploy Server and Tentacle.

### Synchronous API {#Octopus.Client-SynchronousAPI}

The easiest way to use the client is via the `OctopusRepository` helper:

```powershell PowerShell
Add-Type -Path 'C:\PathTo\Octopus.Client.dll'
$server = "https://myoctopus.example.com"
$apiKey = "API-YOURKEY";              # Get this from your 'profile' page in the Octopus web portal
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($server, $apiKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
```
```cs C#
var server = "https://myoctopus.example.com/";
var apiKey = "API-YOURKEY";             // Get this from your 'profile' page in the Octopus web portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
var repository = new OctopusRepository(endpoint);
```

API key authentication is recommended, but you can use username/password for authentication with the `SignIn()` method instead:

```powershell PowerShell
$loginCreds = New-Object Octopus.Client.Model.LoginCommand
$loginCreds.Username = "me"
$loginCreds.Password = "secret"
$repository.Users.SignIn($loginCreds)
```
```cs C#
repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```

### Asynchronous API (Octopus.Client 4.0+) {#Octopus.Client-AsynchronousAPI(Octopus.Client4.0+)}

The easiest way to use the client is via the `OctopusAsyncClient`:

```cs c#
var server = "https://myoctopus.example.com/";
var apiKey = "API-YOURKEY";             // Get this from your 'profile' page in the Octopus web portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
using (var client = await OctopusAsyncClient.Create(endpoint))
{
}
```

If you don't want to provide an API key for authentication, you can leave it out and authenticate with the `SignIn()` method instead:

```cs
await client.Repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```

## Working With Resources {#Octopus.Client-Workingwithresources}

Resources can be loaded and saved with code like the following:

```powershell PowerShell
$machine = $repository.Machines.Get("machines-1");
$machine.Name = "Test Server 1";
$repository.Machines.Modify($machine);
```
```cs C#
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

## Working Directly With the Client {#Octopus.Client-Workingdirectlywiththeclient}

For some operations not available through repositories it will be necessary to use the `IOctopusClient` type:

```powershell PowerShell
$connection = $repository.Client.Get($machine.Links["Connection"]);
```
```cs C#
// Sync
var connection = repository.Client.Get(machine.Links["Connection"]);
 
// Async
var connection = await client.Get(machine.Links["Connection"]);
```

The entire API is accessible by traversing links - each resource carries a collection of links, like the `Connection` link on `MachineResource` shown above.

:::warning
Always access objects by traversing the links; avoid using direct url segments, as they may change in the future.
:::

To start traversing links, `IOctopusClient.RootDocument` is provided:

```powershell PowerShell
$link = $repository.Client.RootDocument.Links["CurrentUser"].ToString()
$method = $repository.Client.GetType().GetMethod("Get").MakeGenericMethod([Octopus.Client.Model.UserResource])
$me = $method.invoke($repository.Client, @($link, $null))
```
```cs C#
// Sync
var me = repository.Client.Get<UserResource>(repository.Client.RootDocument.Links["CurrentUser"]);
 
// Async
var me = await client.Get<UserResource>(client.RootDocument.Links["CurrentUser"])
```
*(This is only an example. This common operation is also available via `repository.Users.GetCurrent()`.)*

## Working With Spaces

**Octopus 2019.1** introduced [Spaces](/docs/administration/spaces/index.md). Working with anything other than the default space requires specifying the target space. There are two methods of specifying the target space with Octopus.Client:

### `OctopusClient.ForSpace`

```powershell PowerShell
# Create endpoint and client
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint("https://myoctopus.example.com", "API-YOURKEY")
$client = New-Object Octopus.Client.OctopusClient($endpoint)

# Get default repository and get space by name
$repository = $client.ForSystem()
$space = $repository.Spaces.FindByName("Space Name")

# Get space specific repository and get all projects in space
$repositoryForSpace = $client.ForSpace($space)
$projects = $repositoryForSpace.Projects.GetAll()
```
```cs C#
// Create endpoint and client
var endpoint = new OctopusServerEndpoint("https://myoctopus.example.com", "API-YOURKEY");
var client = new OctopusClient(endpoint);

// Get default repository and get space by name
var repository = client.ForSystem();
var space = repository.Spaces.FindByName("Space Name");

// Get space specific repository and get all projects in space
var repositoryForSpace = client.ForSpace(space);
var projects = repositoryForSpace.Projects.GetAll();
```

### `OctopusRepositoryExtensions.ForSpace`

```powershell PowerShell
# Create endpoint and repository
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint("https://myoctopus.example.com", "API-YOURKEY")
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)

# Get space by name
$space = $repository.Spaces.FindByName("Space Name")

# Get space specific repository and get all projects in space
$repositoryForSpace = [Octopus.Client.OctopusRepositoryExtensions]::ForSpace($repository, $space)
$projects = $repositoryForSpace.Projects.GetAll()
```
```cs C#
// Create endpoint and repository
var endpoint = new OctopusServerEndpoint("https://myoctopus.example.com", "API-YOURKEY");
var repository = new OctopusRepository(endpoint);

// Get space by name
var space = repository.Spaces.FindByName("Space Name");

// Get space specific repository and get all projects in space
var repositoryForSpace = repository.ForSpace(space);
var projects = repositoryForSpace.Projects.GetAll();
```

## Loading in an Octopus Step {#Octopus.Client-Loadinginanoctopusstep}

You can use Octopus.Client from inside Octopus (for example in a script step, a package install script, or the script console) by loading it from the server or Tentacle application directory. The credentials would still need to be supplied to establish the connection. For example:

```powershell PowerShell
Add-Type -Path C:\Program Files\Octopus Deploy\Octopus\Octopus.Client.dll'
```
```cs C#
#r "C:\\Program Files\\Octopus Deploy\\Octopus\\Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
```

:::hint
**Tip**
The variable `Octopus.Tentacle.Agent.ProgramDirectoryPath` was added in server version 3.7.12, which can be used to obtain the directory that contains the Octopus.Client assembly. For prior versions of the server, the variable `Octopus.Tentacle.Agent.ProgramDirectoryPath` can be used, but that will not work for steps that run on the Octopus Server or cloud regions.
:::

## Documentation and Samples {#Octopus.Client-Documentationandsamples}

[Documentation](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki) and [samples](https://github.com/OctopusDeploy/OctopusDeploy-Api) for the Octopus Deploy REST API are available on the **[Octopus REST API GitHub site](https://github.com/OctopusDeploy/OctopusDeploy-Api)**, along with [Octopus.Client samples](https://github.com/OctopusDeploy/OctopusDeploy-Api/tree/master/Octopus.Client).
