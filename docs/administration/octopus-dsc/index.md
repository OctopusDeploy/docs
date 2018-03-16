---
title: Automating Infrastructure with DSC
description: OctopusDSC is an Open-Source PowerShell module designed to assist with the automation of Octopus infrastructure
position: 20
hideInThisSection: true
---
[OctopusDSC](https://github.com/OctopusDeploy/OctopusDSC) is an in-house and open-source PowerShell module with DSC resource designed to reduce the overhead when automating the installation and configuration of your Octopus infrastructure.

We have the following documentation pages regarding OctopusDSC:

* [Installing Octopus Tentacle Agent via DSC](/docs/administration/octopus-dsc/tentacle-agent.md)
* [Installing Octopus Server via DSC](/docs/administration/octopus-dsc/octopus-server.md)

## Installing the OctopusDSC PowerShell module.

It is recommended that you use PowerShell 5 alongside [PowerShellGet](https://docs.microsoft.com/en-us/powershell/module/powershellget/?view=powershell-5.1).

Quick Installation:

1. Install PowerShellGet from [PowerShell Gallery](https://docs.microsoft.com/en-us/powershell/gallery/readme).
2. Install DSC module via `PowerShellGet\Install-Module -Name OctopusDSC`

Manual Installation:

1. Download the [latest release](https://github.com/OctopusDeploy/OctopusDSC/releases).
2. If required, unblock the zip file.
3. Extract the zip file to a folder called OctopusDSC under your modules folder (usually `%USERPROFILE%\Documents\WindowsPowerShell\Modules`)
4. To confirm it's installed correctly, in a new PowerShell session run `Get-Module -ListAvailable -Name OctopusDSC`

:::hint
The community has also submitted a few [other options](https://github.com/OctopusDeploy/OctopusDSC/issues/14).
:::

## OctopusDSC management.

DSC can be applied in various ways, such as [Group Policy](https://sdmsoftware.com/group-policy-blog/desired-state-configuration/desired-state-configuration-and-group-policy-come-together/), a [DSC Pull Server](https://msdn.microsoft.com/en-us/powershell/dsc/pullserver), [Azure Automation](https://msdn.microsoft.com/en-us/powershell/dsc/azuredsc), or even via configuration management tools such as [Chef](https://docs.chef.io/resource_dsc_resource.html) or [Puppet](https://github.com/puppetlabs/puppetlabs-dsc). A good resource to learn more about DSC is the [Microsoft Virtual Academy training course](http://www.microsoftvirtualacademy.com/training-courses/getting-started-with-powershell-desired-state-configuration-dsc-).

## Contributing to the OctopusDSC Open-Source repository.

OctopusDSC is open-source, if you'd like to contribute, please visit the [GitHub Repository](https://github.com/OctopusDeploy/OctopusDSC).
