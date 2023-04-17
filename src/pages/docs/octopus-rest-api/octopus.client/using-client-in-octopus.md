---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Using in an Octopus Step
description: How to use the Octopus.Client library from inside Octopus, for example within a script step.
navOrder: 50
---

You can use Octopus.Client from inside Octopus (for example in a script step or a package install script) by referencing it as a package. You can configure [nuget.org](https://api.nuget.org/v3/index.json) as an [External Feed](/docs/packaging-applications/package-repositories/nuget-feeds/) that provides this package. Octopus will automatically extract this package for you, allowing your script to reference the .dll file it contains using a relative path. For example:

```powershell PowerShell
Add-Type -Path 'Octopus.Client/lib/netstandard2.0/Octopus.Client.dll'
```
```cs C#
#r "Octopus.Client/lib/netstandard2.0/Octopus.Client.dll"
using Octopus.Client;
using Octopus.Client.Model;
```

The credentials would still need to be supplied to establish the connection. 

!include <octopus-client-shipped-with-server-and-tentacle>
