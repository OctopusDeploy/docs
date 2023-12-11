---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Username and Password
description: Octopus Deploy provides a Username and Password authentication provider to allow log in with standard Octopus user accounts.
navOrder: 2
---

:::div{.hint}
Username and Password authentication can only be configured for Octopus Server. For [Octopus Cloud](/docs/octopus-cloud/), authentication using this provider is supported through [Octopus ID](/docs/security/authentication/octopusid-authentication/). See our [authentication provider compatibility](/docs/security/authentication/auth-provider-compatibility) section for further information. 
:::

Octopus provides a Username and Password authentication provider allowing you to create user accounts in Octopus manually without requirement for an external authentication provider.

When Username and Password authentication is enabled, the sign in page for the Octopus Web Portal will present users with the option to sign in with an Octopus account:

:::figure
![Username and Password login screen](/docs/security/authentication/images/username-password-login.png)
:::

## Enable username and password authentication via UI {#usernamepassword-enable-in-ui}

You can enable Username and Password authentication from the Octopus Web Portal by navigating to **Configuration ➜ Settings ➜ Username / Password**. From there you can click the **Is Enabled** checkbox to enable or disable the Username and Password provider.

![Username and Password settings](/docs/security/authentication/images/enable-username-password-1.png)
![Enable Username and Password checkbox](/docs/security/authentication/images/enable-username-password-2.png)

The Username and Password provider will now be activated and available for Octopus users.

## Configuring username and password login {#usernamepassword-configure}

Octopus Server can be configured to enable or disable username and password authentication via the command line, as follows:

```powershell
Octopus.Server.exe configure --instance=[your_instance_name] --usernamePasswordIsEnabled=true
```

## Managing user permissions {#usernamepassword-userpermissions}

When a new Octopus user is created, they are automatically added to the **Everyone** team. To manage Octopus users, this can be done by navigating to **Configuration ➜ Users**. 

:::figure
![Managing users](/docs/security/authentication/images/username-password-managing-users.png)
:::

With any Octopus user, you can [assign user accounts to different teams](/docs/security/users-and-teams) to give them permissions to view projects or environments, or any additional permissions they may need:

![User permissions](/docs/security/authentication/images/username-password-user-permissions.png)
