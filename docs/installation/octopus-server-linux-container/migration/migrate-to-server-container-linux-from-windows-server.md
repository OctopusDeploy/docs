---
title: Migrate to Octopus Server Linux Container from Windows Server
description: A guide on how to migrate to the Octopus Server Linux Container from Octopus Server running on a Windows Server
position: 10
---

This guide will help you migrate an instance of Octopus hosted on a Windows Server to the Octopus Server Linux Container.

## Running the Octopus Server Linux Container

We are confident in the Octopus Linux Docker image's reliability and performance.  [Octopus Cloud](/docs/octopus-cloud/index.md) runs the Octopus Server Linux Container in AKS clusters in Azure.  But to use the Octopus Server Linux Container in Octopus Cloud, we had to make some design decisions and level up our knowledge about Docker concepts.  We recommend migrating from Windows to the Octopus Server Linux Container if you are okay with **all** these conditions:

- You are familiar with Docker concepts, specifically around debugging containers, volume mounting, and networking.
- You are comfortable with one of the underlying hosting technologies for Docker containers; Kubernetes, ACS, ECS, AKS, EKS, or Docker itself.
- You understand Octopus Deploy is a stateful, not a stateless application, requiring additional monitoring.

## Differences between Windows Server and Linux Containers

The differences between running Octopus Server on Windows Server and Linux Containers are as follows:

- **Folder Paths:** Windows uses a folder structure with `\` slashes, for example, `C:\Octopus\Tasklogs`.  Linux Containers follow a Linux folder structure, including `/` slashes.
- **Pre-installed software:** Linux Containers typically include PowerShell Core and Bash but not .NET.  You cannot pre-install any other software on the Octopus Linux Container.
- **Software support:** The Linux Container doesn't support running ScriptCS or F# scripts directly on the server.
- **Authentication:** The Octopus Server Linux Container doesn't support Active Directory authentication.  If you want to use Active Directory, you must connect to it via the [LDAP authentication provider](/docs/security/authentication/ldap/index.md).

:::hint
The LDAP authentication provider was introduced in Octopus Deploy **2021.2**.
:::

!include <migrate-from-windows-to-linux-container>

## Further Reading

This guide is meant to address the differences you may encounter when switching from running Octopus Server on Windows to the Octopus Server Linux Container.  For a deeper dive in how to run the Octopus Server Linux Container please refer to [this documentation](/docs/installation/octopus-server-linux-container/index.md).