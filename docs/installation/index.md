---
title: Installation
position: 10
description: How to install the central Octopus Deploy Server.
hideInThisSection: true
---

The Octopus Deploy server is available as a self-hosted instance that you install and manage on your infrastructure. This section walks you through installing the **self-hosted** Octopus Deploy server.

To upgrade your existing self-hosted Octopus Deploy server, see our [upgrading guide](/docs/administration/upgrading/index.md). If you're interested in **Octopus Cloud**, see [Octopus Cloud](/docs/octopus-cloud/index.md).

## Download the Octopus Installer {#downloads}

Octopus Deploy is shipped in both a [Long-term support](/docs/administration/upgrading/long-term-support.md) (LTS) release and a fast lane release. We recommend using the long-term support (LTS) release for your Octopus Deploy server. Both versions can be downloaded from our [downloads page](https://octopus.com/downloads).

## Self-Hosted Octopus Deploy Server

When installed, the self-hosted Octopus Deploy server:

- Runs as a Windows service called **OctopusDeploy**.
- Stores its data in an [SQL Server database](/docs/installation/sql-server-database.md). ([SQL Server Express](http://downloadsqlserverexpress.com/) is an easy way of getting started.)
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/octopus-rest-api/index.md) and the  **Octopus Web Portal** that you will use to manage your [infrastructure](/docs/infrastructure/index.md) and [deployments](/docs/deployment-process/index.md).

Before you install Octopus Deploy, review the software and hardware [requirements](/docs/installation/requirements.md), and make sure you have access to an instance of [SQL Server Database](/docs/installation/sql-server-database.md) that you can use with Octopus Deploy.


## Install Octopus

1. Start the Octopus Installer, click **Next**, accept the **Terms in the License Agreement** and click **Next**.
2. Accept the default **Destination Folder** or choose a different location and click **Next**.
3. Click **Install**, and give the app permission to **make changes to your device**.
4. Click **Finish** to exit the installation wizard and launch the **Getting started wizard** to configure your Octopus Deploy Server.
5. Click **Get started...** and either enter your details to start a free trial of Octopus Deploy or enter your **license key** and click **Next**.
6. Accept the default **Home Directory** or enter a location of your choice and click **Next**.
7. Decide whether to use a **Local System Account** or a **Custom Domain Account**.

  Learn more about the [permissions required for the Octopus Windows Service](/docs/installation/permissions-for-the-octopus-windows-service.md) or using a [Managed Service Account](/docs/installation/managed-service-account.md).

8. On the **Database** page, click the dropdown arrow in the **Server Name** field to detect the SQL Server Database. Octopus will create the database for you which is the recommended process; however, you can also [create your own database](/docs/installation/sql-server-database.md#creating-the-database).
9. Enter a name for the database, and click **Next** and **OK** to **create the database**.

  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database.

10. Accept the default port and directory or enter your own and click **Next**.
11. If you’re using **username and passwords stored in Octopus** authentication mode, enter the username and password that will be used for the Octopus administrator. If you are using [active directory](/docs/administration/authentication/active-directory-authentication/index.md), enter the active directory user details.

  You can configure addition [Authentication Providers](/docs/adminitration/authentication/index.md) for the Octopus Deploy server after the server has been installed.
  
12. Click **Install**.

When the installation has completed, click **Finish** to launch the **Octopus Manager**.

## Octopus Manager

Before you launch the **Octopus Web Portal**, it's worth taking note of the other settings such as controlling the Octopus Windows Service, importing and exporting the data Octopus stores in the SQL server, and viewing the master key.

You can launch the Octopus Web Portal from the Octopus Manager, by clicking **Open in Browser**.

## Save Your Master Key

Under the storage section, you will see a link to **View Master Key**.

When Octopus is installed, it generates a master key which is a random string that is used to encrypt sensitive data in your Octopus database. You will need the master key if you ever need to restore Octopus.

Make a copy of the master key and save it in a **secure** location.

:::warning
**Warning**

If you don't have a copy of your master key and your hardware fails, you will not be able to recover the encrypted data from the database. Make a copy of the **master key** and save it in a secure location. Hopefully you will never need it, but you'll glad you have it if you ever do. Learn about [Recovering After Losing Your Octopus Server and Master Key](/docs/administration/managing-infrastructure/lost-master-key.md).
:::

## Launch the Octopus Web Portal

Click **Open in browser** to launch the **Octopus Web Portal** and log in using the authentication details you set up during the configuration process.

The **Octopus Web Portal**  is where you'll manage your infrastructure, projects, deployment process, access the built-in repository, and manage your deployments and releases.

## Troubleshooting

If you've had any problems with the installation, review the [troubleshooting page](/docs/installation/troubleshooting.md).

## Next Steps

 - [Configure your Infrastructure](/docs/infrastructure/index.md)
 - [Upgrading Guide](/docs/administration/upgrading/index.md).
 - [Automating Octopus Installation](/docs/installation/automating-installation.md)
 - [Troubleshooting the Octopus Installation](/docs/installation/troubleshooting.md).
