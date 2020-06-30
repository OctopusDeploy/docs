
If you are installing a clean instance of Octopus Deploy you will need to *seed* it with at least one admin user. This user will have access to create and configure other users as required. To add a user, execute the following command

```powershell
Octopus.Server.exe admin --username USERNAME --email EMAIL
```
The most important part of this command is the email, as usernames are not necessarily included in the claims from the external providers. When the user logs in the matching logic must be able to align their user record based on the email from the external provider or they will not be granted permissions.