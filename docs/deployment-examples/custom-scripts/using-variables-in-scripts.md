---
title: Using Variables in Scripts
description: With Octopus you can define variables for use with your custom scripts.
position: 30
---

Octopus allows you to [define variables](/docs/deployment-process/variables/index.md) to customize your deployments. These variables, along with some [predefined variables](/docs/deployment-process/variables/system-variables.md), will automatically be made available to your scripts as global variables.

:::warning
**All variables are strings**
Note that in scripts **all Octopus variables are strings** even if they look like numbers or other data types. You will need to cast to the appropriate type before using the value if you need something other than a string.
:::

Let's consider an example where we have defined a project variable called `MyApp.ConnectionString`.

```powershell PowerShell
# It's a good idea to copy the value into a local variable to avoid quoting issues
$connectionString = $OctopusParameters["MyApp.ConnectionString"]
Write-Host "Connection string is: $connectionString"
```

```c# C#
// It's a good idea to copy the value into a local variable to avoid quoting issues
var connectionString = Octopus.Parameters["MyApp.ConnectionString"];
Console.WriteLine("MyApp.ConnectionString: " + connectionString);
```

```bash Bash
# It's a good idea to copy the value into a variable to avoid quoting issues
connectionString=$(get_octopusvariable "MyApp.ConnectionString")
echo "Connection string is: $connectionString"
```

```fsharp F#
// It's a good idea to copy the value into a variable to avoid quoting issues

// tryFindVariable : name:string -> string option
let connectionString = Octopus.tryFindVariable "MyApp.ConnectionString"
match connectionString with
    | Some x -> printf "Connection string is: %s" x
    | None -> printf "Connection string not found"
 
// Or one of the simplified versions

// Throws KeyNotFoundException when variable does not exist
// findVariable : name:string -> string
let connectionString = Octopus.findVariable "MyApp.ConnectionString"

// Returns default value when variable does not exist
// findVariableOrDefault : defaultValue:string -> name:string -> string
let connectionString = Octopus.findVariableOrDefault "Default Value" "MyApp.ConnectionString"
```

```python Python3
connectionString = get_octopusvariable("MyApp.ConnectionString")
print(connectionString)
```

:::success
To see the F# API available to your F# scripts, take a look at our [F# signature file](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari.Shared/Integration/Scripting/FSharp/Bootstrap.fsi).
:::

## Variables in PowerShell Scripts {#Customscripts-VariablesinPowerShellscripts}

In PowerShell we have pre-defined some script-scoped variables for you as a convenience. Consider the same example as before, a variable named "MyApp.ConnectionString" will be available as both:

- `$OctopusParameters["MyApp.ConnectionString"]`
- `$MyAppConnectionString`

In the first form the variable name appears just as they appear in the Octopus web portal, while in the second example special characters have been removed. The first form is the most flexible, but in some cases the second form may be more convenient.

:::hint
**$key variable**
We [fixed an issue](https://github.com/OctopusDeploy/Issues/issues/2329) which was causing a collision with variables called `$key`. You can either rename your variable or update to **Octopus 3.3.10** or newer.
:::
