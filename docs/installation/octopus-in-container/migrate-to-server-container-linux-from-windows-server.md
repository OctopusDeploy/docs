---
title: Migrate to Octopus Server Linux Container from Windows Server
description: A guide on how to migrate to the Octopus Server Linux Container from the Octopus Server Windows Server
position: 4
---

This guide will help you migrate from the Octopus Server Windows to the Octopus Server Linux Container.  

## Running the Octopus Server Linux Container

We are confident in the Octopus Linux Docker image's reliability and performance.  Octopus Cloud runs the Octopus Server Linux Container in AKS clusters in Azure.  But to use the Octopus Server Linux Container in Octopus Cloud, we had to make some design decisions and level up our knowledge about Docker concepts.  We recommend migrating from Windows to the Octopus Server Linux Container if you are okay with **all** these conditions:

- You are familiar with Docker concepts, specifically around debugging containers, volume mounting, and networking.
- You are comfortable with one of the underlying hosting technologies for Docker containers; Kubernetes, ACS, ECS, AKS, EKS, or Docker Swarm.
- You understand Octopus Deploy is a stateful, not a stateless application, requiring additional monitoring.

## Differences between Windows Server and Linux Containers

The differences between running Octopus Server on Windows Server and Linux Containers are as follows:

- Folder Paths -> Windows a folder structure with `\` slashes, for example, `C:\Octopus\Tasklogs`.  Linux Containers follow Linux folder structure, including `/` slashes
- Pre-installed software -> Linux Containers include PowerShell Core and Bash but not .NET.  You cannot pre-install any other software on the Octopus Linux Container.
- Software support -> The Linux Container does not support running ScriptCS or F# scripts directly on the server.
- Authentication -> The Octopus Server Linux Container does not support Active Directory authentication.  If you want to use Active Directory, you must connect to it via the LDAP Auth Provider.

:::hint
The LDAP Auth Provider was introduced in Octopus Deploy **2021.2**.
:::

!include <migrate-from-windows-to-linux-container>

## Further Reading

This guide is meant to address the differences you may encounter when switching from running Octopus Server on Windows to the Octopus Server Linux Container.  For a deeper dive in how to run the Octopus Server Linux Container please refer to [this documentation](/docs/installation/octopus-in-container/octopus-server-container-linux.md).