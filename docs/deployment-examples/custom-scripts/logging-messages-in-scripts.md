---
title: Logging messages from scripts
description: When your scripts emit messages Octopus will display the messages in the Task Logs at the most appropriate level for the message.
position: 50
---

When your scripts emit messages Octopus will display the messages in the Task Logs at the most appropriate level for the message. For example:

```powershell PowerShell
Write-Verbose "This will be logged as a Verbose message - verbose messages are hidden by default"
Write-Host "This will be logged as Information"
Write-Output "This will be logged as Information too!"
Write-Highlight "This is a highlight"
Write-Wait "Deployment is waiting on something"
Write-Warning "This will be logged as a Warning"
Write-Error "This will be logged as an Error and may cause your script to stop running - take a look at the section on Error Handling"
```

```cs C#
Console.WriteLine("This will be logged as Information");
Console.Out.WriteLine("This will be logged as Information too!");
Console.Error.WriteLine("This will be logged as an Error.");
Octopus.WriteVerbose("Verbose!!!");
Octopus.WriteHighlight("This is a highlight");
Octopus.WriteWait("Deployment is waiting on something");
Octopus.WriteWarning("Warning");
```

```bash Bash
echo "This will be logged as Information"
write_verbose "Verbose!!"
write_highlight "This is a highlight"
write_wait "Deployment is waiting on something"
write_warning "Warning"
>&2 echo "This will be logged as an Error"
echoerror() { echo "$@" 1>&2; }
echoerror "You can even define your own function to echo an error!"
```

```fsharp F#
printfn "This will be logged as Information"
writeVerbose "Verbose!!"
writeHighlight "This is a highlight"
writeWait "Deployment is waiting on something"
writeWarning "Warning"
eprintfn "This will be logged as Error"
```

```python Python3
print("This will be logged as Information")
printverbose("Verbose!")
printhighlight("This is a highlight")
printwait("Deployment is waiting on something")
printwarning("Warning")
print("This will be logged as an error", file=sys.stderr)
```

Try these out for yourself using the [Script Console](/docs/administration/managing-infrastructure/script-console.md)!

## Highlight log level

Highlight messages will be show in bold and blue in the task log. They will also appear under the step heading on the Task Summary tab. You can use the highlight level to call out important information such as which upgrade scripts were run, or the exact time a web server go added back into the load balancer pool.

## Wait log level

Wait log messages will be show in a different color in the log. Their primary use is to show when the deployment is waiting for something to occur (eg acquire a lock). We intend to use this message in the future to show a visual representation of your deployment progress. You can log your own wait messages, to indicate the deployment is paused in preparation for this. A wait is considered over when another log message of a different level is written.

## Progress log level

Progress messages will display and update a progress bar on your deployment tasks while they are running. You can provide the percentage complete and an optional message to display with the progress bar.

```ps PowerShell
Update-Progress 10
Update-Progress 50 "Woah, we're halfway there!"
```
```cs C#
Octopus.UpdateProgress(10);
Octopus.UpdateProgress(50, "Woah, we're halfway there!");
```
```bash Bash
update_progress 10
update_progress 50 "Woah, we're halfway there!"
```
```fs F#
Octopus.updateProgress 10
Octopus.updateProgress 50 "Woah, we're halfway there!"
```
```python Python3
updateprogress(10)
updateprogress(50, 'Woah, we\'re halfway there!')
```

## Service message

The following service messages can be written directly to standard output which will be parsed by the server and the subsequent log lines will be treated with the relevant log level.
```
##octopus[stdout-ignore]
##octopus[stdout-error]
##octopus[stdout-warning]
##octopus[stdout-verbose]
##octopus[stdout-wait]
##octopus[stdout-highlight]
```

To return to the default log level, write the following message:
```
##octopus[stdout-default]
```
