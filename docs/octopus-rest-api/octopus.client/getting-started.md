title: Getting started
description: Getting started with the Octopus.Client
position: 10
---

To get started with the Octopus.Client library from PowerShell, use the `Install-Package` command from the Microsoft [PackageManagement](https://docs.microsoft.com/en-us/powershell/module/packagemanagement) module:
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

If you're referencing the netstandard version of Octopus.Client, you may find you also need to add a reference to `NewtonSoft.Json.dll` and `Octodiff`:
```powershell
# Using `Install-Package`
$path = Join-Path (Get-Item ((Get-Package NewtonSoft.Json).source)).Directory.FullName "lib/netstandard2.0/NewtonSoft.Json.dll"
Add-Type -Path $path
$path = Join-Path (Get-Item ((Get-Package Octodiff).source)).Directory.FullName "lib/netstandard2.0/Octodiff.dll"
Add-Type -Path $path
```

To use from C#, first install the package via the NuGet Package Manager:

```powershell
PM> Install-Package Octopus.Client
```

!include <octopus-client-shipped-with-server-and-tentacle>

### Synchronous API {#Octopus.Client-SynchronousAPI}

The easiest way to use the client is via the `OctopusRepository` helper:

```powershell PowerShell
Add-Type -Path 'C:\PathTo\Octopus.Client.dll'
$server = "https://myoctopus.example.com"
$apiKey = "API-YOURKEY";              # Get this from your 'profile' page in the Octopus Web Portal
$endpoint = New-Object Octopus.Client.OctopusServerEndpoint($server, $apiKey)
$repository = New-Object Octopus.Client.OctopusRepository($endpoint)
```
```cs C#
var server = "https://myoctopus.example.com/";
var apiKey = "API-YOURKEY";             // Get this from your 'profile' page in the Octopus Web Portal
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