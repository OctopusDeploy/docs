---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Installing a custom server extension
description: To install a custom server extension, you need to copy the extension dll into a folder on the machine that is running the Octopus Server.
---

:::warning
Server extensibility is deprecated, and no longer maintained.

Some of you may have implemented an extension for Octopus Server, we would be interested in understanding better your requirements so that we can work towards resolving missing capabilities. Get in touch with us via [support@octopus.com](mailto:support@octopus.com) to let us know if this will affect your instance.
:::

To install a custom server extension, you need to copy the extension dll(s) into the following folder on the machine that is running the Octopus Server:

:::hint
%ProgramData%\Octopus\CustomExtensions
:::

The server will automatically check this folder for extensions during startup, so don't forget to restart the server if you've added new custom extension files to the folder.

It is important to **include only your extension dll(s)** (and none of the dependencies that Octopus will already resolve, such as *Autofac*, *Nancy* or *Octopus.Server.Extensibility*) or you may receive an error similar to the following: *"Method 'Load' in type ... for not have an implementation"*.

## Verifying the extension has been loaded {#Installingacustomserverextension-Verifyingtheextensionhasbeenloaded}

To verify which extensions are currently loaded, use the **Server Extensions** panel (under the System Information) on the **{{Configuration,Diagnostics}}** page sidebar.  Note that you'll need admin permissions in Octopus Deploy to see this page.

The panel will show the author in bold for any custom extensions,  i.e. If you haven't changed the Author value on the OctopusExtension attribute (see [Authoring an Octopus Server extension](/docs/administration/server-extensibility/authoring-an-octopus-deploy-server-extension)) then it will still display as 'Octopus Deploy', but the text will be bold if it was loaded from the CustomExtensions folder.

## Dependencies {#Installingacustomserverextension-Dependencies}

Your extension will need to reference the **same version** of *Autofac*, *Nancy* and *Octopus.Server.Extensibility* as used by your version of Octopus Server. e.g. If Octopus Server is running *Autofac v3.5.2*, your extension will need to match this version.

To determine which version of these dependencies your server is using, check the folder where Octopus Server is installed and look at the properties of these DLLs for a product version.

### External dependencies {#Installingacustomserverextension-ExternalDependencies}

If the extension has external dependencies, they must also be copied to the CustomExtensions folder.
