## Using Variables in Scripts {#Customscripts-Variables}

Octopus allows you to [define variables](/docs/deployment-process/variables/index.md) to parameterize your deployments. These variables, along with some predefined variables, will be available from within your scripts.

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

:::success
To see the F# API available to your F# scripts, take a look at our [F# signature file](https://github.com/OctopusDeploy/Calamari/blob/master/source/Calamari.Shared/Integration/Scripting/FSharp/Bootstrap.fsi).
:::

### Variables in PowerShell Scripts {#Customscripts-VariablesinPowerShellscripts}

In PowerShell we have pre-defined some script-scoped variables for you as a convenience. Consider the same example as before, a variable named "MyApp.ConnectionString" will be available as both:

- `$OctopusParameters["MyApp.ConnectionString"]`
- `$MyAppConnectionString`

In the first form the variable name appears just as they appear in the Octopus web portal, while in the second example special characters have been removed. The first form is the most flexible, but in some cases the second form may be more convenient.

:::hint
**$key variable**
We [fixed an issue](https://github.com/OctopusDeploy/Issues/issues/2329) which was causing a collision with variables called `$key`. You can either rename your variable or update to **Octopus 3.3.10** or newer.
:::

## Passing Parameters to Scripts {#Customscripts-Passingparameterstoscripts}

:::hint
Script parameters are available in **Octopus 3.3.21** or newer. You can use script parameters for file-based scripts that are sourced from a package.
:::

Octopus can pass parameters to your custom script files for any of the supported scripting languages. This means you can use existing scripts, or write and test your own parameterized scripts that have no knowledge of Octopus, passing Octopus Variables directly to your scripts as parameters. The Octopus scripting API is still available within the context of your script, meaning you can use a mixture of parameters and other Octopus variables and functions.

Consider this example PowerShell script:

**PowerShell script using Octopus Variables**

```powershell
$environment = $OctopusParameters["Octopus.Environment.Name"]
Write-Host "Environment: $environment"
```

You can parameterize this script making it easier to test outside of Octopus:

**PowerShell script using parameters**

```powershell
param (
	[Parameter(Mandatory=$True)]
	[string]$Environment
)
Write-Host "Environment: $Environment"
```

When you call external scripts (sourced from a file inside a package) you can pass parameters to your script. This means you can write "vanilla" scripts that are unaware of Octopus, and test them in your local development environment.

You can define your parameters in the **Script Parameters** field using the format expected by your scripting execution environment (see below for examples).

![](/docs/images/3048092/5865635.png "width=500")

:::hint
**Delimiting string values**
Don't forget to correctly delimit your parameters correctly for the scripting engine. In the example above we have surrounded the parameter value in double-quotes to handle cases where the Environment Name has spaces: `"#{Octopus.Environment.Name}"`
:::

### Passing Parameters to PowerShell Scripts {#Customscripts-PassingparameterstoPowerShellscripts}

You can pass parameters to PowerShell scripts as if you were calling the script yourself from PowerShell, using positional or named parameters.

**Script Parameters in Octopus**

```bash
-Environment "#{Octopus.Environment.Name}" -StoragePath "#{MyApplication.Storage.Path}"
```

**Usage in PowerShell script**

```powershell
Param (
	[Parameter(Mandatory=$True)]
	[string]$Environment,
	[Parameter(Mandatory=$True)]
	[string]$StoragePath
)
 
Write-Host "$Environment storage path: $StoragePath"
```

### Passing Parameters to C# Scripts {#Customscripts-PassingparameterstoC#scripts}

You can pass parameters to C# scripts [as described here for the ScriptCS engine](https://github.com/scriptcs/scriptcs/wiki/Pass-arguments-to-scripts). ScriptCS only supports positional parameters.

**Script Parameters in Octopus**

```bash
-- "#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in C# script**

```c#
var environment = Env.ScriptArgs[0]
var storagePath = Env.ScriptArgs[1]
Console.WriteLine("{0} storage path: {1}", environment, storagePath);
```

### Passing Parameters to Bash Scripts {#Customscripts-PassingparameterstoBashscripts}

You can pass parameters to Bash scripts [as described in Bash manual.](https://www.gnu.org/software/bash/manual/bash.html#Positional-Parameters)

**Script Parameters in Octopus**

```powershell
"#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in Bash script**

```bash
environment="$1"
storagePath="$2"
echo "$environment storage path: $storagePath"
```

### Passing Parameters to F# Scripts {#Customscripts-PassingparameterstoF#scripts}

You can pass parameters to FSharp scripts [as described in MSDN.](https://msdn.microsoft.com/en-us/visualfsharpdocs/conceptual/fsharp-interactive-%5Bfsi.exe%5D-reference#differences-between-the-interactive-scripting-and-compiled-environments)

**Script Parameters in Octopus**

```powershell
"#{Octopus.Environment.Name}" "#{MyApplication.Storage.Path}"
```

**Usage in F# script**

```fsharp
let environment = fsi.CommandLineArgs.[1]
let storagePath = fsi.CommandLineArgs.[2]
printfn "$s storage path: $s" environment storagePath
```
