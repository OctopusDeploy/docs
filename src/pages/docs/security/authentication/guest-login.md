---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
title: Guest login
description: Octopus Deploy supports a guest login if enabled.
navOrder: 32
---

Sometimes you may wish to allow users to access your Octopus Server, without requiring them to create an account. Octopus provides the ability to configure a special guest login for your Octopus Server.

When guest login is enabled, the sign in page for the Octopus Web Portal will present users with a choice to either sign in as a guest, or to sign in with their standard account:

![](/docs/security/authentication/images/guest.png "width=500")

## Enable guest user via UI {#Guestlogin-Enableguestlogin}

You can enable your guest accounts from the Octopus Web Portal by navigating to **{{Configuration,Settings,Guest Login}}**. From there you can click the **Is Enabled** checkbox to enable or disable the Guest account.

![](/docs/security/authentication/images/enableguests1.png "width=500")
![](/docs/security/authentication/images/enableguests2.png "width=500")

The guest account will now be activated and added to your Octopus Users.

## Guest user permissions {#Guestlogin-Guestuserpermissions}

The guest user is created as a standard user managed by Octopus. If you are using Active Directory authentication, you don't need a matching AD user account. The user is automatically added to the **Everyone** team. The guest user can be found in the **Users** tab in the **Configuration** area:

![](/docs/security/authentication/images/guestuser.png "width=500")

As with any standard user, you can [assign the guest account to different teams](/docs/security/users-and-teams/) to give them permissions to view projects or environments.

:::success
**Guest is read-only**
The guest user is designed to be used by multiple people, so it has one additional limitation that other users do not have: the account is completely read-only, despite any roles it might be granted.

For example, you could assign the guest user to your **Octopus Administrators** team, which normally gives the user full access to everything. However for the guest account, this will be read-only - they will be able to view all settings, but they won't be able to change anything. They can't even change their profile settings! Any attempt to make any changes will result in the following message:

![](/docs/security/authentication/images/guestuserpermissions.png "width=500")
:::

:::warning
Please note, if you do add the guest user to your **Octopus Administrators** team, they will be able to view **all** settings and configuration. This includes viewing the license key, viewing the private keys for any uploaded certificates and potentially other information you don't want readable. Depending on your use case, you may want to create a custom role instead.
:::

## Configuring guest login {#Guestlogin-Configuringguestlogin}

Octopus Server can be configured to enable or disable guest access via the command line, as follows:

```powershell
Octopus.Server.exe configure --instance=[your_instance_name] --guestLoginEnabled=true
```

## Automatic guest login {#Guestlogin-Automaticguestlogin}
Sometimes, you need to demonstrate an Octopus Server to others, but don't want people to have a choice between the guest login and one of the other login providers. In these cases, by appending `autologin=guest` to the sign in URL, visitors will be automatically logged in as a guest. This requires that the [Guest User is enabled](#Guestlogin-Enableguestlogin).

For e.g.:
```
https://octopus.mydomain.com/app#/users/sign-in?autologin=guest
```
Will allow visitors to https://octopus.mydomain.com to be automatically logged in as the guest account.
