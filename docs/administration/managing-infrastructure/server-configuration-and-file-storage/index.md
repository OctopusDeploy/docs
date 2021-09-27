---
title: Server configuration and file storage
description: Octopus Server configuration command reference including how to specify your file storage locations.
position: 1100
---

Occasionally, it may be necessary to change the location at which Octopus stores its data (called the "Octopus Home" folder) as well as the Registry Key which defines the Octopus Server instance, you may also want to clean up the Octopus Home folder after migrating from Octopus Server 2.6 to a modern version of Octopus Server. This page will explain what settings can be configured using the command-line on the Octopus Server and what folders can safely be removed from the Octopus Home folder after successfully migrating to a modern version of Octopus Server.

:::problem
Make sure you have a **current backup** of your Octopus data before proceeding. You will also need your **Master Key** if you need to use the backup, so please copy that also!
:::

## Server configuration {#ServerconfigurationandFilestorage-ConfigurationServerconfiguration}

If you need to re-configure your Octopus Server instance, you can do that using the command-line as described below

**Usage**

```powershell
Octopus.Server configure [<options>]
```

Where `[<options>]` is any of:

**configure options**

```text
      --instance=VALUE       Name of the instance to use
      --config=VALUE         Configuration file to use
      --home=VALUE           Home directory
      --skipDatabaseCompatibilityCheck
                             Skips the database compatibility check
      --skipDatabaseSchemaUpgradeCheck
                             Skips the database schema upgrade checks. Use
                               with caution
      --serverNodeName=VALUE Deprecated: set the node name via the create-
                               instance command instead. Unique Server Node
                               name for a clustered environment.
      --cachePackages=VALUE  Days to cache packages for. Default: 20
      --cacheLowDiskSpaceThreshold=VALUE
                             Threshold of free disk space (in gigabytes)
                               where packages are cleaned up from cache
                               regardless of age. Default: 1
      --cacheDirectoryFullThreshold=VALUE
                             Threshold of the size of the cache folder(in
                               gigabytes) where packages are cleaned up from
                               cache regardless of age. Default: 0 (no limit)
      --maxConcurrentTasks=VALUE
                             Deprecated: may be removed in a future release
                               (currently has no effect; set Task Cap instead).
                                Maximum number of concurrent tasks that the
                               Octopus Server can execute. Default is 0 (no
                               limit).
      --upgradeCheck=VALUE   Whether checking for upgrades is allowed (true
                               or false)
      --upgradeCheckWithStatistics=VALUE
                             Include usage statistics when checking for
                               upgrades (true or false)
      --commsListenPort=VALUE
                             TCP port that the communications service should
                               listen on
      --commsListenWebSocket=VALUE
                             WebSocket prefix that the communications service
                               should listen on (e.g.
                               'https://+:443/OctopusComms'); set to blank to
                               disable websockets. Refer to http://g.octopush-
                               q.com/WebSocketComms.
      --webListenPrefixes=VALUE
                             Comma-separated list of HTTP.sys listen prefixes
                               (e.g., 'http://localhost/octopus')
      --webForceSSL=VALUE    Whether SSL should be required (HTTP requests
                               get redirected to HTTPS)
      --requestLoggingEnabled=VALUE
                             Whether to enable logging of web requests
      --customBundledPackageDirectory=VALUE
                             A custom folder for getting packages (like
                               Calamari) that are normally bundled with Octopus
                               Server
      --upgradeNotification=VALUE
                             Modifies the visibility of the notification when
                               upgrades are available. Valid values are
                               AlwaysShow, ShowOnlyMajorMinor and NeverShow.
      --webCorsWhitelist=VALUE
                             Comma-separated whitelist of domains that are
                               allowed to retrieve data (empty turns CORS off,
                               * allows all).
      --xFrameOptions=VALUE  A directive to provide in the X-Frame-Options
                               header
      --xFrameOptionAllowFrom=VALUE
                             (DEPRECATED) A uri to provide in the X-Frame-
                               Options http header in conjunction with the
                               ALLOW-FROM value. The directive allow-from uri
                               for X-Frame-Options has been deprecated and no
                               longer works in modern browsers.
      --hstsEnabled=VALUE    Enables or disables sending the Strict-Transport-
                               Security (HSTS) header. Defaults to false.
      --hstsMaxAge=VALUE     Sets the max-age value (in seconds) of the
                               Strict-Transport-Security (HSTS) header.
                               Defaults to 1 year (31556926 seconds).
      --webContentSecurityPolicyEnabled=VALUE
                             Enables or disables sending the Content-Security-
                               Policy header. Defaults to true.
      --webReferrerPolicy=VALUE
                             Sets the 'Referrer-Policy' response header.
                               Defaults to 'no-referrer'.
      --webServer=VALUE      Web server to use when running Octopus
                               ('HttpSys', 'Kestrel')
      --webTrustedRedirectUrls=VALUE
                             Comma-seperated list of URLs that are trusted
                               for redirection
      --autoLoginEnabled=VALUE
                             Enable/disable automatic user login.
      --selfServiceLoginEditingEnabled=VALUE
                             Enable/disable whether users can edit their own
                               logins.
      --cookieDomain=VALUE   Set a specific domain for issued cookies.
      --dynamicExtensionsEnabled=VALUE
                             Enable/disable dynamic extensions.
      --azureADIsEnabled=VALUE
                             Set the azureAD IsEnabled, used for
                               authentication.
      --azureADIssuer=VALUE  Follow our documentation to find the Issuer for
                               azureAD.
      --azureADClientId=VALUE
                             Follow our documentation to find the Client ID
                               for azureAD.
      --azureADScope=VALUE   Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               azureAD.
      --azureADNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from azureAD.
      --azureADAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with azureAD.
      --azureADRoleClaimType=VALUE
                             Tell Octopus how to find the roles in the
                               security token from Azure Active Directory.
      --activeDirectoryIsEnabled=VALUE
                             Set whether active directory is enabled.
      --activeDirectoryContainer=VALUE
                             Set the active directory container used for
                               authentication.
      --webAuthenticationScheme=VALUE
                             When Domain authentication is used, specifies
                               the scheme (Basic, Digest,
                               IntegratedWindowsAuthentication, Negotiate,
                               Ntlm). You will need to restart all Octopus
                               Server nodes in your cluster for these changes
                               to take effect. Please note that using Negotiate
                               or IntegratedWindowsAuthentication [may require
                               additional server configuration](https://-
                               g.octopushq.com/AuthAD) in order to work
                               correctly.
      --allowFormsAuthenticationForDomainUsers=VALUE
                             When Domain authentication is used, specifies
                               whether the HTML-based username/password form
                               can be used to sign in.
      --activeDirectorySecurityGroupsEnabled=VALUE
                             When Domain authentication is used, specifies
                               whether to support security groups from AD.
      --activeDirectoryAllowAutoUserCreation=VALUE
                             Whether unknown users will be automatically
                               created upon successful login.
      --googleAppsIsEnabled=VALUE
                             Set the googleApps IsEnabled, used for
                               authentication.
      --googleAppsIssuer=VALUE
                             Follow our documentation to find the Issuer for
                               googleApps.
      --googleAppsClientId=VALUE
                             Follow our documentation to find the Client ID
                               for googleApps.
      --googleAppsScope=VALUE
                             Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               googleApps.
      --googleAppsNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from
                               googleApps.
      --googleAppsAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with googleApps.
      --googleAppsHostedDomain=VALUE
                             Tell Octopus which Google Apps domain to trust.
      --guestloginenabled=VALUE
                             Whether guest login should be enabled
      --ldapIsEnabled=VALUE  Set whether ldap is enabled.
      --ldapServer=VALUE     Set the server URL.
      --ldapPort=VALUE       Set the port using to connect.
      --ldapSecurityProtocol=VALUE
                             Sets the security protocol to use in securing
                               the connection (None, StartTLS, or SSL).
      --ldapIgnoreSslErrors=VALUE
                             Sets whether to ignore certificate validation
                               errors.
      --ldapUsername=VALUE   Set the user DN to query LDAP.
      --ldapPassword=VALUE   Set the password to query LDAP (leave empty for
                               anonymous bind).
      --ldapUserBaseDn=VALUE Set the root distinguished name (DN) to query
                               LDAP for Users.
      --ldapGroupBaseDn=VALUE
                             Set the root distinguished name (DN) to query
                               LDAP for Groups.
      --ldapDefaultDomain=VALUE
                             Set the default domain when none is given in the
                               logon form. Optional.
      --ldapUniqueAccountNameAttribute=VALUE
                             Set the name of the LDAP attribute containing
                               the unique account name, which is used to
                               authenticate via the logon form.  This will be
                               'sAMAccountName' for Active Directory.
      --ldapUserFilter=VALUE The filter to use when searching valid users.
                               '*' is replaced with a normalized version of the
                               username.
      --ldapGroupFilter=VALUE
                             The filter to use when searching valid user
                               groups.  '*' is replaced with the group name.
      --ldapNestedGroupFilter=VALUE
                             The filter to use when searching for nested
                               groups. '*' is replaced by the distinguished
                               name of the initial group.
      --ldapNestedGroupSearchDepth=VALUE
                             Specifies how many levels of nesting will be
                               searched. Set to '0' to disable searching for
                               nested groups.
      --ldapAllowAutoUserCreation=VALUE
                             Whether unknown users will be automatically
                               created upon successful login.
      --ldapReferralFollowingEnabled=VALUE
                             Sets whether to allow referral following (this
                               can slow down queries).
      --ldapReferralHopLimit=VALUE
                             Sets the maximum number of referrals to follow
                               during automatic referral following.
      --ldapConstraintTimeLimit=VALUE
                             Sets the time limit in seconds for LDAP
                               operations on the directory.  '0' specifies no
                               limit.
      --ldapUserDisplayNameAttribute=VALUE
                             Set the name of the LDAP attribute containing
                               the user's full name.
      --ldapUserPrincipalNameAttribute=VALUE
                             Set the name of the LDAP attribute containing
                               the user's principal name.
      --ldapUserMembershipAttribute=VALUE
                             Set the name of the LDAP attribute to use when
                               loading the user's groups.
      --ldapUserEmailAttribute=VALUE
                             Set the name of the LDAP attribute containing
                               the user's email address.
      --ldapGroupNameAttribute=VALUE
                             Set the name of the LDAP attribute containing
                               the group's name.
      --oktaIsEnabled=VALUE  Set the okta IsEnabled, used for authentication.
      --oktaIssuer=VALUE     Follow our documentation to find the Issuer for
                               okta.
      --oktaClientId=VALUE   Follow our documentation to find the Client ID
                               for okta.
      --oktaScope=VALUE      Only change this if you need to change the
                               OpenID Connect scope requested by Octopus for
                               okta.
      --oktaNameClaimType=VALUE
                             Only change this if you want to use a different
                               security token claim for the name from okta.
      --oktaAllowAutoUserCreation=VALUE
                             Tell Octopus to automatically create a user
                               account when a person signs in with okta.
      --oktaRoleClaimType=VALUE
                             Tell Octopus how to find the roles in the
                               security token from Okta.
      --oktaUsernameClaimType=VALUE
                             Tell Octopus how to find the value for the
                               Octopus Username in the Okta token. Defaults to
                               "preferred_username" if left blank.
      --usernamePasswordIsEnabled=VALUE
                             Set whether Octopus username/password
                               authentication is enabled.
      --AzureDevOpsIsEnabled=VALUE
                             Set whether Azure DevOps issue tracker
                               integration is enabled.
      --AzureDevOpsBaseUrl=VALUE
                             Set the base url for the Azure DevOps
                               organization or collection or project.
      --AzureDevOpsPersonalAccessToken=VALUE
                             A Personal Access Token (PAT) authorized to read
                               scopes 'Build' and 'Work items', added under
                               User Settings.
      --GitHubIsEnabled=VALUE
                             Set whether GitHub issue tracker integration is
                               enabled.
      --GitHubBaseUrl=VALUE  Set the base url for the Git repositories.
      --jiraIsEnabled=VALUE  Set whether Jira Integration is enabled.
      --jiraBaseUrl=VALUE    Enter the base url of your Jira instance. Once
                               set, work item references will render as links.
      --customextension=VALUE
                             File path of a custom extension to load

Or one of the common options:

      --help                 Show detailed help for this command
 
Or one of the options supported/provided by the server extensions.
```

## Server folders {#ServerconfigurationandFilestorage-Serverfolders}

If you need to move other folders than the Octopus Home folder, you can do that using the command-line as described below. Also see [moving Octopus Server folders](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome)

**Usage**

```powershell
Octopus.Server path [<options>]
```

Where `[<options>]` is any of:

**Options**

```powershell
      --instance=VALUE       Name of the instance to use
      --clusterShared=VALUE  Set the root path where shared files will be
                               stored for Octopus clusters
      --nugetRepository=VALUE
                             Set the package path for the built-in NuGet
                               repository.
      --artifacts=VALUE      Set the path where artifacts are stored.
      --taskLogs=VALUE       Set the path where task logs are stored.
      --telemetry=VALUE      Set the path where telemetry is stored

Or one of the common options:
      --console              Don't attempt to run as a service, even if the
                               user is non-interactive
      --nologo               Don't print title or version information
```

## File storage {#ServerconfigurationandFilestorage-FileStorageFilestorage}

The Octopus Server stores files in the following folders by default:

- `C:\Octopus`
    - This is where the Octopus Server config file and deployment journal is stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-OctopusHome) on how to move the Octopus home folder
- `C:\Octopus\Artifacts`
    - This is where artifacts created by deployments are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-Artifacts) on how to move the Octopus Server artifacts folder
- `C:\Octopus\Logs`
    - This is where the Octopus Server log file is stored.
- `C:\Octopus\OctopusServer\PackageCache`
    - This is where the signature and delta files used for package acquisitions are stored.
- `C:\Octopus\Packages`
    - This is where the packages pushed to the Octopus Server built-in package repository are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-NuGetRepository) on how to move the Octopus Server built-in package folder
- `C:\Octopus\TaskLogs`
    - This is where all logs from deployments and other server tasks are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-TaskLogs) on how to move the Octopus Server task logs folder
- `C:\Octopus\Telemetry`
    - This is where all performance and other temporal telemetry files are stored.
    - See this [page](/docs/administration/managing-infrastructure/server-configuration-and-file-storage/moving-octopus-server-folders.md#MovingOctopusServerfolders-Telemetry) on how to move the Octopus Server telemetry folder

## Clean up post-2.6 migration {#ServerconfigurationandFilestorage-CleanUpCleanuppost-2.6migration}

In **Octopus 2.6** the Server stored files in the following folders by default:

- `C:\Octopus`
- `C:\Octopus\Backup`
- `C:\Octopus\Logs`
- `C:\Octopus\OctopusServer`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository\Index`
- `C:\Octopus\OctopusServer\Repository\Packages`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`

Once you have migrated to a modern version of Octopus Server the following folders can safely be removed:

- `C:\Octopus\Backup`
- `C:\Octopus\OctopusServer\ActivityLogs`
- `C:\Octopus\OctopusServer\Actors`
- `C:\Octopus\OctopusServer\Repository`
- `C:\Octopus\PackageCache`
- `C:\Octopus\RavenDB`
