---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Installing the Tentacle VM extension via the classic Azure Portal
description: How to install a Tentacle using the Azure VM extension via the classic Azure Portal
navOrder: 3
---

!include <azure-vm-extension-deprecated>

The Azure VM Extension cannot be installed via the Classic Azure Portal, as it lacks support for adding extensions. We recommend either using the new Azure Portal, or using the [CLI](via-the-azure-cli/) or [PowerShell](via-powershell/) methods.

For further information, please see the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/classic/manage-extensions?toc=%2fazure%2fvirtual-machines%2fwindows%2fclassic%2ftoc.json).
