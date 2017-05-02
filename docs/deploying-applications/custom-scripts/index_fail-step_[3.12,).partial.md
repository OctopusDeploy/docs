### Failing a script with a message

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