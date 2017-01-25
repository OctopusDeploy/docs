---
title: Resetting passwords
position: 1
---

## 
- Resetting your own password
- Resetting user passwords
- Resetting administrator passwords
 - For Username/Password authentication
 - For Active Directory authentication
- Password Complexity
 {#Resettingpasswords-/*&lt;![CDATA[*/div.rbtoc1484731161595{padding:0px;}div.rbtoc1484731161595ul{list-style:disc;margin-left:0px;}div.rbtoc1484731161595li{margin-left:0px;padding-left:0px;}/*]]&gt;*/ResettingyourownpasswordResettinguserpasswordsResettingadminist}

## Resetting your own password {#Resettingpasswords-Resettingyourownpassword}

In the Octopus Web UI, click your username in the top right corner of the screen. The drop-down menu shown has a link to **Change Password**.

![](/docs/images/3048125/3277959.png "width=500")

To change your password, check the **Change password** checkbox:

![](/docs/images/3048125/3277958.png "width=500")

Enter your new password, and confirm your new password, then click the **Save**button:

![](/docs/images/3048125/3277957.png "width=500")

## Resetting user passwords {#Resettingpasswords-Resettinguserpasswords}

Octopus Server administrators can reset the passwords of other users from the Octopus Web Portal at *Configuration > Users*.

Select the user whose password you want to change:

![](/docs/images/3048125/3277956.png "width=500")

Check the **Change password**checkbox:

![](/docs/images/3048125/3277955.png "width=500")

Enter the new password, confirm the new password and click the **Save**button:

![](/docs/images/3048125/3277954.png "width=500")

## Resetting administrator passwords {#Resettingpasswords-Resettingadministratorpasswords}

Users can be made administrators, and new administrator accounts created using the command line on the Octopus Server machine.

To reset the password of an administrator, or to make a user into an administrator, open an administrative command prompt on the Octopus Server and run the following commands.

### For Username/Password authentication {#Resettingpasswords-ForUsername/Passwordauthentication}

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

## Password Complexity {#Resettingpasswords-PasswordComplexity}

Passwords must satisfy password complexity rules.  A password must be at least 8 characters long and satisfy 3 or more of the criteria:

- length of at least 12 characters
- length of at least 16 characters
- contains a number
- contains whitespace
- contains an uppercase letter
- contains a lowercase letter
- contains punctuation
