---
title: Octopus Cloud
position: 20
description: How to work with Octopus Cloud.
---
**Octopus Cloud** is the hosted version of Octopus Deploy. It has been publicly available since February 2018.

We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, automatically upgrading the service, and maintaining and monitoring the underlying systems. For security reasons some of the configuration and diagnostic functionality has been limited in Octopus Cloud.

You can sign up for Octopus Cloud at [octopus.com/register](https://octopus.com/register), check out the [Octopus Cloud FAQ](https://octopus.com/blog/octopus-cloud-faq) blog post, visit the [pricing page](https://octopus.com/pricing/cloud), or read on if you're just getting started with Octopus Cloud.

## Getting Started with Octopus Cloud

<a href="https://octopus.com/register" class="btn btn-lg btn-primary">
    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTk2LDMyYy0yMi4zNzI3MywwLjAyMTggLTQyLjg3NTA3LDEyLjQ4OTQ0IC01My4xODc1LDMyLjM0Mzc1Yy0yNC4zMzQ2LDIuNjQ1MzggLTQyLjc4MDU3LDIzLjE3ODMgLTQyLjgxMjUsNDcuNjU2MjVjMCwyNi41MDk2NyAyMS40OTAzMyw0OCA0OCw0OGgxMDRjMjIuMDkxMzksMCA0MCwtMTcuOTA4NjEgNDAsLTQwYy0wLjAyNDE1LC0yMS4wMDYzOSAtMTYuMjkzMywtMzguNDE1MiAtMzcuMjUsLTM5Ljg1OTM4Yy01LjY0MTIsLTI3Ljk3NzQ3IC0zMC4yMDk0OCwtNDguMTA5MDkgLTU4Ljc1LC00OC4xNDA2MnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==" style="margin: 0px; max-height: 20px; margin-right: 7px; vertical-align: text-top; display: inline-block;" alt="Cloud icon"/>
    Start free trial
</a>

## Create an Octopus Account

An Octopus account lets you manage your instances of Octopus Cloud.
:::hint
Skip the steps below by registering using your Google or Microsoft account.
:::

1. Enter your name.
1. Provide your email address and create a password. Please note, these credentials are for your Octopus account and you will use them to log into your Octopus instance through single sign-on.
1. On the next screen, verify your email address.
1. After your email has been verified, you will be logged into your Octopus account.

## Create a Cloud Instance

1. From the **products** screen, click **Start a free 30-day Cloud trial**.
1. Enter an **instance name** for your Octopus Cloud instance.
1. Choose a URL for the instance.
1. Select the Cloud region for your instance. Currently the only option is **US - Oregon**.
1. Click **Enter account details**.
1. Create your first user for Octopus Cloud.
1. Click **Continue to Confirmation**.
1. Confirm the details you've provided, agree to the terms and click **Looks good. Deploy my Octopus!**.

You will be taken to the account provisioning screen. It will take a couple of minutes for your Octopus Cloud instance to be ready. You will receive an email when the instance is ready to use.

When the instance is ready, you will see it (and any other instances you have access to) the next time you log in to your Octopus account at [https://octopus.com/signin](https://octopus.com/signin).

## Uploading packages to Octopus Cloud Servers

Factors such as geopgrahical distance, network bandwidth, and network congestion may cause package uploads to your Octopus Cloud Server to take longer than expected.

If you are having difficulty uploading packages to your Octopus built-in package feed within the default timeout threshold - which is usually within 5 minutes, you might be affected by one or more of the factors mentioned above. In this case, you could try increasing the timeout threshold of `octo.exe` or `nuget.exe` to a value that suits you. We also recommend using `octo.exe`, `Octopus.Client`, or the `TeamCity Plugin (v4.41.0+)` because they have the advantage of utilizing delta compression.

In the near future, the Octopus Cloud will become available in additional regions and you'll have the ability to move between regions.

## Reset the Octopus Account Password

If you forget your username or password for your Octopus account or Octopus instance, you can reset them via Octopus.com

1. Visit [Octopus.com/signin](https://Octopus.com/signin).
1. Click 'Forgot your password?'
1. Reset your credentials and log into your Octopus account. You can now launch your Octopus instance from the accounts dashboard.


## Reset the Instance User Password
:::hint
This feature is being deprecated.
:::

If you forget your username or password for the instance, you can request a **new user invite**.

1. Log in to your Octopus account.
1. Select your cloud instance.
1. Click the **new user invite** link.



## Invite Users to your Octopus Cloud Instance {#OctopusCloud-Invitingusers}

You can add new users to your Octopus Cloud instance from within your Octopus.com account. This feature is being rolled out gradually. If you have access to the invites feature, you will see invites in your instance panel. If you do not have access to this feature and would like access, please [contact support](https://octopus.com/support).

1. Log into your account at [Octopus.com/signin](https://octopus.com/signin).
1. Select **Manage** on your instance panel.
1. Click **Invite a user**, enter their name and email address.
1. Click **Submit**.

If the user already has an Octopus ID, they can **Sign in** to view their newly accessible instance within the correct Organization. Otherwise, they can **Register** for a new account with the email address the invitation was sent to.  All invitees will be set with the **Instance User** role. Users with the **User Instance** role will not be able to change any instance account settings or invite other users.

By default, all invitees will be added to the **Everyone** team within the Octopus instance and will not have any permissions. After they have signed in for the first time, you will need to add them to a team with more permissions.

1. Go to **Configuration**
1. Select **Teams**
1. Create or select an existing team such as **Space Managers**
1. Select **Add Member**
1. Click **Add** and then **Save**.

## Set the Outage Window

In order to keep your instance of Octopus Cloud updated and running the latest version, we will occasionally need to take it offline to update the software. You can let us know the best time for this to occur by setting the outage window.

1. Log in to you Octopus account.
1. Select your cloud instance.
1. Click the **Change outage window** link.
1. Select the time in UTC, providing a window of at least two hours and click **Save outage window**.

## Log in to Your Octopus Cloud Instance

You can access your Octopus Cloud instance at the URL you defined during the registration process. Where \<yoururl\> is the part of the URL you provided:

https://\<yoururl\>.octopus.app/app#/users/sign-in

## Octopus Cloud Version

We keep your instance of Octopus Cloud up to date and running the latest version of Octopus Deploy. To check which version your instance is running, log into the web portal, and click the dropdown menu that appears next to your name in the top right corner. The version is displayed at the top of the display.

## Change Your Password

To change your password for the Octopus instance and Octopus account:

1. Go to [Octopus.com/signin](https://octopus.com/signin).
1. Click the dropdown menu next to your username in the top right corner.
1. Click profile.
1. Click the **Change Password** link.
1. Enter your new password.
1. Confirm the new password, and click **Change password**.

