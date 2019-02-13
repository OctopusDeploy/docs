---
title: Installation
position: 10
description: How to install the central Octopus Deploy Server.
---

This section walks you through installing the **self-hosted** Octopus Deploy server. If you need to upgrade you existing Octopus Deploy server, see our [upgrading guide](/docs/administration/upgrading/index.md).

If you're interested in **Octopus Cloud**, the cloud-hosted Octopus server, you won't need to install the Octopus server. You can register for an [Octopus Cloud Account](https://octopus.com/account/register).

When installed, the Octopus Deploy server:

- Runs as a Windows service called **OctopusDeploy**.
- Stores its data in an [SQL Server database](/docs/installation/sql-server-database.md). ([SQL Server Express](http://downloadsqlserverexpress.com/) is an easy way of getting started.)
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/api-and-integration/api/index.md) and the  **Octopus Web Portal** that you will use to manage your deployments.

Before you install Octopus Deploy, review the software and hardware [requirements](/docs/installation/requirements.md), and make sure you have access to an instance of [SQL Server Database](/docs/installation/sql-server-database.md) that you can use with Octopus Deploy.

You need to download the latest version of the [Octopus Installer](/docs/installation/downloads.md).

## Install Octopus

1. Start the Octopus Installer and follow the onscreen prompts.
2. Accept the **License Agreement**, and either accept the default **Destination Folder** or choose a different location.
3. Click **Install**, and give the app permission to **make changes to your device**.
4. Click **Finish** to exit the installation wizard and launch the **Getting started wizard** to configure your Octopus Deploy Server.
5. Click **Get started...** and either enter your details to start a free trial of Octopus Deploy or enter your **license key**.
6. Accept the default **Home Directory** or enter a location of your choice.
7. Decide whether to use a **Local System Account** or a **Custom Domain Account**.

  Learn more about the [permissions required for the Octopus Windows Service](/docs/installation/permissions-for-the-octopus-windows-service.md), using a [Managed Service Account](/docs/installation/managed-service-account.md), or [configuring authentication providers](/docs/administration/authentication/index.md).

8. On the **Database** page, click the dropdown arrow in the **Server Name** field to detect the SQL Server Database. Octopus will create the database for you which is recommended process; however, you can also [create your own database](/docs/installation/sql-server-database.md#creating-the-database).
9. Enter a name for the database, and click **OK** to **create the database**.

  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database. Learn more about the [Octopus Database](/docs/administration/data/octopus-database/index.md).

10. Accept the default port and directory or enter your own.
11. If you’re using **username and passwords stored in Octopus** authentication mode, enter the username and password that will be used for the Octopus administrator. If you are using active directory, enter the active directory user details.
12. Click Install.

When the installation has completed, click **Finish** to launch the **Octopus Manager**.

## Octopus Manager

Before you launch the **Octopus Web Portal**, it's worth taking note of the other settings such as controlling the Octopus Windows Service, importing and exporting the data Octopus stores in the SQL server, and viewing the master key.

You can launch the Octopus Web Portal from the Octopus Manager, by clicking **Open in Browser**.

## Save Your Master Key

Under the storage section, you will see a link to **View Master Key**.

When Octopus is installed, it generates a master key which is a random string that is used to encrypt sensitive data in your Octopus database. You will need the master key if you ever need to restore Octopus.

Make a copy of the master key and save it in a **secure** location.

:::warning
**Save Your Master Key**

If you don't have a copy of your master key and your hardware fails, you will not be able to recover the encrypted data from the database. Make a copy of the master key and save it in a secure location. Hopefully you will never need it, but you'll glad you have it if you ever need it. Learn more about [Recovering After Losing Your Octopus Server and Master Key](/docs/administration/managing-infrastructure/lost-master-key.md).
:::

## Launch the Octopus Web Portal

Click **Open in browser** to launch the **Octopus Web Portal** and log in using the authentication details you set up during the configuration process.

The **Octopus Web Portal**  is where you'll manage your infrastructure, projects, access the built-in repository, and manage your releases and deployments.

## Troubleshooting

If you've had any problems with the installation, review the [troubleshooting page](/docs/installation/troubleshooting.md).

## Next Steps

Now that you've installed the Octopus Deploy server, it's time to configure the [Infrastructure](/docs/infrastructure/index.md) you are deploying your software to.

If you need to upgrade your Octopus server, refer to the [upgrading guide](/docs/administration/upgrading/index.md).
