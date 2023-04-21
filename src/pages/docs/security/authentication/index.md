---
layout: src/layouts/Default.astro
pubDate: 2023-01-01
modDate: 2023-01-01
title: Authentication providers
description: Authentication options for Octopus Deploy including our internal provider, Active Directory, Azure AD, Okta, and GoogleApps.
navOrder: 50
---

Octopus Deploy supports the most common authentication providers out-of-the-box, including special support for a Guest Login.

- [Username and Password](/docs/security/authentication/username-password)
- [Active Directory Authentication](/docs/security/authentication/active-directory)
- [Azure Active Directory Authentication](/docs/security/authentication/azure-ad-authentication)
- [GoogleApps Authentication](/docs/security/authentication/googleapps-authentication)
- [LDAP Authentication](/docs/security/authentication/ldap)
- [Okta Authentication](/docs/security/authentication/okta-authentication)
- [Octopus ID](/docs/security/authentication/octopusid-authentication)
- [Guest Login](/docs/security/authentication/guest-login)

:::div{.hint}
Support for authentication providers differ between Octopus Server and [Octopus Cloud](/docs/octopus-cloud/). Please see our [authentication provider compatibility](/docs/security/authentication/auth-provider-compatibility) section for further information. 
:::

## Configuring authentication providers {#AuthenticationProviders-ConfiguringAuthenticationProviders}

You can use the Octopus Web Portal to configure authentication providers by navigating to **{{Configuration,Settings}}**.

Alternatively, you can configure authentication providers using the `Octopus.Server.exe configure` command-line interface.

## Sign in for the first time

If you're using the [Username and Password provider](/docs/security/authentication/username-password), you will need to invite your team to use Octopus and create and manage their user accounts manually.

When a user signs in to Octopus for the first time using an external authentication provider, Octopus will automatically create a new user account for them as a convenience. If you prefer to control which users can access Octopus, you can disable auto user creation and manually invite users instead.

- Learn about [managing users and teams](/docs/security/users-and-teams).
- Learn about [auto user creation](/docs/security/authentication/auto-user-creation).

## Manage teams

In Octopus, you can group your users into teams and use the role-based permission system to control what they can see and do. Learn about [managing users and teams](/docs/security/users-and-teams).

You can manually manage the members of your teams, or you can configure certain external authentication providers to manage your teams for you automatically.

- Learn about [automatically managing teams with Active Directory](/docs/security/authentication/active-directory).
- Learn about [automatically managing teams with Azure Active Directory](/docs/security/authentication/azure-ad-authentication).
- Learn about [automatically managing teams with Okta](/docs/security/authentication/azure-ad-authentication).

## Auto login {#AuthenticationProviders-AutoLogin}

When using an external authentication provider, you can configure Octopus to work in one of two ways:

1. Make the user click a button on the Octopus login screen.
2. Automatically sign the user in by redirecting to the external identity provider.

Auto login is **disabled by default**, and you can enable it in {{Configuration>Settings>Authentication>Auto Login}}.

Note that even when enabled, **this functionality is only active when there is a single, non forms-based authentication provider enabled**.  If multiple providers are enabled, which includes Guest access being enabled, this setting is overridden.

### Auto login and Active Directory

When using the Active Directory provider, auto login will only be active when the {{Configuration>Settings>Active Directory>Allow Forms Authentication For Domain Users}} setting is **false**.

## Associating users with multiple external identities {#AuthenticationProviders-usersandauthprovidersUsersandAuthenticationProviders}

In versions up to 3.5, only a single Authentication Provider could be enabled at a time (either Domain or UsernamePassword).  In that scenario Users were managed based on the currently enabled provider and switching providers meant re-configuring Users.  With 3.5 comes the ability to have multiple Authentication Providers enabled simultaneously and as such the User management has been adjusted to be provider agnostic.  What does that mean?  Let's consider an example scenario.

Let's consider that we have UsernamePassword enabled and we create some users, and we've set their email address to their Active Directory domain email address.  The users can now log in with the username and password stored against their user record.  If we now enable the Active Directory authentication provider, then the users can authenticate using either their original username and password, or they can use a username of user@domain or domain\user along with their domain password, or they can use the Integrated authentication button.  In the first scenario they are actually logging in via the UsernamePassword provider, in the latter 2 scenarios they are using the Active Directory provider, but in all of the cases they end up logged in as the same user (this is the driver behind the fallback checks described in the next section).

This scenario would work equally with Azure AD or GoogleApps in place of Active Directory.

You can also specify the details for multiple logins for each user. For example, you could specify that a user can log is as a specific UPN/SamAccountName from Active Directory or that they could login using a specific account/email address using GoogleApps. Whichever option is actually used to login, Octopus will identify them as the same user.

### Matching external identities to Octopus users {#AuthenticationProviders-Usernames,emailaddresses,UPNsandExternalIds}

When someone signs in to Octopus using an external authentication provider, Octopus will try to find their user account by looking for matching identifiers. It starts by looking for a matching identifiers from the external authentication provider, and will eventually fall back to match on email address.

## Changing authentication providers

In some circumstances you may want to move from one authentication provider to another. The best way to do this is have a period of time where you enable both the new and old authentication providers.

1. Make sure all your existing user accounts in Octopus are configured with the email address for the new authentication provider. This is how Octopus will recognize the new external identity and match it to the existing Octopus user account.
2. Enable the new authentication provider and configure it correctly.
3. Test the new authentication provider, making sure it correctly matches your existing users with their existing Octopus user accounts.
4. Disable the old authentication provider.

## Session management

User sessions can be managed in two ways with Octopus:

1. Session cookies, which are persisted by the browser after a successful login and then sent with every subsequent HTTP request.
2. API Keys, which are a shared secret that identify the user, and must be sent with every HTTP request.

Session cookies are used for interactive sessions regardless of the authentication provider used to identity the user.

### Revoking access to Octopus with external authentication providers

Octopus uses the external identity provider only to initially verify the user's identity, and then returns a session cookie to the browser. When you disable a user in your external identity provider, this will prevent that user from signing in to Octopus using that authentication provider. However, if the user already has an active session with Octopus, that session will stay active until the cookie expires.

If you want to revoke access to Octopus immediately, disable the user in Octopus as well as the external identity provider.
