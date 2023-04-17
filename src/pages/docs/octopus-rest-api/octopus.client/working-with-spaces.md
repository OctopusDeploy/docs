---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Working with Spaces
description: How to work with Spaces in the Octopus.Client library.
navOrder: 40
---

Working with anything other than the default space in the Octopus.Client library requires specifying the target space. There are two methods of specifying the target space with Octopus.Client.

The first is the `OctopusClient.ForSpace` method:

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
```csharp C#
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

The other method is `OctopusRepositoryExtensions.ForSpace`:

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
```csharp C#
// Create endpoint and repository
var endpoint = new OctopusServerEndpoint("https://myoctopus.example.com", "API-YOURKEY");
var repository = new OctopusRepository(endpoint);

// Get space by name
var space = repository.Spaces.FindByName("Space Name");

// Get space specific repository and get all projects in space
var repositoryForSpace = repository.ForSpace(space);
var projects = repositoryForSpace.Projects.GetAll();
```