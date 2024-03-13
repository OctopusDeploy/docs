---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Working with Resources
description: How to load, modify and save resources with the Octopus.Client library.
navOrder: 20
---

You can load, modify and save resources using the different `Repository` classes provided in the Octopus.Client library.
The following example retrieves a [deployment target](/docs/infrastructure/deployment-targets), names it `Test Server 1` and then saves it:

<details data-group="octopus-client-using-resources">
<summary>PowerShell</summary>

```powershell
$machine = $repository.Machines.Get("machines-1");
$machine.Name = "Test Server 1";
$repository.Machines.Modify($machine);
```

</details>
<details data-group="octopus-client-using-resources">
<summary>C#</summary>

```csharp
// Sync
var machine = repository.Machines.Get("machines-1");
machine.Name = "Test Server 1";
repository.Machines.Modify(machine);
 
// Async
var machine = await repository.Machines.Get("machines-1");
machine.Name = "Test Server 1";
await repository.Machines.Modify(machine);
```

</details>

The repository methods all make direct HTTP requests. There's no "session" abstraction or transaction support.