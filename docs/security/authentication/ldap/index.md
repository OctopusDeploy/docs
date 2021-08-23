---
title: LDAP Authentication
description: Octopus Deploy supports a guest login if enabled.
position: 18
---

This document will walk you through how to configure the LDAP authentication provider in Octopus Deploy.  This example will enable Octopus Deploy to authenticate to the domain `devopswalker.local`.  

:::hint
**Note:** The LDAP Authentication Provider was added in **Octopus 2021.2**. 
:::

# LDAP Background

LDAP, or Lightweight Directory Access Protocol, is an open, vendor-neutral, industry-standard protocol for interacting with directory servers.  It is easy to confuse LDAP with a directory server such as Active Directory.  LDAP itself is not a directory server.  It is the protocol used to communicate with a directory server.  Like `http` is the protocol for web servers, or `wss` is the protocol to communicate with web servers via sockets.  The default configuration for Active Directory enables LDAP support.  Chances are if you have Active Directory running on-premise, you already have an LDAP server!

# Secure your LDAP Server First

By default, LDAP traffic is not encrypted.  By monitoring network traffic, an eavesdropper could learn your LDAP password.  Before configuring the LDAP provider in Octopus Deploy, please consult the vendor documentation for your directory server for communicating over SSL or TLS.  Securing an LDAP server is outside the scope of this blog post.  The rest of this post assumes you have worked with your system administrators on securing your LDAP server.

# Understanding DNs

In LDAP, a DN, or a distinguished name, uniquely identifies an entry and the position in a directory information tree.  Think of it as a path to a file on a file system.

As I stated earlier, my domain is `devopswalker.local`.  Translating that to a DN LDAP can understand is `dc=devopswalker,dc=local`.  All users are stored in the group users.  The DN for that is `cn=users,dc=devopswalker,dc=local`.  My user account `Bob Walker` DN is `cn=Bob Walker,cn=users,dc=devopswalker,dc=local`

# What you will need

Before configuring LDAP, you will need the following.

- The fully qualified domain name, or FQDN, of the server to query.  In this example, it will be `DC01.devopswalker.local`.
- The port number and security protocol to use.  This example will use the standard secure LDAP port 636 for the domain controller and SSL.
- The username and password of a service account that can perform user and group lookups.  In this example, it will be `octopus_svc@devopswalker.local`.
- The root DN you wish to use.  In this example, it will be `dc=devopswalker,dc=local`.

:::hint
This example is using a straightforward Active Directory configuration.  Your DN and FQDN might be much more complex.  Please consult your system administrator for all the required configuration values.
:::

# Getting permissions

!include <admin-user>

## Octopus user accounts are still required {#Octopususeraccountsarestillrequired}

Even if you are using an external identity provider, Octopus still requires a [user account](/docs/security/users-and-teams/index.md) so you can assign those people to Octopus teams and subsequently grant permissions to Octopus resources. Octopus will automatically create a [user account](/docs/security/users-and-teams/index.md) based on the profile information returned from the LDAP lookup.

**How Octopus matches external identities to user accounts**
You can configure the attributes to match external identities to user accounts.  By default Octopus will use `sAMAccountName` for the unique account name and `displayName` for the display name.

:::success
**Already have Octopus user accounts?**
If you already have Octopus user accounts and you want to enable external authentication, simply make sure the Email Address matches in both Octopus and the external identity provider. This means your existing users will be able to sign in using an external identity provider and still belong to the same teams in Octopus.
:::

# Configuring LDAP Authentication Provider in Octopus Deploy

Navigate to {{Configuration, Settings, LDAP}}.  Enter values in the following fields:

- Server: Enter the FQDN of your server.
- Port: Change the port (if your secure port is different from the default).
- Security Protocol: Change to SSL or StartTLS.
- Username: Enter the username that will be used to perform the user lookups.  It can either be `[username]@[domain name]` or the user's DN.
- User base DN: enter the base DN for your users, which in my example is `dc=devopswalker,dc=local`.
- Group base DN: enter the base DN for your users, which in my example is `dc=devopswalker,dc=local`.
- Is Enabled: Check the check box to enable the feature.

:::hint
If you want to limit the LDAP query, add more values to the user and group base DN.  For example, `cn=users,dc=devopswalker,dc=local`.
:::

![basic configuration for LDAP authentication provider](images/ldap-auth-provider-configuration.png)

# Testing the LDAP Authentication Provider

After configuring the LDAP authentication provider, you will want to test it.  There are two easy tests you can perform without logging out/logging as a different user.

- External User Lookup
- External Group Lookup

For the external user lookup, go to {{Configuration,Users}} and select a user account.  Once that screen is loaded, expand the LDAP section under logins and click the `ADD LOGIN` button.  If everything is working correctly, then you will see a modal window similar to this.

![successful user lookup](images/successful-user-lookup.png)

If the LDAP authentication provider or LDAP server is not configured properly you will encounter an error similar to this.

![failed user lookup](images/failed-user-lookup.png)

The error `Unable to connect to the LDAP server.  Please see your administrator if this re-occurs.  Error Code 49 Invalid Credentials` is an LDAP lookup error.  That is a result of bad credentials.  That is easy to debug, but there might be a specific reason why that is failing.  You can find the specific error type code by looking at your Octopus server logs.

![data error code](images/ldap-error-data.png)

The external group lookup is the same as the external user lookup.  Except, go to {{Configuration,Teams}} and select a team.  Then click the button `ADD LDAP GROUP` and perform a search.  If everything is configured correctly, then you will see this message:

![external group lookup successful](images/external-group-success.png)

If the lookup fails, then perform the same troubleshooting you did for the user lookup.

# Signing In

After the above tests are successful, it is time to try the next test, logging into Octopus using the LDAP authentication provider.  We recommend creating a test account.  For this example, the test account `Professor Octopus`, was created and added it to the `Developers` group.  Using the default configuration, signing in as `professor.octopus@devopswalker.local`, will get this error:

![UPN Error](images/failed-sign-in.png)

Changing the username to just `professor.octopus` worked as expected.  The new user was created and assigned to the appropriate team.

![Successful sign in](images/new-user-created.png)

If you would like to sign in using the UPN, change the User Filter to be `(&(objectClass=person)(userPrincipalName=*))`.  

![Updated User Filter](images/updated-ldap-user-filter.png)

That is because with active directory that is stored on the user principal not the user id.

![user principal vs user id](images/user-id-vs-principal.png)

# Troubleshooting

If you encounter errors configuring the LDAP authentication provider you can do the following steps to troubleshoot any problems.

## Take Octopus Out of the Equation

The first recommendation is to use a LDAP lookup tool, such as ldp.exe for Windows, to connect to your directory server over LDAP.  Run that tool from the same server hosting Octopus Deploy.  If that tool cannot connect, then chances are there is a firewall or some other configuration issue you'll need to fix.

## Review the logs

You can find all the LDAP failures in the Octopus logs on the Octopus Server.  Lookup the error codes and data codes via Google to see what the specific error is.

![data error code](images/ldap-error-data.png)