---
title: Installation
position: 20
description: How to install the central Octopus Deploy Server.
hideInThisSection: true
---

!include <octopus-deploy-server>

## Download the Octopus installer {#downloads}

<a href="/downloads/server" class="btn btn-lg btn-primary" style="height: 46px;">
    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTk2LDE2Yy00LjQxODI4LDAgLTgsMy41ODE3MiAtOCw4YzAsNC40MTgyOCAzLjU4MTcyLDggOCw4YzQuNDE4MjgsMCA4LC0zLjU4MTcyIDgsLThjMCwtNC40MTgyOCAtMy41ODE3MiwtOCAtOCwtOHpNOTUuODc1LDQ3Ljg5MDYyYy00LjQxMjEzLDAuMDY4OTcgLTcuOTM1NDIsMy42OTcxMiAtNy44NzUsOC4xMDkzOHY2MC42ODc1bC0xOC4zNDM3NSwtMTguMzQzNzVjLTEuNTA2MTcsLTEuNTQ4MjYgLTMuNTc0MzYsLTIuNDIxNzUgLTUuNzM0MzcsLTIuNDIxODhjLTMuMjU1MzksMC4wMDA4NSAtNi4xODU2NywxLjk3NDA0IC03LjQxMDY1LDQuOTkwMTZjLTEuMjI0OTgsMy4wMTYxMiAtMC41MDAzNyw2LjQ3MzcyIDEuODMyNTMsOC43NDQyMWwzMiwzMmMzLjEyNDI0LDMuMTIyOTQgOC4xODgyNiwzLjEyMjk0IDExLjMxMjUsMGwzMiwtMzJjMi4wODk5MywtMi4wMDY1MyAyLjkzMTgxLC00Ljk4NjE0IDIuMjAwOTUsLTcuNzg5NjdjLTAuNzMwODUsLTIuODAzNTQgLTIuOTIwMjQsLTQuOTkyOTIgLTUuNzIzNzcsLTUuNzIzNzdjLTIuODAzNTQsLTAuNzMwODUgLTUuNzgzMTQsMC4xMTEwMiAtNy43ODk2NywyLjIwMDk1bC0xOC4zNDM3NSwxOC4zNDM3NXYtNjAuNjg3NWMwLjAyOTYxLC0yLjE2MjQgLTAuODE3NDEsLTQuMjQ0NjkgLTIuMzQ4MDgsLTUuNzcyNDFjLTEuNTMwNjYsLTEuNTI3NzIgLTMuNjE0NTgsLTIuMzcwNzQgLTUuNzc2OTIsLTIuMzM2OTZ6TTIzLjg3NSwxMzUuODkwNjJjLTQuNDEyMTMsMC4wNjg5NyAtNy45MzU0MiwzLjY5NzEyIC03Ljg3NSw4LjEwOTM4djE2YzAsOC43NDQ1IDcuMjU1NSwxNiAxNiwxNmgxMjhjOC43NDQ1LDAgMTYsLTcuMjU1NSAxNiwtMTZ2LTE2YzAuMDQwOCwtMi44ODUwOSAtMS40NzUsLTUuNTY4NjUgLTMuOTY2OTgsLTcuMDIzMWMtMi40OTE5OCwtMS40NTQ0NSAtNS41NzQwNSwtMS40NTQ0NSAtOC4wNjYwMywwYy0yLjQ5MTk4LDEuNDU0NDUgLTQuMDA3NzksNC4xMzgwMSAtMy45NjY5OCw3LjAyMzF2MTZoLTEyOHYtMTZjMC4wMjk2MSwtMi4xNjI0IC0wLjgxNzQxLC00LjI0NDY5IC0yLjM0ODA4LC01Ljc3MjQxYy0xLjUzMDY2LC0xLjUyNzcyIC0zLjYxNDU4LC0yLjM3MDc0IC01Ljc3NjkyLC0yLjMzNjk2eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+" style="margin: 0px; max-height: 20px; margin-right: 7px; vertical-align: text-top; display: inline-block;" alt="Download icon" />
    Download
</a>

## Self-hosted Octopus Deploy Server

When installed, the self-hosted Octopus Deploy Server:

- Runs as a Windows service called **OctopusDeploy**.
- Stores its data in an [SQL Server Database](/docs/installation/sql-server-database.md). ([SQL Server Express](http://downloadsqlserverexpress.com/) is an easy way of getting started.)
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

8. On the **Database** page, click the drop-down arrow in the **Server Name** field to detect the SQL Server Database. Octopus will create the database for you which is the recommended process; however, you can also [create your own database](/docs/installation/sql-server-database.md#creating-the-database).
9. Enter a name for the database, and click **Next** and **OK** to **create the database**.

  Be careful **not** to use the name of an existing database as the setup process will install Octopus into that pre-existing database.

10. Accept the default port and directory or enter your own and click **Next**.
11. If you’re using **username and passwords stored in Octopus** authentication mode, enter the username and password that will be used for the Octopus administrator. If you are using [active directory](/docs/administration/authentication/active-directory-authentication/index.md), enter the active directory user details.

  You can configure addition [Authentication Providers](/docs/administration/authentication/index.md) for the Octopus Deploy Server after the server has been installed.

12. Click **Install**.

When the installation has completed, click **Finish** to launch the **Octopus Manager**.

## Octopus Manager

Before you launch the **Octopus Web Portal**, it's worth taking note of the other settings such as controlling the Octopus Windows Service, importing and exporting the data Octopus stores in the SQL server, and viewing the master key.

You can launch the Octopus Web Portal from the Octopus Manager, by clicking **Open in Browser**.

## Save your master key

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

## Learn more

 - [Configure your Infrastructure](/docs/infrastructure/index.md)
 - [Upgrading Guide](/docs/administration/upgrading/index.md).
 - [Automating Octopus Installation](/docs/installation/automating-installation.md)
 - [Troubleshooting the Octopus Installation](/docs/installation/troubleshooting.md).
