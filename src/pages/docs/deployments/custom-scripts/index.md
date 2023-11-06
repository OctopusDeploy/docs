---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-10-11
title: Custom scripts
description: Custom scripts allows you to script anything you want using PowerShell, Dotnet Script, F#, Python, or Bash.
navOrder: 120
---

As a convention-oriented deployment tool, Octopus can perform a number of actions automatically, such as configuring common types of applications and deploying them to popular hosting environments. For these situations, we have built everything you need into Octopus. Sometimes, however, you need to do more than the built-in conventions support, and that's where custom scripts come in.

## Supported script types

Octopus supports the following scripting environments:

 - PowerShell scripts (.ps1)
 - Bash scripts (.sh)
 - Python scripts (.py)
 - C# scripts (.csx) using [dotnet-script](https://github.com/dotnet-script/dotnet-script)
 - F# scripts (.fsx)

 Octopus can run these scripts on almost any operating system as long as the script runtime is installed and configured correctly.

## What you can do with custom scripts

If an activity can be scripted, Octopus can run that script as a standalone activity or as part of a larger orchestration.

In the context of Octopus, your custom scripts get the following extra benefits:

 - Your scripts can use [variables](/docs/projects/variables/) managed by Octopus, including [secrets](/docs/projects/variables/sensitive-variables/), [complex variable expressions](/docs/projects/variables/variable-substitutions/), and [filters](/docs/projects/variables/variable-filters/). Learn about [using variables in scripts](/docs/deployments/custom-scripts/using-variables-in-scripts).
 - Your scripts can be executed across your entire fleet of servers, or a selection of servers, in a controlled fashion. Learn about [deployment targets](/docs/infrastructure/deployment-targets/) and [workers](/docs/infrastructure/workers).
 - Your scripts can use the contents of a package. Learn about [using files from packages in scripts](/docs/deployments/custom-scripts/scripts-in-packages/reference-files-within-a-package).
 - Your script can log special messages to control the format or report progress. Learn about [logging messages in scripts](/docs/deployments/custom-scripts/logging-messages-in-scripts).
 - Your scripts can set output variables making these values available to other steps in your process. Learn about [output variables](/docs/projects/variables/output-variables).
 - Your scripts can collect files and store them in Octopus. Learn about [publishing artifacts](/docs/projects/deployment-process/artifacts).
 - Your scripts can be pre-authenticated and bootstrapped into a cloud provider. Learn about [AWS CLI scripts](/docs/deployments/custom-scripts/aws-cli-scripts/) and [Azure CLI scripts](/docs/deployments/custom-scripts/azure-powershell-scripts).
 - Your scripts can be pre-authenticated and bootstrapped into an external service or server cluster. Learn about [Kubernetes deployments](/docs/deployments/kubernetes/) and [Service Fabric deployments](/docs/deployments/azure/service-fabric).
 - You can define reusable functions for your scripts to use. Learn about [script modules](/docs/deployments/custom-scripts/script-modules).

## How to use custom scripts

Octopus supports the following ways to use custom scripts:

 - You can define a step in a process to run a script. Learn about the [run a script step](/docs/deployments/custom-scripts/run-a-script-step).
 - You can run custom scripts when Octopus deploys a package. Learn about the [deploy a package step](/docs/deployments/packages/) and [the different stages where your script can run](/docs/deployments/packages/package-deployment-feature-ordering).
 - You can build reusable step templates containing your own scripts which can be used across multiple projects. Learn about [step templates](/docs/projects/custom-step-templates).
 - You can run ad hoc scripts for administrative tasks. Learn about the [script console](/docs/administration/managing-infrastructure/script-console).
 - You can run custom scripts as part of a health check. Learn about [machine policies](/docs/infrastructure/deployment-targets/machine-policies).

## Where to store your scripts

Octopus can execute scripts from a variety of locations, all with different benefits:

  1. You can author and store your scripts directly in Octopus. Learn about the [run a script step](/docs/deployments/custom-scripts/run-a-script-step/) and [deploy a package step](/docs/deployments/packages).
  2. You can author your scripts and publish them as step templates for other projects to use. Learn about [step templates](/docs/projects/custom-step-templates).
  3. You can develop your scripts and store them in a source control repository, like git, and Octopus can execute these scripts from within a package. Learn about [deployment process as code](/docs/deployments/patterns/deployment-process-as-code/) and [running scripts in packages](/docs/deployments/custom-scripts/scripts-in-packages).
  4. You can develop your scripts and store them in GitHub, then publish them as a release, which can be consumed by Octopus. Learn about [using the GitHub feed](/docs/packaging-applications/package-repositories/github-feeds).

## How your scripts are executed by Octopus

The precise details depend on the context within which your script is running, however, Octopus follows this general process:

 1. Octopus transfers the script to the execution environment along with the variables, packages, script modules, and anything else required to run the script. This is done via the Tentacle agent or SSH session into a temporary work directory.
 2. The Tentacle agent or SSH session invokes the [open-source Calamari project](https://github.com/OctopusDeploy/Calamari) to bootstrap your script and provide access to variables and helper functions. _You can see how your scripts are bootstrapped in the [Calamari source code](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/WindowsPowerShell)._
 3. Calamari invokes your script, streaming log messages back to the Octopus Server.
 4. Any artifacts published by your scripts are transferred back to the Octopus Server.
 5. The temporary work directory is cleaned up.

### Working directories

When Calamari executes your scripts, it does so within the context of a working directory. The working directory is a temporary location stored under the home folder you configure when setting up a deployment target or worker.

If you're executing a script contained within a package, the package contents will be uncompressed and copied to this directory, but the working directory is the directory containing the script within it. After the script has finished executing, the working directory will be cleaned up. Learn about [copying the contents of the working directory](/docs/support/copy-working-directory).

### Security and permissions

When scripts are executed, it is in the context of the account that the Tentacle agent or SSH session is running as. Learn about [running Tentacle as a different user account](/docs/infrastructure/deployment-targets/tentacle/windows/running-tentacle-under-a-specific-user-account).

:::div{.hint}
On Windows, the Tentacle agent runs as **Local System** by default, which has extensive local privileges, but usually cannot access file shares, remote SQL databases, or other external resources. If you need wider permissions, you'll need to configure Tentacle to [run under a custom user account](/docs/infrastructure/deployment-targets/tentacle/windows/running-tentacle-under-a-specific-user-account).
:::

### Script integrity

Octopus does not provide support for script integrity. While this may sound alarming, there are very good reasons for this approach.

For example, when Calamari invokes PowerShell.exe, it uses the `Unrestricted` execution policy for the session. You can see how PowerShell scripts are executed in more detail by [looking at the open-source Calamari project](https://github.com/OctopusDeploy/Calamari/tree/master/source/Calamari.Common/Features/Scripting/WindowsPowerShell/).

Learn about [script integrity](/docs/security/script-integrity).

### Developing and testing scripts

We recommend the following approaches for developing and testing your scripts, in order of preference:

 1. Build your script to use script arguments as inputs so it can be invoked with equal fidelity from Octopus or directly in your development environment. You can test your scripts by invoking them directly in a development environment with a very fast feedback cycle. Learn about [passing parameters to scripts](passing-parameters-to-scripts/). The only difference in this approach may be the user context the script runs in.
 2. Build your script as a reusable step template and test it using the `Run Now` feature. [Learn about step templates](/docs/projects/custom-step-templates). The only difference to this approach is the absence of deployment-specific variables provided by Octopus when actually running a deployment.
 3. Put your script in a test process and run that process in a test environment.
 4. Put your script in a real process and run that process in a test environment.

 ### Debugging scripts

 There may be times where your script does not work as expected. In these cases, there are some ways you can debug your scripts:

 1. If you are using PowerShell, Octopus has built-in support for PowerShell debugging. Learn about [debugging PowerShell scripts on remote machines using Octopus](/docs/deployments/custom-scripts/debugging-powershell-scripts/debugging-powershell-scripts-on-remote-machines).
 2. For all scripting languages, you can tell Octopus to preserve the script and its entire working directory so you can run it interactively. Learn about [copying the working directory](/docs/support/copy-working-directory).

### Scripts that block deployments

Sometimes a script launches a service or application that runs continuously. In this case the script does not complete until the application is terminated.  When the script is run in an Octopus process, the Octopus task will continue executing until the script exits.  In most cases this is undesirable. In order to avoid this behavior the service or application should be launched in a separate process or session, allowing the rest of the process to continue executing. For example:

<details data-group="deployments-custom-scripts">
<summary>PowerShell</summary>

```powershell PowerShell
Start-Process MyService
```

</details>
<details data-group="deployments-custom-scripts">
<summary>Bash</summary>

```bash Bash
screen -d -m -S "MyService" MyService
```

</details>


### Scripts that restart the target operating system

Restarting the target operating system is not currently supported as part of running a script via Octopus. You can restart the operating system from your script, but this will cause the process to fail because it cannot survive a restart. Please reach out to our [support team](https://octopus.com/support) if this is a requirement in your situation.
