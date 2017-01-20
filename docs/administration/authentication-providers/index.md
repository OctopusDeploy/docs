---
title: Authentication Providers
position: 19
---


In versions of Octopus Deploy up to and including v3.4, two authentication providers are supported.  The first is an internal provider (UsernamePassword), where Octopus itself handles identity management.  The second is Active Directory (Domain), where identity management is the responsibility of Active Directory.


On this page:


- Configuring Authentication Providers
- External Security Groups
- Users and Authentication Providers
- Usernames, email addresses, UPNs and External Ids
- Auto Login

## Configuring Authentication Providers


Starting from v3.5, Octopus Deploy also supports two OpenID Connect based providers, Azure AD and GoogleApps, out-of-the-box.  Also starting in v3.5 is support for using multiple authentication providers simultaneously, e.g. you could choose to have UsernamePassword and Azure AD enabled at the same time.  To support this, there are some new command-line options for the configure command.  Examples are as follows:

```powershell
Octopus.Server.exe configure --usernamePasswordIsEnabled=true
Octopus.Server.exe configure --activeDirectoryIsEnabled=true
Octopus.Server.exe configure --azureADIsEnabled=true
Octopus.Server.exe configure --googleAppsIsEnabled=true
```


The webAuthenticationMode parameter for the configure command is still supported, but can only be used to enable either the UsernamePassword or Active Directory provider.  The important difference is that all other provides will be disabled when you use this parameter, i.e. if you use webAuthenticationMode=Domain, then the Active Directory provider will be enabled and all other providers will be disabled.

:::success
**No authentication providers enabled?**
If you disable all of your authentication providers you will see a message like this when you attempt to load the Octopus portal: `There are no authentication providers enabled.`


You will need to enable at least one of the authentication providers in order to sign in.
:::

## External Security Groups


When editing Teams while the Active Directory provider is enabled, an option is available to search for **Active Directory Groups** and add them as External Security Groups.  Anyone who is in those groups will then be considered part of the Team in Octopus Deploy.


Octopus Deploy 3.5 introduces similar functionality for assigning OpenID Connect based Roles to a Team.  When either of the OpenID Connect based providers are enabled, an option to **Add External Role** is available on the Team edit page.  The Role ID is the Role that will be matched against the user's claims token to determine whether they should be considered part of that Team.

## Users and Authentication Providers


In versions up to 3.5, only a single Authentication Provider could be enabled at a time (either Domain or UsernamePassword).  In that scenario Users were managed based on the currently enabled provider and switching providers meant re-configuring Users.  With 3.5 comes the ability to have multiple Authentication Providers enabled simultaneously and as such the User management has been adjusted to be provider agnostic.  What does that mean?  Let's consider an example scenario.


Let's consider that we have UsernamePassword enabled and we create some users, and we've set their email address to their Active Directory domain email address.  The user's can now log in with the username and password stored against their User record.  If we now enable the Active Directory authentication provider, then the users can authenticate using either their original username and password, or they can use a username of user@domain or domain\user along with their domain password, or they can use the Integrated authentication button.  In the first scenario they are actually logging in via the UsernamePassword provider, in the latter 2 scenarios they are using the Active Directory provider, but in all of the cases they end up logged in as the same user (this is the driver behind the fallback checks described in the next section).


This scenario would work equally with Azure AD or GoogleApps in place of Active Directory.

:::hint
For this reason, when specifying usernames for commands like **admin**, you should use fully qualified domain usernames for referring to Active Directory accounts. For example, user@domain or domain\user
:::




## Usernames, email addresses, UPNs and External Ids


As of v3.5, when users log in to Octopus Deploy, the server will consider more than just their username to determine if they are already a known user.  It will also check their email address and external provider Id.  The external provider Id is the value provided by the external identity managers, e.g. Active Directory, Azure AD or GoogleApps.

## Auto Login


Some of the authentication providers rely on Forms style authentication, where the user provides a username and password directly on a form in the Octopus Deploy web application.  Other providers rely on a redirection to an external URL to authenticate the user.  This latter group of providers will, by default, present a link to the user to trigger the redirect to the external URL.


Starting in v3.5, you can also configure Octopus Deploy to automatically redirect to the external URL so the user doesn't have to explicitly click on the link.  This behaviour is **not enabled by default**. To enable it, run the following:

```powershell
Octopus.Server.exe configure --autoLoginEnabled=true

```


Note that even when enabled, **this functionality is only active when there is a single, non forms-based authentication provider enabled**.  If multiple providers are enabled, which includes Guest access being enabled, this setting is overridden.


Also, when using the Active Directory provider, this function will only be active when **allowFormsAuthenticationForDomainUsers** is set to **false**.
