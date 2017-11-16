---
title: Custom scripts
description: Custom scripts allows you to script anything you want using PowerShell, ScriptCS, F# or Bash.
position: 10
---

As a convention-oriented deployment tool, Octopus can perform a number of actions automatically, such as [managing configuration files](/docs/deploying-applications/configuration-files/index.md), creating [IIS websites and application pools](/docs/deploying-applications/iis-websites-and-application-pools.md), and installing [Windows Services](/docs/deploying-applications/windows-services.md). Sometimes however you’ll need to do more than the built-in conventions support – and that’s where custom scripts come in.

!toc

:::hint
**Supported script types**
Octopus Deploy supports PowerShell scripts (`.ps1`), C# scripts (`.csx`) using [ScriptCS](https://github.com/scriptcs/scriptcs), Bash scripts (`.sh`), and in Octopus 3.4 we introduced support for F# scripts (`.fsx`).
:::

:::hint
**How your scripts are bootstrapped by Calamari**
Each of your scripts will be bootstrapped by the [open-source Calamari project](https://github.com/OctopusDeploy/Calamari) to provide access to variables and helper functions. You can see how your scripts are bootstrapped in the [Calamari source code](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari/Integration/Scripting).
:::

## Scripts in Packages {#Customscripts-ScriptsinPackagesscripts-in-packages}

In your package, you can add any of the following script files in any of the scripting languages supported by Octopus where `<ext>` is the appropriate extension for your scripting language of choice:

- `PreDeploy.<ext>`
- `Deploy.<ext>`
- `PostDeploy.<ext>`
- `DeployFailed.<ext>`

After extracting your package, Calamari will detect these scripts and invoke them. Which file you use depends on when you need your custom activity to run – see the section on [what order are conventions run in](/docs/reference/package-deployment-feature-ordering.md) for details. Your scripts can do anything your scripting language supports, as well as setting [output variables](/docs/deploying-applications/variables/output-variables.md) and [collecting artifacts](/docs/deploying-applications/artifacts.md). These scripts must be located in the root of your package.

As mentioned above, you can create a file named `DeployFailed.<ext>`, which will be invoked if the package deployment fails. Our blog post about this feature [describes how DeployFailed.<ext> works](https://octopus.com/blog/deployfailed).

:::hint
**Script Support on Deployment Targets**
Of course, Bash scripts will only be supported on Linux / OSX Targets and PowerShell and Script CS will only run on Windows. So ensure you've selected the correct language for your deployment target
:::

:::success
Make sure that the scripts are included in your package. If you are using OctoPack for an ASP.NET web application, you'll need to make sure the file is marked as **Build Action =** **Content**.

![](/docs/images/3048092/3277766.png "width=500")

If you are using OctoPack to package a Windows Service or console application, set **Copy to Output Directory** = **Copy if newer**.

![](/docs/images/3048092/3277765.png "width=500")

Read more about [using OctoPack](/docs/packaging-applications/creating-packages/nuget-packages/using-octopack/index.md).
:::

## Scripts in package steps {#Customscripts-Scriptsinpackagestepsscripts-configured-in-steps}

Rather than embed scripts in packages, you can also define scripts within the package step definition in Octopus. This is a feature that can be enabled on package steps:

![](/docs/images/3048092/3277758.png "width=500")

When enabled, you can define your PreDeploy/Deploy/PostDeploy scripts within the Octopus user interface:

![](/docs/images/3048092/5865605.png "width=500")

## Standalone scripts {#Customscripts-Standalonescripts}

Octopus also allows you to add standalone script steps to your deployment process. You can use standalone scripts to execute scripts on the Octopus Server or on [deployment targets](/docs/deployment-targets/index.md), where the script can be defined inline or as part of a package. Standalone scripts are so useful we've dedicated an entire page to them: [Standalone scripts](/docs/deploying-applications/custom-scripts/standalone-scripts.md).

![](/docs/images/5671696/5865914.png "width=170")

## Azure PowerShell scripts {#Customscripts-AzurePowerShellscripts}

You can manage your Azure subscription using custom PowerShell scripts and the Azure Resource Management (RM) or Service Management (SM) API - [more information](/docs/deploying-applications/custom-scripts/azure-powershell-scripts.md).

![](/docs/images/5671696/5865912.png "width=170")

For information about adding a step to the deployment process, see the [add step](/docs/deploying-applications/adding-steps.md) section.

!partial <service-fabric-powershell>

## Variables {#Customscripts-Variables}

Octopus allows you to [define variables](/docs/deploying-applications/variables/index.md) to parameterize your deployments. These variables, along with some predefined variables, will be available from within your scripts.

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
To see the F# API available to your F# scripts, take a look at our [F# signature file](https://github.com/OctopusDeploy/Calamari/blob/develop/source/Calamari/Integration/Scripting/FSharp/Bootstrap.fsi).
:::

### Variables in PowerShell scripts {#Customscripts-VariablesinPowerShellscripts}

In PowerShell we have pre-defined some script-scoped variables for you as a convenience. Consider the same example as before, a variable named "MyApp.ConnectionString" will be available as both:

- `$OctopusParameters["MyApp.ConnectionString"]`
- `$MyAppConnectionString`

In the first form the variable name appears just as they appear in the Octopus web portal, while in the second example special characters have been removed. The first form is the most flexible, but in some cases the second form may be more convenient.

:::hint
**$key variable**
We [fixed an issue](https://github.com/OctopusDeploy/Issues/issues/2329) which was causing a collision with variables called `$key`. You can either rename your variable or update to Octopus 3.3.10 or newer.
:::

## Passing parameters to scripts {#Customscripts-Passingparameterstoscripts}

:::hint
Script parameters are available in Octopus 3.3.21 or newer. You can use script parameters for file-based scripts that are sourced from a package.
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
Params (
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

### Passing parameters to PowerShell scripts {#Customscripts-PassingparameterstoPowerShellscripts}

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

### Passing parameters to C# scripts {#Customscripts-PassingparameterstoC#scripts}

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

### Passing parameters to Bash scripts {#Customscripts-PassingparameterstoBashscripts}

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

### Passing parameters to F# scripts {#Customscripts-PassingparameterstoF#scripts}

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

## Logging {#Customscripts-Logging}

When your scripts emit messages Octopus will display the messages in the Task Logs at the most appropriate level for the message. For example:

```powershell PowerShell
Write-Verbose "This will be logged as a Verbose message - verbose messages are hidden by default"
Write-Host "This will be logged as Information"
Write-Output "This will be logged as Information too!"
Write-Warning "This will be logged as a Warning"
Write-Error "This will be logged as an Error and may cause your script to stop running - take a look at the section on Error Handling"
```

```c# C#
Console.WriteLine("This will be logged as Information");
Console.Out.WriteLine("This will be logged as Information too!");
Console.Error.WriteLine("This will be logged as an Error.");
 
Console.WriteLine("##octopus[stdout-verbose]");
Console.WriteLine("And now messages written to stdout will be logged as Verbose");
```

```bash Bash
echo "This will be logged as Information"
>&2 echo "This will be logged as an Error"
echoerror() { echo "$@" 1>&2; }
echoerror "You can even define your own function to echo an error!"
```

```fsharp F#
printfn "This will be logged as Information" 
eprintfn "This will be logged as Error" 
```

Try these out for yourself using the [Script Console](/docs/administration/script-console.md)!

### Service Message ###
The following service messages can be written directly to standard output which will be parsed by the server and the subsiquent log lines will be treated with the relevant log level.
```
##octopus[stdout-ignore]
##octopus[stdout-error]
##octopus[stdout-default]
##octopus[stdout-warning]
##octopus[stdout-verbose]
```

## Error handling {#Customscripts-Errorhandling}

Calamari examines the exit code of the script engine to determine whether the script failed. If the exit code is zero, Calamari assumes the script ran successfully. If the exit code is non-zero, then Calamari assumes the script failed.

Syntax errors and unhandled exceptions will result in a non-zero exit code from the script engine, which will fail the deployment

### Error handling in PowerShell scripts {#Customscripts-ErrorhandlinginPowerShellscripts}

For PowerShell scripts Calamari also sets the `$ErrorActionPreference` to **Stop** before invoking your script. This means that if a command fails, the rest of the script won't be executed. For example:

```powershell
Write-Output "Hello"
Write-Error "Something went wrong"
Write-Output "Goodbye"
```

The third line will not be executed. To change this behavior, set `$ErrorActionPreference` to **Continue** at the top of your script.

At the end of the script, Calamari also checks `$LastExitCode` to see if the last Windows-based program that you invoked exited successfully. Note that some Windows programs use non-zero exit codes even when they run successfully - for example, Robocopy returns the number of files copied. This can mean that Calamari assumes your script failed even if it actually ran successfully. Best practice is to call `Exit 0` yourself if your script ran successfully.

Note that you'll need to check `$LastExitCode` yourself if you run multiple Windows programs. For example, with this script, Calamari would correctly see that ping returned an exit code of 1 (the host couldn't be contacted) and will assume the script failed:

```powershell
& ping 255.255.255.0  # Host does not exist, will return exit code 1
```

But if your script looks like this, Calamari will only examine the exit code from the last line (which is successful), so it will assume the script was successful.

```powershell
& ping 255.255.255.0  # Host does not exist, will return exit code 1
& ping 127.0.0.1      # Host exists, will return exit code 0
```

The best practice here is to always check the exit code when invoking programs:

```powershell
& ping 255.255.255.0
if ($LastExitCode -ne 0) {
    throw "Couldn't find 255.255.255.0"
}
& ping 127.0.0.1
if ($LastExitCode -ne 0) {
    throw "Couldn't find 127.0.0.1"
}
```

!partial <fail-step>

## Output variables {#Customscripts-Outputvariables}

Your scripts can emit variables that are available in subsequent deployment steps. This means you can factor your deployment into smaller, more well-defined steps that leverage the result of prior steps. It is an extremely powerful feature and you should refer to the documentation on [output variables](/docs/deploying-applications/variables/output-variables.md) for more information.

This example is from the sample project in the [Channels Walkthrough](https://octopus.com/blog/channels-walkthrough#prerequisites) which is also available on our [demo server](https://demo.octopusdeploy.com/app#/projects/channels-sample). Step 1 calculates a name by convention, which is used by subsequent steps.

![](/docs/images/3048092/5865520.png "width=500")

### Creating an Output Variable
```powershell PowerShell
Set-OctopusVariable -name "AppInstanceName" -value "MyAppInstance"
```

```c# C#
Octopus.SetVariable("AppInstanceName", "MyAppInstance");
```

```bash Bash
set_octopusvariable "AppInstanceName" "MyAppInstance"
```

```fsharp F#
Octopus.setVariable "AppInstanceName" "MyAppInstance"
```

### Using the variable in another step
```powershell PowerShell
$appInstanceName = $OctopusParameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

```c# C#
var appInstanceName = Octopus.Parameters["Octopus.Action[Determine App Instance Name].Output.AppInstanceName"]
```

```bash Bash
appInstanceName = $(get_octopusvariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName")
```

```fsharp F#
//throw if not found
let appInstanceName1 = Octopus.findVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//supply a default value to use if not found
let appInstanceName2 = Octopus.findVariableOrDefault "Value if not found" "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"

//return an Option type
let appInstanceName3 = Octopus.tryFindVariable "Octopus.Action[Determine App Instance Name].Output.AppInstanceName"
```

### Service Message ###
The following service message can be written directly (substituting the properties with the relevant values) to standard output which will be parsed by the server and the values processed as an output variable. Note that the properties must be supplied as a base64 encoded UTF-8 string.
```
##octopus[setVariable name='<Base64Encoded-VariableName>' value='<Base64Encoded-VariableValue>']
```

## Collecting artifacts {#Customscripts-Collectingartifacts}

Does your deployment produce a log file, configuration files, binaries, or test results you want to publish and keep as part of your deployment? Your scripts can instruct the Octopus server to collect files as deployment artifacts. Refer to the documentation on [artifacts](/docs/deploying-applications/artifacts.md) for more information.

```powershell PowerShell
New-OctopusArtifact -Path "C:\Windows\System32\drivers\etc\hosts" -Name "$([System.Environment]::MachineName)-hosts.txt" 
```

```c# C#
Octopus.CreateArtifact(@"C:\Windows\System32\drivers\etc\hosts", System.Environment.MachineName + "-hosts.txt");
```

```bash Bash
new_octopusartifact /etc/hosts $(hostname)-hosts.txt
```

```fsharp F#
Octopus.createArtifact @"C:\Windows\System32\drivers\etc\hosts" (System.Environment.MachineName + "-hosts.txt")
```

![](/docs/images/3048092/5865519.png "width=500")

### Service Message ###
The following service message can be written directly (substituting the properties with the relevant values) to standard output which will be parsed by the server and the artifact retrieved at the end of the step. Note that the properties must be supplied as a base64 encoded UTF-8 string.
```
##octopus[createArtifact path='<Base64Encoded-FullPath>' name='<Base64Encoded-FileName>' length='<Base64Encoded-FileLength>']
```

## Security and permissions {#Customscripts-Securityandpermissions}

Keep in mind that scripts are executed in the context of the account that the Tentacle Windows Service (which invokes Calamari) or SSH session runs as.

:::hint
By default Tentacle runs as **Local System**, which has extensive local privileges, but usually cannot access file shares, remote SQL databases, or other external resources. If you need wider permissions, you’ll need to configure Tentacle to run under a custom service account.
:::

:::warning
**PowerShell ExecutionPolicy: Unrestricted**
When Calamari invokes PowerShell.exe, it uses the **unrestricted** execution policy for the session. You can see how PowerShell scripts are executed in more detail by [looking at the open-source Calamari project](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari/Integration/Scripting/WindowsPowerShell).
:::

## Testing scripts {#Customscripts-Testingscripts}

You may find that your script runs differently under Calamari than it does when run from PowerShell directly.

The easiest way to test your scripts under Calamari is to use the [Script Console](/docs/administration/script-console.md). Alternatively you can invoke `Calamari.exe run-script` via the command line to test a script.

**Calamari run-script command**

```text
Usage: Calamari run-script [<options>]
Where [<options>] is any of:
      --variables=VALUE      Path to a JSON file containing variables.
      --package=VALUE        Path to the package to extract that contains the
                             package.
      --script=VALUE         Path to the script to execute. If --package is
                             used, it can be a script inside the package.
      --scriptParameters=VALUE
							 Parameters to pass to the script. Parameters 
							 need to be provided in a language specific way. 
							 E.g. -Parameter1 Value1 -Parameter2 Value2 for PowerShell or 
							 Value1 Value2 for Bash.
      --sensitiveVariables=VALUE
                             Password protected JSON file containing
                             sensitive-variables.
      --sensitiveVariablesPassword=VALUE
                             Password used to decrypt sensitive-variables.
      --substituteVariables  Perform variable substitution on the script body
                             before executing it.
```

## Working directories {#Customscripts-Workingdirectories}

Octopus Scripts are executed by Calamari, the command-line tool invoked by the Octopus Server or Tentacle during a deployment, within a the context of a working directory.  This location is C:\Octopus\Work\ by default.  If you're executing a script contained within a package, the package contents will be uncompressed and copied to this directory but the working directory is the directory containing the script within it.

## Preventing the PowerShell profile from running
The execution of the Tentacle service account's PowerShell profile script can sometimes cause a long delay each time a script is run. Starting in version 3.3.21, to prevent it being run, 
add a variable named `Octopus.Action.PowerShell.ExecuteWithoutProfile` with a value of `true` to your project.

## Scripts that block deployments {#Customscripts-Scriptsthatblockdeployments}

Sometimes a script launches a service or application that runs continuously. In this case the script does not complete until the application is terminated.  When the script is run in an Octopus deployment, the deployment will continue executing until the script exits.  In most cases this is undesirable. In order to avoid this behavior the service or application should be launched in a separate process or session, allowing the deployment to continue executing immediately. For example:

```powershell PowerShell
Start-Process MyService
```

```bash Bash
screen -d -m -S "MyService" MyService
```
