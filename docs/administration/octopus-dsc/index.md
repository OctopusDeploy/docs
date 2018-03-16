---
title: Automating Infrastructure with DSC
description: OctopusDSC is an Open-Source PowerShell module designed to assist with the automation of Octopus infrastructure
position: 20
hideInThisSection: true
---
OctopusDSC is an in-house open-source PowerShell module with DSC resource designed to reduce the overhead when automating the installation and configuration of your Octopus infrastructure.

For the latest information about OctopusDSC please refer to the GitHub [OctopusDSC readme.md](https://github.com/OctopusDeploy/OctopusDSC).

You can use DSC to install:

- [The Central Octopus Deploy Server](/docs/installation/automating-installation.md#desired-state-configuration).
-[Octopus Tentacles](/docs/infrastructure/windows-targets/automating-tentacle-installation.md#AutomatingTentacleinstallation-DSCDesiredStateConfiguration).

## Authentication Automation with OctopusDSC

The following resources are available for automating authentication configuration:

- [Octopus Server Active Directory Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerActiveDirectoryAuthentication).
- [Octopus Server Azure Active Directory Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerAzureADAuthentication).
- [Octopus Server Google Apps Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerGoogleAppsAuthentication).
- [Octopus Server Guest Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerGuestAuthentication).
- [Octopus Server Okta Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerOktaAuthentication).
- [Octopus Server Username and Password Authentication](https://github.com/OctopusDeploy/OctopusDSC/tree/master/OctopusDSC/DSCResources/cOctopusServerUsernamePasswordAuthentication).
