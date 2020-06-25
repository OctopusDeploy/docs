---
title: How do I start using Octopus Deploy?
description: Learn how to start using Octopus Deploy
position: 10
---

Octopus deploy is available in two variants:

- [Self-hosted Octopus Server](#self-hosted-octopus-server)
- [Octopus Cloud](#octopus-cloud)

## Self-hosted Octopus Server

With the self-hosted Octopus Server, you download the server and install and manage it on infrastructure of your choice. 

### Install the self-hosted Octopus Server

1. [Download](https://octopus.com/downloads) the Octopus Deploy installer.
1. Start the installer and follow the prompts for the setup wizard.
1. Click **Finish** to exist the installer and grant **Octopus.Manager.Server** permission to make changes to your device.
1. Click **Get started...** and follow the onscreen instructions and accept the defaults.
1. On the **Database** page, click the drop-down arrow in the **Server Name** field to detect the SQL Server Database. Octopus will create the database for you.
1. Continue to follow the prompts, and click **Finished** when the installation has completed.

You self-hosted Octopus Server is now ready to use. 

Before you do anything else, click the **View master key** link, copy your master, and store it somewhere safe.

Click **Open in browser** from the **Octopus Manager** to launch the Octopus Web Portal.

For more information and other installation options, see the [installation documentation](/docs/installation/index.md).

Now that you've installed the self-hosted Octopus Server, it's time to log into the [Octopus Web Portal](/docs/quickstart/the-octopus-web-portal.md).

## Octopus Cloud

Octopus Cloud is the hosted version of Octopus. We host the Octopus Server on your behalf and take responsibility for the underlying infrastructure and upgrading the server so you are using the latest features.

### Create an Octopus Cloud instance

To create an Octopus Cloud instance, you need to first create an Octopus account, and then you can create your Octopus Cloud instance:

!include <octopus-account>
!include <octopus-cloud-instance>

To learn more, see the [Octopus Cloud documentation](/docs/octopus-cloud/index.md).


Now that you've created an Octopus Cloud instance, it's time to log into the [Octopus Web Portal](/docs/quickstart/the-octopus-web-portal.md).