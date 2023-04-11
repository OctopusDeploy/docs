---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Working with Resources
description: How to load, modify and save resources with the Octopus.Client library.
navOrder: 20
---

You can load, modify and save resources using the different `Repository` classes provided in the Octopus.Client library.
The following example retrieves a [deployment target](/docs/infrastructure/deployment-targets/index.md), names it `Test Server 1` and then saves it:

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

The repository methods all make direct HTTP requests. There's no "session" abstraction or transaction support.