---
title: Error Handling
description: Error handling for scripts in Octopus.
position: 60
---

Calamari examines the exit code of the script engine to determine whether the script failed. If the exit code is zero, Calamari assumes the script ran successfully. If the exit code is non-zero, then Calamari assumes the script failed.

Syntax errors and unhandled exceptions will result in a non-zero exit code from the script engine, which will fail the deployment

## Error Handling in PowerShell Scripts {#Customscripts-ErrorhandlinginPowerShellscripts}

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

## Failing a Script With a Message

The fail step function will stop your script execution and return a non-zero error code. An optional message can be supplied. If supplied, the message replaces
the `The remote script failed with exit code <code>` text in the deployment process overview page.

```powershell PowerShell
Fail-Step "A friendly message"
```

```c# C#
Octopus.FailStep("A friendly message");
```

```bash Bash
fail_step "A friendly message"
```

```fsharp F#
Octopus.failStep "A friendly message"
```

```python Python3
failstep("A friendly message")
```
