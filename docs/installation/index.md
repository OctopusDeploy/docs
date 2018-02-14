---
title: Installation
position: 0
description: How to install the central Octopus Deploy server.
---
This section walks you through installing the central Octopus Deploy server.

Once installed, the central Octopus Deploy server:

- Runs as a Windows Service.
- Stores its data in an [SQL Server database](/docs/administration/octopus-database/index.md).
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/api-and-integration/api/index.md) and the  **Octopus Web Portal** that you will use to manage your deployments.

Before you install Octopus Deploy, please review the software and hardware [requirements](/docs/installation/requirements.md), and make sure you have access to an instance of [SQL Database Server](/docs/installation/sql-database-server.md).

You need to download the latest version of the [Octopus Installer](/docs/installation/downloads.md).

## Installation

1. Start and complete the Octopus Installer.
  Accept the **License Agreement**, and either accept the default **Destination Folder** or change it.
3. Click Install, and give the app permission to **make changes to your device**.
1. Click finish to exit the installation wizard and launch the **Octopus Manager**.
1. Click **Get Started** and either enter your details to start a free trial of Octopus or enter your **license key**.
2. Accept the default **Home Directory** or enter a location of your choice.
3. Decide whether to use a **Local System Account** or a **Custom Domain Account**. Learn more about the [permissions required for the Octopus Windows Service](/docs/installation/permissions-required-for-the-octopus-windows-service.md) and [configuring authentication providers](/docs/administration/authentication-providers/index.md).
4. On the **Database** page, click the dropdown arrow in the **Server Name** field to detect the SQL Server Database.
5. Enter a name for the database, and click OK to create the database.
  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database.
6. Accept the default port and directory or enter your own.
7. If you’re using *username and passwords stored in Octopus* authentication mode, enter the username and password that will be used for the Octopus Administrator. If you are using active directory, enter the active directory user details.
8. Click Install.

When the installation has completed, click Finish to launch the Octopus Manager.

TODO

Talk about the master key and other features of the octopus manager

Next: Talk about configuring infrastructure.

.....Move the stuff below this line.


### Using a Managed Service Account (MSA) {#InstallingOctopus-UsingaManagedServiceAccount(MSA)}

You can run the Octopus Server using a Managed Service Account (MSA):

1. Install the Octopus Server and make sure it is running correctly using one of the built-in Windows Service accounts or a Custom Account.
1. Reconfigure the Octopus Server Windows Service to use the MSA, either manually using the Service snap-in, or using `sc.exe config "OctopusDeploy" obj= Domain\Username$`
1. Restart the Octopus Server Windows Service.

Learn about [using Managed Service Accounts](https://technet.microsoft.com/en-us/library/dd548356(v=ws.10).aspx).
