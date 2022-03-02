---
title: Getting started
description: Getting started with the Octopus.Client.
position: 10
---

There are two ways to use the Octopus Client library:
1. The `Octopus.Server.Client` package is a standard NuGet package useful for normal applications.
1. The `Octopus.Client` package is NuGet package containing an ILMerged single `Octopus.Client.dll` comprising `Octopus.Server.Client.dll` (above) and all of its dependencies. This is useful for scripting where importing a single .NET assembly is preferable.

:::hint
**Usage guidance**

- Unless you have a specific need to use the ILMerged `Octopus.Client`, we recommend using the `Octopus.Server.Client` package. In both cases, the calling conventions are identical - the former is just an ILMerged version of the latter.
- If you're intending to use the contract DTO classes from the library with your own serialization mechanism, you'll definitely want to use `Octopus.Server.Client`. The ILMerged client also merges in `Newtonsoft.Json` so your own serializer won't recognize any of the serialization attributes.
:::

!include <octopus-client-shipped-with-server-and-tentacle>

## Getting started with the Octopus Client in a .NET application

### Package installation

To use from C#, first install the package via the NuGet Package Manager:

```powershell Package Management Console
Install-Package Octopus.Server.Client
```
```bash .NET CLI
dotnet add package Octopus.Server.Client
```

### Creating and using the client (Synchronous API) {#Octopus.Client-SynchronousAPI}

The easiest way to use the client is via the `OctopusRepository` helper:

```cs C#
var server = "https://myoctopus.example.com/";
var apiKey = "API-YOURKEY";             // Get this from your 'profile' page in the Octopus Web Portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
var repository = new OctopusRepository(endpoint);
```

API key authentication is recommended, but you can use username/password for authentication with the `SignIn()` method instead:

```cs C#
repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```


### Creating and using the client (Asynchronous API) {#Octopus.Client-AsynchronousAPI(Octopus.Client4.0+)}

The easiest way to use the client is via the `OctopusAsyncClient`:

```cs C#
var server = "https://myoctopus.example.com/";
var apiKey = "API-YOURKEY";             // Get this from your 'profile' page in the Octopus Web Portal
var endpoint = new OctopusServerEndpoint(server, apiKey);
using (var client = await OctopusAsyncClient.Create(endpoint))
{
}
```

If you don't want to provide an API key for authentication, you can leave it out and authenticate with the `SignIn()` method instead:

```cs
await client.Repository.Users.SignIn(new LoginCommand { Username = "me", Password = "secret" });
```

## Getting started with the Octopus Client package in a PowerShell script

### Package installation

To get started with the Octopus Client library from PowerShell, use the `Install-Package` command from the Microsoft [PackageManagement](https://docs.microsoft.com/en-us/powershell/module/packagemanagement) module:
```powershell PowerShell
Install-Package Octopus.Client -source https://www.nuget.org/api/v2 -SkipDependencies
$path = Join-Path (Get-Item ((Get-Package Octopus.Client).source)).Directory.FullName "lib/net452/Octopus.Client.dll"
Add-Type -Path $path
```
```powershell PowerShell Core
Install-Package Octopus.Client -source https://www.nuget.org/api/v2 -SkipDependencies
$path = Join-Path (Get-Item ((Get-Package Octopus.Client).source)).Directory.FullName "lib/netstandard2.0/Octopus.Client.dll"
Add-Type -Path $path
```
:::hint
Note that for the `PowerShell Core` example above, the path needs to be slightly different than the one for `PowerShell`.
:::

If you're referencing an older version of the .NET Standard version of Octopus.Client, you may find you also need to add a reference to `NewtonSoft.Json.dll` and `Octodiff`:
```powershell
# Using `Install-Package`
$path = Join-Path (Get-Item ((Get-Package NewtonSoft.Json).source)).Directory.FullName "lib/netstandard2.0/NewtonSoft.Json.dll"
Add-Type -Path $path

$path = Join-Path (Get-Item ((Get-Package Octodiff).source)).Directory.FullName "lib/netstandard2.0/Octodiff.dll"
Add-Type -Path $path
```

### Creating an instance of the client

```powershell PowerShell
Add-Type -Path 'C:\PathTo\Octopus.Client.dll'
$server = "https://myoctopus.example.com"
$apiKey = "API-YOURKEY";              # Get this from your 'profile' page in the Octopus Web Portal
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($server, $apiKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
```

### Using the synchronous API

```powershell PowerShell
$loginCreds = New-Object Octopus.Client.Model.LoginCommand
$loginCreds.Username = "me"
$loginCreds.Password = "secret"
$repository.Users.SignIn($loginCreds)
```
