---
title: Octopus Cloud
position: 20
description: How to work with Octopus Cloud.
---
**Octopus Cloud** is the hosted version of Octopus Deploy. It has been publicly available since February 2018.

We designed Octopus Cloud and self-hosted Octopus to provide the same functionality; however, there are some minor differences, for instance, with Octopus Cloud, we're [responsible](/docs/administration/security/index.md#responsibility) for taking backups, automatically upgrading the service, and maintaining and monitoring the underlying systems. For security reasons some of the configuration and diagnostic functionality has been limited in Octopus Cloud.

You can sign up for Octopus Cloud at [account.octopus.com/register](https://account.octopus.com/register), check out the [Octopus Cloud FAQ](https://octopus.com/blog/octopus-cloud-faq) blog post, visit the [pricing page](https://octopus.com/pricing/cloud), or read on if you're just getting started with Octopus Cloud.

## Getting Started with Octopus Cloud

Before you can start an Octopus Cloud trial, you'll need an Octopus account.

You can sign up for an account at: [account.octopus.com/register](https://account.octopus.com/register).

## Create an Octopus Account

An Octopus account lets you manage your instances of Octopus Cloud.

1. Enter your name.
1. Provide your email address and click **Create a password**. Please note, these credentials are for you Octopus Account. You will also [create credentials](#create-a-cloud-instance) for your Octopus Cloud instance, when you create it.
1. On the next screen, provide your company name.
1. Chose a secure password and enter it twice.
1. Click **Create my Octopus account**.

## Create a Cloud Instance

1. From the instances screen, click **Create cloud instance**.
1. Enter an **instance name** for your Octopus Cloud instance.
1. Choose a URL for the instance.
1. Select the Cloud region for your instance. Currently the only option is **US - Oregon**.
1. Click **Enter account details**.
1. Create your first user for Octopus Cloud.
1. Enter the username the user will use to log into Octopus Cloud.
1. Create a password for the user and confirm the password.
1. Click **Continue to Confirmation**.
1. Confirm the details you've provided, agree to the terms and click **Looks good. Deploy my Octopus!**.

You will be taken to the account provisioning screen. Please note it can take five to ten minutes for your Octopus Cloud instance to be ready. You will receive an email when the instance is ready to use.

When the instance is ready, you will see it (and any other instances you have access to) the next time you log in to your Octopus account at [https://account.octopus.com/account/signin](https://account.octopus.com/account/signin).

## Reset the User Password

If you forget your username or password for the instance, you can request a **new user invite**.

1. Log in to your Octopus account.
1. Select your cloud instance.
1. Click the **new user invite** link.

If you are trying to add new users to your Octopus Cloud instance, that is done in the instance itself. Learn more about [managing users and teams](/docs/administration/managing-users-and-teams/index.md).

## Set the Outage Window

In order to keep your instance of Octopus Cloud updated and running the latest version, we will occasionally need to take it offline to update the software. You can let us know the best time for this to occur by setting the outage window.

1. Log in to you Octopus Account.
1. Select your cloud instance.
1. Click the **Change outage window** link.
1. Select the time in UTC, providing a window of at least two hours and click **Save outage window**.

## Log in to Your Octopus Cloud Instance

You can access your Octopus Cloud instance at the URL you defined during the registration process. Where \<yoururl\> is the part of the URL you provided:

https://\<yoururl\>.octopus.app/app#/users/sign-in

## Octopus Cloud Version

We keep your instance of Octopus Cloud up to date and running the latest version of Octopus Deploy. To check which version your instance is running, log into the web portal, and click the dropdown menu that appears next to your name in the top right corner. The version is displayed at the top of the display.

## Change Your Password

To change your password for the Octopus instance:

1. Log in to your Octopus Cloud instance.
1. Click the dropdown menu next to your username in the top right corner.
1. Click profile.
1. Click the **Change Password** link.
1. Enter your new password.
1. Confirm the new password, and click **SAVE**.
