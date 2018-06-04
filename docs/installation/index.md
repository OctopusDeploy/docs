---
title: Installation
position: 0
description: How to install the central Octopus Deploy server.
---
This section walks you through installing the central Octopus Deploy server.

Once installed, the Octopus Deploy server:

- Runs as a Windows Service.
- Stores its data in an [SQL Server database](/docs/installation/sql-server-database.md).
- Has an embedded HTTP server which serves the [Octopus REST API](/docs/api-and-integration/api/index.md) and the  **Octopus Web Portal** that you will use to manage your deployments.

Before you install Octopus Deploy, review the software and hardware [requirements](/docs/installation/requirements.md), and make sure you have access to an instance of [SQL Server Database](/docs/installation/sql-server-database.md) that you can use with Octopus Deploy.

You need to download the latest version of the [Octopus Installer](/docs/installation/downloads.md).

## Installing Octopus

1. Start the Octopus Installer and follow the onscreen prompts.
2. Accept the **License Agreement**, and either accept the default **Destination Folder** or choose a different location.
3. Click Install, and give the app permission to **make changes to your device**.
4. Click finish to exit the installation wizard and launch the **Getting started wizard** to configure your Octopus Deploy server.
5. Click **Get Started** and either enter your details to start a free trial of Octopus or enter your **license key**.
6. Accept the default **Home Directory** or enter a location of your choice.
7. Decide whether to use a **Local System Account** or a **Custom Domain Account**.

  Learn more about the [permissions required for the Octopus Windows Service](/docs/installation/permissions-required-for-the-octopus-windows-service.md), using a [Managed Service Account](/docs/installation/managed-service-account.md), or [configuring authentication providers](/docs/administration/authentication/authentication-providers/index.md).

8. On the **Database** page, click the dropdown arrow in the **Server Name** field to detect the SQL Server Database.
9. Enter a name for the database, and click OK to create the database.

  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database. Learn more about the [Octopus Database](/docs/administration/octopus-database/index.md).

10. Accept the default port and directory or enter your own.
11. If you’re using *username and passwords stored in Octopus* authentication mode, enter the username and password that will be used for the Octopus administrator. If you are using active directory, enter the active directory user details.
12. Click Install.

When the installation has completed, click Finish to launch the **Octopus Manager**.

## Octopus Manager

Before you launch the **Octopus Web Portal**, it's worth taking note of the other settings such as controlling the Octopus Windows Service, importing and exporting the data Octopus stores in the SQL server, and viewing the master key.

You can launch the Octopus Web Portal from the Octopus Manager, by clicking **Open in Browser**.

## Save the Master Key

Under the storage section, you will see a link to **View Master Key**.

When Octopus is installed, it generates a master key which is a random string that is used to encrypt sensitive data in your Octopus database. You will need the master key if you ever need to restore Octopus.

Take a copy of the master key and save it in a **secure** location.

## Launch the Octopus Web Portal

Click **Open in browser** to launch the **Octopus Web Portal** and log in using the authentication details you set up during the configuration process.

The **Octopus Web Portal**  is where you'll manage your infrastructure, projects, access the built-in repository, and deploy your software from.

## Troubleshooting

If you've had any problems with the installation, review the [troubleshooting page](/docs/installation/troubleshooting.md).

## Next Steps

Now that you've installed the Octopus Deploy server, it's time to configure the [Infrastructure](/docs/infrastructure/index.md) you are deploying to.

If you need to upgrade your Octopus server, refer to the [upgrade guide](/docs/administration/upgrading/index.md).
