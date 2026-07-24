---
layout: src/layouts/Default.astro
pubDate: 2026-05-27
modDate: 2026-05-27
title: Tentacle script abandonment
description: How Octopus Tentacle abandons a deployment script when it can't run normally on the target, what you'll see when it happens, and what to do about the underlying cause.
navOrder: 58
---

Octopus Tentacle can abandon a deployment script when the script can't run normally on the target. Abandonment releases the Tentacle's [per-target mutex](/docs/administration/managing-infrastructure/run-multiple-processes-on-a-target-simultaneously) so the Tentacle can begin executing the next script it has for that target, even though the abandoned script's underlying process may still be running on the target.

This page covers when abandonment fires, what you'll see when it does, why these failures happen, and what to do about the underlying cause.

## How abandonment works

When Tentacle abandons a script:

- The Tentacle's [per-target mutex](/docs/administration/managing-infrastructure/run-multiple-processes-on-a-target-simultaneously) is released. The Tentacle can begin executing the next script it has for that target.
- The abandonment is logged in the server-side task log and in the Tentacle log.

What abandonment does **not** do:

- It does not kill the script's underlying process on the target. If your script was performing an operation that could leave the target in an inconsistent state (a database migration, a file system change, and so on), inspect the target and clean up manually.
- It does not introduce a new task status. Depending on which trigger fired, the task is marked as `Failed` (PowerShell startup detection) or `Cancelled` (cancellation timeout). Check the task log to know which path your task took.

The Tentacle itself stays healthy after abandoning a script. It doesn't need to be restarted.

## When abandonment fires

Tentacle abandons a script in response to one of two triggers.

### PowerShell startup detection

We've only observed this class of script-startup failure with PowerShell, so the detection is currently scoped to `powershell.exe` on Windows Tentacles. Bash on Linux Tentacles isn't covered.

When Tentacle launches `powershell.exe` to run your script, the PowerShell process can sometimes start but never actually begin executing the script body. This typically happens when antivirus or endpoint-protection software hooks into PowerShell startup and the script content never reaches the runtime.

If `powershell.exe` doesn't reach the first instruction of your script in 5 minutes, Tentacle marks the task as `Failed` with exit code `-47` and prevents the script body from running, even if PowerShell wakes up later. Tentacle records a log line like:

```text
PowerShell startup detection: PowerShell did not start within 5 minutes for task <task ID>
```

PowerShell startup detection requires Octopus Server `2026.2.5952` or later and Tentacle `9.1.3801` or later.

### Cancellation timeout

Scope: any script on Tentacle. Both Windows and Linux Tentacles. SSH targets and the Kubernetes agent are not in scope.

If you cancel a deployment from the Octopus Web Portal and the cancellation can't take effect on the Tentacle in 2 minutes, Octopus tells the Tentacle to abandon the script. The task is marked as `Cancelled`.

The server-side task log records one of two lines, depending on what Tentacle reports back:

```text
Tentacle abandoned the script.
```

Or, if the script had already completed by the time abandonment was attempted:

```text
Script had already completed before abandon was needed.
```

Tentacle's own log also records:

```text
Tentacle has abandoned this script. The underlying script process may still be running on this host.
```

If your cancellation succeeded cleanly, no abandonment runs and the task is marked `Cancelled` without these messages. Check your task log to know which path your cancellation took.

Cancellation timeout abandonment requires a specific Octopus Server version and Tentacle version. Both are to be confirmed when the work ships.

## Why these failures happen

The conditions that lead to abandonment are usually on the target machine, not in Octopus.

Antivirus and endpoint-protection software (CrowdStrike, Rapid7, and similar) can hook into `powershell.exe` at process startup. When two agents race for the same kernel locks, the process can fail to begin executing the script body. The same agents can hold file locks on the Tentacle's working directories (`Output.log`, `stdout.txt`), blocking the script from making progress or a cancellation from being processed.

For a worked example with stack traces and a detailed analysis of a CrowdStrike + Rapid7 deadlock on a customer's target, see [OctopusTentacle issue #1208](https://github.com/OctopusDeploy/OctopusTentacle/issues/1208).

Multiple security agents installed on the same host are the most common pattern. Octopus can't reach inside that interaction to fix it. The fix lives in your target-side antivirus configuration.

## What to do about it

Both abandonment triggers are mitigation, not a fix. The underlying problem is on the target machine, and you're best placed to fix it. Three steps, in order:

1. **Configure your antivirus or endpoint-protection software to exclude Tentacle's working directories.** Specifically `<Tentacle Home>\Tools` and `<Tentacle Home>\Work`. The full exclusion list and additional directories you can include if you're still seeing issues are documented in [Troubleshooting failed or hanging tasks: Antivirus software](/docs/support/troubleshooting-failed-or-hanging-tasks#anti-virus-software).
2. **Keep target-side security tooling updated.** Specific versions of certain endpoint-protection agents are known to cause this. Check your vendor's release notes.
3. **If abandonment fires on the same target more than occasionally,** contact support and include a process dump from the target during the next occurrence. This helps support identify which agent is interfering. You can identify how often abandonment is firing on a specific target by searching your task logs for the messages above across recent deployments to that target.
