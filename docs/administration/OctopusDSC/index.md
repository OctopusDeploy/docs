---
title: Automating Infrastructure with DSC
description: OctopusDSC is an Open-Source powershell module designed to assist with the automation of Octopus infrastructure
position: 20
---
[OctopusDSC](https://github.com/OctopusDeploy/OctopusDSC) is an in-house and open source PowerShell module with DSC resource designed to reduce the overhead when automating the installation and configuration of your Octopus infrastructure. See the following documentation for examples on automating [Octopus Deploy Server]() and [Tentacle Agent]() with OctopusDSC.

We have the following documentation pages regarding OctopusDSC:

[Installing Octopus Tentacle Agent via DSC]()

[Installing Octopus Server via DSC]()

## Installing the OctopusDSC PowerShell module.

It is recommended that you use PowerShell 5 alongside [PowerShellGet](https://docs.microsoft.com/en-us/powershell/module/powershellget/?view=powershell-5.1)

Quick Installation:

1. install PowerShellGet from [PowerShell Gallery](https://docs.microsoft.com/en-us/powershell/gallery/readme)
2. Install DSC module via `PowerShellGet\Install-Module -Name OctopusDSC`

Manual Installation:

1. Download the [latest release](https://github.com/OctopusDeploy/OctopusDSC/releases)
2. If required, unblock the zip file
3. Extract the zip file to a folder called OctopusDSC under your modules folder (usually `%USERPROFILE%\Documents\WindowsPowerShell\Modules`)
4. To confirm it's installed correctly, in a new powershell session run `Get-Module -ListAvailable -Name OctopusDSC`

:::hint
The community has also submitted a few [other options](https://github.com/OctopusDeploy/OctopusDSC/issues/14). :::

## OctopusDSC management.

DSC can be applied in various ways, such as [Group Policy](https://sdmsoftware.com/group-policy-blog/desired-state-configuration/desired-state-configuration-and-group-policy-come-together/), a [DSC Pull Server](https://msdn.microsoft.com/en-us/powershell/dsc/pullserver), [Azure Automation](https://msdn.microsoft.com/en-us/powershell/dsc/azuredsc), or even via configuration management tools such as [Chef](https://docs.chef.io/resource_dsc_resource.html) or [Puppet](https://github.com/puppetlabs/puppetlabs-dsc). A good resource to learn more about DSC is the [Microsoft Virtual Academy training course](http://www.microsoftvirtualacademy.com/training-courses/getting-started-with-powershell-desired-state-configuration-dsc-).

## Contributing to the OctopusDSC Open-Source repository.

:::hint
There are two main code repositories associated with this module, the blow links will direct you to our open source GitHub page for the Server and Tentacle agent repositories respectively.

[cOctopusServer](https://github.com/OctopusDeploy/OctopusDSC/blob/master/README-cOctopusServer.md) is used to install and configure the Octopus Server.

[cTentacleAgent](https://github.com/OctopusDeploy/OctopusDSC/blob/master/README-cTentacleAgent.md) is used to install and configure the Octopus Tentacle agent.
:::


As OctopusDSC is an OpenSource project, we encourage everyone to contribute their custom scripts to help build a formidable OctopusDSC script respository. Below are instructions on how to contribute to the OctopusDSC repository.

This project is setup to use [Vagrant](vagrant.io) to provide a dev/test environment. Once you've installed Vagrant, you can use [build-virtualbox.sh](build-virtualbox.sh) to spin up a local virtual machine using [VirtualBox](virtualbox.org) and run the test scenarios (**NOTE:** The first time you run `vagrant up` it has to download the `octopusdeploy/dsc-test-server` box and this can take some time depending on your Internet speed, so be patient and go grab a coffee while it downloads). On a build server, you most likely want to use [build-aws.sh](build-aws.sh) to spin up a virtual machine on AWS to run the tests.

Configuration is handled by environment variables. The shell scripts will show a message letting you know what variables need to be set.

As there are no windows specific build scripts at present, if you want to run the tests against AWS on windows:

1. Install Vagrant from [vagrantup.com](http://vagrantup.com)
2. Install VirtualBox from [virtualbox.org](http://virtualbox.org)
3. _**If you are on a Mac or Linux**_ you need to install PowerShell, see https://github.com/PowerShell/PowerShell/blob/master/docs/installation/linux.md.
4. If you want to test locally using virtualbox
    - Run `vagrant plugin install vagrant-dsc`
    - Run `vagrant plugin install vagrant-winrm`
    - Run `vagrant plugin install vagrant-winrm-syncedfolders`
    - Run `vagrant up -- provider virtualbox`. This will run all the scenarios under the [Tests](Tests) folder.
5. If you want to test using AWS
    - Run `vagrant plugin install vagrant-aws`
    - Run `vagrant plugin install vagrant-aws-winrm`
    - Set an environment variable `AWS_ACCESS_KEY_ID` to a valid value
    - Set an environment variable `AWS_SECRET_ACCESS_KEY` to a valid value
    - Set an environment variable `AWS_SUBNET_ID` to a valid subnet where you want the instance launched
    - Set an environment variable `AWS_SECURITY_GROUP_ID` to a valid security group you want to assign to the instance
    - Run `vagrant up --provider aws`. This will run all the scenarios under the [Tests](Tests) folder.
6. Run `vagrant destroy -f` once you have finished to kill the virtual machine.

Tests are written in [ServerSpec](serverspec.org), which is an infrastructure oriented layer over [RSpec](rspec.info).

When creating a PR, please ensure that all existing tests run succesfully against VirtualBox, and please include a new scenario where possible. Before you start, please raise an issue to discuss your plans so we can make sure it fits with the goals of the project.
