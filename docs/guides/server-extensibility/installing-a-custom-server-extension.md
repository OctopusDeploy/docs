---
title: Installing a custom server extension

---


:::hint
Server extensibility is available in Octopus Deploy 3.5 and later
:::


To install a custom server extension, you need to copy the extension dll(s) into the following folder on the machine that is running the Octopus Deploy server:

:::hint
%ProgramData%\Octopus\CustomExtensions
:::


The server will automatically check this folder for extensions during startup, so don't forget to restart the server if you've added new custom extension files to the folder.


It is important to **include only your extension dll(s)** (and none of the dependencies that Octopus will already resolve, such as *Autofac*, *Nancy* or *Octopus.Server.Extensibility*) or you may receive an error similar to the following: *"Method 'Load' in type ... for not have an implementation"*.

## Verifying the extension has been loaded


To verify which extensions are currently loaded, use the **Server Extensions** panel (under the System Information) on the **Configuration > Diagnostics** page sidebar.  Note that you'll need admin permissions in Octopus Deploy to see this page.


The panel will show the author in bold for any custom extensions,  i.e. If you haven't changed the Author value on the OctopusExtension attribute (see [Authoring an Octopus Deploy server extension](/docs/guides/server-extensibility/authoring-an-octopus-deploy-server-extension.md)) then it will still display as 'Octopus Deploy', but the text will be bold if it was loaded from the CustomExtensions folder.

# Dependencies


Your extension will need to reference the **same version** of *Autofac*, *Nancy* and *Octopus.Server.Extensibility* as used by your version of Octopus Server. e.g. If Octopus Server is running *Autofac v3.5.2*, your extension will need to match this version.


To determine which version of these dependencies your server is using, check the folder where Octopus Server is installed and look at the properties of these DLLs for a product version.

## External Dependencies


If the extension has external dependencies, they must also be copied to the CustomExtensions folder.
