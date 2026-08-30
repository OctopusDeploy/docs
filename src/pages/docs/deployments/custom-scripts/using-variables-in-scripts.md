---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2026-08-11
title: Using variables in scripts
description: With Octopus you can define variables for use with your custom scripts.
icon: fa-solid fa-file-code
navOrder: 30
---

Octopus allows you to [define variables](/docs/projects/variables/) to customize your deployments. These variables, along with some [predefined variables](/docs/projects/variables/system-variables), will automatically be made available to your scripts as global variables.

:::div{.warning}
**All variables are strings**
Note that in scripts **all Octopus variables are strings** even if they look like numbers or other data types. You will need to cast to the appropriate type before using the value if you need something other than a string.
:::

Let's consider an example where we have defined a project variable called `MyApp.ConnectionString`.

<details data-group="using-variables-in-scripts">
<summary>PowerShell</summary>

```powershell
# It's a good idea to copy the value into a local variable to avoid quoting issues
$connectionString = $OctopusParameters["MyApp.ConnectionString"]
Write-Host "Connection string is: $connectionString"
```

</details>
<details data-group="using-variables-in-scripts">
<summary>C#</summary>

```csharp
// It's a good idea to copy the value into a local variable to avoid quoting issues
var connectionString = OctopusParameters["MyApp.ConnectionString"];
Console.WriteLine("MyApp.ConnectionString: " + connectionString);
```

</details>
<details data-group="using-variables-in-scripts">
<summary>Bash</summary>

```bash
# It's a good idea to copy the value into a variable to avoid quoting issues
connectionString=$(get_octopusvariable "MyApp.ConnectionString")
echo "Connection string is: $connectionString"
```

</details>
<details data-group="using-variables-in-scripts">
<summary>Python3</summary>

```python
connectionString = get_octopusvariable("MyApp.ConnectionString")
print(connectionString)
```

</details>

## Variables in PowerShell scripts {#variables-in-powershell}

In PowerShell we have pre-defined some script-scoped variables for you as a convenience. Consider the same example as before, a variable named "MyApp.ConnectionString" will be available as both:

- `$OctopusParameters["MyApp.ConnectionString"]`
- `$MyAppConnectionString`

In the first form the variable name appears just as they appear in the Octopus Web Portal, while in the second example special characters have been removed. The first form is the most flexible, but in some cases the second form may be more convenient.
