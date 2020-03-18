---
title: Octopus Cloud
position: 10
description: How to work with Octopus Cloud.
hideInThisSectionHeader: true
---

!include <octopus-cloud>

## Octopus Server

!include <octopus-server>

## Create an Octopus account

An Octopus account lets you manage your instances of Octopus Cloud.
:::hint
Skip the steps below by registering with your Google or Microsoft account.
:::

1. Enter your name.
1. Provide your email address and create a password. Please note, these credentials are for your Octopus account and you will use them to log into your Octopus instance through single sign-on.
1. On the next screen, verify your email address.
1. After your email has been verified, you will be logged into your Octopus account.

## Create a cloud instance

1. From the **products** screen, click **Start a free 30-day Cloud trial**.
1. Enter an **instance name** for your Octopus Cloud instance.
1. Choose a URL for the instance.
1. Confirm the details you've provided, agree to the terms and click **Deploy my Octopus!**.

You will be taken to the account provisioning screen. It will take a couple of minutes for your Octopus Cloud instance to be ready. You will receive an email when the instance is ready to use.

When the instance is ready, you will see it (and any other instances you have access to) the next time you log in to your Octopus account at [https://octopus.com/signin](https://octopus.com/signin).

## Uploading packages to Octopus Cloud servers

Factors such as geographical distance, network bandwidth, and network congestion may cause package uploads to your Octopus Cloud Server to take longer than expected.

If you are having difficulty uploading packages to your Octopus built-in package feed within the default timeout threshold - which is usually within 5 minutes, you might be affected by one or more of the factors mentioned above. In this case, you could try increasing the timeout threshold of the Octopus CLI or `nuget.exe` to a value that suits you. We also recommend using the Octopus CLI, `Octopus.Client`, or the `TeamCity Plugin (v4.41.0+)` because they have the advantage of utilizing delta compression.

In the near future, the Octopus Cloud will become available in additional regions and you'll have the ability to move between regions.

## Reset the Octopus account password

If you forget your username or password for your Octopus account or Octopus instance, you can reset them via Octopus.com

1. Visit [Octopus.com/signin](https://Octopus.com/signin).
1. Click 'Forgot your password?'
1. Reset your credentials and log into your Octopus account. You can now launch your Octopus instance from the accounts dashboard.


## Reset the instance user password
:::hint
This feature is [being deprecated.](https://Octopus.com/docs/administration/authentication/octopusid-authentication)
:::

If you forget your username or password for the instance, you can request a **new user invite**.

1. Log in to your Octopus account.
1. Select your cloud instance.
1. Click the **new user invite** link.



## Invite users to your Octopus Cloud instance {#OctopusCloud-Invitingusers}

You can add new users to your Octopus Cloud instance from within your Octopus.com account. This feature is being rolled out gradually. If you have access to the invites feature, you will see invites in your instance panel. If you do not have access to this feature and would like access, please [contact support](https://octopus.com/support).

1. Log into your account at [Octopus.com/signin](https://octopus.com/signin).
1. Select **Manage** on your instance panel.
1. Click **Invite a user**, enter their name and email address.
1. Click **Submit**.

If the user already has an [Octopus ID](/docs/administration/authentication/octopusid-authentication.md), they can **Sign in** to view their newly accessible instance within the correct Organization. Otherwise, they can **Register** for a new account with the email address the invitation was sent to.  All invitees will be set with the **Instance User** role. Users with the **User Instance** role will not be able to change any instance account settings or invite other users.

By default, all invitees will be added to the **Everyone** team within the Octopus instance and will not have any permissions. After they have signed in for the first time, you will need to add them to a team with more permissions.

1. Go to **Configuration**
1. Select **Teams**
1. Create or select an existing team such as **Space Managers**
1. Select **Add Member**
1. Click **Add** and then **Save**.

## Set the outage window

In order to keep your instance of Octopus Cloud updated and running the latest version, we will occasionally need to take it offline to update the software. You can let us know the best time for this to occur by setting the outage window.

1. Log in to you Octopus account.
1. Select your cloud instance.
1. Click the **Change outage window** link.
1. Select the time in UTC, providing a window of at least two hours and click **Save outage window**.

## Log in to your Octopus Cloud instance

You can access your Octopus Cloud instance at the URL you defined during the registration process. Where \<yoururl\> is the part of the URL you provided:

https://\<yoururl\>.octopus.app/app#/users/sign-in

## Octopus Cloud version

We keep your instance of Octopus Cloud up to date and running the latest version of Octopus Deploy. To check which version your instance is running, log into the Octopus Web Portal, and click the drop-down menu that appears next to your name in the top right corner. The version is displayed at the top of the display.

## Change your password

To change your password for the Octopus instance and Octopus account:

1. Go to [Octopus.com/signin](https://octopus.com/signin).
1. Click the drop-down menu next to your username in the top right corner.
1. Click profile.
1. Click the **Change Password** link.
1. Enter your new password.
1. Confirm the new password, and click **Change password**.

## Learn more

- [Octopus Cloud blog posts](https://www.octopus.com/blog/tag/octopus%20Cloud)
