---
title: Installation
position: 20
description: How to install the Octopus Server.
hideInThisSection: true
---

!include <octopus-server>

## Releases of Octopus Deploy Server

!include <octopus-releases>


## Self-hosted Octopus Server

When installed, the self-hosted Octopus Server:

- Runs as a Windows service called **OctopusDeploy**.
- Stores its data in an [SQL Server Database](/docs/installation/sql-server-database.md). ([SQL Server Express](http://downloadsqlserverexpress.com/) is an easy way of getting started.)
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/octopus-rest-api/index.md) and the  **Octopus Web Portal** that you will use to manage your [infrastructure](/docs/infrastructure/index.md) and [deployments](/docs/deployment-process/index.md).

Before you install Octopus Deploy, review the software and hardware [requirements](/docs/installation/requirements.md), and make sure you have access to an instance of [SQL Server Database](/docs/installation/sql-server-database.md) that you can use with Octopus Deploy.


## Install Octopus

1. [Download](https://octopus.com/downloads) the Octopus Deploy installer.
1. Start the Octopus Installer, click **Next**, accept the **Terms in the License Agreement** and click **Next**.
1. Accept the default **Destination Folder** or choose a different location and click **Next**.
1. Click **Install**, and give the app permission to **make changes to your device**.
1. Click **Finish** to exit the installation wizard and launch the **Getting started wizard** to configure your Octopus Server.
1. Click **Get started...** and either enter your details to start a free trial of Octopus Deploy or enter your **license key** and click **Next**.
1. Accept the default **Home Directory** or enter a location of your choice and click **Next**.
1. Decide whether to use a **Local System Account** or a **Custom Domain Account**.

Learn more about the [permissions required for the Octopus Windows Service](/docs/installation/permissions-for-the-octopus-windows-service.md) or using a [Managed Service Account](/docs/installation/managed-service-account.md).

8. On the **Database** page, click the drop-down arrow in the **Server Name** field to detect the SQL Server Database. Octopus will create the database for you which is the recommended process; however, you can also [create your own database](/docs/installation/sql-server-database.md#creating-the-database).
9. Enter a name for the database, and click **Next** and **OK** to **create the database**.

  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database.

10. Accept the default port and directory or enter your own and click **Next**.
11. If you’re using **username and passwords stored in Octopus** authentication mode, enter the username and password that will be used for the Octopus administrator. If you are using [active directory](/docs/security/authentication/active-directory/index.md), enter the active directory user details.

  You can configure additional [Authentication Providers](/docs/security/authentication/index.md) for the Octopus Server after the server has been installed.

12. Click **Install**.

When the installation has completed, click **Finish** to launch the **Octopus Manager**.

## Octopus Manager

Before you launch the **Octopus Web Portal**, it's worth taking note of the other settings such as controlling the Octopus Windows Service, importing and exporting the data Octopus stores in the SQL server, and viewing the Master Key.

You can launch the Octopus Web Portal from the Octopus Manager, by clicking **Open in Browser**.

## Save your Master Key

Under the storage section, you will see a link to **View Master Key**.

When Octopus is installed, it generates a Master Key which is a random string that is used to encrypt sensitive data in your Octopus database. You will need the Master Key if you ever need to restore Octopus.

Make a copy of the Master Key and save it in a **secure** location.

:::warning
**Warning**

If you don't have a copy of your Master Key and your hardware fails, you will not be able to recover the encrypted data from the database. Make a copy of the **Master Key** and save it in a secure location. Hopefully you will never need it, but you'll glad you have it if you ever do. Learn about [Recovering After Losing Your Octopus Server and Master Key](/docs/administration/managing-infrastructure/lost-master-key.md).
:::

## Launch the Octopus Web Portal

Click **Open in browser** to launch the **Octopus Web Portal** and log in using the authentication details you set up during the configuration process.

The **Octopus Web Portal**  is where you'll manage your infrastructure, projects, deployment process, access the built-in repository, and manage your deployments and releases.

## Learn more

 - [Troubleshooting the Octopus installation](/docs/installation/troubleshooting.md)
 - [Configure your infrastructure](/docs/infrastructure/index.md)
 - [Upgrading guide](/docs/administration/upgrading/index.md)
 - [Automating Octopus installation](/docs/installation/automating-installation.md)

