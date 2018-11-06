---
title: Artifacts
description: Artifacts in Octopus provide a convenient way to collect files from remote machines during deployments.
position: 60
---

Artifacts in Octopus provide a convenient way to collect files from remote machines, and copy them to the Octopus Server, where they can then be viewed from the web interface. Examples of where artifacts may be useful are:

- Collecting log files from other programs.
- Copying configuration files so you can inspect to see if the right values were replaced.

Artifacts can be collected from anywhere that Octopus runs scripts - for example, the [Script Console](/docs/administration/script-console.md), or [custom scripts](/docs/deployment-examples/custom-scripts/index.md) in a deployment.

After the script runs the files will be uploaded to Octopus Server and made available as deployment artifacts which are available for download from the task output, or via the [Octopus API](https://github.com/OctopusDeploy/OctopusDeploy-Api/wiki/Artifacts).

![](artifacts-access.png "width=500")

## Collecting Artifacts Using Scripts {#Artifacts-Collectingartifactsusingscripts}

You can collect artifacts using any of the scripting languages supported by Octopus. In each scripting language you can specify the path to the file you want to collect as an artifact as an absolute path, or a path relative to the current working directory. By default, the file name will be used as the artifact name, but you can provide a custom name for the artifact as an alternative.

{#Artifacts-PowerShell}

{#Artifacts-C#}

{#Artifacts-Bash}

{#Artifacts-F#}

```powershell PowerShell
# Collect a custom log file from the current working directory using the file name as the name of the artifact
New-OctopusArtifact "output.log"

# Collect all .xml files contained in the current working directory recursing sub-directories
Get-ChildItem . -Recurse -Include *.xml | New-OctopusArtifact

# Collect the hosts file but using a custom name for each machine so you can differentiate between them
# Note: to collect this artifact would require the Tentacle process to be elevated as a high privileged user account
New-OctopusArtifact -Path "C:\Windows\System32\drivers\etc\hosts" -Name "$([System.Environment]::MachineName)-hosts.txt"
```

```c# C#
// Collect a custom log file from the current working directory using the file name as the name of the artifact
Octopus.CreateArtifact("output.log");

// Collect the hosts file but using a custom name for each machine so you can differentiate between them
// Note: to collect this artifact would require the Tentacle process to be elevated as a high privileged user account
Octopus.CreateArtifact(@"C:\Windows\System32\drivers\etc\hosts", System.Environment.MachineName + "-hosts.txt");
```

```bash Bash
# Collect a custom log file from the current working directory using the file name as the name of the artifact
new_octopusartifact output.log

# Collect the hosts file but using a custom name for each machine so you can differentiate between them
# Note: to collect this artifact would require the SSH user account to be elevated as a high privileged user account
new_octopusartifact /etc/hosts $(hostname)-hosts.txt
```

```fsharp F#
// Collect a custom log file from the current working directory using the file name as the name of the artifact
Octopus.createArtifact "output.log"

// Collect the hosts file but using a custom name for each machine so you can differentiate between them
// Note: to collect this artifact would require the Tentacle process to be elevated as a high privileged user account
Octopus.createArtifact @"C:\Windows\System32\drivers\etc\hosts" (Some (System.Environment.MachineName + "-hosts.txt"))
```

## Security concerns

### File privileges

If you want to collect a file as an artifact, your script must be able to access and read that file.  In most cases, files produced by your deployment were produced in the same security context as your running script, and everything will just work. In some cases you may want to collect certain files from the operating system which require elevated privileges, or perhaps a special user account.

If you are using the Tentacle agent, make sure the Tentacle process is running as a user account with access to the file.

If you are using an SSH connection, make sure the SSH user account has access to the file.

### Sensitive information

Artifacts are collected by Octopus as-is to maintain the integrity of the files. If the files you want to collect contain sensitive information you should take care to scrub or mask that sensitive information before telling Octopus to collect the artifact.

```powershell
# Get hold of the variables from Octopus
$username = $OctopusParameters["Database.Username"]
$password = $OctopusParameters["Database.Password"]
$reportFilePath = "upgrade-report.txt"

# Perform the operation as part of your deployment, writing the results to the report file
MyDatabaseUpgrader.exe -reportPath=$reportFilePath

# Scrub sensitive values from report
$mask = '*****'
(Get-Content $reportFilePath) -replace $username, $mask -replace $password, $mask | Set-Content $reportFilePath

# Now collect the scrubbed artifact
New-OctopusArtifact $reportFilePath
```