---
title: Authentication Providers
description: Authentication options for Octopus Deploy including our internal provider, Active Directory, Azure AD, Okta, and GoogleApps.
position: 50
---

In versions of Octopus Deploy up to and including **Octopus 3.4**, two authentication providers are supported. The first is an internal provider (UsernamePassword), where Octopus itself handles identity management.  The second is Active Directory (Domain), where identity management is the responsibility of Active Directory.

Starting from **Octopus 3.5**, Octopus Deploy also supports two OpenID Connect based providers, Azure AD and GoogleApps, out-of-the-box.  Also starting in **Octopus 3.5** is support for using multiple authentication providers simultaneously, e.g. you could choose to have UsernamePassword and Azure AD enabled at the same time.  

## Providers

- [Active Directory Authentication](/docs/administration/authentication/active-directory-authentication/index.md)
- [Azure Active Directory Authentication](/docs/administration/authentication/azure-ad-authentication.md)
- [GoogleApps Authentication](/docs/administration/authentication/googleapps-authentication.md)
- [Okta Authentication](/docs/administration/authentication/okta-authentication.md)
- [Octopus ID](octopusid-authentication.md)
- [Guest Login](/docs/administration/authentication/guest-login.md)

## Configuring Authentication Providers {#AuthenticationProviders-ConfiguringAuthenticationProviders}

The following command-line options for the configure command enable the different authentication providers:

```powershell
Octopus.Server.exe configure --usernamePasswordIsEnabled=true
Octopus.Server.exe configure --activeDirectoryIsEnabled=true
Octopus.Server.exe configure --azureADIsEnabled=true
Octopus.Server.exe configure --googleAppsIsEnabled=true
Octopus.Server.exe configure --oktaAppsIsEnabled=true
```

!partial <webauthenticationmode>

:::success
**No authentication providers enabled?**
If you disable all of your authentication providers you will see a message like this when you attempt to load the Octopus portal: `There are no authentication providers enabled.`

You will need to enable at least one of the authentication providers in order to sign in.
:::

## External Security Groups {#AuthenticationProviders-ExternalSecurityGroups}

When editing Teams while the Active Directory provider is enabled, an option is available to search for **Active Directory Groups** and add them as External Security Groups.  Anyone who is in those groups will then be considered part of the Team in Octopus Deploy.

**Octopus 3.5** introduces similar functionality for assigning OpenID Connect based Roles to a Team.  When either of the OpenID Connect based providers are enabled, an option to **Add External Role** is available on the Team edit page.  The Role ID is the Role that will be matched against the user's claims token to determine whether they should be considered part of that Team.

## Users and Authentication Providers {#AuthenticationProviders-usersandauthprovidersUsersandAuthenticationProviders}

In versions up to 3.5, only a single Authentication Provider could be enabled at a time (either Domain or UsernamePassword).  In that scenario Users were managed based on the currently enabled provider and switching providers meant re-configuring Users.  With 3.5 comes the ability to have multiple Authentication Providers enabled simultaneously and as such the User management has been adjusted to be provider agnostic.  What does that mean?  Let's consider an example scenario.

Let's consider that we have UsernamePassword enabled and we create some users, and we've set their email address to their Active Directory domain email address.  The users can now log in with the username and password stored against their user record.  If we now enable the Active Directory authentication provider, then the users can authenticate using either their original username and password, or they can use a username of user@domain or domain\user along with their domain password, or they can use the Integrated authentication button.  In the first scenario they are actually logging in via the UsernamePassword provider, in the latter 2 scenarios they are using the Active Directory provider, but in all of the cases they end up logged in as the same user (this is the driver behind the fallback checks described in the next section).

This scenario would work equally with Azure AD or GoogleApps in place of Active Directory.

Starting from **Octopus 3.17**, there is also the ability to specify the details for multiple logins for each user. For example, you could specify that a user can log is as a specific UPN/SamAccountName from Active Directory or that they could login using a specific account/email address using GoogleApps. Whichever option is actually used to login, Octopus will identify them as the same user.

## Usernames, Email Addresses, UPNs, and External Ids {#AuthenticationProviders-Usernames,emailaddresses,UPNsandExternalIds}

As of **Octopus 3.5**, when users log in to Octopus Deploy, the server will consider more than just their username to determine if they are already a known user.  It will also check their email address and external provider Id.  The external provider Id is the value provided by the external identity managers, e.g. Active Directory, Azure AD or GoogleApps.

In **Octopus 3.17** the details for the logins listed against users is checked first. If the user cannot be immediately identified then the above fallbacks to email address and username will be checked. If the user is located this way then the login details they just used will be automatically added to the user record, to optimize subsequent logins.

One of the key drivers for this behavior is a scenario that would catch customers out with Active Directory. If users had their details changed, which could happen for a number of reasons, Octopus would get confused because it only matched on UPN. If the admins changed that Octopus would see the person as a different user and create a new user record, which would often break team membership settings and hours of manual data clean up would be required. For Active Directory Octopus now considers UPN, samAccountName and Email as identifiers for a user and will match on any one of them. So as long as the admins don't go changing all three of those at once it'll still be able to work out who it already knows.

There is a catch here that is worth noting. Octopus assumes these values are unique across users, even if they can change, and relies on this uniqueness to align users. If you have an AD setup where people have multiple accounts for different activities and the accounts share an email address Octopus will see them as one user. To prevent issues you have to either have an email address in AD for only one of the accounts or have unique email addresses specified for each account.

## Auto Login {#AuthenticationProviders-AutoLogin}

Some of the authentication providers rely on forms style authentication, where the user provides a username and password directly on a form in the Octopus Deploy web application.  Other providers rely on a redirection to an external URL to authenticate the user.  This latter group of providers will, by default, present a link to the user to trigger the redirect to the external URL.

Starting in **Octopus 3.5**, you can also configure Octopus Deploy to automatically redirect to the external URL so the user doesn't have to explicitly click on the link.  This behavior is **not enabled by default**. To enable it, run the following:

```powershell
Octopus.Server.exe configure --autoLoginEnabled=true

```

Note that even when enabled, **this functionality is only active when there is a single, non forms-based authentication provider enabled**.  If multiple providers are enabled, which includes Guest access being enabled, this setting is overridden.

Also, when using the Active Directory provider, this function will only be active when **allowFormsAuthenticationForDomainUsers** is set to **false**.

## OAuth 2.0, OpenID Connect, and Octopus

Octopus Server has two methods for identifying users. The first is session cookies, which are returned to the browser after a successful a login and then used in all communications with the server.  The second is API Keys, which are a shared secret that identify the user.

These mechanisms were not modified with the introduction of the OpenID Connect based authentication providers. Octopus uses the external identity provider only to initially verify the user's identity, and then returns a session cookie to the browser, which means OAuth token expiry and revocation are not currently supported.
