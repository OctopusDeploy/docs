---
title: Installing applications with Chocolatey
description: With Octopus Deploy you can install applications with Chocolatey by using a runbook as part of a routine operations task.
position: 30
---

[Chocolately](https://chocolatey.org/) is a popular package manager for Windows. It allows you to automate the installation of software used by the machines you deploy to, for example [.NET](https://dotnet.microsoft.com/).

It can also be used to install Windows Features by leveraging [DISM, or Deployment Imaging Service Management](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/what-is-dism).

With Operation Runbooks, you can create a runbook as part of a routine operations task to install software via Chocolatey that are required for your [deployment targets](/docs/octopus-concepts/deployment-targets.md) or [workers](/docs/octopus-concepts/workers.md).

## Create the runbook

To create a runbook to install software with Chocolatey:

1. From your project's overview page, navigate to {{Operations, Runbooks}}, and click **ADD RUNBOOK**.
1. Give the runbook a Name and click **SAVE**.

Next, you need to ensure Chocolatey is installed.

### Install chocolatey

Before you can use Chocolatey, it must be installed. To do this, you can use an existing step template from our [community library](/docs/deployment-process/steps/community-step-templates.md) called [Chocolatey - Ensure Installed](https://library.octopus.com/step-templates/c364b0a5-a0b7-48f8-a1a4-35e9f54a82d3/actiontemplate-chocolatey-ensure-installed). To add this step to a runbook:

1. Add the community step template called **Chocolatey - Ensure Installed**, and give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. *Optionally*, configure any [conditions](/docs/deployment-process/conditions/index.md) for the step, and click **Save**.

You can now use this step in conjunction with other Runbook steps to install your software with Chocolatey.

## Common usages

There are plenty of different types of software you may wish to install using Chocolatey. The next few sections outline some of the common ones you can install with a runbook using the [Run a script](/docs/deployment-examples/custom-scripts/run-a-script-step.md) step.

### Test for installed chocolatey package

A helper PowerShell function called `Test-ChocolateyPackageInstalled` is used by the examples to check if the package to be installed is already present on the target machine:

```ps
function Test-ChocolateyPackageInstalled {
    Param (
        [ValidateNotNullOrEmpty()]
        [string]
        $Package
    )

    Process {
        if (Test-Path -Path $env:ChocolateyInstall) {
            $packageInstalled = Test-Path -Path $env:ChocolateyInstall\lib\$Package
        }
        else {
            Write-Host "Can't find a chocolatey install directory..."
        }

        return $packageInstalled
    }
}
```

The script checks to see if the package specified in `$Package` is already installed by testing the path specified in `$env:ChocolateyInstall\lib\$Package`, and returning the result in `$packageInstalled`.

### .NET Framework

There are different versions of the .NET Framework you could install using Chocolatey. This example will use the `dotnetfx` package from Chocolatey.

To add this to a Runbook:

1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```ps
# function Test-ChocolateyPackageInstalled omitted here.

$package = "dotnetfx"

if (Test-ChocolateyPackageInstalled -Package $package) {
    Write-Host "$package is already installed"
}
else {
    choco install $package -confirm
}
```

The script will run the `choco install` command if the `dotnetfx` package isn’t installed already.

### .NET Core

To install the .NET Core runtime, we use the `dotnetcore` Chocolatey package.

To add this to a Runbook:

1. Click **Script**, and then select the **Run a Script** step.
1. Give the step a name.
1. Choose the **Execution Location** on which to run this step.
1. In the **Inline source code** section, add the following code as a **PowerShell** script:

```ps
# function Test-ChocolateyPackageInstalled omitted here.

$package = "dotnetcore"

if (Test-ChocolateyPackageInstalled -Package $package) {
    Write-Host "$package is already installed"
}
else {
    choco install $package -confirm
}
```

The script will run the `choco install` command if the `dotnetcore` package isn’t installed already.

## Samples

We have a [Target - Windows](https://g.octopushq.com/TargetWindowsSamplesSpace) Space on our Samples instance of Octopus. You can sign in as `Guest` to take a look at this example and more runbooks in the `OctoFX` project.

## Learn more

- [Automating developer machine setup with Chocolatey blog post](https://octopus.com/blog/automate-developer-machine-setup-with-chocolatey).
