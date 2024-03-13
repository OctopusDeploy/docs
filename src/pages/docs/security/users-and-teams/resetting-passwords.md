---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Resetting passwords
description: The Octopus Web Portal makes it easy to change or reset your password.
navOrder: 1
---

## Resetting your own password {#Resettingpasswords-Resettingyourownpassword}

In the Octopus Web UI, click your username in the top right corner of the screen. Select **Profile** to go to your profile page.

To change your password, select **Change password**:

:::figure
![](/docs/security/users-and-teams/images/resetpassword.png)
:::

Enter and confirm your new password, then click **Save**:

:::figure
![](/docs/security/users-and-teams/images/newpassword.png)
:::

## Resetting user passwords {#Resettingpasswords-Resettinguserpasswords}

Octopus Server administrators can reset the passwords of other users from the Octopus Web Portal at **Configuration ➜ Users**.

Select the user whose password you want to change:

:::figure
![](/docs/security/users-and-teams/images/usersearch.png)
:::

Click **Change password**:

:::figure
![](/docs/security/users-and-teams/images/changeuserpwd.png)
:::

Enter and confirm the new password, then click **Save**:

:::figure
![](/docs/security/users-and-teams/images/userpasswordchange.png)
:::

## Resetting administrator passwords {#Resettingpasswords-Resettingadministratorpasswords}

Users can be made administrators, and new administrator accounts created using the command line on the Octopus Server machine.

To reset the password of an administrator, or to make a user into an administrator, open an administrative command prompt on the Octopus Server and run the following commands.

### For username/password authentication {#Resettingpasswords-ForUsername/Passwordauthentication}

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe admin --username=YOURUSERNAME --password=YOURPASSWORD
Octopus.Server.exe service --start
```

Replace `YOURUSERNAME` with the simple login name of the administrator account, and provide the **new password**.

### For Active Directory authentication {#Resettingpasswords-ForActiveDirectoryauthentication}

When Active Directory authentication is in use, the `--password` argument is not required:

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe admin --username=YOURUSERNAME
Octopus.Server.exe service --start
```

## Password complexity {#Resettingpasswords-PasswordComplexity}

Passwords in Octopus must meet password complexity rules. Octopus applies a scoring system to a new password to decide if it meets the complexity rules.

A password must be:
- Minimum 8 characters long

It also needs to meet 3 (or more) of the following scoring criteria:

- Contains a number
- Contains whitespace
- Contains an uppercase letter
- Contains a lowercase letter
- Contains punctuation or symbols
- At least 12 characters long
- At least 16 characters long

The more scoring criteria a new password meets, the higher its score and derived complexity.