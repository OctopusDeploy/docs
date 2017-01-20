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


## Resetting your own password


In the Octopus Web UI, click your username in the top right corner of the screen. The drop-down menu shown has a link to **Change Password**.


![](/docs/images/3048125/3277959.png)


To change your password, check the **Change password** checkbox:


![](/docs/images/3048125/3277958.png)


Enter your new password, and confirm your new password, then click the **Save**button:


![](/docs/images/3048125/3277957.png)

## Resetting user passwords


Octopus Server administrators can reset the passwords of other users from the Octopus Web Portal at *Configuration > Users*.


Select the user whose password you want to change:


![](/docs/images/3048125/3277956.png)


Check the **Change password**checkbox:


![](/docs/images/3048125/3277955.png)


Enter the new password, confirm the new password and click the **Save**button:


![](/docs/images/3048125/3277954.png)

## Resetting administrator passwords


Users can be made administrators, and new administrator accounts created using the command line on the Octopus Server machine.


To reset the password of an administrator, or to make a user into an administrator, open an administrative command prompt on the Octopus Server and run the following commands.

### For Username/Password authentication

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe admin --username=YOURUSERNAME --password=YOURPASSWORD
Octopus.Server.exe service --start
```


Replace `YOURUSERNAME` with the simple login name of the administrator account, and provide the **new password**.

### For Active Directory authentication


When Active Directory authentication is in use, the `--password` argument is not required:

```powershell
Octopus.Server.exe service --stop
Octopus.Server.exe admin --username=YOURUSERNAME
Octopus.Server.exe service --start
```

## Password Complexity


Passwords must satisfy password complexity rules.  A password must be at least 8 characters long and satisfy 3 or more of the criteria:

- length of at least 12 characters
- length of at least 16 characters
- contains a number
- contains whitespace
- contains an uppercase letter
- contains a lowercase letter
- contains punctuation
