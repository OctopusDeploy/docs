---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Azure virtual machines
description: The Azure VM Tentacle extension makes it easy to automatically download, install and register a Tentacle with your Octopus Server.
navOrder: 80
hideInThisSectionHeader: true
---

Tentacles can be configured during virtual machine provisioning via Desired State Configuration (DSC). The process for integrating DSC with Azure VM provisioning is documented [here](/docs/infrastructure/deployment-targets/tentacle/windows/azure-virtual-machines/via-an-arm-template-with-dsc/).

An Azure VM extension is also available, and has been tested on Windows 2008R2, Windows 2012, Windows 2012R2 and Windows 2016. However the VM extension has limited functionality, with no support for spaces or workers. 

:::problem
Microsoft [no longer supports third party extensions](https://www.microsoftpartnercommunity.com/t5/Microsoft-AppSource-and-Azure/how-to-create-and-publish-Azure-third-party-VM-extension-offer/m-p/12741/highlight/true#M454), and as such the VM extension will not be updated with new features.

Support was available for the VM extension until the end of 2020, during which time reasonable efforts were made to fix bugs, subject to any limitations due to Microsoft no longer supporting third party extensions. From 2021, the VM extension is no longer supported.

**All customers using the VM extension should migrate to [DSC](/docs/infrastructure/deployment-targets/tentacle/windows/azure-virtual-machines/via-an-arm-template-with-dsc/).**
:::

**Important Note**

When using the extension, you should not apply additional configuration to the Tentacle via the Octopus Portal. This will result in the configuration on the Octopus Server being overwritten in certain circumstances (such as an extension upgrade). There needs to be only one "source of truth" for the configuration - the extension.

The VM extension can be installed in a variety of ways. Please refer to the appropriate page for details.
