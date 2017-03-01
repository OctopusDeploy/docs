---
title: Azure Virtual Machines
description: The Azure VM Tentacle extension makes it easy to automatically download, install and register a Tentacle with your Octopus Deploy server.
position: 4
hideInThisSectionHeader: true
---

:::hint
The Azure VM Extension is currently in preview.
:::

If you deploy software to virtual machines (VM's) hosted in Microsoft Azure, Octopus Deploy provides a [VM Extension](https://docs.microsoft.com/en-us/azure/virtual-machines/virtual-machines-windows-extensions-features?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) that makes it easy to install the [Tentacle agent](/docs/installation/installing-tentacles/index.md).

The extension has tested and is supported on Windows 2008R2, Windows 2012, Windows 2012R2 and Windows 2016.

When enabled, the extension automatically downloads the latest Tentacle MSI, installs it, and registers the agent with your [Octopus Server](/docs/installation/installing-octopus/index.md). After Azure deploys the extension to your VM, it executes a series of commands very similar to the those listed in our guide to [automatically installing the Tentacle agent](/docs/installation/installing-tentacles/automating-tentacle-installation.md).

The VM extension can be installed in a variety of ways. Please refer to the appropriate page for details.
