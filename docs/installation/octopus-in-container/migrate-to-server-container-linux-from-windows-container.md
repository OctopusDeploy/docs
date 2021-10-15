---
title: Migrate to Octopus Server Linux Container from Windows Container
description: A guide on how to migrate to the Octopus Server Linux Container from the Octopus Server Windows Container
position: 3
---

The Octopus Server Windows Container has been deprecated starting with Octopus Server 2020.6.  We made this decision because the uptake was low, and Microsoft has stopped supporting the OS Versions we were publishing (Windows [1809](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1809-and-windows-server-2019), [1903](https://docs.microsoft.com/en-us/lifecycle/announcements/windows-10-1903-end-of-servicing), and [1909](https://docs.microsoft.com/en-us/windows/release-health/status-windows-10-1909)).  Going forward, we will only publish the Octopus Server Linux Container.  

:::hint
We will continue to publish Windows Docker images for Tentacle. Once we've updated the Windows images for Tentacle to more modern OS versions, we will deprecate the existing Windows 1809/1903/1909 images.
:::

This guide will help you migrate from the Octopus Server Windows Container to the Octopus Server Linux Container.  It assumes you are already familiar with running Octopus Deploy in a container and is meant to address the differences you will encounter when switching over.

## Differences between Windows and Linux Containers

This guide is designed to address the differences between the Windows and Linux Containers.

- **Folder Paths:** Windows Containers follow the Windows folder structure with `\` slashes, for example, `C:\Octopus\Tasklogs`.  Linux Containers follow a Linux folder structure, including `/` slashes.
- **Pre-installed software:** Windows Containers include PowerShell and .NET 4.7.2 (or 4.8) but not Bash.  Linux Containers typically include PowerShell Core and Bash but not .NET.
- **Software support:** The Linux Container doesn't support running ScriptCS or F# scripts directly on the server.
- **Authentication:** The Octopus Server Linux Container doesn't support Active Directory authentication.  Some users have had success using Active Directory with the Octopus Server Windows Container, but any workarounds won't work with the Linux Container.  If you want to use Active Directory, you must connect to it via the [LDAP authentication provider](/docs/security/authentication/ldap/index.md).

:::hint
The LDAP authentication provider was introduced in Octopus Deploy **2021.2**.
:::

!include <migrate-from-windows-to-linux-container>

## Further Reading

This guide is meant to address the differences you may encounter when switching from the Octopus Server Windows Container to the Octopus Server Linux Container.  For a deeper dive in how to run the Octopus Server Linux Container please refer to [this documentation](/docs/installation/octopus-in-container/octopus-server-container-linux.md).
