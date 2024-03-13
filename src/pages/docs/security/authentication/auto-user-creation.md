---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Automatic user creation
description: User can be automatically created using some providers.
navOrder: 35
---

The Active Directory and OpenID connect providers will, by default, automatically create a new user record for any user who can successfully authenticate but is not currently recognized (based on the checks and fallbacks described [here](#AuthenticationProviders-Usernames,emailaddresses,UPNsandExternalIds)).

This has its benefits in some scenarios, for example if groups from Active Directory have been assigned access to teams in Octopus, then no administration is required in Octopus for new users who are added to those groups in Active Directory. All the users need to do is login in to Octopus and a user will be created and associated with the correct team(s), based on group assignment.

However, this automatic user creation doesn't suit all scenarios so it can be disabled. To disabled automatic user creation for the Active Directory provider use the following command

```powershell
Octopus.Server.exe configure --activeDirectoryAllowAutoUserCreation=false
```

The OpenID connect providers also support disabling automatic user creation, through their own options to the configure command.
