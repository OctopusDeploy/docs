---
title: Installing the Tentacle VM Extension via the Azure Portal
description: How to install a Tentacle using the Azure VM Extension via the new Azure Portal
position: 1
---

After creating a virtual machine on Azure using the management portal, browse to the virtual machine, then click on **Extensions**:

![Azure VM Properties - Extensions Tab](azure-portal-extensions-menu-item.png "width=500")

Click **Add** to add a new extension.

![Azure VM Properties - Add extensions button](azure-portal-extensions-add.png "width=500")

Select the **Octopus Deploy Tentacle Agent** extension, and click **Create**.

![Add Extension - Create Octopus Deploy Tentacle Agent](azure-portal-extensions-about-extension.png "width=500")

Fill in the settings, and click **OK**.

![ Octopus Deploy Tentacle Agent properties](azure-portal-extensions-extension-properties.png "width=500")

A deployment will be initiated which adds the extension to your virtual machine.

## Settings

The settings for the extension are:

`Octopus Server URL`: URL to your Octopus Deploy server. You'll need your own Octopus server (possibly also running on Azure), and you should [consider using HTTPS](/docs/administration/security/exposing-octopus/expose-the-octopus-web-portal-over-https.md). The extension will use the [Octopus REST API](/docs/api-and-integration/api/index.md) against this URL to register the machine.

`API Key`: [Your API key](/docs/api-and-integration/api/how-to-create-an-api-key.md). This key will only be used when registering the machine with the Octopus server; it isn't used for [subsequent communication](/docs/administration/octopus-tentacle-communication/index.md).

`Environments`: The name of the [environment](/docs/infrastructure/environments/index.md) to add the machine to. You can specify more than one by using commas; for example: `UAT1,UAT2`

`Roles`: The roles to give to the machine. Again, separate them using commas for more than one, for example: `web-server,app-server`

`Communication Mode`: How the Tentacle will communicate with the server - it will either use `Polling` to reach out to the server, or `Listening` to wait for connections from the server.

`Port`: The port on which the server should contact the Tentacle (if Tentacle is set to Listen), or the port on which the Tentacle should contact the server (if in Polling mode). in Polling mode, the default value is 10943. In Listening mode, the The default value is 10933.

`Public Hostname Configuration`: When in `Listening` mode, you can specify how the Server should address the Tentacle. You can specify `Public IP` to use the public IP address (as returned from <https://api.ipify.org>), `FQDN` to use the fully qualified domain name (useful for Active Directory networks), `ComputerName` to use the local hostname, or `Custom` to specify your own value.

`Custom Public Hostname`: When in `Listening` mode, and the `Public Hostname Configuration` is set to `Custom`, you can supply the dns name/ip address the Server should use.

After entering the extension settings, click **OK**, and the extension will be installed.

After a few minutes, the machine should appear in the environments tab of your Octopus Deploy server. If it doesn't, please read the [Diagnosing issues](/docs/infrastructure/windows-targets/azure-virtual-machines/diagnosing-issues.md) section.

:::hint
If you need the ability to customize more of the installation, the [CLI](via-the-azure-cli.md), [PowerShell](via-powershell.md) and [ARM Template](via-an-arm-template.md) methods expose more options than the Azure Portal. For even more customization, you might want to consider using the [Azure Desired State Configuration (DSC) extension](https://docs.microsoft.com/en-us/azure/virtual-machines/virtual-machines-windows-extensions-dsc-overview) in conjunction with the [OctopusDSC](https://www.powershellgallery.com/packages/OctopusDSC) resource.
:::
