---
title: Debugging PowerShell scripts
description: How to debug PowerShell scripts running as part of your deployment process.
position: 3
version: 3.12
---

When writing Step Templates or Scripts, it is sometimes useful to be able to debug through a script to track down hard to diagnose issues.

Octopus supports PowerShell script debugging to enable you to step through the script as it is being run by the Tentacle, to set breakpoints, view the variable values, the call stack and more.

To enable debugging, add a variable to your project with the name `Octopus.Action.PowerShell.DebugMode`, with one of the following values:

* `BreakBeforeLaunchingUserScript` or `True` - breaks just before executing the Step Template/Script Step/Custom deployment script.
* `None` or `False` - disables debugging.

For more advanced usage, you can also use the following values:

* `BreakAtStartOfBootstrapScript` - breaks into the debugger at the very start of the bootstrap script.
* `BreakBeforeSettingVariables` - breaks into the debugger just before setting up all the variables.
* `BreakBeforeImportingScriptModules` - breaks just before importing Script Modules. Useful for debugging issues with Script Modules.

Once the variable is set, create and deploy your release as normal.

When the Tentacle executes the script, it will print out instructions on how to attach the debugger, eg:

```text
...
The Powershell execution engine is waiting for a PowerShell script debugger to attach.
Use the following commands to begin debugging this script:
Enter-PSSession -ComputerName Server01 -Credential <credentials>
Enter-PSHostProcess -Id 2284
Debug-Runspace -Id 2
```

If you have PowerShell remoting enabled, you can connect and debug remotely from either the command line or PowerShell ISE

On the server, you omit the `Enter-PSSession`.

From PowerShell ISE, execute the specifed commands at the `PS >` prompt, and ISE will load the script, attach the debugger and allow you to step through the code.

Oncce you've finished debugging, you can either allow the script to run to the end, or you can choose `Stop Debugging` from the `Debug`. 
